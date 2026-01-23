// =============================================================================
// AGENT BADGE - Animated status badge with pulsing indicator
// =============================================================================

"use client"

import { motion } from 'framer-motion'

interface AgentBadgeProps {
  agent: string
  color: string
  isHovered: boolean
}

export function AgentBadge({ agent, color, isHovered }: AgentBadgeProps) {
  return (
    <motion.div
      className="flex items-center gap-2 px-3 py-1.5 rounded-full shrink-0 backdrop-blur-sm"
      style={{
        backgroundColor: `${color}25`,
        border: `1px solid ${color}50`,
        boxShadow: `0 0 16px ${color}30`,
      }}
      animate={{
        boxShadow: isHovered ? `0 0 24px ${color}50` : `0 0 16px ${color}30`,
      }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: color }}
        animate={{
          scale: [1, 1.2, 1],
          boxShadow: [`0 0 4px ${color}`, `0 0 12px ${color}`, `0 0 4px ${color}`]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <span
        className="text-xs font-bold tracking-wide uppercase"
        style={{ color }}
      >
        {agent}
      </span>
    </motion.div>
  )
}

export default AgentBadge
