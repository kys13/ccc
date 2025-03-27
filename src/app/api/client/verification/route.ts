import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const VerificationSchema = z.object({
    companyName: z.string().min(1),
    companyRegistrationNumber: z.string().min(10),
    businessLicense: z.string().url(),
    additionalDocuments: z.array(z.string().url()).optional(),
});

// 클라이언트 인증 요청
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return new NextResponse(
                JSON.stringify({ message: '인증이 필요합니다.' }),
                { status: 401 }
            );
        }

        const body = await request.json();
        const validatedData = VerificationSchema.parse(body);

        // 이미 신청한 경우 체크
        const existingVerification = await prisma.clientVerification.findUnique({
            where: { userId: session.user.id }
        });

        if (existingVerification && existingVerification.status === 'pending') {
            return new NextResponse(
                JSON.stringify({ message: '이미 처리 중인 인증 요청이 있습니다.' }),
                { status: 400 }
            );
        }

        // 사용자 정보 업데이트
        await prisma.user.update({
            where: { id: session.user.id },
            data: {
                companyName: validatedData.companyName,
                companyRegistrationNumber: validatedData.companyRegistrationNumber,
                businessLicense: validatedData.businessLicense,
                clientStatus: 'pending'
            }
        });

        // 인증 요청 생성
        const verification = await prisma.clientVerification.create({
            data: {
                userId: session.user.id,
                documents: {
                    businessLicense: validatedData.businessLicense,
                    additionalDocuments: validatedData.additionalDocuments || []
                }
            }
        });

        return NextResponse.json({
            message: '클라이언트 인증 요청이 접수되었습니다.',
            verificationId: verification.id
        }, { status: 201 });

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

        console.error('Client verification request error:', error);
        return new NextResponse(
            JSON.stringify({ message: '인증 요청 중 오류가 발생했습니다.' }),
            { status: 500 }
        );
    }
}

// 인증 상태 조회
export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return new NextResponse(
                JSON.stringify({ message: '인증이 필요합니다.' }),
                { status: 401 }
            );
        }

        const verification = await prisma.clientVerification.findUnique({
            where: { userId: session.user.id }
        });

        if (!verification) {
            return new NextResponse(
                JSON.stringify({ message: '인증 요청 내역이 없습니다.' }),
                { status: 404 }
            );
        }

        return NextResponse.json(verification);

    } catch (error) {
        console.error('Client verification status check error:', error);
        return new NextResponse(
            JSON.stringify({ message: '인증 상태 조회 중 오류가 발생했습니다.' }),
            { status: 500 }
        );
    }
} 