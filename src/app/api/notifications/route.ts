import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/notifications
export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');

        if (!userId) {
            return NextResponse.json({ error: 'UserId is required' }, { status: 400 });
        }

        const userIdInt = parseInt(userId);
        if (isNaN(userIdInt)) {
            return NextResponse.json({ error: 'Invalid userId format' }, { status: 400 });
        }

        if (session.user.id !== userIdInt) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const skip = (page - 1) * limit;
        const [notifications, total] = await Promise.all([
            prisma.notification.findMany({
                where: { userId: session.user.id },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
            }),
            prisma.notification.count({
                where: { userId: session.user.id },
            }),
        ]);

        return NextResponse.json({
            notifications,
            pagination: {
                page,
                limit,
                totalPages: Math.ceil(total / limit),
                total,
            },
        });
    } catch (error) {
        console.error('Error fetching notifications:', error);
        return NextResponse.json(
            { error: 'Failed to fetch notifications' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { title, content, type, userId } = body;

        if (!title || !content || !type || !userId) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        let numericUserIdBody: number;
        if (typeof userId === 'string') {
            numericUserIdBody = parseInt(userId);
        } else if (typeof userId === 'number') {
            numericUserIdBody = userId;
        } else {
            return NextResponse.json({ error: 'Invalid userId type in body' }, { status: 400 });
        }

        if (isNaN(numericUserIdBody)) {
            return NextResponse.json({ error: 'Invalid userId format in body' }, { status: 400 });
        }

        if (session.user.id !== numericUserIdBody) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const notification = await prisma.notification.create({
            data: {
                title,
                content,
                type,
                userId: numericUserIdBody,
            }
        });

        return NextResponse.json(notification);
    } catch (error) {
        console.error('Error creating notification:', error);
        return NextResponse.json(
            { error: 'Failed to create notification' },
            { status: 500 }
        );
    }
} 