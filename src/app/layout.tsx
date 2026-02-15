import type { Metadata } from 'next'
import { ThemeProvider } from '@/lib/theme-context'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Developer Portfolio | Full-Stack Engineer',
  description:
    'Welcome to my digital portfolio. I craft beautiful, performant web experiences with modern technologies.',
  openGraph: {
    title: 'Developer Portfolio | Full-Stack Engineer',
    description:
      'Welcome to my digital portfolio. I craft beautiful, performant web experiences with modern technologies.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="overflow-hidden">
        <ThemeProvider>
          {children}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}
