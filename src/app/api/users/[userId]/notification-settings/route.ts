import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// 기본 설정 값
const defaultSettings = {
  campaign: { email: true, sms: false, push: true },
  review: { email: true, sms: false, push: true },
  system: { email: true, sms: false, push: true },
};

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userIdInt = parseInt(params.userId);
    if (isNaN(userIdInt)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    if (session.user.id !== userIdInt) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    let settings = await prisma.notificationSettings.findUnique({
      where: { userId: userIdInt },
    });
    
    // 설정이 없으면 기본값으로 생성 후 반환
    if (!settings) {
      settings = await prisma.notificationSettings.create({
        data: {
          userId: userIdInt,
          ...defaultSettings, // 기본값 사용
        },
      });
    }
    // Prisma Json 타입은 자동으로 객체로 파싱됨
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

    const userIdInt = parseInt(params.userId);
    if (isNaN(userIdInt)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    if (session.user.id !== userIdInt) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { campaign, review, system } = body;

    const settings = await prisma.notificationSettings.upsert({
      where: { userId: userIdInt },
      create: {
        userId: userIdInt,
        campaign: campaign ?? defaultSettings.campaign,
        review: review ?? defaultSettings.review,
        system: system ?? defaultSettings.system,
      },
      update: {
        ...(campaign !== undefined && { campaign }),
        ...(review !== undefined && { review }),
        ...(system !== undefined && { system }),
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