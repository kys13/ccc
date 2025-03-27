'use client';

import React, { useEffect, useState } from 'react';
import type { User } from '@/types/user';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';

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

export default function AdminUsers() {
    const router = useRouter();
    const { isAdmin, token, checkAuth } = useAuth();
    const { showToast } = useToast();
    const [data, setData] = useState<UserListResponse>({
        users: [],
        total: 0,
        page: 1,
        totalPages: 0
    });
    const [stats, setStats] = useState<UserStats>({
        totalUsers: 0,
        activeUsers: 0,
        inactiveUsers: 0
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');

    useEffect(() => {
        const checkAdminAndFetch = async () => {
            if (!isAdmin || !token) {
                router.push('/admin/login');
                return;
            }
            await fetchData();
        };

        checkAdminAndFetch();
    }, [isAdmin, token, currentPage, searchTerm, selectedRole, selectedStatus]);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            if (!token) {
                throw new Error('인증 토큰이 없습니다.');
            }

            const [usersResponse, statsResponse] = await Promise.all([
                fetch(`/api/admin/users?page=${currentPage}&limit=10&search=${searchTerm}&role=${selectedRole}&status=${selectedStatus}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }),
                fetch('/api/admin/users/stats', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
            ]);

            if (!usersResponse.ok || !statsResponse.ok) {
                if (usersResponse.status === 401 || statsResponse.status === 401) {
                    await checkAuth();
                    throw new Error('인증이 필요합니다.');
                }
                throw new Error('Failed to fetch data');
            }

            const [usersData, statsData] = await Promise.all([
                usersResponse.json(),
                statsResponse.json()
            ]);

            setData(usersData);
            setStats(statsData);
        } catch (err: any) {
            setError(err.message || '데이터를 불러오는데 실패했습니다.');
            console.error('Users fetch error:', err);
            showToast(err.message || '데이터를 불러오는데 실패했습니다.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCurrentPage(1);
        fetchData();
    };

    const handleStatusChange = async (userId: number, newStatus: 'ACTIVE' | 'INACTIVE') => {
        if (!window.confirm('사용자의 상태를 변경하시겠습니까?')) {
            return;
        }

        try {
            if (!token) {
                throw new Error('인증 토큰이 없습니다.');
            }

            const response = await fetch(`/api/admin/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    await checkAuth();
                    throw new Error('인증이 필요합니다.');
                }
                throw new Error('Failed to update user status');
            }

            showToast('사용자 상태가 업데이트되었습니다.', 'success');
            fetchData();
        } catch (err: any) {
            showToast(err.message || '상태 업데이트에 실패했습니다.', 'error');
            console.error('Status update error:', err);
        }
    };

    const handleRoleChange = async (userId: number, newRole: 'USER' | 'ADMIN') => {
        if (!window.confirm('사용자의 권한을 변경하시겠습니까?')) {
            return;
        }

        try {
            if (!token) {
                throw new Error('인증 토큰이 없습니다.');
            }

            const response = await fetch(`/api/admin/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ role: newRole }),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    await checkAuth();
                    throw new Error('인증이 필요합니다.');
                }
                throw new Error('Failed to update user role');
            }

            showToast('사용자 권한이 업데이트되었습니다.', 'success');
            fetchData();
        } catch (err: any) {
            showToast(err.message || '권한 업데이트에 실패했습니다.', 'error');
            console.error('Role update error:', err);
        }
    };

    const handleDelete = async (userId: number) => {
        if (!window.confirm('정말로 이 사용자를 삭제하시겠습니까?')) {
            return;
        }

        try {
            if (!token) {
                throw new Error('인증 토큰이 없습니다.');
            }

            const response = await fetch(`/api/admin/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                if (response.status === 401) {
                    await checkAuth();
                    throw new Error('인증이 필요합니다.');
                }
                throw new Error('Failed to delete user');
            }

            showToast('사용자가 성공적으로 삭제되었습니다.', 'success');
            fetchData();
        } catch (err: any) {
            showToast(err.message || '사용자 삭제에 실패했습니다.', 'error');
            console.error('User delete error:', err);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-600 p-4">
                {error}
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">사용자 관리</h1>

            {/* 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-600">전체 사용자</h3>
                    <p className="text-3xl font-bold text-indigo-600">{stats.totalUsers}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-600">활성 사용자</h3>
                    <p className="text-3xl font-bold text-green-600">{stats.activeUsers}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-600">비활성 사용자</h3>
                    <p className="text-3xl font-bold text-red-600">{stats.inactiveUsers}</p>
                </div>
            </div>

            {/* 검색 및 필터 */}
            <div className="bg-white shadow rounded-lg mb-6">
                <div className="p-4">
                    <form onSubmit={handleSearch} className="flex gap-4">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="이름 또는 이메일로 검색"
                            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        <select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                            <option value="">모든 권한</option>
                            <option value="USER">일반 사용자</option>
                            <option value="ADMIN">관리자</option>
                        </select>
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                            <option value="">모든 상태</option>
                            <option value="ACTIVE">활성</option>
                            <option value="INACTIVE">비활성</option>
                        </select>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            검색
                        </button>
                    </form>
                </div>
            </div>

            {/* 사용자 목록 */}
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                사용자 정보
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                가입일
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                권한
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                상태
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                관리
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.users.map((user) => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user.id, e.target.value as 'USER' | 'ADMIN')}
                                        className="text-sm border-gray-300 rounded-md"
                                    >
                                        <option value="USER">일반 사용자</option>
                                        <option value="ADMIN">관리자</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                        ${user.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                                            'bg-red-100 text-red-800'}`}
                                    >
                                        {user.status === 'ACTIVE' ? '활성' : '비활성'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={() => handleStatusChange(user.id, user.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE')}
                                        className={`text-sm ${user.status === 'ACTIVE' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                                    >
                                        {user.status === 'ACTIVE' ? '비활성화' : '활성화'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 페이지네이션 */}
            {data.totalPages > 1 && (
                <div className="flex justify-center mt-6">
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                        {Array.from({ length: data.totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
                                    ${page === currentPage
                                        ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                    </nav>
                </div>
            )}
        </div>
    );
} 