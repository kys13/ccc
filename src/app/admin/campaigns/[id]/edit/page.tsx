'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getCampaignById, updateCampaign } from '@/lib/api/adminCampaigns';
import { Switch } from '@headlessui/react';
import { useToast } from '@/contexts/ToastContext';
import type { Campaign, CampaignUpdateData } from '@/types/campaign';
import ImageUpload from '@/components/ImageUpload';

const CAMPAIGN_TYPES = [
  { id: 'visit', name: '방문 체험' },
  { id: 'delivery', name: '배송 체험' },
];

const REGIONS = {
  서울: ['강남구', '서초구', '송파구', '강동구', '마포구', '서대문구', '은평구', '종로구', '중구', '용산구', '성동구', '광진구', '동대문구', '중랑구', '성북구', '강북구', '도봉구', '노원구', '양천구', '강서구', '구로구', '금천구', '영등포구', '동작구', '관악구'],
  경기: ['수원시', '성남시', '고양시', '용인시', '부천시', '안산시', '안양시', '남양주시', '화성시', '평택시', '의정부시', '시흥시', '파주시', '광명시', '김포시', '군포시', '광주시', '이천시', '양주시', '오산시'],
  인천: ['중구', '동구', '미추홀구', '연수구', '남동구', '부평구', '계양구', '서구', '강화군', '옹진군'],
  부산: ['중구', '서구', '동구', '영도구', '부산진구', '동래구', '남구', '북구', '해운대구', '사하구', '금정구', '강서구', '연제구', '수영구', '사상구', '기장군'],
};

const SNS_TYPES = [
  { id: 'instagram', name: '인스타그램' },
  { id: 'blog', name: '블로그' },
  { id: 'youtube', name: '유튜브' },
];

const VISIT_CATEGORIES = [
  { id: 'restaurant', name: '맛집' },
  { id: 'cafe', name: '카페' },
  { id: 'beauty', name: '뷰티' },
  { id: 'hotel', name: '숙박' },
];

const DELIVERY_CATEGORIES = [
  { id: 'food', name: '식품' },
  { id: 'beauty', name: '화장품' },
  { id: 'living', name: '생활' },
  { id: 'fashion', name: '패션' },
];

interface FormData {
  id: number;
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
  showLatest: boolean;
  showPopular: boolean;
  showDeadline: boolean;
  imageUrl: string;
}

export default function EditCampaignPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { isAdmin } = useAuth();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [districts, setDistricts] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [displaySettings, setDisplaySettings] = useState({
    main: false,
    popular: false,
    recommended: false
  });
  
  const [formData, setFormData] = useState<FormData>({
    id: parseInt(params.id),
    type: 'visit',
    title: '',
    description: '',
    category: '',
    snsTypes: [],
    reward: 0,
    maxParticipants: 1,
    requirements: '',
    startDate: '',
    endDate: '',
    status: 'PENDING',
    showLatest: false,
    showPopular: false,
    showDeadline: false,
    imageUrl: '',
  });

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const campaign = await getCampaignById(parseInt(params.id));
        setFormData({
          id: campaign.id,
          type: campaign.visitCategory ? 'visit' : 'delivery',
          title: campaign.title,
          description: campaign.description,
          category: campaign.visitCategory?.name || campaign.deliveryCategory?.name || '',
          region: campaign.location?.city,
          district: campaign.location?.district,
          snsTypes: campaign.snsTypes,
          reward: campaign.reward,
          maxParticipants: campaign.maxParticipants,
          requirements: campaign.requirements,
          startDate: new Date(campaign.startDate).toISOString().split('T')[0],
          endDate: new Date(campaign.endDate).toISOString().split('T')[0],
          status: campaign.status,
          showLatest: campaign.showLatest || false,
          showPopular: campaign.showPopular || false,
          showDeadline: campaign.showDeadline || false,
          imageUrl: campaign.imageUrl || '',
        });
        if (campaign.location?.city) {
          setDistricts(REGIONS[campaign.location.city as keyof typeof REGIONS] || []);
        }
        setCampaign(campaign);
        setDisplaySettings({
          main: campaign.showDeadline || false,
          popular: campaign.showPopular || false,
          recommended: false
        });
      } catch (err: any) {
        console.error('Campaign fetch error:', err);
        setError(err.message || '캠페인 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    if (isAdmin) {
      fetchCampaign();
    } else {
      router.push('/admin/login');
    }
  }, [isAdmin, params.id, router]);

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const region = e.target.value;
    setFormData(prev => ({
      ...prev,
      region,
      district: '',
    }));
    setDistricts(REGIONS[region as keyof typeof REGIONS] || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const updatedData = {
        ...formData,
        type: formData.type,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        region: formData.region,
        district: formData.district,
        snsTypes: formData.snsTypes,
        reward: formData.reward,
        maxParticipants: formData.maxParticipants,
        requirements: formData.requirements,
        startDate: formData.startDate,
        endDate: formData.endDate,
        status: formData.status,
        imageUrl: formData.imageUrl,
        isVisible: true,
        showPopular: formData.showPopular,
        showDeadline: formData.showDeadline,
        showLatest: formData.showLatest
      };

      await updateCampaign(updatedData);
      showToast('캠페인이 성공적으로 수정되었습니다.', 'success');
      router.push('/admin/campaigns');
    } catch (err: any) {
      setError(err.message || '캠페인 수정 중 오류가 발생했습니다.');
      showToast(err.message || '캠페인 수정 중 오류가 발생했습니다.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVisibilityToggle = async () => {
    try {
      setFormData(prev => ({
        ...prev,
        showLatest: !prev.showLatest,
        showPopular: !prev.showPopular,
        showDeadline: !prev.showDeadline,
      }));
    } catch (err: any) {
      showToast(err.message || '상태 변경 중 오류가 발생했습니다.', 'error');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  const categories = formData.type === 'visit' ? VISIT_CATEGORIES : DELIVERY_CATEGORIES;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">캠페인 수정</h1>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">노출 상태</span>
                <Switch
                  checked={formData.showLatest || formData.showPopular || formData.showDeadline}
                  onChange={handleVisibilityToggle}
                  className={`${
                    formData.showLatest || formData.showPopular || formData.showDeadline ? 'bg-indigo-600' : 'bg-gray-200'
                  } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                >
                  <span
                    className={`${
                      formData.showLatest || formData.showPopular || formData.showDeadline ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                  />
                </Switch>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              캠페인 정보를 수정하세요.
            </p>
          </div>

          {error && (
            <div className="mx-6 mt-6">
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-8">
            <div className="grid grid-cols-1 gap-y-8 gap-x-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  캠페인 유형
                </label>
                <div className="mt-2">
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  >
                    {CAMPAIGN_TYPES.map(type => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  제목
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  설명
                </label>
                <div className="mt-2">
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  카테고리
                </label>
                <div className="mt-2">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  >
                    <option value="">카테고리 선택</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  SNS 유형
                </label>
                <div className="mt-2">
                  <select
                    name="snsTypes"
                    value={formData.snsTypes.join(',')}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      snsTypes: e.target.value ? e.target.value.split(',') : [],
                    }))}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  >
                    <option value="">SNS 유형 선택</option>
                    {SNS_TYPES.map(type => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {formData.type === 'visit' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      지역
                    </label>
                    <div className="mt-2">
                      <select
                        name="region"
                        value={formData.region}
                        onChange={handleRegionChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                      >
                        <option value="">지역 선택</option>
                        {Object.keys(REGIONS).map(region => (
                          <option key={region} value={region}>
                            {region}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {formData.region && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        지역구
                      </label>
                      <div className="mt-2">
                        <select
                          name="district"
                          value={formData.district}
                          onChange={handleChange}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          required
                        >
                          <option value="">지역구 선택</option>
                          {districts.map(district => (
                            <option key={district} value={district}>
                              {district}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  리워드 금액
                </label>
                <div className="mt-2">
                  <div className="relative rounded-md shadow-sm">
                    <input
                      type="number"
                      name="reward"
                      value={formData.reward}
                      onChange={handleChange}
                      min="0"
                      className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className="text-gray-500 sm:text-sm">원</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  최대 참여자 수
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="maxParticipants"
                    value={formData.maxParticipants}
                    onChange={handleChange}
                    min="1"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  시작일
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  종료일
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  참여 요구사항
                </label>
                <div className="mt-2">
                  <textarea
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    rows={4}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  상태
                </label>
                <div className="mt-2">
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  >
                    <option value="ONGOING">진행 중</option>
                    <option value="COMPLETED">종료</option>
                    <option value="PENDING">예정</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">노출 설정</h3>
              <div className="flex space-x-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="showLatest"
                    checked={formData.showLatest}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="ml-2">최신 캠페인</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="showPopular"
                    checked={formData.showPopular}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="ml-2">인기 캠페인</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="showDeadline"
                    checked={formData.showDeadline}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="ml-2">마감 임박 캠페인</span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                캠페인 이미지
              </label>
              <ImageUpload
                value={imageUrl}
                onChange={setImageUrl}
                disabled={loading}
              />
            </div>

            <div className="pt-5 border-t border-gray-200">
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  {loading ? '수정 중...' : '수정 완료'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 