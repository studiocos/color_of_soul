export function HeroContent() {
  return (
    <section
      id="about"
      className="scroll-mt-8 relative min-h-screen px-8 pt-20 pb-16 sm:px-12 md:px-16 lg:px-20"
    >
      <h1 className="mb-10 font-serif text-3xl italic text-card-foreground md:text-4xl lg:text-5xl">
        &ldquo;Find your color of soul&rdquo;
      </h1>

      <div
        className="mb-12 flex flex-col gap-2 text-sm leading-relaxed text-card-foreground/90 md:text-sm lg:text-base"
        suppressHydrationWarning
      >
        <p suppressHydrationWarning>
          우리는 모두 고유한 파장(Wavelength)을 가지고 태어납니다.
        </p>
        <p suppressHydrationWarning>단지 세상의 소음에 묻혀 희미해졌을 뿐입니다.</p>
        <p suppressHydrationWarning>
          Color of Soul은 보이지 않는 운명의 데이터를 보이는 빛의 언어로 번역합니다.
        </p>
        <p suppressHydrationWarning>
          명리학을 통해 당신에게 결핍된 에너지를 분석하고, 물리학적 스펙트럼 이론을 통해
        </p>
        <p suppressHydrationWarning>그 공백을 채우는 가장 완벽한 색을 설계합니다.</p>
        <p suppressHydrationWarning>
          이곳에서의 시간은 단순한 기록이 아닙니다. 어둠 속에 잠들어 있던 당신의 본질,
        </p>
        <p suppressHydrationWarning>
          그 고유한 영혼의 색을 깨우는(Awakening) 여정입니다.
        </p>
      </div>

      <div className="flex flex-col items-end gap-1 text-right text-xs leading-relaxed text-card-foreground/75 md:text-sm lg:text-sm">
        <p>We are all born with a unique wavelength.</p>
        <p>It has merely faded, obscured by the noise of the world.</p>
        <p>
          Color of Soul translates the invisible data of destiny into the visible
          language of light.
        </p>
        <p>
          We analyze your energy deficiencies through Mingliology and apply
          physics-based
        </p>
        <p>spectrum theory to design the perfect color that fills that void.</p>
        <p>
          The time spent here is not merely a record. It is a journey of
          Awakening&mdash;rousing
        </p>
        <p>your true essence from the darkness and revealing the unique color of your soul.</p>
      </div>
    </section>
  );
}
