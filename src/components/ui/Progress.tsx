"use client"

import * as React from "react"
import { motion } from "framer-motion"

// =============================================================================
// CDS PLATFORM - PREMIUM PROGRESS COMPONENTS
// 21st.dev inspired with gradients, animations, and glassmorphism
// =============================================================================

// =============================================================================
// TYPES
// =============================================================================

export interface ProgressProps {
  /** Progress value (0-100) */
  value?: number
  /** Maximum value */
  max?: number
  /** Indeterminate loading state */
  indeterminate?: boolean
  /** Size variant */
  size?: "sm" | "default" | "lg"
  /** Color variant */
  variant?: "default" | "success" | "warning" | "danger" | "gradient"
  /** Show label */
  showLabel?: boolean
  /** Custom label */
  label?: string
  /** Animate on mount */
  animated?: boolean
  /** Striped pattern */
  striped?: boolean
  /** Animated stripes */
  stripedAnimated?: boolean
  /** Additional class name */
  className?: string
}

// =============================================================================
// CONFIGURATION
// =============================================================================

const sizeConfig = {
  sm: {
    track: "h-1.5",
    label: "text-xs",
  },
  default: {
    track: "h-2.5",
    label: "text-sm",
  },
  lg: {
    track: "h-4",
    label: "text-base",
  },
}

const variantConfig = {
  default: {
    bar: "bg-gradient-to-r from-[#5E6AD2] to-[#7C85DE]",
    glow: "shadow-[0_0_12px_rgba(94,106,210,0.5)]",
  },
  success: {
    bar: "bg-gradient-to-r from-[#10B981] to-[#34D399]",
    glow: "shadow-[0_0_12px_rgba(16,185,129,0.5)]",
  },
  warning: {
    bar: "bg-gradient-to-r from-[#F59E0B] to-[#FBBF24]",
    glow: "shadow-[0_0_12px_rgba(245,158,11,0.5)]",
  },
  danger: {
    bar: "bg-gradient-to-r from-[#EF4444] to-[#F87171]",
    glow: "shadow-[0_0_12px_rgba(239,68,68,0.5)]",
  },
  gradient: {
    bar: "bg-gradient-to-r from-[#5E6AD2] via-[#8B5CF6] to-[#EC4899]",
    glow: "shadow-[0_0_16px_rgba(139,92,246,0.4)]",
  },
}

// =============================================================================
// PROGRESS BAR COMPONENT
// =============================================================================

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value = 0,
      max = 100,
      indeterminate = false,
      size = "default",
      variant = "default",
      showLabel = false,
      label,
      animated = true,
      striped = false,
      stripedAnimated = false,
      className = "",
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
    const config = sizeConfig[size]
    const variantStyles = variantConfig[variant]

    const displayLabel = label || `${Math.round(percentage)}%`

    return (
      <div ref={ref} className={`w-full ${className}`}>
        {/* Label */}
        {showLabel && (
          <div className="flex items-center justify-between mb-2">
            <span className={`${config.label} font-medium text-[var(--text-primary)]`}>
              {displayLabel}
            </span>
            {!label && (
              <span className={`${config.label} text-[var(--text-muted)]`}>
                {value}/{max}
              </span>
            )}
          </div>
        )}

        {/* Track */}
        <div
          className={`
            relative overflow-hidden rounded-full
            ${config.track}
            bg-[var(--bg-elevated)]
            border border-white/[0.06]
          `}
          role="progressbar"
          aria-valuenow={indeterminate ? undefined : value}
          aria-valuemin={0}
          aria-valuemax={max}
        >
          {/* Progress bar */}
          {indeterminate ? (
            // Indeterminate animation
            <motion.div
              className={`
                absolute inset-y-0 w-1/3 rounded-full
                ${variantStyles.bar}
                ${variantStyles.glow}
              `}
              animate={{
                x: ["-100%", "400%"],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ) : (
            <motion.div
              className={`
                h-full rounded-full
                ${variantStyles.bar}
                ${variantStyles.glow}
                ${striped || stripedAnimated ? "bg-[length:1rem_1rem]" : ""}
                ${striped || stripedAnimated
                  ? `bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)]`
                  : ""
                }
              `}
              initial={animated ? { width: 0 } : false}
              animate={{ width: `${percentage}%` }}
              transition={{
                duration: animated ? 0.6 : 0,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              style={stripedAnimated ? {
                animation: "progress-stripes 1s linear infinite",
              } : undefined}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent" />
            </motion.div>
          )}
        </div>
      </div>
    )
  }
)

Progress.displayName = "Progress"

// =============================================================================
// CIRCULAR PROGRESS COMPONENT
// =============================================================================

export interface CircularProgressProps {
  /** Progress value (0-100) */
  value?: number
  /** Maximum value */
  max?: number
  /** Indeterminate loading state */
  indeterminate?: boolean
  /** Size in pixels */
  size?: number
  /** Stroke width in pixels */
  strokeWidth?: number
  /** Color variant */
  variant?: "default" | "success" | "warning" | "danger" | "gradient"
  /** Show label in center */
  showLabel?: boolean
  /** Custom label */
  label?: React.ReactNode
  /** Track color */
  trackColor?: string
  /** Additional class name */
  className?: string
}

const circularVariantConfig = {
  default: {
    stroke: "stroke-[#5E6AD2]",
    gradient: ["#5E6AD2", "#7C85DE"],
  },
  success: {
    stroke: "stroke-[#10B981]",
    gradient: ["#10B981", "#34D399"],
  },
  warning: {
    stroke: "stroke-[#F59E0B]",
    gradient: ["#F59E0B", "#FBBF24"],
  },
  danger: {
    stroke: "stroke-[#EF4444]",
    gradient: ["#EF4444", "#F87171"],
  },
  gradient: {
    stroke: "stroke-[url(#progress-gradient)]",
    gradient: ["#5E6AD2", "#8B5CF6", "#EC4899"],
  },
}

const CircularProgress = React.forwardRef<SVGSVGElement, CircularProgressProps>(
  (
    {
      value = 0,
      max = 100,
      indeterminate = false,
      size = 48,
      strokeWidth = 4,
      variant = "default",
      showLabel = false,
      label,
      trackColor = "rgba(255,255,255,0.1)",
      className = "",
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const offset = circumference - (percentage / 100) * circumference

    const variantStyles = circularVariantConfig[variant]
    const gradientId = React.useId()

    return (
      <div className={`relative inline-flex items-center justify-center ${className}`}>
        <svg
          ref={ref}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className={indeterminate ? "animate-spin" : ""}
          style={{ transform: "rotate(-90deg)" }}
        >
          {/* Gradient definition */}
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              {variantStyles.gradient.map((color, index) => (
                <stop
                  key={index}
                  offset={`${(index / (variantStyles.gradient.length - 1)) * 100}%`}
                  stopColor={color}
                />
              ))}
            </linearGradient>
          </defs>

          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={trackColor}
            strokeWidth={strokeWidth}
          />

          {/* Progress */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{
              strokeDashoffset: indeterminate
                ? [circumference, circumference * 0.25, circumference]
                : offset,
            }}
            transition={
              indeterminate
                ? {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                : {
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }
            }
            style={{
              filter: `drop-shadow(0 0 6px ${variantStyles.gradient[0]}50)`,
            }}
          />
        </svg>

        {/* Center label */}
        {showLabel && (
          <div className="absolute inset-0 flex items-center justify-center">
            {label || (
              <span className="text-sm font-semibold text-[var(--text-primary)]">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}
      </div>
    )
  }
)

CircularProgress.displayName = "CircularProgress"

// =============================================================================
// STEP PROGRESS COMPONENT
// =============================================================================

export interface Step {
  id: string
  label: string
  description?: string
  icon?: React.ReactNode
}

export interface StepProgressProps {
  /** Steps configuration */
  steps: Step[]
  /** Current step index (0-based) */
  currentStep: number
  /** Step click handler */
  onStepClick?: (index: number) => void
  /** Allow clicking completed steps */
  clickable?: boolean
  /** Size variant */
  size?: "sm" | "default" | "lg"
  /** Orientation */
  orientation?: "horizontal" | "vertical"
  /** Color variant */
  variant?: "default" | "success" | "gradient"
  /** Additional class name */
  className?: string
}

const stepSizeConfig = {
  sm: {
    circle: "w-6 h-6 text-xs",
    connector: "h-0.5",
    connectorVertical: "w-0.5",
    label: "text-xs",
    description: "text-[10px]",
  },
  default: {
    circle: "w-8 h-8 text-sm",
    connector: "h-0.5",
    connectorVertical: "w-0.5",
    label: "text-sm",
    description: "text-xs",
  },
  lg: {
    circle: "w-10 h-10 text-base",
    connector: "h-1",
    connectorVertical: "w-1",
    label: "text-base",
    description: "text-sm",
  },
}

const stepVariantConfig = {
  default: {
    active: "bg-gradient-to-br from-[#5E6AD2] to-[#7C3AED]",
    completed: "bg-gradient-to-br from-[#5E6AD2] to-[#7C3AED]",
    connector: "bg-[#5E6AD2]",
    glow: "shadow-[0_0_12px_rgba(94,106,210,0.5)]",
  },
  success: {
    active: "bg-gradient-to-br from-[#10B981] to-[#34D399]",
    completed: "bg-gradient-to-br from-[#10B981] to-[#34D399]",
    connector: "bg-[#10B981]",
    glow: "shadow-[0_0_12px_rgba(16,185,129,0.5)]",
  },
  gradient: {
    active: "bg-gradient-to-br from-[#5E6AD2] via-[#8B5CF6] to-[#EC4899]",
    completed: "bg-gradient-to-br from-[#5E6AD2] via-[#8B5CF6] to-[#EC4899]",
    connector: "bg-gradient-to-r from-[#5E6AD2] to-[#EC4899]",
    glow: "shadow-[0_0_12px_rgba(139,92,246,0.5)]",
  },
}

const StepProgress: React.FC<StepProgressProps> = ({
  steps,
  currentStep,
  onStepClick,
  clickable = false,
  size = "default",
  orientation = "horizontal",
  variant = "default",
  className = "",
}) => {
  const config = stepSizeConfig[size]
  const variantStyles = stepVariantConfig[variant]

  const getStepStatus = (index: number) => {
    if (index < currentStep) return "completed"
    if (index === currentStep) return "active"
    return "upcoming"
  }

  return (
    <div
      className={`
        flex ${orientation === "vertical" ? "flex-col" : "flex-row items-center"}
        ${className}
      `}
    >
      {steps.map((step, index) => {
        const status = getStepStatus(index)
        const isClickable = clickable && (status === "completed" || status === "active")

        return (
          <React.Fragment key={step.id}>
            {/* Step */}
            <div
              className={`
                flex ${orientation === "vertical" ? "flex-row items-start" : "flex-col items-center"}
                ${orientation === "vertical" ? "gap-3" : "gap-2"}
              `}
            >
              {/* Circle */}
              <motion.button
                onClick={() => isClickable && onStepClick?.(index)}
                disabled={!isClickable}
                className={`
                  ${config.circle}
                  rounded-full
                  flex items-center justify-center
                  font-semibold
                  transition-all duration-300
                  ${status === "completed" || status === "active"
                    ? `${variantStyles.active} ${variantStyles.glow} text-white`
                    : "bg-[var(--bg-elevated)] border border-white/[0.1] text-[var(--text-muted)]"
                  }
                  ${isClickable ? "cursor-pointer hover:scale-105" : "cursor-default"}
                `}
                whileHover={isClickable ? { scale: 1.05 } : undefined}
                whileTap={isClickable ? { scale: 0.95 } : undefined}
              >
                {step.icon || (status === "completed" ? "✓" : index + 1)}
              </motion.button>

              {/* Label & Description */}
              <div className={`
                ${orientation === "horizontal" ? "text-center" : ""}
                ${orientation === "vertical" ? "pb-4" : ""}
              `}>
                <span className={`
                  ${config.label} font-medium block
                  ${status === "active"
                    ? "text-[var(--text-primary)]"
                    : status === "completed"
                      ? "text-[var(--text-secondary)]"
                      : "text-[var(--text-muted)]"
                  }
                `}>
                  {step.label}
                </span>
                {step.description && (
                  <span className={`${config.description} text-[var(--text-muted)] block mt-0.5`}>
                    {step.description}
                  </span>
                )}
              </div>
            </div>

            {/* Connector */}
            {index < steps.length - 1 && (
              <div
                className={`
                  ${orientation === "horizontal"
                    ? `flex-1 ${config.connector} mx-2 min-w-[20px]`
                    : `${config.connectorVertical} ml-4 my-2 h-8`
                  }
                  rounded-full overflow-hidden
                  bg-[var(--bg-elevated)]
                `}
              >
                <motion.div
                  className={`
                    ${orientation === "horizontal" ? "h-full" : "w-full"}
                    ${variantStyles.connector}
                    rounded-full
                  `}
                  initial={{ width: orientation === "horizontal" ? 0 : "100%", height: orientation === "vertical" ? 0 : "100%" }}
                  animate={{
                    width: orientation === "horizontal" ? (index < currentStep ? "100%" : "0%") : "100%",
                    height: orientation === "vertical" ? (index < currentStep ? "100%" : "0%") : "100%",
                  }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              </div>
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

// =============================================================================
// KEYFRAMES FOR STRIPED ANIMATION
// =============================================================================

const styleSheet = typeof document !== "undefined" && document.styleSheets[0]
if (styleSheet) {
  try {
    styleSheet.insertRule(`
      @keyframes progress-stripes {
        from { background-position: 1rem 0; }
        to { background-position: 0 0; }
      }
    `, styleSheet.cssRules.length)
  } catch {
    // Style already exists or can't be inserted
  }
}

// =============================================================================
// EXPORTS
// =============================================================================

export { Progress, CircularProgress, StepProgress }
