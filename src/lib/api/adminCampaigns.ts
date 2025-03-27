import type { Campaign } from '@/types/campaign';

const API_URL = '/api/admin';

interface CampaignCreateData {
    type: 'visit' | 'delivery';
    title: string;
    description: string;
    category: string;
    region?: string;
    district?: string;
    snsTypes: string[];
    reward: number;
    maxParticipants: number;
    requirements: string;
    startDate: string;
    endDate: string;
    status: 'ONGOING' | 'COMPLETED' | 'PENDING';
}

interface CampaignUpdateData extends Partial<CampaignCreateData> {
    id: number;
}

interface CampaignListResponse {
    campaigns: Campaign[];
    total: number;
    page: number;
    totalPages: number;
}

export async function getAdminCampaigns(
    page = 1,
    limit = 10,
    status?: string
): Promise<CampaignListResponse> {
    const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(status && { status })
    });

    const response = await fetch(`${API_URL}/campaigns?${params}`);

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Failed to fetch campaigns' }));
        throw new Error(error.message || 'Failed to fetch campaigns');
    }

    return response.json();
}

export async function createCampaign(data: CampaignCreateData): Promise<Campaign> {
    const response = await fetch(`${API_URL}/campaigns`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create campaign');
    }

    return response.json();
}

export async function updateCampaign(data: CampaignUpdateData): Promise<Campaign> {
    const response = await fetch(`${API_URL}/campaigns/${data.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update campaign');
    }

    return response.json();
}

export async function deleteCampaign(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/campaigns/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete campaign');
    }
}

export async function getCampaignById(id: number): Promise<Campaign> {
    const response = await fetch(`${API_URL}/campaigns/${id}`);

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch campaign');
    }

    return response.json();
} 