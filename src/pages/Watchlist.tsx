import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  TrendingUp,
  TrendingDown,
  Minus,
  Users,
  Building2,
  Eye,
  Trash2,
  Bell,
  ExternalLink,
  Star,
  StarOff,
  X,
  AlertTriangle,
  Shield,
  Target,
  Activity,
  MapPin,
  Briefcase,
  Link,
  ChevronRight,
  RefreshCw,
  Zap,
  BarChart3,
  Clock,
  FileText,
  Sparkles,
} from 'lucide-react'
import { useState } from 'react'
import { competitors, watchlistItems } from '../data/clientData'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
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
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
}

// Extended competitor data structure matching n8n workflow output
interface CompetitorAnalysis {
  competitor_name: string
  website: string
  threatLevel: 'high' | 'medium' | 'low'
  marketShare: number
  market_cap?: string
  executives?: string[]
  products?: string[]
  industries?: string[]
  customers?: string[]
  headquarters?: string
  founded_year?: number
  strengths?: string[]
  weaknesses?: string[]
  recent_activity?: string[]
  source_urls?: string[]
  lastUpdate: string
  alerts: number
  score: number
  trend: 'up' | 'down' | 'stable'
  isStarred: boolean
}

// Transform watchlist data to analysis format
const competitorAnalyses: CompetitorAnalysis[] = watchlistItems.map((item) => ({
  competitor_name: item.competitor.name,
  website: item.competitor.website,
  threatLevel: item.competitor.threatLevel as 'high' | 'medium' | 'low',
  marketShare: item.competitor.marketShare,
  lastUpdate: item.lastUpdate,
  alerts: item.alerts,
  score: item.score,
  trend: item.trend as 'up' | 'down' | 'stable',
  isStarred: item.alerts > 2,
  recent_activity: item.recentChanges,
  // Mock extended data for demonstration
  market_cap: item.competitor.name === 'nTop' ? '$500M+' : item.competitor.name === 'Dassault CATIA' ? '$50B+' : '$100M-500M',
  executives: ['CEO', 'CTO', 'VP Engineering', 'VP Sales'],
  products: item.competitor.name === 'nTop'
    ? ['nTop Platform', 'nTop for Altair', 'nTop Live']
    : item.competitor.name === 'PTC Creo'
    ? ['Creo Generative Design', 'Creo Parametric', 'Creo Simulate']
    : ['Core Platform', 'Enterprise Edition', 'Cloud Suite'],
  industries: ['Aerospace', 'Automotive', 'Medical', 'Consumer Goods'],
  customers: ['Top OEMs', 'Tier-1 Suppliers', 'Engineering Services'],
  headquarters: item.competitor.name === 'nTop' ? 'New York, USA' : item.competitor.name === 'Dassault CATIA' ? 'Paris, France' : 'USA',
  founded_year: item.competitor.name === 'nTop' ? 2015 : 2000,
  strengths: item.competitor.name === 'nTop'
    ? ['Strong implicit geometry engine', 'Good lattice capabilities', 'Growing adoption']
    : ['Market presence', 'Enterprise features', 'Integration ecosystem'],
  weaknesses: item.competitor.name === 'nTop'
    ? ['Complex learning curve', 'Limited DfM', 'High pricing']
    : ['Less agile', 'Traditional approach', 'Slow innovation'],
  source_urls: [item.competitor.website, 'https://news.example.com'],
}))

// Add remaining competitors from the data
const additionalCompetitors: CompetitorAnalysis[] = competitors
  .filter(c => !watchlistItems.some(w => w.competitor.name === c.name))
  .map(c => ({
    competitor_name: c.name,
    website: c.website,
    threatLevel: c.threatLevel as 'high' | 'medium' | 'low',
    marketShare: c.marketShare,
    lastUpdate: '2025-01-01',
    alerts: 0,
    score: 60 + Math.floor(Math.random() * 30),
    trend: 'stable' as const,
    isStarred: false,
    market_cap: '$100M-500M',
    products: ['Core Platform'],
    industries: ['Aerospace', 'Automotive'],
    headquarters: 'USA',
    founded_year: 2010,
    strengths: ['Market presence'],
    weaknesses: ['Competition'],
    recent_activity: [],
    source_urls: [c.website],
  }))

const allCompetitors = [...competitorAnalyses, ...additionalCompetitors]

// Competitor Card Component
interface CompetitorCardProps {
  competitor: CompetitorAnalysis
  onToggleStar: () => void
  onViewDetails: () => void
}

function CompetitorCard({ competitor, onToggleStar, onViewDetails }: CompetitorCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const threatConfig = {
    high: { color: 'text-red-400', bg: 'badge-glow-red', label: 'Menace élevée', icon: AlertTriangle },
    medium: { color: 'text-amber-400', bg: 'badge-glow-orange', label: 'Menace moyenne', icon: Shield },
    low: { color: 'text-emerald-400', bg: 'badge-glow-green', label: 'Menace faible', icon: Target },
  }

  const trendConfig = {
    up: { color: 'text-emerald-400', icon: TrendingUp, label: 'En hausse' },
    down: { color: 'text-red-400', icon: TrendingDown, label: 'En baisse' },
    stable: { color: 'text-white/50', icon: Minus, label: 'Stable' },
  }

  const threat = threatConfig[competitor.threatLevel]
  const trend = trendConfig[competitor.trend]
  const ThreatIcon = threat.icon
  const TrendIcon = trend.icon

  // Get initials for logo
  const initials = competitor.competitor_name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  return (
    <motion.div
      variants={itemVariants}
      className="card-premium p-6 relative group cursor-pointer"
      onClick={onViewDetails}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Star badge */}
      {competitor.isStarred && (
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
          <Star className="w-4 h-4 text-white fill-white" />
        </div>
      )}

      {/* Alert badge */}
      {competitor.alerts > 0 && (
        <div className="absolute top-4 right-4 badge-glow-red flex items-center gap-1">
          <Bell className="w-3 h-3" />
          {competitor.alerts}
        </div>
      )}

      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          <div className="w-14 h-14 rounded-2xl icon-gradient-blue flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
            {initials}
          </div>
        </div>

        <div className="flex-1 min-w-0 pr-8">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-primary truncate">{competitor.competitor_name}</h3>
            <a
              href={competitor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-blue-primary transition-colors"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Ouvrir le site web de ${competitor.competitor_name}`}
            >
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
          <p className="text-sm text-secondary truncate">{competitor.website.replace('https://', '')}</p>
        </div>

        {/* Actions menu */}
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }}
            className="p-2 rounded-lg hover:bg-surface-secondary transition-colors"
            aria-label="Plus d'options"
            aria-expanded={isMenuOpen}
            aria-haspopup="menu"
          >
            <MoreVertical className="w-5 h-5 text-secondary" aria-hidden="true" />
          </button>

          {isMenuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)} />
              <div className="absolute right-0 top-full mt-1 w-48 card-glass p-2 shadow-xl z-20">
                <button
                  onClick={() => { onViewDetails(); setIsMenuOpen(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-secondary rounded-lg hover:bg-surface-secondary transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  Voir analyse détaillée
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-secondary rounded-lg hover:bg-surface-secondary transition-colors">
                  <RefreshCw className="w-4 h-4" />
                  Relancer l'analyse
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-secondary rounded-lg hover:bg-surface-secondary transition-colors">
                  <Bell className="w-4 h-4" />
                  Configurer alertes
                </button>
                <button
                  onClick={() => { onToggleStar(); setIsMenuOpen(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-secondary rounded-lg hover:bg-surface-secondary transition-colors"
                >
                  {competitor.isStarred ? (
                    <>
                      <StarOff className="w-4 h-4" />
                      Retirer des favoris
                    </>
                  ) : (
                    <>
                      <Star className="w-4 h-4" />
                      Ajouter aux favoris
                    </>
                  )}
                </button>
                <hr className="my-1 border-color-secondary" />
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-red-500/20 text-red-400 transition-colors">
                  <Trash2 className="w-4 h-4" />
                  Supprimer
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-3 rounded-xl bg-surface-tertiary/50 border border-color-secondary">
          <div className="flex items-center gap-2 text-secondary text-xs mb-1">
            <BarChart3 className="w-3 h-3" />
            Part de marché
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-primary">{competitor.marketShare}%</span>
            <span className={`text-xs flex items-center ${trend.color}`}>
              <TrendIcon className="w-3 h-3 mr-0.5" />
              {trend.label}
            </span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-surface-tertiary/50 border border-color-secondary">
          <div className="flex items-center gap-2 text-secondary text-xs mb-1">
            <Activity className="w-3 h-3" />
            Activités récentes
          </div>
          <span className="font-semibold text-sm text-primary">{competitor.recent_activity?.length || 0}</span>
        </div>
      </div>

      {/* Score & Threat Level */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-secondary">Score:</span>
          <div className="flex items-center gap-2">
            <div className="w-20 h-2 rounded-full bg-surface-secondary overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${competitor.score}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="h-full rounded-full bg-gradient-to-r from-blue-primary to-cyan-400"
              />
            </div>
            <span className="font-semibold text-sm gradient-text-blue">{competitor.score}</span>
          </div>
        </div>

        <span className={`${threat.bg} flex items-center gap-1`}>
          <ThreatIcon className="w-3 h-3" />
          {threat.label}
        </span>
      </div>

      {/* Recent Activity Preview */}
      {competitor.recent_activity && competitor.recent_activity.length > 0 && (
        <div className="mb-4 space-y-2">
          <p className="text-xs font-medium text-secondary">Activités récentes:</p>
          {competitor.recent_activity.slice(0, 2).map((activity, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-secondary">
              <Zap className="w-3 h-3 text-amber-400 shrink-0" />
              <span className="truncate">{activity}</span>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-color-secondary">
        <div className="flex items-center gap-2 text-xs text-secondary">
          <Clock className="w-3 h-3" />
          Mise à jour: {competitor.lastUpdate}
        </div>
        <span className="text-xs text-blue-primary flex items-center gap-1 group-hover:underline">
          Voir détails
          <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </motion.div>
  )
}

// Detailed Analysis Modal
interface AnalysisModalProps {
  competitor: CompetitorAnalysis | null
  isOpen: boolean
  onClose: () => void
}

function AnalysisModal({ competitor, isOpen, onClose }: AnalysisModalProps) {
  if (!competitor) return null

  const threatConfig = {
    high: { color: 'text-red-400', bg: 'badge-glow-red', label: 'Menace élevée' },
    medium: { color: 'text-amber-400', bg: 'badge-glow-orange', label: 'Menace moyenne' },
    low: { color: 'text-emerald-400', bg: 'badge-glow-green', label: 'Menace faible' },
  }

  const threat = threatConfig[competitor.threatLevel]
  const initials = competitor.competitor_name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-4 md:inset-8 lg:inset-16 xl:inset-24 card-premium z-50 overflow-hidden flex flex-col"
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-color-secondary flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl icon-gradient-blue flex items-center justify-center text-white font-bold text-xl">
                {initials}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-xl font-bold text-primary">{competitor.competitor_name}</h2>
                  <span className={threat.bg}>
                    {threat.label}
                  </span>
                </div>
                <a
                  href={competitor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-primary hover:underline flex items-center gap-1"
                >
                  {competitor.website}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-surface-secondary transition-colors text-secondary hover:text-primary"
                aria-label="Fermer la fenêtre"
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <motion.div
                  className="stat-card-premium"
                  whileHover={{ y: -2 }}
                >
                  <p className="text-xs text-secondary mb-1">Part de marché</p>
                  <p className="text-2xl font-bold gradient-text-blue">{competitor.marketShare}%</p>
                </motion.div>
                <motion.div
                  className="stat-card-premium"
                  whileHover={{ y: -2 }}
                >
                  <p className="text-xs text-secondary mb-1">Score compétitif</p>
                  <p className="text-2xl font-bold gradient-text-blue">{competitor.score}/100</p>
                </motion.div>
                <motion.div
                  className="stat-card-premium"
                  whileHover={{ y: -2 }}
                >
                  <p className="text-xs text-secondary mb-1">Valorisation</p>
                  <p className="text-xl font-bold text-primary">{competitor.market_cap || 'N/A'}</p>
                </motion.div>
                <motion.div
                  className="stat-card-premium"
                  whileHover={{ y: -2 }}
                >
                  <p className="text-xs text-secondary mb-1">Année de création</p>
                  <p className="text-xl font-bold text-primary">{competitor.founded_year || 'N/A'}</p>
                </motion.div>
              </div>

              {/* Company Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Headquarters */}
                  {competitor.headquarters && (
                    <motion.div
                      className="card-glass p-4"
                      whileHover={{ y: -2 }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <div className="icon-gradient-blue p-2 rounded-lg">
                          <MapPin className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="font-semibold text-primary">Siège social</h3>
                      </div>
                      <p className="text-sm text-secondary">{competitor.headquarters}</p>
                    </motion.div>
                  )}

                  {/* Products */}
                  {competitor.products && competitor.products.length > 0 && (
                    <motion.div
                      className="card-glass p-4"
                      whileHover={{ y: -2 }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <div className="icon-gradient-purple p-2 rounded-lg">
                          <Briefcase className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="font-semibold text-primary">Produits</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {competitor.products.map((product, idx) => (
                          <span key={idx} className="badge-glow-purple">
                            {product}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Industries */}
                  {competitor.industries && competitor.industries.length > 0 && (
                    <motion.div
                      className="card-glass p-4"
                      whileHover={{ y: -2 }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <div className="icon-gradient-blue p-2 rounded-lg">
                          <Building2 className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="font-semibold text-primary">Industries cibles</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {competitor.industries.map((industry, idx) => (
                          <span key={idx} className="badge-glow-blue">
                            {industry}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Customers */}
                  {competitor.customers && competitor.customers.length > 0 && (
                    <motion.div
                      className="card-glass p-4"
                      whileHover={{ y: -2 }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <div className="icon-gradient-green p-2 rounded-lg">
                          <Users className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="font-semibold text-primary">Types de clients</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {competitor.customers.map((customer, idx) => (
                          <span key={idx} className="badge-glow-green">
                            {customer}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Strengths */}
                  {competitor.strengths && competitor.strengths.length > 0 && (
                    <motion.div
                      className="card-glass p-4 border-emerald-500/20"
                      whileHover={{ y: -2 }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <div className="icon-gradient-green p-2 rounded-lg">
                          <TrendingUp className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="font-semibold text-primary">Points forts</h3>
                      </div>
                      <ul className="space-y-2">
                        {competitor.strengths.map((strength, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-secondary">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0 shadow-lg shadow-emerald-400/50" />
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  {/* Weaknesses */}
                  {competitor.weaknesses && competitor.weaknesses.length > 0 && (
                    <motion.div
                      className="card-glass p-4 border-red-500/20"
                      whileHover={{ y: -2 }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-red-500 to-rose-600 shadow-lg shadow-red-500/25">
                          <TrendingDown className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="font-semibold text-primary">Points faibles</h3>
                      </div>
                      <ul className="space-y-2">
                        {competitor.weaknesses.map((weakness, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-secondary">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0 shadow-lg shadow-red-400/50" />
                            {weakness}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  {/* Recent Activity */}
                  {competitor.recent_activity && competitor.recent_activity.length > 0 && (
                    <motion.div
                      className="card-glass p-4 border-amber-500/20"
                      whileHover={{ y: -2 }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <div className="icon-gradient-orange p-2 rounded-lg">
                          <Activity className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="font-semibold text-primary">Activités récentes</h3>
                      </div>
                      <ul className="space-y-2">
                        {competitor.recent_activity.map((activity, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-secondary">
                            <Zap className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  {/* Sources */}
                  {competitor.source_urls && competitor.source_urls.length > 0 && (
                    <motion.div
                      className="card-glass p-4"
                      whileHover={{ y: -2 }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <div className="icon-gradient-purple p-2 rounded-lg">
                          <Link className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="font-semibold text-primary">Sources</h3>
                      </div>
                      <ul className="space-y-2">
                        {competitor.source_urls.map((url, idx) => (
                          <li key={idx}>
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-primary hover:underline flex items-center gap-1"
                            >
                              {url.replace('https://', '').slice(0, 40)}...
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-color-secondary flex items-center justify-between">
              <p className="text-sm text-secondary flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Dernière mise à jour: {competitor.lastUpdate}
              </p>
              <div className="flex gap-3">
                <button className="btn-ghost-glow flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Relancer l'analyse
                </button>
                <button className="btn-ghost-glow flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Exporter le rapport
                </button>
                <button className="btn-premium flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  Configurer les alertes
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export function WatchlistPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState<'all' | 'starred' | 'high'>('all')
  const [selectedCompetitor, setSelectedCompetitor] = useState<CompetitorAnalysis | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredCompetitors = allCompetitors.filter((c) => {
    const matchesSearch = c.competitor_name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter =
      filter === 'all' ||
      (filter === 'starred' && c.isStarred) ||
      (filter === 'high' && c.threatLevel === 'high')
    return matchesSearch && matchesFilter
  })

  const handleViewDetails = (competitor: CompetitorAnalysis) => {
    setSelectedCompetitor(competitor)
    setIsModalOpen(true)
  }

  const highThreatCount = allCompetitors.filter(c => c.threatLevel === 'high').length
  const starredCount = allCompetitors.filter(c => c.isStarred).length
  const totalAlerts = allCompetitors.reduce((sum, c) => sum + c.alerts, 0)
  const avgScore = Math.round(allCompetitors.reduce((sum, c) => sum + c.score, 0) / allCompetitors.length)

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
          <div className="w-16 h-16 rounded-2xl icon-gradient-blue flex items-center justify-center text-4xl shadow-xl shadow-blue-primary/30">
            <Eye className="w-8 h-8 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-primary">Watchlist Concurrentielle</h1>
              <span className="badge-glow-blue flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Live
              </span>
            </div>
            <p className="text-secondary">
              {allCompetitors.length} concurrents surveillés dans l'écosystème CAO/FAO
            </p>
          </div>
        </div>

        <button className="btn-premium flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Ajouter un concurrent
        </button>
      </motion.div>

      {/* Filters & Search */}
      <motion.div variants={itemVariants} className="card-glass p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" aria-hidden="true" />
            <input
              type="text"
              placeholder="Rechercher un concurrent (nTop, Altair, Siemens...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-surface-tertiary border border-color-secondary text-primary placeholder:text-secondary focus:outline-none focus:border-blue-primary focus:ring-2 focus:ring-blue-primary/20 transition-all"
              aria-label="Rechercher un concurrent"
            />
          </div>

          {/* Filter buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                filter === 'all'
                  ? 'btn-premium'
                  : 'bg-surface-tertiary border border-color-secondary text-secondary hover:bg-surface-secondary hover:border-color-primary'
              }`}
            >
              Tous ({allCompetitors.length})
            </button>
            <button
              onClick={() => setFilter('high')}
              className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
                filter === 'high'
                  ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/25'
                  : 'bg-surface-tertiary border border-color-secondary text-secondary hover:bg-surface-secondary hover:border-red-500/30'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              Menace élevée ({highThreatCount})
            </button>
            <button
              onClick={() => setFilter('starred')}
              className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
                filter === 'starred'
                  ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-500/25'
                  : 'bg-surface-tertiary border border-color-secondary text-secondary hover:bg-surface-secondary hover:border-amber-500/30'
              }`}
            >
              <Star className="w-4 h-4" />
              Favoris ({starredCount})
            </button>
            <button
              className="p-2 rounded-xl bg-surface-tertiary border border-color-secondary text-secondary hover:bg-surface-secondary hover:border-blue-primary transition-colors"
              aria-label="Filtres avancés"
            >
              <Filter className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Summary */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Concurrents surveillés', value: allCompetitors.length.toString(), change: '+2 ce mois', gradient: 'blue', icon: Eye },
          { label: 'Menaces élevées', value: highThreatCount.toString(), change: `${Math.round(highThreatCount / allCompetitors.length * 100)}% du total`, gradient: 'red', icon: AlertTriangle },
          { label: 'Alertes actives', value: totalAlerts.toString(), change: 'Dernières 24h', gradient: 'orange', icon: Bell },
          { label: 'Score moyen', value: `${avgScore}/100`, change: 'Compétitivité', gradient: 'purple', icon: BarChart3 },
        ].map((stat, index) => {
          const Icon = stat.icon
          const gradientClasses = {
            blue: 'icon-gradient-blue',
            red: 'bg-gradient-to-br from-red-500 to-rose-600 shadow-lg shadow-red-500/25',
            orange: 'icon-gradient-orange',
            purple: 'icon-gradient-purple',
          }
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className="stat-card-premium flex items-center gap-4"
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <div className={`w-12 h-12 rounded-xl ${gradientClasses[stat.gradient as keyof typeof gradientClasses]} flex items-center justify-center text-white`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-secondary">{stat.label}</p>
                <p className="font-bold text-lg gradient-text-blue">{stat.value}</p>
                <p className="text-xs text-secondary">{stat.change}</p>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Competitors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompetitors.map((competitor) => (
          <CompetitorCard
            key={competitor.competitor_name}
            competitor={competitor}
            onToggleStar={() => {}}
            onViewDetails={() => handleViewDetails(competitor)}
          />
        ))}
      </div>

      {/* Empty state */}
      {filteredCompetitors.length === 0 && (
        <motion.div
          variants={itemVariants}
          className="card-premium p-12 text-center"
        >
          <div className="relative mx-auto w-fit mb-4">
            <div className="icon-gradient-blue p-4 rounded-2xl">
              <Building2 className="w-12 h-12 text-white" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-primary mb-2">Aucun concurrent trouvé</h3>
          <p className="text-secondary mb-4">
            Modifiez vos critères de recherche ou ajoutez de nouveaux concurrents.
          </p>
          <button className="btn-premium">
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un concurrent
          </button>
        </motion.div>
      )}

      {/* Analysis Modal */}
      <AnalysisModal
        competitor={selectedCompetitor}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </motion.div>
  )
}

export default WatchlistPage
