// =============================================================================
// PIA MOCKUP ANIMATED - Product Agent Interface
// Feature comparison matrix with checkmarks animation
// Timeline: ~5s (plays once on viewport entry, settles on final state)
// =============================================================================

import { motion, AnimatePresence, useInView } from 'framer-motion'
import { memo, useEffect, useState, useRef, useCallback } from 'react'
import { Check, X } from 'lucide-react'

type Phase = 'idle' | 'grid' | 'checks' | 'badges' | 'pause'

const FEATURES = [
  { name: 'API Access', us: true, them: true },
  { name: 'Real-time Sync', us: true, them: false },
  { name: 'Custom Integrations', us: true, them: true },
  { name: 'AI Features', us: true, them: false },
]

export const PiaMockupAnimated = memo(function PiaMockupAnimated() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [phase, setPhase] = useState<Phase>('idle')
  const [hasPlayed, setHasPlayed] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const resetAnimation = useCallback(() => {
    setPhase('idle')
    setHasPlayed(false)
  }, [])

  useEffect(() => {
    if (!isInView && !isHovering) return
    if (hasPlayed && !isHovering) return

    const phases: { phase: Phase; duration: number }[] = [
      { phase: 'grid', duration: 1000 },
      { phase: 'checks', duration: 1500 },
      { phase: 'badges', duration: 2000 },
      { phase: 'pause', duration: 500 },
    ]

    if (phase === 'idle') {
      const timer = setTimeout(() => setPhase('grid'), 300)
      return () => clearTimeout(timer)
    }

    const currentIndex = phases.findIndex(p => p.phase === phase)
    if (currentIndex === -1) return

    const timer = setTimeout(() => {
      const nextIndex = currentIndex + 1
      if (nextIndex >= phases.length) {
        setHasPlayed(true)
        return
      }
      setPhase(phases[nextIndex].phase)
    }, phases[currentIndex].duration)

    return () => clearTimeout(timer)
  }, [phase, isInView, hasPlayed, isHovering])

  const handleMouseEnter = () => {
    if (hasPlayed) {
      setIsHovering(true)
      resetAnimation()
    }
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  const showGrid = phase !== 'idle'
  const showChecks = ['checks', 'badges', 'pause'].includes(phase)
  const showBadges = ['badges', 'pause'].includes(phase)

  return (
    <motion.div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full h-44 rounded-xl overflow-hidden relative cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-green-500/5 to-transparent" />

      <AnimatePresence mode="wait">
        {showGrid && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 p-4 border border-emerald-500/20 rounded-xl bg-[var(--mockup-bg)]/90 backdrop-blur-sm"
          >
            {/* Header */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <span className="text-xs">📦</span>
              </div>
              <p className="text-[9px] font-black uppercase tracking-wider text-emerald-400">
                FEATURE COMPARISON
              </p>
            </div>

            {/* Comparison Grid */}
            <div className="space-y-1">
              {/* Header row */}
              <div className="grid grid-cols-3 gap-2 text-[8px] text-[var(--text-muted)] uppercase tracking-wider pb-1 border-b border-[var(--border-light)]">
                <span>Feature</span>
                <span className="text-center">Us</span>
                <span className="text-center">Them</span>
              </div>

              {/* Feature rows */}
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={showGrid ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ delay: i * 0.1 }}
                  className="grid grid-cols-3 gap-2 py-1 text-[9px]"
                >
                  <span className="text-[var(--text-secondary)] truncate">{f.name}</span>
                  <div className="flex justify-center">
                    <AnimatePresence>
                      {showChecks && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 20, delay: i * 0.1 }}
                          className={`w-4 h-4 rounded-full flex items-center justify-center ${
                            f.us ? 'bg-emerald-500/20' : 'bg-red-500/20'
                          }`}
                        >
                          {f.us ? (
                            <Check className="w-2.5 h-2.5 text-emerald-400" />
                          ) : (
                            <X className="w-2.5 h-2.5 text-red-400" />
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="flex justify-center">
                    <AnimatePresence>
                      {showChecks && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 20, delay: i * 0.1 + 0.2 }}
                          className={`w-4 h-4 rounded-full flex items-center justify-center ${
                            f.them ? 'bg-emerald-500/20' : 'bg-red-500/20'
                          }`}
                        >
                          {f.them ? (
                            <Check className="w-2.5 h-2.5 text-emerald-400" />
                          ) : (
                            <X className="w-2.5 h-2.5 text-red-400" />
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary badges */}
            <AnimatePresence>
              {showBadges && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 flex gap-2 justify-center"
                >
                  <motion.span
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 0.5, repeat: 1 }}
                    className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-[8px] font-bold text-emerald-400"
                  >
                    +2 BETTER
                  </motion.span>
                  <span className="px-2 py-0.5 rounded-full bg-[var(--glass-bg-elevated)] border border-[var(--glass-bg-elevated)] text-[8px] font-bold text-[var(--text-muted)]">
                    2 EQUAL
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {phase === 'idle' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl">📦</span>
        </div>
      )}
    </motion.div>
  )
})

export default PiaMockupAnimated
