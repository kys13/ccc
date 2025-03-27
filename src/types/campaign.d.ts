export interface Campaign {
    id: number;
    title: string;
    description: string;
    image_url: string;
    category: string;
    status: 'ongoing' | 'upcoming' | 'completed';
    region: string;
    sns_type: string;
    reward_amount: number;
    deadline: string;
    max_applicants: number;
    current_applicants: number;
    created_at: string;
    updated_at: string;
    is_bookmarked?: boolean;
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