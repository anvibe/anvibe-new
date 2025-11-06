import Link from 'next/link'
import Image from 'next/image'
import { getProjects, Project } from '@/lib/content'

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
      <section id="projects" className="py-24 px-0" style={{ background: '#040403' }}>
        <div className="w-full">
          <div className="text-center" style={{ color: '#EEF4ED', opacity: 0.7 }}>
            <p>No projects found.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="py-0 px-0" style={{ background: '#040403' }}>
      <div className="w-full">
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {projects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group relative overflow-hidden aspect-video cursor-pointer block"
              style={{ background: '#030302' }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                  <h3 className="text-2xl font-semibold" style={{ color: '#EEF4ED' }}>{project.title}</h3>
                </div>
              </div>
              <div className="w-full h-full flex items-center justify-center relative" style={{ background: '#0a0a09', color: '#EEF4ED', opacity: 0.5 }}>
                {project.heroImage ? (
                  <Image 
                    src={project.heroImage} 
                    alt={project.title} 
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 1520px"
                    priority={index === 0}
                  />
                ) : (
                  <span>Project Image</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

