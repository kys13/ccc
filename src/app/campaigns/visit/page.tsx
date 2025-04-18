'use client'; // 클라이언트 컴포넌트로 변경

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CampaignCard from '@/components/campaigns/CampaignCard';
import CampaignFilters, { FilterOption } from '@/components/campaigns/CampaignFilters';
import { getCampaigns, GetCampaignsParams } from '@/lib/api/campaigns';
import type { Campaign } from '@/types/campaign';
import { useToast } from '@/contexts/ToastContext';
import { Clock, Flame, Sparkles, MapPin, Users, Calendar, Gift } from 'lucide-react'; // 기존 아이콘 유지
import Pagination from '@/components/Pagination';
import { Skeleton } from '@/components/ui/Skeleton';
import CampaignLayout from '@/components/campaigns/CampaignLayout';
import CampaignSidebar from '@/components/campaigns/CampaignSidebar';

// CurrentFilters 인터페이스 정의
interface CurrentFilters extends Omit<GetCampaignsParams, 'page' | 'limit' | 'type'> {}

// 페이지 컴포넌트
export default function CampaignsVisitPage() {
    const [sidebarData, setSidebarData] = useState({ categories: [], cities: [], districts: [] });

    useEffect(() => {
        // TODO: 사이드바 데이터 로드 (카테고리 등)
        const loadSidebarData = async () => {
            // const categories = await fetchCategories('visit');
            // setSidebarData({ categories, cities: [], districts: [] });
        };
        loadSidebarData();
    }, []);

    return (
        <CampaignLayout
            sidebar={
                <CampaignSidebar
                    type="visit"
                    categories={sidebarData.categories}
                    cities={sidebarData.cities}
                    districts={sidebarData.districts}
                />
            }
        >
            <div className="space-y-6">
                <h1 className="text-2xl font-bold">방문 캠페인</h1>
                <VisitCampaignsContent />
            </div>
        </CampaignLayout>
    );
}

// 캠페인 목록 및 필터링 로직 컴포넌트
function VisitCampaignsContent() {
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
            // visit 페이지 고유 필터 추가 (예: minReward, maxReward)
            minReward: searchParams?.get('minReward') ? Number(searchParams.get('minReward')) : undefined,
            maxReward: searchParams?.get('maxReward') ? Number(searchParams.get('maxReward')) : undefined,
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
                // type: 'visit' // API 호출 시 type 불필요
                // visitCategoryId_not: null // 이렇게 필터링해야 할 수도 있음 (API 수정 필요)
            });
            // TODO: transformApiCampaign 수정 후 as any 제거
            setCampaigns(response.campaigns as any);
            setTotalPages(response.totalPages);
            setTotalItems(response.totalItems);
        } catch (err: any) {
            console.error('Failed to load visit campaigns:', err);
            setError('캠페인 목록 로딩 실패');
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
        router.push(`/campaigns/visit?${params.toString()}`); // 경로 수정
        setPage(1);
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        window.scrollTo(0, 0);
    };
    
    const currentFiltersForProps = getCurrentFilters();

    // 정렬 버튼 클릭 핸들러 (visit/page.tsx 와 동일하게)
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
        <>
            <CampaignFilters 
                type="visit" 
                onFiltersChange={handleFiltersChange} 
                // 필요한 필터 옵션 데이터 전달
            />
            
            {/* 정렬 버튼 등 추가 UI 요소 */}
            <div className="flex items-center space-x-4 my-6">
                <button onClick={() => handleSortChange('latest')} /* ... */>최신순</button>
                <button onClick={() => handleSortChange('deadline')} /* ... */>마감임박순</button>
                <button onClick={() => handleSortChange('popular')} /* ... */>인기순</button>
            </div>

            <div className="mt-8">
                {loading && page === 1 ? (
                    <CampaignsSkeleton />
                ) : error ? (
                    <div className="text-center py-10 text-red-600">{error}</div>
                ) : campaigns.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {campaigns.map(campaign => (
                                <CampaignCard key={campaign.id} campaign={campaign} />
                            ))}
                        </div>
                        {loading && page > 1 && <div className="text-center py-4">...</div>}
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
        </>
    );
}

function CampaignsSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <Skeleton className="h-48 w-full" />
                    <div className="p-4 space-y-4">
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                </div>
            ))}
        </div>
    );
} 