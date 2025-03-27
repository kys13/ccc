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
    reward: number;
    maxParticipants: number;
    currentParticipants: number;
    startDate: string;
    endDate: string;
    campaignType: 'visit' | 'delivery';
    snsTypes: string[];
    client: {
        name: string;
        companyName: string;
    };
    status?: string;
    location?: {
        city: string;
        district: string;
        address: string;
    };
} 