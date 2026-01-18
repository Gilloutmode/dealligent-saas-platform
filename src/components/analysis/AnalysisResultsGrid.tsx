// =============================================================================
// DEALLIGENT PLATFORM - ANALYSIS RESULTS GRID
// 2-column grid for strengths vs weaknesses display (aligned with n8n output)
// =============================================================================

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Activity } from 'lucide-react'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

// =============================================================================
// TYPES
// =============================================================================

export interface AnalysisResultsGridProps {
  strengths: string[]
  weaknesses: string[]
  recentActivity?: string[]
  maxItems?: number
}

interface ColumnProps {
  title: string
  items: string[]
  icon: React.ReactNode
  colorClass: string
  bgClass: string
  badgeClass: string
  maxItems: number
}

// =============================================================================
// COLUMN COMPONENT
// =============================================================================

function Column({ title, items, icon, colorClass, bgClass, badgeClass, maxItems }: ColumnProps): React.ReactElement {
  const displayItems = items.slice(0, maxItems)
  const remaining = items.length - maxItems

  return (
    <motion.div
      className={`card-glass-enhanced p-5 ${bgClass}`}
      variants={itemVariants}
      whileHover={{ y: -2 }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-xl ${colorClass} flex items-center justify-center text-white shadow-lg`}>
          {icon}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-primary">{title}</h4>
          <span className="text-xs text-muted">{items.length} élément{items.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Items with stagger animation */}
      {items.length > 0 ? (
        <motion.ul
          className="space-y-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {displayItems.map((item, index) => (
            <motion.li
              key={index}
              variants={itemVariants}
              className="flex items-start gap-2.5"
            >
              <span className={`${badgeClass} shrink-0 px-2 py-1 text-xs rounded-lg inline-flex items-center gap-1`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {index + 1}
              </span>
              <span className="text-sm text-secondary leading-relaxed">{item}</span>
            </motion.li>
          ))}
          {remaining > 0 && (
            <motion.li
              variants={itemVariants}
              className="text-sm text-muted italic pl-9"
            >
              +{remaining} autre{remaining > 1 ? 's' : ''}...
            </motion.li>
          )}
        </motion.ul>
      ) : (
        <p className="text-sm text-muted italic py-4 text-center">Aucune donnée disponible</p>
      )}
    </motion.div>
  )
}

// =============================================================================
// RECENT ACTIVITY SECTION
// =============================================================================

interface RecentActivityProps {
  items: string[]
  maxItems?: number
}

function RecentActivitySection({ items, maxItems = 5 }: RecentActivityProps): React.ReactElement | null {
  if (items.length === 0) return null

  const displayItems = items.slice(0, maxItems)
  const remaining = items.length - maxItems

  return (
    <motion.div
      className="card-glass-enhanced p-5 border-blue-500/20"
      variants={itemVariants}
      whileHover={{ y: -2 }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white shadow-lg">
          <Activity className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-primary">Activité récente</h4>
          <span className="text-xs text-muted">{items.length} événement{items.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Items */}
      <motion.ul
        className="space-y-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {displayItems.map((item, index) => (
          <motion.li
            key={index}
            variants={itemVariants}
            className="flex items-start gap-2.5"
          >
            <span className="badge-glow-blue shrink-0 px-2 py-1 text-xs rounded-lg inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {index + 1}
            </span>
            <span className="text-sm text-secondary leading-relaxed">{item}</span>
          </motion.li>
        ))}
        {remaining > 0 && (
          <motion.li
            variants={itemVariants}
            className="text-sm text-muted italic pl-9"
          >
            +{remaining} autre{remaining > 1 ? 's' : ''}...
          </motion.li>
        )}
      </motion.ul>
    </motion.div>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function AnalysisResultsGrid({
  strengths,
  weaknesses,
  recentActivity = [],
  maxItems = 5,
}: AnalysisResultsGridProps): React.ReactElement {
  return (
    <motion.div
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 2-column grid: Strengths vs Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strengths - Green */}
        <Column
          title="Forces"
          items={strengths}
          icon={<TrendingUp className="w-5 h-5" />}
          colorClass="bg-gradient-to-br from-emerald-500 to-green-600"
          bgClass="border-emerald-500/20"
          badgeClass="badge-glow-green"
          maxItems={maxItems}
        />

        {/* Weaknesses vs CDS - Red */}
        <Column
          title="Faiblesses vs CDS"
          items={weaknesses}
          icon={<TrendingDown className="w-5 h-5" />}
          colorClass="bg-gradient-to-br from-red-500 to-rose-600"
          bgClass="border-red-500/20"
          badgeClass="badge-glow-red"
          maxItems={maxItems}
        />
      </div>

      {/* Recent Activity - Full width */}
      <RecentActivitySection items={recentActivity} maxItems={maxItems} />
    </motion.div>
  )
}

export default AnalysisResultsGrid
