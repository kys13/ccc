import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';
import { cache } from 'react';

const CampaignSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    reward: z.number().positive(),
    maxParticipants: z.number().positive(),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    requirements: z.record(z.any()),
    reviewTemplate: z.record(z.any()).optional(),
    
    // 캠페인 타입 관련
    type: z.enum(['visit', 'delivery']),
    snsTypes: z.array(z.string()),
    
    // 방문/배송 정보
    locationId: z.number().optional(),
    address: z.string().optional(),
    
    // 카테고리
    visitCategoryId: z.number().optional(),
    deliveryCategoryId: z.number().optional(),
    
    // 노출 설정
    displaySettings: z.object({
        main: z.boolean(),
        popular: z.boolean(),
        recommended: z.boolean(),
    }).default({
        main: true,
        popular: false,
        recommended: false,
    }),
});

const getCampaignsWithCache = cache(async (
    type?: string,
    category?: string,
    region?: string,
    snsType?: string,
    minReward?: string,
    maxReward?: string,
    status?: string,
    sort?: string,
    search?: string,
    page?: number,
    limit?: number
) => {
    const where: any = {};
    
    // Type filter
    if (type) {
        if (type === 'visit') {
            where.visitCategoryId = { not: null };
            where.deliveryCategoryId = null;
        } else if (type === 'delivery') {
            where.deliveryCategoryId = { not: null };
            where.visitCategoryId = null;
        }
    }

    // Category filter
    if (category) {
        if (type === 'visit') {
            where.visitCategory = { name: category };
        } else if (type === 'delivery') {
            where.deliveryCategory = { name: category };
        }
    }

    // Region filter
    if (region) {
        where.location = { city: region };
    }

    // SNS type filter
    if (snsType) {
        where.snsTypes = { has: snsType };
    }

    // Reward range filter
    if (minReward || maxReward) {
        where.reward = {};
        if (minReward) where.reward.gte = parseInt(minReward);
        if (maxReward) where.reward.lte = parseInt(maxReward);
    }

    // Status filter
    if (status) {
        where.status = status;
    }

    // Search by title or description
    if (search) {
        where.OR = [
            { title: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } }
        ];
    }

    // Default status for public campaigns
    if (!status) {
        where.status = 'ONGOING';
    }

    return prisma.campaign.findMany({
        where,
        skip: ((page || 1) - 1) * (limit || 10),
        take: limit || 10,
        orderBy: sort === 'deadline' 
            ? { endDate: 'asc' }
            : sort === 'popular'
            ? { currentParticipants: 'desc' }
            : sort === 'reward'
            ? { reward: 'desc' }
            : { createdAt: 'desc' },
        include: {
            location: true,
            visitCategory: true,
            deliveryCategory: true,
            _count: {
                select: {
                    applications: true,
                    reviews: true
                }
            }
        }
    });
});

// 캠페인 생성
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'client') {
            return new NextResponse(
                JSON.stringify({ message: '권한이 없습니다.' }),
                { status: 403 }
            );
        }

        const body = await request.json();
        const validatedData = CampaignSchema.parse(body);

        // 캠페인 타입에 따른 유효성 검사
        if (validatedData.type === 'visit' && !validatedData.locationId) {
            return new NextResponse(
                JSON.stringify({ message: '방문 캠페인은 위치 정보가 필요합니다.' }),
                { status: 400 }
            );
        }
        if (validatedData.type === 'delivery' && !validatedData.address) {
            return new NextResponse(
                JSON.stringify({ message: '배송 캠페인은 배송 주소가 필요합니다.' }),
                { status: 400 }
            );
        }

        const campaign = await prisma.campaign.create({
            data: {
                ...validatedData,
                clientId: session.user.id,
            },
        });

        return NextResponse.json(campaign);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse(
                JSON.stringify({ 
                    message: 'Validation error',
                    errors: error.errors 
                }),
                { status: 400 }
            );
        }

        console.error('Campaign creation error:', error);
        return new NextResponse(
            JSON.stringify({ message: '캠페인 생성에 실패했습니다.' }),
            { status: 500 }
        );
    }
}

// 캠페인 목록 조회
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type');
        const category = searchParams.get('category');
        const region = searchParams.get('region');
        const snsType = searchParams.get('snsType');
        const minReward = searchParams.get('minReward');
        const maxReward = searchParams.get('maxReward');
        const status = searchParams.get('status');
        const sort = searchParams.get('sort') || 'latest';
        const search = searchParams.get('search');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const isPopular = searchParams.get('isPopular') === 'true';
        const isMain = searchParams.get('isMain') === 'true';
        const isRecommended = searchParams.get('isRecommended') === 'true';

        const where: any = {
            status: status || 'ONGOING',
            isVisible: true
        };

        // Type filter
        if (type) {
            if (type === 'visit') {
                where.visitCategoryId = { not: null };
                where.deliveryCategoryId = null;
            } else if (type === 'delivery') {
                where.deliveryCategoryId = { not: null };
                where.visitCategoryId = null;
            }
        }

        // Display settings filter
        if (isPopular) {
            where.displaySettings = {
                path: ['popular'],
                equals: true
            };
        } else if (isMain) {
            where.displaySettings = {
                path: ['main'],
                equals: true
            };
        } else if (isRecommended) {
            where.displaySettings = {
                path: ['recommended'],
                equals: true
            };
        }

        // Category filter
        if (category) {
            if (type === 'visit') {
                where.visitCategory = { name: category };
            } else if (type === 'delivery') {
                where.deliveryCategory = { name: category };
            }
        }

        // Region filter
        if (region) {
            where.location = { city: region };
        }

        // SNS type filter
        if (snsType) {
            where.snsTypes = { has: snsType };
        }

        // Reward range filter
        if (minReward || maxReward) {
            where.reward = {};
            if (minReward) where.reward.gte = parseInt(minReward);
            if (maxReward) where.reward.lte = parseInt(maxReward);
        }

        // Search by title or description
        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } }
            ];
        }

        const [campaigns, total] = await Promise.all([
            prisma.campaign.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: sort === 'deadline' 
                    ? { endDate: 'asc' }
                    : sort === 'popular'
                    ? { currentParticipants: 'desc' }
                    : sort === 'reward'
                    ? { reward: 'desc' }
                    : { createdAt: 'desc' },
                include: {
                    location: true,
                    visitCategory: true,
                    deliveryCategory: true,
                    _count: {
                        select: {
                            applications: true,
                            reviews: true
                        }
                    }
                }
            }),
            prisma.campaign.count({ where })
        ]);

        return NextResponse.json({
            campaigns,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error fetching campaigns:', error);
        return NextResponse.json(
            { message: '캠페인 목록 조회에 실패했습니다.' },
            { status: 500 }
        );
    }
}

// 캠페인 노출 설정 업데이트
export async function PATCH(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return new NextResponse(
                JSON.stringify({ message: '권한이 없습니다.' }),
                { status: 403 }
            );
        }

        const body = await request.json();
        const { id, displaySettings } = body;

        const campaign = await prisma.campaign.update({
            where: { id },
            data: { displaySettings },
        });

        return NextResponse.json(campaign);
    } catch (error) {
        console.error('Campaign display settings update error:', error);
        return new NextResponse(
            JSON.stringify({ message: '캠페인 노출 설정 업데이트에 실패했습니다.' }),
            { status: 500 }
        );
    }
} 