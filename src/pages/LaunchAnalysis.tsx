import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
  Play,
  Search,
  Building2,
  FileText,
  Zap,
  Clock,
  ChevronRight,
  Check,
  ArrowRight,
  Sparkles,
  Target,
  MessageSquare,
  Database,
  Newspaper,
  Linkedin,
  Brain,
  Rocket,
  Shield,
  AlertTriangle,
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

// Spectacular Launch Animation Component
interface LaunchAnimationProps {
  isOpen: boolean
  onComplete: () => void
  analysisType: string
  competitorCount: number
  sourceCount: number
}

function LaunchAnimation({ isOpen, onComplete, analysisType, competitorCount, sourceCount }: LaunchAnimationProps) {
  const [phase, setPhase] = useState(0)
  const [progress, setProgress] = useState(0)

  const phases = [
    { icon: '🔌', label: 'Connexion aux sources IA...', sublabel: 'Perplexity • Exa • SerpAPI' },
    { icon: '🧠', label: 'Initialisation du Market Intelligence Agent...', sublabel: 'Chargement des modèles NLP' },
    { icon: '📊', label: 'Préparation de l\'analyse...', sublabel: `${competitorCount} concurrent(s) • ${sourceCount} sources` },
    { icon: '🚀', label: 'Lancement du workflow n8n...', sublabel: 'CDS-RAG PROD V11.2' },
    { icon: '✨', label: 'Analyse en cours...', sublabel: 'Collecte et synthèse des données' },
  ]

  useEffect(() => {
    if (!isOpen) {
      setPhase(0)
      setProgress(0)
      return
    }

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 0.8
      })
    }, 50)

    // Phase transitions
    const phaseTimers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 2000),
      setTimeout(() => setPhase(3), 3500),
      setTimeout(() => setPhase(4), 5000),
      setTimeout(() => onComplete(), 6500),
    ]

    return () => {
      clearInterval(progressInterval)
      phaseTimers.forEach(timer => clearTimeout(timer))
    }
  }, [isOpen, onComplete])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
        >
          {/* Animated background particles - clean colors */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-blue-primary to-cyan-400"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -1000],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0.5],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>

          {/* Central animation container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative z-10 w-full max-w-lg mx-4"
          >
            {/* Glowing orb background - clean colors */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-64 h-64 rounded-full bg-gradient-to-r from-blue-primary/30 via-cyan-500/30 to-blue-600/30 blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>

            {/* Main content */}
            <div className="relative card-premium p-8 text-center space-y-8">
              {/* Rocket animation */}
              <div className="relative h-32 flex items-center justify-center">
                <motion.div
                  className="text-7xl"
                  animate={{
                    y: phase >= 3 ? [-10, -100] : [0, -8, 0],
                    scale: phase >= 3 ? [1, 0.5] : 1,
                    opacity: phase >= 3 ? [1, 0] : 1,
                  }}
                  transition={{
                    y: phase >= 3
                      ? { duration: 1.5, ease: 'easeIn' }
                      : { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
                  }}
                >
                  🚀
                </motion.div>

                {/* Exhaust flames */}
                {phase >= 3 && (
                  <motion.div
                    className="absolute bottom-0 flex gap-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 0.2, repeat: Infinity }}
                  >
                    {['🔥', '💨', '🔥'].map((emoji, i) => (
                      <motion.span
                        key={i}
                        className="text-3xl"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.3, repeat: Infinity, delay: i * 0.1 }}
                      >
                        {emoji}
                      </motion.span>
                    ))}
                  </motion.div>
                )}

                {/* Success checkmark */}
                {phase >= 4 && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-2xl shadow-emerald-500/50">
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                        className="text-4xl"
                      >
                        ✓
                      </motion.span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Phase indicator */}
              <div className="space-y-2">
                <motion.div
                  key={phase}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center gap-3"
                >
                  <span className="text-2xl">{phases[phase]?.icon}</span>
                  <h3 className="text-xl font-semibold text-primary">{phases[phase]?.label}</h3>
                </motion.div>
                <motion.p
                  key={`sub-${phase}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-sm text-secondary"
                >
                  {phases[phase]?.sublabel}
                </motion.p>
              </div>

              {/* Progress bar */}
              <div className="space-y-2">
                <div className="h-2 rounded-full bg-surface-secondary overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-blue-primary via-cyan-400 to-blue-600"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <p className="text-sm text-secondary">{Math.round(progress)}% complété</p>
              </div>

              {/* Steps indicator */}
              <div className="flex items-center justify-center gap-2">
                {phases.map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                      i <= phase ? 'bg-blue-primary' : 'bg-surface-secondary'
                    }`}
                    animate={i === phase ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  />
                ))}
              </div>

              {/* Analysis type badge */}
              <div className="pt-4 border-t border-color-secondary">
                <span className="badge-glow-blue">
                  {analysisType}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function LaunchAnalysisPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [step, setStep] = useState(1)
  const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>([])
  const [isLaunching, setIsLaunching] = useState(false)
  const [sources, setSources] = useState({
    perplexity: true,
    exaDeep: true,
    serpNews: true,
    serpLinkedin: true,
    techDocs: false,
    patents: false,
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

  const handleLaunchAnalysis = () => {
    // Show spectacular launch animation
    setIsLaunching(true)
  }

  const handleLaunchComplete = () => {
    setIsLaunching(false)
    // In a real app, this would redirect to results or show success
    console.log('Analysis launched:', {
      type: selectedType,
      competitors: selectedCompetitors,
      sources,
    })
    // Reset to step 1 for demo purposes
    setStep(1)
    setSelectedType(null)
    setSelectedCompetitors([])
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-8 space-y-8"
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

      {/* Progress Steps */}
      <motion.div variants={itemVariants} className="card-glass p-4">
        <div className="flex items-center justify-between">
          {[
            { num: 1, label: "Type d'analyse" },
            { num: 2, label: 'Concurrents' },
            { num: 3, label: 'Sources IA' },
            { num: 4, label: 'Lancement' },
          ].map((s, index) => (
            <div key={s.num} className="flex items-center">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                    step >= s.num
                      ? 'icon-gradient-blue text-white'
                      : 'bg-surface-tertiary text-secondary'
                  }`}
                >
                  {step > s.num ? <Check className="w-5 h-5" /> : s.num}
                </div>
                <span className={`text-sm font-medium hidden md:block ${step >= s.num ? 'text-primary' : 'text-secondary'}`}>
                  {s.label}
                </span>
              </div>
              {index < 3 && (
                <ChevronRight className="w-5 h-5 text-secondary mx-4 hidden md:block" />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Step 1: Analysis Type */}
      {step === 1 && (
        <motion.div variants={itemVariants} className="space-y-6">
          <h2 className="text-lg font-semibold text-primary">Choisissez le type d'analyse</h2>

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

          <div className="flex justify-end">
            <button
              onClick={() => setStep(2)}
              disabled={!selectedType}
              className="btn-premium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continuer
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Step 2: Competitors */}
      {step === 2 && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-primary">Sélectionnez les concurrents à analyser</h2>
            <span className="badge-glow-blue">
              {selectedCompetitors.length} sélectionné(s)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {competitorsList.map((comp) => (
              <motion.div
                key={comp.id}
                variants={itemVariants}
                onClick={() => {
                  setSelectedCompetitors((prev) =>
                    prev.includes(comp.id)
                      ? prev.filter((id) => id !== comp.id)
                      : [...prev, comp.id]
                  )
                }}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                  selectedCompetitors.includes(comp.id)
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
                      {selectedCompetitors.includes(comp.id) && (
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

          <div className="card-glass p-4 rounded-xl border-dashed">
            <button className="w-full flex items-center justify-center gap-2 text-blue-primary hover:text-cyan-400 transition-colors">
              <Building2 className="w-4 h-4" />
              Ajouter un nouveau concurrent
            </button>
          </div>

          <div className="flex justify-between">
            <button onClick={() => setStep(1)} className="btn-ghost-glow">
              Retour
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={selectedCompetitors.length === 0}
              className="btn-premium flex items-center gap-2 disabled:opacity-50"
            >
              Continuer
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Step 3: Sources - matching n8n workflow */}
      {step === 3 && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-primary">Configurez les sources de données IA</h2>
            <p className="text-sm text-secondary mt-1">
              Sélectionnez les agents et sources à utiliser pour l'analyse
            </p>
          </div>

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
              isEnabled={sources.exaDeep}
              onToggle={() => setSources((s) => ({ ...s, exaDeep: !s.exaDeep }))}
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
              isEnabled={sources.serpLinkedin}
              onToggle={() => setSources((s) => ({ ...s, serpLinkedin: !s.serpLinkedin }))}
              agent="SerpAPI LinkedIn"
            />
            <SourceCard
              icon={<FileText className="w-5 h-5 text-white" />}
              name="Documentation technique"
              description="Analyse des spécifications produits"
              isEnabled={sources.techDocs}
              onToggle={() => setSources((s) => ({ ...s, techDocs: !s.techDocs }))}
              isPremium
              agent="Technical Docs Parser"
            />
            <SourceCard
              icon={<Database className="w-5 h-5 text-white" />}
              name="Base de brevets"
              description="Recherche brevets et IP"
              isEnabled={sources.patents}
              onToggle={() => setSources((s) => ({ ...s, patents: !s.patents }))}
              isPremium
              agent="Patent Search API"
            />
          </div>

          {/* RAG Knowledge Base info */}
          <motion.div
            className="card-glass p-4 border-purple-500/30"
            whileHover={{ y: -2 }}
          >
            <div className="flex items-start gap-3">
              <div className="icon-gradient-purple p-2 rounded-lg">
                <Database className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-primary">Base de connaissances CDS-RAG</h4>
                <p className="text-sm text-secondary mt-1">
                  L'analyse utilisera également votre base de connaissances RAG contenant les données entreprise,
                  industries cibles, personas et historique client de {companyInfo.name}.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="flex justify-between">
            <button onClick={() => setStep(2)} className="btn-ghost-glow">
              Retour
            </button>
            <button
              onClick={() => setStep(4)}
              className="btn-premium flex items-center gap-2"
            >
              Continuer
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Step 4: Launch */}
      {step === 4 && (
        <motion.div variants={itemVariants} className="space-y-6">
          <h2 className="text-lg font-semibold text-primary">Résumé et lancement</h2>

          <div className="card-premium p-6 space-y-6">
            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                className="stat-card-premium"
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="icon-gradient-purple p-1.5 rounded-lg">
                    <Target className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-sm text-secondary">Type d'analyse</p>
                </div>
                <p className="font-semibold text-lg gradient-text-blue">
                  {analysisTypes.find((t) => t.id === selectedType)?.title}
                </p>
              </motion.div>
              <motion.div
                className="stat-card-premium"
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="icon-gradient-orange p-1.5 rounded-lg">
                    <Building2 className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-sm text-secondary">Concurrents</p>
                </div>
                <p className="font-semibold text-lg gradient-text-blue">{selectedCompetitors.length} sélectionné(s)</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {selectedCompetitors.slice(0, 3).map((id) => {
                    const comp = competitorsList.find((c) => c.id === id)
                    return comp ? (
                      <span key={id} className="text-xs px-2 py-0.5 rounded bg-surface-tertiary text-secondary">{comp.name}</span>
                    ) : null
                  })}
                  {selectedCompetitors.length > 3 && (
                    <span className="text-xs px-2 py-0.5 rounded bg-surface-tertiary text-secondary">+{selectedCompetitors.length - 3}</span>
                  )}
                </div>
              </motion.div>
              <motion.div
                className="stat-card-premium"
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="icon-gradient-blue p-1.5 rounded-lg">
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-sm text-secondary">Sources IA</p>
                </div>
                <p className="font-semibold text-lg gradient-text-blue">
                  {Object.values(sources).filter(Boolean).length} sources actives
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {sources.perplexity && <span className="text-xs px-2 py-0.5 rounded bg-surface-tertiary text-secondary">Perplexity</span>}
                  {sources.exaDeep && <span className="text-xs px-2 py-0.5 rounded bg-surface-tertiary text-secondary">Exa</span>}
                  {sources.serpNews && <span className="text-xs px-2 py-0.5 rounded bg-surface-tertiary text-secondary">News</span>}
                  {sources.serpLinkedin && <span className="text-xs px-2 py-0.5 rounded bg-surface-tertiary text-secondary">LinkedIn</span>}
                </div>
              </motion.div>
            </div>

            <hr className="border-color-secondary" />

            {/* Workflow info */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-secondary" />
                <span className="text-secondary">
                  Durée estimée: <span className="font-medium text-primary">{analysisTypes.find((t) => t.id === selectedType)?.duration}</span>
                </span>
              </div>
              <div className="badge-glow-green flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                Workflow n8n: CDS-RAG PROD V11.2
              </div>
            </div>

            {/* Notification */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-primary/10 border border-blue-primary/30">
              <MessageSquare className="w-5 h-5 text-blue-primary" />
              <span className="text-sm text-blue-primary">
                Vous recevrez une notification par email à la fin de l'analyse avec un lien vers le rapport détaillé.
              </span>
            </div>
          </div>

          {/* Warning for high threat competitors */}
          {selectedCompetitors.some(id => {
            const comp = competitorsList.find(c => c.id === id)
            return comp?.threatLevel === 'high'
          }) && (
            <motion.div
              className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-amber-300">Concurrents à forte menace détectés</p>
                <p className="text-sm text-amber-400/80 mt-1">
                  Certains concurrents sélectionnés présentent un niveau de menace élevé. L'analyse inclura des recommandations stratégiques prioritaires.
                </p>
              </div>
            </motion.div>
          )}

          <div className="flex justify-between">
            <button onClick={() => setStep(3)} className="btn-ghost-glow">
              Retour
            </button>
            <button
              onClick={handleLaunchAnalysis}
              className="btn-premium flex items-center gap-2 px-8"
            >
              <Play className="w-5 h-5" />
              Lancer l'analyse
            </button>
          </div>
        </motion.div>
      )}

      {/* Launch Animation Modal */}
      <LaunchAnimation
        isOpen={isLaunching}
        onComplete={handleLaunchComplete}
        analysisType={analysisTypes.find(t => t.id === selectedType)?.title || ''}
        competitorCount={selectedCompetitors.length}
        sourceCount={Object.values(sources).filter(Boolean).length}
      />
    </motion.div>
  )
}

export default LaunchAnalysisPage
