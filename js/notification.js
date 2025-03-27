class NotificationSystem {
    constructor() {
        this.notifications = [];
        this.unreadCount = 0;
        this.initializeNotifications();
    }

    initializeNotifications() {
        this.createNotificationIcon();
        this.loadNotifications();
        this.setupWebSocket();
        
        // 알림 아이콘 클릭 이벤트
        document.querySelector('.notification-icon').addEventListener('click', () => {
            this.toggleNotificationPanel();
        });
    }

    createNotificationIcon() {
        const nav = document.querySelector('.nav-right');
        const notificationIcon = document.createElement('div');
        notificationIcon.className = 'notification-icon';
        notificationIcon.innerHTML = `
            <i class="fas fa-bell"></i>
            <span class="notification-badge">0</span>
        `;
        nav.appendChild(notificationIcon);
    }

    setupWebSocket() {
        // WebSocket 연결 설정
        this.ws = new WebSocket('ws://your-websocket-server');
        
        this.ws.onmessage = (event) => {
            const notification = JSON.parse(event.data);
            this.addNotification(notification);
        };
    }

    async loadNotifications() {
        try {
            const response = await fetch('/api/notifications');
            const data = await response.json();
            this.notifications = data;
            this.updateUnreadCount();
            this.renderNotifications();
        } catch (error) {
            console.error('알림을 불러오는데 실패했습니다:', error);
        }
    }

    addNotification(notification) {
        this.notifications.unshift(notification);
        this.unreadCount++;
        this.updateUnreadCount();
        this.renderNotifications();
        this.showToast(notification.message);
    }

    toggleNotificationPanel() {
        let panel = document.querySelector('.notification-panel');
        if (!panel) {
            panel = this.createNotificationPanel();
            document.body.appendChild(panel);
        } else {
            panel.classList.toggle('show');
        }
    }

    createNotificationPanel() {
        const panel = document.createElement('div');
        panel.className = 'notification-panel show';
        panel.innerHTML = `
            <div class="notification-header">
                <h3>알림</h3>
                <button class="mark-all-read">모두 읽음 표시</button>
            </div>
            <div class="notification-list">
                ${this.renderNotificationItems()}
            </div>
        `;

        panel.querySelector('.mark-all-read').addEventListener('click', () => {
            this.markAllAsRead();
        });

        return panel;
    }

    renderNotificationItems() {
        return this.notifications.map(notification => `
            <div class="notification-item ${notification.read ? '' : 'unread'}">
                <div class="notification-content">
                    <div class="notification-title">${notification.title}</div>
                    <div class="notification-message">${notification.message}</div>
                    <div class="notification-time">${this.formatTime(notification.time)}</div>
                </div>
                ${!notification.read ? `
                    <button class="mark-read" data-id="${notification.id}">
                        <i class="fas fa-check"></i>
                    </button>
                ` : ''}
            </div>
        `).join('');
    }

    updateUnreadCount() {
        const badge = document.querySelector('.notification-badge');
        badge.textContent = this.unreadCount;
        badge.style.display = this.unreadCount > 0 ? 'block' : 'none';
    }

    async markAsRead(notificationId) {
        try {
            await fetch(`/api/notifications/${notificationId}/read`, {
                method: 'PUT'
            });
            
            const notification = this.notifications.find(n => n.id === notificationId);
            if (notification && !notification.read) {
                notification.read = true;
                this.unreadCount--;
                this.updateUnreadCount();
                this.renderNotifications();
            }
        } catch (error) {
            console.error('알림 읽음 처리에 실패했습니다:', error);
        }
    }

    async markAllAsRead() {
        try {
            await fetch('/api/notifications/read-all', {
                method: 'PUT'
            });
            
            this.notifications.forEach(n => n.read = true);
            this.unreadCount = 0;
            this.updateUnreadCount();
            this.renderNotifications();
        } catch (error) {
            console.error('전체 읽음 처리에 실패했습니다:', error);
        }
    }

    formatTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        
        if (diff < 60000) return '방금 전';
        if (diff < 3600000) return `${Math.floor(diff/60000)}분 전`;
        if (diff < 86400000) return `${Math.floor(diff/3600000)}시간 전`;
        return date.toLocaleDateString();
    }

    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast notification-toast';
        toast.innerHTML = `
            <i class="fas fa-bell"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
}

// 전역 알림 시스템 초기화
const notificationSystem = new NotificationSystem(); 
