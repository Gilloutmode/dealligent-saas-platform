"use client"

import { memo, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Calendar,
  AlertTriangle,
  Shield,
  Activity,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  ResponsiveContainer,
} from 'recharts'

// =============================================================================
// ENRICHED COMPETITOR CARD COMPONENT
// Premium glassmorphism design with rich data display
// =============================================================================

export type ThreatLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
export type TrendDirection = 'up' | 'down' | 'neutral'

export interface CompetitorCardProps {
  /** Competitor name */
  name: string
  /** Optional logo URL */
  logoUrl?: string
  /** Threat level badge */
  threatLevel: ThreatLevel
  /** Trend direction */
  trend: TrendDirection
  /** Trend percentage value */
  trendValue?: number
  /** Last analysis date */
  lastAnalysisDate?: Date | string
  /** Industry/sector */
  industry?: string
  /** Activity score (0-100) */
  activityScore?: number
  /** Sparkline data for recent changes */
  sparklineData?: number[]
  /** Click handler */
  onClick?: () => void
  /** Is this card currently selected */
  isSelected?: boolean
  /** Animation delay for stagger effect */
  delay?: number
}

// Threat level configurations
const threatConfig = {
  LOW: {
    bg: 'bg-emerald-500/15',
    border: 'border-emerald-500/25',
    text: 'text-emerald-400',
    glow: 'shadow-emerald-500/20',
    gradient: 'from-emerald-500 to-cyan-500',
    icon: Shield,
  },
  MEDIUM: {
    bg: 'bg-amber-500/15',
    border: 'border-amber-500/25',
    text: 'text-amber-400',
    glow: 'shadow-amber-500/20',
    gradient: 'from-amber-500 to-orange-500',
    icon: Activity,
  },
  HIGH: {
    bg: 'bg-red-500/15',
    border: 'border-red-500/25',
    text: 'text-red-400',
    glow: 'shadow-red-500/20',
    gradient: 'from-red-500 to-rose-600',
    icon: AlertTriangle,
  },
  CRITICAL: {
    bg: 'bg-fuchsia-500/15',
    border: 'border-fuchsia-500/25',
    text: 'text-fuchsia-400',
    glow: 'shadow-fuchsia-500/20',
    gradient: 'from-fuchsia-500 to-purple-600',
    icon: AlertTriangle,
  },
}

const trendColors = {
  up: 'text-emerald-400',
  down: 'text-red-400',
  neutral: 'text-[var(--text-muted)]',
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

// Generate sparkline data if not provided
function generateSparkline(): number[] {
  return Array.from({ length: 7 }, () => Math.floor(Math.random() * 40) + 30)
}

// Format date
function formatDate(date: Date | string | undefined): string {
  if (!date) return 'Jamais'
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return "Aujourd'hui"
  if (diffDays === 1) return 'Hier'
  if (diffDays < 7) return `Il y a ${diffDays} jours`
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}

// Get initials from name
function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export const CompetitorCard = memo(function CompetitorCard({
  name,
  logoUrl,
  threatLevel,
  trend,
  trendValue,
  lastAnalysisDate,
  industry,
  activityScore = 0,
  sparklineData,
  onClick,
  isSelected = false,
  delay = 0,
}: CompetitorCardProps) {
  const config = threatConfig[threatLevel]
  const ThreatIcon = config.icon

  // Memoize sparkline data
  const chartData = useMemo(() => {
    const data = sparklineData || generateSparkline()
    return data.map((value, index) => ({ value, index }))
  }, [sparklineData])

  // Determine sparkline color based on trend
  const sparklineColor = trend === 'up'
    ? '#10b981'
    : trend === 'down'
      ? '#ef4444'
      : '#6b7280'

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={delay}
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-2xl p-5 cursor-pointer
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
      aria-label={`Voir les détails de ${name}`}
    >
      {/* Glow effect on hover */}
      <div className={`
        absolute -inset-1 bg-gradient-to-br ${config.gradient} opacity-0
        group-hover:opacity-10 blur-xl transition-opacity duration-500 -z-10
      `} />

      {/* Top accent line on hover */}
      <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-primary)]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Header: Logo + Name + Threat Badge */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Avatar/Logo */}
          <div className={`
            w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm
            bg-gradient-to-br ${config.gradient} shadow-lg ${config.glow}
            group-hover:scale-110 transition-transform duration-300
          `}>
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={name}
                className="w-full h-full rounded-xl object-cover"
              />
            ) : (
              getInitials(name)
            )}
          </div>

          {/* Name & Industry */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-[var(--text-primary)] truncate text-base">
              {name}
            </h3>
            {industry && (
              <span className="text-xs text-[var(--text-muted)] truncate block">
                {industry}
              </span>
            )}
          </div>
        </div>

        {/* Threat Level Badge */}
        <div className={`
          flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold
          ${config.bg} ${config.border} ${config.text} border
        `}>
          <ThreatIcon className="w-3 h-3" />
          {threatLevel}
        </div>
      </div>

      {/* Mini Sparkline Chart */}
      <div className="h-12 mb-4 -mx-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id={`sparklineGrad-${name.replace(/\s/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={sparklineColor} stopOpacity={0.3} />
                <stop offset="95%" stopColor={sparklineColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke={sparklineColor}
              strokeWidth={2}
              fill={`url(#sparklineGrad-${name.replace(/\s/g, '')})`}
              dot={false}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer: Date + Trend + Activity */}
      <div className="flex items-center justify-between pt-3 border-t border-[var(--border-light)]">
        {/* Last Analysis Date */}
        <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
          <Calendar className="w-3 h-3" />
          {formatDate(lastAnalysisDate)}
        </div>

        {/* Trend Indicator */}
        <div className={`flex items-center gap-1 text-xs font-medium ${trendColors[trend]}`}>
          {trend === 'up' && <TrendingUp className="w-3.5 h-3.5" />}
          {trend === 'down' && <TrendingDown className="w-3.5 h-3.5" />}
          {trend === 'neutral' && <Minus className="w-3.5 h-3.5" />}
          {trendValue !== undefined && (
            <span>{trend === 'down' ? '' : '+'}{trendValue}%</span>
          )}
        </div>

        {/* Activity Score */}
        {activityScore > 0 && (
          <div className="flex items-center gap-1.5">
            <div className="w-16 h-1.5 rounded-full bg-[var(--bg-tertiary)] overflow-hidden">
              <motion.div
                className={`h-full rounded-full bg-gradient-to-r ${config.gradient}`}
                initial={{ width: 0 }}
                animate={{ width: `${activityScore}%` }}
                transition={{ duration: 0.8, delay: delay + 0.2 }}
              />
            </div>
            <span className="text-xs text-[var(--text-muted)]">{activityScore}%</span>
          </div>
        )}
      </div>
    </motion.div>
  )
})

export default CompetitorCard
