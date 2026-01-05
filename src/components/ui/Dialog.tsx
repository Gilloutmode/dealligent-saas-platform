"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

// =============================================================================
// CDS PLATFORM - PREMIUM DIALOG/MODAL COMPONENT
// 21st.dev inspired glassmorphism with smooth animations
// =============================================================================

// =============================================================================
// DIALOG CONTEXT
// =============================================================================

interface DialogContextValue {
  open: boolean
  onClose: () => void
}

const DialogContext = React.createContext<DialogContextValue | null>(null)

const useDialogContext = () => {
  const context = React.useContext(DialogContext)
  if (!context) {
    throw new Error("Dialog components must be used within a Dialog")
  }
  return context
}

// =============================================================================
// DIALOG ROOT
// =============================================================================

export interface DialogProps {
  /** Whether the dialog is open */
  open: boolean
  /** Callback when dialog should close */
  onOpenChange: (open: boolean) => void
  /** Children components */
  children: React.ReactNode
}

const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
  const onClose = React.useCallback(() => {
    onOpenChange(false)
  }, [onOpenChange])

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose()
      }
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [open, onClose])

  // Prevent body scroll when open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <DialogContext.Provider value={{ open, onClose }}>
      {children}
    </DialogContext.Provider>
  )
}

// =============================================================================
// DIALOG TRIGGER
// =============================================================================

export interface DialogTriggerProps {
  children: React.ReactNode
  asChild?: boolean
}

const DialogTrigger: React.FC<DialogTriggerProps> = ({ children }) => {
  // This is a placeholder - in real use, wrap with Dialog and use onOpenChange
  return <>{children}</>
}

// =============================================================================
// DIALOG PORTAL & OVERLAY
// =============================================================================

export interface DialogContentProps {
  /** Size variant */
  size?: "sm" | "default" | "lg" | "xl" | "full"
  /** Show close button */
  showCloseButton?: boolean
  /** Children */
  children: React.ReactNode
  /** Additional class name */
  className?: string
}

const sizeConfig = {
  sm: "max-w-sm",
  default: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "max-w-[calc(100vw-2rem)]",
}

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ size = "default", showCloseButton = true, children, className = "" }, ref) => {
    const { open, onClose } = useDialogContext()

    return (
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={onClose}
              aria-hidden="true"
            />

            {/* Dialog */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className={`
                relative w-full ${sizeConfig[size]} mx-4
                bg-[var(--bg-card)]/95
                backdrop-blur-2xl
                border border-white/[0.08]
                rounded-2xl
                shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_25px_50px_-12px_rgba(0,0,0,0.5)]
                overflow-hidden
                ${className}
              `}
              role="dialog"
              aria-modal="true"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top glow effect */}
              <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-primary)]/40 to-transparent" />

              {/* Close button */}
              {showCloseButton && (
                <motion.button
                  onClick={onClose}
                  className="
                    absolute top-4 right-4 z-10
                    p-2 rounded-xl
                    text-[var(--text-muted)]
                    hover:text-[var(--text-primary)]
                    hover:bg-white/5
                    transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/30
                  "
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              )}

              {children}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    )
  }
)

DialogContent.displayName = "DialogContent"

// =============================================================================
// DIALOG HEADER
// =============================================================================

export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const DialogHeader: React.FC<DialogHeaderProps> = ({ className = "", children, ...props }) => (
  <div
    className={`px-6 pt-6 pb-4 ${className}`}
    {...props}
  >
    {children}
  </div>
)

// =============================================================================
// DIALOG TITLE
// =============================================================================

export interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

const DialogTitle: React.FC<DialogTitleProps> = ({ className = "", children, ...props }) => (
  <h2
    className={`text-xl font-semibold text-[var(--text-primary)] ${className}`}
    {...props}
  >
    {children}
  </h2>
)

// =============================================================================
// DIALOG DESCRIPTION
// =============================================================================

export interface DialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

const DialogDescription: React.FC<DialogDescriptionProps> = ({ className = "", children, ...props }) => (
  <p
    className={`mt-2 text-sm text-[var(--text-secondary)] ${className}`}
    {...props}
  >
    {children}
  </p>
)

// =============================================================================
// DIALOG BODY
// =============================================================================

export interface DialogBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const DialogBody: React.FC<DialogBodyProps> = ({ className = "", children, ...props }) => (
  <div
    className={`px-6 py-4 ${className}`}
    {...props}
  >
    {children}
  </div>
)

// =============================================================================
// DIALOG FOOTER
// =============================================================================

export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const DialogFooter: React.FC<DialogFooterProps> = ({ className = "", children, ...props }) => (
  <div
    className={`
      px-6 py-4
      border-t border-white/[0.06]
      bg-[var(--bg-elevated)]/30
      flex items-center justify-end gap-3
      ${className}
    `}
    {...props}
  >
    {children}
  </div>
)

// =============================================================================
// ALERT DIALOG - Confirmation dialog variant
// =============================================================================

export interface AlertDialogProps {
  /** Whether the dialog is open */
  open: boolean
  /** Callback when dialog should close */
  onOpenChange: (open: boolean) => void
  /** Dialog title */
  title: string
  /** Dialog description */
  description: string
  /** Confirm button text */
  confirmText?: string
  /** Cancel button text */
  cancelText?: string
  /** Confirm callback */
  onConfirm: () => void
  /** Variant determines styling */
  variant?: "default" | "destructive"
  /** Loading state */
  isLoading?: boolean
}

const AlertDialog: React.FC<AlertDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  confirmText = "Confirmer",
  cancelText = "Annuler",
  onConfirm,
  variant = "default",
  isLoading = false,
}) => {
  const handleConfirm = () => {
    onConfirm()
    if (!isLoading) {
      onOpenChange(false)
    }
  }

  const confirmButtonClass = variant === "destructive"
    ? "bg-gradient-to-r from-[#EF4444] to-[#DC2626] hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]"
    : "bg-gradient-to-r from-[#5E6AD2] to-[#7C3AED] hover:shadow-[0_0_20px_rgba(94,106,210,0.4)]"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="sm" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <motion.button
            onClick={() => onOpenChange(false)}
            className="
              px-4 py-2 rounded-xl
              text-sm font-medium
              text-[var(--text-secondary)]
              hover:text-[var(--text-primary)]
              hover:bg-white/5
              transition-all duration-200
            "
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
          >
            {cancelText}
          </motion.button>
          <motion.button
            onClick={handleConfirm}
            className={`
              px-4 py-2 rounded-xl
              text-sm font-medium text-white
              ${confirmButtonClass}
              shadow-lg
              transition-all duration-200
              disabled:opacity-50
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Chargement...
              </span>
            ) : (
              confirmText
            )}
          </motion.button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// =============================================================================
// EXPORTS
// =============================================================================

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  AlertDialog,
}
