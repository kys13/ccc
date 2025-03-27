'use client';

import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { formatNumber } from '@/lib/utils';

interface CampaignCardProps {
    id: number;
    title: string;
    imageUrl?: string;
    reward: number;
    maxParticipants: number;
    currentParticipants: number;
    endDate: Date;
    type: 'visit' | 'delivery';
}

export default function CampaignCard({
    id,
    title,
    imageUrl,
    reward,
    maxParticipants,
    currentParticipants,
    endDate,
    type
}: CampaignCardProps) {
    const progress = (currentParticipants / maxParticipants) * 100;
    const remainingSpots = maxParticipants - currentParticipants;
    const timeLeft = formatDistanceToNow(new Date(endDate), { addSuffix: true, locale: ko });

    return (
        <Link href={`/campaigns/${id}`}>
            <div className="relative flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 w-full">
                    <Image
                        src={imageUrl || '/default-campaign.jpg'}
                        alt={title}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute top-2 right-2 px-2 py-1 bg-primary text-white text-sm rounded">
                        {type === 'visit' ? '방문형' : '배송형'}
                    </div>
                </div>
                
                <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-lg font-semibold line-clamp-2 mb-2">{title}</h3>
                    
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-primary font-bold">{formatNumber(reward)}원</span>
                        <span className="text-gray-600 text-sm">{timeLeft}</span>
                    </div>

                    <div className="mt-auto">
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">신청 현황</span>
                            <span className="text-primary font-semibold">
                                {currentParticipants}/{maxParticipants}명
                            </span>
                        </div>
                        
                        <div className="relative h-2 bg-gray-200 rounded overflow-hidden">
                            <div
                                className="absolute left-0 top-0 h-full bg-primary transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        
                        <div className="mt-2 text-sm text-center">
                            {remainingSpots > 0 ? (
                                <span className="text-primary">잔여 {remainingSpots}자리</span>
                            ) : (
                                <span className="text-red-500">모집 완료</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
} 