// =============================================================================
// REPORTS MOCKUP ANIMATED V2 - Real-time Report Generation
// Template fills with KPIs, progress bars, and export options
// Timeline: ~7s (plays once on viewport entry, hover to replay)
// =============================================================================

import { motion, AnimatePresence, useInView } from 'framer-motion'
import { memo, useEffect, useState, useRef, useCallback } from 'react'
import { MiniNumberTicker } from '../primitives/MiniNumberTicker'

type Phase = 'idle' | 'header' | 'kpis' | 'bars' | 'complete' | 'export' | 'pause'

interface KPI {
  label: string
  value: number
  prefix?: string
  suffix?: string
  trend: string
  trendUp: boolean
}

interface Metric {
  label: string
  value: number
  color: 'blue' | 'orange' | 'emerald'
}

const KPIS: KPI[] = [
  { label: 'Revenue', value: 142, prefix: '$', suffix: 'K', trend: '+12%', trendUp: true },
  { label: 'Tickets', value: 23, trend: '-5%', trendUp: false },
  { label: 'NPS Score', value: 72, trend: '+8pts', trendUp: true },
]

const METRICS: Metric[] = [
  { label: 'Contract Health', value: 78, color: 'blue' },
  { label: 'Support Load', value: 45, color: 'orange' },
  { label: 'Feature Adoption', value: 92, color: 'emerald' },
]

const COLOR_CLASSES = {
  blue: {
    bg: 'bg-blue-500',
    bgLight: 'bg-blue-500/20',
    text: 'text-blue-400',
  },
  orange: {
    bg: 'bg-orange-500',
    bgLight: 'bg-orange-500/20',
    text: 'text-orange-400',
  },
  emerald: {
    bg: 'bg-emerald-500',
    bgLight: 'bg-emerald-500/20',
    text: 'text-emerald-400',
  },
}

// Header Progress Bar
const HeaderProgressBar = memo(function HeaderProgressBar({
  progress,
  isComplete,
}: {
  progress: number
  isComplete: boolean
}) {
  return (
    <div className="flex items-center gap-2">
      {isComplete ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30"
        >
          <span className="text-emerald-400 text-[10px]">&#10003;</span>
          <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider">
            Complete
          </span>
        </motion.div>
      ) : (
        <div className="flex items-center gap-2">
          <span className="text-[9px] text-[var(--text-muted)] font-medium">Generating...</span>
          <div className="w-20 h-1.5 rounded-full bg-[var(--glass-bg-elevated)] overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>
          <span className="text-[9px] text-[var(--text-muted)] tabular-nums">{progress}%</span>
        </div>
      )}
    </div>
  )
})

// KPI Card Component
const KPICard = memo(function KPICard({
  kpi,
  index,
  isVisible,
}: {
  kpi: KPI
  index: number
  isVisible: boolean
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
        delay: index * 0.15,
      }}
      className="flex-1 p-3 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-bg-elevated)]"
    >
      <p className="text-[9px] text-[var(--text-muted)] uppercase tracking-wider mb-1">
        {kpi.label}
      </p>
      <div className="flex items-baseline gap-1.5">
        <span className="text-lg font-bold text-[var(--text-primary)]">
          {isVisible ? (
            <MiniNumberTicker
              value={kpi.value}
              prefix={kpi.prefix}
              suffix={kpi.suffix}
              duration={0.8}
              delay={index * 0.15}
            />
          ) : (
            <span className="opacity-0">{kpi.prefix}{kpi.value}{kpi.suffix}</span>
          )}
        </span>
        <motion.span
          initial={{ opacity: 0, x: -5 }}
          animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -5 }}
          transition={{ delay: index * 0.15 + 0.5 }}
          className={`text-[10px] font-semibold ${
            kpi.trendUp ? 'text-emerald-400' : 'text-red-400'
          }`}
        >
          {kpi.trend}
        </motion.span>
      </div>
    </motion.div>
  )
})

// Progress Bar Metric
const MetricBar = memo(function MetricBar({
  metric,
  index,
  isVisible,
}: {
  metric: Metric
  index: number
  isVisible: boolean
}) {
  const colors = COLOR_CLASSES[metric.color]

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 25,
        delay: index * 0.12,
      }}
      className="space-y-1"
    >
      <div className="flex justify-between items-center">
        <span className="text-[10px] text-[var(--text-secondary)]">{metric.label}</span>
        <span className={`text-[10px] font-semibold ${colors.text} tabular-nums`}>
          {isVisible ? (
            <MiniNumberTicker value={metric.value} suffix="%" duration={0.6} delay={index * 0.12 + 0.2} />
          ) : (
            '0%'
          )}
        </span>
      </div>
      <div className={`h-2 rounded-full ${colors.bgLight} overflow-hidden`}>
        <motion.div
          className={`h-full rounded-full ${colors.bg}`}
          initial={{ width: 0 }}
          animate={isVisible ? { width: `${metric.value}%` } : { width: 0 }}
          transition={{
            duration: 0.8,
            delay: index * 0.12,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      </div>
    </motion.div>
  )
})

// Export Button
const ExportButton = memo(function ExportButton({
  label,
  index,
  isVisible,
}: {
  label: string
  index: number
  isVisible: boolean
}) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={
        isVisible
          ? { opacity: 1, scale: 1 }
          : { opacity: 0, scale: 0.8 }
      }
      whileHover={{ scale: 1.05, boxShadow: '0 0 12px rgba(59, 130, 246, 0.4)' }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 17,
        delay: index * 0.1,
      }}
      className="px-3 py-1.5 rounded-md bg-[var(--glass-bg)] border border-[var(--glass-bg-elevated)] text-[10px] font-bold text-[var(--text-secondary)] hover:border-blue-500/40 hover:text-blue-400 transition-colors"
    >
      {label}
    </motion.button>
  )
})

export const ReportsMockupAnimated = memo(function ReportsMockupAnimated() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [phase, setPhase] = useState<Phase>('idle')
  const [hasPlayed, setHasPlayed] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [progress, setProgress] = useState(0)

  const resetAnimation = useCallback(() => {
    setPhase('idle')
    setHasPlayed(false)
    setProgress(0)
  }, [])

  // Progress animation
  useEffect(() => {
    if (!['header', 'kpis', 'bars', 'complete'].includes(phase)) return

    const progressMap: Record<string, number> = {
      header: 15,
      kpis: 50,
      bars: 85,
      complete: 100,
    }

    const targetProgress = progressMap[phase] || 0
    const timer = setTimeout(() => setProgress(targetProgress), 100)
    return () => clearTimeout(timer)
  }, [phase])

  // Phase progression
  useEffect(() => {
    if (!isInView && !isHovering) return
    if (hasPlayed && !isHovering) return

    const phases: { phase: Phase; duration: number }[] = [
      { phase: 'header', duration: 500 },
      { phase: 'kpis', duration: 1500 },
      { phase: 'bars', duration: 1500 },
      { phase: 'complete', duration: 500 },
      { phase: 'export', duration: 1000 },
      { phase: 'pause', duration: 1000 },
    ]

    if (phase === 'idle') {
      const timer = setTimeout(() => setPhase('header'), 300)
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

  // Phase-based visibility
  const showHeader = phase !== 'idle'
  const showKPIs = ['kpis', 'bars', 'complete', 'export', 'pause'].includes(phase)
  const showBars = ['bars', 'complete', 'export', 'pause'].includes(phase)
  const isComplete = ['complete', 'export', 'pause'].includes(phase)
  const showExport = ['export', 'pause'].includes(phase)

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full aspect-[16/10] rounded-xl bg-[var(--mockup-bg)] border border-[var(--mockup-border)] p-4 overflow-hidden flex flex-col relative cursor-pointer"
    >
      {/* Subtle background gradient */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 20%, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
        }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={showHeader ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="flex items-center justify-between pb-3 border-b border-[var(--border-light)] relative z-10"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm">&#128202;</span>
          <span className="text-[11px] font-bold text-[var(--text-primary)] uppercase tracking-wider">
            ACME CORP - Q4 REPORT
          </span>
        </div>
        <HeaderProgressBar progress={progress} isComplete={isComplete} />
      </motion.div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col justify-between py-3 relative z-10">
        {/* KPI Cards Row */}
        <div className="flex gap-2">
          {KPIS.map((kpi, i) => (
            <KPICard key={kpi.label} kpi={kpi} index={i} isVisible={showKPIs} />
          ))}
        </div>

        {/* Progress Bars */}
        <div className="space-y-2 mt-3">
          {METRICS.map((metric, i) => (
            <MetricBar key={metric.label} metric={metric} index={i} isVisible={showBars} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isComplete ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="flex justify-between items-center pt-3 border-t border-[var(--border-light)] relative z-10"
      >
        {/* Complete Badge */}
        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, x: -20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20"
            >
              <span className="text-emerald-400 text-[10px]">&#10003;</span>
              <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">
                Report Complete
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Export Buttons */}
        <div className="flex gap-1.5">
          {['PDF', 'PPT', 'Share'].map((label, i) => (
            <ExportButton key={label} label={label} index={i} isVisible={showExport} />
          ))}
        </div>
      </motion.div>
    </div>
  )
})

export default ReportsMockupAnimated
