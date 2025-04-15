import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';

export async function GET(request: NextRequest) {
  try {
    console.log('[API /api/admin/applications] Received GET request');
    
    // 1. 서버 측 세션 확인 (getServerSession)
    console.log('[API /api/admin/applications] Attempting to get session...');
    const session = await getServerSession(authOptions);
    console.log('[API /api/admin/applications] Session fetched:', session ? 'Yes' : 'No');

    // 2. 클라이언트 측 토큰 확인 (getToken)
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET 
    });
    console.log('[API /api/admin/applications] JWT token found:', token ? 'Yes' : 'No');

    // 둘 중 하나는 반드시 존재해야 함
    if (!session?.user?.email && !token) {
      console.error('[API /api/admin/applications] Access denied: No session or token found');
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
      console.log('[API /api/admin/applications] Admin role found in session/token, proceeding');
    } else {
      // DB에서 사용자 확인 및 역할 검증
      console.log('[API /api/admin/applications] Checking user in DB:', userEmail);
      const admin = await prisma.user.findUnique({
        where: { email: userEmail },
      });

      if (!admin || admin.role !== 'ADMIN') {
        console.error(`[API /api/admin/applications] Access denied: User not found or not ADMIN. User role: ${admin?.role}`);
        return NextResponse.json(
          { error: '관리자 권한이 필요합니다.' },
          { status: 403 }
        );
      }
    }

    console.log('[API /api/admin/applications] Fetching applications...');
    const applications = await prisma.campaignApplication.findMany({
      include: {
        campaign: {
          select: {
            id: true,
            title: true,
            status: true,
            visitCategoryId: true,
            deliveryCategoryId: true,
            visitCategory: {
              select: {
                name: true
              }
            },
            deliveryCategory: {
              select: {
                name: true
              }
            }
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
      orderBy: {
        createdAt: 'desc',
      },
    });

    // 응답에 캠페인 타입 추가
    const processedApplications = applications.map(app => {
      const campaignType = app.campaign.visitCategoryId ? 'visit' : app.campaign.deliveryCategoryId ? 'delivery' : null;
      
      return {
        ...app,
        campaign: {
          ...app.campaign,
          campaignType
        }
      };
    });

    console.log(`[API /api/admin/applications] Found ${processedApplications.length} applications`);
    return NextResponse.json({ applications: processedApplications });
  } catch (error) {
    console.error('Failed to fetch applications:', error);
    return NextResponse.json(
      { error: '신청 목록을 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    console.log('[API /api/admin/applications] Received PUT request');
    
    // 1. 서버 측 세션 확인 (getServerSession)
    console.log('[API /api/admin/applications] Attempting to get session...');
    const session = await getServerSession(authOptions);
    console.log('[API /api/admin/applications] Session fetched:', session ? 'Yes' : 'No');

    // 2. 클라이언트 측 토큰 확인 (getToken)
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET 
    });
    console.log('[API /api/admin/applications] JWT token found:', token ? 'Yes' : 'No');

    // 둘 중 하나는 반드시 존재해야 함
    if (!session?.user?.email && !token) {
      console.error('[API /api/admin/applications] Access denied: No session or token found');
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
      console.log('[API /api/admin/applications] Admin role found in session/token, proceeding');
    } else {
      // DB에서 사용자 확인 및 역할 검증
      console.log('[API /api/admin/applications] Checking user in DB:', userEmail);
      const admin = await prisma.user.findUnique({
        where: { email: userEmail },
      });

      if (!admin || admin.role !== 'ADMIN') {
        console.error(`[API /api/admin/applications] Access denied: User not found or not ADMIN. User role: ${admin?.role}`);
        return NextResponse.json(
          { error: '관리자 권한이 필요합니다.' },
          { status: 403 }
        );
      }
    }

    const { applicationId, status } = await request.json();

    if (!applicationId || !status) {
      return NextResponse.json(
        { error: '필수 정보가 누락되었습니다.' },
        { status: 400 }
      );
    }

    const application = await prisma.campaignApplication.update({
      where: {
        id: applicationId,
      },
      data: {
        status,
      },
    });

    return NextResponse.json({ application });
  } catch (error) {
    console.error('Failed to update application:', error);
    return NextResponse.json(
      { error: '신청 상태 업데이트에 실패했습니다.' },
      { status: 500 }
    );
  }
} 