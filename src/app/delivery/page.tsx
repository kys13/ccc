'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getCampaigns, GetCampaignsParams } from '@/lib/api/campaigns';
import CampaignCard from '@/components/campaigns/CampaignCard';
import CampaignFilters, { FilterOption } from '@/components/campaigns/CampaignFilters';
import type { Campaign } from '@/types/campaign';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { useToast } from '@/contexts/ToastContext';
import { Clock, Flame, Sparkles } from 'lucide-react';
import Pagination from '@/components/Pagination';
import { Skeleton } from '@/components/ui/skeleton';

const regions: FilterOption[] = [
  { id: 'seoul', name: '서울', value: 'seoul' },
  { id: 'gyeonggi', name: '경기', value: 'gyeonggi' },
  { id: 'incheon', name: '인천', value: 'incheon' },
  { id: 'busan', name: '부산', value: 'busan' },
];

const snsTypes: FilterOption[] = [
  { id: 'instagram', name: '인스타그램', value: 'instagram' },
  { id: 'blog', name: '블로그', value: 'blog' },
  { id: 'youtube', name: '유튜브', value: 'youtube' },
];

const categories: FilterOption[] = [
  { id: 'food', name: '식품', value: 'food' },
  { id: 'beauty', name: '뷰티', value: 'beauty' },
  { id: 'fashion', name: '패션', value: 'fashion' },
  { id: 'living', name: '리빙', value: 'living' },
];

interface CurrentFilters extends Omit<GetCampaignsParams, 'page' | 'limit' | 'type'> {
    priceRange?: string;
}

export default function DeliveryCampaignsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const getCurrentFilters = useCallback((): CurrentFilters => {
    return {
      sort: searchParams?.get('sort') || 'latest',
      search: searchParams?.get('search') || undefined,
      category: searchParams?.get('category') || undefined,
      region: searchParams?.get('region') || undefined,
      snsType: searchParams?.get('snsType') || undefined,
      priceRange: searchParams?.get('priceRange') || undefined,
    };
  }, [searchParams]);

  const fetchCampaigns = useCallback(async (currentPage: number, filters: CurrentFilters) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getCampaigns({
        ...filters,
        page: currentPage,
        limit: 12,
      });
      setCampaigns(response.campaigns as any);
      setTotalPages(response.totalPages);
      setTotalItems(response.totalItems);
    } catch (err: any) {
      console.error('Failed to load delivery campaigns:', err);
      setError('캠페인 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const filters = getCurrentFilters();
    fetchCampaigns(page, filters);
  }, [page, searchParams, fetchCampaigns, getCurrentFilters]);

  const handleFiltersChange = (newFilters: Record<string, string>) => {
    const params = new URLSearchParams();
    delete newFilters.type;
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value !== 'all') {
        params.set(key, value);
      }
    });
    router.push(`/delivery?${params.toString()}`);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  const currentFiltersForProps = getCurrentFilters();

  return (
    <ErrorBoundary>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">배송형 캠페인</h1>
        <CampaignFilters 
          type="delivery"
          onFiltersChange={handleFiltersChange}
        />
        
        <div className="mt-8">
          {loading && page === 1 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <Skeleton key={index} className="h-[406px] w-[265px] rounded-lg" />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-10 text-red-600">{error}</div>
          ) : campaigns.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {campaigns.map(campaign => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
              </div>
              {loading && page > 1 && (
                <div className="text-center py-4">...</div>
              )}
            </>
          ) : (
            <div className="text-center py-10 text-gray-500">표시할 캠페인이 없습니다.</div>
          )}
        </div>

        {!loading && totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <Pagination 
              currentPage={page} 
              totalPages={totalPages} 
              onPageChange={handlePageChange} 
            />
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
} 