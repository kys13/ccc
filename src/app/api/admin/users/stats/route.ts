import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    const admin = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!admin || admin.role !== 'ADMIN') {
      return NextResponse.json(
        { error: '관리자 권한이 필요합니다.' },
        { status: 403 }
      );
    }

    // Get total users count
    const totalUsers = await prisma.user.count();

    // Get active users count
    const activeUsers = await prisma.user.count({
      where: { status: 'ACTIVE' },
    });

    // Get inactive users count
    const inactiveUsers = await prisma.user.count({
      where: { status: 'INACTIVE' },
    });

    return NextResponse.json({
      totalUsers,
      activeUsers,
      inactiveUsers,
    });
  } catch (error) {
    console.error('Error fetching user statistics:', error);
    return NextResponse.json(
      { error: '사용자 통계를 가져오는데 실패했습니다.' },
      { status: 500 }
    );
  }
} 