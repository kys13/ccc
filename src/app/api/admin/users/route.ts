import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getToken } from 'next-auth/jwt';

export async function GET(request: NextRequest) {
  try {
    // 1. 서버 측 세션으로 인증 시도
    const session = await getServerSession(authOptions);
    
    // 2. 클라이언트측 JWT 토큰으로 인증 시도
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET 
    });
    
    console.log('[API] Users: Session found:', !!session);
    console.log('[API] Users: Token found:', !!token);
    
    // 세션이나 토큰 중 하나는 있어야 함
    if (!session?.user?.email && !token) {
      console.error('[API] Users: 인증 실패 - 세션 및 토큰 없음');
      return NextResponse.json(
        { error: '인증이 필요합니다.' },
        { status: 401 }
      );
    }
    
    // 사용자 이메일 (세션 또는 토큰에서)
    const userEmail = session?.user?.email || token?.email as string;
    const userRole = session?.user?.role || token?.role as string;
    
    // 관리자 권한 확인
    if (userRole === 'ADMIN') {
      console.log('[API] Users: 관리자 권한 확인됨');
    } else {
      // DB에서 사용자 확인 및 권한 검증
      console.log('[API] Users: DB에서 사용자 정보 확인 중:', userEmail);
      const admin = await prisma.user.findUnique({
        where: { email: userEmail },
      });

      if (!admin || admin.role !== 'ADMIN') {
        console.error('[API] Users: 권한 없음 - 역할:', admin?.role);
        return NextResponse.json(
          { error: '관리자 권한이 필요합니다.' },
          { status: 403 }
        );
      }
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const role = searchParams.get('role');
    const status = searchParams.get('status');

    // Calculate skip
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    
    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' as const } },
        { name: { contains: search, mode: 'insensitive' as const } }
      ];
    }
    
    if (role) {
      where.role = role;
    }
    
    if (status) {
      where.status = status;
    }

    // Get total count
    const total = await prisma.user.count({ where });

    // Get users
    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    });

    return NextResponse.json({
      users,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: '사용자 목록을 가져오는데 실패했습니다.' },
      { status: 500 }
    );
  }
} 