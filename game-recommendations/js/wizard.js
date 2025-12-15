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
                image: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt7ce7c20f16332775/5db05fa8347d1c6baa57be25/001-Server-Browser.jpg',
                gradient: 'linear-gradient(135deg, #0a1428 0%, #091428 50%, #0e2347 100%)',
                pattern: 'radial-gradient(circle at 20% 50%, rgba(14, 165, 233, 0.15) 0%, transparent 50%)',
                reason: 'PC방 1위 MOBA 게임! 전략적 팀 플레이와 경쟁을 즐기시는 분에게 완벽합니다.',
                tags: ['무료', 'e스포츠', '팀 플레이']
            },
            {
                name: '리그 오브 레전드: 와일드 리프트',
                genre: 'MOBA',
                platform: ['모바일'],
                playStyle: ['competitive', 'multiplayer'],
                rating: 8.5,
                icon: '⚔️',
                gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                reason: '모바일에서 즐기는 롤! 15분 안에 끝나는 빠른 템포의 MOBA입니다.',
                tags: ['무료', 'MOBA', '모바일']
            },
            {
                name: '포켓몬 유나이트',
                genre: 'MOBA',
                platform: ['모바일', '콘솔'],
                playStyle: ['casual', 'multiplayer'],
                rating: 7.8,
                icon: '⚡',
                gradient: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',
                reason: '포켓몬과 함께하는 MOBA! 10분 단위의 캐주얼한 팀 전투를 즐겨보세요.',
                tags: ['무료', 'MOBA', '포켓몬']
            },
            {
                name: '배틀그라운드 PC',
                genre: 'FPS',
                platform: ['PC', '콘솔'],
                playStyle: ['competitive', 'multiplayer'],
                rating: 8.5,
                icon: '🎯',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/578080/header.jpg',
                gradient: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #3d2a1f 100%)',
                pattern: 'radial-gradient(circle at 80% 20%, rgba(247, 127, 0, 0.2) 0%, transparent 50%)',
                reason: '배틀로얄의 원조! 친구들과 치킨을 먹는 짜릿함을 경험하세요.',
                tags: ['배틀로얄', '생존', '무료']
            },
            {
                name: 'PUBG 모바일',
                genre: 'FPS',
                platform: ['모바일'],
                playStyle: ['competitive', 'multiplayer'],
                rating: 8.4,
                icon: '📱',
                gradient: 'linear-gradient(135deg, #f77f00 0%, #d62828 100%)',
                reason: '모바일 배틀로얄의 강자! 100명이 펼치는 생존 게임.',
                tags: ['배틀로얄', '모바일', '무료']
            },
            {
                name: '발로란트',
                genre: 'FPS',
                platform: ['PC'],
                playStyle: ['competitive', 'multiplayer'],
                rating: 8.8,
                icon: '⚡',
                image: 'https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/de051ef78ee42c28303a1edecf0e361751b7a83f-1920x1080.jpg',
                gradient: 'linear-gradient(135deg, #0f1923 0%, #ff4655 50%, #bd3944 100%)',
                pattern: 'radial-gradient(circle at 30% 40%, rgba(255, 70, 85, 0.25) 0%, transparent 50%)',
                reason: '전술 슈팅과 캐릭터 능력이 결합된 신개념 FPS! 전략적 플레이를 좋아하신다면 최고입니다.',
                tags: ['무료', '전술 슈팅', '5vs5']
            },
            {
                name: '콜 오브 듀티 모바일',
                genre: 'FPS',
                platform: ['모바일'],
                playStyle: ['competitive', 'casual', 'multiplayer'],
                rating: 8.4,
                icon: '🔫',
                gradient: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                reason: '콘솔급 FPS를 모바일에서! 다양한 모드와 맵으로 즐겨보세요.',
                tags: ['무료', 'FPS', '모바일']
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
                name: '리니지M',
                genre: 'MMORPG',
                platform: ['모바일'],
                playStyle: ['competitive', 'multiplayer'],
                rating: 7.9,
                icon: '⚔️',
                gradient: 'linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%)',
                reason: '모바일 MMORPG의 강자! 혈맹 전투와 공성전의 짜릿함을 느껴보세요.',
                tags: ['유료', 'MMORPG', '공성전']
            },
            {
                name: '검은사막 모바일',
                genre: 'MMORPG',
                platform: ['모바일'],
                playStyle: ['casual', 'multiplayer', 'story'],
                rating: 8.2,
                icon: '🏜️',
                gradient: 'linear-gradient(135deg, #92400e 0%, #78350f 100%)',
                reason: '모바일에서 즐기는 화려한 액션 MMORPG! 캐릭터 커스터마이징이 뛰어납니다.',
                tags: ['무료', 'MMORPG', '오픈월드']
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
                name: 'FC 모바일',
                genre: 'SPORTS',
                platform: ['모바일'],
                playStyle: ['competitive', 'casual', 'multiplayer'],
                rating: 8.0,
                icon: '⚽',
                gradient: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                reason: '모바일에서 즐기는 축구 게임! 실제 선수들로 나만의 드림팀을 만들어보세요.',
                tags: ['무료', '축구', '모바일']
            },
            {
                name: 'NBA 2K 모바일',
                genre: 'SPORTS',
                platform: ['모바일'],
                playStyle: ['competitive', 'casual'],
                rating: 7.9,
                icon: '🏀',
                gradient: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
                reason: '농구 팬이라면 필수! 실제 NBA 선수들과 함께하는 농구 게임입니다.',
                tags: ['무료', '농구', '모바일']
            },
            {
                name: '던전앤파이터',
                genre: 'ACTION',
                platform: ['PC'],
                playStyle: ['competitive', 'multiplayer'],
                rating: 8.6,
                icon: '👊',
                gradient: 'linear-gradient(135deg, #1a1625 0%, #ec4899 50%, #db2777 100%)',
                pattern: 'radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.2) 0%, transparent 70%)',
                reason: '최고의 타격감! 다양한 직업으로 던전을 정복하는 재미가 끝내줍니다.',
                tags: ['무료', '액션', 'RPG']
            },
            {
                name: '브롤스타즈',
                genre: 'ACTION',
                platform: ['모바일'],
                playStyle: ['competitive', 'casual', 'multiplayer'],
                rating: 8.4,
                icon: '⭐',
                gradient: 'linear-gradient(135deg, #fef3c7 0%, #fbbf24 50%, #f59e0b 100%)',
                pattern: 'repeating-radial-gradient(circle at 30% 30%, transparent 0, transparent 20px, rgba(251, 191, 36, 0.1) 20px, rgba(251, 191, 36, 0.1) 40px)',
                reason: '3분 안에 끝나는 짧고굵은 배틀! 친구들과 함께 즐기기 좋습니다.',
                tags: ['무료', '모바일', '팀전']
            },
            {
                name: '클래시 로얄',
                genre: 'ACTION',
                platform: ['모바일'],
                playStyle: ['competitive', 'casual'],
                rating: 8.1,
                icon: '👑',
                image: 'https://clashroyale.com/uploaded-images-blog/CR_Social.jpg',
                gradient: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)',
                pattern: 'radial-gradient(circle at 70% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
                reason: '전략과 타이밍이 중요한 실시간 대전! 카드 조합의 재미를 느껴보세요.',
                tags: ['무료', '모바일', '전략']
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
                platform: ['PC', '콘솔'],
                playStyle: ['competitive', 'casual', 'multiplayer'],
                rating: 8.4,
                icon: '🎮',
                gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                reason: '다양한 영웅들의 능력을 활용한 팀 플레이! 역할 분담이 중요합니다.',
                tags: ['무료', '영웅 슈팅', '팀 플레이']
            },
            {
                name: '에이펙스 레전드 모바일',
                genre: 'FPS',
                platform: ['모바일'],
                playStyle: ['competitive', 'multiplayer'],
                rating: 8.0,
                icon: '🎖️',
                gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                reason: '레전드들의 특수 능력을 활용한 배틀로얄! 팀워크가 승리의 열쇠입니다.',
                tags: ['무료', '배틀로얄', '영웅']
            },
            {
                name: '마인크래프트',
                genre: 'SANDBOX',
                platform: ['PC', '모바일', '콘솔'],
                playStyle: ['casual', 'multiplayer'],
                rating: 9.5,
                icon: '⛏️',
                image: 'https://www.minecraft.net/content/dam/games/minecraft/key-art/Games_Subnav_Minecraft-300x465.jpg',
                gradient: 'linear-gradient(135deg, #1a5c1a 0%, #2d7a2d 50%, #4a9d4a 100%)',
                pattern: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(132, 204, 22, 0.1) 10px, rgba(132, 204, 22, 0.1) 20px)',
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
                name: '카트라이더 러쉬플러스',
                genre: 'RACING',
                platform: ['모바일'],
                playStyle: ['competitive', 'casual', 'multiplayer'],
                rating: 7.8,
                icon: '🏁',
                gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                reason: '손끝에서 즐기는 카트 레이싱! 언제 어디서나 드리프트를 즐겨보세요.',
                tags: ['무료', '레이싱', '모바일']
            },
            {
                name: '아스팔트 9',
                genre: 'RACING',
                platform: ['모바일'],
                playStyle: ['competitive', 'casual'],
                rating: 8.3,
                icon: '🏎️',
                gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                reason: '화려한 그래픽의 리얼 레이싱! 세계 명차들을 모바일에서 즐기세요.',
                tags: ['무료', '레이싱', '아케이드']
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
                name: '클래시 오브 클랜',
                genre: 'STRATEGY',
                platform: ['모바일'],
                playStyle: ['casual', 'multiplayer'],
                rating: 8.6,
                icon: '⚔️',
                gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                reason: '전략적인 마을 건설과 클랜 전쟁! 전세계 유저들과 겨뤄보세요.',
                tags: ['무료', '전략', '모바일']
            },
            {
                name: '로드 모바일',
                genre: 'STRATEGY',
                platform: ['모바일'],
                playStyle: ['competitive', 'multiplayer'],
                rating: 7.7,
                icon: '🏰',
                gradient: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
                reason: '성을 건설하고 군대를 키워 세계를 정복하세요! 길드 전투가 핵심입니다.',
                tags: ['무료', '전략', 'MMO']
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
                platform: ['PC', '모바일'],
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
                platform: ['PC', '콘솔'],
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
                platform: ['PC', '모바일', '콘솔'],
                playStyle: ['casual', 'story'],
                rating: 9.0,
                icon: '✨',
                image: 'https://genshin.hoyoverse.com/content/yuanshen/getContentList?content_id=1466',
                gradient: 'linear-gradient(135deg, #1e3a8a 0%, #5b21b6 50%, #ec4899 100%)',
                pattern: 'radial-gradient(circle at 70% 30%, rgba(139, 92, 246, 0.3) 0%, transparent 60%)',
                reason: '아름다운 오픈월드와 매력적인 캐릭터들! 무료로 즐기는 콘솔급 퀄리티.',
                tags: ['무료', 'RPG', '오픈월드']
            },
            {
                name: '붕괴: 스타레일',
                genre: 'RPG',
                platform: ['PC', '모바일'],
                playStyle: ['casual', 'story'],
                rating: 8.8,
                icon: '🚂',
                gradient: 'linear-gradient(135deg, #2e1065 0%, #f472b6 50%, #ec4899 100%)',
                pattern: 'radial-gradient(circle at 40% 40%, rgba(244, 114, 182, 0.3) 0%, transparent 70%)',
                reason: '턴제 전투의 전략성과 매력적인 스토리! 원신 제작사의 SF RPG입니다.',
                tags: ['무료', 'RPG', '턴제']
            },
            {
                name: '블루 아카이브',
                genre: '모바일',
                platform: ['모바일'],
                playStyle: ['casual', 'story'],
                rating: 8.7,
                icon: '🎓',
                gradient: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)',
                pattern: 'repeating-linear-gradient(45deg, transparent, transparent 15px, rgba(59, 130, 246, 0.1) 15px, rgba(59, 130, 246, 0.1) 30px)',
                reason: '탄탄한 스토리와 귀여운 캐릭터! 모바일로 편하게 즐기세요.',
                tags: ['무료', '모바일', '수집']
            },
            {
                name: '승리의 여신: 니케',
                genre: '모바일',
                platform: ['모바일'],
                playStyle: ['casual', 'story'],
                rating: 8.3,
                icon: '🎯',
                gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                reason: '화려한 그래픽의 슈팅 RPG! 매력적인 캐릭터와 액션이 돋보입니다.',
                tags: ['무료', '슈팅', '수집']
            },
            {
                name: '쿠키런: 킹덤',
                genre: '모바일',
                platform: ['모바일'],
                playStyle: ['casual'],
                rating: 8.1,
                icon: '🍪',
                gradient: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)',
                reason: '귀여운 쿠키들과 함께하는 왕국 건설! 남녀노소 즐길 수 있습니다.',
                tags: ['무료', '전략', '캐주얼']
            },
            {
                name: 'eFootball 2024',
                genre: 'SPORTS',
                platform: ['PC', '모바일', '콘솔'],
                playStyle: ['competitive', 'casual', 'multiplayer'],
                rating: 8.0,
                icon: '⚽',
                gradient: 'linear-gradient(135deg, #064e3b 0%, #00a651 50%, #34d399 100%)',
                pattern: 'repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(0, 166, 81, 0.1) 50px, rgba(0, 166, 81, 0.1) 100px)',
                reason: '무료로 즐기는 리얼 축구! 모든 플랫폼에서 크로스플레이가 가능합니다.',
                tags: ['무료', '축구', '크로스플레이']
            },
            {
                name: '명조',
                genre: 'MMORPG',
                platform: ['PC', '모바일'],
                playStyle: ['competitive', 'multiplayer', 'story'],
                rating: 8.7,
                icon: '⚔️',
                image: 'https://wutheringwaves.kurogames.com/assets/banner.jpg',
                gradient: 'linear-gradient(135deg, #1e293b 0%, #4a5568 50%, #64748b 100%)',
                pattern: 'radial-gradient(circle at 60% 40%, rgba(74, 85, 104, 0.3) 0%, transparent 60%)',
                reason: '쿠로게임즈의 오픈월드 액션 RPG! 화려한 전투와 아름다운 그래픽.',
                tags: ['무료', 'MMORPG', '오픈월드']
            },
            {
                name: 'Honor of Kings',
                genre: 'MOBA',
                platform: ['모바일'],
                playStyle: ['competitive', 'multiplayer'],
                rating: 8.9,
                icon: '👑',
                gradient: 'linear-gradient(135deg, #7c2d12 0%, #fbbf24 50%, #fef3c7 100%)',
                pattern: 'radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.3) 0%, transparent 70%)',
                reason: '중국 1위 모바일 MOBA! 빠른 게임 진행과 다양한 영웅들.',
                tags: ['무료', 'MOBA', '모바일']
            },
            {
                name: 'APEX 레전드',
                genre: 'FPS',
                platform: ['PC', '콘솔'],
                playStyle: ['competitive', 'multiplayer'],
                rating: 8.8,
                icon: '🎖️',
                image: 'https://media.contentapi.ea.com/content/dam/apex-legends/images/2019/01/apex-featured-image-16x9.jpg.adapt.crop191x100.1200w.jpg',
                gradient: 'linear-gradient(135deg, #1a1a1a 0%, #ef4444 50%, #dc2626 100%)',
                pattern: 'radial-gradient(circle at 70% 30%, rgba(239, 68, 68, 0.3) 0%, transparent 60%)',
                reason: '레전드들의 특수 능력을 활용한 배틀로얄! 역동적인 전투가 특징.',
                tags: ['무료', '배틀로얄', '영웅']
            },
            {
                name: '도타 2',
                genre: 'MOBA',
                platform: ['PC'],
                playStyle: ['competitive', 'multiplayer'],
                rating: 9.0,
                icon: '🐉',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/570/header.jpg',
                gradient: 'linear-gradient(135deg, #450a0a 0%, #dc2626 50%, #991b1b 100%)',
                pattern: 'radial-gradient(circle at 40% 60%, rgba(220, 38, 38, 0.25) 0%, transparent 70%)',
                reason: 'MOBA의 전설! 복잡하지만 깊이 있는 전략성을 자랑합니다.',
                tags: ['무료', 'MOBA', 'e스포츠']
            },
            {
                name: '포트나이트',
                genre: 'FPS',
                platform: ['PC', '모바일', '콘솔'],
                playStyle: ['competitive', 'casual', 'multiplayer'],
                rating: 8.7,
                icon: '🔨',
                image: 'https://cdn2.unrealengine.com/fortnite-og-1920x1080-d25e1e79f94d.jpg',
                gradient: 'linear-gradient(135deg, #3730a3 0%, #8b5cf6 50%, #c084fc 100%)',
                pattern: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(139, 92, 246, 0.1) 20px, rgba(139, 92, 246, 0.1) 40px)',
                reason: '건축 + 배틀로얄! 창의적인 전투와 다양한 협업 콘텐츠.',
                tags: ['무료', '배틀로얄', '건축']
            },
            {
                name: 'GTA 5',
                genre: 'ACTION',
                platform: ['PC', '콘솔'],
                playStyle: ['story', 'multiplayer'],
                rating: 9.5,
                icon: '🚗',
                image: 'https://media.rockstargames.com/rockstargames-newsite/img/global/games/fob/1280/V.jpg',
                gradient: 'linear-gradient(135deg, #052e16 0%, #16a34a 50%, #22c55e 100%)',
                pattern: 'radial-gradient(circle at 80% 20%, rgba(22, 163, 74, 0.2) 0%, transparent 60%)',
                reason: '오픈월드 액션의 정점! 자유도 높은 게임플레이와 방대한 콘텐츠.',
                tags: ['유료', '오픈월드', '액션']
            },
            {
                name: 'PUBG 모바일',
                genre: 'FPS',
                platform: ['모바일'],
                playStyle: ['competitive', 'multiplayer'],
                rating: 8.4,
                icon: '🎯',
                gradient: 'linear-gradient(135deg, #f77f00 0%, #d62828 100%)',
                reason: '모바일 배틀로얄의 강자! 100명이 펼치는 생존 게임.',
                tags: ['무료', '배틀로얄', '모바일']
            },
            {
                name: '하스스톤',
                genre: 'STRATEGY',
                platform: ['PC', '모바일'],
                playStyle: ['competitive', 'casual'],
                rating: 8.5,
                icon: '🃏',
                gradient: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                reason: '블리자드의 카드 게임! 전략적 사고와 덱 빌딩의 재미.',
                tags: ['무료', '카드', '전략']
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

        // 플랫폼 매칭 (가중치: 30%) - 정확한 매칭만 허용
        const platformWeight = 30;
        if (this.answers.platform === 'All') {
            score += platformWeight;
        } else {
            // 플랫폼 이름 정규화 (Mobile -> 모바일, Console -> 콘솔)
            const normalizedPlatform = this.answers.platform === '모바일' ? '모바일' : 
                                      this.answers.platform === '콘솔' ? '콘솔' : 
                                      this.answers.platform;
            
            // 게임의 플랫폼 목록을 정규화하여 확인
            const normalizedGamePlatforms = game.platform.map(p => 
                p === '모바일' ? '모바일' : p === '콘솔' ? '콘솔' : p
            );
            
            if (normalizedGamePlatforms.includes(normalizedPlatform)) {
                score += platformWeight;
            } else {
                // 플랫폼이 맞지 않으면 0점 반환하여 추천 제외
                return 0;
            }
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
        
        // 매칭 점수 계산 (0점인 게임 제외)
        const gamesWithScores = this.games
            .map(game => ({
                ...game,
                matchScore: this.calculateMatch(game)
            }))
            .filter(game => game.matchScore > 0);

        // 점수 순으로 정렬하고 상위 6개 선택
        const topGames = gamesWithScores
            .sort((a, b) => b.matchScore - a.matchScore)
            .slice(0, 6);

        // 결과가 없을 경우 처리
        if (topGames.length === 0) {
            gamesContainer.innerHTML = `
                <div style="text-align: center; padding: 40px; grid-column: 1/-1;">
                    <p style="font-size: 20px; color: var(--text-secondary);">😢 조건에 맞는 게임을 찾지 못했습니다.</p>
                    <p style="margin-top: 10px; color: var(--text-tertiary);">다른 조건으로 다시 시도해보세요!</p>
                </div>
            `;
        } else {
            // 결과 렌더링
            gamesContainer.innerHTML = topGames.map(game => {
                // 이미지가 있으면 이미지를, 없으면 gradient + icon 사용
                let imageStyle = '';
                if (game.image) {
                    imageStyle = `
                        background: linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%), url('${game.image}') center/cover;
                    `;
                } else {
                    imageStyle = `
                        background: ${game.gradient};
                        ${game.pattern ? `background-image: ${game.pattern}, ${game.gradient};` : ''}
                        position: relative;
                    `;
                }
                
                return `
                <div class="game-result-card">
                    <div class="game-result-image" style="${imageStyle}">
                        ${!game.image ? `<span style="font-size: 60px; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));">${game.icon}</span>` : ''}
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
                `;
            }).join('');
        }

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
