import React from 'react'
import { colors, shadows, spacing } from '../../styles/theme'

interface GlassCardProps {
  children: React.ReactNode
  padding?: number
  borderRadius?: number
  glowColor?: string
  showGlow?: boolean
  style?: React.CSSProperties
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  padding = spacing.md,
  borderRadius = 16,
  glowColor = colors.brandGlow,
  showGlow = false,
  style = {},
}) => {
  return (
    <div
      style={{
        background: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius,
        padding,
        backdropFilter: 'blur(20px)',
        boxShadow: showGlow 
          ? `${shadows.card}, 0 0 40px ${glowColor}` 
          : shadows.card,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
