'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Play, Sparkles } from 'lucide-react'

const showcaseData = [
  {
    title: "Battle Preparation",
    description: "Organize your material by battle round - from Elimination to Finals",
    screenshot: "/screenshots/battle-prep-light-new.png",
    features: [
      "Stage-by-stage organization",
      "Quick access to routines", 
      "Add alternates & backups"
    ],
    color: "from-blue-500/20 to-purple-500/20"
  },
  {
    title: "Smart Recording & Tagging",
    description: "Tag your beats with techniques, tempo, energy, and mood",
    screenshot: "/screenshots/recording-light-new.png",
    features: [
      "One-tap recording",
      "Custom tags & categories",
      "Quick search & filter"
    ],
    color: "from-red-500/20 to-pink-500/20"
  },
  {
    title: "Routine Builder", 
    description: "Build perfect routines with drag-and-drop ordering",
    screenshot: "/screenshots/routine-light-new.png",
    features: [
      "Genre-based folders",
      "Pin your best takes",
      "Reorder for perfect flow"
    ],
    color: "from-green-500/20 to-emerald-500/20"
  },
  {
    title: "Powerful Organization",
    description: "Find any beat instantly with smart search and filters",
    screenshot: "/screenshots/organization-light-new.png", 
    features: [
      "Search combinations",
      "Filter by tags",
      "Quick preview"
    ],
    color: "from-yellow-500/20 to-orange-500/20"
  }
]

export default function MobileShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const currentItem = showcaseData[activeIndex]

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % showcaseData.length)
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + showcaseData.length) % showcaseData.length)
  }

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
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

        {/* Main Showcase Card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl sm:rounded-3xl"
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${currentItem.color} opacity-50`} />
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl" />
              <div className="absolute inset-0 border border-white/20 rounded-2xl sm:rounded-3xl" />
              
              {/* Content */}
              <div className="relative z-10 p-6 sm:p-8 lg:p-12">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  {/* Left: Content */}
                  <div className="space-y-6 text-center lg:text-left">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-display font-bold mb-3 text-foreground">
                        {currentItem.title}
                      </h3>
                      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                        {currentItem.description}
                      </p>
                    </div>

                    {/* Features List */}
                    <div className="space-y-3">
                      {currentItem.features.map((feature, index) => (
                        <motion.div
                          key={feature}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + 0.3 }}
                          className="flex items-center gap-3 justify-center lg:justify-start"
                        >
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                          <span className="text-sm sm:text-base text-foreground">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Phone Mockup */}
                  <div className="flex justify-center lg:justify-end">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="relative max-w-[280px] sm:max-w-[320px]"
                    >
                      {/* Phone frame */}
                      <div className="relative">
                        {/* Glow effect */}
                        <motion.div
                          animate={{
                            scale: [1, 1.05, 1],
                            opacity: [0.5, 0.8, 0.5]
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="absolute -inset-4 bg-gradient-to-r from-primary-light/30 to-accent-vibrant/30 rounded-[3rem] blur-2xl"
                        />
                        
                        {/* Phone shell */}
                        <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-2 rounded-[2.5rem] shadow-2xl">
                          <div className="bg-black rounded-[2.3rem] overflow-hidden">
                            <motion.div
                              animate={{ y: [0, -5, 0] }}
                              transition={{ duration: 4, repeat: Infinity }}
                              className="aspect-[9/19.5] relative"
                            >
                              <Image
                                src={currentItem.screenshot}
                                alt={currentItem.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 280px, 320px"
                                priority
                              />
                            </motion.div>
                          </div>
                          
                          {/* Phone details */}
                          <div className="absolute right-[-5px] top-28 w-[4px] h-12 rounded-r-xl bg-gray-700" />
                          <div className="absolute left-[-5px] top-24 w-[4px] h-8 rounded-l-xl bg-gray-700" />
                          <div className="absolute left-[-5px] top-36 w-[4px] h-12 rounded-l-xl bg-gray-700" />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows - Hidden on small mobile */}
          <div className="hidden sm:flex absolute top-1/2 -translate-y-1/2 left-4 lg:left-8">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all hover:scale-110"
              aria-label="Previous feature"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
          </div>
          <div className="hidden sm:flex absolute top-1/2 -translate-y-1/2 right-4 lg:right-8">
            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all hover:scale-110"
              aria-label="Next feature"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="sm:hidden flex justify-center gap-4 mt-6">
          <button
            onClick={prevSlide}
            className="p-3 rounded-full bg-primary-light/20 hover:bg-primary-light/30 transition-colors"
            aria-label="Previous feature"
          >
            <ChevronLeft className="w-5 h-5 text-primary" />
          </button>
          <button
            onClick={nextSlide}
            className="p-3 rounded-full bg-primary-light/20 hover:bg-primary-light/30 transition-colors"
            aria-label="Next feature"
          >
            <ChevronRight className="w-5 h-5 text-primary" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {showcaseData.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'w-8 bg-primary'
                  : 'w-2 bg-gray-400 hover:bg-gray-600'
              }`}
              aria-label={`View feature ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
