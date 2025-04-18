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

    if (!session) {
      return new NextResponse(
        JSON.stringify({ message: '인증이 필요합니다.' }),
        { status: 401 }
      );
    }

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userIdInt = parseInt(params.userId);
    if (isNaN(userIdInt)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    if (session.user.id !== userIdInt) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const [applications, total] = await Promise.all([
      prisma.campaignApplication.findMany({
        where: {
          userId: userIdInt,
        },
        include: {
          campaign: {
            select: {
              id: true,
              title: true,
              endDate: true,
            },
          },
          review: {
            select: {
              id: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.campaignApplication.count({
        where: {
          userId: userIdInt,
        }
      })
    ]);

    return NextResponse.json({ applications, total });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return new NextResponse(
      JSON.stringify({ message: '신청 내역을 불러오는데 실패했습니다.' }),
      { status: 500 }
    );
  }
} 