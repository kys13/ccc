import React from 'react';
import { render, screen, waitFor, createMockCampaign } from '@/test/utils';
import CampaignCard from './CampaignCard';
import { useAuth } from '@/contexts/AuthContext';
import { toggleBookmark } from '@/lib/api/campaigns';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';
import { Campaign } from '@/types/campaign';
import { AuthProvider } from '@/contexts/AuthContext';
import { ToastProvider } from '@/contexts/ToastContext';
import { SessionProvider } from 'next-auth/react';

// Mock next-auth
jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: {
      user: {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
      },
      expires: new Date(Date.now() + 2 * 86400).toISOString(),
    },
    status: 'authenticated',
  }),
  SessionProvider: ({ children }: { children: React.ReactNode }) => children,
  signIn: jest.fn(() => Promise.resolve({ error: null })),
  signOut: jest.fn(() => Promise.resolve()),
}));

// Mock AuthContext
jest.mock('@/contexts/AuthContext', () => ({
  ...jest.requireActual('@/contexts/AuthContext'),
  useAuth: jest.fn(() => ({
    isAuthenticated: true,
    user: {
      id: 1,
      email: 'test@example.com',
      name: 'Test User',
      created_at: new Date(),
      updated_at: new Date(),
      role: 'user',
      image_url: null,
      is_verified: true,
      notification_settings: { email: true, push: true }
    }
  })),
}));

jest.mock('@/lib/api/campaigns', () => ({
  toggleBookmark: jest.fn(),
}));

const mockUseAuth = useAuth as jest.Mock;
const mockToggleBookmark = toggleBookmark as jest.Mock;

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <SessionProvider>
    <AuthProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
  </SessionProvider>
);

describe('CampaignCard', () => {
  const mockCampaign: Campaign = {
    id: 1,
    title: '테스트 캠페인',
    description: '캠페인 설명',
    imageUrl: '/test-image.jpg',
    reward: 50000,
    startDate: '2024-03-01',
    endDate: '2024-03-31',
    status: 'COMPLETED',
    currentParticipants: 5,
    maxParticipants: 10,
    requirements: '리뷰 작성 필수',
    reviewTemplate: '맛있게 드셨나요?',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
    visitCategoryId: 1,
    deliveryCategoryId: null,
    categoryId: 1,
    clientId: 1,
    locationId: 1,
    locationData: null,
    campaignType: 'visit',
    category: { id: 1, name: '음식점' },
    client: { name: '테스트 업체', companyName: '테스트 회사' },
    snsTypes: ['instagram'],
    location: {
      city: '서울',
      district: '강남구',
      address: '테헤란로 123'
    },
    is_bookmarked: false
  };

  const mockOnBookmarkToggle = jest.fn();

  beforeEach(() => {
    mockUseAuth.mockReturnValue({ user: null });
    mockToggleBookmark.mockResolvedValue({});
    jest.clearAllMocks();
  });

  it('renders campaign information correctly', () => {
    render(<CampaignCard campaign={mockCampaign} />);
    expect(screen.getByText(mockCampaign.title)).toBeInTheDocument();
    expect(screen.getByText('서울')).toBeInTheDocument();
    expect(screen.getByText('instagram')).toBeInTheDocument();
    expect(screen.getByText('₩50,000')).toBeInTheDocument();
    expect(screen.getByText('신청 5/10명')).toBeInTheDocument();
  });

  it('displays campaign status correctly', () => {
    render(<CampaignCard campaign={mockCampaign} />);
    expect(screen.getByText('마감됨')).toBeInTheDocument();
  });

  it('displays campaign location correctly', () => {
    render(<CampaignCard campaign={mockCampaign} />);
    expect(screen.getByText('서울')).toBeInTheDocument();
  });

  it('displays SNS types correctly', () => {
    render(<CampaignCard campaign={mockCampaign} />);
    expect(screen.getByText('instagram')).toBeInTheDocument();
  });

  it('displays reward amount correctly', () => {
    render(<CampaignCard campaign={mockCampaign} />);
    expect(screen.getByText('₩50,000')).toBeInTheDocument();
  });

  it('displays participant count correctly', () => {
    render(<CampaignCard campaign={mockCampaign} />);
    expect(screen.getByText('신청 5/10명')).toBeInTheDocument();
  });

  it('handles missing location gracefully', () => {
    const campaignWithoutLocation = { ...mockCampaign, location: undefined };
    render(<CampaignCard campaign={campaignWithoutLocation} />);
    expect(screen.queryByText('서울')).not.toBeInTheDocument();
  });

  it('handles missing category gracefully', () => {
    const campaignWithoutCategory = { ...mockCampaign, category: null };
    render(<CampaignCard campaign={campaignWithoutCategory} />);
    expect(screen.queryByText('음식점')).not.toBeInTheDocument();
  });

  it('handles missing SNS types gracefully', () => {
    const campaignWithoutSNS = { ...mockCampaign, snsTypes: [] };
    render(<CampaignCard campaign={campaignWithoutSNS} />);
    expect(screen.queryByText('instagram')).not.toBeInTheDocument();
  });

  it('shows login required message when non-authenticated user tries to bookmark', async () => {
    mockUseAuth.mockReturnValue({ user: null });
    render(
      <ToastProvider>
        <CampaignCard campaign={mockCampaign} />
      </ToastProvider>
    );
    
    const bookmarkButton = screen.getByLabelText('북마크 추가');
    await userEvent.click(bookmarkButton);
    
    await waitFor(() => {
      expect(screen.getByText('로그인이 필요한 서비스입니다.')).toBeInTheDocument();
    });
  });

  it('toggles bookmark when authenticated user clicks bookmark button', async () => {
    mockUseAuth.mockReturnValue({
      user: {
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        created_at: new Date(),
        updated_at: new Date(),
        role: 'user',
        image_url: null,
        is_verified: true,
        notification_settings: { email: true, push: true }
      }
    });
    mockToggleBookmark.mockResolvedValue({});
    
    const onBookmarkToggle = jest.fn();
    render(
      <ToastProvider>
        <CampaignCard campaign={mockCampaign} onBookmarkToggle={onBookmarkToggle} />
      </ToastProvider>
    );
    
    const bookmarkButton = screen.getByLabelText('북마크 추가');
    await userEvent.click(bookmarkButton);
    
    await waitFor(() => {
      expect(mockToggleBookmark).toHaveBeenCalledWith(mockCampaign.id.toString());
      expect(onBookmarkToggle).toHaveBeenCalled();
      expect(screen.getByText('북마크가 추가되었습니다.')).toBeInTheDocument();
    });
  });

  it('shows error toast when bookmark toggle fails', async () => {
    mockUseAuth.mockReturnValue({
      user: {
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        created_at: new Date(),
        updated_at: new Date(),
        role: 'user',
        image_url: null,
        is_verified: true,
        notification_settings: { email: true, push: true }
      }
    });
    mockToggleBookmark.mockRejectedValue(new Error('Failed to toggle bookmark'));
    
    render(
      <ToastProvider>
        <CampaignCard campaign={mockCampaign} />
      </ToastProvider>
    );
    
    const bookmarkButton = screen.getByLabelText('북마크 추가');
    await userEvent.click(bookmarkButton);
    
    await waitFor(() => {
      expect(screen.getByText('북마크 처리 중 오류가 발생했습니다.')).toBeInTheDocument();
    });
  });

  it('formats deadline correctly', () => {
    render(<CampaignCard campaign={mockCampaign} />);
    expect(screen.getByText('마감됨')).toBeInTheDocument();
  });

  it('handles image loading error', () => {
    render(<CampaignCard campaign={mockCampaign} />);
    const image = screen.getByAltText(mockCampaign.title);
    fireEvent.error(image);
    expect(image).toHaveAttribute('src', '/default-campaign.jpg');
    expect(screen.getByText('이미지를 불러오는데 실패했습니다.')).toBeInTheDocument();
  });

  it('displays campaign progress correctly', () => {
    render(<CampaignCard campaign={mockCampaign} />);
    expect(screen.getByText('신청 5/10명')).toBeInTheDocument();
  });
}); 