'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Footer from '@/components/Footer'
import ScrollAnimation from '@/components/ScrollAnimation'

export default function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

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
    <main className="min-h-screen" style={{ background: '#040403' }}>
      {/* Navigation */}
      <nav ref={menuRef} className="fixed top-0 left-0 right-0 z-50 py-3 sm:py-4 px-4 sm:px-6 md:px-8">
        <div className="max-w-full mx-auto">
          <div className="flex items-center justify-between h-10 sm:h-12">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Link href="/" className="text-xl sm:text-2xl font-bold boldonse-regular text-white">Anvibe</Link>
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
                      className="absolute top-full right-0 mt-4 bg-black/95 backdrop-blur-md border border-white/10 shadow-lg overflow-hidden rounded-lg min-w-[180px] sm:min-w-[200px]"
                    >
                      <div className="px-4 sm:px-6 py-6 sm:py-8">
                        <div className="flex flex-col gap-4 sm:gap-6">
                          {[
                            { href: '/', label: 'Home' },
                            { href: '/#projects', label: 'Works (8)' },
                            { href: '/about', label: 'About' },
                            { href: '/#blog', label: 'Blog' },
                            { href: '/#contact', label: 'Contact' },
                          ].map((item, index) => (
                            <motion.div
                              key={item.href}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1, duration: 0.3 }}
                            >
                              <Link 
                                href={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="text-lg sm:text-xl font-medium text-white hover:text-white/80 transition-colors"
                              >
                                {item.label}
                              </Link>
                            </motion.div>
                          ))}
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
      <section className="pt-24 sm:pt-32 md:pt-[144px] pb-6 sm:pb-8 px-4 sm:px-6 md:px-8 lg:px-[200px]">
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
              <div className="bg-white box-border flex h-[40px] sm:h-[49px] items-center justify-center px-4 sm:px-[17px] py-0 rounded-br-[20px] rounded-tl-[20px] sm:rounded-br-[24px] sm:rounded-tl-[24px]">
                <span className="text-sm sm:text-base" style={{ color: '#040403' }}>About</span>
              </div>

              {/* Heading */}
              <div className="flex flex-col items-center text-center max-w-full gap-4 sm:gap-6 md:gap-8 px-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold tracking-[-0.5px] sm:tracking-[-1.8px] leading-tight sm:!leading-[56px]" style={{ color: '#EEF4ED' }}>
                  We help brands grow with design
                </h1>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold tracking-[-0.5px] sm:tracking-[-1.8px] leading-tight sm:!leading-[56px]" style={{ color: '#EEF4ED' }}>
                  that&apos;s intentional and{' '}
                  <span style={{ color: '#EEF4ED', opacity: 0.7 }}>messaging</span>
                </h2>
                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold tracking-[-0.5px] sm:tracking-[-1.8px] leading-tight sm:!leading-[56px]" style={{ color: '#EEF4ED', opacity: 0.7 }}>
                  that actually resonates.
                </h3>
              </div>
            </motion.div>

            {/* Hero Image with Stats */}
            <ScrollAnimation direction="up" delay={0.2}>
              <div className="bg-white rounded-xl sm:rounded-2xl p-1.5 sm:p-2 mb-8 sm:mb-12 md:mb-16">
                <div className="rounded-lg sm:rounded-xl overflow-hidden relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[650px]" style={{ background: '#030302' }}>
                  <Image
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop"
                    alt="About us"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 1520px"
                  />
                  
                  {/* Stats Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 flex flex-col sm:flex-row flex-nowrap">
                    {[
                      { value: '3m+', description: 'Capital raised by brands we helped out.' },
                      { value: '289', description: 'Brands launched through our creative<br />process.' },
                      { value: '56', description: 'Awards recognizing our branding<br />excellence.' },
                      { value: '%', description: 'Client satisfaction rate across all delivered<br />work.' },
                    ].map((stat, index) => (
                      <ScrollAnimation key={index} direction="up" delay={0.3 + index * 0.1}>
                        <div className="bg-white/95 backdrop-blur-sm flex flex-col justify-between items-start px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10 flex-1 min-h-[120px] sm:min-h-[150px] md:min-h-[200px]">
                          <div className="text-3xl sm:text-4xl md:text-[50px] leading-tight sm:leading-[50px]" style={{ color: '#040403' }}>{stat.value}</div>
                          <div className="text-xs sm:text-sm md:text-[15.5px] leading-[16px] sm:leading-[18px] md:leading-[20.8px]" style={{ color: '#040403', opacity: 0.8 }} dangerouslySetInnerHTML={{ __html: stat.description }} />
                        </div>
                      </ScrollAnimation>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Creative Excellence Section */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-[200px] pb-12 sm:pb-16 pt-12 sm:pt-16">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-[1520px] mx-auto">
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-2 items-start justify-center">
              {/* Text Card */}
              <ScrollAnimation direction="left" delay={0.1}>
                <div className="bg-[#eef0f6] rounded-xl p-6 sm:p-8 flex flex-col justify-between w-full lg:w-[748px]">
                  <div className="mb-6 sm:mb-8">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[45px] font-bold leading-tight sm:leading-[48px] md:leading-[64px] tracking-[-0.5px] sm:tracking-[-1.44px] mb-4 sm:mb-6" style={{ color: '#040403' }}>
                      An obsession with creative<br className="hidden sm:block" />
                      <span className="sm:hidden"> </span>excellence.
                    </h2>
                    <p className="text-sm sm:text-[15.4px] leading-[18px] sm:leading-[20.8px] max-w-full sm:max-w-[430px]" style={{ color: '#040403', opacity: 0.8 }}>
                      Over the years, Anvibe has been recognized for creative
                      excellence, standout strategy, and the kind of digital
                      experiences that leave a lasting mark.
                    </p>
                  </div>
                </div>
              </ScrollAnimation>

              {/* Image */}
              <ScrollAnimation direction="right" delay={0.2}>
                <div className="w-full lg:w-[748px] h-[250px] sm:h-[300px] md:h-[400px] lg:h-[548px] relative rounded-xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1496&h=1096&fit=crop"
                    alt="About us photo"
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
      <section className="px-4 sm:px-6 md:px-8 lg:px-[200px] pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-[1520px] mx-auto">
            {/* Header */}
            <ScrollAnimation direction="up" delay={0.1}>
              <div className="flex flex-col gap-2 sm:gap-2.5 items-center mb-6 sm:mb-8 md:mb-10 max-w-full sm:max-w-[530px] mx-auto px-4">
                <div className="bg-white box-border flex h-[40px] sm:h-[49px] items-center justify-center px-4 sm:px-[17px] py-0 rounded-br-[20px] rounded-tl-[20px] sm:rounded-br-[24px] sm:rounded-tl-[24px]">
                  <span className="text-sm sm:text-base text-center" style={{ color: '#040403' }}>The Team</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[57px] font-bold text-center leading-tight sm:!leading-[60px] md:!leading-[70px] tracking-[-0.5px] sm:tracking-[-1.8px]" style={{ color: '#EEF4ED' }}>
                  The superstar team,<br className="hidden sm:block" />
                  <span className="sm:hidden"> </span>always ready
                </h2>
              </div>
            </ScrollAnimation>

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {teamMembers.map((member, index) => (
                <ScrollAnimation key={index} direction="up" delay={0.2 + index * 0.1}>
                  <div className="bg-white rounded-lg sm:rounded-xl p-1.5 sm:p-2 flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <div className="w-full sm:w-[150px] md:w-[200px] lg:w-[250px] h-[200px] sm:h-[150px] md:h-[200px] lg:h-[250px] relative rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 150px, (max-width: 1024px) 200px, 250px"
                      />
                    </div>
                    <div className="flex flex-col justify-between flex-1 py-2 sm:py-4">
                      <div>
                        <h3 className="text-base sm:text-[17.7px] leading-[22px] sm:leading-[23.5px] tracking-[-0.1px] sm:tracking-[-0.181px] mb-1" style={{ color: '#040403', fontFamily: 'Inter, sans-serif' }}>
                          {member.name}
                        </h3>
                      </div>
                      <div>
                        <p className="text-xs sm:text-[13.7px] leading-[16px] sm:leading-[19.71px]" style={{ color: '#040403', opacity: 0.8 }}>
                          {member.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-[200px] pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-[1520px] mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 md:gap-16 items-start justify-center">
              {/* Header */}
              <ScrollAnimation direction="left" delay={0.1}>
                <div className="flex flex-col gap-2 sm:gap-2.5 items-start max-w-full sm:max-w-[300px] px-4 sm:px-0">
                  <div className="bg-white box-border flex h-[40px] sm:h-[49px] items-center justify-center px-4 sm:px-[17px] py-0 rounded-br-[20px] rounded-tl-[20px] sm:rounded-br-[24px] sm:rounded-tl-[24px]">
                    <span className="text-sm sm:text-base" style={{ color: '#040403' }}>Awards</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-[44.6px] font-bold leading-tight sm:leading-[48px] md:leading-[60px] tracking-[-0.5px] sm:tracking-[-1.44px]" style={{ color: '#EEF4ED' }}>
                    Things we&apos;re<br className="hidden sm:block" />
                    <span className="sm:hidden"> </span>proud of
                  </h2>
                </div>
              </ScrollAnimation>

              {/* Awards List */}
              <div className="flex flex-col w-full lg:w-[1156px]">
                {awards.map((award, index) => (
                  <ScrollAnimation key={index} direction="right" delay={0.15 + index * 0.05}>
                    <div className="border-b flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 sm:py-5 gap-2 sm:gap-4" style={{ borderColor: 'rgba(238, 244, 237, 0.2)' }}>
                      <h3 className="text-lg sm:text-xl md:text-[23.1px] font-bold leading-[24px] sm:leading-[28.8px] tracking-[-0.1px] sm:tracking-[-0.24px]" style={{ color: '#EEF4ED' }}>
                        {award.name}
                      </h3>
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 md:gap-10 items-start sm:items-center">
                        <span className="text-xs sm:text-sm md:text-[13.5px] leading-[16px] sm:leading-[19.71px]" style={{ color: '#EEF4ED', opacity: 0.9 }}>
                          {award.category}
                        </span>
                        <span className="text-xs sm:text-sm md:text-[14.1px] leading-[16px] sm:leading-[19.71px]" style={{ color: '#EEF4ED', opacity: 0.7 }}>
                          {award.date}
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

      {/* Footer */}
      <Footer />
    </main>
  )
}

const teamMembers = [
  {
    name: 'Bruce Lee',
    role: 'Creative Director',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop',
  },
  {
    name: 'Sarah Conor',
    role: 'Founder',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop',
  },
  {
    name: 'Sarah Silverman',
    role: 'Brand Voice Lead',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop',
  },
  {
    name: 'Carl Sagan',
    role: 'Project Manager',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop',
  },
  {
    name: 'Pakinam Ahmed',
    role: 'UFO',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=500&fit=crop',
  },
  {
    name: 'Frodo Baggins',
    role: 'NGO',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=500&fit=crop',
  },
]

const awards = [
  { name: 'Awwwards', category: 'Site of the Day', date: 'Apr 2025' },
  { name: 'CSS Design', category: 'Best UX, UI & Innovation', date: 'Mar 2025' },
  { name: 'Webby', category: 'Best Visual Design', date: 'Oct 2024' },
  { name: 'Framer', category: 'Best Portfolio Website', date: 'Aug 2024' },
  { name: 'Figma', category: 'Creator of the Year', date: 'Jul 2024' },
  { name: 'Creativepool', category: 'People\'s Choice Gold', date: 'May 2024' },
  { name: 'Communication Arts', category: 'Web Excellence', date: 'Feb 2024' },
  { name: 'Awwwards', category: 'Honorable Mention', date: 'Oct 2023' },
  { name: 'Indigo', category: 'Gold for Branding', date: 'Nov 2023' },
  { name: 'Clutch', category: 'Top Creative Agency', date: 'Sep 2023' },
]
