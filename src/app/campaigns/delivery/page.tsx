'use client'; // 클라이언트 컴포넌트로 변경

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CampaignCard from '@/components/campaigns/CampaignCard'; // 클라이언트 컴포넌트에서 사용 가능
import CampaignFilters, { FilterOption } from '@/components/campaigns/CampaignFilters';
import { getCampaigns, GetCampaignsParams } from '@/lib/api/campaigns'; // API 호출 함수 사용
import type { Campaign } from '@/types/campaign';
import { useToast } from '@/contexts/ToastContext';
import Pagination from '@/components/Pagination';
import { Skeleton } from '@/components/ui/Skeleton';
import CampaignLayout from '@/components/campaigns/CampaignLayout'; // Layout은 유지
import CampaignSidebar from '@/components/campaigns/CampaignSidebar'; // Sidebar 유지

// CurrentFilters 인터페이스 정의 (delivery/page.tsx 와 동일하게)
interface CurrentFilters extends Omit<GetCampaignsParams, 'page' | 'limit' | 'type'> {
    priceRange?: string;
}

// 페이지 컴포넌트: 데이터를 가져오고 하위 컴포넌트에 전달
export default function CampaignsDeliveryPage() {
    // 이 부분은 서버에서 데이터를 미리 가져와서 전달하는 방식으로 변경될 수 있음
    // 예시: 서버 컴포넌트에서 getDeliveryPageData 호출 후 props로 전달
    // const initialData = await getDeliveryPageData(); 
    
    // 여기서는 클라이언트에서 모든 것을 처리하는 방식으로 구현
    const [sidebarData, setSidebarData] = useState({ categories: [], cities: [], districts: [] });

    useEffect(() => {
        // 필요시 사이드바 데이터 로드 (예: 카테고리 목록)
        const loadSidebarData = async () => {
            // TODO: 카테고리 등 사이드바 데이터 API 호출 또는 정적 데이터 사용
            // const categories = await fetchCategories('delivery');
            // setSidebarData({ categories, cities: [], districts: [] });
        };
        loadSidebarData();
    }, []);

    return (
        <CampaignLayout
            sidebar={
                <CampaignSidebar
                    type="delivery"
                    categories={sidebarData.categories} // 로드된 데이터 사용
                    cities={sidebarData.cities}
                    districts={sidebarData.districts}
                />
            }
        >
            <div className="space-y-6">
                <h1 className="text-2xl font-bold">배송 캠페인</h1>
                {/* 캠페인 목록 표시 컴포넌트 분리 */}
                <DeliveryCampaignsContent /> 
            </div>
        </CampaignLayout>
    );
}

// 캠페인 목록 및 필터링 로직 컴포넌트
function DeliveryCampaignsContent() {
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
                // type: 'delivery' // API 호출 시 type 불필요
                // deliveryCategoryId_not: null // 이렇게 필터링해야 할 수도 있음 (API 수정 필요)
            });
            // TODO: transformApiCampaign 수정 후 as any 제거
            setCampaigns(response.campaigns as any);
            setTotalPages(response.totalPages);
            setTotalItems(response.totalItems);
        } catch (err: any) {
            console.error('Failed to load delivery campaigns:', err);
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
        // 현재 경로가 /campaigns/delivery 이므로 그대로 사용
        router.push(`/campaigns/delivery?${params.toString()}`); 
        setPage(1);
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        window.scrollTo(0, 0);
    };

    return (
        <>
            <CampaignFilters 
                type="delivery" 
                onFiltersChange={handleFiltersChange} 
                // 사이드바와 동일한 데이터 또는 필요한 필터 옵션 전달
            />
            
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