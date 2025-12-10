// 공통 JavaScript 기능 - 모든 페이지에 적용

// 테마 관리
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.init();
    }

    init() {
        // 저장된 테마 적용
        if (this.currentTheme === 'light') {
            document.body.classList.add('light-mode');
        }
        
        // 테마 토글 버튼 이벤트
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            this.updateToggleButton(themeToggle);
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    toggleTheme() {
        document.body.classList.toggle('light-mode');
        this.currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
        localStorage.setItem('theme', this.currentTheme);
        
        const themeToggle = document.getElementById('themeToggle');
        this.updateToggleButton(themeToggle);
        
        // 테마 변경 이벤트 발생
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: this.currentTheme }));
    }

    updateToggleButton(button) {
        if (button) {
            button.innerHTML = this.currentTheme === 'light' 
                ? '<span>☀️</span>' 
                : '<span>🌙</span>';
        }
    }
}

// 토스트 알림
class ToastNotification {
    static show(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
}

// 로딩 표시
class LoadingManager {
    static show(container) {
        const loader = document.createElement('div');
        loader.className = 'loader';
        loader.id = 'loader';
        container.appendChild(loader);
    }

    static hide() {
        const loader = document.getElementById('loader');
        if (loader) loader.remove();
    }
}

// 모바일 메뉴 토글
class MobileMenu {
    constructor() {
        this.init();
    }

    init() {
        const dropdowns = document.querySelectorAll('.dropdown-toggle');
        dropdowns.forEach(toggle => {
            if (window.innerWidth <= 768) {
                toggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    const dropdown = toggle.closest('.dropdown');
                    dropdown.classList.toggle('active');
                });
            }
        });
    }
}

// 로컬 스토리지 관리
class StorageManager {
    static set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('저장 실패:', e);
            return false;
        }
    }

    static get(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('불러오기 실패:', e);
            return null;
        }
    }

    static remove(key) {
        localStorage.removeItem(key);
    }

    static clear() {
        localStorage.clear();
    }
}

// 즐겨찾기 관리
class FavoriteManager {
    constructor() {
        this.favorites = StorageManager.get('favorites') || [];
    }

    add(gameName) {
        if (!this.favorites.includes(gameName)) {
            this.favorites.push(gameName);
            StorageManager.set('favorites', this.favorites);
            ToastNotification.show(`${gameName}을(를) 즐겨찾기에 추가했습니다!`, 'success');
            return true;
        }
        return false;
    }

    remove(gameName) {
        const index = this.favorites.indexOf(gameName);
        if (index > -1) {
            this.favorites.splice(index, 1);
            StorageManager.set('favorites', this.favorites);
            ToastNotification.show(`${gameName}을(를) 즐겨찾기에서 제거했습니다.`, 'info');
            return true;
        }
        return false;
    }

    toggle(gameName) {
        if (this.isFavorite(gameName)) {
            return this.remove(gameName);
        } else {
            return this.add(gameName);
        }
    }

    isFavorite(gameName) {
        return this.favorites.includes(gameName);
    }

    getAll() {
        return this.favorites;
    }

    getCount() {
        return this.favorites.length;
    }
}

// 검색 기능
class SearchManager {
    constructor(items, searchInputId, resultContainerId) {
        this.items = items;
        this.searchInput = document.getElementById(searchInputId);
        this.resultContainer = document.getElementById(resultContainerId);
        this.init();
    }

    init() {
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => {
                this.search(e.target.value);
            });
        }
    }

    search(query) {
        const lowerQuery = query.toLowerCase();
        this.items.forEach(item => {
            const text = item.textContent.toLowerCase();
            const matches = text.includes(lowerQuery);
            item.style.display = matches ? '' : 'none';
        });
    }
}

// 필터 관리
class FilterManager {
    constructor(items, filterButtons) {
        this.items = items;
        this.filterButtons = filterButtons;
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.setActiveButton(button);
                const filter = button.dataset.filter;
                this.applyFilter(filter);
            });
        });
    }

    setActiveButton(activeButton) {
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        activeButton.classList.add('active');
    }

    applyFilter(filter) {
        this.currentFilter = filter;
        let visibleCount = 0;

        this.items.forEach(item => {
            const itemFilter = item.dataset.category || item.dataset.genre;
            const matches = filter === 'all' || itemFilter === filter;
            
            if (matches) {
                item.style.display = '';
                item.classList.add('fade-in');
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });

        return visibleCount;
    }
}

// 평점 표시
class RatingDisplay {
    static renderStars(rating, maxRating = 5) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);
        
        let html = '';
        for (let i = 0; i < fullStars; i++) html += '⭐';
        if (hasHalfStar) html += '✨';
        for (let i = 0; i < emptyStars; i++) html += '☆';
        
        return html;
    }

    static renderNumeric(rating, maxRating = 10) {
        return `<span class="rating-number">${rating.toFixed(1)}/${maxRating}</span>`;
    }
}

// 날짜 포맷터
class DateFormatter {
    static format(date, format = 'YYYY.MM.DD') {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        
        return format
            .replace('YYYY', year)
            .replace('MM', month)
            .replace('DD', day);
    }

    static timeAgo(date) {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        
        const intervals = {
            년: 31536000,
            개월: 2592000,
            주: 604800,
            일: 86400,
            시간: 3600,
            분: 60
        };
        
        for (const [unit, secondsInUnit] of Object.entries(intervals)) {
            const interval = Math.floor(seconds / secondsInUnit);
            if (interval >= 1) {
                return `${interval}${unit} 전`;
            }
        }
        
        return '방금 전';
    }
}

// 페이지 초기화
document.addEventListener('DOMContentLoaded', () => {
    // 테마 관리자 초기화
    window.themeManager = new ThemeManager();
    
    // 모바일 메뉴 초기화
    new MobileMenu();
    
    // 즐겨찾기 관리자 초기화
    window.favoriteManager = new FavoriteManager();
    
    // 페이지 로드 애니메이션
    document.body.classList.add('fade-in');
    
    console.log('🎮 게임 추천 사이트 초기화 완료!');
});

// 유틸리티 함수
const Utils = {
    // 랜덤 배열 요소 선택
    randomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    },
    
    // 배열 셔플
    shuffle(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },
    
    // 디바운스
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // 숫자 포맷 (1000 -> 1,000)
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
};
