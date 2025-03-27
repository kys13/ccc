class CampaignManager {
    constructor() {
        this.campaigns = [];
        this.currentFilter = 'all';
    }

    async fetchCampaigns() {
        try {
            const response = await fetch('/api/campaigns');
            const data = await response.json();
            this.campaigns = data;
            this.renderCampaigns();
        } catch (error) {
            console.error('캠페인 데이터를 불러오는데 실패했습니다:', error);
        }
    }

    renderCampaigns() {
        const container = document.getElementById('popularCampaigns');
        const filteredCampaigns = this.filterCampaigns();
        
        container.innerHTML = filteredCampaigns.map(campaign => `
            <div class="campaign-card">
                <img src="${campaign.image}" alt="${campaign.title}" class="campaign-image">
                <div class="campaign-info">
                    <span class="campaign-type">${campaign.type}</span>
                    <h3>${campaign.title}</h3>
                    <p>${campaign.description}</p>
                    <div class="campaign-stats">
                        <span>D-${campaign.daysLeft}</span>
                        <span>${campaign.participants}/${campaign.maxParticipants}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    filterCampaigns() {
        if (this.currentFilter === 'all') return this.campaigns;
        return this.campaigns.filter(campaign => campaign.type === this.currentFilter);
    }
}

// 초기화
const campaignManager = new CampaignManager();
document.addEventListener('DOMContentLoaded', () => {
    campaignManager.fetchCampaigns();
}); 