import { motion, AnimatePresence } from 'framer-motion'
import {
  Building2,
  Users,
  Globe,
  Target,
  TrendingUp,
  Award,
  MapPin,
  Calendar,
  Edit3,
  Plus,
  ExternalLink,
  Cpu,
  Layers,
  Zap,
  Sparkles,
  Factory,
  Clock,
  DollarSign,
  Scale,
  CheckCircle2,
  Star,
  X,
  Save,
} from 'lucide-react'
import { useState } from 'react'
import { companyInfo, targetIndustries, features, kpiMetrics, personas } from '../data/clientData'

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
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

// Premium Info Card
interface InfoCardProps {
  icon: React.ReactNode
  label: string
  value: string
  gradient: 'blue' | 'green' | 'purple' | 'orange'
}

function InfoCard({ icon, label, value, gradient }: InfoCardProps) {
  const gradientClasses = {
    blue: 'icon-gradient-blue',
    green: 'icon-gradient-green',
    purple: 'icon-gradient-purple',
    orange: 'icon-gradient-orange',
  }

  return (
    <motion.div
      variants={itemVariants}
      className="card-glass p-5"
      whileHover={{ y: -4, scale: 1.02 }}
    >
      <div className="flex items-center gap-4">
        <div className={`${gradientClasses[gradient]} p-3 rounded-xl`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-muted">{label}</p>
          <p className="font-semibold text-primary">{value}</p>
        </div>
      </div>
    </motion.div>
  )
}

// Premium KPI Card
interface KPICardProps {
  icon: React.ReactNode
  label: string
  value: string
  description: string
  details: string[]
  gradient: 'blue' | 'green' | 'purple' | 'orange'
}

function KPICard({ icon, label, value, description, details, gradient }: KPICardProps) {
  const gradientClasses = {
    blue: 'icon-gradient-blue',
    green: 'icon-gradient-green',
    purple: 'icon-gradient-purple',
    orange: 'icon-gradient-orange',
  }

  return (
    <motion.div
      variants={itemVariants}
      className="stat-card-premium group"
      whileHover={{ y: -4 }}
    >
      <div className="flex items-start gap-4">
        <div className={`${gradientClasses[gradient]} p-3 rounded-xl shrink-0`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-muted">{label}</p>
          <p className="text-2xl font-bold gradient-text-blue">{value}</p>
          <p className="text-xs text-muted mt-1">{description}</p>

          {/* Hover details */}
          <div className="mt-3 space-y-1 opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-32 transition-all duration-300">
            {details.map((detail, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-secondary">
                <CheckCircle2 className="w-3 h-3 text-success shrink-0" />
                <span>{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Premium Feature Item
interface FeatureItemProps {
  name: string
  category: string
  description: string
  value: string
  icon: string
  differentiator: boolean
}

function FeatureItem({ name, description, value, icon, differentiator }: FeatureItemProps) {
  return (
    <motion.div
      variants={itemVariants}
      className="card-glass p-4 group cursor-pointer"
      whileHover={{ y: -2, scale: 1.01 }}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-primary group-hover:text-blue-primary transition-colors">{name}</h4>
            {differentiator && (
              <span className="badge-glow-blue text-xs">Différenciateur</span>
            )}
          </div>
          <p className="text-xs text-muted mt-1">{description}</p>
          <p className="text-xs text-success mt-2 flex items-center gap-1">
            <Zap className="w-3 h-3" />
            {value}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// Premium Industry Card
interface IndustryCardProps {
  name: string
  priority: string
  icon: string
  subsegments: string[]
  profiles: string
  partTypes: string
  challenges: string
}

function IndustryCard({ name, priority, icon, subsegments, profiles, partTypes, challenges }: IndustryCardProps) {
  const priorityConfig: Record<string, { badge: string; ring: string }> = {
    'Tier 1': { badge: 'badge-glow-green', ring: 'ring-2 ring-success/30' },
    'NewSpace Start-ups': { badge: 'badge-glow-blue', ring: 'ring-2 ring-blue-primary/30' },
  }

  const config = priorityConfig[priority] || { badge: 'badge-glow-purple', ring: 'ring-1 ring-white/10' }

  return (
    <motion.div
      variants={itemVariants}
      className={`card-premium p-5 ${config.ring}`}
      whileHover={{ y: -4 }}
    >
      <div className="flex items-start gap-4">
        <span className="text-4xl">{icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="font-semibold text-primary">{name}</h3>
            <span className={config.badge}>
              {priority}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {subsegments.map((seg, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded-full text-xs bg-white/10 dark:bg-white/10 text-secondary border border-white/10">
                {seg}
              </span>
            ))}
          </div>

          <div className="space-y-2 text-xs text-muted">
            <p><span className="font-medium text-secondary">Profils:</span> {profiles}</p>
            <p><span className="font-medium text-secondary">Types de pièces:</span> {partTypes}</p>
            <p><span className="font-medium text-secondary">Défis:</span> {challenges}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Premium Persona Card
interface PersonaCardProps {
  title: string
  seniority: string
  goals: string
  painPoints: string
  kpis: string[]
  icon: string
}

function PersonaCard({ title, seniority, goals, painPoints, kpis, icon }: PersonaCardProps) {
  const seniorityConfig: Record<string, string> = {
    'Individual Contributor': 'badge-glow-blue',
    'Manager': 'badge-glow-orange',
    'Executive': 'badge-glow-green',
  }

  return (
    <motion.div
      variants={itemVariants}
      className="card-glass p-5"
      whileHover={{ y: -4 }}
    >
      <div className="flex items-start gap-4">
        <span className="text-4xl">{icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="font-semibold text-sm text-primary">{title}</h3>
            <span className={seniorityConfig[seniority] || 'badge-glow-purple'}>
              {seniority}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-2 rounded-lg bg-success/10 border border-success/20">
              <span className="font-medium text-success">Objectifs:</span>
              <p className="text-muted mt-0.5">{goals}</p>
            </div>
            <div className="p-2 rounded-lg bg-error/10 border border-error/20">
              <span className="font-medium text-error">Pain Points:</span>
              <p className="text-muted mt-0.5">{painPoints}</p>
            </div>
            <div>
              <span className="font-medium text-secondary">KPIs:</span>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {kpis.map((kpi, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-full text-xs bg-blue-primary/20 text-blue-primary border border-blue-primary/30">
                    {kpi}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Edit Profile Modal
const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
}

interface EditProfileModalProps {
  isOpen: boolean
  onClose: () => void
}

function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
  const [formData, setFormData] = useState({
    name: companyInfo.name,
    brandName: companyInfo.brandName,
    tagline: companyInfo.tagline,
    description: companyInfo.description,
    website: companyInfo.website,
    headquarters: companyInfo.headquarters,
    founded: companyInfo.founded.toString(),
    productName: companyInfo.productName,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Saving company profile:', formData)
    onClose()
  }

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
            className="modal-backdrop"
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="modal"
          >
            {/* Modal Header */}
            <div className="modal-header">
              <div className="flex items-center gap-3">
                <div className="icon-gradient-blue p-2 rounded-xl">
                  <Edit3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-primary">Modifier le profil</h2>
                  <p className="text-sm text-muted">Mettez à jour les informations de votre entreprise</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-hover transition-colors text-muted hover:text-primary"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleSubmit} className="modal-body">
              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2 text-primary">
                  <Building2 className="w-4 h-4 text-blue-primary" />
                  Informations générales
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-secondary">Nom de l'entreprise</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input"
                      placeholder="Cognitive Design Systems"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-secondary">Nom de marque</label>
                    <input
                      type="text"
                      value={formData.brandName}
                      onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                      className="input"
                      placeholder="Cognitive Design by CDS"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-secondary">Nom du produit</label>
                    <input
                      type="text"
                      value={formData.productName}
                      onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                      className="input"
                      placeholder="Cognitive Design"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-secondary">Site web</label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="input"
                      placeholder="https://cognitive-design-systems.com"
                    />
                  </div>
                </div>
              </div>

              {/* Location & History */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2 text-primary">
                  <MapPin className="w-4 h-4 text-success" />
                  Localisation & Historique
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-secondary">Siège social</label>
                    <input
                      type="text"
                      value={formData.headquarters}
                      onChange={(e) => setFormData({ ...formData, headquarters: e.target.value })}
                      className="input"
                      placeholder="France"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-secondary">Année de création</label>
                    <input
                      type="number"
                      value={formData.founded}
                      onChange={(e) => setFormData({ ...formData, founded: e.target.value })}
                      className="input"
                      placeholder="2020"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2 text-primary">
                  <Sparkles className="w-4 h-4 text-blue-secondary" />
                  Présentation
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-secondary">Tagline</label>
                    <input
                      type="text"
                      value={formData.tagline}
                      onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                      className="input"
                      placeholder="AI-enabled part concept engineering platform"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-secondary">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="input min-h-[100px] resize-none"
                      placeholder="Description détaillée de votre entreprise..."
                      rows={4}
                    />
                  </div>
                </div>
              </div>

              {/* Industries Preview */}
              <div className="card-glass p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2 text-primary">
                  <Factory className="w-4 h-4 text-blue-primary" />
                  Industries cibles
                </h3>
                <div className="flex flex-wrap gap-2">
                  {targetIndustries.map((industry, idx) => (
                    <span key={idx} className="badge-glow-blue flex items-center gap-1">
                      <span>{industry.icon}</span>
                      {industry.name}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-muted mt-2">
                  Pour modifier les industries, utilisez la section dédiée ci-dessous.
                </p>
              </div>
            </form>

            {/* Modal Footer */}
            <div className="modal-footer">
              <button
                type="button"
                onClick={onClose}
                className="btn-ghost-glow"
              >
                Annuler
              </button>
              <button
                onClick={handleSubmit}
                className="btn-premium flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Enregistrer les modifications
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export function MyCompanyPage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  // Group features by category
  const featuresByCategory = features.reduce((acc, feature) => {
    if (!acc[feature.category]) {
      acc[feature.category] = []
    }
    acc[feature.category].push(feature)
    return acc
  }, {} as Record<string, typeof features>)

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="page-container space-y-8"
    >
      {/* Premium Company Header */}
      <motion.div variants={itemVariants} className="hero-premium">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Company Logo */}
          <div className="w-20 h-20 rounded-2xl icon-gradient-blue flex items-center justify-center text-white text-4xl shadow-xl shadow-blue-primary/30">
            {companyInfo.logo}
          </div>

          {/* Company Info */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold text-primary">{companyInfo.name}</h1>
              <span className="badge-glow-blue flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Design Partner
              </span>
            </div>
            <p className="text-lg font-medium gradient-text-blue">{companyInfo.brandName}</p>
            <p className="text-secondary max-w-2xl">
              {companyInfo.tagline}. {companyInfo.description}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1 rounded-full text-xs bg-white/10 dark:bg-white/10 border border-white/20 text-secondary flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                {companyInfo.headquarters}
              </span>
              <span className="px-3 py-1 rounded-full text-xs bg-white/10 dark:bg-white/10 border border-white/20 text-secondary flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                Fondée en {companyInfo.founded}
              </span>
              <span className="px-3 py-1 rounded-full text-xs bg-white/10 dark:bg-white/10 border border-white/20 text-secondary flex items-center">
                <Layers className="w-3 h-3 mr-1" />
                {companyInfo.deploymentOptions.join(' / ')}
              </span>
              <a
                href={companyInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-full text-xs bg-blue-primary/20 border border-blue-primary/30 text-blue-primary flex items-center hover:bg-blue-primary/30 transition-all"
              >
                <Globe className="w-3 h-3 mr-1" />
                Site web
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>

          {/* Edit Button */}
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="btn-premium flex items-center gap-2"
          >
            <Edit3 className="w-4 h-4" />
            Modifier le profil
          </button>
        </div>
      </motion.div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />

      {/* KPI Metrics Grid */}
      <div className="space-y-4">
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <div className="icon-gradient-orange p-2 rounded-xl">
            <Star className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-primary">Métriques de Performance</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <KPICard
            icon={<Clock className="w-5 h-5 text-white" />}
            label={kpiMetrics.timeSavings.label}
            value={kpiMetrics.timeSavings.value}
            description={kpiMetrics.timeSavings.description}
            details={kpiMetrics.timeSavings.details}
            gradient="blue"
          />
          <KPICard
            icon={<DollarSign className="w-5 h-5 text-white" />}
            label={kpiMetrics.costSavings.label}
            value={kpiMetrics.costSavings.value}
            description={kpiMetrics.costSavings.description}
            details={kpiMetrics.costSavings.details}
            gradient="green"
          />
          <KPICard
            icon={<TrendingUp className="w-5 h-5 text-white" />}
            label={kpiMetrics.productivityGain.label}
            value={kpiMetrics.productivityGain.value}
            description={kpiMetrics.productivityGain.description}
            details={kpiMetrics.productivityGain.details}
            gradient="purple"
          />
          <KPICard
            icon={<Scale className="w-5 h-5 text-white" />}
            label={kpiMetrics.weightReduction.label}
            value={kpiMetrics.weightReduction.value}
            description={kpiMetrics.weightReduction.description}
            details={kpiMetrics.weightReduction.details}
            gradient="orange"
          />
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <InfoCard
          icon={<Building2 className="w-5 h-5 text-white" />}
          label="Catégorie"
          value={companyInfo.category.split(' ').slice(0, 3).join(' ')}
          gradient="blue"
        />
        <InfoCard
          icon={<Target className="w-5 h-5 text-white" />}
          label="Produit Principal"
          value={companyInfo.productName}
          gradient="purple"
        />
        <InfoCard
          icon={<Users className="w-5 h-5 text-white" />}
          label="Industries cibles"
          value={`${targetIndustries.length} secteurs`}
          gradient="green"
        />
        <InfoCard
          icon={<Award className="w-5 h-5 text-white" />}
          label="Fonctionnalités"
          value={`${features.length} capacités`}
          gradient="orange"
        />
      </div>

      {/* Target Industries */}
      <div className="space-y-4">
        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="icon-gradient-blue p-2 rounded-xl">
              <Factory className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-primary">Industries Cibles</h2>
          </div>
          <button className="btn-ghost-glow flex items-center gap-1 text-sm">
            <Plus className="w-4 h-4" />
            Ajouter
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {targetIndustries.map((industry, idx) => (
            <IndustryCard
              key={idx}
              name={industry.name}
              priority={industry.priority}
              icon={industry.icon}
              subsegments={industry.subsegments}
              profiles={industry.profiles}
              partTypes={industry.partTypes}
              challenges={industry.challenges}
            />
          ))}
        </div>
      </div>

      {/* Features & Capabilities */}
      <div className="space-y-4">
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <div className="icon-gradient-purple p-2 rounded-xl">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-primary">Fonctionnalités & Capacités</h2>
        </motion.div>

        <div className="space-y-6">
          {Object.entries(featuresByCategory).map(([category, categoryFeatures]) => (
            <motion.div key={category} variants={itemVariants} className="space-y-3">
              <h3 className="font-medium text-secondary flex items-center gap-2">
                {category === 'Generative Design' && <Cpu className="w-4 h-4 text-blue-primary" />}
                {category === 'Manufacturing-driven Design' && <Factory className="w-4 h-4 text-blue-secondary" />}
                {category === 'Design Exploration' && <Layers className="w-4 h-4 text-success" />}
                {category === 'Analysis' && <TrendingUp className="w-4 h-4 text-warning" />}
                {category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryFeatures.map((feature, idx) => (
                  <FeatureItem
                    key={idx}
                    name={feature.name}
                    category={feature.category}
                    description={feature.description}
                    value={feature.value}
                    icon={feature.icon}
                    differentiator={feature.differentiator}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Buyer Personas */}
      <div className="space-y-4">
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <div className="icon-gradient-green p-2 rounded-xl">
            <Users className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-primary">Personas Cibles</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {personas.map((persona, idx) => (
            <PersonaCard
              key={idx}
              title={persona.title}
              seniority={persona.seniority}
              goals={persona.goals}
              painPoints={persona.painPoints}
              kpis={persona.kpis}
              icon={persona.icon}
            />
          ))}
        </div>
      </div>

      {/* Technology Architecture Summary */}
      <motion.div variants={itemVariants} className="card-premium p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="icon-gradient-blue p-2 rounded-xl">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-primary">Architecture Technologique</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            className="card-glass p-4"
            whileHover={{ y: -2 }}
          >
            <h4 className="font-medium text-sm mb-2 text-primary">Moteur Géométrique</h4>
            <p className="text-xs text-muted">Géométrie implicite permettant itération rapide et exploration exhaustive</p>
          </motion.div>
          <motion.div
            className="card-glass p-4"
            whileHover={{ y: -2 }}
          >
            <h4 className="font-medium text-sm mb-2 text-primary">Workflows Paramétriques</h4>
            <p className="text-xs text-muted">Workflows réutilisables et paramétrables pour capitalisation</p>
          </motion.div>
          <motion.div
            className="card-glass p-4"
            whileHover={{ y: -2 }}
          >
            <h4 className="font-medium text-sm mb-2 text-primary">Design Explorer</h4>
            <p className="text-xs text-muted">Interface d'exploration avec traçabilité et comparaison des itérations</p>
          </motion.div>
          <motion.div
            className="card-glass p-4"
            whileHover={{ y: -2 }}
          >
            <h4 className="font-medium text-sm mb-2 text-primary">Déploiement On-Prem</h4>
            <p className="text-xs text-muted">Installation sur serveurs dédiés, souveraineté des données</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default MyCompanyPage
