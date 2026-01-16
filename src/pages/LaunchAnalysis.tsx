import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Play,
  Search,
  Building2,
  Zap,
  Check,
  Target,
  Newspaper,
  Linkedin,
  Brain,
  Rocket,
  Shield,
  Sparkles,
  Settings2,
} from 'lucide-react'
import { competitors, companyInfo } from '../data/clientData'
import { useAnalysis } from '../contexts/AnalysisContext'
import { LaunchChoiceModal, useSavedPreference } from '../components/analysis/LaunchChoiceModal'
import { ProgressOverlay } from '../components/analysis/ProgressOverlay'
import { AnalysisTypeCard } from '../components/analysis/AnalysisTypeCard'
import { SourceCard } from '../components/analysis/SourceCard'
import { CollapsibleSection } from '../components/analysis/CollapsibleSection'
import { ANALYSIS_DURATION_ESTIMATES } from '../types/analysis'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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

// Analysis types matching n8n workflow
const analysisTypes = [
  {
    id: 'quick',
    icon: <Zap className="w-6 h-6" />,
    title: 'Veille rapide',
    description: 'Aperçu instantané des actualités et mentions',
    duration: '5-15 minutes',
    features: ['Actualités récentes (SerpAPI)', 'Mentions web (Perplexity)', 'Résumé express'],
    gradient: 'blue' as const,
    agentInfo: 'Market Intelligence Agent - Mode Express',
  },
  {
    id: 'standard',
    icon: <Search className="w-6 h-6" />,
    title: 'Analyse concurrentielle',
    description: 'Analyse complète multi-sources avec IA',
    duration: '30-60 minutes',
    features: ['Profil complet concurrent', 'Forces & faiblesses', 'Produits & technologies', 'Recommandations stratégiques'],
    gradient: 'purple' as const,
    isPopular: true,
    agentInfo: 'Market Intelligence Agent - Mode Standard',
  },
  {
    id: 'deep',
    icon: <Target className="w-6 h-6" />,
    title: 'Analyse approfondie',
    description: 'Investigation exhaustive avec rapport détaillé',
    duration: '2-4 heures',
    features: ['Recherche approfondie (Exa Deep)', 'Analyse executives LinkedIn', 'Mapping technologique', 'SWOT complet', 'Plan d\'action'],
    gradient: 'orange' as const,
    agentInfo: 'Market Intelligence Agent - Mode Deep Research',
  },
]

export function LaunchAnalysisPage() {
  const navigate = useNavigate()
  const { launchAnalysis, analyses, getProgress } = useAnalysis()
  const savedPreference = useSavedPreference()

  // Form state
  const [analysisType, setAnalysisType] = useState<'quick' | 'standard' | 'deep' | null>(null)
  const [selectedCompetitor, setSelectedCompetitor] = useState<string | null>(null)
  const [sources, setSources] = useState({
    perplexity: true,
    exa: true,
    serpNews: true,
    serpLinkedIn: true,
  })

  // UI state for modals and sections
  const [showChoiceModal, setShowChoiceModal] = useState(false)
  const [showProgressOverlay, setShowProgressOverlay] = useState(false)
  const [currentAnalysisId, setCurrentAnalysisId] = useState<string | null>(null)
  const [advancedExpanded, setAdvancedExpanded] = useState(false)

  // Get current analysis for progress overlay
  const currentAnalysis = currentAnalysisId
    ? analyses.find(a => a.id === currentAnalysisId) ?? null
    : null

  // Real CDS competitors for selection with unique IDs
  const competitorsList = competitors.map(comp => ({
    id: comp.id,
    name: comp.name,
    logo: comp.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
    threatLevel: comp.threatLevel,
    description: comp.description || `Concurrent dans l'espace CAO/design génératif`,
  }))

  // Check if form is complete for launch
  const canLaunch = analysisType !== null && selectedCompetitor !== null

  // Handle launch button click
  const handleLaunchClick = () => {
    if (!canLaunch) return
    if (savedPreference) {
      handleLaunch(savedPreference)
    } else {
      setShowChoiceModal(true)
    }
  }

  // Handle the actual launch after choice
  const handleLaunch = async (choice: 'wait' | 'notify') => {
    if (!analysisType || !selectedCompetitor) return

    const competitorName = competitorsList.find(c => c.id === selectedCompetitor)?.name ?? selectedCompetitor
    const id = await launchAnalysis({
      competitor: competitorName,
      analysisType,
      sources,
      userChoice: choice,
    })

    setCurrentAnalysisId(id)
    if (choice === 'wait') {
      setShowProgressOverlay(true)
    } else {
      navigate('/my-analyses')
    }
  }

  // Handle progress overlay dismiss
  const handleDismissProgress = () => {
    setShowProgressOverlay(false)
    navigate('/my-analyses')
  }

  // Handle analysis completion while watching
  const handleAnalysisComplete = () => {
    setShowProgressOverlay(false)
    navigate('/results')
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="p-8 space-y-6">
      {/* Header */}
      <motion.div variants={itemVariants} className="hero-premium">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl icon-gradient-purple flex items-center justify-center text-4xl shadow-xl shadow-purple-500/30">
            <Rocket className="w-8 h-8 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-primary">Lancer une analyse</h1>
              <span className="badge-glow-purple flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                n8n
              </span>
            </div>
            <p className="text-secondary">{companyInfo.name} • Workflow n8n CDS-RAG</p>
          </div>
        </div>
      </motion.div>

      {/* Section 1: Analysis Type */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h2 className="text-lg font-semibold text-primary">1. Type d'analyse</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {analysisTypes.map((type) => (
            <AnalysisTypeCard
              key={type.id}
              {...type}
              isSelected={analysisType === type.id}
              onSelect={() => setAnalysisType(type.id as 'quick' | 'standard' | 'deep')}
            />
          ))}
        </div>
      </motion.div>

      {/* Section 2: Competitor Selection */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-primary">2. Concurrent à analyser</h2>
          {selectedCompetitor && <span className="badge-glow-blue">1 sélectionné</span>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {competitorsList.map((comp) => (
            <motion.div
              key={comp.id}
              variants={itemVariants}
              onClick={() => setSelectedCompetitor(comp.id)}
              className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                selectedCompetitor === comp.id
                  ? 'card-premium ring-2 ring-blue-primary ring-offset-2 ring-offset-surface-primary shadow-lg shadow-blue-primary/20'
                  : 'card-glass hover:border-blue-primary/30'
              }`}
              whileHover={{ y: -2 }}
            >
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold shrink-0 ${
                  comp.threatLevel === 'high'
                    ? 'bg-gradient-to-br from-red-500 to-rose-600 shadow-lg shadow-red-500/25'
                    : comp.threatLevel === 'medium'
                    ? 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/25'
                    : 'bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-lg shadow-emerald-500/25'
                }`}>
                  {comp.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium truncate text-primary">{comp.name}</span>
                    {selectedCompetitor === comp.id && <Check className="w-4 h-4 text-blue-primary shrink-0" />}
                  </div>
                  <p className="text-xs text-secondary line-clamp-1 mt-0.5">{comp.description}</p>
                  <span className={`inline-flex items-center gap-1 mt-1.5 text-xs px-2 py-0.5 rounded-full ${
                    comp.threatLevel === 'high'
                      ? 'badge-glow-red'
                      : comp.threatLevel === 'medium'
                      ? 'badge-glow-orange'
                      : 'badge-glow-green'
                  }`}>
                    <Shield className="w-3 h-3" />
                    {comp.threatLevel === 'high' ? 'Menace élevée' : comp.threatLevel === 'medium' ? 'Menace moyenne' : 'Menace faible'}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Section 3: Sources */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h2 className="text-lg font-semibold text-primary">3. Sources de données</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SourceCard
            icon={<Brain className="w-5 h-5 text-white" />}
            name="Perplexity AI"
            description="Recherche conversationnelle avancée"
            isEnabled={sources.perplexity}
            onToggle={() => setSources((s) => ({ ...s, perplexity: !s.perplexity }))}
            agent="Market Intelligence Agent"
          />
          <SourceCard
            icon={<Search className="w-5 h-5 text-white" />}
            name="Exa Deep Search"
            description="Recherche sémantique approfondie"
            isEnabled={sources.exa}
            onToggle={() => setSources((s) => ({ ...s, exa: !s.exa }))}
            agent="Deep Research Module"
          />
          <SourceCard
            icon={<Newspaper className="w-5 h-5 text-white" />}
            name="Actualités (SerpAPI)"
            description="Dernières news et communiqués de presse"
            isEnabled={sources.serpNews}
            onToggle={() => setSources((s) => ({ ...s, serpNews: !s.serpNews }))}
            agent="SerpAPI News Search"
          />
          <SourceCard
            icon={<Linkedin className="w-5 h-5 text-white" />}
            name="LinkedIn Insights"
            description="Profils executives et actualités entreprise"
            isEnabled={sources.serpLinkedIn}
            onToggle={() => setSources((s) => ({ ...s, serpLinkedIn: !s.serpLinkedIn }))}
            agent="SerpAPI LinkedIn"
          />
        </div>
      </motion.div>

      {/* Section 4: Advanced Options (Collapsible) */}
      <motion.div variants={itemVariants}>
        <CollapsibleSection
          title="4. Options avancées"
          subtitle="Personnalisez les paramètres de l'analyse"
          icon={<Settings2 className="w-5 h-5" />}
          isExpanded={advancedExpanded}
          onToggle={() => setAdvancedExpanded(!advancedExpanded)}
          optional
          summary="Paramètres par défaut"
        >
          <div className="space-y-4">
            <div className="card-glass p-4 text-center">
              <p className="text-secondary text-sm">
                Les options avancées seront disponibles dans une prochaine version.
              </p>
              <p className="text-xs text-tertiary mt-2">
                Profondeur de recherche • Filtres temporels • Export personnalisé
              </p>
            </div>
          </div>
        </CollapsibleSection>
      </motion.div>

      {/* Sticky Footer with Summary and Launch Button */}
      <motion.div
        variants={itemVariants}
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-surface-primary/80 backdrop-blur-xl"
      >
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-purple-400" />
              <span className="text-secondary">
                {analysisType ? analysisTypes.find(t => t.id === analysisType)?.title : 'Aucun type'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-orange-400" />
              <span className="text-secondary">
                {selectedCompetitor ? competitorsList.find(c => c.id === selectedCompetitor)?.name : 'Aucun concurrent'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-blue-400" />
              <span className="text-secondary">{Object.values(sources).filter(Boolean).length} sources</span>
            </div>
          </div>

          <button
            onClick={handleLaunchClick}
            disabled={!canLaunch}
            className="btn-premium flex items-center gap-2 px-8 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="w-5 h-5" />
            Lancer l'analyse
          </button>
        </div>
      </motion.div>

      {/* Spacer for sticky footer */}
      <div className="h-20" />

      {/* Launch Choice Modal */}
      <LaunchChoiceModal
        open={showChoiceModal}
        onClose={() => setShowChoiceModal(false)}
        onChoice={handleLaunch}
        competitor={competitorsList.find(c => c.id === selectedCompetitor)?.name ?? ''}
        analysisType={analysisTypes.find(t => t.id === analysisType)?.title ?? ''}
        estimatedDuration={analysisType ? ANALYSIS_DURATION_ESTIMATES[analysisType] : 120}
      />

      {/* Progress Overlay */}
      <ProgressOverlay
        open={showProgressOverlay}
        analysis={currentAnalysis}
        progress={currentAnalysisId ? getProgress(currentAnalysisId) : 0}
        onDismiss={handleDismissProgress}
        onComplete={handleAnalysisComplete}
      />
    </motion.div>
  )
}

export default LaunchAnalysisPage
