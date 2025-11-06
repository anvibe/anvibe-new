'use client'

import { useEffect, useState } from 'react'

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Small delay to ensure Hero renders first and covers viewport
    const timer = setTimeout(() => {
      setIsMounted(true)
    }, 150)

    return () => clearTimeout(timer)
  }, [])

  if (!isMounted) {
    return (
      <div style={{ 
        minHeight: '100vh',
        background: '#040403',
        position: 'relative',
        zIndex: 1
      }} />
    )
  }

  return <>{children}</>
}

