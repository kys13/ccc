class CampaignEditor {
    constructor() {
        this.campaignId = new URLSearchParams(window.location.search).get('id');
        if (!this.campaignId) {
            alert('잘못된 접근입니다.');
            window.location.href = 'campaigns.html';
            return;
        }

        this.initializeElements();
        this.setupEditor();
        this.setupImageUpload();
        this.setupEventListeners();
        this.loadCampaignData();
    }

    initializeElements() {
        // 폼 요소들
        this.elements = {
            title: document.getElementById('campaignTitle'),
            status: document.getElementById('campaignStatus'),
            category: document.getElementById('campaignCategory'),
            startDate: document.getElementById('startDate'),
            endDate: document.getElementById('endDate'),
            recruitCount: document.getElementById('recruitCount'),
            reward: document.getElementById('reward'),
            updateButton: document.getElementById('updateCampaign'),
            viewApplicantsButton: document.getElementById('viewApplicants'),
            currentImage: document.getElementById('currentImage')
        };

        // 신청자 통계 요소들
        this.statistics = {
            total: document.getElementById('totalApplicants'),
            pending: document.getElementById('pendingApplicants'),
            approved: document.getElementById('approvedApplicants')
        };
    }

    setupEditor() {
        // Quill 에디터 초기화
        this.editor = new Quill('#editor', {
            theme: 'snow',
            modules: {
                toolbar: [
                    [{ 'header': [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['link', 'image'],
                    ['clean']
                ]
            }
        });
    }

    setupImageUpload() {
        // FilePond 초기화
        this.pond = FilePond.create(document.querySelector('input[type="file"]'), {
            labelIdle: '이미지를 드래그하거나 클릭하여 업로드하세요',
            imagePreviewHeight: 200,
            imageCropAspectRatio: '16:9',
            imageResizeTargetWidth: 800,
            imageResizeTargetHeight: 450,
            stylePanelAspectRatio: 0.5625
        });
    }

    setupEventListeners() {
        // 폼 제출
        this.elements.updateButton.addEventListener('click', () => this.updateCampaign());

        // 신청자 관리 페이지로 이동
        this.elements.viewApplicantsButton.addEventListener('click', () => {
            window.location.href = `campaign-applicants.html?id=${this.campaignId}`;
        });

        // 날짜 유효성 검사
        this.elements.endDate.addEventListener('change', (e) => {
            const startDate = this.elements.startDate.value;
            if (startDate && e.target.value < startDate) {
                alert('종료일은 시작일 이후여야 합니다.');
                e.target.value = startDate;
            }
        });
    }

    async loadCampaignData() {
        try {
            const response = await fetch(`/api/admin/campaigns/${this.campaignId}`);
            const campaign = await response.json();
            
            this.populateForm(campaign);
            this.updateApplicantStats(campaign.applicants);
        } catch (error) {
            console.error('캠페인 데이터 로딩 실패:', error);
            this.showError('캠페인 정보를 불러오는데 실패했습니다.');
        }
    }

    populateForm(campaign) {
        // 기본 정보 설정
        this.elements.title.value = campaign.title;
        this.elements.status.value = campaign.status;
        this.elements.category.value = campaign.category;
        this.elements.startDate.value = campaign.startDate;
        this.elements.endDate.value = campaign.endDate;
        this.elements.recruitCount.value = campaign.recruitCount;
        this.elements.reward.value = campaign.reward;

        // 에디터 내용 설정
        this.editor.root.innerHTML = campaign.content;

        // 현재 이미지 표시
        if (campaign.image) {
            this.elements.currentImage.innerHTML = `
                <img src="${campaign.image}" alt="현재 이미지">
            `;
        }
    }

    updateApplicantStats(applicants) {
        this.statistics.total.textContent = applicants.total;
        this.statistics.pending.textContent = applicants.pending;
        this.statistics.approved.textContent = applicants.approved;
    }

    async updateCampaign() {
        if (!this.validateForm()) {
            return;
        }

        try {
            this.elements.updateButton.classList.add('loading');
            const formData = this.collectFormData();
            
            const response = await fetch(`/api/admin/campaigns/${this.campaignId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                this.showSuccess('캠페인이 성공적으로 수정되었습니다.');
                setTimeout(() => {
                    window.location.href = 'campaigns.html';
                }, 1500);
            } else {
                throw new Error('서버 응답 오류');
            }
        } catch (error) {
            console.error('캠페인 수정 실패:', error);
            this.showError('캠페인 수정 중 오류가 발생했습니다.');
        } finally {
            this.elements.updateButton.classList.remove('loading');
        }
    }

    validateForm() {
        const requiredFields = [
            'title', 'status', 'category', 'startDate', 
            'endDate', 'recruitCount', 'reward'
        ];

        for (const field of requiredFields) {
            const element = this.elements[field];
            if (!element.value.trim()) {
                this.showError(`${element.previousElementSibling.textContent}을(를) 입력해주세요.`);
                element.focus();
                return false;
            }
        }

        if (!this.editor.getText().trim()) {
            this.showError('캠페인 상세 내용을 입력해주세요.');
            return false;
        }

        return true;
    }

    collectFormData() {
        return {
            title: this.elements.title.value,
            status: this.elements.status.value,
            category: this.elements.category.value,
            startDate: this.elements.startDate.value,
            endDate: this.elements.endDate.value,
            recruitCount: this.elements.recruitCount.value,
            reward: this.elements.reward.value,
            content: this.editor.root.innerHTML
        };
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

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    new CampaignEditor();
}); 