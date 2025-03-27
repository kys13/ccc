import type { Campaign as CampaignType } from '@/types';
import { config } from '@/lib/config';
import { campaignCache } from '../cache';
import { handleResponse, APIError } from './error';

const API_URL = config.apiUrl;

export interface Campaign {
    id: number;
    title: string;
    description: string;
    category: string;
    sub_category?: string;
    reward_amount: number;
    deadline: string;
    total_slots: number;
    remaining_slots: number;
    status: string;
    region?: string;
    sns_type?: string;
    image_url?: string;
    created_at: string;
    updated_at: string;
}

interface CampaignFilters {
    category?: string;
    status?: string;
    region?: string;
    sns_type?: string;
    sort?: 'latest' | 'deadline' | 'popular';
    page?: number;
    limit?: number;
}

interface CampaignResponse {
    campaigns: CampaignType[];
    total: number;
    page: number;
    totalPages: number;
}

interface GetCampaignsParams {
    page?: number;
    limit?: number;
    sort?: string;
    search?: string;
    category?: string;
    location?: string;
    snsType?: string;
    status?: string;
    minReward?: number;
    maxReward?: number;
}

interface CampaignsResponse {
    campaigns: Campaign[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

// 캠페인 목록 조회
export async function getCampaigns(params: GetCampaignsParams = {}): Promise<CampaignsResponse> {
    const queryString = new URLSearchParams(
        Object.entries(params)
            .filter(([_, value]) => value !== undefined)
            .map(([key, value]) => [key, String(value)])
    ).toString();

    const cacheKey = `campaigns:${queryString}`;
    const cachedData = campaignCache.get<CampaignsResponse>(cacheKey);
    
    if (cachedData) {
        return cachedData;
    }

    try {
        const response = await fetch(`${API_URL}/api/campaigns?${queryString}`);
        const data = await handleResponse<CampaignsResponse>(response);
        
        campaignCache.set(cacheKey, data);
        return data;
    } catch (error) {
        throw error;
    }
}

// 캠페인 상세 조회
export async function getCampaign(id: string): Promise<Campaign> {
    const cacheKey = `campaign:${id}`;
    const cachedData = campaignCache.get<Campaign>(cacheKey);
    
    if (cachedData) {
        return cachedData;
    }

    try {
        const response = await fetch(`${API_URL}/campaigns/${id}`);
        const data = await handleResponse<Campaign>(response);
        
        campaignCache.set(cacheKey, data);
        return data;
    } catch (error) {
        throw error;
    }
}

// 캠페인 신청
export async function applyCampaign(campaignId: string, data: any): Promise<void> {
    try {
        const response = await fetch(`${API_URL}/campaigns/${campaignId}/apply`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        await handleResponse(response);
        
        // 캐시 무효화
        campaignCache.delete(`campaign:${campaignId}`);
        Object.keys(campaignCache).forEach(key => {
            if (key.startsWith('campaigns:')) {
                campaignCache.delete(key);
            }
        });
    } catch (error) {
        throw error;
    }
}

// 북마크 토글
export async function toggleBookmark(campaignId: string): Promise<void> {
    try {
        const response = await fetch(`${API_URL}/campaigns/${campaignId}/bookmark`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        await handleResponse(response);
        
        // 캐시 무효화
        campaignCache.delete(`campaign:${campaignId}`);
        Object.keys(campaignCache).forEach(key => {
            if (key.startsWith('campaigns:')) {
                campaignCache.delete(key);
            }
        });
    } catch (error) {
        throw error;
    }
}

// 캠페인 데이터 프리페칭
export function prefetchCampaign(id: string): void {
    const cacheKey = `campaign:${id}`;
    if (!campaignCache.has(cacheKey)) {
        getCampaign(id).catch(() => {
            // 프리페치 실패는 무시
        });
    }
}

// 캠페인 목록 프리페칭
export function prefetchCampaigns(params: GetCampaignsParams = {}): void {
    const queryString = new URLSearchParams(
        Object.entries(params)
            .filter(([_, value]) => value !== undefined)
            .map(([key, value]) => [key, String(value)])
    ).toString();

    const cacheKey = `campaigns:${queryString}`;
    if (!campaignCache.has(cacheKey)) {
        getCampaigns(params).catch(() => {
            // 프리페치 실패는 무시
        });
    }
}

export type { CampaignFilters, CampaignResponse }; 