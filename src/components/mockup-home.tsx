"use client"

import { ArrowRight } from "lucide-react"
import { AboutContent } from "@/components/about-content"
import { EnergyGalleryMenu } from "@/components/energy-gallery-menu"
import { HeroContent } from "@/components/hero-content"
import { BookContent } from "@/components/book-content"
import { ContactContent } from "@/components/contact-content"
import { ServiceContent } from "@/components/service-content"
import { SplineBackground } from "@/components/spline-background"

const navItems = [
  { label: "Main", href: "#main" },
  { label: "About", href: "#about" },
  { label: "Service", href: "#service" },
  { label: "Gallery", href: "#gallery" },
  { label: "Book", href: "#book" },
  { label: "Contact", href: "#contact" },
]

const sectionCardClassName =
  "relative rounded-sm border border-white/35 bg-white/40 px-4 py-10 shadow-2xl shadow-purple-500/5 backdrop-blur-md md:px-8"

/** Same shell as other sections; tighter horizontal padding so gallery grid is not framed by a wide inner white band */
const gallerySectionCardClassName =
  "relative rounded-sm border border-white/35 bg-white/40 px-2 py-8 shadow-2xl shadow-purple-500/5 backdrop-blur-md md:px-3 md:py-10"

/** mockup_ani/reference/App.tsx structure + COS sections */
export function MockupHome() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden font-sans text-gray-800 selection:bg-[#00FF88]/30">
      <SplineBackground />

      <nav
        aria-label="Section"
        className="pointer-events-auto fixed left-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-6 text-sm font-mono text-gray-500 md:left-8 lg:flex lg:left-12"
      >
        {navItems.map((item, index) => (
          <a
            key={item.label}
            href={item.href}
            className="group flex cursor-pointer items-center gap-4 transition-all hover:translate-x-2 hover:text-gray-800"
          >
            <span className="w-10 text-gray-400 group-hover:text-gray-600">
              / {index + 1}
            </span>
            <span className="font-medium tracking-wide">{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="pointer-events-none relative z-10 flex min-h-screen flex-col p-6 md:p-8 lg:p-12">
        <main
          id="main"
          className="pointer-events-auto relative flex w-full flex-1 flex-col items-center justify-center"
        >
          <div className="flex w-full justify-center perspective-[1000px]">
            <div className="w-full max-w-[580px] transform border border-white/35 bg-white/50 p-6 text-gray-800 shadow-2xl shadow-purple-500/5 backdrop-blur-2xl transition-transform duration-700 hover:scale-[1.02] hover:-rotate-1">
              <div className="relative mb-8 flex aspect-square w-full items-center justify-center overflow-hidden border border-white/50 bg-gradient-to-br from-sky-100/90 via-violet-50/95 to-pink-100/85">
                <div className="relative flex h-64 w-64 items-center justify-center border border-white/60 bg-gradient-to-br from-sky-200/70 to-violet-200/65 shadow-lg shadow-sky-200/40">
                  <svg
                    width="140"
                    height="140"
                    viewBox="0 0 100 100"
                    className="stroke-sky-600/85 stroke-[0.8] opacity-90"
                  >
                    <line x1="50" y1="20" x2="50" y2="80" />
                    <line x1="20" y1="20" x2="80" y2="20" />
                    <line x1="50" y1="20" x2="80" y2="50" />
                  </svg>
                  <div className="absolute left-4 top-4 h-1.5 w-1.5 rounded-full bg-white opacity-80 shadow-sm" />
                  <div className="absolute right-4 top-4 h-1.5 w-1.5 rounded-full bg-white opacity-80 shadow-sm" />
                  <div className="absolute bottom-4 left-4 h-1.5 w-1.5 rounded-full bg-white opacity-80 shadow-sm" />
                  <div className="absolute bottom-4 right-4 h-1.5 w-1.5 rounded-full bg-white opacity-80 shadow-sm" />
                </div>
              </div>

              <div className="space-y-10 px-2 pb-6">
                <div className="space-y-4">
                  <div className="font-mono text-xs font-medium uppercase tracking-wider text-gray-400">
                    Color of Soul / 1.0
                  </div>
                  <h2 className="text-2xl font-medium leading-tight tracking-tight text-[#222222]">
                    Find your color of soul
                  </h2>
                </div>

                <div className="flex items-start gap-5 border-t border-gray-200/50 pt-4">
                  <ArrowRight className="mt-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
                  <p className="max-w-[360px] font-mono text-sm leading-relaxed text-gray-600">
                    보이지 않는 운명의 데이터를 보이는 빛의 언어로 번역합니다. 명리학과 스펙트럼 이론으로 당신만의 파장을
                    설계합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl space-y-8 px-4 pb-12 pt-4 md:px-8">
        <div className={sectionCardClassName}>
          <HeroContent />
          <AboutContent />
        </div>
        <div className={sectionCardClassName}>
          <ServiceContent />
        </div>
        <section id="gallery" className={`scroll-mt-8 ${gallerySectionCardClassName}`}>
          <EnergyGalleryMenu />
        </section>
        <div className={sectionCardClassName}>
          <BookContent />
        </div>
        <div className={sectionCardClassName}>
          <ContactContent />
        </div>
      </div>
    </div>
  )
}
