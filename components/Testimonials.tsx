'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import ScrollAnimation from './ScrollAnimation'

const techStack = [
  {
    logo: 'cursor.svg',
    name: 'Cursor',
    description: "The best vibecoding software. We use Cursor because it's the ultimate AI-powered code editor that accelerates our development workflow.",
  },
  {
    logo: 'figma.svg',
    name: 'Figma',
    description: 'Our design tool of choice. Figma enables seamless collaboration between designers and developers, bringing ideas to life faster.',
  },
  {
    logo: 'claude.svg',
    name: 'Claude',
    description: 'Anthropic\'s Claude AI helps us craft intelligent solutions and enhance our creative process with advanced reasoning capabilities.',
  },
  {
    logo: 'supabase.svg',
    name: 'Supabase',
    description: 'The open-source Firebase alternative. Supabase powers our backend infrastructure with real-time databases and authentication.',
  },
  {
    logo: 'anthopic.svg',
    name: 'Anthropic',
    description: 'Leading AI research that drives our intelligent systems. We leverage Anthropic\'s cutting-edge AI models for innovative solutions.',
  },
  {
    logo: 'vercel.svg',
    name: 'Vercel',
    description: 'The platform for frontend developers. Vercel enables us to deploy and scale our applications with zero configuration.',
  },
  {
    logo: 'Google-gemini-icon 1.svg',
    name: 'Google Gemini',
    description: 'Google\'s multimodal AI that enhances our development and design workflows with powerful generative capabilities.',
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % techStack.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + techStack.length) % techStack.length)
  }

  const currentTech = techStack[currentIndex]

  return (
    <section className="py-24 px-6 sm:px-8 lg:px-[200px]" style={{ background: '#040403' }}>
      <div className="max-w-[1520px] mx-auto">
        {/* Header */}
        <ScrollAnimation direction="up" delay={0.1}>
          <div className="mb-16">
            <h2 className="text-5xl md:text-6xl font-bold leading-[70px]" style={{ color: '#EEF4ED' }}>
              Our stack
            </h2>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Logo Image */}
          <div className="relative aspect-[752/817] rounded-2xl overflow-hidden" style={{ background: '#030302' }}>
            <div className="absolute inset-0 flex items-center justify-center p-8 z-20">
              <div className="rounded-2xl p-2" style={{ background: '#0a0a09' }}>
                <div className="rounded-xl p-8 flex items-center justify-center" style={{ 
                  background: 'linear-gradient(to bottom, rgba(238, 244, 237, 0.05), rgba(238, 244, 237, 0.02))',
                  border: '1px solid rgba(238, 244, 237, 0.1)'
                }}>
                  <div className="relative w-48 h-48 flex items-center justify-center">
                    <Image
                      src={`/images/logos/${currentTech.logo}`}
                      alt={currentTech.name}
                      fill
                      className="object-contain"
                      sizes="192px"
                      style={{ filter: 'brightness(0) saturate(100%) invert(93%) sepia(9%) saturate(187%) hue-rotate(94deg) brightness(108%) contrast(96%)' }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl" style={{ border: '1px solid rgba(238, 244, 237, 0.1)' }} />
            <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 max-w-sm">
                <h4 className="font-semibold" style={{ color: '#EEF4ED', fontFamily: 'Inter, sans-serif' }}>{currentTech.name}</h4>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-px h-4 bg-white/50"></div>
                  <p className="text-sm" style={{ color: '#EEF4ED', opacity: 0.8 }}>Tech Stack</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <ScrollAnimation direction="right" delay={0.2}>
            <div className="p-8 md:p-12">
              <h3 className="text-4xl md:text-5xl font-bold leading-tight mb-8" style={{ color: '#EEF4ED', fontFamily: 'Inter, sans-serif' }}>
                {currentTech.description}
              </h3>

              {/* Navigation */}
              <div className="flex items-center gap-4">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-full transition-colors"
                  style={{ backgroundColor: 'rgba(10, 10, 9, 0.5)' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(10, 10, 9, 0.8)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(10, 10, 9, 0.5)'}
                >
                  <ArrowLeft size={24} style={{ color: '#EEF4ED' }} />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-2 rounded-full transition-colors"
                  style={{ backgroundColor: 'rgba(10, 10, 9, 0.5)' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(10, 10, 9, 0.8)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(10, 10, 9, 0.5)'}
                >
                  <ArrowRight size={24} style={{ color: '#EEF4ED' }} />
                </button>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}

