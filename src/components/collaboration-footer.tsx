import Image from "next/image"

/* Pole Star Labs 홈페이지 완성 후: 아래 주석을 해제하고 `PoleStarLabsName`을 `PoleStarLabsLink`로 교체하세요.
const POLESTAR_LABS_URL = "https://www.polestar-labs.ai/"

function PoleStarLabsLink({ className }: { className?: string }) {
  return (
    <a
      href={POLESTAR_LABS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      Pole Star Labs
    </a>
  )
}
*/

function PoleStarLabsName({ className }: { className?: string }) {
  return <span className={className}>Pole Star Labs</span>
}

/** Pole Star Labs 협업 — 1행: X + 로고 + 브랜드 강조, 2행: 본문 톤 통일 */
export function CollaborationFooter() {
  return (
    <footer
      className="pointer-events-auto relative z-20 flex w-full justify-center px-4 pb-10 pt-8 md:px-8"
      role="contentinfo"
    >
      <div className="flex max-w-2xl flex-col items-center gap-3 rounded-sm border border-white/25 bg-white/[0.12] px-6 py-6 shadow-sm backdrop-blur-md md:px-10 md:py-7">
        <p className="text-center text-sm font-light leading-snug text-gray-600/95 md:text-base">
          <span className="inline-flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1">
            <span className="tracking-widest">Color of Soul </span>
            <span className="tracking-widest">x</span>
            <span className="inline-flex shrink-0 flex-nowrap items-center gap-x-1.5">
              <Image
                src="/pole-star.png"
                alt=""
                width={120}
                height={40}
                className="h-5 w-auto shrink-0 object-contain md:h-6"
              />
              <PoleStarLabsName className="inline font-bold tracking-normal text-black" />
            </span>
          </span>
        </p>

        <p className="max-w-[min(100%,28rem)] text-center text-xs font-light leading-relaxed tracking-wide text-gray-500/90 md:text-sm">
          Designed & Developed in collaboration with{" "}
          <PoleStarLabsName className="font-light tracking-wide text-gray-500/90" />
        </p>
      </div>
    </footer>
  )
}
