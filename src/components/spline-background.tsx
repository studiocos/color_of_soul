"use client"

import { useEffect, useState } from "react"

/** Public URL embed. 검은 빈 시야 방지: Spline Play Settings BG `#fffefb` 등 — docs/uiux/04-background-3d-and-layers.md (Spline 에디터 절차) */
const SPLINE_SRC =
  "https://my.spline.design/dunes-r4IlewzoPYCEeTp6o7lQCo2g/"

/** Spline 3D + aurora overlays — adapted from mockup_ani/reference/components/SplineBackground.tsx */
export function SplineBackground() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [mountIframe, setMountIframe] = useState(true)

  useEffect(() => {
    function onVisibilityChange() {
      if (document.hidden) {
        setMountIframe(false)
        setIsLoaded(false)
      } else {
        setMountIframe(true)
      }
    }

    document.addEventListener("visibilitychange", onVisibilityChange)
    return () => document.removeEventListener("visibilitychange", onVisibilityChange)
  }, [])

  return (
    <div className="fixed inset-0 z-0 h-full w-full overflow-hidden bg-color-of-soul">
      {mountIframe ? (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <iframe
            src={SPLINE_SRC}
            title="3D Dunes Background"
            className={`absolute left-1/2 top-1/2 h-[128vmax] w-[128vmax] min-h-full min-w-full max-w-none border-0 transition-opacity duration-1000 brightness-[1.24] saturate-[1.38] contrast-[1.06] ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transform: "translate(-50%, calc(-50% - 4.5vh))",
            }}
            onLoad={() => setIsLoaded(true)}
          />
        </div>
      ) : null}

      <div className="aurora-over-spline" aria-hidden />
      <div className="aurora-screen-glow" aria-hidden />

      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-cyan-50/55 via-white/15 to-rose-50/50" />

      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-color-of-soul-grain"
        aria-hidden
      />
    </div>
  )
}
