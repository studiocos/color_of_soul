# Color of Soul — UI/UX 기술 문서 인덱스

이 폴더는 **시각·인터랙션·3D·애니메이션·스타일링**에 관한 구현 지식을 한곳에 모은 참고서입니다. 동일한 톤·품질의 다른 웹앱을 만들 때 **그대로 이식하거나 변형**할 수 있도록 작성했습니다.

## 문서 구성

| 파일 | 내용 |
|------|------|
| [01-technology-stack.md](./01-technology-stack.md) | 프레임워크, Tailwind v4, `tw-animate-css`, 아이콘, 분석 도구 |
| [02-color-system-and-surfaces.md](./02-color-system-and-surfaces.md) | OKLCH 토큰, 크림·오로라 표면, 선택/강조색, 그라데이션 |
| [03-typography-and-layout.md](./03-typography-and-layout.md) | Geist / Playfair, 루트 rem, 스크롤·z-index·포인터 패턴 |
| [04-background-3d-and-layers.md](./04-background-3d-and-layers.md) | Spline iframe, CSS 후처리, 메시·오로라·그레인, 대안 배경 |
| [05-ui-patterns-and-components.md](./05-ui-patterns-and-components.md) | 글래스 카드, 섹션, 내비, 갤러리, 푸터 |
| [06-animation-and-interaction.md](./06-animation-and-interaction.md) | 트랜지션, `requestAnimationFrame`, 포커스·접근성 |
| [07-porting-checklist.md](./07-porting-checklist.md) | 신규 프로젝트 이식 체크리스트 |

제품 범위·우선순위는 [../plan/prd.md](../plan/prd.md) 를 참고하세요.

## 코드베이스 기준 경로

- **프로덕션 UI**: `src/` (Next.js App Router)
- **앵커 내비 단일 소스**: `src/constants/section-nav.ts`
- **Vite 목업 (참고)**: `mockup_ani/reference/`
- **Spline 없는 오로라 대안**: `mockup_main/components/aurora-background.tsx`

---

*이 인덱스와 각 문서는 `cos` 저장소의 실제 구현을 반영합니다.*
