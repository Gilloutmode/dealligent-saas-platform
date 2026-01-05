"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Check, Minus } from "lucide-react"

// =============================================================================
// CDS PLATFORM - PREMIUM FORM CONTROLS
// 21st.dev inspired Switch, Checkbox, Radio with glassmorphism and animations
// =============================================================================

// =============================================================================
// SWITCH COMPONENT
// =============================================================================

export interface SwitchProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, "onChange" | "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  /** Controlled checked state */
  checked?: boolean
  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean
  /** Change callback */
  onCheckedChange?: (checked: boolean) => void
  /** Disabled state */
  disabled?: boolean
  /** Size variant */
  size?: "sm" | "default" | "lg"
  /** Color variant */
  variant?: "default" | "success" | "warning" | "danger"
  /** Label text */
  label?: string
  /** Description text */
  description?: string
}

const switchSizeConfig = {
  sm: {
    track: "w-8 h-[18px]",
    thumb: "w-3.5 h-3.5",
    thumbTranslate: "translateX(14px)",
    label: "text-sm",
    description: "text-xs",
  },
  default: {
    track: "w-11 h-6",
    thumb: "w-5 h-5",
    thumbTranslate: "translateX(20px)",
    label: "text-sm",
    description: "text-xs",
  },
  lg: {
    track: "w-14 h-7",
    thumb: "w-6 h-6",
    thumbTranslate: "translateX(28px)",
    label: "text-base",
    description: "text-sm",
  },
}

const switchVariantConfig = {
  default: {
    active: "bg-gradient-to-r from-[#5E6AD2] to-[#7C3AED]",
    glow: "shadow-[0_0_12px_rgba(94,106,210,0.5)]",
  },
  success: {
    active: "bg-gradient-to-r from-[#10B981] to-[#34D399]",
    glow: "shadow-[0_0_12px_rgba(16,185,129,0.5)]",
  },
  warning: {
    active: "bg-gradient-to-r from-[#F59E0B] to-[#FBBF24]",
    glow: "shadow-[0_0_12px_rgba(245,158,11,0.5)]",
  },
  danger: {
    active: "bg-gradient-to-r from-[#EF4444] to-[#F87171]",
    glow: "shadow-[0_0_12px_rgba(239,68,68,0.5)]",
  },
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className = "",
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      disabled = false,
      size = "default",
      variant = "default",
      label,
      description,
      ...props
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked)
    const isControlled = controlledChecked !== undefined
    const isChecked = isControlled ? controlledChecked : internalChecked

    const sizeConfig = switchSizeConfig[size]
    const variantConfig = switchVariantConfig[variant]

    const handleToggle = () => {
      if (disabled) return
      const newValue = !isChecked
      if (!isControlled) {
        setInternalChecked(newValue)
      }
      onCheckedChange?.(newValue)
    }

    const switchElement = (
      <motion.button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isChecked}
        disabled={disabled}
        onClick={handleToggle}
        className={`
          relative inline-flex shrink-0 cursor-pointer rounded-full
          ${sizeConfig.track}
          ${isChecked
            ? `${variantConfig.active} ${variantConfig.glow}`
            : "bg-[var(--bg-elevated)] border border-white/[0.08]"
          }
          transition-all duration-300 ease-in-out
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]/50
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          ${className}
        `}
        whileTap={disabled ? undefined : { scale: 0.95 }}
        {...props}
      >
        {/* Track glow effect */}
        {isChecked && (
          <div className={`
            absolute inset-0 rounded-full
            ${variantConfig.active}
            opacity-30 blur-md -z-10
          `} />
        )}

        {/* Thumb */}
        <motion.span
          className={`
            ${sizeConfig.thumb}
            absolute top-0.5 left-0.5
            bg-white rounded-full
            shadow-[0_2px_4px_rgba(0,0,0,0.2)]
          `}
          animate={{
            x: isChecked ? parseInt(sizeConfig.thumbTranslate.match(/\d+/)?.[0] || "20") : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        />
      </motion.button>
    )

    if (label || description) {
      return (
        <label className={`
          inline-flex items-start gap-3 cursor-pointer
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}>
          {switchElement}
          <div className="flex flex-col">
            {label && (
              <span className={`${sizeConfig.label} font-medium text-[var(--text-primary)]`}>
                {label}
              </span>
            )}
            {description && (
              <span className={`${sizeConfig.description} text-[var(--text-muted)] mt-0.5`}>
                {description}
              </span>
            )}
          </div>
        </label>
      )
    }

    return switchElement
  }
)

Switch.displayName = "Switch"

// =============================================================================
// CHECKBOX COMPONENT
// =============================================================================

export interface CheckboxProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, "onChange" | "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  /** Controlled checked state */
  checked?: boolean
  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean
  /** Indeterminate state */
  indeterminate?: boolean
  /** Change callback */
  onCheckedChange?: (checked: boolean) => void
  /** Disabled state */
  disabled?: boolean
  /** Size variant */
  size?: "sm" | "default" | "lg"
  /** Color variant */
  variant?: "default" | "success" | "warning" | "danger"
  /** Label text */
  label?: string
  /** Description text */
  description?: string
}

const checkboxSizeConfig = {
  sm: {
    box: "w-4 h-4",
    icon: "w-2.5 h-2.5",
    label: "text-sm",
    description: "text-xs",
  },
  default: {
    box: "w-5 h-5",
    icon: "w-3 h-3",
    label: "text-sm",
    description: "text-xs",
  },
  lg: {
    box: "w-6 h-6",
    icon: "w-4 h-4",
    label: "text-base",
    description: "text-sm",
  },
}

const checkboxVariantConfig = {
  default: {
    checked: "bg-gradient-to-br from-[#5E6AD2] to-[#7C3AED]",
    glow: "shadow-[0_0_10px_rgba(94,106,210,0.4)]",
  },
  success: {
    checked: "bg-gradient-to-br from-[#10B981] to-[#34D399]",
    glow: "shadow-[0_0_10px_rgba(16,185,129,0.4)]",
  },
  warning: {
    checked: "bg-gradient-to-br from-[#F59E0B] to-[#FBBF24]",
    glow: "shadow-[0_0_10px_rgba(245,158,11,0.4)]",
  },
  danger: {
    checked: "bg-gradient-to-br from-[#EF4444] to-[#F87171]",
    glow: "shadow-[0_0_10px_rgba(239,68,68,0.4)]",
  },
}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      className = "",
      checked: controlledChecked,
      defaultChecked = false,
      indeterminate = false,
      onCheckedChange,
      disabled = false,
      size = "default",
      variant = "default",
      label,
      description,
      ...props
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked)
    const isControlled = controlledChecked !== undefined
    const isChecked = isControlled ? controlledChecked : internalChecked

    const sizeConfig = checkboxSizeConfig[size]
    const variantConfig = checkboxVariantConfig[variant]

    const handleToggle = () => {
      if (disabled) return
      const newValue = !isChecked
      if (!isControlled) {
        setInternalChecked(newValue)
      }
      onCheckedChange?.(newValue)
    }

    const checkboxElement = (
      <motion.button
        ref={ref}
        type="button"
        role="checkbox"
        aria-checked={indeterminate ? "mixed" : isChecked}
        disabled={disabled}
        onClick={handleToggle}
        className={`
          relative inline-flex items-center justify-center shrink-0
          ${sizeConfig.box}
          rounded-md
          ${isChecked || indeterminate
            ? `${variantConfig.checked} ${variantConfig.glow}`
            : "bg-[var(--bg-elevated)] border border-white/[0.12] hover:border-white/[0.2]"
          }
          transition-all duration-200
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]/50
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          ${className}
        `}
        whileHover={disabled ? undefined : { scale: 1.05 }}
        whileTap={disabled ? undefined : { scale: 0.9 }}
        {...props}
      >
        {/* Check/Indeterminate icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: isChecked || indeterminate ? 1 : 0,
            scale: isChecked || indeterminate ? 1 : 0.5,
          }}
          transition={{ duration: 0.15 }}
          className="text-white"
        >
          {indeterminate ? (
            <Minus className={sizeConfig.icon} strokeWidth={3} />
          ) : (
            <Check className={sizeConfig.icon} strokeWidth={3} />
          )}
        </motion.div>
      </motion.button>
    )

    if (label || description) {
      return (
        <label className={`
          inline-flex items-start gap-3 cursor-pointer
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}>
          {checkboxElement}
          <div className="flex flex-col">
            {label && (
              <span className={`${sizeConfig.label} font-medium text-[var(--text-primary)]`}>
                {label}
              </span>
            )}
            {description && (
              <span className={`${sizeConfig.description} text-[var(--text-muted)] mt-0.5`}>
                {description}
              </span>
            )}
          </div>
        </label>
      )
    }

    return checkboxElement
  }
)

Checkbox.displayName = "Checkbox"

// =============================================================================
// RADIO GROUP COMPONENT
// =============================================================================

interface RadioContextValue {
  value: string
  onValueChange: (value: string) => void
  disabled?: boolean
  size: "sm" | "default" | "lg"
  variant: "default" | "success" | "warning" | "danger"
}

const RadioContext = React.createContext<RadioContextValue | null>(null)

const useRadioContext = () => {
  const context = React.useContext(RadioContext)
  if (!context) {
    throw new Error("Radio must be used within a RadioGroup")
  }
  return context
}

export interface RadioGroupProps {
  /** Current value */
  value?: string
  /** Default value (uncontrolled) */
  defaultValue?: string
  /** Change callback */
  onValueChange?: (value: string) => void
  /** Disabled state */
  disabled?: boolean
  /** Size variant */
  size?: "sm" | "default" | "lg"
  /** Color variant */
  variant?: "default" | "success" | "warning" | "danger"
  /** Orientation */
  orientation?: "horizontal" | "vertical"
  /** Children (Radio items) */
  children: React.ReactNode
  /** Class name */
  className?: string
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  disabled = false,
  size = "default",
  variant = "default",
  orientation = "vertical",
  children,
  className = "",
}) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const isControlled = controlledValue !== undefined
  const currentValue = isControlled ? controlledValue : internalValue

  const handleValueChange = (newValue: string) => {
    if (disabled) return
    if (!isControlled) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue)
  }

  return (
    <RadioContext.Provider
      value={{
        value: currentValue,
        onValueChange: handleValueChange,
        disabled,
        size,
        variant,
      }}
    >
      <div
        role="radiogroup"
        className={`
          flex ${orientation === "vertical" ? "flex-col gap-3" : "flex-row flex-wrap gap-4"}
          ${className}
        `}
      >
        {children}
      </div>
    </RadioContext.Provider>
  )
}

// =============================================================================
// RADIO ITEM COMPONENT
// =============================================================================

export interface RadioProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, "value" | "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  /** Radio value */
  value: string
  /** Label text */
  label?: string
  /** Description text */
  description?: string
  /** Disabled (overrides group) */
  disabled?: boolean
}

const radioSizeConfig = {
  sm: {
    outer: "w-4 h-4",
    inner: "w-2 h-2",
    label: "text-sm",
    description: "text-xs",
  },
  default: {
    outer: "w-5 h-5",
    inner: "w-2.5 h-2.5",
    label: "text-sm",
    description: "text-xs",
  },
  lg: {
    outer: "w-6 h-6",
    inner: "w-3 h-3",
    label: "text-base",
    description: "text-sm",
  },
}

const radioVariantConfig = {
  default: {
    checked: "border-[#5E6AD2]",
    dot: "bg-gradient-to-br from-[#5E6AD2] to-[#7C3AED]",
    glow: "shadow-[0_0_8px_rgba(94,106,210,0.4)]",
  },
  success: {
    checked: "border-[#10B981]",
    dot: "bg-gradient-to-br from-[#10B981] to-[#34D399]",
    glow: "shadow-[0_0_8px_rgba(16,185,129,0.4)]",
  },
  warning: {
    checked: "border-[#F59E0B]",
    dot: "bg-gradient-to-br from-[#F59E0B] to-[#FBBF24]",
    glow: "shadow-[0_0_8px_rgba(245,158,11,0.4)]",
  },
  danger: {
    checked: "border-[#EF4444]",
    dot: "bg-gradient-to-br from-[#EF4444] to-[#F87171]",
    glow: "shadow-[0_0_8px_rgba(239,68,68,0.4)]",
  },
}

const Radio = React.forwardRef<HTMLButtonElement, RadioProps>(
  ({ className = "", value, label, description, disabled: itemDisabled, ...props }, ref) => {
    const context = useRadioContext()
    const isChecked = context.value === value
    const isDisabled = itemDisabled ?? context.disabled

    const sizeConfig = radioSizeConfig[context.size]
    const variantConfig = radioVariantConfig[context.variant]

    const radioElement = (
      <motion.button
        ref={ref}
        type="button"
        role="radio"
        aria-checked={isChecked}
        disabled={isDisabled}
        onClick={() => context.onValueChange(value)}
        className={`
          relative inline-flex items-center justify-center shrink-0
          ${sizeConfig.outer}
          rounded-full
          border-2
          ${isChecked
            ? `${variantConfig.checked} ${variantConfig.glow}`
            : "border-white/[0.15] hover:border-white/[0.25]"
          }
          bg-[var(--bg-elevated)]
          transition-all duration-200
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]/50
          ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          ${className}
        `}
        whileHover={isDisabled ? undefined : { scale: 1.05 }}
        whileTap={isDisabled ? undefined : { scale: 0.9 }}
        {...props}
      >
        {/* Inner dot */}
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: isChecked ? 1 : 0,
            scale: isChecked ? 1 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
          className={`
            ${sizeConfig.inner}
            rounded-full
            ${variantConfig.dot}
          `}
        />
      </motion.button>
    )

    if (label || description) {
      return (
        <label className={`
          inline-flex items-start gap-3 cursor-pointer
          ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
        `}>
          {radioElement}
          <div className="flex flex-col">
            {label && (
              <span className={`${sizeConfig.label} font-medium text-[var(--text-primary)]`}>
                {label}
              </span>
            )}
            {description && (
              <span className={`${sizeConfig.description} text-[var(--text-muted)] mt-0.5`}>
                {description}
              </span>
            )}
          </div>
        </label>
      )
    }

    return radioElement
  }
)

Radio.displayName = "Radio"

// =============================================================================
// RADIO CARD COMPONENT - Premium card-style radio selection
// =============================================================================

export interface RadioCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "value" | "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  /** Radio value */
  value: string
  /** Title text */
  title: string
  /** Description text */
  description?: string
  /** Icon */
  icon?: React.ReactNode
  /** Disabled */
  disabled?: boolean
}

const RadioCard = React.forwardRef<HTMLDivElement, RadioCardProps>(
  ({ className = "", value, title, description, icon, disabled: itemDisabled, ...props }, ref) => {
    const context = useRadioContext()
    const isChecked = context.value === value
    const isDisabled = itemDisabled ?? context.disabled
    const variantConfig = radioVariantConfig[context.variant]

    return (
      <motion.div
        ref={ref}
        role="radio"
        aria-checked={isChecked}
        onClick={() => !isDisabled && context.onValueChange(value)}
        className={`
          relative p-4 rounded-xl cursor-pointer
          ${isChecked
            ? `
              bg-[var(--bg-card)]
              border-2 ${variantConfig.checked}
              ${variantConfig.glow}
            `
            : `
              bg-[var(--bg-elevated)]/50
              border border-white/[0.06]
              hover:border-white/[0.12]
              hover:bg-[var(--bg-elevated)]/70
            `
          }
          transition-all duration-200
          ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
          ${className}
        `}
        whileHover={isDisabled ? undefined : { scale: 1.01 }}
        whileTap={isDisabled ? undefined : { scale: 0.99 }}
        {...props}
      >
        {/* Glow effect when checked */}
        {isChecked && (
          <div className={`
            absolute -inset-1 rounded-xl
            ${variantConfig.dot}
            opacity-10 blur-md -z-10
          `} />
        )}

        <div className="flex items-start gap-3">
          {/* Radio indicator */}
          <div className={`
            flex-shrink-0 mt-0.5
            w-5 h-5 rounded-full
            border-2
            ${isChecked ? variantConfig.checked : "border-white/[0.15]"}
            flex items-center justify-center
            transition-colors duration-200
          `}>
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: isChecked ? 1 : 0,
                scale: isChecked ? 1 : 0,
              }}
              className={`w-2.5 h-2.5 rounded-full ${variantConfig.dot}`}
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              {icon && (
                <span className={isChecked ? "text-[var(--accent-primary)]" : "text-[var(--text-muted)]"}>
                  {icon}
                </span>
              )}
              <span className="text-sm font-semibold text-[var(--text-primary)]">
                {title}
              </span>
            </div>
            {description && (
              <p className="mt-1 text-xs text-[var(--text-secondary)]">
                {description}
              </p>
            )}
          </div>

          {/* Check badge when selected */}
          {isChecked && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`
                flex-shrink-0
                w-5 h-5 rounded-full
                ${variantConfig.dot}
                flex items-center justify-center
              `}
            >
              <Check className="w-3 h-3 text-white" strokeWidth={3} />
            </motion.div>
          )}
        </div>
      </motion.div>
    )
  }
)

RadioCard.displayName = "RadioCard"

// =============================================================================
// EXPORTS
// =============================================================================

export { Switch, Checkbox, RadioGroup, Radio, RadioCard }
