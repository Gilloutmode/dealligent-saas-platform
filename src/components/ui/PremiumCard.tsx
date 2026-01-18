"use client"

import { useRef, useState, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../../contexts/ThemeContext'

// =============================================================================
// PREMIUM CARD COMPONENT
// Reusable container with 3D tilt, glow effects, glass overlay
// Supports light/dark mode with consistent premium design
// =============================================================================

export type PremiumCardVariant = 'default' | 'blue' | 'green' | 'orange' | 'purple' | 'cyan' | 'red'

export interface PremiumCardProps {
  /** Card content */
  children: ReactNode
  /** Color variant for glow effect */
  variant?: PremiumCardVariant
  /** Additional class names */
  className?: string
  /** Enable 3D tilt effect on hover */
  enableTilt?: boolean
  /** Enable hover lift effect */
  enableHover?: boolean
  /** Animation delay for stagger effect */
  delay?: number
  /** Click handler */
  onClick?: () => void
  /** Custom padding */
  padding?: 'none' | 'sm' | 'md' | 'lg'
  /** Header content (rendered at top) */
  header?: ReactNode
}

// Variant colors - Dark mode
const variantColorsDark = {
  default: {
    glow: 'rgba(100, 116, 139, 0.3)',
    border: 'rgba(255, 255, 255, 0.1)',
    bg: '#141414',
  },
  blue: {
    glow: 'rgba(59, 130, 246, 0.4)',
    border: 'rgba(59, 130, 246, 0.2)',
    bg: '#0f1419',
  },
  green: {
    glow: 'rgba(16, 185, 129, 0.4)',
    border: 'rgba(16, 185, 129, 0.2)',
    bg: '#0f1914',
  },
  orange: {
    glow: 'rgba(245, 158, 11, 0.4)',
    border: 'rgba(245, 158, 11, 0.2)',
    bg: '#19140f',
  },
  purple: {
    glow: 'rgba(139, 92, 246, 0.4)',
    border: 'rgba(139, 92, 246, 0.2)',
    bg: '#14101f',
  },
  cyan: {
    glow: 'rgba(6, 182, 212, 0.4)',
    border: 'rgba(6, 182, 212, 0.2)',
    bg: '#0f1719',
  },
  red: {
    glow: 'rgba(239, 68, 68, 0.4)',
    border: 'rgba(239, 68, 68, 0.2)',
    bg: '#190f0f',
  },
}

// Variant colors - Light mode (colored backgrounds)
const variantColorsLight = {
  default: {
    glow: 'rgba(100, 116, 139, 0.1)',
    border: 'rgba(15, 23, 42, 0.1)',
    bg: 'rgba(248, 250, 252, 1)',
  },
  blue: {
    glow: 'rgba(59, 130, 246, 0.15)',
    border: 'rgba(59, 130, 246, 0.2)',
    bg: 'rgba(59, 130, 246, 0.06)',
  },
  green: {
    glow: 'rgba(16, 185, 129, 0.15)',
    border: 'rgba(16, 185, 129, 0.2)',
    bg: 'rgba(16, 185, 129, 0.06)',
  },
  orange: {
    glow: 'rgba(245, 158, 11, 0.15)',
    border: 'rgba(245, 158, 11, 0.2)',
    bg: 'rgba(249, 115, 22, 0.06)',
  },
  purple: {
    glow: 'rgba(139, 92, 246, 0.15)',
    border: 'rgba(139, 92, 246, 0.2)',
    bg: 'rgba(139, 92, 246, 0.06)',
  },
  cyan: {
    glow: 'rgba(6, 182, 212, 0.15)',
    border: 'rgba(6, 182, 212, 0.2)',
    bg: 'rgba(6, 182, 212, 0.06)',
  },
  red: {
    glow: 'rgba(239, 68, 68, 0.15)',
    border: 'rgba(239, 68, 68, 0.2)',
    bg: 'rgba(239, 68, 68, 0.06)',
  },
}

// Padding classes
const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-6',
}

export function PremiumCard({
  children,
  variant = 'default',
  className = '',
  enableTilt = false,
  enableHover = true,
  delay = 0,
  onClick,
  padding = 'md',
  header,
}: PremiumCardProps) {
  const { isDark } = useTheme()
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })

  // Get colors based on theme and variant
  const colors = isDark ? variantColorsDark[variant] : variantColorsLight[variant]

  // Handle mouse move for 3D tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt || !cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    const rotateX = -(y / rect.height) * 3
    const rotateY = (x / rect.width) * 3

    setRotation({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotation({ x: 0, y: 0 })
  }

  // Theme-aware glass overlay
  const glassOverlay = isDark
    ? 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.02) 100%)'
    : 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.5) 100%)'

  // Shadow for light mode
  const boxShadow = isDark
    ? 'none'
    : '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)'

  return (
    <motion.div
      ref={cardRef}
      className={`
        relative rounded-2xl overflow-hidden
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      style={{
        transformStyle: enableTilt ? 'preserve-3d' : undefined,
        backgroundColor: colors.bg,
        border: `1px solid ${colors.border}`,
        boxShadow,
      }}
      initial={{ opacity: 0, y: 16 }}
      animate={{
        opacity: 1,
        y: enableHover && isHovered ? -3 : 0,
        rotateX: enableTilt ? rotation.x : 0,
        rotateY: enableTilt ? rotation.y : 0,
      }}
      transition={{
        opacity: { duration: 0.4, delay },
        y: { type: 'spring', stiffness: 300, damping: 25 },
        rotateX: { type: 'spring', stiffness: 300, damping: 25 },
        rotateY: { type: 'spring', stiffness: 300, damping: 25 },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Glass overlay */}
      <motion.div
        className="absolute inset-0 z-5 pointer-events-none"
        style={{ background: glassOverlay }}
        animate={{ opacity: isHovered ? 0.8 : 0.4 }}
        transition={{ duration: 0.3 }}
      />

      {/* Bottom glow effect - subtle */}
      {variant !== 'default' && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1/2 z-4 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at bottom, ${colors.glow} -30%, transparent 70%)`,
            filter: isDark ? 'blur(30px)' : 'blur(50px)',
          }}
          animate={{ opacity: isHovered ? (isDark ? 0.6 : 0.35) : (isDark ? 0.4 : 0.2) }}
          transition={{ duration: 0.4 }}
        />
      )}

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 mix-blend-overlay z-3 pointer-events-none"
        style={{
          opacity: isDark ? '0.08' : '0.03',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className={`relative z-10 h-full ${paddingClasses[padding]}`}>
        {header && (
          <div className="mb-4">
            {header}
          </div>
        )}
        {children}
      </div>

      {/* Bottom accent line */}
      {variant !== 'default' && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1px] z-15"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${colors.border} 50%, transparent 100%)`,
          }}
          animate={{
            boxShadow: isHovered
              ? `0 0 ${isDark ? '15px' : '8px'} 1px ${colors.glow}`
              : `0 0 ${isDark ? '8px' : '4px'} 1px ${colors.glow}`,
            opacity: isHovered ? 1 : (isDark ? 0.6 : 0.4),
          }}
          transition={{ duration: 0.4 }}
        />
      )}
    </motion.div>
  )
}

export default PremiumCard
