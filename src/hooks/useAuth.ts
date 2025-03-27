import { useSession, signIn, signOut } from 'next-auth/react';

interface LoginCredentials {
  email: string;
  password: string;
}

export function useAuth() {
  const { data: session, status } = useSession();

  const isAuthenticated = status === 'authenticated';
  const isLoading = status === 'loading';

  const login = async (credentials: LoginCredentials) => {
    const result = await signIn('credentials', {
      ...credentials,
      redirect: false,
    });

    if (result?.error) {
      throw new Error(result.error);
    }

    return result;
  };

  const logout = async () => {
    try {
      await signOut();
    } catch (error) {
      throw new Error('Failed to sign out');
    }
  };

  return {
    user: session?.user ?? null,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
} 