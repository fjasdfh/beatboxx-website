'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

interface PhoneMockupProps {
  screenshots: string[]
  title?: string
  autoRotate?: boolean
}

export default function PhoneMockup({ screenshots, title, autoRotate = true }: PhoneMockupProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  // Auto-rotate through screenshots
  if (autoRotate && typeof window !== 'undefined') {
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % screenshots.length)
    }, 4000)
  }

  return (
    <div className="relative">
      {/* Phone frame */}
      <div className="relative mx-auto max-w-[320px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          {/* Phone outer frame */}
          <div className="relative rounded-[3rem] bg-gradient-to-br from-gray-800 to-gray-900 p-2 shadow-2xl">
            {/* Phone inner frame */}
            <div className="relative rounded-[2.5rem] bg-black p-1">
              {/* Screen bezel */}
              <div className="relative rounded-[2.3rem] bg-gradient-to-b from-gray-900 to-black p-[2px]">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
                  <div className="w-40 h-7 bg-black rounded-b-3xl flex items-center justify-center">
                    <div className="w-20 h-4 bg-gray-800 rounded-full" />
                  </div>
                </div>
                
                {/* Screen */}
                <div className="relative overflow-hidden rounded-[2.2rem] bg-black">
                  <div className="relative aspect-[9/19.5]">
                    {screenshots.map((screenshot, index) => (
                      <motion.div
                        key={screenshot}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{
                          opacity: index === activeIndex ? 1 : 0,
                          x: index === activeIndex ? 0 : -100,
                          scale: index === activeIndex ? 1 : 0.9
                        }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={screenshot}
                          alt={`Screenshot ${index + 1}`}
                          fill
                          className="object-cover"
                          priority={index === 0}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Side buttons */}
              <div className="absolute right-[-8px] top-32 w-1 h-12 bg-gray-700 rounded-r-lg" />
              <div className="absolute left-[-8px] top-28 w-1 h-8 bg-gray-700 rounded-l-lg" />
              <div className="absolute left-[-8px] top-40 w-1 h-12 bg-gray-700 rounded-l-lg" />
              <div className="absolute left-[-8px] top-56 w-1 h-12 bg-gray-700 rounded-l-lg" />
            </div>
          </div>

          {/* Reflection effect */}
          <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-tr from-white/0 via-white/10 to-white/0 pointer-events-none" />
          
          {/* Glow effect */}
          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -inset-4 rounded-[3rem] bg-gradient-to-r from-primary-light/20 to-accent-vibrant/20 blur-2xl -z-10"
          />
        </motion.div>

        {/* Screenshot indicators */}
        {screenshots.length > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {screenshots.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'w-8 bg-primary'
                    : 'bg-gray-400 hover:bg-gray-600'
                }`}
                aria-label={`View screenshot ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Title */}
      {title && (
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-6 text-lg font-medium text-muted-foreground"
        >
          {title}
        </motion.h3>
      )}
    </div>
  )
}
