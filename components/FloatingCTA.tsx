'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, X, Apple, Sparkles } from 'lucide-react'

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      
      // Show after scrolling down 50% of viewport
      setHasScrolled(scrollPosition > windowHeight * 0.5)
      
      // Hide when near footer
      const footerPosition = document.body.scrollHeight - windowHeight * 1.5
      setIsVisible(scrollPosition > windowHeight * 0.5 && scrollPosition < footerPosition)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-expand after delay when first visible
  useEffect(() => {
    if (isVisible && !hasScrolled) {
      const timer = setTimeout(() => {
        setIsExpanded(true)
        setTimeout(() => setIsExpanded(false), 3000)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, hasScrolled])

  return (
    <>
      {/* Mobile-only floating CTA */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-4 z-40 md:hidden"
          >
            <motion.div
              animate={isExpanded ? { width: 'auto' } : { width: '60px' }}
              className="relative"
            >
              {/* Main floating button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsExpanded(!isExpanded)}
                className={`
                  relative overflow-hidden rounded-full shadow-2xl
                  bg-gradient-to-r from-primary to-accent-vibrant
                  text-white font-medium
                  ${isExpanded ? 'px-6 py-4' : 'w-14 h-14'}
                  flex items-center justify-center gap-2
                  transition-all duration-300
                `}
              >
                {/* Animated background effect */}
                <motion.div
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.1, 0.3],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-white rounded-full"
                />
                
                {/* Icon and text */}
                <motion.div
                  animate={{ rotate: isExpanded ? 0 : [0, -10, 10, 0] }}
                  transition={{ duration: 2, repeat: !isExpanded ? Infinity : 0 }}
                  className="relative z-10"
                >
                  <Download className="w-5 h-5" />
                </motion.div>
                
                <AnimatePresence>
                  {isExpanded && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative z-10 whitespace-nowrap"
                    >
                      Get Beatboxx
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Pulsing ring effect */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-primary-light pointer-events-none"
              />

              {/* Close button when expanded */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ delay: 0.1 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsExpanded(false)
                    }}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-800 text-white flex items-center justify-center shadow-lg"
                  >
                    <X className="w-3 h-3" />
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Quick download options when expanded */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: 0.2 }}
                  className="absolute bottom-full mb-2 right-0 flex flex-col gap-2"
                >
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-full bg-black text-white text-sm font-medium shadow-lg flex items-center gap-2 whitespace-nowrap"
                  >
                    <Apple className="w-4 h-4" />
                    iOS
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-full bg-green-600 text-white text-sm font-medium shadow-lg flex items-center gap-2 whitespace-nowrap"
                  >
                    <Download className="w-4 h-4" />
                    Android
                  </motion.a>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sparkle decoration */}
      <AnimatePresence>
        {isVisible && !isExpanded && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="fixed bottom-20 right-8 z-30 md:hidden pointer-events-none"
          >
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="w-6 h-6 text-primary-light opacity-60" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
