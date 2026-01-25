// =============================================================================
// THREAT BADGE COMPONENT
// Animated threat level indicator for competitor mockups
// =============================================================================

import { motion } from 'framer-motion'
import { memo } from 'react'

type ThreatLevel = 'high' | 'medium' | 'low'

interface ThreatBadgeProps {
  /** Threat level */
  level: ThreatLevel
  /** Animation delay in seconds */
  delay?: number
  /** Whether to pulse on high */
  pulse?: boolean
  /** Size variant */
  size?: 'sm' | 'md'
}

const levelConfig: Record<ThreatLevel, {
  label: string
  bg: string
  text: string
  border: string
  dot: string
}> = {
  high: {
    label: 'HIGH',
    bg: 'bg-red-500/20',
    text: 'text-red-400',
    border: 'border-red-500/30',
    dot: 'bg-red-500',
  },
  medium: {
    label: 'MEDIUM',
    bg: 'bg-orange-500/20',
    text: 'text-orange-400',
    border: 'border-orange-500/30',
    dot: 'bg-orange-500',
  },
  low: {
    label: 'LOW',
    bg: 'bg-emerald-500/20',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
    dot: 'bg-emerald-500',
  },
}

/**
 * Threat level badge with optional pulse animation
 *
 * @example
 * <ThreatBadge level="high" pulse />
 */
export const ThreatBadge = memo(function ThreatBadge({
  level,
  delay = 0,
  pulse = false,
  size = 'sm',
}: ThreatBadgeProps) {
  const config = levelConfig[level]
  const isHighThreat = level === 'high'
  const shouldPulse = pulse && isHighThreat

  const sizeClasses = size === 'sm'
    ? 'px-2 py-0.5 text-[8px]'
    : 'px-2.5 py-1 text-[10px]'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 17,
        delay,
      }}
      className={`
        inline-flex items-center gap-1.5 rounded-full font-bold uppercase tracking-wider
        ${sizeClasses}
        ${config.bg} ${config.text} border ${config.border}
      `}
    >
      {/* Status dot */}
      <motion.div
        className={`w-1.5 h-1.5 rounded-full ${config.dot}`}
        animate={shouldPulse ? {
          scale: [1, 1.3, 1],
          opacity: [1, 0.7, 1],
        } : undefined}
        transition={shouldPulse ? {
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        } : undefined}
      />

      <span>{config.label}</span>
    </motion.div>
  )
})

export default ThreatBadge
