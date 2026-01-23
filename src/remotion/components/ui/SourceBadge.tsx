import React from 'react'
import { spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { colors, typography, spacing, animation } from '../../styles/theme'

interface SourceBadgeProps {
  name: string
  icon?: string
  verified?: boolean
  delay?: number
  style?: React.CSSProperties
}

export const SourceBadge: React.FC<SourceBadgeProps> = ({
  name,
  icon = '🔗',
  verified = true,
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
    config: animation.spring.smooth,
  })

  return (
    <div
      style={{
        opacity: progress,
        transform: `scale(${0.8 + progress * 0.2})`,
        display: 'inline-flex',
        alignItems: 'center',
        gap: spacing.xs,
        padding: `${spacing.xs}px ${spacing.sm}px`,
        background: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: 8,
        ...style,
      }}
    >
      <span style={{ fontSize: 14 }}>{icon}</span>
      <span
        style={{
          fontSize: typography.sizes.small,
          fontFamily: typography.fontBody,
          color: colors.text,
        }}
      >
        {name}
      </span>
      {verified && (
        <span
          style={{
            fontSize: 12,
            color: colors.emerald,
          }}
        >
          ✓
        </span>
      )}
    </div>
  )
}
