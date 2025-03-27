'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import type { Campaign } from '@/types/campaign';
import Image from 'next/image';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import CampaignDetail from '@/components/campaigns/CampaignDetail';
import Loading from './loading';
import { generateMetadata as generatePageMetadata } from '@/components/Metadata';

async function getCampaignData(id: string) {
    const campaign = await prisma.campaign.findUnique({
        where: { id: parseInt(id) },
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
                    status: 'approved',
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
        },
    });

    if (!campaign) {
        notFound();
    }

    // 리뷰 통계
    const reviewStats = await prisma.review.aggregate({
        where: {
            campaignId: parseInt(id),
            status: 'approved',
        },
        _count: true,
        _avg: {
            rating: true,
        },
    });

    return {
        campaign,
        reviews: campaign.reviews,
        reviewStats: {
            totalReviews: reviewStats._count,
            averageRating: reviewStats._avg.rating || 0,
        },
    };
}

function generateStructuredData(campaign: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: campaign.title,
    description: campaign.description,
    image: campaign.imageUrl || '/default-campaign.jpg',
    offers: {
      '@type': 'Offer',
      price: campaign.reward,
      priceCurrency: 'KRW',
      availability: campaign.status === 'ongoing' ? 'InStock' : 'OutOfStock',
      validFrom: campaign.startDate,
      validThrough: campaign.endDate,
    },
    category: campaign.visitCategory?.name || campaign.deliveryCategory?.name,
    applicationDeadline: campaign.endDate,
    areaServed: campaign.location?.city || '',
  };
}

export default function CampaignDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<string | null>(null);

  const fetchCampaign = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/campaigns/${params.id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          showToast('캠페인을 찾을 수 없습니다.', 'error');
          router.push('/');
          return;
        }
        throw new Error('Failed to fetch campaign');
      }
      
      const data = await response.json();
      setCampaign(data);

      // 사용자의 신청 상태 확인
      if (isAuthenticated && user) {
        const application = data.applications?.find((app: any) => app.userId === user.id);
        if (application) {
          setApplicationStatus(application.status);
        }
      }
    } catch (error) {
      console.error('Error fetching campaign:', error);
      showToast('캠페인 정보를 불러오는데 실패했습니다.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchCampaign();
    }
  }, [params.id, isAuthenticated]);

  const handleApply = async () => {
    if (!isAuthenticated) {
      showToast('로그인이 필요합니다.', 'error');
      router.push('/login');
      return;
    }

    try {
      setApplying(true);
      const response = await fetch(`/api/campaigns/${params.id}/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to apply for campaign');
      }

      const data = await response.json();
      setApplicationStatus('PENDING');
      showToast('캠페인 신청이 완료되었습니다.', 'success');
      fetchCampaign(); // 캠페인 정보 새로고침
    } catch (error: any) {
      console.error('Error applying to campaign:', error);
      showToast(error.message || '캠페인 신청에 실패했습니다.', 'error');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">캠페인을 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateStructuredData(campaign)),
        }}
      />
      <Suspense fallback={<Loading />}>
        <CampaignDetail 
          campaign={campaign}
          onApply={handleApply}
          isApplying={applying}
          isAuthenticated={isAuthenticated}
          applicationStatus={applicationStatus}
        />
      </Suspense>
    </div>
  );
} 