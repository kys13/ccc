class ReviewManager {
    constructor() {
        this.reviews = [];
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.initializeEventListeners();
        this.loadReviews();
    }

    initializeEventListeners() {
        // 필터 이벤트
        document.getElementById('statusFilter').addEventListener('change', () => this.filterReviews());
        document.getElementById('ratingFilter').addEventListener('change', () => this.filterReviews());
        document.getElementById('sortFilter').addEventListener('change', () => this.sortReviews());
        
        // 검색 이벤트
        document.getElementById('reviewSearch').addEventListener('input', 
            this.debounce(() => this.searchReviews(), 300)
        );
    }

    async loadReviews() {
        try {
            const response = await fetch('/api/admin/reviews');
            this.reviews = await response.json();
            this.renderReviews();
        } catch (error) {
            console.error('리뷰 로딩 실패:', error);
            this.showError('리뷰 목록을 불러오는데 실패했습니다.');
        }
    }

    renderReviews() {
        const container = document.querySelector('.review-list');
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        
        container.innerHTML = this.reviews.slice(start, end).map(review => `
            <div class="review-card">
                <div class="review-header">
                    <div class="reviewer-info">
                        <img src="${review.userAvatar}" alt="프로필" class="reviewer-avatar">
                        <div class="reviewer-details">
                            <span class="reviewer-name">${review.userName}</span>
                            <span class="review-date">${this.formatDate(review.date)}</span>
                        </div>
                    </div>
                    <div class="review-rating">
                        ${'★'.repeat(review.rating)}
                    </div>
                </div>
                
                <div class="review-campaign">
                    <div class="campaign-title">${review.campaignTitle}</div>
                    <div class="campaign-info">${review.campaignInfo}</div>
                </div>
                
                <div class="review-content">
                    <p class="review-text">${review.content}</p>
                    ${this.renderReviewImages(review.images)}
                </div>
                
                <div class="review-stats">
                    <div class="stat-item">
                        <i class="far fa-heart"></i>
                        <span>${review.likes}</span>
                    </div>
                    <div class="stat-item">
                        <i class="far fa-comment"></i>
                        <span>${review.comments}</span>
                    </div>
                    <div class="stat-item">
                        <span class="review-status ${review.status}">
                            ${this.getStatusText(review.status)}
                        </span>
                    </div>
                </div>
                
                <div class="review-actions">
                    ${this.renderActionButtons(review)}
                </div>
            </div>
        `).join('');
    }

    renderReviewImages(images) {
        if (!images || images.length === 0) return '';
        
        return `
            <div class="review-images">
                ${images.map(img => `
                    <img src="${img}" alt="리뷰 이미지" class="review-image" 
                         onclick="reviewManager.showImageModal('${img}')">
                `).join('')}
            </div>
        `;
    }

    renderActionButtons(review) {
        if (review.status === 'pending') {
            return `
                <button class="action-button approve-button" onclick="reviewManager.approveReview(${review.id})">
                    <i class="fas fa-check"></i> 승인
                </button>
                <button class="action-button reject-button" onclick="reviewManager.rejectReview(${review.id})">
                    <i class="fas fa-times"></i> 반려
                </button>
            `;
        }
        
        return `
            <button class="action-button delete-button" onclick="reviewManager.deleteReview(${review.id})">
                <i class="fas fa-trash"></i> 삭제
            </button>
        `;
    }

    async approveReview(id) {
        try {
            await fetch(`/api/admin/reviews/${id}/approve`, { method: 'PUT' });
            this.showSuccess('리뷰가 승인되었습니다.');
            await this.loadReviews();
        } catch (error) {
            this.showError('리뷰 승인에 실패했습니다.');
        }
    }

    async rejectReview(id) {
        const reason = prompt('반려 사유를 입력해주세요:');
        if (!reason) return;

        try {
            await fetch(`/api/admin/reviews/${id}/reject`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ reason })
            });
            this.showSuccess('리뷰가 반려되었습니다.');
            await this.loadReviews();
        } catch (error) {
            this.showError('리뷰 반려에 실패했습니다.');
        }
    }

    async deleteReview(id) {
        if (!confirm('이 리뷰를 삭제하시겠습니까?')) return;

        try {
            await fetch(`/api/admin/reviews/${id}`, { method: 'DELETE' });
            this.showSuccess('리뷰가 삭제되었습니다.');
            await this.loadReviews();
        } catch (error) {
            this.showError('리뷰 삭제에 실패했습니다.');
        }
    }

    filterReviews() {
        const status = document.getElementById('statusFilter').value;
        const rating = document.getElementById('ratingFilter').value;
        
        let filtered = [...this.reviews];
        
        if (status) {
            filtered = filtered.filter(review => review.status === status);
        }
        
        if (rating) {
            filtered = filtered.filter(review => review.rating === parseInt(rating));
        }
        
        this.reviews = filtered;
        this.currentPage = 1;
        this.renderReviews();
    }

    sortReviews() {
        const sortBy = document.getElementById('sortFilter').value;
        
        this.reviews.sort((a, b) => {
            switch (sortBy) {
                case 'latest':
                    return new Date(b.date) - new Date(a.date);
                case 'rating':
                    return b.rating - a.rating;
                case 'likes':
                    return b.likes - a.likes;
                default:
                    return 0;
            }
        });
        
        this.renderReviews();
    }

    searchReviews() {
        const searchTerm = document.getElementById('reviewSearch').value.toLowerCase();
        
        if (!searchTerm) {
            this.loadReviews();
            return;
        }
        
        this.reviews = this.reviews.filter(review => 
            review.userName.toLowerCase().includes(searchTerm) ||
            review.content.toLowerCase().includes(searchTerm) ||
            review.campaignTitle.toLowerCase().includes(searchTerm)
        );
        
        this.currentPage = 1;
        this.renderReviews();
    }

    showImageModal(imageUrl) {
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <img src="${imageUrl}" alt="리뷰 이미지">
                <button class="close-button"><i class="fas fa-times"></i></button>
            </div>
        `;
        
        modal.querySelector('.close-button').onclick = () => modal.remove();
        document.body.appendChild(modal);
    }

    formatDate(date) {
        return new Date(date).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    getStatusText(status) {
        const statusMap = {
            pending: '대기 중',
            approved: '승인됨',
            rejected: '반려됨'
        };
        return statusMap[status] || status;
    }

    showSuccess(message) {
        // 토스트 메시지 표시
        const toast = document.createElement('div');
        toast.className = 'toast success';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    showError(message) {
        // 토스트 메시지 표시
        const toast = document.createElement('div');
        toast.className = 'toast error';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    debounce(func, wait) {
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
}

// 전역 리뷰 매니저 초기화
const reviewManager = new ReviewManager(); 