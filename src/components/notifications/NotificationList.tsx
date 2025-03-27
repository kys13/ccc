'use client';

import React, { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import {
  BellIcon,
  ShieldExclamationIcon,
  UserIcon,
  EnvelopeIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
  MegaphoneIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import {
  getNotifications,
  markNotificationAsRead,
  deleteNotification,
} from '@/lib/api/notifications';
import type { Notification, NotificationResponse } from '@/types/notification';

interface NotificationListProps {
  userId: number;
  onNotificationClick?: (notification: Notification) => void;
}

export default function NotificationList({
  userId,
  onNotificationClick,
}: NotificationListProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchNotifications = async (pageNum: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getNotifications({
        userId,
        page: pageNum,
        limit: 10,
      }) as NotificationResponse;
      
      setNotifications((prev: Notification[]) =>
        pageNum === 1 ? response.notifications : [...prev, ...response.notifications]
      );
      setHasMore(response.pagination.page < response.pagination.totalPages);
      setPage(pageNum);
    } catch (error) {
      setError('알림을 불러오는데 실패했습니다.');
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications(1);
  }, [userId]);

  const handleNotificationClick = async (notification: Notification) => {
    try {
      if (!notification.isRead) {
        await markNotificationAsRead(notification.id);
        setNotifications((prev: Notification[]) =>
          prev.map((n: Notification) =>
            n.id === notification.id ? { ...n, isRead: true } : n
          )
        );
      }
      onNotificationClick?.(notification);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    notificationId: number
  ) => {
    e.stopPropagation();
    try {
      await deleteNotification(notificationId);
      setNotifications((prev: Notification[]) =>
        prev.filter((n: Notification) => n.id !== notificationId)
      );
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const getNotificationIcon = (type: Notification['type']) => {
    const iconProps = { className: 'h-5 w-5' };
    switch (type) {
      case 'SYSTEM_UPDATE':
        return <BellIcon {...iconProps} />;
      case 'SECURITY_ALERT':
        return <ShieldExclamationIcon {...iconProps} />;
      case 'ACCOUNT_UPDATE':
        return <UserIcon {...iconProps} />;
      case 'NEW_MESSAGE':
        return <EnvelopeIcon {...iconProps} />;
      case 'TASK_UPDATE':
        return <ClipboardDocumentListIcon {...iconProps} />;
      case 'REMINDER':
        return <ClockIcon {...iconProps} />;
      case 'MARKETING':
        return <MegaphoneIcon {...iconProps} />;
      default:
        return <BellIcon {...iconProps} />;
    }
  };

  if (error) {
    return (
      <div className="p-4 text-center text-red-600">
        <p>{error}</p>
        <button
          onClick={() => fetchNotifications(1)}
          className="mt-2 text-sm text-blue-600 hover:text-blue-800"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {notifications.map((notification: Notification) => (
        <div
          key={notification.id}
          onClick={() => handleNotificationClick(notification)}
          className={`flex items-start gap-4 p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
            notification.isRead ? 'bg-white' : 'bg-blue-50'
          }`}
        >
          <div className="flex-shrink-0 text-gray-500">
            {getNotificationIcon(notification.type)}
          </div>
          <div className="flex-grow min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-medium text-gray-900 truncate">
                {notification.title}
              </h3>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(notification.createdAt), {
                    addSuffix: true,
                    locale: ko,
                  })}
                </span>
                {!notification.isRead && (
                  <span className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full" />
                )}
                <button
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleDelete(e, notification.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
            <p className="mt-1 text-sm text-gray-600 line-clamp-2">
              {notification.content}
            </p>
            {notification.link && (
              <a
                href={notification.link}
                className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.stopPropagation()}
              >
                자세히 보기
              </a>
            )}
          </div>
        </div>
      ))}
      {loading && (
        <div className="p-4 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto" />
        </div>
      )}
      {!loading && hasMore && (
        <button
          onClick={() => fetchNotifications(page + 1)}
          className="w-full p-4 text-sm text-blue-600 hover:text-blue-800 hover:bg-gray-50"
        >
          더 보기
        </button>
      )}
      {!loading && notifications.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          <BellIcon className="h-12 w-12 mx-auto mb-4" />
          <p>알림이 없습니다.</p>
        </div>
      )}
    </div>
  );
} 