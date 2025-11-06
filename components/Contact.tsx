'use client'

import { useState } from 'react'
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
    <section id="contact" className="py-24 px-6 sm:px-8 relative overflow-hidden" style={{ background: '#040403' }}>
      {/* Background Gradient */}
      <div className="absolute inset-0 blur-3xl" style={{ background: 'linear-gradient(to right, rgba(41, 31, 30, 0.1), rgba(41, 31, 30, 0.15), rgba(41, 31, 30, 0.1))' }}></div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <ScrollAnimation direction="up" delay={0.1}>
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: '#EEF4ED' }}>Let's talk</h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: '#EEF4ED' }}>
              We'd love to hear from you — whether you have a project in mind, or just want to say hi.
            </p>
          </div>
        </ScrollAnimation>

        {/* Support Banner */}
        <ScrollAnimation direction="up" delay={0.2}>
          <div className="rounded-2xl p-6 mb-8 border flex items-center gap-6" style={{ background: '#0a0a09', borderColor: '#0f0f0e' }}>
          <div className="flex -space-x-3">
            <div className="w-14 h-14 rounded-full flex items-center justify-center border-2" style={{ background: '#030302', borderColor: '#0f0f0e' }}></div>
            <div className="w-14 h-14 rounded-full flex items-center justify-center border-2" style={{ background: '#030302', borderColor: '#0f0f0e' }}></div>
            <div className="w-14 h-14 rounded-full flex items-center justify-center border-2" style={{ background: '#030302', borderColor: '#0f0f0e' }}></div>
          </div>
          <p style={{ color: '#EEF4ED' }}>
            Get a detailed plan from our team within 24 hours.
          </p>
          </div>
        </ScrollAnimation>

        {/* Contact Form */}
        <ScrollAnimation direction="up" delay={0.3}>
          <form onSubmit={handleSubmit} className="rounded-2xl p-8 md:p-12 border" style={{ background: '#0a0a09', borderColor: '#0f0f0e' }}>
          <div className="space-y-6">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-colors"
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
                className="w-full px-4 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-colors"
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
                className="w-full px-4 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-colors resize-none"
                style={{ background: '#030302', borderColor: '#2d3027', color: '#EEF4ED' }}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-black text-white rounded-lg hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200 transition-colors font-medium"
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
