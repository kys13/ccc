import type { CampaignApplication } from './application';
import type { Review } from '@prisma/client';

export interface User {
    id: string;
    email: string;
    name: string;
    role: string;
    image?: string;
    sns: {
        platform: string;
        handle: string;
    }[];
    createdAt: string;
    updatedAt: string;
}

export interface Campaign {
    id: number;
    title: string;
    description: string;
    imageUrl: string | null;
    reward: number;
    maxParticipants: number;
    currentParticipants: number;
    startDate: string;
    endDate: string;
    locationData: any | null;
    snsTypes: string[];
    requirements: string;
    reviewTemplate?: string | null;
    status: string;
    isVisible: boolean;
    showPopular?: boolean;
    showDeadline?: boolean;
    showLatest?: boolean;
    createdAt: string;
    updatedAt: string;
    
    
    visitCategoryId?: number | null;
    deliveryCategoryId?: number | null;
    locationId?: number | null;
    categories?: { id: number; name: string }[];

    isBookmarked?: boolean; 
    locationCity?: string;
    locationDistrict?: string;
    categoryNames?: string[];

    applications?: CampaignApplication[]; 
    reviews?: Review[];
} 