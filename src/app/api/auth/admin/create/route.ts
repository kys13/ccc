import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { Role, Status } from '@prisma/client';

const ADMIN_SECRET = 'admin-secret-key'; // 실제 운영환경에서는 환경변수로 관리해야 합니다

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password, name, secretKey } = body;

        // Validate admin secret key
        if (secretKey !== ADMIN_SECRET) {
            return NextResponse.json(
                { error: '관리자 생성 권한이 없습니다.' },
                { status: 401 }
            );
        }

        // Check if admin already exists
        const existingAdmin = await prisma.user.findFirst({
            where: { role: 'ADMIN' }
        });

        if (existingAdmin) {
            return NextResponse.json(
                { error: '관리자 계정이 이미 존재합니다.' },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create admin user
        const admin = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: Role.ADMIN,
                status: Status.ACTIVE,
                emailVerified: true // 관리자는 이메일 인증 자동 완료
            }
        });

        // Remove password from response
        const { password: _, ...adminWithoutPassword } = admin;

        return NextResponse.json(adminWithoutPassword);
    } catch (error: any) {
        console.error('Admin creation error:', error);
        return NextResponse.json(
            { error: '관리자 계정 생성에 실패했습니다.' },
            { status: 500 }
        );
    }
} 