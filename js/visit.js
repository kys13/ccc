class CampaignPage {
    constructor(pageType = 'visit') {
        this.pageType = pageType; // 'visit' 또는 'delivery'
        this.filterState = {
            region: '',
            status: 'all',
            sns: 'all',
            category: this.getCurrentCategory()
        };
        
        this.initializeEvents();
    }

    getCurrentCategory() {
        const path = window.location.pathname;
        const filename = path.split('/').pop().replace('.html', '');
        
        if (this.pageType === 'delivery') {
            if (filename === 'delivery') return 'all';
            const deliveryCategories = ['food', 'beauty', 'living', 'fashion'];
            return deliveryCategories.includes(filename) ? filename : 'all';
        } else {
            if (filename === 'visit') return 'all';
            const visitCategories = ['restaurant', 'cafe', 'beauty', 'hotel'];
            return visitCategories.includes(filename) ? filename : 'all';
        }
    }

    initializeEvents() {
        // 지역 필터 설정
        const citySelect = document.getElementById('city');
        const districtSelect = document.getElementById('district');

        if (citySelect && districtSelect) {
            citySelect.addEventListener('change', (e) => {
                const city = e.target.value;
                this.filterState.region = city;
                this.applyFilters();
            });

            districtSelect.addEventListener('change', (e) => {
                const district = e.target.value;
                if (district) {
                    this.filterState.region = `${citySelect.value}-${district}`;
                } else {
                    this.filterState.region = citySelect.value;
                }
                this.applyFilters();
            });
        }

        // 진행상태 필터
        document.querySelectorAll('input[name="status"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.filterState.status = e.target.value;
                this.applyFilters();
            });
        });

        // SNS 채널 필터
        document.querySelectorAll('input[name="sns"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.filterState.sns = e.target.value;
                this.applyFilters();
            });
        });

        // 카테고리 탭
        document.querySelectorAll('.category-tabs .tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                const category = tab.getAttribute('data-category');
                
                if (tab.classList.contains('active')) {
                    return;
                }

                this.filterState.category = category;
                document.querySelectorAll('.category-tabs .tab').forEach(t => 
                    t.classList.remove('active'));
                tab.classList.add('active');
                
                this.applyFilters();
            });
        });
    }

    applyFilters() {
        const cards = document.querySelectorAll('.campaign-card');
        
        cards.forEach(card => {
            const cardRegion = card.getAttribute('data-region');
            const cardStatus = card.getAttribute('data-status');
            const cardSns = card.getAttribute('data-sns');
            const cardCategory = card.getAttribute('data-category');
            
            // 모든 필터 조건 확인
            const regionMatch = !this.filterState.region || cardRegion === this.filterState.region;
            const statusMatch = this.filterState.status === 'all' || cardStatus === this.filterState.status;
            const snsMatch = this.filterState.sns === 'all' || cardSns === this.filterState.sns;
            const categoryMatch = this.filterState.category === 'all' || cardCategory === this.filterState.category;

            // 모든 조건이 만족되면 카드 표시
            if (regionMatch && statusMatch && snsMatch && categoryMatch) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });

        // 결과가 없을 때 메시지 표시
        const visibleCards = document.querySelectorAll('.campaign-card[style=""]').length;
        const noResultsMsg = document.querySelector('.no-results');
        
        if (visibleCards === 0) {
            if (!noResultsMsg) {
                const msg = document.createElement('div');
                msg.className = 'no-results';
                msg.textContent = '해당하는 캠페인이 없습니다.';
                document.querySelector('.campaign-grid').appendChild(msg);
            }
        } else if (noResultsMsg) {
            noResultsMsg.remove();
        }
    }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    const pageType = window.location.pathname.includes('delivery') ? 'delivery' : 'visit';
    new CampaignPage(pageType);
}); 