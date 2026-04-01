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

export function ServiceContent() {
  return (
    <section
      id="service"
      className="scroll-mt-8 relative min-h-screen px-8 pt-16 pb-20 sm:px-12 md:px-16 lg:px-20"
    >
      <h2 className="mb-10 font-serif text-3xl italic text-card-foreground md:text-4xl lg:text-5xl">
        &ldquo;Service&rdquo;
      </h2>

      <div className="relative mx-auto max-w-3xl rounded-sm bg-gradient-to-br from-[#FDE2F3]/40 via-violet-100/30 to-[#B2EBF2]/45 px-5 py-10 sm:px-8 sm:py-12 md:px-10 md:py-14">
        <div className="flex flex-col items-center gap-14 md:gap-16 lg:gap-20">
          {steps.map((step, index) => {
            const num = String(index + 1).padStart(2, "0")
            return (
              <div
                key={step.title}
                className="flex w-full flex-col items-center gap-7 md:gap-9"
              >
                <h3 className="text-center font-sans text-2xl font-extralight uppercase tracking-[0.22em] text-card-foreground sm:text-3xl md:text-[2.125rem] md:leading-tight lg:text-4xl">
                  {num}. {step.title}
                </h3>
                <div className="w-full max-w-md rounded-sm border border-white/55 bg-white/70 px-6 py-7 text-center shadow-sm backdrop-blur-sm sm:max-w-lg sm:px-8 sm:py-8 md:max-w-xl">
                  <div className="flex flex-col gap-4 font-sans text-sm font-medium leading-[1.85] text-card-foreground md:text-base md:leading-[1.9]">
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
