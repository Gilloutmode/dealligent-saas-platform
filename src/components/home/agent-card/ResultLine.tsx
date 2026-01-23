// =============================================================================
// RESULT LINE - Animated result display with shine effect
// =============================================================================

"use client"

import { motion } from 'framer-motion'

interface ResultLineProps {
  result: string
  color: string
  isHovered: boolean
}

export function ResultLine({ result, color, isHovered }: ResultLineProps) {
  return (
    <motion.div
      className="flex items-center gap-3 mt-6 p-4 rounded-xl backdrop-blur-sm relative overflow-hidden"
      style={{
        backgroundColor: `${color}15`,
        border: `1px solid ${color}35`,
      }}
      animate={{
        backgroundColor: isHovered ? `${color}25` : `${color}15`,
        borderColor: isHovered ? `${color}50` : `${color}35`,
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 -translate-x-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}20, transparent)`,
        }}
        animate={{
          x: isHovered ? '200%' : '-100%'
        }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />

      <motion.span
        className="text-xl"
        animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }}
        transition={{ duration: 0.5 }}
      >
        📊
      </motion.span>
      <span className="text-sm font-semibold text-[var(--text-primary)] relative z-10">
        {result}
      </span>
    </motion.div>
  )
}

export default ResultLine
