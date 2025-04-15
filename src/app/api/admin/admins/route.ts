import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth'; // Assuming authOptions is imported

const prisma = new PrismaClient();

// 별도의 verifyToken 함수 제거
// async function verifyToken(token: string) { ... }

export async function GET(request: Request) {
  try {
    // next-auth 세션 확인
    const session = await getServerSession(authOptions);
    
    // 세션이 없거나 역할이 ADMIN이 아니면 접근 거부
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: '관리자 권한이 필요합니다.' },
        { status: 403 } // 401 대신 403이 더 적절할 수 있음
      );
    }

    // 관리자 목록 조회 (헤더 파싱 및 verifyToken 제거)
    const admins = await prisma.user.findMany({
      where: {
        role: 'ADMIN'
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return NextResponse.json(admins);
  } catch (error) {
    console.error('Get admins error:', error);
    return NextResponse.json(
      { message: '관리자 목록을 가져오는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 