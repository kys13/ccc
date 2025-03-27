import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import crypto from 'crypto';

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string()
});

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const validatedData = LoginSchema.parse(body);

        // 사용자 찾기
        const user = await prisma.user.findUnique({
            where: { email: validatedData.email }
        });

        if (!user || !user.password) {
            return new NextResponse(
                JSON.stringify({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' }),
                { status: 401 }
            );
        }

        // 비밀번호 확인
        const isValid = await bcrypt.compare(validatedData.password, user.password);
        if (!isValid) {
            return new NextResponse(
                JSON.stringify({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' }),
                { status: 401 }
            );
        }

        // 계정 상태 확인
        if (user.status !== 'ACTIVE') {
            return new NextResponse(
                JSON.stringify({ message: '비활성화된 계정입니다.' }),
                { status: 403 }
            );
        }

        // CSRF 토큰 생성
        const csrfToken = crypto.randomBytes(32).toString('hex');
        
        // JWT 토큰 생성
        const token = jwt.sign(
            { 
                userId: user.id,
                email: user.email,
                role: user.role
            },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        // CSRF 토큰을 쿠키에 저장
        cookies().set('csrf-token', csrfToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7 // 7일
        });

        return NextResponse.json({
            message: '로그인 성공',
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                status: user.status,
                phoneNumber: user.phoneNumber,
                userType: user.userType
            },
            csrfToken
        });

    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse(
                JSON.stringify({ 
                    message: '입력값이 올바르지 않습니다.',
                    errors: error.errors 
                }),
                { status: 400 }
            );
        }

        console.error('Login error:', error);
        return new NextResponse(
            JSON.stringify({ message: '로그인 중 오류가 발생했습니다.' }),
            { status: 500 }
        );
    }
} 