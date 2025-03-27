class CampaignSlider {
    constructor(container) {
        this.container = container;
        this.wrapper = container.querySelector('.campaign-container');
        this.slides = this.wrapper.querySelectorAll('.campaign-card');
        this.prevBtn = container.querySelector('.slider-btn.prev');
        this.nextBtn = container.querySelector('.slider-btn.next');
        
        // 초기 설정
        this.currentIndex = 0;
        this.slidesPerView = 4;
        this.totalSlides = this.slides.length;
        
        // 슬라이드 너비 계산
        const cardStyle = window.getComputedStyle(this.slides[0]);
        const cardWidth = this.slides[0].offsetWidth;
        const cardMargin = parseFloat(cardStyle.marginRight) || 24;
        this.slideWidth = cardWidth + cardMargin;

        // 이벤트 리스너 설정
        this.initializeButtons();
    }

    initializeButtons() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.slide('prev'));
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.slide('next'));
        }
    }

    slide(direction) {
        if (direction === 'next') {
            this.currentIndex++;
            if (this.currentIndex >= this.totalSlides - this.slidesPerView + 1) {
                // 마지막에 도달하면 처음으로
                this.currentIndex = 0;
            }
        } else {
            this.currentIndex--;
            if (this.currentIndex < 0) {
                // 처음에서 이전으로 가면 마지막으로
                this.currentIndex = this.totalSlides - this.slidesPerView;
            }
        }

        this.updateSliderPosition();
    }

    updateSliderPosition() {
        const offset = -this.currentIndex * this.slideWidth;
        this.wrapper.style.transform = `translateX(${offset}px)`;
    }

    resize() {
        // 슬라이드 너비 재계산
        const cardStyle = window.getComputedStyle(this.slides[0]);
        const cardWidth = this.slides[0].offsetWidth;
        const cardMargin = parseFloat(cardStyle.marginRight) || 24;
        this.slideWidth = cardWidth + cardMargin;
        
        // 현재 위치 업데이트
        this.updateSliderPosition();
    }
}

// DOM이 로드된 후 슬라이더 초기화
document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.campaign-slider');
    const sliderInstances = Array.from(sliders).map(slider => new CampaignSlider(slider));

    // 창 크기 변경 시 슬라이더 재설정
    window.addEventListener('resize', () => {
        sliderInstances.forEach(slider => slider.resize());
    });
});

function initializeCampaignSlider() {
    const campaignItems = document.querySelectorAll('.campaign-item');
    
    campaignItems.forEach(item => {
        item.addEventListener('click', function() {
            const campaignId = this.dataset.campaignId;
            window.location.href = `/pages/campaign-detail.html?id=${campaignId}`;
        });
    });
} 