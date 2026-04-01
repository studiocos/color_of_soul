"use client"

import { useEffect, useRef } from "react"

export function AuroraBackground() {
  const layer1Ref = useRef<HTMLDivElement>(null)
  const layer2Ref = useRef<HTMLDivElement>(null)
  const layer3Ref = useRef<HTMLDivElement>(null)
  const layer4Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frameId: number
    const startTime = performance.now()

    function animate(now: number) {
      const t = (now - startTime) / 1000

      if (layer1Ref.current) {
        const x = Math.sin(t * 0.15) * 6
        const y = Math.cos(t * 0.12) * 5
        const s = 1 + Math.sin(t * 0.1) * 0.06
        layer1Ref.current.style.transform = `translate(${x}%, ${y}%) scale(${s})`
      }

      if (layer2Ref.current) {
        const x = Math.cos(t * 0.1) * 7
        const y = Math.sin(t * 0.13) * 6
        const s = 1.05 + Math.cos(t * 0.08) * 0.08
        layer2Ref.current.style.transform = `translate(${x}%, ${y}%) scale(${s})`
      }

      if (layer3Ref.current) {
        const x = Math.sin(t * 0.08 + 1) * 8
        const y = Math.cos(t * 0.11 + 0.5) * 5
        const s = 1 + Math.sin(t * 0.07 + 2) * 0.07
        layer3Ref.current.style.transform = `translate(${x}%, ${y}%) scale(${s})`
      }

      if (layer4Ref.current) {
        const x = Math.cos(t * 0.12 + 2) * 6
        const y = Math.sin(t * 0.09 + 1) * 7
        const s = 1 + Math.cos(t * 0.1 + 1.5) * 0.05
        const o = 0.7 + Math.sin(t * 0.15) * 0.3
        layer4Ref.current.style.transform = `translate(${x}%, ${y}%) scale(${s})`
        layer4Ref.current.style.opacity = `${o}`
      }

      frameId = requestAnimationFrame(animate)
    }

    frameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameId)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#c8b8a8]">
      {/* Base background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
        style={{ backgroundImage: "url('/images/aurora-bg.jpg')" }}
      />

      {/* Layer 1: Warm rose blob */}
      <div
        ref={layer1Ref}
        className="absolute will-change-transform"
        style={{
          width: "120vw",
          height: "120vh",
          left: "-10vw",
          top: "-10vh",
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(220,160,170,0.55) 0%, rgba(200,140,160,0.2) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Layer 2: Periwinkle / lavender blob */}
      <div
        ref={layer2Ref}
        className="absolute will-change-transform"
        style={{
          width: "110vw",
          height: "110vh",
          left: "0vw",
          top: "-5vh",
          background:
            "radial-gradient(ellipse 55% 55% at 50% 50%, rgba(140,150,220,0.5) 0%, rgba(120,130,200,0.15) 45%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Layer 3: Golden amber sweep */}
      <div
        ref={layer3Ref}
        className="absolute will-change-transform"
        style={{
          width: "130vw",
          height: "100vh",
          left: "-15vw",
          top: "5vh",
          background:
            "radial-gradient(ellipse 70% 40% at 50% 50%, rgba(220,195,140,0.5) 0%, rgba(200,180,130,0.15) 45%, transparent 65%)",
          filter: "blur(55px)",
        }}
      />

      {/* Layer 4: Coral pink floating accent */}
      <div
        ref={layer4Ref}
        className="absolute will-change-transform"
        style={{
          width: "80vw",
          height: "80vh",
          left: "10vw",
          top: "0vh",
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(230,170,150,0.45) 0%, rgba(210,150,130,0.1) 50%, transparent 70%)",
          filter: "blur(45px)",
        }}
      />
    </div>
  )
}
