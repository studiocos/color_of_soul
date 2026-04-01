# 애니메이션·인터랙션

## CSS 트랜지션 (Tailwind)

| 위치 | 클래스 | 효과 |
|------|--------|------|
| 좌측 내비 링크 | `transition-all` + `hover:translate-x-2` + `hover:text-gray-800` | 8px 이동 + 색 |
| 푸터 링크 | `transition-opacity` + `hover:opacity-85` + `hover:underline` | 링크 피드백 |
| Spline 로딩·iframe | `transition-opacity duration-1000` | 1초 페이드 |
| 로딩 텍스트 | `animate-pulse` | 펄스 |
| 포커스 링 | `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500/50` | 키보드 접근성 |

## 목업 카드 호버 (참고: `mockup_ani/reference/App.tsx`)

- `transform transition-transform duration-700`
- `hover:scale-[1.02] hover:-rotate-1` — 미세 확대·회전
- 컨테이너 `perspective-1000` — 입체감 보조

프로덕션 `MockupHome`은 중앙 카드가 없지만, **같은 클래스**를 카드형 컴포넌트에 적용 가능합니다.

## JavaScript 애니메이션

### `requestAnimationFrame` — 오로라 blob (`mockup_main`)

- 시간 `t`에 대해 `Math.sin` / `Math.cos`로 **translate %**, **scale**, (선택) **opacity** 갱신
- `will-change-transform` on 레이어
- cleanup에서 `cancelAnimationFrame`

### 스크롤

- `html { scroll-behavior: smooth }` — 앵커 이동
- 채팅 목업: `scrollIntoView({ behavior: 'smooth' })`

### `tw-animate-css`

- `globals.css`에서 `@import "tw-animate-css"`
- Tailwind 유틸과 함께 **추가 키프레임·애니메이션 클래스**를 쓸 수 있음 (프로젝트에서 `animate-*` 사용 시 확인)

## 마이크로 인터랙션 체크리스트

- [ ] 호버 가능한 요소는 `transition-*`로 상태 변화를 부드럽게
- [ ] 링크·버튼은 `focus-visible` 스타일 (키보드)
- [ ] `disabled` 시 `opacity-50`, `cursor-not-allowed` (채팅 패턴)
- [ ] 장식용 레이어는 `pointer-events-none`, 클릭 영역은 `pointer-events-auto`

## 접근성

- Spline iframe: 의미 있는 `title`
- 장식: `aria-hidden`
- 내비: `aria-label="Section"`
- 푸터: `role="contentinfo"`
- Contact 섹션: `aria-labelledby` + 제목 `id`

## 성능 메모

- Spline: 탭 비활성 시 iframe 제거로 **백그라운드 부하 감소**
- 다중 `backdrop-blur`는 모바일에서 비용이 클 수 있음 — 필요 시 브레이크포인트로 강도 조절
- `background-attachment: fixed`는 일부 모바일 브라우저에서 이슈 가능 — 검증 후 대체
