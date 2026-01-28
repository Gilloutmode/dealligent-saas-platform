// =============================================================================
// LEVELS OVERVIEW SECTION - 3 Cards introducing platform levels
// Positioned between HeroSectionVision and Level1Section
// Click-to-scroll navigation to each level section
// =============================================================================

"use client"

import { useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FolderTree, Users, Target, LucideIcon } from 'lucide-react'

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
  hidden: { opacity: 0, y: 30, scale: 0.95, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { type: 'spring' as const, stiffness: 100, damping: 15 },
  },
}

const itemVariantsReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
}

// =============================================================================
// LEVEL CARD DATA
// =============================================================================

interface LevelCardData {
  badge: string
  title: string
  subtitle: string
  stat: string
  statLabel: string
  icon: LucideIcon
  accentColor: string
  accentBorder: string
  accentBg: string
  accentText: string
  scrollTarget: string
}

const LEVELS: readonly LevelCardData[] = [
  {
    badge: 'LEVEL 1',
    title: 'Inside Sources',
    subtitle: 'Upload, organize and query all your data through AI-Chat agents',
    stat: '6',
    statLabel: 'apps',
    icon: FolderTree,
    accentColor: '#3B82F6',
    accentBorder: 'border-blue-500/30',
    accentBg: 'bg-blue-500/20',
    accentText: 'text-blue-400',
    scrollTarget: 'level-1-section',
  },
  {
    badge: 'LEVEL 2',
    title: 'Outside Sources',
    subtitle: 'Deep-dive agents that think like your best analysts \u2014 combined',
    stat: '6',
    statLabel: 'AI agents',
    icon: Users,
    accentColor: '#A855F7',
    accentBorder: 'border-purple-500/30',
    accentBg: 'bg-purple-500/20',
    accentText: 'text-purple-400',
    scrollTarget: 'level-2-section',
  },
  {
    badge: 'LEVEL 3',
    title: 'Media Digest Engine',
    subtitle: 'Turn the noise into skills \u2014 continuous learning powered by AI digest',
    stat: '5',
    statLabel: 'modules',
    icon: Target,
    accentColor: '#10B981',
    accentBorder: 'border-emerald-500/30',
    accentBg: 'bg-emerald-500/20',
    accentText: 'text-emerald-400',
    scrollTarget: 'level-3-section',
  },
] as const

// =============================================================================
// LEVEL CARD COMPONENT
// =============================================================================

function LevelCard({ level }: { level: LevelCardData }) {
  const Icon = level.icon

  const handleClick = useCallback(() => {
    const el = document.getElementById(level.scrollTarget)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [level.scrollTarget])

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      className="relative w-full text-left rounded-2xl p-8 cursor-pointer
        bg-[var(--glass-bg)] backdrop-blur-sm
        border border-[var(--border-default)]
        overflow-hidden group"
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      style={{ borderTopWidth: '3px', borderTopColor: level.accentColor }}
    >
      {/* Badge */}
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${level.accentBg} ${level.accentText} ${level.accentBorder} border mb-5`}
      >
        {level.badge}
      </span>

      {/* Icon */}
      <div className={`mb-4 ${level.accentText}`}>
        <Icon size={28} strokeWidth={2} />
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
        {level.title}
      </h3>

      {/* Subtitle */}
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
        {level.subtitle}
      </p>

      {/* Stat */}
      <div className="flex items-baseline gap-2">
        <span
          className="text-3xl font-black"
          style={{ color: level.accentColor }}
        >
          {level.stat}
        </span>
        <span className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider">
          {level.statLabel}
        </span>
      </div>

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
        style={{
          boxShadow: `inset 0 0 40px ${level.accentColor}10, 0 8px 32px ${level.accentColor}15`,
        }}
      />
    </motion.button>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function LevelsOverviewSection() {
  const prefersReducedMotion = useReducedMotion() ?? false
  const itemVariants = prefersReducedMotion ? itemVariantsReduced : itemVariantsFull

  return (
    <section className="py-20 px-8 bg-[var(--bg-page)]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={itemVariants}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.25em] border border-[var(--border-default)] bg-[var(--glass-bg)] text-[var(--text-muted)] mb-6">
            HOW IT WORKS
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-[var(--text-primary)]">
            Three Levels of Intelligence
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {LEVELS.map((level) => (
            <motion.div key={level.badge} variants={itemVariants}>
              <LevelCard level={level} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default LevelsOverviewSection
