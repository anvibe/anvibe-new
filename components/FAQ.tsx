'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import ScrollAnimation from './ScrollAnimation'

const faqs = [
  {
    question: "What's included in a the monthly package?",
    answer: 'The monthly package includes website design, mobile app design, 48-hour average delivery time, and a dedicated Slack channel for ongoing communication.',
  },
  {
    question: 'How long does a project usually take?',
    answer: 'Project timelines vary depending on scope and complexity. Most projects are completed within 4-8 weeks, with an average delivery time of 48 hours for monthly club members.',
  },
  {
    question: 'Do you offer ongoing support after launch?',
    answer: 'Yes, we offer ongoing support and maintenance packages. Monthly club members receive dedicated support through our Slack channel.',
  },
  {
    question: 'Can I hire you for just a logo or one-off design?',
    answer: 'Absolutely! We offer custom project pricing for one-off designs including logos, brand identities, and individual design assets.',
  },
  {
    question: 'What platforms do you build websites on?',
    answer: 'We primarily build on Webflow, but we also work with React, Next.js, and other modern web technologies based on your needs.',
  },
  {
    question: 'How do payments work?',
    answer: 'For monthly packages, we accept monthly payments. For one-off projects, we typically require a 50% deposit to start and the remainder upon completion.',
  },
  {
    question: "What if I'm not happy with the first concept?",
    answer: 'We include revision rounds in all our packages. We work closely with you to ensure the final result meets your expectations and brand requirements.',
  },
  {
    question: 'Do you work with clients from any country?',
    answer: 'Yes, we work with clients worldwide. We communicate primarily in English and can accommodate different time zones through our flexible scheduling.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8" style={{ background: '#040403' }}>
      <div className="max-w-3xl mx-auto">
        <ScrollAnimation direction="up" delay={0.1}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-12 md:mb-16" style={{ color: '#EEF4ED' }}>FAQ</h2>
        </ScrollAnimation>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <ScrollAnimation key={index} direction="up" delay={0.2 + index * 0.05}>
            <div
              className="border-b"
              style={{ borderColor: '#0f0f0e' }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full py-4 sm:py-6 flex items-center justify-between text-left transition-colors"
                style={{ color: '#EEF4ED' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#EEF4ED'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#EEF4ED'}
              >
                <span className="text-base sm:text-lg font-medium pr-3 sm:pr-4">{faq.question}</span>
                <ChevronDown
                  size={18}
                  className={`flex-shrink-0 transition-transform sm:w-5 sm:h-5 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  style={{ color: '#EEF4ED' }}
                />
              </button>
              {openIndex === index && (
                <div className="pb-4 sm:pb-6 text-sm sm:text-base" style={{ color: '#EEF4ED' }}>
                  {faq.answer}
                </div>
              )}
            </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}


