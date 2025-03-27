import NextAuth, { DefaultSession } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { Role, Status } from '@prisma/client';

declare module 'next-auth' {
    interface Session {
        user: {
            id: number;
            email: string;
            name: string;
            role: Role;
            status: Status;
        } & DefaultSession['user']
    }

    interface User {
        id: number;
        role: Role;
        status: Status;
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
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('이메일과 비밀번호를 입력해주세요.');
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });

                if (!user || !user.password) {
                    throw new Error('이메일 또는 비밀번호가 일치하지 않습니다.');
                }

                const isValid = await bcrypt.compare(credentials.password, user.password);

                if (!isValid) {
                    throw new Error('이메일 또는 비밀번호가 일치하지 않습니다.');
                }

                if (user.role !== 'ADMIN') {
                    throw new Error('관리자 권한이 없습니다.');
                }

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
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.status = user.status;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as number;
                session.user.role = token.role as Role;
                session.user.status = token.status as Status;
            }
            return session;
        }
    }
});

export { handler as GET, handler as POST }; 