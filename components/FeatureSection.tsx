'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { ReactNode } from 'react'

interface FeatureSectionProps {
  label: string
  headline: string
  body: string
  bullets: string[]
  screenshot?: string
  screenshotAlt?: string
  reversed?: boolean
  accent?: string
  children?: ReactNode
  id?: string
}

export default function FeatureSection({
  label,
  headline,
  body,
  bullets,
  screenshot,
  screenshotAlt,
  reversed = false,
  accent = 'from-primary-light/20 to-accent-vibrant/20',
  children,
  id,
}: FeatureSectionProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section
      id={id}
      ref={ref}
      className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
            reversed ? 'lg:[&>*:first-child]:order-2' : ''
          }`}
        >
          {/* Copy column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-5 text-center lg:text-left"
          >
            <span className="inline-block text-xs sm:text-sm font-mono tracking-[0.2em] text-primary uppercase">
              {label}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight">
              {headline}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
              {body}
            </p>
            <ul className="space-y-3 pt-2 inline-block text-left lg:block">
              {bullets.map((bullet, i) => (
                <motion.li
                  key={bullet}
                  initial={{ opacity: 0, x: reversed ? 20 : -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <span className="text-sm sm:text-base text-foreground leading-relaxed">
                    {bullet}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Visual column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex justify-center"
          >
            {children ? (
              <div className="w-full max-w-[420px]">{children}</div>
            ) : screenshot ? (
              <PhoneMockup screenshot={screenshot} alt={screenshotAlt ?? headline} accent={accent} />
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function PhoneMockup({
  screenshot,
  alt,
  accent,
}: {
  screenshot: string
  alt: string
  accent: string
}) {
  return (
    <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[360px]">
      <motion.div
        animate={{ scale: [1, 1.03, 1], opacity: [0.5, 0.75, 0.5] }}
        transition={{ duration: 4, repeat: Infinity }}
        className={`absolute -inset-6 bg-gradient-to-r ${accent} rounded-[3rem] blur-2xl`}
      />
      <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-2 rounded-[2.5rem] shadow-2xl">
        <div className="bg-black rounded-[2.3rem] overflow-hidden">
          <div className="aspect-[9/19.5] relative">
            <Image
              src={screenshot}
              alt={alt}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 360px"
            />
          </div>
        </div>
        <div className="absolute right-[-4px] top-28 w-[3px] h-12 rounded-r-lg bg-gray-700" />
        <div className="absolute left-[-4px] top-24 w-[3px] h-8 rounded-l-lg bg-gray-700" />
        <div className="absolute left-[-4px] top-36 w-[3px] h-12 rounded-l-lg bg-gray-700" />
      </div>
    </div>
  )
}
