import React from 'react'
import { interpolate, useCurrentFrame } from 'remotion'
import { animation } from '../../styles/theme'

interface BlurInProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  style?: React.CSSProperties
}

export const BlurIn: React.FC<BlurInProps> = ({
  children,
  delay = 0,
  duration = animation.timing.normal,
  style = {},
}) => {
  const frame = useCurrentFrame()
  const adjustedFrame = frame - delay

  const opacity = interpolate(
    adjustedFrame,
    [0, duration],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  )

  const blur = interpolate(
    adjustedFrame,
    [0, duration],
    [20, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  )

  const scale = interpolate(
    adjustedFrame,
    [0, duration],
    [0.95, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  )

  if (adjustedFrame < 0) {
    return null
  }

  return (
    <div
      style={{
        opacity,
        filter: `blur(${blur}px)`,
        transform: `scale(${scale})`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
