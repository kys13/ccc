import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const campaign = await prisma.campaign.findUnique({
      where: {
        id: parseInt(params.id),
      },
      include: {
        location: true,
        visitCategory: true,
        deliveryCategory: true,
        applications: {
          select: {
            status: true,
          },
        },
        reviews: {
          where: {
            status: 'APPROVED',
          },
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 10,
        },
        _count: {
          select: {
            applications: true,
          },
        },
      },
    });

    if (!campaign) {
      return NextResponse.json(
        { error: '캠페인을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 응답 데이터 정리
    const { _count, applications, ...campaignData } = campaign;
    const cleanedCampaign = {
      ...campaignData,
      currentParticipants: _count.applications,
      applications: applications.map(app => ({ status: app.status })),
    };

    return NextResponse.json(cleanedCampaign);
  } catch (error) {
    console.error('Campaign fetch error:', error);
    return NextResponse.json(
      { error: '캠페인 정보를 가져오는데 실패했습니다.' },
      { status: 500 }
    );
  }
} 