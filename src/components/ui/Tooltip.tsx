"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"

// =============================================================================
// CDS PLATFORM - PREMIUM TOOLTIP COMPONENT
// 21st.dev inspired with glassmorphism, animations, and smart positioning
// =============================================================================

// =============================================================================
// TYPES
// =============================================================================

export type TooltipPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end"

export interface TooltipProps {
  /** Tooltip content */
  content: React.ReactNode
  /** Trigger element */
  children: React.ReactElement
  /** Placement */
  placement?: TooltipPlacement
  /** Delay before showing (ms) */
  delayShow?: number
  /** Delay before hiding (ms) */
  delayHide?: number
  /** Visual variant */
  variant?: "default" | "glass" | "dark"
  /** Size */
  size?: "sm" | "default" | "lg"
  /** Disable tooltip */
  disabled?: boolean
  /** Show arrow */
  arrow?: boolean
  /** Additional class for tooltip */
  className?: string
  /** Offset from trigger (px) */
  offset?: number
}

// =============================================================================
// CONFIGURATION
// =============================================================================

const sizeConfig = {
  sm: {
    padding: "px-2 py-1",
    text: "text-xs",
    maxWidth: "max-w-[200px]",
  },
  default: {
    padding: "px-3 py-1.5",
    text: "text-sm",
    maxWidth: "max-w-[280px]",
  },
  lg: {
    padding: "px-4 py-2",
    text: "text-sm",
    maxWidth: "max-w-[360px]",
  },
}

const variantConfig = {
  default: `
    bg-[var(--bg-card)]/95
    backdrop-blur-xl
    border border-white/[0.08]
    text-[var(--text-primary)]
    shadow-[0_4px_20px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.05)]
  `,
  glass: `
    bg-white/10
    backdrop-blur-2xl
    border border-white/[0.12]
    text-white
    shadow-[0_8px_32px_rgba(0,0,0,0.4)]
  `,
  dark: `
    bg-[#0D0D0F]
    border border-white/[0.06]
    text-white
    shadow-[0_4px_20px_rgba(0,0,0,0.5)]
  `,
}

// =============================================================================
// POSITION CALCULATIONS
// =============================================================================

const getPlacementStyles = (placement: TooltipPlacement, offset: number) => {
  const positions: Record<TooltipPlacement, {
    position: string
    transform: string
    initial: { opacity: number; x: number; y: number; scale: number }
    animate: { opacity: number; x: number; y: number; scale: number }
  }> = {
    top: {
      position: `bottom-full left-1/2 mb-${offset / 4}`,
      transform: "-translate-x-1/2",
      initial: { opacity: 0, x: 0, y: 4, scale: 0.95 },
      animate: { opacity: 1, x: 0, y: 0, scale: 1 },
    },
    "top-start": {
      position: `bottom-full left-0 mb-${offset / 4}`,
      transform: "",
      initial: { opacity: 0, x: 0, y: 4, scale: 0.95 },
      animate: { opacity: 1, x: 0, y: 0, scale: 1 },
    },
    "top-end": {
      position: `bottom-full right-0 mb-${offset / 4}`,
      transform: "",
      initial: { opacity: 0, x: 0, y: 4, scale: 0.95 },
      animate: { opacity: 1, x: 0, y: 0, scale: 1 },
    },
    bottom: {
      position: `top-full left-1/2 mt-${offset / 4}`,
      transform: "-translate-x-1/2",
      initial: { opacity: 0, x: 0, y: -4, scale: 0.95 },
      animate: { opacity: 1, x: 0, y: 0, scale: 1 },
    },
    "bottom-start": {
      position: `top-full left-0 mt-${offset / 4}`,
      transform: "",
      initial: { opacity: 0, x: 0, y: -4, scale: 0.95 },
      animate: { opacity: 1, x: 0, y: 0, scale: 1 },
    },
    "bottom-end": {
      position: `top-full right-0 mt-${offset / 4}`,
      transform: "",
      initial: { opacity: 0, x: 0, y: -4, scale: 0.95 },
      animate: { opacity: 1, x: 0, y: 0, scale: 1 },
    },
    left: {
      position: `right-full top-1/2 mr-${offset / 4}`,
      transform: "-translate-y-1/2",
      initial: { opacity: 0, x: 4, y: 0, scale: 0.95 },
      animate: { opacity: 1, x: 0, y: 0, scale: 1 },
    },
    "left-start": {
      position: `right-full top-0 mr-${offset / 4}`,
      transform: "",
      initial: { opacity: 0, x: 4, y: 0, scale: 0.95 },
      animate: { opacity: 1, x: 0, y: 0, scale: 1 },
    },
    "left-end": {
      position: `right-full bottom-0 mr-${offset / 4}`,
      transform: "",
      initial: { opacity: 0, x: 4, y: 0, scale: 0.95 },
      animate: { opacity: 1, x: 0, y: 0, scale: 1 },
    },
    right: {
      position: `left-full top-1/2 ml-${offset / 4}`,
      transform: "-translate-y-1/2",
      initial: { opacity: 0, x: -4, y: 0, scale: 0.95 },
      animate: { opacity: 1, x: 0, y: 0, scale: 1 },
    },
    "right-start": {
      position: `left-full top-0 ml-${offset / 4}`,
      transform: "",
      initial: { opacity: 0, x: -4, y: 0, scale: 0.95 },
      animate: { opacity: 1, x: 0, y: 0, scale: 1 },
    },
    "right-end": {
      position: `left-full bottom-0 ml-${offset / 4}`,
      transform: "",
      initial: { opacity: 0, x: -4, y: 0, scale: 0.95 },
      animate: { opacity: 1, x: 0, y: 0, scale: 1 },
    },
  }

  return positions[placement]
}

const getArrowStyles = (placement: TooltipPlacement, variant: "default" | "glass" | "dark") => {
  const arrowColor = variant === "glass"
    ? "border-white/10"
    : variant === "dark"
      ? "border-[#0D0D0F]"
      : "border-[var(--bg-card)]"

  const baseStyles: Record<string, string> = {
    top: `absolute left-1/2 -translate-x-1/2 top-full border-4 ${arrowColor} border-b-transparent border-l-transparent border-r-transparent`,
    "top-start": `absolute left-4 top-full border-4 ${arrowColor} border-b-transparent border-l-transparent border-r-transparent`,
    "top-end": `absolute right-4 top-full border-4 ${arrowColor} border-b-transparent border-l-transparent border-r-transparent`,
    bottom: `absolute left-1/2 -translate-x-1/2 bottom-full border-4 ${arrowColor} border-t-transparent border-l-transparent border-r-transparent`,
    "bottom-start": `absolute left-4 bottom-full border-4 ${arrowColor} border-t-transparent border-l-transparent border-r-transparent`,
    "bottom-end": `absolute right-4 bottom-full border-4 ${arrowColor} border-t-transparent border-l-transparent border-r-transparent`,
    left: `absolute top-1/2 -translate-y-1/2 left-full border-4 ${arrowColor} border-r-transparent border-t-transparent border-b-transparent`,
    "left-start": `absolute top-2 left-full border-4 ${arrowColor} border-r-transparent border-t-transparent border-b-transparent`,
    "left-end": `absolute bottom-2 left-full border-4 ${arrowColor} border-r-transparent border-t-transparent border-b-transparent`,
    right: `absolute top-1/2 -translate-y-1/2 right-full border-4 ${arrowColor} border-l-transparent border-t-transparent border-b-transparent`,
    "right-start": `absolute top-2 right-full border-4 ${arrowColor} border-l-transparent border-t-transparent border-b-transparent`,
    "right-end": `absolute bottom-2 right-full border-4 ${arrowColor} border-l-transparent border-t-transparent border-b-transparent`,
  }

  return baseStyles[placement] || baseStyles.top
}

// =============================================================================
// TOOLTIP COMPONENT
// =============================================================================

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  placement = "top",
  delayShow = 200,
  delayHide = 0,
  variant = "default",
  size = "default",
  disabled = false,
  arrow = true,
  className = "",
  offset = 8,
}) => {
  const [isVisible, setIsVisible] = React.useState(false)
  const showTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const hideTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const config = sizeConfig[size]
  const placementConfig = getPlacementStyles(placement, offset)

  const handleMouseEnter = () => {
    if (disabled) return
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)
    showTimeoutRef.current = setTimeout(() => {
      setIsVisible(true)
    }, delayShow)
  }

  const handleMouseLeave = () => {
    if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current)
    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false)
    }, delayHide)
  }

  // Cleanup timeouts
  React.useEffect(() => {
    return () => {
      if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current)
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)
    }
  }, [])

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      {children}

      <AnimatePresence>
        {isVisible && content && (
          <motion.div
            initial={placementConfig.initial}
            animate={placementConfig.animate}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              duration: 0.15,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className={`
              absolute z-50
              ${placementConfig.position}
              ${placementConfig.transform}
              ${config.padding}
              ${config.text}
              ${config.maxWidth}
              ${variantConfig[variant]}
              rounded-lg
              pointer-events-none
              ${className}
            `}
            role="tooltip"
          >
            {/* Subtle glow */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

            {/* Content */}
            <div className="relative">{content}</div>

            {/* Arrow */}
            {arrow && (
              <div className={getArrowStyles(placement, variant)} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// =============================================================================
// TOOLTIP WITH RICH CONTENT
// =============================================================================

export interface RichTooltipProps extends Omit<TooltipProps, "content"> {
  /** Title */
  title?: string
  /** Description */
  description?: string
  /** Custom content */
  children: React.ReactElement
  /** Trigger content */
  content?: React.ReactNode
  /** Shortcut keys */
  shortcut?: string[]
  /** Image/Icon */
  media?: React.ReactNode
}

const RichTooltip: React.FC<RichTooltipProps> = ({
  title,
  description,
  shortcut,
  media,
  children,
  content,
  ...props
}) => {
  const tooltipContent = (
    <div className="space-y-2">
      {media && (
        <div className="flex justify-center pb-1">
          {media}
        </div>
      )}

      {title && (
        <div className="flex items-center justify-between gap-4">
          <span className="font-semibold text-[var(--text-primary)]">{title}</span>
          {shortcut && shortcut.length > 0 && (
            <div className="flex items-center gap-1">
              {shortcut.map((key, index) => (
                <kbd
                  key={index}
                  className="
                    px-1.5 py-0.5
                    text-[10px] font-mono
                    bg-white/10
                    border border-white/[0.08]
                    rounded
                    text-[var(--text-muted)]
                  "
                >
                  {key}
                </kbd>
              ))}
            </div>
          )}
        </div>
      )}

      {description && (
        <p className="text-[var(--text-secondary)] leading-relaxed">
          {description}
        </p>
      )}

      {content}
    </div>
  )

  return (
    <Tooltip content={tooltipContent} size="lg" {...props}>
      {children}
    </Tooltip>
  )
}

// =============================================================================
// TOOLTIP PROVIDER - For global tooltip configuration
// =============================================================================

interface TooltipConfig {
  delayShow: number
  delayHide: number
  variant: "default" | "glass" | "dark"
}

const TooltipContext = React.createContext<TooltipConfig>({
  delayShow: 200,
  delayHide: 0,
  variant: "default",
})

export const useTooltipConfig = () => React.useContext(TooltipContext)

export interface TooltipProviderProps {
  children: React.ReactNode
  /** Default delay before showing */
  delayShow?: number
  /** Default delay before hiding */
  delayHide?: number
  /** Default variant */
  variant?: "default" | "glass" | "dark"
}

const TooltipProvider: React.FC<TooltipProviderProps> = ({
  children,
  delayShow = 200,
  delayHide = 0,
  variant = "default",
}) => {
  return (
    <TooltipContext.Provider value={{ delayShow, delayHide, variant }}>
      {children}
    </TooltipContext.Provider>
  )
}

// =============================================================================
// EXPORTS
// =============================================================================

export { Tooltip, RichTooltip, TooltipProvider }
