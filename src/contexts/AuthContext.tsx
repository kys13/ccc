'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Role, Status } from '@prisma/client'; // Import Enums if needed elsewhere

// Define the user structure based on the session object from next-auth
interface SessionUser {
  id: number;
  email: string;
  name: string;
  role: Role;
  status: Status;
}

interface LoginCredentials {
  email: string;
  password: string;
  isAdmin?: boolean; // Keep this to potentially pass to signIn callbackUrl
}

interface AuthContextType {
  user: SessionUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  status: 'loading' | 'authenticated' | 'unauthenticated';
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const login = async (credentials: LoginCredentials) => {
    try {
      const result = await signIn('credentials', {
        redirect: false, // Prevent automatic redirection
        email: credentials.email,
        password: credentials.password,
        callbackUrl: credentials.isAdmin ? '/admin/dashboard' : '/' // Redirect manually after success
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      // No need to manually set user/token, useSession handles it
      // Redirect based on isAdmin flag or result
      router.push(credentials.isAdmin ? '/admin/dashboard' : '/'); 

    } catch (error: any) {
      console.error('Login error:', error);
      // Let the component calling login handle the error display
      throw error; 
    }
  };

  const logout = () => {
    const isAdminLogout = session?.user?.role === 'ADMIN';
    signOut({ callbackUrl: isAdminLogout ? '/admin/login' : '/login' });
    // No need to manually clear state, useSession handles it
  };

  // Derive user, isAuthenticated, isAdmin directly from the session object
  const user = session?.user as SessionUser | null;
  const isAuthenticated = status === 'authenticated';
  const isAdmin = isAuthenticated && user?.role === 'ADMIN';

  const value = {
    user,
    isAuthenticated,
    isAdmin,
    status,
    login,
    logout,
    // checkAuth is no longer needed as useSession handles session checks
  };

  // Render children once the session status is determined (not loading)
  // Or, always render and let components decide based on status
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 