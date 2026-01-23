import React from 'react'
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion'
import { colors, typography, spacing } from '../../../styles/theme'
import { NumberTicker } from '../../../components/animations/NumberTicker'
import { BlurIn } from '../../../components/animations/BlurIn'

interface PainStatsProps {
  startFrame?: number
  stat: {
    value: number
    suffix: string
    headline: string
    subtext: string
  }
}

export const PainStats: React.FC<PainStatsProps> = ({ 
  startFrame = 0,
  stat,
}) => {
  const frame = useCurrentFrame()
  const adjustedFrame = frame - startFrame

  if (adjustedFrame < 0) {
    return null
  }

  // Note: pulseProgress removed as it was unused

  // Red warning glow for pain points
  const warningGlow = interpolate(
    Math.sin((adjustedFrame / 30) * Math.PI),
    [-1, 1],
    [0.2, 0.4]
  )

  return (
    <AbsoluteFill
      style={{
        background: colors.background,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: spacing.xl,
      }}
    >
      {/* Warning radial gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at center, rgba(239, 68, 68, ${warningGlow}) 0%, transparent 60%)`,
        }}
      />

      {/* Main stat */}
      <BlurIn delay={0} duration={15}>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: spacing.sm,
          }}
        >
          <NumberTicker
            value={stat.value}
            suffix={stat.suffix}
            delay={6}
            duration={45}
            style={{
              fontSize: 160,
              fontWeight: typography.weights.bold,
              fontFamily: typography.fontDisplay,
              color: colors.error,
              textShadow: `0 0 60px rgba(239, 68, 68, 0.5)`,
            }}
          />
        </div>
      </BlurIn>

      {/* Headline */}
      <BlurIn delay={15} duration={12}>
        <h2
          style={{
            fontSize: typography.sizes.h2,
            fontWeight: typography.weights.semibold,
            fontFamily: typography.fontDisplay,
            color: colors.text,
            margin: 0,
            textAlign: 'center',
            maxWidth: 900,
          }}
        >
          {stat.headline}
        </h2>
      </BlurIn>

      {/* Subtext */}
      <BlurIn delay={30} duration={12}>
        <p
          style={{
            fontSize: typography.sizes.h4,
            fontFamily: typography.fontBody,
            color: colors.textMuted,
            margin: 0,
            textAlign: 'center',
            maxWidth: 700,
          }}
        >
          {stat.subtext}
        </p>
      </BlurIn>
    </AbsoluteFill>
  )
}
