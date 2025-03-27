const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

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

export async function getAdminSettings(): Promise<AdminSettings> {
    const response = await fetch('/api/admin/settings');
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || '설정을 불러오는데 실패했습니다.');
    }
    const result = await response.json();
    return result.data || result;
}

export async function updateAdminSettings(settings: AdminSettings): Promise<AdminSettings> {
    const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || '설정 업데이트에 실패했습니다.');
    }

    return response.json();
} 