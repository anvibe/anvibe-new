'use client'

import { useEffect, useState } from 'react'

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Wait for Hero to fully render and hydrate
    // Use requestAnimationFrame to ensure Hero is painted first
    const rafId = requestAnimationFrame(() => {
      // Additional small delay to ensure Hero is visible
      setTimeout(() => {
        setIsMounted(true)
      }, 200)
    })

    return () => {
      cancelAnimationFrame(rafId)
    }
  }, [])

  if (!isMounted) {
    return (
      <div style={{ 
        minHeight: '100dvh',
        background: '#040403',
        position: 'relative',
        zIndex: 1,
        visibility: 'hidden',
        opacity: 0,
        pointerEvents: 'none'
      }} />
    )
  }

  return (
    <div className="client-wrapper-content" style={{ opacity: isMounted ? 1 : 0 }}>
      {children}
    </div>
  )
}

