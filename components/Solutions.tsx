'use client'

import { useState } from 'react'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import ScrollAnimation from './ScrollAnimation'

const solutions = [
  {
    number: '01',
    title: 'Logos and brand identity',
    description: 'We craft logos and brand systems that leave a lasting impression.',
    dotColor: '#7EA6F0', // Blue
  },
  {
    number: '02',
    title: 'Website design and development',
    description: 'Beautiful and functional websites built with purpose and precision.',
    dotColor: '#FD5C5C', // Red
  },
  {
    number: '03',
    title: 'SEO optimization and analysis',
    description: 'Get found faster with tailored SEO strategies backed by real data.',
    dotColor: '#4BD760', // Green
  },
  {
    number: '04',
    title: 'Social media management',
    description: 'We plan, post, and grow your brand across every platform with purpose.',
    dotColor: '#E1A0FF', // Violet
  },
  {
    number: '05',
    title: '3D design and animation',
    description: 'Bring ideas to life with high-impact 3D visuals and motion.',
    dotColor: '#E28F2F', // Orange
  },
]

export default function Solutions() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const cardsToShow = 3
  const maxIndex = Math.max(0, solutions.length - cardsToShow)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  return (
    <section id="solutions" className="py-24 px-6 sm:px-8 lg:px-[200px]" style={{ background: '#040403' }}>
      <div className="max-w-[1520px] mx-auto">
        {/* Header */}
        <ScrollAnimation direction="up" delay={0.1}>
          <div className="flex justify-between items-end mb-16">
            <div className="flex items-end gap-2.5">
              <h2 className="text-5xl md:text-6xl font-bold leading-[70px]" style={{ color: '#EEF4ED' }}>
                Solutions
              </h2>
              <span className="text-base mb-1" style={{ color: '#EEF4ED', opacity: 0.7 }}>(5)</span>
            </div>
            <button className="hidden md:flex items-center gap-4 px-5 py-5 rounded-tl-3xl rounded-br-3xl transition-colors group"
              style={{ background: 'rgba(238, 244, 237, 0.75)', color: '#1e1e1e' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(238, 244, 237, 0.9)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(238, 244, 237, 0.75)'}>
              <span className="text-lg font-normal tracking-tight">Let&apos;s Talk</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </ScrollAnimation>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out gap-3"
              style={{ transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)` }}
            >
              {solutions.map((solution, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0"
                  style={{ width: `calc(${100 / cardsToShow}% - 16px)` }}
                >
                  <div className="rounded-2xl p-2 h-full" style={{ background: '#0a0a09' }}>
                    <div className="rounded-xl p-6 h-full flex flex-col" style={{ 
                      background: 'linear-gradient(to bottom, rgba(238, 244, 237, 0.05), rgba(238, 244, 237, 0.02))',
                      border: '1px solid rgba(238, 244, 237, 0.1)'
                    }}>
                      <div className="flex flex-col gap-2 mb-6">
                        <div className="flex items-center gap-1.5">
                          <div 
                            className="w-2.5 h-2.5 rounded-lg shrink-0" 
                            style={{ backgroundColor: solution.dotColor }}
                          />
                          <span className="text-sm font-normal" style={{ color: '#EEF4ED' }}>
                            {solution.number}
                          </span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold leading-[28.8px] tracking-tight" style={{ color: '#EEF4ED' }}>
                          {solution.title}
                        </h3>
                      </div>
                      <p className="text-base leading-[20.8px] flex-grow" style={{ color: '#EEF4ED', opacity: 0.7 }}>
                        {solution.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="w-24 h-24 rounded-full border-2 flex items-center justify-center transition-all shadow-lg hover:scale-105"
              style={{ background: '#0a0a09', borderColor: 'rgba(238, 244, 237, 0.2)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#030302'
                e.currentTarget.style.borderColor = 'rgba(238, 244, 237, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#0a0a09'
                e.currentTarget.style.borderColor = 'rgba(238, 244, 237, 0.2)'
              }}
            >
              <ArrowLeft size={24} style={{ color: '#EEF4ED' }} />
            </button>
            <button
              onClick={nextSlide}
              className="w-24 h-24 rounded-full border-2 flex items-center justify-center transition-all shadow-lg hover:scale-105"
              style={{ background: '#0a0a09', borderColor: 'rgba(238, 244, 237, 0.2)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#030302'
                e.currentTarget.style.borderColor = 'rgba(238, 244, 237, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#0a0a09'
                e.currentTarget.style.borderColor = 'rgba(238, 244, 237, 0.2)'
              }}
            >
              <ArrowRight size={24} style={{ color: '#EEF4ED' }} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}


