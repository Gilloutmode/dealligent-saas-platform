import React from 'react'
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { animation } from '../../styles/theme'

type Direction = 'left' | 'right' | 'top' | 'bottom'

interface SlideInProps {
  children: React.ReactNode
  direction?: Direction
  delay?: number
  distance?: number
  springConfig?: typeof animation.spring.smooth
  style?: React.CSSProperties
}

const getTransform = (direction: Direction, progress: number, distance: number): string => {
  const offset = (1 - progress) * distance

  switch (direction) {
    case 'left':
      return `translateX(${-offset}px)`
    case 'right':
      return `translateX(${offset}px)`
    case 'top':
      return `translateY(${-offset}px)`
    case 'bottom':
      return `translateY(${offset}px)`
  }
}

export const SlideIn: React.FC<SlideInProps> = ({
  children,
  direction = 'bottom',
  delay = 0,
  distance = 40,
  springConfig = animation.spring.smooth,
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
    config: springConfig,
  })

  const opacity = interpolate(progress, [0, 0.5], [0, 1], {
    extrapolateRight: 'clamp',
  })

  return (
    <div
      style={{
        opacity,
        transform: getTransform(direction, progress, distance),
        ...style,
      }}
    >
      {children}
    </div>
  )
}
