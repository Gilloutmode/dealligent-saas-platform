"use client"

import { motion } from 'framer-motion'
import {
  Building2,
  AlertTriangle,
  Shield,
  Activity,
  Eye,
  RefreshCw,
  FileDown,
  Rocket,
  TrendingUp,
  TrendingDown,
  Minus,
  Calendar,
  Zap,
} from 'lucide-react'
import { NumberTicker } from '../ui/NumberTicker'

// =============================================================================
// TYPES
// =============================================================================

export type ThreatLevel = 'HIGH' | 'MEDIUM' | 'LOW'
export type TrendDirection = 'up' | 'down' | 'neutral'

export interface EnhancedCompetitorCardProps {
  name: string
  industry?: string
  threatLevel: ThreatLevel
  qualityScore?: number
  intelligenceGrade?: string
  trend?: TrendDirection
  trendValue?: number
  sparklineData?: number[]
  lastAnalysisDate?: Date | string
  analysisId?: string
  hasAnalysis: boolean
  alerts?: number
  onViewDetails?: () => void
  onRegenerate?: () => void
  onExportPDF?: () => void
  onLaunchAnalysis?: () => void
  delay?: number
}

// =============================================================================
// SPARKLINE COMPONENT
// =============================================================================

function MiniSparkline({ data, className = '' }: { data: number[]; className?: string }) {
  const width = 100
  const height = 32
  const padding = 2

  if (!data || data.length < 2) {
    return (
      <div className={`w-[100px] h-8 flex items-center justify-center ${className}`}>
        <span className="text-xs text-[var(--text-muted)]">-</span>
      </div>
    )
  }

  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * (width - padding * 2) + padding
    const y = height - padding - ((value - min) / range) * (height - padding * 2)
    return `${x},${y}`
  }).join(' ')

  const isPositive = data[data.length - 1] >= data[0]

  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox={`0 0 ${width} ${height}`}
    >
      <polyline
        points={points}
        fill="none"
        stroke={isPositive ? '#10B981' : '#EF4444'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.8}
      />
    </svg>
  )
}

// =============================================================================
// THREAT BADGE COMPONENT
// =============================================================================

function ThreatBadge({ level }: { level: ThreatLevel }) {
  const config = {
    HIGH: {
      bg: 'bg-red-500/15',
      border: 'border-red-500/30',
      text: 'text-red-400',
      icon: AlertTriangle,
      label: 'HIGH',
    },
    MEDIUM: {
      bg: 'bg-amber-500/15',
      border: 'border-amber-500/30',
      text: 'text-amber-400',
      icon: Activity,
      label: 'MEDIUM',
    },
    LOW: {
      bg: 'bg-emerald-500/15',
      border: 'border-emerald-500/30',
      text: 'text-emerald-400',
      icon: Shield,
      label: 'LOW',
    },
  }

  const { bg, border, text, icon: Icon, label } = config[level]

  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${bg} ${border} border`}>
      <Icon className={`w-3.5 h-3.5 ${text}`} />
      <span className={`text-xs font-semibold ${text}`}>{label}</span>
    </div>
  )
}

// =============================================================================
// GRADE BADGE COMPONENT
// =============================================================================

function GradeBadge({ grade }: { grade?: string }) {
  if (!grade) return null

  // Extract just the letter grade (e.g., "A+" from "A+ - Executive Elite")
  const letterGrade = grade.split(' ')[0] || grade

  const getGradeColor = (g: string) => {
    if (g.startsWith('A')) return 'from-emerald-500 to-emerald-600 text-white'
    if (g.startsWith('B')) return 'from-blue-500 to-blue-600 text-white'
    if (g.startsWith('C')) return 'from-amber-500 to-amber-600 text-white'
    return 'from-red-500 to-red-600 text-white'
  }

  return (
    <div className={`px-3 py-1.5 rounded-lg bg-gradient-to-br ${getGradeColor(letterGrade)} font-bold text-sm shadow-lg`}>
      {letterGrade}
    </div>
  )
}

// =============================================================================
// TREND INDICATOR COMPONENT
// =============================================================================

function TrendIndicator({ direction, value }: { direction: TrendDirection; value?: number }) {
  const config = {
    up: {
      bg: 'bg-emerald-500/15',
      text: 'text-emerald-400',
      icon: TrendingUp,
    },
    down: {
      bg: 'bg-red-500/15',
      text: 'text-red-400',
      icon: TrendingDown,
    },
    neutral: {
      bg: 'bg-[var(--bg-tertiary)]',
      text: 'text-[var(--text-muted)]',
      icon: Minus,
    },
  }

  const { bg, text, icon: Icon } = config[direction]

  return (
    <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${bg}`}>
      <Icon className={`w-3.5 h-3.5 ${text}`} />
      {value !== undefined && (
        <span className={`text-xs font-semibold ${text}`}>
          {direction === 'up' ? '+' : direction === 'down' ? '-' : ''}
          {Math.abs(value)}%
        </span>
      )}
    </div>
  )
}

// =============================================================================
// RELATIVE TIME FORMATTER
// =============================================================================

function formatRelativeTime(date?: Date | string): string {
  if (!date) return '-'

  const now = new Date()
  const then = typeof date === 'string' ? new Date(date) : date
  const diffMs = now.getTime() - then.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMins < 1) return 'À l\'instant'
  if (diffMins < 60) return `il y a ${diffMins} min`
  if (diffHours < 24) return `il y a ${diffHours}h`
  if (diffDays < 7) return `il y a ${diffDays}j`
  return then.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}

// =============================================================================
// MAIN COMPONENT - WITH ANALYSIS
// =============================================================================

function AnalyzedCard({
  name,
  industry,
  threatLevel,
  qualityScore,
  intelligenceGrade,
  trend,
  trendValue,
  sparklineData,
  lastAnalysisDate,
  alerts,
  onViewDetails,
  onRegenerate,
  onExportPDF,
  delay = 0,
}: Omit<EnhancedCompetitorCardProps, 'hasAnalysis' | 'analysisId' | 'onLaunchAnalysis'>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="relative overflow-hidden rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] shadow-lg cursor-pointer group"
      onClick={onViewDetails}
    >
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Glow effect on hover */}
      <motion.div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(135deg, var(--accent-primary)/20, transparent)',
          filter: 'blur(1px)',
        }}
      />

      <div className="relative p-5 space-y-4">
        {/* Header: Name + Threat Badge */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600/20 to-blue-600/5 flex items-center justify-center flex-shrink-0 border border-blue-600/20">
              <Building2 className="w-5 h-5 text-blue-600" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-[var(--text-primary)] truncate">{name}</h3>
              {industry && (
                <p className="text-xs text-[var(--text-muted)]">{industry}</p>
              )}
            </div>
          </div>
          <ThreatBadge level={threatLevel} />
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-3 gap-3">
          {/* Score */}
          <div className="flex flex-col items-center p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-light)]">
            <span className="text-2xl font-bold text-[var(--text-primary)]">
              {qualityScore !== undefined ? (
                <NumberTicker value={qualityScore} delay={delay + 0.2} />
              ) : (
                '-'
              )}
            </span>
            <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Score</span>
          </div>

          {/* Grade */}
          <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-light)]">
            {intelligenceGrade ? (
              <GradeBadge grade={intelligenceGrade} />
            ) : (
              <span className="text-lg text-[var(--text-muted)]">-</span>
            )}
            <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mt-1">Grade</span>
          </div>

          {/* Trend */}
          <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-light)]">
            <TrendIndicator direction={trend || 'neutral'} value={trendValue} />
            <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mt-1">Trend</span>
          </div>
        </div>

        {/* Sparkline */}
        {sparklineData && sparklineData.length > 1 && (
          <div className="flex items-center justify-center py-2 px-3 rounded-xl bg-[var(--bg-secondary)]/50 border border-[var(--border-light)]">
            <MiniSparkline data={sparklineData} />
          </div>
        )}

        {/* Last Analysis Date + Alerts */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-[var(--text-muted)]">
            <Calendar className="w-3.5 h-3.5" />
            <span>Dernière analyse: {formatRelativeTime(lastAnalysisDate)}</span>
          </div>
          {alerts !== undefined && alerts > 0 && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400">
              <Zap className="w-3 h-3" />
              <span className="font-medium">{alerts}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <motion.button
            onClick={(e) => { e.stopPropagation(); onViewDetails?.() }}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Eye className="w-3.5 h-3.5" />
            Voir
          </motion.button>
          <motion.button
            onClick={(e) => { e.stopPropagation(); onRegenerate?.() }}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[var(--bg-tertiary)] text-[var(--text-secondary)] text-xs font-medium border border-[var(--border-default)] hover:bg-[var(--bg-secondary)] transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Relancer
          </motion.button>
          <motion.button
            onClick={(e) => { e.stopPropagation(); onExportPDF?.() }}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[var(--bg-tertiary)] text-[var(--text-secondary)] text-xs font-medium border border-[var(--border-default)] hover:bg-[var(--bg-secondary)] transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FileDown className="w-3.5 h-3.5" />
            PDF
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

// =============================================================================
// MAIN COMPONENT - EMPTY STATE (NO ANALYSIS)
// =============================================================================

function EmptyCard({
  name,
  industry,
  threatLevel,
  onLaunchAnalysis,
  delay = 0,
}: Pick<EnhancedCompetitorCardProps, 'name' | 'industry' | 'threatLevel' | 'onLaunchAnalysis' | 'delay'>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="relative overflow-hidden rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] shadow-lg cursor-pointer group"
      onClick={onLaunchAnalysis}
    >
      {/* Dashed border effect */}
      <div className="absolute inset-0 rounded-2xl border-2 border-dashed border-[var(--border-default)] opacity-50 group-hover:opacity-0 transition-opacity duration-300" />

      {/* Gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative p-5 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center flex-shrink-0 border border-[var(--border-default)]">
              <Building2 className="w-5 h-5 text-[var(--text-muted)]" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-[var(--text-primary)] truncate">{name}</h3>
              {industry && (
                <p className="text-xs text-[var(--text-muted)]">{industry}</p>
              )}
            </div>
          </div>
          <ThreatBadge level={threatLevel} />
        </div>

        {/* Empty State Content */}
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <motion.div
            className="relative mb-4"
            whileHover={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center">
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
            {/* Ping effect on hover */}
            <div className="absolute inset-0 rounded-2xl bg-blue-600/20 opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
          </motion.div>

          <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1">
            Aucune analyse disponible
          </h4>
          <p className="text-xs text-[var(--text-muted)] max-w-[200px]">
            Lancez une analyse pour obtenir des insights sur ce compétiteur
          </p>
        </div>

        {/* CTA Button */}
        <motion.button
          onClick={(e) => { e.stopPropagation(); onLaunchAnalysis?.() }}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg shadow-blue-600/25 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Rocket className="w-4 h-4" />
          Lancer une Analyse
        </motion.button>
      </div>
    </motion.div>
  )
}

// =============================================================================
// MAIN EXPORT
// =============================================================================

export function EnhancedCompetitorCard(props: EnhancedCompetitorCardProps) {
  const {
    hasAnalysis,
    name,
    industry,
    threatLevel,
    qualityScore,
    intelligenceGrade,
    trend,
    trendValue,
    sparklineData,
    lastAnalysisDate,
    alerts,
    onViewDetails,
    onRegenerate,
    onExportPDF,
    onLaunchAnalysis,
    delay,
  } = props

  if (hasAnalysis) {
    return (
      <AnalyzedCard
        name={name}
        industry={industry}
        threatLevel={threatLevel}
        qualityScore={qualityScore}
        intelligenceGrade={intelligenceGrade}
        trend={trend}
        trendValue={trendValue}
        sparklineData={sparklineData}
        lastAnalysisDate={lastAnalysisDate}
        alerts={alerts}
        onViewDetails={onViewDetails}
        onRegenerate={onRegenerate}
        onExportPDF={onExportPDF}
        delay={delay}
      />
    )
  }

  return (
    <EmptyCard
      name={name}
      industry={industry}
      threatLevel={threatLevel}
      onLaunchAnalysis={onLaunchAnalysis}
      delay={delay}
    />
  )
}

export default EnhancedCompetitorCard
