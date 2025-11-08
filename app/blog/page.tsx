import Link from 'next/link'
import Image from 'next/image'
import { getBlogPosts } from '@/lib/content'
import ScrollAnimation from '@/components/ScrollAnimation'
import Footer from '@/components/Footer'
import Contact from '@/components/Contact'
import PageNav from '@/components/PageNav'
import NoiseBackground from '@/components/NoiseBackground'

export default async function BlogPage() {
  const posts = getBlogPosts()

  return (
    <main className="min-h-screen relative" style={{ background: '#040403' }}>
      {/* Noise Background Animation */}
      <NoiseBackground />
      
      {/* Navigation */}
      <PageNav />

      {/* Header */}
      <section className="pt-32 pb-20 px-4 sm:px-6 md:px-8 lg:px-[200px]">
        <div className="max-w-[1520px] mx-auto">
            <ScrollAnimation direction="up" delay={0.1}>
              <div className="mb-16">
                <div className="mb-6">
                  <div className="box-border inline-flex h-[40px] sm:h-[49px] items-center justify-center px-4 sm:px-[17px] py-0 rounded-2xl sm:rounded-3xl" style={{ backgroundColor: '#000000', color: '#EEF4ED' }}>
                    <span className="text-sm sm:text-base">Blog</span>
                  </div>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold mb-8" style={{ color: '#EEF4ED' }}>
                  Latest Insights & Updates
                </h1>
                <p className="text-xl max-w-md" style={{ color: '#EEF4ED', opacity: 0.8 }}>
                  Stay updated with the latest insights about AI-powered development
                </p>
              </div>
            </ScrollAnimation>

            {/* Blog Posts Grid */}
            {posts.length === 0 ? (
              <div className="text-center py-20">
                <p style={{ color: '#EEF4ED', opacity: 0.7 }}>No blog posts found.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                  <ScrollAnimation key={post.slug} direction="up" delay={0.2 + index * 0.05}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group cursor-pointer hover:opacity-80 transition-opacity block"
                    >
                      <article>
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
                            <h3 className="text-xl font-bold leading-tight transition-colors group-hover:opacity-80" style={{ color: '#EEF4ED', fontFamily: 'Inter, sans-serif' }}>
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

      {/* Contact */}
      <Contact />

      {/* Footer */}
      <Footer />
    </main>
  )
}

