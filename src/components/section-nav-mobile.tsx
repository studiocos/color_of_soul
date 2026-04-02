"use client"

import { useCallback, useEffect, useId, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"

import type { SectionNavItem } from "@/constants/section-nav"

type SectionNavMobileProps = {
  items: readonly SectionNavItem[]
}

export function SectionNavMobile({ items }: SectionNavMobileProps) {
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLElement>(null)
  const panelTitleId = useId()

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)")
    const onChange = () => setOpen(false)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, close])

  useEffect(() => {
    if (!open || !panelRef.current) return
    const focusable = panelRef.current.querySelector<HTMLElement>(
      'a[href], button:not([disabled])',
    )
    focusable?.focus()
  }, [open])

  const onNavigate = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault()
      close()
      const el = document.querySelector(href)
      el?.scrollIntoView({ behavior: "smooth", block: "start" })
    },
    [close],
  )

  return (
    <>
      <button
        type="button"
        className="pointer-events-auto fixed right-4 top-6 z-[60] flex h-11 w-11 items-center justify-center rounded-sm border border-white/40 bg-white/55 text-gray-700 shadow-sm backdrop-blur-md transition hover:bg-white/75 focus-visible:outline focus-visible:ring-2 focus-visible:ring-purple-400/60 lg:hidden"
        aria-label={open ? "섹션 메뉴 닫기" : "섹션 메뉴 열기"}
        aria-expanded={open}
        aria-controls={panelTitleId}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
      </button>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              aria-label="메뉴 배경 닫기"
              className="fixed inset-0 z-[65] bg-black/40 backdrop-blur-[1px] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
            />
            <motion.nav
              ref={panelRef}
              id={panelTitleId}
              aria-label="Section"
              role="dialog"
              aria-modal="true"
              aria-labelledby={`${panelTitleId}-heading`}
              className="pointer-events-auto fixed left-0 top-0 z-[70] flex h-full w-[min(18rem,88vw)] flex-col border-r border-white/35 bg-white/88 py-8 pl-6 pr-4 shadow-xl backdrop-blur-md lg:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-6 flex items-center justify-between gap-2 pr-1">
                <p
                  id={`${panelTitleId}-heading`}
                  className="font-mono text-xs font-medium uppercase tracking-widest text-gray-500"
                >
                  Sections
                </p>
                <button
                  type="button"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm text-gray-600 transition hover:bg-black/5 focus-visible:outline focus-visible:ring-2 focus-visible:ring-purple-400/60"
                  aria-label="닫기"
                  onClick={close}
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>
              <ul className="flex flex-col gap-5 text-sm font-mono text-gray-600">
                {items.map((item, index) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="group flex cursor-pointer items-center gap-3 transition hover:text-gray-900"
                      onClick={(e) => onNavigate(e, item.href)}
                    >
                      <span className="w-9 shrink-0 text-gray-400">/ {index + 1}</span>
                      <span className="font-medium tracking-wide">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </>
  )
}
