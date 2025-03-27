class DeliveryPage {
    constructor() {
        this.campaigns = [];
        this.filteredCampaigns = [];
        this.filters = {
            category: 'all',
            city: '',
            district: '',
            status: 'all',
            sns: 'all'
        };
        this.currentSort = 'latest';
        this.initializeData();
        this.initializeEvents();
        this.setActiveTab();
    }

    getCurrentCategory() {
        const path = window.location.pathname;
        if (path.includes('/food')) return 'food';
        if (path.includes('/beauty')) return 'beauty';
        if (path.includes('/living')) return 'living';
        if (path.includes('/fashion')) return 'fashion';
        return 'all';
    }

    setActiveTab() {
        const currentCategory = this.getCurrentCategory();
        document.querySelectorAll('.category-tabs .tab').forEach(tab => {
            if (tab.dataset.category === currentCategory) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
    }

    async initializeData() {
        // 30개의 더미 데이터 생성
        this.campaigns = Array.from({ length: 30 }, (_, i) => ({
            id: i + 1,
            title: this.getRandomTitle(i),
            category: ['food', 'beauty', 'living', 'fashion'][Math.floor(Math.random() * 4)],
            imageUrl: `/images/delivery-${(i % 5) + 1}.jpg`,
            reward: `${Math.floor(Math.random() * 10 + 5)}만원`,
            daysLeft: Math.floor(Math.random() * 10 + 1),
            currentApplicants: Math.floor(Math.random() * 80 + 20),
            maxApplicants: 100,
            createdAt: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000),
            views: Math.floor(Math.random() * 1000),
            location: this.getRandomLocation()
        }));
        
        this.filterCampaigns();
    }

    getRandomTitle(index) {
        const titles = {
            food: [
                '신선한 제철 과일 체험단',
                '유기농 건강식품 체험단',
                '프리미엄 커피 체험단',
                '홈메이드 반찬 체험단',
                '건강 간식 체험단'
            ],
            beauty: [
                '기초 스킨케어 체험단',
                '메이크업 제품 체험단',
                '헤어케어 제품 체험단',
                '프리미엄 화장품 체험단',
                '바디케어 제품 체험단'
            ],
            living: [
                '생활용품 체험단',
                '주방용품 체험단',
                '홈케어 제품 체험단',
                '인테리어 소품 체험단',
                '청소용품 체험단'
            ],
            fashion: [
                '시즌 의류 체험단',
                '액세서리 체험단',
                '신발 체험단',
                '가방 체험단',
                '패션 소품 체험단'
            ]
        };

        const category = ['food', 'beauty', 'living', 'fashion'][Math.floor(Math.random() * 4)];
        const randomTitle = titles[category][Math.floor(Math.random() * 5)];
        return `${randomTitle} ${index + 1}`;
    }

    getRandomLocation() {
        const cities = ['서울', '경기', '인천', '부산', '대구', '광주', '대전', '울산'];
        const districts = {
            '서울': ['강남구', '서초구', '송파구', '마포구', '강서구'],
            '경기': ['수원시', '성남시', '용인시', '고양시', '부천시'],
            '인천': ['미추홀구', '연수구', '남동구', '부평구', '계양구']
        };
        
        const city = cities[Math.floor(Math.random() * cities.length)];
        const districtList = districts[city] || ['중구', '남구', '동구', '서구', '북구'];
        const district = districtList[Math.floor(Math.random() * districtList.length)];
        
        return `${city} ${district}`;
    }

    initializeEvents() {
        // 카테고리 탭 클릭 이벤트 수정
        document.querySelectorAll('.category-tabs .tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                const category = tab.dataset.category;
                // URL을 직접 조작하지 않고 기본 경로만 사용
                const baseUrl = category === 'all' ? 'delivery.html' : `delivery/${category}.html`;
                window.history.pushState({ category }, '', baseUrl);
                this.filters.category = category;
                this.filterCampaigns();
                this.setActiveTab();
            });
        });

        // 필터 버튼 클릭 이벤트
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                if (btn.textContent.includes('최신순')) {
                    this.currentSort = 'latest';
                } else if (btn.textContent.includes('인기순')) {
                    this.currentSort = 'popular';
                } else if (btn.textContent.includes('마감임박순')) {
                    this.currentSort = 'deadline';
                }

                this.sortCampaigns();
            });
        });

        // 브라우저 뒤로가기/앞으로가기 처리
        window.addEventListener('popstate', (e) => {
            this.filters.category = this.getCurrentCategory();
            this.filterCampaigns();
            this.setActiveTab();
        });

        // 지역 필터 이벤트
        document.getElementById('city').addEventListener('change', (e) => {
            this.filters.city = e.target.value;
            this.updateDistricts(e.target.value);  // 구/군 옵션 업데이트
            this.filterCampaigns();
        });

        document.getElementById('district').addEventListener('change', (e) => {
            this.filters.district = e.target.value;
            this.filterCampaigns();
        });

        // 진행상태 필터 이벤트
        document.querySelectorAll('input[name="status"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.filters.status = e.target.value;
                this.filterCampaigns();
            });
        });

        // SNS 채널 필터 이벤트
        document.querySelectorAll('input[name="sns"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.filters.sns = e.target.value;
                this.filterCampaigns();
            });
        });
    }

    updateDistricts(city) {
        const districtSelect = document.getElementById('district');
        const districts = {
            'seoul': ['강남구', '서초구', '송파구', '마포구', '강서구'],
            'gyeonggi': ['수원시', '성남시', '용인시', '고양시', '부천시'],
            'incheon': ['미추홀구', '연수구', '남동구', '부평구', '계양구']
        };

        districtSelect.innerHTML = '<option value="">구/군 선택</option>';
        
        if (city && districts[city]) {
            districts[city].forEach(district => {
                const option = document.createElement('option');
                option.value = district;
                option.textContent = district;
                districtSelect.appendChild(option);
            });
        }
    }

    sortCampaigns() {
        switch (this.currentSort) {
            case 'latest':
                this.filteredCampaigns.sort((a, b) => b.createdAt - a.createdAt);
                break;
            case 'popular':
                this.filteredCampaigns.sort((a, b) => b.views - a.views);
                break;
            case 'deadline':
                this.filteredCampaigns.sort((a, b) => a.daysLeft - b.daysLeft);
                break;
        }
        this.renderCampaigns();
    }

    filterCampaigns() {
        this.filteredCampaigns = this.campaigns.filter(campaign => {
            // 카테고리 필터
            if (this.filters.category !== 'all' && campaign.category !== this.filters.category) {
                return false;
            }

            // 지역 필터
            if (this.filters.city && !campaign.location.includes(this.filters.city)) {
                return false;
            }
            if (this.filters.district && !campaign.location.includes(this.filters.district)) {
                return false;
            }

            // 진행상태 필터
            if (this.filters.status !== 'all') {
                if (this.filters.status === 'ongoing' && campaign.daysLeft <= 0) {
                    return false;
                }
                if (this.filters.status === 'upcoming' && campaign.daysLeft > 0) {
                    return false;
                }
            }

            // SNS 채널 필터
            if (this.filters.sns !== 'all' && campaign.sns !== this.filters.sns) {
                return false;
            }

            return true;
        });

        this.sortCampaigns();
    }

    renderCampaigns() {
        const grid = document.querySelector('.campaign-grid');
        grid.innerHTML = this.filteredCampaigns.map(campaign => `
            <div class="campaign-card">
                <div class="card-image">
                    <img src="${campaign.imageUrl}" alt="${campaign.title}">
                    <button class="bookmark-btn">
                        <i class="far fa-bookmark"></i>
                    </button>
                    <span class="category-tag">${this.getCategoryName(campaign.category)}</span>
                </div>
                <div class="card-content">
                    <div class="location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${campaign.location}</span>
                    </div>
                    <h3>${campaign.title}</h3>
                    <div class="campaign-info">
                        <span class="reward">${campaign.reward} 상당</span>
                        <span class="deadline">D-${campaign.daysLeft}</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress" style="width: ${(campaign.currentApplicants / campaign.maxApplicants) * 100}%"></div>
                    </div>
                    <div class="application-info">
                        <span>신청 ${campaign.currentApplicants}/${campaign.maxApplicants}</span>
                        <span>${Math.round((campaign.currentApplicants / campaign.maxApplicants) * 100)}% 달성</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    getCategoryName(category) {
        const categoryNames = {
            food: '식품',
            beauty: '화장품',
            living: '생활용품',
            fashion: '패션/잡화'
        };
        return categoryNames[category] || category;
    }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    new DeliveryPage();
}); 