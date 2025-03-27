import { transformCampaigns } from './transforms';
import { Campaign, CampaignType } from '@/types/campaign';

describe('transformCampaigns', () => {
  const mockCampaign: Campaign = {
    id: 1,
    title: '테스트 캠페인',
    description: '캠페인 설명',
    imageUrl: 'https://example.com/image.jpg',
    reward: 50000,
    startDate: '2024-03-01',
    endDate: '2024-03-31',
    status: 'ONGOING',
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
      address: '테헤란로 123',
    },
  };

  it('transforms campaign data correctly', () => {
    const transformed = transformCampaigns([mockCampaign]);
    const result = transformed[0];

    expect(result).toEqual({
      id: 1,
      title: '테스트 캠페인',
      description: '캠페인 설명',
      imageUrl: 'https://example.com/image.jpg',
      reward: '50,000원',
      endDate: '2024-03-31',
      category: '음식점',
      snsTypes: ['instagram'],
      location: '서울 강남구 테헤란로 123',
      client: '테스트 업체',
      currentParticipants: 5,
      maxParticipants: 10,
      campaignType: 'visit',
    });
  });

  it('handles empty campaign array', () => {
    const transformed = transformCampaigns([]);
    expect(transformed).toEqual([]);
  });

  it('formats reward correctly for different amounts', () => {
    const testCases = [
      { reward: 1000, expected: '1,000원' },
      { reward: 10000, expected: '10,000원' },
      { reward: 100000, expected: '100,000원' },
      { reward: 1000000, expected: '1,000,000원' },
    ];

    testCases.forEach(({ reward, expected }) => {
      const campaign = { ...mockCampaign, reward };
      const [transformed] = transformCampaigns([campaign]);
      expect(transformed.reward).toBe(expected);
    });
  });

  it('handles missing or null values gracefully', () => {
    const campaign: Campaign = {
      ...mockCampaign,
      category: null,
      client: { name: '', companyName: '' },
      snsTypes: [],
      currentParticipants: 0,
      maxParticipants: 0,
      location: undefined,
    };

    const [transformed] = transformCampaigns([campaign]);

    expect(transformed).toEqual(
      expect.objectContaining({
        category: '',
        client: '',
        snsTypes: [],
        currentParticipants: 0,
        maxParticipants: 0,
        location: '',
      })
    );
  });

  it('handles different campaign types', () => {
    const visitCampaign: Campaign = {
      ...mockCampaign,
      campaignType: 'visit',
      visitCategoryId: 1,
      deliveryCategoryId: null,
    };

    const deliveryCampaign: Campaign = {
      ...mockCampaign,
      campaignType: 'delivery',
      visitCategoryId: null,
      deliveryCategoryId: 1,
    };

    const [transformedVisit] = transformCampaigns([visitCampaign]);
    const [transformedDelivery] = transformCampaigns([deliveryCampaign]);

    expect(transformedVisit.campaignType).toBe('visit');
    expect(transformedDelivery.campaignType).toBe('delivery');
  });

  it('preserves original dates', () => {
    const [transformed] = transformCampaigns([mockCampaign]);
    expect(transformed.endDate).toBe('2024-03-31');
  });

  it('handles missing images', () => {
    const campaign: Campaign = {
      ...mockCampaign,
      imageUrl: null,
    };

    const [transformed] = transformCampaigns([campaign]);
    expect(transformed.imageUrl).toBe('/default-campaign.jpg');
  });
}); 