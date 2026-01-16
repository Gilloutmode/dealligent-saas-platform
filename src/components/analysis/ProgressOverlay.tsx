// =============================================================================
// DEALLIGENT PLATFORM - PROGRESS OVERLAY
// Full-screen progress overlay for analysis in progress
// =============================================================================

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Bell, Loader2, Activity, Clock } from 'lucide-react'
import type { StoredAnalysis } from '../../types/n8n'

// =============================================================================
// TYPES
// =============================================================================

export interface ProgressOverlayProps {
  /** Whether overlay is visible */
  open: boolean
  /** Analysis being tracked */
  analysis: StoredAnalysis | null
  /** Progress percentage (0-100) */
  progress: number
  /** Called when user wants to dismiss and continue navigating */
  onDismiss: () => void
  /** Optional: Called when analysis completes while overlay is open */
  onComplete?: () => void
}

// =============================================================================
// CIRCULAR PROGRESS COMPONENT
// =============================================================================

function CircularProgress({ progress }: { progress: number }): React.ReactElement {
  const radius = 60
  const strokeWidth = 6
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="relative w-40 h-40">
      {/* Background circle */}
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <motion.circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-primary">
          {Math.round(progress)}%
        </span>
        <span className="text-xs text-secondary mt-1">complété</span>
      </div>

      {/* Animated glow */}
      <div className="absolute inset-0 rounded-full bg-blue-primary/20 blur-xl animate-pulse" />
    </div>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function ProgressOverlay({
  open,
  analysis,
  progress,
  onDismiss,
  onComplete,
}: ProgressOverlayProps): React.ReactElement {
  const [elapsedSeconds, setElapsedSeconds] = useState(0)

  // Track elapsed time
  useEffect(() => {
    if (!open || !analysis?.startedAt) {
      setElapsedSeconds(0)
      return
    }

    const updateElapsed = () => {
      const start = new Date(analysis.startedAt!).getTime()
      const now = Date.now()
      setElapsedSeconds(Math.floor((now - start) / 1000))
    }

    updateElapsed()
    const interval = setInterval(updateElapsed, 1000)
    return () => clearInterval(interval)
  }, [open, analysis?.startedAt])

  // Check for completion
  useEffect(() => {
    if (analysis?.status === 'completed' && onComplete) {
      onComplete()
    }
  }, [analysis?.status, onComplete])

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const estimatedRemaining = analysis
    ? Math.max(0, analysis.estimatedDuration - elapsedSeconds)
    : 0

  return (
    <AnimatePresence>
      {open && analysis && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />

          {/* Content */}
          <motion.div
            className="relative card-premium p-8 max-w-md w-full mx-4 text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close button */}
            <button
              onClick={onDismiss}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/5 text-secondary hover:text-primary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Progress ring */}
            <div className="flex justify-center mb-6">
              <CircularProgress progress={progress} />
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-primary mb-2">
              Analyse en cours
            </h2>
            <p className="text-secondary mb-6">
              {analysis.competitor} •{' '}
              {analysis.analysisType === 'quick' && 'Analyse rapide'}
              {analysis.analysisType === 'standard' && 'Analyse standard'}
              {analysis.analysisType === 'deep' && 'Analyse approfondie'}
              {!analysis.analysisType && 'Analyse'}
            </p>

            {/* Time info */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-surface-tertiary">
                <div className="flex items-center justify-center gap-2 text-secondary mb-1">
                  <Activity className="w-4 h-4" />
                  <span className="text-xs">Temps écoulé</span>
                </div>
                <p className="text-xl font-semibold text-primary">
                  {formatTime(elapsedSeconds)}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-surface-tertiary">
                <div className="flex items-center justify-center gap-2 text-secondary mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs">Estimé restant</span>
                </div>
                <p className="text-xl font-semibold text-primary">
                  ~{formatTime(estimatedRemaining)}
                </p>
              </div>
            </div>

            {/* Status indicator */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <Loader2 className="w-4 h-4 text-blue-primary animate-spin" />
              <span className="text-sm text-blue-primary">
                Extraction des données en cours...
              </span>
            </div>

            {/* Dismiss button */}
            <motion.button
              onClick={onDismiss}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl btn-ghost-glow text-sm font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Bell className="w-4 h-4" />
              Continuer à naviguer
              <span className="text-xs text-secondary ml-2">(notification à la fin)</span>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ProgressOverlay
