import { SideNavigation } from "@/components/side-navigation"
import { HeroContent } from "@/components/hero-content"
import { AboutContent } from "@/components/about-content"
import { AuroraBackground } from "@/components/aurora-background"

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <AuroraBackground />
      <SideNavigation />
      <div className="relative ml-36 mr-4 py-10 lg:ml-44 lg:mr-6 lg:py-14 xl:ml-52 xl:mr-8 xl:py-16">
        <div className="rounded-sm bg-card/40 backdrop-blur-md">
          <HeroContent />
          <div className="mx-8 border-t border-card-foreground/10 sm:mx-12 md:mx-16 lg:mx-20" />
          <AboutContent />
        </div>
      </div>
    </main>
  )
}
