"use client"

import { motion } from 'framer-motion'
import {
  Calendar,
  Clock,
  Globe,
  Megaphone,
  TrendingUp,
  TrendingDown,
  Minus,
  Shield,
} from 'lucide-react'
import { cn } from '../../lib/utils'
import { NumberTicker } from '../ui/NumberTicker'

// =============================================================================
// COMPETITOR CARD COMPONENT
// Premium card design with KPIs, badges, and conditional bonus section
// =============================================================================

export interface CompetitorCardProps {
  competitor: {
    // Header
    name: string
    initials: string
    avatarColor: string
    analysisDate: Date
    analysisDuration: string

    // Badges
    threatLevel: 'high' | 'medium' | 'low'
    threatTrend?: 'up' | 'down' | 'stable'

    // KPIs
    confidenceScore: number // 0-100
    opportunityScore?: number // 0-10
    sourcesCount: number

    // Insights
    keyInsights: string[]

    // Bonus (optional)
    winProbability?: string
    lastActivity?: string
  }
  isSelected?: boolean
  onClick?: () => void
  delay?: number
}

// =============================================================================
// STYLE CONFIGURATIONS
// =============================================================================

const threatConfig = {
  high: {
    bg: 'bg-gradient-to-br from-red-500 to-rose-600',
    badge: 'bg-red-500/15 text-red-400 border border-red-500/25',
    label: 'Menace Élevée',
    glow: 'shadow-red-500/20',
  },
  medium: {
    bg: 'bg-gradient-to-br from-amber-500 to-orange-600',
    badge: 'bg-amber-500/15 text-amber-400 border border-amber-500/25',
    label: 'Menace Moyenne',
    glow: 'shadow-amber-500/20',
  },
  low: {
    bg: 'bg-gradient-to-br from-emerald-500 to-cyan-500',
    badge: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25',
    label: 'Menace Faible',
    glow: 'shadow-emerald-500/20',
  },
}

const trendConfig = {
  up: {
    icon: TrendingUp,
    color: 'text-red-400',
    bg: 'bg-red-500/10 border-red-500/20',
    label: 'En hausse',
  },
  down: {
    icon: TrendingDown,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    label: 'En baisse',
  },
  stable: {
    icon: Minus,
    color: 'text-[var(--text-muted)]',
    bg: 'bg-gray-500/10 border-gray-500/20',
    label: 'Stable',
  },
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function formatDate(date: Date): string {
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function getConfidenceColor(score: number): string {
  if (score >= 80) return 'text-emerald-400'
  if (score >= 60) return 'text-amber-400'
  return 'text-red-400'
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function CompetitorCard({
  competitor,
  isSelected = false,
  onClick,
  delay = 0,
}: CompetitorCardProps) {
  const threat = threatConfig[competitor.threatLevel]
  const trend = competitor.threatTrend ? trendConfig[competitor.threatTrend] : null
  const TrendIcon = trend?.icon

  // Check if bonus section should be displayed
  const hasBonus = competitor.lastActivity

  return (
    <motion.div
      onClick={onClick}
      className={cn(
        'relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300',
        'bg-[var(--bg-card)] border group',
        isSelected
          ? 'border-[var(--accent-primary)] shadow-lg shadow-[var(--accent-primary)]/20'
          : 'border-[var(--border-default)] hover:border-[var(--border-hover)]'
      )}
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.06, duration: 0.4 }}
    >
      {/* Glow effect on hover */}
      <div
        className={cn(
          'absolute -inset-1 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10',
          threat.bg
        )}
      />

      <div className="p-3 space-y-2.5">
        {/* ========== HEADER - Name + Badge on same line ========== */}
        <div className="flex items-start gap-2.5">
          {/* Avatar - Smaller */}
          <div
            className={cn(
              'w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-md',
              threat.bg,
              threat.glow
            )}
          >
            {competitor.initials}
          </div>

          {/* Name + Badge + Meta */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <h3 className="font-semibold text-[var(--text-primary)] truncate text-base">
                {competitor.name}
              </h3>
              {/* Threat Badge inline with name */}
              <span className={cn('px-2 py-0.5 rounded text-[10px] font-semibold shrink-0', threat.badge)}>
                {threat.label}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(competitor.analysisDate)}</span>
              <span className="text-[var(--border-default)]">•</span>
              <Clock className="w-3 h-3" />
              <span>{competitor.analysisDuration}</span>
              {/* Trend Badge (conditional) */}
              {trend && TrendIcon && (
                <>
                  <span className="text-[var(--border-default)]">•</span>
                  <TrendIcon className={cn('w-3 h-3', trend.color)} />
                </>
              )}
            </div>
          </div>
        </div>

        {/* ========== KPIs ROW - Horizontal layout ========== */}
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-light)]">
          {/* Confidence Score */}
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[var(--text-muted)]" />
            <span className="text-xs text-[var(--text-muted)]">Confiance:</span>
            <span className={cn('text-sm font-bold', getConfidenceColor(competitor.confidenceScore))}>
              <NumberTicker value={competitor.confidenceScore} delay={delay} className="inline" />%
            </span>
          </div>

          <div className="w-px h-4 bg-[var(--border-light)]" />

          {/* Sources */}
          <div className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs text-[var(--text-muted)]">Sources:</span>
            <span className="text-sm font-bold text-cyan-400">
              <NumberTicker value={competitor.sourcesCount} delay={delay} className="inline" /> vérifiées
            </span>
          </div>
        </div>

        {/* ========== INSIGHTS - line-clamp-3 per insight ========== */}
        {competitor.keyInsights.length > 0 && (
          <div className="space-y-1.5 pt-0.5">
            {competitor.keyInsights.slice(0, 2).map((insight, index) => (
              <div key={index} className="flex items-start gap-2 text-sm">
                <div className="w-1 h-1 rounded-full bg-[var(--accent-primary)] mt-2 shrink-0" />
                <span className="text-[var(--text-primary)] leading-relaxed line-clamp-3">{insight}</span>
              </div>
            ))}
          </div>
        )}

        {/* ========== BONUS SECTION (CONDITIONAL) ========== */}
        {hasBonus && (
          <div className="pt-1.5 border-t border-[var(--border-light)]">
            {/* Last Activity - compact */}
            {competitor.lastActivity && (
              <div className="flex items-start gap-2 text-xs">
                <Megaphone className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-[var(--text-primary)] leading-relaxed line-clamp-2">
                  {competitor.lastActivity}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default CompetitorCard
