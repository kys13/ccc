import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const NOTIFICATION_TYPES = ['campaign', 'review', 'system'] as const;
const NOTIFICATION_CHANNELS = ['email', 'sms', 'push'] as const;

type NotificationType = typeof NOTIFICATION_TYPES[number];
type NotificationChannel = typeof NOTIFICATION_CHANNELS[number];

interface NotificationSettings {
  [key: string]: {
    email?: boolean;
    sms?: boolean;
    push?: boolean;
  };
}

function isValidNotificationType(type: string): type is NotificationType {
  return NOTIFICATION_TYPES.includes(type as NotificationType);
}

function isValidNotificationChannel(channel: string): channel is NotificationChannel {
  return NOTIFICATION_CHANNELS.includes(channel as NotificationChannel);
}

// GET /api/notifications/preferences
export async function GET(req: NextRequest) {
    try {
        // Check authentication
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
        }

        // Get user's notification preferences
        const settings = await prisma.notificationSettings.findUnique({
            where: {
                userId: session.user.id
            }
        });

        const defaultSettings = {
            campaign: { email: true, sms: true, push: true },
            review: { email: true, sms: false, push: true },
            system: { email: true, sms: false, push: true }
        };

        return NextResponse.json(settings || defaultSettings);
    } catch (error) {
        console.error('알림 설정 조회 에러:', error);
        return NextResponse.json(
            { error: '알림 설정을 조회하는데 실패했습니다.' },
            { status: 500 }
        );
    }
}

// PUT /api/notifications/preferences
export async function PUT(req: NextRequest) {
    try {
        // Check authentication
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
        }

        // Get request body
        const data = await req.json();
        const { type, channel, enabled } = data;

        if (!isValidNotificationType(type) || !isValidNotificationChannel(channel) || typeof enabled !== 'boolean') {
            return NextResponse.json(
                { error: '유효하지 않은 알림 설정입니다.' },
                { status: 400 }
            );
        }

        const existingPreferences = await prisma.notificationSettings.findUnique({
            where: {
                userId: session.user.id
            }
        });

        const currentSettings = existingPreferences?.[type] as Record<string, boolean> || {};
        
        const preferences = await prisma.notificationSettings.upsert({
            where: {
                userId: session.user.id
            },
            update: {
                [type]: {
                    ...currentSettings,
                    [channel]: enabled
                }
            },
            create: {
                userId: session.user.id,
                [type]: {
                    [channel]: enabled
                }
            }
        });

        return NextResponse.json(preferences);
    } catch (error) {
        console.error('알림 설정 업데이트 에러:', error);
        return NextResponse.json(
            { error: '알림 설정을 업데이트하는데 실패했습니다.' },
            { status: 500 }
        );
    }
} 