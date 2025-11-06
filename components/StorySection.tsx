'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Play, X } from 'lucide-react'
import ScrollAnimation from './ScrollAnimation'

export default function StorySection() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-[200px]" style={{ background: '#040403' }}>
      <div className="max-w-[1520px] mx-auto">
        <ScrollAnimation direction="up" delay={0.1}>
          <div className="relative rounded-xl md:rounded-2xl overflow-hidden aspect-video" style={{ background: '#030302' }}>
            {/* YouTube Video Embed */}
            {isVideoPlaying ? (
              <>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/0deLjixNwQ0?autoplay=1"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
                {/* Close Button */}
                <button
                  onClick={() => setIsVideoPlaying(false)}
                  className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 bg-white/90 hover:bg-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center transition-colors shadow-lg"
                  aria-label="Close video"
                >
                  <X size={20} className="sm:w-6 sm:h-6 text-[#1e1e1e]" />
                </button>
              </>
            ) : (
              <>
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop"
                    alt="Story section background"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1520px"
                  />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0d0f1f]" />

                {/* Rotated Brand Logo on Left - Hidden on mobile, visible on tablet+ */}
                <div className="hidden sm:block absolute left-4 md:left-8 top-12 md:top-24 z-10">
                  <div className="rotate-[-90deg] origin-center">
                    <div className="text-white text-xs sm:text-sm font-bold" style={{ fontFamily: 'Arial, sans-serif' }}>
                      ANVIBE
                    </div>
                  </div>
                </div>

                {/* Play Button in Center */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <button
                    onClick={() => setIsVideoPlaying(true)}
                    className="bg-white rounded-full w-16 h-16 sm:w-20 sm:h-20 md:w-[120px] md:h-[120px] flex items-center justify-center hover:scale-110 transition-transform shadow-lg cursor-pointer"
                  >
                    <Play size={20} className="sm:w-6 sm:h-6 md:w-8 md:h-8 fill-[#1e1e1e] text-[#1e1e1e] ml-0.5 sm:ml-1" />
                  </button>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 z-10">
                  <div className="max-w-full sm:max-w-[280px] opacity-80">
                    <p className="text-sm sm:text-[15.6px] leading-[18px] sm:leading-[20.8px] text-white" style={{ fontFamily: 'Arial, sans-serif' }}>
                      Telling your story that makes hearts skip<br className="hidden sm:block" />
                      <span className="sm:hidden"> </span>a beat and minds remember.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}

