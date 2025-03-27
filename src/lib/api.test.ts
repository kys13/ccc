import { toggleBookmark, fetchCampaigns, fetchBookmarks, signup, updateProfile } from './api';

describe('API Functions', () => {
  let mockFetch: jest.Mock;

  beforeEach(() => {
    mockFetch = jest.fn();
    global.fetch = mockFetch;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('toggleBookmark', () => {
    it('sends correct request to toggle bookmark', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      });

      await toggleBookmark(1);

      expect(mockFetch).toHaveBeenCalledWith('/api/bookmarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ campaignId: 1 }),
      });
    });

    it('handles error response', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        json: () => Promise.resolve({ error: 'Failed to toggle' }),
      });

      await expect(toggleBookmark(1)).rejects.toThrow('Failed to toggle');
    });
  });

  describe('fetchCampaigns', () => {
    it('sends correct request with query parameters', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ campaigns: [] }),
      });

      await fetchCampaigns({
        type: 'visit',
        page: 1,
        limit: 10,
        search: 'test',
      });

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/campaigns?type=visit&page=1&limit=10&search=test')
      );
    });

    it('handles error response', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        json: () => Promise.resolve({ error: 'Failed to fetch' }),
      });

      await expect(fetchCampaigns({ type: 'visit' })).rejects.toThrow(
        'Failed to fetch'
      );
    });
  });

  describe('fetchBookmarks', () => {
    it('sends correct request to fetch bookmarks', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ bookmarks: [] }),
      });

      await fetchBookmarks();

      expect(mockFetch).toHaveBeenCalledWith('/api/bookmarks');
    });

    it('handles error response', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        json: () => Promise.resolve({ error: 'Failed to fetch bookmarks' }),
      });

      await expect(fetchBookmarks()).rejects.toThrow('Failed to fetch bookmarks');
    });
  });

  describe('signup', () => {
    const signupData = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    };

    it('sends correct request to signup', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ user: signupData }),
      });

      await signup(signupData);

      expect(mockFetch).toHaveBeenCalledWith('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });
    });

    it('handles error response', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        json: () => Promise.resolve({ error: 'Email already exists' }),
      });

      await expect(signup(signupData)).rejects.toThrow('Email already exists');
    });
  });

  describe('updateProfile', () => {
    const updateData = {
      name: 'New Name',
      email: 'new@example.com',
      currentPassword: 'oldpass',
      newPassword: 'newpass',
    };

    it('sends correct request to update profile', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ user: updateData }),
      });

      await updateProfile(updateData);

      expect(mockFetch).toHaveBeenCalledWith('/api/auth/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
    });

    it('handles error response', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        json: () => Promise.resolve({ error: 'Invalid password' }),
      });

      await expect(updateProfile(updateData)).rejects.toThrow('Invalid password');
    });

    it('sends only provided fields', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ user: { name: 'New Name' } }),
      });

      await updateProfile({ name: 'New Name' });

      expect(mockFetch).toHaveBeenCalledWith('/api/auth/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: 'New Name' }),
      });
    });
  });
}); 