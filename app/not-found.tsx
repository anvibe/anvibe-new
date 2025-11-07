'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Footer from '@/components/Footer'
import RadialBackground from '@/components/RadialBackground'

export default function NotFound() {
  const pathname = usePathname()
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
    <main className="min-h-screen flex flex-col relative" style={{ background: '#040403', overflow: 'visible' }}>
      {/* Radial Background */}
      <RadialBackground gradient={{ color1: '#3060eb', color2: '#8f35ea', angle: 301 }} />
      
      {/* Navigation */}
      <nav ref={menuRef} className="fixed top-0 left-0 right-0 z-50 py-3 sm:py-4 px-4 sm:px-6 md:px-8">
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
                          { href: '#contact', label: 'Contact' },
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

      {/* 404 Content */}
      <div className="flex items-center justify-center px-6 sm:px-8 relative z-10 py-20 sm:py-32" style={{ minHeight: 'calc(100vh - 150px)', overflow: 'visible' }}>
        <div className="max-w-2xl mx-auto text-center" style={{ overflow: 'visible' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            style={{ overflow: 'visible' }}
          >
            <div style={{ overflow: 'visible', paddingTop: '20px', paddingBottom: '20px' }}>
              <h1 
                className="text-8xl sm:text-9xl md:text-[12rem] font-bold mb-6"
                style={{
                  background: 'linear-gradient(135deg, #3060eb 0%, #8f35ea 50%, #E1A0FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: '1.5',
                  display: 'block',
                  overflow: 'visible',
                  height: 'auto'
                }}
              >
                404
              </h1>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6" style={{ color: '#EEF4ED' }}>
              Page not found
            </h2>
            <p className="text-lg sm:text-xl mb-8 max-w-xl mx-auto" style={{ color: '#EEF4ED', opacity: 0.9 }}>
              The page you're looking for doesn't exist or has been moved.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-3 px-6 py-4 sm:px-8 sm:py-5 bg-white/75 backdrop-blur-sm rounded-tl-2xl rounded-br-2xl sm:rounded-tl-3xl sm:rounded-br-3xl font-medium hover:bg-white/90 transition-colors group"
                style={{ color: '#000000' }}
              >
                <span>Go home</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" style={{ color: '#000000' }} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-auto">
        <Footer />
      </div>
    </main>
  )
}


