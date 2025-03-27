import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// GET /api/user/profile
export async function GET(request: NextRequest) {
    try {
        // Get token from Authorization header
        const headersList = headers();
        const authHeader = headersList.get('Authorization');
        const token = authHeader?.split(' ')[1];

        console.log('Auth Header:', authHeader);
        console.log('Token:', token);

        if (!token) {
            console.log('No token found');
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Verify JWT token
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
        console.log('Decoded token:', decoded);

        const userId = decoded.userId;
        console.log('User ID from token:', userId);

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                email: true,
                name: true,
                phoneNumber: true,
                userType: true,
                ssn: true,
                businessNumber: true,
                postcode: true,
                address: true,
                addressDetail: true,
                snsAccounts: {
                    select: {
                        id: true,
                        platform: true,
                        username: true,
                        url: true
                    }
                }
            }
        });

        if (!user) {
            console.log('User not found for ID:', userId);
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        console.log('Found user:', { email: user.email, name: user.name });
        return NextResponse.json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return NextResponse.json(
            { error: '프로필을 불러오는데 실패했습니다.' },
            { status: 500 }
        );
    }
}

// PUT /api/user/profile
export async function PUT(request: NextRequest) {
    try {
        // Get token from Authorization header
        const headersList = headers();
        const authHeader = headersList.get('Authorization');
        const token = authHeader?.split(' ')[1];

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Verify JWT token
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
        const userId = decoded.userId;

        const data = await request.json();
        const { name, phoneNumber, postcode, address, addressDetail, snsAccounts } = data;

        // Clean phone number (remove hyphens)
        const cleanPhoneNumber = phoneNumber.replace(/-/g, '');

        // Clean SNS accounts data
        const cleanSnsAccounts = snsAccounts
            .filter((account: any) => account.username.trim())
            .map((account: any) => ({
                platform: account.platform,
                username: account.username.trim(),
                url: account.url ? account.url.trim() : null
            }));

        // Update user profile
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                name: name.trim(),
                phoneNumber: cleanPhoneNumber,
                postcode,
                address,
                addressDetail: addressDetail.trim(),
                snsAccounts: {
                    deleteMany: {},
                    create: cleanSnsAccounts
                }
            },
            include: {
                snsAccounts: true
            }
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error('Error updating user profile:', error);
        return NextResponse.json(
            { error: '프로필 수정에 실패했습니다.' },
            { status: 500 }
        );
    }
} 