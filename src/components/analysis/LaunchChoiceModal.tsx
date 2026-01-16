// =============================================================================
// DEALLIGENT PLATFORM - LAUNCH CHOICE MODAL
// Modal for choosing Wait or Notify after launching analysis
// =============================================================================

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Rocket, Clock, Bell, Check } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
} from '../ui/Dialog'

// =============================================================================
// TYPES
// =============================================================================

export interface LaunchChoiceModalProps {
  /** Whether modal is open */
  open: boolean
  /** Close callback */
  onClose: () => void
  /** Choice callback */
  onChoice: (choice: 'wait' | 'notify') => void
  /** Competitor name */
  competitor: string
  /** Analysis type label */
  analysisType: string
  /** Estimated duration in seconds */
  estimatedDuration: number
}

// =============================================================================
// STORAGE HOOK
// =============================================================================

const PREFERENCE_KEY = 'dealligent_launch_preference'

export function useSavedPreference(): 'wait' | 'notify' | null {
  const [preference, setPreference] = useState<'wait' | 'notify' | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem(PREFERENCE_KEY)
    if (saved === 'wait' || saved === 'notify') {
      setPreference(saved)
    }
  }, [])

  return preference
}

function savePreference(choice: 'wait' | 'notify'): void {
  localStorage.setItem(PREFERENCE_KEY, choice)
}

function clearPreference(): void {
  localStorage.removeItem(PREFERENCE_KEY)
}

// =============================================================================
// FORMAT HELPERS
// =============================================================================

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  if (minutes < 1) return 'moins d\'une minute'
  if (minutes === 1) return '1 minute'
  return `${minutes} minutes`
}

// =============================================================================
// COMPONENT
// =============================================================================

export function LaunchChoiceModal({
  open,
  onClose,
  onChoice,
  competitor,
  analysisType,
  estimatedDuration,
}: LaunchChoiceModalProps): React.ReactElement {
  const [rememberChoice, setRememberChoice] = useState(false)
  const [selectedChoice, setSelectedChoice] = useState<'wait' | 'notify' | null>(null)

  // Reset state when modal opens
  useEffect(() => {
    if (open) {
      setSelectedChoice(null)
      setRememberChoice(false)
    }
  }, [open])

  const handleChoice = (choice: 'wait' | 'notify') => {
    setSelectedChoice(choice)

    if (rememberChoice) {
      savePreference(choice)
    } else {
      clearPreference()
    }

    // Small delay for visual feedback
    setTimeout(() => {
      onChoice(choice)
      onClose()
    }, 200)
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent size="default" showCloseButton={true}>
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl icon-gradient-purple flex items-center justify-center">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <div>
              <DialogTitle>Analyse en cours de lancement</DialogTitle>
              <p className="text-sm text-secondary mt-1">
                {competitor} • {analysisType}
              </p>
            </div>
          </div>
        </DialogHeader>

        <DialogBody>
          {/* Duration info */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-blue-primary/10 border border-blue-primary/30 mb-6">
            <Clock className="w-5 h-5 text-blue-primary" />
            <span className="text-sm text-blue-primary">
              Durée estimée: <strong>{formatDuration(estimatedDuration)}</strong>
            </span>
          </div>

          {/* Choice cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Wait option */}
            <motion.button
              onClick={() => handleChoice('wait')}
              className={`
                relative p-4 rounded-xl text-left transition-all duration-200
                ${selectedChoice === 'wait'
                  ? 'card-premium ring-2 ring-blue-primary shadow-lg shadow-blue-primary/20'
                  : 'card-glass hover:border-blue-primary/30'
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {selectedChoice === 'wait' && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-gradient-to-br from-blue-primary to-cyan-400 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
              <div className="w-10 h-10 rounded-xl icon-gradient-blue flex items-center justify-center mb-3">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-semibold text-primary mb-1">Rester ici</h4>
              <p className="text-xs text-secondary">
                Suivre la progression en temps réel
              </p>
            </motion.button>

            {/* Notify option */}
            <motion.button
              onClick={() => handleChoice('notify')}
              className={`
                relative p-4 rounded-xl text-left transition-all duration-200
                ${selectedChoice === 'notify'
                  ? 'card-premium ring-2 ring-purple-500 shadow-lg shadow-purple-500/20'
                  : 'card-glass hover:border-purple-500/30'
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {selectedChoice === 'notify' && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
              <div className="w-10 h-10 rounded-xl icon-gradient-purple flex items-center justify-center mb-3">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-semibold text-primary mb-1">Me notifier</h4>
              <p className="text-xs text-secondary">
                Continuer à naviguer librement
              </p>
            </motion.button>
          </div>

          {/* Remember checkbox */}
          <label className="flex items-center gap-3 cursor-pointer group">
            <div
              className={`
                w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all
                ${rememberChoice
                  ? 'bg-blue-primary border-blue-primary'
                  : 'border-white/20 group-hover:border-white/40'
                }
              `}
              onClick={() => setRememberChoice(!rememberChoice)}
            >
              {rememberChoice && <Check className="w-3 h-3 text-white" />}
            </div>
            <span className="text-sm text-secondary group-hover:text-primary transition-colors">
              Se souvenir de mon choix
            </span>
          </label>
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}

export default LaunchChoiceModal
