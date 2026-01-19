// =============================================================================
// DEALLIGENT PLATFORM - HERO SECTION
// Premium hero section for landing page with Aurora design system
// =============================================================================

"use client"

import React, { Suspense } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Rocket, LayoutDashboard, Sparkles } from 'lucide-react'

// Lazy load RotatingEarth to reduce initial bundle size (d3.js is heavy)
const RotatingEarth = React.lazy(() => import('../ui/RotatingEarth'))

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
      className="relative overflow-hidden py-16 px-8 flex flex-col items-center border-b border-white/5 bg-white/[0.02]"
    >
      <div className="relative w-full max-w-7xl mx-auto z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
        <div className="text-left max-w-2xl">
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6 flex">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[var(--c-brand)]/30 bg-[var(--c-brand)]/10 backdrop-blur-2xl shadow-[0_0_20px_var(--c-brand-glow)]">
              <Sparkles className="w-3.5 h-3.5 text-[var(--c-brand)]" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-primary)]">
                AGENTIC COMPETITIVE <span className="opacity-50 text-[8px]">PLATFORM v4.0</span>
              </span>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl text-display mb-6 tracking-tighter font-black"
          >
            Dealligent{' '}
            <span className="text-glow">
              Platform
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-xl text-[var(--text-secondary)] mb-10 leading-relaxed max-w-xl font-medium"
          >
            Votre plateforme d'intelligence competitive alimentee par l'IA.
            Transformez la donnee en <span className="text-[var(--text-primary)] font-bold italic underline decoration-[var(--c-brand)]/50">avantage strategique decisif</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-6"
          >
            <button
              onClick={() => navigate('/dashboard')}
              className="btn-aurora-primary group px-8"
            >
              <LayoutDashboard className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => navigate('/launch-analysis')}
              className="btn-aurora-secondary px-8 border-[var(--c-brand)]/20 hover:border-[var(--c-brand)]/50"
            >
              <Rocket className="w-4 h-4" />
              <span>Lancer une Analyse</span>
            </button>
          </motion.div>
        </div>

        {/* Neural Core Animation Visual */}
        <motion.div
          variants={itemVariants}
          className="relative lg:w-1/2 flex items-center justify-center p-0"
        >
          <Suspense fallback={
            <div className="w-full h-[600px] flex items-center justify-center">
              <div className="w-48 h-48 rounded-full bg-[var(--c-brand)]/10 animate-pulse border border-[var(--c-brand)]/20" />
            </div>
          }>
            <RotatingEarth width={800} height={600} className="w-full scale-110" />
          </Suspense>

          {/* Tactical Labels */}
          <div className="absolute right-4 top-1/4 px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 text-[8px] font-black uppercase tracking-widest text-[var(--c-brand)] rounded">
            Global Analysis
          </div>
          <div className="absolute left-4 bottom-1/4 px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 text-[8px] font-black uppercase tracking-widest text-[var(--c-brand)] rounded">
            Market Analysis
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default HeroSection
