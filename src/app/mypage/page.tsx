'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import DaumPostcode from 'react-daum-postcode';

interface SnsAccount {
  id?: number;
  platform: 'INSTAGRAM' | 'YOUTUBE' | 'TIKTOK' | 'FACEBOOK' | 'BLOG';
  username: string;
  url?: string;
}

interface UserProfile {
  email: string;
  name: string;
  phoneNumber: string;
  userType: 'INDIVIDUAL' | 'BUSINESS';
  ssn?: string;
  businessNumber?: string;
  postcode: string;
  address: string;
  addressDetail: string;
  snsAccounts: SnsAccount[];
}

export default function MyPage() {
  const router = useRouter();
  const { user, isAuthenticated, token } = useAuth();
  const { showToast } = useToast();
  const [showPostcode, setShowPostcode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    fetchUserProfile();
  }, [isAuthenticated]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('/api/user/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('프로필을 불러오는데 실패했습니다.');
      }
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      showToast('프로필을 불러오는데 실패했습니다.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });

      if (!response.ok) {
        throw new Error('프로필 수정에 실패했습니다.');
      }

      showToast('프로필이 성공적으로 수정되었습니다.', 'success');
    } catch (error) {
      console.error('Error updating profile:', error);
      showToast('프로필 수정에 실패했습니다.', 'error');
    }
  };

  const handlePostcode = (data: any) => {
    if (!profile) return;
    setProfile({
      ...profile,
      postcode: data.zonecode,
      address: data.address,
    });
    setShowPostcode(false);
  };

  const addSnsAccount = () => {
    if (!profile) return;
    setProfile({
      ...profile,
      snsAccounts: [...profile.snsAccounts, { platform: 'INSTAGRAM', username: '', url: '' }],
    });
  };

  const updateSnsAccount = (index: number, field: keyof SnsAccount, value: string) => {
    if (!profile) return;
    const newAccounts = [...profile.snsAccounts];
    newAccounts[index] = { ...newAccounts[index], [field]: value };
    setProfile({ ...profile, snsAccounts: newAccounts });
  };

  const removeSnsAccount = (index: number) => {
    if (!profile) return;
    setProfile({
      ...profile,
      snsAccounts: profile.snsAccounts.filter((_, i) => i !== index),
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">프로필을 불러올 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">마이페이지</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">이메일</label>
              <input
                type="email"
                value={profile.email}
                disabled
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">회원 유형</label>
              <input
                type="text"
                value={profile.userType === 'INDIVIDUAL' ? '개인' : '사업자'}
                disabled
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">이름</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">휴대폰 번호</label>
              <input
                type="tel"
                value={profile.phoneNumber}
                onChange={(e) => setProfile({ ...profile, phoneNumber: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {profile.userType === 'INDIVIDUAL' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700">주민등록번호</label>
                <input
                  type="text"
                  value={profile.ssn || ''}
                  disabled
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm"
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700">사업자등록번호</label>
                <input
                  type="text"
                  value={profile.businessNumber || ''}
                  disabled
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">주소</label>
              <div className="mt-1 grid grid-cols-3 gap-3">
                <input
                  type="text"
                  value={profile.postcode}
                  placeholder="우편번호"
                  readOnly
                  className="col-span-2 block w-full rounded-md border-gray-300 shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPostcode(true)}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  주소 검색
                </button>
              </div>
              <input
                type="text"
                value={profile.address}
                placeholder="기본주소"
                readOnly
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
              />
              <input
                type="text"
                value={profile.addressDetail}
                onChange={(e) => setProfile({ ...profile, addressDetail: e.target.value })}
                placeholder="상세주소"
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">SNS 계정</label>
              <div className="mt-2 space-y-3">
                {profile.snsAccounts.map((account, index) => (
                  <div key={index} className="flex space-x-2">
                    <select
                      value={account.platform}
                      onChange={(e) => updateSnsAccount(index, 'platform', e.target.value as any)}
                      className="block w-1/4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      <option value="INSTAGRAM">Instagram</option>
                      <option value="YOUTUBE">YouTube</option>
                      <option value="TIKTOK">TikTok</option>
                      <option value="FACEBOOK">Facebook</option>
                      <option value="BLOG">Blog</option>
                    </select>
                    <input
                      type="text"
                      value={account.username}
                      onChange={(e) => updateSnsAccount(index, 'username', e.target.value)}
                      placeholder="계정명"
                      className="block w-1/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    <input
                      type="url"
                      value={account.url || ''}
                      onChange={(e) => updateSnsAccount(index, 'url', e.target.value)}
                      placeholder="URL (선택사항)"
                      className="block w-1/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeSnsAccount(index)}
                      className="inline-flex items-center p-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      삭제
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSnsAccount}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  SNS 계정 추가
                </button>
              </div>
            </div>

            {showPostcode && (
              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                  </div>
                  <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <DaumPostcode onComplete={handlePostcode} />
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                        type="button"
                        onClick={() => setShowPostcode(false)}
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        닫기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                저장하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 