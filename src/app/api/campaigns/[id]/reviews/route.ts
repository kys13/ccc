import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const filter = searchParams.get('filter') || 'all';
        const sort = searchParams.get('sort') || 'recent';

        const campaignId = parseInt(params.id);

        // 기본 where 조건
        const where = {
            campaignId,
            status: 'approved',
            ...(filter === 'photo' && {
                media: {
                    not: [],
                },
            }),
        };

        // 리뷰 목록 조회
        const reviews = await prisma.review.findMany({
            where,
            include: {
                user: {
                    select: {
                        name: true,
                        sns: true,
                    },
                },
            },
            orderBy: sort === 'recent'
                ? { createdAt: 'desc' }
                : { rating: 'desc' },
            skip: (page - 1) * limit,
            take: limit,
        });

        // 전체 리뷰 수 조회
        const total = await prisma.review.count({ where });

        // 평균 평점 계산
        const averageRating = await prisma.review.aggregate({
            where,
            _avg: {
                rating: true,
            },
        });

        return NextResponse.json({
            reviews,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
            stats: {
                averageRating: averageRating._avg.rating || 0,
                totalReviews: total,
            },
        });
    } catch (error) {
        console.error('Review fetch error:', error);
        return new NextResponse(
            JSON.stringify({ message: '리뷰 목록을 불러오는데 실패했습니다.' }),
            { status: 500 }
        );
    }
} 