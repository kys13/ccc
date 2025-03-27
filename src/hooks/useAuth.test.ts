import { renderHook, act } from '@testing-library/react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useAuth } from '@/hooks/useAuth';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

describe('useAuth', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns authenticated state when session exists', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          id: 1,
          email: 'test@example.com',
          name: 'Test User',
        },
        expires: '2024-12-31',
      },
      status: 'authenticated',
    });

    const { result } = renderHook(() => useAuth());

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toEqual({
      id: 1,
      email: 'test@example.com',
      name: 'Test User',
    });
  });

  it('returns unauthenticated state when no session exists', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: 'unauthenticated',
    });

    const { result } = renderHook(() => useAuth());

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
  });

  it('returns loading state when session is loading', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: 'loading',
    });

    const { result } = renderHook(() => useAuth());

    expect(result.current.isLoading).toBe(true);
  });

  it('calls signIn with correct parameters', async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: 'unauthenticated',
    });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login({
        email: 'test@example.com',
        password: 'password123',
      });
    });

    expect(signIn).toHaveBeenCalledWith('credentials', {
      email: 'test@example.com',
      password: 'password123',
      redirect: false,
    });
  });

  it('calls signOut when logging out', async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          id: 1,
          email: 'test@example.com',
          name: 'Test User',
        },
        expires: '2024-12-31',
      },
      status: 'authenticated',
    });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.logout();
    });

    expect(signOut).toHaveBeenCalled();
  });

  it('handles sign in error', async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: 'unauthenticated',
    });

    (signIn as jest.Mock).mockResolvedValue({
      error: 'Invalid credentials',
      ok: false,
      status: 401,
    });

    const { result } = renderHook(() => useAuth());

    let signInError: Error | undefined;
    await act(async () => {
      try {
        await result.current.login({
          email: 'test@example.com',
          password: 'wrongpassword',
        });
      } catch (e) {
        signInError = e as Error;
      }
    });

    expect(signInError).toBeDefined();
    expect(signInError?.message).toBe('Invalid credentials');
  });

  it('handles sign out error', async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          id: 1,
          email: 'test@example.com',
          name: 'Test User',
        },
        expires: '2024-12-31',
      },
      status: 'authenticated',
    });

    (signOut as jest.Mock).mockRejectedValue(new Error('Failed to sign out'));

    const { result } = renderHook(() => useAuth());

    let signOutError: Error | undefined;
    await act(async () => {
      try {
        await result.current.logout();
      } catch (e) {
        signOutError = e as Error;
      }
    });

    expect(signOutError).toBeDefined();
    expect(signOutError?.message).toBe('Failed to sign out');
  });
}); 