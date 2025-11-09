import { getProjects, Project } from '@/lib/content'
import ScrollAnimation from './ScrollAnimation'
import ProjectCard from './ProjectCard'

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
    <section id="projects" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-[200px]" style={{ background: '#040403' }}>
      <div className="max-w-[1520px] mx-auto">
        {/* Header */}
        <ScrollAnimation direction="up" delay={0.1}>
          <div className="mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight sm:leading-[70px] mb-2 sm:mb-4" style={{ color: '#EEF4ED' }}>
              Projects
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl font-normal" style={{ color: '#EEF4ED', opacity: 0.7 }}>
              we make apps 📱, websites 🌐, and webapps 💻 with AI code editors 🤖 and human interaction 👥
            </p>
          </div>
        </ScrollAnimation>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <ScrollAnimation key={project.slug} direction="up" delay={0.2 + index * 0.1}>
              <ProjectCard project={project} index={index} />
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}

