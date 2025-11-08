'use client'

import { useState } from 'react'
import Image from 'next/image'
import ScrollAnimation from './ScrollAnimation'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 relative overflow-hidden" style={{ background: '#040403' }}>
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <ScrollAnimation direction="up" delay={0.1}>
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6" style={{ color: '#EEF4ED' }}>Let's talk</h2>
            <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4" style={{ color: '#EEF4ED' }}>
              We'd love to hear from you — whether you have a project in mind, or just want to say hi.
            </p>
          </div>
        </ScrollAnimation>

        {/* Support Banner */}
        <ScrollAnimation direction="up" delay={0.2}>
          <div className="rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border flex flex-col sm:flex-row items-center gap-4 sm:gap-6" style={{ background: '#0a0a09', borderColor: '#0f0f0e' }}>
          <div className="flex -space-x-3 shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border-2 overflow-hidden relative" style={{ background: '#030302', borderColor: '#0f0f0e' }}>
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=56&h=56&fit=crop&crop=faces"
                alt="Team member"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 40px, (max-width: 768px) 48px, 56px"
              />
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border-2 overflow-hidden relative" style={{ background: '#030302', borderColor: '#0f0f0e' }}>
              <Image
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=56&h=56&fit=crop&crop=faces"
                alt="Team member"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 40px, (max-width: 768px) 48px, 56px"
              />
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border-2 overflow-hidden relative" style={{ background: '#030302', borderColor: '#0f0f0e' }}>
              <Image
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=56&h=56&fit=crop&crop=faces"
                alt="Team member"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 40px, (max-width: 768px) 48px, 56px"
              />
            </div>
          </div>
          <p className="text-sm sm:text-base text-center sm:text-left" style={{ color: '#EEF4ED' }}>
            Get a detailed plan from our team within 24 hours.
          </p>
          </div>
        </ScrollAnimation>

        {/* Contact Form */}
        <ScrollAnimation direction="up" delay={0.3}>
          <form onSubmit={handleSubmit} className="rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 border" style={{ background: '#0a0a09', borderColor: '#0f0f0e' }}>
          <div className="space-y-4 sm:space-y-6">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 sm:py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-colors text-sm sm:text-base"
                style={{ background: '#030302', borderColor: '#0f0f0e', color: '#EEF4ED' }}
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 sm:py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-colors text-sm sm:text-base"
                style={{ background: '#030302', borderColor: '#0f0f0e', color: '#EEF4ED' }}
                required
              />
            </div>
            <div>
              <textarea
                name="message"
                placeholder="Project details"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 sm:py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-colors resize-none text-sm sm:text-base"
                style={{ background: '#030302', borderColor: '#2d3027', color: '#EEF4ED' }}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 sm:py-4 bg-black text-white rounded-lg sm:rounded-xl hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200 transition-colors font-medium text-sm sm:text-base"
            >
              Send message
            </button>
          </div>
        </form>
        </ScrollAnimation>
      </div>
    </section>
  )
}
