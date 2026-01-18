// =============================================================================
// DEALLIGENT PLATFORM - RECENT ACTIVITY
// Recent analysis activity preview section
// =============================================================================

"use client"

import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Clock, AlertTriangle, Activity, ChevronRight, Sparkles } from 'lucide-react'

// =============================================================================
// TYPES
// =============================================================================

export interface ActivityItem {
  id: string
  type: 'analysis' | 'alert' | 'update'
  title: string
  description: string
  timestamp: string
  threatLevel?: 'high' | 'medium' | 'low'
  route?: string
}

export interface RecentActivityProps {
  activities: ActivityItem[]
  maxItems?: number
}

// =============================================================================
// THREAT BADGE
// =============================================================================

function ThreatBadge({ level }: { level: 'high' | 'medium' | 'low' }) {
  const config = {
    high: { label: 'HIGH', className: 'bg-red-500/15 text-red-500 border-red-500/30' },
    medium: { label: 'MEDIUM', className: 'bg-amber-500/15 text-amber-500 border-amber-500/30' },
    low: { label: 'LOW', className: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30' },
  }

  const { label, className } = config[level]

  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${className}`}>
      {label}
    </span>
  )
}

// =============================================================================
// ACTIVITY ITEM COMPONENT
// =============================================================================

function ActivityItemCard({ item, index }: { item: ActivityItem; index: number }) {
  const navigate = useNavigate()

  const icons = {
    analysis: Activity,
    alert: AlertTriangle,
    update: Sparkles,
  }

  const iconColors = {
    analysis: 'bg-blue-500/15 text-blue-500',
    alert: 'bg-amber-500/15 text-amber-500',
    update: 'bg-purple-500/15 text-purple-500',
  }

  const Icon = icons[item.type]

  const handleClick = () => {
    if (item.route) {
      navigate(item.route)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onClick={handleClick}
      className={`
        flex items-center gap-4 p-4 rounded-xl
        bg-[var(--bg-secondary)] border border-[var(--border-light)]
        ${item.route ? 'cursor-pointer hover:bg-[var(--bg-tertiary)] hover:border-[var(--border-default)]' : ''}
        transition-all duration-200 group
      `}
    >
      {/* Icon */}
      <div className={`w-10 h-10 rounded-lg ${iconColors[item.type]} flex items-center justify-center flex-shrink-0`}>
        <Icon className="w-5 h-5" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="text-sm font-medium text-[var(--text-primary)] truncate">
            {item.title}
          </h4>
          {item.threatLevel && <ThreatBadge level={item.threatLevel} />}
        </div>
        <p className="text-xs text-[var(--text-muted)] truncate">
          {item.description}
        </p>
      </div>

      {/* Timestamp & Arrow */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
          <Clock className="w-3.5 h-3.5" />
          <span>{item.timestamp}</span>
        </div>
        {item.route && (
          <ChevronRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] group-hover:translate-x-1 transition-all" />
        )}
      </div>
    </motion.div>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function RecentActivity({ activities, maxItems = 5 }: RecentActivityProps) {
  const displayedActivities = activities.slice(0, maxItems)

  if (displayedActivities.length === 0) {
    return (
      <section className="py-8 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center mx-auto mb-4">
              <Activity className="w-8 h-8 text-[var(--text-muted)]" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
              Aucune activité récente
            </h3>
            <p className="text-sm text-[var(--text-muted)]">
              Lancez votre première analyse pour commencer
            </p>
          </motion.div>
        </div>
      </section>
    )
  }

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
            Activité Récente
          </h2>
          <div className="h-px mt-2 bg-gradient-to-r from-[var(--border-light)] to-transparent max-w-xs" />
        </motion.div>

        {/* Activity List */}
        <div className="space-y-3">
          {displayedActivities.map((activity, index) => (
            <ActivityItemCard key={activity.id} item={activity} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default RecentActivity
