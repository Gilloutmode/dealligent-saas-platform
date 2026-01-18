// =============================================================================
// DEALLIGENT PLATFORM - QUICK STATS
// Overview statistics section with animated numbers
// =============================================================================

"use client"

import { motion } from 'framer-motion'
import { Target, BarChart3, TrendingUp, Bell, type LucideIcon } from 'lucide-react'
import { NumberTicker } from '../ui/NumberTicker'

// =============================================================================
// TYPES
// =============================================================================

export interface QuickStatsProps {
  competitors: number
  analyses: number
  avgScore: number
  alerts: number
}

interface StatCardProps {
  label: string
  value: number
  suffix?: string
  icon: LucideIcon
  iconBg: 'blue' | 'green' | 'purple' | 'red'
  delay: number
}

// =============================================================================
// STAT CARD COMPONENT
// =============================================================================

function StatCard({ label, value, suffix, icon: Icon, iconBg, delay }: StatCardProps) {
  const bgColors = {
    blue: 'bg-blue-500/15 text-blue-500',
    green: 'bg-emerald-500/15 text-emerald-500',
    purple: 'bg-purple-500/15 text-purple-500',
    red: 'bg-red-500/15 text-red-500',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)] overflow-hidden group"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative flex items-center gap-4">
        {/* Icon */}
        <div className={`w-12 h-12 rounded-xl ${bgColors[iconBg]} flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-6 h-6" />
        </div>

        {/* Content */}
        <div>
          <p className="text-sm text-[var(--text-muted)] mb-0.5">{label}</p>
          <div className="text-2xl font-bold text-[var(--text-primary)] flex items-baseline gap-0.5">
            <NumberTicker value={value} delay={delay + 0.3} />
            {suffix && <span className="text-lg text-[var(--text-muted)]">{suffix}</span>}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function QuickStats({ competitors, analyses, avgScore, alerts }: QuickStatsProps) {
  return (
    <section className="py-8 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            Aperçu Rapide
          </h2>
          <div className="h-px mt-2 bg-gradient-to-r from-[var(--border-light)] to-transparent max-w-xs" />
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            label="Concurrents"
            value={competitors}
            icon={Target}
            iconBg="blue"
            delay={0}
          />
          <StatCard
            label="Analyses"
            value={analyses}
            icon={BarChart3}
            iconBg="green"
            delay={0.1}
          />
          <StatCard
            label="Score Moyen"
            value={avgScore}
            suffix="%"
            icon={TrendingUp}
            iconBg="purple"
            delay={0.2}
          />
          <StatCard
            label="Alertes"
            value={alerts}
            icon={Bell}
            iconBg="red"
            delay={0.3}
          />
        </div>
      </div>
    </section>
  )
}

export default QuickStats
