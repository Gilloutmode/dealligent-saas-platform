// =============================================================================
// TYPING TEXT - Animated typing effect component
// Reusable with configurable speed and cursor
// =============================================================================

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TypingTextProps {
  text: string
  speed?: number
  enabled?: boolean
  onComplete?: () => void
  className?: string
  cursorColor?: string
  showCursor?: boolean
}

export function TypingText({
  text,
  speed = 30,
  enabled = true,
  onComplete,
  className = '',
  cursorColor = 'bg-indigo-400',
  showCursor = true,
}: TypingTextProps) {
  const [displayed, setDisplayed] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (!enabled) {
      setDisplayed('')
      setIsComplete(false)
      return
    }

    setDisplayed('')
    setIsComplete(false)
    let i = 0

    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(interval)
        setIsComplete(true)
        onComplete?.()
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed, enabled, onComplete])

  return (
    <span className={className}>
      {displayed}
      {showCursor && !isComplete && enabled && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className={`inline-block w-0.5 h-[1em] ${cursorColor} ml-0.5 align-middle`}
        />
      )}
    </span>
  )
}

// Hook version for more control
export function useTypingEffect(
  text: string,
  speed = 30,
  enabled = true
): { displayed: string; isComplete: boolean } {
  const [displayed, setDisplayed] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (!enabled) {
      setDisplayed('')
      setIsComplete(false)
      return
    }

    setDisplayed('')
    setIsComplete(false)
    let i = 0

    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(interval)
        setIsComplete(true)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed, enabled])

  return { displayed, isComplete }
}

export default TypingText
