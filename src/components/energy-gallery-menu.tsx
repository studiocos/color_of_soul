"use client"

import Image from "next/image"

const galleryItems = [
  { src: "/wood.png", label: "Wood" },
  { src: "/FIRE.png", label: "Fire" },
  { src: "/EARTH.png", label: "Earth" },
  { src: "/METAL.png", label: "Metal" },
  { src: "/WATER.png", label: "Water" },
] as const

export function EnergyGalleryMenu() {
  return (
    <div className="w-full">
      <p className="font-mono text-xs uppercase tracking-wider text-gray-400">Gallery</p>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-2 lg:grid-cols-5 lg:gap-2">
        {galleryItems.map((item, index) => (
          <div
            key={item.src}
            className="min-w-0 overflow-hidden rounded-sm border border-white/50 shadow-sm shadow-purple-500/5"
          >
            <div className="relative aspect-[4/5] w-full">
              <Image
                src={item.src}
                alt={item.label}
                fill
                sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 18vw"
                className="origin-center object-contain object-center p-0 scale-[1.22]"
                priority={index === 0}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
