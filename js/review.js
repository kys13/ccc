class ReviewManager {
    constructor() {
        this.reviews = [];
        this.currentPage = 1;
        this.itemsPerPage = 10;
    }

    async fetchReviews(campaignId) {
        try {
            const response = await fetch(`/api/reviews/${campaignId}`);
            const data = await response.json();
            this.reviews = data;
            this.renderReviews();
        } catch (error) {
            console.error('후기를 불러오는데 실패했습니다:', error);
        }
    }

    async submitReview(reviewData) {
        try {
            const response = await fetch('/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reviewData)
            });
            
            if (response.ok) {
                notificationSystem.showToast('후기가 성공적으로 등록되었습니다.', 'success');
                this.fetchReviews(reviewData.campaignId);
            }
        } catch (error) {
            console.error('후기 등록에 실패했습니다:', error);
            notificationSystem.showToast('후기 등록에 실패했습니다.', 'error');
        }
    }

    renderReviews() {
        const container = document.getElementById('reviewContainer');
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        
        container.innerHTML = this.reviews.slice(start, end).map(review => `
            <div class="review-card">
                <div class="review-header">
                    <img src="${review.userImage}" alt="프로필" class="user-image">
                    <div class="review-info">
                        <h4>${review.username}</h4>
                        <div class="rating">${'★'.repeat(review.rating)}</div>
                    </div>
                </div>
                <div class="review-content">
                    <p>${review.content}</p>
                    <div class="review-images">
                        ${review.images.map(img => `
                            <img src="${img}" alt="후기 이미지">
                        `).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }
} 