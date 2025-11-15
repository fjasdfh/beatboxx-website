import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://beatboxx.app'),
  title: 'Beatboxx — Recorder & Organizer for Beatboxers',
  description: 'Organize beatbox ideas, tag techniques, build routines, and prep battle rounds. 100% on-device, privacy-first. iOS & Android.',
  keywords: ['beatbox', 'beatboxing', 'music', 'recording', 'organizer', 'battle', 'routine', 'iOS', 'Android'],
  authors: [{ name: 'Beatboxx Team' }],
  openGraph: {
    title: 'Beatboxx — Recorder & Organizer for Beatboxers',
    description: 'Organize beatbox ideas, tag techniques, build routines, and prep battle rounds. 100% on-device, privacy-first.',
    url: 'https://beatboxx.app',
    siteName: 'Beatboxx',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Beatboxx App',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Beatboxx — Recorder & Organizer for Beatboxers',
    description: 'Organize beatbox ideas, tag techniques, build routines, and prep battle rounds.',
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', type: 'image/png' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased min-h-screen">
        <div className="relative">
          {children}
        </div>
      </body>
    </html>
  )
}
