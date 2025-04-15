import { Campaign as PrismaCampaign, Location, VisitCategory, DeliveryCategory, CampaignApplication, Review, CampaignCategory, Notification, SEO } from '@prisma/client';

export type CampaignType = 'visit' | 'delivery';
export type CampaignStatus = 'PENDING' | 'ONGOING' | 'COMPLETED';

export interface Campaign {
  id: number;
  title: string;
  description: string;
  imageUrl: string | null;
  reward: number;
  maxParticipants: number;
  currentParticipants: number;
  startDate: string;
  endDate: string;
  locationData: any | null;
  snsTypes: string[];
  requirements: string;
  reviewTemplate: string | null;
  status: CampaignStatus;
  isVisible: boolean;
  showPopular: boolean;
  showDeadline: boolean;
  showLatest: boolean;
  createdAt: string;
  updatedAt: string;
  visitCategoryId: number | null;
  deliveryCategoryId: number | null;
  locationId: number | null;
  location?: Location | null;
  visitCategory?: VisitCategory | null;
  deliveryCategory?: DeliveryCategory | null;
  categories: CampaignCategory[];
  applications: CampaignApplication[];
  reviews: Review[];
  notifications?: Notification[];
  seo?: SEO | null;
  is_bookmarked?: boolean;
  _count?: {
    applications?: number;
    reviews?: number;
  };
}

export interface CampaignCreateData {
  type: 'visit' | 'delivery';
  title: string;
  description: string;
  imageUrl?: string;
  category: string;
  region?: string;
  district?: string;
  snsTypes: string[];
  reward: number;
  maxParticipants: number;
  requirements: string;
  startDate: string;
  endDate: string;
  status: 'ONGOING' | 'COMPLETED' | 'PENDING';
}

export interface CampaignUpdateData extends Partial<CampaignCreateData> {
  id: number;
}

export interface TransformedCampaign {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  reward: string;
  endDate: string;
  category: string;
  snsTypes: string[];
  location: string;
  client: string;
  currentParticipants: number;
  maxParticipants: number;
  campaignType: CampaignType;
} 