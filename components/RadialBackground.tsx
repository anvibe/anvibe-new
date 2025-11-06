'use client'

import { useEffect, useRef } from 'react'

interface Gradient {
  color1: string
  color2: string
  angle: number
}

interface RadialBackgroundProps {
  gradient?: Gradient
}

export default function RadialBackground({ gradient }: RadialBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number>()

  const defaultGradient = { color1: '#3060eb', color2: '#8f35ea', angle: 301 }
  const currentGradient = gradient || defaultGradient

  // Update background gradient smoothly when it changes
  useEffect(() => {
    if (bgRef.current) {
      bgRef.current.style.background = `linear-gradient(${currentGradient.angle}deg, ${currentGradient.color1}, ${currentGradient.color2})`
    }
  }, [currentGradient])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    // Parameters
    const ARMS = 20
    const WAVES = 2.25
    const AMP = 0.14
    const ROT_SPEED = 0.06
    const WOBBLE_SPEED = 1.25
    const INNER_HOLE = 0.14
    const LINE_WIDTH = 6

    let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
    let w = 0, h = 0, cx = 0, cy = 0, R = 0

    function resize() {
      if (!canvas) return
      dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
      w = Math.floor(canvas.clientWidth * dpr)
      h = Math.floor(canvas.clientHeight * dpr)
      canvas.width = w
      canvas.height = h
      cx = w / 2
      cy = h / 2
      // R is now calculated dynamically in frame() for the scale animation
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
      ctx.scale(scaleCycle, scaleCycle) // Apply scale transform
      ctx.rotate(t * ROT_SPEED)
      ctx.translate(-cx, -cy)

      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.lineWidth = LINE_WIDTH * dpr

      const layers = 2
      for (let L = 0; L < layers; L++) {
        const rootStyle = getComputedStyle(document.documentElement)
        const strokeAlpha = parseFloat(rootStyle.getPropertyValue('--stroke-alpha')) || 0.95
        const stroke = rootStyle.getPropertyValue('--stroke') || '255,255,255'
        const alpha = strokeAlpha * (0.7 + 0.3 * (1 - L / layers))
        ctx.strokeStyle = `rgba(${stroke}, ${alpha})`
        
        for (let i = 0; i < ARMS; i++) {
          const angle = (i / ARMS) * Math.PI * 2 + L * 0.002
          drawArm(angle, t)
        }
      }

      ctx.restore()
      animationFrameRef.current = requestAnimationFrame(frame)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
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
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
      {/* Background gradient layer */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{
          background: `linear-gradient(${currentGradient.angle}deg, ${currentGradient.color1}, ${currentGradient.color2})`,
          backgroundSize: '400% 400%',
          animation: 'gradientMove 11s ease-in-out infinite',
          transition: 'background 1.5s ease-in-out',
        }}
      />
      {/* Canvas animation layer */}
      <canvas
        ref={canvasRef}
        id="radial-bg"
        className="absolute inset-0 w-full h-full block pointer-events-none"
        style={{
          transform: 'translateZ(0)',
        }}
      />
    </div>
  )
}
