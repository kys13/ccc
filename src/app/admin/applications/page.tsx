'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { CheckCircle, XCircle } from 'lucide-react';

interface Application {
  id: number;
  campaign: {
    title: string;
    campaignType: 'visit' | 'delivery';
  };
  user: {
    name: string;
    email: string;
  };
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
}

export default function ApplicationsPage() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadApplications = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/applications');
      if (!response.ok) {
        throw new Error('신청 목록을 불러오는데 실패했습니다.');
      }
      const data = await response.json();
      setApplications(data.applications);
    } catch (err) {
      setError(err instanceof Error ? err.message : '신청 목록을 불러오는데 실패했습니다.');
      showToast('신청 목록을 불러오는데 실패했습니다.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'ADMIN') {
      loadApplications();
    }
  }, [user, showToast]);

  const handleStatusChange = async (applicationId: number, newStatus: 'APPROVED' | 'REJECTED') => {
    try {
      const response = await fetch(`/api/admin/applications/${applicationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('신청 상태 변경에 실패했습니다.');
      }

      const updatedApplication = await response.json();
      setApplications(applications.map(app => 
        app.id === applicationId ? updatedApplication : app
      ));

      showToast(
        newStatus === 'APPROVED' 
          ? '신청이 승인되었습니다.' 
          : '신청이 거절되었습니다.',
        'success'
      );
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : '신청 상태 변경에 실패했습니다.',
        'error'
      );
    }
  };

  if (!user || user.role !== 'ADMIN') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">관리자 권한이 필요합니다.</p>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">신청 관리</h1>

        {error ? (
          <div className="text-center py-8 text-red-600">
            <p>{error}</p>
            <button
              onClick={loadApplications}
              className="mt-4 text-blue-600 hover:text-blue-800"
            >
              다시 시도
            </button>
          </div>
        ) : loading ? (
          <div className="text-center py-8">
            <div className="loading-spinner mx-auto"></div>
          </div>
        ) : applications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>신청이 없습니다.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    캠페인
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    신청자
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    신청일
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
                {applications.map((application) => (
                  <tr key={application.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {application.campaign.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {application.campaign.campaignType === 'visit' ? '방문 체험' : '배송 체험'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{application.user.name}</div>
                      <div className="text-sm text-gray-500">{application.user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(application.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        application.status === 'APPROVED'
                          ? 'bg-green-100 text-green-800'
                          : application.status === 'REJECTED'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {application.status === 'APPROVED'
                          ? '승인됨'
                          : application.status === 'REJECTED'
                          ? '거절됨'
                          : '대기중'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {application.status === 'PENDING' && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleStatusChange(application.id, 'APPROVED')}
                            className="text-green-600 hover:text-green-900"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(application.id, 'REJECTED')}
                            className="text-red-600 hover:text-red-900"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
} 