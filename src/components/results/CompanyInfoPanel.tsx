"use client"

import { motion } from 'framer-motion'
import { MapPin, Calendar, Link2, Building2 } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { cn } from '../../lib/utils'

// =============================================================================
// COMPANY INFO PANEL COMPONENT
// Shows headquarters, founded year, and sources count
// Based on 21st.dev component, adapted for Dealligent design system
// =============================================================================

export interface CompanyInfoPanelProps {
  companyName?: string
  headquarters?: string
  foundedYear?: string
  sourcesCount?: number
  className?: string
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

export function CompanyInfoPanel({
  companyName,
  headquarters = 'Non spécifié',
  foundedYear = 'N/A',
  sourcesCount = 0,
  className,
}: CompanyInfoPanelProps) {
  const { isDark } = useTheme()

  // Theme-aware colors
  const cardBg = isDark ? 'rgba(59, 130, 246, 0.08)' : 'rgba(59, 130, 246, 0.06)'
  const cardBorder = isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.25)'
  const itemBg = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.7)'
  const itemBorder = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(59, 130, 246, 0.15)'

  const infoItems = [
    {
      id: 'headquarters',
      label: 'Siège social',
      value: headquarters,
      icon: MapPin,
      iconGradient: 'from-blue-500 to-cyan-500',
      iconGlow: 'shadow-blue-500/25',
    },
    {
      id: 'founded',
      label: 'Fondée en',
      value: foundedYear,
      icon: Calendar,
      iconGradient: 'from-purple-500 to-pink-500',
      iconGlow: 'shadow-purple-500/25',
    },
    {
      id: 'sources',
      label: 'Sources',
      value: sourcesCount > 0 ? `${sourcesCount} liens` : 'N/A',
      icon: Link2,
      iconGradient: 'from-amber-500 to-orange-500',
      iconGlow: 'shadow-amber-500/25',
    },
  ]

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className={cn("rounded-2xl overflow-hidden", className)}
      style={{
        backgroundColor: cardBg,
        border: `1px solid ${cardBorder}`,
      }}
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-[var(--border-light)] flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
          <Building2 className="w-4.5 h-4.5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-[var(--text-primary)]">
            {companyName || 'Informations Entreprise'}
          </h3>
          <p className="text-xs text-[var(--text-muted)]">Données de profil</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {infoItems.map((item, index) => {
            const IconComponent = item.icon
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="flex flex-col gap-2 p-3 rounded-xl transition-all"
                style={{
                  backgroundColor: itemBg,
                  border: `1px solid ${itemBorder}`,
                }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${item.iconGradient} flex items-center justify-center shadow-md ${item.iconGlow}`}>
                    <IconComponent className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-xs font-medium text-[var(--text-muted)]">
                    {item.label}
                  </span>
                </div>
                <span className="text-sm font-semibold text-[var(--text-primary)] pl-9">
                  {item.value}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

export default CompanyInfoPanel
