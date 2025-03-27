export async function toggleBookmark(campaignId: number): Promise<{ success: true }> {
  const response = await fetch(`/api/bookmarks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ campaignId }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to toggle bookmark');
  }

  return { success: true };
}

export async function fetchCampaigns(params: {
  type: 'visit' | 'delivery';
  page?: number;
  limit?: number;
  search?: string;
  region?: string;
  category?: string;
  snsType?: string;
  priceRange?: string;
  sort?: string;
}) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) searchParams.append(key, value.toString());
  });

  const response = await fetch(`/api/campaigns?${searchParams}`);

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to fetch campaigns');
  }

  return response.json();
}

export async function fetchBookmarks() {
  const response = await fetch('/api/bookmarks');

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to fetch bookmarks');
  }

  return response.json();
}

export async function signup(data: {
  email: string;
  password: string;
  name: string;
}) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const responseData = await response.json();
    throw new Error(responseData.error || 'Failed to sign up');
  }

  return response.json();
}

export async function updateProfile(data: {
  name?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
}) {
  const response = await fetch('/api/auth/profile', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const responseData = await response.json();
    throw new Error(responseData.error || 'Failed to update profile');
  }

  return response.json();
} 