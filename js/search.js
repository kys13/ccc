class Search {
    constructor() {
        this.searchInput = document.querySelector('.search-input');
        this.searchResults = document.querySelector('.search-results');
        this.initializeSearch();
    }

    initializeSearch() {
        this.searchInput.addEventListener('input', this.debounce(() => {
            this.handleSearch();
        }, 300));

        // 검색창 포커스 시 최근 검색어 표시
        this.searchInput.addEventListener('focus', () => {
            this.showRecentSearches();
        });

        // 검색창 외부 클릭 시 결과 숨김
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-box')) {
                this.hideSearchResults();
            }
        });
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

    async handleSearch() {
        const query = this.searchInput.value.trim();
        if (query.length < 2) {
            this.hideSearchResults();
            return;
        }

        try {
            const results = await this.searchAPI(query);
            this.displayResults(results);
        } catch (error) {
            console.error('검색 중 오류 발생:', error);
        }
    }

    async searchAPI(query) {
        // API 호출 구현
        // 임시 데이터 반환
        return [
            {
                id: 1,
                title: '맛있는 레스토랑 체험단',
                category: '맛집',
                location: '서울 강남구'
            },
            {
                id: 2,
                title: '신상 화장품 체험단',
                category: '뷰티',
                location: '온라인'
            }
        ];
    }

    displayResults(results) {
        if (!this.searchResults) {
            this.searchResults = document.createElement('div');
            this.searchResults.className = 'search-results';
            this.searchInput.parentNode.appendChild(this.searchResults);
        }

        this.searchResults.innerHTML = `
            <div class="results-container">
                ${results.map(result => `
                    <a href="/campaign/${result.id}" class="result-item">
                        <div class="result-category">${result.category}</div>
                        <div class="result-title">${result.title}</div>
                        <div class="result-location">${result.location}</div>
                    </a>
                `).join('')}
            </div>
        `;

        this.searchResults.style.display = 'block';
    }

    showRecentSearches() {
        const recentSearches = this.getRecentSearches();
        if (recentSearches.length === 0) return;

        this.searchResults.innerHTML = `
            <div class="recent-searches">
                <h3>최근 검색어</h3>
                ${recentSearches.map(search => `
                    <div class="recent-search-item">
                        <span>${search}</span>
                        <button class="delete-search" data-term="${search}">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                `).join('')}
            </div>
        `;

        this.searchResults.style.display = 'block';
    }

    getRecentSearches() {
        return JSON.parse(localStorage.getItem('recentSearches') || '[]');
    }

    hideSearchResults() {
        if (this.searchResults) {
            this.searchResults.style.display = 'none';
        }
    }
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    new Search();
}); 