export interface User {
    id: number;
    email: string;
    name: string;
    role: 'user' | 'admin';
    profileImage?: string;
    sns: {
        platform: string;
        handle: string;
    }[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Campaign {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    reward: number;
    maxParticipants: number;
    currentParticipants: number;
    startDate: Date;
    endDate: Date;
    status: 'draft' | 'active' | 'completed' | 'cancelled';
    requirements: Record<string, any>;
    reviewTemplate?: Record<string, any>;
    snsTypes: string[];
    campaignType: 'visit' | 'delivery';
    client: {
        id: number;
        name: string;
        companyName: string;
    };
    location?: {
        city: string;
        district: string;
    };
    visitCategory?: {
        id: number;
        name: string;
    };
    deliveryCategory?: {
        id: number;
        name: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

export interface Review {
    id: number;
    userId: number;
    campaignId: number;
    rating: number;
    title: string;
    content: string;
    media: string[];
    status: 'pending' | 'approved' | 'rejected';
    user: {
        name: string;
        sns: {
            platform: string;
            handle: string;
        }[];
    };
    createdAt: string;
    updatedAt: string;
} 