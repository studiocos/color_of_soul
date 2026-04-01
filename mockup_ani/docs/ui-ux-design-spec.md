# Color of Soul — UI/UX·애니메이션·스타일 명세

이 문서는 현재 Vite + React 샘플에서 사용 중인 **시각 디자인, 레이어 구조, Tailwind 유틸리티, 커스텀 CSS, 인터랙션·애니메이션**을 Next.js 보일러플레이트 등으로 옮길 때 그대로 재현할 수 있도록 정리한 기준서입니다.

> **현재 엔트리**: `index.tsx`는 `App`만 마운트합니다. `ChatInterface`는 코드베이스에 포함되어 있으나 기본 랜딩에는 사용되지 않습니다. 아래에서 **랜딩(App)** 과 **채팅(선택)** 을 구분합니다.

---

## 1. 기술 스택·스타일링 방식

| 항목 | 내용 |
|------|------|
| 스타일 | **Tailwind CSS** (`index.html`에서 CDN `https://cdn.tailwindcss.com` 로드) |
| 로컬 CSS | **`index.css`** — 메시 배경(`.bg-color-of-soul`), 오로라 오버레이(`.aurora-over-spline`, `.aurora-screen-glow`), 그레인(`.bg-color-of-soul-grain`) |
| 글로벌 인라인 | `index.html`의 `<style>` — `html`/`body` 배경색, WebKit 스크롤바 |
| 아이콘 | **lucide-react** (`ArrowRight`, `Send`, `Sparkles`, `User`, `Bot`, `Loader2` 등) |
| 3D 배경 | **Spline** — `iframe`으로 외부 씬 URL 임베드. 색감은 CSS `filter` + 오버레이로 밝은 오로라 톤에 맞춤 |

---

## 2. 루트 HTML·글로벌 CSS (타이포 스케일·스크롤바·바디)

### 2.1 `html` 루트 폰트 크기

```html
<html lang="en" style="font-size: 22px;">
```

- **루트 `font-size: 22px`** 는 기본 `16px` 대비 약 **1.375배**로 전체 UI 스케일을 키웁니다.

### 2.2 `html` / `body` (폴백 배경·오버플로)

- `html` / `body` `background-color: #fffefb` — **밝은 크림·오로라 폴백** (Spline 로드 전·틈새)
- `body` `color: #374151` — 기본 본문 톤(랜딩 오버레이 텍스트는 `App`에서 `text-gray-800` 등으로 정의)
- `margin: 0; padding: 0;`
- `overflow: hidden`

### 2.3 WebKit 스크롤바 (라이트 UI)

| 규칙 | 값 |
|------|-----|
| 너비 | `6px` |
| track | `transparent` |
| thumb | `rgba(140, 170, 210, 0.35)`, `border-radius: 10px` |
| thumb:hover | `rgba(140, 170, 210, 0.55)` |

---

## 3. 색상 팔레트 (코드에 등장하는 값)

### 3.1 브랜드·강조

| 용도 | 값 | 참고 |
|------|-----|------|
| 텍스트 선택 하이라이트 | `#00FF88` @ 30% | `selection:bg-[#00FF88]/30` |
| 채팅 헤더 아이콘 | `text-sky-500` | Sparkles |
| 채팅 온라인 점 | `bg-emerald-400` | `animate-pulse` |

### 3.2 랜딩 카드 (글래스 + 파스텔 그래픽)

| 용도 | 클래스/값 |
|------|-----------|
| 카드 | `bg-white/50 backdrop-blur-2xl border border-white/35 shadow-2xl shadow-purple-500/5` |
| 그래픽 영역 | `bg-gradient-to-br from-sky-100/90 via-violet-50/95 to-pink-100/85`, `border border-white/50` |
| 내부 패널 | `from-sky-200/70 to-violet-200/65`, `border border-white/60`, `shadow-sky-200/40` |
| SVG 라인 | `stroke-sky-600/85`, `stroke-[0.8]` |
| 코너 도트 | `bg-white`, `opacity-80`, `shadow-sm` |
| 라벨 | `text-gray-400`, `uppercase`, `tracking-wider` |
| 제목 | `text-[#222222]`, `text-2xl`, `font-medium`, `tracking-tight` |
| 본문 | `text-gray-600`, `leading-relaxed` |
| 구분선 | `border-gray-200/50` |

### 3.3 배경·오버레이 (`SplineBackground` + `index.css`)

| 용도 | 값 |
|------|-----|
| 메시 베이스 | `.bg-color-of-soul` — `#fffefb` + 다중 `radial-gradient` (`index.css` 참고) |
| Spline 렌더 보정 | iframe: `brightness-[1.24] saturate-[1.38] contrast-[1.06]` |
| 오로라 합성 | `.aurora-over-spline` — `mix-blend-mode: soft-light` |
| 스크린 글로우 | `.aurora-screen-glow` — `mix-blend-mode: screen` |
| 로딩 그라데이션 | `linear-gradient(to bottom, #fffefb, #faf5ff)` |
| 비네트 | `bg-gradient-to-t from-cyan-50/55 via-white/15 to-rose-50/50` |
| 우하단 마스크 | `from-sky-200/35 via-fuchsia-100/25 to-transparent`, 크기 `min(140px,22vh)` × `min(320px,45vw)` |
| 그레인 | `.bg-color-of-soul-grain` — opacity 낮게 |

### 3.4 오버레이 UI (랜딩 텍스트)

- 기본: `text-gray-800` (루트), 내비·보조 `text-gray-500` / `text-gray-400`
- 호버: `hover:text-gray-800`, 삼각형 `border-r-gray-600`

---

## 4. 타이포그래피

| 역할 | 설정 |
|------|------|
| 페이지 기본 | `font-sans` |
| 기술·라벨·본문 일부 | `font-mono` |
| 라벨(카드) | `text-xs`, `font-medium`, `tracking-wider`, `uppercase` |
| 카드 제목 | `text-2xl`, `font-medium`, `tracking-tight`, `leading-tight` |
| 카드 설명 | `text-sm`, `leading-relaxed`, `max-w-[360px]` |
| 로딩 문구 | `text-sm`, `tracking-widest`, `uppercase`, `font-light`, `text-sky-500/80`, `animate-pulse` |
| 좌측 내비 | `text-sm`, `tracking-wide` (항목명 `font-medium`) |
| 우측 리스트 | `text-sm`, `font-medium` |

**선택 영역**: `selection:bg-[#00FF88]/30`

---

## 5. 레이아웃·z-index 아키텍처

### 5.1 전체 구조 (개념)

```
[고정 전체 화면] SplineBackground (z-0 내부 레이어 분리)
    └─ 로딩 오버레이 (z-[3])
    └─ iframe 래퍼 overflow-hidden (z-0) — 레터박스 완화용 확대
    └─ .aurora-over-spline, .aurora-screen-glow (CSS z-index 1)
    └─ 비네트 (z-[1])
    └─ 우하단 마스크 (z-[2])
    └─ 그레인 (z-[2])

[그 위] UI 루트: relative z-10, flex flex-col, h-screen, pointer-events-none
    └─ main: pointer-events-auto
```

### 5.2 루트 컨테이너 (`App`)

- `relative min-h-screen w-full font-sans selection:bg-[#00FF88]/30 text-gray-800 overflow-hidden`
- 바깥 래퍼 `pointer-events-none`, `main`은 `pointer-events-auto`

### 5.3 패딩·그리드

- `p-6 md:p-8 lg:p-12`
- `grid grid-cols-1 lg:grid-cols-12 gap-8 items-center`
- **lg**: 좌 3 / 카드 6 / 우 3

### 5.4 중앙 카드

- `perspective-1000`
- `max-w-[580px]`, `shadow-2xl shadow-purple-500/5`, 호버 `hover:scale-[1.02] hover:-rotate-1`, `duration-700`

---

## 6. 애니메이션·트랜지션

| 위치 | 클래스 | 효과 |
|------|--------|------|
| 좌측 내비 | `transition-all` + `hover:text-gray-800` + `hover:translate-x-2` | 색 + 8px 이동 |
| 중앙 카드 | `transition-transform duration-700` + `hover:scale-[1.02]` + `hover:-rotate-1` | 미세 확대·회전 |
| 우측 리스트 | `transition-colors` + `hover:text-gray-800` | 색 전환 |
| 로딩·iframe | `transition-opacity duration-1000` | 페이드 |
| 로딩 텍스트 | `animate-pulse` | 펄스 |
| 채팅 | 입력 `transition-all`, 버튼 `transition-colors` | 포커스·호버 |

채팅: `scrollIntoView({ behavior: 'smooth' })` — JS 스크롤.

---

## 7. 컴포넌트별 상세

### 7.1 `SplineBackground`

| 요소 | 구현 요약 |
|------|-----------|
| 컨테이너 | `fixed inset-0 z-0 overflow-hidden bg-color-of-soul` |
| 로딩 | 밝은 그라데이션, `Initializing Environment...`, 펄스 |
| iframe | Spline URL, **filter**로 밝기/채도, **112vmax** 크롭, `onLoad` 페이드 |
| 오버레이 | `aurora-over-spline`, `aurora-screen-glow` (`index.css`) |
| 비네트·마스크·그레인 | 상단 절 “3.3” 참고 |
| `visibilitychange` | 탭 숨김 시 iframe 언마운트 |

### 7.2 랜딩 `App` — 좌측 내비

- `group` … `hover:text-gray-800 hover:translate-x-2`
- 번호: `text-gray-400`, `group-hover:text-gray-600`

### 7.3 랜딩 `App` — 중앙 카드·우측

- 카드·그래픽·삼각형(`border-r-gray-600`) — 상단 “3.2”, “3.4” 및 소스 참고.

### 7.4 `ChatInterface` (참고 — 엔트리 미사용)

라이트 글래스모피즘: `backdrop-blur-xl`, `bg-white/45`, `border-white/50`, 스카이/핑크 포인트, 말풍선·입력 필드는 밝은 회색 텍스트.

---

## 8. 아이콘 (lucide)

| 컴포넌트 | 아이콘 | 스타일 |
|----------|--------|--------|
| App | `ArrowRight` | `w-5 h-5`, `text-gray-400` |
| Chat | `Sparkles` | `w-6 h-6`, `text-sky-500` |
| Chat | `User` / `Bot` | `size={18}` |
| Chat | `Loader2` | `animate-spin` |
| Chat | `Send` | `size={20}` |

---

## 9. 접근성·UX

- Spline `iframe`에 `title="3D Dunes Background"`.
- 장식용 레이어에 `aria-hidden` (해당 요소).
- 채팅 전송 버튼: `disabled:opacity-50 disabled:cursor-not-allowed`.

---

## 10. Next.js 이식 체크리스트

1. Tailwind 임의 값·`min()`·`vmax`·`backdrop-blur` 빌드 포함 여부 확인.
2. `html { font-size: 22px }` 유지.
3. `index.css` 전체 + `index.html`의 `html`/`body`/스크롤바 이관.
4. Spline iframe + filter + 오버레이 클래스 + `visibilitychange` 이관.
5. 포인터 이벤트 패턴 유지.

---

## 11. 파일 참조

| 파일 | 역할 |
|------|------|
| `index.html` | Tailwind CDN, 루트 폰트, 스크롤바·`html`/`body` |
| `index.css` | 메시·오로라·그레인 |
| `App.tsx` | 랜딩 |
| `components/SplineBackground.tsx` | Spline + 오버레이 스택 |
| `components/ChatInterface.tsx` | 채팅 UI |
| `docs/new_guide.md` | 오로라·Spline 병행 정책 요약 |
| `docs/image/aurora-bg.jpg` | 색감 레퍼런스 이미지 |

---

*문서 버전: Color of Soul 밝은 오로라 테마 + Spline 유지 기준.*
