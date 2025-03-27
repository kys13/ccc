'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface User {
  id: number;
  email: string;
  name: string;
  role: 'ADMIN' | 'USER';
  status: 'ACTIVE' | 'INACTIVE';
}

interface LoginCredentials {
  email: string;
  password: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  token: string | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();

  const checkAuth = async (): Promise<boolean> => {
    try {
      const currentToken = Cookies.get('token');
      if (!currentToken) {
        setUser(null);
        setToken(null);
        return false;
      }

      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${currentToken}`,
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setToken(currentToken);
        return true;
      } else {
        setUser(null);
        setToken(null);
        Cookies.remove('token', { path: '/' });
        return false;
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setUser(null);
      setToken(null);
      Cookies.remove('token', { path: '/' });
      return false;
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = Cookies.get('token');
      if (storedToken) {
        setToken(storedToken);
        await checkAuth();
      }
      setIsInitialized(true);
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      const endpoint = credentials.isAdmin ? '/api/admin/login' : '/api/auth/login';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        },
        credentials: 'include',
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '로그인에 실패했습니다.');
      }

      const data = await response.json();
      
      if (!data.token || !data.user) {
        throw new Error('Invalid response data');
      }

      // 관리자 권한 확인
      if (credentials.isAdmin && data.user.role !== 'ADMIN') {
        throw new Error('관리자 권한이 없습니다.');
      }

      // 토큰을 쿠키에 저장
      Cookies.set('token', data.token, { 
        expires: 7,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
        path: '/'
      });
      
      setToken(data.token);
      setUser(data.user);

      // 토큰이 제대로 설정되었는지 확인
      const verifyToken = Cookies.get('token');
      if (!verifyToken) {
        throw new Error('Token was not properly set');
      }

      return true;
    } catch (error: any) {
      console.error('Login error:', error);
      setUser(null);
      setToken(null);
      Cookies.remove('token', { path: '/' });
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove('token', { path: '/' });
    setToken(null);
    setUser(null);
    router.push(user?.role === 'ADMIN' ? '/admin/login' : '/login');
  };

  if (!isInitialized) {
    return null;
  }

  const value = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    isAdmin: user?.role === 'ADMIN',
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 