import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Privacy Policy — Beatboxx',
  description:
    'How Beatboxx handles your data: everything stays on your device. No accounts, no cloud uploads, no tracking.',
  alternates: { canonical: `${SITE_URL}/privacy` },
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
