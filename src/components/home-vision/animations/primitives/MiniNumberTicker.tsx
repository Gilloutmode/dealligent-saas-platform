// =============================================================================
// MINI NUMBER TICKER COMPONENT
// Compact animated counter for mockup KPIs
// =============================================================================

import { useState, useEffect, memo } from 'react'

interface MiniNumberTickerProps {
  /** Target value */
  value: number
  /** Duration in seconds */
  duration?: number
  /** Delay before starting (seconds) */
  delay?: number
  /** Suffix (%, etc.) */
  suffix?: string
  /** Prefix ($, etc.) */
  prefix?: string
  /** CSS class for styling */
  className?: string
}

/**
 * Animated number counter for mockup KPIs
 *
 * @example
 * <MiniNumberTicker value={85} suffix="%" delay={0.5} />
 */
export const MiniNumberTicker = memo(function MiniNumberTicker({
  value,
  duration = 1,
  delay = 0,
  suffix = '',
  prefix = '',
  className = '',
}: MiniNumberTickerProps) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const timeoutId = setTimeout(() => {
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)

        // Ease out quart for smooth deceleration
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        setDisplayValue(Math.floor(easeOutQuart * value))

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate)
        } else {
          setDisplayValue(value)
        }
      }

      animationFrame = requestAnimationFrame(animate)
    }, delay * 1000)

    return () => {
      clearTimeout(timeoutId)
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [value, duration, delay])

  return (
    <span className={`tabular-nums ${className}`}>
      {prefix}{displayValue}{suffix}
    </span>
  )
})

export default MiniNumberTicker
