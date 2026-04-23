import Link from 'next/link'
import { Music } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border-light">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Music className="w-6 h-6 text-primary" />
            <span className="font-display font-semibold text-xl">Beatboxx</span>
          </Link>

          <div className="flex flex-wrap gap-6 text-sm">
            <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
              Blog
            </Link>
            <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Use
            </Link>
            <a
              href="https://sites.google.com/view/beatboxx-app/home"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Support
            </a>
            <a
              href="mailto:dev.apollonbeatbox@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Contact
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border-light text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Beatboxx. Built with ❤️ for the beatbox community.</p>
        </div>
      </div>
    </footer>
  )
}
