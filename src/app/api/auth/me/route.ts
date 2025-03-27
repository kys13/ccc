import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new NextResponse(
            JSON.stringify({ error: 'Not authenticated' }),
            { status: 401 }
        );
    }

    return NextResponse.json(session.user);
} 