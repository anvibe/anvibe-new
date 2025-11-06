'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Footer from '@/components/Footer'
import ScrollAnimation from '@/components/ScrollAnimation'

export default function VibecodingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <main className="min-h-screen" style={{ background: '#040403' }}>
      {/* Navigation */}
      <nav ref={menuRef} className="fixed top-0 left-0 right-0 z-50 py-3 sm:py-4 px-4 sm:px-6 md:px-8">
        <div className="max-w-full mx-auto">
          <div className="flex items-center justify-between h-10 sm:h-12">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Link href="/" className="text-xl sm:text-2xl font-bold boldonse-regular text-white">Anvibe</Link>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="relative"
            >
              <motion.button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex flex-col gap-[9px] h-10 items-end justify-center w-12 sm:w-16 relative z-50"
                aria-label="Toggle menu"
              >
                <div className="relative w-12 sm:w-16 h-[18px] flex items-center justify-end">
                  {/* Top bar */}
                  <motion.div
                    className="bg-white h-[2px] rounded-full absolute right-0"
                    initial={{ width: 48, y: 0, rotate: 0 }}
                    animate={isMenuOpen ? { width: 20, y: 8, rotate: 45 } : { width: 48, y: 0, rotate: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                  {/* Bottom bar */}
                  <motion.div
                    className="bg-white h-[2px] rounded-full absolute right-0"
                    initial={{ width: 28, y: 9, rotate: 0 }}
                    animate={isMenuOpen ? { width: 20, y: 8, rotate: -45 } : { width: 28, y: 9, rotate: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </motion.button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute top-full right-0 mt-4 bg-black/95 backdrop-blur-md border border-white/10 shadow-lg overflow-hidden rounded-lg min-w-[180px] sm:min-w-[200px]"
                  >
                    <div className="px-4 sm:px-6 py-6 sm:py-8">
                      <div className="flex flex-col gap-4 sm:gap-6">
                        {[
                          { href: '/', label: 'Home' },
                          { href: '/#projects', label: 'Works (8)' },
                          { href: '/about', label: 'About' },
                          { href: '/vibecoding', label: 'Vibecoding' },
                          { href: '/blog', label: 'Blog' },
                          { href: '/#contact', label: 'Contact' },
                        ].map((item, index) => (
                          <motion.div
                            key={item.href}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.3 }}
                          >
                            <Link 
                              href={item.href}
                              onClick={() => setIsMenuOpen(false)}
                              className="text-lg sm:text-xl font-medium text-white hover:text-white/80 transition-colors"
                            >
                              {item.label}
                            </Link>
                          </motion.div>
                        ))}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4, duration: 0.3 }}
                          className="pt-4 border-t border-white/10"
                        >
                          <a 
                            href="mailto:hello@anvibe.io" 
                            className="text-lg sm:text-xl font-medium text-white hover:text-white/80 transition-colors"
                          >
                            hello@anvibe.io
                          </a>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 md:pt-[144px] pb-6 sm:pb-8 px-4 sm:px-6 md:px-8 lg:px-[200px]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-[1520px] mx-auto">
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="flex flex-col gap-4 sm:gap-6 items-center mb-6 sm:mb-8 md:mb-10"
            >
              {/* Vibecoding Badge */}
              <div className="box-border flex h-[40px] sm:h-[49px] items-center justify-center px-4 sm:px-[17px] py-0 rounded-br-[20px] rounded-tl-[20px] sm:rounded-br-[24px] sm:rounded-tl-[24px] hero-gradient">
                <span className="text-sm sm:text-base font-bold" style={{ color: '#FFFFFF' }}>Vibecoding</span>
              </div>

              {/* Heading */}
              <div className="flex flex-col items-center text-center max-w-full gap-4 sm:gap-6 md:gap-8 px-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold tracking-[-0.5px] sm:tracking-[-1.8px] leading-relaxed sm:!leading-[1.3] md:!leading-[1.4]" style={{ 
                  background: 'linear-gradient(135deg, #3060eb 0%, #8f35ea 50%, #E1A0FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  What is Vibecoding?
                </h1>
                <p className="text-base sm:text-lg md:text-xl max-w-3xl" style={{ color: '#EEF4ED', opacity: 0.9 }}>
                  Vibecoding is the revolutionary approach to software development that combines human creativity with AI-powered code editors to create extraordinary digital experiences faster than ever before.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Vibecoding Philosophy */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-[200px] pb-12 sm:pb-16 pt-12 sm:pt-16">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-[1520px] mx-auto">
            <ScrollAnimation direction="up" delay={0.1}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[45px] font-bold mb-6 sm:mb-8 md:mb-10 leading-relaxed sm:!leading-[1.3] md:!leading-[1.4]" style={{ color: '#EEF4ED' }}>
                The Vibecoding Philosophy
              </h2>
              <p className="text-sm sm:text-[15.4px] leading-[18px] sm:leading-[20.8px] max-w-full sm:max-w-[600px] mb-6 sm:mb-8" style={{ color: '#EEF4ED', opacity: 0.8 }}>
                Vibecoding represents a paradigm shift from traditional coding to AI-enhanced development. It&apos;s about finding your flow state with AI code editors, where ideas transform into code at the speed of thought.
              </p>
              <p className="text-sm sm:text-[15.4px] leading-[18px] sm:leading-[20.8px] max-w-full sm:max-w-[600px] mb-8 sm:mb-10" style={{ color: '#EEF4ED', opacity: 0.8 }}>
                Vibe coders don&apos;t just write code—they orchestrate AI tools to bring their creative visions to life, focusing on innovation rather than syntax.
              </p>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ 
                background: 'linear-gradient(135deg, #3060eb 0%, #8f35ea 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Human + AI = Vibecoding
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-[200px] pb-12 sm:pb-16 pt-8 sm:pt-12">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-[1520px] mx-auto">
            {/* Header */}
            <ScrollAnimation direction="up" delay={0.1}>
              <div className="flex flex-col gap-2 sm:gap-2.5 items-start mb-6 sm:mb-8 md:mb-10 max-w-full sm:max-w-[530px] px-4 sm:px-0">
                <div className="box-border flex h-[40px] sm:h-[49px] items-center justify-center px-4 sm:px-[17px] py-0 rounded-br-[20px] rounded-tl-[20px] sm:rounded-br-[24px] sm:rounded-tl-[24px]" style={{ background: 'linear-gradient(135deg, #7EA6F0 0%, #3060eb 100%)' }}>
                  <span className="text-sm sm:text-base font-bold" style={{ color: '#FFFFFF' }}>Core Principles</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[57px] font-bold leading-relaxed sm:!leading-[1.3] md:!leading-[1.4] tracking-[-0.5px] sm:tracking-[-1.8px]" style={{ color: '#EEF4ED' }}>
                  Core Principles of Vibecoding
                </h2>
              </div>
            </ScrollAnimation>

            {/* Principles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {[
                { 
                  title: 'Speed & Flow', 
                  description: 'Vibecoding prioritizes maintaining creative flow and rapid iteration over perfect syntax' 
                },
                { 
                  title: 'AI Collaboration', 
                  description: 'Working symbiotically with AI tools as creative partners, not just code generators' 
                },
                { 
                  title: 'Creative Expression', 
                  description: 'Focusing on the \'what\' and \'why\' while AI handles the \'how\' of implementation' 
                }
              ].map((principle, index) => {
                const colors = [
                  { bg: 'linear-gradient(135deg, rgba(126, 166, 240, 0.1) 0%, rgba(48, 96, 235, 0.1) 100%)', border: '#7EA6F0' },
                  { bg: 'linear-gradient(135deg, rgba(225, 160, 255, 0.1) 0%, rgba(143, 53, 234, 0.1) 100%)', border: '#E1A0FF' },
                  { bg: 'linear-gradient(135deg, rgba(75, 215, 96, 0.1) 0%, rgba(48, 96, 235, 0.1) 100%)', border: '#4BD760' }
                ]
                return (
                  <ScrollAnimation key={index} direction="up" delay={0.2 + index * 0.1}>
                    <div className="rounded-lg sm:rounded-xl p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col border-2 transition-all hover:scale-[1.02]" style={{ 
                      background: colors[index].bg,
                      borderColor: colors[index].border,
                      backdropFilter: 'blur(10px)'
                    }}>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-5 sm:mb-6 md:mb-8 leading-relaxed sm:leading-[1.4]" style={{ 
                        color: colors[index].border,
                        fontFamily: 'Inter, sans-serif' 
                      }}>
                        {principle.title}
                      </h3>
                      <p className="text-sm sm:text-[15.4px] leading-[18px] sm:leading-[20.8px]" style={{ color: '#EEF4ED', opacity: 0.9 }}>
                        {principle.description}
                      </p>
                    </div>
                  </ScrollAnimation>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-[200px] pb-12 sm:pb-16 pt-8 sm:pt-12">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-[1520px] mx-auto">
            {/* Header */}
            <ScrollAnimation direction="up" delay={0.1}>
              <div className="flex flex-col gap-2 sm:gap-2.5 items-center mb-6 sm:mb-8 md:mb-10 max-w-full sm:max-w-[530px] mx-auto px-4 sm:px-0">
                <div className="box-border flex h-[40px] sm:h-[49px] items-center justify-center px-4 sm:px-[17px] py-0 rounded-br-[20px] rounded-tl-[20px] sm:rounded-br-[24px] sm:rounded-tl-[24px]" style={{ background: 'linear-gradient(135deg, #FD5C5C 0%, #E28F2F 100%)' }}>
                  <span className="text-sm sm:text-base text-center font-bold" style={{ color: '#FFFFFF' }}>Comparison</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[57px] font-bold text-center leading-relaxed sm:!leading-[1.3] md:!leading-[1.4] tracking-[-0.5px] sm:tracking-[-1.8px]" style={{ color: '#EEF4ED' }}>
                  Vibecoding vs Traditional Coding
                </h2>
              </div>
            </ScrollAnimation>

            {/* Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              <ScrollAnimation direction="left" delay={0.2}>
                <div className="rounded-lg sm:rounded-xl p-6 sm:p-8 md:p-10 lg:p-12 border-2 transition-all hover:scale-[1.02]" style={{ 
                  background: 'linear-gradient(135deg, rgba(48, 96, 235, 0.15) 0%, rgba(143, 53, 234, 0.15) 100%)',
                  borderColor: '#8f35ea',
                  backdropFilter: 'blur(10px)'
                }}>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-6 sm:mb-8 md:mb-10 leading-relaxed sm:leading-[1.4]" style={{ 
                    background: 'linear-gradient(135deg, #3060eb 0%, #8f35ea 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontFamily: 'Inter, sans-serif' 
                  }}>
                    Vibecoding Approach
                  </h3>
                  <ul className="space-y-4 sm:space-y-5">
                    {[
                      'Natural language prompts to generate code',
                      'AI-assisted debugging and optimization',
                      'Rapid prototyping and iteration',
                      'Focus on creative problem-solving',
                      'Collaborative AI partnership'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="mt-1 text-xl" style={{ color: '#4BD760' }}>✓</span>
                        <span className="text-sm sm:text-[15.4px] leading-[18px] sm:leading-[20.8px]" style={{ color: '#EEF4ED', opacity: 0.9 }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollAnimation>
              <ScrollAnimation direction="right" delay={0.2}>
                <div className="rounded-lg sm:rounded-xl p-6 sm:p-8 md:p-10 lg:p-12 border-2 transition-all hover:scale-[1.02]" style={{ 
                  background: 'linear-gradient(135deg, rgba(253, 92, 92, 0.1) 0%, rgba(226, 143, 47, 0.1) 100%)',
                  borderColor: '#FD5C5C',
                  backdropFilter: 'blur(10px)'
                }}>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-6 sm:mb-8 md:mb-10 leading-relaxed sm:leading-[1.4]" style={{ color: '#FD5C5C', fontFamily: 'Inter, sans-serif' }}>
                    Traditional Coding
                  </h3>
                  <ul className="space-y-4 sm:space-y-5">
                    {[
                      'Manual syntax writing and debugging',
                      'Extensive documentation research',
                      'Time-intensive development cycles',
                      'Focus on technical implementation',
                      'Individual problem-solving'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="mt-1 text-xl" style={{ color: '#FD5C5C' }}>•</span>
                        <span className="text-sm sm:text-[15.4px] leading-[18px] sm:leading-[20.8px]" style={{ color: '#EEF4ED', opacity: 0.7 }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tools */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-[200px] pb-12 sm:pb-16 pt-8 sm:pt-12">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-[1520px] mx-auto">
            {/* Header */}
            <ScrollAnimation direction="up" delay={0.1}>
              <div className="flex flex-col gap-2 sm:gap-2.5 items-start mb-6 sm:mb-8 md:mb-10 max-w-full sm:max-w-[530px] px-4 sm:px-0">
                <div className="box-border flex h-[40px] sm:h-[49px] items-center justify-center px-4 sm:px-[17px] py-0 rounded-br-[20px] rounded-tl-[20px] sm:rounded-br-[24px] sm:rounded-tl-[24px]" style={{ background: 'linear-gradient(135deg, #E1A0FF 0%, #8f35ea 100%)' }}>
                  <span className="text-sm sm:text-base font-bold" style={{ color: '#FFFFFF' }}>Tools</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[57px] font-bold leading-relaxed sm:!leading-[1.3] md:!leading-[1.4] tracking-[-0.5px] sm:tracking-[-1.8px]" style={{ color: '#EEF4ED' }}>
                  Popular Vibecoding Tools
                </h2>
              </div>
            </ScrollAnimation>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {[
                { name: 'Cursor', description: 'AI-first code editor', color: '#7EA6F0' },
                { name: 'Claude AI', description: 'Advanced reasoning AI', color: '#E1A0FF' },
                { name: 'GitHub Copilot', description: 'AI pair programmer', color: '#4BD760' },
                { name: 'Bolt New', description: 'Lightning-fast AI coding', color: '#E28F2F' }
              ].map((tool, index) => (
                <ScrollAnimation key={index} direction="up" delay={0.2 + index * 0.1}>
                  <div className="rounded-lg sm:rounded-xl p-6 sm:p-8 md:p-10 border-2 transition-all hover:scale-[1.02]" style={{ 
                    background: `linear-gradient(135deg, ${tool.color}15 0%, ${tool.color}08 100%)`,
                    borderColor: tool.color,
                    backdropFilter: 'blur(10px)'
                  }}>
                    <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-5 md:mb-6 leading-relaxed sm:leading-[1.4]" style={{ color: tool.color, fontFamily: 'Inter, sans-serif' }}>
                      {tool.name}
                    </h3>
                    <p className="text-sm sm:text-[15.4px] leading-[18px] sm:leading-[20.8px]" style={{ color: '#EEF4ED', opacity: 0.9 }}>
                      {tool.description}
                    </p>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-[200px] pb-12 sm:pb-16 pt-8 sm:pt-12">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-[1520px] mx-auto">
            <ScrollAnimation direction="up" delay={0.1}>
              <div className="flex flex-col gap-2 sm:gap-2.5 items-center mb-6 sm:mb-8 md:mb-10 max-w-full sm:max-w-[530px] mx-auto px-4 sm:px-0">
                <div className="box-border flex h-[40px] sm:h-[49px] items-center justify-center px-4 sm:px-[17px] py-0 rounded-br-[20px] rounded-tl-[20px] sm:rounded-br-[24px] sm:rounded-tl-[24px]" style={{ background: 'linear-gradient(135deg, #4BD760 0%, #3060eb 100%)' }}>
                  <span className="text-sm sm:text-base font-bold" style={{ color: '#FFFFFF' }}>Benefits</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[57px] font-bold text-center leading-relaxed sm:!leading-[1.3] md:!leading-[1.4] tracking-[-0.5px] sm:tracking-[-1.8px]" style={{ color: '#EEF4ED' }}>
                  Why Choose Vibecoding?
                </h2>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {[
                {
                  title: '10x Faster Development',
                  description: 'Build full-stack applications in hours instead of weeks. Prototype ideas and validate concepts at unprecedented speed.',
                  stat: '10x',
                  color: '#3060eb'
                },
                {
                  title: 'Lower Barrier to Entry',
                  description: 'You don\'t need to memorize syntax or spend years learning frameworks. Focus on solving problems, not syntax errors.',
                  stat: '80%',
                  color: '#8f35ea'
                },
                {
                  title: 'Enhanced Creativity',
                  description: 'Free your mind from technical constraints. Let AI handle implementation while you focus on innovation and design.',
                  stat: '∞',
                  color: '#E1A0FF'
                },
                {
                  title: 'Better Code Quality',
                  description: 'AI assistants catch bugs, suggest optimizations, and follow best practices automatically, resulting in cleaner code.',
                  stat: '95%',
                  color: '#4BD760'
                }
              ].map((benefit, index) => (
                <ScrollAnimation key={index} direction="up" delay={0.2 + index * 0.1}>
                  <div className="rounded-lg sm:rounded-xl p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col border-2 transition-all hover:scale-[1.02]" style={{ 
                    background: `linear-gradient(135deg, ${benefit.color}15 0%, ${benefit.color}08 100%)`,
                    borderColor: benefit.color,
                    backdropFilter: 'blur(10px)'
                  }}>
                    <div className="flex items-start justify-between mb-5 sm:mb-6 md:mb-8">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold flex-1 leading-relaxed sm:leading-[1.4]" style={{ color: benefit.color, fontFamily: 'Inter, sans-serif' }}>
                        {benefit.title}
                      </h3>
                      <span className="text-2xl sm:text-3xl md:text-4xl font-bold ml-4" style={{ 
                        background: `linear-gradient(135deg, ${benefit.color} 0%, ${benefit.color}80 100%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        opacity: 0.6
                      }}>
                        {benefit.stat}
                      </span>
                    </div>
                    <p className="text-sm sm:text-[15.4px] leading-[18px] sm:leading-[20.8px]" style={{ color: '#EEF4ED', opacity: 0.9 }}>
                      {benefit.description}
                    </p>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Real-World Use Cases */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-[200px] pb-12 sm:pb-16 pt-8 sm:pt-12">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-[1520px] mx-auto">
            <ScrollAnimation direction="up" delay={0.1}>
              <div className="flex flex-col gap-2 sm:gap-2.5 items-start mb-6 sm:mb-8 md:mb-10 max-w-full sm:max-w-[530px] px-4 sm:px-0">
                <div className="box-border flex h-[40px] sm:h-[49px] items-center justify-center px-4 sm:px-[17px] py-0 rounded-br-[20px] rounded-tl-[20px] sm:rounded-br-[24px] sm:rounded-tl-[24px]" style={{ background: 'linear-gradient(135deg, #E28F2F 0%, #FD5C5C 100%)' }}>
                  <span className="text-sm sm:text-base font-bold" style={{ color: '#FFFFFF' }}>Use Cases</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[57px] font-bold leading-relaxed sm:!leading-[1.3] md:!leading-[1.4] tracking-[-0.5px] sm:tracking-[-1.8px]" style={{ color: '#EEF4ED' }}>
                  Real-World Applications
                </h2>
              </div>
            </ScrollAnimation>

            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              {[
                {
                  title: 'Rapid MVP Development',
                  description: 'Founders and entrepreneurs use vibecoding to build and launch MVPs in days, not months. Test ideas quickly and iterate based on real user feedback.'
                },
                {
                  title: 'Design-to-Code Translation',
                  description: 'Designers can describe their vision in natural language and watch AI transform Figma designs into working prototypes instantly.'
                },
                {
                  title: 'Legacy Code Modernization',
                  description: 'Refactor and modernize old codebases faster with AI assistance. Understand complex systems and migrate to modern frameworks efficiently.'
                },
                {
                  title: 'Educational Projects',
                  description: 'Students and educators leverage vibecoding to focus on learning concepts rather than getting stuck on syntax. Build projects that demonstrate understanding.'
                },
                {
                  title: 'Startup Prototyping',
                  description: 'Indie hackers and startup teams ship products faster than ever. From idea to deployed application in record time, enabling rapid market validation.'
                }
              ].map((useCase, index) => {
                const useCaseColors = ['#7EA6F0', '#E1A0FF', '#4BD760', '#E28F2F', '#3060eb']
                const color = useCaseColors[index % useCaseColors.length]
                return (
                  <ScrollAnimation key={index} direction="left" delay={0.2 + index * 0.1}>
                    <div className="rounded-lg sm:rounded-xl p-6 sm:p-8 md:p-10 border-l-4 transition-all hover:scale-[1.01]" style={{ 
                      background: `linear-gradient(135deg, ${color}10 0%, ${color}05 100%)`,
                      borderLeftColor: color,
                      backdropFilter: 'blur(10px)'
                    }}>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-5 md:mb-6 leading-relaxed sm:leading-[1.4]" style={{ color: color, fontFamily: 'Inter, sans-serif' }}>
                        {useCase.title}
                      </h3>
                      <p className="text-sm sm:text-[15.4px] leading-[18px] sm:leading-[20.8px]" style={{ color: '#EEF4ED', opacity: 0.9 }}>
                        {useCase.description}
                      </p>
                    </div>
                  </ScrollAnimation>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-[200px] pb-12 sm:pb-16 pt-8 sm:pt-12">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-[1520px] mx-auto">
            <ScrollAnimation direction="up" delay={0.1}>
              <div className="rounded-lg sm:rounded-xl p-6 sm:p-8 md:p-12 border-2 hero-gradient" style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                  {[
                    { number: '10x', label: 'Faster Development', color: '#3060eb' },
                    { number: '80%', label: 'Less Time Debugging', color: '#8f35ea' },
                    { number: '5min', label: 'Average Setup Time', color: '#E1A0FF' },
                    { number: '100+', label: 'AI Tools Available', color: '#4BD760' }
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2" style={{ color: '#FFFFFF' }}>
                        {stat.number}
                      </div>
                      <div className="text-sm sm:text-base" style={{ color: '#FFFFFF', opacity: 0.9 }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-[200px] pb-12 sm:pb-16 pt-8 sm:pt-12">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-[1520px] mx-auto">
            <ScrollAnimation direction="up" delay={0.1}>
              <div className="flex flex-col gap-2 sm:gap-2.5 items-center mb-6 sm:mb-8 md:mb-10 max-w-full sm:max-w-[530px] mx-auto px-4 sm:px-0">
                <div className="box-border flex h-[40px] sm:h-[49px] items-center justify-center px-4 sm:px-[17px] py-0 rounded-br-[20px] rounded-tl-[20px] sm:rounded-br-[24px] sm:rounded-tl-[24px]" style={{ background: 'linear-gradient(135deg, #3060eb 0%, #E1A0FF 100%)' }}>
                  <span className="text-sm sm:text-base font-bold" style={{ color: '#FFFFFF' }}>Getting Started</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[57px] font-bold text-center leading-relaxed sm:!leading-[1.3] md:!leading-[1.4] tracking-[-0.5px] sm:tracking-[-1.8px]" style={{ color: '#EEF4ED' }}>
                  Start Your Vibecoding Journey
                </h2>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {[
                {
                  step: '01',
                  title: 'Choose Your AI Editor',
                  description: 'Start with Cursor, GitHub Copilot, or any AI-powered code editor. Most offer free trials to get you started.'
                },
                {
                  step: '02',
                  title: 'Learn the Basics',
                  description: 'Familiarize yourself with natural language prompting. Describe what you want to build, not how to code it.'
                },
                {
                  step: '03',
                  title: 'Build Your First Project',
                  description: 'Start small with a simple project. Let AI handle the boilerplate while you focus on the creative vision.'
                }
              ].map((item, index) => {
                const stepColors = ['#3060eb', '#8f35ea', '#E1A0FF']
                const color = stepColors[index]
                return (
                  <ScrollAnimation key={index} direction="up" delay={0.2 + index * 0.1}>
                    <div className="rounded-lg sm:rounded-xl p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col border-2 transition-all hover:scale-[1.02]" style={{ 
                      background: `linear-gradient(135deg, ${color}15 0%, ${color}08 100%)`,
                      borderColor: color,
                      backdropFilter: 'blur(10px)'
                    }}>
                      <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5 sm:mb-6 md:mb-8" style={{ 
                        background: `linear-gradient(135deg, ${color} 0%, ${color}80 100%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        opacity: 0.3
                      }}>
                        {item.step}
                      </div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-5 sm:mb-6 md:mb-8 leading-relaxed sm:leading-[1.4]" style={{ color: color, fontFamily: 'Inter, sans-serif' }}>
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-[15.4px] leading-[18px] sm:leading-[20.8px]" style={{ color: '#EEF4ED', opacity: 0.9 }}>
                        {item.description}
                      </p>
                    </div>
                  </ScrollAnimation>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Resources & Learning */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-[200px] pb-12 sm:pb-16 pt-8 sm:pt-12">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-[1520px] mx-auto">
            <ScrollAnimation direction="up" delay={0.1}>
              <div className="flex flex-col gap-2 sm:gap-2.5 items-start mb-6 sm:mb-8 md:mb-10 max-w-full sm:max-w-[530px] px-4 sm:px-0">
                <div className="box-border flex h-[40px] sm:h-[49px] items-center justify-center px-4 sm:px-[17px] py-0 rounded-br-[20px] rounded-tl-[20px] sm:rounded-br-[24px] sm:rounded-tl-[24px]" style={{ background: 'linear-gradient(135deg, #4BD760 0%, #7EA6F0 100%)' }}>
                  <span className="text-sm sm:text-base font-bold" style={{ color: '#FFFFFF' }}>Resources</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[57px] font-bold leading-relaxed sm:!leading-[1.3] md:!leading-[1.4] tracking-[-0.5px] sm:tracking-[-1.8px]" style={{ color: '#EEF4ED' }}>
                  Learn & Connect
                </h2>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {[
                {
                  title: 'Read Our Blog',
                  description: 'Explore articles about vibecoding, AI tools, and modern development practices. Learn from real experiences and case studies.',
                  link: '/blog',
                  linkText: 'Visit Blog'
                },
                {
                  title: 'Join the Community',
                  description: 'Connect with other vibe coders, share your projects, and learn from the community. The future of coding is collaborative.',
                  link: '/#contact',
                  linkText: 'Get in Touch'
                }
              ].map((resource, index) => {
                const resourceColors = ['#3060eb', '#8f35ea']
                const color = resourceColors[index]
                return (
                  <ScrollAnimation key={index} direction="up" delay={0.2 + index * 0.1}>
                    <div className="rounded-lg sm:rounded-xl p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col border-2 transition-all hover:scale-[1.02]" style={{ 
                      background: `linear-gradient(135deg, ${color}15 0%, ${color}08 100%)`,
                      borderColor: color,
                      backdropFilter: 'blur(10px)'
                    }}>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-5 sm:mb-6 md:mb-8 leading-relaxed sm:leading-[1.4]" style={{ color: color, fontFamily: 'Inter, sans-serif' }}>
                        {resource.title}
                      </h3>
                      <p className="text-sm sm:text-[15.4px] leading-[18px] sm:leading-[20.8px] mb-6 sm:mb-8" style={{ color: '#EEF4ED', opacity: 0.9 }}>
                        {resource.description}
                      </p>
                      <Link
                        href={resource.link}
                        className="text-sm sm:text-base font-medium underline self-start transition-colors hover:opacity-80"
                        style={{ color: color }}
                      >
                        {resource.linkText} →
                      </Link>
                    </div>
                  </ScrollAnimation>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-[200px] pb-12 sm:pb-16 pt-8 sm:pt-12">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-[1520px] mx-auto">
            <ScrollAnimation direction="up" delay={0.1}>
              <div className="rounded-lg sm:rounded-xl p-8 sm:p-12 md:p-16 text-center border-2 hero-gradient" style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[45px] font-bold mb-4 sm:mb-6 leading-relaxed sm:!leading-[1.3] md:!leading-[1.4]" style={{ color: '#FFFFFF' }}>
                  Ready to Start Vibecoding?
                </h2>
                <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto" style={{ color: '#FFFFFF', opacity: 0.9 }}>
                  Join thousands of developers who are already building faster, smarter, and more creatively with AI-powered development tools.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link
                    href="/blog"
                    className="bg-white text-[#040403] px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base hover:opacity-90 transition-opacity hover:scale-105"
                  >
                    Explore Our Blog
                  </Link>
                  <Link
                    href="/#contact"
                    className="bg-transparent border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base hover:bg-white hover:text-[#040403] transition-colors hover:scale-105"
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}
