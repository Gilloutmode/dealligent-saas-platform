// =============================================================================
// TIA MOCKUP ANIMATED - Technology Agent Interface
// Tech stack visualization with connection lines
// Timeline: ~5s (plays once on viewport entry, settles on final state)
// =============================================================================

import { motion, AnimatePresence, useInView } from 'framer-motion'
import { memo, useEffect, useState, useRef, useCallback } from 'react'

type Phase = 'idle' | 'container' | 'nodes' | 'lines' | 'label' | 'pause'

const TECH_NODES = [
  { name: 'React', color: '#61DAFB' },
  { name: 'Node', color: '#339933' },
  { name: 'AWS', color: '#FF9900' },
  { name: 'K8s', color: '#326CE5' },
  { name: 'Python', color: '#3776AB' },
  { name: 'Redis', color: '#DC382D' },
  { name: 'MongoDB', color: '#47A248' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'GraphQL', color: '#E10098' },
]

export const TiaMockupAnimated = memo(function TiaMockupAnimated() {
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
      { phase: 'nodes', duration: 1500 },
      { phase: 'lines', duration: 1500 },
      { phase: 'label', duration: 1000 },
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
  const showNodes = ['nodes', 'lines', 'label', 'pause'].includes(phase)
  const showLines = ['lines', 'label', 'pause'].includes(phase)
  const showLabel = ['label', 'pause'].includes(phase)

  return (
    <motion.div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full h-44 rounded-xl overflow-hidden relative cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-teal-500/5 to-transparent" />

      <AnimatePresence mode="wait">
        {showContainer && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 p-4 border border-cyan-500/20 rounded-xl bg-[var(--mockup-bg)]/90 backdrop-blur-sm"
          >
            {/* Header */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                <span className="text-xs">⚙️</span>
              </div>
              <p className="text-[9px] font-black uppercase tracking-wider text-cyan-400">
                TECH STACK ANALYSIS
              </p>
            </div>

            {/* Tech Grid */}
            <div className="relative">
              <div className="grid grid-cols-3 gap-2">
                {TECH_NODES.map((node, i) => (
                  <motion.div
                    key={node.name}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={showNodes ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 25,
                      delay: i * 0.05,
                    }}
                    className="relative"
                  >
                    <motion.div
                      animate={showLines ? {
                        boxShadow: `0 0 8px ${node.color}40`,
                      } : { boxShadow: 'none' }}
                      transition={{ delay: i * 0.05 }}
                      className="p-2 rounded-lg border border-[var(--glass-bg-elevated)] bg-[var(--glass-bg)] text-center"
                    >
                      <span
                        className="text-[9px] font-bold"
                        style={{ color: node.color }}
                      >
                        {node.name}
                      </span>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* Connection lines overlay */}
              <AnimatePresence>
                {showLines && (
                  <motion.svg
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 pointer-events-none"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    {/* Horizontal lines */}
                    <motion.line
                      x1="10" y1="25" x2="90" y2="25"
                      stroke="#06b6d4"
                      strokeWidth="0.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.line
                      x1="10" y1="50" x2="90" y2="50"
                      stroke="#06b6d4"
                      strokeWidth="0.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    />
                    <motion.line
                      x1="10" y1="75" x2="90" y2="75"
                      stroke="#06b6d4"
                      strokeWidth="0.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    />
                  </motion.svg>
                )}
              </AnimatePresence>
            </div>

            {/* Stack Analysis Badge */}
            <AnimatePresence>
              {showLabel && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 flex justify-center"
                >
                  <motion.span
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 0.5, repeat: 1 }}
                    className="px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-[8px] font-bold text-cyan-400"
                  >
                    STACK ANALYSIS
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {phase === 'idle' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl">⚙️</span>
        </div>
      )}
    </motion.div>
  )
})

export default TiaMockupAnimated
