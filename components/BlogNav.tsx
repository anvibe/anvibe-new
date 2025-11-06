'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

export default function BlogNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-4 px-8">
      <div className="max-w-full mx-auto">
        <div className="flex items-center justify-between h-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Link href="/" className="text-2xl font-bold boldonse-regular text-white">Anvibe</Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <Link 
              href="/blog" 
              className="flex items-center gap-2 text-sm text-white hover:text-white/80 transition-colors"
            >
              <ArrowLeft size={16} className="text-white" />
              Back to Blog
            </Link>
          </motion.div>
        </div>
      </div>
    </nav>
  )
}

