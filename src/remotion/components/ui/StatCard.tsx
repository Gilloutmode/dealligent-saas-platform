import React from 'react'
import { colors, typography, spacing } from '../../styles/theme'
import { GlassCard } from './GlassCard'
import { NumberTicker } from '../animations/NumberTicker'
import { SlideIn } from '../animations/SlideIn'

interface StatCardProps {
  value: number
  label: string
  prefix?: string
  suffix?: string
  icon?: React.ReactNode
  delay?: number
  accentColor?: string
  style?: React.CSSProperties
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  prefix = '',
  suffix = '',
  icon,
  delay = 0,
  accentColor = colors.brand,
  style = {},
}) => {
  return (
    <SlideIn direction="bottom" delay={delay} distance={30}>
      <GlassCard
        padding={spacing.lg}
        showGlow
        glowColor={accentColor.replace(')', ', 0.3)')}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: spacing.sm,
          minWidth: 200,
          ...style,
        }}
      >
        {icon && (
          <div
            style={{
              fontSize: 32,
              marginBottom: spacing.xs,
              color: accentColor,
            }}
          >
            {icon}
          </div>
        )}
        <NumberTicker
          value={value}
          prefix={prefix}
          suffix={suffix}
          delay={delay + 6}
          style={{
            fontSize: typography.sizes.h1,
            fontWeight: typography.weights.bold,
            fontFamily: typography.fontDisplay,
            color: colors.text,
            background: `linear-gradient(135deg, ${colors.text} 0%, ${accentColor} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        />
        <span
          style={{
            fontSize: typography.sizes.body,
            fontFamily: typography.fontBody,
            color: colors.textMuted,
            textAlign: 'center',
          }}
        >
          {label}
        </span>
      </GlassCard>
    </SlideIn>
  )
}
