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
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-primary-light/10 border border-primary-light/20 backdrop-blur-sm mb-4">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-xs sm:text-sm font-medium">See It In Action</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4 px-4">
            Experience <span className="gradient-text">Beatboxx</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            A powerful yet intuitive interface designed specifically for beatboxers
          </p>
        </motion.div>

        {/* Showcase Content - Mobile-First Layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* Phone Mockups - Now first on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative order-1 lg:order-1"
          >
            <div className="relative mx-auto max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] w-full">
              {/* Big, bold phone mockup */}
              {/* Main Phone */}
              <div className="relative z-10">
                <PhoneFrame>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${activeIndex}-${imageIndex}`}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5 }}
                      className="aspect-[9/19.5] relative"
                    >
                      <Image
                        src={currentShowcase.screenshots[imageIndex]}
                        alt={currentShowcase.title}
                        fill
                        className="object-cover object-top rounded-[2.2rem]"
                        sizes="(max-width: 640px) 320px, 420px"
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
                className="hidden lg:block absolute top-8 -left-20 w-48 opacity-20"
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
                className="hidden lg:block absolute top-8 -right-20 w-48 opacity-20"
              >
                <PhoneFrame small>
                  <div className="aspect-[9/19.5] bg-gradient-to-br from-accent/20 to-primary-light/20" />
                </PhoneFrame>
              </motion.div>

              {/* Light/Dark Mode toggle - Prominent */}
              {currentShowcase.screenshots.length > 1 && (
                <div className="flex justify-center mt-6 sm:mt-8">
                  <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md border border-white/20 shadow-lg">
                    <Sun className={`w-5 h-5 transition-colors ${
                      imageIndex === 0 ? 'text-yellow-400' : 'text-gray-500'
                    }`} />
                    <div className="text-xs font-medium text-gray-300">LIGHT</div>
                    <button
                      onClick={() => setImageIndex(imageIndex === 0 ? 1 : 0)}
                      className="relative w-12 h-6 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors shadow-inner"
                      aria-label="Toggle light/dark mode"
                    >
                      <motion.div
                        animate={{
                          x: imageIndex === 0 ? 2 : 26
                        }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
                      />
                    </button>
                    <div className="text-xs font-medium text-gray-300">DARK</div>
                    <Moon className={`w-5 h-5 transition-colors ${
                      imageIndex === 1 ? 'text-blue-400' : 'text-gray-500'
                    }`} />
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Content - Centered on mobile, below phone */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6 text-center lg:text-left order-2 lg:order-2"
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
                  <h3 className="text-2xl sm:text-3xl font-display font-bold mb-3 text-foreground">
                    {currentShowcase.title}
                  </h3>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
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
                      className="flex items-center gap-3 justify-center lg:justify-start"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-sm sm:text-base text-foreground">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation - Mobile centered */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-6 sm:pt-8">
              <button
                onClick={prevShowcase}
                className="p-2 sm:p-3 rounded-full bg-primary-light/10 hover:bg-primary-light/20 transition-colors"
                aria-label="Previous showcase"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
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
                className="p-2 sm:p-3 rounded-full bg-primary-light/10 hover:bg-primary-light/20 transition-colors"
                aria-label="Next showcase"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Phone Frame Component - Big and Clean
function PhoneFrame({ children, small = false }: { children: React.ReactNode, small?: boolean }) {
  return (
    <div className={`relative ${small ? 'scale-75' : ''}`}>
      {/* Subtle glow effect */}
      <motion.div
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute -inset-6 rounded-[3rem] bg-gradient-to-r from-primary-light/20 to-accent-vibrant/20 blur-3xl -z-10"
      />
      
      {/* Modern phone frame */}
      <div className="relative rounded-[3rem] bg-gradient-to-br from-gray-900 via-gray-800 to-black p-2 shadow-2xl">
        {/* Inner frame */}
        <div className="relative bg-black rounded-[2.7rem] p-1">
          {/* Screen container */}
          <div className="relative bg-black rounded-[2.5rem] overflow-hidden">
            {/* Dynamic island (iPhone style) */}
            {!small && (
              <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20">
                <div className="w-28 h-6 bg-black rounded-full flex items-center justify-center">
                  {/* Camera and sensors */}
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-800 rounded-full" />
                    <div className="w-3 h-1 bg-gray-700 rounded-full" />
                  </div>
                </div>
              </div>
            )}
            
            {/* Screen content */}
            <div className="relative w-full">
              {children}
            </div>
          </div>
        </div>
        
        {/* Side buttons - more prominent */}
        <div className="absolute right-[-4px] top-32 w-1 h-16 rounded-r-lg bg-gray-700" />
        <div className="absolute left-[-4px] top-28 w-1 h-10 rounded-l-lg bg-gray-700" />
        <div className="absolute left-[-4px] top-44 w-1 h-16 rounded-l-lg bg-gray-700" />
      </div>
    </div>
  )
}
