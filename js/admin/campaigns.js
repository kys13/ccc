class CampaignManager {
    constructor() {
        this.currentPage = 1;
        this.itemsPerPage = 12;
        this.campaigns = [];
        this.filteredCampaigns = [];
        
        this.initializeElements();
        this.setupEventListeners();
        this.loadCampaigns();
    }

    initializeElements() {
        this.campaignList = document.getElementById('campaignList');
        this.pagination = document.getElementById('pagination');
        this.modal = document.getElementById('campaignModal');
        this.searchInput = document.getElementById('campaignSearch');
        this.statusFilter = document.getElementById('statusFilter');
        this.categoryFilter = document.getElementById('categoryFilter');
        this.sortFilter = document.getElementById('sortFilter');
    }

    setupEventListeners() {
        // 검색 및 필터링
        this.searchInput.addEventListener('input', () => this.filterCampaigns());
        this.statusFilter.addEventListener('change', () => this.filterCampaigns());
        this.categoryFilter.addEventListener('change', () => this.filterCampaigns());
        this.sortFilter.addEventListener('change', () => this.sortCampaigns());

        // 모달 닫기
        this.modal.querySelector('.close-modal').addEventListener('click', () => {
            this.modal.classList.remove('show');
        });

        // 모달 액션 버튼
        this.modal.querySelector('[data-action="edit"]').addEventListener('click', () => {
            const campaignId = this.modal.dataset.campaignId;
            window.location.href = `edit-campaign.html?id=${campaignId}`;
        });

        this.modal.querySelector('[data-action="delete"]').addEventListener('click', () => {
            const campaignId = this.modal.dataset.campaignId;
            this.deleteCampaign(campaignId);
        });
    }

    async loadCampaigns() {
        try {
            const response = await fetch('/api/admin/campaigns');
            this.campaigns = await response.json();
            this.filteredCampaigns = [...this.campaigns];
            this.renderCampaigns();
        } catch (error) {
            console.error('캠페인 로딩 실패:', error);
            this.showError('캠페인 목록을 불러오는데 실패했습니다.');
        }
    }

    filterCampaigns() {
        const searchTerm = this.searchInput.value.toLowerCase();
        const status = this.statusFilter.value;
        const category = this.categoryFilter.value;

        this.filteredCampaigns = this.campaigns.filter(campaign => {
            const matchesSearch = campaign.title.toLowerCase().includes(searchTerm);
            const matchesStatus = !status || campaign.status === status;
            const matchesCategory = !category || campaign.category === category;
            return matchesSearch && matchesStatus && matchesCategory;
        });

        this.currentPage = 1;
        this.renderCampaigns();
    }

    sortCampaigns() {
        const sortType = this.sortFilter.value;
        
        this.filteredCampaigns.sort((a, b) => {
            switch (sortType) {
                case 'latest':
                    return new Date(b.createdAt) - new Date(a.createdAt);
                case 'oldest':
                    return new Date(a.createdAt) - new Date(b.createdAt);
                case 'applicants':
                    return b.applicants - a.applicants;
                default:
                    return 0;
            }
        });

        this.renderCampaigns();
    }

    renderCampaigns() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const paginatedCampaigns = this.filteredCampaigns.slice(startIndex, endIndex);

        this.campaignList.innerHTML = paginatedCampaigns.map(campaign => this.createCampaignCard(campaign)).join('');
        this.renderPagination();
    }

    createCampaignCard(campaign) {
        return `
            <div class="campaign-card" data-id="${campaign.id}">
                <div class="campaign-image">
                    <img src="${campaign.image}" alt="${campaign.title}">
                    <span class="campaign-status status-${campaign.status}">${this.getStatusText(campaign.status)}</span>
                </div>
                <div class="campaign-content">
                    <h3 class="campaign-title">${campaign.title}</h3>
                    <div class="campaign-info">
                        <span><i class="fas fa-users"></i> ${campaign.applicants}/${campaign.recruitCount}명</span>
                        <span><i class="fas fa-calendar"></i> ${this.formatDate(campaign.endDate)}</span>
                    </div>
                    <div class="campaign-meta">
                        <div class="campaign-date">
                            등록일: ${this.formatDate(campaign.createdAt)}
                        </div>
                        <div class="campaign-actions">
                            <button class="btn btn-sm" onclick="campaignManager.showDetails('${campaign.id}')">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn btn-sm btn-danger" onclick="campaignManager.deleteCampaign('${campaign.id}')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderPagination() {
        const totalPages = Math.ceil(this.filteredCampaigns.length / this.itemsPerPage);
        let paginationHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            paginationHTML += `
                <button class="${i === this.currentPage ? 'active' : ''}" 
                        onclick="campaignManager.goToPage(${i})">
                    ${i}
                </button>
            `;
        }

        this.pagination.innerHTML = paginationHTML;
    }

    async showDetails(campaignId) {
        try {
            const response = await fetch(`/api/admin/campaigns/${campaignId}`);
            const campaign = await response.json();
            
            this.modal.dataset.campaignId = campaignId;
            this.modal.querySelector('.modal-body').innerHTML = this.createCampaignDetails(campaign);
            this.modal.classList.add('show');
        } catch (error) {
            console.error('캠페인 상세 정보 로딩 실패:', error);
            this.showError('캠페인 정보를 불러오는데 실패했습니다.');
        }
    }

    async deleteCampaign(campaignId) {
        if (!confirm('정말 이 캠페인을 삭제하시겠습니까?')) {
            return;
        }

        try {
            const response = await fetch(`/api/admin/campaigns/${campaignId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                this.campaigns = this.campaigns.filter(c => c.id !== campaignId);
                this.filterCampaigns();
                this.showSuccess('캠페인이 삭제되었습니다.');
            }
        } catch (error) {
            console.error('캠페인 삭제 실패:', error);
            this.showError('캠페인 삭제에 실패했습니다.');
        }
    }

    goToPage(pageNumber) {
        this.currentPage = pageNumber;
        this.renderCampaigns();
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    getStatusText(status) {
        const statusMap = {
            active: '진행중',
            pending: '대기중',
            completed: '완료'
        };
        return statusMap[status] || status;
    }

    showError(message) {
        // 토스트 메시지 표시
        const toast = new Toast({
            message: message,
            type: 'error',
            duration: 3000
        });
        toast.show();
    }

    showSuccess(message) {
        const toast = new Toast({
            message: message,
            type: 'success',
            duration: 3000
        });
        toast.show();
    }
}

// 전역 인스턴스 생성
const campaignManager = new CampaignManager(); 