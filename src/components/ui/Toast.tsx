"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"

// =============================================================================
// CDS PLATFORM - PREMIUM TOAST/NOTIFICATION COMPONENT
// 21st.dev inspired with glassmorphism and smooth animations
// =============================================================================

// =============================================================================
// TYPES
// =============================================================================

export type ToastType = "success" | "error" | "warning" | "info"

export interface Toast {
  id: string
  type: ToastType
  title: string
  description?: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface ToastContextValue {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, "id">) => void
  removeToast: (id: string) => void
}

// =============================================================================
// TOAST CONTEXT & PROVIDER
// =============================================================================

const ToastContext = React.createContext<ToastContextValue | null>(null)

export const useToast = () => {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

export interface ToastProviderProps {
  children: React.ReactNode
  /** Position of toast container */
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center"
  /** Max visible toasts */
  maxToasts?: number
}

// Event detail type for analysis completion
interface AnalysisCompleteEventDetail {
  id: string
  competitor: string
  status: 'completed' | 'failed'
  error?: string
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = "bottom-right",
  maxToasts = 5,
}) => {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const addToast = React.useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(7)
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration ?? 5000,
    }

    setToasts((prev) => {
      const updated = [newToast, ...prev]
      return updated.slice(0, maxToasts)
    })
  }, [maxToasts])

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  // Listen for analysis-complete custom events
  React.useEffect(() => {
    const handleAnalysisComplete = (event: Event) => {
      const detail = (event as CustomEvent<AnalysisCompleteEventDetail>).detail
      console.log('[Toast] Received analysis-complete event:', detail)

      if (detail.status === 'completed') {
        addToast({
          type: 'success',
          title: 'Analyse terminée',
          description: `L'analyse de ${detail.competitor} est prête à consulter`,
        })
      } else {
        addToast({
          type: 'error',
          title: 'Échec de l\'analyse',
          description: detail.error || `L'analyse de ${detail.competitor} a échoué`,
        })
      }
    }

    window.addEventListener('analysis-complete', handleAnalysisComplete)
    console.log('[Toast] Event listener registered for analysis-complete')

    return () => {
      window.removeEventListener('analysis-complete', handleAnalysisComplete)
    }
  }, [addToast])

  // Position classes
  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-center": "top-4 left-1/2 -translate-x-1/2",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  }

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div
        className={`fixed z-[100] flex flex-col gap-3 ${positionClasses[position]}`}
        role="region"
        aria-label="Notifications"
      >
        <AnimatePresence mode="sync">
          {toasts.map((toast) => (
            <ToastItem
              key={toast.id}
              toast={toast}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

// =============================================================================
// TOAST ITEM
// =============================================================================

interface ToastItemProps {
  toast: Toast
  onClose: () => void
}

const toastConfig = {
  success: {
    icon: CheckCircle,
    iconClass: "text-[#10B981]",
    glowClass: "from-[#10B981]/20 via-[#10B981]/10 to-transparent",
    borderClass: "border-l-[#10B981]",
  },
  error: {
    icon: AlertCircle,
    iconClass: "text-[#EF4444]",
    glowClass: "from-[#EF4444]/20 via-[#EF4444]/10 to-transparent",
    borderClass: "border-l-[#EF4444]",
  },
  warning: {
    icon: AlertTriangle,
    iconClass: "text-[#F59E0B]",
    glowClass: "from-[#F59E0B]/20 via-[#F59E0B]/10 to-transparent",
    borderClass: "border-l-[#F59E0B]",
  },
  info: {
    icon: Info,
    iconClass: "text-[#5E6AD2]",
    glowClass: "from-[#5E6AD2]/20 via-[#5E6AD2]/10 to-transparent",
    borderClass: "border-l-[#5E6AD2]",
  },
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onClose }) => {
  const config = toastConfig[toast.type]
  const Icon = config.icon

  // Auto dismiss
  React.useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(onClose, toast.duration)
      return () => clearTimeout(timer)
    }
  }, [toast.duration, onClose])

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.95 }}
      transition={{
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group relative"
    >
      {/* Glow effect */}
      <div className={`
        absolute -inset-1 rounded-2xl
        bg-gradient-to-r ${config.glowClass}
        opacity-0 group-hover:opacity-100 blur-lg
        transition-opacity duration-500 -z-10
      `} />

      <div
        className={`
          relative
          w-[380px] max-w-[calc(100vw-2rem)]
          bg-[var(--bg-card)]/95
          backdrop-blur-2xl
          border border-white/[0.08]
          border-l-4 ${config.borderClass}
          rounded-xl
          shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_10px_40px_-10px_rgba(0,0,0,0.4)]
          overflow-hidden
        `}
        role="alert"
      >
        {/* Top glow line */}
        <div className={`
          absolute top-0 left-8 right-8 h-[1px]
          bg-gradient-to-r ${config.glowClass}
        `} />

        <div className="p-4 flex items-start gap-3">
          {/* Icon */}
          <div className={`flex-shrink-0 ${config.iconClass}`}>
            <Icon className="w-5 h-5" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[var(--text-primary)]">
              {toast.title}
            </p>
            {toast.description && (
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                {toast.description}
              </p>
            )}
            {toast.action && (
              <button
                onClick={toast.action.onClick}
                className="
                  mt-2 text-sm font-medium
                  text-[var(--accent-primary)]
                  hover:text-[var(--accent-primary-hover)]
                  transition-colors duration-200
                "
              >
                {toast.action.label}
              </button>
            )}
          </div>

          {/* Close button */}
          <motion.button
            onClick={onClose}
            className="
              flex-shrink-0 p-1 rounded-lg
              text-[var(--text-muted)]
              hover:text-[var(--text-primary)]
              hover:bg-white/5
              transition-all duration-200
            "
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Progress bar for auto-dismiss */}
        {toast.duration && toast.duration > 0 && (
          <motion.div
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{
              duration: toast.duration / 1000,
              ease: "linear",
            }}
            className={`
              absolute bottom-0 left-0 right-0 h-[2px]
              origin-left
              ${config.iconClass.replace("text-", "bg-")}
              opacity-30
            `}
          />
        )}
      </div>
    </motion.div>
  )
}

// =============================================================================
// HELPER HOOKS FOR QUICK TOASTS
// =============================================================================

export const useToastActions = () => {
  const { addToast } = useToast()

  return {
    success: (title: string, description?: string) =>
      addToast({ type: "success", title, description }),
    error: (title: string, description?: string) =>
      addToast({ type: "error", title, description }),
    warning: (title: string, description?: string) =>
      addToast({ type: "warning", title, description }),
    info: (title: string, description?: string) =>
      addToast({ type: "info", title, description }),
  }
}

// =============================================================================
// STANDALONE TOAST FUNCTION (for use outside React context)
// =============================================================================

// Global toast queue for non-React contexts
let toastQueue: Array<Omit<Toast, "id">> = []
let toastSubscribers: Array<(toasts: Array<Omit<Toast, "id">>) => void> = []

export const toast = {
  success: (title: string, description?: string) => {
    const toastData = { type: "success" as const, title, description }
    toastQueue.push(toastData)
    toastSubscribers.forEach((sub) => sub([...toastQueue]))
  },
  error: (title: string, description?: string) => {
    const toastData = { type: "error" as const, title, description }
    toastQueue.push(toastData)
    toastSubscribers.forEach((sub) => sub([...toastQueue]))
  },
  warning: (title: string, description?: string) => {
    const toastData = { type: "warning" as const, title, description }
    toastQueue.push(toastData)
    toastSubscribers.forEach((sub) => sub([...toastQueue]))
  },
  info: (title: string, description?: string) => {
    const toastData = { type: "info" as const, title, description }
    toastQueue.push(toastData)
    toastSubscribers.forEach((sub) => sub([...toastQueue]))
  },
  _subscribe: (callback: (toasts: Array<Omit<Toast, "id">>) => void) => {
    toastSubscribers.push(callback)
    return () => {
      toastSubscribers = toastSubscribers.filter((sub) => sub !== callback)
    }
  },
  _clearQueue: () => {
    const queue = [...toastQueue]
    toastQueue = []
    return queue
  },
}

// =============================================================================
// EXPORTS
// =============================================================================

export { ToastItem }
