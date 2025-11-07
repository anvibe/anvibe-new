'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ProjectNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 py-4 px-6 sm:px-8 lg:px-[200px]">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-[1520px] mx-auto">
          <div className="flex items-center justify-between h-12">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Link href="/" className="font-bold boldonse-regular text-black" style={{ fontSize: '2rem' }}>Anvibe</Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <Link 
                href="/#projects" 
                className="flex items-center gap-2 text-sm text-black hover:text-slate-600 transition-colors"
              >
                <ArrowLeft size={16} className="text-black" />
                Back to Projects
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </nav>
  )
}





