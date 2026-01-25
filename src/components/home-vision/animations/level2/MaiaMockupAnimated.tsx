// =============================================================================
// MAIA MOCKUP ANIMATED - Marketing Agent Interface
// Content carousel with GTM flow arrows
// Timeline: ~5s (plays once on viewport entry, settles on final state)
// =============================================================================

import { motion, AnimatePresence, useInView } from 'framer-motion'
import { memo, useEffect, useState, useRef, useCallback } from 'react'

type Phase = 'idle' | 'container' | 'cards' | 'arrows' | 'badge' | 'pause'

const CONTENT_ITEMS = [
  { type: 'Blog', icon: '📝', title: 'SEO Article' },
  { type: 'Social', icon: '💼', title: 'LinkedIn Post' },
  { type: 'Case', icon: '📊', title: 'Case Study' },
]

export const MaiaMockupAnimated = memo(function MaiaMockupAnimated() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [phase, setPhase] = useState<Phase>('idle')
  const [hasPlayed, setHasPlayed] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const resetAnimation = useCallback(() => {
    setActiveIndex(0)
    setPhase('idle')
    setHasPlayed(false)
  }, [])

  useEffect(() => {
    if (!isInView && !isHovering) return
    if (hasPlayed && !isHovering) return

    const phases: { phase: Phase; duration: number }[] = [
      { phase: 'container', duration: 500 },
      { phase: 'cards', duration: 1500 },
      { phase: 'arrows', duration: 1500 },
      { phase: 'badge', duration: 1000 },
      { phase: 'pause', duration: 500 },
    ]

    if (phase === 'idle') {
      setActiveIndex(0)
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

  // Rotate cards during cards phase
  useEffect(() => {
    if (phase !== 'cards') return

    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % CONTENT_ITEMS.length)
    }, 500)

    return () => clearInterval(interval)
  }, [phase])

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
  const showCards = ['cards', 'arrows', 'badge', 'pause'].includes(phase)
  const showArrows = ['arrows', 'badge', 'pause'].includes(phase)
  const showBadge = ['badge', 'pause'].includes(phase)

  return (
    <motion.div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full h-44 rounded-xl overflow-hidden relative cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-rose-500/5 to-transparent" />

      <AnimatePresence mode="wait">
        {showContainer && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 p-4 border border-pink-500/20 rounded-xl bg-[var(--mockup-bg)]/90 backdrop-blur-sm"
          >
            {/* Header */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded-lg bg-pink-500/20 flex items-center justify-center">
                <span className="text-xs">📢</span>
              </div>
              <p className="text-[9px] font-black uppercase tracking-wider text-pink-400">
                CONTENT PIPELINE
              </p>
            </div>

            {/* Content Cards Carousel */}
            <div className="flex justify-center gap-2 mb-3">
              {CONTENT_ITEMS.map((item, i) => {
                const isActive = i === activeIndex

                return (
                  <motion.div
                    key={item.type}
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={showCards ? {
                      opacity: 1,
                      y: 0,
                      scale: isActive ? 1.1 : 0.9,
                      borderColor: isActive ? 'rgba(236, 72, 153, 0.5)' : 'rgba(255,255,255,0.1)',
                    } : { opacity: 0, y: 20, scale: 0.8 }}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 25,
                      delay: i * 0.1,
                    }}
                    className={`p-3 rounded-xl border bg-[var(--glass-bg)] text-center transition-all ${
                      isActive ? 'border-pink-500/50' : 'border-[var(--glass-bg-elevated)]'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <p className="text-[8px] text-[var(--text-secondary)] mt-1">{item.title}</p>
                  </motion.div>
                )
              })}
            </div>

            {/* GTM Flow */}
            <div className="flex items-center justify-center gap-2">
              {['Research', 'Create', 'Publish'].map((step, i) => (
                <motion.div key={step} className="flex items-center">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={showArrows ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="text-[9px] text-[var(--text-muted)]"
                  >
                    {step}
                  </motion.span>
                  {i < 2 && (
                    <motion.span
                      initial={{ opacity: 0, x: -5 }}
                      animate={showArrows ? { opacity: 1, x: 0 } : { opacity: 0, x: -5 }}
                      transition={{ delay: i * 0.2 + 0.1 }}
                      className="mx-2 text-pink-400/60"
                    >
                      →
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Campaign Badge */}
            <AnimatePresence>
              {showBadge && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-3 flex justify-center"
                >
                  <motion.span
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 0.5, repeat: 1 }}
                    className="px-2 py-0.5 rounded-full bg-pink-500/20 border border-pink-500/30 text-[8px] font-bold text-pink-400"
                  >
                    CAMPAIGN ANALYSIS
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {phase === 'idle' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="text-4xl"
          >
            📢
          </motion.span>
        </div>
      )}
    </motion.div>
  )
})

export default MaiaMockupAnimated
