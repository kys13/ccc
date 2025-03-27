class MainSlider {
    constructor() {
        this.currentSlide = 0;
        this.wrapper = document.querySelector('.main-slider .slider-wrapper');
        this.slides = document.querySelectorAll('.main-slider .slide');
        this.dots = document.querySelectorAll('.slider-pagination .pagination-dot');
        this.totalSlides = this.slides.length;
        this.autoPlayInterval = null;

        this.initializeDots();
        this.startAutoPlay();
    }

    initializeDots() {
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlider();
    }

    updateSlider() {
        const offset = -this.currentSlide * 100;
        this.wrapper.style.transform = `translateX(${offset}%)`;
        
        // Update dots
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlider();
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // 5초마다 슬라이드 변경
    }
}

// Initialize main slider
document.addEventListener('DOMContentLoaded', () => {
    new MainSlider();
}); 