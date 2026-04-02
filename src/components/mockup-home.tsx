"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

import { AboutContent } from "@/components/about-content"
import { EnergyGalleryMenu } from "@/components/energy-gallery-menu"
import { HeroContent } from "@/components/hero-content"
import { BookContent } from "@/components/book-content"
import { ContactContent } from "@/components/contact-content"
import { ServiceContent } from "@/components/service-content"
import { CollaborationFooter } from "@/components/collaboration-footer"
import {
  HeroTransition,
  heroNavContainerVariants,
  heroNavItemVariants,
} from "@/components/hero-transition"
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

const INTRO_DURATION_MS = 4500

/** 스크롤을 내렸다가 메인 상단으로 돌아왔을 때만 인트로 재생 (최초 로드와 동일한 타이밍) */
const SCROLL_DOWN_THRESHOLD_PX = 120
const AT_MAIN_TOP_THRESHOLD_PX = 48

/** mockup_ani/reference/App.tsx structure + COS sections */
export function MockupHome() {
  const [introDone, setIntroDone] = useState(false)
  const introDoneRef = useRef(introDone)
  introDoneRef.current = introDone

  const introTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const wasScrolledDownRef = useRef(false)

  const clearIntroTimer = useCallback(() => {
    if (introTimerRef.current) {
      window.clearTimeout(introTimerRef.current)
      introTimerRef.current = null
    }
  }, [])

  const scheduleIntroEnd = useCallback(() => {
    clearIntroTimer()
    introTimerRef.current = window.setTimeout(() => {
      setIntroDone(true)
      introTimerRef.current = null
    }, INTRO_DURATION_MS)
  }, [clearIntroTimer])

  useEffect(() => {
    scheduleIntroEnd()
    return () => clearIntroTimer()
  }, [clearIntroTimer, scheduleIntroEnd])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY ?? document.documentElement.scrollTop
      if (y > SCROLL_DOWN_THRESHOLD_PX) {
        wasScrolledDownRef.current = true
        return
      }
      if (
        y <= AT_MAIN_TOP_THRESHOLD_PX &&
        wasScrolledDownRef.current &&
        introDoneRef.current
      ) {
        wasScrolledDownRef.current = false
        setIntroDone(false)
        scheduleIntroEnd()
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [scheduleIntroEnd])

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden font-sans text-gray-800 selection:bg-[#00FF88]/30">
      <SplineBackground />

      {introDone ? (
        <motion.nav
          aria-label="Section"
          className="pointer-events-auto fixed left-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-6 text-sm font-mono text-gray-500 md:left-8 lg:flex lg:left-12"
          variants={heroNavContainerVariants}
          initial="initial"
          animate="animate"
          aria-hidden={false}
        >
          {navItems.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              variants={heroNavItemVariants}
              className="group flex cursor-pointer items-center gap-4 transition-all hover:translate-x-2 hover:text-gray-800"
            >
              <span className="w-10 text-gray-400 group-hover:text-gray-600">
                / {index + 1}
              </span>
              <span className="font-medium tracking-wide">{item.label}</span>
            </motion.a>
          ))}
        </motion.nav>
      ) : null}

      <div className="pointer-events-none relative z-10 flex min-h-screen flex-col p-6 md:p-8 lg:p-12">
        <main
          id="main"
          className="pointer-events-auto relative flex w-full min-h-[min(100dvh,100vh)] flex-1 flex-col items-center justify-center"
        >
          <HeroTransition introDone={introDone} />
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

      <CollaborationFooter />
    </div>
  )
}
