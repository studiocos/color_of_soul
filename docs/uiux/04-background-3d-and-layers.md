# 배경·3D·레이어 합성

## 1. Spline 3D (프로덕션)

**파일**: `src/components/spline-background.tsx`

### 원리

- **외부 호스트**: `https://my.spline.design/...` 를 iframe `src`로 삽입
- **별도 React 래퍼 라이브러리 불필요** — URL만으로 임베드

### 레이아웃·크롭

- iframe 컨테이너: `absolute inset-0 overflow-hidden`
- iframe: `left-1/2 top-1/2` + `style={{ transform: 'translate(-50%, calc(-50% - 4.5vh))' }}` — 중앙 정렬 후 **살짝 위로** (`vh` 값으로 조절). Tailwind `-translate-y-[calc(...)]`는 부호·`calc` 공백 때문에 깨지기 쉬워 **인라인 `transform`** 사용
- 크기: `h-[128vmax] w-[128vmax]` — 뷰포트보다 크게 잡아 레터박스/여백을 줄임 (빈 시야는 Spline 씬 쪽 조정)

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

### Spline 에디터: 검은 영역(빈 시야) 방지 — UI 코드 변경 없음

임베드·CSS·오버레이는 그대로 두고, **Spline 씬만** 조정합니다. 빈 시야에 WebGL **클리어 색(검정에 가까운 색)**이 보이는 문제를 줄입니다.

**이 프로젝트(Public URL + iframe)에서는** Next.js 코드로 **Spline 안의 배경색·지오메트리·카메라**를 바꿀 수 없습니다. 서버에 올라간 씬이 그대로 그려집니다. 앱 쪽에서 가능한 것은 iframe 크기·`filter`·부모 배경·오로라 레이어 등 **주변 합성**뿐입니다. 씬 자체 수정은 **Spline 에디터 → Publish**가 필요합니다. (Spline을 **Code export** / **`@splinetool/react-spline`** 등으로 붙이면 런타임 제어 범위가 달라질 수 있으나, 현재 구조는 iframe URL 임베드입니다.)

1. **Play Settings — BG Color (필수)**  
   - 툴바 **Export** → **Web** → **Public URL** 경로에서 **Play Settings**를 연다.  
   - [Play Settings 문서](https://docs.spline.design/exporting-your-scene/play-settings) 기준 **BG Color**를 **밝은 단색**으로 둔다.  
   - 권장: **`#fffefb`** — `src/app/globals.css`의 `html { background-color }`와 동일해 iframe 안 빈 영역이 페이지 베이스와 자연스럽게 맞는다.  
   - **배경을 투명으로 숨기는 옵션**을 쓰는 경우, 브라우저·합성에 따라 여전히 어둡게 보일 수 있다. 검은 끊김이 있으면 **불투명 배경**으로 위 색을 지정하는 편이 안전하다.

2. **지오메트리 / 환경**  
   - 카메라 움직임으로 **코너에 메시가 비는** 경우: 오브젝트 **뒤쪽**에 **큰 배경 평면** 또는 **스카이 형태**를 두어 시야를 채운다.  
   - 또는 기존 지형·메시 **스케일**만 키워(필요 시) 모든 프레임에서 화면 가장자리가 가려지게 한다.

3. **카메라**  
   - **Orbit / Pan limits** 등으로 카메라가 지오메트리 **바깥 빈 공간**을 크게 보지 않도록 제한한다.  
   - 자동 회전·스크롤 연동이 있으면 **한 바퀴 전체**에서 모서리가 비지 않는지 확인한다.

4. **Fog (선택)**  
   - Fog를 쓰면 **Fog 색**을 BG와 같게(`#fffefb` 계열) 맞춘다 — [Fog 문서](https://docs.spline.design/doc/working-with-fog/doc972mJVC2W).

5. **배포 후 확인**  
   - 동일 Public URL로 **Publish**한 뒤, 브라우저 **캐시** 때문에 이전이 보일 수 있으니 시크릿 창 또는 강력 새로고침으로 검증한다.

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
