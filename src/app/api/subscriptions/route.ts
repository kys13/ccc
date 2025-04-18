import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { getPaymentProvider } from '@/lib/payment';

const SubscriptionSchema = z.object({
    planId: z.number(),
    paymentMethod: z.string(),
});

// GET /api/subscriptions - 구독 정보 조회
export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
        }

        const subscriptions = await prisma.subscription.findMany({
            where: {
                userId: session.user.id
            },
            include: {
                plan: true,
                payments: true
            }
        });

        return NextResponse.json(subscriptions);
    } catch (error) {
        console.error('구독 정보 조회 에러:', error);
        return NextResponse.json(
            { error: '구독 정보를 조회하는데 실패했습니다.' },
            { status: 500 }
        );
    }
}

// POST /api/subscriptions - 새 구독 생성
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
        }

        const body = await request.json();
        const { planId, paymentMethod } = body;

        if (!planId || !paymentMethod) {
            return NextResponse.json(
                { error: '필수 필드가 누락되었습니다.' },
                { status: 400 }
            );
        }

        const plan = await prisma.plan.findUnique({
            where: { id: planId }
        });

        if (!plan) {
            return NextResponse.json(
                { error: '존재하지 않는 플랜입니다.' },
                { status: 404 }
            );
        }

        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + plan.duration);

        const subscription = await prisma.subscription.create({
            data: {
                userId: session.user.id,
                planId,
                startDate,
                endDate,
                payments: {
                    create: {
                        amount: plan.price,
                        paymentMethod,
                        paymentDate: new Date(),
                        status: 'PENDING'
                    }
                }
            },
            include: {
                plan: true,
                payments: true
            }
        });

        return NextResponse.json(subscription);
    } catch (error) {
        console.error('구독 생성 에러:', error);
        return NextResponse.json(
            { error: '구독을 생성하는데 실패했습니다.' },
            { status: 500 }
        );
    }
}

// PUT /api/subscriptions - 구독 상태 업데이트
export async function PUT(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
        }

        const body = await request.json();
        const { subscriptionId, status } = body;

        if (!subscriptionId || !status) {
            return NextResponse.json(
                { error: '필수 필드가 누락되었습니다.' },
                { status: 400 }
            );
        }

        const subscription = await prisma.subscription.findUnique({
            where: { id: subscriptionId }
        });

        if (!subscription) {
            return NextResponse.json(
                { error: '존재하지 않는 구독입니다.' },
                { status: 404 }
            );
        }

        if (subscription.userId !== session.user.id) {
            return NextResponse.json(
                { error: '권한이 없습니다.' },
                { status: 403 }
            );
        }

        const updatedSubscription = await prisma.subscription.update({
            where: { id: subscriptionId },
            data: { status },
            include: {
                plan: true,
                payments: true
            }
        });

        return NextResponse.json(updatedSubscription);
    } catch (error) {
        console.error('구독 상태 업데이트 에러:', error);
        return NextResponse.json(
            { error: '구독 상태를 업데이트하는데 실패했습니다.' },
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
                status: 'CANCELLED',
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