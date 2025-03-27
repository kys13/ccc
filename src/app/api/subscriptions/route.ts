import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { getPaymentProvider } from '@/lib/payment';

const SubscriptionSchema = z.object({
    planId: z.number(),
    paymentMethod: z.string(),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const validatedData = SubscriptionSchema.parse(body);
        
        // 사용자 정보 가져오기 (JWT 토큰에서)
        const token = request.headers.get('Authorization')?.split(' ')[1];
        if (!token) {
            return new NextResponse(
                JSON.stringify({ message: '인증이 필요합니다.' }),
                { status: 401 }
            );
        }

        // 플랜 정보 확인
        const plan = await prisma.plan.findUnique({
            where: { id: validatedData.planId }
        });

        if (!plan || !plan.isActive) {
            return new NextResponse(
                JSON.stringify({ message: '유효하지 않은 플랜입니다.' }),
                { status: 400 }
            );
        }

        // 결제 프로바이더 초기화 (예: 토스페이먼츠)
        const paymentProvider = getPaymentProvider();

        // 결제 요청 생성
        const paymentRequest = await paymentProvider.createPayment({
            amount: plan.price,
            orderId: `sub_${Date.now()}`,
            orderName: `${plan.name} 구독`,
            customerName: 'User Name', // TODO: 실제 사용자 이름으로 대체
            successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/subscription/success`,
            failUrl: `${process.env.NEXT_PUBLIC_APP_URL}/subscription/fail`,
        });

        // 결제 정보 저장
        const payment = await prisma.payment.create({
            data: {
                userId: 1, // TODO: 실제 사용자 ID로 대체
                subscriptionId: 1, // TODO: 실제 구독 ID로 대체
                amount: plan.price,
                status: 'pending',
                paymentMethod: validatedData.paymentMethod,
                paymentKey: paymentRequest.paymentKey,
            }
        });

        return NextResponse.json({
            paymentKey: paymentRequest.paymentKey,
            redirectUrl: paymentRequest.redirectUrl,
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

        console.error('Subscription error:', error);
        return new NextResponse(
            JSON.stringify({ message: '구독 신청 중 오류가 발생했습니다.' }),
            { status: 500 }
        );
    }
}

// 구독 취소
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const subscriptionId = searchParams.get('id');

        if (!subscriptionId) {
            return new NextResponse(
                JSON.stringify({ message: '구독 ID가 필요합니다.' }),
                { status: 400 }
            );
        }

        // 구독 상태 업데이트
        await prisma.subscription.update({
            where: { id: parseInt(subscriptionId) },
            data: {
                cancelAtPeriodEnd: true,
                status: 'cancelled'
            }
        });

        return NextResponse.json({
            message: '구독이 성공적으로 취소되었습니다.'
        });

    } catch (error) {
        console.error('Subscription cancellation error:', error);
        return new NextResponse(
            JSON.stringify({ message: '구독 취소 중 오류가 발생했습니다.' }),
            { status: 500 }
        );
    }
} 