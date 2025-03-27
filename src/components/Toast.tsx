'use client';

import { useEffect } from 'react';
import { useToast } from '@/hooks/useToast';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const icons = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
  warning: AlertCircle,
};

const colors = {
  success: 'bg-green-50 text-green-800 border-green-200',
  error: 'bg-red-50 text-red-800 border-red-200',
  info: 'bg-blue-50 text-blue-800 border-blue-200',
  warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
};

export default function Toast() {
  const { message, type, isVisible, hideToast } = useToast();
  const Icon = icons[type];

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(hideToast, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, hideToast]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className={cn(
          'flex items-center gap-2 px-4 py-3 rounded-lg border shadow-lg transition-all duration-300',
          colors[type]
        )}
      >
        <Icon className="w-5 h-5" />
        <p className="text-sm font-medium">{message}</p>
      </div>
    </div>
  );
} 