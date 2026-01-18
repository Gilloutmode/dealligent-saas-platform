"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { X, Brain, Search, Newspaper, Clock, Rocket, Sparkles, Zap } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

// =============================================================================
// CONFIRM ANALYSIS MODAL - THEME-AWARE DESIGN
// Uses useTheme hook for reliable dark mode detection
// =============================================================================

interface Competitor {
  name: string
  logo: string
  threatLevel: 'high' | 'medium' | 'low'
}

export interface ConfirmAnalysisModalProps {
  open: boolean
  onClose: () => void
  competitor: Competitor | null
  onConfirm: () => void
  isLoading: boolean
}

// Sources with status indicators
const SOURCES = [
  { name: 'Perplexity AI', description: 'Recherche conversationnelle', icon: Brain, status: 'verified' as const },
  { name: 'Exa Deep Search', description: 'Recherche sémantique', icon: Search, status: 'active' as const },
  { name: 'SerpAPI', description: 'News + LinkedIn', icon: Newspaper, status: 'verified' as const },
]

// Animation variants
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring' as const, damping: 25, stiffness: 300 }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.2 }
  },
}

const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }
  },
}

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring' as const, damping: 15, stiffness: 300 }
  },
}

export function ConfirmAnalysisModal({
  open,
  onClose,
  competitor,
  onConfirm,
  isLoading,
}: ConfirmAnalysisModalProps) {
  const { isDark } = useTheme()

  if (!competitor) return null

  // Theme-aware threat config
  const threatConfig = {
    high: {
      gradient: 'from-red-500 to-rose-600',
      glow: 'shadow-red-500/30',
      badge: isDark
        ? 'bg-red-500/20 text-red-400 border-red-500/30'
        : 'bg-red-100 text-red-700 border-red-300',
      label: 'Menace Élevée',
    },
    medium: {
      gradient: 'from-amber-500 to-orange-600',
      glow: 'shadow-amber-500/30',
      badge: isDark
        ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
        : 'bg-amber-100 text-amber-700 border-amber-300',
      label: 'Menace Moyenne',
    },
    low: {
      gradient: 'from-emerald-500 to-cyan-500',
      glow: 'shadow-emerald-500/30',
      badge: isDark
        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
        : 'bg-emerald-100 text-emerald-700 border-emerald-300',
      label: 'Menace Faible',
    },
  }

  const threat = threatConfig[competitor.threatLevel]

  // Theme-aware style classes
  const styles = {
    backdrop: isDark ? 'bg-black/70' : 'bg-black/50',
    modal: isDark
      ? 'bg-gray-900 border-gray-700'
      : 'bg-white border-gray-200',
    closeBtn: isDark
      ? 'bg-gray-800 hover:bg-gray-700 border-gray-600'
      : 'bg-gray-100 hover:bg-gray-200 border-gray-200',
    closeBtnIcon: isDark ? 'text-gray-400' : 'text-gray-500',
    title: isDark ? 'text-white' : 'text-gray-900',
    subtitle: isDark ? 'text-gray-300' : 'text-gray-600',
    sectionTitle: isDark ? 'text-gray-200' : 'text-gray-700',
    sparklesIcon: isDark ? 'text-purple-400' : 'text-purple-600',
    sourceBadge: isDark
      ? 'bg-gray-800 border-gray-700 hover:border-gray-600 hover:bg-gray-750'
      : 'bg-gray-50 border-gray-200 hover:border-gray-300 hover:bg-gray-100',
    sourceIconBg: isDark ? 'bg-blue-500/20' : 'bg-blue-100',
    sourceIcon: isDark ? 'text-blue-400' : 'text-blue-600',
    sourceName: isDark ? 'text-white' : 'text-gray-900',
    sourceDesc: isDark ? 'text-gray-400' : 'text-gray-500',
    verifiedBg: isDark ? 'bg-emerald-500/20' : 'bg-emerald-100',
    verifiedIcon: isDark ? 'text-emerald-400' : 'text-emerald-600',
    durationBox: isDark
      ? 'bg-amber-500/10 border-amber-500/20'
      : 'bg-amber-50 border-amber-200',
    durationIconBg: isDark ? 'bg-amber-500/20' : 'bg-amber-100',
    durationIcon: isDark ? 'text-amber-400' : 'text-amber-600',
    durationTitle: isDark ? 'text-white' : 'text-gray-900',
    durationText: isDark ? 'text-gray-300' : 'text-gray-600',
    cancelBtn: isDark
      ? 'bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700 hover:border-gray-500'
      : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200 hover:border-gray-400',
  }

  return (
    <AnimatePresence mode="wait">
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className={`fixed inset-0 ${styles.backdrop} z-50`}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-lg pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Card */}
              <div className={`relative ${styles.modal} border rounded-2xl shadow-2xl overflow-hidden`}>

                {/* Close Button */}
                <motion.button
                  onClick={onClose}
                  className={`absolute top-4 right-4 p-2 rounded-full ${styles.closeBtn} border transition-all z-10`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Fermer"
                >
                  <X className={`w-4 h-4 ${styles.closeBtnIcon}`} />
                </motion.button>

                {/* Content */}
                <motion.div
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  className="p-8"
                >
                  {/* Header with Competitor Info */}
                  <motion.div variants={itemVariants} className="mb-6">
                    <div className="flex items-start gap-4">
                      {/* Competitor Icon with Gradient */}
                      <motion.div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${threat.gradient} flex items-center justify-center text-white font-bold text-xl shadow-lg ${threat.glow}`}
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        {competitor.logo}
                      </motion.div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h2 className={`text-xl font-bold ${styles.title}`}>
                            Analyser {competitor.name}
                          </h2>
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${threat.badge}`}>
                            {threat.label}
                          </span>
                        </div>
                        <p className={`text-sm ${styles.subtitle} mt-1`}>
                          Analyse concurrentielle complète avec IA
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Sources Section */}
                  <motion.div variants={itemVariants} className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className={`w-4 h-4 ${styles.sparklesIcon}`} />
                      <p className={`text-sm font-medium ${styles.sectionTitle}`}>
                        Sources d'intelligence
                      </p>
                    </div>

                    {/* Source Badges */}
                    <div className="flex flex-wrap gap-2">
                      {SOURCES.map((source, index) => {
                        const Icon = source.icon
                        return (
                          <motion.div
                            key={source.name}
                            variants={badgeVariants}
                            custom={index}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="group"
                          >
                            <div className={`flex items-center gap-2 px-3 py-2 rounded-xl ${styles.sourceBadge} border transition-all cursor-default`}>
                              <div className={`w-7 h-7 rounded-lg ${styles.sourceIconBg} flex items-center justify-center`}>
                                <Icon className={`w-3.5 h-3.5 ${styles.sourceIcon}`} />
                              </div>
                              <div className="flex flex-col">
                                <span className={`text-xs font-semibold ${styles.sourceName}`}>
                                  {source.name}
                                </span>
                                <span className={`text-[10px] ${styles.sourceDesc}`}>
                                  {source.description}
                                </span>
                              </div>
                              {source.status === 'verified' && (
                                <div className={`w-4 h-4 rounded-full ${styles.verifiedBg} flex items-center justify-center`}>
                                  <Zap className={`w-2.5 h-2.5 ${styles.verifiedIcon}`} />
                                </div>
                              )}
                              {source.status === 'active' && (
                                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                              )}
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </motion.div>

                  {/* Duration Estimate */}
                  <motion.div
                    variants={itemVariants}
                    className={`flex items-center gap-3 p-4 rounded-xl ${styles.durationBox} border mb-6`}
                  >
                    <div className={`w-10 h-10 rounded-xl ${styles.durationIconBg} flex items-center justify-center`}>
                      <Clock className={`w-5 h-5 ${styles.durationIcon}`} />
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${styles.durationTitle}`}>
                        Durée estimée
                      </p>
                      <p className={`text-xs ${styles.durationText}`}>
                        ~2 minutes pour une analyse complète
                      </p>
                    </div>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div variants={itemVariants} className="flex gap-3">
                    {/* Cancel Button */}
                    <motion.button
                      onClick={onClose}
                      disabled={isLoading}
                      className={`flex-1 px-4 py-3 rounded-xl ${styles.cancelBtn} border font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Annuler
                    </motion.button>

                    {/* Launch Button - Gradient with Glow */}
                    <motion.button
                      onClick={onConfirm}
                      disabled={isLoading}
                      className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isLoading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          />
                          <span>Lancement...</span>
                        </>
                      ) : (
                        <>
                          <Rocket className="w-5 h-5" />
                          <span>Lancer l'analyse</span>
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ConfirmAnalysisModal
