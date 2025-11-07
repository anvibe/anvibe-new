import Link from 'next/link'
import Image from 'next/image'
import { getProjects, Project } from '@/lib/content'
import ScrollAnimation from './ScrollAnimation'

export default async function Projects() {
  let projects: Project[] = []
  try {
    projects = getProjects()
  } catch (error: any) {
    console.error('Error loading projects:', error)
    projects = []
  }

  if (!projects || projects.length === 0) {
    return (
      <section id="projects" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-[200px]" style={{ background: '#040403' }}>
        <div className="max-w-[1520px] mx-auto">
          <div className="text-center" style={{ color: '#EEF4ED', opacity: 0.7 }}>
            <p>No projects found.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-[200px]" style={{ background: '#040403', position: 'relative', zIndex: 1, visibility: 'visible' }}>
      <div className="max-w-[1520px] mx-auto">
        {/* Header */}
        <ScrollAnimation direction="up" delay={0.1}>
          <div className="mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight sm:leading-[70px] mb-2 sm:mb-4" style={{ color: '#EEF4ED' }}>
              Projects
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl font-normal" style={{ color: '#EEF4ED', opacity: 0.7 }}>
              we make apps, websites, and webapps with AI code editors and human interaction
            </p>
          </div>
        </ScrollAnimation>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <ScrollAnimation key={project.slug} direction="up" delay={0.2 + index * 0.1}>
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
                <div className="w-full h-full flex items-center justify-center relative rounded-xl sm:rounded-2xl" style={{ background: '#0a0a09', color: '#EEF4ED' }}>
                  {project.heroImage ? (
                    <Image 
                      src={project.heroImage} 
                      alt={project.title} 
                      fill
                      className="object-cover rounded-xl sm:rounded-2xl"
                      sizes="(max-width: 768px) 100vw, 1520px"
                      priority={index === 0}
                    />
                  ) : (
                    <span style={{ opacity: 0.5 }}>Project Image</span>
                  )}
                </div>
              </Link>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}

