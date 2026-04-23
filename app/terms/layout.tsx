import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Terms of Use — Beatboxx',
  description:
    'Terms of use for the Beatboxx beatbox recorder app. Free to use on iOS and Android with no ads or premium tier.',
  alternates: { canonical: `${SITE_URL}/terms` },
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
