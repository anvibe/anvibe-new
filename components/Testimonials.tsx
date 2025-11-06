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
    logo: 'chatgpt.svg',
    name: 'ChatGPT',
    description: 'OpenAI\'s ChatGPT helps us generate content, solve complex problems, and enhance our workflow with advanced language understanding and generation.',
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
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-[200px]" style={{ background: '#040403' }}>
      <div className="max-w-[1520px] mx-auto">
        {/* Header */}
        <ScrollAnimation direction="up" delay={0.1}>
          <div className="mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight sm:leading-[70px]" style={{ color: '#EEF4ED' }}>
              Our stack
            </h2>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
          {/* Logo Image */}
          <div className="relative aspect-[4/3] sm:aspect-[752/817] rounded-xl sm:rounded-2xl overflow-hidden" style={{ background: '#030302' }}>
            <div className="absolute inset-0 flex items-start sm:items-center justify-center p-4 sm:p-6 md:p-8 z-20 pt-[50px] sm:pt-6 md:pt-8">
              <div className="rounded-xl sm:rounded-2xl p-1.5 sm:p-2" style={{ background: '#0a0a09' }}>
                <div className="rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 flex items-center justify-center" style={{ 
                  background: 'linear-gradient(to bottom, rgba(238, 244, 237, 0.05), rgba(238, 244, 237, 0.02))',
                  border: '1px solid rgba(238, 244, 237, 0.1)'
                }}>
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 flex items-center justify-center">
                    <div className="absolute inset-2 sm:inset-3 md:inset-4">
                      <Image
                        src={`/images/logos/${currentTech.logo}`}
                        alt={currentTech.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 192px"
                        style={{ 
                          filter: 'brightness(0) saturate(100%) invert(93%) sepia(9%) saturate(187%) hue-rotate(94deg) brightness(108%) contrast(96%)'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl sm:rounded-2xl" style={{ border: '1px solid rgba(238, 244, 237, 0.1)' }} />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 z-10">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 sm:p-4 max-w-full sm:max-w-sm">
                <h4 className="font-semibold text-sm sm:text-base" style={{ color: '#EEF4ED', fontFamily: 'Inter, sans-serif' }}>{currentTech.name}</h4>
                <div className="flex items-center gap-2 mt-1 sm:mt-2">
                  <div className="w-px h-3 sm:h-4 bg-white/50"></div>
                  <p className="text-xs sm:text-sm" style={{ color: '#EEF4ED', opacity: 0.8 }}>Tech Stack</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <ScrollAnimation direction="right" delay={0.2}>
            <div className="p-4 sm:p-6 md:p-8 lg:p-12">
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 sm:mb-8" style={{ color: '#EEF4ED', fontFamily: 'Inter, sans-serif' }}>
                {currentTech.description}
              </h3>

              {/* Navigation */}
              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  onClick={prevSlide}
                  className="p-1.5 sm:p-2 rounded-full transition-colors"
                  style={{ backgroundColor: 'rgba(10, 10, 9, 0.5)' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(10, 10, 9, 0.8)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(10, 10, 9, 0.5)'}
                >
                  <ArrowLeft size={20} className="sm:w-6 sm:h-6" style={{ color: '#EEF4ED' }} />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-1.5 sm:p-2 rounded-full transition-colors"
                  style={{ backgroundColor: 'rgba(10, 10, 9, 0.5)' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(10, 10, 9, 0.8)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(10, 10, 9, 0.5)'}
                >
                  <ArrowRight size={20} className="sm:w-6 sm:h-6" style={{ color: '#EEF4ED' }} />
                </button>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}

