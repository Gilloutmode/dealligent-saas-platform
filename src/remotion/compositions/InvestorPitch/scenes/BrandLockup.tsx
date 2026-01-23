import React from 'react'
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { colors, typography, animation, spacing, gradients } from '../../../styles/theme'
import { BlurIn } from '../../../components/animations/BlurIn'
import { GlowPulse } from '../../../components/animations/GlowPulse'

interface BrandLockupProps {
  startFrame?: number
}

export const BrandLockup: React.FC<BrandLockupProps> = ({
  startFrame = 0,
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const adjustedFrame = frame - startFrame

  if (adjustedFrame < 0) {
    return null
  }

  // Logo scale animation
  const logoProgress = spring({
    frame: adjustedFrame,
    fps,
    config: animation.spring.gentle,
  })

  const logoScale = interpolate(logoProgress, [0, 1], [0.9, 1])
  const logoOpacity = interpolate(logoProgress, [0, 1], [0, 1])

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
      {/* Radial gradient background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: gradients.brandRadial,
          opacity: 0.4,
        }}
      />

      {/* Logo */}
      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: spacing.lg,
        }}
      >
        <GlowPulse color={colors.brandGlow} intensity={60} speed={90}>
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: 32,
              background: `linear-gradient(135deg, ${colors.brand} 0%, ${colors.purple} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontSize: 80,
                fontWeight: typography.weights.bold,
                fontFamily: typography.fontDisplay,
                color: colors.text,
              }}
            >
              D
            </span>
          </div>
        </GlowPulse>

        <h1
          style={{
            fontSize: typography.sizes.hero,
            fontWeight: typography.weights.bold,
            fontFamily: typography.fontDisplay,
            color: colors.text,
            margin: 0,
            letterSpacing: -2,
          }}
        >
          Dealligent
        </h1>
      </div>

      {/* Tagline */}
      <BlurIn delay={30} duration={15}>
        <p
          style={{
            fontSize: typography.sizes.h3,
            fontFamily: typography.fontBody,
            color: colors.textMuted,
            margin: 0,
          }}
        >
          Intelligence, Amplified
        </p>
      </BlurIn>

      {/* CTA */}
      <BlurIn delay={45} duration={15}>
        <div
          style={{
            marginTop: spacing.xl,
            padding: `${spacing.sm}px ${spacing.xl}px`,
            background: `linear-gradient(135deg, ${colors.brand} 0%, ${colors.purple} 100%)`,
            borderRadius: 100,
            boxShadow: `0 0 40px ${colors.brandGlow}`,
          }}
        >
          <span
            style={{
              fontSize: typography.sizes.body,
              fontWeight: typography.weights.semibold,
              fontFamily: typography.fontBody,
              color: colors.text,
            }}
          >
            Request Demo →
          </span>
        </div>
      </BlurIn>

      {/* Website */}
      <BlurIn delay={60} duration={15}>
        <p
          style={{
            fontSize: typography.sizes.body,
            fontFamily: typography.fontMono,
            color: colors.textDim,
            margin: 0,
            marginTop: spacing.lg,
          }}
        >
          dealligent.ai
        </p>
      </BlurIn>
    </AbsoluteFill>
  )
}
