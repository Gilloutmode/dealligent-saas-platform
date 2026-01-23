// =============================================================================
// LEVEL 3 PREVIEW - Digest Animation
// Purple theme - Card reveal → Alerts stagger → Numbers animate
// Loop ~6s
// =============================================================================

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion'
import { Bell } from 'lucide-react'

type Phase = 'idle' | 'reveal' | 'alerts' | 'numbers' | 'pause'

const alerts = [
  { color: 'bg-red-400', text: 'ALERT: Competitor pricing change', hasNumber: false },
  { color: 'bg-green-400', text: 'Market grew', hasNumber: true, number: 12, suffix: '% YoY' },
  { color: 'bg-yellow-400', text: 'Feature X requested by', hasNumber: true, number: 12, suffix: ' clients' },
]

function AnimatedNumber({ value, animate }: { value: number; animate: boolean }) {
  const spring = useSpring(0, { stiffness: 100, damping: 30 })
  const display = useTransform(spring, (v) => Math.round(v))

  useEffect(() => {
    if (animate) {
      spring.set(value)
    } else {
      spring.set(0)
    }
  }, [animate, value, spring])

  return <motion.span>{display}</motion.span>
}

export function Level3Preview() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [cycleKey, setCycleKey] = useState(0)
  const [visibleAlerts, setVisibleAlerts] = useState(0)
  const [animateNumbers, setAnimateNumbers] = useState(false)

  // Start cycle
  const startCycle = useCallback(() => {
    setPhase('reveal')
    setVisibleAlerts(0)
    setAnimateNumbers(false)
  }, [])

  useEffect(() => {
    const timer = setTimeout(startCycle, 500)
    return () => clearTimeout(timer)
  }, [cycleKey, startCycle])

  // Phase transitions
  useEffect(() => {
    if (phase === 'reveal') {
      const timer = setTimeout(() => setPhase('alerts'), 500)
      return () => clearTimeout(timer)
    }
  }, [phase])

  useEffect(() => {
    if (phase === 'alerts') {
      const interval = setInterval(() => {
        setVisibleAlerts(prev => {
          if (prev >= alerts.length) {
            clearInterval(interval)
            setTimeout(() => setPhase('numbers'), 300)
            return prev
          }
          return prev + 1
        })
      }, 300)
      return () => clearInterval(interval)
    }
  }, [phase])

  useEffect(() => {
    if (phase === 'numbers') {
      setAnimateNumbers(true)
      const timer = setTimeout(() => setPhase('pause'), 1500)
      return () => clearTimeout(timer)
    }
  }, [phase])

  useEffect(() => {
    if (phase === 'pause') {
      const timer = setTimeout(() => {
        setPhase('idle')
        setCycleKey(k => k + 1)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [phase])

  return (
    <div className="space-y-3 text-sm min-h-[140px]">
      <AnimatePresence mode="wait">
        {(phase !== 'idle') && (
          <motion.div
            key={`card-${cycleKey}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20"
          >
            {/* Header */}
            <div className="flex items-center gap-2 text-purple-400 mb-3">
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 0 rgba(168, 85, 247, 0)',
                    '0 0 15px rgba(168, 85, 247, 0.3)',
                    '0 0 0 rgba(168, 85, 247, 0)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="rounded"
              >
                <Bell className="w-4 h-4" />
              </motion.div>
              <span className="font-semibold">Weekly Intelligence Digest</span>
            </div>

            {/* Alerts */}
            <div className="space-y-2 text-neutral-300">
              {alerts.slice(0, visibleAlerts).map((alert, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="flex items-center gap-2 text-xs"
                >
                  <motion.span 
                    className={`w-2 h-2 rounded-full ${alert.color}`}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.7, 1],
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      delay: i * 0.3,
                    }}
                  />
                  {alert.hasNumber ? (
                    <>
                      {alert.text}{' '}
                      <span className="text-purple-300 font-semibold">
                        <AnimatedNumber 
                          value={alert.number ?? 0} 
                          animate={animateNumbers} 
                        />
                        {alert.suffix}
                      </span>
                    </>
                  ) : (
                    alert.text
                  )}
                </motion.p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Level3Preview
