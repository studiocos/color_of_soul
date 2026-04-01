import Image from "next/image"

/** 목업 카드 본문 — Book 섹션과 동일 스케일 */
const bodySmall =
  "text-[14px] leading-[1.65] text-card-foreground/95 sm:text-[15px] sm:leading-[1.7]"

const sectionHeading =
  "mb-3 text-[18px] font-bold leading-tight text-card-foreground sm:text-[20px]"

const noteMuted =
  "mt-2 text-[13px] leading-relaxed text-card-foreground/80 sm:text-[14px]"

export function ContactContent() {
  return (
    <section
      id="contact"
      className="scroll-mt-8 relative min-h-screen px-8 pt-16 pb-20 sm:px-12 md:px-16 lg:px-20"
      aria-labelledby="contact-heading"
    >
      <header className="mb-10 md:mb-12 lg:mb-14">
        <h2
          id="contact-heading"
          className="font-serif text-3xl italic leading-[1.15] tracking-tight text-card-foreground md:text-4xl lg:text-5xl lg:leading-[1.1]"
        >
          &ldquo;Where light meets soul&rdquo;
        </h2>
        <p
          className="mt-4 max-w-2xl text-[17px] leading-relaxed text-card-foreground/90 sm:text-[18px] md:text-[19px] lg:text-[20px] lg:leading-[1.55]"
          suppressHydrationWarning
        >
          빛과 그림자, 그리고 당신의 이야기가 머무는 곳
        </p>
      </header>

      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:gap-10 xl:gap-12">
        <div className="min-w-0 flex-1 space-y-9 md:space-y-10">
          <div>
            <h3
              className={`${sectionHeading} whitespace-nowrap`}
              suppressHydrationWarning
            >
              Studio COS (컬러 오브 소울)
            </h3>
            <div className={`flex flex-col gap-1.5 ${bodySmall}`}>
              <p suppressHydrationWarning>
                Address : 서울특별시 강남구 논현로 94길 25-8, 3F
              </p>
              <p suppressHydrationWarning>Operation : 10:00 - 21:00</p>
            </div>
            <p className={noteMuted} suppressHydrationWarning>
              본 스튜디오는 100% 예약제로 운영되며, 워크인(Walk-in) 방문은 어렵습니다.
            </p>
          </div>

          <div>
            <h3 className={sectionHeading} suppressHydrationWarning>
              Contact Channels
            </h3>
            <div className={`flex flex-col gap-1.5 ${bodySmall}`}>
              <p suppressHydrationWarning>
                Reservation : 0507-1385-2489 / 네이버 플레이스 예약
              </p>
              <p suppressHydrationWarning>Business &amp; Collab : candyflip@naver.com</p>
              <p suppressHydrationWarning>Instagram : @studio_cos_</p>
            </div>
            <p className={`${noteMuted} mt-2`} suppressHydrationWarning>
              (DM은 확인이 늦을 수 있습니다)
            </p>
          </div>

          <div>
            <h3 className={sectionHeading} suppressHydrationWarning>
              Directions
            </h3>
            <div className={`flex flex-col gap-1.5 ${bodySmall}`}>
              <p suppressHydrationWarning>Parking (주차안내)</p>
              <p suppressHydrationWarning>건물 내 주차장 무료이용 가능</p>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[min(100%,520px)] shrink-0 lg:mx-0 lg:max-w-[min(46vw,480px)] xl:max-w-[520px] 2xl:max-w-[560px]">
          <div className="relative aspect-square w-full overflow-hidden rounded-sm border border-white/40 bg-white/30 shadow-inner shadow-purple-500/5">
            <Image
              src="/contact.JPG"
              alt="Studio COS 위치 지도 (역삼·논현 일대)"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) min(100vw, 520px), (max-width: 1536px) 480px, 560px"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
