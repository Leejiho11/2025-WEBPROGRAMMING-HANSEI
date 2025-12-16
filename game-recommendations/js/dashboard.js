// 하루마다 게임 통계 데이터 생성
function generateDailyGameIndex() {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0]; // YYYY-MM-DD 형식
    
    // 저장된 날짜 확인
    const savedDate = localStorage.getItem('gameIndexDate');
    
    // 날짜가 바뀌었거나 저장된 데이터가 없으면 새로 생성
    if (savedDate !== todayStr) {
        const newData = {
            todayIndex: (35 + Math.random() * 15).toFixed(1), // 35-50 사이
            changeRate: (Math.random() * 20 - 5).toFixed(1), // -5% ~ +15%
            upGames: Math.floor(Math.random() * 5) + 2, // 2-6개
            downGames: Math.floor(Math.random() * 4) + 1, // 1-4개
            neutralGames: Math.floor(Math.random() * 3), // 0-2개
            totalPlayTime: Math.floor(12000000 + Math.random() * 6000000).toLocaleString(), // 12M-18M
            pcRoomUsageRate: (12 + Math.random() * 6).toFixed(1) // 12-18%
        };
        
        // localStorage에 저장
        localStorage.setItem('gameIndexDate', todayStr);
        localStorage.setItem('gameIndexData', JSON.stringify(newData));
        
        return newData;
    }
    
    // 오늘 날짜의 데이터가 있으면 불러오기
    return JSON.parse(localStorage.getItem('gameIndexData'));
}

// 게임 통계 UI 업데이트
function updateGameIndex() {
    const data = generateDailyGameIndex();
    
    // 날짜 표시
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    document.getElementById('currentDate').textContent = `${year}.${month}.${day}`;
    
    // 통계 카드 업데이트
    const cards = document.querySelectorAll('.index-card');
    if (cards.length >= 6) {
        // 게임 인기도 지수
        cards[0].querySelector('.value').textContent = data.todayIndex;
        const changeSign = data.changeRate >= 0 ? '▲' : '▼';
        cards[0].querySelector('.change').textContent = `${changeSign} ${Math.abs(data.changeRate)}%`;
        cards[0].querySelector('.change').className = data.changeRate >= 0 ? 'change' : 'change negative';
        
        // 급상승 게임
        cards[1].querySelector('.value').textContent = data.upGames;
        
        // 급하락 게임
        cards[2].querySelector('.value').textContent = data.downGames;
        
        // 변동 없음
        cards[3].querySelector('.value').textContent = data.neutralGames;
        
        // 총 플레이 타임
        cards[4].querySelector('.value').textContent = data.totalPlayTime;
        
        // PC방 이용률
        cards[5].querySelector('.value').textContent = data.pcRoomUsageRate + '%';
    }
}

// 현재 날짜 설정 (하위 호환용)
function setCurrentDate() {
    updateGameIndex();
}

// 주간마다 게임 순위 TOP 10 데이터 생성
function generateWeeklyRankings() {
    const today = new Date();
    
    // 주차 계산 (1년의 몇 번째 주인지)
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const weekNumber = Math.ceil((((today - startOfYear) / 86400000) + startOfYear.getDay() + 1) / 7);
    
    // 저장된 주차 확인
    const savedWeek = localStorage.getItem('rankingsWeek');
    
    // 주차가 바뀌었거나 저장된 데이터가 없으면 새로 생성
    if (savedWeek !== weekNumber.toString()) {
        // 게임 목록
        const games = [
            { name: "리그 오브 레전드", genre: "MOBA", icon: "⚔️", class: "lol", baseShare: 40 },
            { name: "배틀그라운드", genre: "FPS", icon: "🎯", class: "pubg", baseShare: 15 },
            { name: "발로란트", genre: "FPS", icon: "⚡", class: "valorant", baseShare: 12 },
            { name: "로스트아크", genre: "MMORPG", icon: "🗡️", class: "lostark", baseShare: 10 },
            { name: "메이플스토리", genre: "MMORPG", icon: "🍁", class: "maplestory", baseShare: 8 },
            { name: "FC 온라인", genre: "SPORTS", icon: "⚽", class: "fc-online", baseShare: 5 },
            { name: "던전앤파이터", genre: "ACTION", icon: "👊", class: "dnf", baseShare: 4 },
            { name: "서든어택", genre: "FPS", icon: "🔫", class: "sudden-attack", baseShare: 3 },
            { name: "오버워치 2", genre: "FPS", icon: "🎮", class: "overwatch", baseShare: 3 },
            { name: "마인크래프트", genre: "SANDBOX", icon: "⛏️", class: "minecraft", baseShare: 2 }
        ];
        
        // 각 게임에 랜덤 변동 적용
        const rankings = games.map((game, index) => {
            const variation = (Math.random() - 0.5) * 4; // -2% ~ +2%
            const shareRate = (game.baseShare + variation).toFixed(1);
            const playTime = Math.floor((parseFloat(shareRate) * 150000)).toLocaleString();
            
            // 순위 변동 (-2 ~ +2)
            const change = Math.floor(Math.random() * 5) - 2;
            const changeType = change > 0 ? 'up' : change < 0 ? 'down' : 'neutral';
            const changeRate = (Math.random() * 30 - 10).toFixed(1); // -10% ~ +20%
            
            return {
                rank: index + 1,
                name: game.name,
                genre: game.genre,
                shareRate: shareRate + '%',
                playTime: playTime,
                change: Math.abs(change),
                changeType: changeType,
                changeRate: changeRate >= 0 ? `+${changeRate}%` : `${changeRate}%`,
                icon: game.icon,
                class: game.class
            };
        });
        
        // localStorage에 저장
        localStorage.setItem('rankingsWeek', weekNumber.toString());
        localStorage.setItem('rankingsData', JSON.stringify(rankings));
        
        return rankings;
    }
    
    // 이번 주 데이터가 있으면 불러오기
    return JSON.parse(localStorage.getItem('rankingsData'));
}

// 게임 순위 데이터 (주간 업데이트)
let rankingsData = generateWeeklyRankings();

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
    
    const genreData = {
        labels: ['MOBA (리그 오브 레전드 등)', 'FPS (배틀그라운드 등)', 'MMORPG (로스트아크 등)', 'SPORTS (FC 온라인)', 'ACTION (던전앤파이터)', '기타'],
        shortLabels: ['MOBA', 'FPS', 'MMORPG', 'SPORTS', 'ACTION', '기타'],
        values: [42.5, 34.1, 18.7, 5.2, 4.1, 5.4],
        colors: [
            '#667eea',
            '#f5576c',
            '#4facfe',
            '#43e97b',
            '#fa709a',
            '#c471ed'
        ]
    };
    
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: genreData.shortLabels,
            datasets: [{
                data: genreData.values,
                backgroundColor: genreData.colors,
                borderWidth: 3,
                borderColor: '#ffffff',
                hoverBorderWidth: 5,
                hoverOffset: 15
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {
                            size: 14,
                            weight: 'bold'
                        },
                        padding: 20,
                        color: '#ffffff',
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    titleFont: {
                        size: 16,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 14
                    },
                    padding: 15,
                    cornerRadius: 10,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
    
    // 장르별 통계 테이블 생성
    const statsContainer = document.getElementById('genreStats');
    if (statsContainer) {
        statsContainer.innerHTML = `
            <div class="stats-header">
                <h4>📊 장르별 상세 점유율</h4>
                <p class="stats-description">각 게임 장르별 플레이어 점유율을 한 눈에 확인하세요</p>
            </div>
            <div class="stats-table">
                ${genreData.labels.map((label, index) => {
                    const genreType = genreData.shortLabels[index];
                    const genreDesc = label.replace(genreType, '').trim();
                    return `
                        <div class="stats-row">
                            <span class="stats-color" style="background-color: ${genreData.colors[index]}"></span>
                            <span class="stats-label">
                                <strong class="genre-type">${genreType}</strong>
                                <span class="genre-desc">${genreDesc}</span>
                            </span>
                            <span class="stats-value">${genreData.values[index]}%</span>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }
}

// 하루마다 시간대별 이용현황 데이터 생성
function generateDailyTimeData() {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0]; // YYYY-MM-DD 형식
    
    // 저장된 날짜 확인
    const savedDate = localStorage.getItem('timeDataDate');
    
    // 날짜가 바뀌었거나 저장된 데이터가 없으면 새로 생성
    if (savedDate !== todayStr) {
        // 시간대별 패턴: 새벽(낮음) -> 오후(증가) -> 저녁(피크) -> 심야(감소)
        const basePattern = [
            0.4 + Math.random() * 0.3,  // 0시: 40-70%
            0.3 + Math.random() * 0.2,  // 3시: 30-50%
            0.35 + Math.random() * 0.25, // 6시: 35-60%
            0.5 + Math.random() * 0.3,  // 9시: 50-80%
            0.65 + Math.random() * 0.25, // 12시: 65-90%
            0.8 + Math.random() * 0.2,  // 15시: 80-100%
            0.95 + Math.random() * 0.05, // 18시: 95-100% (피크타임 시작)
            1.0,                         // 21시: 100% (피크타임)
            0.85 + Math.random() * 0.1   // 24시: 85-95%
        ];
        
        // 기준값 (천명 단위)
        const peakValue = 15 + Math.random() * 5; // 15-20천명
        
        const timeData = {
            labels: ['0시', '3시', '6시', '9시', '12시', '15시', '18시', '21시', '24시'],
            values: basePattern.map(ratio => parseFloat((ratio * peakValue).toFixed(1))),
            actualValues: basePattern.map(ratio => Math.floor(ratio * peakValue * 1000))
        };
        
        // localStorage에 저장
        localStorage.setItem('timeDataDate', todayStr);
        localStorage.setItem('timeData', JSON.stringify(timeData));
        
        return timeData;
    }
    
    // 오늘 날짜의 데이터가 있으면 불러오기
    return JSON.parse(localStorage.getItem('timeData'));
}

// 시간대별 이용현황 차트
function createTimeChart() {
    const canvas = document.getElementById('timeChart');
    if (!canvas) return; // 차트 캔버스가 없으면 실행 안함
    
    const timeData = generateDailyTimeData();
    
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeData.labels,
            datasets: [{
                label: '이용자 수 (천명)',
                data: timeData.values,
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.2)',
                tension: 0.4,
                fill: true,
                borderWidth: 3,
                pointRadius: 6,
                pointHoverRadius: 8,
                pointBackgroundColor: '#667eea',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointHoverBackgroundColor: '#ffffff',
                pointHoverBorderColor: '#667eea',
                pointHoverBorderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        font: {
                            size: 14,
                            weight: 'bold'
                        },
                        color: '#ffffff',
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    titleFont: {
                        size: 16,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 14
                    },
                    padding: 15,
                    cornerRadius: 10,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return '이용자: ' + context.parsed.y.toLocaleString() + '천명';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        font: {
                            size: 12,
                            weight: 'bold'
                        },
                        color: '#ffffff',
                        callback: function(value) {
                            return value + 'K';
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        lineWidth: 1
                    }
                },
                x: {
                    ticks: {
                        font: {
                            size: 12,
                            weight: 'bold'
                        },
                        color: '#ffffff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        lineWidth: 1
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
    
    // 시간대별 통계 테이블 생성
    const statsContainer = document.getElementById('timeStats');
    if (statsContainer) {
        const timeDescriptions = {
            '0시': '자정 - 심야 시간대',
            '3시': '새벽 - 최저 이용 시간',
            '6시': '이른 아침',
            '9시': '오전 - 출근/등교 시간',
            '12시': '점심 시간',
            '15시': '오후 - 이용자 증가',
            '18시': '저녁 - 퇴근/하교 시간',
            '21시': '밤 - 최고 피크 타임 🔥',
            '24시': '자정 전 - 높은 이용률'
        };
        
        statsContainer.innerHTML = `
            <div class="stats-header">
                <h4>⏰ 시간대별 상세 이용자 수</h4>
                <p class="stats-description">24시간 동안의 시간대별 동접자 수를 확인하세요</p>
            </div>
            <div class="stats-table time-stats-table">
                ${timeData.labels.map((label, index) => `
                    <div class="stats-row">
                        <span class="stats-label-time-wrapper">
                            <strong class="time-label">${label}</strong>
                            <span class="time-desc">${timeDescriptions[label] || ''}</span>
                        </span>
                        <span class="stats-value">${timeData.actualValues[index].toLocaleString()}명</span>
                        <span class="stats-bar">
                            <span class="stats-bar-fill" style="width: ${(timeData.values[index] / 18.2 * 100)}%"></span>
                        </span>
                    </div>
                `).join('')}
            </div>
        `;
    }
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

// 인기 게임 데이터 (실시간, 일간, 월간)
const popularGamesData = {
    realtime: [
        { rank: 1, name: '리그 오브 레전드', genre: 'MOBA', players: '892,451명', share: '18.5%', icon: '🏆' },
        { rank: 2, name: '배틀그라운드', genre: 'FPS', players: '745,329명', share: '15.4%', icon: '🔫' },
        { rank: 3, name: '피파 온라인 4', genre: '스포츠', players: '623,892명', share: '12.9%', icon: '⚽' },
        { rank: 4, name: '로스트아크', genre: 'MMORPG', players: '512,643명', share: '10.6%', icon: '⚔️' },
        { rank: 5, name: '오버워치 2', genre: 'FPS', players: '478,901명', share: '9.9%', icon: '🎮' },
        { rank: 6, name: '메이플스토리', genre: 'MMORPG', players: '394,512명', share: '8.2%', icon: '🍁' },
        { rank: 7, name: '발로란트', genre: 'FPS', players: '356,784명', share: '7.4%', icon: '💥' },
        { rank: 8, name: '던전앤파이터', genre: '액션', players: '298,123명', share: '6.2%', icon: '👊' },
        { rank: 9, name: '카트라이더', genre: '레이싱', players: '245,678명', share: '5.1%', icon: '🏎️' },
        { rank: 10, name: '스타크래프트', genre: 'RTS', players: '189,432명', share: '3.9%', icon: '🚀' }
    ],
    daily: [
        { rank: 1, name: '리그 오브 레전드', genre: 'MOBA', players: '2,145,789명', share: '19.2%', icon: '🏆' },
        { rank: 2, name: '배틀그라운드', genre: 'FPS', players: '1,892,345명', share: '16.9%', icon: '🔫' },
        { rank: 3, name: '로스트아크', genre: 'MMORPG', players: '1,523,678명', share: '13.6%', icon: '⚔️' },
        { rank: 4, name: '피파 온라인 4', genre: '스포츠', players: '1,456,234명', share: '13.0%', icon: '⚽' },
        { rank: 5, name: '메이플스토리', genre: 'MMORPG', players: '1,234,567명', share: '11.0%', icon: '🍁' },
        { rank: 6, name: '오버워치 2', genre: 'FPS', players: '987,654명', share: '8.8%', icon: '🎮' },
        { rank: 7, name: '발로란트', genre: 'FPS', players: '876,543명', share: '7.8%', icon: '💥' },
        { rank: 8, name: '던전앤파이터', genre: '액션', players: '765,432명', share: '6.8%', icon: '👊' },
        { rank: 9, name: '원신', genre: 'RPG', players: '543,210명', share: '4.9%', icon: '✨' },
        { rank: 10, name: '스타크래프트', genre: 'RTS', players: '456,789명', share: '4.1%', icon: '🚀' }
    ],
    monthly: [
        { rank: 1, name: '리그 오브 레전드', genre: 'MOBA', players: '58,234,567명', share: '21.5%', icon: '🏆' },
        { rank: 2, name: '배틀그라운드', genre: 'FPS', players: '45,678,901명', share: '16.9%', icon: '🔫' },
        { rank: 3, name: '로스트아크', genre: 'MMORPG', players: '38,901,234명', share: '14.4%', icon: '⚔️' },
        { rank: 4, name: '메이플스토리', genre: 'MMORPG', players: '32,345,678명', share: '11.9%', icon: '🍁' },
        { rank: 5, name: '피파 온라인 4', genre: '스포츠', players: '29,876,543명', share: '11.0%', icon: '⚽' },
        { rank: 6, name: '던전앤파이터', genre: '액션', players: '23,456,789명', share: '8.7%', icon: '👊' },
        { rank: 7, name: '오버워치 2', genre: 'FPS', players: '19,234,567명', share: '7.1%', icon: '🎮' },
        { rank: 8, name: '발로란트', genre: 'FPS', players: '15,678,901명', share: '5.8%', icon: '💥' },
        { rank: 9, name: '원신', genre: 'RPG', players: '12,345,678명', share: '4.6%', icon: '✨' },
        { rank: 10, name: '카트라이더', genre: '레이싱', players: '9,876,543명', share: '3.6%', icon: '🏎️' }
    ]
};

// 인기 게임 렌더링 함수
let currentPeriod = 'realtime';

function renderPopularGames(period = 'realtime') {
    currentPeriod = period;
    const gamesGrid = document.getElementById('popularGamesGrid');
    if (!gamesGrid) return;
    
    const games = popularGamesData[period];
    
    gamesGrid.innerHTML = games.map(game => `
        <div class="popular-game-card rank-${game.rank}">
            <div class="rank-badge">#${game.rank}</div>
            <div class="game-icon">${game.icon}</div>
            <div class="game-details">
                <h4 class="game-name">${game.name}</h4>
                <span class="game-genre-badge">${game.genre}</span>
            </div>
            <div class="game-stats">
                <div class="stat-item">
                    <span class="stat-label">플레이어</span>
                    <span class="stat-value">${game.players}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">점유율</span>
                    <span class="stat-value highlight">${game.share}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// 탭 전환 이벤트 리스너
function initPeriodTabs() {
    const tabs = document.querySelectorAll('.period-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const period = tab.getAttribute('data-period');
            renderPopularGames(period);
        });
    });
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
    setCurrentDate();
    renderRankings();
    renderTrendGames();
    renderPopularGames('realtime');
    initPeriodTabs();
    
    // 차트가 있는 페이지에서만 실행
    if (typeof Chart !== 'undefined') {
        createGenreChart();
        createTimeChart();
    }
});
