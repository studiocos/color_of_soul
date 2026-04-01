# UI 구현용 상세 코드 분석 자료

이 문서는 `ui-ux-design-spec.md`(디자인 명세)를 **실제 코드로 복제**할 때 쓰는 분석 자료입니다. **컴포넌트 트리, 상태, 클래스 문자열, 인라인 스타일, 이벤트**를 현재 레포 기준으로 정리했습니다.

---

## 1. 범위·의존성

| 항목 | 값 |
|------|-----|
| 런타임 엔트리 | `index.tsx` → `<App />` 만 렌더 (`ChatInterface` 미연결) |
| React | `^19.2.3` |
| 아이콘 | `lucide-react` `^0.562.0` |
| 스타일 | Tailwind **CDN** (`index.html`). 로컬 `tailwind.config` 없음 → **임의 값(arbitrary)** 과 기본 프리셋 사용 |
| 글로벌 CSS | **`index.css`** — `.bg-color-of-soul`, `.aurora-over-spline`, `.aurora-screen-glow`, `.bg-color-of-soul-grain` |

---

## 2. 글로벌 레이어: `index.html`

### 2.1 `<html>`

```html
<html lang="en" style="font-size: 22px;">
```

### 2.2 `<style>` (html · body · 스크롤바) — 현행

- `html { background-color: #fffefb; }`
- `body`: `background-color: #fffefb`, `color: #374151`, `overflow: hidden`, margin/padding 0
- WebKit 스크롤바 thumb: `rgba(140, 170, 210, 0.35)` / hover `0.55`

### 2.3 `index.css`

Tailwind 외 **필수**: 메시 배경, 오로라 오버레이 2종, 그레인. 내용은 소스 파일 참고(그라데이션 정지값은 배포 시 `docs/ui-ux-design-spec.md` 3.3절과 동기화).

---

## 3. React 컴포넌트 트리 (렌더 순서·레이어)

```
div.AppRoot
├── SplineBackground          ← fixed, z-0, overflow-hidden, bg-color-of-soul
│   ├── div 로딩 오버레이      ← z-[3], isLoaded 시 투명 (#fffefb → #faf5ff)
│   ├── div.overflow-hidden   ← z-0, iframe 레터박스 크롭
│   │     └── iframe          ← brightness/saturate/contrast, 112vmax, 중앙 정렬
│   ├── div.aurora-over-spline
│   ├── div.aurora-screen-glow
│   ├── div 비네트            ← z-[1], cyan/rose/white
│   ├── div 우하단 마스크      ← z-[2], sky/fuchsia
│   └── div 그레인            ← z-[2], bg-color-of-soul-grain
│
└── div UIOverlay             ← relative z-10, h-screen, pointer-events-none
    └── main                  ← pointer-events-auto
        ├── div 좌 내비
        ├── div 중앙 + 카드
        └── div 우측 리스트
```

**포인터**: `UIOverlay`는 `pointer-events-none`, `main`은 `pointer-events-auto`.

---

## 4. `App.tsx` — 루트·노드별 클래스

### 4.1 루트 `div`

| 클래스 | 의미 |
|--------|------|
| `relative min-h-screen w-full font-sans selection:bg-[#00FF88]/30 text-gray-800 overflow-hidden` | 선택 하이라이트·밝은 UI 텍스트 |

### 4.2 UI 오버레이

```
relative z-10 flex flex-col h-screen pointer-events-none p-6 md:p-8 lg:p-12
```

### 4.3 `main`

```
flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pointer-events-auto
```

### 4.4 좌측 내비 컨테이너

```
hidden lg:flex lg:col-span-3 flex-col gap-6 text-sm font-mono text-gray-500
```

각 행:

```
group cursor-pointer flex items-center gap-4 transition-all hover:text-gray-800 hover:translate-x-2
```

번호:

```
text-gray-400 group-hover:text-gray-600 w-10
```

### 4.5 중앙 카드 (요약)

- 래퍼: `col-span-1 lg:col-span-6 flex justify-center perspective-1000`
- 카드:

```
bg-white/50 backdrop-blur-2xl border border-white/35 w-full max-w-[580px] p-6 text-gray-800 shadow-2xl shadow-purple-500/5 transform transition-transform duration-700 hover:scale-[1.02] hover:-rotate-1
```

- 그래픽 영역·내부 패널·SVG·도트: `App.tsx` 38–54행 — 그라데이션 + `stroke-sky-600/85`
- 텍스트: 라벨 `text-gray-400`, 제목 `text-[#222222]`, 본문 `text-gray-600`, `border-t border-gray-200/50`

### 4.6 우측 리스트

컨테이너:

```
hidden lg:flex lg:col-span-3 flex-col gap-6 text-sm font-medium text-right text-gray-500 items-end
```

호버 행: `hover:text-gray-800`

강조 행 + 삼각형:

```
text-gray-800 flex items-center gap-3 cursor-pointer mt-4
w-0 h-0 ... border-r-gray-600 transform rotate-180
```

---

## 5. `SplineBackground.tsx` — 상태·레이어

### 5.1 상수

```ts
const SPLINE_SRC =
  'https://my.spline.design/dunes-r4IlewzoPYCEeTp6o7lQCo2g/';
```

### 5.2 상태

| state | 초기값 | 의미 |
|-------|--------|------|
| `isLoaded` | `false` | `onLoad` 후 `true` |
| `mountIframe` | `true` | `document.hidden`이면 `false` |

### 5.3 `visibilitychange`

탭 숨김 → `mountIframe` false, `isLoaded` false. 다시 보임 → `mountIframe` true.

### 5.4 z-index (같은 부모)

| 요소 | z-index |
|------|---------|
| iframe 래퍼 | `z-0` |
| 비네트 | `z-[1]` |
| 우하단 마스크·그레인 | `z-[2]` |
| 로딩 | `z-[3]` |

(`aurora-over-spline` / `aurora-screen-glow`는 CSS `z-index: 1` — DOM상 iframe 위에 쌓임.)

### 5.5 로딩 오버레이

- 인라인: `linear-gradient(to bottom, #fffefb, #faf5ff)`
- 문구: `text-sky-500/80 animate-pulse text-sm tracking-widest uppercase font-light`
- `Initializing Environment...`

### 5.6 iframe

- `frameBorder="0"`
- 클래스: `absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 border-0 h-[112vmax] w-[112vmax] min-h-full min-w-full transition-opacity duration-1000 brightness-[1.24] saturate-[1.38] contrast-[1.06]` + 로드 시 `opacity-100`
- `title="3D Dunes Background"`

### 5.7 비네트 (Tailwind)

```
pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-cyan-50/55 via-white/15 to-rose-50/50
```

### 5.8 우하단 마스크

```
pointer-events-none absolute bottom-0 right-0 z-[2] h-[min(140px,22vh)] w-[min(320px,45vw)] bg-gradient-to-tl from-sky-200/35 via-fuchsia-100/25 to-transparent
```

### 5.9 오로라 오버레이

- `<div className="aurora-over-spline" aria-hidden />`
- `<div className="aurora-screen-glow" aria-hidden />`

스타일은 전부 `index.css`.

---

## 6. `ChatInterface.tsx` — 클래스 매트릭스 (요약)

| 영역 | 주요 클래스 |
|------|-------------|
| 루트 | `flex flex-col h-[700px] max-h-[85vh] w-full max-w-2xl mx-auto rounded-2xl overflow-hidden border border-white/50 shadow-2xl shadow-purple-500/5 backdrop-blur-xl bg-white/45` |
| 헤더 | `border-b border-white/35 bg-white/35 p-5` |
| Sparkles | `text-sky-500` |
| 제목 | `text-gray-700` … `uppercase` |
| 온라인 | `bg-emerald-400 animate-pulse`, `text-gray-500` |
| 사용자 아바타 | `bg-sky-100/90 text-sky-800` |
| AI 아바타 | `bg-fuchsia-100/70 text-fuchsia-800` |
| 사용자 말풍선 | `bg-white text-gray-800 rounded-tr-none shadow-lg border border-sky-100/80` |
| AI 말풍선 | `bg-white/75 text-gray-700 border border-pink-200/45 rounded-tl-none shadow-lg` |
| 입력 | `bg-white/90 text-gray-700 placeholder-gray-400 border-sky-200/50 focus:border-sky-300 focus:ring-sky-200/70` |
| 버튼 | `bg-sky-400/25 text-sky-800 hover:bg-sky-400/40` |

---

## 7. Tailwind·클래스 조사 팁

`className=` grep이 가장 정확합니다. 위 목록은 **주요 문자열**만 담았습니다.

---

## 8. 신규 페이지 작성 절차

1. `index.html` + `index.css` 글로벌 복사.
2. `SplineBackground` 전체(상수·상태·레이어) 복사.
3. 포인터 이벤트 패턴 유지.
4. `App` 그리드·카드·호버 유지.

---

## 9. 흔한 불일치 원인

| 증상 | 원인 후보 |
|------|-----------|
| 오로라가 안 보임 | `index.css` 링크 누락 |
| 배경이 너무 어둡음 | iframe `filter` 또는 `.aurora-over-spline` 누락 |
| 상하 검은 띠 | `112vmax` 크롭 누락 |
| 배경 클릭 이슈 | `pointer-events-none` / `pointer-events-auto` 누락 |

---

## 10. 파일·라인 참고

| 파일 | 비고 |
|------|------|
| `App.tsx` | 랜딩 전체 |
| `components/SplineBackground.tsx` | 3D 배경 스택 |
| `components/ChatInterface.tsx` | 채팅 |
| `index.html` | CDN·글로벌 CSS |
| `index.css` | 메시·오로라·그레인 |

`ui-ux-design-spec.md`와 함께 보면 **명세 + 코드**를 모두 맞출 수 있습니다.
