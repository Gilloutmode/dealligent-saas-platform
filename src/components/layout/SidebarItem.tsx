"use client"

import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { Tooltip } from '../ui/Tooltip'

// =============================================================================
// LINEAR-STYLE SIDEBAR ITEM
// Clean, minimal navigation item with active dot, status indicators, and tooltip
// =============================================================================

export interface SidebarItemProps {
  icon: ReactNode
  label: string
  href: string
  isActive?: boolean
  badge?: number | string
  statusDot?: 'success' | 'warning' | 'error'
  isNested?: boolean
  isCollapsed?: boolean
  onClick?: () => void
}

const statusDotColors = {
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  error: 'bg-red-500',
}

export function SidebarItem({
  icon,
  label,
  href,
  badge,
  statusDot,
  isNested = false,
  isCollapsed = false,
  onClick,
}: SidebarItemProps) {
  const itemContent = (isActive: boolean) => (
    <motion.div
      className={`
        group relative flex items-center gap-3 px-3 py-2 rounded-lg
        transition-colors duration-150
        ${isNested && !isCollapsed ? 'ml-3' : ''}
        ${isCollapsed ? 'justify-center' : ''}
        ${isActive
          ? 'bg-[var(--sidebar-item-active)] text-[var(--text-primary)]'
          : 'text-[var(--text-secondary)] hover:bg-[var(--sidebar-item-hover)] hover:text-[var(--text-primary)]'
        }
      `}
      whileTap={{ scale: 0.98 }}
      role="menuitem"
      tabIndex={0}
    >
      {/* Active indicator dot */}
      <motion.div
        initial={false}
        animate={{
          opacity: isActive ? 1 : 0,
          x: isActive ? 0 : -8,
        }}
        transition={{ duration: 0.15 }}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 rounded-r-full bg-[var(--accent-primary)]"
      />

      {/* Icon */}
      <div className={`
        flex-shrink-0 w-5 h-5
        ${isActive ? 'text-[var(--accent-primary)]' : 'text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]'}
        transition-colors duration-150
      `}>
        {icon}
      </div>

      {/* Label - Hidden when collapsed */}
      {!isCollapsed && (
        <span className={`
          flex-1 text-sm font-medium truncate
          ${isActive ? 'text-[var(--text-primary)]' : ''}
        `}>
          {label}
        </span>
      )}

      {/* Badge - Hidden when collapsed */}
      {!isCollapsed && badge && (
        <span className={`
          px-2 py-0.5 text-xs font-medium rounded-full
          ${statusDot === 'warning'
            ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
            : 'bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] border border-[var(--accent-primary)]/20'
          }
        `}>
          {badge}
        </span>
      )}

      {/* Status dot - Show when collapsed and has status */}
      {isCollapsed && statusDot && (
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`absolute top-1 right-1 w-2 h-2 rounded-full ${statusDotColors[statusDot]}`}
        />
      )}

      {/* Status dot - Show when not collapsed and no badge */}
      {!isCollapsed && statusDot && !badge && (
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`w-2 h-2 rounded-full ${statusDotColors[statusDot]}`}
        />
      )}
    </motion.div>
  )

  // Wrap with Tooltip when collapsed
  if (isCollapsed) {
    return (
      <Tooltip content={label} placement="right" delayShow={100}>
        <NavLink to={href} className="block" onClick={onClick}>
          {({ isActive }) => itemContent(isActive)}
        </NavLink>
      </Tooltip>
    )
  }

  return (
    <NavLink to={href} className="block" onClick={onClick}>
      {({ isActive }) => itemContent(isActive)}
    </NavLink>
  )
}

export default SidebarItem
