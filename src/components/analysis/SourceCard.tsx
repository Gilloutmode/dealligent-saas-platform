// =============================================================================
// DEALLIGENT PLATFORM - SOURCE CARD
// Toggle card for data source selection (n8n workflow sources)
// =============================================================================

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

export interface SourceCardProps {
  icon: ReactNode
  name: string
  description: string
  isEnabled: boolean
  onToggle: () => void
  isPremium?: boolean
  agent?: string
}

export function SourceCard({
  icon,
  name,
  description,
  isEnabled,
  onToggle,
  isPremium,
  agent,
}: SourceCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      onClick={onToggle}
      className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
        isEnabled
          ? 'card-glass border-blue-primary/30 shadow-lg shadow-blue-primary/10'
          : 'card-glass hover:border-blue-primary/20'
      }`}
      whileHover={{ y: -2 }}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${isEnabled ? 'icon-gradient-blue' : 'bg-surface-tertiary text-secondary'}`}>
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-sm text-primary">{name}</h4>
            {isPremium && (
              <span className="badge-glow-orange text-xs">
                Pro
              </span>
            )}
          </div>
          <p className="text-xs text-secondary">{description}</p>
          {agent && (
            <p className="text-xs text-blue-primary/80 mt-0.5">via {agent}</p>
          )}
        </div>
        <div
          className={`w-10 h-6 rounded-full transition-colors duration-200 relative ${
            isEnabled ? 'bg-gradient-to-r from-blue-primary to-cyan-400' : 'bg-surface-secondary'
          }`}
        >
          <div
            className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-lg transition-transform duration-200 ${
              isEnabled ? 'translate-x-5' : 'translate-x-1'
            }`}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default SourceCard
