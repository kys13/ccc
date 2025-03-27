import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

type CampaignType = 'visit' | 'delivery';
type CampaignStatus = 'ONGOING' | 'COMPLETED' | 'PENDING';

interface CampaignCreateBody {
  type: CampaignType;
  title: string;
  description: string;
  category: string;
  region?: string;
  district?: string;
  snsTypes: string[];
  reward: number;
  maxParticipants: number;
  requirements: string;
  startDate: string;
  endDate: string;
  status?: CampaignStatus;
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: '관리자 권한이 필요합니다.' },
        { status: 403 }
      );
    }

    // URL 파라미터 파싱
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');

    // 캠페인 조회
    const where = status ? { status } : {};
    const [campaigns, total] = await Promise.all([
      prisma.campaign.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          location: true,
          visitCategory: true,
          deliveryCategory: true,
        },
      }),
      prisma.campaign.count({ where }),
    ]);

    return NextResponse.json({
      campaigns,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Get admin campaigns error:', error);
    return NextResponse.json(
      { message: '캠페인 목록을 가져오는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: '관리자 권한이 필요합니다.' },
        { status: 403 }
      );
    }

    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['type', 'title', 'description', 'snsTypes', 'reward', 'maxParticipants', 'requirements', 'startDate', 'endDate'] as const;
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { message: `필수 필드가 누락되었습니다: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate visit type specific fields
    if (body.type === 'visit') {
      const visitRequiredFields = ['category', 'region', 'district'] as const;
      const missingVisitFields = visitRequiredFields.filter(field => !body[field]);
      
      if (missingVisitFields.length > 0) {
        return NextResponse.json(
          { message: `방문형 캠페인에 필요한 필드가 누락되었습니다: ${missingVisitFields.join(', ')}` },
          { status: 400 }
        );
      }
    }

    // Validate delivery type specific fields
    if (body.type === 'delivery' && !body.category) {
      return NextResponse.json(
        { message: '배송형 캠페인에는 카테고리가 필요합니다.' },
        { status: 400 }
      );
    }

    // Validate dates
    const startDate = new Date(body.startDate);
    const endDate = new Date(body.endDate);
    const now = new Date();

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return NextResponse.json(
        { message: '잘못된 날짜 형식입니다.' },
        { status: 400 }
      );
    }

    if (startDate < now) {
      return NextResponse.json(
        { message: '시작일은 현재 시간 이후여야 합니다.' },
        { status: 400 }
      );
    }

    if (endDate <= startDate) {
      return NextResponse.json(
        { message: '종료일은 시작일 이후여야 합니다.' },
        { status: 400 }
      );
    }

    // Validate numeric fields
    if (body.reward < 0) {
      return NextResponse.json(
        { message: '리워드 금액은 0 이상이어야 합니다.' },
        { status: 400 }
      );
    }

    if (body.maxParticipants < 1) {
      return NextResponse.json(
        { message: '최대 참여자 수는 1 이상이어야 합니다.' },
        { status: 400 }
      );
    }

    let locationId: number | null = null;
    if (body.type === 'visit' && body.region && body.district) {
      try {
        const location = await prisma.location.create({
          data: {
            city: body.region,
            district: body.district,
            address: `${body.region} ${body.district}`,
          },
        });
        locationId = location.id;
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
          // Unique constraint violation - address already exists
          const existingLocation = await prisma.location.findFirst({
            where: {
              city: body.region,
              district: body.district,
            },
          });
          if (existingLocation) {
            locationId = existingLocation.id;
          }
        } else {
          console.error('Location creation error:', error);
          return NextResponse.json(
            { message: '위치 정보 생성 중 오류가 발생했습니다.' },
            { status: 500 }
          );
        }
      }
    }

    // Create campaign
    const campaignData: Prisma.CampaignCreateInput = {
      title: body.title,
      description: body.description,
      snsTypes: body.snsTypes,
      reward: body.reward,
      maxParticipants: body.maxParticipants,
      currentParticipants: 0,
      requirements: body.requirements,
      startDate,
      endDate,
      status: body.status || 'PENDING',
      isVisible: true,
      showPopular: false,
      showDeadline: false,
      ...(locationId && {
        location: {
          connect: {
            id: locationId
          }
        }
      }),
      ...(body.type === 'visit' ? {
        visitCategory: {
          connectOrCreate: {
            where: { name: body.category },
            create: { name: body.category }
          }
        }
      } : {
        deliveryCategory: {
          connectOrCreate: {
            where: { name: body.category },
            create: { name: body.category }
          }
        }
      })
    };

    const campaign = await prisma.campaign.create({
      data: campaignData,
      include: {
        location: true,
        visitCategory: true,
        deliveryCategory: true,
      },
    });

    return NextResponse.json(campaign);
  } catch (error: any) {
    console.error('Create campaign error:', error);
    return NextResponse.json(
      { message: error.message || '캠페인 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}