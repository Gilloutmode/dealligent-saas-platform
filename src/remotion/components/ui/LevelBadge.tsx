import React from 'react'
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { colors, typography, spacing, animation } from '../../styles/theme'

interface LevelBadgeProps {
  level: 1 | 2 | 3
  title: string
  subtitle: string
  delay?: number
  style?: React.CSSProperties
}

const levelColors = {
  1: colors.brand,
  2: colors.emerald,
  3: colors.purple,
}

const levelGlows = {
  1: colors.brandGlow,
  2: colors.emeraldGlow,
  3: colors.purpleGlow,
}

export const LevelBadge: React.FC<LevelBadgeProps> = ({
  level,
  title,
  subtitle,
  delay = 0,
  style = {},
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const adjustedFrame = frame - delay

  if (adjustedFrame < 0) {
    return null
  }

  const progress = spring({
    frame: adjustedFrame,
    fps,
    config: animation.spring.bouncy,
  })

  const opacity = interpolate(progress, [0, 0.5], [0, 1], {
    extrapolateRight: 'clamp',
  })

  const scale = interpolate(progress, [0, 1], [0.8, 1])
  const translateX = interpolate(progress, [0, 1], [-50, 0])

  const color = levelColors[level]
  const glow = levelGlows[level]

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${translateX}px) scale(${scale})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: spacing.md,
        ...style,
      }}
    >
      {/* Level indicator */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: spacing.sm,
          padding: `${spacing.xs}px ${spacing.md}px`,
          background: `${color}20`,
          border: `1px solid ${color}`,
          borderRadius: 100,
          boxShadow: `0 0 30px ${glow}`,
        }}
      >
        <span
          style={{
            fontSize: typography.sizes.small,
            fontFamily: typography.fontMono,
            color,
            textTransform: 'uppercase',
            letterSpacing: 2,
          }}
        >
          Level {level}
        </span>
      </div>

      {/* Title */}
      <h2
        style={{
          fontSize: typography.sizes.h1,
          fontWeight: typography.weights.bold,
          fontFamily: typography.fontDisplay,
          color: colors.text,
          margin: 0,
          textAlign: 'center',
        }}
      >
        {title}
      </h2>

      {/* Subtitle */}
      <p
        style={{
          fontSize: typography.sizes.h4,
          fontFamily: typography.fontBody,
          color: colors.textMuted,
          margin: 0,
          textAlign: 'center',
        }}
      >
        {subtitle}
      </p>
    </div>
  )
}
