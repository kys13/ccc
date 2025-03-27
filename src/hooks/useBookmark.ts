import { useState } from 'react';
import { toggleBookmark } from '@/lib/api/campaigns';
import { useAuth } from './useAuth';

export function useBookmark(initialState: boolean) {
  const [isBookmarked, setIsBookmarked] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  const toggle = async (campaignId: number) => {
    if (isLoading) return;
    if (!isAuthenticated) {
      setError('Login required');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await toggleBookmark(campaignId.toString());
      setIsBookmarked((prev) => !prev);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to toggle bookmark');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isBookmarked,
    isLoading,
    error,
    toggle,
  };
} 