import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // JWT 시크릿 키 가져오기
  const secret = process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET;
  if (!secret) {
    console.error('[미들웨어] NEXTAUTH_SECRET 또는 JWT_SECRET 환경 변수가 설정되지 않았습니다.');
  }
  
  // 쿠키 디버깅
  const cookieHeader = request.headers.get('cookie');
  console.log(`[미들웨어] 쿠키 존재 여부: ${cookieHeader ? '있음' : '없음'}`);
  if (cookieHeader) {
    const cookies = cookieHeader.split(';').map(c => c.trim());
    const sessionCookie = cookies.find(c => c.startsWith('next-auth.session-token='));
    console.log(`[미들웨어] 세션 쿠키 존재 여부: ${sessionCookie ? '있음' : '없음'}`);
  }
  
  // 세션 토큰 가져오기
  const token = await getToken({ 
    req: request,
    secret
  });
  
  console.log(`[미들웨어] 경로: ${pathname}`);
  console.log(`[미들웨어] 토큰 존재 여부: ${token ? '있음' : '없음'}`);
  
  if (token) {
    console.log(`[미들웨어] 토큰 정보 - ID: ${token.id}, 역할: ${token.role}, 이메일: ${token.email}`);
  }

  // 1. /admin 경로로 접근 시 /admin/dashboard로 리다이렉트
  if (pathname === '/admin') {
    console.log('[미들웨어] /admin에서 /admin/dashboard로 리다이렉트');
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  // 2. /admin/login 페이지에서 이미 인증된 경우 처리
  if (pathname === '/admin/login') {
    if (token && token.role === 'ADMIN') {
      const returnTo = request.nextUrl.searchParams.get('returnTo');
      if (returnTo && returnTo.startsWith('/admin')) {
        console.log(`[미들웨어] 이미 로그인됨. ${returnTo}로 리다이렉트`);
        return NextResponse.redirect(new URL(returnTo, request.url));
      }
      console.log('[미들웨어] 이미 로그인됨. 대시보드로 리다이렉트');
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    return NextResponse.next();
  }
  
  // 3. /api/admin/ 경로의 API 요청 처리
  if (pathname.startsWith('/api/admin')) {
    if (!token) {
      console.error('[미들웨어] API 접근 거부: 인증 토큰 없음');
      return NextResponse.json({ message: '인증이 필요합니다.' }, { status: 401 });
    }
    
    if (token.role !== 'ADMIN') {
      console.error(`[미들웨어] API 접근 거부: 사용자 역할(${token.role})이 ADMIN이 아님`);
      return NextResponse.json({ message: '관리자 권한이 필요합니다.' }, { status: 403 });
    }
    
    console.log('[미들웨어] API 접근 허용: 관리자 인증 완료');
    return NextResponse.next();
  }
  
  // 4. 관리자 페이지 접근 권한 체크 (로그인 페이지 제외)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    // 토큰이 없는 경우
    if (!token) {
      console.log(`[미들웨어] 관리자 페이지 접근 거부: 인증 토큰 없음, 로그인 페이지로 리다이렉트`);
      const url = new URL('/admin/login', request.url);
      url.searchParams.set('returnTo', pathname);
      return NextResponse.redirect(url);
    }
    
    // 관리자 역할이 아닌 경우
    if (token.role !== 'ADMIN') {
      console.log(`[미들웨어] 관리자 페이지 접근 거부: 사용자 역할(${token.role})이 ADMIN이 아님`);
      return NextResponse.redirect(new URL('/?error=unauthorized', request.url));
    }
    
    // 모든 검증 통과
    console.log(`[미들웨어] 관리자 페이지 접근 허용: ${pathname}`);
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*', '/api/admin/:path*'],
}; 