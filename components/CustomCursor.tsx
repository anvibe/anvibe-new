'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches) return // skip on touch

    const dot = dotRef.current
    const ring = ringRef.current

    if (!dot || !ring) return

    // hide OS cursor while this component is mounted
    document.body.classList.add('custom-cursor-enabled')

    let mouseX = -100, mouseY = -100 // offscreen start
    let ringX = mouseX, ringY = mouseY
    let isHovering = false
    let currentScale = 1

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      // snap the dot to the mouse
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement
      const isInteractive = target?.matches('a, button, [role="button"], [onclick], input[type="button"], input[type="submit"], .cursor-hover') ||
                            target?.closest('a, button, [role="button"], [onclick], .cursor-hover')
      
      if (isInteractive && !isHovering) {
        isHovering = true
        currentScale = 1.5
        ring.classList.add('cursor-hovering')
        dot.classList.add('cursor-hovering')
      } else if (!isInteractive && isHovering) {
        isHovering = false
        currentScale = 1
        ring.classList.remove('cursor-hovering')
        dot.classList.remove('cursor-hovering')
      }
    }

    const onDown = () => {
      ring.style.transform += ' scale(0.85)'
      ring.style.opacity = '0.9'
    }

    const onUp = () => {
      ring.style.opacity = '1'
      // remove scale but keep position
      const m = /translate3d\([^)]+\)/.exec(ring.style.transform)?.[0] || ''
      ring.style.transform = `${m} scale(${currentScale})`
    }

    // smooth follow for ring
    let rafId: number
    const tick = () => {
      // linear interpolation
      ringX += (mouseX - ringX) * 0.15
      ringY += (mouseY - ringY) * 0.15
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${currentScale})`
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.body.classList.remove('custom-cursor-enabled')
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden />
      <div ref={dotRef} className="cursor-dot" aria-hidden />
    </>
  )
}

