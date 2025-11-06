'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import RadialBackground from './RadialBackground'
import TextScramble from './TextScramble'

export default function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [currentGradient, setCurrentGradient] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)
  const menuRef = useRef<HTMLDivElement>(null)

  const gradients = [
    { color1: '#3060eb', color2: '#8f35ea', angle: 301 },
    { color1: '#8f35ea', color2: '#E1A0FF', angle: 135 },
    { color1: '#E1A0FF', color2: '#4BD760', angle: 45 },
    { color1: '#4BD760', color2: '#3060eb', angle: 225 },
  ]

  const carouselItems = [
    { text: 'AI-Powered Development', color: '#3060eb' },
    { text: 'Creative Technology', color: '#8f35ea' },
    { text: 'Interactive Experiences', color: '#E1A0FF' },
    { text: 'LLM-Driven Solutions', color: '#4BD760' },
  ]

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
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
        className="relative overflow-hidden" 
        style={{ 
          height: '100dvh', // Use dynamic viewport height for mobile
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

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col justify-between p-4 sm:p-6 md:p-8" style={{ height: '100%', minHeight: '100dvh' }}>
          {/* Top Section */}
          <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 pt-5 sm:pt-0">
            {/* Logo and Menu Row */}
            <div className="flex items-start sm:items-center justify-between gap-4 sm:gap-8 md:gap-24 flex-wrap">
              {/* Brand Logo */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="flex-shrink-0 max-w-full sm:max-w-[477px]"
              >
                <div className="h-auto sm:h-[120px] md:h-[164px] flex items-start sm:items-center">
                  <div className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white boldonse-regular">
                    Anvibe
                  </div>
                </div>
              </motion.div>

              {/* Menu Button */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                className="flex-shrink-0 relative"
                ref={menuRef}
              >
                <motion.button 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex flex-col gap-[9px] h-10 items-end justify-center w-12 sm:w-16 relative z-50"
                  style={{ paddingTop: isMobile ? '0' : '12px' }}
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
                            { href: '/vibecoding', label: 'Vibecoding' },
                            { href: '/blog', label: 'Blog' },
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

            {/* Social Links */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
              className="flex items-center gap-3 sm:gap-5"
            >
              <a href="https://www.instagram.com/anvibe.xyz/" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-white hover:text-white/80 transition-colors">IG</a>
              <span className="text-white">/</span>
              <a href="https://www.youtube.com/@Anvibe25" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-white hover:text-white/80 transition-colors">YT</a>
              <span className="text-white">/</span>
              <a href="https://x.com/anvibe25" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-white hover:text-white/80 transition-colors">X</a>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-start sm:items-end justify-between relative gap-4 sm:gap-0"
          >
            {/* Tagline Text Container */}
            <div className="flex flex-col gap-4 sm:gap-6 w-full sm:max-w-[70%]">
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
                      className="text-lg sm:text-base md:text-lg font-semibold"
                      style={{ color: carouselItems[currentSlide].color }}
                    >
                      {carouselItems[currentSlide].text}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Tagline Text */}
              <p className="text-xl sm:text-lg md:text-xl lg:text-2xl font-bold text-white leading-tight tracking-tight" style={{ paddingTop: '0', lineHeight: isMobile ? '1.4' : '0.8' }}>
                {isMobile ? (
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
            </div>

            {/* Let&apos;s Talk Button */}
            <a 
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                const contactSection = document.getElementById('contact')
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="w-full sm:w-auto bg-white/75 backdrop-blur-sm px-4 py-4 sm:px-5 sm:py-5 rounded-tl-2xl rounded-br-2xl sm:rounded-tl-3xl sm:rounded-br-3xl flex items-center justify-center sm:justify-start gap-3 sm:gap-4 hover:bg-white/90 transition-colors group" 
              style={{ color: '#000000' }}
            >
              <span className="text-base sm:text-lg font-normal tracking-tight" style={{ color: '#000000' }}>Let&apos;s Talk</span>
              <ArrowRight size={18} className="sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" style={{ color: '#000000' }} />
            </a>
          </motion.div>
        </div>
      </section>
    </>
  )
}
