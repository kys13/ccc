class AdminDashboard {
    constructor() {
        this.initializeElements();
        this.initializeCharts();
        this.loadStatistics();
        this.setupRealTimeUpdates();
        this.setupDateRangePicker();
    }

    initializeElements() {
        this.elements = {
            visitorChart: document.getElementById('visitorChart'),
            revenueChart: document.getElementById('revenueChart'),
            campaignChart: document.getElementById('campaignChart'),
            // 실시간 통계 요소들
            currentVisitors: document.getElementById('currentVisitors'),
            todayOrders: document.getElementById('todayOrders'),
            // 날짜 선택기
            dateRange: document.getElementById('dateRange')
        };
    }

    async loadStatistics() {
        try {
            const response = await fetch('/api/admin/statistics');
            const data = await response.json();
            this.updateDashboardStats(data);
        } catch (error) {
            console.error('통계 데이터 로딩 실패:', error);
            this.showError('통계 데이터를 불러오는데 실패했습니다.');
        }
    }

    initializeCharts() {
        const chartOptions = {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        };

        // 방문자 통계 차트
        this.visitorChart = new Chart(this.elements.visitorChart.getContext('2d'), {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: '일일 방문자',
                    data: [],
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            },
            options: chartOptions
        });

        // 매출 통계 차트
        this.revenueChart = new Chart(this.elements.revenueChart.getContext('2d'), {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: '일일 매출',
                    data: [],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgb(54, 162, 235)',
                    borderWidth: 1
                }]
            },
            options: chartOptions
        });

        // 캠페인 통계 차트
        this.campaignChart = new Chart(this.elements.campaignChart.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['진행중', '대기중', '완료'],
                datasets: [{
                    label: '캠페인 현황',
                    data: [0, 0, 0],
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(54, 162, 235, 0.2)'
                    ],
                    borderColor: [
                        'rgb(75, 192, 192)',
                        'rgb(255, 206, 86)',
                        'rgb(54, 162, 235)'
                    ],
                    borderWidth: 1
                }]
            },
            options: chartOptions
        });
    }

    setupRealTimeUpdates() {
        // WebSocket 연결 설정
        this.socket = new WebSocket('ws://your-websocket-server');
        
        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.updateRealTimeStats(data);
        };
    }

    updateRealTimeStats(data) {
        // 실시간 통계 업데이트
        document.getElementById('currentVisitors').textContent = data.currentVisitors;
        document.getElementById('todayOrders').textContent = data.todayOrders;
        // ... 다른 실시간 데이터 업데이트
    }

    setupDateRangePicker() {
        const picker = new DateRangePicker('#dateRange', {
            ranges: {
                '오늘': [moment(), moment()],
                '어제': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                '지난 7일': [moment().subtract(6, 'days'), moment()],
                '지난 30일': [moment().subtract(29, 'days'), moment()],
                '이번 달': [moment().startOf('month'), moment().endOf('month')],
                '지난 달': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            }
        });

        picker.on('apply.daterangepicker', (ev, picker) => {
            this.loadStatisticsByDate(picker.startDate, picker.endDate);
        });
    }

    async loadStatisticsByDate(startDate, endDate) {
        try {
            const response = await fetch(`/api/admin/statistics?start=${startDate.format('YYYY-MM-DD')}&end=${endDate.format('YYYY-MM-DD')}`);
            const data = await response.json();
            this.updateCharts(data);
        } catch (error) {
            console.error('기간별 통계 로딩 실패:', error);
            this.showError('통계 데이터를 불러오는데 실패했습니다.');
        }
    }

    updateCharts(data) {
        // 차트 데이터 업데이트
        this.visitorChart.data.labels = data.dates;
        this.visitorChart.data.datasets[0].data = data.visitors;
        this.visitorChart.update();

        this.revenueChart.data.labels = data.dates;
        this.revenueChart.data.datasets[0].data = data.revenue;
        this.revenueChart.update();
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
    new AdminDashboard();
}); 