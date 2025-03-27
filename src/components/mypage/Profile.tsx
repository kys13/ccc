import React, { useState } from 'react';
import { updateProfile } from '@/lib/api/users';
import type { User } from '@/types/user';

interface ProfileProps {
    user: User;
    onUpdate: (user: User) => void;
}

export default function Profile({ user, onUpdate }: ProfileProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(user);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const updatedUser = await updateProfile(formData);
            onUpdate(updatedUser);
            setIsEditing(false);
        } catch (err) {
            setError('프로필 수정에 실패했습니다.');
            console.error('Update profile error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    if (!isEditing) {
        return (
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">프로필 정보</h2>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="text-indigo-600 hover:text-indigo-800"
                    >
                        수정
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <div className="text-sm text-gray-500">이메일</div>
                        <div>{user.email}</div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-500">이름</div>
                        <div>{user.name}</div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-500">연락처</div>
                        <div>{user.phone || '-'}</div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-500">지역</div>
                        <div>{user.region || '-'}</div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-500">SNS</div>
                        <div>{user.sns_type ? `${user.sns_type} - ${user.sns_url}` : '-'}</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">프로필 수정</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        이메일
                    </label>
                    <input
                        type="email"
                        value={formData.email}
                        disabled
                        className="w-full px-3 py-2 border rounded-md bg-gray-50"
                    />
                </div>

                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        이름
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        연락처
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone || ''}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>

                <div>
                    <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
                        지역
                    </label>
                    <select
                        id="region"
                        name="region"
                        value={formData.region || ''}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md"
                    >
                        <option value="">선택</option>
                        <option value="seoul">서울</option>
                        <option value="gyeonggi">경기</option>
                        <option value="incheon">인천</option>
                        <option value="busan">부산</option>
                        <option value="daegu">대구</option>
                        <option value="daejeon">대전</option>
                        <option value="gwangju">광주</option>
                        <option value="ulsan">울산</option>
                        <option value="sejong">세종</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="sns_type" className="block text-sm font-medium text-gray-700 mb-1">
                        SNS 유형
                    </label>
                    <select
                        id="sns_type"
                        name="sns_type"
                        value={formData.sns_type || ''}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md"
                    >
                        <option value="">선택</option>
                        <option value="instagram">Instagram</option>
                        <option value="youtube">YouTube</option>
                        <option value="tiktok">TikTok</option>
                        <option value="blog">Blog</option>
                    </select>
                </div>

                {formData.sns_type && (
                    <div>
                        <label htmlFor="sns_url" className="block text-sm font-medium text-gray-700 mb-1">
                            SNS 주소
                        </label>
                        <input
                            type="url"
                            id="sns_url"
                            name="sns_url"
                            value={formData.sns_url || ''}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                )}

                {error && (
                    <div className="text-red-600" role="alert">
                        {error}
                    </div>
                )}

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 border rounded-md hover:bg-gray-50"
                        disabled={isLoading}
                    >
                        취소
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700
                                 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isLoading}
                    >
                        {isLoading ? '저장 중...' : '저장'}
                    </button>
                </div>
            </form>
        </div>
    );
} 