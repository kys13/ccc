import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const campaign = await prisma.campaign.findUnique({
      where: { id: parseInt(params.id) },
      select: {
        title: true,
        description: true,
        imageUrl: true,
      },
    });

    if (!campaign) {
      return {
        title: '캠페인을 찾을 수 없습니다',
        description: '요청하신 캠페인을 찾을 수 없습니다.',
      };
    }

    return {
      title: `${campaign.title} | 캠페인 상세`,
      description: campaign.description,
      openGraph: {
        title: campaign.title,
        description: campaign.description,
        images: campaign.imageUrl ? [campaign.imageUrl] : [],
      },
    };
  } catch (error) {
    return {
      title: '캠페인을 찾을 수 없습니다',
      description: '요청하신 캠페인을 찾을 수 없습니다.',
    };
  }
} 