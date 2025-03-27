// 캠페인 관련 API 엔드포인트
const CAMPAIGN_API = {
    // 일반 사용자용 API
    list: '/api/campaigns',
    detail: (id) => `/api/campaigns/${id}`,
    apply: (id) => `/api/campaigns/${id}/apply`,
    bookmark: (id) => `/api/campaigns/${id}/bookmark`,
    
    // 관리자용 API
    admin: {
        list: '/api/admin/campaigns',
        create: '/api/admin/campaigns',
        update: (id) => `/api/admin/campaigns/${id}`,
        delete: (id) => `/api/admin/campaigns/${id}`,
        applicants: (id) => `/api/admin/campaigns/${id}/applicants`,
        updateStatus: (id) => `/api/admin/campaigns/${id}/status`,
        export: (id) => `/api/admin/campaigns/${id}/export`
    }
};

class CampaignAPI {
    // 일반 사용자용 메서드
    static async getCampaigns(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const response = await fetch(`${CAMPAIGN_API.list}?${queryString}`, {
            headers: window.auth.getAuthHeader()
        });
        return await response.json();
    }

    static async getCampaignDetail(id) {
        const response = await fetch(CAMPAIGN_API.detail(id), {
            headers: window.auth.getAuthHeader()
        });
        return await response.json();
    }

    static async applyCampaign(id, data) {
        const response = await fetch(CAMPAIGN_API.apply(id), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...window.auth.getAuthHeader()
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    static async toggleBookmark(id) {
        const response = await fetch(CAMPAIGN_API.bookmark(id), {
            method: 'POST',
            headers: window.auth.getAuthHeader()
        });
        return await response.json();
    }

    // 관리자용 메서드
    static async adminGetCampaigns(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const response = await fetch(`${CAMPAIGN_API.admin.list}?${queryString}`, {
            headers: window.auth.getAuthHeader()
        });
        return await response.json();
    }

    static async createCampaign(data) {
        const response = await fetch(CAMPAIGN_API.admin.create, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...window.auth.getAuthHeader()
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    static async updateCampaign(id, data) {
        const response = await fetch(CAMPAIGN_API.admin.update(id), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...window.auth.getAuthHeader()
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    static async deleteCampaign(id) {
        const response = await fetch(CAMPAIGN_API.admin.delete(id), {
            method: 'DELETE',
            headers: window.auth.getAuthHeader()
        });
        return await response.json();
    }

    static async getApplicants(id, params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const response = await fetch(`${CAMPAIGN_API.admin.applicants(id)}?${queryString}`, {
            headers: window.auth.getAuthHeader()
        });
        return await response.json();
    }

    static async updateCampaignStatus(id, status) {
        const response = await fetch(CAMPAIGN_API.admin.updateStatus(id), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...window.auth.getAuthHeader()
            },
            body: JSON.stringify({ status })
        });
        return await response.json();
    }

    static async exportApplicants(id) {
        const response = await fetch(CAMPAIGN_API.admin.export(id), {
            headers: window.auth.getAuthHeader()
        });
        return await response.blob();
    }
} 