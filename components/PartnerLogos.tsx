'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

interface PartnerLogosProps {
  withGradient?: boolean
}

export default function PartnerLogos({ withGradient = false }: PartnerLogosProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scrollSpeed = 0.3 // Slowed down scroll speed
    let scrollPosition = 0

    const scroll = () => {
      scrollPosition += scrollSpeed
      if (scrollPosition >= container.scrollWidth / 2) {
        scrollPosition = 0
      }
      container.style.transform = `translateX(-${scrollPosition}px)`
      requestAnimationFrame(scroll)
    }

    const animationId = requestAnimationFrame(scroll)
    return () => cancelAnimationFrame(animationId)
  }, [])

  // Logo files from /public/images/logos/
  // The component will automatically extract the name from the filename
  const logoFiles = [
    'cursor.svg',
    'figma.svg',
    'claude.svg',
    'chatgpt.svg',
    'supabase.svg',
    'anthopic.svg',
    'vercel.svg',
    'Google-gemini-icon 1.svg',
  ]

  // Helper function to extract name from filename (remove extension, capitalize, clean up)
  const getLogoName = (filename: string): string => {
    let nameWithoutExt = filename.replace(/\.(svg|png|jpg|webp)$/i, '')
    // Remove numbers and extra spaces (e.g., "Google-gemini-icon 1" → "Google-gemini-icon")
    nameWithoutExt = nameWithoutExt.replace(/\s+\d+$/, '').trim()
    // Replace hyphens with spaces and capitalize first letter of each word
    nameWithoutExt = nameWithoutExt.replace(/-/g, ' ')
    // Capitalize first letter of each word
    let result = nameWithoutExt
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
    // Remove "icon" from the result
    result = result.replace(/\s+icon\s*/gi, ' ').trim()
    return result
  }

  return (
    <section className="py-6 sm:py-8 px-4 sm:px-6 md:px-8 lg:px-[200px]" style={{ background: '#040403' }}>
      <div className="max-w-[1520px] mx-auto">
        <div className="rounded-xl sm:rounded-2xl overflow-hidden" style={{ 
          background: withGradient 
            ? 'linear-gradient(135deg, rgba(48, 96, 235, 0.1) 0%, rgba(143, 53, 234, 0.1) 100%)'
            : '#0a0a09'
        }}>
          <div className="relative py-6 sm:py-8">
        <div 
          ref={containerRef}
          className="flex gap-8 sm:gap-12 md:gap-16 items-center"
          style={{ width: 'fit-content' }}
        >
          {/* Duplicate logos for seamless loop */}
          {[...logoFiles, ...logoFiles, ...logoFiles].map((logo, idx) => {
            const logoName = getLogoName(logo)
            
            return (
              <div
                key={idx}
                className="flex-shrink-0 flex items-center gap-2 sm:gap-3 opacity-70 hover:opacity-100 transition-opacity"
              >
                {/* Logo Image */}
                <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex-shrink-0">
                  <Image
                    src={`/images/logos/${logo}`}
                    alt={logoName}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 32px, (max-width: 768px) 40px, 48px"
                    style={{ filter: 'brightness(0) saturate(100%) invert(93%) sepia(9%) saturate(187%) hue-rotate(94deg) brightness(108%) contrast(96%)' }}
                    onError={(e) => {
                      // Fallback if image doesn't exist
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                    }}
                  />
                </div>
                {/* Logo Text */}
                  <span className="text-lg sm:text-xl md:text-2xl font-bold whitespace-nowrap" style={{ color: '#EEF4ED' }}>
                  {logoName}
                </span>
              </div>
            )
          })}
        </div>
          </div>
        </div>
      </div>
    </section>
  )
}


