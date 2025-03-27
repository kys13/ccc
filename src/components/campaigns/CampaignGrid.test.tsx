import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import CampaignGrid from './CampaignGrid';
import { useInView } from 'react-intersection-observer';
import { Campaign } from '@/types/campaign';
import { useAuth } from '@/contexts/AuthContext';

// Mock useVirtualizer
jest.mock('@tanstack/react-virtual', () => ({
  useVirtualizer: () => ({
    getVirtualItems: () => [{ index: 0, key: 0, size: 400, start: 0 }],
    getTotalSize: () => 400,
  }),
}));

// Mock useWindowSize
jest.mock('@/hooks/useWindowSize', () => ({
  useWindowSize: () => ({ width: 1440, height: 900 }),
}));

jest.mock('react-intersection-observer', () => ({
  useInView: jest.fn(),
}));

jest.mock('@/contexts/AuthContext', () => ({
  ...jest.requireActual('@/contexts/AuthContext'),
  useAuth: jest.fn(),
}));

const mockUseAuth = useAuth as jest.Mock;

describe('CampaignGrid', () => {
  const mockCampaigns: Campaign[] = [
    {
      id: 1,
      title: '테스트 캠페인 1',
      description: '설명 1',
      imageUrl: '/image1.jpg',
      reward: 50000,
      startDate: '2024-03-01',
      endDate: '2024-03-31',
      status: 'COMPLETED',
      currentParticipants: 5,
      maxParticipants: 10,
      requirements: '',
      reviewTemplate: '',
      createdAt: new Date(),
      updatedAt: new Date(),
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
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useInView as jest.Mock).mockReturnValue([null, false]);
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
      },
      isAuthenticated: true,
      isLoading: false
    });
  });

  it('renders campaign cards correctly', () => {
    render(<CampaignGrid campaigns={mockCampaigns} />);

    mockCampaigns.forEach((campaign) => {
      expect(screen.getByText(campaign.title)).toBeInTheDocument();
      expect(screen.getByText(campaign.description)).toBeInTheDocument();
      expect(screen.getByText(`₩${campaign.reward.toLocaleString()}`)).toBeInTheDocument();
      if (campaign.category) {
        expect(screen.getByText(campaign.category.name)).toBeInTheDocument();
      }
      if (campaign.location) {
        expect(screen.getByText(campaign.location.city)).toBeInTheDocument();
      }
      expect(screen.getByText(campaign.client.companyName)).toBeInTheDocument();
    });
  });

  it('renders loading state correctly', () => {
    render(<CampaignGrid campaigns={[]} isLoading={true} />);
    expect(screen.getByTestId('campaign-grid-loading')).toBeInTheDocument();
  });

  it('renders empty state correctly', () => {
    render(<CampaignGrid campaigns={[]} isLoading={false} />);
    expect(screen.getByText('캠페인이 없습니다.')).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    const error = '에러가 발생했습니다.';
    render(<CampaignGrid campaigns={[]} error={error} />);
    expect(screen.getByText(error)).toBeInTheDocument();
  });

  it('calls onLoadMore when last item is in view', () => {
    const mockOnLoadMore = jest.fn();
    (useInView as jest.Mock).mockReturnValue([null, true]);

    render(
      <CampaignGrid
        campaigns={mockCampaigns}
        hasMore={true}
        onLoadMore={mockOnLoadMore}
      />
    );

    expect(mockOnLoadMore).toHaveBeenCalled();
  });

  it('does not call onLoadMore when hasMore is false', () => {
    const mockOnLoadMore = jest.fn();
    (useInView as jest.Mock).mockReturnValue([null, true]);

    render(
      <CampaignGrid
        campaigns={mockCampaigns}
        hasMore={false}
        onLoadMore={mockOnLoadMore}
      />
    );

    expect(mockOnLoadMore).not.toHaveBeenCalled();
  });

  it('handles bookmark toggle', async () => {
    const mockOnBookmarkToggle = jest.fn();
    const user = userEvent.setup();

    render(
      <CampaignGrid
        campaigns={mockCampaigns}
        onBookmarkToggle={mockOnBookmarkToggle}
      />
    );

    const bookmarkButtons = screen.getAllByLabelText(/북마크/);
    await user.click(bookmarkButtons[0]);

    expect(mockOnBookmarkToggle).toHaveBeenCalledWith(mockCampaigns[0].id);
  });

  it('adjusts grid layout based on screen width', () => {
    const { container } = render(<CampaignGrid campaigns={mockCampaigns} />);
    const grid = container.firstChild as HTMLElement;

    // Default (desktop) view
    expect(grid).toHaveStyle({
      'grid-template-columns': 'repeat(4, 1fr)',
    });

    // Simulate tablet view
    window.innerWidth = 1024;
    window.dispatchEvent(new Event('resize'));

    expect(grid).toHaveStyle({
      'grid-template-columns': 'repeat(3, 1fr)',
    });

    // Simulate mobile view
    window.innerWidth = 480;
    window.dispatchEvent(new Event('resize'));

    expect(grid).toHaveStyle({
      'grid-template-columns': 'repeat(1, 1fr)',
    });
  });

  it('shows loading spinner at the bottom when loading more', () => {
    render(
      <CampaignGrid
        campaigns={mockCampaigns}
        isLoading={true}
        hasMore={true}
      />
    );

    expect(screen.getByTestId('load-more-spinner')).toBeInTheDocument();
  });
}); 