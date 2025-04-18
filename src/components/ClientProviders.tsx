'use client';

import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '@/contexts/AuthContext';
import { ToastProvider } from '@/contexts/ToastContext';
import SessionCheck from './SessionCheck';
import React from 'react';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <ToastProvider>
          <SessionCheck />
          {children}
        </ToastProvider>
      </AuthProvider>
    </SessionProvider>
  );
} 