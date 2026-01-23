// =============================================================================
// THINKING DOTS - Animated thinking indicator
// Reusable component with configurable color
// =============================================================================

import { motion } from 'framer-motion'

interface ThinkingDotsProps {
  color?: string
  label?: string
}

export function ThinkingDots({ 
  color = 'bg-indigo-400', 
  label = 'Searching' 
}: ThinkingDotsProps) {
  return (
    <motion.div 
      className="flex items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <span className="text-xs text-neutral-400">{label}</span>
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={`w-1.5 h-1.5 rounded-full ${color}`}
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              delay: i * 0.15,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default ThinkingDots
