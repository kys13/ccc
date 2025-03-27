import { fetchWithAuth } from '@/lib/fetchWithAuth';

export interface GetApplicationsParams {
  page?: number;
  limit?: number;
  status?: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}

export async function getCampaignApplications(params: GetApplicationsParams = {}) {
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.set('page', params.page.toString());
  if (params.limit) searchParams.set('limit', params.limit.toString());
  if (params.status) searchParams.set('status', params.status);

  const response = await fetchWithAuth(`/api/applications?${searchParams.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch applications');
  }
  return response.json();
}

export async function createApplication(campaignId: number) {
  const response = await fetchWithAuth(`/api/campaigns/${campaignId}/apply`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Failed to create application');
  }
  return response.json();
}

export async function cancelApplication(applicationId: number) {
  const response = await fetchWithAuth(`/api/applications/${applicationId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to cancel application');
  }
  return response.json();
} 