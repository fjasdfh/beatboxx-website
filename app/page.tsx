'use client'

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useReducedMotion,
} from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { useInView } from 'react-intersection-observer'
import AnimatedButton from '@/components/AnimatedButton'
import AnnouncementBar from '@/components/AnnouncementBar'
import FeatureSection from '@/components/FeatureSection'
import MobileNav from '@/components/MobileNav'
import FloatingCTA from '@/components/FloatingCTA'
import ParticleBackground from '@/components/ParticleBackground'
import Footer from '@/components/Footer'
import {
  Sparkles,
  Music,
  Star,
  ChevronRight,
  Lock,
  Smartphone,
  Download,
  Instagram,
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

const stagger = {
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const ANDROID_URL =
  'https://play.google.com/store/apps/details?id=com.johannes.beatboxx'
const IOS_URL =
  'https://apps.apple.com/de/app/beatboxx-recorder-organizer/id6751503714'

const testimonials = [
  {
    quote: "I'm way more organized with my stuff now.",
    author: 'Beatboxer',
  },
  {
    quote:
      'Mate you have no idea how much it will change me and mostly my beginner beatbox friends who also want to beatbox in the high levels.',
    author: 'Community Member',
  },
  {
    quote:
      'If you are a Beatboxer who wants to progress and prepare for battle, show etc. this is the perfect app. A must for every Beatboxer.',
    author: 'Beatboxer',
  },
]

const faqs = [
  {
    question: 'How is Beatboxx different from Voice Memos?',
    answer:
      "Built for how beatboxers actually work. Auto-detect BPM, tag by technique, search combinations like 'technical + trap,' build routines, prep battle rounds.",
  },
  {
    question: 'Does it detect BPM automatically?',
    answer:
      'Yes. 70–200 BPM with harmonic matching. Re-detects after you trim. Tap-tempo if you want to set it yourself.',
  },
  {
    question: 'Is there a built-in metronome?',
    answer:
      'Yes. 40–240 BPM, time signatures from 2/4 to 20/4, tap-tempo, visual and audible beat.',
  },
  {
    question: 'Is Beatboxx free?',
    answer: 'Yes. No ads, no premium tier. Free on iOS and Android.',
  },
  {
    question: 'Is my stuff private?',
    answer:
      'Everything stays on your device. No cloud uploads, no accounts, no data collection. Full library export and restore via ZIP packages — nothing ever touches our servers.',
  },
  {
    question: 'Can I import existing voice memos?',
    answer:
      'Yes. Import from Voice Memos or Files — M4A, MP3, AAC, WAV, FLAC, and more. Tag, search, and drop them into routines.',
  },
  {
    question: 'How do I prep for different battle stages?',
    answer:
      'Battle Prep Mode has a dedicated workspace. Organize material by round (Elim → Quarter → Semi → Final), add alternates, quick-listen to any section, walk on stage knowing your set cold.',
  },
]

const faqPageLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.answer,
    },
  })),
}

export default function HomePage() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, 50])
  const y2 = useTransform(scrollY, [0, 300], [0, -50])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.5])

  return (
    <main className="overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageLd) }}
      />
      <AnnouncementBar />
      <MobileNav />
      <FloatingCTA />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 noise-bg">
        <ParticleBackground />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            style={{ y: y1 }}
            className="absolute -top-40 -right-40 w-72 h-72 sm:w-96 sm:h-96 bg-primary-light/25 rounded-full blur-3xl"
          />
          <motion.div
            style={{ y: y2 }}
            className="absolute -bottom-40 -left-40 w-72 h-72 sm:w-96 sm:h-96 bg-accent-vibrant/25 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-6 sm:space-y-8"
          >
            <motion.div variants={fadeInUp} className="inline-block">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-primary-light/20 to-accent-vibrant/20 border border-primary-light/30 backdrop-blur-md shadow-lg"
              >
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-xs sm:text-sm font-medium text-foreground">
                  Built by a beatboxer
                </span>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight">
                <motion.span
                  className="block mb-2"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                  style={{
                    background:
                      'linear-gradient(90deg, #526526, #D4EC9D, #8FD14F, #526526)',
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
                      1800,
                      'Detect',
                      1800,
                      'Tag',
                      1800,
                      'Build',
                      1800,
                      'Battle',
                      1800,
                    ]}
                    wrapper="span"
                    speed={50}
                    className="gradient-text"
                    repeat={Infinity}
                  />
                </span>
              </h1>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto px-4 leading-relaxed"
            >
              Built by a beatboxer who got tired of scrolling through 400 voice memos looking for that one fire drop.
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="text-sm sm:text-base text-foreground/80 max-w-2xl mx-auto px-4 font-medium"
            >
              Record ideas, build routines, prep for battles. 100% free.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-6 px-4"
            >
              <DownloadButtons icon={Download} fullWidthOnMobile />
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-xs sm:text-sm text-muted-foreground pt-2"
            >
              Free on iOS and Android. No ads. No premium tier.
            </motion.p>

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

            <motion.div
              variants={fadeInUp}
              className="md:hidden mt-8 relative mx-auto max-w-[260px] sm:max-w-[280px]"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-light/30 to-accent-vibrant/30 blur-xl rounded-full scale-110" />
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-1.5 sm:p-2 rounded-[2.2rem] sm:rounded-[2.5rem] shadow-2xl">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
                    <div className="w-24 h-5 bg-black rounded-b-2xl flex items-center justify-center">
                      <div className="w-12 h-3 bg-gray-800 rounded-full" />
                    </div>
                  </div>
                  <div className="aspect-[9/19.5] bg-black rounded-[2rem] sm:rounded-[2.3rem] overflow-hidden relative">
                    <Image
                      src="/screenshots/recording-light-new.png"
                      alt="Beatboxx app"
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 260px, 280px"
                    />
                  </div>
                  <div className="absolute right-[-4px] top-24 w-[3px] h-8 rounded-r-lg bg-gray-700" />
                  <div className="absolute left-[-4px] top-20 w-[3px] h-6 rounded-l-lg bg-gray-700" />
                  <div className="absolute left-[-4px] top-28 w-[3px] h-10 rounded-l-lg bg-gray-700" />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          style={{ opacity }}
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={() =>
              window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
            }
          >
            <span className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
              Scroll to explore
            </span>
            <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="w-1 h-3 bg-primary rounded-full mt-2"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Opening narrative */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-primary-light/5">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-display font-semibold leading-snug"
          >
            The beatbox recorder app designed around how beatboxers actually work.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            From capturing raw ideas to building polished routines to walking into a battle fully prepared. No ads. No premium tier. Just tools that actually help.
          </motion.p>
        </div>
      </section>

      <FeatureSection
        id="capture"
        label="Capture ideas instantly"
        headline="One tap and you&rsquo;re recording."
        body="Background support keeps capturing even when your screen locks. Every session gets a clean waveform you can scrub through and precision-trim down to the exact moment."
        bullets={[
          'One-tap recording',
          'Keeps going under screen lock',
          'SoundCloud-style waveform scrubbing',
          'Precision trim with waveform-guided handles',
        ]}
        screenshot="/screenshots/recording-light-new.png"
        screenshotAlt="Beatboxx recording screen"
        accent="from-red-500/20 to-orange-500/20"
      />

      <FeatureSection
        id="know"
        label="Know your sound"
        headline="Auto-detect BPM. Tag by technique. Find anything in seconds."
        body="Beatboxx detects the tempo of every recording automatically, with harmonic matching so 140 and 70 agree on what they are. Tap it in if you already know the feel. Tag by technique, energy, tempo, and mood — then search 'technical + trap' or 'drops' and get exactly what you need."
        bullets={[
          'Auto BPM detection (70–200, harmonic matching)',
          'Tap-tempo when you want to set it yourself',
          'Tag by technique, energy, tempo, mood',
          'Combine search terms like "technical + trap"',
          'Star favorites and filter by BPM range',
        ]}
        screenshot="/screenshots/organization-light-new.png"
        screenshotAlt="Beatboxx search and tagging"
        reversed
        accent="from-purple-500/20 to-pink-500/20"
      />

      <FeatureSection
        id="build"
        label="Build killer routines"
        headline="Structure your set. Intro. Build-up. Drop."
        body="Organize your best material into routines with drag-and-drop ordering. Move recordings between routines until the flow is perfect. Pin the takes you always come back to."
        bullets={[
          'Drag-and-drop section ordering',
          'Move recordings between routines',
          'Pin your best takes',
          'Genre-based folders',
        ]}
        screenshot="/screenshots/routine-light-new.png"
        screenshotAlt="Beatboxx routine builder"
        accent="from-green-500/20 to-emerald-500/20"
      />

      <FeatureSection
        id="battle"
        label="Battle prep mode"
        headline="Walk on stage knowing your set cold."
        body="A dedicated workspace for competition planning. Organize material by round, from elimination through finals. Quick-listen to any section when you need to remember how it starts."
        bullets={[
          'Rounds from Elim → Quarter → Semi → Final',
          'Alternates and backups per round',
          'Quick-listen to any section',
          'Reorder until the flow is perfect',
        ]}
        screenshot="/screenshots/battle-prep-light-new.png"
        screenshotAlt="Beatboxx battle prep"
        reversed
        accent="from-blue-500/20 to-purple-500/20"
      />

      <FeatureSection
        id="metronome"
        label="Stay on beat"
        headline="A metronome that moves with you."
        body="Practice with a click, record over it, tighten your timing. Adjust BPM and time signatures to whatever the piece asks for."
        bullets={[
          '40–240 BPM',
          'Time signatures from 2/4 to 20/4',
          'Tap-tempo when you know the feel',
          'Visual and audible beat',
        ]}
        accent="from-primary-light/30 to-accent-vibrant/30"
      >
        <MetronomeMock />
      </FeatureSection>

      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-foreground text-background">
        <div className="max-w-4xl mx-auto text-center">
          <PrivacySection />
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary-light/10 via-transparent to-accent-vibrant/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <TestimonialsSection />
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-primary-light/5">
        <div className="max-w-4xl mx-auto">
          <FAQSection />
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <FinalCTA />
      </section>

      <Footer />
    </main>
  )
}

function DownloadButtons({
  icon: Icon,
  fullWidthOnMobile,
}: {
  icon: typeof Download
  fullWidthOnMobile?: boolean
}) {
  const widthClass = fullWidthOnMobile ? 'w-full sm:w-auto' : ''
  return (
    <>
      <AnimatedButton href={ANDROID_URL} size="lg" variant="primary" className={widthClass} external>
        <Icon className="w-5 h-5 shrink-0" />
        <span className="ml-2">Download for Android</span>
      </AnimatedButton>
      <AnimatedButton href={IOS_URL} size="lg" variant="secondary" className={widthClass} external>
        <Icon className="w-5 h-5 shrink-0" />
        <span className="ml-2">Download for iOS</span>
      </AnimatedButton>
    </>
  )
}

function MetronomeMock() {
  // TODO: swap for real metronome screenshot when captured
  const [ref, inView] = useInView({ threshold: 0.3 })
  const reduceMotion = useReducedMotion()
  const animate = inView && !reduceMotion
  const bpm = 140
  const beats = [0, 1, 2, 3]

  return (
    <div ref={ref} className="relative w-full max-w-[420px]">
      <motion.div
        animate={animate ? { scale: [1, 1.03, 1], opacity: [0.4, 0.7, 0.4] } : undefined}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute -inset-6 bg-gradient-to-r from-primary-light/30 to-accent-vibrant/30 rounded-[2rem] blur-2xl"
      />
      <div className="relative rounded-3xl p-8 bg-gradient-to-br from-white/70 to-white/40 dark:from-white/10 dark:to-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-mono tracking-widest text-muted-foreground uppercase">
            Metronome
          </span>
          <span className="text-xs font-mono px-2 py-1 rounded-full bg-primary-light/30 text-primary">
            4/4
          </span>
        </div>

        <div className="flex items-end gap-3 mb-8">
          <span className="text-6xl sm:text-7xl font-display font-bold text-foreground tabular-nums">
            {bpm}
          </span>
          <span className="text-sm font-mono text-muted-foreground pb-3">BPM</span>
        </div>

        <div className="flex items-center gap-3 mb-6">
          {beats.map((i) => (
            <motion.div
              key={i}
              animate={
                animate
                  ? {
                      scale: [1, 1.25, 1],
                      backgroundColor: [
                        'rgba(82, 101, 38, 0.25)',
                        i === 0 ? '#8FD14F' : '#526526',
                        'rgba(82, 101, 38, 0.25)',
                      ],
                    }
                  : undefined
              }
              transition={{
                duration: (60 / bpm) * 4,
                repeat: Infinity,
                delay: (60 / bpm) * i,
                times: [0, 0.1, 1],
              }}
              className="flex-1 h-3 rounded-full bg-primary-light/30"
            />
          ))}
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="w-8 h-6 rounded-md border border-border-light flex items-center justify-center text-muted-foreground">
              −
            </div>
            <div className="w-8 h-6 rounded-md border border-border-light flex items-center justify-center text-muted-foreground">
              +
            </div>
          </div>
          <span className="px-3 py-1.5 rounded-full bg-primary text-background text-xs font-semibold tracking-wider">
            TAP
          </span>
        </div>
      </div>
    </div>
  )
}

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
      <span className="inline-block text-xs sm:text-sm font-mono tracking-[0.2em] uppercase opacity-80">
        Your beats stay yours
      </span>
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-background/10 backdrop-blur">
        <Lock className="w-10 h-10" />
      </div>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold">
        Everything lives on your device.
      </h2>
      <p className="text-base sm:text-lg lg:text-xl max-w-2xl mx-auto opacity-90 leading-relaxed">
        No cloud uploads. No accounts. No data collection. Back up and migrate your library via ZIP packages — nothing ever touches our servers. Your original sounds are private.
      </p>
      <div className="flex flex-wrap gap-3 sm:gap-4 justify-center pt-4">
        <Badge>No cloud</Badge>
        <Badge>No account</Badge>
        <Badge>No tracking</Badge>
        <Badge>ZIP backup &amp; restore</Badge>
      </div>
    </motion.div>
  )
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-background/10 backdrop-blur">
      <span className="text-sm font-medium">{children}</span>
    </div>
  )
}

function TestimonialsSection() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <span className="inline-block text-xs sm:text-sm font-mono tracking-[0.2em] text-primary uppercase mb-3">
          What beatboxers say
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-bold">
          Built with the community.
        </h2>
      </div>
      <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
        {testimonials.map((t, i) => (
          <TestimonialCard key={i} {...t} index={i} />
        ))}
      </div>
    </div>
  )
}

function TestimonialCard({
  quote,
  author,
  index,
}: {
  quote: string
  author: string
  index: number
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="relative p-6 sm:p-8 rounded-2xl bg-white/80 dark:bg-background/80 border border-border-light/70 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative z-10">
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4 sm:w-5 sm:h-5 fill-primary text-primary"
            />
          ))}
        </div>
        <blockquote className="text-base sm:text-lg mb-4 italic leading-relaxed text-foreground">
          <span className="text-3xl text-primary-light/50 mr-1">&ldquo;</span>
          {quote}
          <span className="text-3xl text-primary-light/50 ml-1">&rdquo;</span>
        </blockquote>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-light/40 flex items-center justify-center">
            <span className="text-lg font-bold text-primary">{author[0]}</span>
          </div>
          <p className="text-sm font-medium text-foreground">— {author}</p>
        </div>
      </div>
    </motion.div>
  )
}

function FAQSection() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <span className="inline-block text-xs sm:text-sm font-mono tracking-[0.2em] text-primary uppercase mb-3">
          Questions
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-bold">
          Things beatboxers ask.
        </h2>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <FAQItem key={i} {...faq} index={i} />
        ))}
      </div>
    </div>
  )
}

function FAQItem({
  question,
  answer,
  index,
}: {
  question: string
  answer: string
  index: number
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.35, delay: index * 0.05 }}
    >
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full rounded-xl overflow-hidden relative group text-left bg-white/90 dark:bg-background/90 border border-border-light/70"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
      >
        <div className="relative z-10 p-5 sm:p-6">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-primary-light/20 flex items-center justify-center text-xs font-bold text-primary">
                  {index + 1}
                </span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  Question
                </span>
              </div>
              <h3 className="font-semibold text-base sm:text-lg text-foreground pr-2">
                {question}
              </h3>
            </div>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="mt-1"
            >
              <div className="w-8 h-8 rounded-full bg-primary-light/20 flex items-center justify-center">
                <ChevronRight className="w-4 h-4 text-primary rotate-90" />
              </div>
            </motion.div>
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="pt-4 border-t border-border-light/60 mt-4">
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {answer}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.button>
    </motion.div>
  )
}

function FinalCTA() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto text-center"
    >
      <div className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-gradient-to-br from-primary-light/20 to-accent-vibrant/20 border border-primary-light/30 backdrop-blur-sm">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-semibold mb-6 leading-snug max-w-3xl mx-auto">
          Beatboxx won&rsquo;t make you a better beatboxer. Practice will. But it&rsquo;ll make sure you never lose your best ideas — and that when battle day comes, you&rsquo;re ready.
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground mb-8">
          Download it. It&rsquo;s free.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <DownloadButtons icon={Smartphone} fullWidthOnMobile />
        </div>
      </div>
    </motion.div>
  )
}

