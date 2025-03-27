import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const VerificationActionSchema = z.object({
    status: z.enum(['approved', 'rejected']),
    reviewNote: z.string().optional(),
});

// 인증 요청 목록 조회
export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.role === 'admin') {
            return new NextResponse(
                JSON.stringify({ message: '관리자 권한이 필요합니다.' }),
                { status: 403 }
            );
        }

        const verifications = await prisma.clientVerification.findMany({
            where: { status: 'pending' },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        companyName: true,
                        companyRegistrationNumber: true,
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(verifications);

    } catch (error) {
        console.error('Failed to fetch verifications:', error);
        return new NextResponse(
            JSON.stringify({ message: '인증 요청 목록을 불러오는데 실패했습니다.' }),
            { status: 500 }
        );
    }
}

// 인증 요청 처리 (승인/거절)
export async function PUT(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.role === 'admin') {
            return new NextResponse(
                JSON.stringify({ message: '관리자 권한이 필요합니다.' }),
                { status: 403 }
            );
        }

        const { searchParams } = new URL(request.url);
        const verificationId = searchParams.get('id');
        
        if (!verificationId) {
            return new NextResponse(
                JSON.stringify({ message: '인증 요청 ID가 필요합니다.' }),
                { status: 400 }
            );
        }

        const body = await request.json();
        const validatedData = VerificationActionSchema.parse(body);

        // 트랜잭션으로 처리
        const result = await prisma.$transaction(async (tx) => {
            // 인증 요청 상태 업데이트
            const verification = await tx.clientVerification.update({
                where: { id: parseInt(verificationId) },
                data: {
                    status: validatedData.status,
                    reviewNote: validatedData.reviewNote,
                    reviewedBy: session.user.id,
                    updatedAt: new Date()
                }
            });

            // 사용자 정보 업데이트
            await tx.user.update({
                where: { id: verification.userId },
                data: {
                    role: validatedData.status === 'approved' ? 'client' : 'user',
                    clientStatus: validatedData.status,
                    clientVerifiedAt: validatedData.status === 'approved' ? new Date() : null
                }
            });

            return verification;
        });

        return NextResponse.json({
            message: `인증 요청이 ${validatedData.status === 'approved' ? '승인' : '거절'}되었습니다.`,
            verification: result
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

        console.error('Verification processing error:', error);
        return new NextResponse(
            JSON.stringify({ message: '인증 요청 처리 중 오류가 발생했습니다.' }),
            { status: 500 }
        );
    }
} 