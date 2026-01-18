"use client"

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import {
  Users,
  Target,
  Activity,
  TrendingUp,
  BarChart3,
  RefreshCw,
  Shield,
  Play,
  PieChart as PieChartIcon,
  Clock,
  Zap,
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
import { PremiumCard } from '../components/ui/PremiumCard'
import { useTheme } from '../contexts/ThemeContext'

// =============================================================================
// DASHBOARD PAGE - PREMIUM DESIGN
// Clean KPIs with NumberTicker + Charts + Recent Analyses
// Full light/dark mode support with cohesive design
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

function ThreatDistributionChart({ data }: { data: { name: string; value: number; color: string }[] }) {
  const { isDark } = useTheme()

  return (
    <motion.div variants={itemVariants} className="h-full">
      <PremiumCard variant="orange" enableHover delay={0.1} className="h-full">
        <div className="h-full flex flex-col">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/25">
              <PieChartIcon className="w-5 h-5 text-white" />
            </div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Distribution des Menaces
            </h3>
          </div>
          <div className="flex-1 flex items-center gap-6">
            <div className="w-32 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    innerRadius={35}
                    outerRadius={55}
                    paddingAngle={4}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-3">
              {data.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.name}</span>
                  </div>
                  <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PremiumCard>
    </motion.div>
  )
}

// =============================================================================
// RECENT ANALYSES LIST
// =============================================================================

const threatDotColors = {
  HIGH: 'bg-red-500',
  MEDIUM: 'bg-amber-500',
  LOW: 'bg-emerald-500',
}

const threatBadgeStylesDark = {
  HIGH: 'bg-red-500/15 text-red-400 border-red-500/20',
  MEDIUM: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
  LOW: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
}

const threatBadgeStylesLight = {
  HIGH: 'bg-red-50 text-red-600 border-red-200',
  MEDIUM: 'bg-amber-50 text-amber-600 border-amber-200',
  LOW: 'bg-emerald-50 text-emerald-600 border-emerald-200',
}

function formatRelativeTime(isoString: string): string {
  const date = new Date(isoString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffHours / 24)

  if (diffHours < 1) return 'Il y a quelques minutes'
  if (diffHours < 24) return `Il y a ${diffHours}h`
  if (diffDays === 1) return 'Hier'
  return `Il y a ${diffDays} jours`
}

function RecentAnalysesList() {
  const { completedAnalyses } = useAnalysis()
  const { isDark } = useTheme()
  const recentAnalyses = completedAnalyses.slice(0, 5)
  const threatBadgeStyles = isDark ? threatBadgeStylesDark : threatBadgeStylesLight

  if (recentAnalyses.length === 0) {
    return (
      <motion.div variants={itemVariants} className="h-full">
        <PremiumCard variant="purple" enableHover delay={0.05} className="h-full">
          <div className="h-full flex flex-col">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/25">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Analyses Récentes
              </h3>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center py-8">
              <Target className={`w-12 h-12 ${isDark ? 'text-gray-600' : 'text-gray-400'} mx-auto mb-3`} />
              <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Aucune analyse complétée</p>
              <Link
                to="/launch-analysis"
                className="inline-flex items-center gap-1.5 mt-3 text-sm text-blue-500 hover:text-blue-400 hover:underline"
              >
                <Play className="w-4 h-4" />
                Lancer une analyse
              </Link>
            </div>
          </div>
        </PremiumCard>
      </motion.div>
    )
  }

  return (
    <motion.div variants={itemVariants} className="h-full">
      <PremiumCard variant="purple" enableHover delay={0.05} className="h-full">
        <div className="h-full flex flex-col">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/25">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Analyses Récentes
            </h3>
          </div>
          <div className="flex-1 space-y-1">
            {recentAnalyses.map((analysis) => {
              const threatLevel = (analysis.response?.data?.threatLevel || 'MEDIUM') as keyof typeof threatDotColors
              return (
                <div
                  key={analysis.id}
                  className={`flex items-center justify-between py-3 border-b last:border-0 ${
                    isDark ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${threatDotColors[threatLevel]}`} />
                    <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{analysis.competitor}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      {analysis.completedAt ? formatRelativeTime(analysis.completedAt) : '-'}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${threatBadgeStyles[threatLevel]}`}>
                      {threatLevel}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
          <Link
            to="/results"
            className="block text-center text-sm text-blue-500 hover:text-blue-400 hover:underline mt-4"
          >
            Voir toutes les analyses →
          </Link>
        </div>
      </PremiumCard>
    </motion.div>
  )
}

// =============================================================================
// ACTIVITY TIMELINE CHART
// =============================================================================

function ActivityTimelineChart() {
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
      <PremiumCard variant="cyan" enableHover delay={0.15}>
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/25">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Activité (7 jours)
          </h3>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorAnalyses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0891b2" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0891b2" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: isDark ? '#6b7280' : '#9ca3af', fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: isDark ? '#6b7280' : '#9ca3af', fontSize: 12 }}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#1f2937' : '#ffffff',
                  border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                  color: isDark ? '#f9fafb' : '#111827',
                }}
              />
              <Area
                type="monotone"
                dataKey="analyses"
                stroke="#0891b2"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorAnalyses)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </PremiumCard>
    </motion.div>
  )
}

// =============================================================================
// QUICK ACTIONS SECTION
// =============================================================================

function QuickActionsSection() {
  const navigate = useNavigate()
  const { isDark } = useTheme()

  const actions = [
    { label: 'Lancer Analyse', icon: Play, path: '/launch-analysis', variant: 'blue' as const },
    { label: 'Voir Résultats', icon: BarChart3, path: '/results', variant: 'purple' as const },
    { label: 'Watchlist', icon: Shield, path: '/watchlist', variant: 'green' as const },
    { label: 'Mes Analyses', icon: Activity, path: '/my-analyses', variant: 'orange' as const },
  ]

  const iconBgStyles = {
    blue: 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-blue-500/25',
    green: 'bg-gradient-to-br from-emerald-500 to-green-600 shadow-emerald-500/25',
    orange: 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-amber-500/25',
    purple: 'bg-gradient-to-br from-violet-500 to-purple-600 shadow-violet-500/25',
  }

  return (
    <motion.div variants={itemVariants}>
      <PremiumCard variant="green" enableHover delay={0.2}>
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/25">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Actions Rapides
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {actions.map((action) => {
            const Icon = action.icon
            return (
              <motion.button
                key={action.path}
                onClick={() => navigate(action.path)}
                className={`
                  flex flex-col items-center gap-2 p-4 rounded-xl
                  border transition-all
                  ${isDark
                    ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                  }
                `}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`p-2.5 rounded-lg ${iconBgStyles[action.variant]} shadow-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {action.label}
                </span>
              </motion.button>
            )
          })}
        </div>
      </PremiumCard>
    </motion.div>
  )
}

// =============================================================================
// DASHBOARD PAGE
// =============================================================================

export function DashboardPage() {
  const navigate = useNavigate()
  const { isDark } = useTheme()
  const { completedAnalyses, runningAnalyses } = useAnalysis()

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
      className="p-8 space-y-6 max-w-7xl mx-auto"
    >
      {/* Premium Welcome Header */}
      <motion.div variants={itemVariants}>
        <PremiumCard variant="default" enableHover={false}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl font-bold flex items-center gap-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <span className="animate-subtle-pulse text-3xl">👋</span>
                Bienvenue sur Dealligent
              </h1>
              <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Votre veille concurrentielle intelligente en temps réel
              </p>
            </div>
            <div className="flex items-center gap-4">
              {/* Live Status Indicator */}
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
                isDark ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-emerald-50 border border-emerald-200'
              }`}>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-subtle-pulse" />
                <span className={`text-xs font-medium ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                  Système actif
                </span>
              </div>
              {/* Last Update */}
              <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                <Clock className="w-4 h-4" />
                <span>Mis à jour il y a 2h</span>
              </div>
            </div>
          </div>
        </PremiumCard>
      </motion.div>

      {/* Action Buttons Row */}
      <motion.div variants={itemVariants} className="flex items-center justify-end gap-3">
        <motion.button
          onClick={() => window.location.reload()}
          className={`p-2.5 rounded-lg border transition-all ${
            isDark
              ? 'border-white/10 text-gray-400 hover:bg-white/5 hover:border-white/20'
              : 'border-gray-200 text-gray-500 hover:bg-gray-100 hover:border-gray-300'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Actualiser"
        >
          <RefreshCw className="w-4 h-4" />
        </motion.button>
        <motion.button
          onClick={() => navigate('/launch-analysis')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Play className="w-4 h-4" />
          Nouvelle Analyse
        </motion.button>
      </motion.div>

      {/* KPI Cards - Professional B2B SaaS style with light/dark mode */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
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
          trend={{ direction: avgScore > 70 ? 'up' : 'neutral', value: 5, label: 'amélioration' }}
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

      {/* Content Grid - Equal height cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <RecentAnalysesList />
        <ThreatDistributionChart data={threatDistribution} />
      </div>

      {/* Activity Timeline */}
      <ActivityTimelineChart />

      {/* Quick Actions */}
      <QuickActionsSection />
    </motion.div>
  )
}

export default DashboardPage
