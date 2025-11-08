'use client'

import { useEffect, useRef } from 'react'
import { Check } from 'lucide-react'
import { motion } from 'framer-motion'
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
    features: ['Cursor AI Development'],
    cta: 'Get in touch',
    featured: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8" style={{ background: '#040403' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ScrollAnimation direction="up" delay={0.1}>
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <div className="inline-block rounded-full px-4 sm:px-6 py-1.5 sm:py-2 mb-4 sm:mb-6" style={{ background: '#0a0a09' }}>
              <span className="text-xs sm:text-sm font-medium" style={{ color: '#EEF4ED' }}>Pricing</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight sm:leading-[70px] mb-2 sm:mb-4" style={{ color: '#EEF4ED' }}>Plans with purpose</h2>
            <p className="text-lg sm:text-xl md:text-2xl font-normal" style={{ color: '#EEF4ED', opacity: 0.7 }}>
              choose your plan
            </p>
          </div>
        </ScrollAnimation>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <ScrollAnimation key={index} direction="up" delay={0.2 + index * 0.1}>
            <div
              className="relative rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 overflow-hidden"
              style={{ 
                borderColor: '#0f0f0e', 
                background: index === 0 
                  ? 'linear-gradient(301deg, rgba(48, 96, 235, 0.2), rgba(143, 53, 234, 0.2))' 
                  : '#0a0a09' 
              }}
            >
              {/* Animated Background Canvas */}
              <PricingCardBackground theme={index === 0 ? 'hero' : 'footer'} />
              
              {/* Overlay for better text visibility */}
              <div 
                className="absolute inset-0 rounded-xl sm:rounded-2xl z-[5]"
                style={{
                  background: 'linear-gradient(to bottom, rgba(10, 10, 9, 0.6), rgba(3, 3, 2, 0.7))',
                }}
              />
              
              {/* Content Container */}
              <div className="relative z-10">
              {/* Plan Header */}
              <motion.div 
                className="mb-6 sm:mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4" style={{ color: '#EEF4ED', fontFamily: 'Inter, sans-serif' }}>{plan.name}</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  {plan.priceRange ? (
                    <>
                      <span className="text-3xl sm:text-4xl font-bold line-through" style={{ color: '#EEF4ED' }}>{plan.price}</span>
                      <span className="text-3xl sm:text-4xl font-bold" style={{ color: '#EEF4ED' }}>{plan.priceRange}</span>
                    </>
                  ) : (
                    <span className="text-3xl sm:text-4xl font-bold" style={{ color: '#EEF4ED' }}>{plan.price}</span>
                  )}
                  <span className="text-lg sm:text-xl" style={{ color: '#EEF4ED' }}>{plan.period}</span>
                </div>
                <p className="text-sm sm:text-base" style={{ color: '#EEF4ED' }}>{plan.description}</p>
              </motion.div>

              {/* Features */}
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 sm:gap-3">
                    <Check size={18} className="sm:w-5 sm:h-5 shrink-0" style={{ color: '#EEF4ED' }} />
                    <span className="text-sm sm:text-base" style={{ color: '#EEF4ED' }}>{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <motion.button
                className="w-full py-3 sm:py-4 rounded-lg sm:rounded-xl font-medium transition-colors text-sm sm:text-base bg-white text-black hover:bg-slate-100"
                style={{ backgroundColor: '#ffffff', color: '#000000' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.02, backgroundColor: '#f1f5f9' }}
                whileTap={{ scale: 0.98 }}
              >
                {plan.cta}
              </motion.button>
              </div>
            </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}

// Pricing Card Background Component with Radial Animation
function PricingCardBackground({ theme = 'footer' }: { theme?: 'hero' | 'footer' }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    // Parameters - match footer style
    const ARMS = 20
    const WAVES = 2.25
    const AMP = 0.14
    const ROT_SPEED = 0.06
    const WOBBLE_SPEED = 1.25
    const INNER_HOLE = 0.14
    const LINE_WIDTH = theme === 'hero' ? 10 : 6 // Much thicker lines for hero theme

    let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
    let w = 0, h = 0, cx = 0, cy = 0, R = 0

    function resize() {
      if (!canvas) return
      const parent = canvas.parentElement
      if (!parent) return
      
      dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
      w = Math.floor(parent.clientWidth * dpr)
      h = Math.floor(parent.clientHeight * dpr)
      canvas.width = w
      canvas.height = h
      cx = w / 2
      cy = h / 2
    }

    function drawArm(baseAngle: number, t: number) {
      if (!ctx) return
      const steps = 90
      const inner = R * INNER_HOLE
      const amp = R * AMP
      const freq = WAVES

      ctx.beginPath()
      for (let i = 0; i <= steps; i++) {
        const k = i / steps
        const r = inner + (R - inner) * k
        const wobble = Math.sin((k * Math.PI * 2 * freq) + (t * WOBBLE_SPEED) + baseAngle * 1.1) * amp * (1 - k * 0.65)
        const a = baseAngle + wobble / R * 0.9
        const x = cx + Math.cos(a) * r
        const y = cy + Math.sin(a) * r
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
    }

    let start = performance.now()
    function frame(now: number) {
      if (!ctx) return
      const t = (now - start) / 1000
      ctx.clearRect(0, 0, w, h)

      // Scale animation - grow and shrink in a loop
      const scaleCycle = Math.sin(t * 0.5) * 0.15 + 1 // Oscillates between 0.85 and 1.15
      // Make radius bigger than viewport - use diagonal for full coverage
      const diagonal = Math.sqrt(w * w + h * h)
      const baseRadius = diagonal * 0.6 // 60% of diagonal ensures full coverage
      R = baseRadius * scaleCycle

      ctx.save()
      ctx.translate(cx, cy)
      ctx.scale(scaleCycle, scaleCycle)
      ctx.rotate(t * ROT_SPEED)
      ctx.translate(-cx, -cy)

      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.lineWidth = LINE_WIDTH * dpr

      const layers = 1
      for (let L = 0; L < layers; L++) {
        if (theme === 'hero') {
          // Hero theme: dark strokes - 0.5 opacity
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)' // Pure black with 0.5 opacity
        } else {
          // Footer theme: white strokes - 0.5 opacity
          ctx.strokeStyle = 'rgba(238, 244, 237, 0.5)' // #EEF4ED white color with 0.5 opacity
        }
        
        for (let i = 0; i < ARMS; i++) {
          const angle = (i / ARMS) * Math.PI * 2 + L * 0.002
          drawArm(angle, t)
        }
      }

      ctx.restore()
      animationFrameRef.current = requestAnimationFrame(frame)
    }

    const ro = new ResizeObserver(resize)
    const parent = canvas.parentElement
    if (parent) {
      ro.observe(parent)
    }
    window.addEventListener('resize', resize)
    resize()
    animationFrameRef.current = requestAnimationFrame(frame)

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', resize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none rounded-xl sm:rounded-2xl"
      style={{
        background: theme === 'hero' 
          ? 'linear-gradient(301deg, #3060eb, #8f35ea)' 
          : '#0a0a09',
        backgroundSize: theme === 'hero' ? '400% 400%' : 'auto',
        animation: theme === 'hero' ? 'gradientMove 11s ease-in-out infinite' : 'none',
        transform: 'translateZ(0)',
        zIndex: 0,
        opacity: 0.5,
      }}
    />
  )
}


