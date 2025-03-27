import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// 설정 스키마 정의
const SettingsSchema = z.object({
    site_name: z.string().min(1),
    site_description: z.string(),
    contact_email: z.string().email(),
    notification_settings: z.object({
        email_notifications: z.boolean(),
        application_notifications: z.boolean(),
        campaign_notifications: z.boolean(),
    }),
    campaign_settings: z.object({
        auto_approve_campaigns: z.boolean(),
        default_campaign_status: z.enum(['draft', 'active']),
        minimum_reward_amount: z.number().min(0),
        maximum_reward_amount: z.number().min(0),
    }),
    security_settings: z.object({
        require_email_verification: z.boolean(),
        allow_social_login: z.boolean(),
        session_timeout_minutes: z.number().min(1),
    }),
});

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json(
                { message: '관리자 권한이 필요합니다.' },
                { status: 403 }
            );
        }

        const settings = await prisma.adminSettings.findFirst();
        
        const responseData = settings || {
            site_name: '체험단 관리 시스템',
            site_description: '체험단 신청 및 관리 시스템',
            contact_email: 'admin@example.com',
            notification_settings: {
                email_notifications: true,
                application_notifications: true,
                campaign_notifications: true
            },
            campaign_settings: {
                auto_approve_campaigns: false,
                default_campaign_status: 'draft',
                minimum_reward_amount: 0,
                maximum_reward_amount: 1000000
            },
            security_settings: {
                require_email_verification: true,
                allow_social_login: true,
                session_timeout_minutes: 60
            }
        };

        return NextResponse.json({ data: responseData });
    } catch (error) {
        console.error('Failed to fetch admin settings:', error);
        return NextResponse.json(
            { message: '설정을 불러오는데 실패했습니다.' },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json(
                { message: '관리자 권한이 필요합니다.' },
                { status: 403 }
            );
        }

        const body = await request.json();
        
        // 데이터 유효성 검사
        const validatedData = SettingsSchema.parse(body);

        // 설정 업데이트
        const settings = await prisma.adminSettings.upsert({
            where: { id: 1 },
            update: validatedData,
            create: { id: 1, ...validatedData },
        });

        // 설정 변경 히스토리 기록
        await prisma.settingsHistory.create({
            data: {
                changes: JSON.stringify(validatedData),
                updatedBy: session.user.id,
                updatedAt: new Date(),
            },
        });

        return NextResponse.json(settings);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { 
                    message: '유효성 검사 오류',
                    errors: error.errors 
                },
                { status: 400 }
            );
        }

        console.error('Failed to update admin settings:', error);
        return NextResponse.json(
            { message: '설정 업데이트에 실패했습니다.' },
            { status: 500 }
        );
    }
} 