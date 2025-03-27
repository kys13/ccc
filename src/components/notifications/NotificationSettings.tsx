'use client';

import React, { useEffect, useState } from 'react';
import type { NotificationType, NotificationChannel } from '@prisma/client';
import {
  getNotificationPreferences,
  updateNotificationPreferences,
} from '@/lib/api/notifications';
import { Switch } from '@/components/ui/Switch';

interface NotificationPreference {
  id: number;
  type: NotificationType;
  channels: NotificationChannel[];
  enabled: boolean;
}

const notificationTypeLabels: Record<NotificationType, string> = {
  SYSTEM_UPDATE: '시스템 업데이트',
  SECURITY_ALERT: '보안 알림',
  ACCOUNT_UPDATE: '계정 정보 변경',
  NEW_MESSAGE: '새 메시지',
  TASK_UPDATE: '작업 상태 변경',
  REMINDER: '리마인더',
  MARKETING: '마케팅 알림',
  CAMPAIGN_UPDATE: '캠페인 업데이트',
  APPLICATION_STATUS: '신청 상태',
  REVIEW_FEEDBACK: '리뷰 피드백',
  SYSTEM_NOTICE: '시스템 공지',
  PAYMENT_STATUS: '결제 상태'
};

const channelLabels: Record<NotificationChannel, string> = {
  EMAIL: '이메일',
  SMS: 'SMS',
  PUSH: '푸시 알림',
  WEB_PUSH: '웹 푸시'
};

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  campaignUpdates: boolean;
  applicationStatus: boolean;
  reviewReminders: boolean;
}

interface NotificationSettingsProps {
  userId: number;
}

export default function NotificationSettings({ userId }: NotificationSettingsProps) {
  const [settings, setSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    campaignUpdates: true,
    applicationStatus: true,
    reviewReminders: true,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchSettings();
    }
  }, [userId]);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/users/${userId}/notification-settings`);
      if (!response.ok) throw new Error('설정을 불러오는데 실패했습니다.');
      const data = await response.json();
      setSettings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '설정을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (key: keyof NotificationSettings, value: boolean) => {
    try {
      setSaving(true);
      const response = await fetch(`/api/users/${userId}/notification-settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [key]: value }),
      });
      
      if (!response.ok) throw new Error('설정 변경에 실패했습니다.');
      
      setSettings(prev => ({
        ...prev,
        [key]: value,
      }));
    } catch (err) {
      console.error('설정 변경 실패:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-pulse">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-gray-200 h-12 rounded mb-4"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        <p>{error}</p>
        <button onClick={fetchSettings} className="btn btn-outline mt-4">
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className="settings-list">
      <div className="settings-item">
        <div className="settings-content">
          <h3 className="settings-title">이메일 알림</h3>
          <p className="settings-description">
            중요한 업데이트와 알림을 이메일로 받습니다.
          </p>
        </div>
        <Switch
          checked={settings.emailNotifications}
          onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
          disabled={saving}
        />
      </div>

      <div className="settings-item">
        <div className="settings-content">
          <h3 className="settings-title">푸시 알림</h3>
          <p className="settings-description">
            브라우저 푸시 알림을 통해 실시간 업데이트를 받습니다.
          </p>
        </div>
        <Switch
          checked={settings.pushNotifications}
          onCheckedChange={(checked) => updateSetting('pushNotifications', checked)}
          disabled={saving}
        />
      </div>

      <div className="settings-item">
        <div className="settings-content">
          <h3 className="settings-title">캠페인 업데이트</h3>
          <p className="settings-description">
            관심있는 캠페인의 변경사항을 알립니다.
          </p>
        </div>
        <Switch
          checked={settings.campaignUpdates}
          onCheckedChange={(checked) => updateSetting('campaignUpdates', checked)}
          disabled={saving}
        />
      </div>

      <div className="settings-item">
        <div className="settings-content">
          <h3 className="settings-title">지원 상태</h3>
          <p className="settings-description">
            지원한 캠페인의 상태 변경을 알립니다.
          </p>
        </div>
        <Switch
          checked={settings.applicationStatus}
          onCheckedChange={(checked) => updateSetting('applicationStatus', checked)}
          disabled={saving}
        />
      </div>

      <div className="settings-item">
        <div className="settings-content">
          <h3 className="settings-title">리뷰 알림</h3>
          <p className="settings-description">
            리뷰 작성 마감일이 다가오면 알립니다.
          </p>
        </div>
        <Switch
          checked={settings.reviewReminders}
          onCheckedChange={(checked) => updateSetting('reviewReminders', checked)}
          disabled={saving}
        />
      </div>
    </div>
  );
} 