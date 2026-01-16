// =============================================================================
// DEALLIGENT PLATFORM - ANALYSIS TYPE CARD
// Card for selecting analysis depth (quick/standard/deep)
// =============================================================================

import { motion } from 'framer-motion'
import { Check, Clock, Brain, Sparkles } from 'lucide-react'
import type { ReactNode } from 'react'

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

export interface AnalysisTypeCardProps {
  icon: ReactNode
  title: string
  description: string
  duration: string
  features: string[]
  gradient: 'blue' | 'purple' | 'green' | 'orange'
  isPopular?: boolean
  isSelected: boolean
  onSelect: () => void
  agentInfo?: string
}

export function AnalysisTypeCard({
  icon,
  title,
  description,
  duration,
  features,
  gradient,
  isPopular,
  isSelected,
  onSelect,
  agentInfo,
}: AnalysisTypeCardProps) {
  const gradientClasses = {
    blue: 'icon-gradient-blue',
    purple: 'icon-gradient-purple',
    green: 'icon-gradient-green',
    orange: 'icon-gradient-orange',
  }

  return (
    <motion.div
      variants={itemVariants}
      onClick={onSelect}
      className={`relative card-premium p-6 cursor-pointer transition-all duration-300 ${
        isSelected
          ? 'ring-2 ring-blue-primary ring-offset-2 ring-offset-surface-primary shadow-xl shadow-blue-primary/20'
          : ''
      }`}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Popular badge */}
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="badge-glow-blue flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Recommandé
          </span>
        </div>
      )}

      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-gradient-to-br from-blue-primary to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-primary/30">
          <Check className="w-4 h-4 text-white" />
        </div>
      )}

      <div className="space-y-4">
        {/* Icon */}
        <div className={`w-14 h-14 rounded-2xl ${gradientClasses[gradient]} flex items-center justify-center text-white`}>
          {icon}
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="text-lg font-semibold mb-1 text-primary">{title}</h3>
          <p className="text-sm text-secondary">{description}</p>
        </div>

        {/* Agent info */}
        {agentInfo && (
          <div className="flex items-center gap-2 text-xs text-blue-primary bg-blue-primary/10 border border-blue-primary/30 px-3 py-1.5 rounded-lg">
            <Brain className="w-3.5 h-3.5" />
            {agentInfo}
          </div>
        )}

        {/* Duration */}
        <div className="flex items-center gap-2 text-sm text-secondary">
          <Clock className="w-4 h-4" />
          <span>{duration}</span>
        </div>

        {/* Features */}
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-secondary">
              <div className={`w-5 h-5 rounded-full ${gradientClasses[gradient]} opacity-50 flex items-center justify-center`}>
                <Check className="w-3 h-3 text-white" />
              </div>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export default AnalysisTypeCard
