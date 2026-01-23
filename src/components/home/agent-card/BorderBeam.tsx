// =============================================================================
// BORDER BEAM - Subtle animated border glow effect on hover
// FIXED: Reduced opacity and slowed animation to avoid visual distraction
// =============================================================================

"use client"

import { motion, AnimatePresence } from 'framer-motion'

interface BorderBeamProps {
  color: string
  isHovered: boolean
}

export function BorderBeam({ color, isHovered }: BorderBeamProps) {
  return (
    <AnimatePresence>
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-[22px] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}  // REDUCED from 1 to 0.4
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Subtle rotating gradient - much slower and less intense */}
          <motion.div
            className="absolute inset-[-1px] rounded-[23px]"
            style={{
              background: `conic-gradient(from 0deg, transparent 60%, ${color}40, transparent 90%)`,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}  // SLOWED from 3s to 12s
          />
          {/* Inner mask to create thin border effect */}
          <div
            className="absolute inset-[1px] rounded-[21px]"
            style={{ background: 'var(--bg-card)' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default BorderBeam
