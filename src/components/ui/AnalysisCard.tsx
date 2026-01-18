"use client"

import { memo, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Target,
  TrendingUp,
  Package,
  Globe,
  Cpu,
  Users,
  Calendar,
  Clock,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react'
import { NumberTicker } from './NumberTicker'

// =============================================================================
// ENRICHED ANALYSIS CARD COMPONENT
// Premium card with confidence score, tags and key findings preview
// =============================================================================

export type AnalysisType =
  | 'competitor'
  | 'market'
  | 'product'
  | 'technology'
  | 'client'
  | 'people'

export type ThreatLevel = 'low' | 'medium' | 'high' | 'critical'

export interface AnalysisCardProps {
  /** Analysis ID */
  id: string
  /** Analysis title */
  title: string
  /** Competitor/subject name */
  competitor: string
  /** Type of analysis */
  analysisType: AnalysisType
  /** Quality/confidence score (0-100) */
  confidenceScore: number
  /** Threat level */
  threatLevel: ThreatLevel
  /** Analysis domains/tags */
  domains?: string[]
  /** Key findings preview (max 3) */
  keyFindings?: string[]
  /** Number of insights generated */
  insightsCount?: number
  /** Date when analysis was completed */
  completedAt: Date | string
  /** Duration of analysis */
  duration?: string
  /** Click handler */
  onClick?: () => void
  /** Is selected */
  isSelected?: boolean
  /** Animation delay for stagger */
  delay?: number
}

// Analysis type configurations
const analysisTypeConfig = {
  competitor: {
    icon: Target,
    label: 'Concurrent',
    gradient: 'from-[var(--accent-primary)] to-[#8B5CF6]',
    glow: 'shadow-[var(--accent-primary)]/25',
    bg: 'bg-[var(--accent-primary)]/10',
  },
  market: {
    icon: Globe,
    label: 'Marché',
    gradient: 'from-cyan-500 to-blue-500',
    glow: 'shadow-cyan-500/25',
    bg: 'bg-cyan-500/10',
  },
  product: {
    icon: Package,
    label: 'Produit',
    gradient: 'from-violet-500 to-purple-600',
    glow: 'shadow-violet-500/25',
    bg: 'bg-violet-500/10',
  },
  technology: {
    icon: Cpu,
    label: 'Technologie',
    gradient: 'from-emerald-500 to-teal-500',
    glow: 'shadow-emerald-500/25',
    bg: 'bg-emerald-500/10',
  },
  client: {
    icon: Users,
    label: 'Client',
    gradient: 'from-amber-500 to-orange-500',
    glow: 'shadow-amber-500/25',
    bg: 'bg-amber-500/10',
  },
  people: {
    icon: Users,
    label: 'People',
    gradient: 'from-pink-500 to-rose-500',
    glow: 'shadow-pink-500/25',
    bg: 'bg-pink-500/10',
  },
}

// Threat level configurations
const threatConfig = {
  low: {
    bg: 'bg-emerald-500/15',
    border: 'border-emerald-500/25',
    text: 'text-emerald-400',
  },
  medium: {
    bg: 'bg-amber-500/15',
    border: 'border-amber-500/25',
    text: 'text-amber-400',
  },
  high: {
    bg: 'bg-red-500/15',
    border: 'border-red-500/25',
    text: 'text-red-400',
  },
  critical: {
    bg: 'bg-fuchsia-500/15',
    border: 'border-fuchsia-500/25',
    text: 'text-fuchsia-400',
  },
}

// Score color based on value
function getScoreColor(score: number): string {
  if (score >= 80) return 'text-emerald-400'
  if (score >= 60) return 'text-amber-400'
  return 'text-red-400'
}

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay,
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
}

const findingVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1 + 0.2 },
  }),
}

// Format date
function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export const AnalysisCard = memo(function AnalysisCard({
  // id and title available for future use
  competitor,
  analysisType,
  confidenceScore,
  threatLevel,
  domains = [],
  keyFindings = [],
  insightsCount = 0,
  completedAt,
  duration,
  onClick,
  isSelected = false,
  delay = 0,
}: AnalysisCardProps) {
  const typeConfig = analysisTypeConfig[analysisType] || analysisTypeConfig.competitor
  const threat = threatConfig[threatLevel]
  const TypeIcon = typeConfig.icon

  // Limit key findings to 3
  const displayFindings = useMemo(() =>
    keyFindings.slice(0, 3),
    [keyFindings]
  )

  // Limit domains to 4
  const displayDomains = useMemo(() =>
    domains.slice(0, 4),
    [domains]
  )

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={delay}
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-2xl cursor-pointer
        bg-[var(--bg-card)] border transition-all duration-300
        ${isSelected
          ? 'border-[var(--accent-primary)] shadow-[var(--shadow-glow)]'
          : 'border-[var(--border-default)] hover:border-[var(--border-hover)]'
        }
        group
      `}
      whileHover={{
        y: -4,
        scale: 1.01,
        transition: { type: 'spring', stiffness: 400, damping: 25 }
      }}
      whileTap={{ scale: 0.98 }}
      role="button"
      tabIndex={0}
      aria-label={`Voir l'analyse de ${competitor}`}
    >
      {/* Glow effect on hover */}
      <div className={`
        absolute -inset-1 bg-gradient-to-br ${typeConfig.gradient} opacity-0
        group-hover:opacity-10 blur-xl transition-opacity duration-500 -z-10
      `} />

      {/* Top accent line */}
      <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-primary)]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Card Content */}
      <div className="p-5">
        {/* Header: Type Icon + Title + Threat Badge */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* Analysis Type Icon */}
            <div className={`
              w-11 h-11 rounded-xl flex items-center justify-center
              bg-gradient-to-br ${typeConfig.gradient} shadow-lg ${typeConfig.glow}
              group-hover:scale-110 transition-transform duration-300
            `}>
              <TypeIcon className="w-5 h-5 text-white" />
            </div>

            {/* Title & Competitor */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-[var(--text-primary)] truncate text-base">
                {competitor}
              </h3>
              <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                <span className={`px-1.5 py-0.5 rounded ${typeConfig.bg} font-medium`}>
                  {typeConfig.label}
                </span>
              </div>
            </div>
          </div>

          {/* Threat Level Badge */}
          <div className={`
            px-2.5 py-1 rounded-lg text-xs font-semibold
            ${threat.bg} ${threat.border} ${threat.text} border
          `}>
            {threatLevel.toUpperCase()}
          </div>
        </div>

        {/* Confidence Score */}
        <div className="flex items-center justify-between mb-4 p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-light)]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className={`w-4 h-4 ${getScoreColor(confidenceScore)}`} />
            <span className="text-sm text-[var(--text-secondary)]">Score de confiance</span>
          </div>
          <div className="flex items-baseline gap-1">
            <NumberTicker
              value={confidenceScore}
              delay={delay + 0.1}
              className={`text-2xl font-bold ${getScoreColor(confidenceScore)}`}
            />
            <span className="text-sm text-[var(--text-muted)]">%</span>
          </div>
        </div>

        {/* Domain Tags */}
        {displayDomains.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {displayDomains.map((domain, index) => (
              <motion.span
                key={domain}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: delay + 0.1 + index * 0.05 }}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-light)]"
              >
                {domain}
              </motion.span>
            ))}
            {domains.length > 4 && (
              <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[var(--bg-tertiary)] text-[var(--text-muted)]">
                +{domains.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Key Findings Preview */}
        {displayFindings.length > 0 && (
          <div className="space-y-2 mb-4">
            {displayFindings.map((finding, index) => (
              <motion.div
                key={index}
                variants={findingVariants}
                initial="hidden"
                animate="visible"
                custom={index}
                className="flex items-start gap-2 text-xs"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] mt-1.5 flex-shrink-0" />
                <span className="text-[var(--text-secondary)] line-clamp-1">{finding}</span>
              </motion.div>
            ))}
          </div>
        )}

        {/* Footer: Date + Duration + Insights + Arrow */}
        <div className="flex items-center justify-between pt-3 border-t border-[var(--border-light)]">
          <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(completedAt)}
            </div>
            {duration && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {duration}
              </div>
            )}
            {insightsCount > 0 && (
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {insightsCount} insights
              </div>
            )}
          </div>

          {/* View More Arrow */}
          <motion.div
            className="text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] transition-colors"
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
          >
            <ChevronRight className="w-4 h-4" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
})

export default AnalysisCard
