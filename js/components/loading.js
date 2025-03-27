class LoadingIndicator {
    constructor() {
        this.element = document.createElement('div');
        this.element.className = 'loading-overlay';
        this.element.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <div class="loading-text">로딩중...</div>
            </div>
        `;
    }

    show() {
        document.body.appendChild(this.element);
    }

    hide() {
        this.element.remove();
    }
}

// 전역 인스턴스 생성
window.loading = new LoadingIndicator(); 