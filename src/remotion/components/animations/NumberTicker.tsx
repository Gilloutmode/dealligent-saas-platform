import React from 'react'
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { animation } from '../../styles/theme'

interface NumberTickerProps {
  value: number
  delay?: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  style?: React.CSSProperties
}

export const NumberTicker: React.FC<NumberTickerProps> = ({
  value,
  delay = 0,
  duration = 30, // 1 second at 30fps
  prefix = '',
  suffix = '',
  decimals = 0,
  style = {},
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const adjustedFrame = frame - delay

  if (adjustedFrame < 0) {
    return (
      <span style={{ ...style, opacity: 0 }}>
        {prefix}0{suffix}
      </span>
    )
  }

  const progress = spring({
    frame: adjustedFrame,
    fps,
    config: animation.spring.smooth,
    durationInFrames: duration,
  })

  const currentValue = interpolate(progress, [0, 1], [0, value], {
    extrapolateRight: 'clamp',
  })

  const displayValue = decimals > 0 
    ? currentValue.toFixed(decimals)
    : Math.floor(currentValue).toLocaleString()

  const opacity = interpolate(adjustedFrame, [0, 6], [0, 1], {
    extrapolateRight: 'clamp',
  })

  return (
    <span style={{ ...style, opacity }}>
      {prefix}{displayValue}{suffix}
    </span>
  )
}
