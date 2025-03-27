class CampaignDetail {
    constructor() {
        this.campaignId = new URLSearchParams(window.location.search).get('id');
        if (!this.campaignId) {
            window.location.href = '/';
            return;
        }

        this.initializeElements();
        this.loadCampaignData();
        this.initializeEventListeners();
    }

    initializeElements() {
        this.elements = {
            mainImage: document.getElementById('mainImage'),
            thumbnailList: document.getElementById('thumbnailList'),
            category: document.getElementById('category'),
            title: document.getElementById('title'),
            maxApplicants: document.getElementById('maxApplicants'),
            currentApplicants: document.getElementById('currentApplicants'),
            deadline: document.getElementById('deadline'),
            location: document.getElementById('location').querySelector('span'),
            tags: document.getElementById('tags'),
            description: document.getElementById('description'),
            applyButton: document.getElementById('applyButton'),
            bookmarkBtn: document.querySelector('.bookmark-btn')
        };
    }

    async loadCampaignData() {
        try {
            const data = await CampaignAPI.getCampaignDetail(this.campaignId);
            this.updateUI(data);
        } catch (error) {
            console.error('캠페인 정보 로드 실패:', error);
            alert('캠페인 정보를 불러오는데 실패했습니다.');
        }
    }

    updateUI(data) {
        // 메인 이미지 업데이트
        this.elements.mainImage.src = data.mainImage;
        
        // 썸네일 이미지 업데이트
        this.updateThumbnails(data.images);
        
        // 기본 정보 업데이트
        this.elements.category.textContent = data.category;
        this.elements.title.textContent = data.title;
        this.elements.maxApplicants.textContent = data.maxApplicants;
        this.elements.currentApplicants.textContent = data.currentApplicants;
        this.elements.deadline.textContent = this.calculateDday(data.deadline);
        this.elements.location.textContent = data.location;
        
        // 북마크 상태 업데이트
        const bookmarkIcon = this.elements.bookmarkBtn.querySelector('i');
        bookmarkIcon.className = data.isBookmarked ? 'fas fa-bookmark' : 'far fa-bookmark';
        
        // 태그 업데이트
        this.updateTags(data.tags);
        
        // 상세 설명 업데이트
        this.elements.description.innerHTML = data.description;
        
        // 지도 초기화
        if (data.coordinates) {
            this.initializeMap(data.coordinates);
        }
    }

    updateThumbnails(images) {
        this.elements.thumbnailList.innerHTML = images.map(image => `
            <button class="thumb">
                <img src="${image}" alt="캠페인 이미지">
            </button>
        `).join('');
    }

    updateTags(tags) {
        this.elements.tags.innerHTML = tags.map(tag => `
            <span>#${tag}</span>
        `).join('');
    }

    calculateDday(deadline) {
        const today = new Date();
        const dday = new Date(deadline);
        const diff = Math.ceil((dday - today) / (1000 * 60 * 60 * 24));
        return diff > 0 ? `D-${diff}` : '마감';
    }

    initializeEventListeners() {
        // 썸네일 클릭 이벤트
        this.elements.thumbnailList.addEventListener('click', (e) => {
            const thumb = e.target.closest('.thumb');
            if (!thumb) return;

            const thumbs = this.elements.thumbnailList.querySelectorAll('.thumb');
            thumbs.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');

            this.elements.mainImage.src = thumb.querySelector('img').src;
        });

        // 북마크 버튼 이벤트
        this.elements.bookmarkBtn.addEventListener('click', () => this.handleBookmark());

        // 신청하기 버튼 이벤트
        this.elements.applyButton.addEventListener('click', () => this.handleApply());

        // 탭 전환 이벤트
        document.querySelectorAll('.nav-item').forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
        });
    }

    switchTab(tabId) {
        // 탭 활성화 상태 변경
        document.querySelectorAll('.nav-item').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabId);
        });

        // 컨텐츠 섹션 표시/숨김
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.toggle('active', section.id === tabId);
        });
    }

    async handleBookmark() {
        if (!window.auth.isLoggedIn()) {
            this.showLoginModal();
            return;
        }

        try {
            const result = await CampaignAPI.toggleBookmark(this.campaignId);
            const icon = this.elements.bookmarkBtn.querySelector('i');
            icon.className = result.isBookmarked ? 'fas fa-bookmark' : 'far fa-bookmark';
            this.showToast(result.message);
        } catch (error) {
            console.error('북마크 처리 실패:', error);
            this.showToast('북마크 처리에 실패했습니다.');
        }
    }

    async handleApply() {
        if (!window.auth.isLoggedIn()) {
            this.showLoginModal();
            return;
        }

        try {
            const result = await CampaignAPI.applyCampaign(this.campaignId);
            if (result.success) {
                alert('캠페인 신청이 완료되었습니다.');
                window.location.reload();
            } else {
                alert(result.message || '신청에 실패했습니다.');
            }
        } catch (error) {
            console.error('캠페인 신청 실패:', error);
            alert('신청 중 오류가 발생했습니다.');
        }
    }

    checkLoginStatus() {
        return window.auth.isLoggedIn();
    }

    showLoginModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>로그인이 필요합니다</h3>
                <p>캠페인 신청을 위해 로그인해주세요.</p>
                <div class="modal-buttons">
                    <button onclick="location.href='/login.html'">로그인</button>
                    <button onclick="this.closest('.modal').remove()">취소</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    new CampaignDetail();
}); 