import { motion } from 'framer-motion'
import {
  FileText,
  Download,
  Share2,
  Plus,
  Calendar,
  Eye,
  Trash2,
  MoreVertical,
  Filter,
  Search,
  BarChart3,
  PieChart,
  TrendingUp,
  Mail,
} from 'lucide-react'
import { useState } from 'react'

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

// Mock data
const reports = [
  {
    id: 1,
    title: 'Rapport mensuel - Décembre 2025',
    type: 'monthly',
    format: 'pdf',
    date: '1 janv. 2026',
    size: '2.4 MB',
    pages: 24,
    thumbnail: '📊',
  },
  {
    id: 2,
    title: 'Analyse concurrentielle Q4 2025',
    type: 'quarterly',
    format: 'pptx',
    date: '28 déc. 2025',
    size: '8.5 MB',
    pages: 45,
    thumbnail: '📈',
  },
  {
    id: 3,
    title: 'Benchmark tarifs - Secteur SaaS',
    type: 'custom',
    format: 'xlsx',
    date: '22 déc. 2025',
    size: '1.2 MB',
    pages: 12,
    thumbnail: '📋',
  },
  {
    id: 4,
    title: 'Rapport hebdomadaire - S52',
    type: 'weekly',
    format: 'pdf',
    date: '31 déc. 2025',
    size: '890 KB',
    pages: 8,
    thumbnail: '📑',
  },
  {
    id: 5,
    title: 'Synthèse annuelle 2025',
    type: 'annual',
    format: 'pdf',
    date: '30 déc. 2025',
    size: '15.8 MB',
    pages: 120,
    thumbnail: '📚',
  },
]

const templates = [
  {
    id: 1,
    name: 'Rapport mensuel',
    description: 'Vue d\'ensemble mensuelle de la veille',
    icon: <Calendar className="w-6 h-6" />,
    gradient: 'from-indigo-500 to-purple-600',
  },
  {
    id: 2,
    name: 'Analyse concurrentielle',
    description: 'Comparaison détaillée des concurrents',
    icon: <BarChart3 className="w-6 h-6" />,
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    id: 3,
    name: 'Benchmark prix',
    description: 'Analyse comparative des tarifs',
    icon: <TrendingUp className="w-6 h-6" />,
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    id: 4,
    name: 'Rapport personnalisé',
    description: 'Créez votre propre modèle',
    icon: <Plus className="w-6 h-6" />,
    gradient: 'from-amber-500 to-orange-600',
  },
]

// Report Card
interface ReportCardProps {
  report: typeof reports[0]
}

function ReportCard({ report }: ReportCardProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const typeLabels = {
    monthly: 'Mensuel',
    quarterly: 'Trimestriel',
    weekly: 'Hebdomadaire',
    annual: 'Annuel',
    custom: 'Personnalisé',
  }

  return (
    <motion.div
      variants={itemVariants}
      className="glass-card p-5 hover-lift group"
    >
      <div className="flex items-start gap-4">
        {/* Thumbnail */}
        <div className="w-16 h-20 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-3xl flex-shrink-0">
          {report.thumbnail}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
                {report.title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="badge-glass text-xs">
                  {typeLabels[report.type as keyof typeof typeLabels]}
                </span>
                <span className="text-xs text-muted-foreground uppercase font-medium">
                  {report.format}
                </span>
              </div>
            </div>

            {/* Menu */}
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-lg hover:bg-white/60 transition-colors"
              >
                <MoreVertical className="w-4 h-4 text-muted-foreground" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 glass-card p-2 shadow-xl z-10">
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-white/60">
                    <Eye className="w-4 h-4" />
                    Aperçu
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-white/60">
                    <Download className="w-4 h-4" />
                    Télécharger
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-white/60">
                    <Share2 className="w-4 h-4" />
                    Partager
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-white/60">
                    <Mail className="w-4 h-4" />
                    Envoyer par email
                  </button>
                  <hr className="my-1 border-border" />
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-red-50 text-red-600">
                    <Trash2 className="w-4 h-4" />
                    Supprimer
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {report.date}
            </span>
            <span>{report.size}</span>
            <span>{report.pages} pages</span>
          </div>

          {/* Actions */}
          <div className="flex gap-2 mt-4">
            <button className="flex-1 btn-glass text-sm flex items-center justify-center gap-2">
              <Eye className="w-4 h-4" />
              Voir
            </button>
            <button className="flex-1 btn-glass text-sm flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Télécharger
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function ReportsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'templates'>('all')

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-8 space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Rapports</h1>
          <p className="text-muted-foreground">
            Générez et consultez vos rapports de veille
          </p>
        </div>

        <button className="btn-gradient flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Nouveau rapport
        </button>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={itemVariants} className="glass-card p-2">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
              activeTab === 'all'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                : 'hover:bg-white/60'
            }`}
          >
            <FileText className="w-4 h-4" />
            Tous les rapports ({reports.length})
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
              activeTab === 'templates'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                : 'hover:bg-white/60'
            }`}
          >
            <PieChart className="w-4 h-4" />
            Modèles
          </button>
        </div>
      </motion.div>

      {/* All Reports */}
      {activeTab === 'all' && (
        <motion.div variants={itemVariants} className="space-y-4">
          {/* Search & Filter */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher un rapport..."
                className="input-glass pl-12"
              />
            </div>
            <button className="btn-glass flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filtrer
            </button>
          </div>

          {/* Reports Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {reports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </motion.div>
      )}

      {/* Templates */}
      {activeTab === 'templates' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {templates.map((template) => (
              <motion.div
                key={template.id}
                variants={itemVariants}
                className="glass-card p-6 hover-lift cursor-pointer text-center group"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${template.gradient} flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  {template.icon}
                </div>
                <h3 className="font-semibold mb-1">{template.name}</h3>
                <p className="text-sm text-muted-foreground">{template.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Scheduled Reports */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-lg">Rapports planifiés</h3>
                <p className="text-sm text-muted-foreground">
                  Rapports générés automatiquement
                </p>
              </div>
              <button className="btn-glass text-sm">
                Configurer
              </button>
            </div>

            <div className="space-y-3">
              {[
                { name: 'Rapport hebdomadaire', freq: 'Chaque lundi à 9h', active: true },
                { name: 'Synthèse mensuelle', freq: 'Le 1er de chaque mois', active: true },
                { name: 'Alerte concurrentielle', freq: 'Quotidien à 8h', active: false },
              ].map((scheduled, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl glass-card-light"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${scheduled.active ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                    <div>
                      <h4 className="font-medium">{scheduled.name}</h4>
                      <p className="text-sm text-muted-foreground">{scheduled.freq}</p>
                    </div>
                  </div>
                  <button className="text-sm text-primary hover:underline">
                    Modifier
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default ReportsPage
