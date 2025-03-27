import { User } from '@/types/user';

interface UserListResponse {
    users: User[];
    total: number;
    page: number;
    totalPages: number;
}

interface UserStats {
    totalUsers: number;
    activeUsers: number;
    inactiveUsers: number;
}

interface UserUpdateData {
    id: number;
    name?: string;
    email?: string;
    role?: 'USER' | 'ADMIN';
    status?: 'ACTIVE' | 'INACTIVE';
}

export async function getUsers(
    page: number = 1,
    limit: number = 10,
    search?: string,
    role?: string,
    status?: string
): Promise<UserListResponse> {
    const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search }),
        ...(role && { role }),
        ...(status && { status })
    });

    const response = await fetch(`/api/admin/users?${params}`);

    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }

    return response.json();
}

export async function getUserById(id: number): Promise<User> {
    const response = await fetch(`/api/admin/users/${id}`);

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch user');
    }

    return response.json();
}

export async function updateUser(data: UserUpdateData): Promise<User> {
    const response = await fetch(`/api/admin/users/${data.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update user');
    }

    return response.json();
}

export async function deleteUser(id: number): Promise<void> {
    const response = await fetch(`/api/admin/users/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete user');
    }
}

export async function getUserStats(): Promise<UserStats> {
    const response = await fetch('/api/admin/users/stats');

    if (!response.ok) {
        throw new Error('Failed to fetch user statistics');
    }

    return response.json();
} 