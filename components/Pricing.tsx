'use client'

import { Check } from 'lucide-react'
import ScrollAnimation from './ScrollAnimation'

const pricingPlans = [
  {
    name: 'Monthly Club',
    price: '$3,999',
    period: '/mo',
    description: 'Perfect for on-going work.',
    features: [
      'Website design',
      'Mobile app design',
      '48 hours av. delivery',
      'Dedicated Slack channel',
    ],
    cta: 'Book your spot',
    featured: true,
  },
  {
    name: 'Landing Page',
    price: '$1,500',
    priceRange: '$2,500',
    period: '/mo',
    description: 'Best choice for landing pages',
    features: ['Webflow Development'],
    cta: 'Get in touch',
    featured: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6 sm:px-8" style={{ background: '#040403' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ScrollAnimation direction="up" delay={0.1}>
          <div className="text-center mb-16">
            <div className="inline-block rounded-full px-6 py-2 mb-6" style={{ background: '#0a0a09' }}>
              <span className="text-sm font-medium" style={{ color: '#EEF4ED' }}>Pricing</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold" style={{ color: '#EEF4ED' }}>Plans with purpose</h2>
          </div>
        </ScrollAnimation>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <ScrollAnimation key={index} direction="up" delay={0.2 + index * 0.1}>
            <div
              className="relative rounded-2xl p-8 border-2 bg-gradient-to-br from-[#0a0a09] to-[#030302]"
              style={{ borderColor: '#0f0f0e' }}
            >
              {/* Plan Header */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4" style={{ color: '#EEF4ED' }}>{plan.name}</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  {plan.priceRange ? (
                    <>
                      <span className="text-4xl font-bold line-through" style={{ color: '#EEF4ED' }}>{plan.price}</span>
                      <span className="text-4xl font-bold" style={{ color: '#EEF4ED' }}>{plan.priceRange}</span>
                    </>
                  ) : (
                    <span className="text-4xl font-bold" style={{ color: '#EEF4ED' }}>{plan.price}</span>
                  )}
                  <span className="text-xl" style={{ color: '#EEF4ED' }}>{plan.period}</span>
                </div>
                <p style={{ color: '#EEF4ED' }}>{plan.description}</p>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <Check size={20} style={{ color: '#EEF4ED' }} />
                    <span style={{ color: '#EEF4ED' }}>{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                className={`w-full py-4 rounded-full font-medium transition-colors ${
                  plan.featured
                    ? 'bg-black text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200'
                    : 'border-2'
                }`}
                style={plan.featured ? {} : { borderColor: '#0f0f0e', color: '#EEF4ED' }}
                onMouseEnter={(e) => !plan.featured && (e.currentTarget.style.backgroundColor = '#030302')}
                onMouseLeave={(e) => !plan.featured && (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                {plan.cta}
              </button>
            </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}


