'use client'

import Image from 'next/image'
import ScrollAnimation from './ScrollAnimation'

const stats = [
  {
    value: '22',
    unit: 'm+',
    description: "Capital raised from clients we've worked with.",
  },
  {
    value: '94',
    unit: '%',
    description: 'Client satisfaction across all creative projects.',
  },
  {
    value: '12',
    unit: '+',
    description: 'Years of design, strategy, and digital expertise.',
  },
]

export default function Stats() {
  return (
    <section className="py-24 px-6 sm:px-8" style={{ background: '#040403' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Video Section */}
          <ScrollAnimation direction="left" delay={0.1}>
            <div className="relative aspect-[754/650] rounded-2xl overflow-hidden" style={{ background: '#030302' }}>
              <Image
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=754&h=650&fit=crop"
                alt="Results driven"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <div className="absolute top-8 left-8 z-20">
                <h3 className="text-4xl font-bold" style={{ color: '#EEF4ED' }}>Results driven</h3>
              </div>
              <div className="absolute bottom-8 left-8 max-w-xs z-20">
                <p style={{ color: '#EEF4ED', opacity: 0.9 }}>
                  We&apos;re a creative agency built for brands that want more than just good design.
                </p>
              </div>
            </div>
          </ScrollAnimation>

          {/* Stats Grid */}
          <div className="space-y-6">
            {stats.map((stat, index) => (
              <ScrollAnimation key={index} direction="right" delay={0.1 + index * 0.1}>
                <div className="rounded-2xl p-8 border" style={{ background: '#0a0a09', borderColor: '#0f0f0e' }}>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-5xl font-bold">{stat.value}</span>
                    <span className="text-5xl font-bold">{stat.unit}</span>
                  </div>
                  <p style={{ color: '#EEF4ED' }}>{stat.description}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

