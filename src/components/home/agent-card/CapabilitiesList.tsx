// =============================================================================
// CAPABILITIES LIST - Grid of capabilities with stagger animation
// FIX: Removed opacity:0 in hidden state - capabilities are always visible
// =============================================================================

"use client"

import { motion } from 'framer-motion'

interface CapabilitiesListProps {
  capabilities: {
    left: string[]
    right: string[]
  }
  color: string
  isHovered: boolean
}

// Animation variants - capabilities always visible, enhanced on hover
const capabilityVariants = {
  idle: { opacity: 0.9, x: 0 },
  hover: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.04,
      type: 'spring' as const,
      stiffness: 300,
      damping: 24
    }
  })
}

interface CapabilityItemProps {
  text: string
  color: string
  index: number
  isHovered: boolean
}

function CapabilityItem({ text, color, index, isHovered }: CapabilityItemProps) {
  return (
    <motion.div
      className="flex items-start gap-2.5"
      custom={index}
      variants={capabilityVariants}
      initial="idle"
      animate={isHovered ? "hover" : "idle"}
    >
      <motion.div
        className="w-2 h-2 rounded-full mt-1.5 shrink-0"
        style={{
          backgroundColor: color,
          boxShadow: `0 0 8px ${color}80`,
        }}
        animate={{
          scale: isHovered ? [1, 1.3, 1] : 1,
          boxShadow: isHovered
            ? [`0 0 8px ${color}80`, `0 0 16px ${color}`, `0 0 8px ${color}80`]
            : `0 0 8px ${color}80`
        }}
        transition={{ duration: 0.8, delay: index * 0.04 }}
      />
      <span className="text-[var(--text-primary)] leading-relaxed text-[13px]">
        {text}
      </span>
    </motion.div>
  )
}

export function CapabilitiesList({ capabilities, color, isHovered }: CapabilitiesListProps) {
  return (
    <div
      className="grid grid-cols-2 gap-x-6 gap-y-2.5"
      style={{ alignContent: 'start', minHeight: '180px' }}
    >
      <div className="space-y-3">
        {capabilities.left.map((cap, i) => (
          <CapabilityItem
            key={`left-${i}`}
            text={cap}
            color={color}
            index={i}
            isHovered={isHovered}
          />
        ))}
      </div>
      <div className="space-y-3">
        {capabilities.right.map((cap, i) => (
          <CapabilityItem
            key={`right-${i}`}
            text={cap}
            color={color}
            index={i + capabilities.left.length}
            isHovered={isHovered}
          />
        ))}
      </div>
    </div>
  )
}

export default CapabilitiesList
