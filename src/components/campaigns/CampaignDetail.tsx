'use client';

import React from 'react';
import Image from 'next/image';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Calendar, Users, Award, MapPin, Share2, Bookmark } from 'lucide-react';
import type { Campaign } from '@/types/campaign';

interface CampaignDetailProps {
  campaign: Campaign;
  onApply: () => void;
  isApplying: boolean;
  isAuthenticated: boolean;
  applicationStatus: string | null;
}

export default function CampaignDetail({ 
  campaign, 
  onApply, 
  isApplying, 
  isAuthenticated,
  applicationStatus
}: CampaignDetailProps) {
  const category = campaign.visitCategory?.name || campaign.deliveryCategory?.name;
  const isFullyBooked = campaign.currentParticipants >= campaign.maxParticipants;

  const getApplicationStatusText = () => {
    switch (applicationStatus) {
      case 'PENDING':
        return '신청 검토중';
      case 'APPROVED':
        return '신청 승인됨';
      case 'REJECTED':
        return '신청 거절됨';
      default:
        return null;
    }
  };

  const getApplicationStatusColor = () => {
    switch (applicationStatus) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'APPROVED':
        return 'bg-green-100 text-green-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      {/* 캠페인 이미지 섹션 */}
      <div className="relative h-[400px]">
        <Image
          src={campaign.imageUrl || '/default-campaign.jpg'}
          alt={campaign.title}
          className="object-cover"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* 캠페인 정보 섹션 */}
      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{campaign.title}</h1>
            <div className="flex items-center text-gray-600 space-x-4">
              <span className="flex items-center">
                <Calendar className="w-5 h-5 mr-1" />
                {formatDate(campaign.startDate)} ~ {formatDate(campaign.endDate)}
              </span>
              <span className="flex items-center">
                <Users className="w-5 h-5 mr-1" />
                {campaign.currentParticipants}/{campaign.maxParticipants}명
              </span>
              <span className="flex items-center">
                <Award className="w-5 h-5 mr-1" />
                ₩{campaign.reward.toLocaleString()}
              </span>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Bookmark className="w-6 h-6 text-primary" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Share2 className="w-6 h-6 text-primary" />
            </button>
          </div>
        </div>

        {/* 캠페인 상세 정보 */}
        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold mb-4">캠페인 소개</h2>
          <p className="text-gray-700 whitespace-pre-line mb-6">{campaign.description}</p>

          <h2 className="text-xl font-semibold mb-4">참여 요건</h2>
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {campaign.requirements.split('\n').map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>

          {campaign.location && (
            <>
              <h2 className="text-xl font-semibold mb-4">위치 정보</h2>
              <div className="flex items-start space-x-2 text-gray-700 mb-6">
                <MapPin className="w-5 h-5 mt-1" />
                <span>{campaign.location.address}</span>
              </div>
            </>
          )}

          {/* SNS 정보 */}
          <h2 className="text-xl font-semibold mb-4">SNS 등록 정보</h2>
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <ul className="space-y-2">
              {campaign.snsTypes.map((sns, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <span className="font-medium">{sns}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 신청 버튼 */}
          <div className="mt-8">
            {applicationStatus ? (
              <div className={`w-full py-3 px-4 rounded-lg font-medium text-center ${getApplicationStatusColor()}`}>
                {getApplicationStatusText()}
              </div>
            ) : (
              <button
                onClick={onApply}
                disabled={isApplying || isFullyBooked || !isAuthenticated}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
                  isFullyBooked
                    ? 'bg-gray-400 cursor-not-allowed'
                    : !isAuthenticated
                    ? 'bg-gray-400 cursor-not-allowed'
                    : isApplying
                    ? 'bg-primary-300 cursor-not-allowed'
                    : 'bg-primary hover:bg-primary-600'
                }`}
              >
                {isFullyBooked
                  ? '모집이 마감되었습니다'
                  : !isAuthenticated
                  ? '로그인이 필요합니다'
                  : isApplying
                  ? '신청 중...'
                  : '캠페인 신청하기'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 