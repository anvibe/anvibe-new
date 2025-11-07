'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import RadialBackground from './RadialBackground'
import TextScramble from './TextScramble'

export default function Hero() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [currentGradient, setCurrentGradient] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)
  const menuRef = useRef<HTMLDivElement>(null)

  const gradients = [
    { color1: '#4C1D95', color2: '#6B21A8', angle: 301 },
    { color1: '#581C87', color2: '#7C3AED', angle: 135 },
    { color1: '#6B21A8', color2: '#9333EA', angle: 45 },
    { color1: '#5B21B6', color2: '#7C3AED', angle: 225 },
  ]

  const carouselItems = [
    { text: 'AI-Powered Development', color: '#3060eb' },
    { text: 'Creative Technology', color: '#8f35ea' },
    { text: 'Interactive Experiences', color: '#E1A0FF' },
    { text: 'LLM-Driven Solutions', color: '#4BD760' },
  ]

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 640)
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024)
    }
    checkDevice()
    window.addEventListener('resize', checkDevice)
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

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

  useEffect(() => {
    // Start carousel after initial animation (wait 5 seconds)
    let interval: NodeJS.Timeout | null = null
    
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setCurrentGradient((prev) => (prev + 1) % gradients.length)
      }, 5000) // Change gradient every 5 seconds
    }, 5000)

    return () => {
      clearTimeout(timeout)
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [gradients.length])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [carouselItems.length])

  return (
    <>
      <section 
        className="relative overflow-hidden h-screen" 
        style={{ 
          minHeight: '100dvh',
          position: 'relative',
          zIndex: 100,
          background: '#040403',
          width: '100%',
          display: 'block'
        }}
      >
        {/* Radial Background Canvas */}
        <RadialBackground gradient={gradients[currentGradient]} />

        {/* Overlay on JavaScript animation */}
        <div className="absolute inset-0 w-full h-full bg-black/20 pointer-events-none" style={{ zIndex: 0 }} />

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col p-4 sm:p-6 md:p-8 h-full">
          {/* Top Section - Logo and Menu */}
          <div className="flex items-start justify-between gap-4 sm:gap-8 md:gap-24 flex-wrap relative z-[9999]" style={{ paddingTop: '20px' }}>
            {/* Brand Logo */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="flex-shrink-0 max-w-full sm:max-w-[477px]"
            >
              <div className="h-auto sm:h-[120px] md:h-[120px] lg:h-[164px] flex items-start">
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-[8rem] font-bold text-white boldonse-regular">
                  Anvibe
                </div>
              </div>
            </motion.div>

            {/* Menu Button */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="flex-shrink-0 relative flex items-start z-[9999]"
              ref={menuRef}
            >
                <motion.button 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex flex-col gap-[9px] h-10 items-end justify-start w-12 sm:w-16 relative z-[9999]"
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
                            { href: '/', label: 'Home' },
                            { href: '/#we-design', label: 'Projects' },
                            { href: '/about', label: 'About' },
                            { href: '/vibecoding', label: 'Vibecoding' },
                            { href: '/blog', label: 'Blog' },
                            { href: '/#contact', label: 'Contact' },
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
                                  onClick={(e) => {
                                    if (item.href.startsWith('/#')) {
                                      e.preventDefault()
                                      setIsMenuOpen(false)
                                      const sectionId = item.href.replace('/#', '')
                                      // Small delay to ensure menu closes first
                                      setTimeout(() => {
                                        const section = document.getElementById(sectionId)
                                        if (section) {
                                          section.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                        }
                                      }, 100)
                                    } else {
                                      setIsMenuOpen(false)
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

          {/* Centered Content Section - Social, Animated Text, and Scrambled Text */}
          <div className="flex-1 flex items-center relative z-0">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col gap-4 sm:gap-6 w-full sm:max-w-[70%]"
            >
              {/* Social Links */}
              <div className="flex items-center gap-3 sm:gap-5">
                <a href="https://www.instagram.com/anvibe.xyz/" target="_blank" rel="noopener noreferrer" className="text-2xl sm:text-xl text-white hover:text-white/80 transition-colors">IG</a>
                <span className="text-white">/</span>
                <a href="https://www.youtube.com/@Anvibe25" target="_blank" rel="noopener noreferrer" className="text-2xl sm:text-xl text-white hover:text-white/80 transition-colors">YT</a>
                <span className="text-white">/</span>
                <a href="https://x.com/anvibe25" target="_blank" rel="noopener noreferrer" className="text-2xl sm:text-xl text-white hover:text-white/80 transition-colors">X</a>
              </div>

              {/* Text Carousel - Above Scramble */}
              <div className="relative h-12 sm:h-14 md:h-16 flex items-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-3"
                  >
                    <div 
                      className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full"
                      style={{ backgroundColor: carouselItems[currentSlide].color }}
                    />
                    <span 
                      className="text-2xl sm:text-xl md:text-2xl font-semibold"
                      style={{ color: carouselItems[currentSlide].color }}
                    >
                      {carouselItems[currentSlide].text}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Tagline Text */}
              <p className="text-xl sm:text-lg md:text-xl lg:text-2xl font-bold text-white leading-tight tracking-tight" style={{ paddingTop: '0', lineHeight: isMobile || isTablet ? '1.4' : '0.8' }}>
                {isMobile || isTablet ? (
                  <span style={{ display: 'block', wordBreak: 'normal', overflowWrap: 'break-word', hyphens: 'auto' }}>
                    We are VibeCoders, crafting interactive experiences with next-gen AI tools and LLM-driven engines. Our work bridges design, intelligence, and emotion.
                  </span>
                ) : (
                  <TextScramble 
                    texts={[
                      "We are VibeCoders, crafting interactive experiences<br/>with next-gen AI tools and LLM-driven engines.<br/>Our work bridges design, intelligence, and emotion.",
                      "Building the future of digital experiences<br/>through innovative AI solutions and creative technology.<br/>Where innovation meets imagination."
                    ]}
                    speed={10}
                    delay={1000}
                    holdDuration={4000}
                    lineGap="0"
                    className="inline"
                  />
                )}
              </p>
            </motion.div>
          </div>

          {/* Let&apos;s Start Button - At bottom right with padding */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
            className="mt-auto pb-4 sm:pb-6 md:pb-8 flex justify-end"
          >
            <a 
              href="#we-design"
              onClick={(e) => {
                e.preventDefault()
                const weDesignSection = document.getElementById('we-design')
                if (weDesignSection) {
                  weDesignSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }}
              className="inline-flex items-center gap-3 sm:gap-4 bg-white/75 backdrop-blur-sm px-4 py-4 sm:px-5 sm:py-5 rounded-tl-2xl rounded-br-2xl sm:rounded-tl-3xl sm:rounded-br-3xl hover:bg-white/90 transition-colors group" 
              style={{ color: '#000000' }}
            >
              <span className="text-base sm:text-lg font-normal tracking-tight" style={{ color: '#000000' }}>Let&apos;s start</span>
              <ArrowRight size={18} className="sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" style={{ color: '#000000' }} />
            </a>
          </motion.div>
        </div>
      </section>
    </>
  )
}
