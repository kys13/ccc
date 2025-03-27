import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NotificationType, NotificationChannel } from '@prisma/client';

// GET /api/notifications/preferences
export async function GET(request: Request) {
    try {
        // Check authentication
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get user's notification preferences
        const preferences = await prisma.notificationPreference.findMany({
            where: { userId: parseInt(session.user.id) },
        });

        // If no preferences exist, create default preferences
        if (preferences.length === 0) {
            const defaultPreferences = Object.values(NotificationType).map(type => ({
                userId: parseInt(session.user.id),
                type,
                channels: [
                    NotificationChannel.IN_APP,
                    NotificationChannel.EMAIL,
                ],
                enabled: true,
            }));

            await prisma.notificationPreference.createMany({
                data: defaultPreferences,
            });

            return NextResponse.json(defaultPreferences);
        }

        return NextResponse.json(preferences);
    } catch (error) {
        console.error('Error fetching notification preferences:', error);
        return NextResponse.json(
            { error: 'Failed to fetch notification preferences' },
            { status: 500 }
        );
    }
}

// PUT /api/notifications/preferences
export async function PUT(request: Request) {
    try {
        // Check authentication
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get request body
        const body = await request.json();
        const { preferences } = body;

        // Validate preferences
        if (!Array.isArray(preferences)) {
            return NextResponse.json(
                { error: 'Invalid preferences format' },
                { status: 400 }
            );
        }

        // Validate each preference
        for (const pref of preferences) {
            if (
                !pref.type ||
                !Array.isArray(pref.channels) ||
                typeof pref.enabled !== 'boolean'
            ) {
                return NextResponse.json(
                    { error: 'Invalid preference format' },
                    { status: 400 }
                );
            }

            // Validate notification type
            if (!Object.values(NotificationType).includes(pref.type)) {
                return NextResponse.json(
                    { error: `Invalid notification type: ${pref.type}` },
                    { status: 400 }
                );
            }

            // Validate notification channels
            for (const channel of pref.channels) {
                if (!Object.values(NotificationChannel).includes(channel)) {
                    return NextResponse.json(
                        { error: `Invalid notification channel: ${channel}` },
                        { status: 400 }
                    );
                }
            }
        }

        // Delete existing preferences
        await prisma.notificationPreference.deleteMany({
            where: { userId: parseInt(session.user.id) },
        });

        // Create new preferences
        const updatedPreferences = await prisma.notificationPreference.createMany({
            data: preferences.map(pref => ({
                userId: parseInt(session.user.id),
                type: pref.type as NotificationType,
                channels: pref.channels as NotificationChannel[],
                enabled: pref.enabled,
            })),
        });

        return NextResponse.json(updatedPreferences);
    } catch (error) {
        console.error('Error updating notification preferences:', error);
        return NextResponse.json(
            { error: 'Failed to update notification preferences' },
            { status: 500 }
        );
    }
} 