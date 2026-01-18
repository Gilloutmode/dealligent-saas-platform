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
  PieChart as PieChartIcon,
  Clock,
  Zap,
  Database,
} from 'lucide-react'
import {
  PieChart,
  Pie,
  Cell,
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
// THREAT DISTRIBUTION CHART
// =============================================================================

const THREAT_COLORS = {
  HIGH: '#ef4444',
  MEDIUM: '#f59e0b',
  LOW: '#10b981',
}

// Performance optimization: Memoized to prevent unnecessary re-renders
const ThreatDistributionChart = memo(function ThreatDistributionChart({ data }: { data: { name: string; value: number; color: string }[] }) {
  return (
    <motion.div variants={itemVariants} className="h-full">
      <GlassPanel className="h-full p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-[var(--bg-surface-active)] border border-[var(--border-subtle)]">
            <IconWrapper color="var(--c-brand)" glow={false}>
              <PieChartIcon className="w-5 h-5 text-[var(--c-brand)]" />
            </IconWrapper>
          </div>
          <h3 className="text-lg font-bold text-[var(--text-primary)] tracking-tight">
            Distribution des Menaces
          </h3>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-6 py-4">
          <div className="w-full aspect-square max-w-[180px] relative mx-auto">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  innerRadius="60%"
                  outerRadius="85%"
                  paddingAngle={5}
                  dataKey="value"
                  stroke="var(--bg-surface)"
                  strokeWidth={2}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-black text-[var(--text-primary)]">
                {data.reduce((acc, curr) => acc + curr.value, 0)}
              </span>
              <span className="text-[10px] text-[var(--text-secondary)] uppercase font-bold tracking-widest">
                Total
              </span>
            </div>
          </div>

          <div className="w-full grid grid-cols-1 gap-2 pt-4 border-t border-[var(--border-subtle)]">
            {data.map((item) => (
              <div key={item.name} className="flex items-center justify-between px-2 py-1">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}40` }} />
                  <span className="text-xs font-medium text-[var(--text-secondary)]">{item.name}</span>
                </div>
                <span className="text-sm font-bold text-[var(--text-primary)] tabular-nums">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
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
  const { completedAnalyses } = useAnalysis()
  const recentAnalyses = completedAnalyses.slice(0, 5)

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
        <div className="p-6 border-b border-[var(--border-subtle)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[var(--bg-surface-active)] border border-[var(--border-subtle)]">
              <IconWrapper color="var(--c-brand)" glow={false}>
                <Target className="w-5 h-5 text-[var(--c-brand)]" />
              </IconWrapper>
            </div>
            <h3 className="text-lg font-bold text-[var(--text-primary)] tracking-tight">
              Analyses Récentes
            </h3>
          </div>
          <Link to="/results" className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--c-brand)] transition-colors">
            Voir tout
          </Link>
        </div>

        <div className="flex-1 overflow-auto">
          {recentAnalyses.map((analysis) => {
            const threatLevel = (analysis.response?.data?.threatLevel || 'MEDIUM').toLowerCase()
            const competitorName = analysis.competitor || 'Inconnu'
            const companyInitial = competitorName.charAt(0).toUpperCase()

            return (
              <div
                key={analysis.id}
                className="group flex items-center justify-between p-4 border-b border-[var(--border-subtle)] last:border-0 hover:bg-[var(--bg-surface-hover)] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--bg-surface-active)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-secondary)] font-bold">
                    {companyInitial}
                  </div>
                  <div>
                    <div className="font-medium text-[var(--text-primary)]">{competitorName}</div>
                    <div className="text-xs text-[var(--text-secondary)] flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      {analysis.completedAt ? formatRelativeTime(analysis.completedAt) : '-'}
                    </div>
                  </div>
                </div>

                <AuroraStatusBadge level={threatLevel} size="sm" />
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
    { label: 'Voir Résultats', icon: BarChart3, path: '/results', description: 'Historique des analyses' },
    { label: 'Watchlist', icon: Shield, path: '/watchlist', description: 'Surveillance concurrents' },
    { label: 'Mes Analyses', icon: Activity, path: '/my-analyses', description: 'Analyses en cours' },
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

  const avgScore = useMemo(() => {
    if (completedAnalyses.length === 0) return 0
    const scores = completedAnalyses
      .map((a) => {
        const scoreStr = a.response?.data?.qualityScore
        if (!scoreStr) return 0
        const match = String(scoreStr).match(/(\d+)/)
        return match ? parseInt(match[1], 10) : 0
      })
      .filter((s) => s > 0)
    if (scores.length === 0) return 0
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
  }, [completedAnalyses])

  const activeAnalyses = runningAnalyses.length

  // Threat distribution data
  const threatDistribution = useMemo(() => {
    const counts = { HIGH: 0, MEDIUM: 0, LOW: 0 }
    competitors.forEach((c) => {
      const level = c.threatLevel.toUpperCase() as keyof typeof counts
      if (level in counts) counts[level]++
    })
    return [
      { name: 'Élevée', value: counts.HIGH, color: THREAT_COLORS.HIGH },
      { name: 'Moyenne', value: counts.MEDIUM, color: THREAT_COLORS.MEDIUM },
      { name: 'Faible', value: counts.LOW, color: THREAT_COLORS.LOW },
    ]
  }, [])

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
                  Intelligence Concurrentielle
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
              <Database className="w-4 h-4 text-[var(--c-brand)]" />
              <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-widest">Données: <span className="text-[var(--text-primary)] text-glow">Synchronisées</span></span>
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
          label="Score Moyen"
          value={avgScore}
          suffix="%"
          previousValue={Math.max(0, avgScore - 5)}
          trend={{ direction: avgScore > 70 ? 'up' : 'neutral', value: 5, label: 'qualité' }}
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

      {/* Main Content Split: Charts & List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Left Column: Threat Distribution (Donut) */}
        <div className="lg:col-span-1">
          <ThreatDistributionChart data={threatDistribution} />
        </div>

        {/* Right Column: Activity Timeline */}
        <div className="lg:col-span-2">
          <ActivityTimelineChart />
        </div>
      </div>

      {/* Bottom Section: Recent Analyses & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentAnalysesList />
        <QuickActionsSection />
      </div>
    </motion.div>
  )
}

export default DashboardPage
