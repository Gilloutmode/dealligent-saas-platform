// =============================================================================
// DEALLIGENT PLATFORM - MY ANALYSES PAGE
// Dashboard for viewing and managing all analyses
// =============================================================================

import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Activity,
  Loader2,
  CheckCircle2,
  XCircle,
  Trash2,
  Play,
  Filter,
  RefreshCw,
  FileSearch,
} from 'lucide-react'
import { useAnalysis } from '../contexts/AnalysisContext'
import { AnalysisStatusCard } from '../components/analysis'

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
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

// =============================================================================
// TYPES
// =============================================================================

type FilterType = 'all' | 'running' | 'completed' | 'failed'

// =============================================================================
// STAT CARD COMPONENT
// =============================================================================

interface StatCardProps {
  label: string
  value: number
  icon: React.ReactNode
  colorClass: string
  bgClass: string
}

function StatCard({ label, value, icon, colorClass, bgClass }: StatCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      className="card-glass p-5"
      whileHover={{ y: -2, scale: 1.01 }}
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl ${bgClass} flex items-center justify-center`}>
          {icon}
        </div>
        <div>
          <p className={`text-2xl font-bold ${colorClass}`}>{value}</p>
          <p className="text-sm text-secondary">{label}</p>
        </div>
      </div>
    </motion.div>
  )
}

// =============================================================================
// FILTER BUTTON COMPONENT
// =============================================================================

interface FilterButtonProps {
  label: string
  count: number
  isActive: boolean
  onClick: () => void
  colorClass?: string
}

function FilterButton({ label, count, isActive, onClick, colorClass }: FilterButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
        flex items-center gap-2
        ${isActive
          ? 'bg-gradient-to-r from-blue-primary to-cyan-400 text-white shadow-lg shadow-blue-primary/30'
          : 'card-glass hover:border-blue-primary/30'
        }
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {label}
      <span className={`
        px-2 py-0.5 rounded-full text-xs
        ${isActive ? 'bg-white/20' : colorClass || 'bg-surface-tertiary'}
      `}>
        {count}
      </span>
    </motion.button>
  )
}

// =============================================================================
// EMPTY STATE COMPONENT
// =============================================================================

interface EmptyStateProps {
  filter: FilterType
  onLaunchClick: () => void
}

function EmptyState({ filter, onLaunchClick }: EmptyStateProps) {
  const messages = {
    all: {
      title: 'Aucune analyse',
      subtitle: 'Lancez votre première analyse pour commencer',
    },
    running: {
      title: 'Aucune analyse en cours',
      subtitle: 'Toutes vos analyses sont terminées',
    },
    completed: {
      title: 'Aucune analyse terminée',
      subtitle: 'Vos analyses en cours apparaîtront ici une fois terminées',
    },
    failed: {
      title: 'Aucune analyse échouée',
      subtitle: 'Toutes vos analyses se sont déroulées avec succès',
    },
  }

  const { title, subtitle } = messages[filter]

  return (
    <motion.div
      variants={itemVariants}
      className="card-glass p-12 text-center"
    >
      <div className="w-20 h-20 rounded-2xl icon-gradient-blue flex items-center justify-center mx-auto mb-6 opacity-50">
        <FileSearch className="w-10 h-10 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-primary mb-2">{title}</h3>
      <p className="text-secondary mb-6">{subtitle}</p>
      {filter === 'all' && (
        <motion.button
          onClick={onLaunchClick}
          className="btn-premium inline-flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Play className="w-4 h-4" />
          Lancer une analyse
        </motion.button>
      )}
    </motion.div>
  )
}

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

export function MyAnalysesPage() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<FilterType>('all')

  const {
    analyses,
    runningAnalyses,
    completedAnalyses,
    failedAnalyses,
    clearAllCompleted,
    clearAnalysis,
    retryAnalysis,
    getProgress,
    refreshAnalyses,
  } = useAnalysis()

  // Track previous running count for change detection
  const prevRunningCount = useRef(runningAnalyses.length)

  // Polling: auto-refresh every 5 seconds when there are running analyses
  useEffect(() => {
    // Only poll if there are running analyses
    if (runningAnalyses.length === 0) {
      console.log('[MyAnalyses] No running analyses, polling disabled')
      return
    }

    console.log('[MyAnalyses] Starting polling, running analyses:', runningAnalyses.length)

    const intervalId = setInterval(() => {
      console.log('[MyAnalyses] Polling refresh...')
      refreshAnalyses()
    }, 5000) // Every 5 seconds

    return () => {
      console.log('[MyAnalyses] Stopping polling')
      clearInterval(intervalId)
    }
  }, [runningAnalyses.length, refreshAnalyses])

  // Log when running count changes
  useEffect(() => {
    if (prevRunningCount.current !== runningAnalyses.length) {
      console.log('[MyAnalyses] Running analyses count changed:',
        prevRunningCount.current, '→', runningAnalyses.length)
      prevRunningCount.current = runningAnalyses.length
    }
  }, [runningAnalyses.length])

  // Filter analyses
  const filteredAnalyses = filter === 'all'
    ? analyses
    : analyses.filter(a => a.status === filter)

  // Handle view results - navigate to results page with analysis ID
  const handleViewResults = (analysis: typeof analyses[0]) => {
    navigate(`/results/${analysis.id}`)
  }

  // Handle retry - wrap to extract id
  const handleRetry = (analysis: typeof analyses[0]) => {
    retryAnalysis(analysis.id)
  }

  // Handle delete - wrap to extract id
  const handleDelete = (analysis: typeof analyses[0]) => {
    clearAnalysis(analysis.id)
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-8 space-y-8"
    >
      {/* Hero Header */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[var(--bg-card)]/80 backdrop-blur-xl p-8"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex items-center justify-between flex-wrap gap-6">
          <div className="flex items-center gap-5">
            <motion.div
              className="w-16 h-16 rounded-2xl icon-gradient-blue flex items-center justify-center shadow-xl shadow-blue-primary/30"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Activity className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-primary">Mes Analyses</h1>
                {runningAnalyses.length > 0 && (
                  <span className="badge-glow-blue flex items-center gap-1.5 animate-pulse">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    {runningAnalyses.length} en cours
                  </span>
                )}
              </div>
              <p className="text-secondary mt-1">
                Suivez vos analyses en cours et consultez les résultats
              </p>
            </div>
          </div>

          <motion.button
            onClick={refreshAnalyses}
            className="btn-ghost-glow flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw className="w-4 h-4" />
            Actualiser
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          label="Total"
          value={analyses.length}
          icon={<Activity className="w-6 h-6 text-white" />}
          colorClass="text-primary"
          bgClass="icon-gradient-blue"
        />
        <StatCard
          label="En cours"
          value={runningAnalyses.length}
          icon={<Loader2 className="w-6 h-6 text-white animate-spin" />}
          colorClass="text-blue-primary"
          bgClass="bg-gradient-to-br from-blue-primary to-cyan-400"
        />
        <StatCard
          label="Terminées"
          value={completedAnalyses.length}
          icon={<CheckCircle2 className="w-6 h-6 text-white" />}
          colorClass="text-emerald-400"
          bgClass="bg-gradient-to-br from-emerald-500 to-green-600"
        />
        <StatCard
          label="Échecs"
          value={failedAnalyses.length}
          icon={<XCircle className="w-6 h-6 text-white" />}
          colorClass="text-red-400"
          bgClass="bg-gradient-to-br from-red-500 to-rose-600"
        />
      </div>

      {/* Filters & Actions */}
      <motion.div
        variants={itemVariants}
        className="flex flex-wrap items-center justify-between gap-4"
      >
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-secondary" />
          <FilterButton
            label="Toutes"
            count={analyses.length}
            isActive={filter === 'all'}
            onClick={() => setFilter('all')}
          />
          <FilterButton
            label="En cours"
            count={runningAnalyses.length}
            isActive={filter === 'running'}
            onClick={() => setFilter('running')}
            colorClass="bg-blue-primary/20 text-blue-primary"
          />
          <FilterButton
            label="Terminées"
            count={completedAnalyses.length}
            isActive={filter === 'completed'}
            onClick={() => setFilter('completed')}
            colorClass="bg-emerald-500/20 text-emerald-400"
          />
          <FilterButton
            label="Échecs"
            count={failedAnalyses.length}
            isActive={filter === 'failed'}
            onClick={() => setFilter('failed')}
            colorClass="bg-red-500/20 text-red-400"
          />
        </div>

        {completedAnalyses.length > 0 && (
          <motion.button
            onClick={clearAllCompleted}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 border border-red-500/30 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Trash2 className="w-4 h-4" />
            Effacer terminées
          </motion.button>
        )}
      </motion.div>

      {/* Analyses List */}
      <AnimatePresence mode="popLayout">
        {filteredAnalyses.length === 0 ? (
          <EmptyState
            filter={filter}
            onLaunchClick={() => navigate('/launch-analysis')}
          />
        ) : (
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filteredAnalyses.map((analysis) => (
              <AnalysisStatusCard
                key={analysis.id}
                analysis={analysis}
                progress={getProgress(analysis.id)}
                onViewResults={handleViewResults}
                onRetry={handleRetry}
                onDelete={handleDelete}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default MyAnalysesPage
