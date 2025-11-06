'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import RadialBackground from './RadialBackground'

export default function Hero() {
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
    <>
      <section className="relative h-screen overflow-hidden">
        {/* Radial Background Canvas */}
        <RadialBackground />

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col justify-between h-screen p-8">
          {/* Top Section */}
          <div className="flex flex-col gap-8">
            {/* Logo and Menu Row */}
            <div className="flex items-start justify-between gap-8 md:gap-24 flex-wrap">
              {/* Brand Logo */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="flex-shrink-0 max-w-[477px]"
              >
                <div className="h-[164px] flex items-center">
                  <div className="text-6xl md:text-8xl font-bold text-white boldonse-regular">
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
                  className="flex flex-col gap-[9px] h-10 items-end justify-center w-16 relative z-50"
                  style={{ paddingTop: '20px' }}
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? (
                    <X size={24} className="text-white" />
                  ) : (
                    <>
                      <div className="bg-white h-[2px] rounded-full w-16"></div>
                      <div className="bg-white h-[2px] rounded-full w-[34px]"></div>
                    </>
                  )}
                </motion.button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute top-full right-0 mt-4 bg-black/95 backdrop-blur-md border border-white/10 shadow-lg overflow-hidden rounded-lg min-w-[200px]"
                    >
                      <div className="px-6 py-8">
                        <div className="flex flex-col gap-6">
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
                                className="text-xl font-medium text-white hover:text-white/80 transition-colors"
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
                              className="text-xl font-medium text-white hover:text-white/80 transition-colors"
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
              className="flex items-center gap-5"
            >
              <a href="#" className="text-sm text-white hover:text-white/80 transition-colors">IG</a>
              <span className="text-white">/</span>
              <a href="#" className="text-sm text-white hover:text-white/80 transition-colors">BE</a>
              <span className="text-white">/</span>
              <a href="#" className="text-sm text-white hover:text-white/80 transition-colors">DR</a>
              <span className="text-white">/</span>
              <a href="#" className="text-sm text-white hover:text-white/80 transition-colors">X</a>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
            className="flex items-end justify-between relative"
          >
            {/* Tagline Text */}
            <p className="text-xl md:text-2xl font-bold text-white leading-tight tracking-tight" style={{ paddingTop: '15px' }}>
              We are VibeCoders, crafting interactive experiences<br />
              with next-gen AI tools and LLM-driven engines.<br />
              Our work bridges design, intelligence, and emotion.
            </p>

            {/* Let&apos;s Talk Button */}
            <button className="absolute bottom-0 right-0 bg-white/75 backdrop-blur-sm px-5 py-5 rounded-tl-3xl rounded-br-3xl flex items-center gap-4 hover:bg-white/90 transition-colors group">
              <span className="text-lg font-normal text-[#1e1e1e] tracking-tight">Let&apos;s Talk</span>
              <ArrowRight size={20} className="text-[#1e1e1e] group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>
    </>
  )
}
