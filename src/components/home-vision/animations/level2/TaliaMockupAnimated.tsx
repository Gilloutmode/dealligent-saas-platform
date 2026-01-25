// =============================================================================
// TALIA MOCKUP ANIMATED - Talent Agent Interface
// Org chart with hiring pulse animation
// Timeline: ~5s (plays once on viewport entry, settles on final state)
// =============================================================================

import { motion, AnimatePresence, useInView } from 'framer-motion'
import { memo, useEffect, useState, useRef, useCallback } from 'react'

type Phase = 'idle' | 'container' | 'nodes' | 'pulse' | 'alert' | 'pause'

const ORG_NODES = [
  { id: 'ceo', name: 'CEO', level: 0, col: 1, hiring: false },
  { id: 'cto', name: 'CTO', level: 1, col: 0, hiring: true },
  { id: 'vpe', name: 'VP Eng', level: 1, col: 1, hiring: false },
  { id: 'cmo', name: 'CMO', level: 1, col: 2, hiring: false },
  { id: 'lead', name: 'Tech Lead', level: 2, col: 1, hiring: false, new: true },
]

export const TaliaMockupAnimated = memo(function TaliaMockupAnimated() {
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
      { phase: 'pulse', duration: 1500 },
      { phase: 'alert', duration: 1000 },
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
  const showNodes = ['nodes', 'pulse', 'alert', 'pause'].includes(phase)
  const showPulse = ['pulse', 'alert', 'pause'].includes(phase)
  const showAlert = ['alert', 'pause'].includes(phase)

  return (
    <motion.div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full h-44 rounded-xl overflow-hidden relative cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-violet-500/5 to-transparent" />

      <AnimatePresence mode="wait">
        {showContainer && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 p-4 border border-purple-500/20 rounded-xl bg-[var(--mockup-bg)]/90 backdrop-blur-sm"
          >
            {/* Header */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <span className="text-xs">👥</span>
              </div>
              <p className="text-[9px] font-black uppercase tracking-wider text-purple-400">
                ORG INTELLIGENCE
              </p>
            </div>

            {/* Org Chart */}
            <div className="relative h-24">
              {/* Level 0 - CEO */}
              <div className="flex justify-center mb-2">
                <OrgNode
                  node={ORG_NODES[0]}
                  show={showNodes}
                  pulse={false}
                  delay={0}
                />
              </div>

              {/* Connection lines */}
              <svg className="absolute inset-0 pointer-events-none" style={{ top: 20 }}>
                {showNodes && (
                  <>
                    <motion.line
                      x1="50%" y1="0" x2="20%" y2="30"
                      stroke="rgba(139, 92, 246, 0.3)"
                      strokeWidth="1"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    />
                    <motion.line
                      x1="50%" y1="0" x2="50%" y2="30"
                      stroke="rgba(139, 92, 246, 0.3)"
                      strokeWidth="1"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    />
                    <motion.line
                      x1="50%" y1="0" x2="80%" y2="30"
                      stroke="rgba(139, 92, 246, 0.3)"
                      strokeWidth="1"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    />
                  </>
                )}
              </svg>

              {/* Level 1 - Executives */}
              <div className="flex justify-between px-4 mb-2">
                <OrgNode
                  node={ORG_NODES[1]}
                  show={showNodes}
                  pulse={showPulse && ORG_NODES[1].hiring}
                  delay={0.2}
                />
                <OrgNode
                  node={ORG_NODES[2]}
                  show={showNodes}
                  pulse={false}
                  delay={0.3}
                />
                <OrgNode
                  node={ORG_NODES[3]}
                  show={showNodes}
                  pulse={false}
                  delay={0.4}
                />
              </div>

              {/* Level 2 - New Hire */}
              <div className="flex justify-center">
                <OrgNode
                  node={ORG_NODES[4]}
                  show={showNodes}
                  pulse={showPulse && Boolean(ORG_NODES[4].new)}
                  delay={0.5}
                  isNew
                />
              </div>
            </div>

            {/* Alert Badge */}
            <AnimatePresence>
              {showAlert && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 flex justify-center"
                >
                  <motion.span
                    animate={{
                      scale: [1, 1.05, 1],
                      boxShadow: [
                        '0 0 0px rgba(239, 68, 68, 0)',
                        '0 0 10px rgba(239, 68, 68, 0.5)',
                        '0 0 0px rgba(239, 68, 68, 0)',
                      ],
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="px-2 py-0.5 rounded-full bg-red-500/20 border border-red-500/30 text-[8px] font-bold text-red-400"
                  >
                    🔔 KEY HIRE DETECTED
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {phase === 'idle' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl">👥</span>
        </div>
      )}
    </motion.div>
  )
})

// Sub-component for org nodes
const OrgNode = memo(function OrgNode({
  node,
  show,
  pulse,
  delay,
  isNew = false,
}: {
  node: typeof ORG_NODES[0]
  show: boolean
  pulse: boolean
  delay: number
  isNew?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 25,
        delay,
      }}
      className="relative"
    >
      <motion.div
        animate={pulse ? {
          boxShadow: [
            '0 0 0px rgba(139, 92, 246, 0)',
            '0 0 15px rgba(139, 92, 246, 0.6)',
            '0 0 0px rgba(139, 92, 246, 0)',
          ],
        } : {}}
        transition={{ duration: 1.5, repeat: pulse ? Infinity : 0 }}
        className={`px-2 py-1 rounded-lg border text-center ${
          isNew
            ? 'border-emerald-500/50 bg-emerald-500/10'
            : node.hiring
            ? 'border-purple-500/50 bg-purple-500/10'
            : 'border-[var(--glass-bg-elevated)] bg-[var(--glass-bg)]'
        }`}
      >
        <span className={`text-[9px] font-bold ${
          isNew ? 'text-emerald-400' : node.hiring ? 'text-purple-400' : 'text-[var(--text-secondary)]'
        }`}>
          {node.name}
        </span>
        {node.hiring && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="ml-1 text-[7px] text-purple-400"
          >
            📢
          </motion.span>
        )}
        {isNew && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="ml-1 text-[7px] text-emerald-400"
          >
            NEW
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  )
})

export default TaliaMockupAnimated
