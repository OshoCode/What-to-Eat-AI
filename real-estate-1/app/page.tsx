import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import FeaturedProperties from "@/components/featured-properties"
import WhyChooseUs from "@/components/why-choose-us"
import Testimonials from "@/components/testimonials"
import OurServices from "@/components/our-services"
import CtaSection from "@/components/cta-section"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="min-h-screen bg-white dark:bg-zinc-950">
        <Header />
        <main>
          <HeroSection />
          <FeaturedProperties />
          <WhyChooseUs />
          <Testimonials />
          <OurServices />
          <CtaSection />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

