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

/** 3.png: 계단식 인덴트 — padding만 사용. sm/md에서 과한 pl은 제목·카드 가로를 앗아가 잘림/이상 줄바꿈을 유발하므로 완만하게 */
const stepStaggerClass = [
  "max-sm:pl-0 sm:pl-0",
  "max-sm:pl-0 sm:pl-[3%] md:pl-[6%] lg:pl-[10%]",
  "max-sm:pl-0 sm:pl-[5%] md:pl-[10%] lg:pl-[14%]",
  "max-sm:pl-0 sm:pl-[8%] md:pl-[14%] lg:pl-[18%]",
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
      className="scroll-mt-8 relative min-h-screen px-4 pt-16 pb-20 sm:px-6 md:px-8 lg:px-10"
    >
      <h2 className="mb-10 font-serif text-3xl italic text-card-foreground md:text-4xl lg:text-5xl">
        &ldquo;Service&rdquo;
      </h2>

      <div className="relative min-w-0 w-full rounded-sm bg-gradient-to-br from-[#fce4ec]/90 via-[#e1bee7]/65 to-[#b3e5fc]/90 px-3 py-10 sm:px-5 sm:py-12 md:px-10 md:py-14 lg:px-12">
        <div className="flex min-w-0 flex-col items-stretch gap-8 md:gap-10 lg:gap-12">
          {steps.map((step, index) => {
            const num = String(index + 1).padStart(2, "0")
            return (
              <div
                key={step.title}
                className={`flex min-w-0 w-full max-w-full flex-col items-start gap-3 md:gap-4 ${stepStaggerClass[index]}`}
              >
                <h3 className="w-full min-w-0 max-w-full break-words text-left font-sans text-lg font-extralight uppercase leading-snug tracking-[0.12em] text-card-foreground sm:tracking-[0.16em] md:text-xl md:tracking-[0.18em] lg:text-2xl lg:tracking-[0.2em]">
                  {num}. {step.title}
                </h3>
                <div
                  className={`min-w-0 w-full bg-[rgba(255,255,255,0.75)] px-4 py-6 sm:px-7 sm:py-7 md:px-8 md:py-8 ${cardMaxWidthClass[index]}`}
                >
                  <div className="flex min-w-0 flex-col gap-2 break-keep text-left font-sans text-sm font-medium leading-[1.55] text-card-foreground md:text-base md:leading-[1.6]">
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
