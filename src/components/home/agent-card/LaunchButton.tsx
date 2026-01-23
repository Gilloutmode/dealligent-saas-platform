// =============================================================================
// LAUNCH BUTTON - Shimmer button with gradient and glow effects
// =============================================================================

"use client"

import { motion } from 'framer-motion'
import { Play } from 'lucide-react'

interface LaunchButtonProps {
  onClick: () => void
  color: string
  isHovered: boolean
  label?: string
  isActive?: boolean
}

// Helper to darken a hex color
function darkenColor(hex: string, factor: number = 0.7): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgb(${Math.round(r * factor)}, ${Math.round(g * factor)}, ${Math.round(b * factor)})`
}

export function LaunchButton({
  onClick,
  color,
  isHovered,
  label = "Accéder à l'application",
  isActive = true
}: LaunchButtonProps) {
  // If not active, show "Prochainement" with disabled styling
  if (!isActive) {
    return (
      <div
        className="relative w-full mt-6 h-13 rounded-xl flex items-center justify-center gap-2.5 font-semibold text-[var(--text-muted)] overflow-hidden cursor-not-allowed"
        style={{
          background: 'var(--bg-tertiary)',
          border: '1px solid var(--border-light)',
        }}
      >
        <span className="text-sm">🚀 Prochainement</span>
      </div>
    )
  }

  return (
    <motion.button
      onClick={onClick}
      className="relative w-full mt-6 h-13 rounded-xl flex items-center justify-center gap-2.5 font-bold text-white overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2"
      style={{
        background: `linear-gradient(135deg, ${color} 0%, ${darkenColor(color, 0.75)} 100%)`,
        boxShadow: `0 4px 24px ${color}50`,
        // @ts-expect-error CSS custom property for focus ring
        '--tw-ring-color': color,
      }}
      initial={{ scale: 1, y: 0 }}
      whileHover={{
        scale: 1.03,
        y: -3,
        boxShadow: `0 12px 40px ${color}60, 0 0 30px ${color}40`,
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      aria-label={label}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.3) 50%, transparent 75%)`,
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: isHovered ? ['200% 0', '-200% 0'] : '200% 0'
        }}
        transition={{
          duration: 1.5,
          repeat: isHovered ? Infinity : 0,
          ease: 'linear'
        }}
      />

      <span className="relative z-10 flex items-center gap-2">
        <span>{label}</span>
        <Play className="w-4 h-4 fill-current" />
      </span>
    </motion.button>
  )
}

export default LaunchButton
