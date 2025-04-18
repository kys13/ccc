import { useSession, signIn, signOut } from 'next-auth/react';
import type { Session } from 'next-auth';

interface LoginCredentials {
  email: string;
  password: string;
}

// useAuth 반환 타입 정의
interface UseAuthReturn {
  user: Session['user'] | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAdmin: boolean;
  token: string | undefined; // token 타입 명시
  checkAuth: () => Promise<void>; // checkAuth 타입 명시
  login: (credentials: LoginCredentials) => Promise<any>; // login 타입은 signIn 반환 타입에 따라 조정 가능
  logout: () => Promise<void>; // logout 타입 명시
}

export function useAuth(): UseAuthReturn { // 반환 타입 적용
  const { data: session, status, update } = useSession();

  const isAuthenticated = status === 'authenticated';
  const isLoading = status === 'loading';
  const isAdmin = session?.user?.role === 'ADMIN';
  const token = session?.user?.token;

  const checkAuth = async (): Promise<void> => { // async 함수 반환 타입 명시
    try {
      await update();
    } catch (error) {
      throw new Error('인증 갱신에 실패했습니다.');
    }
  };

  const login = async (credentials: LoginCredentials): Promise<any> => { // async 함수 반환 타입 명시 (signIn 결과 타입 확인 필요)
    const result = await signIn('credentials', {
      ...credentials,
      redirect: false,
    });

    if (result?.error) {
      throw new Error(result.error);
    }

    return result;
  };

  const logout = async (): Promise<void> => { // async 함수 반환 타입 명시
    try {
      await signOut();
    } catch (error) {
      throw new Error('로그아웃에 실패했습니다.');
    }
  };

  return {
    user: session?.user ?? null,
    isAuthenticated,
    isLoading,
    isAdmin,
    token: session?.user?.token, // token 타입은 UseAuthReturn 인터페이스에 정의됨
    checkAuth,
    login,
    logout,
  };
} 