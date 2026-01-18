"use client"

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Building2,
  Globe,
  FileText,
  AlertTriangle,
  Shield,
  Activity,
  Plus,
  Loader2,
} from 'lucide-react'

// =============================================================================
// TYPES
// =============================================================================

export interface NewCompetitor {
  name: string
  website: string
  description: string
  threatLevel: 'high' | 'medium' | 'low'
}

export interface AddCompetitorModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (competitor: NewCompetitor) => void
}

// =============================================================================
// THREAT LEVEL OPTIONS
// =============================================================================

const threatOptions = [
  {
    value: 'low',
    label: 'Low',
    description: 'Faible menace',
    icon: Shield,
    color: 'emerald',
    bgClass: 'bg-emerald-500/15 hover:bg-emerald-500/25 border-emerald-500/30',
    activeClass: 'bg-emerald-500/25 border-emerald-500/50 ring-2 ring-emerald-500/20',
    textClass: 'text-emerald-400',
  },
  {
    value: 'medium',
    label: 'Medium',
    description: 'Menace modérée',
    icon: Activity,
    color: 'amber',
    bgClass: 'bg-amber-500/15 hover:bg-amber-500/25 border-amber-500/30',
    activeClass: 'bg-amber-500/25 border-amber-500/50 ring-2 ring-amber-500/20',
    textClass: 'text-amber-400',
  },
  {
    value: 'high',
    label: 'High',
    description: 'Menace élevée',
    icon: AlertTriangle,
    color: 'red',
    bgClass: 'bg-red-500/15 hover:bg-red-500/25 border-red-500/30',
    activeClass: 'bg-red-500/25 border-red-500/50 ring-2 ring-red-500/20',
    textClass: 'text-red-400',
  },
] as const

// =============================================================================
// ANIMATION VARIANTS
// =============================================================================

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 25 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.15 },
  },
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function AddCompetitorModal({ isOpen, onClose, onAdd }: AddCompetitorModalProps) {
  const [formData, setFormData] = useState<NewCompetitor>({
    name: '',
    website: '',
    description: '',
    threatLevel: 'medium',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof NewCompetitor, string>>>({})

  // Validate form
  const validate = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof NewCompetitor, string>> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis'
    }

    if (!formData.website.trim()) {
      newErrors.website = "L'URL est requise"
    } else if (!/^https?:\/\/.+\..+/.test(formData.website)) {
      newErrors.website = 'URL invalide (ex: https://example.com)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])

  // Handle submit
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setIsSubmitting(true)

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    onAdd(formData)
    setFormData({ name: '', website: '', description: '', threatLevel: 'medium' })
    setIsSubmitting(false)
    onClose()
  }, [formData, validate, onAdd, onClose])

  // Handle close
  const handleClose = useCallback(() => {
    setFormData({ name: '', website: '', description: '', threatLevel: 'medium' })
    setErrors({})
    onClose()
  }, [onClose])

  // Handle input change
  const handleChange = useCallback((field: keyof NewCompetitor, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }, [errors])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-lg rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-light)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent-primary)] to-[#8B5CF6] flex items-center justify-center">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                    Ajouter un concurrent
                  </h2>
                  <p className="text-xs text-[var(--text-muted)]">
                    Ajoutez un nouveau concurrent à surveiller
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors"
              >
                <X className="w-5 h-5 text-[var(--text-muted)]" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)]">
                  <Building2 className="w-4 h-4" />
                  Nom du concurrent
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Ex: Acme Corporation"
                  className={`
                    w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border text-[var(--text-primary)]
                    placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 transition-all
                    ${errors.name
                      ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-[var(--border-default)] focus:border-[var(--accent-primary)] focus:ring-[var(--accent-primary)]/20'
                    }
                  `}
                />
                {errors.name && (
                  <p className="text-xs text-red-400">{errors.name}</p>
                )}
              </div>

              {/* Website Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)]">
                  <Globe className="w-4 h-4" />
                  Site web
                </label>
                <input
                  type="text"
                  value={formData.website}
                  onChange={(e) => handleChange('website', e.target.value)}
                  placeholder="https://example.com"
                  className={`
                    w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border text-[var(--text-primary)]
                    placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 transition-all
                    ${errors.website
                      ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-[var(--border-default)] focus:border-[var(--accent-primary)] focus:ring-[var(--accent-primary)]/20'
                    }
                  `}
                />
                {errors.website && (
                  <p className="text-xs text-red-400">{errors.website}</p>
                )}
              </div>

              {/* Description Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)]">
                  <FileText className="w-4 h-4" />
                  Description
                  <span className="text-[var(--text-muted)] font-normal">(optionnel)</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Description brève de l'activité du concurrent..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/20 transition-all resize-none"
                />
              </div>

              {/* Threat Level Selector */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)]">
                  <AlertTriangle className="w-4 h-4" />
                  Niveau de menace
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {threatOptions.map((option) => {
                    const Icon = option.icon
                    const isActive = formData.threatLevel === option.value

                    return (
                      <motion.button
                        key={option.value}
                        type="button"
                        onClick={() => handleChange('threatLevel', option.value)}
                        className={`
                          relative flex flex-col items-center gap-2 p-4 rounded-xl border transition-all
                          ${isActive ? option.activeClass : option.bgClass}
                        `}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon className={`w-5 h-5 ${option.textClass}`} />
                        <span className={`text-sm font-medium ${option.textClass}`}>
                          {option.label}
                        </span>
                        <span className="text-xs text-[var(--text-muted)]">
                          {option.description}
                        </span>
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2">
                <motion.button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 py-3 rounded-xl bg-[var(--bg-secondary)] text-[var(--text-secondary)] font-medium border border-[var(--border-default)] hover:bg-[var(--bg-tertiary)] transition-colors"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  Annuler
                </motion.button>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[var(--accent-primary)] to-[#8B5CF6] text-white font-medium shadow-lg shadow-[var(--accent-primary)]/25 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Ajout...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Ajouter
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default AddCompetitorModal
