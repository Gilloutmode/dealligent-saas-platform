"use client"

// =============================================================================
// DEALLIGENT PLATFORM - PREMIUM PROGRESS OVERLAY
// Full-screen progress overlay with impressive animations for analysis
// Uses useTheme() hook for reliable dark/light mode support
// =============================================================================

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Clock, Activity, Sparkles, CheckCircle, ArrowRight } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
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

interface CircularProgressProps {
  value: number
  size?: number
  strokeWidth?: number
  isDark: boolean
}

function CircularProgress({
  value,
  size = 200,
  strokeWidth = 12,
  isDark,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const fillPercentage = Math.min(value / 100, 1)
  const strokeDashoffset = circumference * (1 - fillPercentage)

  // Stable gradient ID (using useMemo pattern)
  const [gradientId] = useState(() => `progress-gradient-${Math.random().toString(36).slice(2, 9)}`)

  return (
    <div className="relative">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        <defs>
          <linearGradient
            id={gradientId}
            gradientUnits="userSpaceOnUse"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>

        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          className={isDark ? 'stroke-gray-700' : 'stroke-gray-200'}
          strokeWidth={strokeWidth}
        />

        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.3s ease-out' }}
        />
      </svg>

      {/* Center percentage display - static, no animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {Math.round(value)}%
          </div>
          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            complété
          </p>
        </div>
      </div>

      {/* Animated glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-2xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}

// =============================================================================
// STEP INDICATOR COMPONENT
// =============================================================================

interface StepIndicatorProps {
  steps: typeof ANALYSIS_STEPS
  currentStep: number
  isDark: boolean
}

function StepIndicator({ steps, currentStep, isDark }: StepIndicatorProps) {
  return (
    <div className="space-y-3 w-full">
      {steps.map((step, index) => {
        const isActive = step.id === currentStep
        const isCompleted = step.id < currentStep

        return (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className={`
              flex items-center gap-3 p-3 rounded-xl transition-all duration-300
              ${isActive
                ? isDark
                  ? 'bg-blue-500/10 border border-blue-500/30'
                  : 'bg-blue-50 border border-blue-200'
                : isCompleted
                  ? isDark
                    ? 'bg-gray-800/50'
                    : 'bg-gray-100'
                  : isDark
                    ? 'bg-gray-800/20'
                    : 'bg-gray-50'
              }
            `}
          >
            {/* Step number/check */}
            <div
              className={`
                flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
                ${isActive
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : isCompleted
                    ? 'bg-emerald-500 text-white'
                    : isDark
                      ? 'bg-gray-700 text-gray-400'
                      : 'bg-gray-200 text-gray-500'
                }
              `}
            >
              {isCompleted ? '✓' : step.id}
            </div>

            {/* Step label */}
            <span
              className={`
                text-sm transition-colors duration-300
                ${isActive
                  ? isDark
                    ? 'text-white font-medium'
                    : 'text-gray-900 font-medium'
                  : isCompleted
                    ? isDark
                      ? 'text-gray-500 line-through'
                      : 'text-gray-400 line-through'
                    : isDark
                      ? 'text-gray-400'
                      : 'text-gray-500'
                }
              `}
            >
              {step.label}
            </span>

            {/* Active spinner */}
            {isActive && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="ml-auto w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"
              />
            )}
          </motion.div>
        )
      })}
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
  const { isDark } = useTheme()
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [internalProgress, setInternalProgress] = useState(0)

  // Get estimated duration from analysis or use default
  const estimatedDuration = analysis?.estimatedDuration || DEFAULT_DURATION

  // Track elapsed time AND calculate progress internally
  useEffect(() => {
    if (!open) {
      setElapsedSeconds(0)
      setInternalProgress(0)
      return
    }

    // If analysis is completed, set to 100%
    if (analysis?.status === 'completed') {
      setInternalProgress(100)
      return
    }

    // Calculate from analysis startedAt or use overlay open time
    const startTime = analysis?.startedAt
      ? new Date(analysis.startedAt).getTime()
      : Date.now()

    const updateProgress = () => {
      const now = Date.now()
      const elapsed = Math.floor((now - startTime) / 1000)
      setElapsedSeconds(elapsed)

      // Calculate progress: goes up to 95% max (last 5% when truly complete)
      // Use a slightly accelerated curve for better UX
      const rawProgress = (elapsed / estimatedDuration) * 100
      const cappedProgress = Math.min(95, Math.floor(rawProgress))
      setInternalProgress(cappedProgress)
    }

    updateProgress()
    const interval = setInterval(updateProgress, 1000)
    return () => clearInterval(interval)
  }, [open, analysis?.startedAt, analysis?.status, estimatedDuration])

  // Derive completion state (no auto-close - user decides when to navigate)
  const isComplete = analysis?.status === 'completed'

  // Calculate current step from internal progress
  const currentStep = getCurrentStep(internalProgress)

  // Use internal progress for display
  const displayProgress = internalProgress

  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }, [])

  const estimatedRemaining = Math.max(0, estimatedDuration - elapsedSeconds)

  // Theme-aware styles
  const styles = {
    backdrop: isDark ? 'bg-black/70' : 'bg-black/50',
    card: isDark
      ? 'bg-gray-900/95 border-gray-700'
      : 'bg-white/95 border-gray-200',
    title: isDark ? 'text-white' : 'text-gray-900',
    subtitle: isDark ? 'text-gray-300' : 'text-gray-600',
    muted: isDark ? 'text-gray-400' : 'text-gray-500',
    timeBox: isDark
      ? 'bg-gray-800/80 border-gray-700'
      : 'bg-gray-50 border-gray-200',
    dismissBtn: isDark
      ? 'bg-gray-800 hover:bg-gray-700 text-gray-200'
      : 'bg-gray-100 hover:bg-gray-200 text-gray-700',
    closeBtn: isDark
      ? 'hover:bg-gray-800 text-gray-400 hover:text-gray-200'
      : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700',
  }

  return (
    <AnimatePresence>
      {open && analysis && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`absolute inset-0 ${styles.backdrop} backdrop-blur-md`}
            onClick={onDismiss}
          />

          {/* Modal content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative z-10 w-full max-w-lg"
          >
            <div
              className={`
                relative rounded-3xl ${styles.card} backdrop-blur-xl
                border shadow-2xl p-8 md:p-10
              `}
            >
              {/* Close button */}
              <motion.button
                onClick={onDismiss}
                className={`absolute top-4 right-4 p-2 rounded-lg ${styles.closeBtn} transition-colors`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </motion.button>

              <div className="flex flex-col items-center space-y-6">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-center space-y-2"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {isComplete ? (
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <Sparkles className="w-5 h-5 text-purple-500" />
                    )}
                    <h2 className={`text-2xl md:text-3xl font-bold ${styles.title}`}>
                      {isComplete ? 'Analyse terminée !' : 'Analyse en cours'}
                    </h2>
                  </div>
                  <p className={`text-lg ${styles.subtitle}`}>
                    {analysis.competitor}
                  </p>
                </motion.div>

                {/* Circular progress */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                >
                  <CircularProgress
                    value={displayProgress}
                    size={200}
                    strokeWidth={12}
                    isDark={isDark}
                  />
                </motion.div>

                {/* Time indicators */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="w-full"
                >
                  <div className="flex justify-between items-center text-sm mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                      <Activity className={`w-4 h-4 ${styles.muted}`} />
                      <span className={styles.muted}>Temps écoulé</span>
                      <span className={`font-semibold ${styles.title}`}>
                        {formatTime(elapsedSeconds)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className={`w-4 h-4 ${styles.muted}`} />
                      <span className={styles.muted}>Restant</span>
                      <span className={`font-semibold ${styles.title}`}>
                        ~{formatTime(estimatedRemaining)}
                      </span>
                    </div>
                  </div>

                  {/* Step indicators */}
                  <StepIndicator
                    steps={ANALYSIS_STEPS}
                    currentStep={currentStep}
                    isDark={isDark}
                  />
                </motion.div>

                {/* Action buttons */}
                {isComplete ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="w-full space-y-3"
                  >
                    {/* Primary: View results */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onComplete}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Voir les résultats
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                    {/* Secondary: Continue navigating */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onDismiss}
                      className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl ${styles.dismissBtn} font-medium transition-colors duration-200`}
                    >
                      Continuer à naviguer
                    </motion.button>
                  </motion.div>
                ) : (
                  <>
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onDismiss}
                      className={`
                        w-full flex items-center justify-center gap-2 px-6 py-3.5
                        rounded-xl ${styles.dismissBtn} font-medium transition-colors duration-200
                      `}
                    >
                      <X className="w-4 h-4" />
                      Continuer à naviguer
                    </motion.button>

                    {/* Info text */}
                    <p className={`text-xs text-center ${styles.muted}`}>
                      L'analyse continue en arrière-plan. Vous serez notifié à la fin.
                    </p>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ProgressOverlay
