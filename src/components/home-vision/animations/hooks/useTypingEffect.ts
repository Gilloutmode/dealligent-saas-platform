// =============================================================================
// USE TYPING EFFECT HOOK
// Reusable typing animation for chat interfaces
// =============================================================================

import { useState, useEffect, useCallback } from 'react'

interface UseTypingEffectOptions {
  /** Characters per second */
  speed?: number
  /** Delay before starting (ms) */
  startDelay?: number
}

interface UseTypingEffectReturn {
  /** Currently displayed text */
  displayed: string
  /** Whether typing is complete */
  isComplete: boolean
  /** Reset the animation */
  reset: () => void
}

/**
 * Hook for typing effect animation
 *
 * @param text - Full text to type
 * @param enabled - Whether to start typing
 * @param options - Configuration options
 * @returns Typing state and controls
 *
 * @example
 * const { displayed, isComplete } = useTypingEffect(
 *   "What did we promise to Acme?",
 *   phase === 'user',
 *   { speed: 40 }
 * )
 */
export function useTypingEffect(
  text: string,
  enabled: boolean = true,
  options: UseTypingEffectOptions = {}
): UseTypingEffectReturn {
  const { speed = 40, startDelay = 0 } = options

  const [displayed, setDisplayed] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const [charIndex, setCharIndex] = useState(0)

  // Reset function
  const reset = useCallback(() => {
    setDisplayed('')
    setIsComplete(false)
    setCharIndex(0)
  }, [])

  // Handle enabled change - reset when disabled
  useEffect(() => {
    if (!enabled) {
      reset()
    }
  }, [enabled, reset])

  // Typing animation
  useEffect(() => {
    if (!enabled || charIndex >= text.length) return

    // Apply start delay only for first character
    const delay = charIndex === 0 ? startDelay : 1000 / speed

    const timer = setTimeout(() => {
      setDisplayed(prev => prev + text[charIndex])
      setCharIndex(prev => prev + 1)
    }, delay)

    return () => clearTimeout(timer)
  }, [enabled, charIndex, text, speed, startDelay])

  // Check completion
  useEffect(() => {
    if (displayed.length === text.length && text.length > 0) {
      setIsComplete(true)
    }
  }, [displayed, text])

  return { displayed, isComplete, reset }
}

export default useTypingEffect
