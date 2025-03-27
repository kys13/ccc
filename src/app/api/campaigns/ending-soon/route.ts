import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const today = new Date();
    const sevenDaysFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    const campaigns = await prisma.campaign.findMany({
      where: {
        OR: [
          { status: 'ONGOING' },
          { status: 'RECRUITING' }
        ],
        isVisible: true,
        endDate: {
          lte: sevenDaysFromNow,
          gte: today
        }
      },
      orderBy: {
        endDate: 'asc'
      },
      take: 8,
      include: {
        location: true,
        visitCategory: true,
        deliveryCategory: true,
        categories: true
      }
    });

    // Transform the response to include application and review counts
    const transformedCampaigns = await Promise.all(
      campaigns.map(async (campaign) => {
        const [applicationCount, reviewCount] = await Promise.all([
          prisma.campaignApplication.count({
            where: { campaignId: campaign.id }
          }),
          prisma.review.count({
            where: { campaignId: campaign.id }
          })
        ]);

        return {
          ...campaign,
          applicationCount,
          reviewCount
        };
      })
    );

    return NextResponse.json(transformedCampaigns);
  } catch (error) {
    console.error('Error fetching ending soon campaigns:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ending soon campaigns' },
      { status: 500 }
    );
  }
} 