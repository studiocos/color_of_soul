# Color of Soul — 프로덕션 배포 가이드

**기준:** `cos` 저장소 (Next.js App Router)  
**최종 갱신:** 2026-04-02  

---

## 1. 배포 전 확인

| 단계 | 명령 / 작업 |
|------|-------------|
| 의존성 설치 | `npm install` |
| 린트 | `npm run lint` |
| 프로덕션 빌드 | `npm run build` |
| 로컬 프로덕션 미리보기 | `npm run start` (빌드 후, 기본 [http://localhost:3000](http://localhost:3000)) |

빌드가 성공해야 배포 파이프라인에 올립니다.

---

## 2. 환경 변수

루트 `src/app/layout.tsx` 의 `metadataBase`·Open Graph·Twitter 카드에 **절대 URL**이 필요합니다.

| 변수 | 필수 | 설명 |
|------|------|------|
| `NEXT_PUBLIC_SITE_URL` | **프로덕션에서 권장** | 공개 사이트의 정식 URL (예: `https://www.example.com`). 끝에 슬래시 없이 설정. |
| `VERCEL_URL` | Vercel 자동 | Vercel 배포 시 호스트명이 자동 주입됩니다. `NEXT_PUBLIC_SITE_URL` 이 없으면 `https://${VERCEL_URL}` 로 대체됩니다. |

**권장:** 커스텀 도메인을 쓰는 경우 Vercel(또는 해당 호스팅)에 `NEXT_PUBLIC_SITE_URL` 을 명시해 OG·메타데이터의 기준 URL을 고정합니다.

로컬 개발만 할 때는 설정하지 않아도 되며, 기본값은 `http://localhost:3000` 입니다.

---

## 3. 호스팅 (요약)

### Vercel

1. 저장소를 Vercel 프로젝트에 연결합니다.
2. **Framework Preset:** Next.js  
3. **Build Command:** `npm run build` (기본)  
4. **Output:** Next.js 가 자동 처리합니다.
5. 프로덕션 환경 변수에 `NEXT_PUBLIC_SITE_URL` 을 추가합니다 (커스텀 도메인 사용 시).

[Vercel — Next.js 배포](https://vercel.com/docs/frameworks/nextjs)

### 기타

`next build` 산출물을 지원하는 Node 호스팅·컨테이너에 배포할 수 있습니다. [Next.js — 배포](https://nextjs.org/docs/app/building-your-application/deploying) 를 참고하세요.

---

## 4. 분석·도메인

- **Vercel Analytics:** `@vercel/analytics` 가 루트 레이아웃에 포함되어 있습니다. Vercel 프로젝트에서 Analytics 를 활성화하면 수집됩니다.
- **파비콘·OG 이미지:** `public/icon.svg`, `public/og-image.jpg` — 메타데이터는 `layout.tsx` 에서 참조합니다.

---

## 5. 관련 문서

| 문서 | 내용 |
|------|------|
| [README.md](../README.md) | 프로젝트 개요·스크립트·구조 |
| [plan/prd.md](./plan/prd.md) | 제품 요구사항 |
| [uiux/README.md](./uiux/README.md) | UI/UX·구현 참고 |

---

*제품 범위와 우선순위는 [prd.md](./plan/prd.md) 를 정본으로 합니다.*
