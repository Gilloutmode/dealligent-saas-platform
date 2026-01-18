"use client"

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, CheckCircle, XCircle } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { cn } from '../../lib/utils'

// =============================================================================
// SWOT GRID COMPONENT
// Premium two-column grid showing Strengths and Weaknesses
// Based on 21st.dev component, adapted for Dealligent design system
// =============================================================================

export interface SWOTGridProps {
  strengths: string[]
  weaknesses: string[]
  className?: string
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

const listItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
}

export function SWOTGrid({ strengths, weaknesses, className }: SWOTGridProps) {
  const { isDark } = useTheme()

  // Theme-aware colors
  const strengthsColors = {
    bg: isDark ? 'rgba(16, 185, 129, 0.08)' : 'rgba(16, 185, 129, 0.06)',
    border: isDark ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.25)',
    headerBg: isDark ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.12)',
    dot: 'bg-emerald-500',
    text: isDark ? 'text-emerald-400' : 'text-emerald-600',
    icon: 'from-emerald-500 to-cyan-500',
    glow: 'shadow-emerald-500/25',
  }

  const weaknessesColors = {
    bg: isDark ? 'rgba(239, 68, 68, 0.08)' : 'rgba(239, 68, 68, 0.06)',
    border: isDark ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.25)',
    headerBg: isDark ? 'rgba(239, 68, 68, 0.15)' : 'rgba(239, 68, 68, 0.12)',
    dot: 'bg-red-500',
    text: isDark ? 'text-red-400' : 'text-red-600',
    icon: 'from-red-500 to-rose-600',
    glow: 'shadow-red-500/25',
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn("grid grid-cols-1 md:grid-cols-2 gap-4", className)}
    >
      {/* Strengths Card */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundColor: strengthsColors.bg,
          border: `1px solid ${strengthsColors.border}`,
        }}
        whileHover={{ y: -2 }}
      >
        {/* Header */}
        <div
          className="px-5 py-4 flex items-center gap-3"
          style={{ backgroundColor: strengthsColors.headerBg }}
        >
          <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${strengthsColors.icon} flex items-center justify-center shadow-lg ${strengthsColors.glow}`}>
            <TrendingUp className="w-4.5 h-4.5 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <h3 className={`font-semibold ${strengthsColors.text}`}>
              Forces
            </h3>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 ${strengthsColors.text}`}>
              {strengths.length}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {strengths.length > 0 ? (
            <motion.ul
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              {strengths.map((item, index) => (
                <motion.li
                  key={index}
                  variants={listItemVariants}
                  className="flex items-start gap-3 text-sm"
                >
                  <CheckCircle className={`w-4 h-4 mt-0.5 shrink-0 ${strengthsColors.text}`} />
                  <span className="text-[var(--text-secondary)]">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          ) : (
            <p className="text-sm text-[var(--text-muted)] text-center py-4">
              Aucune force identifiée
            </p>
          )}
        </div>
      </motion.div>

      {/* Weaknesses Card */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundColor: weaknessesColors.bg,
          border: `1px solid ${weaknessesColors.border}`,
        }}
        whileHover={{ y: -2 }}
      >
        {/* Header */}
        <div
          className="px-5 py-4 flex items-center gap-3"
          style={{ backgroundColor: weaknessesColors.headerBg }}
        >
          <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${weaknessesColors.icon} flex items-center justify-center shadow-lg ${weaknessesColors.glow}`}>
            <TrendingDown className="w-4.5 h-4.5 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <h3 className={`font-semibold ${weaknessesColors.text}`}>
              Faiblesses vs CDS
            </h3>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium bg-red-500/10 ${weaknessesColors.text}`}>
              {weaknesses.length}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {weaknesses.length > 0 ? (
            <motion.ul
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              {weaknesses.map((item, index) => (
                <motion.li
                  key={index}
                  variants={listItemVariants}
                  className="flex items-start gap-3 text-sm"
                >
                  <XCircle className={`w-4 h-4 mt-0.5 shrink-0 ${weaknessesColors.text}`} />
                  <span className="text-[var(--text-secondary)]">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          ) : (
            <p className="text-sm text-[var(--text-muted)] text-center py-4">
              Aucune faiblesse identifiée
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default SWOTGrid
