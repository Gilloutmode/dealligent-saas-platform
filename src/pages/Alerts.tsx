import { motion } from 'framer-motion'
import {
  Bell,
  BellOff,
  Plus,
  Settings,
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCircle2,
  Clock,
  Search,
  ChevronRight,
  Mail,
  Smartphone,
  MessageSquare,
  Building2,
  TrendingUp,
  DollarSign,
  Users,
  Newspaper,
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
const alerts = [
  {
    id: 1,
    type: 'critical',
    title: 'Baisse de prix significative détectée',
    description: 'TechCorp a réduit ses prix de 25% sur sa gamme enterprise',
    competitor: 'TechCorp Industries',
    time: 'Il y a 15 min',
    read: false,
  },
  {
    id: 2,
    type: 'warning',
    title: 'Nouveau produit lancé',
    description: 'InnovateTech annonce une nouvelle solution IA concurrente',
    competitor: 'InnovateTech',
    time: 'Il y a 2 heures',
    read: false,
  },
  {
    id: 3,
    type: 'info',
    title: 'Mise à jour site web',
    description: 'Digital Solutions a refait entièrement son site web',
    competitor: 'Digital Solutions',
    time: 'Il y a 5 heures',
    read: true,
  },
  {
    id: 4,
    type: 'success',
    title: 'Analyse terminée',
    description: 'Votre analyse hebdomadaire est prête à consulter',
    competitor: null,
    time: 'Il y a 1 jour',
    read: true,
  },
  {
    id: 5,
    type: 'warning',
    title: 'Recrutement massif détecté',
    description: 'NextGen Systems recrute 50+ ingénieurs IA',
    competitor: 'NextGen Systems',
    time: 'Il y a 2 jours',
    read: true,
  },
]

const alertRules = [
  {
    id: 1,
    name: 'Changement de prix',
    description: 'Alerte si un concurrent modifie ses prix',
    icon: <DollarSign className="w-5 h-5" />,
    enabled: true,
    channels: ['email', 'push'],
  },
  {
    id: 2,
    name: 'Nouveau produit',
    description: 'Alerte sur les lancements de produits',
    icon: <TrendingUp className="w-5 h-5" />,
    enabled: true,
    channels: ['email'],
  },
  {
    id: 3,
    name: 'Actualités presse',
    description: 'Alerte sur les articles de presse',
    icon: <Newspaper className="w-5 h-5" />,
    enabled: true,
    channels: ['email', 'push', 'slack'],
  },
  {
    id: 4,
    name: 'Recrutement',
    description: 'Alerte sur les offres d\'emploi',
    icon: <Users className="w-5 h-5" />,
    enabled: false,
    channels: ['email'],
  },
]

// Alert Card
interface AlertCardProps {
  alert: typeof alerts[0]
  onMarkRead: () => void
}

function AlertCard({ alert, onMarkRead }: AlertCardProps) {
  const typeConfig = {
    critical: {
      icon: <AlertCircle className="w-5 h-5" />,
      color: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-200',
      gradient: 'from-red-500 to-rose-600',
    },
    warning: {
      icon: <AlertTriangle className="w-5 h-5" />,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      gradient: 'from-amber-500 to-orange-600',
    },
    info: {
      icon: <Info className="w-5 h-5" />,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      gradient: 'from-blue-500 to-cyan-600',
    },
    success: {
      icon: <CheckCircle2 className="w-5 h-5" />,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      gradient: 'from-emerald-500 to-teal-600',
    },
  }

  const config = typeConfig[alert.type as keyof typeof typeConfig]

  return (
    <motion.div
      variants={itemVariants}
      className={`glass-card p-5 hover-lift relative overflow-hidden ${
        !alert.read ? 'ring-2 ring-primary/20' : ''
      }`}
    >
      {/* Unread indicator */}
      {!alert.read && (
        <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-primary animate-pulse" />
      )}

      <div className="flex gap-4">
        {/* Icon */}
        <div className={`p-3 rounded-xl bg-gradient-to-br ${config.gradient} text-white flex-shrink-0`}>
          {config.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold mb-1">{alert.title}</h3>
          <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>

          <div className="flex items-center gap-4 text-sm">
            {alert.competitor && (
              <span className="flex items-center gap-1 text-muted-foreground">
                <Building2 className="w-4 h-4" />
                {alert.competitor}
              </span>
            )}
            <span className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-4 h-4" />
              {alert.time}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          {!alert.read && (
            <button
              onClick={onMarkRead}
              className="text-xs text-primary hover:underline"
            >
              Marquer comme lu
            </button>
          )}
          <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
            Voir détails
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// Alert Rule Card
interface AlertRuleCardProps {
  rule: typeof alertRules[0]
  onToggle: () => void
}

function AlertRuleCard({ rule, onToggle }: AlertRuleCardProps) {
  const channelIcons = {
    email: <Mail className="w-4 h-4" />,
    push: <Smartphone className="w-4 h-4" />,
    slack: <MessageSquare className="w-4 h-4" />,
  }

  return (
    <motion.div
      variants={itemVariants}
      className={`glass-card p-5 hover-lift ${!rule.enabled ? 'opacity-60' : ''}`}
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${rule.enabled ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white' : 'bg-gray-100 text-muted-foreground'}`}>
          {rule.icon}
        </div>

        <div className="flex-1">
          <h4 className="font-semibold">{rule.name}</h4>
          <p className="text-sm text-muted-foreground">{rule.description}</p>
          <div className="flex gap-2 mt-2">
            {rule.channels.map((channel) => (
              <span key={channel} className="p-1 rounded-lg bg-gray-100">
                {channelIcons[channel as keyof typeof channelIcons]}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggle}
            className={`w-12 h-7 rounded-full transition-colors duration-200 relative ${
              rule.enabled ? 'bg-primary' : 'bg-gray-200'
            }`}
          >
            <div
              className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
                rule.enabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <button className="p-2 rounded-lg hover:bg-white/60">
            <Settings className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export function AlertsPage() {
  const [activeTab, setActiveTab] = useState<'inbox' | 'rules'>('inbox')
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const unreadCount = alerts.filter((a) => !a.read).length
  const filteredAlerts = filter === 'all' ? alerts : alerts.filter((a) => !a.read)

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
          <h1 className="text-2xl font-bold flex items-center gap-3">
            Alertes
            {unreadCount > 0 && (
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary text-white">
                {unreadCount} nouvelles
              </span>
            )}
          </h1>
          <p className="text-muted-foreground">
            Gérez vos alertes et notifications
          </p>
        </div>

        <div className="flex gap-2">
          <button className="btn-glass flex items-center gap-2">
            <BellOff className="w-4 h-4" />
            Tout marquer comme lu
          </button>
          <button className="btn-gradient flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Nouvelle règle
          </button>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={itemVariants} className="glass-card p-2">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('inbox')}
            className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
              activeTab === 'inbox'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                : 'hover:bg-white/60'
            }`}
          >
            <Bell className="w-4 h-4" />
            Boîte de réception ({alerts.length})
          </button>
          <button
            onClick={() => setActiveTab('rules')}
            className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
              activeTab === 'rules'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                : 'hover:bg-white/60'
            }`}
          >
            <Settings className="w-4 h-4" />
            Règles d'alerte
          </button>
        </div>
      </motion.div>

      {/* Inbox Tab */}
      {activeTab === 'inbox' && (
        <motion.div variants={itemVariants} className="space-y-4">
          {/* Filters */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher une alerte..."
                className="input-glass pl-12"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  filter === 'all'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                    : 'glass-card-light hover:bg-white/60'
                }`}
              >
                Toutes
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  filter === 'unread'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                    : 'glass-card-light hover:bg-white/60'
                }`}
              >
                Non lues ({unreadCount})
              </button>
            </div>
          </div>

          {/* Alerts List */}
          <div className="space-y-3">
            {filteredAlerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} onMarkRead={() => {}} />
            ))}
          </div>

          {filteredAlerts.length === 0 && (
            <div className="glass-card p-12 text-center">
              <CheckCircle2 className="w-16 h-16 text-emerald-500/30 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Aucune alerte non lue</h3>
              <p className="text-muted-foreground">
                Vous êtes à jour avec toutes vos notifications.
              </p>
            </div>
          )}
        </motion.div>
      )}

      {/* Rules Tab */}
      {activeTab === 'rules' && (
        <motion.div variants={itemVariants} className="space-y-4">
          {alertRules.map((rule) => (
            <AlertRuleCard key={rule.id} rule={rule} onToggle={() => {}} />
          ))}

          {/* Add rule */}
          <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer">
            <Plus className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Créer une nouvelle règle</h3>
            <p className="text-sm text-muted-foreground">
              Définissez des conditions personnalisées pour recevoir des alertes
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default AlertsPage
