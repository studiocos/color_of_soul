# 기술 스택·의존성

## 런타임·프레임워크

| 항목 | 버전(참고) | 역할 |
|------|------------|------|
| **Next.js** | 16.x | App Router, `next/font`, `next/image`, SSR/정적 배포 |
| **React** | 19.x | UI 컴포넌트 |
| **TypeScript** | 5.x | 타입 안정성 |

## 스타일링

| 항목 | 설명 |
|------|------|
| **Tailwind CSS v4** | `@import "tailwindcss"` in `globals.css`, `@tailwindcss/postcss` |
| **tw-animate-css** | `@import "tw-animate-css"` — Tailwind와 함께 쓰는 애니메이션 유틸 확장 |
| **PostCSS** | `postcss.config.mjs`에서 `@tailwindcss/postcss`만 사용 |

### Tailwind v4 패턴

- **`@theme inline`** (`globals.css`): `--font-sans`, `--font-mono`, `--font-serif`, `--color-*`, `--radius-*` 등을 디자인 토큰과 연결
- **`@custom-variant dark`**: `&:is(.dark *)` — 클래스 기반 다크 모드 확장 가능(현재 라이트 오로라가 기본)

## 아이콘

- **lucide-react**: 벡터 아이콘 (프로젝트별로 `ArrowRight`, `Sparkles`, `Send` 등 선택 사용)
- 목업 `mockup_ani/reference/ChatInterface.tsx`에서는 채팅 UI용 아이콘 세트 참고

## 분석·배포

- **@vercel/analytics**: `Analytics` 컴포넌트를 루트 레이아웃에 포함

## 목업 폴더와의 관계

| 경로 | 스택 | 용도 |
|------|------|------|
| `src/` | Next 16 + Tailwind 4 | 실제 사이트 |
| `mockup_ani/` | Vite + React, 예전엔 Tailwind CDN | Spline·오로라 레퍼런스, `ChatInterface` 샘플 |
| `mockup_main/` | Next + Tailwind | Spline 없이 **Canvas/CSS 오로라** 대안 (`AuroraBackground`) |

새 웹앱을 만들 때는 **`src/` 패턴을 기본**으로 하고, 3D 없이 비슷한 분위기만 내려면 `mockup_main`의 `AuroraBackground` 패턴을 참고하면 됩니다.

## 신규 프로젝트에 넣을 최소 패키지 (UI 관점)

```json
{
  "dependencies": {
    "lucide-react": "^1.x",
    "next": "^16.x",
    "react": "^19.x",
    "react-dom": "^19.x"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "tailwindcss": "^4",
    "tw-animate-css": "^1.x",
    "postcss": "^8.x"
  }
}
```

3D 배경이 필요하면 별도 npm 패키지 없이 **Spline iframe URL**만으로 충분합니다 (아래 배경 문서 참고).
