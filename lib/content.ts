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

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt?: string
  image: string
  author?: string
  content: string
}

export function getBlogPosts(): BlogPost[] {
  try {
    const blogDir = path.join(contentDirectory, 'blog')
    
    if (!fs.existsSync(blogDir)) {
      console.warn('Blog directory does not exist:', blogDir)
      return []
    }
    
    const files = fs.readdirSync(blogDir)
    
    if (files.length === 0) {
      console.warn('No markdown files found in blog directory')
      return []
    }
    
    return files
      .filter((filename) => filename.endsWith('.md'))
      .map((filename) => {
        try {
          const filePath = path.join(blogDir, filename)
          const fileContents = fs.readFileSync(filePath, 'utf8')
          const { data, content } = matter(fileContents)
          
          return {
            slug: filename.replace('.md', ''),
            title: data.title || '',
            date: data.date || '',
            excerpt: data.excerpt || '',
            image: data.image || '',
            author: data.author || 'Anvibe Team',
            content: content || '',
          } as BlogPost
        } catch (error) {
          console.error(`Error parsing blog file ${filename}:`, error)
          return null
        }
      })
      .filter((post): post is BlogPost => post !== null)
      .sort((a, b) => {
        // Sort by date (newest first)
        const dateA = new Date(a.date).getTime()
        const dateB = new Date(b.date).getTime()
        // Handle invalid dates by putting them last
        if (isNaN(dateA) && isNaN(dateB)) return 0
        if (isNaN(dateA)) return 1
        if (isNaN(dateB)) return -1
        return dateB - dateA
      })
  } catch (error) {
    console.error('Error in getBlogPosts:', error)
    return []
  }
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const posts = getBlogPosts()
  return posts.find((post) => post.slug === slug) || null
}

export function getAllBlogSlugs(): string[] {
  const posts = getBlogPosts()
  return posts.map((post) => post.slug)
}

