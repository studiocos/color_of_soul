"use client"

import Image from "next/image"
import { createPortal } from "react-dom"
import { useCallback, useEffect, useState } from "react"

const galleryItems = [
  { src: "/wood.png", label: "Wood" },
  { src: "/FIRE.png", label: "Fire" },
  { src: "/EARTH.png", label: "Earth" },
  { src: "/METAL.png", label: "Metal" },
  { src: "/WATER.png", label: "Water" },
] as const

type GalleryItem = (typeof galleryItems)[number]

function GalleryLightbox({
  item,
  onClose,
}: {
  item: GalleryItem
  onClose: () => void
}) {
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  if (typeof document === "undefined") return null

  return createPortal(
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gallery-lightbox-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/55 backdrop-blur-[2px] transition-opacity"
        aria-label="닫기"
        onClick={onClose}
      />
      <div className="relative z-10 flex w-full max-w-[min(96vw,56rem)] flex-col items-center gap-3">
        <div className="flex w-full items-center justify-between gap-3">
          <p
            id="gallery-lightbox-title"
            className="font-serif text-lg italic text-white drop-shadow md:text-xl"
          >
            {item.label}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-white/40 bg-white/10 text-xl leading-none text-white backdrop-blur-sm transition hover:bg-white/20 focus-visible:outline focus-visible:ring-2 focus-visible:ring-white/60"
            aria-label="닫기"
          >
            ×
          </button>
        </div>
        <div className="relative h-[min(85dvh,880px)] w-full">
          <Image
            src={item.src}
            alt=""
            fill
            sizes="(max-width: 1024px) 96vw, 56rem"
            className="object-contain object-center drop-shadow-lg"
            priority
          />
        </div>
      </div>
    </div>,
    document.body
  )
}

export function EnergyGalleryMenu() {
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null)

  const closeLightbox = useCallback(() => setLightbox(null), [])

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

      {lightbox ? (
        <GalleryLightbox item={lightbox} onClose={closeLightbox} />
      ) : null}
    </div>
  )
}
