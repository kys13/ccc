import { NextRequest } from 'next/server';
import { GET, POST, DELETE } from './route';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

jest.mock('next-auth', () => ({
  getServerSession: jest.fn(),
}));

jest.mock('@/lib/prisma', () => ({
  prisma: {
    bookmark: {
      findMany: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe('Bookmarks API Route', () => {
  const mockPrisma = prisma as jest.Mocked<typeof prisma>;
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET handler', () => {
    it('returns 401 when not authenticated', async () => {
      (getServerSession as jest.Mock).mockResolvedValue(null);

      const request = new NextRequest(
        new URL('http://localhost:3000/api/bookmarks')
      );

      const response = await GET(request);
      expect(response.status).toBe(401);
      expect(mockPrisma.bookmark.findMany).not.toHaveBeenCalled();
    });

    it('returns bookmarked campaigns for authenticated user', async () => {
      const mockUser = { id: 1, email: 'test@example.com' };
      const mockBookmarks = [
        {
          id: 1,
          userId: 1,
          campaignId: 1,
          campaign: {
            id: 1,
            title: 'Test Campaign',
          },
        },
      ];

      (getServerSession as jest.Mock).mockResolvedValue({ user: mockUser });
      mockPrisma.bookmark.findMany.mockResolvedValue(mockBookmarks);

      const request = new NextRequest(
        new URL('http://localhost:3000/api/bookmarks')
      );

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({ bookmarks: mockBookmarks });
      expect(mockPrisma.bookmark.findMany).toHaveBeenCalledWith({
        where: { userId: mockUser.id },
        include: { campaign: true },
      });
    });
  });

  describe('POST handler', () => {
    it('returns 401 when not authenticated', async () => {
      (getServerSession as jest.Mock).mockResolvedValue(null);

      const request = new NextRequest(
        new URL('http://localhost:3000/api/bookmarks'),
        {
          method: 'POST',
          body: JSON.stringify({ campaignId: 1 }),
        }
      );

      const response = await POST(request);
      expect(response.status).toBe(401);
      expect(mockPrisma.bookmark.create).not.toHaveBeenCalled();
    });

    it('adds bookmark for authenticated user', async () => {
      const mockUser = { id: 1, email: 'test@example.com' };
      const mockBookmark = {
        id: 1,
        userId: mockUser.id,
        campaignId: 1,
      };

      (getServerSession as jest.Mock).mockResolvedValue({ user: mockUser });
      mockPrisma.bookmark.create.mockResolvedValue(mockBookmark);

      const request = new NextRequest(
        new URL('http://localhost:3000/api/bookmarks'),
        {
          method: 'POST',
          body: JSON.stringify({ campaignId: 1 }),
        }
      );

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({ bookmark: mockBookmark });
      expect(mockPrisma.bookmark.create).toHaveBeenCalledWith({
        data: {
          userId: mockUser.id,
          campaignId: 1,
        },
      });
    });

    it('validates required fields', async () => {
      (getServerSession as jest.Mock).mockResolvedValue({
        user: { id: 1, email: 'test@example.com' },
      });

      const request = new NextRequest(
        new URL('http://localhost:3000/api/bookmarks'),
        {
          method: 'POST',
          body: JSON.stringify({}), // Missing campaignId
        }
      );

      const response = await POST(request);
      expect(response.status).toBe(400);
      expect(mockPrisma.bookmark.create).not.toHaveBeenCalled();
    });
  });

  describe('DELETE handler', () => {
    it('returns 401 when not authenticated', async () => {
      (getServerSession as jest.Mock).mockResolvedValue(null);

      const request = new NextRequest(
        new URL('http://localhost:3000/api/bookmarks?campaignId=1'),
        {
          method: 'DELETE',
        }
      );

      const response = await DELETE(request);
      expect(response.status).toBe(401);
      expect(mockPrisma.bookmark.delete).not.toHaveBeenCalled();
    });

    it('removes bookmark for authenticated user', async () => {
      const mockUser = { id: 1, email: 'test@example.com' };

      (getServerSession as jest.Mock).mockResolvedValue({ user: mockUser });
      mockPrisma.bookmark.delete.mockResolvedValue({
        id: 1,
        userId: mockUser.id,
        campaignId: 1,
      });

      const request = new NextRequest(
        new URL('http://localhost:3000/api/bookmarks?campaignId=1'),
        {
          method: 'DELETE',
        }
      );

      const response = await DELETE(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({ success: true });
      expect(mockPrisma.bookmark.delete).toHaveBeenCalledWith({
        where: {
          userId_campaignId: {
            userId: mockUser.id,
            campaignId: 1,
          },
        },
      });
    });

    it('validates required query parameters', async () => {
      (getServerSession as jest.Mock).mockResolvedValue({
        user: { id: 1, email: 'test@example.com' },
      });

      const request = new NextRequest(
        new URL('http://localhost:3000/api/bookmarks'), // Missing campaignId
        {
          method: 'DELETE',
        }
      );

      const response = await DELETE(request);
      expect(response.status).toBe(400);
      expect(mockPrisma.bookmark.delete).not.toHaveBeenCalled();
    });
  });

  describe('Error handling', () => {
    it('handles invalid JSON in request body', async () => {
      (getServerSession as jest.Mock).mockResolvedValue({
        user: { id: 1, email: 'test@example.com' },
      });

      const request = new NextRequest(
        new URL('http://localhost:3000/api/bookmarks'),
        {
          method: 'POST',
          body: 'invalid json',
        }
      );

      const response = await POST(request);
      expect(response.status).toBe(400);
      expect(mockPrisma.bookmark.create).not.toHaveBeenCalled();
    });

    it('handles database errors gracefully', async () => {
      (getServerSession as jest.Mock).mockResolvedValue({
        user: { id: 1, email: 'test@example.com' },
      });

      mockPrisma.bookmark.create.mockRejectedValue(new Error('Database error'));

      const request = new NextRequest(
        new URL('http://localhost:3000/api/bookmarks'),
        {
          method: 'POST',
          body: JSON.stringify({ campaignId: 999999 }), // Non-existent campaign
        }
      );

      const response = await POST(request);
      expect(response.status).toBe(500);
    });
  });
}); 