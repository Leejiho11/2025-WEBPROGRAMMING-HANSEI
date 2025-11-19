// 현재 날짜 설정
function setCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    document.getElementById('currentDate').textContent = `${year}.${month}.${day}`;
}

// 게임 순위 데이터
const rankingsData = [
    { rank: 1, name: "리그 오브 레전드", genre: "MOBA", shareRate: "42.5%", playTime: "6,234,567", change: 0, changeType: "neutral", changeRate: "0.0%", icon: "⚔️", class: "lol" },
    { rank: 2, name: "배틀그라운드", genre: "FPS", shareRate: "15.3%", playTime: "2,456,789", change: 1, changeType: "up", changeRate: "+15.6%", icon: "🎯", class: "pubg" },
    { rank: 3, name: "발로란트", genre: "FPS", shareRate: "12.8%", playTime: "1,987,654", change: -1, changeType: "down", changeRate: "-5.2%", icon: "⚡", class: "valorant" },
    { rank: 4, name: "로스트아크", genre: "MMORPG", shareRate: "10.2%", playTime: "1,678,901", change: 1, changeType: "up", changeRate: "+7.5%", icon: "🗡️", class: "lostark" },
    { rank: 5, name: "메이플스토리", genre: "MMORPG", shareRate: "8.5%", playTime: "1,345,678", change: 2, changeType: "up", changeRate: "+295.5%", icon: "🍁", class: "maplestory" },
    { rank: 6, name: "FC 온라인", genre: "SPORTS", shareRate: "5.2%", playTime: "789,012", change: 0, changeType: "neutral", changeRate: "+1.2%", icon: "⚽", class: "fc-online" },
    { rank: 7, name: "던전앤파이터", genre: "ACTION", shareRate: "4.1%", playTime: "678,345", change: -2, changeType: "down", changeRate: "-12.3%", icon: "👊", class: "dnf" },
    { rank: 8, name: "서든어택", genre: "FPS", shareRate: "3.2%", playTime: "567,890", change: 0, changeType: "neutral", changeRate: "-0.5%", icon: "🔫", class: "sudden-attack" },
    { rank: 9, name: "오버워치 2", genre: "FPS", shareRate: "2.8%", playTime: "456,123", change: 1, changeType: "up", changeRate: "+8.2%", icon: "🎮", class: "overwatch" },
    { rank: 10, name: "마인크래프트", genre: "SANDBOX", shareRate: "2.4%", playTime: "389,456", change: -1, changeType: "down", changeRate: "-3.8%", icon: "⛏️", class: "minecraft" }
];

let currentFilter = 'all';

// 순위 테이블 렌더링
function renderRankings(filter = 'all') {
    const tbody = document.getElementById('rankingsTableBody');
    tbody.innerHTML = '';

    const filteredData = filter === 'all' 
        ? rankingsData 
        : rankingsData.filter(game => game.genre === filter);

    filteredData.forEach(game => {
        const tr = document.createElement('tr');
        
        const changeSymbol = game.changeType === 'up' ? '▲' : 
                           game.changeType === 'down' ? '▼' : '-';
        const changeText = game.change !== 0 ? `${changeSymbol} ${Math.abs(game.change)}` : '-';
        
        tr.innerHTML = `
            <td><span class="rank-number ${game.rank <= 3 ? 'top3' : ''}">${game.rank}</span></td>
            <td>
                <div class="game-info">
                    <div class="game-thumbnail ${game.class}">${game.icon}</div>
                    <div class="game-details">
                        <h4>${game.name}</h4>
                        <span class="game-genre">${game.genre}</span>
                    </div>
                </div>
            </td>
            <td>${game.genre}</td>
            <td><strong>${game.shareRate}</strong></td>
        `;
        
        tbody.appendChild(tr);
    });
}

// 탭 필터링 (필요시 사용)
function filterRankings(genre) {
    currentFilter = genre;
    
    // 탭 활성화 상태 변경
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    
    renderRankings(genre);
}

// 장르별 점유율 차트
function createGenreChart() {
    const canvas = document.getElementById('genreChart');
    if (!canvas) return; // 차트 캔버스가 없으면 실행 안함
    
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['MOBA', 'FPS', 'MMORPG', 'SPORTS', 'ACTION', '기타'],
            datasets: [{
                data: [42.5, 34.1, 18.7, 5.2, 4.1, 5.4],
                backgroundColor: [
                    '#667eea',
                    '#f5576c',
                    '#4facfe',
                    '#43e97b',
                    '#fa709a',
                    '#c471ed'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// 시간대별 이용현황 차트
function createTimeChart() {
    const canvas = document.getElementById('timeChart');
    if (!canvas) return; // 차트 캔버스가 없으면 실행 안함
    
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['0시', '3시', '6시', '9시', '12시', '15시', '18시', '21시', '24시'],
            datasets: [{
                label: '이용자 수',
                data: [5200, 3800, 4100, 6500, 8900, 12000, 15500, 18200, 14000],
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// 상승/하락 게임 렌더링
function renderTrendGames() {
    // 급상승 게임 (변동률 기준 상위 5개)
    const risingGames = rankingsData
        .filter(game => game.changeType === 'up')
        .sort((a, b) => parseFloat(b.changeRate) - parseFloat(a.changeRate))
        .slice(0, 5);
    
    // 급하락 게임 (변동률 기준 하위 5개)
    const fallingGames = rankingsData
        .filter(game => game.changeType === 'down')
        .sort((a, b) => parseFloat(a.changeRate) - parseFloat(b.changeRate))
        .slice(0, 5);
    
    // 상승 게임 렌더링
    const risingList = document.getElementById('risingGamesList');
    if (risingList) {
        risingList.innerHTML = risingGames.map(game => `
            <div class="trend-item">
                <div class="trend-game-info">
                    <div class="game-thumbnail ${game.class}">${game.icon}</div>
                    <div class="trend-game-details">
                        <h4>${game.name}</h4>
                        <span class="game-genre">${game.genre}</span>
                    </div>
                </div>
                <div class="trend-change">
                    <span class="trend-change-value up">▲ ${game.change}</span>
                    <span class="trend-change-rate">${game.changeRate}</span>
                </div>
            </div>
        `).join('');
    }
    
    // 하락 게임 렌더링
    const fallingList = document.getElementById('fallingGamesList');
    if (fallingList) {
        fallingList.innerHTML = fallingGames.map(game => `
            <div class="trend-item">
                <div class="trend-game-info">
                    <div class="game-thumbnail ${game.class}">${game.icon}</div>
                    <div class="trend-game-details">
                        <h4>${game.name}</h4>
                        <span class="game-genre">${game.genre}</span>
                    </div>
                </div>
                <div class="trend-change">
                    <span class="trend-change-value down">▼ ${Math.abs(game.change)}</span>
                    <span class="trend-change-rate">${game.changeRate}</span>
                </div>
            </div>
        `).join('');
    }
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
    setCurrentDate();
    renderRankings();
    renderTrendGames();
    
    // 차트가 있는 페이지에서만 실행
    if (typeof Chart !== 'undefined') {
        createGenreChart();
        createTimeChart();
    }
});
