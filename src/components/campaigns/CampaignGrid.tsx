import { memo } from 'react';
import CampaignCard from './CampaignCard';
import type { Campaign } from '@/types/campaign';

interface CampaignGridProps {
  campaigns: Campaign[];
  onBookmarkToggle?: (campaignId: number) => void;
  isLoading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  error?: string;
}

function CampaignGrid({ 
  campaigns, 
  onBookmarkToggle,
  isLoading,
  hasMore,
  onLoadMore,
  error
}: CampaignGridProps) {
  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        {error}
      </div>
    );
  }

  if (isLoading && campaigns.length === 0) {
    return (
      <div data-testid="campaign-grid-loading" className="text-center py-8">
        Loading...
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <div className="text-center py-8">
        캠페인이 없습니다.
      </div>
    );
  }

  return (
    <div className="w-full px-2">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="w-full">
            <CampaignCard
              campaign={campaign}
              onBookmarkToggle={() => onBookmarkToggle?.(campaign.id)}
            />
          </div>
        ))}
      </div>
      {isLoading && hasMore && (
        <div data-testid="load-more-spinner" className="text-center py-4">
          Loading more...
        </div>
      )}
    </div>
  );
}

export default memo(CampaignGrid); 