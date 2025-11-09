'use client'

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

// Default gradient fallback
const defaultGradient = { color1: '#3060eb', color2: '#8f35ea', angle: 301 }

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const gradient = projectGradients[project.slug] || defaultGradient

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative overflow-hidden aspect-video cursor-pointer block rounded-xl sm:rounded-2xl"
      style={{ background: '#030302' }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl sm:rounded-2xl" />
      <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
          <h3 className="text-2xl font-semibold" style={{ color: '#EEF4ED' }}>{project.title}</h3>
        </div>
      </div>
      <div className="w-full h-full flex items-center justify-center relative rounded-xl sm:rounded-2xl overflow-hidden" style={{ background: '#0a0a09', color: '#EEF4ED' }}>
        <RadialBackground gradient={gradient} zIndex={0} />
        <div className="absolute inset-0 w-full h-full bg-black/20 pointer-events-none" style={{ zIndex: 1 }} />
      </div>
    </Link>
  )
}

