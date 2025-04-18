import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const SEOSchema = z.object({
    pageType: z.string(),
    pageId: z.number().optional(),
    title: z.string().max(60),
    description: z.string().max(160),
    keywords: z.string().optional(),
    ogTitle: z.string().optional(),
    ogDescription: z.string().optional(),
    ogImage: z.string().url().optional(),
    canonical: z.string().url().optional(),
    robots: z.string().optional(),
    schema: z.record(z.any()).optional(),
});

// SEO 정보 조회
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const pageType = searchParams.get('pageType');
        const pageIdParam = searchParams.get('pageId');

        if (!pageType) {
            return new NextResponse(
                JSON.stringify({ message: 'pageType is required' }),
                { status: 400 }
            );
        }

        const pageId = pageIdParam ? parseInt(pageIdParam) : undefined;
        if (pageIdParam && isNaN(pageId as number)) {
            return NextResponse.json({ error: 'Invalid pageId format' }, { status: 400 });
        }

        if (pageId === undefined && request.method === 'GET') {
            return NextResponse.json({ error: 'pageId is required for GET' }, { status: 400 });
        }

        if (request.method === 'GET' && pageId !== undefined) {
            const seo = await prisma.sEO.findUnique({
                where: {
                    pageId: pageId,
                },
            });
            if (!seo) {
                return NextResponse.json({ message: 'SEO data not found' }, { status: 404 });
            }
            return NextResponse.json(seo);
        }

        if (pageId === undefined) {
            return NextResponse.json({ error: 'pageId is required' }, { status: 400 });
        }

        const seo = await prisma.sEO.findUnique({
            where: {
                pageId: pageId,
            },
        });

        return NextResponse.json(seo);
    } catch (error) {
        console.error('SEO fetch error:', error);
        return new NextResponse(
            JSON.stringify({ message: 'Failed to fetch SEO data' }),
            { status: 500 }
        );
    }
}

// SEO 정보 업데이트
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const validatedData = SEOSchema.parse(body);
        const { pageType, pageId } = validatedData;

        if (pageId === undefined) {
            return NextResponse.json({ error: 'pageId is required for PUT' }, { status: 400 });
        }

        const seo = await prisma.sEO.upsert({
            where: {
                pageId: pageId,
            },
            update: validatedData,
            create: validatedData,
        });

        // Sitemap 업데이트/생성 (임시 주석 처리 - 스키마 확인 및 로직 재검토 필요)
        /*
        if (pageType === 'campaign' && pageId !== undefined) {
            const campaignLoc = `/campaigns/${pageId}`;
            await prisma.sitemap.upsert({
                where: { ??? }, // unique 필드 확인 필요 (id?)
                update: {
                    lastmod: new Date(),
                },
                create: {
                    loc: campaignLoc, // 스키마에 loc 필드 없음
                    lastmod: new Date(),
                    priority: 0.8,
                    changefreq: 'daily',
                },
            });
        }
        */

        return NextResponse.json(seo);
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

        console.error('SEO update error:', error);
        return new NextResponse(
            JSON.stringify({ message: 'Failed to update SEO data' }),
            { status: 500 }
        );
    }
} 