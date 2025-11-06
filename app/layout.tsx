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
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Prevent flash - hide ClientWrapper content initially */
            .client-wrapper-content {
              opacity: 0 !important;
              visibility: hidden !important;
            }
            body.hero-ready .client-wrapper-content {
              opacity: 1 !important;
              visibility: visible !important;
              transition: opacity 0.3s ease-in;
            }
            /* Ensure Hero is always visible */
            body > main > section:first-child {
              opacity: 1 !important;
              visibility: visible !important;
            }
          `
        }} />
      </head>
      <body>
        {children}
        <script dangerouslySetInnerHTML={{
          __html: `
            // Mark body as ready after Hero should be rendered
            // Wait for DOM to be ready and Hero section to exist
            (function() {
              function markReady() {
                var heroSection = document.querySelector('main > section:first-child');
                if (heroSection) {
                  document.body.classList.add('hero-ready');
                } else {
                  // Retry if Hero not found yet
                  setTimeout(markReady, 50);
                }
              }
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', markReady);
              } else {
                setTimeout(markReady, 100);
              }
            })();
          `
        }} />
      </body>
    </html>
  )
}

