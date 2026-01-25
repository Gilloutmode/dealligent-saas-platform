// =============================================================================
// SIA MOCKUP ANIMATED - Sales Agent Interface
// Win/Loss chart with bars building animation
// Timeline: ~5s (plays once on viewport entry, settles on final state)
// =============================================================================

import { motion, AnimatePresence, useInView } from 'framer-motion'
import { memo, useEffect, useState, useRef, useCallback } from 'react'
import { MiniNumberTicker } from '../primitives/MiniNumberTicker'

type Phase = 'idle' | 'container' | 'bars' | 'label' | 'pause'

const WIN_LOSS_DATA = [
  { period: 'Q1', wins: 8, losses: 3 },
  { period: 'Q2', wins: 12, losses: 5 },
  { period: 'Q3', wins: 15, losses: 4 },
  { period: 'Q4', wins: 18, losses: 6 },
]

export const SiaMockupAnimated = memo(function SiaMockupAnimated() {
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
      { phase: 'container', duration: 500 },
      { phase: 'bars', duration: 2000 },
      { phase: 'label', duration: 2000 },
      { phase: 'pause', duration: 500 },
    ]

    if (phase === 'idle') {
      const timer = setTimeout(() => setPhase('container'), 300)
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

  const showContainer = phase !== 'idle'
  const showBars = ['bars', 'label', 'pause'].includes(phase)
  const showLabel = ['label', 'pause'].includes(phase)

  const maxValue = Math.max(...WIN_LOSS_DATA.flatMap(d => [d.wins, d.losses]))

  return (
    <motion.div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full h-44 rounded-xl overflow-hidden relative cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-transparent" />

      <AnimatePresence mode="wait">
        {showContainer && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 p-4 border border-orange-500/20 rounded-xl bg-[var(--mockup-bg)]/90 backdrop-blur-sm"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <span className="text-xs">💼</span>
                </div>
                <p className="text-[9px] font-black uppercase tracking-wider text-orange-400">
                  WIN/LOSS ANALYSIS
                </p>
              </div>
              <AnimatePresence>
                {showLabel && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-[8px] font-bold text-emerald-400"
                  >
                    <MiniNumberTicker value={75} suffix="%" duration={0.8} /> Win Rate
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Chart */}
            <div className="flex items-end justify-between gap-2 h-20 px-2">
              {WIN_LOSS_DATA.map((d, i) => (
                <div key={d.period} className="flex-1 flex flex-col items-center gap-1">
                  <div className="flex gap-0.5 items-end h-14">
                    {/* Win bar */}
                    <motion.div
                      initial={{ height: 0 }}
                      animate={showBars ? { height: `${(d.wins / maxValue) * 100}%` } : { height: 0 }}
                      transition={{
                        type: 'spring',
                        stiffness: 200,
                        damping: 20,
                        delay: i * 0.15,
                      }}
                      className="w-3 bg-emerald-500/60 rounded-t-sm"
                    />
                    {/* Loss bar */}
                    <motion.div
                      initial={{ height: 0 }}
                      animate={showBars ? { height: `${(d.losses / maxValue) * 100}%` } : { height: 0 }}
                      transition={{
                        type: 'spring',
                        stiffness: 200,
                        damping: 20,
                        delay: i * 0.15 + 0.1,
                      }}
                      className="w-3 bg-red-500/60 rounded-t-sm"
                    />
                  </div>
                  <span className="text-[8px] text-[var(--text-muted)]">{d.period}</span>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-emerald-500/60 rounded-sm" />
                <span className="text-[8px] text-[var(--text-muted)]">Wins</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500/60 rounded-sm" />
                <span className="text-[8px] text-[var(--text-muted)]">Losses</span>
              </div>
            </div>

            {/* Deal Intelligence Badge */}
            <AnimatePresence>
              {showLabel && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-2 flex justify-center"
                >
                  <span className="px-2 py-0.5 rounded-full bg-orange-500/20 border border-orange-500/30 text-[8px] font-bold text-orange-400">
                    DEAL INTELLIGENCE
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {phase === 'idle' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl">💼</span>
        </div>
      )}
    </motion.div>
  )
})

export default SiaMockupAnimated
