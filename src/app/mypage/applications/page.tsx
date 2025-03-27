'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { getCampaignApplications } from '@/lib/api/applications';
import type { CampaignApplication } from '@/types/application';

export default function ApplicationsPage() {
  const { data: session, status } = useSession();
  const [applications, setApplications] = useState<CampaignApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/login');
    }

    if (status === 'authenticated' && session?.user?.id) {
      fetchApplications();
    }
  }, [status, session]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await getCampaignApplications(session?.user?.id);
      setApplications(data);
    } catch (err) {
      setError('신청 내역을 불러오는데 실패했습니다.');
      console.error('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mypage-container">
        <div className="loading-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-32 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mypage-container">
        <div className="text-center text-red-600">
          <p>{error}</p>
          <button onClick={fetchApplications} className="btn btn-outline mt-4">
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mypage-container">
      <div className="mypage-header">
        <h1 className="text-2xl font-bold">신청 내역</h1>
      </div>
      
      {applications.length === 0 ? (
        <div className="mypage-card text-center">
          <p className="text-gray-500">신청한 캠페인이 없습니다.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((application) => (
            <div key={application.id} className="mypage-card">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="review-title">
                    {application.campaign.title}
                  </h3>
                  <p className="review-meta">
                    신청일: {new Date(application.createdAt).toLocaleDateString()}
                  </p>
                  <div className={`status-badge ${
                    application.status === 'PENDING' ? 'status-pending' :
                    application.status === 'ACCEPTED' ? 'status-accepted' :
                    'status-rejected'
                  }`}>
                    {application.status === 'PENDING' && '검토중'}
                    {application.status === 'ACCEPTED' && '선정됨'}
                    {application.status === 'REJECTED' && '미선정'}
                  </div>
                </div>
                {application.status === 'ACCEPTED' && !application.review && (
                  <button
                    onClick={() => {/* 리뷰 작성 페이지로 이동 */}}
                    className="btn btn-primary"
                  >
                    리뷰 작성
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 