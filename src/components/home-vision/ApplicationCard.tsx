// =============================================================================
// APPLICATION CARD - Card for applications in Level 1 and Level 3
// Subtle hover animation (y: -2 max)
// Supports optional animated mockup
// =============================================================================

import { motion } from 'framer-motion'
import type { ElementType, ReactNode } from 'react'

// =============================================================================
// TYPES
// =============================================================================

interface ApplicationCardProps {
  title: string
  description: string
  icon: ElementType
  features?: string[]
  mockup?: ReactNode  // Optional animated mockup preview
}

// =============================================================================
// ANIMATION VARIANTS
// =============================================================================

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

// =============================================================================
// COMPONENT
// =============================================================================

export function ApplicationCard({
  title,
  description,
  icon: Icon,
  features,
  mockup,
}: ApplicationCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="card-glass p-6 rounded-xl cursor-default"
    >
      {/* Animated Mockup Preview */}
      {mockup && (
        <div className="mb-4 p-4 rounded-lg bg-black/30 border border-white/5 min-h-[120px] overflow-hidden">
          {mockup}
        </div>
      )}

      {/* Icon */}
      <div className="w-10 h-10 rounded-lg bg-[var(--c-brand)]/10 flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-[var(--c-brand)]" />
      </div>

      {/* Title */}
      <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
        {title}
      </h4>

      {/* Description */}
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
        {description}
      </p>

      {/* Features List */}
      {features && features.length > 0 && (
        <ul className="space-y-1.5">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center gap-2 text-xs text-[var(--text-muted)]"
            >
              <span className="w-1 h-1 rounded-full bg-[var(--c-brand)]" />
              {feature}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  )
}

export default ApplicationCard
