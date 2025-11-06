import Link from 'next/link'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col" style={{ background: '#040403' }}>
      <div className="flex-1 flex items-center justify-center px-6 sm:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: '#EEF4ED' }}>
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#EEF4ED' }}>
            Page not found
          </h2>
          <p className="text-xl mb-8" style={{ color: '#EEF4ED', opacity: 0.8 }}>
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#1e1e1e] rounded-full font-medium hover:bg-slate-100 transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  )
}

