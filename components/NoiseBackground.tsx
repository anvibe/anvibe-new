'use client'

import { useEffect, useRef, useState } from 'react'

export default function NoiseBackground() {
  const divRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()
  const [noisePattern, setNoisePattern] = useState<string>('')

  useEffect(() => {
    // Create a noise pattern using canvas and convert to data URL
    // For multiply blend mode on dark backgrounds, we need lighter noise
    const canvas = document.createElement('canvas')
    canvas.width = 200
    canvas.height = 200
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const imageData = ctx.createImageData(200, 200)
    const data = imageData.data
    
    for (let i = 0; i < data.length; i += 4) {
      // Generate noise values (0-255 range) for overlay blend mode
      const value = Math.random() * 255
      data[i] = value     // R
      data[i + 1] = value // G
      data[i + 2] = value // B
      data[i + 3] = 255   // A
    }
    
    ctx.putImageData(imageData, 0, 0)
    setNoisePattern(canvas.toDataURL())
  }, [])

  useEffect(() => {
    const element = divRef.current
    if (!element || !noisePattern) return

    function staticAnimate() {
      if (!element) return
      
      const x = Math.floor(Math.random() * 100) + 1
      const y = Math.floor(Math.random() * 10) + 1
      
      element.style.backgroundPosition = `${x}% ${y}%`
      
      timeoutRef.current = setTimeout(() => {
        staticAnimate()
      }, 30) // 0.03 seconds = 30ms
    }

    staticAnimate()

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [noisePattern])

  if (!noisePattern) return null

  return (
    <div
      ref={divRef}
      className="noiseBG fixed inset-0 w-full h-full pointer-events-none"
      style={{
        backgroundImage: noisePattern ? `url(${noisePattern})` : 'none',
        mixBlendMode: 'screen',
        opacity: 0.05,
        backgroundSize: '200px 200px',
        backgroundRepeat: 'repeat',
        zIndex: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    />
  )
}

