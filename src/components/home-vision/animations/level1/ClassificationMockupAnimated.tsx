// =============================================================================
// CLASSIFICATION MOCKUP ANIMATED V3.2 - DOCUMENT FLIES TO CATEGORY
// Document drops → AI analyzes → Document flies to category → Category highlighted
// Timeline: ~4.0s (plays once on viewport entry, hover to replay)
// =============================================================================

import { motion, AnimatePresence, useInView } from 'framer-motion'
import { memo, useEffect, useState, useRef, useCallback } from 'react'

type Phase = 'idle' | 'drop' | 'analyze' | 'fly' | 'reveal' | 'complete'

interface Category {
  id: string
  label: string
  icon: string
  color: string
  bgClass: string
  borderClass: string
  textClass: string
}

const CATEGORIES: Category[] = [
  {
    id: 'client',
    label: 'Client Case',
    icon: '👤',
    color: '#3b82f6',
    bgClass: 'bg-blue-500/15',
    borderClass: 'border-blue-500/40',
    textClass: 'text-blue-400',
  },
  {
    id: 'support',
    label: 'Support Case',
    icon: '🔧',
    color: '#10b981',
    bgClass: 'bg-emerald-500/15',
    borderClass: 'border-emerald-500/40',
    textClass: 'text-emerald-400',
  },
  {
    id: 'product',
    label: 'Product Case',
    icon: '📦',
    color: '#a855f7',
    bgClass: 'bg-purple-500/15',
    borderClass: 'border-purple-500/40',
    textClass: 'text-purple-400',
  },
  {
    id: 'meetings',
    label: 'Meetings',
    icon: '📅',
    color: '#f97316',
    bgClass: 'bg-orange-500/15',
    borderClass: 'border-orange-500/40',
    textClass: 'text-orange-400',
  },
]

// The category that will be "matched" - Client Case (index 0)
const MATCHED_INDEX = 0

// Simple pulsing dot loader
const AnalyzingLoader = memo(function AnalyzingLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center gap-2"
    >
      {/* Three pulsing dots */}
      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: 'easeInOut',
            }}
            className="w-2 h-2 rounded-full bg-cyan-400"
          />
        ))}
      </div>
      <motion.span
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="text-[10px] font-medium text-cyan-400"
      >
        Analyzing...
      </motion.span>
    </motion.div>
  )
})

// Flying document card - animates from center to target category
const FlyingDocument = memo(function FlyingDocument({
  phase,
  onFlightComplete,
}: {
  phase: Phase
  onFlightComplete: () => void
}) {
  const isFlying = phase === 'fly'
  const showDoc = ['drop', 'analyze', 'fly'].includes(phase)
  const isComplete = phase === 'complete'

  useEffect(() => {
    if (isFlying) {
      const timer = setTimeout(() => {
        onFlightComplete()
      }, 700) // Flight duration
      return () => clearTimeout(timer)
    }
  }, [isFlying, onFlightComplete])

  if (!showDoc) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -30, scale: 0.9 }}
      animate={
        isFlying
          ? {
              // Fly toward Client Case (bottom-left)
              x: -80,
              y: 100,
              scale: 0.4,
              opacity: 0,
            }
          : {
              opacity: 1,
              y: 0,
              scale: 1,
              x: 0,
            }
      }
      transition={
        isFlying
          ? {
              duration: 0.7,
              ease: [0.4, 0, 0.2, 1], // Custom easing for smooth arc
            }
          : {
              type: 'spring',
              stiffness: 300,
              damping: 25,
            }
      }
      className="relative z-30"
    >
      <motion.div
        animate={{
          boxShadow: isComplete
            ? '0 4px 20px rgba(16, 185, 129, 0.25)'
            : isFlying
              ? '0 8px 30px rgba(59, 130, 246, 0.4)'
              : '0 4px 15px rgba(0, 0, 0, 0.1)',
        }}
        className="px-4 py-2.5 rounded-lg bg-[var(--glass-bg-elevated)] border border-[var(--glass-border)] backdrop-blur-sm"
      >
        <div className="flex items-center gap-2">
          <span className="text-base">📄</span>
          <span className="text-[11px] text-[var(--text-secondary)] font-medium">
            contract_v2.pdf
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
})

// Category card - simple rounded rectangle
const CategoryCard = memo(function CategoryCard({
  category,
  index,
  isVisible,
  isMatched,
  showDocIcon,
}: {
  category: Category
  index: number
  isVisible: boolean
  isMatched: boolean
  showDocIcon: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.9 }}
      animate={
        isVisible
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 15, scale: 0.9 }
      }
      transition={{
        type: 'spring',
        stiffness: 350,
        damping: 25,
        delay: index * 0.08,
      }}
      className="relative"
    >
      {/* Highlight glow for matched card */}
      <AnimatePresence>
        {isMatched && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              boxShadow: `0 0 20px ${category.color}50, 0 0 40px ${category.color}30`,
            }}
            className="absolute inset-0 rounded-lg"
          />
        )}
      </AnimatePresence>

      <motion.div
        animate={
          isMatched
            ? {
                scale: [1, 1.05, 1],
                borderColor: category.color,
              }
            : {}
        }
        transition={{ duration: 0.4 }}
        className={`
          relative p-2.5 rounded-lg border-2 backdrop-blur-sm
          ${category.bgClass}
          ${isMatched ? '' : category.borderClass}
          ${isMatched ? 'border-2' : 'border'}
        `}
        style={isMatched ? { borderColor: category.color } : {}}
      >
        <div className="flex flex-col items-center gap-1">
          <span className="text-lg">{category.icon}</span>
          <p className={`text-[9px] font-semibold ${category.textClass}`}>
            {category.label}
          </p>

          {/* Document icon inside matched card */}
          <AnimatePresence>
            {showDocIcon && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 20,
                }}
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[var(--glass-bg-elevated)] border border-blue-400/50 flex items-center justify-center shadow-lg"
              >
                <span className="text-[8px]">📄</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Matched checkmark */}
          <AnimatePresence>
            {isMatched && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, delay: 0.15 }}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg"
              >
                <span className="text-[10px] text-white font-bold">✓</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
})

// Result badge showing the classification
const ResultBadge = memo(function ResultBadge({
  isVisible,
  category,
}: {
  isVisible: boolean
  category: Category
}) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="flex items-center gap-2"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-[10px] text-[var(--text-muted)]"
          >
            →
          </motion.span>
          <motion.div
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className={`
              flex items-center gap-1.5 px-2.5 py-1 rounded-full
              ${category.bgClass} border ${category.borderClass}
            `}
          >
            <span className="text-xs">{category.icon}</span>
            <span className={`text-[10px] font-semibold ${category.textClass}`}>
              {category.label}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
})

export const ClassificationMockupAnimated = memo(
  function ClassificationMockupAnimated() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-50px' })
    const [phase, setPhase] = useState<Phase>('idle')
    const [hasPlayed, setHasPlayed] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const [docLanded, setDocLanded] = useState(false)

    const resetAnimation = useCallback(() => {
      setPhase('idle')
      setHasPlayed(false)
      setDocLanded(false)
    }, [])

    const handleFlightComplete = useCallback(() => {
      setDocLanded(true)
    }, [])

    useEffect(() => {
      if (!isInView && !isHovering) return
      if (hasPlayed && !isHovering) return

      const phases: { phase: Phase; duration: number }[] = [
        { phase: 'drop', duration: 600 },
        { phase: 'analyze', duration: 1200 },
        { phase: 'fly', duration: 800 },
        { phase: 'reveal', duration: 600 },
        { phase: 'complete', duration: 400 },
      ]

      if (phase === 'idle') {
        const timer = setTimeout(() => setPhase('drop'), 150)
        return () => clearTimeout(timer)
      }

      const currentIndex = phases.findIndex((p) => p.phase === phase)
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

    // Phase-based visibility
    const showDoc = ['drop', 'analyze', 'fly'].includes(phase)
    const isAnalyzing = phase === 'analyze'
    const showCategories = ['fly', 'reveal', 'complete'].includes(phase)
    const showComplete = phase === 'complete'

    const matchedCategory = CATEGORIES[MATCHED_INDEX]

    return (
      <div
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-full aspect-[16/10] rounded-xl bg-[var(--mockup-bg)] border border-[var(--mockup-border)] p-4 flex flex-col relative overflow-hidden cursor-pointer"
      >
        {/* Subtle background gradient */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
          }}
        />

        {/* Main content - vertically stacked */}
        <div className="flex-1 flex flex-col items-center justify-between py-2 relative z-10">
          {/* Top: Document */}
          <div className="flex flex-col items-center gap-3">
            <AnimatePresence>
              {showDoc && (
                <FlyingDocument
                  phase={phase}
                  onFlightComplete={handleFlightComplete}
                />
              )}
            </AnimatePresence>

            {/* Analyzing indicator */}
            <div className="h-10 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {isAnalyzing && <AnalyzingLoader />}
              </AnimatePresence>
            </div>
          </div>

          {/* Middle: Down arrow when revealing */}
          <AnimatePresence>
            {showCategories && !showDoc && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 0.5, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-[var(--text-muted)] text-lg"
              >
                ↓
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom: Category cards in 2x2 grid - moves up to center when complete */}
          <motion.div
            className="w-full"
            animate={{
              y: showComplete ? -80 : 0,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25,
            }}
          >
            <div className="grid grid-cols-4 gap-2">
              {CATEGORIES.map((cat, i) => (
                <CategoryCard
                  key={cat.id}
                  category={cat}
                  index={i}
                  isVisible={showCategories}
                  isMatched={showComplete && i === MATCHED_INDEX}
                  showDocIcon={
                    (docLanded || showComplete) && i === MATCHED_INDEX
                  }
                />
              ))}
            </div>

            {/* Result badge */}
            <div className="flex justify-center mt-3 h-6">
              <ResultBadge isVisible={showComplete} category={matchedCategory} />
            </div>
          </motion.div>
        </div>
      </div>
    )
  }
)

export default ClassificationMockupAnimated
