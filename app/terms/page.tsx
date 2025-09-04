'use client'

import { motion } from 'framer-motion'
import { FileText, CheckCircle, Info, AlertCircle, Users, Heart, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'

export default function TermsPage() {
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
            <FileText className="w-10 h-10 text-primary" />
          </motion.div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-muted-foreground">
            Last updated: September 2024
          </p>
        </div>

        {/* Quick Summary */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 p-6 rounded-2xl bg-gradient-to-br from-primary-light/10 to-accent/10 border border-primary-light/20"
        >
          <h2 className="text-xl font-display font-bold mb-3">Quick Summary</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span>Beatboxx is free to use</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span>Your content belongs to you</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span>We don't collect or see any of your data</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span>Optional donations support the beatbox community</span>
            </li>
          </ul>
        </motion.div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <Section
            icon={<Info className="w-6 h-6" />}
            title="1. Acceptance of Terms"
            delay={0.2}
          >
            <p className="text-muted-foreground">
              By downloading and using Beatboxx, you agree to these Terms of Service. 
              If you don't agree with any part of these terms, please don't use the app.
            </p>
          </Section>

          <Section
            icon={<Users className="w-6 h-6" />}
            title="2. Use of the App"
            delay={0.3}
          >
            <p className="text-muted-foreground mb-4">
              Beatboxx is provided for personal, non-commercial use. You may:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li>• Record and organize your beatbox content</li>
              <li>• Create routines and prepare for battles</li>
              <li>• Share your creations through your own channels</li>
            </ul>
            <p className="text-muted-foreground">
              You may not use the app for any illegal purposes or to violate any laws in your jurisdiction.
            </p>
          </Section>

          <Section
            icon={<FileText className="w-6 h-6" />}
            title="3. Your Content"
            delay={0.4}
          >
            <p className="text-muted-foreground mb-4">
              <strong>You own everything you create in Beatboxx.</strong> All recordings, tags, routines, 
              and other content you create remain your intellectual property.
            </p>
            <p className="text-muted-foreground">
              Since Beatboxx operates entirely on your device with no cloud services, we have no access to, 
              control over, or rights to your content.
            </p>
          </Section>

          <Section
            icon={<AlertCircle className="w-6 h-6" />}
            title="4. Disclaimers"
            delay={0.5}
          >
            <p className="text-muted-foreground mb-4">
              Beatboxx is provided "as is" without any warranties, express or implied. We do our best to 
              maintain the app, but we can't guarantee:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• The app will always work perfectly</li>
              <li>• It will meet all your specific needs</li>
              <li>• It will be error-free or uninterrupted</li>
            </ul>
          </Section>

          <Section
            icon={<Heart className="w-6 h-6" />}
            title="5. Community Support"
            delay={0.6}
          >
            <p className="text-muted-foreground">
              Beatboxx offers optional in-app donations. 80% of all donations go directly back to the 
              beatbox community to support events, judges, and venues. The remaining 20% helps maintain 
              and improve the app.
            </p>
          </Section>

          <Section
            icon={<Info className="w-6 h-6" />}
            title="6. Changes to Terms"
            delay={0.7}
          >
            <p className="text-muted-foreground">
              We may update these terms from time to time. If we make significant changes, we'll notify 
              you through the app. Continued use of Beatboxx after changes means you accept the new terms.
            </p>
          </Section>

          <Section
            icon={<FileText className="w-6 h-6" />}
            title="7. Contact"
            delay={0.8}
          >
            <p className="text-muted-foreground">
              For any questions about these terms, please contact us at:
            </p>
            <p className="mt-2">
              <a href="mailto:dev.apollonbeatbox@gmail.com" className="text-primary hover:text-primary-dark transition-colors">
                dev.apollonbeatbox@gmail.com
              </a>
            </p>
          </Section>

          {/* Final Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mt-12 p-6 rounded-2xl bg-foreground/5 border border-border-light"
          >
            <p className="text-center text-muted-foreground">
              <strong>TL;DR:</strong> Be cool, have fun, and keep beatboxing. 
              Your content is yours, we don't track you, and we're here to support the community. 🎤
            </p>
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
