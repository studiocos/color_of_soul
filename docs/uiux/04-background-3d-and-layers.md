# 배경·3D·레이어 합성

## 1. Spline 3D (프로덕션)

**파일**: `src/components/spline-background.tsx`

### 원리

- **외부 호스트**: `https://my.spline.design/...` 를 iframe `src`로 삽입
- **별도 React 래퍼 라이브러리 불필요** — URL만으로 임베드

### 레이아웃·크롭

- iframe 컨테이너: `absolute inset-0 overflow-hidden`
- iframe: `left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`
- 크기: `h-[112vmax] w-[112vmax]` — 뷰포트보다 크게 잡아 **레터박스/여백**을 줄임

### 색 보정 (Tailwind)

- `brightness-[1.24] saturate-[1.38] contrast-[1.06]`
- 라이트 오로라 UI와 톤을 맞추기 위한 **후처리**; 씬 교체 시 눈으로 맞춰 조정

### 로딩 상태

- 초기: `opacity-0` iframe + 상단 그라데이션 오버레이 + `Initializing Environment...` + `animate-pulse`
- `onLoad` 후 iframe `opacity-100`, 로딩 레이어 `opacity-0` (`transition-opacity duration-1000`)

### 성능·탭 최적화

- `visibilitychange` 리스너: `document.hidden`이면 **iframe 언마운트** (`mountIframe` false)로 백그라운드 GPU 부하 감소
- 탭 복귀 시 다시 마운트

### 추가 오버레이 (컴포넌트 내부 Tailwind)

- 상단 비네트: `bg-gradient-to-t from-cyan-50/55 via-white/15 to-rose-50/50`
- 우하단: `bg-gradient-to-tl from-sky-200/35 via-fuchsia-100/25 to-transparent`, 크기 `min(140px,22vh)` × `min(320px,45vw)` 등

### 접근성

- `title="3D Dunes Background"` (또는 씬에 맞는 설명)
- 장식 레이어는 `aria-hidden` 가능

---

## 2. CSS 글로벌 메시·오로라·그레인

**파일**: `src/app/globals.css` (동일 내용이 `mockup_ani/reference/index.css`에도 존재)

| 클래스 | 역할 |
|--------|------|
| `.bg-color-of-soul` | Spline 없을 때도 쓸 수 있는 **메시 그라데이션 베이스** |
| `.aurora-over-spline` | 타원·선형 그라데이션 + `mix-blend-mode: soft-light` |
| `.aurora-screen-glow` | 중앙 하이라이트 + `mix-blend-mode: screen` |
| `.bg-color-of-soul-grain` | 인라인 SVG 노이즈 텍스처, `mix-blend-mode: soft-light` |

**합성 순서 (개념)**

1. 메시/베이스 (`bg-color-of-soul`)
2. iframe (Spline)
3. 로딩 (z 높음)
4. 오로라·스크린 글로우
5. 비네트·코너 그라데이션
6. 그레인

---

## 3. 대안: Spline 없는 오로라 (`mockup_main`)

**파일**: `mockup_main/components/aurora-background.tsx`

### 원리

- 정적 이미지 `aurora-bg.jpg` + **4개의 blur된 radial gradient div**
- `requestAnimationFrame`으로 각 레이어에 `sin`/`cos` 기반 **translate % + scale** 및 일부 **opacity** 변조
- `blur(45px)` ~ `blur(60px)` 로 부드러운 “blob” 조명

### Spline 대비

| 항목 | Spline | AuroraBackground |
|------|--------|------------------|
| GPU | iframe 3D | CSS blur + rAF |
| 네트워크 | 외부 씬 URL | 로컬 이미지 + CSS |
| 분위기 | 사실적 3D | 추상적 오로라 |

브랜드 톤은 **같은 색 팔레트·글래스 카드**로 맞출 수 있습니다.

---

## 4. 목업 랜딩 카드의 3D 느낌 (참고)

`mockup_ani/reference/App.tsx`:

- `perspective-1000` + 카드 `hover:scale-[1.02] hover:-rotate-1` — **CSS 3D transform** 없이 원근 클래스만으로 미세 입체감

프로덕션 `MockupHome`은 중앙 데모 카드 대신 **스크롤 섹션** 위주이나, 동일 클래스를 다른 페이지에 재사용 가능합니다.
