"use client"

import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Layers } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Tooltip } from '../ui/Tooltip'

// =============================================================================
// SIDEBAR LOGO HEADER
// Professional sidebar header with collapsible support
// =============================================================================

interface SidebarLogoProps {
  companyName?: string
  poweredBy?: string
  isCollapsed?: boolean
  className?: string
}

export function SidebarLogo({
  companyName = "CDS",
  poweredBy = "Dealligent",
  isCollapsed = false,
  className,
}: SidebarLogoProps) {
  const navigate = useNavigate()

  const logoContent = (
    <motion.div
      className={cn(
        "flex items-center cursor-pointer",
        isCollapsed ? "justify-center" : "gap-3"
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate('/')}
      role="button"
      tabIndex={0}
      aria-label="Retour à l'accueil"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          navigate('/')
        }
      }}
    >
      {/* Icon Container */}
      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent-primary)] to-[#8B5CF6] shadow-lg shadow-[var(--accent-primary)]/30 flex-shrink-0">
        <Layers className="w-5 h-5 text-white" />
      </div>

      {/* Text Container - Hidden when collapsed */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col min-w-0 overflow-hidden"
          >
            <h1 className="text-xl font-bold tracking-tight text-[var(--text-primary)] whitespace-nowrap">
              {companyName}
            </h1>
            <p className="text-xs text-[var(--text-muted)] whitespace-nowrap">
              powered by{" "}
              <span className="font-medium text-[var(--accent-primary)]">{poweredBy}</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )

  // Wrap with Tooltip when collapsed
  if (isCollapsed) {
    return (
      <div className={cn("flex flex-col gap-1 p-2 border-b border-[var(--sidebar-border)] min-h-[60px] items-center justify-center", className)}>
        <Tooltip content={`${companyName} - powered by ${poweredBy}`} placement="right">
          {logoContent}
        </Tooltip>
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col gap-1 p-4 border-b border-[var(--sidebar-border)] min-h-[80px]", className)}>
      {logoContent}
    </div>
  )
}

export default SidebarLogo
