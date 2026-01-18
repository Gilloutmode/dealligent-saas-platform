"use client"

import { motion } from 'framer-motion'
import { Activity, Clock } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { cn } from '../../lib/utils'

// =============================================================================
// RECENT ACTIVITY PANEL COMPONENT
// Shows recent competitor activity with timestamps
// =============================================================================

export interface RecentActivityPanelProps {
  activities: string[]
  className?: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
}

export function RecentActivityPanel({ activities, className }: RecentActivityPanelProps) {
  const { isDark } = useTheme()

  const cardBg = isDark ? 'rgba(139, 92, 246, 0.08)' : 'rgba(139, 92, 246, 0.06)'
  const cardBorder = isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.25)'
  const headerBg = isDark ? 'rgba(139, 92, 246, 0.15)' : 'rgba(139, 92, 246, 0.12)'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("rounded-2xl overflow-hidden", className)}
      style={{
        backgroundColor: cardBg,
        border: `1px solid ${cardBorder}`,
      }}
    >
      {/* Header */}
      <div
        className="px-5 py-4 flex items-center gap-3"
        style={{ backgroundColor: headerBg }}
      >
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
          <Activity className="w-4.5 h-4.5 text-white" />
        </div>
        <div className="flex items-center gap-2">
          <h3 className={`font-semibold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
            Activité Récente
          </h3>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium bg-purple-500/10 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
            {activities.length}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {activities.length > 0 ? (
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            {activities.map((activity, index) => (
              <motion.li
                key={index}
                variants={itemVariants}
                className="flex items-start gap-3 text-sm group"
              >
                <div className="w-6 h-6 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className={`w-3.5 h-3.5 ${isDark ? 'text-purple-400' : 'text-purple-500'}`} />
                </div>
                <span className="text-[var(--text-secondary)] flex-1">{activity}</span>
              </motion.li>
            ))}
          </motion.ul>
        ) : (
          <p className="text-sm text-[var(--text-muted)] text-center py-4">
            Aucune activité récente
          </p>
        )}
      </div>
    </motion.div>
  )
}

export default RecentActivityPanel
