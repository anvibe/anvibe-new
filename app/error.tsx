'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Footer from '@/components/Footer'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="min-h-screen flex flex-col" style={{ background: '#040403' }}>
      <div className="flex-1 flex items-center justify-center px-6 sm:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: '#EEF4ED' }}>
            Something went wrong!
          </h1>
          <p className="text-xl mb-8" style={{ color: '#EEF4ED', opacity: 0.8 }}>
            We encountered an unexpected error. Please try again.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={reset}
              className="px-6 py-3 bg-white text-[#1e1e1e] rounded-full font-medium hover:bg-slate-100 transition-colors"
            >
              Try again
            </button>
            <Link
              href="/"
              className="px-6 py-3 border-2 rounded-full font-medium transition-colors hover:bg-[rgba(10,10,9,0.5)]"
              style={{ borderColor: '#0f0f0e', color: '#EEF4ED' }}
            >
              Go home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

