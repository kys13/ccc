document.addEventListener('DOMContentLoaded', function() {
    // URL 관련 유틸리티 함수들
    const urlUtils = {
        // 현재 페이지의 기본 URL 가져오기
        getBaseUrl() {
            const path = window.location.pathname;
            return path.substring(0, path.lastIndexOf('/') + 1);
        },

        // 현재 카테고리 가져오기
        getCurrentCategory() {
            const path = window.location.pathname;
            const filename = path.split('/').pop().replace('.html', '');
            
            // 배송 페이지 카테고리 체크 추가
            if (filename === 'delivery') {
                return 'all';
            }
            
            // 배송 서브 카테고리 체크
            const deliveryCategories = ['food', 'beauty', 'living', 'fashion'];
            if (deliveryCategories.includes(filename)) {
                return filename;
            }
            
            return filename;
        },

        // 새로운 URL 생성
        createUrl(category, baseUrl) {
            if (category === 'all') {
                const mainPage = baseUrl.endsWith('/') ? 
                    baseUrl.slice(0, -1) + '.html' : 
                    baseUrl + '.html';
                return mainPage;
            }
            return `${baseUrl}/${category}.html`;
        }
    };

    // 필터 상태를 저장할 객체
    const filterState = {
        region: '',
        status: 'all',
        sns: 'all',
        category: urlUtils.getCurrentCategory()
    };

    // 지역 데이터 추가
    const regionData = {
        seoul: {
            name: '서울특별시',
            districts: [
                '강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', 
                '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구',
                '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'
            ]
        },
        busan: {
            name: '부산광역시',
            districts: [
                '강서구', '금정구', '남구', '동구', '동래구', '부산진구', '북구', '사상구',
                '사하구', '서구', '수영구', '연제구', '영도구', '중구', '해운대구', '기장군'
            ]
        },
        daegu: {
            name: '대구광역시',
            districts: [
                '남구', '달서구', '동구', '북구', '서구', '수성구', '중구', '달성군'
            ]
        },
        incheon: {
            name: '인천광역시',
            districts: [
                '계양구', '남동구', '동구', '미추홀구', '부평구', '서구', '연수구', '중구',
                '강화군', '옹진군'
            ]
        },
        gwangju: {
            name: '광주광역시',
            districts: ['광산구', '남구', '동구', '북구', '서구']
        },
        daejeon: {
            name: '대전광역시',
            districts: ['대덕구', '동구', '서구', '유성구', '중구']
        },
        ulsan: {
            name: '울산광역시',
            districts: ['남구', '동구', '북구', '중구', '울주군']
        },
        gyeonggi: {
            name: '경기도',
            districts: [
                '고양시', '과천시', '광명시', '광주시', '구리시', '군포시', '김포시', 
                '남양주시', '동두천시', '부천시', '성남시', '수원시', '시흥시', '안산시',
                '안성시', '안양시', '양주시', '여주시', '오산시', '용인시', '의왕시',
                '의정부시', '이천시', '파주시', '평택시', '포천시', '하남시', '화성시',
                '가평군', '양평군', '연천군'
            ]
        },
        gangwon: {
            name: '강원도',
            districts: [
                '강릉시', '동해시', '삼척시', '속초시', '원주시', '춘천시', '태백시',
                '고성군', '양구군', '양양군', '영월군', '인제군', '정선군', '철원군',
                '평창군', '홍천군', '화천군', '횡성군'
            ]
        },
        jeju: {
            name: '제주특별자치도',
            districts: ['제주시', '서귀포시']
        },
        chungbuk: {
            name: '충청북도',
            districts: [
                '청주시', '충주시', '제천시', '보은군', '옥천군', '영동군', 
                '증평군', '진천군', '괴산군', '음성군', '단양군'
            ]
        },
        chungnam: {
            name: '충청남도',
            districts: [
                '천안시', '공주시', '보령시', '아산시', '서산시', '논산시', 
                '계룡시', '당진시', '금산군', '부여군', '서천군', '청양군', 
                '홍성군', '예산군', '태안군'
            ]
        },
        jeonbuk: {
            name: '전라북도',
            districts: [
                '전주시', '군산시', '익산시', '정읍시', '남원시', '김제시',
                '완주군', '진안군', '무주군', '장수군', '임실군', '순창군',
                '고창군', '부안군'
            ]
        },
        jeonnam: {
            name: '전라남도',
            districts: [
                '목포시', '여수시', '순천시', '나주시', '광양시', '담양군',
                '곡성군', '구례군', '고흥군', '보성군', '화순군', '장흥군',
                '강진군', '해남군', '영암군', '무안군', '함평군', '영광군',
                '장성군', '완도군', '진도군', '신안군'
            ]
        },
        gyeongbuk: {
            name: '경상북도',
            districts: [
                '포항시', '경주시', '김천시', '안동시', '구미시', '영주시',
                '영천시', '상주시', '문경시', '경산시', '군위군', '의성군',
                '청송군', '영양군', '영덕군', '청도군', '고령군', '성주군',
                '칠곡군', '예천군', '봉화군', '울진군', '울릉군'
            ]
        },
        gyeongnam: {
            name: '경상남도',
            districts: [
                '창원시', '진주시', '통영시', '사천시', '김해시', '밀양시',
                '거제시', '양산시', '의령군', '함안군', '창녕군', '고성군',
                '남해군', '하동군', '산청군', '함양군', '거창군', '합천군'
            ]
        },
        sejong: {
            name: '세종특별자치시',
            districts: ['세종시']
        }
    };

    // 필터 적용 함수
    function applyFilters() {
        const cards = document.querySelectorAll('.campaign-card');
        
        cards.forEach(card => {
            let show = true;

            // 카테고리 필터
            if (filterState.category !== 'all') {
                if (card.dataset.category !== filterState.category) {
                    show = false;
                }
            }

            // 지역 필터
            if (filterState.region && filterState.region !== '') {
                if (card.dataset.region !== filterState.region) {
                    show = false;
                }
            }

            // 상태 필터
            if (filterState.status !== 'all') {
                if (card.dataset.status !== filterState.status) {
                    show = false;
                }
            }

            // SNS 필터
            if (filterState.sns !== 'all') {
                if (card.dataset.sns !== filterState.sns) {
                    show = false;
                }
            }

            // 카드 표시/숨김
            card.style.display = show ? 'block' : 'none';
        });
    }

    // 지역 선택 기능 수정
    function setupRegionFilter() {
        const citySelect = document.getElementById('city');
        const districtSelect = document.getElementById('district');

        if (citySelect && districtSelect) {
            // 시/도 옵션 초기화
            citySelect.innerHTML = '<option value="">시/도 선택</option>';
            
            // 모든 시/도 옵션 추가
            Object.keys(regionData).forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                option.textContent = regionData[city].name;
                citySelect.appendChild(option);
            });

            // 시/도 선택 시 구/군 업데이트
            citySelect.addEventListener('change', function() {
                const city = this.value;
                districtSelect.innerHTML = '<option value="">구/군 선택</option>';
                
                if (city && regionData[city]) {
                    regionData[city].districts.forEach(district => {
                        const option = document.createElement('option');
                        option.value = district;
                        option.textContent = district;
                        districtSelect.appendChild(option);
                    });
                    districtSelect.disabled = false;
                } else {
                    districtSelect.disabled = true;
                }

                filterState.region = city ? `${city}` : '';
                applyFilters();
            });

            // 구/군 선택 시 필터링
            districtSelect.addEventListener('change', function() {
                const district = this.value;
                const city = citySelect.value;
                
                if (district) {
                    filterState.region = `${city}-${district}`;
                } else {
                    filterState.region = city;
                }
                applyFilters();
            });
        }
    }

    // 상태 필터 설정
    function setupStatusFilter() {
        const statusRadios = document.querySelectorAll('input[name="status"]');
        statusRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                filterState.status = this.value;
                applyFilters();
            });
        });
    }

    // SNS 필터 설정
    function setupSnsFilter() {
        const snsRadios = document.querySelectorAll('input[name="sns"]');
        snsRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                filterState.sns = this.value;
                applyFilters();
            });
        });
    }

    // 카테고리 탭 설정
    function setupCategoryTabs() {
        const tabs = document.querySelectorAll('.category-tabs .tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', function(e) {
                e.preventDefault(); // 항상 기본 동작 방지
                const category = this.getAttribute('data-category');
                
                // 이미 활성화된 탭이면 아무 동작하지 않음
                if (this.classList.contains('active')) {
                    return;
                }

                filterState.category = category;
                tabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                applyFilters();
            });
        });
    }

    // 초기화
    setupRegionFilter();
    setupStatusFilter();
    setupSnsFilter();
    setupCategoryTabs();
    applyFilters();
}); 