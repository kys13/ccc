import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.user.id !== params.userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const settings = await prisma.notificationSettings.findUnique({
      where: { userId: params.userId },
    });

    if (!settings) {
      const newSettings = await prisma.notificationSettings.create({
        data: {
          userId: params.userId,
          emailNotifications: true,
          pushNotifications: true,
          campaignUpdates: true,
          applicationStatus: true,
          reviewReminders: true,
        },
      });
      return NextResponse.json(newSettings);
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching notification settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notification settings' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.user.id !== params.userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { emailNotifications, pushNotifications, campaignUpdates, applicationStatus, reviewReminders } = body;

    const settings = await prisma.notificationSettings.upsert({
      where: { userId: params.userId },
      create: {
        userId: params.userId,
        emailNotifications,
        pushNotifications,
        campaignUpdates,
        applicationStatus,
        reviewReminders,
      },
      update: {
        emailNotifications,
        pushNotifications,
        campaignUpdates,
        applicationStatus,
        reviewReminders,
      },
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error updating notification settings:', error);
    return NextResponse.json(
      { error: 'Failed to update notification settings' },
      { status: 500 }
    );
  }
} 