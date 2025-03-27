class AdminNavigation {
    constructor() {
        this.initializeNavigation();
        this.updateUserInfo();
    }

    initializeNavigation() {
        const currentPath = window.location.pathname;
        const menuItems = document.querySelectorAll('.admin-nav a');
        
        menuItems.forEach(item => {
            if (item.getAttribute('href') === currentPath) {
                item.classList.add('active');
            }
        });
    }

    updateUserInfo() {
        const userInfo = document.querySelector('.user-info');
        if (window.auth.user) {
            userInfo.innerHTML = `
                <span class="user-name">${window.auth.user.name}</span>
                <button class="logout-btn" onclick="window.auth.logout()">로그아웃</button>
            `;
        }
    }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    new AdminNavigation();
}); 