"use client"

import { AnimatePresence, motion, type Variants } from "framer-motion"

/** 인트로 퇴장 길이 — mockup-home 레일 패딩 타이밍과 동기화하려면 이 값만 사용 */
export const INTRO_EXIT_DURATION_SEC = 3.6

/** Scene A: 등장은 blur·y, 퇴장은 opacity 만 — filter/transform 퇴장 애니메이션은 합성 전환으로 점프가 나기 쉬움 */
const introVariants: Variants = {
  initial: {
    opacity: 0,
    filter: "blur(20px)",
    y: 15,
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
      type: "tween",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: INTRO_EXIT_DURATION_SEC,
      ease: [0.65, 0, 0.35, 1],
      type: "tween",
    },
  },
}

/** Scene B: 메인 카피 컨테이너 — Drift 시작 타이밍만 조율 */
const mainContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.8,
      staggerChildren: 0.14,
    },
  },
}

/** Scene B: 깊은 블러에서 드리프트하며 선명해짐 */
const mainLineVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
    filter: "blur(25px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

/** 좌측 네비: 메인 카피 이후 시차 스태거 (mockup-home에서 사용) */
export const heroNavContainerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      delayChildren: 2.5,
      staggerChildren: 0.1,
    },
  },
}

export const heroNavItemVariants: Variants = {
  initial: { x: -15, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: "easeOut",
    },
  },
}

/** 메인 카피만: 정중앙보다 살짝 위로 */
const heroLiftClass = "-translate-y-[min(1.75rem,3.5vh)]"

/** 인트로(COLOR OF soul)만 추가로 더 위로 — 메인보다 약 0.75rem / 1.5vh 정도 더 큼 */
const introLiftClass = "-translate-y-[min(2.5rem,5vh)]"

type HeroTransitionProps = {
  introDone: boolean
  /** 인트로(scene-intro) exit가 끝난 뒤 한 번만 호출 — 레일 패딩 등 레이아웃과 동기화용 */
  onIntroSceneExitComplete?: () => void
}

export function HeroTransition({
  introDone,
  onIntroSceneExitComplete,
}: HeroTransitionProps) {
  return (
    <div className="relative z-10 flex min-h-[min(100dvh,100vh)] w-full max-w-6xl flex-1 flex-col px-6 md:px-10">
      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          if (introDone) onIntroSceneExitComplete?.()
        }}
      >
        {!introDone ? (
          <motion.div
            key="scene-intro"
            className="pointer-events-auto absolute inset-0 z-[100] flex flex-col items-center justify-center px-4 text-center"
            variants={introVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className={introLiftClass}>
              <h1 className="text-intro-color-of-soul flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 text-4xl font-normal tracking-[0.2em] sm:text-5xl md:text-6xl">
                <span className="uppercase [font-family:var(--font-geist),sans-serif]">
                  COLOR OF
                </span>
                <span className="text-5xl italic sm:text-6xl md:text-7xl [font-family:var(--font-playfair),Georgia,serif]">
                  soul
                </span>
              </h1>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="scene-main"
            className={`pointer-events-auto absolute inset-0 flex flex-col items-center justify-center px-4 text-center ${heroLiftClass}`}
            variants={mainContainerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.p
              variants={mainLineVariants}
              className="text-hero-main-en max-w-[min(96vw,48rem)] whitespace-nowrap leading-[1.35] text-[clamp(1.125rem,3.2vw,2.25rem)]"
            >
              A moment to face the light within you
            </motion.p>
            <motion.p
              variants={mainLineVariants}
              className="text-hero-main-ko mt-[0.55em] max-w-[min(96vw,44rem)] whitespace-nowrap leading-[1.4] text-[clamp(1rem,2.75vw,1.875rem)]"
              suppressHydrationWarning
            >
              당신 안의 빛을 마주하는 시간
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
