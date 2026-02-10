import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { ValueProps } from "@/components/landing/value-props"
import { HowItWorks } from "@/components/landing/how-it-works"
import { CTASection } from "@/components/landing/cta-section"
import { Footer } from "@/components/landing/footer"

export default function Page() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <ValueProps />
      <HowItWorks />
      <CTASection />
      <Footer />
    </main>
  )
}
