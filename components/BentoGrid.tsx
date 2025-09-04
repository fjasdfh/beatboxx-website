'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
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
  Wand2,
  Timer,
  Trophy
} from 'lucide-react'
import Image from 'next/image'

const bentoItems = [
  {
    title: "Smart Tagging System",
    description: "Tag by technique, energy, tempo, mood, and sections",
    icon: <Tag className="w-6 h-6" />,
    className: "lg:col-span-2",
    gradient: "from-purple-500/20 to-pink-500/20",
    demo: (
      <div className="flex flex-wrap gap-2 mt-4">
        {['DnB', 'Fast', 'Groovy', 'Hip Hop', 'Build-up', 'Drop'].map((tag) => (
          <motion.span
            key={tag}
            whileHover={{ scale: 1.1 }}
            className="px-3 py-1 rounded-full bg-primary-light/30 text-sm font-medium"
          >
            {tag}
          </motion.span>
        ))}
      </div>
    )
  },
  {
    title: "Battle Timer",
    description: "Practice with real battle timings",
    icon: <Timer className="w-6 h-6" />,
    gradient: "from-blue-500/20 to-cyan-500/20",
    demo: (
      <div className="mt-4">
        <div className="text-3xl font-bold font-mono text-center">1:30</div>
        <div className="w-full h-2 bg-gray-300 rounded-full mt-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent-vibrant"
            animate={{ width: ['0%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>
      </div>
    )
  },
  {
    title: "Quick Recording",
    description: "One-tap recording with auto-save",
    icon: <Mic2 className="w-6 h-6" />,
    gradient: "from-red-500/20 to-orange-500/20",
    demo: (
      <motion.div
        className="mt-4 w-20 h-20 mx-auto rounded-full bg-red-500 flex items-center justify-center cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Mic2 className="w-8 h-8 text-white" />
      </motion.div>
    )
  },
  {
    title: "Routine Builder",
    description: "Drag & drop to perfect your flow",
    icon: <Layers className="w-6 h-6" />,
    className: "lg:col-span-2",
    gradient: "from-green-500/20 to-emerald-500/20",
    demo: (
      <div className="space-y-2 mt-4">
        {['Opening', 'Build-up', 'Drop', 'Outro'].map((section, index) => (
          <motion.div
            key={section}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3 p-2 rounded-lg bg-white/10"
          >
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-sm">{section}</span>
          </motion.div>
        ))}
      </div>
    )
  },
  {
    title: "100% Private",
    description: "Your data never leaves your device",
    icon: <Lock className="w-6 h-6" />,
    gradient: "from-gray-500/20 to-gray-600/20",
    demo: (
      <div className="mt-4 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800/20">
          <Lock className="w-8 h-8 text-gray-300" />
        </div>
        <div className="mt-2 text-xs text-gray-500">On-Device Only</div>
      </div>
    )
  }
]

export default function BentoGrid() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-light/10 border border-primary-light/20 backdrop-blur-sm mb-4">
            <Wand2 className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium">Powerful Features</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-display font-bold mb-4">
            Everything You Need to <span className="gradient-text">Win</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional tools designed for serious beatboxers
          </p>
        </motion.div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {bentoItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative p-6 rounded-2xl overflow-hidden ${item.className || ''}`}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-50 group-hover:opacity-70 transition-opacity`} />
              
              {/* Glass effect */}
              <div className="absolute inset-0 backdrop-blur-sm bg-white/5" />
              
              {/* Border */}
              <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-white/20 transition-colors" />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 rounded-lg bg-white/10 text-white/80 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="opacity-50"
                  >
                    <Sparkles className="w-4 h-4" />
                  </motion.div>
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                
                {item.demo && (
                  <div className="mt-4">
                    {item.demo}
                  </div>
                )}
              </div>
              
              {/* Hover effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-light/0 to-accent-vibrant/0 opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none"
                whileHover={{ scale: 1.05 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
