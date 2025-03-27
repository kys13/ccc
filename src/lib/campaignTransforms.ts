import { Campaign, TransformedCampaign } from '@/types/campaign';

export const transformCampaigns = (campaigns: Campaign[]): TransformedCampaign[] => {
  return campaigns.map((campaign) => ({
    id: campaign.id,
    title: campaign.title,
    description: campaign.description,
    imageUrl: campaign.imageUrl ?? '/default-campaign.jpg',
    reward: new Intl.NumberFormat('ko-KR', {
      style: 'decimal',
      maximumFractionDigits: 0,
    }).format(campaign.reward) + '원',
    endDate: campaign.endDate,
    category: campaign.category?.name ?? '',
    snsTypes: campaign.snsTypes,
    location: campaign.location
      ? `${campaign.location.city} ${campaign.location.district} ${campaign.location.address}`
      : '',
    client: campaign.client.name,
    currentParticipants: campaign.currentParticipants,
    maxParticipants: campaign.maxParticipants,
    campaignType: campaign.campaignType,
  }));
}; 