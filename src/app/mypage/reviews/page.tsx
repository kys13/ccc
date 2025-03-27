'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';

interface Review {
  id: number;
  title: string;
  content: string;
  rating: number;
  status: string;
  createdAt: string;
  campaign: {
    id: number;
    title: string;
  };
}

export default function ReviewsPage() {
  const { data: session, status } = useSession();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/login');
    }

    if (status === 'authenticated' && session?.user?.id) {
      fetchReviews();
    }
  }, [status, session]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/users/${session?.user?.id}/reviews`);
      if (!response.ok) throw new Error('리뷰를 불러오는데 실패했습니다.');
      const data = await response.json();
      setReviews(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '리뷰를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mypage-container">
        <div className="loading-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-32 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mypage-container">
        <div className="text-center text-red-600">
          <p>{error}</p>
          <button onClick={fetchReviews} className="btn btn-outline mt-4">
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mypage-container">
      <div className="mypage-header">
        <h1 className="text-2xl font-bold">리뷰 관리</h1>
      </div>

      {reviews.length === 0 ? (
        <div className="mypage-card text-center">
          <p className="text-gray-500">작성한 리뷰가 없습니다.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div>
                  <h3 className="review-title">
                    {review.campaign.title}
                  </h3>
                  <p className="review-meta">
                    작성일: {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`status-badge ${
                    review.status === 'DRAFT' ? 'status-pending' :
                    review.status === 'PUBLISHED' ? 'status-accepted' :
                    'status-rejected'
                  }`}>
                    {review.status === 'DRAFT' && '임시저장'}
                    {review.status === 'PUBLISHED' && '게시됨'}
                    {review.status === 'REJECTED' && '반려됨'}
                  </span>
                  <Link
                    href={`/reviews/${review.id}/edit`}
                    className="btn btn-primary"
                  >
                    수정
                  </Link>
                </div>
              </div>
              <div className="review-content">
                <h4 className="font-medium mb-2">{review.title}</h4>
                <p>{review.content}</p>
              </div>
              <div className="review-rating">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-5 w-5 ${
                      i < review.rating ? 'star-filled' : 'star-empty'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 