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
  snsTypes: string[];
  requirements: string;
  status: CampaignStatus;
  isVisible: boolean;
  showLatest: boolean;
  showPopular: boolean;
  showDeadline: boolean;
  visitCategory?: {
    id: number;
    name: string;
    description?: string;
  };
  deliveryCategory?: {
    id: number;
    name: string;
    description?: string;
  };
  location?: {
    id: number;
    city: string;
    district: string;
    address: string;
  };
  categories: {
    id: number;
    name: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
  is_bookmarked?: boolean;
  
  // Relations
  applications: {
    status: string;
  }[];
  reviews: {
    id: number;
    title: string;
    content: string;
    rating: number;
    status: string;
    createdAt: Date;
    user: {
      name: string | null;
    };
  }[];
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