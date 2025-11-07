import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About - Anvibe',
  description: 'We help brands grow with design that\'s intentional and messaging that actually resonates.',
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}





