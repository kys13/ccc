'use client';

import { useEffect, useState } from 'react';
import CampaignSlider from '@/components/campaigns/CampaignSlider';
import type { Campaign } from '@/types/campaign';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import MainSlider from '@/components/MainSlider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import Loading from './loading';
import { useToast } from '@/contexts/ToastContext';

const categories = [
  { name: '맛집', icon: '🍽️', href: '/visit/restaurant', description: '맛집 방문 캠페인' },
  { name: '카페', icon: '☕', href: '/visit/cafe', description: '카페 방문 캠페인' },
  { name: '뷰티', icon: '💄', href: '/visit/beauty', description: '뷰티샵 방문 캠페인' },
  { name: '숙박', icon: '🏨', href: '/visit/hotel', description: '숙박 방문 캠페인' },
  { name: '식품', icon: '🥘', href: '/delivery/food', description: '식품 배송 캠페인' },
  { name: '화장품', icon: '🧴', href: '/delivery/beauty', description: '화장품 배송 캠페인' },
  { name: '생활', icon: '🏠', href: '/delivery/living', description: '생활용품 배송 캠페인' },
  { name: '패션', icon: '👕', href: '/delivery/fashion', description: '패션 배송 캠페인' },
];

function CategoryGrid() {
  return (
    <div className="bg-white rounded-2xl py-12 mb-8">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-8 px-8">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.href}
            className="flex flex-col items-center group"
          >
            <div className="w-[70px] h-[70px] bg-gray-50 rounded-full flex items-center justify-center mb-4 text-[28px] text-indigo-600 transition-all duration-200 group-hover:bg-indigo-600 group-hover:text-white group-hover:-translate-y-1">
              {category.icon}
            </div>
            <span className="text-[17px] font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const { showToast } = useToast();
  const [popularCampaigns, setPopularCampaigns] = useState<Campaign[]>([]);
  const [endingSoonCampaigns, setEndingSoonCampaigns] = useState<Campaign[]>([]);
  const [latestCampaigns, setLatestCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setIsLoading(true);
        const [popularResponse, endingSoonResponse, latestResponse] = await Promise.all([
          fetch('/api/campaigns/popular'),
          fetch('/api/campaigns/ending-soon'),
          fetch('/api/campaigns?sort=latest&limit=8')
        ]);

        if (!popularResponse.ok || !endingSoonResponse.ok || !latestResponse.ok) {
          throw new Error('캠페인을 불러오는데 실패했습니다.');
        }

        const [popularData, endingSoonData, latestData] = await Promise.all([
          popularResponse.json(),
          endingSoonResponse.json(),
          latestResponse.json()
        ]);

        setPopularCampaigns(popularData);
        setEndingSoonCampaigns(endingSoonData);
        setLatestCampaigns(latestData.campaigns || latestData);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
        showToast('캠페인을 불러오는데 실패했습니다.', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaigns();
  }, [showToast]);

  return (
    <ErrorBoundary>
      <div className="container mx-auto px-4 py-8 space-y-12">
        <section className="mb-12">
          <MainSlider />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">카테고리</h2>
          <CategoryGrid />
        </section>

        {isLoading ? (
          <div className="space-y-12">
            <Loading />
            <Loading />
            <Loading />
          </div>
        ) : (
          <>
            {latestCampaigns.length > 0 && (
              <section className="mb-12">
                <CampaignSlider
                  campaigns={latestCampaigns}
                  title="최신 캠페인"
                />
              </section>
            )}

            {popularCampaigns.length > 0 && (
              <section className="mb-12">
                <CampaignSlider
                  campaigns={popularCampaigns}
                  title="인기 캠페인"
                />
              </section>
            )}

            {endingSoonCampaigns.length > 0 && (
              <section className="mb-12">
                <CampaignSlider
                  campaigns={endingSoonCampaigns}
                  title="마감 임박 캠페인"
                />
              </section>
            )}
          </>
        )}
      </div>
    </ErrorBoundary>
  );
} 