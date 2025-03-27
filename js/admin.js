class AdminDashboard {
    constructor() {
        // 관리자 권한 체크
        if (!window.auth.checkAdminAccess()) return;
        
        this.initializeElements();
        this.initializeEventListeners();
        this.loadDashboardData();
        this.loadCampaigns();
    }

    initializeElements() {
        this.elements = {
            statsCards: document.querySelectorAll('.stat-card'),
            campaignTable: document.querySelector('.campaign-table tbody'),
            searchInput: document.getElementById('searchCampaign'),
            statusFilter: document.getElementById('statusFilter'),
            userChart: document.getElementById('userChart'),
            campaignChart: document.getElementById('campaignChart')
        };

        this.initializeCharts();
    }

    initializeEventListeners() {
        // 검색 이벤트
        this.elements.searchInput.addEventListener('input', 
            debounce(() => this.loadCampaigns(), 300)
        );

        // 상태 필터 변경
        this.elements.statusFilter.addEventListener('change', 
            () => this.loadCampaigns()
        );
    }

    async loadDashboardData() {
        try {
            const data = await CampaignAPI.adminGetDashboardStats();
            this.updateDashboard(data);
        } catch (error) {
            console.error('대시보드 데이터 로드 실패:', error);
            this.showError('데이터를 불러오는데 실패했습니다.');
        }
    }

    async loadCampaigns() {
        try {
            const params = {
                search: this.elements.searchInput.value,
                status: this.elements.statusFilter.value
            };
            
            const data = await CampaignAPI.adminGetCampaigns(params);
            this.renderCampaigns(data.campaigns);
        } catch (error) {
            console.error('캠페인 로드 실패:', error);
            this.showError('캠페인 목록을 불러오는데 실패했습니다.');
        }
    }

    renderCampaigns(campaigns) {
        this.elements.campaignTable.innerHTML = campaigns.map(campaign => `
            <tr>
                <td>${campaign.title}</td>
                <td>${campaign.category}</td>
                <td>${campaign.currentApplicants}/${campaign.maxApplicants}</td>
                <td>${this.formatDate(campaign.deadline)}</td>
                <td>
                    <span class="status-badge status-${campaign.status}">
                        ${this.getStatusText(campaign.status)}
                    </span>
                </td>
                <td>
                    <button onclick="adminDashboard.editCampaign('${campaign.id}')" class="btn-icon">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="adminDashboard.viewApplicants('${campaign.id}')" class="btn-icon">
                        <i class="fas fa-users"></i>
                    </button>
                    <button onclick="adminDashboard.deleteCampaign('${campaign.id}')" class="btn-icon text-danger">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    async editCampaign(id) {
        window.location.href = `/pages/admin/campaign-edit.html?id=${id}`;
    }

    async deleteCampaign(id) {
        if (!confirm('정말 이 캠페인을 삭제하시겠습니까?')) return;

        try {
            const result = await CampaignAPI.deleteCampaign(id);
            if (result.success) {
                this.showSuccess('캠페인이 삭제되었습니다.');
                this.loadCampaigns();
            } else {
                this.showError(result.message || '캠페인 삭제에 실패했습니다.');
            }
        } catch (error) {
            console.error('캠페인 삭제 실패:', error);
            this.showError('캠페인 삭제 중 오류가 발생했습니다.');
        }
    }

    viewApplicants(id) {
        window.location.href = `/pages/admin/campaign-applicants.html?id=${id}`;
    }

    // 유틸리티 메서드들
    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    getStatusText(status) {
        const statusMap = {
            draft: '임시저장',
            active: '진행중',
            completed: '완료',
            cancelled: '취소'
        };
        return statusMap[status] || status;
    }

    showSuccess(message) {
        // 토스트 메시지 표시
        const toast = new Toast({
            message,
            type: 'success',
            duration: 3000
        });
        toast.show();
    }

    showError(message) {
        // 토스트 메시지 표시
        const toast = new Toast({
            message,
            type: 'error',
            duration: 3000
        });
        toast.show();
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

// 전역 인스턴스 생성
const adminDashboard = new AdminDashboard(); 