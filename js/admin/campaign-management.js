class CampaignManagement {
    constructor() {
        if (!window.auth.checkAdminAccess()) return;
        
        this.initializeElements();
        this.loadCampaigns();
        this.initializeEventListeners();
    }

    initializeElements() {
        this.elements = {
            campaignList: document.getElementById('campaignList'),
            addCampaignBtn: document.getElementById('addCampaignBtn'),
            campaignModal: document.getElementById('campaignModal'),
            campaignForm: document.getElementById('campaignForm'),
            searchInput: document.getElementById('searchCampaign'),
            statusFilter: document.getElementById('statusFilter')
        };
    }

    initializeEventListeners() {
        // 캠페인 추가 버튼
        this.elements.addCampaignBtn.addEventListener('click', () => this.showCampaignModal());

        // 캠페인 폼 제출
        this.elements.campaignForm.addEventListener('submit', (e) => this.handleCampaignSubmit(e));

        // 검색 이벤트
        this.elements.searchInput.addEventListener('input', debounce(() => this.loadCampaigns(), 300));

        // 상태 필터 변경
        this.elements.statusFilter.addEventListener('change', () => this.loadCampaigns());
    }

    async loadCampaigns() {
        try {
            const searchTerm = this.elements.searchInput.value;
            const status = this.elements.statusFilter.value;

            const response = await fetch(`/api/admin/campaigns?search=${searchTerm}&status=${status}`, {
                headers: window.auth.getAuthHeader()
            });

            const data = await response.json();
            this.renderCampaigns(data.campaigns);
        } catch (error) {
            console.error('캠페인 로드 실패:', error);
            alert('캠페인 목록을 불러오는데 실패했습니다.');
        }
    }

    renderCampaigns(campaigns) {
        this.elements.campaignList.innerHTML = campaigns.map(campaign => `
            <div class="campaign-item" data-id="${campaign.id}">
                <div class="campaign-info">
                    <img src="${campaign.thumbnail}" alt="${campaign.title}" class="campaign-thumb">
                    <div class="campaign-details">
                        <h3>${campaign.title}</h3>
                        <p class="campaign-meta">
                            <span class="category">${campaign.category}</span>
                            <span class="status ${campaign.status}">${campaign.status}</span>
                        </p>
                        <p class="applicants">신청자 ${campaign.currentApplicants}/${campaign.maxApplicants}명</p>
                    </div>
                </div>
                <div class="campaign-actions">
                    <button class="edit-btn" onclick="campaignManagement.editCampaign('${campaign.id}')">
                        <i class="fas fa-edit"></i> 수정
                    </button>
                    <button class="view-applicants-btn" onclick="campaignManagement.viewApplicants('${campaign.id}')">
                        <i class="fas fa-users"></i> 신청자
                    </button>
                    <button class="delete-btn" onclick="campaignManagement.deleteCampaign('${campaign.id}')">
                        <i class="fas fa-trash"></i> 삭제
                    </button>
                </div>
            </div>
        `).join('');
    }

    async handleCampaignSubmit(e) {
        e.preventDefault();
        const formData = new FormData(this.elements.campaignForm);
        
        try {
            const response = await fetch('/api/admin/campaigns', {
                method: formData.get('id') ? 'PUT' : 'POST',
                headers: {
                    ...window.auth.getAuthHeader(),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Object.fromEntries(formData))
            });

            const data = await response.json();
            if (data.success) {
                this.closeCampaignModal();
                this.loadCampaigns();
                alert('캠페인이 저장되었습니다.');
            } else {
                alert(data.message || '캠페인 저장에 실패했습니다.');
            }
        } catch (error) {
            console.error('캠페인 저장 실패:', error);
            alert('캠페인 저장 중 오류가 발생했습니다.');
        }
    }

    async editCampaign(id) {
        try {
            const response = await fetch(`/api/admin/campaigns/${id}`, {
                headers: window.auth.getAuthHeader()
            });
            const campaign = await response.json();
            
            this.showCampaignModal(campaign);
        } catch (error) {
            console.error('캠페인 정보 로드 실패:', error);
            alert('캠페인 정보를 불러오는데 실패했습니다.');
        }
    }

    async deleteCampaign(id) {
        if (!confirm('정말 이 캠페인을 삭제하시겠습니까?')) return;

        try {
            const response = await fetch(`/api/admin/campaigns/${id}`, {
                method: 'DELETE',
                headers: window.auth.getAuthHeader()
            });

            const data = await response.json();
            if (data.success) {
                this.loadCampaigns();
                alert('캠페인이 삭제되었습니다.');
            } else {
                alert(data.message || '캠페인 삭제에 실패했습니다.');
            }
        } catch (error) {
            console.error('캠페인 삭제 실패:', error);
            alert('캠페인 삭제 중 오류가 발생했습니다.');
        }
    }

    viewApplicants(id) {
        window.location.href = `/pages/admin/campaign-applicants.html?id=${id}`;
    }

    showCampaignModal(campaign = null) {
        // 모달 폼 초기화 및 표시
        if (campaign) {
            Object.keys(campaign).forEach(key => {
                const input = this.elements.campaignForm.querySelector(`[name="${key}"]`);
                if (input) input.value = campaign[key];
            });
        } else {
            this.elements.campaignForm.reset();
        }
        this.elements.campaignModal.style.display = 'block';
    }

    closeCampaignModal() {
        this.elements.campaignModal.style.display = 'none';
    }
}

// 디바운스 유틸리티 함수
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    window.campaignManagement = new CampaignManagement();
}); 