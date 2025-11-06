'use client'

import { ArrowRight } from 'lucide-react'
import RadialBackgroundInverted from './RadialBackgroundInverted'

export default function Footer() {
  return (
    <footer className="relative min-h-[800px] overflow-hidden" style={{ background: '#0a0a09' }}>
      {/* Inverted Radial Background Canvas */}
      <RadialBackgroundInverted />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between min-h-[800px] p-8">
        {/* Brand Logo */}
        <div className="max-w-[504px]">
          <div className="h-[173px] flex items-center">
            <div className="text-6xl md:text-8xl font-bold text-white boldonse-regular">
              Anvibe
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex items-end justify-between relative">
          {/* Left Navigation */}
          <div className="flex gap-12 items-end opacity-80">
            {/* Navigation Links */}
            <div className="flex flex-col gap-1">
              <a href="#projects" className="flex items-center gap-1 text-white hover:text-white/80 transition-colors">
                <span className="text-base">Works</span>
                <span className="text-xs">(8)</span>
              </a>
              <a href="/about" className="text-base text-white hover:text-white/80 transition-colors">About</a>
              <a href="#blog" className="text-base text-white hover:text-white/80 transition-colors">Blog</a>
              <a href="#contact" className="text-base text-white hover:text-white/80 transition-colors">Contact</a>
            </div>

            {/* Additional Links */}
            <div className="flex flex-col gap-1">
              <a href="#" className="text-base text-white hover:text-white/80 transition-colors">Style Guide</a>
              <a href="#" className="text-base text-white hover:text-white/80 transition-colors">Licenses</a>
              <a href="#" className="text-base text-white hover:text-white/80 transition-colors">Changelog</a>
            </div>

            {/* Social Links */}
            <div className="flex flex-col gap-1">
              <a href="#" className="text-sm text-white hover:text-white/80 transition-colors">IG</a>
              <a href="#" className="text-sm text-white hover:text-white/80 transition-colors">BE</a>
              <a href="#" className="text-sm text-white hover:text-white/80 transition-colors">DR</a>
              <a href="#" className="text-sm text-white hover:text-white/80 transition-colors">X</a>
            </div>

            {/* Copyright and Powered By */}
            <div className="flex flex-col gap-1">
              <div className="text-base text-white">
                Powered by <a href="#" className="hover:text-white/80 transition-colors">Webflow</a>
              </div>
              <p className="text-base text-white">© 2026 Anvibe®</p>
            </div>
          </div>

          {/* Let's Talk Button */}
          <button className="absolute bottom-0 right-0 bg-white/75 backdrop-blur-sm px-5 py-5 rounded-tl-3xl rounded-br-3xl flex items-center gap-4 hover:bg-white/90 transition-colors group">
            <span className="text-lg font-normal text-[#1e1e1e] tracking-tight">Let&apos;s Talk</span>
            <ArrowRight size={20} className="text-[#1e1e1e] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  )
}

