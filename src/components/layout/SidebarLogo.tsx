"use client"

import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'
import { Tooltip } from '../ui/Tooltip'
import { useTheme } from '../../contexts/ThemeContext'

// =============================================================================
// SIDEBAR LOGO HEADER
// Professional sidebar header with official CDS logo
// Adapts to dark/light mode for optimal visibility
// =============================================================================

interface SidebarLogoProps {
  poweredBy?: string
  isCollapsed?: boolean
  className?: string
}

export function SidebarLogo({
  poweredBy = "Dealligent",
  isCollapsed = false,
  className,
}: SidebarLogoProps) {
  const navigate = useNavigate()
  const { isDark } = useTheme()

  // Expanded: Full logo with "powered by" text
  const expandedLogoContent = (
    <motion.div
      className="flex flex-col cursor-pointer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate('/')}
      role="button"
      tabIndex={0}
      aria-label="CDS - Cognitive Design Systems - Retour à l'accueil"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          navigate('/')
        }
      }}
    >
      {/* Official CDS Logo - inverted in light mode for visibility */}
      <motion.img
        src="/images/cds-logo.png"
        alt="CDS - Cognitive Design Systems"
        className={cn(
          "h-7 w-auto object-contain transition-[filter] duration-300",
          !isDark && "invert"
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Powered by text */}
      <motion.p
        className="text-xs text-[var(--text-muted)] mt-1.5 whitespace-nowrap"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        powered by{" "}
        <span className="font-medium text-[var(--accent-primary)]">{poweredBy}</span>
      </motion.p>
    </motion.div>
  )

  // Collapsed: Small icon only (cropped to show just the geometric icon)
  const collapsedLogoContent = (
    <motion.div
      className="flex items-center justify-center cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate('/')}
      role="button"
      tabIndex={0}
      aria-label="CDS - Cognitive Design Systems - Retour à l'accueil"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          navigate('/')
        }
      }}
    >
      {/* Icon-only view: show logo cropped to icon portion */}
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent-primary)] to-[#8B5CF6] shadow-lg shadow-[var(--accent-primary)]/30 flex items-center justify-center overflow-hidden">
        <img
          src="/images/cds-logo.png"
          alt="CDS"
          className={cn(
            "h-5 w-auto object-contain object-left transition-[filter] duration-300",
            !isDark && "invert"
          )}
          style={{
            clipPath: 'inset(0 85% 0 0)',
            marginLeft: '18px'
          }}
        />
      </div>
    </motion.div>
  )

  // Wrap with Tooltip when collapsed
  if (isCollapsed) {
    return (
      <div className={cn("flex flex-col gap-1 p-2 border-b border-[var(--sidebar-border)] min-h-[60px] items-center justify-center", className)}>
        <Tooltip content={`CDS - Cognitive Design Systems • powered by ${poweredBy}`} placement="right">
          {collapsedLogoContent}
        </Tooltip>
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col gap-1 p-4 border-b border-[var(--sidebar-border)] min-h-[80px]", className)}>
      <AnimatePresence mode="wait">
        {expandedLogoContent}
      </AnimatePresence>
    </div>
  )
}

export default SidebarLogo
