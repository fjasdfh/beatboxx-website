import type { ReactNode } from 'react'
import MobileNav from '@/components/MobileNav'
import Footer from '@/components/Footer'

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <MobileNav />
      <main className="min-h-[60vh]">{children}</main>
      <Footer />
    </>
  )
}
