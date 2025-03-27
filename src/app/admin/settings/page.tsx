'use client';

import React, { useEffect, useState } from 'react';
import { getAdminSettings, updateAdminSettings } from '@/lib/api/adminSettings';

interface AdminSettings {
    site_name: string;
    site_description: string;
    contact_email: string;
    notification_settings: {
        email_notifications: boolean;
        application_notifications: boolean;
        campaign_notifications: boolean;
    };
    campaign_settings: {
        auto_approve_campaigns: boolean;
        default_campaign_status: 'draft' | 'active';
        minimum_reward_amount: number;
        maximum_reward_amount: number;
    };
    security_settings: {
        require_email_verification: boolean;
        allow_social_login: boolean;
        session_timeout_minutes: number;
    };
}

export default function AdminSettings() {
    const [settings, setSettings] = useState<AdminSettings>({
        site_name: '',
        site_description: '',
        contact_email: '',
        notification_settings: {
            email_notifications: true,
            application_notifications: true,
            campaign_notifications: true
        },
        campaign_settings: {
            auto_approve_campaigns: false,
            default_campaign_status: 'draft',
            minimum_reward_amount: 0,
            maximum_reward_amount: 1000000
        },
        security_settings: {
            require_email_verification: true,
            allow_social_login: true,
            session_timeout_minutes: 60
        }
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const data = await getAdminSettings();
                setSettings(data);
            } catch (err: any) {
                setError(err.message || '설정을 불러오는데 실패했습니다.');
                console.error('Settings fetch error:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSettings();
    }, []);

    const handleChange = (section: keyof AdminSettings, field: string, value: any) => {
        if (section === 'notification_settings' || section === 'campaign_settings' || section === 'security_settings') {
            setSettings(prev => ({
                ...prev,
                [section]: {
                    ...prev[section],
                    [field]: value
                }
            }));
        } else {
            setSettings(prev => ({
                ...prev,
                [field]: value
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setIsSaving(true);

        try {
            await updateAdminSettings(settings);
            setSuccessMessage('설정이 성공적으로 저장되었습니다.');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err: any) {
            setError(err.message || '설정 저장에 실패했습니다.');
            console.error('Settings update error:', err);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">관리자 설정</h1>

            <form onSubmit={handleSubmit} className="space-y-8">
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                        {error}
                    </div>
                )}

                {successMessage && (
                    <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md">
                        {successMessage}
                    </div>
                )}

                {/* 기본 설정 */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">기본 설정</h2>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="site_name" className="block text-sm font-medium text-gray-700">
                                사이트 이름
                            </label>
                            <input
                                type="text"
                                id="site_name"
                                value={settings.site_name}
                                onChange={(e) => handleChange('site_name' as keyof AdminSettings, 'site_name', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="site_description" className="block text-sm font-medium text-gray-700">
                                사이트 설명
                            </label>
                            <textarea
                                id="site_description"
                                value={settings.site_description}
                                onChange={(e) => handleChange('site_description' as keyof AdminSettings, 'site_description', e.target.value)}
                                rows={3}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="contact_email" className="block text-sm font-medium text-gray-700">
                                연락처 이메일
                            </label>
                            <input
                                type="email"
                                id="contact_email"
                                value={settings.contact_email}
                                onChange={(e) => handleChange('contact_email' as keyof AdminSettings, 'contact_email', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                    </div>
                </div>

                {/* 알림 설정 */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">알림 설정</h2>
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="email_notifications"
                                checked={settings.notification_settings.email_notifications}
                                onChange={(e) => handleChange('notification_settings', 'email_notifications', e.target.checked)}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="email_notifications" className="ml-2 block text-sm text-gray-700">
                                이메일 알림 활성화
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="application_notifications"
                                checked={settings.notification_settings.application_notifications}
                                onChange={(e) => handleChange('notification_settings', 'application_notifications', e.target.checked)}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="application_notifications" className="ml-2 block text-sm text-gray-700">
                                신청 알림 활성화
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="campaign_notifications"
                                checked={settings.notification_settings.campaign_notifications}
                                onChange={(e) => handleChange('notification_settings', 'campaign_notifications', e.target.checked)}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="campaign_notifications" className="ml-2 block text-sm text-gray-700">
                                캠페인 알림 활성화
                            </label>
                        </div>
                    </div>
                </div>

                {/* 캠페인 설정 */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">캠페인 설정</h2>
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="auto_approve_campaigns"
                                checked={settings.campaign_settings.auto_approve_campaigns}
                                onChange={(e) => handleChange('campaign_settings', 'auto_approve_campaigns', e.target.checked)}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="auto_approve_campaigns" className="ml-2 block text-sm text-gray-700">
                                캠페인 자동 승인
                            </label>
                        </div>
                        <div>
                            <label htmlFor="default_campaign_status" className="block text-sm font-medium text-gray-700">
                                기본 캠페인 상태
                            </label>
                            <select
                                id="default_campaign_status"
                                value={settings.campaign_settings.default_campaign_status}
                                onChange={(e) => handleChange('campaign_settings', 'default_campaign_status', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="draft">임시저장</option>
                                <option value="active">활성</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="minimum_reward_amount" className="block text-sm font-medium text-gray-700">
                                최소 리워드 금액
                            </label>
                            <input
                                type="number"
                                id="minimum_reward_amount"
                                value={settings.campaign_settings.minimum_reward_amount}
                                onChange={(e) => handleChange('campaign_settings', 'minimum_reward_amount', parseInt(e.target.value))}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="maximum_reward_amount" className="block text-sm font-medium text-gray-700">
                                최대 리워드 금액
                            </label>
                            <input
                                type="number"
                                id="maximum_reward_amount"
                                value={settings.campaign_settings.maximum_reward_amount}
                                onChange={(e) => handleChange('campaign_settings', 'maximum_reward_amount', parseInt(e.target.value))}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                    </div>
                </div>

                {/* 보안 설정 */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">보안 설정</h2>
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="require_email_verification"
                                checked={settings.security_settings.require_email_verification}
                                onChange={(e) => handleChange('security_settings', 'require_email_verification', e.target.checked)}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="require_email_verification" className="ml-2 block text-sm text-gray-700">
                                이메일 인증 필수
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="allow_social_login"
                                checked={settings.security_settings.allow_social_login}
                                onChange={(e) => handleChange('security_settings', 'allow_social_login', e.target.checked)}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="allow_social_login" className="ml-2 block text-sm text-gray-700">
                                소셜 로그인 허용
                            </label>
                        </div>
                        <div>
                            <label htmlFor="session_timeout_minutes" className="block text-sm font-medium text-gray-700">
                                세션 타임아웃 (분)
                            </label>
                            <input
                                type="number"
                                id="session_timeout_minutes"
                                value={settings.security_settings.session_timeout_minutes}
                                onChange={(e) => handleChange('security_settings', 'session_timeout_minutes', parseInt(e.target.value))}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                        {isSaving ? '저장 중...' : '설정 저장'}
                    </button>
                </div>
            </form>
        </div>
    );
} 