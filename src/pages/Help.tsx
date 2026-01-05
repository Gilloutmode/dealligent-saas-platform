import { motion } from 'framer-motion'
import {
  HelpCircle,
  Book,
  MessageCircle,
  Video,
  Mail,
  Phone,
  Search,
  ChevronRight,
  Play,
  FileText,
  Zap,
  Target,
  BarChart3,
  Bell,
  Settings,
  Users,
  ExternalLink,
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

const faqs = [
  {
    question: 'Comment lancer ma première analyse concurrentielle ?',
    answer: 'Allez dans la section "Lancer analyse", sélectionnez le type d\'analyse souhaité, choisissez vos concurrents cibles, et configurez les sources de données. Cliquez ensuite sur "Lancer" pour démarrer.',
  },
  {
    question: 'Comment ajouter un concurrent à ma watchlist ?',
    answer: 'Depuis la page "Watchlist", cliquez sur le bouton "Ajouter un concurrent". Vous pouvez rechercher par nom d\'entreprise ou entrer directement l\'URL du site web.',
  },
  {
    question: 'Qu\'est-ce que le RAG Management ?',
    answer: 'RAG (Retrieval-Augmented Generation) vous permet d\'enrichir l\'IA avec vos propres documents. Importez des rapports, présentations ou analyses pour obtenir des insights plus pertinents.',
  },
  {
    question: 'Comment configurer les alertes ?',
    answer: 'Dans la section "Alertes", vous pouvez créer des règles personnalisées. Définissez les conditions (changement de prix, nouveau produit, etc.) et les canaux de notification.',
  },
  {
    question: 'Comment exporter mes rapports ?',
    answer: 'Chaque rapport peut être téléchargé en PDF, PPTX ou XLSX. Utilisez le bouton "Exporter" ou configurez des exports automatiques dans les paramètres.',
  },
]

const tutorials = [
  {
    id: 1,
    title: 'Démarrage rapide',
    description: 'Apprenez les bases en 5 minutes',
    duration: '5 min',
    icon: <Zap className="w-6 h-6" />,
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    id: 2,
    title: 'Configurer votre watchlist',
    description: 'Surveillez efficacement vos concurrents',
    duration: '8 min',
    icon: <Target className="w-6 h-6" />,
    gradient: 'from-indigo-500 to-purple-600',
  },
  {
    id: 3,
    title: 'Analyses avancées',
    description: 'Exploitez tout le potentiel de l\'IA',
    duration: '12 min',
    icon: <BarChart3 className="w-6 h-6" />,
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    id: 4,
    title: 'Automatiser vos rapports',
    description: 'Gagnez du temps avec l\'automation',
    duration: '10 min',
    icon: <Settings className="w-6 h-6" />,
    gradient: 'from-emerald-500 to-teal-600',
  },
]

const guides = [
  { title: 'Guide de démarrage complet', icon: <Book className="w-5 h-5" /> },
  { title: 'Documentation API', icon: <FileText className="w-5 h-5" /> },
  { title: 'Bonnes pratiques de veille', icon: <Target className="w-5 h-5" /> },
  { title: 'Gestion des alertes', icon: <Bell className="w-5 h-5" /> },
  { title: 'Administration équipe', icon: <Users className="w-5 h-5" /> },
]

// FAQ Accordion Item
interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <motion.div
      variants={itemVariants}
      className="glass-card overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className="font-medium pr-4">{question}</span>
        <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </button>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="px-5 pb-5"
        >
          <p className="text-muted-foreground">{answer}</p>
        </motion.div>
      )}
    </motion.div>
  )
}

export function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [openFAQ, setOpenFAQ] = useState<number | null>(0)

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-8 space-y-8"
    >
      {/* Header with Search */}
      <motion.div variants={itemVariants} className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-3">Comment pouvons-nous vous aider ?</h1>
        <p className="text-muted-foreground mb-6">
          Trouvez des réponses, des tutoriels et contactez notre support
        </p>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher dans l'aide..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-glass pl-12 text-center"
          />
        </div>
      </motion.div>

      {/* Quick Links */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-6 text-center hover-lift cursor-pointer group">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform">
            <Book className="w-7 h-7" />
          </div>
          <h3 className="font-semibold mb-1">Documentation</h3>
          <p className="text-sm text-muted-foreground">Guides complets et tutoriels</p>
        </div>

        <div className="glass-card p-6 text-center hover-lift cursor-pointer group">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform">
            <MessageCircle className="w-7 h-7" />
          </div>
          <h3 className="font-semibold mb-1">Chat support</h3>
          <p className="text-sm text-muted-foreground">Assistance en temps réel</p>
        </div>

        <div className="glass-card p-6 text-center hover-lift cursor-pointer group">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform">
            <Video className="w-7 h-7" />
          </div>
          <h3 className="font-semibold mb-1">Tutoriels vidéo</h3>
          <p className="text-sm text-muted-foreground">Apprenez visuellement</p>
        </div>
      </motion.div>

      {/* Video Tutorials */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Tutoriels vidéo</h2>
          <button className="text-sm text-primary hover:underline flex items-center gap-1">
            Voir tous les tutoriels
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tutorials.map((tutorial) => (
            <motion.div
              key={tutorial.id}
              variants={itemVariants}
              className="glass-card overflow-hidden hover-lift cursor-pointer group"
            >
              <div className={`h-32 bg-gradient-to-br ${tutorial.gradient} relative flex items-center justify-center`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-white ml-1" />
                </div>
                <span className="absolute bottom-2 right-2 px-2 py-1 rounded-lg bg-black/40 text-white text-xs">
                  {tutorial.duration}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1">{tutorial.title}</h3>
                <p className="text-sm text-muted-foreground">{tutorial.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Two columns: FAQ + Guides */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FAQ Section */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold">Questions fréquentes</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQ === index}
                onToggle={() => setOpenFAQ(openFAQ === index ? null : index)}
              />
            ))}
          </div>
        </motion.div>

        {/* Guides Section */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-xl font-semibold">Guides populaires</h2>
          <div className="glass-card p-4 space-y-2">
            {guides.map((guide, index) => (
              <button
                key={index}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/60 transition-colors text-left"
              >
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  {guide.icon}
                </div>
                <span className="font-medium text-sm flex-1">{guide.title}</span>
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Contact Section */}
      <motion.div variants={itemVariants} className="glass-card p-8">
        <div className="text-center max-w-2xl mx-auto">
          <HelpCircle className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Vous n'avez pas trouvé ce que vous cherchez ?</h2>
          <p className="text-muted-foreground mb-6">
            Notre équipe support est disponible pour vous aider du lundi au vendredi, 9h-18h.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-gradient flex items-center justify-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Démarrer un chat
            </button>
            <button className="btn-glass flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />
              support@cds-platform.com
            </button>
            <button className="btn-glass flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              +33 1 23 45 67 89
            </button>
          </div>
        </div>
      </motion.div>

      {/* Keyboard Shortcuts */}
      <motion.div variants={itemVariants} className="glass-card p-6">
        <h2 className="text-lg font-semibold mb-4">Raccourcis clavier</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { keys: '⌘ + K', action: 'Recherche globale' },
            { keys: '⌘ + N', action: 'Nouvelle analyse' },
            { keys: '⌘ + /', action: 'Aide rapide' },
            { keys: 'Esc', action: 'Fermer la modale' },
          ].map((shortcut, index) => (
            <div key={index} className="flex items-center gap-3 p-3 rounded-xl glass-card-light">
              <kbd className="px-3 py-1 rounded-lg bg-gray-100 font-mono text-sm">
                {shortcut.keys}
              </kbd>
              <span className="text-sm text-muted-foreground">{shortcut.action}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default HelpPage
