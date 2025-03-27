import { useState } from 'react';
import Image from 'next/image';
import { StarIcon, PhotoIcon } from '@heroicons/react/24/solid';
import { formatDate } from '@/lib/utils';

interface Review {
    id: number;
    userId: number;
    rating: number;
    title: string;
    content: string;
    media: string[];
    createdAt: string;
    user: {
        name: string;
        sns: {
            platform: string;
            handle: string;
        }[];
    };
}

interface CampaignReviewsProps {
    campaignId: number;
    reviews: Review[];
    totalReviews: number;
    averageRating: number;
}

export default function CampaignReviews({
    campaignId,
    reviews,
    totalReviews,
    averageRating,
}: CampaignReviewsProps) {
    const [filter, setFilter] = useState<'all' | 'photo'>('all');
    const [sort, setSort] = useState<'recent' | 'rating'>('recent');

    // 리뷰 필터링
    const filteredReviews = reviews.filter(review => 
        filter === 'all' || (filter === 'photo' && review.media.length > 0)
    );

    // 리뷰 정렬
    const sortedReviews = [...filteredReviews].sort((a, b) => {
        if (sort === 'recent') {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        } else {
            return b.rating - a.rating;
        }
    });

    return (
        <div className="mt-12">
            {/* 리뷰 요약 */}
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-2xl font-bold mb-2">리뷰</h3>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <StarIcon
                                        key={i}
                                        className={`w-5 h-5 ${
                                            i < Math.round(averageRating)
                                                ? 'text-yellow-400'
                                                : 'text-gray-300'
                                        }`}
                                    />
                                ))}
                            </div>
                            <span className="text-lg font-semibold">{averageRating.toFixed(1)}</span>
                            <span className="text-gray-500">({totalReviews}개의 리뷰)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 필터 및 정렬 */}
            <div className="flex justify-between mb-6">
                <div className="flex gap-2">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-full ${
                            filter === 'all'
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-gray-600'
                        }`}
                    >
                        전체 리뷰
                    </button>
                    <button
                        onClick={() => setFilter('photo')}
                        className={`px-4 py-2 rounded-full flex items-center gap-2 ${
                            filter === 'photo'
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-gray-600'
                        }`}
                    >
                        <PhotoIcon className="w-5 h-5" />
                        포토 리뷰
                    </button>
                </div>
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as 'recent' | 'rating')}
                    className="px-4 py-2 border rounded-lg"
                >
                    <option value="recent">최신순</option>
                    <option value="rating">평점순</option>
                </select>
            </div>

            {/* 리뷰 목록 */}
            <div className="space-y-8">
                {sortedReviews.map((review) => (
                    <div key={review.id} className="border-b pb-8">
                        {/* 리뷰어 정보 */}
                        <div className="flex justify-between mb-4">
                            <div>
                                <div className="font-semibold">{review.user.name}</div>
                                <div className="text-sm text-gray-500">
                                    {review.user.sns.map(sns => sns.platform).join(', ')}
                                </div>
                            </div>
                            <div className="text-sm text-gray-500">
                                {formatDate(review.createdAt)}
                            </div>
                        </div>

                        {/* 평점 */}
                        <div className="flex items-center mb-4">
                            {[...Array(5)].map((_, i) => (
                                <StarIcon
                                    key={i}
                                    className={`w-5 h-5 ${
                                        i < review.rating
                                            ? 'text-yellow-400'
                                            : 'text-gray-300'
                                    }`}
                                />
                            ))}
                        </div>

                        {/* 리뷰 제목 및 내용 */}
                        <h4 className="text-lg font-semibold mb-2">{review.title}</h4>
                        <p className="text-gray-600 mb-4">{review.content}</p>

                        {/* 리뷰 이미지 */}
                        {review.media.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {review.media.map((url, index) => (
                                    <div key={index} className="relative aspect-square">
                                        <Image
                                            src={url}
                                            alt={`리뷰 이미지 ${index + 1}`}
                                            fill
                                            className="object-cover rounded-lg"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* 리뷰가 없는 경우 */}
            {sortedReviews.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    아직 작성된 리뷰가 없습니다.
                </div>
            )}
        </div>
    );
} 