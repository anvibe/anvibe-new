import Hero from '@/components/Hero'
import PartnerLogos from '@/components/PartnerLogos'
import WeDesignSection from '@/components/WeDesignSection'
import Projects from '@/components/Projects'
import Solutions from '@/components/Solutions'
import StorySection from '@/components/StorySection'
import Testimonials from '@/components/Testimonials'
// import Stats from '@/components/Stats'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
import Blog from '@/components/Blog'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ClientWrapper from '@/components/ClientWrapper'

export default async function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ClientWrapper>
        <PartnerLogos />
        <WeDesignSection />
        <Projects />
        <StorySection />
        <Solutions />
        <Testimonials />
        {/* <Stats /> */}
        <Pricing />
        <FAQ />
        <Blog />
        <Contact />
        <Footer />
      </ClientWrapper>
    </main>
  )
}

