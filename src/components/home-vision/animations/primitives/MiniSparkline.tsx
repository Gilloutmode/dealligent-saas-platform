// =============================================================================
// MINI SPARKLINE COMPONENT
// Compact animated SVG chart for mockups
// =============================================================================

import { motion } from 'framer-motion'
import { memo, useMemo } from 'react'

interface MiniSparklineProps {
  /** Data points (7-12 values) */
  data: number[]
  /** Line color */
  color?: string
  /** Chart width */
  width?: number
  /** Chart height */
  height?: number
  /** Animation delay in seconds */
  delay?: number
  /** Whether to animate */
  animate?: boolean
}

/**
 * Mini sparkline chart for KPI mockups
 *
 * @example
 * <MiniSparkline
 *   data={[30, 45, 35, 60, 55, 70, 65]}
 *   color="#3b82f6"
 * />
 */
export const MiniSparkline = memo(function MiniSparkline({
  data,
  color = '#3b82f6',
  width = 60,
  height = 20,
  delay = 0,
  animate = true,
}: MiniSparklineProps) {
  const padding = 2

  const { pathD, lastX, lastY, gradientId } = useMemo(() => {
    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min || 1

    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * (width - padding * 2) + padding
      const y = height - padding - ((value - min) / range) * (height - padding * 2)
      return { x, y }
    })

    const path = points
      .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
      .join(' ')

    const last = points[points.length - 1]

    return {
      pathD: path,
      lastX: last.x,
      lastY: last.y,
      gradientId: `sparkline-${Math.random().toString(36).substr(2, 9)}`,
    }
  }, [data, width, height])

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
        initial={animate ? { opacity: 0 } : undefined}
        animate={animate ? { opacity: 1 } : undefined}
        transition={{ duration: 0.4, delay: delay + 0.2 }}
      />

      {/* Line stroke */}
      <motion.path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={animate ? { pathLength: 0, opacity: 0 } : undefined}
        animate={animate ? { pathLength: 1, opacity: 1 } : undefined}
        transition={{ duration: 0.8, ease: 'easeOut', delay }}
      />

      {/* End point dot */}
      <motion.circle
        cx={lastX}
        cy={lastY}
        r="2"
        fill={color}
        initial={animate ? { scale: 0, opacity: 0 } : undefined}
        animate={animate ? { scale: 1, opacity: 1 } : undefined}
        transition={{ duration: 0.2, delay: delay + 0.8 }}
      />
    </svg>
  )
})

export default MiniSparkline
