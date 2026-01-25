"use client"

// =============================================================================
// CONTENT SOURCES GRID - Level 3 Media Sources with Real Logos
// HIGH DESIGNER LEVEL: Official brand colors, stagger animation, hover glow
// =============================================================================

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  SiYoutube,
  SiReddit,
  SiMedium,
  SiSubstack,
  SiGithub,
  SiProducthunt,
  SiCrunchbase,
  SiX,
  SiYcombinator,
} from '@icons-pack/react-simple-icons'
import { Linkedin } from 'lucide-react'

// =============================================================================
// TYPES
// =============================================================================

interface ContentSource {
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>
  color: string // Official brand color
  description: string
  articlesCount?: number
  isLucide?: boolean
}

// =============================================================================
// CONTENT SOURCES DATA
// =============================================================================

const contentSources: ContentSource[] = [
  {
    name: 'YouTube',
    icon: SiYoutube,
    color: '#FF0000',
    description: 'Video content, tutorials, interviews',
    articlesCount: 12847,
  },
  {
    name: 'Reddit',
    icon: SiReddit,
    color: '#FF4500',
    description: 'Community discussions, AMAs',
    articlesCount: 34521,
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    color: '#0A66C2',
    description: 'Professional insights, announcements',
    articlesCount: 8934,
    isLucide: true,
  },
  {
    name: 'Medium',
    icon: SiMedium,
    color: '#000000',
    description: 'Long-form articles, thought leadership',
    articlesCount: 5621,
  },
  {
    name: 'Substack',
    icon: SiSubstack,
    color: '#FF6719',
    description: 'Newsletters, industry analysis',
    articlesCount: 2347,
  },
  {
    name: 'Y Combinator',
    icon: SiYcombinator,
    color: '#FF6600',
    description: 'Tech discussions, startup news',
    articlesCount: 18934,
  },
  {
    name: 'X',
    icon: SiX,
    color: '#000000',
    description: 'Real-time updates, threads',
    articlesCount: 156782,
  },
  {
    name: 'GitHub',
    icon: SiGithub,
    color: '#181717',
    description: 'Repository activity, releases',
    articlesCount: 4521,
  },
  {
    name: 'Product Hunt',
    icon: SiProducthunt,
    color: '#DA552F',
    description: 'Product launches, tech trends',
    articlesCount: 1234,
  },
  {
    name: 'Crunchbase',
    icon: SiCrunchbase,
    color: '#0288D1',
    description: 'Funding news, company data',
    articlesCount: 3456,
  },
]

// =============================================================================
// ANIMATION VARIANTS
// =============================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 24,
    },
  },
}

// =============================================================================
// SOURCE CARD
// =============================================================================

function SourceCard({ source }: { source: ContentSource }) {
  const Icon = source.icon

  // Calculate glow color with opacity
  const glowColor = `${source.color}40` // 40 = 25% opacity in hex

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -6, scale: 1.03 }}
      className="relative p-5 rounded-2xl bg-[var(--glass-bg)] border border-[var(--border-default)] cursor-pointer group overflow-hidden"
      style={{
        // CSS variable for hover effect
        ['--glow-color' as string]: source.color,
      }}
    >
      {/* Hover Glow Effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${glowColor}, transparent 70%)`,
        }}
      />

      {/* Border glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          boxShadow: `inset 0 0 0 1px ${source.color}50, 0 0 30px ${glowColor}`,
        }}
      />

      <div className="relative z-10">
        {/* Icon + Name */}
        <div className="flex items-center gap-3 mb-3">
          <motion.div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${source.color}20` }}
            whileHover={{
              scale: 1.1,
              boxShadow: `0 0 20px ${glowColor}`,
            }}
          >
            {source.isLucide ? (
              <Icon className="w-[22px] h-[22px]" style={{ color: source.color }} />
            ) : (
              <Icon size={22} color={source.color} />
            )}
          </motion.div>
          <div>
            <h4 className="text-sm font-semibold text-[var(--text-primary)] transition-colors">
              {source.name}
            </h4>
            <p className="text-[10px] text-[var(--text-muted)]">{source.description}</p>
          </div>
        </div>

        {/* Articles Count */}
        {source.articlesCount && (
          <div className="flex items-center justify-between pt-3 border-t border-[var(--border-light)]">
            <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
              Indexed
            </span>
            <motion.span
              className="text-sm font-bold"
              style={{ color: source.color }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {source.articlesCount.toLocaleString()}
            </motion.span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function ContentSourcesGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <div ref={ref} className="w-full max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="text-center mb-10"
      >
        <p className="text-[10px] font-bold text-purple-400 uppercase tracking-wider mb-2">
          Level 3 • Media Digest
        </p>
        <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-3">
          Intelligence from{' '}
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            everywhere.
          </span>
        </h3>
        <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
          We continuously monitor and index content from the most important sources in your
          industry—so you never miss a signal.
        </p>
      </motion.div>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
      >
        {contentSources.map((source) => (
          <SourceCard key={source.name} source={source} />
        ))}
      </motion.div>

      {/* Total Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.0 }}
        className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-center"
      >
        <div className="flex items-center justify-center gap-8 flex-wrap">
          <div>
            <p className="text-3xl font-bold text-[var(--text-primary)]">
              {contentSources
                .reduce((acc, s) => acc + (s.articlesCount || 0), 0)
                .toLocaleString()}
              +
            </p>
            <p className="text-sm text-[var(--text-secondary)]">Articles Indexed</p>
          </div>
          <div className="h-10 w-px bg-[var(--glass-bg-elevated)] hidden md:block" />
          <div>
            <p className="text-3xl font-bold text-[var(--text-primary)]">{contentSources.length}</p>
            <p className="text-sm text-[var(--text-secondary)]">Active Sources</p>
          </div>
          <div className="h-10 w-px bg-[var(--glass-bg-elevated)] hidden md:block" />
          <div>
            <p className="text-3xl font-bold text-[var(--text-primary)]">24/7</p>
            <p className="text-sm text-[var(--text-secondary)]">Continuous Monitoring</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ContentSourcesGrid
