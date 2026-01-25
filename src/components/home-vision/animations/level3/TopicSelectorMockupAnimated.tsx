// =============================================================================
// TOPIC SELECTOR MOCKUP ANIMATED - Level 3 Feature
// Topic bubbles float in + selection + confirmation
// Timeline: ~6s (plays once on viewport entry, settles on final state)
// =============================================================================

import { motion, AnimatePresence, useInView } from 'framer-motion'
import { memo, useEffect, useState, useRef, useCallback } from 'react'
import { Check, Plus } from 'lucide-react'
import { MiniNumberTicker } from '../primitives/MiniNumberTicker'

type Phase = 'idle' | 'bubbles' | 'select' | 'confirm' | 'update' | 'pause'

const ORG_TOPICS = [
  { label: 'Industry trends', checked: true },
  { label: 'Competitor strategies', checked: true },
  { label: 'Market regulations', checked: true },
  { label: 'New technologies', checked: false },
]

const PERSONAL_TOPICS = [
  { label: 'AI/ML fundamentals', checked: true },
  { label: 'Product management', checked: true },
  { label: 'Leadership skills', checked: false },
  { label: 'Data analysis', checked: true },
]

export const TopicSelectorMockupAnimated = memo(function TopicSelectorMockupAnimated() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [phase, setPhase] = useState<Phase>('idle')
  const [hasPlayed, setHasPlayed] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [topicCount, setTopicCount] = useState(12)

  const resetAnimation = useCallback(() => {
    setTopicCount(12)
    setPhase('idle')
    setHasPlayed(false)
  }, [])

  useEffect(() => {
    if (!isInView && !isHovering) return
    if (hasPlayed && !isHovering) return

    const phases: { phase: Phase; duration: number }[] = [
      { phase: 'bubbles', duration: 2000 },
      { phase: 'select', duration: 1000 },
      { phase: 'confirm', duration: 1000 },
      { phase: 'update', duration: 1500 },
      { phase: 'pause', duration: 500 },
    ]

    if (phase === 'idle') {
      setTopicCount(12)
      const timer = setTimeout(() => setPhase('bubbles'), 300)
      return () => clearTimeout(timer)
    }

    if (phase === 'update') {
      setTopicCount(13)
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

  const showContent = phase !== 'idle'
  const isSelecting = ['select', 'confirm', 'update', 'pause'].includes(phase)
  const showConfirm = ['confirm', 'update', 'pause'].includes(phase)
  const showUpdate = ['update', 'pause'].includes(phase)

  return (
    <motion.div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-4xl mx-auto card-glass p-8 rounded-3xl border border-[var(--glass-bg-elevated)] overflow-hidden relative cursor-pointer"
    >
      {/* Top glow line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"
      />

      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400 mb-2">
          SETUP YOUR ENGINE
        </p>
        <h4 className="text-2xl font-bold text-[var(--mockup-text)]">CHOOSE YOUR LEARNING DOMAINS</h4>
        <AnimatePresence>
          {showUpdate && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-emerald-400"
            >
              <MiniNumberTicker value={topicCount} duration={0.5} /> topics selected
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Organization Topics */}
        <div className="flex-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={showContent ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <span className="text-xl">🏢</span>
            </div>
            <div>
              <p className="font-bold text-[var(--mockup-text)] italic tracking-tight">ORGANIZATION TOPICS</p>
              <p className="text-[10px] text-[var(--mockup-text-muted)] uppercase tracking-widest leading-none">
                Company-wide learning
              </p>
            </div>
          </motion.div>

          <div className="space-y-3 pl-2">
            {ORG_TOPICS.map((topic, i) => (
              <motion.div
                key={topic.label}
                initial={{ opacity: 0, x: -20 }}
                animate={showContent ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 25,
                  delay: i * 0.1,
                }}
                className="flex items-center gap-3 group cursor-pointer"
              >
                <div className={`w-5 h-5 rounded border ${topic.checked ? 'bg-emerald-500 border-emerald-500' : 'border-[var(--border-default)]'} flex items-center justify-center transition-all`}>
                  {topic.checked && <Check className="w-3 h-3 text-black" />}
                </div>
                <span className={`text-sm ${topic.checked ? 'text-[var(--mockup-text)]' : 'text-[var(--mockup-text-muted)]'}`}>
                  {topic.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block w-px bg-gradient-to-b from-transparent via-[var(--glass-bg-elevated)] to-transparent" />

        {/* Personal Topics */}
        <div className="flex-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={showContent ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <span className="text-xl">👤</span>
            </div>
            <div>
              <p className="font-bold text-[var(--mockup-text)] italic tracking-tight">PERSONAL TOPICS</p>
              <p className="text-[10px] text-[var(--mockup-text-muted)] uppercase tracking-widest leading-none">
                Your individual growth
              </p>
            </div>
          </motion.div>

          <div className="space-y-3 pl-2">
            {PERSONAL_TOPICS.map((topic, i) => {
              const isSelected = isSelecting && i === 0 && !topic.checked
              const isJustSelected = showConfirm && i === 0

              return (
                <motion.div
                  key={topic.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={showContent ? {
                    opacity: 1,
                    x: 0,
                    scale: isSelected ? 1.05 : 1,
                  } : { opacity: 0, x: 20 }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 25,
                    delay: i * 0.1,
                  }}
                  className={`flex items-center gap-3 relative ${isSelected ? 'z-10' : ''}`}
                >
                  <motion.div
                    animate={isSelected ? {
                      boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
                    } : { boxShadow: '0 0 0px transparent' }}
                    className={`w-5 h-5 rounded border ${
                      topic.checked || isJustSelected
                        ? 'bg-blue-500 border-blue-500'
                        : isSelected
                        ? 'border-blue-500/50 bg-blue-500/20'
                        : 'border-[var(--border-default)]'
                    } flex items-center justify-center transition-all`}
                  >
                    {(topic.checked || isJustSelected) && <Check className="w-3 h-3 text-black" />}
                  </motion.div>
                  <span className={`text-sm ${
                    topic.checked || isJustSelected ? 'text-[var(--mockup-text)]' : 'text-[var(--mockup-text-muted)]'
                  }`}>
                    {topic.label}
                  </span>

                  <AnimatePresence>
                    {isJustSelected && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8, x: 10 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="ml-2 text-[9px] font-bold text-emerald-400"
                      >
                        ✓ Added!
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}

            <motion.button
              initial={{ opacity: 0 }}
              animate={showContent ? { opacity: 1 } : { opacity: 0 }}
              className="flex items-center gap-2 text-xs text-blue-400/60 pt-2 hover:text-blue-400"
            >
              <Plus className="w-4 h-4" /> Add topic
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
})

export default TopicSelectorMockupAnimated
