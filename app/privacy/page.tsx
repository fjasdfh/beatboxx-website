'use client'

import { motion } from 'framer-motion'
import { Shield, Lock, Eye, Server, Cookie, Mail, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'

export default function PrivacyPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <main className="min-h-screen px-4 sm:px-6 lg:px-8 py-12">
      {/* Back to home link */}
      <div className="max-w-4xl mx-auto mb-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-light/20 mb-6"
          >
            <Shield className="w-10 h-10 text-primary" />
          </motion.div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground">
            Last updated: September 2024
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <Section
            icon={<Lock className="w-6 h-6" />}
            title="Our Commitment to Privacy"
            delay={0.1}
          >
            <p className="text-muted-foreground">
              Beatboxx is built with privacy as a core principle. We believe your creative work should remain yours alone. 
              This app operates entirely on your device, with no cloud services, no tracking, and no data collection.
            </p>
          </Section>

          <Section
            icon={<Eye className="w-6 h-6" />}
            title="What We Collect"
            delay={0.2}
          >
            <p className="text-muted-foreground font-semibold">
              Nothing. Absolutely nothing.
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• No personal information</li>
              <li>• No usage analytics</li>
              <li>• No crash reports</li>
              <li>• No location data</li>
              <li>• No device identifiers</li>
            </ul>
          </Section>

          <Section
            icon={<Server className="w-6 h-6" />}
            title="Data Storage"
            delay={0.3}
          >
            <p className="text-muted-foreground">
              All your recordings, tags, routines, and battle preparations are stored locally on your device. 
              We have no servers, no cloud infrastructure, and no way to access your data.
            </p>
            <div className="mt-4 p-4 rounded-lg bg-primary-light/10 border border-primary-light/20">
              <p className="text-sm">
                <strong>Optional Backups:</strong> You can choose to backup your data to your own iCloud (iOS) or Google Drive (Android) account. 
                These backups are entirely under your control and we have no access to them.
              </p>
            </div>
          </Section>

          <Section
            icon={<Cookie className="w-6 h-6" />}
            title="Third-Party Services"
            delay={0.4}
          >
            <p className="text-muted-foreground">
              Beatboxx uses no third-party analytics, advertising, or tracking services. 
              The app contains no SDKs that collect data. It's just you and your beatbox.
            </p>
          </Section>

          <Section
            icon={<Mail className="w-6 h-6" />}
            title="Contact"
            delay={0.5}
          >
            <p className="text-muted-foreground">
              If you have any questions about our privacy practices, please contact us at:
            </p>
            <p className="mt-2">
              <a href="mailto:dev.apollonbeatbox@gmail.com" className="text-primary hover:text-primary-dark transition-colors">
                dev.apollonbeatbox@gmail.com
              </a>
            </p>
          </Section>

          {/* Summary Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-primary-light/10 to-accent/10 border border-primary-light/20"
          >
            <h2 className="text-2xl font-display font-bold mb-4">
              Privacy Summary
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground mt-1">On-Device</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-primary">0</div>
                <div className="text-sm text-muted-foreground mt-1">Data Collected</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-primary">∞</div>
                <div className="text-sm text-muted-foreground mt-1">Privacy</div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </main>
  )
}

function Section({ icon, title, children, delay }: any) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="mb-12"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary-light/20 text-primary">
          {icon}
        </div>
        <h2 className="text-2xl font-display font-bold">{title}</h2>
      </div>
      {children}
    </motion.section>
  )
}
