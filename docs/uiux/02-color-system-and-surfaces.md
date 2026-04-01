# 색상 시스템·표면(Surface)

## 철학

- **라이트 오로라**: 크림 베이스(`#fffefb`) 위에 노랑·핑크·라벤더·시안이 섞인 **부드러운 메시 그라데이션**
- **글래스모피즘**: `bg-white/40` 전후, `backdrop-blur`, 얇은 `border-white/35` 로 전경과 배경 분리
- **브랜드 악센트**: 텍스트 선택·하이라이트에 **민트 그린** `#00FF88` (약 30% 불투명)

## CSS 변수 (`:root`) — OKLCH

`src/app/globals.css`의 `:root`는 **shadcn 계열 토큰 구조**를 따르며, 값은 **오로라 라이트 테마**에 맞게 조정되어 있습니다.

| 토큰 | 용도 |
|------|------|
| `--background` | 페이지 배경 느낌 (oklch, 매우 밝은 중성) |
| `--foreground` | 기본 글자 |
| `--card` / `--card-foreground` | 카드형 콘텐츠 블록 |
| `--primary`, `--secondary`, `--muted`, `--accent` | 버튼·보조 UI 확장 시 |
| `--border`, `--input`, `--ring` | 폼·포커스 링 |
| `--chart-1` … `--chart-5` | 차트·데이터 시각화 재사용 |
| `--radius` | 기본 모서리 `0.625rem`, 파생 `--radius-sm` 등 |

`.dark` 블록으로 다크 토큰이 정의되어 있으나, 현 COS 랜딩은 **라이트**가 기본입니다.

## 하드코딩 헥스·유틸 (Tailwind)

| 용도 | 값 / 클래스 |
|------|-------------|
| 바디 배경·폴백 | `bg-[#fffefb]`, `html` 배경 `#fffefb` |
| 본문 텍스트 | `text-[#374151]` (gray-700 계열) |
| 오버레이 UI | `text-gray-800`, `text-gray-500`, `text-gray-400` |
| 선택 영역 | `selection:bg-[#00FF88]/30` (body / 루트에 반복 가능) |
| 스크롤바 thumb | `rgba(140, 170, 210, 0.35)` ~ hover 시 진하게 |
| 서비스 스텝 배경 | `from-[#FDE2F3]/40 via-violet-100/30 to-[#B2EBF2]/45` |
| Book/Contact 세부 | `#333333`, `#444444`, `#555555` 등 계층 구분 |

## 메시 배경 `.bg-color-of-soul`

`globals.css`에 정의. **고정 다중 방사형 그라데이션**으로 “오로라 메시”를 만듭니다.

- 베이스 색: `#fffefb`
- `background-attachment: fixed` 로 스크롤 시에도 은은하게 고정되는 느낌 (성능·모바일 이슈 있으면 조건부 제거 검토)

## Spline 위 오로라 합성 레이어

| 클래스 | 역할 |
|--------|------|
| `.aurora-over-spline` | 타원·선형 그라데이션 다층, `mix-blend-mode: soft-light`, 3D 색을 파스텔 톤으로 정렬 |
| `.aurora-screen-glow` | 중앙 밝기, `mix-blend-mode: screen` |
| `.bg-color-of-soul-grain` | SVG `feTurbulence` 노이즈, 질감, `opacity` 낮게 |

## iframe 색 보정 (Spline)

Tailwind 임의값으로 밝기·채도·대비를 올립니다.

- `brightness-[1.24] saturate-[1.38] contrast-[1.06]`

새 씬을 쓰면 수치만 조정해 톤을 맞추면 됩니다.

## 다른 웹앱에 옮길 때

1. **OKLCH 토큰** 전체를 복사하면 다크 모드·컴포넌트 라이브러리와 호환하기 쉽습니다.
2. 브랜드만 바꿀 경우 **`--primary`, `--accent`, selection 색**만 교체해도 전체 인상이 빠르게 바뀝니다.
3. **메시·오로라**는 HEX/RGB를 그대로 복제하기보다 **역할**(베이스/핑크/시안/라벤더)을 유지한 채 색상만 치환하는 것이 안전합니다.
