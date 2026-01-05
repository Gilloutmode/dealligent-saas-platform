"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react'

// =============================================================================
// TYPES
// =============================================================================

export interface ChartDataPoint {
  name: string
  value: number
}

export interface PremiumStatCardProps {
  title: string
  value: string | number
  change: string
  changeType: 'positive' | 'negative' | 'neutral'
  icon: LucideIcon
  chartData?: ChartDataPoint[]
  iconColor?: 'blue' | 'green' | 'purple' | 'orange' | 'pink'
  className?: string
}

// =============================================================================
// CUSTOM TOOLTIP
// =============================================================================

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{ value: number }>
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-white/10 bg-[var(--bg-elevated)] px-3 py-2 text-sm shadow-xl backdrop-blur-xl">
        <p className="text-[var(--text-primary)] font-medium">{payload[0].value.toLocaleString()}</p>
      </div>
    )
  }
  return null
}

// =============================================================================
// ICON COLOR GRADIENTS
// =============================================================================

const iconGradients = {
  blue: 'from-[#5E6AD2] to-[#7C85DE]',
  green: 'from-[#10B981] to-[#34D399]',
  purple: 'from-[#8B5CF6] to-[#A78BFA]',
  orange: 'from-[#F59E0B] to-[#FBBF24]',
  pink: 'from-[#EC4899] to-[#F472B6]',
}

const chartColors = {
  positive: '#10B981',
  negative: '#EF4444',
  neutral: '#5E6AD2',
}

// =============================================================================
// PREMIUM STAT CARD COMPONENT
// =============================================================================

export function PremiumStatCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  chartData,
  iconColor = 'blue',
  className = '',
}: PremiumStatCardProps) {
  const chartColor = chartColors[changeType] || chartColors.neutral

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      whileHover={{
        y: -4,
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className={`
        group relative overflow-hidden rounded-2xl
        border border-white/[0.08]
        bg-[var(--bg-card)]/80
        backdrop-blur-xl
        p-6
        shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_2px_4px_rgba(0,0,0,0.1),0_8px_16px_rgba(0,0,0,0.15)]
        transition-all duration-300 ease-out
        hover:border-white/[0.12]
        hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_4px_8px_rgba(0,0,0,0.15),0_16px_32px_rgba(0,0,0,0.2)]
        cursor-pointer
        ${className}
      `}
    >
      {/* Animated glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--accent-primary)]/0 via-[var(--accent-primary)]/10 to-[var(--accent-primary)]/0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

      {/* Top accent line with glow */}
      <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-primary)]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent-primary)]/30 to-transparent opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-[var(--text-secondary)] tracking-wide">
            {title}
          </h3>

          {/* Icon with gradient background */}
          <div className={`
            w-10 h-10 rounded-xl flex items-center justify-center
            bg-gradient-to-br ${iconGradients[iconColor]}
            shadow-lg
            group-hover:scale-110 transition-transform duration-300
          `}>
            <Icon className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Value and Chart */}
        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-col">
            {/* Main Value */}
            <p className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">
              {value}
            </p>

            {/* Change Indicator - Premium Badge Pill */}
            <div className="flex items-center gap-2 mt-2">
              <div className={`
                inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold
                ${changeType === 'positive'
                  ? 'bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/20'
                  : ''}
                ${changeType === 'negative'
                  ? 'bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/20'
                  : ''}
                ${changeType === 'neutral'
                  ? 'bg-[var(--bg-elevated)] text-[var(--text-muted)] border border-white/10'
                  : ''}
              `}>
                {changeType === 'positive' && <TrendingUp className="w-3 h-3" />}
                {changeType === 'negative' && <TrendingDown className="w-3 h-3" />}
                <span>{change}</span>
              </div>
            </div>
          </div>

          {/* Sparkline Chart */}
          {chartData && chartData.length > 0 && (
            <div className="h-14 w-28 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <defs>
                    <linearGradient id={`gradient-${title.replace(/\s/g, '-')}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={chartColor} stopOpacity={0.4} />
                      <stop offset="100%" stopColor={chartColor} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{
                      stroke: 'rgba(255,255,255,0.1)',
                      strokeWidth: 1,
                      strokeDasharray: '3 3',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={chartColor}
                    strokeWidth={2}
                    fill={`url(#gradient-${title.replace(/\s/g, '-')})`}
                    dot={false}
                    activeDot={{
                      r: 4,
                      fill: chartColor,
                      stroke: 'rgba(255,255,255,0.3)',
                      strokeWidth: 2,
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// =============================================================================
// PREMIUM STAT CARD SKELETON
// =============================================================================

export function PremiumStatCardSkeleton() {
  return (
    <div className="
      relative overflow-hidden rounded-2xl
      border border-white/[0.08]
      bg-[var(--bg-card)]/80
      backdrop-blur-xl
      p-6
      animate-pulse
    ">
      <div className="flex items-center justify-between mb-4">
        <div className="h-4 w-24 bg-[var(--bg-elevated)] rounded" />
        <div className="w-10 h-10 bg-[var(--bg-elevated)] rounded-xl" />
      </div>
      <div className="flex items-end justify-between">
        <div>
          <div className="h-8 w-32 bg-[var(--bg-elevated)] rounded mb-2" />
          <div className="h-4 w-20 bg-[var(--bg-elevated)] rounded" />
        </div>
        <div className="h-14 w-28 bg-[var(--bg-elevated)] rounded" />
      </div>
    </div>
  )
}

export default PremiumStatCard
