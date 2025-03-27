class Auth {
    constructor() {
        this.token = localStorage.getItem('token');
        this.user = JSON.parse(localStorage.getItem('user'));
        this.initializeAuthState();
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // 로그인 폼
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // 회원가입 폼
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
            
            // 전체 동의 체크박스
            const agreeAll = document.getElementById('agreeAll');
            if (agreeAll) {
                agreeAll.addEventListener('change', (e) => this.handleAgreeAll(e));
            }
        }

        // 소셜 로그인 버튼들
        const kakaoBtn = document.querySelector('.kakao');
        if (kakaoBtn) {
            kakaoBtn.addEventListener('click', () => this.handleSocialLogin('kakao'));
        }

        const naverBtn = document.querySelector('.naver');
        if (naverBtn) {
            naverBtn.addEventListener('click', () => this.handleSocialLogin('naver'));
        }
    }

    initializeAuthState() {
        const authElements = document.querySelectorAll('.nav-auth');
        authElements.forEach(element => {
            if (this.isLoggedIn()) {
                element.innerHTML = `
                    <div class="user-menu">
                        <span class="username">${this.user.name}</span>
                        <button class="logout-btn">로그아웃</button>
                    </div>
                `;
                const logoutBtn = element.querySelector('.logout-btn');
                logoutBtn.addEventListener('click', () => this.logout());
            } else {
                element.innerHTML = `
                    <a href="/pages/login.html" class="login-btn">로그인</a>
                    <a href="/pages/register.html" class="register-btn">회원가입</a>
                `;
            }
        });
    }

    isLoggedIn() {
        return !!this.token;
    }

    async handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;

        try {
            const response = await this.login(email, password);
            if (response.success) {
                if (remember) {
                    localStorage.setItem('token', response.token);
                } else {
                    sessionStorage.setItem('token', response.token);
                }
                window.location.href = '/';
            }
        } catch (error) {
            alert('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
        }
    }

    async handleRegister(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('passwordConfirm').value;
        const nickname = document.getElementById('nickname').value;

        if (password !== passwordConfirm) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            const response = await this.registerUser(email, password, nickname);
            if (response.success) {
                alert('회원가입이 완료되었습니다.');
                window.location.href = '/pages/login.html';
            }
        } catch (error) {
            alert('회원가입에 실패했습니다. 다시 시도해주세요.');
        }
    }

    handleAgreeAll(e) {
        const checkboxes = document.querySelectorAll('.form-agreements input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = e.target.checked;
        });
    }

    handleSocialLogin(provider) {
        // 소셜 로그인 구현
        console.log(`${provider} 로그인 시도`);
    }

    async login(email, password) {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            
            if (data.success) {
                this.setAuthData(data.token, data.user);
                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: '로그인 중 오류가 발생했습니다.' };
        }
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
    }

    setAuthData(token, user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.token = token;
        this.user = user;
        this.initializeAuthState();
    }

    getAuthHeader() {
        return this.token ? { 'Authorization': `Bearer ${this.token}` } : {};
    }

    async registerUser(email, password, nickname) {
        // API 호출 구현
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true
                });
            }, 1000);
        });
    }

    isAdmin() {
        return this.user && this.user.role === 'admin';
    }

    checkAdminAccess() {
        if (!this.isLoggedIn()) {
            window.location.href = '/pages/login.html?redirect=' + encodeURIComponent(window.location.pathname);
            return false;
        }
        if (!this.isAdmin()) {
            alert('관리자 권한이 필요합니다.');
            window.location.href = '/';
            return false;
        }
        return true;
    }
}

// 인증 클래스 초기화
document.addEventListener('DOMContentLoaded', () => {
    new Auth();
}); 