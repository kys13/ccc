import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'default-secret-key';

export async function middleware(request: NextRequest) {
    // CSRF 토큰 검증
    const csrfToken = request.headers.get('X-CSRF-Token');
    const sessionToken = request.cookies.get('csrf-token')?.value;

    if (!csrfToken || !sessionToken || csrfToken !== sessionToken) {
        return new NextResponse(
            JSON.stringify({ message: 'Invalid CSRF token' }),
            { status: 403, headers: { 'content-type': 'application/json' } }
        );
    }

    // JWT 토큰 검증
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
        return new NextResponse(
            JSON.stringify({ message: 'Authentication required' }),
            { status: 401, headers: { 'content-type': 'application/json' } }
        );
    }

    try {
        const { payload } = await jwtVerify(
            token,
            new TextEncoder().encode(SECRET_KEY)
        );

        // 관리자 권한 검증
        if (payload.role !== 'admin') {
            return new NextResponse(
                JSON.stringify({ message: 'Admin privileges required' }),
                { status: 403, headers: { 'content-type': 'application/json' } }
            );
        }

        // 요청 허용
        return NextResponse.next();
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: 'Invalid token' }),
            { status: 401, headers: { 'content-type': 'application/json' } }
        );
    }
}

export const config = {
    matcher: ['/api/admin/:path*']
}; 