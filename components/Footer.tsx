'use client'

import { useState, useEffect } from 'react'
import RadialBackgroundInverted from './RadialBackgroundInverted'

export default function Footer() {
  const [currentGradient, setCurrentGradient] = useState(0)

  const gradients = [
    { color1: '#3060eb', color2: '#8f35ea', angle: 301 }, // Branding gradient (start)
    { color1: '#4BD760', color2: '#3060eb', angle: 135 }, // Green to Blue
    { color1: '#E28F2F', color2: '#FD5C5C', angle: 225 }, // Orange to Red
    { color1: '#E1A0FF', color2: '#8f35ea', angle: 45 }, // Pink to Purple
    { color1: '#3060eb', color2: '#4BD760', angle: 315 }, // Blue to Green
  ]

  useEffect(() => {
    // Start carousel after initial load (wait 3 seconds)
    let interval: NodeJS.Timeout | null = null
    
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setCurrentGradient((prev) => (prev + 1) % gradients.length)
      }, 6000) // Change gradient every 6 seconds
    }, 3000)

    return () => {
      clearTimeout(timeout)
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [gradients.length])

  return (
    <footer className="relative py-12 sm:py-16 md:py-24 overflow-hidden">
      {/* Inverted Radial Background Canvas */}
      <RadialBackgroundInverted gradient={gradients[currentGradient]} />

      {/* Additional gradient overlay */}
      <div className="absolute inset-0 opacity-30 z-[2]" style={{
        background: 'radial-gradient(ellipse at center, rgba(48, 96, 235, 0.1) 0%, transparent 70%)',
      }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between p-4 sm:p-6 md:p-8 min-h-0">
        {/* Brand Logo */}
        <div className="max-w-full sm:max-w-[504px] mb-8 sm:mb-12 md:mb-16">
          <div className="h-auto sm:h-[120px] md:h-[173px] flex items-center">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-[8rem] font-bold text-white boldonse-regular">
              Anvibe
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end relative gap-8 sm:gap-0">
          {/* Left Navigation */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 md:gap-12 items-start sm:items-end opacity-80 w-full sm:w-auto">
            {/* Navigation Links - Horizontal on mobile */}
            <div className="flex flex-row sm:flex-col gap-2 sm:gap-1 flex-nowrap sm:flex-wrap overflow-x-auto sm:overflow-x-visible">
              <a href="#projects" className="flex items-center gap-1 text-white hover:text-white/80 transition-colors text-sm sm:text-base whitespace-nowrap shrink-0">
                <span>Works</span>
                <span className="text-xs">(8)</span>
              </a>
              <a href="/about" className="text-sm sm:text-base text-white hover:text-white/80 transition-colors whitespace-nowrap shrink-0">About</a>
              <a href="#blog" className="text-sm sm:text-base text-white hover:text-white/80 transition-colors whitespace-nowrap shrink-0">Blog</a>
              <a href="#contact" className="text-sm sm:text-base text-white hover:text-white/80 transition-colors whitespace-nowrap shrink-0">Contact</a>
            </div>

            {/* Social Links - Horizontal */}
            <div className="flex flex-row sm:flex-row gap-3 sm:gap-2 items-center">
              <a href="https://www.instagram.com/anvibe.xyz/" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-white hover:text-white/80 transition-colors whitespace-nowrap">IG</a>
              <span className="text-white text-xs sm:text-sm">/</span>
              <a href="https://www.youtube.com/@Anvibe25" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-white hover:text-white/80 transition-colors whitespace-nowrap">YT</a>
              <span className="text-white text-xs sm:text-sm">/</span>
              <a href="https://x.com/anvibe25" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-white hover:text-white/80 transition-colors whitespace-nowrap">X</a>
            </div>

            {/* Copyright */}
            <div className="flex flex-col gap-1">
              <p className="text-sm sm:text-base text-white">© 2026 Anvibe®</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

