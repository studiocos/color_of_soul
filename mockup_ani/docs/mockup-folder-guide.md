# Next.js 보일러플레이트 `mockup` 폴더 — 복사 대상 정리

이 프로젝트를 신규 Next.js 보일러플레이트의 **`mockup`**(또는 유사 이름) 디렉터리에 넣을 때, **꼭 필요한 것**과 **빼도 되는 것**을 구분한 가이드입니다. 목적은 **UI·레이아웃·스타일 참고**이지, Vite 앱 전체를 이식하는 것이 아닙니다.

---

## 1. 권장: `mockup`에 넣을 것 (핵심)

UI와 문서만 남기고, **실행·빌드에 묶이는 파일은 제외**하는 구성입니다.

| 경로 | 이유 |
|------|------|
| `docs/ui-ux-design-spec.md` | 색·레이어·타이포·애니메이션 명세 |
| `docs/ui-ux-code-analysis.md` | 클래스·상태·DOM 구조 구현 참고 |
| `docs/new_guide.md` | 오로라 색감 + Spline 유지 정책 요약 |
| `docs/mockup-folder-guide.md` | 이 파일 (선택) |
| `App.tsx` | 랜딩 화면 마크업·Tailwind 클래스 **원본** |
| `components/SplineBackground.tsx` | Spline iframe·필터·오로라 오버레이·로딩·레이어 |
| `index.html` | Tailwind CDN, `<style>`(스크롤바·`html`/`body`), `html` 폰트 크기 — **Next `globals.css` / `layout`으로 옮길 때 대조용** |
| **`index.css`** | **필수** — `.bg-color-of-soul`, `.aurora-over-spline`, `.aurora-screen-glow`, `.bg-color-of-soul-grain` (메시·오로라 톤의 단일 소스) |

**합계(최소 세트)**: `docs/` 3~4개 + `App.tsx` + `components/SplineBackground.tsx` + `index.html` + **`index.css`**

---

## 2. 선택: 필요할 때만 넣을 것

| 경로 | 넣는 경우 |
|------|-----------|
| `docs/image/aurora-bg.jpg` | 색감 레퍼런스로 디자이너·팀과 공유할 때 |
| `components/ChatInterface.tsx` | 채팅 UI를 Next에서도 비슷하게 만들 때. **엔트리에는 연결되어 있지 않음.** |
| `types.ts` | `ChatInterface` + Gemini 연동을 그대로 포팅할 때 타입 참고 |
| `services/geminiService.ts` | API 호출 방식만 참고할 때(실제 키·환경변수는 Next 쪽에서 새로 설정) |

**정리**: 순수 랜딩만 옮기면 **ChatInterface / types / geminiService는 생략**해도 됩니다.

---

## 3. 넣지 않는 것 (불필요 또는 Next에서 대체)

| 경로 | 이유 |
|------|------|
| `node_modules/` | Next 프로젝트에서 `npm install`로 재설치. **절대 복사하지 않음.** |
| `package.json` | Vite + 현재 의존성 목록. Next 보일러플레이트의 `package.json`을 쓰고, 필요 패키지(`lucide-react` 등)만 추가. |
| `package-lock.json` | 위와 동일. Next 쪽 lock 파일 사용. |
| `vite.config.ts` | Vite 전용. Next는 `next.config` 등으로 설정. |
| `index.tsx` | ReactDOM `createRoot` 엔트리. Next는 `app/page.tsx` 등으로 대체. |
| `tsconfig.json` | Next 템플릿이 제공하는 설정 사용(경로 alias 등 다름). |
| `dist/` | 빌드 산출물. 재생성되므로 **복사 불필요.** |
| `README.md` | AI Studio 배포 안내 위주. mockup 참고용으로는 선택 사항. |
| `metadata.json` | AI Studio 메타데이터. Next 이식과 무관. |

---

## 4. 폴더 구조 예시 (`mockup` 안)

```
mockup/
  docs/
    ui-ux-design-spec.md
    ui-ux-code-analysis.md
    new_guide.md
    mockup-folder-guide.md    ← 선택
    image/
      aurora-bg.jpg           ← 선택
  reference/
    App.tsx
    components/
      SplineBackground.tsx
      ChatInterface.tsx        ← 선택
    index.html
    index.css                  ← 필수
```

- **`reference/`** 로 원본 TSX/HTML/CSS를 묶어 두면, “실행 가능한 Vite 앱”이 아니라 **읽기 전용 참고**라는 뜻이 분명해집니다.
- `types.ts`, `services/` 는 채팅/Gemini까지 포팅할 계획일 때만 `reference/` 아래에 추가하면 됩니다.

---

## 5. 한눈에 보는 표

| 파일·폴더 | mockup에 포함 |
|------------|----------------|
| `docs/*.md` (디자인·코드 분석·new_guide·이 가이드) | 권장 |
| `docs/image/aurora-bg.jpg` | 선택 |
| `App.tsx` | 권장 |
| `components/SplineBackground.tsx` | 권장 |
| `index.html` | 권장 |
| **`index.css`** | **권장(필수에 가까움)** |
| `components/ChatInterface.tsx` | 선택 |
| `types.ts`, `services/geminiService.ts` | 채팅/API 참고 시만 |
| `index.tsx`, `vite.config.ts`, `tsconfig.json` | 아니오 |
| `package.json`, `package-lock.json` | 아니오 |
| `node_modules/`, `dist/` | 아니오 |
| `README.md`, `metadata.json` | 아니오 (문서로 쓰고 싶으면 README만 선택) |

---

## 6. 작업 시 참고

1. Next 쪽에서는 **Tailwind를 PostCSS로 설치**하고, `index.html`의 인라인 스타일은 `app/globals.css` 또는 `layout.tsx`에 옮기면 됩니다 (`ui-ux-code-analysis.md` 2절).
2. **`index.css`를 반드시 포함**해야 메시 배경과 오로라 오버레이가 동일하게 보입니다.
3. `SplineBackground`의 Spline URL은 상수로 그대로 두거나 환경변수로 빼면 됩니다.
4. mockup은 **빌드 대상에 넣지 않는** 편이 안전합니다(예: import하지 않음).

이 문서만 보고 폴더를 나눠 담으면 됩니다. 구조 이름을 바꿔 쓰고 싶으면 **섹션 4**만 프로젝트 규칙에 맞게 조정하면 됩니다.
