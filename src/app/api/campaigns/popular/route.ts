import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const campaigns = await prisma.campaign.findMany({
      where: {
        status: 'ONGOING',
        isVisible: true,
      },
      orderBy: [
        {
          currentParticipants: 'desc',
        },
      ],
      take: 10,
      include: {
        location: true,
        visitCategory: true,
        deliveryCategory: true,
        categories: true,
      },
    });

    return NextResponse.json(campaigns);
  } catch (error) {
    console.error('Error fetching popular campaigns:', error);
    return NextResponse.json(
      { message: '인기 캠페인을 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
} 