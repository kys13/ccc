class ReviewManager {
    constructor() {
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.reviews = [];
        this.filteredReviews = [];

        this.initializeElements();
        this.setupEventListeners();
        this.loadReviews();
    }

    initializeElements() {
        this.elements = {
            // 필터 요소
            searchInput: document.getElementById('reviewSearch'),
            statusFilter: document.getElementById('statusFilter'),
            ratingFilter: document.getElementById('ratingFilter'),
            sortFilter: document.getElementById('sortFilter'),

            // 통계 요소
            totalReviews: document.getElementById('totalReviews'),
            pendingReviews: document.getElementById('pendingReviews'),
            avgRating: document.getElementById('avgRating'),

            // 리스트 및 페이지네이션
            reviewList: document.getElementById('reviewList'),
            pagination: document.getElementById('pagination'),

            // 모달
            modal: document.getElementById('reviewModal'),
            modalClose: document.querySelector('.close-modal'),

            // 내보내기 버튼
            exportButton: document.getElementById('exportReviews')
        };
    }

    setupEventListeners() {
        // 필터링 및 검색
        this.elements.searchInput.addEventListener('input', () => this.filterReviews());
        this.elements.statusFilter.addEventListener('change', () => this.filterReviews());
        this.elements.ratingFilter.addEventListener('change', () => this.filterReviews());
        this.elements.sortFilter.addEventListener('change', () => this.sortReviews());

        // 모달 닫기
        this.elements.modalClose.addEventListener('click', () => {
            this.elements.modal.classList.remove('show');
        });

        // 모달 액션 버튼들
        this.elements.modal.querySelectorAll('[data-action]').forEach(button => {
            button.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                const reviewId = this.elements.modal.dataset.reviewId;
                
                switch(action) {
                    case 'approve':
                        this.updateReviewStatus(reviewId, 'approved');
                        break;
                    case 'reject':
                        this.updateReviewStatus(reviewId, 'rejected');
                        break;
                    case 'feedback':
                        this.showFeedbackForm(reviewId);
                        break;
                }
            });
        });

        // 내보내기
        this.elements.exportButton.addEventListener('click', () => this.exportReviews());
    }

    async loadReviews() {
        try {
            const response = await fetch('/api/admin/reviews');
            this.reviews = await response.json();
            this.filteredReviews = [...this.reviews];
            
            this.renderReviews();
            this.updateStats();
        } catch (error) {
            console.error('리뷰 목록 로딩 실패:', error);
            this.showError('리뷰 목록을 불러오는데 실패했습니다.');
        }
    }

    filterReviews() {
        const searchTerm = this.elements.searchInput.value.toLowerCase();
        const status = this.elements.statusFilter.value;
        const rating = this.elements.ratingFilter.value;

        this.filteredReviews = this.reviews.filter(review => {
            const matchesSearch = review.content.toLowerCase().includes(searchTerm) ||
                                review.author.name.toLowerCase().includes(searchTerm);
            const matchesStatus = !status || review.status === status;
            const matchesRating = !rating || review.rating === parseInt(rating);
            
            return matchesSearch && matchesStatus && matchesRating;
        });

        this.currentPage = 1;
        this.renderReviews();
    }

    sortReviews() {
        const sortType = this.elements.sortFilter.value;
        
        this.filteredReviews.sort((a, b) => {
            switch(sortType) {
                case 'latest':
                    return new Date(b.createdAt) - new Date(a.createdAt);
                case 'oldest':
                    return new Date(a.createdAt) - new Date(b.createdAt);
                case 'rating':
                    return b.rating - a.rating;
                default:
                    return 0;
            }
        });

        this.renderReviews();
    }

    renderReviews() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const paginatedReviews = this.filteredReviews.slice(startIndex, endIndex);

        this.elements.reviewList.innerHTML = paginatedReviews.map(review => `
            <div class="review-card">
                <div class="review-header">
                    <div class="reviewer-info">
                        <img src="${review.author.avatar}" alt="프로필" class="reviewer-avatar">
                        <div>
                            <div class="reviewer-name">${review.author.name}</div>
                            <div class="review-date">${this.formatDate(review.createdAt)}</div>
                        </div>
                    </div>
                    <div class="review-rating">
                        ${this.renderStars(review.rating)}
                    </div>
                </div>
                <div class="review-content">${review.content}</div>
                ${this.renderReviewImages(review.images)}
                <div class="review-footer">
                    <span class="review-status status-${review.status}">
                        ${this.getStatusText(review.status)}
                    </span>
                    <div class="review-actions">
                        <button onclick="reviewManager.showDetails('${review.id}')">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button onclick="reviewManager.updateReviewStatus('${review.id}', 'approved')">
                            <i class="fas fa-check"></i>
                        </button>
                        <button onclick="reviewManager.updateReviewStatus('${review.id}', 'rejected')">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        this.renderPagination();
    }

    async showDetails(reviewId) {
        try {
            const response = await fetch(`/api/admin/reviews/${reviewId}`);
            const review = await response.json();
            
            this.elements.modal.dataset.reviewId = reviewId;
            this.elements.modal.querySelector('.modal-body').innerHTML = this.createReviewDetails(review);
            this.elements.modal.classList.add('show');
        } catch (error) {
            console.error('리뷰 상세 정보 로딩 실패:', error);
            this.showError('리뷰 정보를 불러오는데 실패했습니다.');
        }
    }

    async updateReviewStatus(reviewId, status) {
        try {
            const response = await fetch(`/api/admin/reviews/${reviewId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status })
            });

            if (response.ok) {
                this.showSuccess('리뷰 상태가 업데이트되었습니다.');
                await this.loadReviews();
                this.elements.modal.classList.remove('show');
            }
        } catch (error) {
            console.error('리뷰 상태 업데이트 실패:', error);
            this.showError('상태 업데이트에 실패했습니다.');
        }
    }

    async sendFeedback(reviewId, feedback) {
        try {
            const response = await fetch(`/api/admin/reviews/${reviewId}/feedback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ feedback })
            });

            if (response.ok) {
                this.showSuccess('피드백이 전송되었습니다.');
                this.elements.modal.classList.remove('show');
            }
        } catch (error) {
            console.error('피드백 전송 실패:', error);
            this.showError('피드백 전송에 실패했습니다.');
        }
    }

    async exportReviews() {
        try {
            const response = await fetch('/api/admin/reviews/export');
            const blob = await response.blob();
            
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `reviews_${new Date().toISOString().split('T')[0]}.xlsx`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('리뷰 내보내기 실패:', error);
            this.showError('리뷰 내보내기에 실패했습니다.');
        }
    }

    // 유틸리티 메서드들
    updateStats() {
        const totalReviews = this.reviews.length;
        const pendingReviews = this.reviews.filter(r => r.status === 'pending').length;
        const totalRating = this.reviews.reduce((sum, r) => sum + r.rating, 0);
        const avgRating = totalReviews ? (totalRating / totalReviews).toFixed(1) : '0.0';

        this.elements.totalReviews.textContent = totalReviews;
        this.elements.pendingReviews.textContent = pendingReviews;
        this.elements.avgRating.textContent = avgRating;
    }

    renderStars(rating) {
        return Array(5).fill(0).map((_, i) => 
            `<i class="fas fa-star${i < rating ? '' : ' far'}"></i>`
        ).join('');
    }

    renderReviewImages(images) {
        if (!images?.length) return '';
        
        return `
            <div class="review-images">
                ${images.map(image => `
                    <div class="review-image">
                        <img src="${image}" alt="리뷰 이미지">
                    </div>
                `).join('')}
            </div>
        `;
    }

    createReviewDetails(review) {
        return `
            <div class="review-detail">
                <div class="review-campaign-info">
                    <h3>${review.campaign.title}</h3>
                    <p>${this.formatDate(review.campaign.period.start)} ~ ${this.formatDate(review.campaign.period.end)}</p>
                </div>
                <div class="reviewer-info">
                    <img src="${review.author.avatar}" alt="프로필" class="reviewer-avatar">
                    <div>
                        <div class="reviewer-name">${review.author.name}</div>
                        <div class="review-date">${this.formatDate(review.createdAt)}</div>
                    </div>
                </div>
                <div class="review-rating">
                    ${this.renderStars(review.rating)}
                </div>
                <div class="review-content">${review.content}</div>
                ${this.renderReviewImages(review.images)}
                ${review.feedback ? `
                    <div class="review-feedback">
                        <h4>피드백 내역</h4>
                        <p>${review.feedback}</p>
                    </div>
                ` : ''}
            </div>
        `;
    }

    showFeedbackForm(reviewId) {
        const currentContent = this.elements.modal.querySelector('.modal-body').innerHTML;
        this.elements.modal.querySelector('.modal-body').innerHTML = `
            ${currentContent}
            <div class="feedback-form">
                <h4>피드백 작성</h4>
                <textarea id="feedbackText" placeholder="피드백 내용을 입력하세요..."></textarea>
                <button class="btn btn-primary" onclick="reviewManager.sendFeedback('${reviewId}', document.getElementById('feedbackText').value)">
                    피드백 전송
                </button>
            </div>
        `;
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
            pending: '승인 대기',
            approved: '승인됨',
            rejected: '거절됨'
        };
        return statusMap[status] || status;
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
const reviewManager = new ReviewManager(); 