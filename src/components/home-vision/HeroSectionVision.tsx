// =============================================================================
// HERO SECTION VISION - Enterprise Intelligence Platform
// Layout: Text LEFT (60%), Globe RIGHT (40%) | Large Typography
// Phase 2/5: Premium UI with FloatingOrbs + Text Reveal + Shimmer CTA
// =============================================================================

"use client"

import { lazy, Suspense } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const RotatingEarth = lazy(() => import('../ui/RotatingEarth'))

// =============================================================================
// FLOATING ORBS COMPONENT
// =============================================================================

function FloatingOrbs() {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-purple-500/10 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-cyan-500/8 blur-[80px]" />
      </div>
    )
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div
        className="absolute top-20 left-10 w-96 h-96 rounded-full bg-blue-500/10 blur-[120px]"
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-purple-500/10 blur-[100px]"
        animate={{
          y: [0, 30, 0],
          x: [0, -20, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-cyan-500/8 blur-[80px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}

// =============================================================================
// TEXT REVEAL COMPONENT
// =============================================================================

interface TextRevealWordsProps {
  children: string
  className?: string
}

function TextRevealWords({ children, className = '' }: TextRevealWordsProps) {
  const prefersReducedMotion = useReducedMotion()
  const words = children.split(' ')

  if (prefersReducedMotion) {
    return <span className={className}>{children}</span>
  }

  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            delay: 0.3 + i * 0.08,
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className={`inline-block mr-3 ${className}`}
        >
          {word}
        </motion.span>
      ))}
    </>
  )
}

// =============================================================================
// SHIMMER BUTTON COMPONENT
// =============================================================================

interface ShimmerButtonProps {
  children: React.ReactNode
  onClick: () => void
  className?: string
}

function ShimmerButton({ children, onClick, className = '' }: ShimmerButtonProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.button
      onClick={onClick}
      className={`relative overflow-hidden btn-premium px-8 py-4 text-lg ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {/* Shimmer effect */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
          initial={{ x: '-100%' }}
          whileHover={{ x: '200%' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

// =============================================================================
// ANIMATION VARIANTS
// =============================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const itemVariantsFull = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
    },
  },
}

const itemVariantsReduced = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function HeroSectionVision() {
  const navigate = useNavigate()
  const prefersReducedMotion = useReducedMotion() ?? false
  const itemVariants = prefersReducedMotion ? itemVariantsReduced : itemVariantsFull

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative min-h-[90vh] flex items-center py-24 px-8 border-b border-[var(--border-light)] bg-[var(--bg-page)]"
    >
      {/* Floating Orbs Background */}
      <FloatingOrbs />

      {/* Background Glows (static) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-purple-600/10 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
        {/* Left: Text Content (60%) */}
        <div className="lg:w-[60%] text-left">
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <motion.span
              className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.25em] border border-blue-500/30 bg-blue-500/10 text-blue-400"
              animate={prefersReducedMotion ? {} : {
                boxShadow: [
                  '0 0 20px rgba(59, 130, 246, 0.3)',
                  '0 0 40px rgba(59, 130, 246, 0.5)',
                  '0 0 20px rgba(59, 130, 246, 0.3)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              ENTERPRISE INTELLIGENCE PLATFORM
            </motion.span>
          </motion.div>

          {/* Title with Text Reveal */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl lg:text-7xl font-bold text-[var(--text-primary)] tracking-tight mb-8 leading-[1.1]"
          >
            <TextRevealWords>Your AI-Powered</TextRevealWords>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              <TextRevealWords>Intelligence Hub</TextRevealWords>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-xl lg:text-2xl text-[var(--text-secondary)] max-w-2xl leading-relaxed mb-12"
          >
            Three levels of intelligence. One unified platform.{' '}
            <br />
            From internal knowledge to market signals.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-6">
            <ShimmerButton onClick={() => navigate('/dashboard')}>
              Explore the Platform →
            </ShimmerButton>

            <motion.button
              onClick={() => navigate('#demo')}
              className="px-8 py-4 text-lg font-bold text-[var(--text-primary)] hover:text-[var(--text-primary)] transition-colors border border-[var(--border-default)] hover:bg-[var(--glass-bg)] rounded-xl bg-[var(--glass-bg)] backdrop-blur-sm"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              Book a Demo
            </motion.button>
          </motion.div>
        </div>

        {/* Right: Visual (40%) */}
        <motion.div
          variants={itemVariants}
          className="lg:w-[40%] flex items-center justify-center relative"
        >
          {/* Glow behind globe */}
          <motion.div
            className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full"
            animate={prefersReducedMotion ? {} : {
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <Suspense
            fallback={
              <div className="w-[400px] h-[400px] rounded-full bg-[var(--glass-bg)] animate-pulse border border-[var(--border-default)]" />
            }
          >
            <RotatingEarth width={550} height={550} className="relative z-10 w-full max-w-[550px]" />
          </Suspense>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default HeroSectionVision
