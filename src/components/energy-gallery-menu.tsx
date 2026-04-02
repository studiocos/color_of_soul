"use client"

import Image from "next/image"
import { createPortal } from "react-dom"
import { AnimatePresence, motion } from "framer-motion"
import { useCallback, useEffect, useState } from "react"

const galleryItems = [
  { src: "/wood.png", label: "Wood" },
  { src: "/FIRE.png", label: "Fire" },
  { src: "/EARTH.png", label: "Earth" },
  { src: "/METAL.png", label: "Metal" },
  { src: "/WATER.png", label: "Water" },
] as const

type GalleryItem = (typeof galleryItems)[number]

/** Slower, ease-out heavy — calm open / close */
const backdropTransition = { duration: 0.58, ease: [0.25, 0.46, 0.45, 0.98] as const }
const panelTransition = { duration: 0.64, ease: [0.22, 1, 0.36, 1] as const }

export function EnergyGalleryMenu() {
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null)
  const [mounted, setMounted] = useState(false)

  const closeLightbox = useCallback(() => setLightbox(null), [])

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (lightbox) {
      document.body.style.overflow = "hidden"
    }
  }, [lightbox])

  const onExitComplete = useCallback(() => {
    document.body.style.overflow = ""
  }, [])

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [lightbox, closeLightbox])

  return (
    <div className="w-full">
      <h2 className="mb-10 font-serif text-3xl italic text-card-foreground md:text-4xl lg:text-5xl">
        &ldquo;Gallery&rdquo;
      </h2>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-2 lg:grid-cols-5 lg:gap-2">
        {galleryItems.map((item, index) => (
          <button
            key={item.src}
            type="button"
            className="min-w-0 overflow-hidden rounded-sm border border-white/50 text-left shadow-sm shadow-purple-500/5 transition hover:border-white/70 hover:shadow-md focus-visible:outline focus-visible:ring-2 focus-visible:ring-purple-400/60"
            onClick={() => setLightbox(item)}
          >
            <span className="sr-only">{item.label}, 크게 보기</span>
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src={item.src}
                alt=""
                fill
                sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 18vw"
                className="object-cover object-center"
                priority={index === 0}
              />
            </div>
          </button>
        ))}
      </div>

      {mounted
        ? createPortal(
            <AnimatePresence mode="wait" onExitComplete={onExitComplete}>
              {lightbox ? (
                <motion.div
                  key={lightbox.src}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="gallery-lightbox-title"
                  className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={backdropTransition}
                >
                  <button
                    type="button"
                    className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
                    aria-label="닫기"
                    onClick={closeLightbox}
                  />
                  <motion.div
                    className="relative z-10 flex w-full max-w-[min(96vw,56rem)] flex-col items-center gap-3"
                    initial={{ opacity: 0, scale: 0.965, y: 14 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{
                      opacity: 0,
                      scale: 0.98,
                      y: 10,
                      transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.98] },
                    }}
                    transition={panelTransition}
                  >
                    <div className="flex w-full items-center justify-between gap-3">
                      <p
                        id="gallery-lightbox-title"
                        className="font-serif text-lg italic text-white drop-shadow md:text-xl"
                      >
                        {lightbox.label}
                      </p>
                      <button
                        type="button"
                        onClick={closeLightbox}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-white/40 bg-white/10 text-xl leading-none text-white backdrop-blur-sm transition hover:bg-white/20 focus-visible:outline focus-visible:ring-2 focus-visible:ring-white/60"
                        aria-label="닫기"
                      >
                        ×
                      </button>
                    </div>
                    <div className="relative h-[min(85dvh,880px)] w-full">
                      <Image
                        src={lightbox.src}
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 96vw, 56rem"
                        className="object-contain object-center drop-shadow-lg"
                        priority
                      />
                    </div>
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body
          )
        : null}
    </div>
  )
}
