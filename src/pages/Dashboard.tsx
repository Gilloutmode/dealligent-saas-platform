"use client"

import { useMemo, useState, useEffect, memo } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import {
  Users,
  Target,
  Activity,
  TrendingUp,
  BarChart3,
  Shield,
  Play,
  Clock,
  Zap,
  Database,
  Plus,
  Eye,
  FileDown,
} from 'lucide-react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'
import { competitors } from '../data/clientData'
import { useAnalysis } from '../contexts/AnalysisContext'
import { EnrichedKPICard } from '../components/ui/EnrichedKPICard'
import { GlassPanel } from '../components/ui/GlassPanel'
import { IconWrapper } from '../components/ui/IconWrapper'
import { AuroraStatusBadge } from '../components/ui/AuroraStatusBadge'
import { useTheme } from '../contexts/ThemeContext'

// =============================================================================
// DASHBOARD PAGE - AURORA GLASS DESIGN
// Clean KPIs with NumberTicker + Charts + Recent Analyses
// Full light/dark mode support with Aurora cosmic design
// =============================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
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
// TOP THREATS SECTION
// Shows top 3 most threatening competitors from analyses
// =============================================================================

const THREAT_COLORS = {
  HIGH: '#ef4444',
  MEDIUM: '#f59e0b',
  LOW: '#10b981',
}

// Helper to get threat level priority for sorting (high = 3, medium = 2, low = 1)
const getThreatPriority = (level?: string): number => {
  switch (level?.toUpperCase()) {
    case 'HIGH': return 3
    case 'MEDIUM': return 2
    case 'LOW': return 1
    default: return 0
  }
}

// Parse confidence from qualityScore (shared helper)
const parseConfidence = (qualityScore?: string): number => {
  if (!qualityScore) return 0
  const percentMatch = String(qualityScore).match(/\((\d+)%\)/)
  if (percentMatch) return parseInt(percentMatch[1], 10)
  const fractionMatch = String(qualityScore).match(/(\d+)\/(\d+)/)
  if (fractionMatch) {
    const num = parseInt(fractionMatch[1], 10)
    const denom = parseInt(fractionMatch[2], 10)
    return denom > 0 ? Math.round((num / denom) * 100) : 0
  }
  return 0
}

// Performance optimization: Memoized to prevent unnecessary re-renders
const TopThreatsSection = memo(function TopThreatsSection() {
  const navigate = useNavigate()
  const { completedAnalyses } = useAnalysis()

  // Deduplicate by competitor name (keep most recent) and sort by threat level
  const uniqueThreats = useMemo(() => {
    // Group by competitor name, keep most recent
    const byCompetitor = new Map<string, typeof completedAnalyses[0]>()

    // Sort by completedAt desc first to ensure we keep the most recent
    const sortedByDate = [...completedAnalyses].sort((a, b) => {
      const dateA = a.completedAt ? new Date(a.completedAt).getTime() : 0
      const dateB = b.completedAt ? new Date(b.completedAt).getTime() : 0
      return dateB - dateA
    })

    for (const analysis of sortedByDate) {
      const name = analysis.competitor || 'Inconnu'
      if (!byCompetitor.has(name)) {
        byCompetitor.set(name, analysis)
      }
    }

    // Convert to array with computed fields and sort by threat level
    return Array.from(byCompetitor.values())
      .map(a => ({
        ...a,
        threatLevel: (a.response?.data?.threatLevel || 'MEDIUM').toUpperCase(),
        confidence: parseConfidence(a.response?.data?.qualityScore),
        firstWeakness: Array.isArray(a.response?.data?.weaknessesvsCDS) && a.response?.data?.weaknessesvsCDS.length > 0
          ? String(a.response?.data?.weaknessesvsCDS[0])
          : null,
      }))
      .sort((a, b) => {
        const threatDiff = getThreatPriority(b.threatLevel) - getThreatPriority(a.threatLevel)
        if (threatDiff !== 0) return threatDiff
        return b.confidence - a.confidence
      })
  }, [completedAnalyses])

  const topThreats = uniqueThreats.slice(0, 5)
  const totalUniqueCompetitors = uniqueThreats.length
  const remainingCount = Math.max(0, totalUniqueCompetitors - 5)

  // Empty state
  if (completedAnalyses.length === 0) {
    return (
      <motion.div variants={itemVariants} className="h-full">
        <GlassPanel className="h-full p-6 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-[var(--bg-surface-active)] flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-[var(--text-secondary)]" />
          </div>
          <h3 className="text-lg font-medium text-[var(--text-primary)] mb-1">Aucune menace identifiée</h3>
          <p className="text-sm text-[var(--text-secondary)]">Lancez des analyses pour identifier les menaces</p>
        </GlassPanel>
      </motion.div>
    )
  }

  return (
    <motion.div variants={itemVariants} className="h-full">
      <GlassPanel className="h-full p-0 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-[var(--border-subtle)] flex items-center gap-3">
          <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
            <Target className="w-4 h-4 text-red-400" />
          </div>
          <h3 className="text-base font-bold text-[var(--text-primary)] tracking-tight">
            Top 5 Menaces
          </h3>
        </div>

        {/* Threat List */}
        <div className="flex-1 p-3 space-y-2 overflow-auto">
          {topThreats.map((analysis, index) => {
            const competitorName = analysis.competitor || 'Inconnu'
            const companyInitial = competitorName.charAt(0).toUpperCase()
            const threatColor = THREAT_COLORS[analysis.threatLevel as keyof typeof THREAT_COLORS] || THREAT_COLORS.MEDIUM

            return (
              <motion.div
                key={analysis.id}
                className="flex flex-col gap-1.5 p-2.5 rounded-xl bg-[var(--bg-surface-active)]/50 border border-[var(--border-subtle)] hover:bg-[var(--bg-surface-hover)] transition-colors group cursor-pointer"
                whileHover={{ x: 2 }}
                onClick={() => navigate(`/results/${analysis.id}`)}
              >
                {/* Row 1: Rank + Name + Threat + Confidence */}
                <div className="flex items-center gap-2">
                  {/* Rank */}
                  <span className="text-xs font-bold text-[var(--text-muted)] w-4 tabular-nums">
                    {index + 1}.
                  </span>

                  {/* Company Initial */}
                  <div className="w-7 h-7 rounded-md bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-secondary)] font-bold text-xs shrink-0">
                    {companyInitial}
                  </div>

                  {/* Name */}
                  <span className="flex-1 font-medium text-sm text-[var(--text-primary)] truncate">
                    {competitorName}
                  </span>

                  {/* Threat Badge */}
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: threatColor, boxShadow: `0 0 6px ${threatColor}60` }}
                    title={analysis.threatLevel}
                  />

                  {/* Confidence */}
                  <span className="text-[10px] font-medium text-[var(--c-brand)] tabular-nums shrink-0">
                    {analysis.confidence}%
                  </span>
                </div>

                {/* Row 2: Insight (first weakness) */}
                {analysis.firstWeakness && (
                  <div className="ml-6 pl-2 border-l-2 border-red-500/30">
                    <p className="text-sm text-[var(--text-primary)] leading-relaxed line-clamp-2">
                      {analysis.firstWeakness}
                    </p>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Footer */}
        {remainingCount > 0 && (
          <div className="px-4 py-3 border-t border-[var(--border-subtle)] text-center">
            <Link
              to="/my-analyses"
              className="text-[10px] font-medium text-[var(--text-secondary)] hover:text-[var(--c-brand)] transition-colors"
            >
              + {remainingCount} autre{remainingCount > 1 ? 's' : ''} concurrent{remainingCount > 1 ? 's' : ''}
            </Link>
          </div>
        )}
      </GlassPanel>
    </motion.div>
  )
})

// =============================================================================
// TOP OPPORTUNITIES SECTION
// Shows top 5 opportunities (strengths) from analyses
// =============================================================================

const TopOpportunitiesSection = memo(function TopOpportunitiesSection() {
  const navigate = useNavigate()
  const { completedAnalyses } = useAnalysis()

  // Deduplicate by competitor name (keep most recent) and sort by confidence
  const uniqueOpportunities = useMemo(() => {
    // Group by competitor name, keep most recent
    const byCompetitor = new Map<string, typeof completedAnalyses[0]>()

    // Sort by completedAt desc first to ensure we keep the most recent
    const sortedByDate = [...completedAnalyses].sort((a, b) => {
      const dateA = a.completedAt ? new Date(a.completedAt).getTime() : 0
      const dateB = b.completedAt ? new Date(b.completedAt).getTime() : 0
      return dateB - dateA
    })

    for (const analysis of sortedByDate) {
      const name = analysis.competitor || 'Inconnu'
      if (!byCompetitor.has(name)) {
        byCompetitor.set(name, analysis)
      }
    }

    // Convert to array with computed fields and sort by confidence (highest first)
    return Array.from(byCompetitor.values())
      .map(a => ({
        ...a,
        confidence: parseConfidence(a.response?.data?.qualityScore),
        firstStrength: Array.isArray(a.response?.data?.strengths) && a.response?.data?.strengths.length > 0
          ? String(a.response?.data?.strengths[0])
          : null,
      }))
      .filter(a => a.firstStrength !== null) // Only show if there's a strength
      .sort((a, b) => b.confidence - a.confidence)
  }, [completedAnalyses])

  const topOpportunities = uniqueOpportunities.slice(0, 5)
  const totalWithStrengths = uniqueOpportunities.length
  const remainingCount = Math.max(0, totalWithStrengths - 5)

  // Empty state
  if (topOpportunities.length === 0) {
    return (
      <motion.div variants={itemVariants} className="h-full">
        <GlassPanel className="h-full p-6 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-[var(--bg-surface-active)] flex items-center justify-center mb-4">
            <TrendingUp className="w-8 h-8 text-[var(--text-secondary)]" />
          </div>
          <h3 className="text-lg font-medium text-[var(--text-primary)] mb-1">Aucune opportunité</h3>
          <p className="text-sm text-[var(--text-secondary)]">Lancez des analyses pour identifier les opportunités</p>
        </GlassPanel>
      </motion.div>
    )
  }

  return (
    <motion.div variants={itemVariants} className="h-full">
      <GlassPanel className="h-full p-0 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-[var(--border-subtle)] flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <h3 className="text-base font-bold text-[var(--text-primary)] tracking-tight">
            Top 5 Opportunités
          </h3>
        </div>

        {/* Opportunity List */}
        <div className="flex-1 p-3 space-y-2 overflow-auto">
          {topOpportunities.map((analysis, index) => {
            const competitorName = analysis.competitor || 'Inconnu'
            const companyInitial = competitorName.charAt(0).toUpperCase()

            return (
              <motion.div
                key={analysis.id}
                className="flex flex-col gap-1.5 p-2.5 rounded-xl bg-[var(--bg-surface-active)]/50 border border-[var(--border-subtle)] hover:bg-[var(--bg-surface-hover)] transition-colors group cursor-pointer"
                whileHover={{ x: 2 }}
                onClick={() => navigate(`/results/${analysis.id}`)}
              >
                {/* Row 1: Rank + Name + Confidence */}
                <div className="flex items-center gap-2">
                  {/* Rank */}
                  <span className="text-xs font-bold text-[var(--text-muted)] w-4 tabular-nums">
                    {index + 1}.
                  </span>

                  {/* Company Initial */}
                  <div className="w-7 h-7 rounded-md bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-secondary)] font-bold text-xs shrink-0">
                    {companyInitial}
                  </div>

                  {/* Name */}
                  <span className="flex-1 font-medium text-sm text-[var(--text-primary)] truncate">
                    {competitorName}
                  </span>

                  {/* Success indicator */}
                  <div
                    className="w-2 h-2 rounded-full shrink-0 bg-emerald-500"
                    style={{ boxShadow: '0 0 6px rgba(16, 185, 129, 0.6)' }}
                  />

                  {/* Confidence */}
                  <span className="text-[10px] font-medium text-[var(--c-brand)] tabular-nums shrink-0">
                    {analysis.confidence}%
                  </span>
                </div>

                {/* Row 2: Insight (first strength) */}
                {analysis.firstStrength && (
                  <div className="ml-6 pl-2 border-l-2 border-emerald-500/30">
                    <p className="text-sm text-[var(--text-primary)] leading-relaxed line-clamp-2">
                      {analysis.firstStrength}
                    </p>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Footer */}
        {remainingCount > 0 && (
          <div className="px-4 py-3 border-t border-[var(--border-subtle)] text-center">
            <Link
              to="/my-analyses"
              className="text-[10px] font-medium text-[var(--text-secondary)] hover:text-[var(--c-brand)] transition-colors"
            >
              + {remainingCount} autre{remainingCount > 1 ? 's' : ''} opportunité{remainingCount > 1 ? 's' : ''}
            </Link>
          </div>
        )}
      </GlassPanel>
    </motion.div>
  )
})

// =============================================================================
// RECENT ANALYSES LIST
// =============================================================================

function formatRelativeTime(isoString: string): string {
  const date = new Date(isoString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffHours / 24)

  if (diffHours < 1) return 'À l\'instant'
  if (diffHours < 24) return `Il y a ${diffHours}h`
  if (diffDays === 1) return 'Hier'
  return `Il y a ${diffDays}j`
}

function RecentAnalysesList() {
  const navigate = useNavigate()
  const { completedAnalyses } = useAnalysis()
  const recentAnalyses = completedAnalyses.slice(0, 5)

  // Helper to parse confidence score from qualityScore
  const parseConfidence = (qualityScore?: string): number => {
    if (!qualityScore) return 0
    const percentMatch = String(qualityScore).match(/\((\d+)%\)/)
    if (percentMatch) return parseInt(percentMatch[1], 10)
    const fractionMatch = String(qualityScore).match(/(\d+)\/(\d+)/)
    if (fractionMatch) {
      const num = parseInt(fractionMatch[1], 10)
      const denom = parseInt(fractionMatch[2], 10)
      return denom > 0 ? Math.round((num / denom) * 100) : 0
    }
    return 0
  }

  // Helper to get analysis type label
  const getAnalysisTypeLabel = (type?: string): string => {
    switch (type) {
      case 'quick': return 'Rapide'
      case 'deep': return 'Approfondie'
      default: return 'Standard'
    }
  }

  // Helper to count insights
  const countInsights = (data?: Record<string, unknown>): number => {
    if (!data) return 0
    const strengths = Array.isArray(data.strengths) ? data.strengths.length : 0
    const weaknesses = Array.isArray(data.weaknessesvsCDS) ? data.weaknessesvsCDS.length : 0
    const activity = Array.isArray(data.recentActivity) ? data.recentActivity.length : 0
    return strengths + weaknesses + activity
  }

  if (recentAnalyses.length === 0) {
    return (
      <motion.div variants={itemVariants} className="h-full">
        <GlassPanel className="h-full p-6 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-[var(--bg-surface-active)] flex items-center justify-center mb-4">
            <Target className="w-8 h-8 text-[var(--text-secondary)]" />
          </div>
          <h3 className="text-lg font-medium text-[var(--text-primary)] mb-1">Aucune analyse</h3>
          <p className="text-sm text-[var(--text-secondary)] mb-4">Lancez votre première analyse concurrentielle</p>
          <Link
            to="/launch-analysis"
            className="btn-aurora-primary px-4 py-2 text-sm"
          >
            <Play className="w-4 h-4" />
            Nouvelle Analyse
          </Link>
        </GlassPanel>
      </motion.div>
    )
  }

  return (
    <motion.div variants={itemVariants} className="h-full">
      <GlassPanel className="h-full p-0 flex flex-col">
        <div className="p-4 border-b border-[var(--border-subtle)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[var(--bg-surface-active)] border border-[var(--border-subtle)]">
              <IconWrapper color="var(--c-brand)" glow={false}>
                <Target className="w-4 h-4 text-[var(--c-brand)]" />
              </IconWrapper>
            </div>
            <h3 className="text-base font-bold text-[var(--text-primary)] tracking-tight">
              Analyses Récentes
            </h3>
          </div>
          <Link to="/my-analyses" className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--c-brand)] transition-colors">
            Voir tout
          </Link>
        </div>

        <div className="flex-1 overflow-auto">
          {recentAnalyses.map((analysis) => {
            const data = analysis.response?.data
            const threatLevel = (data?.threatLevel || 'MEDIUM').toLowerCase()
            const competitorName = analysis.competitor || 'Inconnu'
            const companyInitial = competitorName.charAt(0).toUpperCase()
            const confidence = parseConfidence(data?.qualityScore)
            const insightsCount = countInsights(data)
            const analysisType = getAnalysisTypeLabel(analysis.analysisType)

            return (
              <div
                key={analysis.id}
                className="group flex items-center gap-3 px-4 py-2.5 border-b border-[var(--border-subtle)] last:border-0 hover:bg-[var(--bg-surface-hover)] transition-colors"
              >
                {/* Left: Initial + Name + Metadata */}
                <div className="w-7 h-7 rounded-md bg-[var(--bg-surface-active)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-secondary)] font-bold text-xs shrink-0">
                  {companyInitial}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-[var(--text-primary)] truncate">{competitorName}</span>
                    <AuroraStatusBadge level={threatLevel} size="sm" />
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-[var(--text-secondary)] mt-0.5">
                    <span>{analysisType}</span>
                    <span className="opacity-30">•</span>
                    <span className="text-[var(--c-brand)] font-medium">{confidence}%</span>
                    <span className="opacity-30">•</span>
                    <span>{insightsCount} insight{insightsCount > 1 ? 's' : ''}</span>
                    <span className="opacity-30">•</span>
                    <Clock className="w-2.5 h-2.5" />
                    <span>{analysis.completedAt ? formatRelativeTime(analysis.completedAt) : '-'}</span>
                  </div>
                </div>

                {/* Right: Action buttons */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate(`/results/${analysis.id}`)
                    }}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[var(--c-brand)]/10 border border-[var(--c-brand)]/20 text-[var(--c-brand)] text-[10px] font-medium hover:bg-[var(--c-brand)]/20 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Eye className="w-3 h-3" />
                    Voir
                  </motion.button>
                  <motion.button
                    className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[var(--text-muted)] text-[10px] font-medium opacity-50 cursor-not-allowed"
                    title="Bientôt disponible"
                    disabled
                  >
                    <FileDown className="w-3 h-3" />
                  </motion.button>
                </div>
              </div>
            )
          })}
        </div>
      </GlassPanel>
    </motion.div>
  )
}

// =============================================================================
// ACTIVITY TIMELINE CHART
// =============================================================================

// Performance optimization: Memoized to prevent unnecessary re-renders
const ActivityTimelineChart = memo(function ActivityTimelineChart() {
  const { completedAnalyses } = useAnalysis()
  const { isDark } = useTheme()

  // Generate last 7 days data
  const chartData = useMemo(() => {
    const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
    const today = new Date()

    return days.map((day, index) => {
      const date = new Date(today)
      date.setDate(date.getDate() - (6 - index))

      const count = completedAnalyses.filter((a) => {
        if (!a.completedAt) return false
        const analysisDate = new Date(a.completedAt)
        return analysisDate.toDateString() === date.toDateString()
      }).length

      return { name: day, analyses: count }
    })
  }, [completedAnalyses])

  return (
    <motion.div variants={itemVariants}>
      <GlassPanel className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[var(--bg-surface-active)] border border-[var(--border-subtle)]">
              <IconWrapper color="var(--c-brand)" glow={false}>
                <Activity className="w-5 h-5 text-[var(--c-brand)]" />
              </IconWrapper>
            </div>
            <h3 className="text-lg font-bold text-[var(--text-primary)] tracking-tight">
              Activité (7 jours)
            </h3>
          </div>
          <select className="bg-[var(--bg-surface-active)] border border-[var(--border-default)] rounded-lg text-xs px-2 py-1 text-[var(--text-secondary)] outline-none focus:border-[var(--c-brand)]">
            <option>7 derniers jours</option>
            <option>30 derniers jours</option>
          </select>
        </div>

        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAnalyses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--c-brand)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--c-brand)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: isDark ? '#A1A1AA' : '#64748B', fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: isDark ? '#A1A1AA' : '#64748B', fontSize: 12 }}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#0F0F10' : '#FFFFFF',
                  border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E2E8F0',
                  borderRadius: '12px',
                  color: isDark ? '#EDEDED' : '#0F172A',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}
              />
              <Area
                type="monotone"
                dataKey="analyses"
                stroke="var(--c-brand)"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorAnalyses)"
                activeDot={{ r: 6, strokeWidth: 0, fill: '#FFFFFF' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassPanel>
    </motion.div>
  )
})

// =============================================================================
// QUICK ACTIONS SECTION
// =============================================================================

// Performance optimization: Memoized to prevent unnecessary re-renders
const QuickActionsSection = memo(function QuickActionsSection() {
  const navigate = useNavigate()

  const actions = [
    { label: 'Lancer Analyse', icon: Play, path: '/launch-analysis', description: 'Nouvelle analyse concurrentielle' },
    { label: 'Ajouter Concurrent', icon: Plus, path: '/competitors', description: 'Ajouter à surveiller' },
    { label: 'Mes Compétiteurs', icon: Users, path: '/competitors', description: 'Liste des concurrents' },
    { label: 'Mes Analyses', icon: Activity, path: '/my-analyses', description: 'Historique des analyses' },
  ]

  return (
    <motion.div variants={itemVariants}>
      <GlassPanel className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-[var(--bg-surface-active)] border border-[var(--border-subtle)]">
            <IconWrapper color="var(--c-brand)" glow={false}>
              <Zap className="w-5 h-5 text-[var(--c-brand)]" />
            </IconWrapper>
          </div>
          <h3 className="text-lg font-bold text-[var(--text-primary)] tracking-tight">
            Actions Rapides
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action) => {
            const Icon = action.icon
            return (
              <GlassPanel
                key={action.path}
                enableHover
                className="p-4 flex flex-col gap-3 cursor-pointer"
                onClick={() => navigate(action.path)}
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--bg-surface-active)] group-hover:bg-[var(--c-brand)] transition-colors flex items-center justify-center border border-[var(--border-subtle)] group-hover:border-[var(--c-brand)]">
                  <Icon className="w-5 h-5 text-[var(--text-primary)] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="font-semibold text-[var(--text-primary)]">{action.label}</div>
                  <div className="text-xs text-[var(--text-secondary)]">{action.description}</div>
                </div>
              </GlassPanel>
            )
          })}
        </div>
      </GlassPanel>
    </motion.div>
  )
})

// =============================================================================
// DASHBOARD PAGE
// =============================================================================

export function DashboardPage() {
  const navigate = useNavigate()
  const { completedAnalyses, runningAnalyses } = useAnalysis()
  const [time, setTime] = useState(new Date())

  // Performance optimization: Update time every 60 seconds instead of 1 second
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  // Calculate KPIs
  const totalCompetitors = competitors.length
  const analysesThisMonth = useMemo(() => {
    const now = new Date()
    return completedAnalyses.filter((a) => {
      if (!a.completedAt) return false
      const date = new Date(a.completedAt)
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
    }).length
  }, [completedAnalyses])

  // Calculate average confidence score from analyses
  // qualityScore format: "11/12 (92%)" - we extract the percentage
  const avgConfidence = useMemo(() => {
    if (completedAnalyses.length === 0) return 0
    const scores = completedAnalyses
      .map((a) => {
        const scoreStr = a.response?.data?.qualityScore
        if (!scoreStr) return 0
        // Extract percentage from "(XX%)" format
        const percentMatch = String(scoreStr).match(/\((\d+)%\)/)
        if (percentMatch) return parseInt(percentMatch[1], 10)
        // Fallback: extract from "X/Y" format
        const fractionMatch = String(scoreStr).match(/(\d+)\/(\d+)/)
        if (fractionMatch) {
          const num = parseInt(fractionMatch[1], 10)
          const denom = parseInt(fractionMatch[2], 10)
          return denom > 0 ? Math.round((num / denom) * 100) : 0
        }
        return 0
      })
      .filter((s) => s > 0)
    if (scores.length === 0) return 0
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
  }, [completedAnalyses])

  const activeAnalyses = runningAnalyses.length

  // Note: threatDistribution from static data removed
  // TopThreatsSection now uses real analysis data from completedAnalyses

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-8 space-y-8 max-w-[1600px] mx-auto min-h-screen"
    >
      {/* Aurora Glass Header */}
      <motion.div variants={itemVariants}>
        <GlassPanel className="p-8 relative overflow-hidden">
          {/* Background Effect */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none ambient-data-grid" />

          <div className="relative flex flex-col gap-6">
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-1">
                <div className="px-2 py-0.5 rounded-md bg-[var(--c-brand)]/10 border border-[var(--c-brand)]/20 text-[10px] font-bold text-[var(--c-brand)] uppercase tracking-widest">
                  Agentic Competitive Platform
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-[var(--c-success)] uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--c-success)]" />
                  Système actif
                </div>
              </div>
              <h1 className="text-3xl font-black text-[var(--text-primary)] tracking-tight">
                Dashboard <span className="text-glow">Dealligent</span>
              </h1>
              <div className="flex items-center gap-4 mt-1">
                <p className="text-[var(--text-secondary)] font-medium">
                  Pilotage en temps réel de votre veille concurrentielle.
                </p>
                <div className="h-4 w-px bg-white/10" />
                <div className="flex items-center gap-2 tabular-nums text-[10px] font-bold text-[var(--c-brand)] tracking-widest">
                  <Clock className="w-3 h-3" />
                  {time.toLocaleTimeString()}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/launch-analysis')}
                className="btn-aurora-primary px-6 py-3 text-xs h-fit group w-fit"
              >
                <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                <span className="font-bold uppercase tracking-wider">Nouvelle Analyse</span>
              </button>

              {activeAnalyses > 0 && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--c-brand)]/10 border border-[var(--c-brand)]/20">
                  <Activity className="w-4 h-4 text-[var(--c-brand)]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--c-brand)]">
                    {activeAnalyses} analyse{activeAnalyses > 1 ? 's' : ''} en cours
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Status Bar */}
          <div className="relative mt-6 pt-6 border-t border-white/5 flex flex-wrap gap-8">
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-[var(--c-brand)]" />
              <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-widest">Région: <span className="text-[var(--text-primary)]">FR-PAR</span></span>
            </div>
            <div className="flex items-center gap-3">
              <Database className="w-4 h-4 text-[var(--c-success)]" />
              <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-widest">RAG: <span className="text-[var(--c-success)] text-glow">CONNECTÉ</span></span>
            </div>
            <div className="flex items-center gap-3">
              <Zap className="w-4 h-4 text-[var(--c-brand)]" />
              <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-widest">Moteur: <span className="text-[var(--text-primary)]">Aurora v1.0</span></span>
            </div>
          </div>
        </GlassPanel>
      </motion.div>

      {/* KPI Cards Grid */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <EnrichedKPICard
          label="Concurrents"
          value={totalCompetitors}
          previousValue={totalCompetitors - 2}
          trend={{ direction: 'up', value: 8, label: 'ce mois' }}
          icon={<Users className="w-5 h-5" />}
          iconBg="blue"
          delay={0}
        />
        <EnrichedKPICard
          label="Analyses"
          value={analysesThisMonth}
          previousValue={Math.max(0, analysesThisMonth - 3)}
          trend={{ direction: 'up', value: 12, label: 'vs mois dernier' }}
          icon={<BarChart3 className="w-5 h-5" />}
          iconBg="purple"
          delay={0.08}
        />
        <EnrichedKPICard
          label="Confiance"
          value={avgConfidence}
          suffix="%"
          previousValue={Math.max(0, avgConfidence - 5)}
          trend={{ direction: avgConfidence > 70 ? 'up' : 'neutral', value: 5, label: 'moyenne' }}
          icon={<TrendingUp className="w-5 h-5" />}
          iconBg="green"
          delay={0.16}
        />
        <EnrichedKPICard
          label="En cours"
          value={activeAnalyses}
          trend={{ direction: 'neutral', value: 0, label: 'actives' }}
          icon={<Activity className="w-5 h-5" />}
          iconBg="orange"
          delay={0.24}
        />
      </motion.div>

      {/* Top Threats & Opportunities - Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <TopThreatsSection />
        <TopOpportunitiesSection />
      </div>

      {/* Activity Timeline - Full Width */}
      <ActivityTimelineChart />

      {/* Bottom Section: Recent Analyses & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentAnalysesList />
        <QuickActionsSection />
      </div>
    </motion.div>
  )
}

export default DashboardPage
