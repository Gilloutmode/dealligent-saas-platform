import { motion } from 'framer-motion'
import {
  Database,
  Upload,
  FileText,
  Folder,
  Search,
  Plus,
  Trash2,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  HardDrive,
  Cpu,
  Zap,
  Settings,
  Eye,
  MoreVertical,
  Building2,
  Users,
  Target,
  Factory,
  BookOpen,
  Brain,
  Sparkles,
} from 'lucide-react'
import { useState } from 'react'
import { companyInfo, targetIndustries, personas, competitors } from '../data/clientData'

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

// CDS-specific documents
const documents = [
  {
    id: 1,
    name: 'CDS_Company_Profile.pdf',
    type: 'pdf',
    size: '1.2 MB',
    status: 'indexed',
    date: '3 janv. 2026',
    chunks: 85,
    category: 'company',
  },
  {
    id: 2,
    name: 'Target_Industries_Analysis.csv',
    type: 'csv',
    size: '245 KB',
    status: 'indexed',
    date: '3 janv. 2026',
    chunks: 42,
    category: 'industries',
  },
  {
    id: 3,
    name: 'Competitors_Database.csv',
    type: 'csv',
    size: '380 KB',
    status: 'indexed',
    date: '2 janv. 2026',
    chunks: 156,
    category: 'competitors',
  },
  {
    id: 4,
    name: 'Buyer_Personas.csv',
    type: 'csv',
    size: '120 KB',
    status: 'indexed',
    date: '2 janv. 2026',
    chunks: 28,
    category: 'personas',
  },
  {
    id: 5,
    name: 'Customer_Database.csv',
    type: 'csv',
    size: '890 KB',
    status: 'indexed',
    date: '1 janv. 2026',
    chunks: 312,
    category: 'customers',
  },
  {
    id: 6,
    name: 'Features_Capabilities.json',
    type: 'json',
    size: '78 KB',
    status: 'indexed',
    date: '31 déc. 2025',
    chunks: 95,
    category: 'features',
  },
  {
    id: 7,
    name: 'nTop_Competitive_Analysis_2026.pdf',
    type: 'pdf',
    size: '2.8 MB',
    status: 'processing',
    date: '4 janv. 2026',
    progress: 73,
    category: 'competitors',
  },
  {
    id: 8,
    name: 'Aerospace_Industry_Deep_Dive.docx',
    type: 'docx',
    size: '4.2 MB',
    status: 'indexed',
    date: '28 déc. 2025',
    chunks: 234,
    category: 'industries',
  },
  {
    id: 9,
    name: 'Market_Intelligence_Reports.zip',
    type: 'zip',
    size: '15.6 MB',
    status: 'error',
    date: '20 déc. 2025',
    error: 'Fichier corrompu - réimportation nécessaire',
    category: 'reports',
  },
]

// CDS-specific collections
const collections = [
  {
    id: 1,
    name: 'Profil Entreprise CDS',
    docs: 6,
    size: '2.4 MB',
    icon: Building2,
    description: 'Données entreprise, KPIs, mission & valeurs',
    gradient: 'icon-gradient-purple',
  },
  {
    id: 2,
    name: 'Base Concurrents',
    docs: competitors.length + 5,
    size: '8.2 MB',
    icon: Target,
    description: '9 concurrents analysés avec forces/faiblesses',
    gradient: 'icon-gradient-orange',
  },
  {
    id: 3,
    name: 'Industries Cibles',
    docs: targetIndustries.length + 3,
    size: '5.1 MB',
    icon: Factory,
    description: 'Aerospace, Defense, Automotive, Industrial',
    gradient: 'icon-gradient-blue',
  },
  {
    id: 4,
    name: 'Buyer Personas',
    docs: personas.length + 2,
    size: '1.8 MB',
    icon: Users,
    description: 'Profils acheteurs et parcours décisionnels',
    gradient: 'icon-gradient-green',
  },
  {
    id: 5,
    name: 'Base Clients',
    docs: 108,
    size: '12.5 MB',
    icon: BookOpen,
    description: 'Historique clients, deals, use cases',
    gradient: 'icon-gradient-orange',
  },
]

// Document type gradients
const typeGradients: Record<string, string> = {
  pdf: 'icon-gradient-orange',
  csv: 'icon-gradient-green',
  docx: 'icon-gradient-blue',
  json: 'icon-gradient-purple',
  zip: 'icon-gradient-blue',
}

// Document Card
interface DocumentCardProps {
  doc: typeof documents[0]
}

function DocumentCard({ doc }: DocumentCardProps) {
  const statusConfig = {
    indexed: { badge: 'badge-glow-green', label: 'Indexé', icon: CheckCircle2 },
    processing: { badge: 'badge-glow-blue', label: 'En cours', icon: RefreshCw },
    error: { badge: 'badge-glow-red', label: 'Erreur', icon: AlertCircle },
  }

  const status = statusConfig[doc.status as keyof typeof statusConfig]
  const StatusIcon = status.icon
  const typeGradient = typeGradients[doc.type] || 'icon-gradient-blue'

  return (
    <motion.div
      variants={itemVariants}
      className="card-premium p-4 flex items-center gap-4 cursor-pointer group"
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className={`w-12 h-12 rounded-xl ${typeGradient} flex items-center justify-center transition-transform group-hover:scale-110`}>
        <FileText className="w-5 h-5 text-white" />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-medium truncate text-primary group-hover:text-blue-primary transition-colors">{doc.name}</h4>
        <div className="flex items-center gap-3 text-sm text-muted">
          <span>{doc.size}</span>
          <span>•</span>
          <span>{doc.date}</span>
          {'chunks' in doc && doc.chunks && (
            <>
              <span>•</span>
              <span className="text-info">{doc.chunks} chunks</span>
            </>
          )}
        </div>
        {'progress' in doc && doc.progress && (
          <div className="mt-2">
            <div className="h-1.5 rounded-full bg-surface overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${doc.progress}%` }}
                className="h-full rounded-full bg-gradient-to-r from-blue-primary to-info"
              />
            </div>
          </div>
        )}
        {'error' in doc && doc.error && (
          <p className="mt-1 text-xs text-error">{doc.error}</p>
        )}
      </div>

      <span className={`${status.badge} flex items-center gap-1.5`}>
        <StatusIcon className={`w-3.5 h-3.5 ${doc.status === 'processing' ? 'animate-spin' : ''}`} />
        {status.label}
      </span>

      <button className="p-2 rounded-lg hover:bg-hover transition-colors text-muted hover:text-primary">
        <MoreVertical className="w-4 h-4" />
      </button>
    </motion.div>
  )
}

export function RAGManagementPage() {
  const [activeTab, setActiveTab] = useState<'documents' | 'collections' | 'settings'>('documents')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Calculate stats
  const totalChunks = documents.reduce((acc, doc) => acc + (doc.chunks || 0), 0)
  const totalSize = documents.reduce((acc, doc) => {
    const size = parseFloat(doc.size)
    const unit = doc.size.includes('MB') ? 1024 : 1
    return acc + (size * unit)
  }, 0)
  const indexedDocs = documents.filter(d => d.status === 'indexed').length

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
            <div className="w-16 h-16 rounded-2xl icon-gradient-purple flex items-center justify-center">
              <Database className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="page-title">RAG Management</h1>
                <span className="badge-glow-purple flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Knowledge Base
                </span>
              </div>
              <p className="text-sm text-info">{companyInfo.name}</p>
              <p className="text-muted text-sm">
                Gérez la base de connaissances pour le Market Intelligence Agent
              </p>
            </div>
          </div>

          <button className="btn-premium flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Importer des documents
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
            <div className="w-12 h-12 rounded-xl icon-gradient-purple flex items-center justify-center">
              <Database className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">{documents.length}</p>
              <p className="text-sm text-muted">Documents</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="stat-card-premium"
          whileHover={{ y: -4, scale: 1.02 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl icon-gradient-blue flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold gradient-text-blue">{totalChunks.toLocaleString()}</p>
              <p className="text-sm text-muted">Chunks vectorisés</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="stat-card-premium"
          whileHover={{ y: -4, scale: 1.02 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl icon-gradient-green flex items-center justify-center">
              <HardDrive className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-success">{(totalSize / 1024).toFixed(1)} MB</p>
              <p className="text-sm text-muted">Stockage utilisé</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="stat-card-premium"
          whileHover={{ y: -4, scale: 1.02 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl icon-gradient-orange flex items-center justify-center">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-warning">{Math.round((indexedDocs / documents.length) * 100)}%</p>
              <p className="text-sm text-muted">Santé index</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Workflow Integration Banner */}
      <motion.div
        variants={itemVariants}
        className="card-premium p-5 bg-gradient-to-r from-purple-primary/10 via-blue-primary/10 to-info/10"
        whileHover={{ y: -2 }}
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl icon-gradient-purple flex items-center justify-center">
            <Brain className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-primary">Intégration n8n CDS-RAG PROD V11.2</h3>
            <p className="text-sm text-muted">
              Cette base de connaissances est automatiquement interrogée par le Market Intelligence Agent lors des analyses.
            </p>
          </div>
          <span className="badge-glow-green flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            Connecté
          </span>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={itemVariants} className="card-glass p-2">
        <div className="flex gap-2">
          {[
            { key: 'documents', label: 'Documents', icon: <FileText className="w-4 h-4" /> },
            { key: 'collections', label: 'Collections', icon: <Folder className="w-4 h-4" /> },
            { key: 'settings', label: 'Configuration', icon: <Settings className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                activeTab === tab.key
                  ? 'btn-premium'
                  : 'text-muted hover:text-primary hover:bg-hover'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Documents Tab */}
      {activeTab === 'documents' && (
        <motion.div variants={itemVariants} className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="text"
              placeholder="Rechercher un document..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-xl bg-surface border border-border text-primary placeholder:text-muted focus:outline-none focus:border-blue-primary/50 focus:ring-2 focus:ring-blue-primary/20 transition-all"
            />
          </div>

          {/* Document List */}
          <div className="space-y-3">
            {filteredDocuments.map((doc) => (
              <DocumentCard key={doc.id} doc={doc} />
            ))}
          </div>

          {filteredDocuments.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-2xl icon-gradient-blue flex items-center justify-center mx-auto mb-4 opacity-50">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <p className="text-muted">Aucun document trouvé</p>
            </div>
          )}

          {/* Drop zone */}
          <motion.div
            className="border-2 border-dashed border-border rounded-2xl p-12 text-center hover:border-blue-primary/50 hover:bg-blue-primary/5 transition-all cursor-pointer group"
            whileHover={{ scale: 1.01 }}
          >
            <div className="w-16 h-16 rounded-2xl icon-gradient-blue flex items-center justify-center mx-auto mb-4 opacity-50 group-hover:opacity-100 transition-opacity">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-primary mb-2">Déposez vos fichiers ici</h3>
            <p className="text-sm text-muted">
              Formats supportés: PDF, DOCX, XLSX, CSV, JSON, MD, TXT
            </p>
          </motion.div>
        </motion.div>
      )}

      {/* Collections Tab */}
      {activeTab === 'collections' && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex justify-end">
            <button className="btn-ghost-glow flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Nouvelle collection
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {collections.map((collection) => {
              const Icon = collection.icon
              return (
                <motion.div
                  key={collection.id}
                  variants={itemVariants}
                  className="card-premium p-6 cursor-pointer group"
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-xl ${collection.gradient} flex items-center justify-center transition-transform group-hover:scale-110`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-primary group-hover:text-blue-primary transition-colors">{collection.name}</h3>
                      <p className="text-sm text-muted">
                        {collection.docs} documents • {collection.size}
                      </p>
                      <p className="text-xs text-muted mt-1">{collection.description}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 btn-ghost-glow flex items-center justify-center gap-2 text-sm">
                      <Eye className="w-4 h-4" />
                      Explorer
                    </button>
                    <button className="p-2 rounded-xl border border-border hover:bg-hover hover:border-blue-primary/30 transition-all text-muted hover:text-info">
                      <RefreshCw className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-xl border border-border hover:bg-error/10 hover:border-error/30 hover:text-error transition-all text-muted">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <motion.div variants={itemVariants} className="space-y-6">
          <motion.div
            className="card-premium p-6 space-y-6"
            whileHover={{ y: -2 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl icon-gradient-blue flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-lg text-primary">Configuration de l'indexation</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary">Taille des chunks</label>
                <input
                  type="number"
                  defaultValue={512}
                  className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-primary focus:outline-none focus:border-blue-primary/50 focus:ring-2 focus:ring-blue-primary/20 transition-all"
                />
                <p className="text-xs text-muted">
                  Nombre de tokens par chunk (recommandé: 512)
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary">Overlap</label>
                <input
                  type="number"
                  defaultValue={50}
                  className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-primary focus:outline-none focus:border-blue-primary/50 focus:ring-2 focus:ring-blue-primary/20 transition-all"
                />
                <p className="text-xs text-muted">
                  Chevauchement entre les chunks (recommandé: 50)
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary">Modèle d'embedding</label>
                <select className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-primary focus:outline-none focus:border-blue-primary/50 focus:ring-2 focus:ring-blue-primary/20 transition-all">
                  <option>text-embedding-3-small</option>
                  <option>text-embedding-3-large</option>
                  <option>text-embedding-ada-002</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary">Base vectorielle</label>
                <select className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-primary focus:outline-none focus:border-blue-primary/50 focus:ring-2 focus:ring-blue-primary/20 transition-all">
                  <option>Pinecone</option>
                  <option>Qdrant</option>
                  <option>Weaviate</option>
                  <option>ChromaDB</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button className="btn-ghost-glow">Réinitialiser</button>
              <button className="btn-premium">Sauvegarder</button>
            </div>
          </motion.div>

          <motion.div
            className="card-premium p-6 space-y-4"
            whileHover={{ y: -2 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl icon-gradient-orange flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-lg text-primary">Actions de maintenance</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.button
                className="card-premium p-4 text-left group"
                whileHover={{ y: -2, scale: 1.02 }}
              >
                <div className="w-10 h-10 rounded-xl icon-gradient-blue flex items-center justify-center mb-3">
                  <RefreshCw className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-medium text-primary group-hover:text-blue-primary transition-colors">Réindexer tout</h4>
                <p className="text-sm text-muted">Reconstruit l'index complet</p>
              </motion.button>

              <motion.button
                className="card-premium p-4 text-left group"
                whileHover={{ y: -2, scale: 1.02 }}
              >
                <div className="w-10 h-10 rounded-xl icon-gradient-green flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-medium text-primary group-hover:text-success transition-colors">Vérifier l'intégrité</h4>
                <p className="text-sm text-muted">Vérifie la cohérence des données</p>
              </motion.button>

              <motion.button
                className="card-premium p-4 text-left group"
                whileHover={{ y: -2, scale: 1.02 }}
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-error to-red-600 flex items-center justify-center mb-3">
                  <Trash2 className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-medium text-primary group-hover:text-error transition-colors">Purger le cache</h4>
                <p className="text-sm text-muted">Supprime les données temporaires</p>
              </motion.button>
            </div>
          </motion.div>

          {/* n8n Workflow Connection */}
          <motion.div
            className="card-premium p-6 space-y-4"
            whileHover={{ y: -2 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl icon-gradient-purple flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-lg text-primary">Connexion Workflow n8n</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary">Workflow ID</label>
                <input
                  type="text"
                  defaultValue="4Et9q6TqStB6xeiY"
                  className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-muted font-mono text-sm"
                  readOnly
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary">Version</label>
                <input
                  type="text"
                  defaultValue="CDS-RAG PROD V11.2"
                  className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-muted"
                  readOnly
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-success/10 border border-success/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl icon-gradient-green flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-success">Connexion active</p>
                  <p className="text-sm text-success/70">
                    Dernière synchronisation: il y a 5 minutes
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default RAGManagementPage
