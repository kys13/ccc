class CampaignStatistics {
    constructor() {
        this.initializeElements();
        this.setupDateRangePicker();
        this.setupEventListeners();
        this.initializeCharts();
        this.loadStatistics();
    }

    initializeElements() {
        this.elements = {
            dateRange: document.getElementById('dateRange'),
            exportButton: document.getElementById('exportStats'),
            totalCampaigns: document.getElementById('totalCampaigns'),
            totalApplicants: document.getElementById('totalApplicants'),
            completionRate: document.getElementById('completionRate'),
            avgRating: document.getElementById('avgRating'),
            topCampaigns: document.getElementById('topCampaigns')
        };

        this.charts = {
            status: document.getElementById('campaignStatusChart'),
            category: document.getElementById('categoryDistributionChart'),
            trend: document.getElementById('applicantTrendChart'),
            rating: document.getElementById('ratingDistributionChart')
        };
    }

    setupDateRangePicker() {
        const endDate = moment();
        const startDate = moment().subtract(30, 'days');

        $(this.elements.dateRange).daterangepicker({
            startDate: startDate,
            endDate: endDate,
            ranges: {
                '오늘': [moment(), moment()],
                '어제': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                '지난 7일': [moment().subtract(6, 'days'), moment()],
                '지난 30일': [moment().subtract(29, 'days'), moment()],
                '이번 달': [moment().startOf('month'), moment().endOf('month')],
                '지난 달': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            },
            locale: {
                format: 'YYYY-MM-DD',
                applyLabel: '적용',
                cancelLabel: '취소',
                customRangeLabel: '직접 선택'
            }
        }, (start, end) => {
            this.loadStatistics(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'));
        });
    }

    setupEventListeners() {
        this.elements.exportButton.addEventListener('click', () => this.exportStatistics());
    }

    initializeCharts() {
        // 캠페인 현황 차트
        this.statusChart = new Chart(this.charts.status, {
            type: 'doughnut',
            data: {
                labels: ['진행중', '대기중', '완료'],
                datasets: [{
                    data: [0, 0, 0],
                    backgroundColor: ['#4a9eff', '#f39c12', '#2ecc71']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });

        // 카테고리별 분포 차트
        this.categoryChart = new Chart(this.charts.category, {
            type: 'bar',
            data: {
                labels: ['맛집', '카페', '뷰티', '패션'],
                datasets: [{
                    label: '캠페인 수',
                    data: [0, 0, 0, 0],
                    backgroundColor: '#4a9eff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });

        // 월별 신청자 추이 차트
        this.trendChart = new Chart(this.charts.trend, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: '신청자 수',
                    data: [],
                    borderColor: '#4a9eff',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });

        // 평점 분포 차트
        this.ratingChart = new Chart(this.charts.rating, {
            type: 'bar',
            data: {
                labels: ['1점', '2점', '3점', '4점', '5점'],
                datasets: [{
                    label: '리뷰 수',
                    data: [0, 0, 0, 0, 0],
                    backgroundColor: '#4a9eff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    async loadStatistics(startDate, endDate) {
        try {
            const response = await fetch(`/api/admin/statistics?start=${startDate}&end=${endDate}`);
            const data = await response.json();
            
            this.updateOverview(data.overview);
            this.updateCharts(data.charts);
            this.updateTopCampaigns(data.topCampaigns);
        } catch (error) {
            console.error('통계 데이터 로딩 실패:', error);
            this.showError('통계 데이터를 불러오는데 실패했습니다.');
        }
    }

    updateOverview(overview) {
        this.elements.totalCampaigns.textContent = overview.totalCampaigns;
        this.elements.totalApplicants.textContent = overview.totalApplicants;
        this.elements.completionRate.textContent = `${overview.completionRate}%`;
        this.elements.avgRating.textContent = overview.avgRating.toFixed(1);
    }

    updateCharts(data) {
        // 캠페인 현황 차트 업데이트
        this.statusChart.data.datasets[0].data = [
            data.status.active,
            data.status.pending,
            data.status.completed
        ];
        this.statusChart.update();

        // 카테고리별 분포 차트 업데이트
        this.categoryChart.data.datasets[0].data = [
            data.categories.restaurant,
            data.categories.cafe,
            data.categories.beauty,
            data.categories.fashion
        ];
        this.categoryChart.update();

        // 월별 신청자 추이 차트 업데이트
        this.trendChart.data.labels = data.trend.labels;
        this.trendChart.data.datasets[0].data = data.trend.values;
        this.trendChart.update();

        // 평점 분포 차트 업데이트
        this.ratingChart.data.datasets[0].data = data.ratings;
        this.ratingChart.update();
    }

    updateTopCampaigns(campaigns) {
        this.elements.topCampaigns.innerHTML = campaigns.map((campaign, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${campaign.title}</td>
                <td>${this.getCategoryText(campaign.category)}</td>
                <td>${campaign.applicants}</td>
                <td>${campaign.avgRating.toFixed(1)}</td>
                <td>
                    <span class="status-badge status-${campaign.status}">
                        ${this.getStatusText(campaign.status)}
                    </span>
                </td>
            </tr>
        `).join('');
    }

    async exportStatistics() {
        try {
            const picker = $(this.elements.dateRange).data('daterangepicker');
            const response = await fetch(`/api/admin/statistics/export?start=${picker.startDate.format('YYYY-MM-DD')}&end=${picker.endDate.format('YYYY-MM-DD')}`);
            const blob = await response.blob();
            
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `campaign_statistics_${picker.startDate.format('YYYYMMDD')}_${picker.endDate.format('YYYYMMDD')}.xlsx`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('통계 내보내기 실패:', error);
            this.showError('통계 내보내기에 실패했습니다.');
        }
    }

    getCategoryText(category) {
        const categoryMap = {
            restaurant: '맛집',
            cafe: '카페',
            beauty: '뷰티',
            fashion: '패션'
        };
        return categoryMap[category] || category;
    }

    getStatusText(status) {
        const statusMap = {
            active: '진행중',
            pending: '대기중',
            completed: '완료'
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
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    new CampaignStatistics();
}); 