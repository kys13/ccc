class MainSlider {
    constructor() {
        this.sliderWrapper = document.querySelector('.slider-wrapper');
        this.slides = document.querySelectorAll('.slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.currentIndex = 0;
        this.slideCount = this.slides.length;
        this.slideWidth = this.slides[0].offsetWidth;
        this.autoPlayInterval = null;

        this.initializeSlider();
        this.startAutoPlay();
    }

    initializeSlider() {
        // 인디케이터 클릭 이벤트
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });

        // 마우스 호버 시 자동 재생 멈춤
        this.sliderWrapper.addEventListener('mouseenter', () => {
            this.stopAutoPlay();
        });

        this.sliderWrapper.addEventListener('mouseleave', () => {
            this.startAutoPlay();
        });
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.sliderWrapper.style.transform = `translateX(-${this.currentIndex * 25}%)`;
        
        // 인디케이터 업데이트
        this.indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slideCount;
        this.goToSlide(this.currentIndex);
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 4000);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// 페이지 로드 시 슬라이더 초기화
document.addEventListener('DOMContentLoaded', () => {
    new MainSlider();
}); 