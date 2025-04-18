'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getCampaigns, GetCampaignsParams } from '@/lib/api/campaigns';
import CampaignCard from '@/components/campaigns/CampaignCard';
import CampaignFilters, { FilterOption } from '@/components/campaigns/CampaignFilters';
import type { Campaign } from '@/types/campaign';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { useToast } from '@/contexts/ToastContext';
import { Clock, Flame, Sparkles, MapPin, Users, Calendar, Gift } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Pagination from '@/components/Pagination';

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
  { id: 'restaurant', name: '맛집', value: 'restaurant' },
  { id: 'cafe', name: '카페', value: 'cafe' },
  { id: 'beauty', name: '뷰티', value: 'beauty' },
  { id: 'hotel', name: '숙박', value: 'hotel' },
];

interface CurrentFilters extends Omit<GetCampaignsParams, 'page' | 'limit' | 'type'> {}

export default function VisitCampaignsPage() {
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
      console.error('Failed to load visit campaigns:', err);
      setError('캠페인 목록을 불러오는데 실패했습니다.');
      showToast('캠페인 목록 로딩 실패', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

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
    router.push(`/visit?${params.toString()}`);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  const currentFiltersForProps = getCurrentFilters();

  const handleSortChange = (sortValue: string) => {
    const filtersWithStringValues: Record<string, string> = {};
    Object.entries(currentFiltersForProps).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        filtersWithStringValues[key] = String(value);
      }
    });
    handleFiltersChange({ ...filtersWithStringValues, sort: sortValue });
  };

  return (
    <ErrorBoundary>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">방문형 캠페인</h1>
        <CampaignFilters
          type="visit"
          onFiltersChange={handleFiltersChange}
          regions={regions}
          categories={categories}
          snsTypes={snsTypes}
          className="mb-8"
        />
        
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => handleSortChange('latest')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors inline-flex items-center space-x-2 ${
              currentFiltersForProps.sort === 'latest' 
                ? 'bg-[#FF5C35] text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>최신순</span>
          </button>
          <button
            onClick={() => handleSortChange('deadline')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors inline-flex items-center space-x-2 ${
              currentFiltersForProps.sort === 'deadline' 
                ? 'bg-[#FF5C35] text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>마감임박순</span>
          </button>
          <button
            onClick={() => handleSortChange('popular')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors inline-flex items-center space-x-2 ${
              currentFiltersForProps.sort === 'popular' 
                ? 'bg-[#FF5C35] text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>인기순</span>
          </button>
        </div>

        <div className="mt-8">
          {loading && page === 1 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <Skeleton key={index} className="h-[406px] w-[265px] rounded-lg" />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-10 text-red-600">
              {error}
            </div>
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