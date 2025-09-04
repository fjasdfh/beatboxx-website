'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Sparkles, Sun, Moon } from 'lucide-react'

const showcaseData = [
  {
    title: "Battle Preparation",
    description: "Organize your material by battle round - from Elimination to Finals",
    screenshots: [
      "/screenshots/battle-prep-light-new.png",
      "/screenshots/battle-prep-dark-new.png"
    ],
    features: [
      "Stage-by-stage organization",
      "Quick access to routines",
      "Add alternates & backups"
    ],
    hasDarkMode: true
  },
  {
    title: "Smart Recording & Tagging",
    description: "Tag your beats with techniques, tempo, energy, and mood",
    screenshots: [
      "/screenshots/recording-light-new.png",
      "/screenshots/recording-dark-new.png"
    ],
    features: [
      "One-tap recording",
      "Custom tags & categories", 
      "Quick search & filter"
    ],
    hasDarkMode: true
  },
  {
    title: "Routine Builder",
    description: "Build perfect routines with drag-and-drop ordering",
    screenshots: [
      "/screenshots/routine-light-new.png",
      "/screenshots/routine-dark-new.png"
    ],
    features: [
      "Genre-based folders",
      "Pin your best takes",
      "Reorder for perfect flow"
    ],
    hasDarkMode: true
  },
  {
    title: "Powerful Organization",
    description: "Find any beat instantly with smart search and filters",
    screenshots: [
      "/screenshots/organization-light-new.png",
      "/screenshots/organization-dark-new.png"
    ],
    features: [
      "Search combinations",
      "Filter by tags",
      "Quick preview"
    ],
    hasDarkMode: true
  }
]

export default function AppShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [imageIndex, setImageIndex] = useState(0)
  
  const currentShowcase = showcaseData[activeIndex]

  // Auto-rotate through images for current showcase
  useEffect(() => {
    if (currentShowcase.screenshots.length > 1) {
      const timer = setInterval(() => {
        setImageIndex((prev) => (prev + 1) % currentShowcase.screenshots.length)
      }, 3000)
      return () => clearInterval(timer)
    }
  }, [activeIndex, currentShowcase.screenshots.length])

  // Reset image index when showcase changes
  useEffect(() => {
    setImageIndex(0)
  }, [activeIndex])

  const nextShowcase = () => {
    setActiveIndex((prev) => (prev + 1) % showcaseData.length)
  }

  const prevShowcase = () => {
    setActiveIndex((prev) => (prev - 1 + showcaseData.length) % showcaseData.length)
  }

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-light/10 border border-primary-light/20 backdrop-blur-sm mb-4">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium">See It In Action</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-display font-bold mb-4">
            Experience <span className="gradient-text">Beatboxx</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A powerful yet intuitive interface designed specifically for beatboxers
          </p>
        </motion.div>

        {/* Showcase Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Phone Mockups */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative mx-auto max-w-[350px]">
              {/* Main Phone */}
              <div className="relative z-10">
                <PhoneFrame>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${activeIndex}-${imageIndex}`}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                      className="relative aspect-[9/19.5]"
                    >
                      <Image
                        src={currentShowcase.screenshots[imageIndex]}
                        alt={currentShowcase.title}
                        fill
                        className="object-cover"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                </PhoneFrame>
              </div>

              {/* Background Phone (decorative) */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [-5, -8, -5]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-8 -left-20 w-48 opacity-20"
              >
                <PhoneFrame small>
                  <div className="aspect-[9/19.5] bg-gradient-to-br from-primary-light/20 to-accent/20" />
                </PhoneFrame>
              </motion.div>

              {/* Background Phone 2 (decorative) */}
              <motion.div
                animate={{
                  y: [0, 10, 0],
                  rotate: [5, 8, 5]
                }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute top-8 -right-20 w-48 opacity-20"
              >
                <PhoneFrame small>
                  <div className="aspect-[9/19.5] bg-gradient-to-br from-accent/20 to-primary-light/20" />
                </PhoneFrame>
              </motion.div>

              {/* Image indicators */}
              {currentShowcase.screenshots.length > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {currentShowcase.screenshots.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setImageIndex(index)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === imageIndex
                          ? 'w-8 bg-primary'
                          : 'w-1.5 bg-gray-400 hover:bg-gray-600'
                      }`}
                      aria-label={`View screenshot ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-3xl font-display font-bold mb-3">
                    {currentShowcase.title}
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    {currentShowcase.description}
                  </p>
                </div>

                <div className="space-y-3">
                  {currentShowcase.features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-foreground">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center gap-4 pt-8">
              <button
                onClick={prevShowcase}
                className="p-3 rounded-full bg-primary-light/10 hover:bg-primary-light/20 transition-colors"
                aria-label="Previous showcase"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-2">
                {showcaseData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? 'w-8 bg-primary'
                        : 'w-2 bg-gray-400 hover:bg-gray-600'
                    }`}
                    aria-label={`Go to showcase ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextShowcase}
                className="p-3 rounded-full bg-primary-light/10 hover:bg-primary-light/20 transition-colors"
                aria-label="Next showcase"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Phone Frame Component
function PhoneFrame({ children, small = false }: { children: React.ReactNode, small?: boolean }) {
  return (
    <div className={`relative ${small ? 'scale-75' : ''}`}>
      <div className="relative rounded-[3rem] bg-gradient-to-br from-gray-800 to-gray-900 p-2 shadow-2xl">
        <div className="relative rounded-[2.5rem] bg-black p-1">
          <div className="relative rounded-[2.3rem] bg-gradient-to-b from-gray-900 to-black p-[2px]">
            {/* Notch */}
            {!small && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
                <div className="w-40 h-7 bg-black rounded-b-3xl flex items-center justify-center">
                  <div className="w-20 h-4 bg-gray-800 rounded-full" />
                </div>
              </div>
            )}
            
            {/* Screen */}
            <div className="relative overflow-hidden rounded-[2.2rem] bg-black">
              {children}
            </div>
          </div>
          
          {/* Side buttons */}
          <div className="absolute right-[-8px] top-32 w-1 h-12 bg-gray-700 rounded-r-lg" />
          <div className="absolute left-[-8px] top-28 w-1 h-8 bg-gray-700 rounded-l-lg" />
          <div className="absolute left-[-8px] top-40 w-1 h-12 bg-gray-700 rounded-l-lg" />
          <div className="absolute left-[-8px] top-56 w-1 h-12 bg-gray-700 rounded-l-lg" />
        </div>
      </div>
      
      {/* Glow effect */}
      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute -inset-4 rounded-[3rem] bg-gradient-to-r from-primary-light/20 to-accent-vibrant/20 blur-2xl -z-10"
      />
    </div>
  )
}
