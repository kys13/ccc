export interface Campaign {
    id: number;
    title: string;
    description: string;
    imageUrl?: string | null;
    reward: number;
    maxParticipants: number;
    currentParticipants: number;
    startDate: string | Date;
    endDate: string | Date;
    locationData?: any | null;
    snsTypes: string[];
    requirements: string;
    reviewTemplate?: string | null;
    status: string;
    isVisible: boolean;
    showPopular?: boolean;
    showDeadline?: boolean;
    showLatest?: boolean;
    createdAt: string | Date;
    updatedAt: string | Date;
    visitCategoryId?: number | null;
    deliveryCategoryId?: number | null;
    locationId?: number | null;
    categories?: { id: number; name: string }[];
    isBookmarked?: boolean;
    locationCity?: string;
    locationDistrict?: string;
    categoryNames?: string[];
}

export interface CampaignFilters {
    category?: string;
    status?: string;
    region?: string;
    sns_type?: string;
    sort?: 'latest' | 'deadline' | 'popular';
    page?: number;
    limit?: number;
}

export interface CampaignResponse {
    campaigns: Campaign[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
} 