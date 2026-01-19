// =============================================================================
// DEALLIGENT PLATFORM - RESULTS PAGE
// View completed analysis results with Linear/Vercel style design
// Custom resizable panels implementation
// =============================================================================

import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText,
  Search,
  Play,
  FileSearch,
  GripVertical,
} from 'lucide-react'
import { useAnalysis } from '../contexts/AnalysisContext'
import { transformStoredToUI } from '../utils/analysisTransform'
import { AnalysisDetailView } from '../components/results/AnalysisDetailView'
import { CompetitorCard, type CompetitorCardProps } from '../components/results/CompetitorCard'
import type { UIAnalysisResult } from '../types/analysis'

// =============================================================================
// CONSTANTS
// =============================================================================

const STORAGE_KEY = 'dealligent-results-panel-width'
const DEFAULT_LEFT_WIDTH = 400 // pixels
const MIN_LEFT_WIDTH = 280
const MAX_LEFT_WIDTH_PERCENT = 0.6 // 60% of container

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
// TRANSFORM ANALYSIS TO CARD PROPS
// =============================================================================

function transformToCardProps(analysis: UIAnalysisResult): CompetitorCardProps['competitor'] {
  const confidenceScore = typeof analysis.score === 'number'
    ? analysis.score
    : typeof analysis.qualityScore === 'number'
      ? analysis.qualityScore
      : 0

  // Get sources count - priority: sourcesConsulted > sourceLinksStructured > sourceLinks array > sources
  const analysisAny = analysis as unknown as Record<string, unknown>
  const sourcesCount =
    (typeof analysisAny.sourcesConsulted === 'number' ? analysisAny.sourcesConsulted : 0) ||
    (analysis.sourceLinksStructured?.length) ||
    (Array.isArray(analysis.sourceLinks) ? analysis.sourceLinks.length : 0) ||
    (analysis.sources?.length || 0)

  const avatarColors = {
    high: 'from-red-500 to-rose-600',
    medium: 'from-amber-500 to-orange-600',
    low: 'from-emerald-500 to-cyan-500',
  }

  return {
    name: analysis.competitor,
    initials: analysis.competitor.slice(0, 2).toUpperCase(),
    avatarColor: avatarColors[analysis.threatLevel],
    analysisDate: analysis.createdAt,
    analysisDuration: analysis.duration,
    threatLevel: analysis.threatLevel,
    threatTrend: undefined,
    confidenceScore,
    opportunityScore: undefined,
    sourcesCount,
    keyInsights: analysis.keyFindings || [],
    winProbability: undefined,
    lastActivity: analysis.recentActivity?.[0],
  }
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
// CUSTOM RESIZE HANDLE HOOK
// =============================================================================

function useResizable(initialWidth: number, minWidth: number, maxWidthPercent: number) {
  const [width, setWidth] = useState(() => {
    if (typeof window === 'undefined') return initialWidth
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? parseInt(saved, 10) : initialWidth
  })

  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const maxWidth = containerRect.width * maxWidthPercent
      const newWidth = Math.min(Math.max(e.clientX - containerRect.left, minWidth), maxWidth)

      setWidth(newWidth)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      // Save to localStorage
      localStorage.setItem(STORAGE_KEY, width.toString())
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    // Prevent text selection while dragging
    document.body.style.userSelect = 'none'
    document.body.style.cursor = 'col-resize'

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.userSelect = ''
      document.body.style.cursor = ''
    }
  }, [isDragging, width, minWidth, maxWidthPercent])

  // Save width on change (debounced via mouseup)
  useEffect(() => {
    if (!isDragging) {
      localStorage.setItem(STORAGE_KEY, width.toString())
    }
  }, [width, isDragging])

  return { width, isDragging, handleMouseDown, containerRef }
}

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

export function ResultsPage() {
  const navigate = useNavigate()
  const { analysisId } = useParams<{ analysisId?: string }>()
  const { completedAnalyses } = useAnalysis()

  // Custom resizable hook
  const { width: leftPanelWidth, isDragging, handleMouseDown, containerRef } = useResizable(
    DEFAULT_LEFT_WIDTH,
    MIN_LEFT_WIDTH,
    MAX_LEFT_WIDTH_PERCENT
  )

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
      className="h-screen overflow-hidden"
    >
      {/* Desktop: Custom Resizable Panels */}
      <div
        ref={containerRef}
        className="hidden lg:flex h-full"
      >
        {/* Left Panel - Results List */}
        <div
          className="flex flex-col h-full border-r border-[var(--border-light)]"
          style={{ width: leftPanelWidth, minWidth: MIN_LEFT_WIDTH }}
        >
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
                <CompetitorCard
                  key={analysis.id}
                  competitor={transformToCardProps(analysis)}
                  isSelected={selectedAnalysis?.id === analysis.id}
                  onClick={() => handleSelect(analysis)}
                  delay={index}
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

        {/* Resize Handle */}
        <div
          onMouseDown={handleMouseDown}
          className={`
            w-2 cursor-col-resize flex items-center justify-center
            transition-colors relative group
            ${isDragging
              ? 'bg-[var(--accent-primary)]'
              : 'bg-transparent hover:bg-[var(--accent-primary)]/30'
            }
          `}
        >
          {/* Visual grip indicator */}
          <div className={`
            absolute top-1/2 -translate-y-1/2
            flex flex-col items-center gap-0.5
            transition-opacity
            ${isDragging ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
          `}>
            <GripVertical className="w-4 h-4 text-[var(--accent-primary)]" />
          </div>

          {/* Hover line indicator */}
          <div className={`
            absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5
            transition-all
            ${isDragging
              ? 'bg-[var(--accent-primary)] shadow-[0_0_8px_var(--accent-primary)]'
              : 'bg-transparent group-hover:bg-[var(--accent-primary)]/50'
            }
          `} />
        </div>

        {/* Right Panel - Analysis Detail */}
        <div className="flex-1 bg-[var(--bg-secondary)] flex flex-col overflow-hidden">
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
      </div>

      {/* Mobile: Stack Layout */}
      <div className="lg:hidden h-full flex flex-col">
        {/* Mobile Header */}
        <div className="p-4 border-b border-[var(--border-light)]">
          <div className="flex items-center gap-3 mb-3">
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

        {/* Mobile List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 overflow-y-auto p-4 space-y-3"
        >
          {filteredAnalyses.length > 0 ? (
            filteredAnalyses.map((analysis, index) => (
              <CompetitorCard
                key={analysis.id}
                competitor={transformToCardProps(analysis)}
                isSelected={selectedAnalysis?.id === analysis.id}
                onClick={() => handleSelect(analysis)}
                delay={index}
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
