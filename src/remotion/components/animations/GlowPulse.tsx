import React from 'react'
import { interpolate, useCurrentFrame } from 'remotion'
import { colors } from '../../styles/theme'

interface GlowPulseProps {
  children: React.ReactNode
  color?: string
  intensity?: number
  speed?: number // frames per pulse cycle
  delay?: number
  style?: React.CSSProperties
}

export const GlowPulse: React.FC<GlowPulseProps> = ({
  children,
  color = colors.brand,
  intensity = 40,
  speed = 60, // 2 second cycle at 30fps
  delay = 0,
  style = {},
}) => {
  const frame = useCurrentFrame()
  const adjustedFrame = frame - delay

  if (adjustedFrame < 0) {
    return <div style={style}>{children}</div>
  }

  // Create a smooth sine wave for the pulse
  const cycleProgress = (adjustedFrame % speed) / speed
  const pulseValue = Math.sin(cycleProgress * Math.PI * 2) * 0.5 + 0.5
  
  const glowIntensity = interpolate(pulseValue, [0, 1], [intensity * 0.5, intensity])
  const glowSpread = interpolate(pulseValue, [0, 1], [intensity, intensity * 2])

  return (
    <div
      style={{
        boxShadow: `0 0 ${glowIntensity}px ${color}, 0 0 ${glowSpread}px ${color}`,
        transition: 'box-shadow 0.1s ease-out',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
