import React from 'react'
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { colors, animation } from '../../../styles/theme'
import { LevelBadge } from '../../../components/ui/LevelBadge'

interface LevelTransitionProps {
  startFrame?: number
  level: 1 | 2 | 3
  title: string
  subtitle: string
}

const levelBackgrounds: Record<1 | 2 | 3, string> = {
  1: `radial-gradient(circle at center, ${colors.brandGlow} 0%, transparent 70%)`,
  2: `radial-gradient(circle at center, ${colors.emeraldGlow} 0%, transparent 70%)`,
  3: `radial-gradient(circle at center, ${colors.purpleGlow} 0%, transparent 70%)`,
}

export const LevelTransition: React.FC<LevelTransitionProps> = ({
  startFrame = 0,
  level,
  title,
  subtitle,
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const adjustedFrame = frame - startFrame

  if (adjustedFrame < 0) {
    return null
  }

  // Background animation
  const bgProgress = spring({
    frame: adjustedFrame,
    fps,
    config: animation.spring.gentle,
  })

  const bgOpacity = interpolate(bgProgress, [0, 1], [0, 0.6])
  const bgScale = interpolate(bgProgress, [0, 1], [0.5, 1.5])

  // Grid lines animation
  const gridOpacity = interpolate(adjustedFrame, [0, 30], [0, 0.1], {
    extrapolateRight: 'clamp',
  })

  return (
    <AbsoluteFill
      style={{
        background: colors.background,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Animated background glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: levelBackgrounds[level],
          opacity: bgOpacity,
          transform: `scale(${bgScale})`,
        }}
      />

      {/* Grid pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: gridOpacity,
          backgroundImage: `
            linear-gradient(${colors.border} 1px, transparent 1px),
            linear-gradient(90deg, ${colors.border} 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Level badge */}
      <LevelBadge
        level={level}
        title={title}
        subtitle={subtitle}
        delay={15}
      />
    </AbsoluteFill>
  )
}
