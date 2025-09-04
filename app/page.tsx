'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { useInView } from 'react-intersection-observer'
import AnimatedButton from '@/components/AnimatedButton'
import AppShowcase from '@/components/AppShowcase'
import BentoGrid from '@/components/BentoGrid'
import HeroPhoneCarousel from '@/components/HeroPhoneCarousel'
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
  Instagram
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
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 noise-bg">
        {/* Animated background gradients */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            style={{ y: y1 }}
            className="absolute -top-40 -right-40 w-96 h-96 bg-primary-light/20 rounded-full blur-3xl animate-pulse-slow"
          />
          <motion.div
            style={{ y: y2 }}
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-vibrant/20 rounded-full blur-3xl animate-pulse-slow animation-delay-600"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-8"
          >
            {/* Animated badge */}
            <motion.div variants={fadeInUp} className="inline-block">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-light/10 border border-primary-light/20 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-sm font-medium text-foreground">Built for Beatboxers</span>
              </div>
            </motion.div>

            {/* Main heading with typing animation */}
            <motion.div variants={fadeInUp}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold tracking-tight">
                <span className="block">Beatboxx:</span>
                <span className="block mt-2">
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

            {/* Subtitle */}
            <motion.p 
              variants={fadeInUp}
              className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto"
            >
              The first beatbox app built specifically for beatboxers — from beginners to world-stage competitors
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
            >
              <AnimatedButton href="#" size="lg" variant="primary">
                <Download className="w-5 h-5 shrink-0 align-middle" />
                Download for iOS
              </AnimatedButton>
              <AnimatedButton href="#" size="lg" variant="secondary">
                <Download className="w-5 h-5 shrink-0 align-middle" />
                Download for Android
              </AnimatedButton>
            </motion.div>

            {/* Social link */}
            <motion.div variants={fadeInUp} className="pt-4">
              <a 
                href="https://www.instagram.com/beatboxxapp/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="w-4 h-4" />
                Follow @beatboxxapp
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated scroll indicator */}
        <motion.div
          style={{ opacity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-sm text-muted-foreground">Scroll to explore</span>
            <ChevronRight className="w-5 h-5 rotate-90 text-primary" />
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

      {/* Features Grid Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-primary-light/5">
        <div className="max-w-7xl mx-auto">
          <FeatureHeader
            title="Why Beatboxx"
            subtitle="Everything you need to level up your beatbox game"
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
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

      {/* Testimonials */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative p-8 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-border-light hover:border-primary-light/50 transition-all duration-300 card-hover"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-light/0 to-accent-vibrant/0 group-hover:from-primary-light/10 group-hover:to-accent-vibrant/10 transition-all duration-500" />
      
      <div className="relative">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary-light/20 text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
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

// Testimonial Card
function TestimonialCard({ quote, author, index }: any) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="p-8 rounded-2xl bg-gradient-to-br from-primary-light/10 to-accent/10 border border-primary-light/20"
    >
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-primary text-primary" />
        ))}
      </div>
      <blockquote className="text-lg mb-4 italic">"{quote}"</blockquote>
      <p className="text-sm text-muted-foreground">— {author}</p>
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

// FAQ Item
function FAQItem({ question, answer, index }: any) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-border-light hover:border-primary-light/50 transition-all duration-300 text-left"
      >
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg pr-4">{question}</h3>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronRight className="w-5 h-5 text-primary rotate-90" />
          </motion.div>
        </div>
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="mt-4 text-muted-foreground">{answer}</p>
        </motion.div>
      </button>
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
