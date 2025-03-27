import { NextRequest } from 'next/server';
import { GET } from './route';
import { prisma } from '@/lib/prisma';
import { createMockCampaign } from '@/test/utils';

// Mock prisma
jest.mock('@/lib/prisma', () => ({
  prisma: {
    campaign: {
      findMany: jest.fn(),
      count: jest.fn(),
    },
  },
}));

describe('Campaigns API Route', () => {
  const mockPrisma = prisma as jest.Mocked<typeof prisma>;
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns campaigns with pagination for visit type', async () => {
    const mockCampaigns = [
      createMockCampaign({ id: 1, visitCategoryId: 1 }),
      createMockCampaign({ id: 2, visitCategoryId: 1 }),
    ];

    mockPrisma.campaign.findMany.mockResolvedValue(mockCampaigns);
    mockPrisma.campaign.count.mockResolvedValue(10);

    const request = new NextRequest(
      new URL('http://localhost:3000/api/campaigns?type=visit&page=1&limit=2')
    );

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({
      campaigns: mockCampaigns,
      pagination: {
        currentPage: 1,
        limit: 2,
        total: 10,
        totalPages: 5,
      },
      filters: {
        type: 'visit',
        page: 1,
        limit: 2,
      },
    });

    expect(mockPrisma.campaign.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          visitCategoryId: { not: null },
          status: 'ONGOING',
        },
        take: 2,
        skip: 0,
      })
    );
  });

  it('returns campaigns with pagination for delivery type', async () => {
    const mockCampaigns = [
      createMockCampaign({ id: 1, deliveryCategoryId: 1 }),
      createMockCampaign({ id: 2, deliveryCategoryId: 1 }),
    ];

    mockPrisma.campaign.findMany.mockResolvedValue(mockCampaigns);
    mockPrisma.campaign.count.mockResolvedValue(10);

    const request = new NextRequest(
      new URL('http://localhost:3000/api/campaigns?type=delivery&page=1&limit=2')
    );

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({
      campaigns: mockCampaigns,
      pagination: {
        currentPage: 1,
        limit: 2,
        total: 10,
        totalPages: 5,
      },
      filters: {
        type: 'delivery',
        page: 1,
        limit: 2,
      },
    });

    expect(mockPrisma.campaign.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          deliveryCategoryId: { not: null },
          status: 'ONGOING',
        },
        take: 2,
        skip: 0,
      })
    );
  });

  it('applies search filter correctly', async () => {
    mockPrisma.campaign.findMany.mockResolvedValue([]);
    mockPrisma.campaign.count.mockResolvedValue(0);

    const request = new NextRequest(
      new URL('http://localhost:3000/api/campaigns?type=visit&search=테스트')
    );

    await GET(request);

    expect(mockPrisma.campaign.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          OR: [
            { title: { contains: '테스트' } },
            { description: { contains: '테스트' } },
          ],
        }),
      })
    );
  });

  it('applies region filter correctly', async () => {
    mockPrisma.campaign.findMany.mockResolvedValue([]);
    mockPrisma.campaign.count.mockResolvedValue(0);

    const request = new NextRequest(
      new URL('http://localhost:3000/api/campaigns?type=visit&region=서울')
    );

    await GET(request);

    expect(mockPrisma.campaign.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          location: { contains: '서울' },
        }),
      })
    );
  });

  it('applies sorting correctly', async () => {
    mockPrisma.campaign.findMany.mockResolvedValue([]);
    mockPrisma.campaign.count.mockResolvedValue(0);

    const request = new NextRequest(
      new URL('http://localhost:3000/api/campaigns?type=visit&sort=reward')
    );

    await GET(request);

    expect(mockPrisma.campaign.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        orderBy: { reward: 'desc' },
      })
    );
  });

  it('handles invalid page number gracefully', async () => {
    mockPrisma.campaign.findMany.mockResolvedValue([]);
    mockPrisma.campaign.count.mockResolvedValue(10);

    const request = new NextRequest(
      new URL('http://localhost:3000/api/campaigns?type=visit&page=invalid')
    );

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.pagination.currentPage).toBe(1);
  });

  it('handles missing type parameter', async () => {
    const request = new NextRequest(
      new URL('http://localhost:3000/api/campaigns')
    );

    const response = await GET(request);
    
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Campaign type is required');
  });

  it('handles database errors gracefully', async () => {
    mockPrisma.campaign.findMany.mockRejectedValue(new Error('Database error'));

    const request = new NextRequest(
      new URL('http://localhost:3000/api/campaigns?type=visit')
    );

    const response = await GET(request);
    
    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data.error).toBe('Failed to fetch campaigns');
  });
}); 