import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Anvibe - Creative Agency',
  description: 'A creative agency built for brands that want more than just good design.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Boldonse&family=DynaPuff:wght@400..700&family=Inter:wght@400;500;600;700;800;900&family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Titan+One&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}

