// =============================================================================
// THINKING DOTS COMPONENT
// Animated bouncing dots for AI thinking state
// =============================================================================

import { motion } from 'framer-motion'
import { memo } from 'react'

interface ThinkingDotsProps {
  /** Dot color (Tailwind class) */
  color?: string
  /** Dot size in pixels */
  size?: number
  /** Gap between dots (Tailwind class) */
  gap?: string
}

/**
 * Animated thinking dots indicator
 *
 * @example
 * <ThinkingDots color="bg-blue-400" size={8} />
 */
export const ThinkingDots = memo(function ThinkingDots({
  color = 'bg-blue-400',
  size = 8,
  gap = 'gap-1.5',
}: ThinkingDotsProps) {
  return (
    <div className={`flex items-center ${gap}`} role="status" aria-label="Loading">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={`rounded-full ${color}`}
          style={{ width: size, height: size }}
          animate={{
            y: [0, -6, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
})

export default ThinkingDots
