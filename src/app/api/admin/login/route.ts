import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { cookies } from 'next/headers';
import crypto from 'crypto';

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string()
});

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validatedData = LoginSchema.parse(body);

        // 관리자 계정 조회
        const user = await prisma.user.findUnique({
            where: {
                email: validatedData.email,
            },
        });

        // 사용자가 없거나 관리자가 아니거나 비밀번호가 없는 경우
        if (!user || user.role !== 'ADMIN' || !user.password) {
            return NextResponse.json(
                { message: '이메일 또는 비밀번호가 올바르지 않습니다.' },
                { status: 401 }
            );
        }

        // 계정 상태 확인
        if (user.status !== 'ACTIVE') {
            return NextResponse.json(
                { message: '비활성화된 계정입니다.' },
                { status: 403 }
            );
        }

        // 비밀번호 확인
        const isValid = await bcrypt.compare(validatedData.password, user.password);
        if (!isValid) {
            return NextResponse.json(
                { message: '이메일 또는 비밀번호가 올바르지 않습니다.' },
                { status: 401 }
            );
        }

        // CSRF 토큰 생성
        const csrfToken = crypto.randomBytes(32).toString('hex');

        // JWT 토큰 생성
        const token = jwt.sign(
            { userId: user.id, role: user.role },
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

        // 응답에서 비밀번호 제외
        const { password: _, ...userWithoutPassword } = user;

        return NextResponse.json({
            token,
            user: userWithoutPassword,
            csrfToken
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: '입력값이 올바르지 않습니다.' },
                { status: 400 }
            );
        }

        console.error('Admin login error:', error);
        return NextResponse.json(
            { message: '로그인 중 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
} 