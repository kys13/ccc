'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import type { Campaign } from '@/types/campaign';
import Link from 'next/link';

interface CampaignListResponse {
    campaigns: Campaign[];
    total: number;
    page: number;
    totalPages: number;
}

export default function AdminCampaigns() {
    const [data, setData] = useState<CampaignListResponse>({
        campaigns: [],
        total: 0,
        page: 1,
        totalPages: 0
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedStatus, setSelectedStatus] = useState<string>('');
    const { isAdmin } = useAuth();
    const router = useRouter();
    const { showToast } = useToast();

    const fetchCampaigns = async () => {
        try {
            setIsLoading(true);

            const response = await fetch(`/api/admin/campaigns?page=${currentPage}&status=${selectedStatus}`);

            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('관리자 권한이 필요합니다.');
                }
                throw new Error('Failed to fetch campaigns');
            }

            const responseData = await response.json();
            setData(responseData);
        } catch (err: any) {
            setError(err.message || '캠페인 목록을 불러오는데 실패했습니다.');
            console.error('Campaign fetch error:', err);
            showToast('캠페인 목록을 불러오는데 실패했습니다.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isAdmin) {
            fetchCampaigns();
        } else {
            router.push('/admin/login');
        }
    }, [isAdmin, currentPage, selectedStatus]);

    const handleDelete = async (id: number) => {
        if (!window.confirm('정말로 이 캠페인을 삭제하시겠습니까?')) {
            return;
        }

        try {
            const response = await fetch(`/api/admin/campaigns/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete campaign');
            }

            showToast('캠페인이 삭제되었습니다.', 'success');
            fetchCampaigns();
        } catch (err: any) {
            showToast(err.message || '캠페인 삭제에 실패했습니다.', 'error');
            console.error('Campaign delete error:', err);
        }
    };

    const handleStatusChange = async (campaignId: number, status: string) => {
        try {
            const response = await fetch(`/api/admin/campaigns/${campaignId}`, {
                method: 'PATCH',
                body: JSON.stringify({ status }),
            });

            if (!response.ok) {
                throw new Error('Failed to update campaign status');
            }

            showToast('캠페인 상태가 업데이트되었습니다.', 'success');
            fetchCampaigns();
        } catch (error: any) {
            showToast(error.message || '상태 업데이트에 실패했습니다.', 'error');
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getStatusBadgeClass = (status: string) => {
        switch (status) {
            case 'ONGOING':
                return 'bg-green-100 text-green-800';
            case 'COMPLETED':
                return 'bg-blue-100 text-blue-800';
            case 'PENDING':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'ONGOING':
                return '진행중';
            case 'COMPLETED':
                return '완료';
            case 'PENDING':
                return '대기중';
            default:
                return '알 수 없음';
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">캠페인 관리</h1>
                <Link
                    href="/admin/campaigns/create"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    새 캠페인 생성
                </Link>
            </div>

            <div className="mb-4">
                <select
                    value={selectedStatus}
                    onChange={(e) => {
                        setSelectedStatus(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="mt-1 block w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                    <option value="">모든 상태</option>
                    <option value="PENDING">대기중</option>
                    <option value="ONGOING">진행중</option>
                    <option value="COMPLETED">완료</option>
                </select>
            </div>

            <div className="bg-white shadow overflow-hidden rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                제목
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                유형/카테고리
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                상태
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                기간
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                참여현황
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                관리
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.campaigns.map((campaign) => (
                            <tr key={campaign.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        {campaign.title}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        리워드: {campaign.reward.toLocaleString()}원
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {campaign.visitCategory ? '방문 체험' : '배송 체험'}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {campaign.visitCategory?.name || campaign.deliveryCategory?.name}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(campaign.status)}`}>
                                        {getStatusText(campaign.status)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {formatDate(campaign.startDate)}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        ~ {formatDate(campaign.endDate)}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {campaign.currentParticipants}/{campaign.maxParticipants}명
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Link
                                        href={`/admin/campaigns/${campaign.id}/edit`}
                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                    >
                                        수정
                                    </Link>
                                    <button
                                        onClick={() => handleStatusChange(campaign.id, campaign.status === 'ONGOING' ? 'COMPLETED' : 'ONGOING')}
                                        className="text-gray-600 hover:text-gray-900"
                                    >
                                        {campaign.status === 'ONGOING' ? '종료하기' : '시작하기'}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(campaign.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        삭제
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {data.totalPages > 1 && (
                <div className="flex justify-center mt-6">
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                        {Array.from({ length: data.totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
                                    ${page === currentPage
                                        ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                    </nav>
                </div>
            )}
        </div>
    );
} 