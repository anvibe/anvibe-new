'use client'

import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import ScrollAnimation from './ScrollAnimation'

const blogPosts = [
  {
    title: 'Plant with intention. Start with strategy, not just aesthetics.',
    date: 'May 16, 2025',
    image: 'https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?w=168&h=165&fit=crop',
  },
  {
    title: 'The unexpected moments are where the magic happens.',
    date: 'May 17, 2025',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=168&h=165&fit=crop',
  },
  {
    title: "Why Good Branding Isn't Just a Logo (And What You Actually Need)",
    date: 'May 18, 2025',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=168&h=165&fit=crop',
  },
  {
    title: 'From Idea to Iconic: How to Build a Brand People Obsess Over',
    date: 'May 19, 2025',
    image: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=168&h=165&fit=crop',
  },
  {
    title: "How to Craft a Brand Voice That Doesn't Sound Like Everyone Else",
    date: 'May 20, 2025',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=168&h=165&fit=crop',
  },
  {
    title: 'The Secret Sauce Behind Scroll-Stopping Websites',
    date: 'May 21, 2025',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=168&h=165&fit=crop',
  },
]

export default function Blog() {
  return (
    <section className="py-24 px-6 sm:px-8" style={{ background: '#040403' }}>
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
              <button className="flex items-center gap-2 px-6 py-3 border-2 rounded-full transition-colors" style={{ borderColor: '#0f0f0e', color: '#EEF4ED' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(10, 10, 9, 0.5)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                Visit Blog
                <ArrowRight size={20} style={{ color: '#EEF4ED' }} />
              </button>
            </div>
          </div>
        </ScrollAnimation>

        {/* Blog Posts */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <ScrollAnimation key={index} direction="up" delay={0.2 + index * 0.05}>
            <article
              className="group cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-40 h-40 rounded-lg overflow-hidden relative" style={{ background: '#030302' }}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm mb-3" style={{ color: '#EEF4ED' }}>
                    {post.date}
                  </p>
                  <h3 className="text-xl font-semibold leading-tight transition-colors group-hover:opacity-80" style={{ color: '#EEF4ED' }}>
                    {post.title}
                  </h3>
                </div>
              </div>
            </article>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}

