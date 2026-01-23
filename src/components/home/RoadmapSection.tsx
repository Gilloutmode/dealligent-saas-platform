// =============================================================================
// DEALLIGENT PLATFORM - ROADMAP SECTION
// "Coming Soon" section for future analysis modules
// =============================================================================

"use client"

import { useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  DollarSign,
  Shield,
  Handshake,
  Tag,
} from 'lucide-react'

// =============================================================================
// TYPES
// =============================================================================

interface RoadmapItem {
  id: string
  title: string
  description: string
  icon: ReactNode
  releaseDate: string
  gradientFrom: string
  gradientTo: string
}

// =============================================================================
// ANIMATION VARIANTS
// =============================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

// =============================================================================
// ROADMAP ITEMS CONFIGURATION
// =============================================================================

const roadmapItems: RoadmapItem[] = [
  {
    id: 'financial',
    title: 'Financial',
    description: 'Due diligence financière et valorisations',
    icon: <DollarSign className="w-5 h-5" />,
    releaseDate: 'Q2 2026',
    gradientFrom: 'from-yellow-500',
    gradientTo: 'to-orange-500',
  },
  {
    id: 'regulatory',
    title: 'Regulatory',
    description: 'Compliance, veille réglementaire, enforcement',
    icon: <Shield className="w-5 h-5" />,
    releaseDate: 'Q2 2026',
    gradientFrom: 'from-red-500',
    gradientTo: 'to-rose-500',
  },
  {
    id: 'partnership',
    title: 'Partnership',
    description: 'Écosystème, alliances, M&A targets',
    icon: <Handshake className="w-5 h-5" />,
    releaseDate: 'Q3 2026',
    gradientFrom: 'from-violet-500',
    gradientTo: 'to-purple-500',
  },
  {
    id: 'pricing',
    title: 'Pricing',
    description: 'Benchmark pricing, modèles, optimisation',
    icon: <Tag className="w-5 h-5" />,
    releaseDate: 'Q3 2026',
    gradientFrom: 'from-lime-500',
    gradientTo: 'to-green-500',
  },
]

// =============================================================================
// ROADMAP CARD COMPONENT
// =============================================================================

function RoadmapCard({ item, delay }: { item: RoadmapItem; delay: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      <motion.div
        animate={{
          y: isHovered ? -4 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 25,
        }}
        className={`
          relative rounded-xl overflow-hidden cursor-default
          transition-all duration-300
          ${isHovered ? 'opacity-100' : 'opacity-70'}
        `}
        style={{
          filter: isHovered ? 'saturate(1)' : 'saturate(0.4)',
        }}
      >
        {/* Main card container */}
        <div
          className={`
            relative bg-[var(--bg-card)]/50 backdrop-blur-sm
            border rounded-xl p-5 min-h-[140px]
            transition-all duration-300
            ${isHovered ? 'border-[var(--border-hover)] border-solid' : 'border-[var(--border-light)] border-dashed'}
          `}
        >
          {/* Gradient overlay on hover */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${item.gradientFrom} ${item.gradientTo} rounded-xl pointer-events-none`}
            animate={{ opacity: isHovered ? 0.1 : 0.03 }}
            transition={{ duration: 0.3 }}
          />

          {/* Content */}
          <div className="relative z-10">
            {/* Header: Icon + Title + Badge */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                {/* Icon */}
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.gradientFrom} ${item.gradientTo} flex items-center justify-center shadow-md`}
                >
                  <div className="text-white">{item.icon}</div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-[var(--text-primary)]">
                  {item.title}
                </h3>
              </div>

              {/* Release Date Badge */}
              <motion.span
                className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-500 border border-amber-500/30"
                animate={{
                  boxShadow: isHovered
                    ? '0 0 8px 2px rgba(245, 158, 11, 0.3)'
                    : '0 0 0 0 rgba(245, 158, 11, 0)',
                }}
                transition={{ duration: 0.3 }}
              >
                {item.releaseDate}
              </motion.span>
            </div>

            {/* Description - shows on hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm text-[var(--text-secondary)] leading-relaxed"
                >
                  {item.description}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Static description placeholder when not hovered */}
            {!isHovered && (
              <p className="text-sm text-[var(--text-muted)]">
                {item.description}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function RoadmapSection() {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="py-8 px-8"
      aria-labelledby="roadmap-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Divider with label */}
        <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--border-light)] to-transparent" />
          <span className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-medium">
            Prochainement
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[var(--border-light)] to-transparent" />
        </motion.div>

        {/* Section Header */}
        <motion.div variants={itemVariants} className="mb-6">
          <h2
            id="roadmap-heading"
            className="text-xl font-bold text-[var(--text-primary)]"
          >
            Analyses Spécialisées
          </h2>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Modules avancés en développement
          </p>
        </motion.div>

        {/* Roadmap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {roadmapItems.map((item, index) => (
            <RoadmapCard key={item.id} item={item} delay={index * 0.06} />
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default RoadmapSection
