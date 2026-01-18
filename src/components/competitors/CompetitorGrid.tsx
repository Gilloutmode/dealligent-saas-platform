"use client"

import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  Filter,
  Shield,
  AlertTriangle,
  Activity,
  X,
} from 'lucide-react'
import { EnhancedCompetitorCard, type ThreatLevel, type TrendDirection } from './EnhancedCompetitorCard'

// =============================================================================
// TYPES
// =============================================================================

export interface MergedCompetitor {
  id: string
  name: string
  website: string
  threatLevel: string
  marketShare: number
  description: string
  latestAnalysis: {
    id: string
    score?: number
    completedAt?: Date
    threatLevel: string
    intelligenceGrade?: string
    qualityScore?: string
  } | null
  watchlistData: {
    lastUpdate: string
    alerts: number
    score: number
    trend: string
    recentChanges: string[]
  } | null
  hasAnalysis: boolean
}

export interface CompetitorGridProps {
  competitors: MergedCompetitor[]
  onAddCompetitor: () => void
}

// =============================================================================
// FILTER CONFIG
// =============================================================================

const threatFilters = [
  { value: 'all', label: 'Tous', icon: Filter },
  { value: 'high', label: 'High', icon: AlertTriangle, color: 'red' },
  { value: 'medium', label: 'Medium', icon: Activity, color: 'amber' },
  { value: 'low', label: 'Low', icon: Shield, color: 'emerald' },
] as const

type ThreatFilter = typeof threatFilters[number]['value']

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
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.2 },
  },
}

// =============================================================================
// FILTER BUTTON COMPONENT
// =============================================================================

function FilterButton({
  filter,
  isActive,
  onClick,
}: {
  filter: typeof threatFilters[number]
  isActive: boolean
  onClick: () => void
}) {
  const Icon = filter.icon
  const colorClasses = {
    red: 'bg-red-500/15 text-red-400 border-red-500/30',
    amber: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    emerald: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  }

  return (
    <motion.button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
        border transition-all duration-200
        ${isActive
          ? filter.value === 'all'
            ? 'bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] border-[var(--accent-primary)]/30'
            : colorClasses[filter.color as keyof typeof colorClasses]
          : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border-default)] hover:border-[var(--border-hover)]'
        }
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Icon className="w-4 h-4" />
      {filter.label}
    </motion.button>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function CompetitorGrid({ competitors }: CompetitorGridProps) {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [threatFilter, setThreatFilter] = useState<ThreatFilter>('all')

  // Filter competitors
  const filteredCompetitors = useMemo(() => {
    return competitors.filter(c => {
      // Search filter
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase())

      // Threat level filter
      const matchesThreat = threatFilter === 'all' ||
        c.threatLevel.toLowerCase() === threatFilter

      return matchesSearch && matchesThreat
    })
  }, [competitors, searchQuery, threatFilter])

  // Action handlers
  const handleViewDetails = useCallback((competitor: MergedCompetitor) => {
    if (competitor.latestAnalysis) {
      navigate(`/results/${competitor.latestAnalysis.id}`)
    }
  }, [navigate])

  const handleRegenerate = useCallback((competitor: MergedCompetitor) => {
    navigate(`/launch-analysis?competitor=${encodeURIComponent(competitor.name)}&regenerate=true`)
  }, [navigate])

  const handleLaunch = useCallback((competitor: MergedCompetitor) => {
    navigate(`/launch-analysis?competitor=${encodeURIComponent(competitor.name)}`)
  }, [navigate])

  const handleExportPDF = useCallback((competitor: MergedCompetitor) => {
    // Basic PDF export - open print dialog for now
    // In production, use jsPDF or similar
    if (competitor.latestAnalysis) {
      // Navigate to results page and trigger print
      const resultsUrl = `/results/${competitor.latestAnalysis.id}`
      const printWindow = window.open(resultsUrl, '_blank')
      if (printWindow) {
        printWindow.addEventListener('load', () => {
          setTimeout(() => {
            printWindow.print()
          }, 1000)
        })
      }
    }
  }, [])

  // Map threat level to correct format
  const mapThreatLevel = (level: string): ThreatLevel => {
    switch (level.toLowerCase()) {
      case 'high': return 'HIGH'
      case 'medium': return 'MEDIUM'
      case 'low': return 'LOW'
      default: return 'MEDIUM'
    }
  }

  // Map trend to correct format
  const mapTrend = (trend?: string): TrendDirection => {
    switch (trend?.toLowerCase()) {
      case 'up': return 'up'
      case 'down': return 'down'
      default: return 'neutral'
    }
  }

  // Generate sparkline data from recent changes or activity
  const generateSparklineData = (competitor: MergedCompetitor): number[] => {
    if (competitor.watchlistData?.recentChanges) {
      // Generate pseudo-data based on number of changes
      const baseScore = competitor.watchlistData.score || 50
      return Array.from({ length: 8 }, (_, i) =>
        baseScore - 20 + Math.random() * 40 + (i * 3)
      )
    }
    return []
  }

  return (
    <div className="space-y-6">
      {/* Filters Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
      >
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Rechercher un concurrent..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/20 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-[var(--bg-tertiary)] transition-colors"
            >
              <X className="w-3.5 h-3.5 text-[var(--text-muted)]" />
            </button>
          )}
        </div>

        {/* Threat Level Filters */}
        <div className="flex flex-wrap gap-2">
          {threatFilters.map((filter) => (
            <FilterButton
              key={filter.value}
              filter={filter}
              isActive={threatFilter === filter.value}
              onClick={() => setThreatFilter(filter.value)}
            />
          ))}
        </div>
      </motion.div>

      {/* Results Count */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-sm text-[var(--text-muted)]"
      >
        {filteredCompetitors.length} concurrent{filteredCompetitors.length !== 1 ? 's' : ''} trouvé{filteredCompetitors.length !== 1 ? 's' : ''}
      </motion.p>

      {/* Grid */}
      <AnimatePresence mode="popLayout">
        {filteredCompetitors.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filteredCompetitors.map((competitor, index) => (
              <motion.div
                key={competitor.id}
                variants={itemVariants}
                layout
              >
                <EnhancedCompetitorCard
                  name={competitor.name}
                  industry="CAO/FAO"
                  threatLevel={mapThreatLevel(competitor.latestAnalysis?.threatLevel || competitor.threatLevel)}
                  qualityScore={competitor.latestAnalysis?.score}
                  intelligenceGrade={competitor.latestAnalysis?.intelligenceGrade}
                  trend={mapTrend(competitor.watchlistData?.trend)}
                  trendValue={competitor.watchlistData?.score ? Math.round(competitor.watchlistData.score / 10) : undefined}
                  sparklineData={generateSparklineData(competitor)}
                  lastAnalysisDate={competitor.latestAnalysis?.completedAt || competitor.watchlistData?.lastUpdate}
                  analysisId={competitor.latestAnalysis?.id}
                  hasAnalysis={competitor.hasAnalysis}
                  alerts={competitor.watchlistData?.alerts}
                  onViewDetails={() => handleViewDetails(competitor)}
                  onRegenerate={() => handleRegenerate(competitor)}
                  onExportPDF={() => handleExportPDF(competitor)}
                  onLaunchAnalysis={() => handleLaunch(competitor)}
                  delay={index * 0.05}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-[var(--text-muted)]" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
              Aucun résultat
            </h3>
            <p className="text-sm text-[var(--text-muted)] max-w-sm">
              Aucun concurrent ne correspond à votre recherche. Essayez avec d'autres termes ou ajustez les filtres.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CompetitorGrid
