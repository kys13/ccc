class CampaignForm {
    constructor() {
        this.initializeForm();
        this.setupImageUpload();
        this.setupEditor();
        this.setupEventListeners();
    }

    initializeForm() {
        // 날짜 입력 최소값 설정
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('startDate').min = today;
        document.getElementById('endDate').min = today;
    }

    setupImageUpload() {
        // FilePond 초기화
        FilePond.create(document.querySelector('input[type="file"]'), {
            labelIdle: '이미지를 드래그하거나 클릭하여 업로드하세요',
            imagePreviewHeight: 200,
            imageCropAspectRatio: '16:9',
            imageResizeTargetWidth: 800,
            imageResizeTargetHeight: 450,
            stylePanelAspectRatio: 0.5625
        });
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

    setupEventListeners() {
        document.getElementById('saveCampaign').addEventListener('click', () => this.saveCampaign());
        
        // 날짜 유효성 검사
        document.getElementById('endDate').addEventListener('change', (e) => {
            const startDate = document.getElementById('startDate').value;
            if (startDate && e.target.value < startDate) {
                alert('종료일은 시작일 이후여야 합니다.');
                e.target.value = startDate;
            }
        });
    }

    async saveCampaign() {
        try {
            if (!this.validateForm()) {
                return;
            }

            const formData = this.collectFormData();
            const response = await this.submitCampaign(formData);

            if (response.success) {
                alert('캠페인이 성공적으로 등록되었습니다.');
                window.location.href = 'campaigns.html';
            }
        } catch (error) {
            console.error('캠페인 등록 실패:', error);
            alert('캠페인 등록 중 오류가 발생했습니다.');
        }
    }

    validateForm() {
        const requiredFields = [
            'campaignTitle',
            'campaignCategory',
            'startDate',
            'endDate',
            'recruitCount',
            'reward'
        ];

        for (const field of requiredFields) {
            const element = document.getElementById(field);
            if (!element.value.trim()) {
                alert(`${element.previousElementSibling.textContent}을(를) 입력해주세요.`);
                element.focus();
                return false;
            }
        }

        if (!this.editor.getText().trim()) {
            alert('캠페인 상세 내용을 입력해주세요.');
            return false;
        }

        return true;
    }

    collectFormData() {
        return {
            title: document.getElementById('campaignTitle').value,
            category: document.getElementById('campaignCategory').value,
            startDate: document.getElementById('startDate').value,
            endDate: document.getElementById('endDate').value,
            recruitCount: document.getElementById('recruitCount').value,
            reward: document.getElementById('reward').value,
            requirements: document.getElementById('requirements').value,
            content: this.editor.root.innerHTML,
            featured: document.getElementById('featuredCampaign').checked,
            urgent: document.getElementById('urgentCampaign').checked,
            status: 'active',
            createdAt: new Date().toISOString()
        };
    }

    async submitCampaign(formData) {
        // API 엔드포인트로 데이터 전송
        const response = await fetch('/api/admin/campaigns', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        return await response.json();
    }
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    new CampaignForm();
}); 