import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import ScrollAnimation from './ScrollAnimation'
import { getBlogPosts, BlogPost } from '@/lib/content'

export default function Blog() {
  let blogPosts: BlogPost[] = []
  try {
    blogPosts = getBlogPosts().slice(0, 6) // Show latest 6 posts on homepage
  } catch (error) {
    console.error('Error loading blog posts:', error)
    blogPosts = []
  }

  return (
    <section id="blog" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-[200px]" style={{ background: '#040403' }}>
      <div className="max-w-[1520px] mx-auto">
        {/* Header */}
        <ScrollAnimation direction="up" delay={0.1}>
          <div className="flex flex-col md:flex-row justify-between items-start mb-8 sm:mb-12 md:mb-16 gap-6">
            <div className="mb-4 sm:mb-8 md:mb-0">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight sm:leading-[70px]" style={{ color: '#EEF4ED' }}>
                Latest Insights & Updates
              </h2>
              <p className="text-lg sm:text-xl max-w-md mb-4 sm:mb-6" style={{ color: '#EEF4ED' }}>
                Stay updated with the latest insights about AI-powered development
              </p>
              <Link 
                href="/blog"
                className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 border-2 rounded-full transition-colors hover:bg-[rgba(10,10,9,0.5)] text-sm sm:text-base" 
                style={{ borderColor: '#0f0f0e', color: '#EEF4ED' }}>
                Visit Blog
                <ArrowRight size={18} className="sm:w-5 sm:h-5" style={{ color: '#EEF4ED' }} />
              </Link>
            </div>
          </div>
        </ScrollAnimation>

        {/* Blog Posts */}
        {blogPosts.length === 0 ? (
          <div className="text-center py-12 sm:py-20">
            <p style={{ color: '#EEF4ED', opacity: 0.7 }}>No blog posts found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {blogPosts.map((post, index) => (
              <ScrollAnimation key={post.slug} direction="up" delay={0.2 + index * 0.05}>
                <Link href={`/blog/${post.slug}`}>
                  <article className="group cursor-pointer hover:opacity-80 transition-opacity">
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      <div className="flex-shrink-0 w-full sm:w-32 md:w-40 h-32 sm:h-32 md:h-40 rounded-lg overflow-hidden relative" style={{ background: '#030302' }}>
                        {post.image ? (
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 128px, 160px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center" style={{ color: '#EEF4ED', opacity: 0.5 }}>
                            Image
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm mb-2 sm:mb-3" style={{ color: '#EEF4ED', opacity: 0.7 }}>
                          {post.date}
                        </p>
                        <h3 className="text-lg sm:text-xl font-bold leading-tight transition-colors group-hover:opacity-80" style={{ color: '#EEF4ED', fontFamily: 'Inter, sans-serif' }}>
                          {post.title}
                        </h3>
                        {post.excerpt && (
                          <p className="text-xs sm:text-sm mt-2" style={{ color: '#EEF4ED', opacity: 0.6 }}>
                            {post.excerpt}
                          </p>
                        )}
                      </div>
                    </div>
                  </article>
                </Link>
              </ScrollAnimation>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

