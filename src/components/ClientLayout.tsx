'use client';

import { Suspense } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { AuthProvider } from '@/contexts/AuthContext';
import { ToastProvider } from '@/contexts/ToastContext';
import Loading from '@/app/loading';
import { SessionProvider } from 'next-auth/react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <ErrorBoundary>
      <SessionProvider>
        <AuthProvider>
          <ToastProvider>
            <Suspense fallback={<Loading />}>
              <div className="min-h-screen flex flex-col">
                <Navigation />
                <main className="flex-grow bg-white pb-16">
                  {children}
                </main>
                <Footer />
              </div>
            </Suspense>
          </ToastProvider>
        </AuthProvider>
      </SessionProvider>
    </ErrorBoundary>
  );
} 