'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
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
  {
    number: '06',
    title: 'App design',
    description: 'Intuitive and engaging mobile and web app experiences that users love.',
    dotColor: '#3060eb', // Blue
  },
  {
    number: '07',
    title: 'Figma plugins',
    description: 'Custom plugins and tools to supercharge your Figma workflow and productivity.',
    dotColor: '#8f35ea', // Purple
  },
]

export default function Solutions() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardsToShow, setCardsToShow] = useState(3)
  
  // Update cards to show based on screen size
  useEffect(() => {
    const updateCardsToShow = () => {
      if (window.innerWidth < 640) {
        setCardsToShow(1) // Mobile: 1 card
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2) // Tablet: 2 cards
      } else {
        setCardsToShow(3) // Desktop: 3 cards
      }
    }
    
    updateCardsToShow()
    window.addEventListener('resize', updateCardsToShow)
    return () => window.removeEventListener('resize', updateCardsToShow)
  }, [])
  
  const maxIndex = Math.max(0, solutions.length - cardsToShow)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  return (
    <section id="solutions" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-[200px]" style={{ background: '#040403' }}>
      <div className="max-w-[1520px] mx-auto">
        {/* Header */}
        <ScrollAnimation direction="up" delay={0.1}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-12 md:mb-16 gap-4">
            <div>
              <div className="flex items-end gap-2.5 mb-2 sm:mb-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight sm:leading-[70px]" style={{ color: '#EEF4ED' }}>
                  Services
                </h2>
              </div>
              <p className="text-lg sm:text-xl md:text-2xl font-normal" style={{ color: '#EEF4ED', opacity: 0.7 }}>
                what we offer
              </p>
            </div>
          </div>
        </ScrollAnimation>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out gap-2 sm:gap-3"
              style={{ transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)` }}
            >
              {solutions.map((solution, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0"
                  style={{ width: `calc(${100 / cardsToShow}% - ${(cardsToShow - 1) * 8 / cardsToShow}px)` }}
                >
                  <div className="rounded-xl sm:rounded-2xl p-1.5 sm:p-2 h-full" style={{ background: '#0a0a09' }}>
                    <div className="rounded-lg sm:rounded-xl p-4 sm:p-6 h-full flex flex-col" style={{ 
                      background: 'linear-gradient(to bottom, rgba(238, 244, 237, 0.05), rgba(238, 244, 237, 0.02))',
                      border: '1px solid rgba(238, 244, 237, 0.1)'
                    }}>
                      <div className="flex flex-col gap-2 mb-4 sm:mb-6">
                        <div className="flex items-center gap-1.5">
                          <div 
                            className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-lg shrink-0" 
                            style={{ backgroundColor: solution.dotColor }}
                          />
                          <span className="text-xs sm:text-sm font-normal" style={{ color: '#EEF4ED' }}>
                            {solution.number}
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight tracking-tight" style={{ color: '#EEF4ED', fontFamily: 'Inter, sans-serif' }}>
                          {solution.title}
                        </h3>
                      </div>
                      <p className="text-sm sm:text-base leading-[18px] sm:leading-[20.8px] flex-grow" style={{ color: '#EEF4ED', opacity: 0.7 }}>
                        {solution.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-end gap-3 sm:gap-4 mt-6 sm:mt-8">
            <button
              onClick={prevSlide}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-2 flex items-center justify-center transition-all shadow-lg hover:scale-105"
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
              <ArrowLeft size={20} className="sm:w-6 sm:h-6" style={{ color: '#EEF4ED' }} />
            </button>
            <button
              onClick={nextSlide}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-2 flex items-center justify-center transition-all shadow-lg hover:scale-105"
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
              <ArrowRight size={20} className="sm:w-6 sm:h-6" style={{ color: '#EEF4ED' }} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}


