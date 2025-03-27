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

    if (session.user.id !== params.userId) {
      return new NextResponse(
        JSON.stringify({ message: '권한이 없습니다.' }),
        { status: 403 }
      );
    }

    const reviews = await prisma.review.findMany({
      where: {
        userId: params.userId,
      },
      include: {
        campaign: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return new NextResponse(
      JSON.stringify({ message: '리뷰를 불러오는데 실패했습니다.' }),
      { status: 500 }
    );
  }
} 