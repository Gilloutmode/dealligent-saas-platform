"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, type LucideIcon } from 'lucide-react'

// =============================================================================
// COLLAPSIBLE INSIGHT SECTION
// Expandable section for strengths, weaknesses, activity, etc.
// =============================================================================

export interface CollapsibleInsightSectionProps {
  title: string
  icon: LucideIcon
  iconGradient: string
  items: string[]
  defaultOpen?: boolean
  emptyMessage?: string
  badge?: string | number
  badgeColor?: string
}

const contentVariants = {
  hidden: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeInOut' as const },
  },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut' as const },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05, duration: 0.2 },
  }),
}

export function CollapsibleInsightSection({
  title,
  icon: Icon,
  iconGradient,
  items,
  defaultOpen = true,
  emptyMessage = 'Aucune donnée disponible',
  badge,
  badgeColor = 'bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]',
}: CollapsibleInsightSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="card-glass overflow-hidden">
      {/* Header - Clickable */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-[var(--bg-secondary)] transition-colors"
        whileTap={{ scale: 0.995 }}
      >
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-lg ${iconGradient} flex items-center justify-center shadow-lg`}>
            <Icon className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="font-semibold text-[var(--text-primary)]">{title}</span>
          {badge !== undefined && (
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${badgeColor}`}>
              {badge}
            </span>
          )}
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-[var(--text-muted)]" />
        </motion.div>
      </motion.button>

      {/* Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-0">
              {items.length > 0 ? (
                <ul className="space-y-2">
                  {items.map((item, index) => (
                    <motion.li
                      key={index}
                      custom={index}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-light)]"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] mt-2 shrink-0" />
                      <span className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <div className="p-4 text-center text-sm text-[var(--text-muted)] italic">
                  {emptyMessage}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CollapsibleInsightSection
