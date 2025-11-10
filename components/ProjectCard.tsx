'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import RadialBackground from './RadialBackground'

interface ProjectCardProps {
  project: {
    slug: string
    title: string
  }
  index: number
}

// Color gradients for each project
const projectGradients: Record<string, { color1: string; color2: string; angle: number }> = {
  // akanano - yellow
  akanano: { color1: '#FBBF24', color2: '#FCD34D', angle: 301 },
  // blob - blue/cyan
  blob: { color1: '#0EA5E9', color2: '#06B6D4', angle: 135 },
  // coral - pink/coral
  coral: { color1: '#F472B6', color2: '#FB7185', angle: 45 },
  // flea - green
  flea: { color1: '#10B981', color2: '#34D399', angle: 225 },
}

// Emojis for each project
const projectEmojis: Record<string, string> = {
  akanano: '🍌',
  blob: '💧',
  coral: '🪸',
  flea: '🦗',
}

// Shadow colors matching each project's gradient
const projectShadowColors: Record<string, string> = {
  akanano: '#FBBF24', // yellow
  blob: '#0EA5E9', // blue
  coral: '#F472B6', // pink
  flea: '#10B981', // green
}

// Default gradient fallback
const defaultGradient = { color1: '#3060eb', color2: '#8f35ea', angle: 301 }

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const gradient = projectGradients[project.slug] || defaultGradient
  const emoji = projectEmojis[project.slug] || '✨'
  const shadowColor = projectShadowColors[project.slug] || '#EF4444'
  const [isHovered, setIsHovered] = useState(false)
  const [emojiScale, setEmojiScale] = useState(0.5)
  const animationFrameRef = useRef<number>()
  const startTimeRef = useRef<number>()
  const animationStartTimeRef = useRef<number>()

  // Sync emoji animation with RadialBackground animation
  useEffect(() => {
    if (!isHovered) {
      setEmojiScale(0.5)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      return
    }

    const start = performance.now()
    startTimeRef.current = start
    animationStartTimeRef.current = start + 500 // Same delay as RadialBackground
    const ANIMATION_FADE_IN_DURATION = 3 // Same as RadialBackground

    function animate(now: number) {
      if (!isHovered) return

      const t = (now - startTimeRef.current!) / 1000
      const animationTime = Math.max(0, (now - animationStartTimeRef.current!) / 1000)
      
      // Same calculation as RadialBackground - emoji grows/shrinks with circle
      const scaleAnimationProgress = Math.min(animationTime / ANIMATION_FADE_IN_DURATION, 1)
      const scaleEase = 1 - Math.pow(1 - scaleAnimationProgress, 3) // Ease out cubic
      const baseScale = Math.sin(t * 0.5) * 0.15 // Same as RadialBackground
      const scaleCycle = 1 + (baseScale * scaleEase) // Same as RadialBackground
      
      setEmojiScale(scaleCycle)
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isHovered])

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative overflow-hidden aspect-video cursor-pointer block rounded-xl sm:rounded-2xl"
      style={{ background: '#030302' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl sm:rounded-2xl" />
      <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-30">
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
          <h3 className="text-2xl font-semibold" style={{ color: '#EEF4ED' }}>{project.title}</h3>
        </div>
      </div>
      <div className="w-full h-full flex items-center justify-center relative rounded-xl sm:rounded-2xl overflow-hidden" style={{ background: '#0a0a09', color: '#EEF4ED' }}>
        <RadialBackground gradient={gradient} zIndex={0} />
        <div className="absolute inset-0 w-full h-full bg-black/20 pointer-events-none" style={{ zIndex: 1 }} />
        {/* Black overlay on hover */}
        <div 
          className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
          style={{ 
            backgroundColor: '#000000',
            opacity: isHovered ? 0.8 : 0,
            zIndex: 15,
          }}
        />
        {/* Emoji on hover - inside the card, synchronized with circle animation */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <span 
            className="text-8xl sm:text-9xl md:text-[12rem] transition-opacity duration-300"
            style={{ 
              opacity: isHovered ? 1 : 0,
              transform: `scale(${emojiScale})`,
              willChange: 'transform, opacity',
              filter: `drop-shadow(0 0 20px ${shadowColor}) drop-shadow(0 0 40px ${shadowColor}) drop-shadow(0 0 60px ${shadowColor})`,
              WebkitFilter: `drop-shadow(0 0 20px ${shadowColor}) drop-shadow(0 0 40px ${shadowColor}) drop-shadow(0 0 60px ${shadowColor})`,
            }}
          >
            {emoji}
          </span>
        </div>
      </div>
    </Link>
  )
}

