// HERO SECTION VISION - Enterprise Intelligence Platform
// Layout: Text LEFT, Globe RIGHT | Lazy-loaded RotatingEarth

import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { LayoutDashboard, Calendar } from 'lucide-react'

const RotatingEarth = lazy(() => import('../ui/RotatingEarth'))

// Animation variants (subtle)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
}

export function HeroSectionVision() {
  const navigate = useNavigate()

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative py-16 px-8 border-b border-white/5 bg-white/[0.02]"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left: Text Content */}
        <div className="flex-1 max-w-2xl">
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-[var(--c-brand)]/30 bg-[var(--c-brand)]/10 text-[var(--text-primary)] shadow-[0_0_20px_var(--c-brand-glow)]">
              Enterprise Intelligence Platform
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl lg:text-5xl font-bold text-[var(--text-primary)] tracking-tight mb-6"
          >
            Your AI-Powered{' '}
            <span className="text-glow">Intelligence Hub</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg text-[var(--text-secondary)] max-w-xl leading-relaxed mb-8"
          >
            Three levels of intelligence. One unified platform. From internal knowledge to market signals.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="btn-premium"
            >
              <LayoutDashboard className="w-4 h-4" />
              Explore the Platform
            </button>
            <button
              onClick={() => navigate('#demo')}
              className="btn-ghost-glow"
            >
              <Calendar className="w-4 h-4" />
              Book a Demo
            </button>
          </motion.div>
        </div>

        {/* Right: Globe Visual */}
        <motion.div
          variants={itemVariants}
          className="flex-1 flex items-center justify-center"
        >
          <Suspense
            fallback={
              <div className="w-[400px] h-[400px] rounded-full bg-white/5 animate-pulse border border-white/10" />
            }
          >
            <RotatingEarth width={500} height={400} className="w-full max-w-[500px]" />
          </Suspense>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default HeroSectionVision
