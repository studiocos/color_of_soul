const steps = [
  {
    title: "CONSULTATION",
    lines: [
      "사전 작성된 생년월일시를 바탕으로 심층 상담 진행",
      "나의 행운의 색(Lucky Color)과 촬영 컨셉 확정",
    ],
  },
  {
    title: "STYLING & SHOOTING",
    lines: ["조명 세팅 및 스타일링", "디렉팅을 통한 A컷 촬영"],
  },
  {
    title: "SELECTION & RETOUCHING",
    lines: [
      "작가와 함께 베스트 컷 셀렉트 (모니터링)",
      "1:1 정밀 보정 및 컬러 그레이딩 작업",
    ],
  },
  {
    title: "UTILIZATION",
    lines: ["최종 보정본 파일 제공", "고품질 인화 패키지"],
  },
] as const

/** 3.png: 아래로 갈수록 오른쪽으로 인덴트 — margin 대신 padding으로 처리해 100% 너비 + margin 오버플로 방지 */
const stepStaggerClass = [
  "max-sm:pl-0 sm:pl-0",
  "max-sm:pl-0 sm:pl-[6%] md:pl-[9%] lg:pl-[11%]",
  "max-sm:pl-0 sm:pl-[12%] md:pl-[18%] lg:pl-[22%]",
  "max-sm:pl-0 sm:pl-[18%] md:pl-[27%] lg:pl-[33%]",
] as const

/** 02→03→04로 흰색 박스 max-width를 단계적으로 줄여 오른쪽이 짧아지는 느낌 (md+: xl → lg → md) */
const cardMaxWidthClass = [
  "max-w-md sm:max-w-lg md:max-w-xl",
  "max-w-md sm:max-w-lg md:max-w-xl",
  "max-w-md sm:max-w-lg md:max-w-lg",
  "max-w-sm sm:max-w-md md:max-w-md",
] as const

export function ServiceContent() {
  return (
    <section
      id="service"
      className="scroll-mt-8 relative min-h-screen overflow-x-hidden px-4 pt-16 pb-20 sm:px-6 md:px-8 lg:px-10"
    >
      <h2 className="mb-10 font-serif text-3xl italic text-card-foreground md:text-4xl lg:text-5xl">
        &ldquo;Service&rdquo;
      </h2>

      <div className="relative min-w-0 w-full rounded-sm bg-gradient-to-br from-[#fce4ec]/90 via-[#e1bee7]/65 to-[#b3e5fc]/90 px-4 py-10 sm:px-6 sm:py-12 md:px-10 md:py-14 lg:px-12">
        <div className="flex min-w-0 flex-col items-stretch gap-8 md:gap-10 lg:gap-12">
          {steps.map((step, index) => {
            const num = String(index + 1).padStart(2, "0")
            const singleLineTitle = step.title === "SELECTION & RETOUCHING"
            return (
              <div
                key={step.title}
                className={`flex min-w-0 w-full max-w-full flex-col items-start gap-3 md:gap-4 ${stepStaggerClass[index]}`}
              >
                <h3
                  className={`w-full min-w-0 max-w-full text-left font-sans text-lg font-extralight uppercase leading-snug tracking-[0.12em] text-card-foreground sm:tracking-[0.16em] md:text-xl md:tracking-[0.18em] lg:text-2xl lg:tracking-[0.2em] ${
                    singleLineTitle ? "whitespace-nowrap" : "break-words"
                  }`}
                >
                  {num}. {step.title}
                </h3>
                <div
                  className={`min-w-0 w-full bg-[rgba(255,255,255,0.75)] px-6 py-7 sm:px-8 sm:py-8 ${cardMaxWidthClass[index]}`}
                >
                  <div className="flex min-w-0 flex-col gap-2 break-words text-left font-sans text-sm font-medium leading-[1.55] text-card-foreground md:text-base md:leading-[1.6]">
                    {step.lines.map((line) => (
                      <p key={line} suppressHydrationWarning>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
