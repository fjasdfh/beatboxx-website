import type { ReactNode } from 'react'
import MobileNav from '@/components/MobileNav'
import SiteHeader from '@/components/blog/SiteHeader'
import Footer from '@/components/Footer'

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <MobileNav />
      <SiteHeader />
      <main className="min-h-[60vh]">{children}</main>
      <Footer />
    </>
  )
}
