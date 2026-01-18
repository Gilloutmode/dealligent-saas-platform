import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity } from 'lucide-react'
import type { StoredAnalysis } from '../../types/n8n'

// =============================================================================
// TYPES
// =============================================================================

export interface ProgressOverlayProps {
  /** Whether overlay is visible */
  open: boolean
  /** Analysis being tracked */
  analysis: StoredAnalysis | null
  /** Called when user wants to dismiss and continue navigating */
  onDismiss: () => void
  /** Optional: Called when analysis completes while overlay is open */
  onComplete?: () => void
}

// =============================================================================
// CONSTANTS
// =============================================================================

/** Default estimated duration in seconds */
const DEFAULT_DURATION = 120

/** Calculate current step based on progress percentage */
function getCurrentStep(progress: number): number {
  if (progress < 33) return 1      // Collecte des données
  if (progress < 66) return 2      // Analyse IA en cours
  return 3                          // Génération du rapport
}

// =============================================================================
// ANALYSIS STEPS
// =============================================================================

const ANALYSIS_STEPS = [
  { id: 1, label: 'Collecte des données...' },
  { id: 2, label: 'Analyse IA en cours...' },
  { id: 3, label: 'Génération du rapport...' },
]

// =============================================================================
// CIRCULAR PROGRESS WITH GRADIENT
// =============================================================================

// =============================================================================
// CIRCULAR PROGRESS - TACTICAL HUD
// =============================================================================

interface CircularProgressProps {
  value: number
  size?: number
  strokeWidth?: number
}

function CircularProgress({
  value,
  size = 240,
  strokeWidth = 2,
}: CircularProgressProps) {
  const radius = (size - 60) / 2
  const circumference = 2 * Math.PI * radius
  const fillPercentage = Math.min(value / 100, 1)
  const strokeDashoffset = circumference * (1 - fillPercentage)

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer Rotating HUD Rings */}
      <motion.div
        className="absolute inset-0 border border-[var(--c-brand)]/10 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute inset-4 border border-dashed border-[var(--c-brand)]/20 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />

      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90 relative z-10"
      >
        <defs>
          <linearGradient id="tactical-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--c-brand)" />
            <stop offset="100%" stopColor="var(--c-accent)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--white-10)"
          strokeWidth={strokeWidth}
        />

        {/* Progress */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#tactical-gradient)"
          strokeWidth={strokeWidth + 2}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          strokeLinecap="round"
          filter="url(#glow)"
        />

        {/* Tactical Marks */}
        {[...Array(12)].map((_, i) => (
          <line
            key={i}
            x1={size / 2}
            y1={size / 2 - radius - 15}
            x2={size / 2}
            y2={size / 2 - radius - 5}
            stroke="var(--white-20)"
            strokeWidth="1"
            transform={`rotate(${i * 30}, ${size / 2}, ${size / 2})`}
          />
        ))}
      </svg>

      {/* Center Display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        <motion.span
          key={Math.floor(value)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-black text-display text-[var(--text-primary)] tracking-tighter"
        >
          {Math.round(value)}
          <span className="text-2xl text-[var(--c-brand)] ml-1">%</span>
        </motion.span>
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-secondary)] mt-2">
          Sync Status
        </span>
      </div>

      {/* Pulsing Core */}
      <motion.div
        className="absolute w-32 h-32 rounded-full bg-[var(--c-brand)]/5 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </div>
  )
}

// =============================================================================
// MAIN PROGRESS OVERLAY COMPONENT
// =============================================================================

export function ProgressOverlay({
  open,
  analysis,
  onDismiss,
  onComplete,
}: ProgressOverlayProps) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [internalProgress, setInternalProgress] = useState(0)

  const estimatedDuration = analysis?.estimatedDuration || DEFAULT_DURATION

  useEffect(() => {
    if (!open) {
      setElapsedSeconds(0)
      setInternalProgress(0)
      return
    }

    if (analysis?.status === 'completed') {
      setInternalProgress(100)
      return
    }

    const startTime = analysis?.startedAt
      ? new Date(analysis.startedAt).getTime()
      : Date.now()

    const updateProgress = () => {
      const now = Date.now()
      const elapsed = Math.floor((now - startTime) / 1000)
      setElapsedSeconds(elapsed)

      const rawProgress = (elapsed / estimatedDuration) * 100
      const cappedProgress = Math.min(95, Math.floor(rawProgress))
      setInternalProgress(cappedProgress)
    }

    updateProgress()
    const interval = setInterval(updateProgress, 1000)
    return () => clearInterval(interval)
  }, [open, analysis?.startedAt, analysis?.status, estimatedDuration])

  const isComplete = analysis?.status === 'completed'
  const currentStep = getCurrentStep(internalProgress)

  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }, [])

  const estimatedRemaining = Math.max(0, estimatedDuration - elapsedSeconds)

  return (
    <AnimatePresence>
      {open && analysis && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
        >
          <div className="relative w-full max-w-2xl">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="panel-aurora hud-border p-12 rounded-[3rem] shadow-2xl overflow-hidden"
            >
              {/* Scanline Effect Overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-20 pointer-events-none"
                style={{ background: 'linear-gradient(transparent 50%, rgba(0,0,0,0.1) 50%)', backgroundSize: '100% 4px' }} />

              <div className="relative z-10 flex flex-col items-center gap-12">
                {/* Header */}
                <div className="text-center">
                  <motion.div
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--c-brand)]/10 border border-[var(--c-brand)]/20 text-[var(--c-brand)] text-[10px] font-black uppercase tracking-[0.3em] mb-4"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Activity className="w-3.5 h-3.5" />
                    Neural Stream Processing
                  </motion.div>
                  <h2 className="text-4xl font-black text-display text-[var(--text-primary)] uppercase tracking-tight">
                    {isComplete ? 'Analysis Synced' : 'Compiling Intelligence'}
                  </h2>
                  <p className="text-[var(--text-secondary)] mt-2 font-medium tracking-wide flex items-center justify-center gap-2">
                    Target: <span className="text-[var(--text-primary)] font-black uppercase">{analysis.competitor}</span>
                  </p>
                </div>

                {/* Main HUD Display */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full items-center">
                  {/* Left: Tactical Progress */}
                  <CircularProgress value={internalProgress} />

                  {/* Right: Sequence & Stats */}
                  <div className="space-y-8">
                    {/* Time HUD */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                        <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] mb-1">
                          Uptime
                        </p>
                        <p className="text-xl font-black text-[var(--text-primary)] font-mono">
                          {formatTime(elapsedSeconds)}
                        </p>
                      </div>
                      <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                        <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] mb-1">
                          ETA
                        </p>
                        <p className="text-xl font-black text-[var(--c-accent)] font-mono">
                          {formatTime(estimatedRemaining)}
                        </p>
                      </div>
                    </div>

                    {/* Sequence Indicators */}
                    <div className="space-y-3">
                      {ANALYSIS_STEPS.map((step) => {
                        const isActive = step.id === currentStep
                        const isCompleted = step.id < currentStep

                        return (
                          <div
                            key={step.id}
                            className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl border transition-all duration-500 ${isActive
                              ? 'bg-[var(--c-brand)]/10 border-[var(--c-brand)]/30'
                              : isCompleted
                                ? 'bg-[var(--c-success)]/5 border-[var(--c-success)]/20 opacity-60'
                                : 'bg-white/5 border-white/5 opacity-30'
                              }`}
                          >
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs ${isActive ? 'bg-[var(--c-brand)] text-white' :
                              isCompleted ? 'bg-[var(--c-success)] text-white' : 'bg-white/10 text-[var(--text-muted)]'
                              }`}>
                              {isCompleted ? '✓' : `0${step.id}`}
                            </div>
                            <span className={`text-sm font-bold uppercase tracking-widest ${isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'
                              }`}>
                              {step.label}
                            </span>
                            {isActive && (
                              <motion.div
                                className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--c-brand)]"
                                animate={{ scale: [1, 2, 1], opacity: [1, 0.5, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                              />
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="w-full pt-6 border-t border-white/5">
                  {isComplete ? (
                    <div className="flex gap-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onComplete}
                        className="flex-1 px-8 py-5 rounded-2xl bg-[var(--c-brand)] text-white font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-[var(--c-brand)]/30"
                      >
                        Access Intelligence Report
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onDismiss}
                        className="px-8 py-5 rounded-2xl bg-white/5 border border-white/10 text-[var(--text-secondary)] font-black text-xs uppercase tracking-widest"
                      >
                        Dismiss
                      </motion.button>
                    </div>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onDismiss}
                      className="w-full px-8 py-5 rounded-2xl bg-white/5 border border-white/10 text-[var(--text-secondary)] font-black text-xs uppercase tracking-widest hover:border-white/20 transition-all"
                    >
                      Background Process Activity
                    </motion.button>
                  )}
                  <p className="text-[10px] text-center text-[var(--text-muted)] font-black uppercase tracking-[0.3em] mt-6">
                    Enabling background sync does not interrupt the intelligence stream.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ProgressOverlay
