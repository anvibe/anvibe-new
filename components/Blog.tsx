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
    <section id="blog" className="py-24 px-6 sm:px-8" style={{ background: '#040403' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ScrollAnimation direction="up" delay={0.1}>
          <div className="flex flex-col md:flex-row justify-between items-start mb-16">
            <div className="mb-8 md:mb-0">
              <h2 className="text-5xl md:text-6xl font-bold mb-4" style={{ color: '#EEF4ED' }}>
                Creative dispatch
              </h2>
              <p className="text-xl max-w-md mb-6" style={{ color: '#EEF4ED' }}>
                Insights, inspiration, and ideas—straight from our studio.
              </p>
              <Link 
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 rounded-full transition-colors hover:bg-[rgba(10,10,9,0.5)]" 
                style={{ borderColor: '#0f0f0e', color: '#EEF4ED' }}>
                Visit Blog
                <ArrowRight size={20} style={{ color: '#EEF4ED' }} />
              </Link>
            </div>
          </div>
        </ScrollAnimation>

        {/* Blog Posts */}
        {blogPosts.length === 0 ? (
          <div className="text-center py-20">
            <p style={{ color: '#EEF4ED', opacity: 0.7 }}>No blog posts found.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <ScrollAnimation key={post.slug} direction="up" delay={0.2 + index * 0.05}>
                <Link href={`/blog/${post.slug}`}>
                  <article className="group cursor-pointer hover:opacity-80 transition-opacity">
                    <div className="flex gap-6">
                      <div className="flex-shrink-0 w-40 h-40 rounded-lg overflow-hidden relative" style={{ background: '#030302' }}>
                        {post.image ? (
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                            sizes="160px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center" style={{ color: '#EEF4ED', opacity: 0.5 }}>
                            Image
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm mb-3" style={{ color: '#EEF4ED', opacity: 0.7 }}>
                          {post.date}
                        </p>
                        <h3 className="text-xl font-semibold leading-tight transition-colors group-hover:opacity-80" style={{ color: '#EEF4ED' }}>
                          {post.title}
                        </h3>
                        {post.excerpt && (
                          <p className="text-sm mt-2" style={{ color: '#EEF4ED', opacity: 0.6 }}>
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

