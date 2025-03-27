'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import NotificationList from '@/components/notifications/NotificationList';
import NotificationSettings from '@/components/notifications/NotificationSettings';

export default function NotificationsPage() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/login');
    }
    setLoading(false);
  }, [status]);

  if (loading) {
    return (
      <div className="mypage-container">
        <div className="loading-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-16 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mypage-container">
      <div className="mypage-header">
        <h1 className="text-2xl font-bold">알림</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="notification-section">
            <h2 className="section-title">알림 내역</h2>
            <NotificationList userId={session?.user?.id} />
          </div>
        </div>
        
        <div>
          <div className="notification-section">
            <h2 className="section-title">알림 설정</h2>
            <NotificationSettings userId={session?.user?.id} />
          </div>
        </div>
      </div>
    </div>
  );
} 