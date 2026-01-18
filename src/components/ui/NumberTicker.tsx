"use client"

import { useEffect, useRef, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

// =============================================================================
// NUMBER TICKER COMPONENT
// Animated counting effect inspired by Magic UI
// =============================================================================

export interface NumberTickerProps {
  value: number
  direction?: 'up' | 'down'
  delay?: number
  decimalPlaces?: number
  className?: string
  suffix?: string
  prefix?: string
}

export function NumberTicker({
  value,
  direction = 'up',
  delay = 0,
  decimalPlaces = 0,
  className = '',
  suffix = '',
  prefix = '',
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [isInView, setIsInView] = useState(false)

  // Spring animation for smooth counting
  const springValue = useSpring(direction === 'down' ? value : 0, {
    stiffness: 75,
    damping: 30,
    restDelta: 0.001,
  })

  const displayValue = useTransform(springValue, (latest) => {
    return Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    }).format(Number(latest.toFixed(decimalPlaces)))
  })

  // Intersection observer for triggering animation when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  // Trigger animation when in view
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        springValue.set(direction === 'down' ? 0 : value)
      }, delay * 1000)
      return () => clearTimeout(timer)
    }
  }, [isInView, value, direction, delay, springValue])

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  )
}

export default NumberTicker
