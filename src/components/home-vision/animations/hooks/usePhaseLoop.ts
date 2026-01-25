// =============================================================================
// USE PHASE LOOP HOOK
// Manages animation phase machine with automatic looping
// =============================================================================

import { useState, useEffect, useCallback, useRef } from 'react'

interface PhaseConfig<T extends string> {
  /** Phase name */
  phase: T
  /** Duration in milliseconds */
  duration: number
}

interface UsePhaseLoopOptions {
  /** Whether to auto-start */
  autoStart?: boolean
  /** Whether to loop */
  loop?: boolean
  /** Pause duration between loops (ms) */
  loopDelay?: number
}

interface UsePhaseLoopReturn<T extends string> {
  /** Current phase */
  phase: T
  /** Cycle count (increments on loop reset) */
  cycleKey: number
  /** Whether animation is running */
  isRunning: boolean
  /** Start the animation */
  start: () => void
  /** Stop the animation */
  stop: () => void
  /** Reset to first phase */
  reset: () => void
  /** Time elapsed in current phase (ms) */
  elapsed: number
}

/**
 * Hook for managing phase-based animation loops
 *
 * @param phases - Array of phase configurations with durations
 * @param options - Configuration options
 * @returns Phase state and controls
 *
 * @example
 * const phases = [
 *   { phase: 'typing', duration: 2000 },
 *   { phase: 'thinking', duration: 1500 },
 *   { phase: 'response', duration: 2500 },
 *   { phase: 'pause', duration: 2000 },
 * ] as const
 *
 * const { phase, cycleKey } = usePhaseLoop(phases, { loop: true })
 */
export function usePhaseLoop<T extends string>(
  phases: readonly PhaseConfig<T>[],
  options: UsePhaseLoopOptions = {}
): UsePhaseLoopReturn<T> {
  const { autoStart = true, loop = true, loopDelay = 500 } = options

  const [currentIndex, setCurrentIndex] = useState(0)
  const [cycleKey, setCycleKey] = useState(0)
  const [isRunning, setIsRunning] = useState(autoStart)
  const [elapsed, setElapsed] = useState(0)
  const startTimeRef = useRef<number>(Date.now())

  const currentPhase = phases[currentIndex]

  // Start function
  const start = useCallback(() => {
    setIsRunning(true)
    startTimeRef.current = Date.now()
  }, [])

  // Stop function
  const stop = useCallback(() => {
    setIsRunning(false)
  }, [])

  // Reset function
  const reset = useCallback(() => {
    setCurrentIndex(0)
    setElapsed(0)
    setCycleKey(prev => prev + 1)
    startTimeRef.current = Date.now()
  }, [])

  // Phase transition logic
  useEffect(() => {
    if (!isRunning || !currentPhase) return

    const timer = setTimeout(() => {
      const nextIndex = currentIndex + 1

      if (nextIndex >= phases.length) {
        // End of cycle
        if (loop) {
          // Wait loopDelay then reset
          setTimeout(() => {
            reset()
          }, loopDelay)
        } else {
          setIsRunning(false)
        }
      } else {
        // Move to next phase
        setCurrentIndex(nextIndex)
        startTimeRef.current = Date.now()
        setElapsed(0)
      }
    }, currentPhase.duration)

    return () => clearTimeout(timer)
  }, [isRunning, currentIndex, currentPhase, phases.length, loop, loopDelay, reset])

  // Track elapsed time (optional, for progress indicators)
  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setElapsed(Date.now() - startTimeRef.current)
    }, 100)

    return () => clearInterval(interval)
  }, [isRunning])

  return {
    phase: currentPhase?.phase ?? phases[0].phase,
    cycleKey,
    isRunning,
    start,
    stop,
    reset,
    elapsed,
  }
}

export default usePhaseLoop
