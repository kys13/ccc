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

    // 통계 데이터 수집
    const [
      totalUsers,
      totalCampaigns,
      applicationStats,
    ] = await Promise.all([
      // 총 사용자 수
      prisma.user.count(),
      
      // 총 캠페인 수
      prisma.campaign.count(),
      
      // 신청 상태별 통계
      prisma.campaignApplication.groupBy({
        by: ['status'],
        _count: true,
      }),
    ]);

    // 신청 상태별 카운트 계산
    const applicationCounts = applicationStats.reduce((acc, stat) => {
      acc[stat.status.toLowerCase()] = stat._count;
      return acc;
    }, {} as Record<string, number>);

    const stats = {
      totalUsers,
      totalCampaigns,
      totalApplications: applicationStats.reduce((sum, stat) => sum + stat._count, 0),
      pendingApplications: applicationCounts['pending'] || 0,
      approvedApplications: applicationCounts['approved'] || 0,
      rejectedApplications: applicationCounts['rejected'] || 0,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: '통계 정보를 가져오는데 실패했습니다.' },
      { status: 500 }
    );
  }
} 