class SEOManager {
    constructor() {
        this.initializeElements();
        this.setupEventListeners();
        this.initializeChart();
        this.loadSEOData();
    }

    initializeElements() {
        this.elements = {
            // 메타 태그 관련 요소
            pageSelect: document.getElementById('pageSelect'),
            metaTitle: document.getElementById('metaTitle'),
            metaDescription: document.getElementById('metaDescription'),
            metaKeywords: document.getElementById('metaKeywords'),
            saveMetaTags: document.getElementById('saveMetaTags'),
            
            // 키워드 분석 관련 요소
            keywordInput: document.getElementById('keywordInput'),
            analyzeKeyword: document.getElementById('analyzeKeyword'),
            keywordResults: document.getElementById('keywordResults'),
            
            // 통계 요소
            searchImpressions: document.getElementById('searchImpressions'),
            searchClicks: document.getElementById('searchClicks'),
            ctr: document.getElementById('ctr'),
            avgPosition: document.getElementById('avgPosition'),
            
            // 차트와 쿼리 요소
            searchPerformanceChart: document.getElementById('searchPerformanceChart'),
            topQueries: document.getElementById('topQueries'),
            
            // 사이트맵 생성 버튼
            generateSitemap: document.getElementById('generateSitemap')
        };

        // 문자 수 제한 요소들
        this.characterLimits = {
            metaTitle: document.querySelector('#metaTitle + .character-count'),
            metaDescription: document.querySelector('#metaDescription + .character-count')
        };
    }

    setupEventListeners() {
        // 페이지 선택 시 메타 태그 로드
        this.elements.pageSelect.addEventListener('change', () => this.loadMetaTags());

        // 메타 태그 문자 수 체크
        this.elements.metaTitle.addEventListener('input', (e) => this.updateCharacterCount(e.target, 60));
        this.elements.metaDescription.addEventListener('input', (e) => this.updateCharacterCount(e.target, 160));

        // 메타 태그 저장
        this.elements.saveMetaTags.addEventListener('click', () => this.saveMetaTags());

        // 키워드 분석
        this.elements.analyzeKeyword.addEventListener('click', () => this.analyzeKeyword());

        // 사이트맵 생성
        this.elements.generateSitemap.addEventListener('click', () => this.generateSitemap());

        // 엔터키로 키워드 분석 실행
        this.elements.keywordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.analyzeKeyword();
        });
    }

    initializeChart() {
        this.performanceChart = new Chart(this.elements.searchPerformanceChart, {
            type: 'line',
            data: {
                labels: [],
                datasets: [
                    {
                        label: '노출수',
                        data: [],
                        borderColor: '#4a9eff',
                        tension: 0.4
                    },
                    {
                        label: '클릭수',
                        data: [],
                        borderColor: '#2ecc71',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    async loadSEOData() {
        try {
            const response = await fetch('/api/admin/seo/overview');
            const data = await response.json();
            
            this.updateOverview(data.overview);
            this.updatePerformanceChart(data.performance);
            this.updateTopQueries(data.queries);
            this.loadMetaTags();
        } catch (error) {
            console.error('SEO 데이터 로딩 실패:', error);
            this.showError('SEO 데이터를 불러오는데 실패했습니다.');
        }
    }

    updateOverview(data) {
        this.elements.searchImpressions.textContent = this.formatNumber(data.impressions);
        this.elements.searchClicks.textContent = this.formatNumber(data.clicks);
        this.elements.ctr.textContent = `${(data.ctr * 100).toFixed(1)}%`;
        this.elements.avgPosition.textContent = data.position.toFixed(1);
    }

    updatePerformanceChart(data) {
        this.performanceChart.data.labels = data.dates;
        this.performanceChart.data.datasets[0].data = data.impressions;
        this.performanceChart.data.datasets[1].data = data.clicks;
        this.performanceChart.update();
    }

    updateTopQueries(queries) {
        this.elements.topQueries.innerHTML = queries.map(query => `
            <div class="query-item">
                <div class="query-info">
                    <div class="query-text">${query.term}</div>
                    <div class="query-stats">
                        노출 ${this.formatNumber(query.impressions)} · 
                        클릭 ${this.formatNumber(query.clicks)} · 
                        CTR ${(query.ctr * 100).toFixed(1)}%
                    </div>
                </div>
                <div class="query-position">${query.position.toFixed(1)}</div>
            </div>
        `).join('');
    }

    async loadMetaTags() {
        const page = this.elements.pageSelect.value;
        try {
            const response = await fetch(`/api/admin/seo/meta-tags/${page}`);
            const data = await response.json();
            
            this.elements.metaTitle.value = data.title;
            this.elements.metaDescription.value = data.description;
            this.elements.metaKeywords.value = data.keywords;
            
            this.updateCharacterCount(this.elements.metaTitle, 60);
            this.updateCharacterCount(this.elements.metaDescription, 160);
        } catch (error) {
            console.error('메타 태그 로딩 실패:', error);
            this.showError('메타 태그를 불러오는데 실패했습니다.');
        }
    }

    async saveMetaTags() {
        const data = {
            page: this.elements.pageSelect.value,
            title: this.elements.metaTitle.value,
            description: this.elements.metaDescription.value,
            keywords: this.elements.metaKeywords.value
        };

        try {
            const response = await fetch('/api/admin/seo/meta-tags', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                this.showSuccess('메타 태그가 저장되었습니다.');
            }
        } catch (error) {
            console.error('메타 태그 저장 실패:', error);
            this.showError('메타 태그 저장에 실패했습니다.');
        }
    }

    async analyzeKeyword() {
        const keyword = this.elements.keywordInput.value.trim();
        if (!keyword) {
            this.showError('키워드를 입력해주세요.');
            return;
        }

        try {
            const response = await fetch(`/api/admin/seo/analyze-keyword?keyword=${encodeURIComponent(keyword)}`);
            const data = await response.json();
            
            this.elements.keywordResults.innerHTML = `
                <div class="keyword-item">
                    <div class="keyword-header">
                        <div class="keyword-title">${keyword}</div>
                        <div class="keyword-volume">월간 검색량: ${this.formatNumber(data.searchVolume)}</div>
                    </div>
                    <div class="keyword-metrics">
                        <div class="keyword-metric">
                            <div class="metric-value">${data.difficulty}%</div>
                            <div class="metric-label">경쟁도</div>
                        </div>
                        <div class="keyword-metric">
                            <div class="metric-value">${data.cpc}원</div>
                            <div class="metric-label">평균 CPC</div>
                        </div>
                        <div class="keyword-metric">
                            <div class="metric-value">${data.competition}</div>
                            <div class="metric-label">경쟁사 수</div>
                        </div>
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('키워드 분석 실패:', error);
            this.showError('키워드 분석에 실패했습니다.');
        }
    }

    async generateSitemap() {
        try {
            const response = await fetch('/api/admin/seo/generate-sitemap', { method: 'POST' });
            if (response.ok) {
                this.showSuccess('사이트맵이 성공적으로 생성되었습니다.');
            }
        } catch (error) {
            console.error('사이트맵 생성 실패:', error);
            this.showError('사이트맵 생성에 실패했습니다.');
        }
    }

    updateCharacterCount(element, limit) {
        const count = element.value.length;
        const countElement = element.nextElementSibling;
        countElement.textContent = `${count}/${limit}`;
        
        if (count > limit) {
            countElement.style.color = '#e74c3c';
        } else {
            countElement.style.color = 'var(--text-color-light)';
        }
    }

    formatNumber(number) {
        return new Intl.NumberFormat('ko-KR').format(number);
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

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    new SEOManager();
}); 