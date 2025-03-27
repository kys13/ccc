'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import CampaignCard from '@/components/campaigns/CampaignCard';
import CampaignFilters from '@/components/campaigns/CampaignFilters';
import { getCampaigns } from '@/lib/api/campaigns';
import type { Campaign } from '@/types';
import Pagination from '@/components/Pagination';

export default function CampaignsPage() {
    const searchParams = useSearchParams();
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const loadCampaigns = async () => {
        try {
            setLoading(true);
            const response = await getCampaigns({
                category: searchParams?.get('category') || undefined,
                status: searchParams?.get('status') || undefined,
                region: searchParams?.get('region') || undefined,
                sns_type: searchParams?.get('sns_type') || undefined,
                sort: searchParams?.get('sort') as 'latest' | 'deadline' | 'popular' | undefined,
                page,
                limit: 12
            });
            setCampaigns(response.campaigns);
            setTotalPages(response.totalPages);
            setTotalItems(response.totalItems);
        } catch (err) {
            setError('캠페인 목록을 불러오는데 실패했습니다.');
            console.error('Load campaigns error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCampaigns();
    }, [searchParams, page]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        loadCampaigns();
    };

    const resetFilters = () => {
        // Implement the logic to reset filters
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-red-600">{error}</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col gap-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <CampaignFilters onFilterChange={loadCampaigns} />
                </div>

                <div className="flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-gray-900">
                            캠페인 목록 ({totalItems}개)
                        </h2>
                        <div className="flex items-center gap-4">
                            {/* ... existing sort options ... */}
                        </div>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {[...Array(8)].map((_, index) => (
                                <div key={index} className="animate-pulse">
                                    <div className="bg-gray-200 rounded-lg aspect-[4/3]"></div>
                                    <div className="mt-4 space-y-3">
                                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : campaigns.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                            <p className="text-lg">검색 결과가 없습니다.</p>
                            <button
                                onClick={resetFilters}
                                className="mt-4 px-4 py-2 text-sm text-[#FF5C35] border border-[#FF5C35] rounded-lg hover:bg-[#FF5C35]/5 transition-colors"
                            >
                                필터 초기화
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {campaigns.map((campaign) => (
                                    <CampaignCard
                                        key={campaign.id}
                                        campaign={campaign}
                                    />
                                ))}
                            </div>
                            
                            {totalPages > 1 && (
                                <div className="mt-8 flex justify-center">
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
} 