/** About와 동일 스케일 — 아래 두 문단(예약제 안내)만 사용 */
const bodyPrimary =
  "text-sm leading-relaxed text-card-foreground/90 md:text-base lg:text-lg"

/** 나머지 본문·스텝: 작은 사이즈 (이전 목업 기준) */
const bodySmall =
  "text-[14px] leading-[1.65] text-[#333333] sm:text-[15px] sm:leading-[1.7]"

const titleSmall =
  "text-[18px] font-bold leading-tight text-[#333333] sm:text-[20px]"

const stepLabel =
  "text-[14px] font-semibold leading-snug text-[#555555] sm:text-[15px]"

export function BookContent() {
  return (
    <section
      id="book"
      className="scroll-mt-8 relative min-h-screen px-8 pt-16 pb-20 sm:px-12 md:px-16 lg:px-20"
    >
      <h2 className="mb-10 font-serif text-3xl italic text-card-foreground md:text-4xl lg:text-5xl">
        &ldquo;Book&rdquo;
      </h2>

      <p
        className="mb-6 max-w-2xl font-serif text-xl italic leading-snug text-[#333333] md:text-2xl"
        suppressHydrationWarning
      >
        Are you ready to meet your true
        <br />
        color of soul?
      </p>

      <div className={`mb-8 flex max-w-2xl flex-col gap-2 ${bodyPrimary}`} suppressHydrationWarning>
        <p suppressHydrationWarning>
          Color of Soul은 100% 예약제로 운영됩니다. 단순한 촬영이 아닌, 명리학적 데이터 분석과 빛의 설계를 위해 하루 한정된 인원만 모십니다.
        </p>
        <p suppressHydrationWarning>
          예약 확정 시 보내드리는 &lsquo;사전 질문지&rsquo;를 통해 분석이 시작됩니다.
        </p>
      </div>

      <h3 className={`${titleSmall} mb-5`}>Booking Process</h3>

      <div className="mb-8 flex max-w-2xl flex-col gap-9">
        <div>
          <p className={`${stepLabel} mb-2`} suppressHydrationWarning>
            STEP 01. Schedule &amp; Deposit (일정 선택)
          </p>
          <div className={`flex flex-col gap-2 ${bodySmall}`}>
            <p suppressHydrationWarning>원하시는 날짜와 시간을 선택 후 예약금을 결제해 주세요.</p>
            <p suppressHydrationWarning>
              (예약금 확인 후 24시간 이내에 확정 문자를 발송해 드립니다.)
            </p>
          </div>
        </div>

        <div>
          <p className={`${stepLabel} mb-2`} suppressHydrationWarning>
            STEP 02. Pre-Analysis Form (데이터 제출)
          </p>
          <div className={`flex flex-col gap-2 ${bodySmall}`}>
            <p suppressHydrationWarning>
              발송된 링크를 통해 생년월일시(양/음력)와 촬영 목적을 작성해 주세요.
            </p>
            <p suppressHydrationWarning>
              태어난 시간을 모르실 경우, 가장 보편적인 에너지를 기준으로 분석해 드립니다.
            </p>
            <p suppressHydrationWarning>
              보내주신 정보는 오직 사주 분석과 촬영 컨셉 설계 목적으로만 사용되며, 촬영 후 즉시 파기됩니다.
            </p>
          </div>
        </div>

        <div>
          <p className={`${stepLabel} mb-2`} suppressHydrationWarning>
            STEP 03. Visit &amp; Shooting (방문 및 촬영)
          </p>
          <div className={`flex flex-col gap-2 ${bodySmall}`}>
            <p suppressHydrationWarning>
              분석된 리포트를 바탕으로 작가와 1:1 디렉팅 촬영이 진행됩니다.
            </p>
            <p suppressHydrationWarning>예약 시간 10분 전 도착을 권장합니다</p>
          </div>
        </div>
      </div>

      <div className="mb-12 flex max-w-2xl flex-col gap-1">
        <h3 className={titleSmall}>Required Information</h3>
        <p className={`${bodySmall} text-[#444444]`} suppressHydrationWarning>
          [필수 기재 사항] 정확한 컬러 분석을 위해 아래 정보를 빠짐없이 기재해 주세요.
        </p>
        <p className={bodySmall} suppressHydrationWarning>
          성함 / 연락처
        </p>
        <p className={bodySmall} suppressHydrationWarning>
          생년월일 (예: 1995.05.20)
        </p>
        <p className={bodySmall} suppressHydrationWarning>
          양력 / 음력 / 윤달 여부
        </p>
        <p className={bodySmall} suppressHydrationWarning>
          태어난 도시
        </p>
        <p className={bodySmall} suppressHydrationWarning>
          태어난 시간 (정확한 시/분을 모를 경우 &lsquo;오전/오후&rsquo; 또는 &lsquo;미정&rsquo;으로 기재)
        </p>
      </div>

      <div className="mb-8 flex max-w-2xl flex-col gap-2">
        <h3 className={titleSmall} suppressHydrationWarning>
          Cancellation Policy (유의사항)
        </h3>
        <p className={bodySmall} suppressHydrationWarning>
          Notice
        </p>
        <p className={bodySmall} suppressHydrationWarning>
          사전 분석 시스템: COS는 촬영 전 고객님의 사주를 미리 분석하고 조명과 세팅합니다.
        </p>
        <p className={bodySmall} suppressHydrationWarning>
          당일 취소 및 변경은 불가능합니다.
        </p>
        <p className={bodySmall} suppressHydrationWarning>
          지각 안내: 예약 시간보다 15분 이상 늦을 경우, 뒷 타임 고객님을 위해 촬영 시간이
        </p>
        <p className={bodySmall} suppressHydrationWarning>
          단축되거나 취소될 수 있습니다 (환불 불가).
        </p>
        <p className={bodySmall} suppressHydrationWarning>
          환불 규정: 촬영 3일 전 100% 환불 / 2일 전 50% / 1일 전 및 당일 환불 불가.
        </p>
      </div>
    </section>
  )
}
