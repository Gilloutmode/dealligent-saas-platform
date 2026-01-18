// =============================================================================
// DEALLIGENT PLATFORM - COMPETITORS PAGE
// Complete competitor monitoring with analysis data integration
// =============================================================================

"use client"

import { useState, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  Plus,
  Target,
  BarChart3,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react'
import { useAnalysis } from '../contexts/AnalysisContext'
import { competitors as staticCompetitors, watchlistItems } from '../data/clientData'
import { transformStoredToUI } from '../utils/analysisTransform'
import { EnrichedKPICard } from '../components/ui/EnrichedKPICard'
import { CompetitorGrid, type MergedCompetitor, AddCompetitorModal, type NewCompetitor } from '../components/competitors'

// =============================================================================
// FLEXIBLE COMPETITOR MATCHING
// Handles cases like "nTopology" matching "nTop"
// =============================================================================

/**
 * Flexible name matching for competitor/analysis pairing
 * Returns true if names are considered a match
 */
function isCompetitorMatch(analysisName: string, competitorName: string): boolean {
  const a = analysisName.toLowerCase().trim()
  const c = competitorName.toLowerCase().trim()

  // 1. Exact match
  if (a === c) return true

  // 2. One contains the other (handles "nTopology" vs "nTop")
  if (a.includes(c) || c.includes(a)) return true

  // 3. Word-based matching (split by common separators)
  const normalize = (s: string) => s.replace(/[-_\s]+/g, ' ').split(' ').filter(Boolean)
  const aWords = normalize(a)
  const cWords = normalize(c)

  // Check if any significant word matches
  for (const aw of aWords) {
    for (const cw of cWords) {
      // Match if words share a significant prefix (min 3 chars)
      if (aw.length >= 3 && cw.length >= 3) {
        const minLen = Math.min(aw.length, cw.length)
        if (aw.slice(0, minLen) === cw.slice(0, minLen)) return true
      }
    }
  }

  return false
}

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

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function CompetitorsPage() {
  const { completedAnalyses } = useAnalysis()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [localCompetitors, setLocalCompetitors] = useState<typeof staticCompetitors>([])

  // Merge static competitors with dynamic analysis data
  const mergedCompetitors = useMemo<MergedCompetitor[]>(() => {
    const allCompetitors = [...staticCompetitors, ...localCompetitors]

    return allCompetitors.map(competitor => {
      // Find latest analysis for this competitor (flexible matching)
      const latestAnalysis = completedAnalyses
        .filter(a => isCompetitorMatch(a.competitor, competitor.name))
        .sort((a, b) => new Date(b.completedAt || 0).getTime() - new Date(a.completedAt || 0).getTime())[0]

      // Find watchlist data
      const watchlistItem = watchlistItems.find(w => w.competitor.id === competitor.id)

      // Transform analysis if exists
      const transformedAnalysis = latestAnalysis ? transformStoredToUI(latestAnalysis) : null

      return {
        id: competitor.id,
        name: competitor.name,
        website: competitor.website,
        threatLevel: transformedAnalysis?.threatLevel || competitor.threatLevel,
        marketShare: competitor.marketShare,
        description: competitor.description,
        latestAnalysis: transformedAnalysis ? {
          id: transformedAnalysis.id,
          score: transformedAnalysis.score,
          completedAt: transformedAnalysis.completedAt,
          threatLevel: transformedAnalysis.threatLevel,
          intelligenceGrade: transformedAnalysis.intelligenceGrade,
          qualityScore: transformedAnalysis.qualityScore,
        } : null,
        watchlistData: watchlistItem ? {
          lastUpdate: watchlistItem.lastUpdate,
          alerts: watchlistItem.alerts,
          score: watchlistItem.score,
          trend: watchlistItem.trend,
          recentChanges: watchlistItem.recentChanges,
        } : null,
        hasAnalysis: !!transformedAnalysis,
      }
    })
  }, [completedAnalyses, localCompetitors])

  // Calculate KPI stats
  const stats = useMemo(() => {
    const analyzedCount = mergedCompetitors.filter(c => c.hasAnalysis).length
    const avgScore = mergedCompetitors
      .filter(c => c.latestAnalysis?.score)
      .reduce((sum, c, _, arr) => sum + (c.latestAnalysis?.score || 0) / arr.length, 0)
    const highThreatCount = mergedCompetitors.filter(c => c.threatLevel === 'high').length

    return {
      total: mergedCompetitors.length,
      analyzed: analyzedCount,
      avgScore: Math.round(avgScore),
      highThreat: highThreatCount,
    }
  }, [mergedCompetitors])

  // Handle add competitor
  const handleAddCompetitor = useCallback((newCompetitor: NewCompetitor) => {
    const competitor = {
      id: `custom-${Date.now()}`,
      name: newCompetitor.name,
      website: newCompetitor.website,
      threatLevel: newCompetitor.threatLevel,
      marketShare: 0,
      description: newCompetitor.description,
    }
    setLocalCompetitors(prev => [...prev, competitor])
  }, [])

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-8 max-w-7xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-600/25">
              <Users className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[var(--text-primary)]">
                Compétiteurs
              </h1>
              <p className="text-[var(--text-secondary)]">
                Surveillez et analysez vos concurrents
              </p>
            </div>
          </div>

          {/* Add Competitor Button */}
          <motion.button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg shadow-blue-600/25 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="w-5 h-5" />
            Ajouter
          </motion.button>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <EnrichedKPICard
            label="Total Concurrents"
            value={stats.total}
            icon={<Target className="w-5 h-5" />}
            iconBg="blue"
            trend={{
              direction: 'up',
              value: 12,
              label: 'vs. mois dernier',
            }}
            delay={0}
          />
          <EnrichedKPICard
            label="Analysés"
            value={stats.analyzed}
            icon={<BarChart3 className="w-5 h-5" />}
            iconBg="green"
            trend={{
              direction: 'up',
              value: Math.round((stats.analyzed / stats.total) * 100),
              label: `${stats.analyzed}/${stats.total} analysés`,
            }}
            delay={0.1}
          />
          <EnrichedKPICard
            label="Score Moyen"
            value={stats.avgScore}
            suffix="%"
            icon={<TrendingUp className="w-5 h-5" />}
            iconBg="purple"
            trend={{
              direction: stats.avgScore > 70 ? 'up' : 'down',
              value: 5,
              label: 'Qualité données',
            }}
            delay={0.2}
          />
          <EnrichedKPICard
            label="Menaces Hautes"
            value={stats.highThreat}
            icon={<AlertTriangle className="w-5 h-5" />}
            iconBg="red"
            trend={{
              direction: stats.highThreat > 3 ? 'up' : 'neutral',
              value: stats.highThreat,
              label: 'Nécessitent attention',
            }}
            delay={0.3}
          />
        </div>
      </motion.div>

      {/* Section Title */}
      <motion.div variants={itemVariants} className="mb-6">
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
          Tous les concurrents
        </h2>
        <p className="text-sm text-[var(--text-muted)]">
          Cliquez sur un concurrent pour voir les détails ou lancer une analyse
        </p>
      </motion.div>

      {/* Competitor Grid */}
      <motion.div variants={itemVariants}>
        <CompetitorGrid
          competitors={mergedCompetitors}
          onAddCompetitor={() => setIsModalOpen(true)}
        />
      </motion.div>

      {/* Add Competitor Modal */}
      <AddCompetitorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddCompetitor}
      />
    </motion.div>
  )
}

export default CompetitorsPage
