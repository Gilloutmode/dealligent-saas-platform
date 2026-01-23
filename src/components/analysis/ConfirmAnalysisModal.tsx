"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { X, Brain, Search, Newspaper, Clock, Rocket, Zap, CheckCircle2, Loader2 } from 'lucide-react'
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

  // Theme-aware style classes - CSS variables for WCAG AA compliance
  const styles = {
    backdrop: isDark ? 'bg-black/70' : 'bg-black/50',
    modal: isDark
      ? 'bg-gray-900 border-gray-700'
      : 'bg-white border-[var(--border-default)]',
    closeBtn: isDark
      ? 'bg-gray-800 hover:bg-gray-700 border-gray-600'
      : 'bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] border-[var(--border-default)]',
    closeBtnIcon: 'text-[var(--text-muted)]',
    title: 'text-[var(--text-primary)]',
    subtitle: 'text-[var(--text-secondary)]',
    sectionTitle: isDark ? 'text-gray-200' : 'text-[var(--text-secondary)]',
    sparklesIcon: isDark ? 'text-purple-400' : 'text-purple-600',
    sourceBadge: isDark
      ? 'bg-gray-800 border-gray-700 hover:border-gray-600 hover:bg-gray-750'
      : 'bg-[var(--bg-secondary)] border-[var(--border-default)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-tertiary)]',
    sourceIconBg: isDark ? 'bg-blue-500/20' : 'bg-blue-100',
    sourceIcon: isDark ? 'text-blue-400' : 'text-blue-600',
    sourceName: 'text-[var(--text-primary)]',
    sourceDesc: 'text-[var(--text-muted)]',
    verifiedBg: isDark ? 'bg-emerald-500/20' : 'bg-emerald-100',
    verifiedIcon: isDark ? 'text-emerald-400' : 'text-emerald-600',
    durationBox: isDark
      ? 'bg-amber-500/10 border-amber-500/20'
      : 'bg-amber-50 border-amber-200',
    durationIconBg: isDark ? 'bg-amber-500/20' : 'bg-amber-100',
    durationIcon: isDark ? 'text-amber-400' : 'text-amber-600',
    durationTitle: 'text-[var(--text-primary)]',
    durationText: 'text-[var(--text-secondary)]',
    cancelBtn: isDark
      ? 'bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700 hover:border-gray-500'
      : 'bg-[var(--bg-secondary)] border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:border-[var(--border-hover)]',
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
              <div className="panel-aurora hud-border rounded-3xl shadow-2xl overflow-hidden">

                {/* Close Button */}
                <motion.button
                  onClick={onClose}
                  className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all z-10"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Fermer"
                >
                  <X className="w-4 h-4 text-[var(--text-secondary)]" />
                </motion.button>

                {/* Content */}
                <motion.div
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  className="p-10"
                >
                  {/* Header with Competitor Info */}
                  <motion.div variants={itemVariants} className="mb-8">
                    <div className="flex items-start gap-6">
                      {/* Competitor Icon with Gradient */}
                      <motion.div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${threat.gradient} flex items-center justify-center text-white font-black text-2xl shadow-xl ${threat.glow}`}
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        {competitor.logo}
                      </motion.div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap mb-2">
                          <h2 className="text-2xl font-black text-[var(--text-primary)] uppercase tracking-tight">
                            Analyser {competitor.name}
                          </h2>
                        </div>
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] border ${threat.badge}`}>
                          <Zap className="w-3 h-3" />
                          {threat.label}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Sources Section */}
                  <motion.div variants={itemVariants} className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-1 h-4 bg-[var(--c-brand)] rounded-full" />
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-secondary)]">
                        Intelligence Stream Selection
                      </p>
                    </div>

                    {/* Source Badges */}
                    <div className="grid grid-cols-1 gap-3">
                      {SOURCES.map((source, index) => {
                        const Icon = source.icon
                        return (
                          <motion.div
                            key={source.name}
                            variants={badgeVariants}
                            custom={index}
                            className="group"
                          >
                            <div className="flex items-center gap-4 px-4 py-3 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-[var(--bg-surface-elevated)] group-hover:border-[var(--c-brand)]/20 transition-all cursor-default">
                              <div className="w-10 h-10 rounded-xl bg-[var(--c-brand)]/10 flex items-center justify-center">
                                <Icon className="w-5 h-5 text-[var(--c-brand)]" />
                              </div>
                              <div className="flex-1">
                                <span className="text-sm font-bold text-[var(--text-primary)] block">
                                  {source.name}
                                </span>
                                <span className="text-[10px] text-[var(--text-secondary)] font-medium">
                                  {source.description}
                                </span>
                              </div>
                              {source.status === 'verified' && (
                                <CheckCircle2 className="w-4 h-4 text-[var(--c-success)]" />
                              )}
                              {source.status === 'active' && (
                                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[var(--c-brand)]/10 text-[var(--c-brand)]">
                                  <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                                  <span className="text-[8px] font-black uppercase">Active</span>
                                </div>
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
                    className="flex items-center gap-4 p-5 rounded-2xl bg-[var(--c-warning)]/5 border border-[var(--c-warning)]/10 mb-8"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[var(--c-warning)]/10 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-[var(--c-warning)]" />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-[var(--c-warning)] mb-1">
                        Deployment Window
                      </p>
                      <p className="text-sm text-[var(--text-primary)] font-medium">
                        Environ <span className="font-black">120 secondes</span> pour une extraction complète.
                      </p>
                    </div>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div variants={itemVariants} className="flex gap-4">
                    {/* Cancel Button */}
                    <motion.button
                      onClick={onClose}
                      disabled={isLoading}
                      className="flex-1 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-[var(--text-secondary)] font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:bg-white/10 hover:text-white disabled:opacity-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Abort
                    </motion.button>

                    {/* Launch Button - HUD Style */}
                    <motion.button
                      onClick={onConfirm}
                      disabled={isLoading}
                      className="flex-1 px-6 py-4 rounded-2xl bg-[var(--c-brand)] text-white font-black text-[10px] uppercase tracking-[0.15em] shadow-xl shadow-[var(--c-brand)]/30 hover:shadow-[var(--c-brand)]/50 transition-all disabled:opacity-50 flex items-center justify-center gap-3 overflow-hidden relative group"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Initializing...</span>
                        </>
                      ) : (
                        <>
                          <Rocket className="w-4 h-4" />
                          <span>Execute Analysis</span>
                        </>
                      ) as any}
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
