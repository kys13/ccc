class RankingManager {
    constructor() {
        this.initializeFilters();
        this.loadRankingData();
    }

    initializeFilters() {
        document.getElementById('periodFilter').addEventListener('change', () => this.loadRankingData());
        document.getElementById('categoryFilter').addEventListener('change', () => this.loadRankingData());
    }

    async loadRankingData() {
        const period = document.getElementById('periodFilter').value;
        const category = document.getElementById('categoryFilter').value;

        try {
            const response = await fetch(`/api/rankings?period=${period}&category=${category}`);
            const data = await response.json();
            this.renderRankings(data);
        } catch (error) {
            console.error('랭킹 데이터 로딩 실패:', error);
        }
    }

    renderRankings(data) {
        // 상위 3위 렌더링
        const topRankers = data.slice(0, 3);
        document.querySelector('.top-rankers').innerHTML = this.renderTopRankers(topRankers);

        // 4위 이하 렌더링
        const otherRankers = data.slice(3);
        document.querySelector('.ranking-table').innerHTML = this.renderRankingTable(otherRankers);
    }

    renderTopRankers(topRankers) {
        return topRankers.map((ranker, index) => `
            <div class="rank-card rank-${index + 1}">
                <span class="rank">${index + 1}</span>
                <img src="${ranker.profileImage}" alt="프로필">
                <div class="ranker-info">
                    <h3>${ranker.name}</h3>
                    <p>팔로워 ${this.formatNumber(ranker.followers)}명</p>
                    <div class="stats">
                        <span>리뷰 ${ranker.reviews}개</span>
                        <span>평균 평점 ${ranker.rating.toFixed(1)}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderRankingTable(rankers) {
        return `
            <table>
                <thead>
                    <tr>
                        <th>순위</th>
                        <th>프로필</th>
                        <th>이름</th>
                        <th>팔로워</th>
                        <th>리뷰 수</th>
                        <th>평균 평점</th>
                    </tr>
                </thead>
                <tbody>
                    ${rankers.map((ranker, index) => `
                        <tr>
                            <td>${index + 4}</td>
                            <td>
                                <img src="${ranker.profileImage}" alt="프로필" class="small-profile">
                            </td>
                            <td>${ranker.name}</td>
                            <td>${this.formatNumber(ranker.followers)}명</td>
                            <td>${ranker.reviews}개</td>
                            <td>${ranker.rating.toFixed(1)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    formatNumber(num) {
        if (num >= 10000) {
            return (num / 10000).toFixed(1) + '만';
        }
        return num.toLocaleString();
    }
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    new RankingManager();
}); 