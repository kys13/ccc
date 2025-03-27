import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CampaignFilters, { FilterOption } from './CampaignFilters';
import '@testing-library/jest-dom';
import { SelectTrigger } from '@/components/ui/select';

// Mock the Select component
jest.mock('@/components/ui/select', () => ({
  Select: ({ children, value, onValueChange }: any) => {
    return (
      <div data-testid="mock-select" data-value={value}>
        {React.Children.map(children, child => {
          if (child.type.name === 'SelectTrigger') {
            return React.cloneElement(child);
          }
          if (child.type.name === 'SelectContent') {
            return (
              <div data-testid="select-content">
                {React.Children.map(child.props.children, item => (
                  <div
                    role="option"
                    data-value={item.props.value}
                    onClick={() => onValueChange?.(item.props.value)}
                  >
                    {item.props.children}
                  </div>
                ))}
              </div>
            );
          }
          return child;
        })}
      </div>
    );
  },
  SelectTrigger: ({ children, ...props }: any) => (
    <div {...props}>{children}</div>
  ),
  SelectContent: ({ children }: any) => <div>{children}</div>,
  SelectItem: ({ children, value }: any) => (
    <div data-value={value}>{children}</div>
  ),
}));

const mockRegions: FilterOption[] = [
  { id: '1', name: '전체 지역', value: 'all' },
  { id: '2', name: '서울', value: 'seoul' },
  { id: '3', name: '부산', value: 'busan' },
];

const mockCategories: FilterOption[] = [
  { id: '1', name: '전체 카테고리', value: 'all' },
  { id: '2', name: '음식점', value: 'restaurant' },
  { id: '3', name: '카페', value: 'cafe' },
];

const mockSnsTypes: FilterOption[] = [
  { id: '1', name: '전체 SNS', value: 'all' },
  { id: '2', name: 'Instagram', value: 'instagram' },
  { id: '3', name: 'YouTube', value: 'youtube' },
];

const mockPriceRanges: FilterOption[] = [
  { id: '1', name: '전체 가격대', value: 'all' },
  { id: '2', name: '1만원 이하', value: '0-10000' },
  { id: '3', name: '1-5만원', value: '10000-50000' },
];

const defaultProps = {
  type: 'visit' as const,
  regions: mockRegions,
  categories: mockCategories,
  snsTypes: mockSnsTypes,
  priceRanges: mockPriceRanges,
  onFiltersChange: jest.fn(),
};

describe('CampaignFilters', () => {
  it('renders filter options correctly', () => {
    render(<CampaignFilters {...defaultProps} />);
    expect(screen.getByTestId('region-select')).toHaveTextContent('전체 지역');
    expect(screen.getByTestId('category-select')).toHaveTextContent('전체 카테고리');
    expect(screen.getByTestId('sns-select')).toHaveTextContent('전체 SNS');
    expect(screen.getByTestId('sort-select')).toHaveTextContent('최신순');
  });

  it('initializes with provided filter values', () => {
    render(
      <CampaignFilters
        {...defaultProps}
        initialFilters={{
          search: '테스트',
          region: 'seoul',
          category: 'restaurant',
          snsType: 'instagram',
          sort: 'reward',
        }}
      />
    );

    expect(screen.getByDisplayValue('테스트')).toBeInTheDocument();
    expect(screen.getByTestId('region-select')).toHaveTextContent('서울');
    expect(screen.getByTestId('category-select')).toHaveTextContent('음식점');
    expect(screen.getByTestId('sns-select')).toHaveTextContent('Instagram');
    expect(screen.getByTestId('sort-select')).toHaveTextContent('리워드순');
  });

  it('calls onFiltersChange when filters are updated', async () => {
    const user = userEvent.setup();
    const onFiltersChange = jest.fn();
    render(<CampaignFilters {...defaultProps} onFiltersChange={onFiltersChange} />);

    const regionTrigger = screen.getByTestId('region-select');
    await user.click(regionTrigger);
    const seoulOption = screen.getByRole('option', { name: '서울' });
    await user.click(seoulOption);

    expect(onFiltersChange).toHaveBeenCalledWith(expect.objectContaining({
      region: 'seoul',
      type: 'visit',
    }));
  });

  it('resets filters when reset button is clicked', async () => {
    const user = userEvent.setup();
    const onFiltersChange = jest.fn();
    render(
      <CampaignFilters
        {...defaultProps}
        onFiltersChange={onFiltersChange}
        initialFilters={{
          search: '테스트',
          region: 'seoul',
          category: 'restaurant',
          snsType: 'instagram',
          sort: 'reward',
        }}
      />
    );

    const resetButton = screen.getByRole('button', { name: '필터 초기화' });
    await user.click(resetButton);

    expect(onFiltersChange).toHaveBeenCalledWith({
      type: 'visit',
    });
  });

  it('debounces search input changes', async () => {
    const onFiltersChange = jest.fn();
    render(<CampaignFilters {...defaultProps} onFiltersChange={onFiltersChange} />);

    const searchInput = screen.getByPlaceholderText('캠페인 검색...');
    await userEvent.type(searchInput, '테스트');

    await waitFor(() => {
      expect(onFiltersChange).toHaveBeenCalledWith(expect.objectContaining({
        search: '테스트',
      }));
    }, { timeout: 1000 });
  });

  it('preserves other filter values when one filter changes', async () => {
    const user = userEvent.setup();
    const onFiltersChange = jest.fn();
    render(
      <CampaignFilters
        {...defaultProps}
        onFiltersChange={onFiltersChange}
        initialFilters={{
          search: '',
          region: 'seoul',
          category: 'restaurant',
          snsType: 'all',
          sort: 'latest',
        }}
      />
    );

    const snsTrigger = screen.getByTestId('sns-select');
    await user.click(snsTrigger);
    const instagramOption = screen.getByRole('option', { name: 'Instagram' });
    await user.click(instagramOption);

    await waitFor(() => {
      expect(onFiltersChange).toHaveBeenCalledWith({
        search: '',
        region: 'seoul',
        category: 'restaurant',
        snsType: 'instagram',
        sort: 'latest',
        type: 'visit',
      });
    });
  });

  it('shows price range filter only for delivery type', () => {
    render(<CampaignFilters {...defaultProps} type="delivery" />);
    expect(screen.getByTestId('price-select')).toHaveTextContent('전체 가격대');
  });
}); 