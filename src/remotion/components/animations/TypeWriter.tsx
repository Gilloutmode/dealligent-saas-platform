import React from 'react'
import { useCurrentFrame } from 'remotion'
import { colors, typography } from '../../styles/theme'

interface TypeWriterProps {
  text: string
  delay?: number
  speed?: number // frames per character
  showCursor?: boolean
  cursorBlinkSpeed?: number
  style?: React.CSSProperties
}

export const TypeWriter: React.FC<TypeWriterProps> = ({
  text,
  delay = 0,
  speed = 1.2, // ~40ms per char at 30fps
  showCursor = true,
  cursorBlinkSpeed = 15, // blink every 0.5s
  style = {},
}) => {
  const frame = useCurrentFrame()
  const adjustedFrame = frame - delay

  if (adjustedFrame < 0) {
    return showCursor ? (
      <span style={{ ...style, opacity: 0.6 }}>|</span>
    ) : null
  }

  const charsToShow = Math.floor(adjustedFrame / speed)
  const displayText = text.slice(0, Math.min(charsToShow, text.length))
  const isComplete = charsToShow >= text.length
  
  // Cursor blink effect
  const cursorVisible = !isComplete || Math.floor(adjustedFrame / cursorBlinkSpeed) % 2 === 0

  return (
    <span style={style}>
      {displayText}
      {showCursor && cursorVisible && (
        <span
          style={{
            color: colors.brand,
            marginLeft: 2,
            fontWeight: typography.weights.regular,
          }}
        >
          |
        </span>
      )}
    </span>
  )
}
