// =============================================================================
// DEALLIGENT PLATFORM - RESULTS PAGE
// View completed analysis results with Linear/Vercel style design
// =============================================================================

import { useState, useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText,
  Search,
  Calendar,
  Clock,
  CheckCircle2,
  Play,
  FileSearch,
  TrendingUp,
} from 'lucide-react'
import { useAnalysis } from '../contexts/AnalysisContext'
import { transformStoredToUI } from '../utils/analysisTransform'
import { AnalysisDetailView } from '../components/results/AnalysisDetailView'
import { NumberTicker } from '../components/ui/NumberTicker'
import type { UIAnalysisResult } from '../types/analysis'

// =============================================================================
// ANIMATION VARIANTS
// =============================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function formatDate(date: Date): string {
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

const threatConfig = {
  high: {
    bg: 'bg-gradient-to-br from-red-500 to-rose-600 shadow-lg shadow-red-500/25',
    badge: 'bg-red-500/15 text-red-400 border-red-500/20',
    label: 'Élevée',
  },
  medium: {
    bg: 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/25',
    badge: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
    label: 'Moyenne',
  },
  low: {
    bg: 'bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-lg shadow-emerald-500/25',
    badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
    label: 'Faible',
  },
}

// =============================================================================
// EMPTY STATE COMPONENT
// =============================================================================

function EmptyState({ onLaunchClick }: { onLaunchClick: () => void }) {
  return (
    <motion.div
      variants={itemVariants}
      className="card-glass p-16 text-center"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--accent-primary)] to-[#8B5CF6] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[var(--accent-primary)]/25"
      >
        <FileSearch className="w-10 h-10 text-white" />
      </motion.div>
      <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
        Aucune analyse terminée
      </h3>
      <p className="text-[var(--text-muted)] mb-6 max-w-md mx-auto">
        Lancez votre première analyse pour voir les résultats ici.
        Les insights, SWOT et recommandations apparaîtront une fois l'analyse complétée.
      </p>
      <motion.button
        onClick={onLaunchClick}
        className="btn-premium inline-flex items-center gap-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Play className="w-4 h-4" />
        Lancer une analyse
      </motion.button>
    </motion.div>
  )
}

// =============================================================================
// ANALYSIS LIST ITEM (Enriched)
// Premium card with confidence score, tags, and key findings preview
// =============================================================================

interface AnalysisListItemProps {
  analysis: UIAnalysisResult
  isSelected: boolean
  onClick: () => void
  delay?: number
}

function AnalysisListItem({ analysis, isSelected, onClick, delay = 0 }: AnalysisListItemProps) {
  const threat = threatConfig[analysis.threatLevel]
  const confidenceScore = typeof analysis.score === 'number'
    ? analysis.score
    : typeof analysis.qualityScore === 'number'
      ? analysis.qualityScore
      : 0

  // Get first 2 key findings
  const previewFindings = analysis.keyFindings?.slice(0, 2) || []

  // Get score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400'
    if (score >= 60) return 'text-amber-400'
    return 'text-red-400'
  }

  return (
    <motion.div
      variants={itemVariants}
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300
        bg-[var(--bg-card)] border group
        ${isSelected
          ? 'border-[var(--accent-primary)] shadow-[var(--shadow-glow)]'
          : 'border-[var(--border-default)] hover:border-[var(--border-hover)]'
        }
      `}
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Glow effect on hover */}
      <div className={`
        absolute -inset-1 bg-gradient-to-br ${threat.bg.replace('shadow-lg', '')} opacity-0
        group-hover:opacity-10 blur-xl transition-opacity duration-500 -z-10
      `} />

      <div className="p-4">
        {/* Header Row */}
        <div className="flex items-center gap-3 mb-3">
          {/* Logo */}
          <div className={`w-11 h-11 rounded-xl ${threat.bg} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
            {analysis.competitor.slice(0, 2).toUpperCase()}
          </div>

          {/* Name + Date */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-[var(--text-primary)] truncate text-sm">
              {analysis.competitor}
            </h3>
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
              <Calendar className="w-3 h-3" />
              {formatDate(analysis.createdAt)}
              <span className="text-[var(--border-default)]">•</span>
              <Clock className="w-3 h-3" />
              {analysis.duration}
            </div>
          </div>

          {/* Threat Badge */}
          <div className={`px-2 py-0.5 rounded-lg text-xs font-semibold border ${threat.badge}`}>
            {threat.label}
          </div>
        </div>

        {/* Confidence Score + Insights Count */}
        <div className="flex items-center justify-between mb-3 py-2 px-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-light)]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className={`w-3.5 h-3.5 ${getScoreColor(confidenceScore)}`} />
            <span className="text-xs text-[var(--text-secondary)]">Confiance</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-baseline gap-0.5">
              <NumberTicker
                value={confidenceScore}
                delay={delay}
                className={`text-lg font-bold ${getScoreColor(confidenceScore)}`}
              />
              <span className="text-xs text-[var(--text-muted)]">%</span>
            </div>
            {analysis.insights > 0 && (
              <>
                <div className="w-px h-4 bg-[var(--border-light)]" />
                <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                  <TrendingUp className="w-3 h-3" />
                  {analysis.insights}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Key Findings Preview */}
        {previewFindings.length > 0 && (
          <div className="space-y-1.5 mb-2">
            {previewFindings.map((finding, index) => (
              <div key={index} className="flex items-start gap-2 text-xs">
                <div className="w-1 h-1 rounded-full bg-[var(--accent-primary)] mt-1.5 shrink-0" />
                <span className="text-[var(--text-secondary)] line-clamp-1">{finding}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

export function ResultsPage() {
  const navigate = useNavigate()
  const { analysisId } = useParams<{ analysisId?: string }>()
  const { completedAnalyses } = useAnalysis()

  // Transform stored analyses to UI format
  const analyses = useMemo(
    () => completedAnalyses.map(transformStoredToUI),
    [completedAnalyses]
  )

  // State
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedAnalysis, setSelectedAnalysis] = useState<UIAnalysisResult | null>(null)

  // Auto-select analysis from URL param
  useEffect(() => {
    if (analysisId && completedAnalyses.length > 0) {
      const stored = completedAnalyses.find(a => a.id === analysisId)
      if (stored) {
        setSelectedAnalysis(transformStoredToUI(stored))
      }
    }
  }, [analysisId, completedAnalyses])

  // Auto-select first analysis if none selected on desktop
  useEffect(() => {
    if (!selectedAnalysis && analyses.length > 0 && window.innerWidth >= 1024) {
      setSelectedAnalysis(analyses[0])
    }
  }, [analyses, selectedAnalysis])

  // Filter analyses by search
  const filteredAnalyses = analyses.filter((a) => {
    const query = searchQuery.toLowerCase()
    return (
      a.title.toLowerCase().includes(query) ||
      a.competitor.toLowerCase().includes(query)
    )
  })

  // Handle selection
  const handleSelect = (analysis: UIAnalysisResult) => {
    setSelectedAnalysis(analysis)
    navigate(`/results/${analysis.id}`, { replace: true })
  }

  const handleClose = () => {
    setSelectedAnalysis(null)
    navigate('/results', { replace: true })
  }

  // Empty state
  if (analyses.length === 0) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-8 max-w-4xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent-primary)] to-[#8B5CF6] flex items-center justify-center shadow-lg shadow-[var(--accent-primary)]/25">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[var(--text-primary)]">
                Résultats d'analyses
              </h1>
              <p className="text-[var(--text-secondary)]">
                Consultez les résultats de vos analyses concurrentielles
              </p>
            </div>
          </div>
        </motion.div>

        <EmptyState onLaunchClick={() => navigate('/launch-analysis')} />
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="h-full flex flex-col lg:flex-row"
    >
      {/* Left Panel - List */}
      <div className="w-full lg:w-96 lg:border-r border-[var(--border-light)] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[var(--border-light)]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent-primary)] to-[#8B5CF6] flex items-center justify-center shadow-lg shadow-[var(--accent-primary)]/25">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[var(--text-primary)]">
                Résultats
              </h1>
              <p className="text-xs text-[var(--text-muted)]">
                {analyses.length} analyse{analyses.length > 1 ? 's' : ''} terminée{analyses.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-light)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)]/50 focus:ring-2 focus:ring-[var(--accent-primary)]/20 transition-all text-sm"
            />
          </div>
        </div>

        {/* List with Stagger Animations */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 overflow-y-auto p-4 space-y-3"
        >
          {filteredAnalyses.length > 0 ? (
            filteredAnalyses.map((analysis, index) => (
              <AnalysisListItem
                key={analysis.id}
                analysis={analysis}
                isSelected={selectedAnalysis?.id === analysis.id}
                onClick={() => handleSelect(analysis)}
                delay={index * 0.06}
              />
            ))
          ) : (
            <div className="p-8 text-center">
              <p className="text-sm text-[var(--text-muted)]">
                Aucune analyse trouvée
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Right Panel - Detail */}
      <div className="flex-1 bg-[var(--bg-secondary)] hidden lg:block">
        <AnimatePresence mode="wait">
          {selectedAnalysis ? (
            <AnalysisDetailView
              key={selectedAnalysis.id}
              analysis={selectedAnalysis}
              onClose={handleClose}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex items-center justify-center"
            >
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-[var(--bg-tertiary)] flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-[var(--text-muted)]" />
                </div>
                <p className="text-[var(--text-muted)]">
                  Sélectionnez une analyse pour voir les détails
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Detail Modal */}
      <AnimatePresence>
        {selectedAnalysis && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[var(--bg-primary)] lg:hidden"
          >
            <AnalysisDetailView
              analysis={selectedAnalysis}
              onClose={handleClose}
              isModal={true}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default ResultsPage
