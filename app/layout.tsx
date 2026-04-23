import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { SITE_URL } from '@/lib/blog'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const SITE_TITLE = 'Beatboxx — Beatbox Recorder App. Record, tag, battle.'
const SITE_DESCRIPTION =
  'Beatboxx is the beatbox recorder app built by a beatboxer. Capture ideas, auto-detect BPM, tag techniques, build routines and prep for battles. 100% on-device. Free on iOS and Android.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: '/',
  },
  keywords: [
    'beatbox recorder app',
    'beatbox app',
    'beatboxing app',
    'beatbox',
    'beatboxing',
    'music recording',
    'voice memo organizer',
    'battle prep',
    'routine builder',
    'metronome',
    'BPM detection',
    'waveform',
    'tap tempo',
    'on-device',
    'offline',
    'iOS',
    'Android',
  ],
  authors: [{ name: 'Beatboxx Team' }],
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: 'Beatboxx',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Beatboxx — beatbox recorder app',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F5F3E6' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
  ],
}

const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}#organization`,
  name: 'Beatboxx',
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  sameAs: ['https://www.instagram.com/beatboxxapp/'],
}

const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}#website`,
  url: SITE_URL,
  name: 'Beatboxx',
  description: SITE_DESCRIPTION,
  publisher: { '@id': `${SITE_URL}#organization` },
  inLanguage: 'en-US',
}

const mobileAppLd = {
  '@context': 'https://schema.org',
  '@type': 'MobileApplication',
  '@id': `${SITE_URL}#app`,
  name: 'Beatboxx — Beatbox Recorder & Organizer',
  description: SITE_DESCRIPTION,
  operatingSystem: 'iOS, Android',
  applicationCategory: 'MusicApplication',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  downloadUrl: [
    'https://apps.apple.com/de/app/beatboxx-recorder-organizer/id6751503714',
    'https://play.google.com/store/apps/details?id=com.johannes.beatboxx',
  ],
  publisher: { '@id': `${SITE_URL}#organization` },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationLd, websiteLd, mobileAppLd]),
          }}
        />
        <div className="relative">{children}</div>
      </body>
    </html>
  )
}
