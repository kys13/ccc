import { NotificationType, NotificationChannel } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import type { Notification, NotificationPreference } from '@/types/notification';

export interface NotificationData {
    type: NotificationType;
    title: string;
    content: string;
    link?: string;
    channels: NotificationChannel[];
    metadata?: Record<string, any>;
    expiresAt?: Date;
}

export interface NotificationPreferenceData {
    type: NotificationType;
    channels: NotificationChannel[];
    enabled: boolean;
}

interface GetNotificationsParams {
    userId: number;
    page?: number;
    limit?: number;
}

// Fetch notifications for a user
export async function getNotifications({
    userId,
    page = 1,
    limit = 10,
}: GetNotificationsParams) {
    const response = await fetch(`/api/notifications?userId=${userId}&page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch notifications');
    }

    return response.json();
}

// Mark a notification as read
export async function markNotificationAsRead(notificationId: number) {
    const response = await fetch(`/api/notifications/${notificationId}/read`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to mark notification as read');
    }

    return response.json();
}

// Mark all notifications as read for a user
export async function markAllNotificationsAsRead(userId: number) {
    try {
        return await prisma.notification.updateMany({
            where: { userId, isRead: false },
            data: { isRead: true },
        });
    } catch (error) {
        console.error('Error marking all notifications as read:', error);
        throw new Error('Failed to mark all notifications as read');
    }
}

// Delete a notification
export async function deleteNotification(notificationId: number) {
    const response = await fetch(`/api/notifications/${notificationId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to delete notification');
    }

    return response.json();
}

// Get notification preferences for a user
export async function getNotificationPreferences(userId: number) {
    const response = await fetch(`/api/notifications/preferences?userId=${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch notification preferences');
    }

    return response.json();
}

// Update notification preferences for a user
export async function updateNotificationPreferences(
    userId: number,
    preferences: NotificationPreference[]
) {
    const response = await fetch('/api/notifications/preferences', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, preferences }),
    });

    if (!response.ok) {
        throw new Error('Failed to update notification preferences');
    }

    return response.json();
}

// Create a new notification
export async function createNotification(userId: number, data: NotificationData) {
    try {
        // Get user's notification preferences
        const preferences = await prisma.notificationPreference.findFirst({
            where: { userId, type: data.type },
        });

        // If notifications are disabled for this type, don't create the notification
        if (preferences && !preferences.enabled) {
            return null;
        }

        // Create the notification
        const notification = await prisma.notification.create({
            data: {
                userId,
                type: data.type,
                title: data.title,
                content: data.content,
                link: data.link,
                channels: data.channels,
                metadata: data.metadata,
                expiresAt: data.expiresAt,
            },
        });

        // Log notification creation
        await prisma.notificationLog.create({
            data: {
                notificationId: notification.id,
                channel: data.channels[0], // Log the first channel
                status: 'success',
            },
        });

        return notification;
    } catch (error) {
        console.error('Error creating notification:', error);
        throw new Error('Failed to create notification');
    }
}

// Subscribe to web push notifications
export async function subscribeToWebPush() {
    try {
        // Check if push notifications are supported
        if (!('Notification' in window)) {
            throw new Error('This browser does not support push notifications');
        }

        // Request permission
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
            throw new Error('Permission not granted for push notifications');
        }

        // TODO: Implement web push subscription logic
        // This would typically involve:
        // 1. Getting the service worker registration
        // 2. Getting the push subscription
        // 3. Sending the subscription to your backend
        // 4. Storing the subscription in your database

        return true;
    } catch (error) {
        console.error('Error subscribing to web push:', error);
        throw new Error('Failed to subscribe to web push notifications');
    }
} 