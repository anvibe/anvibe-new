import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getBlogPostBySlug, getAllBlogSlugs, getBlogPosts } from '@/lib/content'
import BlogNav from '@/components/BlogNav'
import Footer from '@/components/Footer'
import { remark } from 'remark'
import html from 'remark-html'

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} - Anvibe Blog`,
    description: post.excerpt || post.title,
  }
}

async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug)
  const allPosts = getBlogPosts()
  const otherPosts = allPosts.filter((p) => p.slug !== post?.slug).slice(0, 3)

  if (!post) {
    return (
      <main className="min-h-screen" style={{ background: '#040403' }}>
        <BlogNav />
        <div className="pt-32 px-6 sm:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#EEF4ED' }}>Post not found</h1>
          <p style={{ color: '#EEF4ED', opacity: 0.7 }}>The blog post you're looking for doesn't exist.</p>
        </div>
      </main>
    )
  }

  const contentHtml = await markdownToHtml(post.content)

  return (
    <main className="min-h-screen" style={{ background: '#040403' }}>
      {/* Navigation */}
      <BlogNav />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-[1520px] mx-auto">
            {/* Post Header */}
            <div className="mb-12">
              <p className="text-sm mb-6" style={{ color: '#EEF4ED', opacity: 0.7 }}>
                {post.date} {post.author && `• ${post.author}`}
              </p>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight" style={{ color: '#EEF4ED', fontFamily: 'Inter, sans-serif', lineHeight: '1.2' }}>
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="text-xl max-w-2xl" style={{ color: '#EEF4ED', opacity: 0.8 }}>
                  {post.excerpt}
                </p>
              )}
            </div>

            {/* Hero Image */}
            {post.image && (
              <div className="bg-white rounded-2xl p-2 mb-16">
                <div className="rounded-xl overflow-hidden aspect-video relative" style={{ background: '#030302' }}>
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 1520px"
                    priority
                  />
                </div>
              </div>
            )}

            {/* Content Section */}
            <div className="max-w-3xl mx-auto">
              <div 
                className="prose prose-invert max-w-none"
                style={{ 
                  color: '#EEF4ED',
                }}
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* More Posts Section */}
      {otherPosts.length > 0 && (
        <section className="py-24 px-6 sm:px-8" style={{ background: '#040403' }}>
          <div className="max-w-7xl mx-auto">
            <div className="max-w-[1520px] mx-auto">
              <h2 className="text-5xl md:text-6xl font-bold mb-12" style={{ color: '#EEF4ED' }}>
                More posts.
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherPosts.map((otherPost) => (
                  <Link
                    key={otherPost.slug}
                    href={`/blog/${otherPost.slug}`}
                    className="group cursor-pointer hover:opacity-80 transition-opacity block"
                  >
                    <article>
                      <div className="flex gap-6">
                        <div className="flex-shrink-0 w-40 h-40 rounded-lg overflow-hidden relative" style={{ background: '#030302' }}>
                          {otherPost.image ? (
                            <Image
                              src={otherPost.image}
                              alt={otherPost.title}
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
                            {otherPost.date}
                          </p>
                          <h3 className="text-xl font-semibold leading-tight transition-colors group-hover:opacity-80" style={{ color: '#EEF4ED' }}>
                            {otherPost.title}
                          </h3>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <Footer />
    </main>
  )
}

