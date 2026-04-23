'use client'

import Link from 'next/link'
import { Music, Download } from 'lucide-react'
import AnimatedButton from '@/components/AnimatedButton'
import { useScrolled } from '@/hooks/useScrolled'

export default function SiteHeader() {
  const scrolled = useScrolled(12)

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
          <AnimatedButton href="/#download" variant="primary" size="sm">
            <Download className="w-4 h-4" />
            Get the app
          </AnimatedButton>
        </nav>
      </div>
    </header>
  )
}
