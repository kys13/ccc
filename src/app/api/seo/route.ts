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
        const pageId = searchParams.get('pageId');

        if (!pageType) {
            return new NextResponse(
                JSON.stringify({ message: 'pageType is required' }),
                { status: 400 }
            );
        }

        const seo = await prisma.sEO.findUnique({
            where: {
                pageType_pageId: {
                    pageType,
                    pageId: pageId ? parseInt(pageId) : null,
                },
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

        const seo = await prisma.sEO.upsert({
            where: {
                pageType_pageId: {
                    pageType: validatedData.pageType,
                    pageId: validatedData.pageId || null,
                },
            },
            update: validatedData,
            create: validatedData,
        });

        // 사이트맵 업데이트
        if (validatedData.pageType === 'campaign' && validatedData.pageId) {
            await prisma.sitemap.upsert({
                where: { path: `/campaigns/${validatedData.pageId}` },
                update: {
                    lastmod: new Date(),
                },
                create: {
                    path: `/campaigns/${validatedData.pageId}`,
                    priority: 0.8,
                    changefreq: 'daily',
                },
            });
        }

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