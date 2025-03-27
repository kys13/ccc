import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth/jwt';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: '권한이 없습니다.' }, { status: 403 });
    }

    const campaign = await prisma.campaign.findUnique({
      where: {
        id: parseInt(params.id),
      },
      include: {
        location: true,
        visitCategory: true,
        deliveryCategory: true,
      },
    });

    if (!campaign) {
      return NextResponse.json({ error: '캠페인을 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json(campaign);
  } catch (error) {
    console.error('Campaign fetch error:', error);
    return NextResponse.json(
      { error: '캠페인 정보를 가져오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: '권한이 없습니다.' },
        { status: 403 }
      );
    }

    const data = await request.json();
    const campaignId = parseInt(params.id);

    // Validate required fields
    const requiredFields = ['title', 'description', 'snsTypes', 'reward', 'maxParticipants', 'requirements', 'startDate', 'endDate'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `${field} 필드는 필수입니다.` },
          { status: 400 }
        );
      }
    }

    // Handle location for visit type campaigns
    let locationId = null;
    if (data.type === 'visit' && data.region && data.district) {
      const location = await prisma.location.upsert({
        where: {
          address: `${data.region} ${data.district}`,
        },
        create: {
          city: data.region,
          district: data.district,
          address: `${data.region} ${data.district}`,
        },
        update: {},
      });
      locationId = location.id;
    }

    // Update campaign
    const updatedCampaign = await prisma.campaign.update({
      where: {
        id: campaignId,
      },
      data: {
        title: data.title,
        description: data.description,
        snsTypes: data.snsTypes,
        reward: data.reward,
        maxParticipants: data.maxParticipants,
        requirements: data.requirements,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        status: data.status,
        isVisible: true,
        showPopular: data.showPopular,
        showDeadline: data.showDeadline,
        showLatest: data.showLatest,
        imageUrl: data.imageUrl,
        location: locationId ? {
          connect: {
            id: locationId,
          },
        } : undefined,
        visitCategory: data.type === 'visit' && data.category ? {
          connectOrCreate: {
            where: { name: data.category },
            create: { name: data.category }
          }
        } : undefined,
        deliveryCategory: data.type === 'delivery' && data.category ? {
          connectOrCreate: {
            where: { name: data.category },
            create: { name: data.category }
          }
        } : undefined,
      },
      include: {
        location: true,
        visitCategory: true,
        deliveryCategory: true,
      },
    });

    return NextResponse.json(updatedCampaign);
  } catch (error) {
    console.error('Campaign update error:', error);
    return NextResponse.json(
      { error: '캠페인 수정에 실패했습니다.' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: '권한이 없습니다.' },
        { status: 403 }
      );
    }

    await prisma.campaign.delete({
      where: { id: parseInt(params.id) },
    });

    return NextResponse.json({ message: '캠페인이 삭제되었습니다.' });
  } catch (error) {
    console.error('Error deleting campaign:', error);
    return NextResponse.json(
      { message: '캠페인 삭제에 실패했습니다.' },
      { status: 500 }
    );
  }
} 