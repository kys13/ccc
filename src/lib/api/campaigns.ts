import type { Campaign } from '@/types';
import { config } from '@/lib/config';
import { campaignCache } from '../cache';
import { handleResponse, APIError } from './error';
import type { Location, VisitCategory, DeliveryCategory, CampaignCategory, CampaignApplication, Review } from '@prisma/client'; // Prisma 타입 임포트 추가

const API_URL = config.apiUrl;

// API 응답 형태를 나타내는 인터페이스 (실제 API 스펙에 맞게 조정 필요)
interface ApiCampaign {
    id: number;
    title: string;
    description: string;
    category?: string;
    sub_category?: string;
    reward_amount: number;
    deadline: string;
    total_slots: number;
    remaining_slots?: number;
    status: string;
    region?: string;
    sns_type?: string[];
    image_url?: string;
    created_at: string;
    updated_at: string;
    is_bookmarked?: boolean;
}

interface ApiPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

interface CampaignsApiResponse {
    campaigns: ApiCampaign[];
    pagination: ApiPagination;
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
    campaigns: Campaign[];
    total: number;
    page: number;
    totalPages: number;
}

// 파라미터 및 결과 타입 인터페이스
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
    region?: string;
}

interface GetCampaignsResult {
    campaigns: Campaign[];
    totalPages: number;
    totalItems: number;
}

// API 응답 -> 통합 Campaign 타입 변환 함수
function transformApiCampaign(apiCampaign: ApiCampaign): Campaign {
    const currentParticipants = apiCampaign.total_slots - (apiCampaign.remaining_slots ?? apiCampaign.total_slots);
    // location: 스키마 기반으로 Location 타입 생성
    const location = apiCampaign.region ? { id: 0, city: apiCampaign.region, district: '', address: 'temp_address_' + Math.random(), createdAt: new Date(), updatedAt: new Date() } : undefined;
    // visitCategory: 스키마 기반으로 VisitCategory 타입 생성
    const visitCategory = apiCampaign.category === '맛집' || apiCampaign.category === '카페' ? { id: 0, name: apiCampaign.category, description: null, createdAt: new Date(), updatedAt: new Date() } : null;
    // deliveryCategory: 스키마 기반으로 DeliveryCategory 타입 생성
    const deliveryCategory = apiCampaign.category === '식품' || apiCampaign.category === '뷰티' ? { id: 0, name: apiCampaign.category, description: null, createdAt: new Date(), updatedAt: new Date() } : null;
    // categories: CampaignCategory 타입에 맞게 수정
    const categories: CampaignCategory[] = apiCampaign.category ? [{
        id: 0, 
        name: apiCampaign.category, 
        createdAt: new Date(), 
        updatedAt: new Date()
    }] : []; 
    const campaignType = visitCategory ? 'visit' : (deliveryCategory ? 'delivery' : undefined);

    return {
        id: apiCampaign.id,
        title: apiCampaign.title,
        description: apiCampaign.description,
        imageUrl: apiCampaign.image_url || null,
        reward: apiCampaign.reward_amount,
        maxParticipants: apiCampaign.total_slots,
        currentParticipants: currentParticipants,
        startDate: new Date().toISOString(),
        endDate: new Date(apiCampaign.deadline).toISOString(),
        locationData: null, // 스키마에 정의됨 (Json?)
        snsTypes: apiCampaign.sns_type || [],
        requirements: '', // 기본값
        reviewTemplate: null, // 스키마에 정의됨 (String?)
        status: (apiCampaign.status?.toUpperCase() || 'PENDING') as Campaign['status'],
        isVisible: true, // 기본값
        showPopular: false, // 기본값
        showDeadline: false, // 기본값
        showLatest: false, // 기본값
        createdAt: new Date(apiCampaign.created_at).toISOString(),
        updatedAt: new Date(apiCampaign.updated_at).toISOString(),
        is_bookmarked: apiCampaign.is_bookmarked || false, // Campaign 타입에는 없음, 필요시 추가
        locationId: location?.id ?? null,
        visitCategoryId: visitCategory?.id ?? null,
        deliveryCategoryId: deliveryCategory?.id ?? null,
        // 관계 필드 (타입에 맞게 생성)
        location: location,
        visitCategory: visitCategory,
        deliveryCategory: deliveryCategory,
        categories: categories,
        applications: [],
        reviews: [],
        notifications: [], // 스키마에 정의됨, 기본값
        seo: null, // 스키마에 정의됨, 기본값
        // campaignType 필드는 Campaign 모델에 없음
    };
}

// 캠페인 목록 조회
export async function getCampaigns(params: GetCampaignsParams = {}): Promise<GetCampaignsResult> {
    const queryString = new URLSearchParams(
        Object.entries(params)
            .filter(([_, value]) => value !== undefined)
            .map(([key, value]) => [key, String(value)])
    ).toString();

    const cacheKey = `campaigns:${queryString}`;
    const cachedData = campaignCache.get<GetCampaignsResult>(cacheKey); // 캐시 타입 GetCampaignsResult로 변경
    
    if (cachedData) {
        return cachedData;
    }

    try {
        const response = await fetch(`${API_URL}/api/campaigns?${queryString}`);
        const data = await handleResponse<CampaignsApiResponse>(response);
        
        const transformedCampaigns = data.campaigns.map(transformApiCampaign);
        
        const result: GetCampaignsResult = {
            campaigns: transformedCampaigns,
            totalPages: data.pagination.totalPages,
            totalItems: data.pagination.total
        };

        campaignCache.set(cacheKey, result);
        return result;
    } catch (error) {
        console.error('Error fetching campaigns:', error);
        // 에러 발생 시 빈 배열과 기본 페이지네이션 정보 반환 또는 에러 throw
        return { campaigns: [], totalPages: 1, totalItems: 0 }; 
        // 또는 throw new APIError('캠페인 목록 조회 실패');
    }
}

// 캠페인 상세 조회 (변환 적용)
export async function getCampaign(id: string): Promise<Campaign> {
    const cacheKey = `campaign:${id}`;
    const cachedData = campaignCache.get<Campaign>(cacheKey);
    
    if (cachedData) {
        return cachedData;
    }

    try {
        const response = await fetch(`${API_URL}/campaigns/${id}`);
        const apiCampaign = await handleResponse<ApiCampaign>(response);
        const transformedCampaign = transformApiCampaign(apiCampaign);
        
        campaignCache.set(cacheKey, transformedCampaign);
        return transformedCampaign;
    } catch (error) {
        console.error(`Error fetching campaign ${id}:`, error);
        throw error; // 상세 조회 실패는 에러 throw
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

// 캠페인 목록 프리페칭 (캐시 타입 확인)
export function prefetchCampaigns(params: GetCampaignsParams = {}): void {
    const queryString = new URLSearchParams(
        Object.entries(params)
            .filter(([_, value]) => value !== undefined)
            .map(([key, value]) => [key, String(value)])
    ).toString();

    const cacheKey = `campaigns:${queryString}`;
    if (!campaignCache.has(cacheKey)) {
        getCampaigns(params).then((data: GetCampaignsResult) => {
           // getCampaigns가 이미 캐시에 저장하므로 별도 작업 불필요
        }).catch(() => {
            // 프리페치 실패는 무시
        });
    }
}

export type { CampaignFilters, CampaignResponse, GetCampaignsParams, GetCampaignsResult, ApiCampaign }; 