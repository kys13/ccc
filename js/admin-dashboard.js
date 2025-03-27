document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('campaignChart').getContext('2d');
    const campaignChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
            datasets: [{
                label: '캠페인 참여자 수',
                data: [120, 190, 300, 500, 200, 300],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 600 // 최대값 설정
                }
            }
        }
    });
}); 