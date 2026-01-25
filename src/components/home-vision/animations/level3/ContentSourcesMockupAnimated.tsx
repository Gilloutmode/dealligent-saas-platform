// =============================================================================
// CONTENT SOURCES MOCKUP ANIMATED - Level 3 Feature
// Source logos appear + content flow + digest build + badge pulse
// Timeline: ~8s (plays once on viewport entry, settles on final state)
// =============================================================================

import { motion, AnimatePresence, useInView } from 'framer-motion'
import { memo, useEffect, useState, useRef, useCallback } from 'react'

type Phase = 'idle' | 'sources' | 'flow' | 'digest' | 'badge' | 'pause'

const SOURCES = [
  { icon: '📺', label: 'YouTube', sub: 'Video transcript analysis', color: '#FF0000' },
  { icon: '🗣️', label: 'Reddit', sub: 'Community pattern detection', color: '#FF4500' },
  { icon: '💼', label: 'LinkedIn', sub: 'Thought leadership scraping', color: '#0A66C2' },
  { icon: '📰', label: 'News', sub: 'Tech publications monitoring', color: '#6366f1' },
  { icon: '🎙️', label: 'Podcasts', sub: 'Industry episode deep-dives', color: '#8b5cf6' },
  { icon: '📚', label: 'Articles', sub: 'Strategic insights extraction', color: '#10b981' },
]

export const ContentSourcesMockupAnimated = memo(function ContentSourcesMockupAnimated() {
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
      { phase: 'sources', duration: 2000 },
      { phase: 'flow', duration: 2000 },
      { phase: 'digest', duration: 2000 },
      { phase: 'badge', duration: 1500 },
      { phase: 'pause', duration: 500 },
    ]

    if (phase === 'idle') {
      const timer = setTimeout(() => setPhase('sources'), 300)
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

  const showSources = phase !== 'idle'
  const showFlow = ['flow', 'digest', 'badge', 'pause'].includes(phase)
  const showDigest = ['digest', 'badge', 'pause'].includes(phase)
  const showBadge = ['badge', 'pause'].includes(phase)

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full max-w-5xl mx-auto py-12 cursor-pointer"
    >
      {/* Header */}
      <div className="text-center mb-16">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={showSources ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          className="text-xs font-black uppercase tracking-[0.5em] text-[var(--mockup-text-muted)] mb-4"
        >
          DATA ECOSYSTEM
        </motion.p>
        <motion.h4
          initial={{ opacity: 0 }}
          animate={showSources ? { opacity: 1 } : { opacity: 0 }}
          className="text-3xl font-bold text-[var(--mockup-text)]"
        >
          WE DIGEST CONTENT FROM
        </motion.h4>
      </div>

      {/* Sources Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
        {SOURCES.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={showSources ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 25,
              delay: i * 0.1,
            }}
            className="flex flex-col items-center relative"
          >
            <motion.div
              animate={showFlow ? {
                boxShadow: `0 0 20px ${s.color}40`,
              } : { boxShadow: '0 0 0px transparent' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="w-16 h-16 rounded-3xl bg-[var(--glass-bg)] border border-[var(--glass-bg-elevated)] flex items-center justify-center text-2xl mb-4 hover:scale-110 hover:border-emerald-500/30 transition-all cursor-default"
            >
              {s.icon}
            </motion.div>
            <p className="text-sm font-bold text-[var(--mockup-text)] mb-1">{s.label}</p>
            <p className="text-[10px] text-[var(--mockup-text-muted)] text-center uppercase tracking-tighter">{s.sub}</p>

            {/* Flow particles - limited repetitions instead of infinite */}
            <AnimatePresence>
              {showFlow && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5],
                    y: [0, 40, 80],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.15,
                    repeat: 1,
                    ease: 'easeOut',
                  }}
                  className="absolute top-16 w-2 h-2 rounded-full"
                  style={{ backgroundColor: s.color }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Connection visualization */}
      <div className="mt-16 h-32 relative overflow-hidden flex flex-col items-center justify-center">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={showSources ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />

        <motion.div
          initial={{ scaleY: 0 }}
          animate={showFlow ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.5 }}
          className="w-[1px] h-12 bg-gradient-to-b from-white/10 to-transparent"
        />

        {/* Digest Card */}
        <AnimatePresence>
          {showDigest && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="mt-4 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center"
            >
              <div className="flex items-center gap-3 justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: 2, ease: 'linear' }}
                  className="w-6 h-6 rounded-full border-2 border-emerald-500/30 border-t-emerald-500"
                />
                <span className="text-[10px] font-black text-emerald-400 tracking-widest uppercase">
                  DIGEST ENGINE ACTIVE
                </span>
              </div>

              <AnimatePresence>
                {showBadge && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      scale: { duration: 0.5, repeat: 2, repeatDelay: 0.5 }
                    }}
                    className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-[9px] font-bold text-blue-400"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    5 new insights today
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
})

export default ContentSourcesMockupAnimated
