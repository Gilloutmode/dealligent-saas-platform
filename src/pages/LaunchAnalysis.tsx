import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Target, Shield } from 'lucide-react'
import { competitors } from '../data/clientData'
import { useAnalysis } from '../contexts/AnalysisContext'
import { ConfirmAnalysisModal } from '../components/analysis/ConfirmAnalysisModal'
import { ProgressOverlay } from '../components/analysis/ProgressOverlay'
import type { StoredAnalysis } from '../types/n8n'

// =============================================================================
// LAUNCH ANALYSIS PAGE - SIMPLIFIED
// Clean 2-step flow: Select competitor → Confirm → Launch
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

interface CompetitorCard {
  id: string
  name: string
  logo: string
  threatLevel: 'high' | 'medium' | 'low'
  description: string
}

const threatConfig = {
  high: {
    bg: 'bg-gradient-to-br from-red-500 to-rose-600 shadow-lg shadow-red-500/25',
    badge: 'bg-red-500/15 text-red-400 border-red-500/20',
    label: 'Menace élevée',
  },
  medium: {
    bg: 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/25',
    badge: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
    label: 'Menace moyenne',
  },
  low: {
    bg: 'bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-lg shadow-emerald-500/25',
    badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
    label: 'Menace faible',
  },
}

export function LaunchAnalysisPage() {
  const navigate = useNavigate()
  const { launchAnalysis, analyses } = useAnalysis()

  // Simplified state
  const [selectedCompetitor, setSelectedCompetitor] = useState<CompetitorCard | null>(null)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showProgressOverlay, setShowProgressOverlay] = useState(false)
  const [currentAnalysis, setCurrentAnalysis] = useState<StoredAnalysis | null>(null)
  const [isLaunching, setIsLaunching] = useState(false)

  // Keep current analysis in sync with context for status updates
  const contextAnalysis = currentAnalysis?.id
    ? analyses.find(a => a.id === currentAnalysis.id)
    : null
  const displayAnalysis = contextAnalysis ?? currentAnalysis

  // Map competitors to card format
  const competitorsList: CompetitorCard[] = competitors.map(comp => ({
    id: comp.id,
    name: comp.name,
    logo: comp.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
    threatLevel: comp.threatLevel as 'high' | 'medium' | 'low',
    description: comp.description || 'Concurrent dans l\'espace CAO/design génératif',
  }))

  // Handle competitor card click
  const handleCompetitorClick = (competitor: CompetitorCard) => {
    setSelectedCompetitor(competitor)
    setShowConfirmModal(true)
  }

  // Handle launch confirmation
  const handleLaunch = async () => {
    if (!selectedCompetitor) return

    setIsLaunching(true)

    try {
      const { analysis } = await launchAnalysis({
        competitor: selectedCompetitor.name,
        analysisType: 'standard',
        sources: {
          perplexity: true,
          exa: true,
          serpNews: true,
          serpLinkedIn: true,
        },
        userChoice: 'wait',
      })

      setCurrentAnalysis(analysis)
      setShowConfirmModal(false)
      setShowProgressOverlay(true)
    } finally {
      setIsLaunching(false)
    }
  }

  // Handle progress overlay dismiss
  const handleDismissProgress = () => {
    setShowProgressOverlay(false)
    navigate('/my-analyses')
  }

  // Handle analysis completion
  const handleAnalysisComplete = () => {
    setShowProgressOverlay(false)
    navigate('/results')
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-8 max-w-6xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent-primary)] to-[#8B5CF6] flex items-center justify-center shadow-lg shadow-[var(--accent-primary)]/25">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">
              Analyse Concurrentielle
            </h1>
            <p className="text-[var(--text-secondary)]">
              Sélectionnez un concurrent pour lancer l'analyse
            </p>
          </div>
        </div>
      </motion.div>

      {/* Competitor Grid */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {competitorsList.map((competitor) => {
          const config = threatConfig[competitor.threatLevel]

          return (
            <motion.div
              key={competitor.id}
              variants={itemVariants}
              onClick={() => handleCompetitorClick(competitor)}
              className="card-glass p-6 cursor-pointer group transition-all duration-200 hover:border-[var(--accent-primary)]/30"
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Logo */}
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg ${config.bg}`}>
                {competitor.logo}
              </div>

              {/* Name */}
              <h3 className="mt-4 font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                {competitor.name}
              </h3>

              {/* Description */}
              <p className="mt-1 text-sm text-[var(--text-muted)] line-clamp-2">
                {competitor.description}
              </p>

              {/* Threat Badge */}
              <div className={`mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.badge}`}>
                <Shield className="w-3 h-3" />
                {config.label}
              </div>
            </motion.div>
          )
        })}

        {/* Add Competitor Card (placeholder) */}
        <motion.div
          variants={itemVariants}
          className="card-glass p-6 border-dashed opacity-50 flex flex-col items-center justify-center text-center min-h-[180px]"
        >
          <div className="w-14 h-14 rounded-xl bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--text-muted)] text-2xl">
            +
          </div>
          <p className="mt-4 text-sm text-[var(--text-muted)]">
            Ajouter un concurrent
          </p>
          <p className="text-xs text-[var(--text-muted)]">(bientôt)</p>
        </motion.div>
      </motion.div>

      {/* Confirm Modal */}
      <ConfirmAnalysisModal
        open={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        competitor={selectedCompetitor}
        onConfirm={handleLaunch}
        isLoading={isLaunching}
      />

      {/* Progress Overlay */}
      <ProgressOverlay
        open={showProgressOverlay}
        analysis={displayAnalysis}
        onDismiss={handleDismissProgress}
        onComplete={handleAnalysisComplete}
      />
    </motion.div>
  )
}

export default LaunchAnalysisPage
