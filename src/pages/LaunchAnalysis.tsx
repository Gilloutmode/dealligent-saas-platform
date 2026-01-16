import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  Play,
  Search,
  Building2,
  Zap,
  Clock,
  Check,
  Sparkles,
  Target,
  Newspaper,
  Linkedin,
  Brain,
  Rocket,
  Shield,
} from 'lucide-react'
import { competitors, companyInfo } from '../data/clientData'

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

// Analysis Type Card
interface AnalysisTypeProps {
  icon: React.ReactNode
  title: string
  description: string
  duration: string
  features: string[]
  gradient: 'blue' | 'purple' | 'green' | 'orange'
  isPopular?: boolean
  isSelected: boolean
  onSelect: () => void
  agentInfo?: string
}

function AnalysisTypeCard({
  icon,
  title,
  description,
  duration,
  features,
  gradient,
  isPopular,
  isSelected,
  onSelect,
  agentInfo,
}: AnalysisTypeProps) {
  const gradientClasses = {
    blue: 'icon-gradient-blue',
    purple: 'icon-gradient-purple',
    green: 'icon-gradient-green',
    orange: 'icon-gradient-orange',
  }

  return (
    <motion.div
      variants={itemVariants}
      onClick={onSelect}
      className={`relative card-premium p-6 cursor-pointer transition-all duration-300 ${
        isSelected
          ? 'ring-2 ring-blue-primary ring-offset-2 ring-offset-surface-primary shadow-xl shadow-blue-primary/20'
          : ''
      }`}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Popular badge */}
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="badge-glow-blue flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Recommandé
          </span>
        </div>
      )}

      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-gradient-to-br from-blue-primary to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-primary/30">
          <Check className="w-4 h-4 text-white" />
        </div>
      )}

      <div className="space-y-4">
        {/* Icon */}
        <div className={`w-14 h-14 rounded-2xl ${gradientClasses[gradient]} flex items-center justify-center text-white`}>
          {icon}
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="text-lg font-semibold mb-1 text-primary">{title}</h3>
          <p className="text-sm text-secondary">{description}</p>
        </div>

        {/* Agent info */}
        {agentInfo && (
          <div className="flex items-center gap-2 text-xs text-blue-primary bg-blue-primary/10 border border-blue-primary/30 px-3 py-1.5 rounded-lg">
            <Brain className="w-3.5 h-3.5" />
            {agentInfo}
          </div>
        )}

        {/* Duration */}
        <div className="flex items-center gap-2 text-sm text-secondary">
          <Clock className="w-4 h-4" />
          <span>{duration}</span>
        </div>

        {/* Features */}
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-secondary">
              <div className={`w-5 h-5 rounded-full ${gradientClasses[gradient]} opacity-50 flex items-center justify-center`}>
                <Check className="w-3 h-3 text-white" />
              </div>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

// Source Card matching n8n workflow
interface SourceCardProps {
  icon: React.ReactNode
  name: string
  description: string
  isEnabled: boolean
  onToggle: () => void
  isPremium?: boolean
  agent?: string
}

function SourceCard({ icon, name, description, isEnabled, onToggle, isPremium, agent }: SourceCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      onClick={onToggle}
      className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
        isEnabled
          ? 'card-glass border-blue-primary/30 shadow-lg shadow-blue-primary/10'
          : 'card-glass hover:border-blue-primary/20'
      }`}
      whileHover={{ y: -2 }}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${isEnabled ? 'icon-gradient-blue' : 'bg-surface-tertiary text-secondary'}`}>
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-sm text-primary">{name}</h4>
            {isPremium && (
              <span className="badge-glow-orange text-xs">
                Pro
              </span>
            )}
          </div>
          <p className="text-xs text-secondary">{description}</p>
          {agent && (
            <p className="text-xs text-blue-primary/80 mt-0.5">via {agent}</p>
          )}
        </div>
        <div
          className={`w-10 h-6 rounded-full transition-colors duration-200 relative ${
            isEnabled ? 'bg-gradient-to-r from-blue-primary to-cyan-400' : 'bg-surface-secondary'
          }`}
        >
          <div
            className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-lg transition-transform duration-200 ${
              isEnabled ? 'translate-x-5' : 'translate-x-1'
            }`}
          />
        </div>
      </div>
    </motion.div>
  )
}

export function LaunchAnalysisPage() {
  // Form state
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedCompetitor, setSelectedCompetitor] = useState<string | null>(null)
  const [sources, setSources] = useState({
    perplexity: true,
    exa: true,
    serpNews: true,
    serpLinkedIn: true,
  })

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

  // Real CDS competitors for selection with unique IDs
  const competitorsList = competitors.map(comp => ({
    id: comp.id,
    name: comp.name,
    logo: comp.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
    threatLevel: comp.threatLevel,
    description: comp.description || `Concurrent dans l'espace CAO/design génératif`,
  }))

  // Check if form is complete for launch
  const canLaunch = selectedType !== null && selectedCompetitor !== null

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-8 space-y-6"
    >
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
              isSelected={selectedType === type.id}
              onSelect={() => setSelectedType(type.id)}
            />
          ))}
        </div>
      </motion.div>

      {/* Section 2: Competitor Selection (single-select for MVP) */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-primary">2. Concurrent à analyser</h2>
          {selectedCompetitor && (
            <span className="badge-glow-blue">1 sélectionné</span>
          )}
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
                    {selectedCompetitor === comp.id && (
                      <Check className="w-4 h-4 text-blue-primary shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-secondary line-clamp-1 mt-0.5">
                    {comp.description}
                  </p>
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
                {selectedType ? analysisTypes.find(t => t.id === selectedType)?.title : 'Aucun type'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-orange-400" />
              <span className="text-secondary">
                {selectedCompetitor
                  ? competitorsList.find(c => c.id === selectedCompetitor)?.name
                  : 'Aucun concurrent'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-blue-400" />
              <span className="text-secondary">
                {Object.values(sources).filter(Boolean).length} sources
              </span>
            </div>
          </div>

          <button
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
    </motion.div>
  )
}

export default LaunchAnalysisPage
