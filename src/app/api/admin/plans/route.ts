import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const PlanSchema = z.object({
    name: z.string().min(1),
    description: z.string(),
    price: z.number().min(0),
    interval: z.enum(['monthly', 'yearly']),
    features: z.array(z.string()),
    isActive: z.boolean().optional(),
});

// 플랜 목록 조회
export async function GET() {
    try {
        const plans = await prisma.plan.findMany({
            orderBy: { price: 'asc' }
        });
        
        return NextResponse.json(plans);
    } catch (error) {
        console.error('Failed to fetch plans:', error);
        return new NextResponse(
            JSON.stringify({ message: '플랜 목록을 불러오는데 실패했습니다.' }),
            { status: 500 }
        );
    }
}

// 새 플랜 생성
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const validatedData = PlanSchema.parse(body);

        const plan = await prisma.plan.create({
            data: {
                ...validatedData,
                features: JSON.stringify(validatedData.features)
            }
        });

        return NextResponse.json(plan, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse(
                JSON.stringify({ 
                    message: '입력값이 올바르지 않습니다.',
                    errors: error.errors 
                }),
                { status: 400 }
            );
        }

        console.error('Failed to create plan:', error);
        return new NextResponse(
            JSON.stringify({ message: '플랜 생성에 실패했습니다.' }),
            { status: 500 }
        );
    }
}

// 플랜 수정
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, ...data } = body;
        const validatedData = PlanSchema.parse(data);

        const plan = await prisma.plan.update({
            where: { id },
            data: {
                ...validatedData,
                features: JSON.stringify(validatedData.features)
            }
        });

        return NextResponse.json(plan);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse(
                JSON.stringify({ 
                    message: '입력값이 올바르지 않습니다.',
                    errors: error.errors 
                }),
                { status: 400 }
            );
        }

        console.error('Failed to update plan:', error);
        return new NextResponse(
            JSON.stringify({ message: '플랜 수정에 실패했습니다.' }),
            { status: 500 }
        );
    }
} 