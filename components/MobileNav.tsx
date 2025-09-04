'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Download, Instagram, ChevronRight, Music, Home, Info, Shield, Mail } from 'lucide-react'
import Link from 'next/link'

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const menuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40
      }
    }
  }

  const menuItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Info, label: 'Features', href: '#features' },
    { icon: Shield, label: 'Privacy', href: '/privacy' },
    { icon: Mail, label: 'Contact', href: 'mailto:dev.apollonbeatbox@gmail.com' }
  ]

  const socialLinks = [
    { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/beatboxxapp/', external: true }
  ]

  return (
    <>
      {/* Mobile Header Bar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 md:hidden transition-all duration-300 ${
          scrolled 
            ? 'bg-background/80 backdrop-blur-xl shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Music className="w-6 h-6 text-primary" />
            <span className="font-display font-bold text-xl">Beatboxx</span>
          </Link>

          {/* Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              scrolled 
                ? 'bg-primary-light/20 hover:bg-primary-light/30' 
                : 'bg-white/10 hover:bg-white/20'
            }`}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-background border-l border-border-light shadow-2xl z-50 md:hidden overflow-y-auto"
            >
              {/* Menu Header */}
              <div className="p-6 border-b border-border-light">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-display font-bold">Menu</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-10 h-10 rounded-full bg-primary-light/20 hover:bg-primary-light/30 flex items-center justify-center transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Menu Items */}
              <nav className="p-6 space-y-2">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ 
                      x: 0, 
                      opacity: 1,
                      transition: { delay: index * 0.1 }
                    }}
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-primary-light/10 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary-light/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-medium text-lg">{item.label}</span>
                    <ChevronRight className="w-5 h-5 ml-auto text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                ))}
              </nav>

              {/* Download Section */}
              <div className="p-6 space-y-4 border-t border-border-light">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Download App</h3>
                <motion.a
                  href="#"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-primary-light/20 to-accent-vibrant/20 hover:from-primary-light/30 hover:to-accent-vibrant/30 transition-all"
                >
                  <Download className="w-5 h-5" />
                  <div className="flex-1">
                    <p className="font-semibold">Get Beatboxx</p>
                    <p className="text-sm text-muted-foreground">Available on iOS & Android</p>
                  </div>
                </motion.a>
              </div>

              {/* Social Links */}
              <div className="p-6 border-t border-border-light">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="w-12 h-12 rounded-full bg-primary-light/10 hover:bg-primary-light/20 flex items-center justify-center transition-colors hover:scale-110"
                    >
                      <link.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 text-center text-sm text-muted-foreground">
                <p>© 2024 Beatboxx</p>
                <p className="mt-2">Built with ❤️ for beatboxers</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
