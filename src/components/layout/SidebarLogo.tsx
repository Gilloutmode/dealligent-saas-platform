"use client"

import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Layers } from 'lucide-react'
import { cn } from '../../lib/utils'

// =============================================================================
// SIDEBAR LOGO HEADER
// Professional sidebar header with company name and powered by branding
// Based on 21st.dev component, adapted for Dealligent theme system
// =============================================================================

interface SidebarLogoProps {
  companyName?: string
  poweredBy?: string
  className?: string
}

export function SidebarLogo({
  companyName = "CDS",
  poweredBy = "Dealligent",
  className,
}: SidebarLogoProps) {
  const navigate = useNavigate()

  return (
    <div
      className={cn(
        "flex flex-col gap-1 p-4 border-b border-[var(--sidebar-border)] min-h-[80px]",
        className
      )}
    >
      <motion.div
        className="flex items-center gap-3 cursor-pointer"
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

        {/* Text Container */}
        <div className="flex flex-col min-w-0">
          <h1 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
            {companyName}
          </h1>
          <p className="text-xs text-[var(--text-muted)] whitespace-nowrap">
            powered by{" "}
            <span className="font-medium text-[var(--accent-primary)]">{poweredBy}</span>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default SidebarLogo
