# 타이포그래피·레이아웃

## 폰트 (next/font)

`src/app/layout.tsx`에서 로드합니다.

| 변수 | 폰트 | 용도 |
|------|------|------|
| `--font-geist` | Geist | 본문·UI 기본 (`font-sans`) |
| `--font-geist-mono` | Geist Mono | 내비 번호, 기술 라벨 (`font-mono`) |
| `--font-playfair` | Playfair Display (normal + italic) | 섹션 제목, 인용문 느낌 (`font-serif`, `italic`) |

`@theme inline`에서:

- `--font-sans`, `--font-mono`, `--font-serif`가 위 변수와 연결됩니다.

`:root` 에 **고정 내비 레일 폭** `--nav-rail-width: 12.5rem` 이 있으며, 인트로가 끝난 뒤 본문 래퍼에 `lg:pl-[var(--nav-rail-width)]` 를 주어 가운데 컬럼이 좌측 내비에 가리지 않도록 합니다.

## 루트 스케일

`globals.css`의 `html`:

- `font-size: 22px` — 기본 16px 대비 **약 1.375배**로 전체 UI를 키움
- `scroll-behavior: smooth` — 앵커 이동 시 부드러운 스크롤

신규 프로젝트에서 `rem`/`text-base`에 의존하는 컴포넌트를 붙일 때는 이 스케일을 염두에 두어야 합니다.

## 본문·계층

| 패턴 | 클래스 |
|------|--------|
| 페이지 기본 | `font-sans`, `text-gray-800` (mockup-home) |
| 히어로/섹션 제목 | `font-serif text-3xl italic md:text-4xl lg:text-5xl text-card-foreground` |
| 본문 단락 | `text-sm` ~ `text-base`, `leading-relaxed`, `text-card-foreground/90` |
| 영문 보조 | `text-xs` ~ `text-sm`, `text-card-foreground/75`, 우측 정렬 블록 |
| 라벨·메타 | `font-mono text-xs uppercase tracking-wider text-gray-400` |
| 서비스 스텝 타이틀 | `uppercase tracking-[0.22em] font-extralight` |

## 스크롤바 (WebKit)

`globals.css` `::-webkit-scrollbar`:

- 너비 `6px`, track 투명, thumb 연한 블루 반투명, `border-radius: 10px`

## 레이아웃 패턴

### 전체 스택

1. **배경**: `fixed inset-0 z-0` — Spline + 오버레이
2. **콘텐츠**: `relative z-10` — 스크롤 가능한 본문
3. **내비**: 인트로 종료 후에만 표시 — 좌측 `fixed z-50` 세로 레일(`lg:flex`), 모바일은 우상단 버튼 + 오버레이 패널(`SectionNavMobile`, `z-[60]` 대역)

### 포인터 이벤트

- 배경 전체는 클릭 불필요할 수 있으므로, 목업에서는 바깥 래퍼에 `pointer-events-none`을 주고 **실제 클릭 영역만 `pointer-events-auto`**를 주는 패턴이 있습니다.
- `mockup-home.tsx`: 히어로용 `main`은 `pointer-events-auto`, 내부 빈 main은 placeholder로 유지 가능.

### 섹션 스크롤

- 앵커 링크: `#about`, `#service` 등
- `scroll-mt-8` (또는 헤더 높이에 맞게)로 고정 내비에 가리지 않게 여백

### 최대 너비

- 본문 카드: `max-w-4xl mx-auto`
- 서비스 내부 카드: `max-w-md` ~ `max-w-xl`
- Contact 지도 이미지: `max-w-[min(100%,520px)]` 등 responsive `min()` / `vw` 혼합

## z-index 요약 (배경)

| 레이어 | 대략적 z |
|--------|----------|
| Spline iframe 래퍼 | 0 |
| 로딩 스플래시 | 3 |
| 오로라·비네트·그레인 | 1 ~ 2 |
| 페이지 콘텐츠 | 10 |
| 내비 | 50 |
| 푸터 협업 블록 | 20 |

자세한 레이어 스택은 [04-background-3d-and-layers.md](./04-background-3d-and-layers.md) 참고.
