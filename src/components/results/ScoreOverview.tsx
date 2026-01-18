"use client"

import { motion } from 'framer-motion'
import { BarChart3, Shield, Award, Lightbulb, TrendingUp } from 'lucide-react'
import { NumberTicker } from '../ui/NumberTicker'

// =============================================================================
// SCORE OVERVIEW COMPONENT
// Single unified card with 4 KPI metrics for analysis results
// =============================================================================

export interface ScoreOverviewProps {
  qualityScore?: number
  threatLevel: 'high' | 'medium' | 'low'
  intelligenceGrade?: string
  insightsCount: number
}

const threatConfig = {
  high: {
    value: 85,
    label: 'Élevée',
    color: 'text-red-400',
    bg: 'bg-gradient-to-br from-red-500 to-rose-600',
    glow: 'shadow-red-500/25',
  },
  medium: {
    value: 50,
    label: 'Moyenne',
    color: 'text-amber-400',
    bg: 'bg-gradient-to-br from-amber-500 to-orange-600',
    glow: 'shadow-amber-500/25',
  },
  low: {
    value: 25,
    label: 'Faible',
    color: 'text-emerald-400',
    bg: 'bg-gradient-to-br from-emerald-500 to-cyan-500',
    glow: 'shadow-emerald-500/25',
  },
}

const gradeToNumber: Record<string, number> = {
  'A+': 98,
  'A': 93,
  'A-': 90,
  'B+': 87,
  'B': 83,
  'B-': 80,
  'C+': 77,
  'C': 73,
  'C-': 70,
  'D': 65,
  'F': 50,
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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

// Parse grade string like "A+ - Executive Elite" into letter and description
const parseGrade = (grade: string): { letter: string; description: string } => {
  if (!grade || grade === 'N/A') return { letter: 'N/A', description: '' }
  const match = grade.match(/^([A-F][+-]?)\s*(?:[-–]\s*(.+))?$/i)
  if (match) {
    return { letter: match[1], description: match[2] || '' }
  }
  return { letter: grade, description: '' }
}

export function ScoreOverview({
  qualityScore = 0,
  threatLevel,
  intelligenceGrade = 'N/A',
  insightsCount,
}: ScoreOverviewProps) {
  const threat = threatConfig[threatLevel]
  const parsedGrade = parseGrade(intelligenceGrade)
  const gradeNumber = gradeToNumber[parsedGrade.letter] || 70

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="card-glass overflow-hidden"
    >
      {/* Card Header */}
      <div className="px-6 py-4 border-b border-[var(--border-light)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              Aperçu de l'Analyse
            </h2>
            <p className="text-xs text-[var(--text-muted)]">
              Métriques clés de l'analyse concurrentielle
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Grid - 4 columns on large screens */}
      <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[var(--border-light)]">
        {/* Quality Score */}
        <motion.div
          variants={itemVariants}
          className="p-5 relative overflow-hidden group hover:bg-[var(--bg-secondary)] transition-colors"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md shadow-blue-500/20">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wide">
              Score Qualité
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <NumberTicker
              value={qualityScore}
              className="text-3xl font-bold text-[var(--text-primary)]"
            />
            <span className="text-lg text-[var(--text-muted)]">/100</span>
          </div>
          {/* Progress bar */}
          <div className="mt-3 h-1.5 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${qualityScore}%` }}
              transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            />
          </div>
        </motion.div>

        {/* Threat Level */}
        <motion.div
          variants={itemVariants}
          className="p-5 relative overflow-hidden group hover:bg-[var(--bg-secondary)] transition-colors"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-8 h-8 rounded-lg ${threat.bg} flex items-center justify-center shadow-md ${threat.glow}`}>
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wide">
              Niveau Menace
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl font-bold ${threat.color}`}>
              {threat.label}
            </span>
          </div>
          {/* Threat indicator bar */}
          <div className="mt-3 h-1.5 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
            <motion.div
              className={`h-full ${threat.bg} rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: `${threat.value}%` }}
              transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
            />
          </div>
        </motion.div>

        {/* Intelligence Grade */}
        <motion.div
          variants={itemVariants}
          className="p-5 relative overflow-hidden group hover:bg-[var(--bg-secondary)] transition-colors"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md shadow-purple-500/20">
              <Award className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wide">
              Grade Intel
            </span>
          </div>
          {/* Split grade letter and description */}
          <div className="flex flex-col gap-0.5">
            <span className="text-3xl font-bold text-[var(--accent-primary)]">
              {parsedGrade.letter}
            </span>
            {parsedGrade.description && (
              <span className="text-xs text-[var(--text-muted)] truncate max-w-full">
                {parsedGrade.description}
              </span>
            )}
          </div>
          {/* Grade indicator bar */}
          <div className="mt-3 h-1.5 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${gradeNumber}%` }}
              transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
            />
          </div>
        </motion.div>

        {/* Insights Count */}
        <motion.div
          variants={itemVariants}
          className="p-5 relative overflow-hidden group hover:bg-[var(--bg-secondary)] transition-colors"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-md shadow-amber-500/20">
              <Lightbulb className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wide">
              Insights
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <NumberTicker
              value={insightsCount}
              className="text-3xl font-bold text-[var(--text-primary)]"
            />
            <span className="text-lg text-[var(--text-muted)]">trouvés</span>
          </div>
          {/* Insights indicator */}
          <div className="mt-3 flex gap-1">
            {Array.from({ length: Math.min(insightsCount, 10) }).map((_, i) => (
              <motion.div
                key={i}
                className="flex-1 h-1.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.6 + i * 0.05 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ScoreOverview
