# 다른 웹앱으로 이식할 때 체크리스트

아래 순서대로 적용하면 **COS 수준의 라이트 오로라·글래스 UI**를 빠르게 재현할 수 있습니다.

## 1. 의존성·빌드

- [ ] Next.js + React + TypeScript
- [ ] Tailwind CSS v4 + `@tailwindcss/postcss` + PostCSS
- [ ] `tw-animate-css` import (`globals.css`)
- [ ] `framer-motion` (히어로·내비·모바일 메뉴 모션)
- [ ] `lucide-react` (아이콘 필요 시)
- [ ] `next/font`: Geist, Geist Mono, Playfair Display — 또는 브랜드에 맞는 대체 폰트

## 2. 글로벌 CSS

- [ ] `:root` / `.dark` OKLCH 토큰 블록 복사 후 브랜드색 수정
- [ ] `@theme inline` 매핑 복사
- [ ] `@layer base`: `border-border`, `outline-ring/50`
- [ ] `html`: `font-size: 22px`, `scroll-behavior: smooth`, 배경 `#fffefb`
- [ ] `body`: `bg-[#fffefb]`, `text-[#374151]`, `antialiased`, overflow 규칙
- [ ] WebKit 스크롤바, `::selection`
- [ ] `.bg-color-of-soul`, `.aurora-over-spline`, `.aurora-screen-glow`, `.bg-color-of-soul-grain`

## 3. 레이아웃

- [ ] 루트 `body`에 폰트 CSS 변수 클래스 부여
- [ ] `selection:bg-[#00FF88]/30` (또는 브랜드 선택색)
- [ ] `:root` 에 `--nav-rail-width` 및 본문 `lg:pl-[var(--nav-rail-width)]` (고정 좌측 내비 사용 시)

## 4. 배경 (택일 또는 병행)

### Spline 3D

- [ ] `SplineBackground` 컴포넌트: iframe URL, `112vmax`, 필터, `visibilitychange`, 로딩 페이드
- [ ] 오버레이 div 스택 (비네트, 코너, 그레인)
- [ ] `globals.css` 오로라 클래스

### Spline 없음

- [ ] `AuroraBackground` 패턴: 이미지 + blur blob + rAF
- [ ] 동일 글래스 카드로 전경 통일

## 5. UI 패턴

- [ ] 섹션 카드: `border-white/35 bg-white/40 backdrop-blur-md shadow-2xl shadow-purple-500/5`
- [ ] 히어로 인트로/메인 씬: `HeroTransition` 패턴 또는 동등한 모션
- [ ] 좌측 내비: `fixed`, 인트로 후 표시, `group` + `hover:translate-x-2`
- [ ] 모바일 내비: 오버레이·포커스 트랩·Escape (COS: `SectionNavMobile`)
- [ ] 섹션 제목: `font-serif italic` + 반응형 크기
- [ ] 푸터 글래스: `bg-white/[0.12]`, `backdrop-blur-md`

## 6. 애니메이션·품질

- [ ] 트랜지션 duration 일관성 (예: 700ms 카드, 1000ms 페이드)
- [ ] `focus-visible` 아웃라인
- [ ] `next/image`에 `sizes`/`priority` 적절히 설정

## 7. 검증

- [ ] 라이트하우스 접근성·대비 (특히 글래스 위 텍스트)
- [ ] 모바일: blur·fixed 레이어·스크롤
- [ ] 탭 전환 시 Spline GPU 사용량 (선택)

---

## 파일 매핑 (COS → 새 프로젝트)

| COS 경로 | 이식 |
|----------|------|
| `src/app/globals.css` | 글로벌 스타일 + 커스텀 클래스 |
| `src/app/layout.tsx` | 폰트·메타·Analytics |
| `src/constants/section-nav.ts` | 앵커 내비 항목 |
| `src/components/spline-background.tsx` | 3D 배경 |
| `src/components/hero-transition.tsx` | 인트로·메인 히어로 모션 |
| `src/components/section-nav-mobile.tsx` | 모바일 섹션 메뉴 |
| `src/components/collaboration-footer.tsx` | 협업 푸터 |
| `src/components/mockup-home.tsx` | 페이지 셸 레퍼런스 |
| `src/components/*-content.tsx` | 섹션별 타이포·레이아웃 샘플 |
| `mockup_ani/reference/App.tsx` | 카드·그리드 호버 데모 |
| `mockup_main/components/aurora-background.tsx` | Spline 대안 |

---

*문서 끝.*
