// =============================================================================
// TRACEABILITY MOCKUP ANIMATED V2 - Level 1 Feature
// Shows AI response with visual links to source documents + confidence scores
// Demonstrates: "Every claim is traced to its source"
// Timeline: ~6s (plays once on viewport entry, hover to replay)
// =============================================================================

import { motion, AnimatePresence, useInView } from 'framer-motion'
import { memo, useEffect, useState, useRef, useCallback } from 'react'
import { MiniNumberTicker } from '../primitives/MiniNumberTicker'

type Phase = 'idle' | 'response' | 'highlights' | 'connections' | 'sources' | 'verified' | 'pulse' | 'complete'

const PHASES: { phase: Phase; duration: number }[] = [
  { phase: 'response', duration: 1000 },
  { phase: 'highlights', duration: 800 },
  { phase: 'connections', duration: 500 },
  { phase: 'sources', duration: 1000 },
  { phase: 'verified', duration: 1000 },
  { phase: 'pulse', duration: 1500 },
  { phase: 'complete', duration: 500 },
]

// Response with highlights
const RESPONSE = {
  before: "Acme's SLA guarantees ",
  highlight1: '99.9% uptime',
  middle: ' with ',
  highlight2: 'priority support',
  after: ' response within 4 hours.',
}

// Sources linked to highlights
const SOURCES = [
  {
    id: 1,
    name: 'contract_v2.pdf',
    icon: '\uD83D\uDCC4',
    confidence: 94,
    page: 'Page 14',
    linkedHighlight: 1,
    color: 'blue',
  },
  {
    id: 2,
    name: 'support_sla.docx',
    icon: '\uD83D\uDCCB',
    confidence: 87,
    page: 'Section 3.2',
    linkedHighlight: 2,
    color: 'emerald',
  },
]

/**
 * Traceability Mockup V2 - Visual Source Links
 * Shows how each part of an AI response is traced to its source
 */
export const TraceabilityMockupAnimated = memo(function TraceabilityMockupAnimated() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [phase, setPhase] = useState<Phase>('idle')
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [hasPlayed, setHasPlayed] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const resetAnimation = useCallback(() => {
    setPhase('idle')
    setPhaseIndex(0)
    setHasPlayed(false)
  }, [])

  useEffect(() => {
    if (!isInView && !isHovering) return
    if (hasPlayed && !isHovering) return

    if (phase === 'idle') {
      const timer = setTimeout(() => {
        setPhaseIndex(0)
        setPhase(PHASES[0].phase)
      }, 300)
      return () => clearTimeout(timer)
    }

    const currentPhase = PHASES[phaseIndex]
    if (!currentPhase) return

    const timer = setTimeout(() => {
      const nextIndex = phaseIndex + 1
      if (nextIndex >= PHASES.length) {
        setHasPlayed(true)
        return
      }
      setPhaseIndex(nextIndex)
      setPhase(PHASES[nextIndex].phase)
    }, currentPhase.duration)

    return () => clearTimeout(timer)
  }, [phase, phaseIndex, isInView, hasPlayed, isHovering])

  const handleMouseEnter = () => {
    if (hasPlayed) {
      setIsHovering(true)
      resetAnimation()
    }
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  // Phase visibility helpers
  const showResponse = phase !== 'idle'
  const showHighlights = ['highlights', 'connections', 'sources', 'verified', 'pulse', 'complete'].includes(phase)
  const showConnections = ['connections', 'sources', 'verified', 'pulse', 'complete'].includes(phase)
  const showSources = ['sources', 'verified', 'pulse', 'complete'].includes(phase)
  const showVerified = ['verified', 'pulse', 'complete'].includes(phase)
  // isPulsing is only true during the pulse phase, not after completion
  const isPulsing = phase === 'pulse' && !hasPlayed

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full aspect-[16/10] rounded-xl bg-[var(--mockup-bg)] border border-[var(--mockup-border)] p-4 overflow-hidden flex flex-col relative cursor-pointer"
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-emerald-500/5 pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-2 mb-3 relative z-10">
        <motion.div
          animate={showResponse ? { scale: [1, 1.2, 1] } : undefined}
          transition={{ duration: 0.3 }}
          className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500"
        />
        <p className="text-[8px] font-black uppercase tracking-wider text-[var(--text-muted)]">
          DEALLIGENT RESPONSE
        </p>
        <div className="flex-1" />
        <AnimatePresence>
          {showVerified && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 400 }}
                className="text-[8px] text-emerald-400"
              >
                \u2713
              </motion.span>
              <span className="text-[7px] font-bold text-emerald-400 uppercase">Verified</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-center gap-4 relative z-10">
        {/* AI Response Card */}
        <AnimatePresence>
          {showResponse && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="relative"
            >
              <div className="p-3 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-bg-elevated)] shadow-xl">
                <p className="text-[7px] font-bold text-blue-400 uppercase mb-1.5 flex items-center gap-1">
                  <span>\uD83E\uDD16</span> AI Response
                </p>
                <p className="text-[9px] text-[var(--text-primary)] leading-relaxed">
                  "{RESPONSE.before}
                  <HighlightedText
                    text={RESPONSE.highlight1}
                    color="blue"
                    isActive={showHighlights}
                    isPulsing={isPulsing}
                    id="highlight-1"
                  />
                  {RESPONSE.middle}
                  <HighlightedText
                    text={RESPONSE.highlight2}
                    color="emerald"
                    isActive={showHighlights}
                    isPulsing={isPulsing}
                    id="highlight-2"
                  />
                  {RESPONSE.after}"
                </p>
              </div>

              {/* Connection Lines */}
              <AnimatePresence>
                {showConnections && (
                  <ConnectionLines isPulsing={isPulsing} />
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Source Cards */}
        <AnimatePresence>
          {showSources && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center gap-3 mt-2"
            >
              {SOURCES.map((source, idx) => (
                <SourceCard
                  key={source.id}
                  source={source}
                  index={idx}
                  showVerified={showVerified}
                  isPulsing={isPulsing}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Legend */}
      <AnimatePresence>
        {showVerified && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-auto pt-2 border-t border-[var(--border-light)] flex justify-between items-center relative z-10"
          >
            <p className="text-[7px] text-[var(--text-muted)] italic">
              Every claim linked to source
            </p>
            <div className="flex items-center gap-2">
              <span className="text-[6px] text-blue-400 font-bold flex items-center gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                Uptime SLA
              </span>
              <span className="text-[6px] text-emerald-400 font-bold flex items-center gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Support SLA
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

// =============================================================================
// SUBCOMPONENTS
// =============================================================================

interface HighlightedTextProps {
  text: string
  color: 'blue' | 'emerald'
  isActive: boolean
  isPulsing: boolean
  id: string
}

const HighlightedText = memo(function HighlightedText({
  text,
  color,
  isActive,
  isPulsing,
}: HighlightedTextProps) {
  const bgColor = color === 'blue' ? 'rgba(59, 130, 246, 0.4)' : 'rgba(16, 185, 129, 0.4)'
  const glowColor = color === 'blue' ? 'rgba(59, 130, 246, 0.6)' : 'rgba(16, 185, 129, 0.6)'
  const textColor = color === 'blue' ? '#60a5fa' : '#34d399'

  return (
    <motion.mark
      initial={{ backgroundColor: 'transparent', color: 'rgba(255,255,255,0.7)' }}
      animate={
        isActive
          ? {
              backgroundColor: bgColor,
              color: textColor,
              boxShadow: isPulsing
                ? [`0 0 0 ${glowColor}`, `0 0 8px ${glowColor}`, `0 0 0 ${glowColor}`]
                : `0 0 4px ${glowColor}`,
            }
          : undefined
      }
      transition={{
        duration: isPulsing ? 1.5 : 0.3,
        repeat: isPulsing ? 2 : 0,
        ease: 'easeInOut',
      }}
      className="px-1 py-0.5 rounded-sm font-semibold"
    >
      {text}
    </motion.mark>
  )
})

interface ConnectionLinesProps {
  isPulsing: boolean
}

const ConnectionLines = memo(function ConnectionLines({ isPulsing }: ConnectionLinesProps) {
  return (
    <svg
      className="absolute left-0 right-0 top-full pointer-events-none"
      style={{ height: '24px', overflow: 'visible' }}
    >
      {/* Line from highlight 1 (blue) to source 1 */}
      <motion.path
        d="M 25% 0 L 25% 12 L 35% 24"
        fill="none"
        stroke="rgba(59, 130, 246, 0.5)"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: 1,
          opacity: isPulsing ? [0.5, 1, 0.5] : 1,
        }}
        transition={{
          pathLength: { duration: 0.4, ease: 'easeOut' },
          opacity: isPulsing
            ? { duration: 1.5, repeat: 2, ease: 'easeInOut' }
            : { duration: 0.2 },
        }}
      />
      {/* Dot at connection point 1 */}
      <motion.circle
        cx="35%"
        cy="24"
        r="2"
        fill="#3b82f6"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 400 }}
      />

      {/* Line from highlight 2 (emerald) to source 2 */}
      <motion.path
        d="M 65% 0 L 65% 12 L 65% 24"
        fill="none"
        stroke="rgba(16, 185, 129, 0.5)"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: 1,
          opacity: isPulsing ? [0.5, 1, 0.5] : 1,
        }}
        transition={{
          pathLength: { duration: 0.4, ease: 'easeOut', delay: 0.1 },
          opacity: isPulsing
            ? { duration: 1.5, repeat: 2, ease: 'easeInOut' }
            : { duration: 0.2 },
        }}
      />
      {/* Dot at connection point 2 */}
      <motion.circle
        cx="65%"
        cy="24"
        r="2"
        fill="#10b981"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 400 }}
      />
    </svg>
  )
})

interface SourceCardProps {
  source: (typeof SOURCES)[number]
  index: number
  showVerified: boolean
  isPulsing: boolean
}

const SourceCard = memo(function SourceCard({
  source,
  index,
  showVerified,
  isPulsing,
}: SourceCardProps) {
  const borderColor =
    source.color === 'blue' ? 'border-blue-500/40' : 'border-emerald-500/40'
  const glowColor =
    source.color === 'blue' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(16, 185, 129, 0.3)'
  const textColor = source.color === 'blue' ? 'text-blue-400' : 'text-emerald-400'
  const bgColor =
    source.color === 'blue' ? 'bg-blue-500/10' : 'bg-emerald-500/10'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        boxShadow: isPulsing
          ? [`0 0 0 ${glowColor}`, `0 0 12px ${glowColor}`, `0 0 0 ${glowColor}`]
          : `0 0 8px ${glowColor}`,
      }}
      transition={{
        opacity: { delay: index * 0.15 },
        y: { delay: index * 0.15, type: 'spring', stiffness: 400, damping: 25 },
        scale: { delay: index * 0.15 },
        boxShadow: isPulsing
          ? { duration: 1.5, repeat: 2, ease: 'easeInOut' }
          : { duration: 0.3 },
      }}
      className={`
        flex-1 max-w-[140px] p-2 rounded-lg
        ${bgColor} border ${borderColor}
        backdrop-blur-sm
      `}
    >
      {/* Source Header */}
      <div className="flex items-center gap-1.5 mb-1.5">
        <span className="text-sm">{source.icon}</span>
        <p className={`text-[8px] font-bold ${textColor} truncate`}>{source.name}</p>
      </div>

      {/* Page Reference */}
      <p className="text-[7px] text-[var(--text-muted)] mb-2">{source.page}</p>

      {/* Confidence + Verified */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className={`text-[9px] font-black ${textColor}`}>
            <MiniNumberTicker value={source.confidence} suffix="%" delay={index * 0.15 + 0.3} duration={0.8} />
          </span>
          <span className="text-[6px] text-[var(--text-muted)] uppercase">conf</span>
        </div>

        <AnimatePresence>
          {showVerified && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 400 }}
              className={`flex items-center gap-0.5 px-1 py-0.5 rounded ${bgColor}`}
            >
              <span className={`text-[8px] ${textColor}`}>\u2713</span>
              <span className={`text-[6px] font-bold ${textColor}`}>OK</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
})

export default TraceabilityMockupAnimated
