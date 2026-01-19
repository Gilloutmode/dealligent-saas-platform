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
  FileDown,
  Target,
  Lightbulb,
  Shield,
  BookOpen,
} from 'lucide-react'
import type { StoredAnalysis } from '../../types/n8n'

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
  /** Callback when "Export PDF" is clicked (future feature) */
  onExportPDF?: (analysis: StoredAnalysis) => void
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

/**
 * Parse quality score string to percentage number
 * Handles formats: "11/12 (92%)" or just "92"
 */
function parseConfidenceScore(qualityScore?: string): number {
  if (!qualityScore) return 0

  // Try to extract percentage from "(XX%)" format
  const percentMatch = qualityScore.match(/\((\d+)%\)/)
  if (percentMatch) {
    return parseInt(percentMatch[1], 10)
  }

  // Try to extract first number from "X/Y" format
  const fractionMatch = qualityScore.match(/^(\d+)\/(\d+)/)
  if (fractionMatch) {
    const numerator = parseInt(fractionMatch[1], 10)
    const denominator = parseInt(fractionMatch[2], 10)
    return denominator > 0 ? Math.round((numerator / denominator) * 100) : 0
  }

  // Fallback: try to parse as plain number
  const plainNumber = parseInt(qualityScore, 10)
  return isNaN(plainNumber) ? 0 : plainNumber
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
  onExportPDF,
}: {
  analysis: StoredAnalysis
  onViewResults?: (analysis: StoredAnalysis) => void
  onExportPDF?: (analysis: StoredAnalysis) => void
}): React.ReactElement {
  const data = analysis.response?.data
  const threatLevel = data?.threatLevel
  const confidenceScore = parseConfidenceScore(data?.qualityScore)

  // Calculate total insights: strengths + weaknesses
  const strengthsCount = data?.strengths?.length || 0
  const weaknessesCount = data?.weaknessesvsCDS?.length || 0
  const totalInsights = strengthsCount + weaknessesCount

  // Source metrics (n8n V12.3)
  const sourcesConsulted = data?.sourcesConsulted as number | undefined
  const sourcesCited = data?.sourcesCited as number | undefined

  // Threat level badge config
  const getThreatConfig = (level?: string) => {
    switch (level?.toUpperCase()) {
      case 'HIGH':
        return { badge: 'badge-glow-red', label: 'Élevée' }
      case 'MEDIUM':
        return { badge: 'badge-glow-orange', label: 'Moyenne' }
      case 'LOW':
        return { badge: 'badge-glow-green', label: 'Faible' }
      default:
        return { badge: 'badge-glow-info', label: 'N/A' }
    }
  }

  const threatConfig = getThreatConfig(threatLevel)

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

      {/* KPI Badges Row */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {/* Threat Level Badge */}
        {threatLevel && (
          <motion.span
            className={`${threatConfig.badge} text-xs`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <Shield className="w-3 h-3" />
            Menace: {threatConfig.label}
          </motion.span>
        )}

        {/* Confidence Score Badge */}
        <motion.span
          className="badge-glow-blue text-xs"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <Target className="w-3 h-3" />
          Conf: {confidenceScore}%
        </motion.span>

        {/* Insights Count Badge */}
        <motion.span
          className="badge-glow-purple text-xs"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <Lightbulb className="w-3 h-3" />
          {totalInsights} insight{totalInsights > 1 ? 's' : ''}
        </motion.span>

        {/* Sources Consulted Badge */}
        {(sourcesConsulted !== undefined || sourcesCited !== undefined) && (
          <motion.span
            className="badge-glow-cyan text-xs"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <BookOpen className="w-3 h-3" />
            {sourcesConsulted ?? '-'} consultées → {sourcesCited ?? '-'} citées
          </motion.span>
        )}
      </div>

      {/* Action Buttons Row */}
      <div className="flex items-center gap-2">
        {/* View Results Button - Primary */}
        {onViewResults && (
          <motion.button
            onClick={() => onViewResults(analysis)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl btn-premium text-sm font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Eye className="w-4 h-4" />
            Voir les résultats
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        )}

        {/* Export PDF Button - Disabled */}
        <motion.button
          onClick={onExportPDF ? () => onExportPDF(analysis) : undefined}
          className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-secondary text-sm font-medium opacity-50 cursor-not-allowed"
          title="Bientôt disponible"
          disabled
        >
          <FileDown className="w-4 h-4" />
          PDF
        </motion.button>
      </div>
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
  onExportPDF,
}: AnalysisStatusCardProps): React.ReactElement {
  const { status, competitor, analysisType, sources } = analysis

  // Get source count: for completed analyses, prefer response data over request sources
  const data = analysis.response?.data
  const displaySourcesCount =
    (data?.sourcesConsulted as number | undefined) ||
    (data?.sourceLinksStructured as unknown[] | undefined)?.length ||
    (Array.isArray(data?.sourceLinks) ? (data.sourceLinks as unknown[]).length : undefined) ||
    sources.length

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
            {displaySourcesCount > 0 && ` • ${displaySourcesCount} source${displaySourcesCount > 1 ? 's' : ''}`}
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
      {status === 'completed' && <CompletedState analysis={analysis} onViewResults={onViewResults} onExportPDF={onExportPDF} />}
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
