// =============================================================================
// DEALLIGENT PLATFORM - RESULTS PAGE
// View completed analysis results with real data from AnalysisContext
// =============================================================================

import { useState, useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText,
  Download,
  Share2,
  Search,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  TrendingUp,
  ChevronRight,
  X,
  Globe,
  Target,
  AlertTriangle,
  Lightbulb,
  Shield,
  Sparkles,
  Play,
  FileSearch,
} from 'lucide-react'
import { useAnalysis } from '../contexts/AnalysisContext'
import { transformStoredToUI, getAnalysisSummary } from '../utils/analysisTransform'
import { SWOTGrid } from '../components/analysis/SWOTGrid'
import type { UIAnalysisResult } from '../types/analysis'

// =============================================================================
// ANIMATION VARIANTS
// =============================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
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

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } },
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

const threatBadgeConfig = {
  high: 'badge-glow-red',
  medium: 'badge-glow-orange',
  low: 'badge-glow-green',
}

const threatLabels = {
  high: 'Élevée',
  medium: 'Moyenne',
  low: 'Faible',
}

const typeConfig = {
  quick: { label: 'Rapide', gradient: 'icon-gradient-blue' },
  standard: { label: 'Standard', gradient: 'icon-gradient-purple' },
  deep: { label: 'Approfondie', gradient: 'icon-gradient-orange' },
}

// =============================================================================
// EMPTY STATE COMPONENT
// =============================================================================

interface EmptyStateProps {
  onLaunchClick: () => void
}

function EmptyState({ onLaunchClick }: EmptyStateProps) {
  return (
    <motion.div
      variants={itemVariants}
      className="card-glass p-12 text-center"
    >
      <div className="w-20 h-20 rounded-2xl icon-gradient-blue flex items-center justify-center mx-auto mb-6 opacity-50">
        <FileSearch className="w-10 h-10 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-primary mb-2">
        Aucune analyse terminée
      </h3>
      <p className="text-secondary mb-6 max-w-md mx-auto">
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
// ANALYSIS CARD COMPONENT
// =============================================================================

interface AnalysisCardProps {
  analysis: UIAnalysisResult
  onViewDetails: (analysis: UIAnalysisResult) => void
}

function AnalysisCard({ analysis, onViewDetails }: AnalysisCardProps) {
  const type = typeConfig[analysis.type]

  return (
    <motion.div
      variants={itemVariants}
      className="card-premium p-6 group cursor-pointer"
      onClick={() => onViewDetails(analysis)}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl ${type.gradient} flex items-center justify-center`}>
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-primary group-hover:text-blue-primary transition-colors">
              {analysis.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(analysis.createdAt)}
              <span className="text-border">•</span>
              <Clock className="w-3.5 h-3.5" />
              {analysis.duration}
            </div>
          </div>
        </div>

        <span className="badge-glow-green flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4" />
          Terminée
        </span>
      </div>

      {/* Threat Assessment Badge */}
      <div className="mb-4 flex items-center gap-2">
        <span className={`${threatBadgeConfig[analysis.threatLevel]} flex items-center gap-1.5`}>
          <Shield className="w-3.5 h-3.5" />
          Menace: {threatLabels[analysis.threatLevel]}
        </span>
        <span className="badge-glow-purple flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          {type.label}
        </span>
      </div>

      {/* Competitor */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm text-muted">Concurrent:</span>
        <span className="badge-glow-blue text-xs">{analysis.competitor}</span>
      </div>

      {/* Key Findings Preview */}
      {analysis.keyFindings.length > 0 && (
        <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-info/10 to-blue-primary/10 border border-info/20">
          <p className="text-xs font-medium text-info mb-1 flex items-center gap-1">
            <Lightbulb className="w-3.5 h-3.5" />
            Insight clé
          </p>
          <p className="text-sm text-secondary line-clamp-2">{analysis.keyFindings[0]}</p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {analysis.score !== undefined && (
          <motion.div
            className="stat-card-premium text-center"
            whileHover={{ y: -2 }}
          >
            <p className="text-xs text-muted mb-0.5">Score</p>
            <div className="flex items-center justify-center gap-0.5">
              <span className="font-semibold text-sm text-success">{analysis.score}</span>
              <span className="text-xs text-muted">/100</span>
            </div>
          </motion.div>
        )}
        <motion.div
          className="stat-card-premium text-center"
          whileHover={{ y: -2 }}
        >
          <p className="text-xs text-muted mb-0.5">Insights</p>
          <span className="font-semibold text-sm text-primary">{analysis.insights}</span>
        </motion.div>
        <motion.div
          className="stat-card-premium text-center"
          whileHover={{ y: -2 }}
        >
          <p className="text-xs text-muted mb-0.5">Sources</p>
          <span className="font-semibold text-sm text-primary">{analysis.sources.length}</span>
        </motion.div>
      </div>

      {/* Sources */}
      {analysis.sources.length > 0 && (
        <div className="flex items-center gap-2 mb-4 text-xs text-muted">
          <div className="w-5 h-5 rounded-md icon-gradient-blue flex items-center justify-center">
            <Globe className="w-3 h-3 text-white" />
          </div>
          <span>Sources: {analysis.sources.slice(0, 2).join(', ')}</span>
          {analysis.sources.length > 2 && (
            <span className="text-border">+{analysis.sources.length - 2}</span>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex gap-2">
          <button
            onClick={(e) => e.stopPropagation()}
            className="p-2 rounded-lg bg-surface border border-border hover:border-blue-primary/30 hover:bg-blue-primary/10 transition-all"
            aria-label="Télécharger le rapport"
          >
            <Download className="w-4 h-4 text-muted" aria-hidden="true" />
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="p-2 rounded-lg bg-surface border border-border hover:border-blue-primary/30 hover:bg-blue-primary/10 transition-all"
            aria-label="Partager le rapport"
          >
            <Share2 className="w-4 h-4 text-muted" aria-hidden="true" />
          </button>
        </div>

        <span className="flex items-center gap-2 text-sm font-medium text-info group-hover:text-blue-primary transition-colors">
          Voir les résultats
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </motion.div>
  )
}

// =============================================================================
// ANALYSIS DETAILS MODAL
// =============================================================================

interface AnalysisModalProps {
  analysis: UIAnalysisResult
  onClose: () => void
}

function AnalysisModal({ analysis, onClose }: AnalysisModalProps) {
  const sentimentColors = {
    positive: 'text-success',
    negative: 'text-error',
    neutral: 'text-muted',
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="card-glass rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border-blue-primary/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-border bg-surface/80 backdrop-blur-sm">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2 text-primary">{analysis.title}</h2>
              <div className="flex items-center gap-3 text-sm text-muted flex-wrap">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {formatDate(analysis.createdAt)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {analysis.duration}
                </span>
                <span className={`${threatBadgeConfig[analysis.threatLevel]} flex items-center gap-1`}>
                  <Shield className="w-3 h-3" />
                  Menace {threatLabels[analysis.threatLevel]}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-hover transition-colors text-muted hover:text-primary"
              aria-label="Fermer la fenêtre"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)] space-y-6">
          {/* Score & Sources */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysis.score !== undefined && (
              <motion.div
                className="card-premium p-4"
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 rounded-xl icon-gradient-blue flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-primary">Score de qualité</h3>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-3 rounded-full bg-surface overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-primary to-info"
                      style={{ width: `${analysis.score}%` }}
                    />
                  </div>
                  <span className="font-bold text-lg text-info">{analysis.score}%</span>
                </div>
              </motion.div>
            )}
            <motion.div
              className="card-premium p-4"
              whileHover={{ y: -2 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-xl icon-gradient-green flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-primary">Sources utilisées</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {analysis.sources.length > 0 ? (
                  analysis.sources.map((source, index) => (
                    <span key={index} className="badge-glow-blue text-xs">
                      {source}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-muted italic">Aucune source spécifiée</span>
                )}
              </div>
            </motion.div>
          </div>

          {/* Key Findings */}
          {analysis.keyFindings.length > 0 && (
            <motion.div
              className="card-premium p-4"
              whileHover={{ y: -2 }}
            >
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-primary">
                <div className="w-8 h-8 rounded-lg icon-gradient-orange flex items-center justify-center">
                  <Lightbulb className="w-4 h-4 text-white" />
                </div>
                Découvertes clés
              </h3>
              <ul className="space-y-2">
                {analysis.keyFindings.map((finding, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-secondary">
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-primary to-info mt-2 shrink-0" />
                    {finding}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Strategic Recommendations */}
          {analysis.recommendations.length > 0 && (
            <motion.div
              className="card-premium p-4 bg-gradient-to-br from-success/5 to-transparent"
              whileHover={{ y: -2 }}
            >
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-success">
                <div className="w-8 h-8 rounded-lg icon-gradient-green flex items-center justify-center">
                  <Target className="w-4 h-4 text-white" />
                </div>
                Recommandations stratégiques
              </h3>
              <ul className="space-y-2">
                {analysis.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-secondary">
                    <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
                    {rec}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* SWOT Analysis using SWOTGrid component */}
          {(analysis.marketPosition.strengths.length > 0 ||
            analysis.marketPosition.weaknesses.length > 0 ||
            analysis.marketPosition.opportunities.length > 0 ||
            analysis.marketPosition.threats.length > 0) && (
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-primary">
                <div className="w-8 h-8 rounded-lg icon-gradient-purple flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-white" />
                </div>
                Analyse de positionnement (SWOT)
              </h3>
              <SWOTGrid
                strengths={analysis.marketPosition.strengths}
                weaknesses={analysis.marketPosition.weaknesses}
                opportunities={analysis.marketPosition.opportunities}
                threats={analysis.marketPosition.threats}
                maxItems={5}
              />
            </div>
          )}

          {/* Recent News */}
          {analysis.recentNews.length > 0 && (
            <motion.div
              className="card-premium p-4"
              whileHover={{ y: -2 }}
            >
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-primary">
                <div className="w-8 h-8 rounded-lg icon-gradient-blue flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-white" />
                </div>
                Actualités récentes
              </h3>
              <div className="space-y-2">
                {analysis.recentNews.map((news, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start justify-between p-3 rounded-xl bg-surface-secondary/50 border border-border"
                    whileHover={{ scale: 1.01 }}
                  >
                    <div>
                      <p className="font-medium text-sm text-primary">{news.title}</p>
                      <p className="text-xs text-muted">{news.source} • {news.date}</p>
                    </div>
                    <span className={`text-xs font-medium flex items-center gap-1 ${sentimentColors[news.sentiment]}`}>
                      {news.sentiment === 'positive' ? '↑ Positif' : news.sentiment === 'negative' ? '↓ Négatif' : '→ Neutre'}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Error message if analysis failed */}
          {analysis.error && (
            <motion.div
              className="card-premium p-4 bg-gradient-to-br from-error/10 to-transparent border-error/30"
              whileHover={{ y: -2 }}
            >
              <h3 className="font-semibold mb-2 flex items-center gap-2 text-error">
                <AlertTriangle className="w-5 h-5" />
                Erreur d'analyse
              </h3>
              <p className="text-sm text-secondary">{analysis.error}</p>
            </motion.div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-border flex items-center justify-between bg-surface/80 backdrop-blur-sm">
          <div className="flex gap-2">
            <button className="btn-ghost-glow flex items-center gap-2">
              <Download className="w-4 h-4" />
              Exporter PDF
            </button>
            <button className="btn-ghost-glow flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Partager
            </button>
          </div>
          <button onClick={onClose} className="btn-premium">
            Fermer
          </button>
        </div>
      </motion.div>
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

  // Transform stored analyses to UI format - memoized to prevent infinite loops
  const analyses = useMemo(
    () => completedAnalyses.map(transformStoredToUI),
    [completedAnalyses]
  )
  const stats = useMemo(() => getAnalysisSummary(analyses), [analyses])

  // State
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedAnalysis, setSelectedAnalysis] = useState<UIAnalysisResult | null>(null)

  // Auto-open modal if analysisId is in URL
  // Use completedAnalyses.length as dependency to avoid infinite loop
  useEffect(() => {
    if (analysisId && completedAnalyses.length > 0) {
      const stored = completedAnalyses.find(a => a.id === analysisId)
      if (stored) {
        const transformed = transformStoredToUI(stored)
        console.log('[Results] Auto-opening modal for:', analysisId, transformed)
        setSelectedAnalysis(transformed)
      }
    }
  }, [analysisId, completedAnalyses])

  // Filter analyses by search
  const filteredAnalyses = analyses.filter((a) => {
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.competitor.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  // Handle closing modal - also clear URL param
  const handleCloseModal = () => {
    setSelectedAnalysis(null)
    // If we have an analysisId in URL, navigate back to /results
    if (analysisId) {
      navigate('/results', { replace: true })
    }
  }

  // Handle opening modal - update URL
  const handleViewDetails = (analysis: UIAnalysisResult) => {
    setSelectedAnalysis(analysis)
    navigate(`/results/${analysis.id}`, { replace: true })
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="page-container"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="hero-premium">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl icon-gradient-blue flex items-center justify-center">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="page-title">Résultats d'analyses</h1>
                {analyses.length > 0 && (
                  <span className="badge-glow-blue flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {analyses.length} terminée{analyses.length > 1 ? 's' : ''}
                  </span>
                )}
              </div>
              <p className="text-muted text-sm">
                Consultez les résultats de vos analyses concurrentielles
              </p>
            </div>
          </div>

          {analyses.length > 0 && (
            <button className="btn-premium flex items-center gap-2">
              <Download className="w-4 h-4" />
              Exporter tout
            </button>
          )}
        </div>
      </motion.div>

      {/* Show stats and content only if there are analyses */}
      {analyses.length > 0 ? (
        <>
          {/* Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div
              className="stat-card-premium"
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl icon-gradient-blue flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{stats.total}</p>
                  <p className="text-sm text-muted">Total analyses</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="stat-card-premium"
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl icon-gradient-green flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{stats.completed}</p>
                  <p className="text-sm text-muted">Terminées</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="stat-card-premium"
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl icon-gradient-orange flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold gradient-text-blue">{stats.averageScore}%</p>
                  <p className="text-sm text-muted">Score moyen</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="stat-card-premium"
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl icon-gradient-purple flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{stats.totalInsights}</p>
                  <p className="text-sm text-muted">Total insights</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Search */}
          <motion.div variants={itemVariants} className="card-glass p-5">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type="text"
                placeholder="Rechercher une analyse ou un concurrent..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-xl bg-surface border border-border text-primary placeholder:text-muted focus:outline-none focus:border-blue-primary/50 focus:ring-2 focus:ring-blue-primary/20 transition-all"
              />
            </div>
          </motion.div>

          {/* Results Grid */}
          {filteredAnalyses.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredAnalyses.map((analysis) => (
                <AnalysisCard
                  key={analysis.id}
                  analysis={analysis}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          ) : (
            <motion.div variants={itemVariants} className="card-glass p-12 text-center">
              <div className="w-20 h-20 rounded-2xl icon-gradient-blue flex items-center justify-center mx-auto mb-4 opacity-50">
                <FileText className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-primary">Aucune analyse trouvée</h3>
              <p className="text-muted">
                Modifiez votre recherche pour trouver des résultats.
              </p>
            </motion.div>
          )}
        </>
      ) : (
        /* Empty state when no completed analyses */
        <EmptyState onLaunchClick={() => navigate('/launch-analysis')} />
      )}

      {/* Analysis Details Modal */}
      <AnimatePresence>
        {selectedAnalysis && (
          <AnalysisModal
            analysis={selectedAnalysis}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default ResultsPage
