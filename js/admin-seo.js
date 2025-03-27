class AdminSEO {
    constructor() {
        this.initializeCounters();
        this.initializeImagePreview();
        this.initializeSitemap();
        this.initializeRedirects();
        this.setupEventListeners();
    }

    initializeCounters() {
        // 메타 태그 문자 수 카운터
        const metaTitle = document.getElementById('meta-title');
        const metaDescription = document.getElementById('meta-description');

        this.setupCounter(metaTitle, 60);
        this.setupCounter(metaDescription, 160);
    }

    setupCounter(element, limit) {
        const counter = element.nextElementSibling;
        
        element.addEventListener('input', () => {
            const count = element.value.length;
            counter.textContent = `${count}/${limit}`;
            
            if (count > limit) {
                counter.style.color = 'red';
            } else {
                counter.style.color = '#666';
            }
        });
    }

    initializeImagePreview() {
        const imageInput = document.getElementById('og-image');
        const preview = document.querySelector('.image-preview');

        imageInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    initializeSitemap() {
        const generateBtn = document.getElementById('generate-sitemap');
        const downloadBtn = document.getElementById('download-sitemap');
        
        generateBtn.addEventListener('click', () => this.generateSitemap());
        downloadBtn.addEventListener('click', () => this.downloadSitemap());
    }

    async generateSitemap() {
        try {
            // 실제 구현에서는 서버에서 사이트맵을 생성
            const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://example.com/</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>1.0</priority>
    </url>
    <!-- 추가 URL들 -->
</urlset>`;

            document.getElementById('sitemap-content').textContent = sitemap;
        } catch (error) {
            console.error('사이트맵 생성 실패:', error);
            alert('사이트맵 생성 중 오류가 발생했습니다.');
        }
    }

    downloadSitemap() {
        const sitemap = document.getElementById('sitemap-content').textContent;
        const blob = new Blob([sitemap], { type: 'text/xml' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sitemap.xml';
        a.click();
        window.URL.revokeObjectURL(url);
    }

    initializeRedirects() {
        const addRedirectBtn = document.getElementById('add-redirect');
        const redirectsList = document.getElementById('redirects-list');

        addRedirectBtn.addEventListener('click', () => {
            const redirectRow = document.createElement('div');
            redirectRow.className = 'redirect-row';
            redirectRow.innerHTML = `
                <input type="text" placeholder="이전 URL" class="old-url">
                <input type="text" placeholder="새 URL" class="new-url">
                <button class="remove-redirect"><i class="fas fa-times"></i></button>
            `;
            redirectsList.appendChild(redirectRow);
        });

        redirectsList.addEventListener('click', (e) => {
            if (e.target.closest('.remove-redirect')) {
                e.target.closest('.redirect-row').remove();
            }
        });
    }

    setupEventListeners() {
        // 폼 제출 이벤트
        document.querySelector('.meta-tags-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveSEOSettings();
        });
    }

    async saveSEOSettings() {
        try {
            const settings = {
                metaTitle: document.getElementById('meta-title').value,
                metaDescription: document.getElementById('meta-description').value,
                metaKeywords: document.getElementById('meta-keywords').value,
                ogTitle: document.getElementById('og-title').value,
                ogDescription: document.getElementById('og-description').value,
                // 추가 설정들...
            };

            // 실제 구현에서는 서버로 설정을 저장
            console.log('SEO 설정 저장:', settings);
            alert('SEO 설정이 저장되었습니다.');
        } catch (error) {
            console.error('SEO 설정 저장 실패:', error);
            alert('설정 저장 중 오류가 발생했습니다.');
        }
    }
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    new AdminSEO();
}); 