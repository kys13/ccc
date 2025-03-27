import React, { useState, useEffect } from 'react';
import { getAppliedCampaigns } from '@/lib/api/users';
import CampaignCard from '@/components/campaigns/CampaignCard';
import type { Campaign } from '@/types/campaign';

interface AppliedCampaign extends Campaign {
    application_status: 'pending' | 'approved' | 'rejected';
}

export default function AppliedCampaigns() {
    const [campaigns, setCampaigns] = useState<AppliedCampaign[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const loadCampaigns = async () => {
        try {
            setLoading(true);
            const response = await getAppliedCampaigns(page);
            setCampaigns(response.campaigns);
            setTotalPages(response.totalPages);
        } catch (err) {
            setError('신청한 캠페인 목록을 불러오는데 실패했습니다.');
            console.error('Load applied campaigns error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCampaigns();
    }, [page]);

    const getStatusBadgeClass = (status: string) => {
        switch (status) {
            case 'approved':
                return 'bg-green-100 text-green-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-yellow-100 text-yellow-800';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'approved':
                return '승인됨';
            case 'rejected':
                return '거절됨';
            default:
                return '검토중';
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <div className="text-red-600">{error}</div>
            </div>
        );
    }

    if (campaigns.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-[200px] text-gray-500">
                신청한 캠페인이 없습니다.
            </div>
        );
    }

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns.map(campaign => (
                    <div key={campaign.id} className="relative">
                        <div className="absolute top-4 right-4 z-10">
                            <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(campaign.application_status)}`}>
                                {getStatusText(campaign.application_status)}
                            </span>
                        </div>
                        <CampaignCard
                            campaign={campaign}
                            onBookmarkToggle={loadCampaigns}
                        />
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center mt-8 space-x-2">
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-4 py-2 border rounded-md disabled:opacity-50"
                    >
                        이전
                    </button>
                    <span className="px-4 py-2">
                        {page} / {totalPages}
                    </span>
                    <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="px-4 py-2 border rounded-md disabled:opacity-50"
                    >
                        다음
                    </button>
                </div>
            )}
        </div>
    );
} 