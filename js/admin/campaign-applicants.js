class ApplicantManager {
    constructor() {
        // 관리자 권한 체크
        if (!window.auth.checkAdminAccess()) return;
        
        this.campaignId = new URLSearchParams(window.location.search).get('id');
        if (!this.campaignId) {
            alert('잘못된 접근입니다.');
            window.location.href = 'campaigns.html';
            return;
        }

        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.applicants = [];
        this.filteredApplicants = [];
        this.selectedApplicants = new Set();

        this.initializeElements();
        this.setupEventListeners();
        this.loadCampaignData();
        this.loadApplicants();
    }

    initializeElements() {
        // 캠페인 정보 요소
        this.elements = {
            title: document.getElementById('campaignTitle'),
            period: document.getElementById('campaignPeriod'),
            status: document.getElementById('campaignStatus'),
            recruitCount: document.getElementById('recruitCount'),
            pendingCount: document.getElementById('pendingCount'),
            approvedCount: document.getElementById('approvedCount'),
            
            // 필터 및 검색
            statusFilter: document.getElementById('statusFilter'),
            searchInput: document.getElementById('searchApplicant'),
            
            // 일괄 처리 버튼
            selectAll: document.getElementById('selectAll'),
            bulkApprove: document.getElementById('bulkApprove'),
            bulkReject: document.getElementById('bulkReject'),
            
            // 목록 및 페이지네이션
            applicantList: document.getElementById('applicantList'),
            pagination: document.getElementById('pagination'),
            
            // 모달
            modal: document.getElementById('applicantModal'),
            modalClose: document.querySelector('.close-modal'),
            
            // 엑셀 다운로드
            exportButton: document.getElementById('exportApplicants')
        };
    }

    setupEventListeners() {
        // 필터링 및 검색
        this.elements.statusFilter.addEventListener('change', () => this.filterApplicants());
        this.elements.searchInput.addEventListener('input', () => this.filterApplicants());

        // 체크박스 전체 선택/해제
        this.elements.selectAll.addEventListener('change', (e) => {
            const checkboxes = document.querySelectorAll('.applicant-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.checked = e.target.checked;
                this.toggleSelection(checkbox.value, e.target.checked);
            });
            this.updateBulkActionButtons();
        });

        // 일괄 처리 버튼
        this.elements.bulkApprove.addEventListener('click', () => this.bulkUpdateStatus('approved'));
        this.elements.bulkReject.addEventListener('click', () => this.bulkUpdateStatus('rejected'));

        // 모달 닫기
        this.elements.modalClose.addEventListener('click', () => {
            this.elements.modal.classList.remove('show');
        });

        // 엑셀 다운로드
        this.elements.exportButton.addEventListener('click', () => this.exportToExcel());
    }

    async loadCampaignData() {
        try {
            const campaign = await CampaignAPI.getCampaignDetail(this.campaignId);
            this.updateCampaignInfo(campaign);
        } catch (error) {
            console.error('캠페인 정보 로드 실패:', error);
            this.showError('캠페인 정보를 불러오는데 실패했습니다.');
        }
    }

    async loadApplicants() {
        try {
            const params = {
                page: this.currentPage,
                limit: this.itemsPerPage,
                status: this.elements.statusFilter.value,
                search: this.elements.searchInput.value
            };

            const data = await CampaignAPI.getApplicants(this.campaignId, params);
            this.renderApplicants(data.applicants);
            this.updatePagination(data.total);
            this.updateApplicantStats(data.stats);
        } catch (error) {
            console.error('신청자 목록 로드 실패:', error);
            this.showError('신청자 목록을 불러오는데 실패했습니다.');
        }
    }

    updateCampaignInfo(campaign) {
        this.elements.title.textContent = campaign.title;
        this.elements.period.textContent = `${this.formatDate(campaign.startDate)} ~ ${this.formatDate(campaign.endDate)}`;
        this.elements.status.textContent = this.getStatusText(campaign.status);
        this.elements.status.className = `status-badge status-${campaign.status}`;
        this.elements.recruitCount.textContent = `${campaign.approvedCount}/${campaign.recruitCount}`;
    }

    filterApplicants() {
        const searchTerm = this.elements.searchInput.value.toLowerCase();
        const status = this.elements.statusFilter.value;

        this.filteredApplicants = this.applicants.filter(applicant => {
            const matchesSearch = applicant.name.toLowerCase().includes(searchTerm) ||
                                applicant.email.toLowerCase().includes(searchTerm);
            const matchesStatus = !status || applicant.status === status;
            return matchesSearch && matchesStatus;
        });

        this.currentPage = 1;
        this.renderApplicants();
    }

    renderApplicants(applicants) {
        this.applicants = applicants;
        this.filteredApplicants = [...this.applicants];
        this.currentPage = 1;
        this.renderApplicants();
    }

    async showDetails(applicantId) {
        try {
            const response = await fetch(`/api/admin/applicants/${applicantId}`);
            const applicant = await response.json();
            
            this.elements.modal.querySelector('.modal-body').innerHTML = this.createApplicantDetails(applicant);
            this.elements.modal.classList.add('show');
        } catch (error) {
            console.error('신청자 상세 정보 로딩 실패:', error);
            this.showError('신청자 정보를 불러오는데 실패했습니다.');
        }
    }

    async updateStatus(applicantId, status) {
        try {
            const result = await CampaignAPI.updateApplicantStatus(applicantId, status);
            if (result.success) {
                await this.loadApplicants();
                this.showSuccess('상태가 업데이트되었습니다.');
            } else {
                this.showError(result.message || '상태 업데이트에 실패했습니다.');
            }
        } catch (error) {
            console.error('상태 업데이트 실패:', error);
            this.showError('상태 업데이트에 실패했습니다.');
        }
    }

    async bulkUpdateStatus(status) {
        if (this.selectedApplicants.size === 0) {
            this.showError('선택된 신청자가 없습니다.');
            return;
        }

        if (!confirm(`선택한 ${this.selectedApplicants.size}명의 신청자를 ${this.getStatusText(status)}처리 하시겠습니까?`)) {
            return;
        }

        try {
            const result = await CampaignAPI.bulkUpdateApplicantStatus(
                Array.from(this.selectedApplicants),
                status
            );

            if (result.success) {
                this.showSuccess('일괄 처리가 완료되었습니다.');
                this.selectedApplicants.clear();
                await this.loadApplicants();
            } else {
                this.showError(result.message || '일괄 처리에 실패했습니다.');
            }
        } catch (error) {
            console.error('일괄 처리 실패:', error);
            this.showError('일괄 처리에 실패했습니다.');
        }
    }

    async exportToExcel() {
        try {
            const blob = await CampaignAPI.exportApplicants(this.campaignId);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `applicants_${this.campaignId}_${new Date().toISOString().split('T')[0]}.xlsx`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('엑셀 다운로드 실패:', error);
            this.showError('엑셀 파일 생성에 실패했습니다.');
        }
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
            pending: '승인 대기',
            approved: '승인',
            rejected: '거절'
        };
        return statusMap[status] || status;
    }

    renderSocialLinks(social) {
        return Object.entries(social).map(([platform, url]) => `
            <a href="${url}" target="_blank" class="sns-link">
                <i class="fab fa-${platform.toLowerCase()}"></i>
            </a>
        `).join('');
    }

    showError(message) {
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
const applicantManager = new ApplicantManager(); 