import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getToken } from 'next-auth/jwt';

export async function GET(request: NextRequest) {
  console.log('[API /api/admin/stats] Received GET request');
  try {
    // 1. 서버 측 세션 확인 (getServerSession)
    console.log('[API /api/admin/stats] Attempting to get session...');
    const session = await getServerSession(authOptions);
    console.log('[API /api/admin/stats] Session fetched:', session ? 'Yes' : 'No');

    // 2. 클라이언트 측 토큰 확인 (getToken)
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET 
    });
    console.log('[API /api/admin/stats] JWT token found:', token ? 'Yes' : 'No');

    // 둘 중 하나는 반드시 존재해야 함
    if (!session?.user?.email && !token) {
      console.error('[API /api/admin/stats] Access denied: No session or token found');
      return NextResponse.json(
        { error: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    // 사용할 사용자 이메일 (세션 또는 토큰에서)
    const userEmail = session?.user?.email || token?.email as string;
    const userRole = session?.user?.role || token?.role as string;

    // 세션이나 토큰에 ADMIN 역할이 명시된 경우 즉시 승인 (DB 확인 생략)
    if (userRole === 'ADMIN') {
      console.log('[API /api/admin/stats] Admin role found in session/token, proceeding');
    } else {
      // DB에서 사용자 확인 및 역할 검증
      console.log('[API /api/admin/stats] Checking user in DB:', userEmail);
      const admin = await prisma.user.findUnique({
        where: { email: userEmail },
      });

      if (!admin || admin.role !== 'ADMIN') {
        console.error(`[API /api/admin/stats] Access denied: User not found or not ADMIN. User role: ${admin?.role}`);
        return NextResponse.json(
          { error: '관리자 권한이 필요합니다.' },
          { status: 403 }
        );
      }
    }

    console.log('[API /api/admin/stats] Access granted. Fetching stats...');
    // 통계 데이터 수집
    const [
      totalUsers,
      totalCampaigns,
      activeCampaigns,
      applicationStats,
      recentApplications,
      categoryStats,
    ] = await Promise.all([
      // 총 사용자 수
      prisma.user.count(),
      
      // 총 캠페인 수
      prisma.campaign.count(),

      // 활성 캠페인 수
      prisma.campaign.count({
        where: { status: 'ACTIVE' },
      }),
      
      // 신청 상태별 통계
      prisma.campaignApplication.groupBy({
        by: ['status'],
        _count: true,
      }),

      // 최근 신청 내역
      prisma.campaignApplication.findMany({
        take: 7,
        orderBy: { createdAt: 'desc' },
        include: {
          campaign: {
            select: {
              id: true,
              title: true,
            },
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),

      // 카테고리별 캠페인 통계
      prisma.campaignCategory.findMany({
        include: {
          _count: {
            select: {
              campaigns: true,
            },
          },
        },
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
      activeCampaigns,
      totalApplications: applicationStats.reduce((sum, stat) => sum + stat._count, 0),
      pendingApplications: applicationCounts['pending'] || 0,
      approvedApplications: applicationCounts['approved'] || 0,
      rejectedApplications: applicationCounts['rejected'] || 0,
      recentApplications,
      categoryStats,
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