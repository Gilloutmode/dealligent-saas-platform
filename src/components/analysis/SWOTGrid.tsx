// =============================================================================
// DEALLIGENT PLATFORM - SWOT GRID
// 2x2 grid for SWOT analysis display
// =============================================================================

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Target, AlertTriangle } from 'lucide-react'

export interface SWOTGridProps {
  strengths: string[]
  weaknesses: string[]
  opportunities: string[]
  threats: string[]
  /** Maximum items to show per quadrant */
  maxItems?: number
}

interface QuadrantProps {
  title: string
  items: string[]
  icon: React.ReactNode
  colorClass: string
  bgClass: string
  maxItems: number
}

function Quadrant({ title, items, icon, colorClass, bgClass, maxItems }: QuadrantProps): React.ReactElement {
  const displayItems = items.slice(0, maxItems)
  const remaining = items.length - maxItems

  return (
    <motion.div
      className={`card-glass p-4 ${bgClass}`}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-8 h-8 rounded-lg ${colorClass} flex items-center justify-center text-white`}>
          {icon}
        </div>
        <h4 className="font-semibold text-primary">{title}</h4>
        {items.length > 0 && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-surface-tertiary text-secondary ml-auto">
            {items.length}
          </span>
        )}
      </div>

      {/* Items */}
      {items.length > 0 ? (
        <ul className="space-y-2">
          {displayItems.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-secondary"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${colorClass} mt-1.5 shrink-0`} />
              <span className="line-clamp-2">{item}</span>
            </li>
          ))}
          {remaining > 0 && (
            <li className="text-sm text-muted italic pl-3.5">
              +{remaining} autre{remaining > 1 ? 's' : ''}...
            </li>
          )}
        </ul>
      ) : (
        <p className="text-sm text-muted italic">Aucune donnée</p>
      )}
    </motion.div>
  )
}

export function SWOTGrid({
  strengths,
  weaknesses,
  opportunities,
  threats,
  maxItems = 5,
}: SWOTGridProps): React.ReactElement {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Strengths - Green */}
      <Quadrant
        title="Forces"
        items={strengths}
        icon={<TrendingUp className="w-4 h-4" />}
        colorClass="bg-gradient-to-br from-emerald-500 to-green-600"
        bgClass="border-emerald-500/20"
        maxItems={maxItems}
      />

      {/* Weaknesses - Red */}
      <Quadrant
        title="Faiblesses"
        items={weaknesses}
        icon={<TrendingDown className="w-4 h-4" />}
        colorClass="bg-gradient-to-br from-red-500 to-rose-600"
        bgClass="border-red-500/20"
        maxItems={maxItems}
      />

      {/* Opportunities - Blue */}
      <Quadrant
        title="Opportunités"
        items={opportunities}
        icon={<Target className="w-4 h-4" />}
        colorClass="bg-gradient-to-br from-blue-500 to-cyan-600"
        bgClass="border-blue-500/20"
        maxItems={maxItems}
      />

      {/* Threats - Orange */}
      <Quadrant
        title="Menaces"
        items={threats}
        icon={<AlertTriangle className="w-4 h-4" />}
        colorClass="bg-gradient-to-br from-orange-500 to-amber-600"
        bgClass="border-orange-500/20"
        maxItems={maxItems}
      />
    </div>
  )
}

export default SWOTGrid
