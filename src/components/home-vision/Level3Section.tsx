// =============================================================================
// LEVEL 3 SECTION - LEARNING & UPSKILLING
// "Continuous upskilling. Knowledge that sticks."
// Phase 4/5: Scroll animations with blur + scale
// =============================================================================

"use client"

import { motion, useReducedMotion } from 'framer-motion'
import {
  RefreshCw, Smartphone, CreditCard,
  TrendingUp, Target,
} from 'lucide-react'
import { ApplicationCard } from './ApplicationCard'
import {
  TopicSelectorMockupAnimated,
  ContentSourcesMockupAnimated,
} from './animations'

// =============================================================================
// ANIMATION VARIANTS
// =============================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  },
}

// Full animation with blur + scale
const itemVariantsFull = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
}

// Reduced motion variant
const itemVariantsReduced = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
}

// Slide variants for problem/solution cards
const slideLeftVariantsFull = {
  hidden: {
    opacity: 0,
    x: -40,
    scale: 0.95,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
}

const slideRightVariantsFull = {
  hidden: {
    opacity: 0,
    x: 40,
    scale: 0.95,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
}

const slideVariantsReduced = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
}

// =============================================================================
// DIGEST APPS DATA
// =============================================================================

const digestApps = [
  {
    icon: RefreshCw,
    title: '24/7 Content Scraping',
    description: 'AI agents continuously monitor your selected topics.\nNew videos, posts, articles detected in real-time.\nAutomatic transcript analysis and key point extraction.',
  },
  {
    icon: Smartphone,
    title: 'Daily Micro-Lessons',
    description: '5-minute daily digest delivered to your inbox.\nTop insights from yesterday, ranked by relevance.\nVideo summaries with key timestamps.\nRead in the morning, stay informed all day.',
  },
  {
    icon: CreditCard,
    title: 'Flashcards & Quizzes',
    description: 'Auto-generated flashcards from digested content.\nSpaced repetition for long-term retention.\nQuiz mode to validate your knowledge.\nGamified learning that actually works.',
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    description: 'Track learning progress per team member.\nIdentify knowledge gaps across the organization.\nCelebrate milestones and streaks.\nManager dashboard for team oversight.',
  },
  {
    icon: Target,
    title: 'Perfect For',
    description: '✅ SALES ENABLEMENT\nKeep sales team updated on market & competitors\n\n✅ NEW HIRE ONBOARDING\nAccelerate ramp-up with curated learning paths\n\n✅ LEADERSHIP UPDATES\nExecutive briefings without the noise\n\n✅ PRODUCT TEAM TRAINING\nStay current on industry innovations',
  },
]

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function Level3Section() {
  const prefersReducedMotion = useReducedMotion() ?? false
  const itemVariants = prefersReducedMotion ? itemVariantsReduced : itemVariantsFull
  const slideLeftVariants = prefersReducedMotion ? slideVariantsReduced : slideLeftVariantsFull
  const slideRightVariants = prefersReducedMotion ? slideVariantsReduced : slideRightVariantsFull

  return (
    <section className="py-24 px-8 bg-[var(--bg-page)] border-b border-[var(--border-light)]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
          className="text-center mb-24"
        >
          <motion.span
            className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-emerald-500/30 bg-emerald-500/20 text-emerald-400 mb-8"
            animate={prefersReducedMotion ? {} : {
              boxShadow: [
                '0 0 15px rgba(16, 185, 129, 0.2)',
                '0 0 30px rgba(16, 185, 129, 0.4)',
                '0 0 15px rgba(16, 185, 129, 0.2)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            LEVEL 3
          </motion.span>
          <h2 className="text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-6 uppercase tracking-tight">
            DIGEST - Learning Engine
          </h2>
          <p className="text-2xl lg:text-3xl text-[var(--text-secondary)] font-medium italic">
            Continuous upskilling. Knowledge that sticks.
          </p>
        </motion.div>

        {/* Problem/Solution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={slideLeftVariants}
            className="p-12 rounded-3xl bg-red-500/5 border border-red-500/10"
          >
            <h3 className="text-sm font-black uppercase tracking-widest text-red-400 mb-6 underline decoration-2 underline-offset-8">THE PROBLEM</h3>
            <p className="text-2xl lg:text-3xl text-[var(--text-primary)] leading-relaxed font-medium">
              Information overload. YouTube videos pile up unwatched.
              Articles saved but never read. Your team falls behind
              while competitors stay at the cutting edge.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={slideRightVariants}
            className="p-12 rounded-3xl bg-emerald-500/5 border border-emerald-500/10"
          >
            <h3 className="text-sm font-black uppercase tracking-widest text-emerald-400 mb-6 underline decoration-2 underline-offset-8">THE SOLUTION</h3>
            <p className="text-2xl lg:text-3xl text-[var(--text-primary)] leading-relaxed font-medium">
              AI agents scrape, analyze, and DIGEST content for you.
              Select your learning domains. Get daily micro-lessons.
              Flashcards, quizzes, progress tracking. Knowledge retention.
            </p>
          </motion.div>
        </div>

        {/* Topic Selector Mockup */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={itemVariants}
          className="mb-32"
        >
          <TopicSelectorMockupAnimated />
        </motion.div>

        {/* Content Sources */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={itemVariants}
          className="mb-32"
        >
          <ContentSourcesMockupAnimated />
        </motion.div>

        {/* Applications Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          {digestApps.map((app, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <ApplicationCard {...app} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Level3Section
