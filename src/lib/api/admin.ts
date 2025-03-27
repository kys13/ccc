import type { User } from '@/types/user';

const API_URL = '/api';

interface AdminLoginResponse {
    token: string;
    user: User & { role: string };
}

interface AdminLoginData {
    email: string;
    password: string;
}

interface AdminCreateData {
    email: string;
    password: string;
    name: string;
}

interface PasswordChangeData {
    currentPassword: string;
    newPassword: string;
}

export async function adminLogin(data: AdminLoginData): Promise<AdminLoginResponse> {
    const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || '로그인에 실패했습니다.');
    }

    return response.json();
}

export async function getAdmins(): Promise<User[]> {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Authentication required');
    }

    const response = await fetch(`${API_URL}/admin/admins`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch admins');
    }

    return response.json();
}

export async function addAdmin(data: AdminCreateData): Promise<User> {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Authentication required');
    }

    const response = await fetch(`${API_URL}/admin/admins`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to add admin');
    }

    return response.json();
}

export async function removeAdmin(id: number): Promise<void> {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Authentication required');
    }

    const response = await fetch(`${API_URL}/admin/admins/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to remove admin');
    }
}

export async function changePassword(data: PasswordChangeData): Promise<void> {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Authentication required');
    }

    const response = await fetch(`${API_URL}/admin/password`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to change password');
    }
} 