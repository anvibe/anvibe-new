import Hero from '@/components/Hero'
import PartnerLogos from '@/components/PartnerLogos'
import Projects from '@/components/Projects'
import Solutions from '@/components/Solutions'
import Testimonials from '@/components/Testimonials'
// import Stats from '@/components/Stats'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
import Blog from '@/components/Blog'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default async function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <PartnerLogos />
      <Projects />
      <Solutions />
      <Testimonials />
      {/* <Stats /> */}
      <Pricing />
      <FAQ />
      <Blog />
      <Contact />
      <Footer />
    </main>
  )
}

