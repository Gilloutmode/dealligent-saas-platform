// =============================================================================
// DEALLIGENT PLATFORM - COLLAPSIBLE SECTION
// Reusable accordion section for forms and content
// =============================================================================

import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Check } from 'lucide-react'
import type { ReactNode } from 'react'

export interface CollapsibleSectionProps {
  /** Section title */
  title: string
  /** Subtitle (shown when expanded) */
  subtitle?: string
  /** Icon displayed on the left */
  icon: ReactNode
  /** Whether section is expanded */
  isExpanded: boolean
  /** Toggle callback */
  onToggle: () => void
  /** Show green checkmark if true */
  isValid?: boolean
  /** Summary shown when collapsed */
  summary?: string
  /** Show "Optional" badge */
  optional?: boolean
  /** Section content */
  children: ReactNode
}

export function CollapsibleSection({
  title,
  subtitle,
  icon,
  isExpanded,
  onToggle,
  isValid,
  summary,
  optional,
  children,
}: CollapsibleSectionProps): React.ReactElement {
  return (
    <motion.div
      className="card-glass overflow-hidden"
      initial={false}
    >
      {/* Header - clickable */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-5 text-left hover:bg-white/[0.02] transition-colors"
      >
        {/* Icon */}
        <div className={`
          w-10 h-10 rounded-xl flex items-center justify-center shrink-0
          ${isExpanded ? 'icon-gradient-blue' : 'bg-surface-tertiary text-secondary'}
          transition-all duration-300
        `}>
          {icon}
        </div>

        {/* Title & Summary */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-primary">{title}</h3>
            {optional && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-surface-tertiary text-secondary">
                Optionnel
              </span>
            )}
          </div>
          {!isExpanded && summary && (
            <p className="text-sm text-secondary truncate mt-0.5">{summary}</p>
          )}
          {isExpanded && subtitle && (
            <p className="text-sm text-secondary mt-0.5">{subtitle}</p>
          )}
        </div>

        {/* Valid checkmark */}
        {isValid && !isExpanded && (
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shrink-0">
            <Check className="w-4 h-4 text-white" />
          </div>
        )}

        {/* Chevron */}
        <motion.div
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronRight className="w-5 h-5 text-secondary" />
        </motion.div>
      </button>

      {/* Content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="px-5 pb-5 pt-2 border-t border-white/[0.06]">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default CollapsibleSection
