import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from './prisma';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { Role, Status } from '@prisma/client';
import jwt from 'jsonwebtoken';

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                console.log('[Authorize] Attempting authorization for:', credentials?.email);
                if (!credentials?.email || !credentials?.password) {
                    console.error('[Authorize] Missing email or password.');
                    throw new Error('이메일과 비밀번호를 입력해주세요.');
                }

                console.log('[Authorize] Finding user...');
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });
                console.log('[Authorize] User found:', user ? user.email : 'Not Found');

                if (!user || !user.password) {
                    console.error('[Authorize] User not found or password not set.');
                    throw new Error('이메일 또는 비밀번호가 일치하지 않습니다.');
                }

                console.log('[Authorize] Comparing password...');
                const isValid = await bcrypt.compare(credentials.password, user.password);
                console.log('[Authorize] Password valid:', isValid);

                if (!isValid) {
                    console.error('[Authorize] Invalid password.');
                    throw new Error('이메일 또는 비밀번호가 일치하지 않습니다.');
                }

                console.log('[Authorize] Authorization successful for:', user.email);
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
        strategy: 'jwt'
    },
    pages: {
        signIn: '/admin/login',
    },
    cookies: {
        sessionToken: {
          name: `__Secure-next-auth.session-token`,
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
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.status = user.status;
                // JWT 토큰 생성
                token.token = jwt.sign(
                    { 
                        id: user.id,
                        email: user.email,
                        role: user.role 
                    },
                    process.env.JWT_SECRET || 'your-stronger-fallback-secret-that-is-consistent-across-restarts',
                    { expiresIn: '7d' }
                );
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as number;
                session.user.role = token.role as Role;
                session.user.status = token.status as Status;
                session.user.token = token.token as string;
            }
            return session;
        }
    }
}; 