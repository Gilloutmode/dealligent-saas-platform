"use client"

import { useState, useEffect, useCallback, type ReactNode, type KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

// =============================================================================
// LINEAR-STYLE COLLAPSIBLE SIDEBAR SECTION
// Persistent state via localStorage, keyboard accessible
// =============================================================================

export interface SidebarSectionProps {
  id: string
  title: string
  children: ReactNode
  defaultOpen?: boolean
}

const STORAGE_KEY = 'dealligent_sidebar_sections'

// Get persisted section states from localStorage
function getPersistedStates(): Record<string, boolean> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

// Save section states to localStorage
function persistState(id: string, isOpen: boolean): void {
  try {
    const current = getPersistedStates()
    current[id] = isOpen
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current))
  } catch {
    // localStorage not available
  }
}

export function SidebarSection({
  id,
  title,
  children,
  defaultOpen = true,
}: SidebarSectionProps) {
  // Initialize from localStorage or default
  const [isOpen, setIsOpen] = useState(() => {
    const persisted = getPersistedStates()
    return persisted[id] !== undefined ? persisted[id] : defaultOpen
  })

  // Persist state changes
  useEffect(() => {
    persistState(id, isOpen)
  }, [id, isOpen])

  const toggle = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  // Keyboard handler
  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggle()
    }
  }, [toggle])

  return (
    <div className="sidebar-section" role="region" aria-labelledby={`section-${id}`}>
      {/* Section Header */}
      <motion.button
        id={`section-${id}`}
        onClick={toggle}
        onKeyDown={handleKeyDown}
        className={`
          w-full flex items-center justify-between px-3 py-2
          text-xs font-semibold uppercase tracking-wider
          text-[var(--text-muted)]
          hover:text-[var(--text-secondary)]
          transition-colors duration-150
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--sidebar-bg)]
          rounded-md
        `}
        aria-expanded={isOpen}
        aria-controls={`section-content-${id}`}
      >
        <span>{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 0 : -90 }}
          transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>

      {/* Section Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`section-content-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: 'auto',
              opacity: 1,
              transition: {
                height: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
                opacity: { duration: 0.15, delay: 0.05 }
              }
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
                opacity: { duration: 0.1 }
              }
            }}
            className="overflow-hidden"
            role="group"
          >
            <div className="py-1 space-y-0.5">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SidebarSection
