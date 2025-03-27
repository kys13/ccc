'use client';

import React, { useState, useCallback, memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/contexts/ToastContext';
import { toggleBookmark } from '@/lib/api/campaigns';
import { Bookmark } from 'lucide-react';
import { Campaign } from '@/types/campaign';
import { cn, formatDate } from '@/lib/utils';

interface CampaignCardProps {
    campaign: Campaign;
    onBookmarkToggle?: (campaignId: number) => void;
}

const CampaignCard = memo(({ campaign, onBookmarkToggle }: CampaignCardProps) => {
    const { user } = useAuth();
    const { showToast } = useToast();
    const [isBookmarked, setIsBookmarked] = useState<boolean>(campaign.is_bookmarked || false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [imageError, setImageError] = useState<boolean>(false);

    const handleBookmarkClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user) {
            showToast('로그인이 필요한 서비스입니다.', 'error');
            return;
        }

        setIsLoading(true);
        try {
            await toggleBookmark(campaign.id.toString());
            setIsBookmarked(!isBookmarked);
            onBookmarkToggle?.(campaign.id);
            showToast(isBookmarked ? '북마크가 해제되었습니다.' : '북마크가 추가되었습니다.', 'success');
        } catch (error) {
            console.error('Error toggling bookmark:', error);
            showToast('북마크 처리 중 오류가 발생했습니다.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageError = useCallback(() => {
        setImageError(true);
    }, []);

    const formatDeadline = useCallback((): string => {
        const endDate = new Date(campaign.endDate);
        const now = new Date();
        const diffTime = endDate.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (campaign.status === 'COMPLETED') return '마감됨';
        if (diffDays <= 0) return '마감됨';
        return `${diffDays}일 남음`;
    }, [campaign.endDate, campaign.status]);

    const progress = Math.min(
        (campaign.currentParticipants / campaign.maxParticipants) * 100,
        100
    );

    return (
        <Link 
            href={`/campaigns/${campaign.id}`}
            className="block w-[265px] focus:outline-none focus:ring-2 focus:ring-[#FF5C35] focus:ring-offset-2 rounded-lg transform transition-all duration-300 hover:translate-y-[-4px]"
        >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[406px] transition-shadow duration-300 hover:shadow-xl">
                <div className="relative h-[225px] w-[245px] mx-auto mt-2">
                    {campaign.imageUrl ? (
                        <Image
                            src={imageError ? '/default-campaign.jpg' : campaign.imageUrl || '/default-campaign.jpg'}
                            alt={campaign.title}
                            fill
                            className="object-cover rounded-lg"
                            onError={handleImageError}
                            sizes="245px"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg">
                            <span className="text-gray-400">No Image</span>
                        </div>
                    )}
                    <button
                        aria-label={isBookmarked ? '북마크 해제' : '북마크 추가'}
                        className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-gray-100 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#FF5C35] disabled:opacity-50 disabled:cursor-not-allowed z-10"
                        onClick={handleBookmarkClick}
                        disabled={isLoading}
                    >
                        <Bookmark
                            className={cn(
                                'w-5 h-5 transition-colors duration-200',
                                isBookmarked ? 'text-[#FF5C35] fill-current' : 'text-gray-400'
                            )}
                        />
                    </button>
                </div>

                <div className="p-4 flex flex-col h-[181px] justify-between">
                    <div className="space-y-2">
                        <div className="flex justify-between items-start gap-2">
                            <h3 className="text-lg font-semibold line-clamp-2 flex-1">
                                {campaign.title}
                            </h3>
                            <span className={cn(
                                'text-sm font-medium whitespace-nowrap px-2 py-1 rounded-full',
                                campaign.status === 'COMPLETED' 
                                    ? 'bg-red-100 text-red-600' 
                                    : 'bg-green-100 text-green-600'
                            )}>
                                {formatDeadline()}
                            </span>
                        </div>

                        <p className="text-gray-600 text-sm line-clamp-1">
                            {campaign.description}
                        </p>

                        <div className="flex justify-between items-center">
                            <div className="flex gap-1">
                                <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                                    {campaign.visitCategory?.name || campaign.deliveryCategory?.name}
                                </span>
                                {campaign.location && (
                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                                        {campaign.location.city}
                                    </span>
                                )}
                            </div>
                            <span className="text-[#FF5C35] font-semibold whitespace-nowrap">
                                ₩{campaign.reward.toLocaleString()}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex gap-1">
                            {campaign.snsTypes.slice(0, 2).map((sns, index) => (
                                <span key={index} className="px-2 py-1 bg-[#FF5C35]/10 text-[#FF5C35] rounded-full text-xs">
                                    {sns}
                                </span>
                            ))}
                        </div>
                        
                        <div className="space-y-1.5">
                            <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="absolute top-0 left-0 h-full transition-all duration-300 ease-out rounded-full"
                                    style={{
                                        width: `${progress}%`,
                                        background: 'linear-gradient(90deg, #FF5C35 0%, #FF8A3D 50%, #FFA149 100%)'
                                    }}
                                />
                            </div>
                            <div className="flex items-center justify-between gap-1">
                                <span className="text-xs font-medium text-[#FF5C35]">
                                    {Math.round(progress)}% 달성
                                </span>
                                <span className="text-xs text-gray-500">
                                    {campaign.currentParticipants}명 지원 중
                                    <span className="mx-1">•</span>
                                    {campaign.maxParticipants}명 모집
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
});

CampaignCard.displayName = 'CampaignCard';

export default CampaignCard; 