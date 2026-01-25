// =============================================================================
// MIA MOCKUP ANIMATED - Market Intelligence Agent
// 3-column layout: Sources -> Agent Processing -> Report Generation
// Timeline: ~5.5s (plays once on viewport entry, replay on hover)
// =============================================================================

import { motion, AnimatePresence, useInView } from 'framer-motion'
import { memo, useEffect, useState, useRef, useCallback } from 'react'
import { FileText, Download, TrendingUp, BarChart3, Globe, Newspaper, LineChart } from 'lucide-react'

type Phase = 'idle' | 'gathering' | 'analyzing' | 'generating' | 'complete'

const PHASES: { phase: Phase; duration: number }[] = [
  { phase: 'gathering', duration: 1200 },
  { phase: 'analyzing', duration: 1500 },
  { phase: 'generating', duration: 1500 },
  { phase: 'complete', duration: 1000 },
]

const DATA_SOURCES = [
  { icon: BarChart3, label: 'Market Data', color: 'text-blue-400' },
  { icon: Globe, label: 'Web Sources', color: 'text-cyan-400' },
  { icon: Newspaper, label: 'News Feed', color: 'text-purple-400' },
  { icon: LineChart, label: 'Trends', color: 'text-emerald-400' },
]

const REPORT_SECTIONS = [
  { label: 'Executive Summary', progress: 100 },
  { label: 'Market Analysis', progress: 100 },
  { label: 'Competitive Landscape', progress: 100 },
  { label: 'Key Insights', progress: 100 },
]

/**
 * Pulsing ring animation for agent thinking state
 */
const PulsingRings = memo(function PulsingRings({ active }: { active: boolean }) {
  if (!active) return null

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-blue-400/30"
          initial={{ width: 40, height: 40, opacity: 0 }}
          animate={{
            width: [40, 80, 100],
            height: [40, 80, 100],
            opacity: [0.6, 0.3, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.5,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
})

/**
 * Data flow line from source to center
 */
const DataFlowLine = memo(function DataFlowLine({
  active,
  delay,
  fromY,
}: {
  active: boolean
  delay: number
  fromY: number
}) {
  return (
    <motion.div
      className="absolute right-0 h-[2px] bg-gradient-to-r from-blue-400/60 to-transparent"
      style={{ top: fromY }}
      initial={{ width: 0, opacity: 0 }}
      animate={
        active
          ? {
              width: ['0%', '100%', '100%'],
              opacity: [0, 0.8, 0],
            }
          : { width: 0, opacity: 0 }
      }
      transition={{
        duration: 0.8,
        delay,
        ease: 'easeOut',
      }}
    />
  )
})

/**
 * Source item with glow animation
 */
const SourceItem = memo(function SourceItem({
  icon: Icon,
  label,
  color,
  active,
  delay,
}: {
  icon: typeof BarChart3
  label: string
  color: string
  active: boolean
  delay: number
}) {
  return (
    <motion.div
      className="flex items-center gap-2 p-1.5 rounded-lg relative"
      initial={{ opacity: 0.4 }}
      animate={
        active
          ? {
              opacity: [0.4, 1, 0.7],
              scale: [1, 1.05, 1],
            }
          : { opacity: 0.4 }
      }
      transition={{
        duration: 0.6,
        delay,
      }}
    >
      {/* Glow effect */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="absolute inset-0 rounded-lg bg-blue-500/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0.3] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay }}
          />
        )}
      </AnimatePresence>

      <div className={`p-1 rounded ${color} relative z-10`}>
        <Icon className="w-3 h-3" />
      </div>
      <span className="text-[8px] text-[var(--text-secondary)] relative z-10">{label}</span>
    </motion.div>
  )
})

/**
 * Report section that builds progressively
 */
const ReportSection = memo(function ReportSection({
  label,
  visible,
  delay,
}: {
  label: string
  visible: boolean
  delay: number
}) {
  return (
    <motion.div
      className="space-y-1"
      initial={{ opacity: 0, x: 10 }}
      animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
      transition={{ delay, type: 'spring', stiffness: 300, damping: 25 }}
    >
      <div className="flex items-center justify-between">
        <span className="text-[7px] text-[var(--text-muted)] truncate">{label}</span>
        <motion.div
          className="w-2 h-2 rounded-full bg-emerald-400/20"
          initial={{ scale: 0 }}
          animate={visible ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: delay + 0.2, type: 'spring', stiffness: 500 }}
        >
          <motion.div
            className="w-full h-full rounded-full bg-emerald-400"
            initial={{ scale: 0 }}
            animate={visible ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: delay + 0.3 }}
          />
        </motion.div>
      </div>
      <motion.div
        className="h-[3px] rounded-full bg-[var(--glass-bg-elevated)] overflow-hidden"
        initial={{ width: 0 }}
        animate={visible ? { width: '100%' } : { width: 0 }}
        transition={{ delay, duration: 0.3 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-blue-400 to-emerald-400"
          initial={{ width: '0%' }}
          animate={visible ? { width: '100%' } : { width: '0%' }}
          transition={{ delay: delay + 0.1, duration: 0.4, ease: 'easeOut' }}
        />
      </motion.div>
    </motion.div>
  )
})

/**
 * Mini chart visualization for report
 */
const MiniChart = memo(function MiniChart({ visible, delay }: { visible: boolean; delay: number }) {
  const bars = [0.4, 0.7, 0.5, 0.9, 0.6, 0.8]

  return (
    <motion.div
      className="flex items-end justify-center gap-[2px] h-6"
      initial={{ opacity: 0 }}
      animate={visible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ delay }}
    >
      {bars.map((height, i) => (
        <motion.div
          key={i}
          className="w-[4px] rounded-t bg-gradient-to-t from-blue-400 to-blue-300"
          initial={{ height: 0 }}
          animate={visible ? { height: `${height * 100}%` } : { height: 0 }}
          transition={{
            delay: delay + i * 0.05,
            duration: 0.3,
            type: 'spring',
            stiffness: 300,
          }}
        />
      ))}
    </motion.div>
  )
})

/**
 * Animated Market Agent (MIA) Mockup
 * Shows the flow: Data Sources -> Agent Analysis -> Report Generation
 */
export const MiaMockupAnimated = memo(function MiaMockupAnimated() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [phase, setPhase] = useState<Phase>('idle')
  const [hasPlayed, setHasPlayed] = useState(false)
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  const resetAnimation = useCallback(() => {
    setPhaseIndex(0)
    setPhase('idle')
    setHasPlayed(false)
  }, [])

  // Phase loop management
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

  const isGathering = phase === 'gathering'
  const isAnalyzing = phase === 'analyzing'
  const isGenerating = phase === 'generating' || phase === 'complete'
  const isComplete = phase === 'complete'
  const showContainer = phase !== 'idle'

  return (
    <motion.div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full h-44 rounded-xl overflow-hidden relative cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-transparent" />

      {/* Main container */}
      <AnimatePresence mode="wait">
        {showContainer && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="absolute inset-0 p-3 border border-blue-500/20 rounded-xl bg-[var(--mockup-bg)]/90 backdrop-blur-sm"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Globe className="w-3 h-3 text-blue-400" />
                </div>
                <p className="text-[9px] font-black uppercase tracking-wider text-blue-400">
                  @MIA
                </p>
                <span className="text-[7px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
                  Market Intelligence
                </span>
              </div>
              {/* Status indicator */}
              <motion.div
                className="flex items-center gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  className={`w-1.5 h-1.5 rounded-full ${isComplete ? 'bg-emerald-400' : 'bg-blue-400'}`}
                  animate={
                    !isComplete
                      ? { opacity: [1, 0.4, 1] }
                      : { opacity: 1 }
                  }
                  transition={{ duration: 0.8, repeat: isComplete ? 0 : Infinity }}
                />
                <span className="text-[7px] text-[var(--text-muted)]">
                  {isGathering && 'Gathering...'}
                  {isAnalyzing && 'Analyzing...'}
                  {isGenerating && !isComplete && 'Generating...'}
                  {isComplete && 'Complete'}
                </span>
              </motion.div>
            </div>

            {/* 3-Column Layout */}
            <div className="grid grid-cols-[1fr_1.2fr_1fr] gap-2 h-[calc(100%-28px)]">
              {/* LEFT: Sources Panel */}
              <div className="relative rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-bg-elevated)] p-2 overflow-hidden">
                <p className="text-[7px] font-bold text-[var(--text-muted)] uppercase mb-2">Sources</p>
                <div className="space-y-1.5">
                  {DATA_SOURCES.map((source, i) => (
                    <div key={source.label} className="relative">
                      <SourceItem
                        {...source}
                        active={isGathering}
                        delay={i * 0.2}
                      />
                      <DataFlowLine
                        active={isGathering}
                        delay={i * 0.2 + 0.1}
                        fromY={12 + i * 26}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* CENTER: Agent Processing */}
              <div className="relative rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-bg-elevated)] p-2 flex flex-col items-center justify-center">
                {/* Agent avatar with pulsing effect */}
                <div className="relative mb-2">
                  <PulsingRings active={isAnalyzing} />
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/30 to-cyan-500/20 border border-blue-400/30 flex items-center justify-center relative z-10"
                    animate={
                      isAnalyzing
                        ? {
                            scale: [1, 1.05, 1],
                            borderColor: ['rgba(96,165,250,0.3)', 'rgba(96,165,250,0.6)', 'rgba(96,165,250,0.3)'],
                          }
                        : {}
                    }
                    transition={{ duration: 1.5, repeat: isAnalyzing ? Infinity : 0 }}
                  >
                    {/* Rotating gradient overlay when analyzing */}
                    {isAnalyzing && (
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-gradient-conic from-blue-400/0 via-blue-400/30 to-blue-400/0"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        style={{ opacity: 0.5 }}
                      />
                    )}
                    <TrendingUp className="w-6 h-6 text-blue-400 relative z-10" />
                  </motion.div>
                </div>

                {/* Agent status text */}
                <motion.p
                  className="text-[8px] text-[var(--text-secondary)] text-center"
                  key={phase}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isGathering && 'Collecting data...'}
                  {isAnalyzing && 'Deep context analysis...'}
                  {isGenerating && !isComplete && 'Generating insights...'}
                  {isComplete && 'Analysis complete'}
                </motion.p>

                {/* Progress indicator */}
                <motion.div
                  className="w-full max-w-[80px] mt-2 h-1 rounded-full bg-[var(--glass-bg-elevated)] overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-400 to-cyan-400"
                    initial={{ width: '0%' }}
                    animate={{
                      width:
                        isGathering ? '25%' :
                        isAnalyzing ? '60%' :
                        isGenerating ? '90%' :
                        isComplete ? '100%' : '0%',
                    }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </motion.div>
              </div>

              {/* RIGHT: Report Output */}
              <div className="relative rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-bg-elevated)] p-2 overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[7px] font-bold text-[var(--text-muted)] uppercase">Report</p>
                  <AnimatePresence>
                    {isComplete && (
                      <motion.button
                        className="p-1 rounded bg-blue-500/20 border border-blue-500/30"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <Download className="w-2.5 h-2.5 text-blue-400" />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>

                {/* Report template */}
                <motion.div
                  className="rounded border border-[var(--border-light)] bg-[var(--mockup-bg)]/50 p-1.5"
                  initial={{ opacity: 0.3 }}
                  animate={isGenerating || isComplete ? { opacity: 1 } : { opacity: 0.3 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* PDF Header */}
                  <motion.div
                    className="flex items-center gap-1 pb-1 mb-1 border-b border-[var(--border-light)]"
                    initial={{ opacity: 0 }}
                    animate={isGenerating || isComplete ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <FileText className="w-2.5 h-2.5 text-red-400" />
                    <span className="text-[6px] font-bold text-[var(--text-secondary)]">Market Report</span>
                  </motion.div>

                  {/* Mini chart */}
                  <MiniChart visible={isGenerating || isComplete} delay={0.2} />

                  {/* Report sections */}
                  <div className="space-y-1 mt-1.5">
                    {REPORT_SECTIONS.map((section, i) => (
                      <ReportSection
                        key={section.label}
                        label={section.label}
                        visible={isGenerating || isComplete}
                        delay={0.3 + i * 0.15}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Complete badge */}
                <AnimatePresence>
                  {isComplete && (
                    <motion.div
                      className="absolute bottom-2 left-2 right-2 py-1 rounded bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center gap-1"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                      <motion.div
                        className="w-2 h-2 rounded-full bg-emerald-400"
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.2, 1] }}
                        transition={{ delay: 0.1 }}
                      />
                      <span className="text-[7px] font-bold text-emerald-400">READY</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Idle state - show globe icon */}
      {phase === 'idle' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center"
          >
            <Globe className="w-6 h-6 text-blue-400" />
          </motion.div>
        </div>
      )}
    </motion.div>
  )
})

export default MiaMockupAnimated
