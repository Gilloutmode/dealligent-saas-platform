// LEVEL CARD - Reusable card for each level (1, 2, 3)
// Aurora/Cosmic Glass design system

import { motion } from 'framer-motion'
import type { ReactNode, ElementType } from 'react'

interface LevelCardProps {
  level: 1 | 2 | 3
  title: string
  tagline: string
  description: string
  icon: ElementType
  children?: ReactNode
}

const levelConfig = {
  1: {
    gradient: 'from-blue-500/5 to-transparent',
    badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    label: 'Level 1',
  },
  2: {
    gradient: 'from-purple-500/5 to-transparent',
    badge: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    label: 'Level 2',
  },
  3: {
    gradient: 'from-emerald-500/5 to-transparent',
    badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    label: 'Level 3',
  },
} as const

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

export function LevelCard({
  level,
  title,
  tagline,
  description,
  icon: Icon,
  children,
}: LevelCardProps) {
  const config = levelConfig[level]

  return (
    <motion.div
      variants={cardVariants}
      className={`card-glass p-8 rounded-2xl bg-gradient-to-br ${config.gradient}`}
    >
      {/* Level Badge */}
      <div className="flex items-center gap-3 mb-6">
        <span
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${config.badge}`}
        >
          <Icon className="w-3.5 h-3.5" />
          {config.label}
        </span>
        <span className="text-sm text-[var(--text-muted)] font-medium">
          {tagline}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
        {title}
      </h3>

      {/* Description */}
      <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
        {description}
      </p>

      {/* Children slot */}
      {children}
    </motion.div>
  )
}

export default LevelCard
