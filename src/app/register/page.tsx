'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/contexts/ToastContext';
import DaumPostcode from 'react-daum-postcode';

interface SnsAccount {
  platform: 'INSTAGRAM' | 'YOUTUBE' | 'TIKTOK' | 'FACEBOOK' | 'BLOG';
  username: string;
  url?: string;
}

interface RegisterFormData {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  userType: 'INDIVIDUAL' | 'BUSINESS';
  ssn?: string;
  businessNumber?: string;
  snsAccounts: SnsAccount[];
  postcode: string;
  address: string;
  addressDetail: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [showPostcode, setShowPostcode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    name: '',
    phoneNumber: '',
    userType: 'INDIVIDUAL',
    snsAccounts: [{ platform: 'INSTAGRAM', username: '', url: '' }],
    postcode: '',
    address: '',
    addressDetail: '',
  });

  const formatSsn = (value: string) => {
    const numbers = value.replace(/[^0-9]/g, '');
    if (numbers.length <= 6) return numbers;
    return `${numbers.slice(0, 6)}-${numbers.slice(6, 13)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 필수 필드 검증
      if (!formData.email || !formData.password || !formData.name || !formData.phoneNumber) {
        throw new Error('필수 정보를 모두 입력해주세요.');
      }

      // 비밀번호 길이 검증
      if (formData.password.length < 8) {
        throw new Error('비밀번호는 8자 이상이어야 합니다.');
      }

      // 이메일 형식 검증
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('올바른 이메일 형식이 아닙니다.');
      }

      // 전화번호 형식 검증
      const phoneRegex = /^01[0-9]{8,9}$/;
      const cleanPhoneNumber = formData.phoneNumber.replace(/-/g, '');
      if (!phoneRegex.test(cleanPhoneNumber)) {
        throw new Error('올바른 휴대폰 번호 형식이 아닙니다.');
      }

      // 회원 유형별 필수 필드 검증
      if (formData.userType === 'INDIVIDUAL' && !formData.ssn) {
        throw new Error('주민등록번호를 입력해주세요.');
      }
      if (formData.userType === 'BUSINESS' && !formData.businessNumber) {
        throw new Error('사업자등록번호를 입력해주세요.');
      }

      // 주소 필수 필드 검증
      if (!formData.postcode || !formData.address || !formData.addressDetail) {
        throw new Error('주소를 모두 입력해주세요.');
      }

      // SNS 계정 검증
      if (!formData.snsAccounts.some(account => account.username)) {
        throw new Error('최소 1개 이상의 SNS 계정을 입력해주세요.');
      }

      // SSN 형식 정리 (하이픈 제거)
      const cleanSsn = formData.ssn ? formData.ssn.replace(/-/g, '') : undefined;
      
      // 사업자등록번호 형식 정리 (하이픈 제거)
      const cleanBusinessNumber = formData.businessNumber ? formData.businessNumber.replace(/-/g, '') : undefined;

      // SNS 계정 데이터 정리
      const cleanSnsAccounts = formData.snsAccounts.map(account => ({
        platform: account.platform,
        username: account.username.trim(),
        url: account.url ? account.url.trim() : undefined
      })).filter(account => account.username);

      // 요청 데이터 구성
      const requestData = {
        email: formData.email.trim(),
        password: formData.password,
        name: formData.name.trim(),
        phoneNumber: cleanPhoneNumber,
        userType: formData.userType,
        postcode: formData.postcode,
        address: formData.address,
        addressDetail: formData.addressDetail.trim(),
        snsAccounts: cleanSnsAccounts,
        ...(formData.userType === 'INDIVIDUAL' && cleanSsn ? { ssn: cleanSsn } : {}),
        ...(formData.userType === 'BUSINESS' && cleanBusinessNumber ? { businessNumber: cleanBusinessNumber } : {})
      };

      console.log('Registration request data:', requestData);

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || '회원가입에 실패했습니다.');
      }

      showToast('회원가입이 완료되었습니다.', 'success');
      router.push('/login');
    } catch (error: any) {
      console.error('Registration error:', error);
      showToast(error.message || '회원가입에 실패했습니다.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'ssn') {
      const formattedValue = formatSsn(value);
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSnsChange = (index: number, field: keyof SnsAccount, value: string) => {
    setFormData(prev => ({
      ...prev,
      snsAccounts: prev.snsAccounts.map((account, i) =>
        i === index ? { ...account, [field]: value } : account
      ),
    }));
  };

  const addSnsAccount = () => {
    setFormData(prev => ({
      ...prev,
      snsAccounts: [...prev.snsAccounts, { platform: 'INSTAGRAM', username: '', url: '' }],
    }));
  };

  const removeSnsAccount = (index: number) => {
    setFormData(prev => ({
      ...prev,
      snsAccounts: prev.snsAccounts.filter((_, i) => i !== index),
    }));
  };

  const handlePostcode = (data: any) => {
    setFormData({
      ...formData,
      postcode: data.zonecode,
      address: data.address,
    });
    setShowPostcode(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6">회원가입</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                이메일
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                비밀번호
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <p className="mt-1 text-sm text-gray-500">8자 이상 입력해주세요.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                이름
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                minLength={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                휴대폰 번호
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                pattern="[0-9]{10,11}"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="'-' 없이 입력해주세요"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                회원 유형
              </label>
              <select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="INDIVIDUAL">개인</option>
                <option value="BUSINESS">사업자</option>
              </select>
            </div>

            {formData.userType === 'INDIVIDUAL' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  주민등록번호
                </label>
                <input
                  type="text"
                  name="ssn"
                  value={formData.ssn || ''}
                  onChange={handleChange}
                  maxLength={14}
                  placeholder="123456-1234567"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            )}

            {formData.userType === 'BUSINESS' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  사업자 등록번호
                </label>
                <input
                  type="text"
                  name="businessNumber"
                  value={formData.businessNumber || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                SNS 계정
              </label>
              {formData.snsAccounts.map((account, index) => (
                <div key={index} className="mt-2 space-y-2">
                  <select
                    value={account.platform}
                    onChange={(e) => handleSnsChange(index, 'platform', e.target.value as any)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="INSTAGRAM">Instagram</option>
                    <option value="YOUTUBE">YouTube</option>
                    <option value="TIKTOK">TikTok</option>
                    <option value="FACEBOOK">Facebook</option>
                    <option value="BLOG">Blog</option>
                  </select>
                  <input
                    type="text"
                    placeholder="계정명"
                    value={account.username}
                    onChange={(e) => handleSnsChange(index, 'username', e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                  <input
                    type="url"
                    placeholder="URL (선택사항)"
                    value={account.url || ''}
                    onChange={(e) => handleSnsChange(index, 'url', e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  {formData.snsAccounts.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSnsAccount(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      계정 삭제
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addSnsAccount}
                className="mt-2 text-indigo-600 hover:text-indigo-800"
              >
                SNS 계정 추가
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                주소
              </label>
              <div className="mt-1 grid grid-cols-2 gap-3">
                <input
                  type="text"
                  name="postcode"
                  placeholder="우편번호"
                  value={formData.postcode}
                  readOnly
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
                name="address"
                placeholder="기본주소"
                value={formData.address}
                readOnly
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <input
                type="text"
                name="addressDetail"
                placeholder="상세주소"
                value={formData.addressDetail}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {showPostcode && (
              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setShowPostcode(false)}></div>
                  </div>
                  <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <DaumPostcode
                        onComplete={handlePostcode}
                        autoClose
                      />
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

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? '처리중...' : '가입하기'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 