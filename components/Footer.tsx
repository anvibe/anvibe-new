'use client'

import { ArrowRight } from 'lucide-react'
import RadialBackgroundInverted from './RadialBackgroundInverted'

export default function Footer() {
  return (
    <footer className="relative min-h-[600px] sm:min-h-[700px] md:min-h-[800px] overflow-hidden" style={{ background: '#0a0a09' }}>
      {/* Inverted Radial Background Canvas */}
      <RadialBackgroundInverted />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between min-h-[600px] sm:min-h-[700px] md:min-h-[800px] p-4 sm:p-6 md:p-8">
        {/* Brand Logo */}
        <div className="max-w-full sm:max-w-[504px]">
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
            {/* Navigation Links */}
            <div className="flex flex-col gap-1">
              <a href="#projects" className="flex items-center gap-1 text-white hover:text-white/80 transition-colors text-sm sm:text-base">
                <span>Works</span>
                <span className="text-xs">(8)</span>
              </a>
              <a href="/about" className="text-sm sm:text-base text-white hover:text-white/80 transition-colors">About</a>
              <a href="#blog" className="text-sm sm:text-base text-white hover:text-white/80 transition-colors">Blog</a>
              <a href="#contact" className="text-sm sm:text-base text-white hover:text-white/80 transition-colors">Contact</a>
            </div>

            {/* Additional Links */}
            <div className="flex flex-col gap-1">
              <a href="#" className="text-sm sm:text-base text-white hover:text-white/80 transition-colors">Style Guide</a>
              <a href="#" className="text-sm sm:text-base text-white hover:text-white/80 transition-colors">Licenses</a>
              <a href="#" className="text-sm sm:text-base text-white hover:text-white/80 transition-colors">Changelog</a>
            </div>

            {/* Social Links */}
            <div className="flex flex-col gap-1">
              <a href="#" className="text-xs sm:text-sm text-white hover:text-white/80 transition-colors">IG</a>
              <a href="#" className="text-xs sm:text-sm text-white hover:text-white/80 transition-colors">BE</a>
              <a href="#" className="text-xs sm:text-sm text-white hover:text-white/80 transition-colors">DR</a>
              <a href="#" className="text-xs sm:text-sm text-white hover:text-white/80 transition-colors">X</a>
            </div>

            {/* Copyright and Powered By */}
            <div className="flex flex-col gap-1">
              <div className="text-sm sm:text-base text-white">
                Powered by <a href="#" className="hover:text-white/80 transition-colors">Webflow</a>
              </div>
              <p className="text-sm sm:text-base text-white">© 2026 Anvibe®</p>
            </div>
          </div>

          {/* Let's Talk Button */}
          <button className="w-full sm:w-auto bg-white/75 backdrop-blur-sm px-4 py-4 sm:px-5 sm:py-5 rounded-tl-2xl rounded-br-2xl sm:rounded-tl-3xl sm:rounded-br-3xl flex items-center justify-center sm:justify-start gap-3 sm:gap-4 hover:bg-white/90 transition-colors group">
            <span className="text-base sm:text-lg font-normal text-[#1e1e1e] tracking-tight">Let&apos;s Talk</span>
            <ArrowRight size={18} className="sm:w-5 sm:h-5 text-[#1e1e1e] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  )
}

