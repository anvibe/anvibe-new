'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Footer from '@/components/Footer'
import Contact from '@/components/Contact'
import ScrollAnimation from '@/components/ScrollAnimation'
import RadialBackground from '@/components/RadialBackground'
import NoiseBackground from '@/components/NoiseBackground'

export default function AboutPage() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const [currentGradient, setCurrentGradient] = useState(0)

  // Different color combinations for team member animations - purple theme from hero
  const teamGradients = [
    { color1: '#4C1D95', color2: '#6B21A8', angle: 301 },
    { color1: '#581C87', color2: '#7C3AED', angle: 135 },
    { color1: '#6B21A8', color2: '#9333EA', angle: 45 },
    { color1: '#5B21B6', color2: '#7C3AED', angle: 225 },
    { color1: '#4C1D95', color2: '#6B21A8', angle: 301 },
    { color1: '#581C87', color2: '#7C3AED', angle: 135 },
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setCurrentGradient((prev) => (prev + 1) % teamGradients.length)
      }, 5000)
    }, 5000)

    return () => {
      clearTimeout(timeout)
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [teamGradients.length])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <main className="min-h-screen relative" style={{ background: '#040403' }}>
      {/* Noise Background Animation */}
      <NoiseBackground />
      
      {/* Navigation */}
      <nav ref={menuRef} className="fixed top-0 left-0 right-0 z-[9999] py-3 sm:py-4 px-4 sm:px-6 md:px-8" style={{ background: 'transparent' }}>
        <div className="max-w-full mx-auto">
          <div className="flex items-center justify-between h-10 sm:h-12">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Link href="/" className="font-bold boldonse-regular text-white" style={{ fontSize: '2rem' }}>Anvibe</Link>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="relative"
            >
              <motion.button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex flex-col gap-[9px] h-10 items-end justify-center w-12 sm:w-16 relative z-50"
                aria-label="Toggle menu"
              >
                <div className="relative w-12 sm:w-16 h-[18px] flex items-center justify-end">
                  {/* Top bar */}
                  <motion.div
                    className="bg-white h-[2px] rounded-full absolute right-0"
                    initial={{ width: 48, y: 0, rotate: 0 }}
                    animate={isMenuOpen ? { width: 20, y: 8, rotate: 45 } : { width: 48, y: 0, rotate: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                  {/* Bottom bar */}
                  <motion.div
                    className="bg-white h-[2px] rounded-full absolute right-0"
                    initial={{ width: 28, y: 9, rotate: 0 }}
                    animate={isMenuOpen ? { width: 20, y: 8, rotate: -45 } : { width: 28, y: 9, rotate: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </motion.button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute top-full right-0 mt-4 bg-black/95 backdrop-blur-md border border-white/10 shadow-lg overflow-hidden rounded-lg min-w-[180px] sm:min-w-[200px] z-[9999]"
                    >
                      <div className="px-4 sm:px-6 py-6 sm:py-8">
                        <div className="flex flex-col gap-4 sm:gap-6">
                          {[
                            { href: '/', label: 'Home 🏠' },
                            { href: '/#projects', label: 'Works (8) 💼' },
                            { href: '/about', label: 'About 👥' },
                            { href: '/vibecoding', label: 'Vibecoding 🚀' },
                            { href: '/blog', label: 'Blog 📝' },
                            { href: '#contact', label: 'Contact 💬' },
                          ].map((item, index) => {
                            const isActive = item.href === '/' 
                              ? pathname === '/' 
                              : pathname.startsWith(item.href.replace('#', ''))
                            return (
                              <motion.div
                                key={item.href}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.3 }}
                              >
                                <Link 
                                  href={item.href}
                                  onClick={() => {
                                    setIsMenuOpen(false)
                                    if (item.href === '#contact') {
                                      setTimeout(() => {
                                        const contactSection = document.getElementById('contact')
                                        if (contactSection) {
                                          contactSection.scrollIntoView({ behavior: 'smooth' })
                                        }
                                      }, 100)
                                    }
                                  }}
                                  className={`text-lg sm:text-xl text-white hover:text-white/80 transition-colors ${isActive ? 'font-bold' : 'font-medium'}`}
                                >
                                  {item.label}
                                </Link>
                              </motion.div>
                            )
                          })}
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.3 }}
                            className="pt-4 border-t border-white/10"
                          >
                            <a 
                              href="mailto:hello@anvibe.io" 
                              className="text-lg sm:text-xl font-medium text-white hover:text-white/80 transition-colors"
                            >
                              hello@anvibe.io
                            </a>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </nav>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 md:pt-[144px] pb-6 sm:pb-8 px-4 sm:px-6 md:px-8 lg:px-[200px] relative" style={{ background: 'transparent', zIndex: 1 }}>
        <div className="max-w-7xl mx-auto">
          <div className="max-w-[1520px] mx-auto">
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="flex flex-col gap-4 sm:gap-6 items-center mb-6 sm:mb-8 md:mb-10"
            >
              {/* About Badge */}
              <div className="box-border flex h-[40px] sm:h-[49px] items-center justify-center px-4 sm:px-[17px] py-0 rounded-2xl sm:rounded-3xl" style={{ backgroundColor: '#000000', color: '#EEF4ED' }}>
                <span className="text-sm sm:text-base">About</span>
              </div>

              {/* Heading */}
              <div className="flex flex-col items-center text-center max-w-full gap-4 sm:gap-6 md:gap-8 px-4" style={{ gap: '0.3rem' }}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold tracking-[-0.5px] sm:tracking-[-1.8px] leading-tight sm:!leading-[56px]" style={{ color: '#EEF4ED' }}>
                  We&apos;re pioneers of AI 🚀
                </h1>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold tracking-[-0.5px] sm:tracking-[-1.8px] leading-tight sm:!leading-[56px]" style={{ color: '#EEF4ED' }}>
                  building interactive ✨{' '}
                  <span style={{ color: '#EEF4ED', opacity: 0.7 }}>experiences</span>
                </h2>
                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold tracking-[-0.5px] sm:tracking-[-1.8px] leading-tight sm:!leading-[56px]" style={{ color: '#EEF4ED', opacity: 0.7 }}>
                  that enhance the human experience 👥.
                </h3>
              </div>
            </motion.div>

            {/* Hero Image with Stats */}
            <ScrollAnimation direction="up" delay={0.2}>
              <div className="bg-black rounded-xl sm:rounded-2xl p-1.5 sm:p-2 mb-8 sm:mb-12 md:mb-16">
                <div className="rounded-lg sm:rounded-xl overflow-hidden relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[650px]" style={{ background: '#000000' }}>
                  <Image
                    src="/images/projects/akanano/anvibe-team.png"
                    alt="Anvibe team"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 1520px"
                  />
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Creative Excellence Section */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-[200px] pb-12 sm:pb-16 md:pb-24 lg:pb-32 pt-12 sm:pt-16 relative" style={{ background: 'transparent', zIndex: 1 }}>
        <div className="max-w-7xl mx-auto">
          <div className="max-w-[1520px] mx-auto">
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-2 items-start justify-center">
              {/* Text Card */}
              <ScrollAnimation direction="left" delay={0.1}>
                <div className="rounded-xl p-6 sm:p-8 flex flex-col justify-between w-full lg:w-[748px]">
                  <div className="mb-6 sm:mb-8">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[45px] font-bold leading-tight sm:leading-[48px] md:leading-[64px] tracking-[-0.5px] sm:tracking-[-1.44px] mb-4 sm:mb-6" style={{ color: '#EEF4ED' }}>
                      We build with AI 🤖<br />
                      code editors 💻.
                    </h2>
                    <p className="text-sm sm:text-[15.4px] leading-[18px] sm:leading-[20.8px] max-w-full sm:max-w-[430px]" style={{ color: '#EEF4ED', opacity: 0.8 }}>
                      At Anvibe, we craft interactive experiences ✨ powered by AI
                      code editors 🤖. We believe technology should amplify human
                      creativity 🎨, not replace it. Every line of code we write
                      is designed to enhance how people create, collaborate 👥, and connect 🌐.
                    </p>
                  </div>
                </div>
              </ScrollAnimation>

              {/* Image */}
              <ScrollAnimation direction="right" delay={0.2}>
                <div className="w-full lg:w-[748px] h-[250px] sm:h-[300px] md:h-[400px] lg:h-[548px] relative rounded-xl overflow-hidden">
                  <Image
                    src="/images/projects/akanano/anvibe-woman.png"
                    alt="Anvibe woman"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 748px"
                  />
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-[200px] pt-12 sm:pt-16 md:pt-24 lg:pt-32 pb-12 sm:pb-16 md:pb-24 lg:pb-32 relative" style={{ background: 'transparent', zIndex: 1 }}>
        <div className="max-w-7xl mx-auto">
          <div className="max-w-[1520px] mx-auto">
            {/* Header */}
            <ScrollAnimation direction="up" delay={0.1}>
              <div className="flex flex-col gap-2 sm:gap-2.5 items-center mb-6 sm:mb-8 md:mb-10 max-w-full sm:max-w-[650px] mx-auto">
                <div className="box-border flex h-[40px] sm:h-[49px] items-center justify-center px-4 sm:px-[17px] py-0 rounded-2xl sm:rounded-3xl" style={{ backgroundColor: '#000000', color: '#EEF4ED' }}>
                  <span className="text-sm sm:text-base text-center">The Team</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[57px] font-bold text-center leading-tight sm:!leading-[60px] md:!leading-[70px] tracking-[-0.5px] sm:tracking-[-1.8px]" style={{ color: '#EEF4ED' }}>
                  The superstar team ⭐,<br />
                  always ready 🚀
                </h2>
              </div>
            </ScrollAnimation>

            {/* Team Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {teamMembers.map((member, index) => {
                const gradientIndex = (index + currentGradient) % teamGradients.length
                return (
                  <ScrollAnimation key={index} direction="up" delay={0.2 + index * 0.1}>
                    <div className="relative rounded-lg sm:rounded-xl p-1.5 sm:p-2 flex flex-col sm:flex-row gap-3 sm:gap-4 overflow-hidden">
                      {/* Radial Background Animation */}
                      <div className="absolute inset-0 rounded-lg sm:rounded-xl overflow-hidden" style={{ zIndex: 0 }}>
                        <RadialBackground gradient={teamGradients[gradientIndex]} zIndex={0} />
                      </div>
                      {/* Content */}
                      <div className="relative z-10 w-full sm:w-[150px] md:w-[200px] lg:w-[250px] h-[200px] sm:h-[150px] md:h-[200px] lg:h-[250px] rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 150px, (max-width: 1024px) 200px, 250px"
                        />
                      </div>
                      <div className="relative z-10 flex flex-col justify-between flex-1 py-2 sm:py-4">
                        <div>
                          <h3 className="text-base sm:text-[17.7px] leading-[22px] sm:leading-[23.5px] tracking-[-0.1px] sm:tracking-[-0.181px] mb-1" style={{ color: '#EEF4ED', fontFamily: 'Inter, sans-serif' }}>
                            {member.name}
                          </h3>
                        </div>
                        <div>
                          <p className="text-xs sm:text-[13.7px] leading-[16px] sm:leading-[19.71px]" style={{ color: '#EEF4ED', opacity: 0.9 }}>
                            {member.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </ScrollAnimation>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-[200px] pt-12 sm:pt-16 md:pt-24 lg:pt-32 pb-12 sm:pb-16 relative" style={{ background: 'transparent', zIndex: 1 }}>
        <div className="max-w-7xl mx-auto">
          <div className="max-w-[1520px] mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 md:gap-16 items-start justify-center">
              {/* Header */}
              <ScrollAnimation direction="left" delay={0.1}>
                <div className="flex flex-col gap-2 sm:gap-2.5 items-start max-w-full sm:max-w-[300px] px-4 sm:px-0">
                  <div className="box-border flex h-[40px] sm:h-[49px] items-center justify-center px-4 sm:px-[17px] py-0 rounded-2xl sm:rounded-3xl" style={{ backgroundColor: '#000000', color: '#EEF4ED' }}>
                    <span className="text-sm sm:text-base">Roadmap</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-[44.6px] font-bold leading-tight sm:leading-[48px] md:leading-[60px] tracking-[-0.5px] sm:tracking-[-1.44px]" style={{ color: '#EEF4ED' }}>
                    What&apos;s<br className="hidden sm:block" />
                    <span className="sm:hidden"> </span>coming next 🔮
                  </h2>
                </div>
              </ScrollAnimation>

              {/* Roadmap List */}
              <div className="flex flex-col w-full lg:w-[1156px]">
                {roadmap.map((item, index) => (
                  <ScrollAnimation key={index} direction="right" delay={0.15 + index * 0.05}>
                    <div className="border-b flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 sm:py-5 gap-2 sm:gap-4" style={{ borderColor: 'rgba(238, 244, 237, 0.2)' }}>
                      <h3 className="text-lg sm:text-xl md:text-[23.1px] font-bold leading-[24px] sm:leading-[28.8px] tracking-[-0.1px] sm:tracking-[-0.24px]" style={{ color: '#EEF4ED' }}>
                        {item.name}
                      </h3>
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 md:gap-10 items-start sm:items-center">
                        <span className="text-xs sm:text-sm md:text-[13.5px] leading-[16px] sm:leading-[19.71px]" style={{ color: '#EEF4ED', opacity: 0.9 }}>
                          {item.status}
                        </span>
                        <span className="text-xs sm:text-sm md:text-[14.1px] leading-[16px] sm:leading-[19.71px]" style={{ color: '#EEF4ED', opacity: 0.7 }}>
                          {item.releaseDate}
                        </span>
                      </div>
                    </div>
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <Contact />

      {/* Footer */}
      <Footer />
    </main>
  )
}

const teamMembers = [
  {
    name: 'Fausto Melchiorre',
    role: 'Founder-CEO 👔',
    image: '/images/projects/akanano/1.png',
  },
  {
    name: 'Emma Thompson',
    role: 'Founder-CEO 👔',
    image: '/images/projects/akanano/2.png',
  },
  {
    name: 'Sophia Chen',
    role: 'Senior UX/UI Designer 🎨',
    image: '/images/projects/akanano/3.png',
  },
  {
    name: 'Lucas Rodriguez',
    role: 'SEO-ASO Expert 📈',
    image: '/images/projects/akanano/4.png',
  },
  {
    name: 'Olivia Martinez',
    role: 'Marketing Expert 📢',
    image: '/images/projects/akanano/5.png',
  },
  {
    name: 'Noah Anderson',
    role: 'Creative Technologist 💻',
    image: '/images/projects/akanano/6.png',
  },
]

const roadmap = [
  { name: 'VibeCoding Pro', status: 'In Development', releaseDate: 'Q2 2025' },
  { name: 'AI Design Assistant', status: 'Beta Testing', releaseDate: 'Q1 2025' },
  { name: 'Collaboration Platform', status: 'In Development', releaseDate: 'Q3 2025' },
  { name: 'Mobile App Suite', status: 'Planning', releaseDate: 'Q4 2025' },
  { name: 'API Integration Tools', status: 'In Development', releaseDate: 'Q2 2025' },
  { name: 'Real-time Analytics Dashboard', status: 'Beta Testing', releaseDate: 'Q1 2025' },
  { name: 'Advanced AI Models', status: 'Research', releaseDate: 'Q3 2025' },
  { name: 'Enterprise Solutions', status: 'Planning', releaseDate: 'Q4 2025' },
  { name: 'Developer Tools Package', status: 'In Development', releaseDate: 'Q2 2025' },
  { name: 'Community Platform', status: 'Planning', releaseDate: 'Q1 2026' },
]
