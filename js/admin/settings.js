class SettingsManager {
    constructor() {
        this.initializeElements();
        this.setupEventListeners();
        this.loadSettings();
    }

    initializeElements() {
        this.elements = {
            // 사이트 설정 폼
            siteSettingsForm: document.getElementById('siteSettingsForm'),
            siteName: document.getElementById('siteName'),
            siteDescription: document.getElementById('siteDescription'),
            logoFile: document.getElementById('logoFile'),
            currentLogo: document.getElementById('currentLogo'),

            // 역할 관리
            roleList: document.getElementById('roleList'),
            addRoleBtn: document.getElementById('addRoleBtn'),

            // 결제 설정 폼
            paymentSettingsForm: document.getElementById('paymentSettingsForm'),
            paymentGateway: document.getElementById('paymentGateway'),
            merchantId: document.getElementById('merchantId'),
            apiKey: document.getElementById('apiKey'),
            secretKey: document.getElementById('secretKey'),

            // API 키 관리
            apiKeyList: document.getElementById('apiKeyList'),
            generateApiKey: document.getElementById('generateApiKey'),

            // 백업/복원
            createBackup: document.getElementById('createBackup'),
            restoreBackup: document.getElementById('restoreBackup'),
            backupHistory: document.getElementById('backupHistory')
        };
    }

    setupEventListeners() {
        // 사이트 설정 저장
        this.elements.siteSettingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveSiteSettings();
        });

        // 로고 파일 변경
        this.elements.logoFile.addEventListener('change', (e) => {
            this.handleLogoUpload(e.target.files[0]);
        });

        // 역할 추가
        this.elements.addRoleBtn.addEventListener('click', () => this.showAddRoleModal());

        // 결제 설정 저장
        this.elements.paymentSettingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.savePaymentSettings();
        });

        // API 키 생성
        this.elements.generateApiKey.addEventListener('click', () => this.generateNewApiKey());

        // 백업 관련
        this.elements.createBackup.addEventListener('click', () => this.createBackup());
        this.elements.restoreBackup.addEventListener('click', () => this.showRestoreBackupModal());
    }

    async loadSettings() {
        try {
            const [siteData, rolesData, paymentData, apiKeysData, backupsData] = await Promise.all([
                this.fetchSiteSettings(),
                this.fetchRoles(),
                this.fetchPaymentSettings(),
                this.fetchApiKeys(),
                this.fetchBackups()
            ]);

            this.updateSiteSettings(siteData);
            this.updateRolesList(rolesData);
            this.updatePaymentSettings(paymentData);
            this.updateApiKeysList(apiKeysData);
            this.updateBackupHistory(backupsData);
        } catch (error) {
            console.error('설정 로딩 실패:', error);
            this.showError('설정을 불러오는데 실패했습니다.');
        }
    }

    async saveSiteSettings() {
        const formData = new FormData(this.elements.siteSettingsForm);
        
        try {
            const response = await fetch('/api/admin/settings/site', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                this.showSuccess('사이트 설정이 저장되었습니다.');
            }
        } catch (error) {
            console.error('사이트 설정 저장 실패:', error);
            this.showError('사이트 설정 저장에 실패했습니다.');
        }
    }

    async handleLogoUpload(file) {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            this.elements.currentLogo.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    updateRolesList(roles) {
        this.elements.roleList.innerHTML = roles.map(role => `
            <div class="role-item">
                <div class="role-info">
                    <div class="role-name">${role.name}</div>
                    <div class="role-description">${role.description}</div>
                </div>
                <div class="role-actions">
                    <button class="btn btn-secondary btn-sm" onclick="settingsManager.editRole('${role.id}')">
                        수정
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="settingsManager.deleteRole('${role.id}')">
                        삭제
                    </button>
                </div>
                <div class="role-permissions">
                    ${role.permissions.map(perm => `
                        <div class="permission-item">
                            <input type="checkbox" id="perm_${role.id}_${perm.id}" 
                                ${perm.enabled ? 'checked' : ''}>
                            <label for="perm_${role.id}_${perm.id}">${perm.name}</label>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    updateApiKeysList(apiKeys) {
        this.elements.apiKeyList.innerHTML = apiKeys.map(key => `
            <div class="api-key-item">
                <div class="api-key-header">
                    <div class="api-key-name">${key.name}</div>
                    <button class="btn btn-danger btn-sm" onclick="settingsManager.revokeApiKey('${key.id}')">
                        삭제
                    </button>
                </div>
                <div class="api-key-value">${key.key}</div>
                <div class="api-key-info">
                    생성일: ${this.formatDate(key.createdAt)}
                    · 마지막 사용: ${this.formatDate(key.lastUsed)}
                </div>
            </div>
        `).join('');
    }

    updateBackupHistory(backups) {
        this.elements.backupHistory.innerHTML = backups.map(backup => `
            <div class="backup-item">
                <div class="backup-info">
                    <div class="backup-date">${this.formatDate(backup.createdAt)}</div>
                    <div class="backup-size">${this.formatSize(backup.size)}</div>
                </div>
                <div class="backup-actions">
                    <button class="btn btn-secondary btn-sm" onclick="settingsManager.downloadBackup('${backup.id}')">
                        다운로드
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="settingsManager.deleteBackup('${backup.id}')">
                        삭제
                    </button>
                </div>
            </div>
        `).join('');
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    formatSize(bytes) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        if (bytes === 0) return '0 Byte';
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
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
    window.settingsManager = new SettingsManager();
}); 