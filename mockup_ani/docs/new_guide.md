# Color of Soul — 배경·색감 가이드 (현행 구현 기준)

이 문서는 **`docs/image/aurora-bg.jpg`** 와 같은 **밝고 화사한 오로라·파스텔** 톤을 목표로 하되, **Spline 3D 배경의 동작(움직임)은 유지**하는 현재 구현을 정리합니다.

> **중요 (구버전 명세와의 차이)**  
> 초안에는 “Spline iframe 제거 후 CSS만 사용”이 있었으나, **현재 코드는 iframe을 유지**합니다. 색감은 `index.css` 오버레이 + iframe `filter`로 조정합니다.

---

## 1. 목표

| 항목 | 내용 |
|------|------|
| 시각 참고 | `docs/image/aurora-bg.jpg` — 크림·연노랑·시안·핑크·라벤더가 부드럽게 섞인 하이키 톤 |
| 3D | **Spline** (`components/SplineBackground.tsx`) iframe **유지** — 인터랙션·애니메이션은 Spline 씬 그대로 |
| 색만 조정 | WebGL 픽셀 위에 CSS **밝기/채도** 및 **블렌드 레이어**로 `aurora-bg` 느낌에 가깝게 |

---

## 2. `index.css` — 메시 베이스 + 오로라 오버레이

- **`.bg-color-of-soul`**  
  - 베이스: `#fffefb`  
  - 여러 겹 `radial-gradient` (노랑·핑크·라벤더·시안·살구 등).  
  - `background-attachment: fixed` — 스크롤 시 메시 고정(내부 스크롤은 앱에서 제한).

- **`.aurora-over-spline`**  
  - Spline iframe **위**에 올리는 다중 `radial-gradient` + `linear-gradient`.  
  - `mix-blend-mode: soft-light`, `opacity` 약 0.92 — 씬 색을 파스텔 쪽으로 끌어올림.

- **`.aurora-screen-glow`**  
  - 중앙 하이라이트 `radial-gradient` + `mix-blend-mode: screen` — 어두운 영역 완화.

- **`.bg-color-of-soul-grain`**  
  - SVG `feTurbulence` 노이즈, `mix-blend-mode: soft-light`, opacity 낮게 — 질감만.

---

## 3. `SplineBackground.tsx`

| 요소 | 역할 |
|------|------|
| 루트 | `bg-color-of-soul` — iframe 로드 전·주변에도 밝은 메시가 보임 |
| 로딩 | `#fffefb` → `#faf5ff` 그라데이션, 문구 `text-sky-500/80`, `animate-pulse` |
| iframe | `brightness-[1.24] saturate-[1.38] contrast-[1.06]` — **동작 불변**, 렌더만 밝게 |
| 레터박스 완화 | `h-[112vmax] w-[112vmax]` + 중앙 정렬 + `overflow-hidden` — 상하 검은 띠 최소화 |
| 오버레이 | `aurora-over-spline`, `aurora-screen-glow` (클래스명 위와 동일) |
| 비네트 | `from-cyan-50/55 via-white/15 to-rose-50/50` — 가장자리를 어둡게 누르지 않음 |
| 우하단 | `from-sky-200/35 via-fuchsia-100/25` — 워터마크 영역 완화 |
| 그레인 | `bg-color-of-soul-grain` |
| 탭 최적화 | `visibilitychange` 시 iframe 언마운트 (기존과 동일) |

**Spline URL (상수)**  
`https://my.spline.design/dunes-r4IlewzoPYCEeTp6o7lQCo2g/`

---

## 4. `App.tsx` — 랜딩 카드 (글래스)

- 루트: `text-gray-800`, `selection:bg-[#00FF88]/30`
- 중앙 카드: `bg-white/50 backdrop-blur-2xl border border-white/35 shadow-2xl shadow-purple-500/5`
- 그래픽 영역: 시안·바이올렛·핑크 그라데이션 패널 + `stroke-sky-600/85` 라인 아트
- 좌측 내비: `text-gray-500`, 호버 `text-gray-800`, `hover:translate-x-2`
- 우측: `text-gray-500` / 강조 `text-gray-800`, 삼각형 `border-r-gray-600`

---

## 5. `index.html` 글로벌

- `html`, `body` 배경: `#fffefb`
- `body` 글자색: `#374151`
- 스크롤바 thumb: `rgba(140, 170, 210, 0.35)` 대비 — 라이트 UI

---

## 6. `ChatInterface.tsx` (엔트리 미연결)

- 라이트 글래스: `bg-white/45`, `border-white/50`, `shadow-purple-500/5`
- 헤더 아이콘 `text-sky-500`, 온라인 점 `bg-emerald-400`
- 말풍선·입력: 스카이/핑크 계열 보더·텍스트 `gray-700`~`800`

---

## 7. 구현 체크리스트 (현행)

1. Spline URL·`visibilitychange`·로딩·z-index 스택 유지.
2. iframe에 **filter** + **112vmax** 크롭 + **aurora-over-spline** / **aurora-screen-glow** 적용.
3. `bg-color-of-soul` 그라데이션 값은 `index.css` 단일 소스로 관리.
4. 너무 밝으면 `brightness`를 소폭 낮추고, 너무 옅으면 `aurora-over-spline` opacity 조정.

---

*참고 이미지: `docs/image/aurora-bg.jpg`*
