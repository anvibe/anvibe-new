'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import ScrollAnimation from './ScrollAnimation'

const testimonials = [
  {
    author: 'Carl Sagan',
    role: 'Founder, Clonify',
    quote: 'Working with Anvibe felt like hiring a creative greenhouse for our ideas. Everything grew faster and brighter than we imagined.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=752&h=817&fit=crop&crop=faces',
  },
  {
    author: 'Jane Doe',
    role: 'CEO, Startup',
    quote: 'The team exceeded our expectations and delivered exceptional results.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=752&h=817&fit=crop&crop=faces',
  },
  {
    author: 'John Smith',
    role: 'Director, Company',
    quote: 'Professional, creative, and results-driven. Highly recommend!',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=752&h=817&fit=crop&crop=faces',
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-24 px-6 sm:px-8" style={{ background: '#040403' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <div className="relative aspect-[752/817] rounded-2xl overflow-hidden" style={{ background: '#030302' }}>
            <Image
              src={currentTestimonial.image}
              alt={currentTestimonial.author}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={currentIndex === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 max-w-sm">
                <h4 className="font-semibold" style={{ color: '#EEF4ED' }}>{currentTestimonial.author}</h4>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-px h-4 bg-white/50"></div>
                  <p className="text-sm" style={{ color: '#EEF4ED', opacity: 0.8 }}>{currentTestimonial.role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quote */}
          <ScrollAnimation direction="right" delay={0.2}>
            <div className="p-8 md:p-12">
              <h3 className="text-4xl md:text-5xl font-bold leading-tight mb-8" style={{ color: '#EEF4ED' }}>
                {currentTestimonial.quote}
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

