import React from 'react'
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { colors, typography, gradients, animation } from '../../../styles/theme'

interface LogoIntroProps {
  startFrame?: number
}

export const LogoIntro: React.FC<LogoIntroProps> = ({ startFrame = 0 }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const adjustedFrame = frame - startFrame

  if (adjustedFrame < 0) {
    return null
  }

  // Logo fade in and scale (0-60 frames = 0-2s)
  const logoProgress = spring({
    frame: adjustedFrame,
    fps,
    config: animation.spring.gentle,
  })

  const logoOpacity = interpolate(logoProgress, [0, 1], [0, 1])
  const logoScale = interpolate(logoProgress, [0, 1], [0.8, 1])

  // Glow pulse effect
  const glowCycle = (adjustedFrame % 60) / 60
  const glowIntensity = Math.sin(glowCycle * Math.PI * 2) * 0.3 + 0.7

  // Tagline appears after logo (30 frames delay)
  const taglineProgress = spring({
    frame: Math.max(0, adjustedFrame - 30),
    fps,
    config: animation.spring.smooth,
  })

  const taglineOpacity = interpolate(taglineProgress, [0, 1], [0, 1])
  const taglineY = interpolate(taglineProgress, [0, 1], [20, 0])

  return (
    <AbsoluteFill
      style={{
        background: colors.background,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 32,
      }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: gradients.brandRadial,
          opacity: glowIntensity * 0.5,
        }}
      />

      {/* Logo container */}
      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
        }}
      >
        {/* Logo mark - using text for now, can be replaced with image */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: 28,
            background: `linear-gradient(135deg, ${colors.brand} 0%, ${colors.purple} 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 0 ${60 * glowIntensity}px ${colors.brandGlow}, 0 0 ${120 * glowIntensity}px ${colors.brandGlow}`,
          }}
        >
          <span
            style={{
              fontSize: 64,
              fontWeight: typography.weights.bold,
              fontFamily: typography.fontDisplay,
              color: colors.text,
            }}
          >
            D
          </span>
        </div>

        {/* Brand name */}
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
      <p
        style={{
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
          fontSize: typography.sizes.h3,
          fontFamily: typography.fontBody,
          color: colors.textMuted,
          margin: 0,
          marginTop: 16,
        }}
      >
        Intelligence, Amplified
      </p>
    </AbsoluteFill>
  )
}
