// 리뷰 시스템 관리
class ReviewSystem {
    constructor() {
        this.reviews = this.loadReviews();
    }

    // 로컬 스토리지에서 리뷰 불러오기
    loadReviews() {
        const stored = localStorage.getItem('gameReviews');
        return stored ? JSON.parse(stored) : {};
    }

    // 리뷰 저장
    saveReviews() {
        localStorage.setItem('gameReviews', JSON.stringify(this.reviews));
    }

    // 특정 게임의 리뷰 가져오기
    getGameReviews(gameName) {
        return this.reviews[gameName] || [];
    }

    // 리뷰 추가
    addReview(gameName, rating, comment, userName = '익명') {
        if (!this.reviews[gameName]) {
            this.reviews[gameName] = [];
        }

        const review = {
            id: Date.now(),
            userName,
            rating,
            comment,
            date: new Date().toISOString(),
            helpful: 0,
            helpfulUsers: []
        };

        this.reviews[gameName].unshift(review);
        this.saveReviews();
        return review;
    }

    // 리뷰 삭제
    deleteReview(gameName, reviewId) {
        if (this.reviews[gameName]) {
            this.reviews[gameName] = this.reviews[gameName].filter(r => r.id !== reviewId);
            this.saveReviews();
        }
    }

    // 도움이 됨 클릭
    markHelpful(gameName, reviewId, userId) {
        const gameReviews = this.reviews[gameName];
        if (!gameReviews) return;

        const review = gameReviews.find(r => r.id === reviewId);
        if (!review) return;

        if (!review.helpfulUsers.includes(userId)) {
            review.helpful++;
            review.helpfulUsers.push(userId);
            this.saveReviews();
        }
    }

    // 평균 평점 계산
    getAverageRating(gameName) {
        const gameReviews = this.getGameReviews(gameName);
        if (gameReviews.length === 0) return 0;

        const sum = gameReviews.reduce((acc, review) => acc + review.rating, 0);
        return (sum / gameReviews.length).toFixed(1);
    }

    // 리뷰 개수
    getReviewCount(gameName) {
        return this.getGameReviews(gameName).length;
    }

    // 평점 분포 계산
    getRatingDistribution(gameName) {
        const gameReviews = this.getGameReviews(gameName);
        const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

        gameReviews.forEach(review => {
            distribution[review.rating]++;
        });

        return distribution;
    }
}

// 리뷰 UI 관리
class ReviewUI {
    constructor(reviewSystem) {
        this.reviewSystem = reviewSystem;
        this.currentUserId = this.getUserId();
    }

    // 고유 사용자 ID 생성/불러오기
    getUserId() {
        let userId = localStorage.getItem('userId');
        if (!userId) {
            userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('userId', userId);
        }
        return userId;
    }

    // 리뷰 모달 생성
    createReviewModal(gameName) {
        const modal = document.createElement('div');
        modal.className = 'review-modal';
        modal.innerHTML = `
            <div class="review-modal-content">
                <span class="review-modal-close">&times;</span>
                <h2>🎮 ${gameName} 리뷰</h2>
                
                <div class="review-stats">
                    <div class="average-rating">
                        <div class="rating-number">${this.reviewSystem.getAverageRating(gameName)}</div>
                        <div class="rating-stars">${this.renderStars(this.reviewSystem.getAverageRating(gameName))}</div>
                        <div class="review-count">${this.reviewSystem.getReviewCount(gameName)}개의 리뷰</div>
                    </div>
                </div>

                <div class="review-form">
                    <h3>리뷰 작성하기</h3>
                    <div class="rating-input">
                        <label>평점:</label>
                        <div class="star-input">
                            ${[5, 4, 3, 2, 1].map(star => `
                                <input type="radio" id="star${star}-${gameName}" name="rating" value="${star}" />
                                <label for="star${star}-${gameName}">★</label>
                            `).join('')}
                        </div>
                    </div>
                    <textarea id="reviewComment" placeholder="게임에 대한 솔직한 리뷰를 작성해주세요..." rows="4"></textarea>
                    <input type="text" id="reviewUserName" placeholder="닉네임 (선택사항)" maxlength="20" />
                    <button class="submit-review-btn">리뷰 제출</button>
                </div>

                <div class="reviews-list">
                    <h3>모든 리뷰 (${this.reviewSystem.getReviewCount(gameName)})</h3>
                    <div id="reviewsList"></div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // 이벤트 리스너
        modal.querySelector('.review-modal-close').onclick = () => {
            modal.remove();
        };

        modal.onclick = (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        };

        modal.querySelector('.submit-review-btn').onclick = () => {
            this.submitReview(gameName, modal);
        };

        // 리뷰 목록 렌더링
        this.renderReviewsList(gameName, modal);

        return modal;
    }

    // 별점 렌더링
    renderStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';

        for (let i = 0; i < fullStars; i++) {
            stars += '⭐';
        }
        if (hasHalfStar) {
            stars += '⭐';
        }
        
        return stars || '☆☆☆☆☆';
    }

    // 리뷰 제출
    submitReview(gameName, modal) {
        const ratingInput = modal.querySelector('input[name="rating"]:checked');
        const comment = modal.querySelector('#reviewComment').value.trim();
        const userName = modal.querySelector('#reviewUserName').value.trim() || '익명';

        if (!ratingInput) {
            alert('평점을 선택해주세요!');
            return;
        }

        if (!comment) {
            alert('리뷰 내용을 작성해주세요!');
            return;
        }

        const rating = parseInt(ratingInput.value);
        this.reviewSystem.addReview(gameName, rating, comment, userName);

        // 폼 초기화
        modal.querySelector('#reviewComment').value = '';
        modal.querySelector('#reviewUserName').value = '';
        modal.querySelectorAll('input[name="rating"]').forEach(input => input.checked = false);

        // 리뷰 목록 갱신
        this.renderReviewsList(gameName, modal);

        // 통계 업데이트
        modal.querySelector('.average-rating').innerHTML = `
            <div class="rating-number">${this.reviewSystem.getAverageRating(gameName)}</div>
            <div class="rating-stars">${this.renderStars(this.reviewSystem.getAverageRating(gameName))}</div>
            <div class="review-count">${this.reviewSystem.getReviewCount(gameName)}개의 리뷰</div>
        `;

        modal.querySelector('.reviews-list h3').textContent = `모든 리뷰 (${this.reviewSystem.getReviewCount(gameName)})`;

        alert('리뷰가 등록되었습니다!');
    }

    // 리뷰 목록 렌더링
    renderReviewsList(gameName, modal) {
        const reviewsList = modal.querySelector('#reviewsList');
        const reviews = this.reviewSystem.getGameReviews(gameName);

        if (reviews.length === 0) {
            reviewsList.innerHTML = '<p class="no-reviews">아직 리뷰가 없습니다. 첫 번째 리뷰를 작성해보세요!</p>';
            return;
        }

        reviewsList.innerHTML = reviews.map(review => `
            <div class="review-item">
                <div class="review-header">
                    <div class="review-user">
                        <strong>${this.escapeHtml(review.userName)}</strong>
                        <span class="review-date">${this.formatDate(review.date)}</span>
                    </div>
                    <div class="review-rating">${this.renderStars(review.rating)} (${review.rating}/5)</div>
                </div>
                <div class="review-comment">${this.escapeHtml(review.comment)}</div>
                <div class="review-actions">
                    <button class="helpful-btn ${review.helpfulUsers.includes(this.currentUserId) ? 'active' : ''}" 
                            onclick="reviewUI.markHelpful('${gameName}', ${review.id})">
                        👍 도움됨 (${review.helpful})
                    </button>
                    <button class="delete-review-btn" onclick="reviewUI.deleteReview('${gameName}', ${review.id})">
                        🗑️ 삭제
                    </button>
                </div>
            </div>
        `).join('');
    }

    // 도움됨 표시
    markHelpful(gameName, reviewId) {
        this.reviewSystem.markHelpful(gameName, reviewId, this.currentUserId);
        
        // 모달이 열려있으면 갱신
        const modal = document.querySelector('.review-modal');
        if (modal) {
            this.renderReviewsList(gameName, modal);
        }
    }

    // 리뷰 삭제
    deleteReview(gameName, reviewId) {
        if (confirm('정말로 이 리뷰를 삭제하시겠습니까?')) {
            this.reviewSystem.deleteReview(gameName, reviewId);
            
            // 모달이 열려있으면 갱신
            const modal = document.querySelector('.review-modal');
            if (modal) {
                this.renderReviewsList(gameName, modal);
                
                // 통계 업데이트
                modal.querySelector('.average-rating').innerHTML = `
                    <div class="rating-number">${this.reviewSystem.getAverageRating(gameName)}</div>
                    <div class="rating-stars">${this.renderStars(this.reviewSystem.getAverageRating(gameName))}</div>
                    <div class="review-count">${this.reviewSystem.getReviewCount(gameName)}개의 리뷰</div>
                `;
                
                modal.querySelector('.reviews-list h3').textContent = `모든 리뷰 (${this.reviewSystem.getReviewCount(gameName)})`;
            }
        }
    }

    // HTML 이스케이프
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // 날짜 포맷팅
    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return '방금 전';
        if (diffMins < 60) return `${diffMins}분 전`;
        if (diffHours < 24) return `${diffHours}시간 전`;
        if (diffDays < 7) return `${diffDays}일 전`;
        
        return date.toLocaleDateString('ko-KR');
    }

    // 게임 카드에 리뷰 버튼 추가
    addReviewButtonToCard(gameCard, gameName) {
        const reviewBtn = document.createElement('button');
        reviewBtn.className = 'review-btn';
        reviewBtn.innerHTML = `⭐ 리뷰 (${this.reviewSystem.getReviewCount(gameName)})`;
        reviewBtn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.createReviewModal(gameName);
        };

        const gameContent = gameCard.querySelector('.game-content');
        if (gameContent) {
            gameContent.appendChild(reviewBtn);
        }
    }
}

// 전역 인스턴스
const reviewSystem = new ReviewSystem();
const reviewUI = new ReviewUI(reviewSystem);
