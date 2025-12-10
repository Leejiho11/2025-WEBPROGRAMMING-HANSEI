// 게임 추천 마법사 로직

class GameWizard {
    constructor() {
        this.currentStep = 1;
        this.maxSteps = 4;
        this.answers = {
            genres: [],
            platform: null,
            playStyle: null
        };
        
        // 게임 데이터베이스
        this.games = [
            {
                name: '리그 오브 레전드',
                genre: 'MOBA',
                platform: ['PC'],
                playStyle: ['competitive', 'multiplayer'],
                rating: 9.2,
                icon: '⚔️',
                gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
                reason: 'PC방 1위 MOBA 게임! 전략적 팀 플레이와 경쟁을 즐기시는 분에게 완벽합니다.',
                tags: ['무료', 'e스포츠', '팀 플레이']
            },
            {
                name: '배틀그라운드',
                genre: 'FPS',
                platform: ['PC', 'Mobile', 'Console'],
                playStyle: ['competitive', 'multiplayer'],
                rating: 8.5,
                icon: '🎯',
                gradient: 'linear-gradient(135deg, #f77f00 0%, #d62828 100%)',
                reason: '배틀로얄의 원조! 친구들과 치킨을 먹는 짜릿함을 경험하세요.',
                tags: ['배틀로얄', '생존', '무료']
            },
            {
                name: '발로란트',
                genre: 'FPS',
                platform: ['PC'],
                playStyle: ['competitive', 'multiplayer'],
                rating: 8.8,
                icon: '⚡',
                gradient: 'linear-gradient(135deg, #ff4655 0%, #bd3944 100%)',
                reason: '전술 슈팅과 캐릭터 능력이 결합된 신개념 FPS! 전략적 플레이를 좋아하신다면 최고입니다.',
                tags: ['무료', '전술 슈팅', '5vs5']
            },
            {
                name: '로스트아크',
                genre: 'MMORPG',
                platform: ['PC'],
                playStyle: ['competitive', 'multiplayer', 'story'],
                rating: 8.7,
                icon: '🗡️',
                gradient: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
                reason: '화려한 스킬과 방대한 콘텐츠! 레이드를 즐기시는 분께 강력 추천합니다.',
                tags: ['무료', 'MMORPG', '레이드']
            },
            {
                name: '메이플스토리',
                genre: 'MMORPG',
                platform: ['PC'],
                playStyle: ['casual', 'multiplayer'],
                rating: 8.9,
                icon: '🍁',
                gradient: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                reason: '20년 넘게 사랑받는 국민 게임! 추억과 재미를 동시에 느끼실 수 있습니다.',
                tags: ['무료', '2D', '횡스크롤']
            },
            {
                name: 'FC 온라인',
                genre: 'SPORTS',
                platform: ['PC'],
                playStyle: ['competitive', 'casual', 'multiplayer'],
                rating: 8.3,
                icon: '⚽',
                gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                reason: '축구를 좋아하신다면! 실제 선수 데이터로 나만의 팀을 꾸며보세요.',
                tags: ['무료', '축구', '스포츠']
            },
            {
                name: '던전앤파이터',
                genre: 'ACTION',
                platform: ['PC'],
                playStyle: ['competitive', 'multiplayer'],
                rating: 8.6,
                icon: '👊',
                gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
                reason: '최고의 타격감! 다양한 직업으로 던전을 정복하는 재미가 끝내줍니다.',
                tags: ['무료', '액션', 'RPG']
            },
            {
                name: '서든어택',
                genre: 'FPS',
                platform: ['PC'],
                playStyle: ['casual', 'multiplayer'],
                rating: 7.8,
                icon: '🔫',
                gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                reason: 'PC방 문화의 전설! 누구나 쉽게 즐길 수 있는 캐주얼 FPS입니다.',
                tags: ['무료', 'FPS', '캐주얼']
            },
            {
                name: '오버워치 2',
                genre: 'FPS',
                platform: ['PC', 'Console'],
                playStyle: ['competitive', 'casual', 'multiplayer'],
                rating: 8.4,
                icon: '🎮',
                gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                reason: '다양한 영웅들의 능력을 활용한 팀 플레이! 역할 분담이 중요합니다.',
                tags: ['무료', '영웅 슈팅', '팀 플레이']
            },
            {
                name: '마인크래프트',
                genre: 'SANDBOX',
                platform: ['PC', 'Mobile', 'Console'],
                playStyle: ['casual', 'multiplayer'],
                rating: 9.5,
                icon: '⛏️',
                gradient: 'linear-gradient(135deg, #84cc16 0%, #65a30d 100%)',
                reason: '무한한 창의성의 세계! 친구들과 함께 건축하고 모험하세요.',
                tags: ['샌드박스', '건축', '서바이벌']
            },
            {
                name: '카트라이더: 드리프트',
                genre: 'RACING',
                platform: ['PC'],
                playStyle: ['competitive', 'casual', 'multiplayer'],
                rating: 8.2,
                icon: '🏎️',
                gradient: 'linear-gradient(135deg, #00d4ff 0%, #0099ff 100%)',
                reason: 'PC방 레이싱 게임의 아이콘! 드리프트의 짜릿함을 느껴보세요.',
                tags: ['무료', '레이싱', '캐주얼']
            },
            {
                name: '스타크래프트',
                genre: 'STRATEGY',
                platform: ['PC'],
                playStyle: ['competitive'],
                rating: 9.0,
                icon: '🚀',
                gradient: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
                reason: 'e스포츠의 전설! 전략과 컨트롤이 중요한 RTS의 정석입니다.',
                tags: ['무료', 'RTS', '전략']
            },
            {
                name: '이터널 리턴',
                genre: 'ACTION',
                platform: ['PC'],
                playStyle: ['competitive', 'multiplayer'],
                rating: 8.3,
                icon: '⚔️',
                gradient: 'linear-gradient(135deg, #9333ea 0%, #7e22ce 100%)',
                reason: 'MOBA + 배틀로얄! 독특한 조합의 한국산 게임입니다.',
                tags: ['무료', '배틀로얄', 'MOBA']
            },
            {
                name: '팀파이트 택틱스',
                genre: 'STRATEGY',
                platform: ['PC', 'Mobile'],
                playStyle: ['casual', 'competitive'],
                rating: 8.5,
                icon: '♟️',
                gradient: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',
                reason: '오토 체스의 재미! 전략적 사고를 즐기시는 분께 추천합니다.',
                tags: ['무료', '오토체스', '전략']
            },
            {
                name: '디아블로 4',
                genre: 'RPG',
                platform: ['PC', 'Console'],
                playStyle: ['story', 'multiplayer'],
                rating: 8.6,
                icon: '😈',
                gradient: 'linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%)',
                reason: '핵앤슬래시 RPG의 정점! 끝없는 파밍과 육성의 재미.',
                tags: ['유료', 'RPG', '협동']
            },
            {
                name: '원신',
                genre: 'RPG',
                platform: ['PC', 'Mobile', 'Console'],
                playStyle: ['casual', 'story'],
                rating: 9.0,
                icon: '✨',
                gradient: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
                reason: '아름다운 오픈월드와 매력적인 캐릭터들! 무료로 즐기는 콘솔급 퀄리티.',
                tags: ['무료', 'RPG', '오픈월드']
            },
            {
                name: '블루 아카이브',
                genre: 'MOBILE',
                platform: ['Mobile'],
                playStyle: ['casual', 'story'],
                rating: 8.7,
                icon: '🎓',
                gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                reason: '탄탄한 스토리와 귀여운 캐릭터! 모바일로 편하게 즐기세요.',
                tags: ['무료', '모바일', '수집']
            }
        ];
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateStepIndicators();
    }

    setupEventListeners() {
        // 옵션 카드 클릭
        document.querySelectorAll('.option-card').forEach(card => {
            card.addEventListener('click', (e) => {
                this.selectOption(card);
            });
        });

        // 다음 버튼
        document.getElementById('nextBtn').addEventListener('click', () => {
            this.nextStep();
        });

        // 이전 버튼
        document.getElementById('prevBtn').addEventListener('click', () => {
            this.prevStep();
        });
    }

    selectOption(card) {
        const step = this.currentStep;
        const value = card.dataset.value;

        if (step === 1) {
            // 장르는 다중 선택 가능
            card.classList.toggle('selected');
            if (card.classList.contains('selected')) {
                this.answers.genres.push(value);
            } else {
                this.answers.genres = this.answers.genres.filter(g => g !== value);
            }
        } else {
            // 플랫폼과 플레이 스타일은 단일 선택
            const siblings = card.parentElement.querySelectorAll('.option-card');
            siblings.forEach(s => s.classList.remove('selected'));
            card.classList.add('selected');

            if (step === 2) {
                this.answers.platform = value;
            } else if (step === 3) {
                this.answers.playStyle = value;
            }
        }
    }

    nextStep() {
        if (this.currentStep < this.maxSteps) {
            // 현재 단계 검증
            if (!this.validateStep()) {
                ToastNotification.show('최소 하나 이상 선택해주세요!', 'warning');
                return;
            }

            // 현재 단계 숨기기
            document.getElementById(`step${this.currentStep}`).style.display = 'none';
            
            // 다음 단계로
            this.currentStep++;
            
            if (this.currentStep === this.maxSteps) {
                // 결과 표시
                this.showResults();
                document.getElementById('nextBtn').style.display = 'none';
            } else {
                // 다음 질문 표시
                document.getElementById(`step${this.currentStep}`).style.display = 'block';
            }

            this.updateStepIndicators();
            this.updateButtons();
        }
    }

    prevStep() {
        if (this.currentStep > 1) {
            // 결과 화면이었다면 숨기기
            if (this.currentStep === this.maxSteps) {
                document.getElementById('result').classList.remove('show');
                document.getElementById('nextBtn').style.display = 'block';
            } else {
                document.getElementById(`step${this.currentStep}`).style.display = 'none';
            }
            
            this.currentStep--;
            document.getElementById(`step${this.currentStep}`).style.display = 'block';
            
            this.updateStepIndicators();
            this.updateButtons();
        }
    }

    validateStep() {
        if (this.currentStep === 1) {
            return this.answers.genres.length > 0;
        } else if (this.currentStep === 2) {
            return this.answers.platform !== null;
        } else if (this.currentStep === 3) {
            return this.answers.playStyle !== null;
        }
        return true;
    }

    updateStepIndicators() {
        document.querySelectorAll('.wizard-step').forEach((step, index) => {
            const stepNum = index + 1;
            step.classList.remove('active', 'completed');
            
            if (stepNum < this.currentStep) {
                step.classList.add('completed');
            } else if (stepNum === this.currentStep) {
                step.classList.add('active');
            }
        });
    }

    updateButtons() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        prevBtn.style.display = this.currentStep > 1 ? 'block' : 'none';
        
        if (this.currentStep === this.maxSteps - 1) {
            nextBtn.textContent = '결과 보기 🎉';
        } else {
            nextBtn.textContent = '다음 →';
        }
    }

    calculateMatch(game) {
        let score = 0;
        let totalWeight = 0;

        // 장르 매칭 (가중치: 40%)
        const genreWeight = 40;
        if (this.answers.genres.includes(game.genre) || 
            (this.answers.genres.includes('STRATEGY') && game.genre === 'STRATEGY')) {
            score += genreWeight;
        }
        totalWeight += genreWeight;

        // 플랫폼 매칭 (가중치: 30%)
        const platformWeight = 30;
        if (this.answers.platform === 'All' || 
            game.platform.includes(this.answers.platform)) {
            score += platformWeight;
        }
        totalWeight += platformWeight;

        // 플레이 스타일 매칭 (가중치: 30%)
        const styleWeight = 30;
        if (game.playStyle.includes(this.answers.playStyle)) {
            score += styleWeight;
        }
        totalWeight += styleWeight;

        return Math.round((score / totalWeight) * 100);
    }

    showResults() {
        const resultContainer = document.getElementById('result');
        const gamesContainer = document.getElementById('recommendedGames');
        
        // 매칭 점수 계산
        const gamesWithScores = this.games.map(game => ({
            ...game,
            matchScore: this.calculateMatch(game)
        }));

        // 점수 순으로 정렬하고 상위 6개 선택
        const topGames = gamesWithScores
            .sort((a, b) => b.matchScore - a.matchScore)
            .slice(0, 6);

        // 결과 렌더링
        gamesContainer.innerHTML = topGames.map(game => `
            <div class="game-result-card">
                <div class="game-result-image" style="background: ${game.gradient}">
                    <span style="font-size: 60px;">${game.icon}</span>
                    <div class="match-badge">${game.matchScore}% 매치</div>
                </div>
                <div class="game-result-content">
                    <h3 class="game-result-title">${game.name}</h3>
                    <div class="game-result-tags">
                        ${game.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                        <span style="color: #fbbf24;">⭐ ${game.rating}/10</span>
                        <span style="color: var(--text-tertiary);">|</span>
                        <span style="color: var(--text-secondary);">${game.genre}</span>
                    </div>
                    <div class="game-result-reason">
                        <h4>💡 추천 이유</h4>
                        <p>${game.reason}</p>
                    </div>
                </div>
            </div>
        `).join('');

        resultContainer.classList.add('show');

        // 결과 저장
        StorageManager.set('lastRecommendation', {
            date: new Date().toISOString(),
            answers: this.answers,
            results: topGames.map(g => g.name)
        });

        ToastNotification.show('추천 결과를 확인하세요! 🎉', 'success');
    }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    new GameWizard();
});
