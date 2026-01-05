"use client"

import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  Activity,
  Eye,
  Zap,
  Play,
  DollarSign,
  Briefcase,
  Sparkles,
  ChevronRight,
  BarChart3,
  Clock,
  Shield,
  Building2,
  PieChart,
  AlertTriangle,
} from 'lucide-react'
import { PremiumStatCard, type ChartDataPoint } from '../components/ui/PremiumStatCard'
import {
  companyInfo,
  dashboardStats,
  competitors,
  recentActivity,
  watchlistItems,
  customers,
  kpiMetrics,
} from '../data/clientData'

// =============================================================================
// ANIMATION VARIANTS
// =============================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
}

// =============================================================================
// MOCK CHART DATA
// =============================================================================

const pipelineChartData: ChartDataPoint[] = [
  { name: 'Jan', value: 4200 },
  { name: 'Feb', value: 3800 },
  { name: 'Mar', value: 5100 },
  { name: 'Apr', value: 4600 },
  { name: 'May', value: 5800 },
  { name: 'Jun', value: 6200 },
  { name: 'Jul', value: 7100 },
]

const dealsChartData: ChartDataPoint[] = [
  { name: 'Jan', value: 12 },
  { name: 'Feb', value: 15 },
  { name: 'Mar', value: 18 },
  { name: 'Apr', value: 14 },
  { name: 'May', value: 22 },
  { name: 'Jun', value: 28 },
  { name: 'Jul', value: 35 },
]

const competitorsChartData: ChartDataPoint[] = [
  { name: 'Jan', value: 8 },
  { name: 'Feb', value: 9 },
  { name: 'Mar', value: 11 },
  { name: 'Apr', value: 12 },
  { name: 'May', value: 14 },
  { name: 'Jun', value: 15 },
  { name: 'Jul', value: 18 },
]

const activeDealsChartData: ChartDataPoint[] = [
  { name: 'Jan', value: 25 },
  { name: 'Feb', value: 28 },
  { name: 'Mar', value: 32 },
  { name: 'Apr', value: 30 },
  { name: 'May', value: 35 },
  { name: 'Jun', value: 42 },
  { name: 'Jul', value: 47 },
]

// =============================================================================
// PREMIUM ACTIVITY ITEM
// =============================================================================

interface ActivityItemProps {
  title: string
  description: string
  time: string
  status: 'success' | 'warning' | 'info'
  icon: string
}

function ActivityItem({ title, description, time, status, icon }: ActivityItemProps) {
  const statusStyles = {
    success: 'bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-emerald-500/30',
    warning: 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-amber-500/30',
    info: 'bg-gradient-to-br from-[#5E6AD2] to-[#7C85DE] shadow-[#5E6AD2]/30',
  }

  return (
    <motion.div
      variants={itemVariants}
      className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/[0.03] transition-all duration-300 cursor-pointer group"
      whileHover={{ x: 4 }}
    >
      <div className={`p-2.5 rounded-xl ${statusStyles[status]} shadow-lg text-white flex items-center justify-center`}>
        <span className="text-lg">{icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm text-[var(--text-primary)] group-hover:text-[#5E6AD2] transition-colors">{title}</p>
        <p className="text-sm text-[var(--text-muted)] truncate">{description}</p>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className="text-xs text-[var(--text-muted)] whitespace-nowrap">{time}</span>
        <ChevronRight className="w-4 h-4 text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </motion.div>
  )
}

// =============================================================================
// PREMIUM COMPETITOR CARD
// =============================================================================

interface CompetitorCardProps {
  name: string
  threatLevel: string
  marketShare: number
  trend?: 'up' | 'down' | 'stable'
  score?: number
}

function CompetitorCard({ name, threatLevel, marketShare, trend = 'stable', score }: CompetitorCardProps) {
  const threatConfig = {
    high: {
      gradient: 'from-red-500 to-rose-600',
      text: 'text-red-400',
      label: 'Menace élevée',
      ring: 'ring-1 ring-red-500/30'
    },
    medium: {
      gradient: 'from-amber-500 to-orange-600',
      text: 'text-amber-400',
      label: 'Menace modérée',
      ring: 'ring-1 ring-amber-500/30'
    },
    low: {
      gradient: 'from-emerald-500 to-green-600',
      text: 'text-emerald-400',
      label: 'Menace faible',
      ring: 'ring-1 ring-emerald-500/20'
    },
  }

  const trendIcons = {
    up: <TrendingUp className="w-4 h-4 text-red-400" />,
    down: <TrendingDown className="w-4 h-4 text-emerald-400" />,
    stable: <Activity className="w-4 h-4 text-[var(--text-muted)]" />,
  }

  const config = threatConfig[threatLevel as keyof typeof threatConfig]

  return (
    <motion.div
      variants={itemVariants}
      className={`
        relative overflow-hidden rounded-2xl
        border border-white/[0.08]
        bg-[var(--bg-card)]/60 backdrop-blur-xl
        p-5 cursor-pointer
        transition-all duration-300
        hover:border-white/[0.15]
        hover:bg-[var(--bg-card)]/80
        ${config.ring}
      `}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
          {name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold truncate text-[var(--text-primary)]">{name}</p>
          <div className="flex items-center gap-2 mt-1.5">
            <div className="h-1.5 flex-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${marketShare}%` }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                className={`h-full bg-gradient-to-r ${config.gradient} rounded-full`}
              />
            </div>
            <span className="text-xs text-[var(--text-muted)] font-medium">{marketShare}%</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/[0.06]">
        <div className="flex items-center gap-2">
          {trendIcons[trend]}
          {score && (
            <span className="text-sm text-[var(--text-muted)]">
              Score: <span className="text-[var(--text-primary)] font-semibold">{score}</span>
            </span>
          )}
        </div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full bg-white/5 ${config.text}`}>
          {config.label}
        </span>
      </div>
    </motion.div>
  )
}

// =============================================================================
// PREMIUM QUICK ACTION
// =============================================================================

interface QuickActionProps {
  icon: React.ReactNode
  label: string
  gradient: 'blue' | 'green' | 'purple' | 'orange'
  onClick?: () => void
}

function QuickAction({ icon, label, gradient, onClick }: QuickActionProps) {
  const gradients = {
    blue: 'from-[#5E6AD2] to-[#7C85DE]',
    green: 'from-emerald-500 to-green-600',
    purple: 'from-purple-500 to-violet-600',
    orange: 'from-amber-500 to-orange-600',
  }

  const shadows = {
    blue: 'shadow-[#5E6AD2]/40 hover:shadow-[#5E6AD2]/60',
    green: 'shadow-emerald-500/40 hover:shadow-emerald-500/60',
    purple: 'shadow-purple-500/40 hover:shadow-purple-500/60',
    orange: 'shadow-amber-500/40 hover:shadow-amber-500/60',
  }

  return (
    <motion.button
      variants={itemVariants}
      onClick={onClick}
      className={`
        flex flex-col items-center gap-3 p-6 rounded-2xl
        bg-gradient-to-br ${gradients[gradient]}
        shadow-lg ${shadows[gradient]}
        text-white transition-all duration-300
      `}
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
        {icon}
      </div>
      <span className="font-semibold text-sm">{label}</span>
    </motion.button>
  )
}

// =============================================================================
// HELPERS
// =============================================================================

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

function getActivityStatus(type: string): 'success' | 'warning' | 'info' {
  switch (type) {
    case 'deal_won':
    case 'analysis_complete':
      return 'success'
    case 'competitor_alert':
      return 'warning'
    default:
      return 'info'
  }
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value)
}

// =============================================================================
// DASHBOARD PAGE
// =============================================================================

export function DashboardPage() {
  const navigate = useNavigate()

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 pb-8"
    >
      {/* ====== PREMIUM HERO HEADER ====== */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[var(--bg-card)]/80 backdrop-blur-xl p-8"
      >
        {/* Background gradient mesh */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#5E6AD2]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex items-center justify-between flex-wrap gap-6">
          <div className="flex items-center gap-5">
            <motion.div
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#5E6AD2] to-[#7C85DE] flex items-center justify-center text-4xl shadow-xl shadow-[#5E6AD2]/30"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {companyInfo.logo}
            </motion.div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-[var(--text-primary)]">{companyInfo.brandName}</h1>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-[#5E6AD2] to-[#7C85DE] text-white shadow-lg shadow-[#5E6AD2]/30">
                  <Sparkles className="w-3 h-3" />
                  Pro
                </span>
              </div>
              <p className="text-[var(--text-secondary)] mt-1">{companyInfo.tagline}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => navigate('/launch-analysis')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#5E6AD2] to-[#7C85DE] text-white font-semibold shadow-lg shadow-[#5E6AD2]/30 hover:shadow-xl hover:shadow-[#5E6AD2]/40 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-4 h-4" />
              Nouvelle Analyse
            </motion.button>
            <motion.button
              onClick={() => navigate('/results')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/[0.1] bg-white/[0.03] text-[var(--text-primary)] font-semibold hover:bg-white/[0.06] transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <BarChart3 className="w-4 h-4" />
              Résultats
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* ====== PREMIUM STAT CARDS WITH CHARTS ====== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <PremiumStatCard
          title="Pipeline Total"
          value={formatCurrency(dashboardStats.totalPipelineValue)}
          change="+15.2% ce trimestre"
          changeType="positive"
          icon={DollarSign}
          chartData={pipelineChartData}
          iconColor="green"
        />
        <PremiumStatCard
          title="Deals Gagnés"
          value={formatCurrency(dashboardStats.wonDealsValue)}
          change="+23% vs Q3"
          changeType="positive"
          icon={Briefcase}
          chartData={dealsChartData}
          iconColor="blue"
        />
        <PremiumStatCard
          title="Concurrents surveillés"
          value={dashboardStats.competitorCount.toString()}
          change="+8.5% ce mois"
          changeType="positive"
          icon={Target}
          chartData={competitorsChartData}
          iconColor="purple"
        />
        <PremiumStatCard
          title="Deals en cours"
          value={dashboardStats.activeDeals.toString()}
          change="+12 nouveaux"
          changeType="positive"
          icon={Activity}
          chartData={activeDealsChartData}
          iconColor="orange"
        />
      </div>

      {/* ====== KPI METRICS ROW ====== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { ...kpiMetrics.timeSavings, icon: Clock, color: 'blue' },
          { ...kpiMetrics.costSavings, icon: DollarSign, color: 'green' },
          { ...kpiMetrics.productivityGain, icon: TrendingUp, color: 'purple' },
          { ...kpiMetrics.weightReduction, icon: Shield, color: 'orange' },
        ].map((kpi, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[var(--bg-card)]/60 backdrop-blur-xl p-6 text-center group"
            whileHover={{ y: -4, scale: 1.02 }}
          >
            <div className={`
              w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center
              bg-gradient-to-br
              ${kpi.color === 'blue' ? 'from-[#5E6AD2] to-[#7C85DE] shadow-[#5E6AD2]/30' : ''}
              ${kpi.color === 'green' ? 'from-emerald-500 to-green-600 shadow-emerald-500/30' : ''}
              ${kpi.color === 'purple' ? 'from-purple-500 to-violet-600 shadow-purple-500/30' : ''}
              ${kpi.color === 'orange' ? 'from-amber-500 to-orange-600 shadow-amber-500/30' : ''}
              shadow-lg
            `}>
              <kpi.icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-3xl font-bold text-[var(--text-primary)] mb-1">{kpi.value}</p>
            <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">{kpi.label}</p>
            <p className="text-xs text-[var(--text-muted)]">{kpi.description}</p>
          </motion.div>
        ))}
      </div>

      {/* ====== MAIN CONTENT GRID ====== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 rounded-2xl border border-white/[0.08] bg-[var(--bg-card)]/60 backdrop-blur-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-[#5E6AD2] to-[#7C85DE] shadow-lg shadow-[#5E6AD2]/30">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-[var(--text-primary)]">Activité récente</h2>
            </div>
            <button className="text-sm text-[#5E6AD2] hover:text-[#7C85DE] transition-colors flex items-center gap-1 font-medium">
              Voir tout
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1">
            {recentActivity.map((activity, index) => (
              <ActivityItem
                key={index}
                title={activity.title}
                description={activity.description}
                time={formatRelativeTime(activity.timestamp)}
                status={getActivityStatus(activity.type)}
                icon={activity.icon}
              />
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          variants={itemVariants}
          className="rounded-2xl border border-white/[0.08] bg-[var(--bg-card)]/60 backdrop-blur-xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 shadow-lg shadow-purple-500/30">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-[var(--text-primary)]">Actions rapides</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <QuickAction
              icon={<Play className="w-6 h-6" />}
              label="Nouvelle analyse"
              gradient="blue"
              onClick={() => navigate('/launch-analysis')}
            />
            <QuickAction
              icon={<Eye className="w-6 h-6" />}
              label="Voir résultats"
              gradient="purple"
              onClick={() => navigate('/results')}
            />
            <QuickAction
              icon={<Users className="w-6 h-6" />}
              label="Watchlist"
              gradient="green"
              onClick={() => navigate('/watchlist')}
            />
            <QuickAction
              icon={<Building2 className="w-6 h-6" />}
              label="Mon Entreprise"
              gradient="orange"
              onClick={() => navigate('/my-company')}
            />
          </div>
        </motion.div>
      </div>

      {/* ====== TOP COMPETITORS ====== */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl border border-white/[0.08] bg-[var(--bg-card)]/60 backdrop-blur-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/30">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[var(--text-primary)]">Concurrents principaux</h2>
              <p className="text-sm text-[var(--text-muted)]">Classés par niveau de menace et part de marché</p>
            </div>
          </div>
          <motion.button
            onClick={() => navigate('/watchlist')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#5E6AD2] to-[#7C85DE] text-white font-medium text-sm shadow-lg shadow-[#5E6AD2]/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Voir la watchlist
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {competitors.slice(0, 6).map((competitor, index) => {
            const watchlistItem = watchlistItems.find(w => w.competitor.name === competitor.name)
            return (
              <CompetitorCard
                key={index}
                name={competitor.name}
                threatLevel={competitor.threatLevel}
                marketShare={competitor.marketShare}
                trend={watchlistItem?.trend as 'up' | 'down' | 'stable' | undefined}
                score={watchlistItem?.score}
              />
            )
          })}
        </div>
      </motion.div>

      {/* ====== CUSTOMERS PIPELINE ====== */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl border border-white/[0.08] bg-[var(--bg-card)]/60 backdrop-blur-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg shadow-emerald-500/30">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[var(--text-primary)]">Pipeline Clients</h2>
              <p className="text-sm text-[var(--text-muted)]">
                {customers.won.length} deals gagnés • {customers.pipeline.length} en cours
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400">
              Gagnés: {formatCurrency(dashboardStats.wonDealsValue)}
            </span>
            <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-[#5E6AD2]/20 text-[#5E6AD2]">
              Pipeline: {formatCurrency(dashboardStats.totalPipelineValue)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...customers.won.slice(0, 3), ...customers.pipeline.slice(0, 3)].map((customer, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="rounded-2xl border border-white/[0.08] bg-[var(--bg-card)]/40 backdrop-blur-xl p-4 text-center cursor-pointer"
              whileHover={{ y: -6, scale: 1.05 }}
            >
              <span className="text-4xl inline-block mb-2">{customer.logo}</span>
              <p className="font-semibold text-sm truncate text-[var(--text-primary)]">{customer.name}</p>
              <p className="text-xs text-[var(--text-muted)] mb-2">{customer.industry}</p>
              <p className="text-sm font-bold text-[#5E6AD2]">{formatCurrency(customer.dealValue)}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ====== PERFORMANCE CHART ====== */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl border border-white/[0.08] bg-[var(--bg-card)]/60 backdrop-blur-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 shadow-lg shadow-purple-500/30">
              <PieChart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[var(--text-primary)]">Performance de veille</h2>
              <p className="text-sm text-[var(--text-muted)]">Évolution des analyses sur 12 mois</p>
            </div>
          </div>
          <div className="flex gap-2">
            {['30 jours', '90 jours', '1 an'].map((period, i) => (
              <motion.button
                key={period}
                className={`text-sm py-2 px-4 rounded-xl transition-all duration-300 ${
                  i === 0
                    ? 'bg-gradient-to-r from-[#5E6AD2] to-[#7C85DE] text-white shadow-lg shadow-[#5E6AD2]/30'
                    : 'border border-white/[0.1] text-[var(--text-secondary)] hover:bg-white/[0.05]'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {period}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Chart visualization */}
        <div className="relative h-72 rounded-2xl overflow-hidden bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.05]">
          {/* Grid lines */}
          <div className="absolute inset-0">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute left-0 right-0 border-t border-white/[0.03]"
                style={{ top: `${(i + 1) * 20}%` }}
              />
            ))}
          </div>

          {/* Bar chart */}
          <div className="absolute inset-0 flex items-end justify-around p-6 gap-3">
            {[65, 45, 78, 56, 89, 67, 92, 74, 85, 68, 95, 82].map((height, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                className="flex-1 rounded-t-lg bg-gradient-to-t from-[#5E6AD2] to-[#7C85DE] hover:from-[#7C85DE] hover:to-purple-500 transition-all duration-300 cursor-pointer relative group"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg shadow-[#5E6AD2]/50" />

                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-[var(--bg-elevated)] border border-white/10 text-[var(--text-primary)] text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl">
                  {height}%
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default DashboardPage
