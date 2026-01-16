// =============================================================================
// DEALLIGENT PLATFORM - ANALYSIS STATUS CARD
// Card displaying analysis with 3 visual states: running, completed, failed
// =============================================================================

import { motion } from 'framer-motion'
import {
  Loader2,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  RotateCcw,
  Trash2,
  ChevronRight,
} from 'lucide-react'
import type { StoredAnalysis } from '../../types/n8n'
import ThreatBadge from './ThreatBadge'

// =============================================================================
// TYPES
// =============================================================================

export interface AnalysisStatusCardProps {
  /** Analysis data */
  analysis: StoredAnalysis
  /** Progress percentage (0-100) for running state */
  progress?: number
  /** Callback when "View Results" is clicked */
  onViewResults?: (analysis: StoredAnalysis) => void
  /** Callback when "Retry" is clicked */
  onRetry?: (analysis: StoredAnalysis) => void
  /** Callback when "Delete" is clicked */
  onDelete?: (analysis: StoredAnalysis) => void
}

// =============================================================================
// HELPERS
// =============================================================================

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMinutes = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMinutes < 1) return 'À l\'instant'
  if (diffMinutes < 60) return `Il y a ${diffMinutes} min`
  if (diffHours < 24) return `Il y a ${diffHours}h`
  if (diffDays < 7) return `Il y a ${diffDays}j`
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}

function formatDuration(startedAt?: string, completedAt?: string): string {
  if (!startedAt) return '-'

  const start = new Date(startedAt)
  const end = completedAt ? new Date(completedAt) : new Date()
  const diffMs = end.getTime() - start.getTime()
  const seconds = Math.floor(diffMs / 1000)
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`
  }
  return `${seconds}s`
}

// =============================================================================
// RUNNING STATE
// =============================================================================

function RunningState({
  analysis,
  progress = 0,
}: {
  analysis: StoredAnalysis
  progress: number
}): React.ReactElement {
  return (
    <>
      {/* Status indicator */}
      <div className="flex items-center gap-2 mb-4">
        <Loader2 className="w-5 h-5 text-blue-primary animate-spin" />
        <span className="text-sm font-medium text-blue-primary">Analyse en cours</span>
        <span className="text-xs text-secondary ml-auto">
          {formatDuration(analysis.startedAt)}
        </span>
      </div>

      {/* Progress bar */}
      <div className="relative h-2 bg-surface-tertiary rounded-full overflow-hidden mb-3">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-primary to-cyan-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      </div>

      {/* Progress percentage */}
      <div className="flex items-center justify-between text-xs text-secondary">
        <span>{Math.round(progress)}% complété</span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          ~{Math.ceil(analysis.estimatedDuration / 60)} min estimé
        </span>
      </div>
    </>
  )
}

// =============================================================================
// COMPLETED STATE
// =============================================================================

function CompletedState({
  analysis,
  onViewResults,
}: {
  analysis: StoredAnalysis
  onViewResults?: (analysis: StoredAnalysis) => void
}): React.ReactElement {
  const score = analysis.response?.data?.strengths?.length || 0
  const threatLevel = analysis.response?.data?.threatLevel

  return (
    <>
      {/* Status indicator */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
          <CheckCircle2 className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="text-sm font-medium text-emerald-400">Analyse terminée</span>
        <span className="text-xs text-secondary ml-auto">
          {analysis.completedAt && formatRelativeTime(analysis.completedAt)}
        </span>
      </div>

      {/* Results summary */}
      <div className="flex items-center gap-4 mb-4">
        {threatLevel && <ThreatBadge level={threatLevel} size="sm" />}
        <span className="text-xs text-secondary">
          {score} insight{score > 1 ? 's' : ''} identifié{score > 1 ? 's' : ''}
        </span>
      </div>

      {/* View results button */}
      {onViewResults && (
        <motion.button
          onClick={() => onViewResults(analysis)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl btn-premium text-sm font-medium"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Eye className="w-4 h-4" />
          Voir les résultats
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      )}
    </>
  )
}

// =============================================================================
// FAILED STATE
// =============================================================================

function FailedState({
  analysis,
  onRetry,
}: {
  analysis: StoredAnalysis
  onRetry?: (analysis: StoredAnalysis) => void
}): React.ReactElement {
  return (
    <>
      {/* Status indicator */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center">
          <XCircle className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="text-sm font-medium text-red-400">Échec de l'analyse</span>
      </div>

      {/* Error message */}
      <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 mb-4">
        <p className="text-sm text-red-300 line-clamp-2">
          {analysis.error || 'Une erreur inattendue s\'est produite'}
        </p>
      </div>

      {/* Retry button */}
      {onRetry && (
        <motion.button
          onClick={() => onRetry(analysis)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 text-sm font-medium transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <RotateCcw className="w-4 h-4" />
          Réessayer
        </motion.button>
      )}
    </>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function AnalysisStatusCard({
  analysis,
  progress = 0,
  onViewResults,
  onRetry,
  onDelete,
}: AnalysisStatusCardProps): React.ReactElement {
  const { status, competitor, analysisType, sources } = analysis

  return (
    <motion.div
      className="card-glass p-5 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      {/* Running glow effect */}
      {status === 'running' && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-primary/5 via-cyan-400/5 to-blue-primary/5 animate-pulse pointer-events-none" />
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="font-semibold text-primary text-lg">{competitor}</h4>
          <p className="text-sm text-secondary">
            {analysisType === 'quick' && 'Analyse rapide'}
            {analysisType === 'standard' && 'Analyse standard'}
            {analysisType === 'deep' && 'Analyse approfondie'}
            {!analysisType && 'Analyse'}
            {sources.length > 0 && ` • ${sources.length} source${sources.length > 1 ? 's' : ''}`}
          </p>
        </div>

        {/* Delete button (always visible) */}
        {onDelete && (
          <motion.button
            onClick={() => onDelete(analysis)}
            className="p-2 rounded-lg hover:bg-white/5 text-secondary hover:text-red-400 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Supprimer"
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
        )}
      </div>

      {/* State-specific content */}
      {status === 'running' && <RunningState analysis={analysis} progress={progress} />}
      {status === 'completed' && <CompletedState analysis={analysis} onViewResults={onViewResults} />}
      {status === 'failed' && <FailedState analysis={analysis} onRetry={onRetry} />}
      {status === 'pending' && (
        <div className="flex items-center gap-2 text-secondary">
          <Clock className="w-4 h-4" />
          <span className="text-sm">En attente de démarrage...</span>
        </div>
      )}
    </motion.div>
  )
}

export default AnalysisStatusCard
