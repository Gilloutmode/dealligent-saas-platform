"use client"

import { motion } from 'framer-motion'
import { Bell, ArrowRight } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { cn } from '../../lib/utils'

// =============================================================================
// ACTION REQUIRED PANEL COMPONENT
// Shows recommended action with CTA
// =============================================================================

export interface ActionRequiredPanelProps {
  action?: string
  className?: string
  onActionClick?: () => void
}

export function ActionRequiredPanel({ action, className, onActionClick }: ActionRequiredPanelProps) {
  const { isDark } = useTheme()

  const cardBg = isDark ? 'rgba(245, 158, 11, 0.08)' : 'rgba(245, 158, 11, 0.06)'
  const cardBorder = isDark ? 'rgba(245, 158, 11, 0.2)' : 'rgba(245, 158, 11, 0.25)'
  const headerBg = isDark ? 'rgba(245, 158, 11, 0.15)' : 'rgba(245, 158, 11, 0.12)'

  if (!action) {
    return null
  }

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
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/25">
          <Bell className="w-4.5 h-4.5 text-white" />
        </div>
        <h3 className={`font-semibold ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
          Action Recommandée
        </h3>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-sm text-[var(--text-secondary)] mb-4">
          {action}
        </p>

        {onActionClick && (
          <motion.button
            onClick={onActionClick}
            className={`
              inline-flex items-center gap-2 px-4 py-2 rounded-lg
              bg-gradient-to-r from-amber-500 to-orange-500
              text-white text-sm font-medium
              shadow-lg shadow-amber-500/25
              hover:shadow-amber-500/40
              transition-shadow
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Prendre action
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

export default ActionRequiredPanel
