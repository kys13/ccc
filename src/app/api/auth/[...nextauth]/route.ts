import NextAuth, { DefaultSession } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { Role, Status } from '@prisma/client';
import jwt from 'jsonwebtoken';

declare module 'next-auth' {
    interface Session {
        user: {
            id: number;
            email: string;
            name: string;
            role: Role;
            status: Status;
            token: string;
        } & DefaultSession['user']
    }

    interface User {
        id: number;
        role: Role;
        status: Status;
        token?: string;
    }

    interface JWT {
        id: number;
        email: string;
        role: Role;
        status: Status;
        token?: string;
    }
}

export type ExtendedUser = {
    id: number;
    email: string;
    name: string;
    role: Role;
    status: Status;
};

const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                console.log('[인증] 로그인 시도:', credentials?.email);
                
                if (!credentials?.email || !credentials?.password) {
                    console.error('[인증] 이메일 또는 비밀번호 없음');
                    throw new Error('이메일과 비밀번호를 입력해주세요.');
                }

                // 사용자 검색
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });
                
                if (!user || !user.password) {
                    console.error('[인증] 사용자를 찾을 수 없음:', credentials.email);
                    throw new Error('이메일 또는 비밀번호가 일치하지 않습니다.');
                }

                // 비밀번호 확인
                const passwordValid = await bcrypt.compare(credentials.password, user.password);
                
                if (!passwordValid) {
                    console.error('[인증] 비밀번호 불일치:', credentials.email);
                    throw new Error('이메일 또는 비밀번호가 일치하지 않습니다.');
                }

                // 관리자 권한 확인 (필요시 주석 해제)
                /*
                if (user.role !== 'ADMIN') {
                    console.error('[인증] 관리자 권한 없음:', credentials.email);
                    throw new Error('관리자 권한이 없습니다.');
                }
                */

                console.log('[인증] 인증 성공:', user.email, '역할:', user.role);
                
                // 인증 성공: 사용자 정보 반환
                return {
                    id: user.id,
                    email: user.email,
                    name: user.name || '',
                    role: user.role,
                    status: user.status,
                };
            }
        })
    ],
    session: {
        strategy: 'jwt',
        maxAge: 7 * 24 * 60 * 60, // 7일(초 단위)
    },
    jwt: {
        maxAge: 7 * 24 * 60 * 60, // 7일(초 단위)
    },
    pages: {
        signIn: '/admin/login',
        error: '/admin/login?error=true',
    },
    debug: process.env.NODE_ENV === 'development',
    cookies: {
        sessionToken: {
            name: `next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: process.env.NODE_ENV === 'production',
            }
        }
    },
    callbacks: {
        async jwt({ token, user }) {
            // 최초 로그인 시에만 user 객체 존재
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.role = user.role;
                token.status = user.status;
                
                // JWT 토큰 생성
                const secret = process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET || 'fallback-secret-key-change-in-production';
                token.token = jwt.sign(
                    { 
                        id: user.id,
                        email: user.email,
                        role: user.role 
                    },
                    secret,
                    { expiresIn: '7d' }
                );
                
                console.log('[JWT] 토큰 생성됨:', user.email);
            }
            
            return token;
        },
        async session({ session, token }) {
            // 세션에 토큰 정보 추가
            if (session?.user) {
                session.user.id = token.id as number;
                session.user.email = token.email as string;
                session.user.role = token.role as Role;
                session.user.status = token.status as Status;
                session.user.token = token.token as string;
                
                console.log('[세션] 세션 업데이트됨:', token.email);
            }
            
            return session;
        }
    }
});

export { handler as GET, handler as POST }; 