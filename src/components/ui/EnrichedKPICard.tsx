"use client"

import { memo, useRef, useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

// =============================================================================
// PREMIUM KPI CARD COMPONENT
// 21st.dev inspired - 3D tilt, animated sparkline, glow effects
// Professional B2B SaaS with "waouh" factor - Light/Dark mode support
// =============================================================================

export type TrendDirection = 'up' | 'down' | 'neutral'

export interface EnrichedKPICardProps {
  /** KPI label */
  label: string
  /** Current value */
  value: number
  /** Optional suffix (%, etc.) */
  suffix?: string
  /** Optional prefix ($, €, etc.) */
  prefix?: string
  /** Trend info */
  trend?: {
    direction: TrendDirection
    value: number
    label?: string
  }
  /** Previous period value for comparison */
  previousValue?: number
  /** Micro-chart data (7-12 points) */
  sparklineData?: number[]
  /** Icon element */
  icon?: React.ReactNode
  /** Icon background color - maps to variant */
  iconBg?: 'blue' | 'green' | 'orange' | 'purple' | 'cyan' | 'red'
  /** Animation delay for stagger effect */
  delay?: number
  /** Click handler */
  onClick?: () => void
}

// Variant colors for glow and sparkline - Dark mode
const variantColorsDark = {
  blue: {
    glow: 'rgba(59, 130, 246, 0.5)',
    sparkline: '#3b82f6',
    border: 'rgba(59, 130, 246, 0.25)',
    bg: '#0f0f13',
  },
  green: {
    glow: 'rgba(16, 185, 129, 0.5)',
    sparkline: '#10b981',
    border: 'rgba(16, 185, 129, 0.25)',
    bg: '#0f0f13',
  },
  orange: {
    glow: 'rgba(245, 158, 11, 0.5)',
    sparkline: '#f59e0b',
    border: 'rgba(245, 158, 11, 0.25)',
    bg: '#0f0f13',
  },
  purple: {
    glow: 'rgba(139, 92, 246, 0.5)',
    sparkline: '#8b5cf6',
    border: 'rgba(139, 92, 246, 0.25)',
    bg: '#0f0f13',
  },
  cyan: {
    glow: 'rgba(6, 182, 212, 0.5)',
    sparkline: '#06b6d4',
    border: 'rgba(6, 182, 212, 0.25)',
    bg: '#0f0f13',
  },
  red: {
    glow: 'rgba(239, 68, 68, 0.5)',
    sparkline: '#ef4444',
    border: 'rgba(239, 68, 68, 0.25)',
    bg: '#0f0f13',
  },
}

// Variant colors for glow and sparkline - Light mode (colored backgrounds)
const variantColorsLight = {
  blue: {
    glow: 'rgba(59, 130, 246, 0.2)',
    sparkline: '#2563eb',
    border: 'rgba(59, 130, 246, 0.25)',
    bg: 'rgba(59, 130, 246, 0.08)',
  },
  green: {
    glow: 'rgba(16, 185, 129, 0.2)',
    sparkline: '#059669',
    border: 'rgba(16, 185, 129, 0.25)',
    bg: 'rgba(16, 185, 129, 0.08)',
  },
  orange: {
    glow: 'rgba(245, 158, 11, 0.2)',
    sparkline: '#d97706',
    border: 'rgba(245, 158, 11, 0.25)',
    bg: 'rgba(249, 115, 22, 0.08)',
  },
  purple: {
    glow: 'rgba(139, 92, 246, 0.2)',
    sparkline: '#7c3aed',
    border: 'rgba(139, 92, 246, 0.25)',
    bg: 'rgba(139, 92, 246, 0.08)',
  },
  cyan: {
    glow: 'rgba(6, 182, 212, 0.2)',
    sparkline: '#0891b2',
    border: 'rgba(6, 182, 212, 0.25)',
    bg: 'rgba(6, 182, 212, 0.08)',
  },
  red: {
    glow: 'rgba(239, 68, 68, 0.2)',
    sparkline: '#dc2626',
    border: 'rgba(239, 68, 68, 0.25)',
    bg: 'rgba(239, 68, 68, 0.08)',
  },
}

// =============================================================================
// NUMBER TICKER - Animated counter
// =============================================================================
const NumberTicker = ({
  value,
  prefix = '',
  suffix = '',
  duration = 1.2,
  delay = 0,
}: {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
  delay?: number
}) => {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const timeoutId = setTimeout(() => {
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)

        // Ease out quart for smooth deceleration
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        setDisplayValue(Math.floor(easeOutQuart * value))

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate)
        } else {
          setDisplayValue(value)
        }
      }

      animationFrame = requestAnimationFrame(animate)
    }, delay * 1000)

    return () => {
      clearTimeout(timeoutId)
      cancelAnimationFrame(animationFrame)
    }
  }, [value, duration, delay])

  // Format number with locale
  const formattedValue = displayValue.toLocaleString('fr-FR')

  return (
    <span className="tabular-nums">
      {prefix}{formattedValue}{suffix}
    </span>
  )
}

// =============================================================================
// SPARKLINE CHART - Animated SVG chart
// =============================================================================
const SparklineChart = ({
  data,
  color = '#8b5cf6',
  delay = 0,
}: {
  data: number[]
  color?: string
  delay?: number
}) => {
  const width = 120
  const height = 40
  const padding = 2

  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1

  const pathD = data.map((dataValue, index) => {
    const x = (index / (data.length - 1)) * (width - padding * 2) + padding
    const y = height - padding - ((dataValue - min) / range) * (height - padding * 2)
    return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`
  }).join(' ')

  const lastX = (data.length - 1) / (data.length - 1) * (width - padding * 2) + padding
  const lastY = height - padding - ((data[data.length - 1] - min) / range) * (height - padding * 2)

  const gradientId = `sparklineGradient-${Math.random().toString(36).substr(2, 9)}`

  return (
    <svg
      width={width}
      height={height}
      className="overflow-visible"
      viewBox={`0 0 ${width} ${height}`}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Area fill */}
      <motion.path
        d={`${pathD} L ${width - padding} ${height} L ${padding} ${height} Z`}
        fill={`url(#${gradientId})`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
      />

      {/* Line stroke */}
      <motion.path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut', delay: delay }}
      />

      {/* End point dot */}
      <motion.circle
        cx={lastX}
        cy={lastY}
        r="3"
        fill={color}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: delay + 1 }}
      />
    </svg>
  )
}

// =============================================================================
// TREND BADGE - Colored badge with arrow
// =============================================================================
const TrendBadge = ({
  direction,
  percentage,
  delay = 0,
  isDark = true,
}: {
  direction: TrendDirection
  percentage: number
  delay?: number
  isDark?: boolean
}) => {
  const isPositive = direction === 'up'
  const isNegative = direction === 'down'

  const getStyles = () => {
    if (isDark) {
      if (isPositive) return 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
      if (isNegative) return 'bg-red-500/15 text-red-400 border border-red-500/25'
      return 'bg-gray-500/15 text-gray-400 border border-gray-500/25'
    } else {
      if (isPositive) return 'bg-emerald-50 text-emerald-600 border border-emerald-200'
      if (isNegative) return 'bg-red-50 text-red-600 border border-red-200'
      return 'bg-gray-100 text-gray-600 border border-gray-200'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 5 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay + 0.3 }}
      className={`
        inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium
        ${getStyles()}
      `}
    >
      {isPositive && <ArrowUpRight className="w-3 h-3" />}
      {isNegative && <ArrowDownRight className="w-3 h-3" />}
      {direction === 'neutral' && <Minus className="w-3 h-3" />}
      <span>{isNegative ? '' : '+'}{percentage}%</span>
    </motion.div>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export const EnrichedKPICard = memo(function EnrichedKPICard({
  label,
  value,
  suffix = '',
  prefix = '',
  trend,
  previousValue,
  sparklineData,
  icon,
  iconBg = 'blue',
  delay = 0,
  onClick,
}: EnrichedKPICardProps) {
  const { isDark } = useTheme()
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })

  // Generate sparkline data if not provided
  const chartData = useMemo(() => {
    if (sparklineData && sparklineData.length > 0) return sparklineData
    return Array.from({ length: 12 }, () => Math.floor(Math.random() * 50) + 30)
  }, [sparklineData])

  // Determine trend direction
  const trendDirection = useMemo(() => {
    if (trend?.direction) return trend.direction
    if (previousValue !== undefined) {
      if (value > previousValue) return 'up'
      if (value < previousValue) return 'down'
    }
    return 'neutral'
  }, [trend?.direction, value, previousValue])

  // Get colors for current variant based on theme
  const colors = isDark ? variantColorsDark[iconBg] : variantColorsLight[iconBg]

  // Handle mouse move for 3D tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      const rotateX = -(y / rect.height) * 4
      const rotateY = (x / rect.width) * 4

      setRotation({ x: rotateX, y: rotateY })
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotation({ x: 0, y: 0 })
  }

  // Theme-aware styles
  const textPrimaryClass = isDark ? 'text-white' : 'text-gray-900'
  const textSecondaryClass = isDark ? 'text-gray-400' : 'text-gray-500'
  const textMutedClass = isDark ? 'text-gray-500' : 'text-gray-400'

  // Glass overlay gradient based on theme
  const glassOverlay = isDark
    ? 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.03) 100%)'
    : 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.6) 100%)'

  // Noise texture opacity based on theme
  const noiseOpacity = isDark ? '0.15' : '0.05'

  // Shadow for light mode
  const boxShadow = isDark
    ? 'none'
    : '0 1px 3px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.08)'

  return (
    <motion.div
      ref={cardRef}
      className={`
        relative rounded-2xl overflow-hidden
        ${onClick ? 'cursor-pointer' : ''}
      `}
      style={{
        minHeight: '200px',
        transformStyle: 'preserve-3d',
        backgroundColor: colors.bg,
        border: `1px solid ${colors.border}`,
        boxShadow,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: isHovered ? -4 : 0,
        rotateX: rotation.x,
        rotateY: rotation.y,
      }}
      transition={{
        opacity: { duration: 0.5, delay },
        y: { type: 'spring', stiffness: 300, damping: 20 },
        rotateX: { type: 'spring', stiffness: 300, damping: 20 },
        rotateY: { type: 'spring', stiffness: 300, damping: 20 },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={`${label}: ${prefix}${value}${suffix}`}
    >
      {/* Glass overlay */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: glassOverlay }}
        animate={{ opacity: isHovered ? 0.9 : 0.5 }}
        transition={{ duration: 0.3 }}
      />

      {/* Bottom glow - more subtle in light mode */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-3/4 z-5 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at bottom, ${colors.glow} -20%, transparent 70%)`,
          filter: isDark ? 'blur(40px)' : 'blur(60px)',
        }}
        animate={{ opacity: isHovered ? (isDark ? 0.7 : 0.4) : (isDark ? 0.5 : 0.25) }}
        transition={{ duration: 0.4 }}
      />

      {/* Noise texture overlay - more subtle in light mode */}
      <div
        className="absolute inset-0 mix-blend-overlay z-8 pointer-events-none"
        style={{
          opacity: noiseOpacity,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-20 p-5 h-full flex flex-col">
        {/* Header: Label + Icon */}
        <div className="flex items-start justify-between mb-4">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: delay + 0.1 }}
          >
            <h3 className={`text-sm font-medium ${textSecondaryClass} mb-2 tracking-tight`}>
              {label}
            </h3>
            <div className="flex items-baseline gap-1">
              <div className={`text-3xl font-bold ${textPrimaryClass}`}>
                <NumberTicker
                  value={value}
                  prefix={prefix}
                  suffix={suffix}
                  delay={delay}
                />
              </div>
            </div>
          </motion.div>

          {/* Trend Badge or Icon */}
          <div className="flex items-center gap-2">
            {icon && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: delay + 0.2 }}
                className="p-2 rounded-xl"
                style={{
                  backgroundColor: isDark ? `${colors.sparkline}15` : `${colors.sparkline}10`,
                  color: colors.sparkline,
                }}
              >
                {icon}
              </motion.div>
            )}
            {trend && (
              <TrendBadge
                direction={trendDirection}
                percentage={trend.value}
                delay={delay}
                isDark={isDark}
              />
            )}
          </div>
        </div>

        {/* Sparkline + Footer */}
        <div className="mt-auto flex items-end justify-between">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: delay + 0.4 }}
            className={`text-xs ${textMutedClass}`}
          >
            {trend?.label || 'vs. période préc.'}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: delay + 0.5 }}
          >
            <SparklineChart
              data={chartData}
              color={colors.sparkline}
              delay={delay}
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom glow line - more subtle in light mode */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1px] z-25"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${colors.border} 50%, transparent 100%)`,
        }}
        animate={{
          boxShadow: isHovered
            ? `0 0 ${isDark ? '20px' : '12px'} 2px ${colors.glow}`
            : `0 0 ${isDark ? '10px' : '6px'} 1px ${colors.glow}`,
          opacity: isHovered ? 1 : (isDark ? 0.7 : 0.5),
        }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  )
})

export default EnrichedKPICard
