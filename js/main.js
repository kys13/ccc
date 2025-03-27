class MainNavigation {
    constructor() {
        this.initializeMobileMenu();
        this.setupEventListeners();
        this.setupTouchGestures();
        this.setupKeyboardNavigation();
        this.setupScrollLock();
        this.setupPerformanceOptimizations();
        this.setupMenuItems();
        this.setupLoadingState();
        this.setupGestures();
        this.setupSearchFilter();
        this.setupRecentItems();
        this.setupThemeToggle();
        this.setupNotifications();
        this.setupMenuSwipe();
    }

    initializeMobileMenu() {
        const nav = document.querySelector('.nav-wrapper');
        
        // 메뉴 토글 버튼 추가
        const toggleButton = document.createElement('button');
        toggleButton.className = 'menu-toggle';
        toggleButton.innerHTML = '<i class="fas fa-bars"></i>';
        nav.insertBefore(toggleButton, nav.firstChild);

        // 오버레이 추가
        const overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        document.body.appendChild(overlay);
    }

    setupEventListeners() {
        const menuToggle = document.querySelector('.menu-toggle');
        const mainMenu = document.querySelector('.main-menu');
        const overlay = document.querySelector('.menu-overlay');
        const dropdowns = document.querySelectorAll('.dropdown');

        menuToggle.addEventListener('click', () => {
            this.toggleMenu();
        });

        overlay.addEventListener('click', () => {
            this.closeMenu();
        });

        // 드롭다운 메뉴 처리 개선
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('a');
            const content = dropdown.querySelector('.dropdown-content');

            toggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const isActive = dropdown.classList.contains('active');

                    // 다른 모든 드롭다운 닫기
                    dropdowns.forEach(d => {
                        if (d !== dropdown) {
                            d.classList.remove('active');
                        }
                    });

                    // 현재 드롭다운 토글
                    dropdown.classList.toggle('active');

                    // 애니메이션을 위한 높이 계산
                    if (!isActive) {
                        content.style.maxHeight = content.scrollHeight + "px";
                    } else {
                        content.style.maxHeight = "0px";
                    }
                }
            });
        });

        // 화면 크기 변경 시 메뉴 초기화
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMenu();
            }
        });
    }

    toggleMenu(isOpen = true) {
        const mainMenu = document.querySelector('.main-menu');
        const overlay = document.querySelector('.menu-overlay');
        const menuToggle = document.querySelector('.menu-toggle');

        if (isOpen) {
            mainMenu.classList.add('show');
            overlay.classList.add('show');
            menuToggle.innerHTML = '<i class="fas fa-times"></i>';
            menuToggle.setAttribute('aria-expanded', 'true');
            this.lockScroll();
        } else {
            mainMenu.classList.remove('show');
            overlay.classList.remove('show');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            menuToggle.setAttribute('aria-expanded', 'false');
            this.unlockScroll();
        }
    }

    closeMenu() {
        const mainMenu = document.querySelector('.main-menu');
        const overlay = document.querySelector('.menu-overlay');
        const menuToggle = document.querySelector('.menu-toggle');

        mainMenu.classList.remove('show');
        overlay.classList.remove('show');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        menuToggle.setAttribute('aria-expanded', 'false');
        this.unlockScroll();
    }

    setupTouchGestures() {
        const mainMenu = document.querySelector('.main-menu');
        let touchStartX = 0;
        let touchStartY = 0;
        let currentX = 0;
        let isDragging = false;

        const handleTouchStart = (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            isDragging = true;
            mainMenu.style.transition = 'none';
        };

        const handleTouchMove = (e) => {
            if (!isDragging) return;

            const touchCurrentX = e.touches[0].clientX;
            const touchCurrentY = e.touches[0].clientY;
            const deltaX = touchCurrentX - touchStartX;
            const deltaY = touchCurrentY - touchStartY;

            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                e.preventDefault();
                
                if (mainMenu.classList.contains('show')) {
                    currentX = Math.min(0, deltaX);
                } else {
                    currentX = Math.max(-mainMenu.offsetWidth, deltaX);
                }

                mainMenu.style.transform = `translateX(${currentX}px)`;
            }
        };

        const handleTouchEnd = () => {
            if (!isDragging) return;
            isDragging = false;
            mainMenu.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

            if (Math.abs(currentX) > mainMenu.offsetWidth / 3) {
                if (currentX > 0) {
                    this.toggleMenu(true);
                } else {
                    this.toggleMenu(false);
                }
            } else {
                mainMenu.style.transform = mainMenu.classList.contains('show') 
                    ? 'translateX(0)' 
                    : 'translateX(-100%)';
            }
        };

        mainMenu.addEventListener('touchstart', handleTouchStart, { passive: true });
        mainMenu.addEventListener('touchmove', handleTouchMove, { passive: false });
        mainMenu.addEventListener('touchend', handleTouchEnd);
        mainMenu.addEventListener('touchcancel', handleTouchEnd);
    }

    setupKeyboardNavigation() {
        const mainMenu = document.querySelector('.main-menu');
        const menuItems = mainMenu.querySelectorAll('a');

        menuItems.forEach(item => {
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    item.click();
                }
            });
        });

        // ESC 키로 메뉴 닫기
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mainMenu.classList.contains('show')) {
                this.closeMenu();
            }
        });
    }

    setupScrollLock() {
        let scrollPosition = 0;

        const lockScroll = () => {
            scrollPosition = window.pageYOffset;
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollPosition}px`;
            document.body.style.width = '100%';
        };

        const unlockScroll = () => {
            document.body.style.removeProperty('overflow');
            document.body.style.removeProperty('position');
            document.body.style.removeProperty('top');
            document.body.style.removeProperty('width');
            window.scrollTo(0, scrollPosition);
        };

        // 메뉴 토글 시 스크롤 잠금/해제
        this.toggleMenu = (isOpen = true) => {
            const mainMenu = document.querySelector('.main-menu');
            const overlay = document.querySelector('.menu-overlay');
            const menuToggle = document.querySelector('.menu-toggle');

            if (isOpen) {
                mainMenu.classList.add('show');
                overlay.classList.add('show');
                menuToggle.innerHTML = '<i class="fas fa-times"></i>';
                menuToggle.setAttribute('aria-expanded', 'true');
                lockScroll();
            } else {
                mainMenu.classList.remove('show');
                overlay.classList.remove('show');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                menuToggle.setAttribute('aria-expanded', 'false');
                unlockScroll();
            }
        };
    }

    // 메뉴 아이템 활성화 상태 관리
    updateActiveMenuItem() {
        const currentPath = window.location.pathname;
        const menuItems = document.querySelectorAll('.main-menu a');

        menuItems.forEach(item => {
            const itemPath = item.getAttribute('href');
            if (currentPath.endsWith(itemPath)) {
                item.classList.add('active');
                item.setAttribute('aria-current', 'page');
            } else {
                item.classList.remove('active');
                item.removeAttribute('aria-current');
            }
        });
    }

    setupPerformanceOptimizations() {
        // 메뉴 요소들 캐싱
        this.mainMenu = document.querySelector('.main-menu');
        this.menuToggle = document.querySelector('.menu-toggle');
        this.overlay = document.querySelector('.menu-overlay');

        // Intersection Observer를 사용한 지연 로딩
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                }
            });
        });

        // 메뉴 내 이미지 지연 로딩
        this.mainMenu.querySelectorAll('img[data-src]').forEach(img => {
            observer.observe(img);
        });

        // 애니메이션 프레임 최적화
        let ticking = false;
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (Math.abs(window.scrollY - lastScrollY) > 50) {
                        this.closeMenu();
                    }
                    lastScrollY = window.scrollY;
                    ticking = false;
                });
                ticking = true;
            }
        });

        // 터치 이벤트 최적화
        this.mainMenu.addEventListener('touchstart', this.handleTouchStart, { passive: true });
        this.mainMenu.addEventListener('touchmove', this.handleTouchMove, { passive: false });

        // 메모리 누수 방지
        window.addEventListener('beforeunload', () => {
            observer.disconnect();
            this.cleanup();
        });
    }

    cleanup() {
        // 이벤트 리스너 제거
        this.mainMenu.removeEventListener('touchstart', this.handleTouchStart);
        this.mainMenu.removeEventListener('touchmove', this.handleTouchMove);
        this.menuToggle.removeEventListener('click', this.toggleMenu);
        this.overlay.removeEventListener('click', this.closeMenu);
    }

    setupMenuItems() {
        // 메뉴 아이템에 아이콘과 뱃지 추가
        const menuItems = this.mainMenu.querySelectorAll('.main-menu > li > a');
        
        menuItems.forEach(item => {
            // 아이콘 추가
            const icon = document.createElement('span');
            icon.className = 'menu-icon';
            icon.innerHTML = item.dataset.icon || '<i class="fas fa-circle"></i>';
            item.insertBefore(icon, item.firstChild);

            // 뱃지 추가 (있는 경우에만)
            if (item.dataset.badge) {
                const badge = document.createElement('span');
                badge.className = 'menu-badge';
                badge.textContent = item.dataset.badge;
                item.appendChild(badge);
            }
        });

        // 드롭다운 메뉴 접근성 개선
        const dropdowns = this.mainMenu.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const trigger = dropdown.querySelector('a');
            const content = dropdown.querySelector('.dropdown-content');
            
            trigger.setAttribute('role', 'button');
            trigger.setAttribute('aria-expanded', 'false');
            content.setAttribute('role', 'menu');
            
            content.querySelectorAll('a').forEach(item => {
                item.setAttribute('role', 'menuitem');
            });
        });
    }

    setupLoadingState() {
        // 동적 메뉴 아이템 로딩 처리
        const loadDynamicItems = async () => {
            try {
                const loadingEl = document.createElement('div');
                loadingEl.className = 'menu-loading';
                this.mainMenu.appendChild(loadingEl);

                // 여기에 실제 데이터 로딩 로직 추가
                await new Promise(resolve => setTimeout(resolve, 1000));

                loadingEl.remove();
            } catch (error) {
                console.error('메뉴 아이템 로딩 실패:', error);
            }
        };

        // 필요한 경우에만 동적 로딩 실행
        if (this.mainMenu.dataset.dynamicLoad) {
            loadDynamicItems();
        }
    }

    setupGestures() {
        let mc = new Hammer(this.mainMenu);
        
        // 스와이프 제스처 설정
        mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));

        mc.on('panright panleft', (ev) => {
            const threshold = this.mainMenu.offsetWidth / 3;
            
            if (ev.type === 'panright' && ev.distance > threshold) {
                this.toggleMenu(true);
            } else if (ev.type === 'panleft' && ev.distance > threshold) {
                this.toggleMenu(false);
            }
        });
    }

    setupSearchFilter() {
        const searchInput = document.createElement('input');
        searchInput.type = 'search';
        searchInput.className = 'menu-search';
        searchInput.placeholder = '메뉴 검색...';
        
        this.mainMenu.insertBefore(searchInput, this.mainMenu.firstChild);

        // 디바운스 적용
        let timeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                this.filterMenuItems(e.target.value);
            }, 300);
        });
    }

    filterMenuItems(query) {
        const menuItems = this.mainMenu.querySelectorAll('li a');
        const normalizedQuery = query.toLowerCase();

        menuItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            const li = item.closest('li');
            
            if (text.includes(normalizedQuery)) {
                li.style.display = '';
                this.highlightText(item, normalizedQuery);
            } else {
                li.style.display = 'none';
            }
        });
    }

    highlightText(element, query) {
        const text = element.textContent;
        const regex = new RegExp(`(${query})`, 'gi');
        element.innerHTML = text.replace(regex, '<mark>$1</mark>');
    }

    setupRecentItems() {
        // 최근 방문한 메뉴 아이템 저장
        const menuItems = this.mainMenu.querySelectorAll('a');
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                const recentItems = JSON.parse(localStorage.getItem('recentMenuItems') || '[]');
                const newItem = {
                    href: item.href,
                    text: item.textContent,
                    timestamp: Date.now()
                };

                const updatedItems = [newItem, ...recentItems.filter(i => i.href !== item.href)]
                    .slice(0, 5);
                
                localStorage.setItem('recentMenuItems', JSON.stringify(updatedItems));
            });
        });

        // 최근 방문 메뉴 표시
        this.showRecentItems();
    }

    showRecentItems() {
        const recentItems = JSON.parse(localStorage.getItem('recentMenuItems') || '[]');
        if (recentItems.length === 0) return;

        const recentSection = document.createElement('div');
        recentSection.className = 'recent-menu-items';
        recentSection.innerHTML = `
            <h3>최근 방문</h3>
            <ul>
                ${recentItems.map(item => `
                    <li>
                        <a href="${item.href}">
                            <span class="menu-icon"><i class="fas fa-history"></i></span>
                            <span>${item.text}</span>
                        </a>
                    </li>
                `).join('')}
            </ul>
        `;

        this.mainMenu.insertBefore(recentSection, this.mainMenu.firstChild);
    }

    setupThemeToggle() {
        const themeToggle = document.createElement('div');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = `
            <button class="theme-button">
                <i class="fas fa-sun"></i>
                <span>다크 모드</span>
                <div class="toggle-switch">
                    <input type="checkbox" id="themeSwitch">
                    <label for="themeSwitch"></label>
                </div>
            </button>
        `;

        this.mainMenu.appendChild(themeToggle);

        const themeSwitch = themeToggle.querySelector('#themeSwitch');
        themeSwitch.checked = localStorage.getItem('darkMode') === 'true';
        document.body.classList.toggle('dark-mode', themeSwitch.checked);

        themeSwitch.addEventListener('change', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', themeSwitch.checked);
        });
    }

    setupNotifications() {
        const notificationBadge = document.createElement('span');
        notificationBadge.className = 'notification-badge';
        this.menuToggle.appendChild(notificationBadge);

        // 알림 수 업데이트 (예시)
        this.updateNotificationCount(3);
    }

    updateNotificationCount(count) {
        const badge = this.menuToggle.querySelector('.notification-badge');
        if (count > 0) {
            badge.textContent = count > 99 ? '99+' : count;
            badge.classList.add('show');
        } else {
            badge.classList.remove('show');
        }
    }

    setupMenuSwipe() {
        let startX, startY, moveX, moveY;
        const swipeThreshold = 50;
        const menu = this.mainMenu;

        const handleStart = (e) => {
            const touch = e.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
            moveX = moveY = 0;

            menu.style.transition = 'none';
            document.addEventListener('touchmove', handleMove, { passive: false });
        };

        const handleMove = (e) => {
            if (!startX || !startY) return;

            const touch = e.touches[0];
            moveX = touch.clientX - startX;
            moveY = touch.clientY - startY;

            // 수평 스와이프가 수직보다 큰 경우에만 처리
            if (Math.abs(moveX) > Math.abs(moveY)) {
                e.preventDefault();
                const isOpen = menu.classList.contains('show');
                const maxMove = isOpen ? menu.offsetWidth : 0;
                const currentMove = Math.max(-menu.offsetWidth, Math.min(moveX, maxMove));
                
                menu.style.transform = `translateX(${currentMove}px)`;
            }
        };

        const handleEnd = () => {
            menu.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            
            if (Math.abs(moveX) > swipeThreshold) {
                if (moveX > 0) {
                    this.toggleMenu(true);
                } else {
                    this.toggleMenu(false);
                }
            } else {
                menu.style.transform = menu.classList.contains('show') 
                    ? 'translateX(0)' 
                    : 'translateX(-100%)';
            }

            startX = startY = moveX = moveY = null;
            document.removeEventListener('touchmove', handleMove);
        };

        menu.addEventListener('touchstart', handleStart);
        menu.addEventListener('touchend', handleEnd);
        menu.addEventListener('touchcancel', handleEnd);
    }
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    new MainNavigation();

    // 현재 페이지 URL에 따라 네비게이션 메뉴 활성화
    const path = window.location.pathname;
    const mainMenu = document.querySelector('.main-menu');

    if (mainMenu) {
        const menuItems = mainMenu.querySelectorAll('a');
        menuItems.forEach(item => {
            // 방문/배송 메인 메뉴 활성화
            if (path.includes('/visit') && item.href.includes('/visit')) {
                item.classList.add('active');
            } else if (path.includes('/delivery') && item.href.includes('/delivery')) {
                item.classList.add('active');
            }

            // 드롭다운 메뉴 항목 활성화
            if (item.href === window.location.href) {
                item.classList.add('active');
                // 부모 메뉴도 활성화
                const parentDropdown = item.closest('.dropdown');
                if (parentDropdown) {
                    parentDropdown.querySelector('a').classList.add('active');
                }
            }
        });
    }
}); 