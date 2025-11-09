'use client'

import ScrollAnimation from './ScrollAnimation'

export default function WeDesignSection() {
  return (
    <section id="we-design" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-[200px]" style={{ background: '#040403' }}>
      <div className="max-w-[1520px] mx-auto">
        <div className="flex flex-col gap-2 sm:gap-4 md:gap-6 mb-6 sm:mb-8 md:mb-12">
          <ScrollAnimation direction="up" delay={0.1}>
            <h2 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight"
              style={{ color: '#EEF4ED' }}
            >
              We design unique ✨
            </h2>
          </ScrollAnimation>
          <ScrollAnimation direction="up" delay={0.2}>
            <h2 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight"
              style={{ color: '#EEF4ED' }}
            >
              AI experiences 🤖
            </h2>
          </ScrollAnimation>
        </div>
        <ScrollAnimation direction="up" delay={0.3}>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal leading-relaxed max-w-4xl" style={{ color: '#EEF4ED', opacity: 0.8 }}>
            We craft intelligent digital solutions 💡 that blend cutting-edge AI technology 🤖 with human-centered design 🎨, creating experiences that are both powerful and intuitive ✨.
          </p>
        </ScrollAnimation>
      </div>
    </section>
  )
}

