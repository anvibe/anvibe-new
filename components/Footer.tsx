'use client'

import { ArrowRight } from 'lucide-react'
import RadialBackgroundInverted from './RadialBackgroundInverted'

export default function Footer() {
  return (
    <footer className="relative py-12 sm:py-16 md:py-24 overflow-hidden" style={{ background: '#0a0a09' }}>
      {/* Inverted Radial Background Canvas */}
      <RadialBackgroundInverted />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between p-4 sm:p-6 md:p-8 min-h-0">
        {/* Brand Logo */}
        <div className="max-w-full sm:max-w-[504px] mb-8 sm:mb-12 md:mb-16">
          <div className="h-auto sm:h-[120px] md:h-[173px] flex items-center">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white boldonse-regular">
              Anvibe
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between relative gap-8 sm:gap-0">
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

          {/* Let's Talk Button */}
          <button className="w-full sm:w-auto bg-white/75 backdrop-blur-sm px-4 py-4 sm:px-5 sm:py-5 rounded-tl-2xl rounded-br-2xl sm:rounded-tl-3xl sm:rounded-br-3xl flex items-center justify-center sm:justify-start gap-3 sm:gap-4 hover:bg-white/90 transition-colors group mt-6 sm:mt-0" style={{ color: '#000000' }}>
            <span className="text-base sm:text-lg font-normal tracking-tight" style={{ color: '#000000' }}>Let&apos;s Talk</span>
            <ArrowRight size={18} className="sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" style={{ color: '#000000' }} />
          </button>
        </div>
      </div>
    </footer>
  )
}

