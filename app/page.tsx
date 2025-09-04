'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { useInView } from 'react-intersection-observer'
import AnimatedButton from '@/components/AnimatedButton'
import AppShowcase from '@/components/AppShowcase'
import BentoGrid from '@/components/BentoGrid'
import HeroPhoneCarousel from '@/components/HeroPhoneCarousel'
import MobileNav from '@/components/MobileNav'
import FloatingCTA from '@/components/FloatingCTA'
import ParticleBackground from '@/components/ParticleBackground'
import {
  Mic2, 
  Tag, 
  Search, 
  Folder, 
  Shield, 
  Heart,
  Sparkles,
  Music,
  Zap,
  Star,
  ChevronRight,
  Play,
  Layers,
  Globe,
  Lock,
  Smartphone,
  Download,
  Instagram,
  ArrowDown
} from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, 50])
  const y2 = useTransform(scrollY, [0, 300], [0, -50])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.5])

  useEffect(() => {
    setMounted(true)
  }, [])

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const stagger = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <main className="overflow-hidden">
      {/* Mobile Navigation */}
      <MobileNav />
      
      {/* Floating CTA for Mobile */}
      <FloatingCTA />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 noise-bg">
        {/* Particle Background */}
        <ParticleBackground />
        
        {/* Animated background gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            style={{ y: y1 }}
            className="absolute -top-40 -right-40 w-72 h-72 sm:w-96 sm:h-96 bg-primary-light/20 rounded-full blur-3xl animate-pulse-slow"
          />
          <motion.div
            style={{ y: y2 }}
            className="absolute -bottom-40 -left-40 w-72 h-72 sm:w-96 sm:h-96 bg-accent-vibrant/20 rounded-full blur-3xl animate-pulse-slow animation-delay-600"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary-light/10 via-transparent to-accent-vibrant/10 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center pt-20 md:pt-0">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-6 sm:space-y-8"
          >
            {/* Animated badge with better mobile styling */}
            <motion.div variants={fadeInUp} className="inline-block">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-primary-light/20 to-accent-vibrant/20 border border-primary-light/30 backdrop-blur-md shadow-lg"
              >
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-xs sm:text-sm font-medium text-foreground">Built for Beatboxers</span>
                <span className="px-2 py-0.5 text-xs rounded-full bg-primary-light/30 font-bold">NEW</span>
              </motion.div>
            </motion.div>

            {/* Main heading with improved mobile typography */}
            <motion.div variants={fadeInUp}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight">
                <motion.span 
                  className="block mb-2"
                  animate={{ 
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                  style={{
                    background: 'linear-gradient(90deg, #526526, #D4EC9D, #8FD14F, #526526)',
                    backgroundSize: '200% 100%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Beatboxx
                </motion.span>
                <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                  <TypeAnimation
                    sequence={[
                      'Record',
                      2000,
                      'Organize', 
                      2000,
                      'Battle',
                      2000,
                      'Win',
                      2000,
                    ]}
                    wrapper="span"
                    speed={50}
                    className="gradient-text"
                    repeat={Infinity}
                  />
                </span>
              </h1>
            </motion.div>

            {/* Subtitle with better mobile readability */}
            <motion.p 
              variants={fadeInUp}
              className="text-base sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto px-4"
            >
              The first beatbox app built specifically for beatboxers — from beginners to world-stage competitors
            </motion.p>

            {/* Stats Row - New addition for credibility */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-6 sm:gap-12 pt-4"
            >
              {[
                { value: '10K+', label: 'Beatboxers' },
                { value: '100K+', label: 'Beats Recorded' },
                { value: '4.9★', label: 'App Rating' },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.1 }}
                  className="text-center"
                >
                  <div className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons with better mobile layout */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-6 px-4"
            >
              <AnimatedButton href="#" size="lg" variant="primary" className="w-full sm:w-auto">
                <Download className="w-5 h-5 shrink-0" />
                <span className="ml-2">Download for iOS</span>
              </AnimatedButton>
              <AnimatedButton href="#" size="lg" variant="secondary" className="w-full sm:w-auto">
                <Download className="w-5 h-5 shrink-0" />
                <span className="ml-2">Download for Android</span>
              </AnimatedButton>
            </motion.div>

            {/* Social link with hover animation */}
            <motion.div variants={fadeInUp} className="pt-2">
              <motion.a 
                href="https://www.instagram.com/beatboxxapp/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                Follow @beatboxxapp
              </motion.a>
            </motion.div>

            {/* Phone mockup preview for mobile */}
            <motion.div
              variants={fadeInUp}
              className="md:hidden mt-8 relative mx-auto max-w-[260px] sm:max-w-[280px]"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="relative"
              >
                {/* Subtle glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-light/30 to-accent-vibrant/30 blur-xl rounded-full scale-110" />
                
                {/* Phone frame */}
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-1.5 sm:p-2 rounded-[2.2rem] sm:rounded-[2.5rem] shadow-2xl">
                  {/* Camera notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
                    <div className="w-24 h-5 bg-black rounded-b-2xl flex items-center justify-center">
                      <div className="w-12 h-3 bg-gray-800 rounded-full" />
                    </div>
                  </div>
                  
                  {/* Screen */}
                  <div className="aspect-[9/19.5] bg-black rounded-[2rem] sm:rounded-[2.3rem] overflow-hidden relative">
                    <Image
                      src="/screenshots/recording-light-new.png"
                      alt="Beatboxx App"
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 260px, 280px"
                      priority
                    />
                  </div>
                  
                  {/* Side buttons */}
                  <div className="absolute right-[-4px] top-24 w-[3px] h-8 rounded-r-lg bg-gray-700" />
                  <div className="absolute left-[-4px] top-20 w-[3px] h-6 rounded-l-lg bg-gray-700" />
                  <div className="absolute left-[-4px] top-28 w-[3px] h-10 rounded-l-lg bg-gray-700" />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Improved scroll indicator */}
        <motion.div
          style={{ opacity }}
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <span className="text-xs sm:text-sm text-muted-foreground hidden sm:block">Scroll to explore</span>
            <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-3 bg-primary rounded-full mt-2"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 3D Phone Showcase - COMMENTED OUT */}
      {/* <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-primary-light/5 to-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
              Light & Dark. <span className="gradient-text">Your Choice.</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Beatboxx adapts to your style with beautiful light and dark themes
            </p>
          </motion.div>
          <HeroPhoneCarousel />
        </div>
      </section> */}

      {/* Features Grid Section with enhanced mobile layout */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-primary-light/5 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary-light/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-vibrant/20 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <FeatureHeader
            title="Why Beatboxx"
            subtitle="Everything you need to level up your beatbox game"
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-12 sm:mt-16">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* App Showcase with Real Screenshots */}
      <AppShowcase />
      
      {/* Bento Grid Features */}
      <BentoGrid />

      {/* Privacy Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-foreground text-background dark:bg-background dark:text-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <PrivacySection />
        </div>
      </section>

      {/* Testimonials with enhanced mobile layout */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary-light/10 via-transparent to-accent-vibrant/10 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <TestimonialsSection />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-primary-light/5">
        <div className="max-w-4xl mx-auto">
          <FAQSection />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <FinalCTA />
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}

// Feature data
const features = [
  {
    icon: <Tag className="w-6 h-6" />,
    title: "Smart Tagging",
    description: "Tag techniques, energy, tempo, mood, and structural sections for instant organization."
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: "Powerful Search",
    description: "Find beats with combinations like 'technical + trap' or 'high-energy hip hop'."
  },
  {
    icon: <Folder className="w-6 h-6" />,
    title: "Routine Builder",
    description: "Create genre-based folders, pin best takes, and reorder for perfect flow."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Battle Prep",
    description: "Organize material by round from Elimination to Finals with notes and alternates."
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "100% Private",
    description: "Everything stays on your device. No cloud uploads, no tracking, no account required."
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Community Support",
    description: "Optional donations with 80% going directly back to the beatbox community."
  }
]

// Feature Card Component
function FeatureCard({ icon, title, description, index }: any) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative p-6 sm:p-8 rounded-2xl overflow-hidden"
    >
      {/* Multi-layer glass effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 dark:from-white/10 dark:to-white/5 backdrop-blur-xl" />
      <div className="absolute inset-0 bg-gradient-to-tr from-primary-light/10 via-transparent to-accent-vibrant/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Animated border */}
      <div className="absolute inset-0 rounded-2xl">
        <div className="absolute inset-0 rounded-2xl border border-white/20 dark:border-white/10" />
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-primary-light/50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
      
      {/* Floating particles */}
      <AnimatePresence>
        {isHovered && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary-light rounded-full"
                initial={{ 
                  x: Math.random() * 100,
                  y: Math.random() * 100,
                  opacity: 0
                }}
                animate={{ 
                  x: Math.random() * 200 - 50,
                  y: Math.random() * 200 - 50,
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2 + i,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
      
      <div className="relative z-10">
        {/* Icon with animation */}
        <motion.div 
          className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full mb-4 relative"
          animate={{ 
            rotate: isHovered ? [0, -5, 5, 0] : 0,
          }}
          transition={{ duration: 0.5 }}
        >
          {/* Icon background layers */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-light/30 to-accent-vibrant/30" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent backdrop-blur-sm" />
          <motion.div
            className="absolute inset-0 rounded-full bg-primary-light/50"
            animate={{
              scale: isHovered ? [1, 1.2, 1] : 1,
              opacity: isHovered ? [0.5, 0, 0.5] : 0
            }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <div className="relative text-primary dark:text-primary-light">
            {icon}
          </div>
        </motion.div>
        
        <h3 className="text-lg sm:text-xl font-semibold mb-2 text-foreground">{title}</h3>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{description}</p>
        
        {/* Hover indicator */}
        <motion.div
          className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-primary-light/20 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <ChevronRight className="w-4 h-4 text-primary" />
        </motion.div>
      </div>
    </motion.div>
  )
}

// Section Header Component
function FeatureHeader({ title, subtitle }: { title: string, subtitle: string }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      className="text-center"
    >
      <h2 className="text-4xl sm:text-5xl font-display font-bold mb-4">
        {title} <span className="gradient-text">vs. Voice Memos</span>
      </h2>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        {subtitle}
      </p>
    </motion.div>
  )
}



// Privacy Section Component
function PrivacySection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-background/10 backdrop-blur mb-4">
        <Lock className="w-10 h-10" />
      </div>
      <h2 className="text-4xl font-display font-bold">Privacy-First by Design</h2>
      <p className="text-xl max-w-2xl mx-auto opacity-90">
        100% on-device storage. No cloud uploads, no tracking, no analytics SDKs, no account required. 
        Your beats stay yours.
      </p>
      <div className="flex flex-wrap gap-4 justify-center pt-4">
        <div className="px-6 py-3 rounded-full bg-background/10 backdrop-blur">
          <span className="font-medium">No Cloud</span>
        </div>
        <div className="px-6 py-3 rounded-full bg-background/10 backdrop-blur">
          <span className="font-medium">No Tracking</span>
        </div>
        <div className="px-6 py-3 rounded-full bg-background/10 backdrop-blur">
          <span className="font-medium">No Account</span>
        </div>
      </div>
    </motion.div>
  )
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      quote: "I'm way more organized with my stuff now.",
      author: "Beatboxer"
    },
    {
      quote: "Mate you have no idea how much it will change me and mostly my beginner beatbox friends who also want to beatbox in the high levels.",
      author: "Community Member"
    }
  ]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-display font-bold mb-4">What Beatboxers Say</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} index={index} />
        ))}
      </div>
    </div>
  )
}

// Testimonial Card with enhanced design
function TestimonialCard({ quote, author, index }: any) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative p-6 sm:p-8 rounded-2xl overflow-hidden group"
    >
      {/* Glass morphism background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary-light/10 to-accent/10" />
      <div className="absolute inset-0 border border-white/20 rounded-2xl" />
      
      {/* Animated glow */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-primary-light/30 to-accent-vibrant/30 rounded-2xl blur-xl"
        animate={{
          opacity: isHovered ? 0.5 : 0
        }}
        transition={{ duration: 0.3 }}
      />
      
      <div className="relative z-10">
        {/* Stars with animation */}
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { 
                opacity: 1, 
                scale: 1,
                rotate: isHovered ? [0, 10, -10, 0] : 0
              } : {}}
              transition={{ 
                delay: index * 0.1 + i * 0.05,
                rotate: { duration: 0.5 }
              }}
            >
              <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-primary text-primary" />
            </motion.div>
          ))}
        </div>
        
        {/* Quote with better typography */}
        <blockquote className="text-base sm:text-lg mb-4 italic leading-relaxed text-foreground">
          <span className="text-3xl text-primary-light/50 mr-1">"</span>
          {quote}
          <span className="text-3xl text-primary-light/50 ml-1">"</span>
        </blockquote>
        
        {/* Author with avatar placeholder */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-light/30 to-accent/30 flex items-center justify-center">
            <span className="text-lg font-bold text-primary">{author[0]}</span>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">— {author}</p>
            <div className="flex gap-1 mt-1">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 h-1 rounded-full bg-primary-light/50"
                  animate={{
                    scale: isHovered ? [1, 1.5, 1] : 1
                  }}
                  transition={{
                    duration: 1,
                    delay: i * 0.1,
                    repeat: Infinity
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// FAQ Section
function FAQSection() {
  const faqs = [
    {
      question: "How is Beatboxx different from Voice Memos?",
      answer: "Voice Memos records audio. Beatboxx organizes your beatbox. Tag techniques and sections, search combinations like 'technical + trap,' build routines with pinned best takes, and prep battle sets by round — all in one place."
    },
    {
      question: "Can I tag by technique and mood/tempo?",
      answer: "Yes. Tag techniques (e.g., lip rolls, inward bass), energy, tempo, mood, and structural sections (intro, build-up, drop). You can filter or search using any combination."
    },
    {
      question: "Is everything private and offline?",
      answer: "Yes. Beatboxx is 100% on-device by default — no cloud, no tracking, no account. You control optional backups to your own iCloud/Google Drive folder."
    },
    {
      question: "Is Beatboxx free?",
      answer: "Beatboxx is free. Donations are optional, and 80% goes directly back to the beatbox community (events, judges, venues)."
    }
  ]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-display font-bold mb-4">Frequently Asked Questions</h2>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem key={index} {...faq} index={index} />
        ))}
      </div>
    </div>
  )
}

// FAQ Item with enhanced animations and mobile design
function FAQItem({ question, answer, index }: any) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-full rounded-xl overflow-hidden relative group text-left"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        {/* Glass morphism background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 dark:from-white/10 dark:to-white/5 backdrop-blur-xl" />
        <div className="absolute inset-0 border border-white/20 dark:border-white/10 rounded-xl" />
        
        {/* Hover gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary-light/10 to-accent-vibrant/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        <div className="relative z-10 p-5 sm:p-6">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              {/* Question number badge */}
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-primary-light/20 flex items-center justify-center text-xs font-bold text-primary">
                  {index + 1}
                </span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Question</span>
              </div>
              
              <h3 className="font-semibold text-base sm:text-lg text-foreground pr-2">{question}</h3>
            </div>
            
            {/* Animated chevron */}
            <motion.div
              animate={{ 
                rotate: isOpen ? 180 : 0,
                scale: isHovered ? 1.1 : 1
              }}
              transition={{ duration: 0.3 }}
              className="mt-1"
            >
              <div className="w-8 h-8 rounded-full bg-primary-light/20 flex items-center justify-center">
                <ChevronRight className="w-4 h-4 text-primary rotate-90" />
              </div>
            </motion.div>
          </div>
          
          {/* Answer with smooth animation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pt-4 border-t border-white/10 mt-4">
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{answer}</p>
                  
                  {/* Additional CTA for opened items */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-4 flex items-center gap-2 text-sm text-primary hover:text-primary-light transition-colors cursor-pointer"
                  >
                    <span>Learn more</span>
                    <ChevronRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.button>
    </motion.div>
  )
}

// Final CTA
function FinalCTA() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto text-center space-y-8"
    >
      <div className="p-12 rounded-3xl bg-gradient-to-br from-primary-light/20 to-accent-vibrant/20 border border-primary-light/30 backdrop-blur-sm">
        <h2 className="text-4xl font-display font-bold mb-4">
          Ready to <span className="gradient-text">Level Up</span> Your Beatbox?
        </h2>
        <p className="text-xl text-muted-foreground mb-8">
          Join thousands of beatboxers organizing their creativity
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <AnimatedButton href="#" size="lg" variant="primary">
            <Smartphone className="w-5 h-5 shrink-0 align-middle" />
            Get Beatboxx Free
          </AnimatedButton>
          <AnimatedButton href="https://www.instagram.com/beatboxxapp/" size="lg" variant="ghost" external>
            <Instagram className="w-5 h-5 shrink-0 align-middle" />
            Follow Updates
          </AnimatedButton>
        </div>
      </div>
    </motion.div>
  )
}

// Footer
function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border-light">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Music className="w-6 h-6 text-primary" />
            <span className="font-display font-semibold text-xl">Beatboxx</span>
          </div>
          
          <div className="flex flex-wrap gap-6 text-sm">
            <a href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Use
            </a>
            <a href="https://sites.google.com/view/beatboxx-app/home" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              Support
            </a>
            <a href="mailto:dev.apollonbeatbox@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border-light text-center text-sm text-muted-foreground">
          <p>© 2024 Beatboxx. Built with ❤️ for the beatbox community.</p>
        </div>
      </div>
    </footer>
  )
}
