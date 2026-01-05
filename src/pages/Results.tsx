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
  Loader2,
  BarChart3,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  X,
  Globe,
  Target,
  Zap,
  AlertTriangle,
  Newspaper,
  Lightbulb,
  Shield,
  Factory,
  Sparkles,
} from 'lucide-react'
import { useState } from 'react'
import { companyInfo } from '../data/clientData'

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

// Analysis result interface matching n8n workflow output
interface AnalysisResult {
  id: number
  title: string
  type: 'quick' | 'standard' | 'deep'
  status: 'completed' | 'running' | 'failed'
  date: string
  duration: string
  competitors: string[]
  score?: number
  progress?: number
  error?: string
  insights: number
  trend: 'up' | 'down' | 'stable'
  // n8n workflow output fields
  analysis_type: 'competitive' | 'market' | 'product' | 'news'
  sources_used: string[]
  key_findings: string[]
  strategic_recommendations: string[]
  threat_assessment: {
    level: 'high' | 'medium' | 'low'
    factors: string[]
  }
  market_position: {
    strengths: string[]
    weaknesses: string[]
    opportunities: string[]
    threats: string[]
  }
  recent_news: {
    title: string
    source: string
    date: string
    sentiment: 'positive' | 'negative' | 'neutral'
  }[]
  data_quality_score: number
}

// CDS-specific analyses data matching n8n workflow
const analyses: AnalysisResult[] = [
  {
    id: 1,
    title: `Analyse Concurrentielle - nTopology`,
    type: 'deep',
    status: 'completed',
    date: '3 janv. 2026',
    duration: '1h 45min',
    competitors: ['nTopology'],
    score: 92,
    insights: 18,
    trend: 'up',
    analysis_type: 'competitive',
    sources_used: ['Perplexity AI', 'Exa Deep Search', 'LinkedIn', 'Crunchbase'],
    key_findings: [
      'nTop a levé $65M en Series D, valorisation estimée à $400M+',
      'Focus principal sur l\'aéronautique et le médical haut de gamme',
      'Partenariats stratégiques avec HP et Desktop Metal',
      'Équipe R&D de 45+ ingénieurs basée à New York',
    ],
    strategic_recommendations: [
      'Différencier CDS par l\'approche temps réel et la performance',
      'Cibler les segments où nTop est moins présent (automobile, industriel)',
      'Mettre en avant la compatibilité multi-CAO de CDS',
    ],
    threat_assessment: {
      level: 'high',
      factors: ['Financement important', 'Brand recognition établie', 'Partenariats OEM']
    },
    market_position: {
      strengths: ['Interface intuitive', 'Écosystème de partenaires', 'Support technique'],
      weaknesses: ['Prix élevé', 'Courbe d\'apprentissage', 'Performance sur grands modèles'],
      opportunities: ['Marché automobile', 'Expansion européenne'],
      threats: ['CDS temps réel', 'Solutions open-source']
    },
    recent_news: [
      { title: 'nTop lance nTop Platform 4.0', source: 'TechCrunch', date: '28 déc. 2025', sentiment: 'positive' },
      { title: 'Partenariat nTop x HP pour impression 3D', source: 'Industry Week', date: '15 déc. 2025', sentiment: 'positive' }
    ],
    data_quality_score: 94
  },
  {
    id: 2,
    title: `Veille Marché - Secteur CAO/Simulation`,
    type: 'standard',
    status: 'completed',
    date: '2 janv. 2026',
    duration: '52 min',
    competitors: ['Altair Inspire', 'Ansys Discovery', 'Siemens NX'],
    score: 88,
    insights: 14,
    trend: 'up',
    analysis_type: 'market',
    sources_used: ['Perplexity AI', 'SerpAPI News', 'Industry Reports'],
    key_findings: [
      'Le marché du generative design croît de 23% par an',
      'Tendance forte vers l\'intégration CAO/Simulation/Manufacturing',
      'Demande croissante pour solutions cloud-native',
      'L\'IA générative devient un facteur différenciant majeur',
    ],
    strategic_recommendations: [
      'Accélérer le développement des fonctionnalités cloud',
      'Renforcer le messaging autour de l\'IA intégrée',
      'Explorer les partenariats avec les plateformes PLM',
    ],
    threat_assessment: {
      level: 'medium',
      factors: ['Consolidation du marché', 'Barrières technologiques']
    },
    market_position: {
      strengths: ['Innovation technologique', 'Performance temps réel'],
      weaknesses: ['Part de marché limitée', 'Notoriété'],
      opportunities: ['Nouveaux verticaux', 'Partenariats distributeurs'],
      threats: ['Acquisitions par les majors', 'Open-source']
    },
    recent_news: [
      { title: 'Altair acquiert une startup IA', source: 'Reuters', date: '20 déc. 2025', sentiment: 'neutral' },
      { title: 'Siemens NX 2024.1 supporte le cloud natif', source: 'CAD Insider', date: '18 déc. 2025', sentiment: 'neutral' }
    ],
    data_quality_score: 89
  },
  {
    id: 3,
    title: `Analyse Produit - PTC Creo Generative`,
    type: 'deep',
    status: 'running',
    date: '4 janv. 2026',
    duration: '2h 30min',
    competitors: ['PTC Creo'],
    progress: 73,
    insights: 11,
    trend: 'stable',
    analysis_type: 'product',
    sources_used: ['Exa Deep Search', 'Technical Documentation', 'User Forums'],
    key_findings: [
      'Creo 11 intègre une nouvelle approche de generative design',
      'Focus sur l\'intégration avec Windchill PLM',
      'Cible principalement les entreprises avec infrastructure PTC existante',
    ],
    strategic_recommendations: [
      'Développer des comparatifs techniques détaillés',
      'Cibler les prospects insatisfaits de l\'écosystème fermé PTC',
    ],
    threat_assessment: {
      level: 'medium',
      factors: ['Base installée importante', 'Intégration PLM native']
    },
    market_position: {
      strengths: ['Écosystème complet', 'Support enterprise'],
      weaknesses: ['Coût total élevé', 'Complexité'],
      opportunities: ['Modernisation legacy'],
      threats: ['Solutions plus agiles']
    },
    recent_news: [
      { title: 'PTC Creo 11 annoncé pour Q1 2026', source: 'PTC Blog', date: '10 déc. 2025', sentiment: 'positive' }
    ],
    data_quality_score: 78
  },
  {
    id: 4,
    title: `Benchmark Tarification - Marché CAO/FAO`,
    type: 'standard',
    status: 'completed',
    date: '30 déc. 2025',
    duration: '38 min',
    competitors: ['nTopology', 'Altair Inspire', 'Ansys Discovery', 'Autodesk Fusion 360'],
    score: 95,
    insights: 16,
    trend: 'up',
    analysis_type: 'competitive',
    sources_used: ['Perplexity AI', 'Vendor Websites', 'G2 Reviews'],
    key_findings: [
      'nTop: $15K-50K/an selon les modules',
      'Altair Inspire: $8K-25K/an en licence perpétuelle disponible',
      'Ansys Discovery: $12K-40K/an, bundle simulation',
      'CDS positionné compétitivement avec meilleur ROI',
    ],
    strategic_recommendations: [
      'Maintenir le positionnement premium avec valeur ajoutée claire',
      'Développer des études de cas ROI quantifiées',
      'Proposer des options flexibles (SaaS, perpétuel, token)',
    ],
    threat_assessment: {
      level: 'low',
      factors: ['Prix compétitifs', 'Proposition de valeur différenciée']
    },
    market_position: {
      strengths: ['ROI démontrable', 'Prix compétitif'],
      weaknesses: ['Moins de modules'],
      opportunities: ['Pricing flexible', 'Bundles verticaux'],
      threats: ['Guerre des prix']
    },
    recent_news: [],
    data_quality_score: 91
  },
  {
    id: 5,
    title: `Veille News - Industrie Aérospatiale`,
    type: 'quick',
    status: 'completed',
    date: '28 déc. 2025',
    duration: '12 min',
    competitors: ['nTopology', 'Altair Inspire'],
    score: 76,
    insights: 7,
    trend: 'stable',
    analysis_type: 'news',
    sources_used: ['SerpAPI News', 'Google News', 'Industry Publications'],
    key_findings: [
      'Boeing et Airbus intensifient l\'utilisation du generative design',
      'SpaceX standardise l\'optimisation topologique pour Starship',
      'L\'impression 3D métal devient mainstream dans l\'aéro',
    ],
    strategic_recommendations: [
      'Créer des case studies aérospatiales avec les clients existants',
      'Participer aux salons aéronautiques majeurs (Farnborough, Le Bourget)',
    ],
    threat_assessment: {
      level: 'medium',
      factors: ['nTop bien positionné chez les OEM']
    },
    market_position: {
      strengths: ['Technologie adaptée aux contraintes aéro'],
      weaknesses: ['Moins de références aéro'],
      opportunities: ['Tier 1 & Tier 2 suppliers'],
      threats: ['Certification requirements']
    },
    recent_news: [
      { title: 'Airbus utilise l\'IA pour optimiser les structures', source: 'Aviation Week', date: '22 déc. 2025', sentiment: 'neutral' },
      { title: 'SpaceX réduit le poids de 40% via generative design', source: 'Space News', date: '19 déc. 2025', sentiment: 'positive' }
    ],
    data_quality_score: 82
  },
  {
    id: 6,
    title: `Analyse Concurrentielle - InfinitForm`,
    type: 'standard',
    status: 'failed',
    date: '26 déc. 2025',
    duration: '-',
    competitors: ['InfinitForm'],
    error: 'Données insuffisantes - startup en mode stealth, peu d\'informations publiques disponibles',
    insights: 0,
    trend: 'down',
    analysis_type: 'competitive',
    sources_used: ['Perplexity AI', 'Exa Deep Search'],
    key_findings: [],
    strategic_recommendations: ['Réessayer dans 3 mois avec sources alternatives'],
    threat_assessment: {
      level: 'low',
      factors: ['Manque de visibilité']
    },
    market_position: {
      strengths: [],
      weaknesses: [],
      opportunities: [],
      threats: []
    },
    recent_news: [],
    data_quality_score: 15
  },
]

// Analysis Card Component
interface AnalysisCardProps {
  analysis: AnalysisResult
  onViewDetails: (analysis: AnalysisResult) => void
}

function AnalysisCard({ analysis, onViewDetails }: AnalysisCardProps) {
  const statusConfig = {
    completed: {
      icon: <CheckCircle2 className="w-4 h-4" />,
      badge: 'badge-glow-green',
      label: 'Terminée',
    },
    running: {
      icon: <Loader2 className="w-4 h-4 animate-spin" />,
      badge: 'badge-glow-blue',
      label: 'En cours',
    },
    failed: {
      icon: <AlertCircle className="w-4 h-4" />,
      badge: 'badge-glow-red',
      label: 'Échec',
    },
  }

  const typeConfig = {
    quick: { label: 'Rapide', gradient: 'icon-gradient-blue' },
    standard: { label: 'Standard', gradient: 'icon-gradient-purple' },
    deep: { label: 'Approfondie', gradient: 'icon-gradient-orange' },
  }

  const analysisTypeConfig = {
    competitive: { label: 'Concurrentielle', icon: Target, gradient: 'icon-gradient-purple' },
    market: { label: 'Marché', icon: TrendingUp, gradient: 'icon-gradient-green' },
    product: { label: 'Produit', icon: Zap, gradient: 'icon-gradient-orange' },
    news: { label: 'Actualités', icon: Newspaper, gradient: 'icon-gradient-blue' },
  }

  const threatBadgeConfig = {
    high: 'badge-glow-red',
    medium: 'badge-glow-orange',
    low: 'badge-glow-green',
  }

  const status = statusConfig[analysis.status]
  const type = typeConfig[analysis.type]
  const analysisType = analysisTypeConfig[analysis.analysis_type]
  const AnalysisIcon = analysisType.icon

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
          <div className={`w-12 h-12 rounded-xl ${analysisType.gradient} flex items-center justify-center`}>
            <AnalysisIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-primary group-hover:text-blue-primary transition-colors">
              {analysis.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted">
              <Calendar className="w-3.5 h-3.5" />
              {analysis.date}
              <span className="text-border">•</span>
              <Clock className="w-3.5 h-3.5" />
              {analysis.duration}
            </div>
          </div>
        </div>

        <span className={`${status.badge} flex items-center gap-1.5`}>
          {status.icon}
          {status.label}
        </span>
      </div>

      {/* Progress bar for running analyses */}
      {analysis.status === 'running' && analysis.progress && (
        <div className="mb-4 p-3 rounded-xl bg-surface-secondary/50 border border-border">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted">Progression</span>
            <span className="font-semibold text-info">{analysis.progress}%</span>
          </div>
          <div className="h-2 rounded-full bg-surface overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${analysis.progress}%` }}
              transition={{ duration: 0.5 }}
              className="h-full rounded-full bg-gradient-to-r from-blue-primary to-info"
            />
          </div>
        </div>
      )}

      {/* Error message for failed analyses */}
      {analysis.status === 'failed' && analysis.error && (
        <div className="mb-4 p-3 rounded-xl bg-error/10 border border-error/20 text-error text-sm flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
          {analysis.error}
        </div>
      )}

      {/* Threat Assessment Badge */}
      {analysis.status === 'completed' && (
        <div className="mb-4 flex items-center gap-2">
          <span className={`${threatBadgeConfig[analysis.threat_assessment.level]} flex items-center gap-1.5`}>
            <Shield className="w-3.5 h-3.5" />
            Menace: {analysis.threat_assessment.level === 'high' ? 'Élevée' : analysis.threat_assessment.level === 'medium' ? 'Moyenne' : 'Faible'}
          </span>
          <span className="badge-glow-purple flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            {type.label}
          </span>
        </div>
      )}

      {/* Competitors */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm text-muted">Concurrents:</span>
        <div className="flex gap-1.5 flex-wrap">
          {analysis.competitors.slice(0, 3).map((comp, index) => (
            <span key={index} className="badge-glow-blue text-xs">
              {comp}
            </span>
          ))}
          {analysis.competitors.length > 3 && (
            <span className="badge-glow-blue text-xs">
              +{analysis.competitors.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Key Findings Preview */}
      {analysis.key_findings.length > 0 && (
        <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-info/10 to-blue-primary/10 border border-info/20">
          <p className="text-xs font-medium text-info mb-1 flex items-center gap-1">
            <Lightbulb className="w-3.5 h-3.5" />
            Insight clé
          </p>
          <p className="text-sm text-secondary line-clamp-2">{analysis.key_findings[0]}</p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        <motion.div
          className="stat-card-premium text-center"
          whileHover={{ y: -2 }}
        >
          <p className="text-xs text-muted mb-0.5">Type</p>
          <p className="font-semibold text-xs text-primary">
            {analysisType.label}
          </p>
        </motion.div>
        <motion.div
          className="stat-card-premium text-center"
          whileHover={{ y: -2 }}
        >
          <p className="text-xs text-muted mb-0.5">Qualité</p>
          <p className="font-semibold text-xs text-info">{analysis.data_quality_score}%</p>
        </motion.div>
        {analysis.score && (
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
          <div className="flex items-center justify-center gap-1">
            <span className="font-semibold text-sm text-primary">{analysis.insights}</span>
            {analysis.trend === 'up' && <TrendingUp className="w-3 h-3 text-success" />}
            {analysis.trend === 'down' && <TrendingDown className="w-3 h-3 text-error" />}
          </div>
        </motion.div>
      </div>

      {/* Sources */}
      {analysis.sources_used.length > 0 && (
        <div className="flex items-center gap-2 mb-4 text-xs text-muted">
          <div className="w-5 h-5 rounded-md icon-gradient-blue flex items-center justify-center">
            <Globe className="w-3 h-3 text-white" />
          </div>
          <span>Sources: {analysis.sources_used.slice(0, 2).join(', ')}</span>
          {analysis.sources_used.length > 2 && (
            <span className="text-border">+{analysis.sources_used.length - 2}</span>
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

// Analysis Details Modal
interface AnalysisModalProps {
  analysis: AnalysisResult
  onClose: () => void
}

function AnalysisModal({ analysis, onClose }: AnalysisModalProps) {
  const threatBadgeConfig = {
    high: 'badge-glow-red',
    medium: 'badge-glow-orange',
    low: 'badge-glow-green',
  }

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
                  {analysis.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {analysis.duration}
                </span>
                <span className={`${threatBadgeConfig[analysis.threat_assessment.level]} flex items-center gap-1`}>
                  <Shield className="w-3 h-3" />
                  Menace {analysis.threat_assessment.level === 'high' ? 'Élevée' : analysis.threat_assessment.level === 'medium' ? 'Moyenne' : 'Faible'}
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
          {/* Data Quality & Sources */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              className="card-premium p-4"
              whileHover={{ y: -2 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-xl icon-gradient-blue flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-primary">Qualité des données</h3>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-3 rounded-full bg-surface overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-primary to-info"
                    style={{ width: `${analysis.data_quality_score}%` }}
                  />
                </div>
                <span className="font-bold text-lg text-info">{analysis.data_quality_score}%</span>
              </div>
            </motion.div>
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
                {analysis.sources_used.map((source, index) => (
                  <span key={index} className="badge-glow-blue text-xs">
                    {source}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Key Findings */}
          {analysis.key_findings.length > 0 && (
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
                {analysis.key_findings.map((finding, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-secondary">
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-primary to-info mt-2 shrink-0" />
                    {finding}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Strategic Recommendations */}
          {analysis.strategic_recommendations.length > 0 && (
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
                {analysis.strategic_recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-secondary">
                    <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
                    {rec}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* SWOT Analysis */}
          {analysis.market_position.strengths.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-primary">
                <div className="w-8 h-8 rounded-lg icon-gradient-purple flex items-center justify-center">
                  <Factory className="w-4 h-4 text-white" />
                </div>
                Analyse de positionnement
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <motion.div
                  className="p-3 rounded-xl bg-success/10 border border-success/20"
                  whileHover={{ scale: 1.02 }}
                >
                  <h4 className="text-sm font-semibold text-success mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Forces
                  </h4>
                  <ul className="space-y-1">
                    {analysis.market_position.strengths.map((item, index) => (
                      <li key={index} className="text-xs flex items-start gap-1 text-secondary">
                        <span className="text-success font-bold">+</span> {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
                <motion.div
                  className="p-3 rounded-xl bg-error/10 border border-error/20"
                  whileHover={{ scale: 1.02 }}
                >
                  <h4 className="text-sm font-semibold text-error mb-2 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Faiblesses
                  </h4>
                  <ul className="space-y-1">
                    {analysis.market_position.weaknesses.map((item, index) => (
                      <li key={index} className="text-xs flex items-start gap-1 text-secondary">
                        <span className="text-error font-bold">−</span> {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
                <motion.div
                  className="p-3 rounded-xl bg-info/10 border border-info/20"
                  whileHover={{ scale: 1.02 }}
                >
                  <h4 className="text-sm font-semibold text-info mb-2 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Opportunités
                  </h4>
                  <ul className="space-y-1">
                    {analysis.market_position.opportunities.map((item, index) => (
                      <li key={index} className="text-xs flex items-start gap-1 text-secondary">
                        <span className="text-info font-bold">↑</span> {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
                <motion.div
                  className="p-3 rounded-xl bg-warning/10 border border-warning/20"
                  whileHover={{ scale: 1.02 }}
                >
                  <h4 className="text-sm font-semibold text-warning mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Menaces
                  </h4>
                  <ul className="space-y-1">
                    {analysis.market_position.threats.map((item, index) => (
                      <li key={index} className="text-xs flex items-start gap-1 text-secondary">
                        <span className="text-warning font-bold">!</span> {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          )}

          {/* Threat Assessment Details */}
          {analysis.threat_assessment.factors.length > 0 && (
            <motion.div
              className={`card-premium p-4 ${
                analysis.threat_assessment.level === 'high'
                  ? 'bg-gradient-to-br from-error/10 to-transparent border-error/30'
                  : analysis.threat_assessment.level === 'medium'
                  ? 'bg-gradient-to-br from-warning/10 to-transparent border-warning/30'
                  : 'bg-gradient-to-br from-success/10 to-transparent border-success/30'
              }`}
              whileHover={{ y: -2 }}
            >
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className={`w-5 h-5 ${
                  analysis.threat_assessment.level === 'high'
                    ? 'text-error'
                    : analysis.threat_assessment.level === 'medium'
                    ? 'text-warning'
                    : 'text-success'
                }`} />
                Facteurs de menace
              </h3>
              <div className="flex flex-wrap gap-2">
                {analysis.threat_assessment.factors.map((factor, index) => (
                  <span key={index} className="px-3 py-1.5 rounded-full bg-surface border border-border text-sm text-secondary">
                    {factor}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Recent News */}
          {analysis.recent_news.length > 0 && (
            <motion.div
              className="card-premium p-4"
              whileHover={{ y: -2 }}
            >
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-primary">
                <div className="w-8 h-8 rounded-lg icon-gradient-blue flex items-center justify-center">
                  <Newspaper className="w-4 h-4 text-white" />
                </div>
                Actualités récentes
              </h3>
              <div className="space-y-2">
                {analysis.recent_news.map((news, index) => (
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

export function ResultsPage() {
  const [filter, setFilter] = useState<'all' | 'completed' | 'running' | 'failed'>('all')
  const [typeFilter, setTypeFilter] = useState<'all' | 'competitive' | 'market' | 'product' | 'news'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedAnalysis, setSelectedAnalysis] = useState<AnalysisResult | null>(null)

  const filteredAnalyses = analyses.filter((a) => {
    const matchesStatus = filter === 'all' || a.status === filter
    const matchesType = typeFilter === 'all' || a.analysis_type === typeFilter
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.competitors.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesStatus && matchesType && matchesSearch
  })

  const stats = {
    total: analyses.length,
    completed: analyses.filter((a) => a.status === 'completed').length,
    running: analyses.filter((a) => a.status === 'running').length,
    avgScore: Math.round(
      analyses
        .filter((a) => a.score)
        .reduce((acc, a) => acc + (a.score || 0), 0) /
        analyses.filter((a) => a.score).length
    ),
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
                <span className="badge-glow-blue flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {stats.total} analyses
                </span>
              </div>
              <p className="text-sm text-info">{companyInfo.name}</p>
              <p className="text-muted text-sm">
                Analyses concurrentielles et veille marché • Workflow n8n Dealigent-RAG
              </p>
            </div>
          </div>

          <button className="btn-premium flex items-center gap-2">
            <Download className="w-4 h-4" />
            Exporter tout
          </button>
        </div>
      </motion.div>

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
            <div className="w-12 h-12 rounded-xl icon-gradient-purple flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">{stats.running}</p>
              <p className="text-sm text-muted">En cours</p>
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
              <p className="text-2xl font-bold gradient-text-blue">{stats.avgScore}%</p>
              <p className="text-sm text-muted">Score moyen</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants} className="card-glass p-5">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="text"
              placeholder="Rechercher une analyse ou un concurrent..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-xl bg-surface border border-border text-primary placeholder:text-muted focus:outline-none focus:border-blue-primary/50 focus:ring-2 focus:ring-blue-primary/20 transition-all"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {[
              { key: 'all', label: 'Toutes' },
              { key: 'completed', label: 'Terminées' },
              { key: 'running', label: 'En cours' },
              { key: 'failed', label: 'Échecs' },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key as typeof filter)}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  filter === f.key
                    ? 'btn-premium'
                    : 'bg-surface border border-border text-secondary hover:bg-hover hover:text-primary hover:border-blue-primary/30'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Type filter */}
        <div className="flex gap-2 mt-4 flex-wrap items-center">
          <span className="text-sm text-muted py-1">Type:</span>
          {[
            { key: 'all', label: 'Tous' },
            { key: 'competitive', label: 'Concurrentielle' },
            { key: 'market', label: 'Marché' },
            { key: 'product', label: 'Produit' },
            { key: 'news', label: 'Actualités' },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setTypeFilter(f.key as typeof typeFilter)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                typeFilter === f.key
                  ? 'badge-glow-purple'
                  : 'text-muted hover:bg-hover hover:text-secondary'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAnalyses.map((analysis) => (
          <AnalysisCard
            key={analysis.id}
            analysis={analysis}
            onViewDetails={setSelectedAnalysis}
          />
        ))}
      </div>

      {/* Empty state */}
      {filteredAnalyses.length === 0 && (
        <motion.div variants={itemVariants} className="card-glass p-12 text-center">
          <div className="w-20 h-20 rounded-2xl icon-gradient-blue flex items-center justify-center mx-auto mb-4 opacity-50">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-primary">Aucune analyse trouvée</h3>
          <p className="text-muted mb-4">
            Modifiez vos filtres ou lancez une nouvelle analyse.
          </p>
          <button className="btn-premium">
            Lancer une analyse
          </button>
        </motion.div>
      )}

      {/* Analysis Details Modal */}
      <AnimatePresence>
        {selectedAnalysis && (
          <AnalysisModal
            analysis={selectedAnalysis}
            onClose={() => setSelectedAnalysis(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default ResultsPage
