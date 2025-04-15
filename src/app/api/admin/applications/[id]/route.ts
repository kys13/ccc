import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getToken } from 'next-auth/jwt';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log(`[API /api/admin/applications/${params.id}] Received PATCH request`);
    
    // 1. 서버 측 세션 확인 (getServerSession)
    console.log(`[API /api/admin/applications/${params.id}] Attempting to get session...`);
    const session = await getServerSession(authOptions);
    console.log(`[API /api/admin/applications/${params.id}] Session fetched:`, session ? 'Yes' : 'No');

    // 2. 클라이언트 측 토큰 확인 (getToken)
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET 
    });
    console.log(`[API /api/admin/applications/${params.id}] JWT token found:`, token ? 'Yes' : 'No');

    // 둘 중 하나는 반드시 존재해야 함
    if (!session?.user?.email && !token) {
      console.error(`[API /api/admin/applications/${params.id}] Access denied: No session or token found`);
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
      console.log(`[API /api/admin/applications/${params.id}] Admin role found in session/token, proceeding`);
    } else {
      // DB에서 사용자 확인 및 역할 검증
      console.log(`[API /api/admin/applications/${params.id}] Checking user in DB:`, userEmail);
      const admin = await prisma.user.findUnique({
        where: { email: userEmail },
      });

      if (!admin || admin.role !== 'ADMIN') {
        console.error(`[API /api/admin/applications/${params.id}] Access denied: User not found or not ADMIN. User role: ${admin?.role}`);
        return NextResponse.json(
          { error: '관리자 권한이 필요합니다.' },
          { status: 403 }
        );
      }
    }

    const { status } = await request.json();
    const applicationId = parseInt(params.id);

    if (!['APPROVED', 'REJECTED', 'PENDING'].includes(status)) {
      return NextResponse.json(
        { error: '유효하지 않은 상태입니다.' },
        { status: 400 }
      );
    }

    console.log(`[API /api/admin/applications/${params.id}] Updating application ${applicationId} to status: ${status}`);
    try {
      const application = await prisma.campaignApplication.update({
        where: {
          id: applicationId,
        },
        data: {
          status: status,
          updatedAt: new Date(),
        },
        include: {
          campaign: {
            select: {
              id: true,
              title: true,
              visitCategoryId: true,
              deliveryCategoryId: true,
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
      });

      // 캠페인 타입 결정
      const processedApplication = {
        ...application,
        campaign: {
          ...application.campaign,
          campaignType: application.campaign.visitCategoryId ? 'visit' : 
                       application.campaign.deliveryCategoryId ? 'delivery' : null
        }
      };

      console.log(`[API /api/admin/applications/${params.id}] Application updated successfully`);
      return NextResponse.json(processedApplication);
    } catch (dbError) {
      console.error(`[API /api/admin/applications/${params.id}] Database error:`, dbError);
      return NextResponse.json(
        { error: '데이터베이스 오류가 발생했습니다.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(`[API /api/admin/applications/${params.id}] Error updating application:`, error);
    return NextResponse.json(
      { error: '신청 상태 변경에 실패했습니다.' },
      { status: 500 }
    );
  }
} 