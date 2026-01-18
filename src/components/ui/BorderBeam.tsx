"use client"

import { motion } from 'framer-motion'

// =============================================================================
// BORDER BEAM COMPONENT - Magic UI Inspired
// Animated border effect for active/highlighted cards
// =============================================================================

export interface BorderBeamProps {
  /** Size of the beam in pixels */
  size?: number
  /** Duration of one animation cycle in seconds */
  duration?: number
  /** Border width in pixels */
  borderWidth?: number
  /** Primary color */
  colorFrom?: string
  /** Secondary color */
  colorTo?: string
  /** Delay before animation starts */
  delay?: number
  /** Additional class names */
  className?: string
}

export function BorderBeam({
  size = 200,
  duration = 12,
  borderWidth = 1.5,
  colorFrom = '#0070f3',
  colorTo = '#7928ca',
  delay = 0,
  className = '',
}: BorderBeamProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit] ${className}`}
      style={{ '--border-width': `${borderWidth}px` } as React.CSSProperties}
    >
      {/* Main animated beam */}
      <motion.div
        className="absolute"
        style={{
          width: size,
          height: size,
          background: `conic-gradient(from 0deg, transparent 0deg, ${colorFrom} 60deg, ${colorTo} 120deg, transparent 180deg)`,
          borderRadius: '50%',
          filter: 'blur(4px)',
        }}
        initial={{ rotate: 0 }}
        animate={{
          rotate: 360,
          offsetDistance: ['0%', '100%'],
        }}
        transition={{
          rotate: {
            duration,
            repeat: Infinity,
            ease: 'linear',
            delay,
          },
        }}
        // Position the beam at the center of each edge
        // This uses offset-path to move along the border
        // Since offset-path has limited browser support, we use a different approach
      />

      {/* Top edge beam */}
      <motion.div
        className="absolute top-0 left-0 h-[var(--border-width)]"
        style={{
          background: `linear-gradient(90deg, transparent, ${colorFrom}, ${colorTo}, transparent)`,
          width: size,
        }}
        animate={{
          x: ['-100%', '200%'],
        }}
        transition={{
          duration: duration / 4,
          repeat: Infinity,
          ease: 'linear',
          delay,
        }}
      />

      {/* Right edge beam */}
      <motion.div
        className="absolute top-0 right-0 w-[var(--border-width)]"
        style={{
          background: `linear-gradient(180deg, transparent, ${colorFrom}, ${colorTo}, transparent)`,
          height: size,
        }}
        animate={{
          y: ['-100%', '200%'],
        }}
        transition={{
          duration: duration / 4,
          repeat: Infinity,
          ease: 'linear',
          delay: delay + duration / 4,
        }}
      />

      {/* Bottom edge beam */}
      <motion.div
        className="absolute bottom-0 right-0 h-[var(--border-width)]"
        style={{
          background: `linear-gradient(270deg, transparent, ${colorFrom}, ${colorTo}, transparent)`,
          width: size,
        }}
        animate={{
          x: ['100%', '-200%'],
        }}
        transition={{
          duration: duration / 4,
          repeat: Infinity,
          ease: 'linear',
          delay: delay + duration / 2,
        }}
      />

      {/* Left edge beam */}
      <motion.div
        className="absolute bottom-0 left-0 w-[var(--border-width)]"
        style={{
          background: `linear-gradient(0deg, transparent, ${colorFrom}, ${colorTo}, transparent)`,
          height: size,
        }}
        animate={{
          y: ['100%', '-200%'],
        }}
        transition={{
          duration: duration / 4,
          repeat: Infinity,
          ease: 'linear',
          delay: delay + (duration * 3) / 4,
        }}
      />
    </div>
  )
}

export default BorderBeam
