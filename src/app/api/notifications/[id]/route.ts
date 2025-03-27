import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// PUT /api/notifications/[id] - Mark notification as read
export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        // Check authentication
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get notification ID from params
        const notificationId = parseInt(params.id);
        if (isNaN(notificationId)) {
            return NextResponse.json(
                { error: 'Invalid notification ID' },
                { status: 400 }
            );
        }

        // Get the notification to check ownership
        const notification = await prisma.notification.findUnique({
            where: { id: notificationId },
        });

        if (!notification) {
            return NextResponse.json(
                { error: 'Notification not found' },
                { status: 404 }
            );
        }

        // Check if the user owns the notification
        if (notification.userId !== parseInt(session.user.id)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Mark notification as read
        const updatedNotification = await prisma.notification.update({
            where: { id: notificationId },
            data: { isRead: true },
        });

        return NextResponse.json(updatedNotification);
    } catch (error) {
        console.error('Error marking notification as read:', error);
        return NextResponse.json(
            { error: 'Failed to mark notification as read' },
            { status: 500 }
        );
    }
}

// DELETE /api/notifications/[id] - Delete notification
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        // Check authentication
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get notification ID from params
        const notificationId = parseInt(params.id);
        if (isNaN(notificationId)) {
            return NextResponse.json(
                { error: 'Invalid notification ID' },
                { status: 400 }
            );
        }

        // Get the notification to check ownership
        const notification = await prisma.notification.findUnique({
            where: { id: notificationId },
        });

        if (!notification) {
            return NextResponse.json(
                { error: 'Notification not found' },
                { status: 404 }
            );
        }

        // Check if the user owns the notification
        if (notification.userId !== parseInt(session.user.id)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Delete notification
        await prisma.notification.delete({
            where: { id: notificationId },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting notification:', error);
        return NextResponse.json(
            { error: 'Failed to delete notification' },
            { status: 500 }
        );
    }
} 