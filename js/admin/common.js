class AdminCommon {
    constructor() {
        this.initializeSidebar();
        this.setupLogout();
        this.setupSmoothScroll();
        this.setupTouchGestures();
    }

    initializeSidebar() {
        // 현재 페이지 URL에서 파일명만 추출
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop();
        
        // 사이드바의 모든 메뉴 항목을 가져옴
        const menuItems = document.querySelectorAll('.sidebar-menu li');
        
        // 각 메뉴 항목을 순회하면서 현재 페이지와 일치하는 항목을 찾아 active 클래스 추가
        menuItems.forEach(item => {
            const link = item.querySelector('a');
            const linkPage = link.getAttribute('href').split('/').pop();
            
            if (currentPage === linkPage) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    setupLogout() {
        const logoutButton = document.querySelector('.logout-button');
        if (logoutButton) {
            logoutButton.addEventListener('click', () => this.handleLogout());
        }
    }

    async handleLogout() {
        try {
            // 로그아웃 처리 후 로그인 페이지로 이동
            window.location.href = '../../pages/login.html';
        } catch (error) {
            console.error('로그아웃 처리 중 오류:', error);
        }
    }

    setupSmoothScroll() {
        const sidebar = document.querySelector('.admin-sidebar');
        let isScrolling = false;

        sidebar.addEventListener('scroll', () => {
            if (!isScrolling) {
                window.requestAnimationFrame(() => {
                    // 스크롤 위치에 따라 그림자 효과 조정
                    if (sidebar.scrollTop > 0) {
                        sidebar.style.boxShadow = 'inset 0 5px 5px -5px rgba(0,0,0,0.1)';
                    } else {
                        sidebar.style.boxShadow = 'none';
                    }
                    isScrolling = false;
                });
                isScrolling = true;
            }
        });
    }

    setupTouchGestures() {
        const sidebar = document.querySelector('.admin-sidebar');
        let touchStartX = 0;
        let touchStartY = 0;
        let currentX = 0;
        let isDragging = false;

        const handleTouchStart = (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            isDragging = true;
            sidebar.style.transition = 'none';
        };

        const handleTouchMove = (e) => {
            if (!isDragging) return;

            const touchCurrentX = e.touches[0].clientX;
            const touchCurrentY = e.touches[0].clientY;
            const deltaX = touchCurrentX - touchStartX;
            const deltaY = touchCurrentY - touchStartY;

            // 수평 스와이프가 수직 스와이프보다 큰 경우에만 처리
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                e.preventDefault();
                
                if (sidebar.classList.contains('show')) {
                    // 메뉴가 열려있을 때는 왼쪽으로만 드래그 가능
                    currentX = Math.min(0, deltaX);
                } else {
                    // 메뉴가 닫혀있을 때는 오른쪽으로만 드래그 가능
                    currentX = Math.max(-sidebar.offsetWidth, deltaX);
                }

                sidebar.style.transform = `translateX(${currentX}px)`;
            }
        };

        const handleTouchEnd = () => {
            if (!isDragging) return;
            isDragging = false;
            sidebar.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

            // 스와이프 방향에 따라 메뉴 열기/닫기
            if (Math.abs(currentX) > sidebar.offsetWidth / 3) {
                if (currentX > 0) {
                    this.toggleMenu(true);
                } else {
                    this.toggleMenu(false);
                }
            } else {
                // 원래 상태로 되돌리기
                sidebar.style.transform = sidebar.classList.contains('show') 
                    ? 'translateX(0)' 
                    : 'translateX(-100%)';
            }
        };

        // 터치 이벤트 리스너 등록
        sidebar.addEventListener('touchstart', handleTouchStart, { passive: true });
        sidebar.addEventListener('touchmove', handleTouchMove, { passive: false });
        sidebar.addEventListener('touchend', handleTouchEnd);
        sidebar.addEventListener('touchcancel', handleTouchEnd);
    }

    toggleMenu(show) {
        const sidebar = document.querySelector('.admin-sidebar');
        const toggleButton = document.querySelector('.menu-toggle');
        const overlay = document.querySelector('.sidebar-overlay');

        if (show) {
            sidebar.classList.add('show');
            overlay.classList.add('show');
            document.body.classList.add('menu-open');
            toggleButton.classList.add('active');
            toggleButton.innerHTML = '<i class="fas fa-times"></i>';
            toggleButton.setAttribute('aria-expanded', 'true');
        } else {
            sidebar.classList.remove('show');
            overlay.classList.remove('show');
            document.body.classList.remove('menu-open');
            toggleButton.classList.remove('active');
            toggleButton.innerHTML = '<i class="fas fa-bars"></i>';
            toggleButton.setAttribute('aria-expanded', 'false');
        }
    }
}

// 모바일 메뉴 토글 버튼 추가
const addMenuToggle = () => {
    const body = document.querySelector('.admin-body');
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    body.appendChild(overlay);

    const toggleButton = document.createElement('button');
    toggleButton.className = 'menu-toggle';
    toggleButton.innerHTML = '<i class="fas fa-bars"></i>';
    body.appendChild(toggleButton);

    // 터치 이벤트 시작 위치
    let touchStartX = 0;
    let touchStartY = 0;

    // 터치 이벤트 처리
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
        if (!touchStartX || !touchStartY) return;

        const touchEndX = e.touches[0].clientX;
        const touchEndY = e.touches[0].clientY;

        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        // 수평 스와이프가 수직 스와이프보다 큰 경우에만 처리
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX > 50 && touchStartX < 30) {
                // 왼쪽에서 오른쪽으로 스와이프
                toggleMenu(true);
            } else if (deltaX < -50) {
                // 오른쪽에서 왼쪽으로 스와이프
                toggleMenu(false);
            }
        }
    }, { passive: true });

    // 기존 toggleMenu 함수 개선
    const toggleMenu = (show) => {
        const sidebar = document.querySelector('.admin-sidebar');
        const toggleButton = document.querySelector('.menu-toggle');
        const overlay = document.querySelector('.sidebar-overlay');

        requestAnimationFrame(() => {
            if (show) {
                // 메뉴 열기 애니메이션
                sidebar.classList.add('show');
                overlay.classList.add('show');
                document.body.classList.add('menu-open');
                toggleButton.classList.add('active');
                toggleButton.innerHTML = '<i class="fas fa-times"></i>';
                toggleButton.setAttribute('aria-expanded', 'true');
                
                // 메뉴 아이템 순차적 애니메이션
                const menuItems = sidebar.querySelectorAll('.sidebar-menu li');
                menuItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, index * 50);
                });
            } else {
                // 메뉴 닫기 애니메이션
                sidebar.classList.remove('show');
                overlay.classList.remove('show');
                document.body.classList.remove('menu-open');
                toggleButton.classList.remove('active');
                toggleButton.innerHTML = '<i class="fas fa-bars"></i>';
                toggleButton.setAttribute('aria-expanded', 'false');

                // 메뉴 아이템 초기화
                const menuItems = sidebar.querySelectorAll('.sidebar-menu li');
                menuItems.forEach(item => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-20px)';
                });
            }
        });
    };

    toggleButton.addEventListener('click', () => {
        const sidebar = document.querySelector('.admin-sidebar');
        const isShowing = sidebar.classList.contains('show');
        toggleMenu(!isShowing);
    });

    overlay.addEventListener('click', () => {
        toggleMenu(false);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            toggleMenu(false);
        }
    });

    // 화면 크기 변경 시 메뉴 상태 초기화
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            toggleMenu(false);
        }
    });
};

// 모든 관리자 페이지에서 공통으로 실행
document.addEventListener('DOMContentLoaded', () => {
    new AdminCommon();
    if (window.innerWidth <= 768) {
        addMenuToggle();
    }
}); 