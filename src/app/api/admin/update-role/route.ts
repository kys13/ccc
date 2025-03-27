import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();
        
        const user = await prisma.user.update({
            where: { email },
            data: { role: 'ADMIN' }
        });

        return NextResponse.json({
            message: '사용자 권한이 관리자로 변경되었습니다.',
            user: {
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Error updating user role:', error);
        return NextResponse.json(
            { message: '사용자 권한 변경에 실패했습니다.' },
            { status: 500 }
        );
    }
} 