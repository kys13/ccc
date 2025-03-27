import { Campaign } from './campaign';
import { User } from './user';

export interface CampaignApplication {
  id: number;
  userId: number;
  campaignId: number;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  submittedAt: string;
  campaign?: Campaign;
  user?: User;
  reviewId?: number;
}

export interface ApplicationResponse {
  applications: CampaignApplication[];
  total: number;
  page: number;
  limit: number;
} 