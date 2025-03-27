import React, { createContext, useContext, useState } from 'react';
import { User } from '@/types/user';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUser: User = {
  id: 1,
  email: 'test@example.com',
  name: 'Test User',
  created_at: new Date(),
  updated_at: new Date(),
  role: 'user',
  image_url: 'https://example.com/image.jpg',
  is_verified: true,
  notification_settings: {
    email: true,
    push: true,
  },
};

export function TestAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(mockUser); // Start authenticated for tests
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // Start authenticated for tests
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async () => {
    setIsLoading(true);
    try {
      setUser(mockUser);
      setIsAuthenticated(true);
      setError(null);
    } catch (err) {
      setError('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  };

  const register = async () => {
    setIsLoading(true);
    try {
      setUser(mockUser);
      setIsAuthenticated(true);
      setError(null);
    } catch (err) {
      setError('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        error,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 