class UserManager {
    constructor() {
        this.users = [];
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.initializeEventListeners();
        this.loadUsers();
    }

    initializeEventListeners() {
        // 필터 이벤트
        document.getElementById('statusFilter').addEventListener('change', () => this.filterUsers());
        document.getElementById('sourceFilter').addEventListener('change', () => this.filterUsers());
        document.getElementById('sortFilter').addEventListener('change', () => this.sortUsers());
        
        // 검색 이벤트
        document.getElementById('userSearch').addEventListener('input', 
            this.debounce(() => this.searchUsers(), 300)
        );

        // 전체 선택 체크박스
        document.getElementById('selectAll').addEventListener('change', (e) => {
            const checkboxes = document.querySelectorAll('.user-checkbox');
            checkboxes.forEach(checkbox => checkbox.checked = e.target.checked);
        });
    }

    async loadUsers() {
        try {
            const response = await fetch('/api/admin/users');
            this.users = await response.json();
            this.renderUsers();
        } catch (error) {
            console.error('회원 목록 로딩 실패:', error);
            this.showError('회원 목록을 불러오는데 실패했습니다.');
        }
    }

    renderUsers() {
        const tbody = document.getElementById('userTableBody');
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        
        tbody.innerHTML = this.users.slice(start, end).map(user => `
            <tr>
                <td>
                    <input type="checkbox" class="user-checkbox" value="${user.id}">
                </td>
                <td>
                    <div class="user-info">
                        <img src="${user.avatar}" alt="프로필" class="user-avatar">
                        <div class="user-details">
                            <span class="user-name">${user.name}</span>
                            <span class="user-email">${user.email}</span>
                        </div>
                    </div>
                </td>
                <td>${this.formatDate(user.joinDate)}</td>
                <td>${this.getSourceText(user.source)}</td>
                <td>${user.campaigns}회</td>
                <td>${user.reviews}개</td>
                <td>
                    <span class="user-status ${user.status}">${this.getStatusText(user.status)}</span>
                </td>
                <td>
                    <div class="action-menu">
                        <button class="action-button">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                        <div class="action-dropdown">
                            <div class="action-item" onclick="userManager.viewUserDetail(${user.id})">
                                <i class="fas fa-user"></i>상세 정보
                            </div>
                            <div class="action-item" onclick="userManager.editUser(${user.id})">
                                <i class="fas fa-edit"></i>정보 수정
                            </div>
                            <div class="action-item" onclick="userManager.sendMessage(${user.id})">
                                <i class="fas fa-envelope"></i>메시지 전송
                            </div>
                            ${user.status === 'active' ? `
                                <div class="action-item danger" onclick="userManager.suspendUser(${user.id})">
                                    <i class="fas fa-ban"></i>계정 정지
                                </div>
                            ` : `
                                <div class="action-item" onclick="userManager.activateUser(${user.id})">
                                    <i class="fas fa-check"></i>계정 활성화
                                </div>
                            `}
                        </div>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    // ... 나머지 메서드들은 campaigns.js와 유사하게 구현
}

// 전역 사용자 매니저 초기화
const userManager = new UserManager(); 