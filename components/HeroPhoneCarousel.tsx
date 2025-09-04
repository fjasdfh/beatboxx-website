'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Sun, Moon, ChevronLeft, ChevronRight } from 'lucide-react'

const phoneScreenshots = [
  {
    light: '/screenshots/battle-prep-light-new.png',
    dark: '/screenshots/battle-prep-dark-new.png',
    title: 'Battle Preparation',
    description: 'Organize your sets for GBB'
  },
  {
    light: '/screenshots/recording-light-new.png',
    dark: '/screenshots/recording-dark-new.png',
    title: 'Smart Recording',
    description: 'Tag and organize your beats'
  },
  {
    light: '/screenshots/routine-light-new.png',
    dark: '/screenshots/routine-dark-new.png',
    title: 'Routine Builder',
    description: 'Perfect your flow'
  },
  {
    light: '/screenshots/organization-light-new.png',
    dark: '/screenshots/organization-dark-new.png',
    title: 'Powerful Search',
    description: 'Find beats instantly'
  }
]

export default function HeroPhoneCarousel() {
  const [activeIndex, setActiveIndex] = useState(1) // Start with middle phone
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-rotate phones
  useEffect(() => {
    if (!isAutoPlaying) return
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % phoneScreenshots.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isAutoPlaying])

  // Auto-toggle theme
  useEffect(() => {
    const themeTimer = setInterval(() => {
      setIsDarkMode(prev => !prev)
    }, 10000)
    return () => clearInterval(themeTimer)
  }, [])

  const handlePrevious = () => {
    setIsAutoPlaying(false)
    setActiveIndex((prev) => (prev - 1 + phoneScreenshots.length) % phoneScreenshots.length)
  }

  const handleNext = () => {
    setIsAutoPlaying(false)
    setActiveIndex((prev) => (prev + 1) % phoneScreenshots.length)
  }

  return (
    <div className="relative min-h-[800px] flex flex-col items-center justify-center overflow-hidden py-8">
      {/* Theme toggle */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute top-4 right-4 z-30"
      >
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors"
        >
          <Sun className={`w-4 h-4 transition-all ${!isDarkMode ? 'text-yellow-400 rotate-0' : 'text-gray-400 -rotate-90'}`} />
          <span className="text-sm font-medium">Theme</span>
          <Moon className={`w-4 h-4 transition-all ${isDarkMode ? 'text-blue-400 rotate-0' : 'text-gray-400 rotate-90'}`} />
        </button>
      </motion.div>

      {/* Main carousel container */}
      <div className="relative w-full max-w-7xl mx-auto h-[580px] perspective-1000">
        {/* Navigation buttons */}
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors"
          aria-label="Previous phone"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors"
          aria-label="Next phone"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Phones container */}
        <div className="absolute inset-0 flex items-center justify-center">
          {phoneScreenshots.map((screenshot, index) => {
            const position = index - activeIndex
            const isActive = index === activeIndex
            const isPrevious = position === -1 || (activeIndex === 0 && index === phoneScreenshots.length - 1)
            const isNext = position === 1 || (activeIndex === phoneScreenshots.length - 1 && index === 0)
            
            // Calculate normalized position for circular carousel
            let normalizedPosition = position
            if (Math.abs(position) > 1) {
              if (position > 0) {
                normalizedPosition = position - phoneScreenshots.length
              } else {
                normalizedPosition = position + phoneScreenshots.length
              }
            }

            return (
              <motion.div
                key={index}
                animate={{
                  x: normalizedPosition * 280,
                  z: isActive ? 100 : -100,
                  rotateY: normalizedPosition * -25,
                  scale: isActive ? 1.1 : 0.85,
                  opacity: isActive ? 1 : isPrevious || isNext ? 0.7 : 0,
                  filter: isActive ? 'blur(0px)' : 'blur(1px)'
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 80, 
                  damping: 15,
                  mass: 1
                }}
                className="absolute preserve-3d"
                style={{ 
                  transformStyle: 'preserve-3d',
                  zIndex: isActive ? 10 : 5
                }}
                onClick={() => {
                  if (!isActive) {
                    setIsAutoPlaying(false)
                    setActiveIndex(index)
                  }
                }}
              >
                <PhoneFrame3D
                  screenshot={isDarkMode ? screenshot.dark : screenshot.light}
                  isActive={isActive}
                  isDark={isDarkMode}
                  title={screenshot.title}
                />
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Info section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center mt-8"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-2">
              {phoneScreenshots[activeIndex].title}
            </h3>
            <p className="text-muted-foreground">
              {phoneScreenshots[activeIndex].description}
            </p>
          </motion.div>
        </AnimatePresence>
        
        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {phoneScreenshots.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAutoPlaying(false)
                setActiveIndex(index)
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'w-8 bg-primary'
                  : 'w-2 bg-gray-400/50 hover:bg-gray-400'
              }`}
              aria-label={`View ${phoneScreenshots[index].title}`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

function PhoneFrame3D({ screenshot, isActive, isDark, title }: { screenshot: string, isActive: boolean, isDark: boolean, title?: string }) {
  return (
    <motion.div
      whileHover={isActive ? { scale: 1.02 } : {}}
      className="relative cursor-pointer"
    >
      {/* Phone shadow */}
      <motion.div
        animate={{
          scale: isActive ? [1, 1.1, 1] : 0.9,
          opacity: isActive ? [0.15, 0.25, 0.15] : 0.05
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-64 h-20 bg-black rounded-[50%] blur-2xl"
      />

      {/* Pixel 9 Pro Frame - Always Black */}
      <div className={`relative rounded-[2.75rem] p-[4px] transition-all duration-700 bg-gradient-to-br from-black via-gray-900 to-black ${
        isActive ? 'shadow-2xl' : 'shadow-lg'
      }`}>
        {/* Inner frame */}
        <div className="relative rounded-[2.5rem] p-[2px] bg-black">
          {/* Screen container with more rounded corners */}
          <div className="relative rounded-[2.35rem] overflow-hidden bg-black">
            {/* Pixel 9 Pro camera bar (top) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
              <div className="w-32 h-6 bg-black rounded-b-2xl flex items-center justify-center">
                {/* Camera lenses */}
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-gray-800 rounded-full" />
                  <div className="w-2 h-2 bg-gray-700 rounded-full" />
                  <div className="w-3 h-3 bg-gray-800 rounded-full" />
                </div>
              </div>
            </div>
            
            {/* Screen */}
            <div className="relative w-[250px] aspect-[9/19.5] bg-black">
              <Image
                src={screenshot}
                alt={title || "App Screenshot"}
                fill
                className="object-cover object-top rounded-[2.2rem]"
                priority={isActive}
                quality={95}
              />
            </div>
          </div>
          
          {/* Pixel 9 Pro side buttons - Always black/dark gray */}
          <div className="absolute right-[-5px] top-28 w-[4px] h-12 rounded-r-xl bg-gray-800" />
          <div className="absolute left-[-5px] top-24 w-[4px] h-8 rounded-l-xl bg-gray-800" />
          <div className="absolute left-[-5px] top-36 w-[4px] h-12 rounded-l-xl bg-gray-800" />
        </div>
      </div>

      {/* Subtle glass reflection */}
      <div className="absolute inset-0 rounded-[2.75rem] bg-gradient-to-br from-white/10 via-white/3 to-transparent pointer-events-none" />
      
      {/* Active glow */}
      {isActive && (
        <motion.div
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -inset-8 rounded-[3.5rem] bg-gradient-to-r from-primary-light/20 via-accent-vibrant/20 to-primary-light/20 blur-2xl -z-10"
        />
      )}
    </motion.div>
  )
}

