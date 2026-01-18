// =============================================================================
// DEALLIGENT PLATFORM - HERO SECTION
// Premium hero section for landing page with CTAs
// =============================================================================

"use client"

import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Rocket, LayoutDashboard, Sparkles } from 'lucide-react'

// =============================================================================
// ANIMATION VARIANTS
// =============================================================================

const heroVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function HeroSection() {
  const navigate = useNavigate()

  return (
    <motion.section
      variants={heroVariants}
      initial="hidden"
      animate="visible"
      className="relative overflow-hidden py-16 px-8"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-600/20 text-sm font-medium text-blue-600 dark:text-blue-400">
            <Sparkles className="w-4 h-4" />
            Plateforme d'Intelligence Compétitive
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-6 leading-tight"
        >
          Dealligent{' '}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Intelligence
          </span>{' '}
          Platform
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10"
        >
          Votre plateforme d'intelligence compétitive alimentée par l'IA.
          Analysez, anticipez et surpassez vos concurrents.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 transition-all duration-200"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <LayoutDashboard className="w-5 h-5" />
            Voir Dashboard
          </motion.button>

          <motion.button
            onClick={() => navigate('/launch-analysis')}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--bg-secondary)] text-[var(--text-primary)] font-medium border border-[var(--border-default)] hover:border-blue-600/50 hover:bg-[var(--bg-tertiary)] transition-all duration-200"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Rocket className="w-5 h-5" />
            Lancer une Analyse
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default HeroSection
