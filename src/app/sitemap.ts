import { MetadataRoute } from 'next';
import { getCampaigns } from '@/lib/api/campaigns';
import { prisma } from '@/lib/prisma';
import type { Campaign } from '@/types';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  // 정적 경로
  const routes = [
    '',
    '/campaigns',
    '/visit',
    '/delivery',
    '/about',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // 동적 캠페인 경로
  try {
    const { campaigns }: { campaigns: Campaign[] } = await getCampaigns({ limit: 1000 });
    const campaignRoutes = campaigns.map((campaign: Campaign) => ({
      url: `${baseUrl}/campaigns/${campaign.id}`,
      lastModified: new Date(campaign.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    // 캠페인 페이지
    const campaignsFromPrisma = await prisma.campaign.findMany({
      where: { isVisible: true, status: 'ACTIVE' },
      select: {
        id: true,
        updatedAt: true,
      },
      orderBy: { updatedAt: 'desc' },
    });

    const campaignUrls = campaignsFromPrisma.map((campaign) => ({
      url: `${baseUrl}/campaigns/${campaign.id}`,
      lastModified: campaign.updatedAt,
    }));

    return [...routes, ...campaignRoutes, ...campaignUrls];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return routes;
  }
} 