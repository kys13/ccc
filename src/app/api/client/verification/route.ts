import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { VerificationStatus, UserType } from '@prisma/client'; // Import enums

const VerificationSchema = z.object({
    // companyName is now in ClientVerification model
    companyName: z.string().min(1),
    // Renamed to registrationNumber and now in ClientVerification model
    companyRegistrationNumber: z.string().min(10), 
    // Renamed to licenseUrl and now in ClientVerification model
    businessLicense: z.string().url(), 
    additionalDocuments: z.array(z.string().url()).optional(),
});

// 클라이언트 인증 요청
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) { // Check for user ID as well
            return new NextResponse(
                JSON.stringify({ message: '인증이 필요합니다.' }),
                { status: 401 }
            );
        }

        const body = await request.json();
        const validatedData = VerificationSchema.parse(body);

        // Check if already exists or update existing one
        const existingVerification = await prisma.clientVerification.findUnique({
            where: { userId: session.user.id }
        });

        let verification;
        if (existingVerification) {
            // Allow resubmission only if rejected?
            if (existingVerification.status === VerificationStatus.PENDING) {
                 return new NextResponse(
                     JSON.stringify({ message: '이미 처리 중인 인증 요청이 있습니다.' }),
                     { status: 400 }
                 );
            }
            // Update existing record
            verification = await prisma.clientVerification.update({
                where: { userId: session.user.id },
                data: {
                    companyName: validatedData.companyName,
                    registrationNumber: validatedData.companyRegistrationNumber,
                    licenseUrl: validatedData.businessLicense,
                    documents: validatedData.additionalDocuments || [],
                    status: VerificationStatus.PENDING, // Reset status on resubmission
                    notes: null // Clear previous notes
                }
            });
        } else {
            // Create new verification record
            verification = await prisma.clientVerification.create({
                data: {
                    userId: session.user.id,
                    companyName: validatedData.companyName,
                    registrationNumber: validatedData.companyRegistrationNumber,
                    licenseUrl: validatedData.businessLicense,
                    documents: validatedData.additionalDocuments || [],
                    status: VerificationStatus.PENDING
                }
            });
        }
        
        // Update User model (only businessNumber and set type to pending/individual initially)
        // Admin should approve and change userType to BUSINESS later.
        await prisma.user.update({
            where: { id: session.user.id },
            data: {
                // Update businessNumber based on submission
                businessNumber: validatedData.companyRegistrationNumber, 
                // Keep userType as INDIVIDUAL until admin approval?
                // Or set a specific status like PENDING_VERIFICATION if needed.
                // userType: UserType.INDIVIDUAL, // Explicitly keep or update as needed
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
        if (!session?.user?.id) { // Check for user ID
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