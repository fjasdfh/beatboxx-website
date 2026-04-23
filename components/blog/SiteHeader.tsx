'use client'

import Link from 'next/link'
import { Music, Download } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`hidden md:block sticky top-0 z-40 transition-all duration-200 ${
        scrolled ? 'bg-background/85 backdrop-blur-xl shadow-sm border-b border-border-light' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 lg:px-8 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Music className="w-6 h-6 text-primary" />
          <span className="font-display font-bold text-xl">Beatboxx</span>
        </Link>

        <nav className="flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="text-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/blog" className="text-foreground hover:text-primary transition-colors">
            Blog
          </Link>
          <Link
            href="/#download"
            className="inline-flex items-center gap-2 bg-primary text-background px-4 py-2 rounded-full hover:bg-primary-dark transition-colors"
          >
            <Download className="w-4 h-4" />
            Get the app
          </Link>
        </nav>
      </div>
    </header>
  )
}
