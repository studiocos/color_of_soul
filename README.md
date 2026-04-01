# Color of Soul (COS)

Studio COS — **Color of Soul** 브랜드용 단일 페이지 웹사이트입니다. Next.js App Router로 구성되어 있으며, 메인·소개·서비스·갤러리·예약·연락처 섹션을 카드형 레이아웃으로 제공합니다.

## Pole Star Labs 협업

이 프로젝트는 **Color of Soul** 스튜디오와 **[Pole Star Labs](https://www.polestar-labs.ai/)** 가 함께 기획·디자인·개발한 협업 산출물입니다. 페이지 하단 푸터에 협업 표기가 포함되어 있으며, Pole Star Labs 브랜드 자산(예: 로고) 사용은 협업 범위 내에서 이루어집니다.

- **Pole Star Labs:** [https://www.polestar-labs.ai/](https://www.polestar-labs.ai/)

## 기술 스택

- **Framework:** [Next.js](https://nextjs.org) 16 (App Router)
- **UI:** React 19, TypeScript 5
- **스타일:** Tailwind CSS 4, `tw-animate-css`
- **폰트:** Geist, Geist Mono, Playfair Display (`next/font/google`)
- **기타:** Lucide React, Vercel Analytics

## 요구 사항

- Node.js 20 이상 권장
- npm, pnpm, yarn 또는 bun

## 시작하기

의존성 설치 후 개발 서버를 실행합니다.

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
| `npm run start` | 프로덕션 서버 실행 (`build` 후) |
| `npm run lint` | ESLint 실행 |

## 프로젝트 구조

```
src/
├── app/
│   ├── layout.tsx    # 메타데이터, 폰트, Analytics
│   ├── page.tsx      # 홈 — MockupHome
│   └── globals.css
└── components/
    ├── mockup-home.tsx       # 페이지 셸, 네비, 섹션 카드
    ├── hero-content.tsx      # About — Find your color of soul
    ├── about-content.tsx     # About — Artist and Analyst
    ├── service-content.tsx
    ├── energy-gallery-menu.tsx
    ├── book-content.tsx
    ├── contact-content.tsx
    └── spline-background.tsx
```

경로 별칭: `@/*` → `src/*` (`tsconfig.json`).

## 페이지 구성

사이드 네비게이션은 앵커로 스크롤합니다: `#main`, `#about`, `#service`, `#gallery`, `#book`, `#contact`.

정적 이미지는 `public/` 에 두고 `/파일명` 으로 참조합니다.

## 배포

[Vercel](https://vercel.com) 에 연결하거나, `npm run build` 결과를 Node 호스팅·Docker 등에 배포할 수 있습니다. 자세한 내용은 [Next.js 배포 문서](https://nextjs.org/docs/app/building-your-application/deploying)를 참고하세요.

## 라이선스

**본 사이트의 제작(기획·디자인·구현을 포함한 웹 산출물 전반)** 과 **본 저장소의 소스 코드 및 그에 따른 라이선스·저작권**은 명시적으로 **Pole Star Labs** 에 귀속됩니다. 이용·재배포·수정 등 법적 권한의 주체는 Pole Star Labs이며, Color of Soul 스튜디오 단독 권한으로 간주되지 않습니다.

상세 조항은 저장소 루트의 [LICENSE](LICENSE) 파일을 반드시 확인하세요.

## 기타

- `mockup_main/`, `mockup_ani/` 는 참고·실험용으로 `tsconfig` 에서 제외되어 있습니다.
