"use client"

import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Download,
  Share2,
  CheckCircle2,
  Target,
  X,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ScoreOverview } from './ScoreOverview'
import { CompanyInfoPanel } from './CompanyInfoPanel'
import { SWOTGrid } from './SWOTGrid'
import { RecentActivityPanel } from './RecentActivityPanel'
import { ActionRequiredPanel } from './ActionRequiredPanel'
import { SourcesSection } from './SourcesSection'
import type { UIAnalysisResult } from '../../types/analysis'

// =============================================================================
// ANALYSIS DETAIL VIEW COMPONENT
// Premium full-page view for analysis results
// =============================================================================

export interface AnalysisDetailViewProps {
  analysis: UIAnalysisResult
  onClose?: () => void
  isModal?: boolean
}

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

function formatDate(date: Date): string {
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const threatConfig = {
  high: {
    bg: 'bg-gradient-to-br from-red-500 to-rose-600',
    label: 'Élevée',
    badge: 'bg-red-500/15 text-red-400 border-red-500/20',
  },
  medium: {
    bg: 'bg-gradient-to-br from-amber-500 to-orange-600',
    label: 'Moyenne',
    badge: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
  },
  low: {
    bg: 'bg-gradient-to-br from-emerald-500 to-cyan-500',
    label: 'Faible',
    badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  },
}

// Count sources from sourceLinks string
function countSources(sourceLinks?: string): number {
  if (!sourceLinks) return 0
  const urlRegex = /https?:\/\/[^\s,]+/g
  const urls = sourceLinks.match(urlRegex) || []
  return urls.length
}

export function AnalysisDetailView({ analysis, onClose, isModal = false }: AnalysisDetailViewProps) {
  const navigate = useNavigate()
  const threat = threatConfig[analysis.threatLevel]

  // Extract score from qualityScore string like "11/12 (92%)"
  const qualityScore = typeof analysis.score === 'number'
    ? analysis.score
    : typeof analysis.qualityScore === 'number'
      ? analysis.qualityScore
      : 0

  // Get analysis type label
  const analysisTypeLabel = analysis.analysisType === 'deep'
    ? 'Analyse Approfondie'
    : analysis.analysisType === 'standard'
      ? 'Analyse Standard'
      : 'Analyse Rapide'

  // Get sources count
  const sourcesCount = analysis.sourceLinks
    ? countSources(analysis.sourceLinks)
    : analysis.sources.length

  const handleBack = () => {
    if (onClose) {
      onClose()
    } else {
      navigate('/results')
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col h-full"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="sticky top-0 z-10 bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-[var(--border-light)]"
      >
        <div className="px-6 py-4">
          {/* Top Row - Back button + Actions */}
          <div className="flex items-center justify-between mb-4">
            <motion.button
              onClick={handleBack}
              className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              whileHover={{ x: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowLeft className="w-4 h-4" />
              Retour aux résultats
            </motion.button>

            <div className="flex items-center gap-2">
              <motion.button
                className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Exporter PDF"
              >
                <Download className="w-5 h-5" />
              </motion.button>
              <motion.button
                className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Partager"
              >
                <Share2 className="w-5 h-5" />
              </motion.button>
              {isModal && (
                <motion.button
                  onClick={onClose}
                  className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Fermer"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              )}
            </div>
          </div>

          {/* Title Row */}
          <div className="flex items-start gap-4">
            <div className={`w-14 h-14 rounded-xl ${threat.bg} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
              {analysis.competitor.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-xl font-bold text-[var(--text-primary)]">
                  ANALYSE: {analysis.competitor}
                </h1>
                <span className={`px-2 py-0.5 rounded-lg text-xs font-semibold border ${threat.badge}`}>
                  Menace {threat.label}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-1 text-sm text-[var(--text-muted)] flex-wrap">
                <span className="flex items-center gap-1">
                  <Target className="w-3.5 h-3.5" />
                  {analysisTypeLabel}
                </span>
                <span className="text-[var(--border-default)]">•</span>
                <span>{sourcesCount} sources</span>
                <span className="text-[var(--border-default)]">•</span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Complétée {formatDate(analysis.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-6 space-y-6">
          {/* Row 1: Score Overview (Full Width) */}
          <motion.div variants={itemVariants}>
            <ScoreOverview
              qualityScore={qualityScore}
              threatLevel={analysis.threatLevel}
              intelligenceGrade={analysis.intelligenceGrade}
              insightsCount={analysis.insights}
            />
          </motion.div>

          {/* Row 2: Company Info (Full Width) */}
          <motion.div variants={itemVariants}>
            <CompanyInfoPanel
              companyName={analysis.competitor}
              headquarters={analysis.headquarters || 'Non spécifié'}
              foundedYear={analysis.foundedYear || 'N/A'}
              sourcesCount={sourcesCount}
            />
          </motion.div>

          {/* Row 3: SWOT Grid */}
          <motion.div variants={itemVariants}>
            <SWOTGrid
              strengths={analysis.analysisData?.strengths || []}
              weaknesses={analysis.analysisData?.weaknesses || []}
            />
          </motion.div>

          {/* Row 4: Recent Activity + Action Required */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <RecentActivityPanel activities={analysis.recentActivity || []} />
            </motion.div>

            <motion.div variants={itemVariants}>
              <ActionRequiredPanel
                action={analysis.actionRequired}
                onActionClick={() => navigate('/launch-analysis')}
              />
            </motion.div>
          </div>

          {/* Row 5: Sources */}
          <motion.div variants={itemVariants}>
            <SourcesSection
              sourceLinks={analysis.sourceLinks}
              sources={analysis.sources}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default AnalysisDetailView
