import type { Campaign } from '@/types/campaign';
import type { User } from '@/types/user';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface PaginatedResponse<T> {
    campaigns: T[];
    total: number;
    page: number;
    totalPages: number;
}

export async function getBookmarkedCampaigns(page = 1, limit = 12): Promise<PaginatedResponse<Campaign>> {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Authentication required');
    }

    const response = await fetch(
        `${API_URL}/users/bookmarks?page=${page}&limit=${limit}`,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {
        throw new Error('Failed to fetch bookmarked campaigns');
    }

    return response.json();
}

export async function getAppliedCampaigns(page = 1, limit = 12): Promise<PaginatedResponse<Campaign & { application_status: string }>> {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Authentication required');
    }

    const response = await fetch(
        `${API_URL}/users/applications?page=${page}&limit=${limit}`,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {
        throw new Error('Failed to fetch applied campaigns');
    }

    return response.json();
}

export async function getProfile(): Promise<User> {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Authentication required');
    }

    const response = await fetch(
        `${API_URL}/users/profile`,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {
        throw new Error('Failed to fetch profile');
    }

    return response.json();
}

export async function updateProfile(data: Partial<User>): Promise<User> {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Authentication required');
    }

    const response = await fetch(
        `${API_URL}/users/profile`,
        {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    );

    if (!response.ok) {
        throw new Error('Failed to update profile');
    }

    return response.json();
} 