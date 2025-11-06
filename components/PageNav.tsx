'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function PageNav() {
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
    <nav ref={menuRef} className="fixed top-0 left-0 right-0 z-50 py-4 px-8">
      <div className="max-w-full mx-auto">
        <div className="flex items-center justify-between h-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Link href="/" className="text-2xl font-bold boldonse-regular text-white">Anvibe</Link>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <motion.button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex flex-col gap-[9px] h-10 items-end justify-center w-16 relative z-50"
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
      </div>
    </nav>
  )
}

