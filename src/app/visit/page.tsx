'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getCampaigns } from '@/lib/api/campaigns';
import CampaignCard from '@/components/campaigns/CampaignCard';
import CampaignFilters, { FilterOption } from '@/components/campaigns/CampaignFilters';
import type { Campaign } from '@/types/campaign';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { useToast } from '@/contexts/ToastContext';
import { Clock, Flame, Sparkles } from 'lucide-react';

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

export default function VisitPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver>();

  // URL에서 필터 값 초기화
  const initialFilters = {
    region: searchParams.get('region') || 'all',
    category: searchParams.get('category') || 'all',
    snsType: searchParams.get('snsType') || 'all',
    sort: searchParams.get('sort') || 'latest',
    search: searchParams.get('search') || '',
  };

  const [currentFilters, setCurrentFilters] = useState(initialFilters);

  const lastCampaignElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const updateURL = (filters: typeof currentFilters) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all' && value !== '') {
        params.set(key, value);
      }
    });
    router.push(`/visit?${params.toString()}`, { scroll: false });
  };

  const loadCampaigns = async (filters: typeof currentFilters, pageNum: number = 1, append: boolean = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const queryFilters: Record<string, string> = {};
      if (filters.region !== 'all') queryFilters.city = filters.region;
      if (filters.category !== 'all') queryFilters.category = filters.category;
      if (filters.snsType !== 'all') queryFilters.snsType = filters.snsType;
      if (filters.sort !== 'latest') queryFilters.sort = filters.sort;
      if (filters.search) queryFilters.search = filters.search;

      const response = await getCampaigns({
        ...queryFilters,
        type: 'visit',
        page: pageNum.toString(),
        limit: '12',
        isVisible: 'true'
      });

      if (!response || !response.campaigns) {
        throw new Error('캠페인 데이터를 불러올 수 없습니다.');
      }

      setCampaigns(prev => append ? [...prev, ...response.campaigns] : response.campaigns);
      setHasMore(response.pagination.page < response.pagination.totalPages);
      
      if (!append) {
        updateURL(filters);
      }
    } catch (err) {
      setError('캠페인을 불러오는데 실패했습니다.');
      console.error('Error loading campaigns:', err);
      showToast('캠페인을 불러오는데 실패했습니다.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCampaigns(initialFilters);
  }, []);

  useEffect(() => {
    if (page > 1) {
      loadCampaigns(currentFilters, page, true);
    }
  }, [page]);

  const handleFiltersChange = (filters: Record<string, string>) => {
    const newFilters = {
      ...currentFilters,
      region: filters.region || 'all',
      category: filters.category || 'all',
      snsType: filters.snsType || 'all',
      sort: filters.sort || 'latest',
      search: filters.search || '',
    };
    setCurrentFilters(newFilters);
    setPage(1);
    loadCampaigns(newFilters);
  };

  return (
    <ErrorBoundary>
      <div className="w-full px-4 py-8">
        <div className="max-w-[1920px] mx-auto">
          <h1 className="text-2xl font-bold mb-6">방문 체험</h1>
          
          <div className="max-w-[1600px] mx-auto">
            <CampaignFilters
              type="visit"
              regions={regions}
              categories={categories}
              snsTypes={snsTypes}
              onFiltersChange={handleFiltersChange}
              initialFilters={currentFilters}
              className="mb-6"
              hideSort={true}
            />

            <div className="flex items-center space-x-4 mb-8">
              <button
                onClick={() => handleFiltersChange({ ...currentFilters, sort: 'latest' })}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors inline-flex items-center space-x-2 ${
                  currentFilters.sort === 'latest' 
                    ? 'bg-[#FF5C35] text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>최신순</span>
              </button>
              <button
                onClick={() => handleFiltersChange({ ...currentFilters, sort: 'deadline' })}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors inline-flex items-center space-x-2 ${
                  currentFilters.sort === 'deadline' 
                    ? 'bg-[#FF5C35] text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>마감임박순</span>
              </button>
              <button
                onClick={() => handleFiltersChange({ ...currentFilters, sort: 'popular' })}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors inline-flex items-center space-x-2 ${
                  currentFilters.sort === 'popular' 
                    ? 'bg-[#FF5C35] text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Flame className="w-4 h-4" />
                <span>인기순</span>
              </button>
            </div>

            {error ? (
              <div className="text-center py-8 text-red-600">
                <p>{error}</p>
                <button
                  onClick={() => loadCampaigns(initialFilters)}
                  className="mt-4 text-blue-600 hover:text-blue-800"
                >
                  다시 시도
                </button>
              </div>
            ) : campaigns.length === 0 && !loading ? (
              <div className="text-center py-8 text-gray-500">
                <p>해당하는 캠페인이 없습니다.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-4">
                {campaigns.map((campaign, index) => (
                  <div
                    key={campaign.id}
                    ref={index === campaigns.length - 1 ? lastCampaignElementRef : undefined}
                    className="w-full"
                  >
                    <CampaignCard campaign={campaign} />
                  </div>
                ))}
              </div>
            )}

            {loading && (
              <div className="text-center py-8">
                <div className="loading-spinner mx-auto"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
} 