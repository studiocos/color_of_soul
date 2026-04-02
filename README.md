# Color of Soul (COS)

Studio COS 브랜드 **Color of Soul** 용 단일 페이지 랜딩입니다. [Next.js](https://nextjs.org) App Router 기반이며, Spline 3D 배경·글래스 카드·인트로 애니메이션으로 메인·소개·서비스·갤러리·예약·연락처를 한 화면에서 제공합니다.

## 특징

- **인트로·히어로:** “COLOR OF soul” 오프닝 후 메인 카피(영·한); 스크롤 후 메인 상단 복귀 시 인트로 재생
- **내비게이션:** 데스크톱 좌측 고정 레일(`lg` 이상), 모바일 햄버거 메뉴; 앵커는 `src/constants/section-nav.ts` 에서 단일 관리
- **배경:** Spline iframe + CSS 오로라·그레인 레이어 (`src/components/spline-background.tsx`, `globals.css`)
- **분석:** [Vercel Analytics](https://vercel.com/analytics) (`@vercel/analytics`)

## Pole Star Labs 협업

**Color of Soul** 스튜디오와 **[Pole Star Labs](https://www.polestar-labs.ai/)** 가 함께 기획·디자인·개발한 산출물입니다. 푸터에 협업 표기가 있으며, Pole Star Labs 브랜드 자산(예: 로고)은 협업 범위 내 사용입니다.

## 기술 스택

| 영역 | 사용 |
|------|------|
| 프레임워크 | Next.js 16 (App Router) |
| UI | React 19, TypeScript 5 |
| 스타일 | Tailwind CSS 4, PostCSS, `tw-animate-css` |
| 모션 | Framer Motion |
| 폰트 | Geist, Geist Mono, Playfair Display (`next/font/google`) |
| 아이콘 | Lucide React |

## 요구 사항

- **Node.js** 20 이상 권장
- **패키지 매니저:** npm, pnpm, yarn 또는 bun

## 시작하기

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 을 엽니다.

## 스크립트

| 명령 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 (hot reload) |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 프로덕션 서버 (`build` 후) |
| `npm run lint` | ESLint |

## 프로젝트 구조

```
src/
├── app/
│   ├── layout.tsx      # 메타데이터, 폰트, Analytics
│   ├── page.tsx        # 홈 — MockupHome
│   └── globals.css     # 디자인 토큰, 메시·오로라, 히어로 타이포 유틸
├── constants/
│   └── section-nav.ts  # 앵커 내비 단일 소스
├── types/
│   └── chat.ts         # (참고) 목업 연계용 타입
└── components/
    ├── mockup-home.tsx
    ├── hero-transition.tsx
    ├── hero-content.tsx
    ├── about-content.tsx
    ├── service-content.tsx
    ├── energy-gallery-menu.tsx
    ├── book-content.tsx
    ├── contact-content.tsx
    ├── section-nav-mobile.tsx
    ├── collaboration-footer.tsx
    └── spline-background.tsx
```

경로 별칭: `@/*` → `src/*` (`tsconfig.json`).

## 페이지·앵커

| 앵커 | 내용 |
|------|------|
| `#main` | 히어로(인트로·메인 카피) |
| `#about` | “Find your color of soul” (`hero-content`) |
| `#about-story` | “Artist and Analyst” (`about-content`, 동일 카드 내) |
| `#service` | 서비스 설명 |
| `#gallery` | 에너지 갤러리 |
| `#book` | 예약 안내 |
| `#contact` | 연락처 |

내비 라벨 `About` → `#about` (첫 About 블록). 정적 자산은 `public/` 에 두고 `/파일명` 으로 참조합니다.

## 배포

[Vercel](https://vercel.com) 연결 또는 `npm run build` 산출물을 Node 호스팅·Docker 등에 배포할 수 있습니다. [Next.js 배포 문서](https://nextjs.org/docs/app/building-your-application/deploying) 참고.

## 문서

| 문서 | 설명 |
|------|------|
| [docs/README.md](docs/README.md) | 문서 인덱스 |
| [docs/uiux/README.md](docs/uiux/README.md) | UI/UX·구현 참고 (스택, 색, 타이포, 배경, 컴포넌트, 애니메이션, 이식) |
| [docs/plan/prd.md](docs/plan/prd.md) | 제품 요구사항(PRD) |

## 라이선스

**본 사이트 제작(기획·디자인·구현을 포함한 웹 산출물)** 및 **본 저장소 소스 코드와 라이선스·저작권**은 **Pole Star Labs** 에 귀속됩니다. 이용·재배포·수정 등 법적 권한의 주체는 Pole Star Labs이며, Color of Soul 스튜디오 단독 권한으로 간주되지 않습니다.

상세는 저장소 루트 [LICENSE](LICENSE) 를 확인하세요.

## 기타

- `mockup_main/`, `mockup_ani/` 는 참고·실험용이며 TypeScript 설정에서 제외되어 있습니다.
