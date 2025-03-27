import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  // API 요청 처리
  if (pathname.startsWith('/api/admin')) {
    if (!token) {
      return NextResponse.json({ message: '인증이 필요합니다.' }, { status: 401 });
    }

    try {
      const decoded = await verifyToken(token);
      if (!decoded || decoded.role !== 'ADMIN') {
        return NextResponse.json({ message: '관리자 권한이 필요합니다.' }, { status: 403 });
      }

      // API 요청에 토큰 추가
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('Authorization', `Bearer ${token}`);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      return NextResponse.json({ message: '유효하지 않은 토큰입니다.' }, { status: 401 });
    }
  }

  // 관리자 페이지 접근 체크
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!token) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('returnTo', pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const decoded = await verifyToken(token);
      if (!decoded || decoded.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/', request.url));
      }
      return NextResponse.next();
    } catch (error) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('returnTo', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 관리자 로그인 페이지에서 이미 로그인된 관리자는 returnTo 경로 또는 대시보드로 리다이렉트
  if (pathname === '/admin/login') {
    if (token) {
      try {
        const decoded = await verifyToken(token);
        if (decoded && decoded.role === 'ADMIN') {
          const returnTo = request.nextUrl.searchParams.get('returnTo');
          if (returnTo && returnTo.startsWith('/admin')) {
            return NextResponse.redirect(new URL(returnTo, request.url));
          }
          return NextResponse.redirect(new URL('/admin/dashboard', request.url));
        }
      } catch (error) {
        // 토큰이 유효하지 않으면 로그인 페이지에 머무름
        return NextResponse.next();
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}; 