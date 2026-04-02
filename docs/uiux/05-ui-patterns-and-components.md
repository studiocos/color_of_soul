# UI 패턴·컴포넌트

## 페이지 셸: `MockupHome`

**파일**: `src/components/mockup-home.tsx`

### 구조

- 최상위: `relative min-h-screen`, `font-sans text-gray-800`, `selection:bg-[#00FF88]/30`
- `<SplineBackground />` 고정 풀스크린
- **인트로 상태** (`introDone`): 최초 약 4.5초 동안 `HeroTransition` 만 풀뷰포트로 표시; 완료 후 좌측 내비·모바일 메뉴·본문 카드 스택이 활성화됨. 사용자가 아래로 스크롤했다가 메인 상단으로 돌아오면 인트로를 다시 재생
- 인트로 종료 후: 좌측 **fixed 내비** (`lg:flex`): `sectionNavItems` 기반, Framer Motion 스태거, `font-mono text-gray-500`, `hover:translate-x-2 hover:text-gray-800`
- 동일 시점에 **모바일** `SectionNavMobile`: 햄버거 → 오버레이·앵커 스크롤(`scrollIntoView`)
- 첫 카드: `HeroContent` + `AboutContent` (한 카드 안에 두 섹션) — `#about` 은 `HeroContent`, `#about-story` 는 `AboutContent`
- 이후 카드: Service → Gallery(`id="gallery"`) → Book → Contact + 하단 `CollaborationFooter`

**내비 데이터**: `src/constants/section-nav.ts` (`Main`, `About`, … `Contact` 와 `href` 매핑)

### 섹션 카드 공통 클래스

```text
relative rounded-sm border border-white/35 bg-white/40 px-4 py-10 shadow-2xl shadow-purple-500/5 backdrop-blur-md md:px-8
```

- **Gallery**만 패딩을 약간 줄인 변형 (`gallerySectionCardClassName`) — 그리드가 좁은 흰 띠에 안 갇히도록

### 글래스·그림자 패턴

| 효과 | 클래스/값 |
|------|-----------|
| 유리 | `bg-white/40` ~ `bg-white/70`, `backdrop-blur-md` ~ `backdrop-blur-sm` |
| 테두리 | `border-white/35` ~ `border-white/55` |
| 그림자 | `shadow-2xl shadow-purple-500/5`, 이미지 카드는 `shadow-sm` |
| 푸터 카드 | `bg-white/[0.12]`, `border-white/25`, 더 얇은 글래스 |

## 섹션별 요약

### `HeroTransition`

**파일**: `src/components/hero-transition.tsx`

- 씬 A: “COLOR OF soul” 인트로 — 블러 인·아웃, `.text-intro-color-of-soul` 그라데이션 타이포
- 씬 B: 메인 카피(영·한) — `mainLineVariants` 스태거, `.text-hero-main-en` / `.text-hero-main-ko`
- 내비용 `heroNavContainerVariants` / `heroNavItemVariants` 는 `mockup-home` 의 `motion.nav` / `motion.a` 와 함께 사용

### `HeroContent` / `AboutContent`

- 제목: Playfair serif, `italic`, 큰 반응형 스케일
- 한/영 병렬: 한글 왼쪽 정렬 블록 + 영문 오른쪽 정렬 블록 (`text-card-foreground/75`)

### `ServiceContent`

- 외곽: `bg-gradient-to-br from-[#FDE2F3]/40 via-violet-100/30 to-[#B2EBF2]/45`
- 스텝: 번호 `01.` 형식, `tracking-[0.22em]`, 내부 박스 `bg-white/70 border-white/55 shadow-sm backdrop-blur-sm`

### `EnergyGalleryMenu`

- `next/image` + `fill` + `aspect-[4/5]`
- `object-contain` + `scale-[1.22]` — 프레임 안에서 약간 확대된 느낌
- `sizes` 문자열로 반응형 로딩 최적화
- 그리드: `grid-cols-2 sm:grid-cols-3 lg:grid-cols-5`

### `BookContent` / `ContactContent`

- 제목은 동일 serif 스케일
- 본문은 **고정 픽셀 타이포** (`text-[14px]` 등)로 인쇄물·안내 문구 느낌 유지
- Contact: 지도 이미지 `rounded-sm border border-white/40 bg-white/30 shadow-inner shadow-purple-500/5`

### `CollaborationFooter`

**파일**: `src/components/collaboration-footer.tsx`

- Pole Star Labs 로고 `next/image`, 링크에 `hover:opacity-85`, `focus-visible:outline` (sky 계열)
- 협업 문구 중심 정렬, `tracking-widest`로 브랜드 간격

**문서·브랜드 참고 (Pole Star Labs)**

![Pole Star Labs 로고](../../public/polestar.JPG)

- **공식 웹사이트:** [https://www.polestar-labs.ai/](https://www.polestar-labs.ai/)

## 목업 전용 참고 컴포넌트 (`mockup_ani`)

### `App.tsx` 중앙 카드

- `bg-white/50 backdrop-blur-2xl border border-white/35`
- 내부 그래픽: `from-sky-100/90 via-violet-50/95 to-pink-100/85` 등 파스텔 그라데이션 박스
- SVG 장식 + 코너 화이트 도트
- 우측 리스트 + CSS 삼각형 (`border` 트릭) `border-r-gray-600`

### `ChatInterface` (엔트리 미사용)

- 라이트 글래스 채팅 패널: `backdrop-blur-xl bg-white/45 border-white/50`
- 헤더: `Sparkles` + `text-sky-500`, 온라인 점 `bg-emerald-400 animate-pulse`
- 말풍선·입력 필드: 밝은 회색 텍스트, 버튼 `transition-colors`, 로딩 `Loader2` + `animate-spin`
- 스크롤: `scrollIntoView({ behavior: 'smooth' })`

새 채팅 UI를 붙일 때 **레이아웃·클래스 패턴**만 가져오면 됩니다.

## 이미지 자산

- 갤러리: `/wood.png`, `/FIRE.png`, … `public/`
- 푸터: `/pole-star.png` (구현 참고) · 문서·브랜드 정본 이미지: `public/polestar.JPG`
- Contact: `/contact.JPG`
- `mockup_main`: `/images/aurora-bg.jpg` (오로라 배경 대안)

Next.js에서는 `next/image`의 `src`를 절대 경로로 지정; 외부 도메인이면 `next.config`에 `images.remotePatterns` 추가.
