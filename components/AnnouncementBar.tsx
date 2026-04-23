'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Sparkles, X } from 'lucide-react'

const STORAGE_KEY = 'beatboxx-announce-v2.1.1'

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const dismissed = window.localStorage.getItem(STORAGE_KEY) === '1'
    if (!dismissed) setVisible(true)
  }, [])

  const dismiss = () => {
    setVisible(false)
    try {
      window.localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // ignore (private mode etc.)
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="relative z-40 bg-gradient-to-r from-primary to-accent-vibrant text-background"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center gap-3">
            <Sparkles className="w-4 h-4 shrink-0 hidden sm:block" />
            <p className="flex-1 text-xs sm:text-sm font-medium leading-snug">
              <span className="hidden sm:inline">New in v2.1.1 — </span>
              <span className="sm:hidden">New — </span>
              BPM auto-detect, tap tempo, favorites, drag between routines
            </p>
            <button
              onClick={dismiss}
              aria-label="Dismiss announcement"
              className="shrink-0 p-1 rounded-full hover:bg-background/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
