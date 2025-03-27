import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json(
                { error: '로그인이 필요합니다.' },
                { status: 401 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return NextResponse.json(
                { error: '사용자를 찾을 수 없습니다.' },
                { status: 404 }
            );
        }

        const campaign = await prisma.campaign.findUnique({
            where: { id: parseInt(params.id) },
            include: {
                _count: {
                    select: { applications: true },
                },
            },
        });

        if (!campaign) {
            return NextResponse.json(
                { error: '캠페인을 찾을 수 없습니다.' },
                { status: 404 }
            );
        }

        // 이미 신청한 경우 체크
        const existingApplication = await prisma.campaignApplication.findFirst({
            where: {
                campaignId: parseInt(params.id),
                userId: user.id,
            },
        });

        if (existingApplication) {
            return NextResponse.json(
                { error: '이미 신청한 캠페인입니다.' },
                { status: 400 }
            );
        }

        // 모집 인원 초과 체크
        if (campaign._count.applications >= campaign.maxParticipants) {
            return NextResponse.json(
                { error: '모집이 마감되었습니다.' },
                { status: 400 }
            );
        }

        // 캠페인 신청 생성
        const application = await prisma.campaignApplication.create({
            data: {
                campaignId: parseInt(params.id),
                userId: user.id,
                status: 'PENDING',
            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });

        return NextResponse.json(application);
    } catch (error) {
        console.error('Campaign application error:', error);
        return NextResponse.json(
            { error: '캠페인 신청에 실패했습니다.' },
            { status: 500 }
        );
    }
} 