import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getProjectBySlug, getAllProjectSlugs, getProjects } from '@/lib/content'
import { ExternalLink } from 'lucide-react'
import Footer from '@/components/Footer'
import Contact from '@/components/Contact'
import ProjectNav from '@/components/ProjectNav'
import TextScramble from '@/components/TextScramble'

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = getProjectBySlug(params.slug)
  
  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: `${project.title} - Anvibe`,
    description: project.description,
  }
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)
  const allProjects = getProjects()
  const otherProjects = allProjects.filter((p) => p.slug !== project?.slug).slice(0, 2)

  if (!project) {
    return <div>Project not found</div>
  }

  return (
    <main className="min-h-screen" style={{ background: '#040403' }}>
      {/* Navigation */}
      <ProjectNav />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-[1520px] mx-auto">
            {/* Project Header */}
            <div className="mb-20">
              <h1 className="text-6xl md:text-7xl font-bold mb-12 tracking-tight" style={{ color: '#EEF4ED' }}>
                {project.title}
              </h1>
              
              <div className="flex flex-col md:flex-row gap-8 md:items-center">
                {/* Description */}
                <div className="max-w-[410px]">
                  <p className="text-base leading-relaxed" style={{ color: '#EEF4ED', opacity: 0.8 }}>
                    {project.description}
                  </p>
                </div>

                {/* Metadata */}
                <div className="flex flex-wrap gap-8 items-center md:ml-auto">
                  <div className="flex flex-col gap-1 py-4">
                    <span className="text-xs" style={{ color: '#EEF4ED', opacity: 0.7 }}>Year</span>
                    <span className="text-sm font-medium" style={{ color: '#EEF4ED' }}>{project.year}</span>
                  </div>
                  <div className="h-12 w-px" style={{ backgroundColor: 'rgba(238, 244, 237, 0.2)' }}></div>
                  <div className="flex flex-col gap-1 py-4">
                    <span className="text-xs" style={{ color: '#EEF4ED', opacity: 0.7 }}>Scope</span>
                    <span className="text-sm font-medium" style={{ color: '#EEF4ED' }}>{project.scope}</span>
                  </div>
                  <div className="h-12 w-px" style={{ backgroundColor: 'rgba(238, 244, 237, 0.2)' }}></div>
                  <div className="flex flex-col gap-1 py-4">
                    <span className="text-xs" style={{ color: '#EEF4ED', opacity: 0.7 }}>Timeline</span>
                    <span className="text-sm font-medium" style={{ color: '#EEF4ED' }}>{project.timeline}</span>
                  </div>
                  <div className="h-12 w-px" style={{ backgroundColor: 'rgba(238, 244, 237, 0.2)' }}></div>
                  {project.liveUrl && (
                    <div className="flex flex-col gap-1 py-4">
                      <span className="text-xs" style={{ color: '#EEF4ED', opacity: 0.7 }}>Live project</span>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity"
                        style={{ color: '#EEF4ED' }}
                      >
                        Preview
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="bg-white rounded-2xl p-2 mb-16">
              <div className="rounded-xl overflow-hidden aspect-video relative" style={{ background: '#030302' }}>
                {project.heroImage ? (
                  <Image 
                    src={project.heroImage} 
                    alt={project.title} 
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 1520px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" style={{ color: '#EEF4ED', opacity: 0.5 }}>
                    Hero Image
                  </div>
                )}
              </div>
            </div>

            {/* Content Section */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#EEF4ED' }}>
                Global Brand Transformation
              </h2>
              <div className="max-w-[550px]">
                <p className="text-base leading-relaxed" style={{ color: '#EEF4ED', opacity: 0.8 }}>
                  {project.content.split('\n\n')[0]}
                </p>
              </div>
            </div>

            {/* Project Images Grid */}
            {project.images && project.images.length > 0 && (
              <div className="space-y-2 mb-16">
                {project.images.map((image, index) => (
                  <div key={index} className="bg-white rounded-xl p-2">
                    <div className="rounded-lg overflow-hidden aspect-video relative" style={{ background: '#030302' }}>
                      <Image 
                        src={image} 
                        alt={`${project.title} - Image ${index + 1}`} 
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 1520px"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* More Projects Section */}
      {otherProjects.length > 0 && (
        <section className="py-24 px-6 sm:px-8" style={{ background: '#040403' }}>
          <div className="max-w-7xl mx-auto">
            <div className="max-w-[1520px] mx-auto">
              <h2 className="text-5xl md:text-6xl font-bold mb-12" style={{ color: '#EEF4ED' }}>
                More projects.
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {otherProjects.map((otherProject) => (
                  <Link
                    key={otherProject.slug}
                    href={`/projects/${otherProject.slug}`}
                    className="group relative overflow-hidden rounded-xl aspect-[718/566] cursor-pointer block"
                    style={{ background: '#030302' }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="bg-white/50 backdrop-blur-md rounded-3xl px-6 py-3">
                        <h3 className="text-base font-medium" style={{ color: '#EEF4ED' }}>{otherProject.title}</h3>
                      </div>
                    </div>
                    <div className="w-full h-full flex items-center justify-center relative" style={{ background: '#0a0a09', color: '#EEF4ED', opacity: 0.5 }}>
                      {otherProject.heroImage ? (
                        <Image 
                          src={otherProject.heroImage} 
                          alt={otherProject.title} 
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 718px"
                        />
                      ) : (
                        <span>Project Image</span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <div className="bg-[#1e1e1e] rounded-2xl mx-6 sm:mx-8 mb-8 p-12 md:p-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40 blur-3xl">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(41, 31, 30, 0.2), rgba(41, 31, 30, 0.3), rgba(41, 31, 30, 0.2))' }}></div>
        </div>
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: '#EEF4ED' }}>Let&apos;s talk</h2>
          <p className="text-lg mb-8" style={{ color: '#EEF4ED', opacity: 0.9 }}>
            We'd love to hear from you — whether you have a project in mind, or just want to say hi.
          </p>
          <div className="bg-black/10 border border-white/6 rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex -space-x-3">
                <div className="w-14 h-14 rounded-xl border-2 overflow-hidden relative" style={{ background: '#030302', borderColor: '#0f0f0e' }}>
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=56&h=56&fit=crop&crop=faces"
                    alt="Team member"
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div className="w-14 h-14 rounded-xl border-2 overflow-hidden relative" style={{ background: '#030302', borderColor: '#0f0f0e' }}>
                  <Image
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=56&h=56&fit=crop&crop=faces"
                    alt="Team member"
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div className="w-14 h-14 rounded-xl border-2 overflow-hidden relative" style={{ background: '#030302', borderColor: '#0f0f0e' }}>
                  <Image
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=56&h=56&fit=crop&crop=faces"
                    alt="Team member"
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
              </div>
              <p className="text-sm" style={{ color: '#EEF4ED', opacity: 0.8 }}>
                Get a detailed plan from our team within <span style={{ color: '#EEF4ED' }}>24 hours.</span>
              </p>
            </div>
            <form className="space-y-5">
              <input
                type="text"
                placeholder="Name"
                className="w-full bg-white/4 border border-white/4 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-white/20"
                style={{ color: '#EEF4ED' }}
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-white/4 border border-white/4 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-white/20"
                style={{ color: '#EEF4ED' }}
              />
              <textarea
                placeholder="Project details"
                rows={4}
                className="w-full bg-white/4 border border-white/4 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none"
                style={{ color: '#EEF4ED' }}
              />
              <button
                type="submit"
                className="w-full bg-white text-[#1e1e1e] rounded-3xl py-4 font-medium hover:bg-slate-100 transition-colors"
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Contact */}
      <Contact />

      {/* Footer */}
      <Footer />
    </main>
  )
}
