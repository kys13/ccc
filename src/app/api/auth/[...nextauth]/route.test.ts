import { NextRequest } from 'next/server';
import { GET, POST } from './route';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}));

jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

describe('Auth API Route', () => {
  const mockPrisma = prisma as jest.Mocked<typeof prisma>;
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET handler', () => {
    it('returns session information', async () => {
      const request = new NextRequest(
        new URL('http://localhost:3000/api/auth/session')
      );

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('csrfToken');
      expect(data).toHaveProperty('providers');
    });
  });

  describe('POST handler', () => {
    it('handles sign in with valid credentials', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: await hash('password123', 12),
        name: 'Test User',
        role: 'USER',
      };

      mockPrisma.user.findUnique.mockResolvedValue(mockUser);

      const request = new NextRequest(
        new URL('http://localhost:3000/api/auth/callback/credentials'),
        {
          method: 'POST',
          body: JSON.stringify({
            email: 'test@example.com',
            password: 'password123',
          }),
        }
      );

      const response = await POST(request);
      expect(response.status).toBe(200);
    });

    it('rejects sign in with invalid credentials', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      const request = new NextRequest(
        new URL('http://localhost:3000/api/auth/callback/credentials'),
        {
          method: 'POST',
          body: JSON.stringify({
            email: 'invalid@example.com',
            password: 'wrongpassword',
          }),
        }
      );

      const response = await POST(request);
      expect(response.status).toBe(401);
    });

    it('handles sign up with valid data', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);
      mockPrisma.user.create.mockResolvedValue({
        id: 1,
        email: 'new@example.com',
        password: 'hashedpassword',
        name: 'New User',
        role: 'USER',
      });

      const request = new NextRequest(
        new URL('http://localhost:3000/api/auth/signup'),
        {
          method: 'POST',
          body: JSON.stringify({
            email: 'new@example.com',
            password: 'password123',
            name: 'New User',
          }),
        }
      );

      const response = await POST(request);
      expect(response.status).toBe(200);
      expect(mockPrisma.user.create).toHaveBeenCalled();
    });

    it('rejects sign up with existing email', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 1,
        email: 'existing@example.com',
        password: 'hashedpassword',
        name: 'Existing User',
        role: 'USER',
      });

      const request = new NextRequest(
        new URL('http://localhost:3000/api/auth/signup'),
        {
          method: 'POST',
          body: JSON.stringify({
            email: 'existing@example.com',
            password: 'password123',
            name: 'New User',
          }),
        }
      );

      const response = await POST(request);
      expect(response.status).toBe(400);
      expect(mockPrisma.user.create).not.toHaveBeenCalled();
    });

    it('handles database errors gracefully', async () => {
      mockPrisma.user.findUnique.mockRejectedValue(new Error('Database error'));

      const request = new NextRequest(
        new URL('http://localhost:3000/api/auth/callback/credentials'),
        {
          method: 'POST',
          body: JSON.stringify({
            email: 'test@example.com',
            password: 'password123',
          }),
        }
      );

      const response = await POST(request);
      expect(response.status).toBe(500);
    });

    it('validates required fields', async () => {
      const request = new NextRequest(
        new URL('http://localhost:3000/api/auth/signup'),
        {
          method: 'POST',
          body: JSON.stringify({
            // Missing required fields
          }),
        }
      );

      const response = await POST(request);
      expect(response.status).toBe(400);
    });
  });
}); 