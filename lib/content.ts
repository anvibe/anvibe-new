import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'content')

export interface Project {
  slug: string
  title: string
  year: string
  scope: string
  timeline: string
  liveUrl?: string
  description: string
  heroImage: string
  images: string[]
  content: string
}

export function getProjects(): Project[] {
  try {
    const projectsDir = path.join(contentDirectory, 'projects')
    
    if (!fs.existsSync(projectsDir)) {
      console.warn('Projects directory does not exist:', projectsDir)
      return []
    }
    
    const files = fs.readdirSync(projectsDir)
    
    if (files.length === 0) {
      console.warn('No markdown files found in projects directory')
      return []
    }
    
    return files
      .filter((filename) => filename.endsWith('.md'))
      .map((filename) => {
        try {
          const filePath = path.join(projectsDir, filename)
          const fileContents = fs.readFileSync(filePath, 'utf8')
          const { data, content } = matter(fileContents)
          
          return {
            slug: filename.replace('.md', ''),
            title: data.title || '',
            year: data.year || '',
            scope: data.scope || '',
            timeline: data.timeline || '',
            liveUrl: data.liveUrl,
            description: data.description || '',
            heroImage: data.heroImage || '',
            images: data.images || [],
            content: content || '',
          } as Project
        } catch (error) {
          console.error(`Error parsing project file ${filename}:`, error)
          return null
        }
      })
      .filter((project): project is Project => project !== null)
      .sort((a, b) => {
        // Sort by year (newest first)
        return b.year.localeCompare(a.year)
      })
  } catch (error) {
    console.error('Error in getProjects:', error)
    return []
  }
}

export function getProjectBySlug(slug: string): Project | null {
  const projects = getProjects()
  return projects.find((project) => project.slug === slug) || null
}

export function getAllProjectSlugs(): string[] {
  const projects = getProjects()
  return projects.map((project) => project.slug)
}

