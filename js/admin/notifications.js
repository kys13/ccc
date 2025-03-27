class NotificationManager {
    constructor() {
        this.initializeElements();
        this.setupEventListeners();
        this.loadNotifications();
    }

    initializeElements() {
        this.elements = {
            // 탭 관련 요소
            tabs: document.querySelectorAll('.tab-button'),
            tabContents: document.querySelectorAll('.tab-content'),
            
            // 푸시 알림 관련 요소
            scheduledNotifications: document.getElementById('scheduledNotifications'),
            autoNotifToggles: {
                newCampaign: document.getElementById('newCampaignNotif'),
                review: document.getElementById('reviewNotif'),
                deadline: document.getElementById('deadlineNotif')
            },
            
            // 발송 이력 관련 요소
            typeFilter: document.getElementById('typeFilter'),
            statusFilter: document.getElementById('statusFilter'),
            historySearch: document.getElementById('historySearch'),
            historyList: document.getElementById('historyList'),
            historyPagination: document.getElementById('historyPagination')
        };

        this.currentPage = 1;
        this.itemsPerPage = 10;
    }

    setupEventListeners() {
        // 탭 전환
        this.elements.tabs.forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
        });

        // 자동 알림 토글 변경
        Object.entries(this.elements.autoNotifToggles).forEach(([key, element]) => {
            element.addEventListener('change', () => this.updateAutoNotification(key, element.checked));
        });

        // 발송 이력 필터링
        this.elements.typeFilter.addEventListener('change', () => this.filterHistory());
        this.elements.statusFilter.addEventListener('change', () => this.filterHistory());
        this.elements.historySearch.addEventListener('input', () => this.filterHistory());
    }

    async loadNotifications() {
        try {
            const [scheduledData, settingsData, historyData] = await Promise.all([
                this.fetchScheduledNotifications(),
                this.fetchNotificationSettings(),
                this.fetchNotificationHistory()
            ]);

            this.updateScheduledNotifications(scheduledData);
            this.updateNotificationSettings(settingsData);
            this.updateNotificationHistory(historyData);
        } catch (error) {
            console.error('알림 데이터 로딩 실패:', error);
            this.showError('알림 데이터를 불러오는데 실패했습니다.');
        }
    }

    switchTab(tabId) {
        this.elements.tabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabId);
        });

        this.elements.tabContents.forEach(content => {
            content.classList.toggle('active', content.id === `${tabId}Tab`);
        });
    }

    updateScheduledNotifications(notifications) {
        this.elements.scheduledNotifications.innerHTML = notifications.map(notif => `
            <div class="scheduled-item">
                <div class="scheduled-header">
                    <div class="scheduled-title">${notif.title}</div>
                    <div class="scheduled-time">${this.formatDateTime(notif.scheduledTime)}</div>
                </div>
                <p>${notif.content}</p>
                <div class="scheduled-actions">
                    <button class="btn btn-secondary btn-sm" onclick="notificationManager.editScheduledNotification('${notif.id}')">
                        수정
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="notificationManager.deleteScheduledNotification('${notif.id}')">
                        삭제
                    </button>
                </div>
            </div>
        `).join('');
    }

    updateNotificationSettings(settings) {
        Object.entries(this.elements.autoNotifToggles).forEach(([key, element]) => {
            element.checked = settings[key];
        });
    }

    updateNotificationHistory(data) {
        this.elements.historyList.innerHTML = data.items.map(item => `
            <tr>
                <td>${this.formatDateTime(item.sentTime)}</td>
                <td>${this.getNotificationTypeText(item.type)}</td>
                <td>${item.title}</td>
                <td>${item.target}</td>
                <td>
                    <span class="status-badge status-${item.status}">
                        ${this.getStatusText(item.status)}
                    </span>
                </td>
                <td>${item.openRate}%</td>
            </tr>
        `).join('');

        this.updatePagination(data.total);
    }

    async updateAutoNotification(key, enabled) {
        try {
            const response = await fetch('/api/admin/notifications/settings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type: key,
                    enabled: enabled
                })
            });

            if (response.ok) {
                this.showSuccess('설정이 저장되었습니다.');
            }
        } catch (error) {
            console.error('알림 설정 업데이트 실패:', error);
            this.showError('설정 저장에 실패했습니다.');
            // 토글 상태 복구
            this.elements.autoNotifToggles[key].checked = !enabled;
        }
    }

    async editScheduledNotification(id) {
        // 알림 수정 모달 구현
    }

    async deleteScheduledNotification(id) {
        if (!confirm('예약된 알림을 삭제하시겠습니까?')) return;

        try {
            const response = await fetch(`/api/admin/notifications/scheduled/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                this.showSuccess('알림이 삭제되었습니다.');
                await this.loadNotifications();
            }
        } catch (error) {
            console.error('알림 삭제 실패:', error);
            this.showError('알림 삭제에 실패했습니다.');
        }
    }

    async filterHistory() {
        const type = this.elements.typeFilter.value;
        const status = this.elements.statusFilter.value;
        const search = this.elements.historySearch.value;

        try {
            const response = await fetch(`/api/admin/notifications/history?type=${type}&status=${status}&search=${search}&page=${this.currentPage}`);
            const data = await response.json();
            this.updateNotificationHistory(data);
        } catch (error) {
            console.error('발송 이력 필터링 실패:', error);
            this.showError('발송 이력 조회에 실패했습니다.');
        }
    }

    updatePagination(total) {
        const totalPages = Math.ceil(total / this.itemsPerPage);
        this.elements.historyPagination.innerHTML = this.generatePaginationHTML(totalPages);
    }

    generatePaginationHTML(totalPages) {
        // 페이지네이션 HTML 생성 로직
    }

    formatDateTime(dateString) {
        return new Date(dateString).toLocaleString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    getNotificationTypeText(type) {
        const typeMap = {
            push: '푸시',
            email: '이메일'
        };
        return typeMap[type] || type;
    }

    getStatusText(status) {
        const statusMap = {
            success: '성공',
            failed: '실패'
        };
        return statusMap[status] || status;
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
    window.notificationManager = new NotificationManager();
}); 