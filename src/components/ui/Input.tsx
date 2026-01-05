"use client"

import * as React from "react"
import { Eye, EyeOff, Search, X } from "lucide-react"

// =============================================================================
// CDS PLATFORM - PREMIUM INPUT COMPONENT
// 21st.dev inspired glassmorphism with glow effects
// =============================================================================

// =============================================================================
// INPUT PROPS
// =============================================================================

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Input size variant */
  size?: "sm" | "default" | "lg"
  /** Visual variant */
  variant?: "default" | "glass" | "ghost" | "filled"
  /** Error state */
  error?: boolean
  /** Error message to display */
  errorMessage?: string
  /** Success state */
  success?: boolean
  /** Left icon */
  leftIcon?: React.ReactNode
  /** Right icon */
  rightIcon?: React.ReactNode
  /** Show clear button when has value */
  clearable?: boolean
  /** Callback when clear button is clicked */
  onClear?: () => void
  /** Full width */
  fullWidth?: boolean
  /** Glow color on focus */
  glowColor?: "primary" | "success" | "warning" | "danger"
}

// =============================================================================
// SIZE CONFIGURATIONS
// =============================================================================

const sizeConfig = {
  sm: {
    input: "h-9 px-3 text-sm rounded-lg",
    icon: "h-4 w-4",
    iconPadding: "pl-9",
    rightIconPadding: "pr-9",
  },
  default: {
    input: "h-10 px-4 text-sm rounded-xl",
    icon: "h-4 w-4",
    iconPadding: "pl-10",
    rightIconPadding: "pr-10",
  },
  lg: {
    input: "h-12 px-4 text-base rounded-xl",
    icon: "h-5 w-5",
    iconPadding: "pl-11",
    rightIconPadding: "pr-11",
  },
}

// =============================================================================
// VARIANT STYLES
// =============================================================================

const variantStyles = {
  default: `
    bg-[var(--bg-card)]/80
    backdrop-blur-sm
    border border-[var(--border-default)]
    text-[var(--text-primary)]
    placeholder:text-[var(--text-muted)]
    hover:border-[var(--border-hover)]
    focus:border-[var(--accent-primary)]
    focus:bg-[var(--bg-card)]
  `,
  glass: `
    bg-white/5
    backdrop-blur-xl
    border border-white/[0.08]
    text-[var(--text-primary)]
    placeholder:text-[var(--text-muted)]
    hover:bg-white/[0.08]
    hover:border-white/[0.12]
    focus:bg-white/10
    focus:border-white/20
    shadow-[0_0_0_1px_rgba(255,255,255,0.02)]
  `,
  ghost: `
    bg-transparent
    border border-transparent
    text-[var(--text-primary)]
    placeholder:text-[var(--text-muted)]
    hover:bg-[var(--bg-elevated)]
    focus:bg-[var(--bg-elevated)]
    focus:border-[var(--border-default)]
  `,
  filled: `
    bg-[var(--bg-elevated)]
    border border-transparent
    text-[var(--text-primary)]
    placeholder:text-[var(--text-muted)]
    hover:bg-[var(--bg-card)]
    focus:bg-[var(--bg-card)]
    focus:border-[var(--accent-primary)]
  `,
}

// =============================================================================
// GLOW CONFIGURATIONS
// =============================================================================

const glowStyles = {
  primary: "focus:shadow-[0_0_0_3px_rgba(94,106,210,0.15),0_0_20px_rgba(94,106,210,0.1)]",
  success: "focus:shadow-[0_0_0_3px_rgba(16,185,129,0.15),0_0_20px_rgba(16,185,129,0.1)]",
  warning: "focus:shadow-[0_0_0_3px_rgba(245,158,11,0.15),0_0_20px_rgba(245,158,11,0.1)]",
  danger: "focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15),0_0_20px_rgba(239,68,68,0.1)]",
}

// =============================================================================
// INPUT COMPONENT
// =============================================================================

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      type = "text",
      size = "default",
      variant = "default",
      error = false,
      errorMessage,
      success = false,
      leftIcon,
      rightIcon,
      clearable = false,
      onClear,
      fullWidth = false,
      disabled,
      value,
      glowColor = "primary",
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [isFocused, setIsFocused] = React.useState(false)
    const config = sizeConfig[size]

    const isPassword = type === "password"
    const inputType = isPassword && showPassword ? "text" : type

    const hasValue = value !== undefined && value !== ""
    const showClearButton = clearable && hasValue && !disabled

    // Base transition classes
    const baseClasses = `
      w-full
      transition-all duration-200 ease-out
      focus:outline-none
      disabled:cursor-not-allowed disabled:opacity-50
    `

    // State-specific styling
    const stateClasses = error
      ? `border-[#EF4444]/50 focus:border-[#EF4444] ${glowStyles.danger}`
      : success
      ? `border-[#10B981]/50 focus:border-[#10B981] ${glowStyles.success}`
      : glowStyles[glowColor]

    const paddingClasses = `
      ${config.input}
      ${leftIcon ? config.iconPadding : ""}
      ${rightIcon || isPassword || showClearButton ? config.rightIconPadding : ""}
    `

    return (
      <div className={`relative ${fullWidth ? "w-full" : "inline-flex"} group`}>
        {/* Glow effect container */}
        <div className={`
          absolute -inset-0.5 rounded-xl
          bg-gradient-to-r from-[var(--accent-primary)]/0 via-[var(--accent-primary)]/10 to-[var(--accent-primary)]/0
          opacity-0 blur-md transition-opacity duration-300
          ${isFocused && !error && !success ? 'opacity-100' : ''}
          pointer-events-none
        `} />

        {/* Left Icon */}
        {leftIcon && (
          <div className={`
            absolute left-3 top-1/2 -translate-y-1/2
            text-[var(--text-muted)]
            transition-colors duration-200
            ${isFocused ? 'text-[var(--accent-primary)]' : ''}
            pointer-events-none z-10
          `}>
            <span className={config.icon}>{leftIcon}</span>
          </div>
        )}

        {/* Input */}
        <input
          type={inputType}
          className={`
            ${baseClasses}
            ${variantStyles[variant]}
            ${stateClasses}
            ${paddingClasses}
            relative z-[1]
            ${className}
          `}
          ref={ref}
          disabled={disabled}
          value={value}
          onFocus={(e) => {
            setIsFocused(true)
            props.onFocus?.(e)
          }}
          onBlur={(e) => {
            setIsFocused(false)
            props.onBlur?.(e)
          }}
          {...props}
        />

        {/* Right Side Icons */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 z-10">
          {/* Clear Button */}
          {showClearButton && (
            <button
              type="button"
              onClick={onClear}
              className={`
                p-1 rounded-md
                text-[var(--text-muted)]
                hover:text-[var(--text-primary)]
                hover:bg-[var(--bg-elevated)]
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/30
              `}
              tabIndex={-1}
            >
              <X className={config.icon} />
            </button>
          )}

          {/* Password Toggle */}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`
                p-1 rounded-md
                text-[var(--text-muted)]
                hover:text-[var(--text-primary)]
                hover:bg-[var(--bg-elevated)]
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/30
              `}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className={config.icon} />
              ) : (
                <Eye className={config.icon} />
              )}
            </button>
          )}

          {/* Right Icon */}
          {rightIcon && !isPassword && !showClearButton && (
            <span className={`
              text-[var(--text-muted)] ${config.icon}
              transition-colors duration-200
              ${isFocused ? 'text-[var(--accent-primary)]' : ''}
            `}>
              {rightIcon}
            </span>
          )}
        </div>

        {/* Error Message */}
        {error && errorMessage && (
          <p className="mt-2 text-sm text-[#EF4444] flex items-center gap-1.5">
            <span className="inline-block w-1 h-1 rounded-full bg-[#EF4444]" />
            {errorMessage}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

// =============================================================================
// SEARCH INPUT - Premium search with glass effect
// =============================================================================

export interface SearchInputProps extends Omit<InputProps, "leftIcon" | "type"> {
  /** Placeholder text */
  placeholder?: string
  /** Show keyboard shortcut hint */
  showShortcut?: boolean
  /** Shortcut key to display */
  shortcutKey?: string
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      placeholder = "Rechercher...",
      showShortcut = false,
      shortcutKey = "K",
      variant = "glass",
      ...props
    },
    ref
  ) => {
    return (
      <div className="relative group">
        <Input
          ref={ref}
          type="search"
          placeholder={placeholder}
          variant={variant}
          leftIcon={<Search className="h-4 w-4" />}
          clearable
          {...props}
        />
        {showShortcut && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-0.5 pointer-events-none">
            <kbd className={`
              inline-flex h-5 items-center rounded-md
              border border-white/10
              bg-white/5 backdrop-blur-sm
              px-1.5 text-[10px] text-[var(--text-muted)] font-mono
              shadow-[0_1px_2px_rgba(0,0,0,0.1)]
            `}>
              ⌘
            </kbd>
            <kbd className={`
              inline-flex h-5 items-center rounded-md
              border border-white/10
              bg-white/5 backdrop-blur-sm
              px-1.5 text-[10px] text-[var(--text-muted)] font-mono
              shadow-[0_1px_2px_rgba(0,0,0,0.1)]
            `}>
              {shortcutKey}
            </kbd>
          </div>
        )}
      </div>
    )
  }
)

SearchInput.displayName = "SearchInput"

// =============================================================================
// TEXTAREA - Premium glass textarea
// =============================================================================

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Visual variant */
  variant?: "default" | "glass" | "ghost" | "filled"
  /** Error state */
  error?: boolean
  /** Error message */
  errorMessage?: string
  /** Success state */
  success?: boolean
  /** Auto-resize based on content */
  autoResize?: boolean
  /** Glow color on focus */
  glowColor?: "primary" | "success" | "warning" | "danger"
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className = "",
      variant = "default",
      error = false,
      errorMessage,
      success = false,
      autoResize = false,
      glowColor = "primary",
      ...props
    },
    ref
  ) => {
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null)
    const [isFocused, setIsFocused] = React.useState(false)

    // Handle auto-resize
    React.useEffect(() => {
      if (autoResize && textareaRef.current) {
        textareaRef.current.style.height = "auto"
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
      }
    }, [props.value, autoResize])

    const stateClasses = error
      ? `border-[#EF4444]/50 focus:border-[#EF4444] ${glowStyles.danger}`
      : success
      ? `border-[#10B981]/50 focus:border-[#10B981] ${glowStyles.success}`
      : glowStyles[glowColor]

    return (
      <div className="relative group">
        {/* Glow effect container */}
        <div className={`
          absolute -inset-0.5 rounded-xl
          bg-gradient-to-r from-[var(--accent-primary)]/0 via-[var(--accent-primary)]/10 to-[var(--accent-primary)]/0
          opacity-0 blur-md transition-opacity duration-300
          ${isFocused && !error && !success ? 'opacity-100' : ''}
          pointer-events-none
        `} />

        <textarea
          ref={(node) => {
            textareaRef.current = node
            if (typeof ref === "function") {
              ref(node)
            } else if (ref) {
              ref.current = node
            }
          }}
          className={`
            w-full min-h-[120px] rounded-xl px-4 py-3 text-sm
            transition-all duration-200 ease-out
            focus:outline-none
            disabled:cursor-not-allowed disabled:opacity-50
            resize-y relative z-[1]
            ${variantStyles[variant]}
            ${stateClasses}
            ${autoResize ? "resize-none overflow-hidden" : ""}
            ${className}
          `}
          onFocus={(e) => {
            setIsFocused(true)
            props.onFocus?.(e)
          }}
          onBlur={(e) => {
            setIsFocused(false)
            props.onBlur?.(e)
          }}
          {...props}
        />
        {error && errorMessage && (
          <p className="mt-2 text-sm text-[#EF4444] flex items-center gap-1.5">
            <span className="inline-block w-1 h-1 rounded-full bg-[#EF4444]" />
            {errorMessage}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = "Textarea"

// =============================================================================
// LABEL - Premium label with optional badge
// =============================================================================

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Required indicator */
  required?: boolean
  /** Optional text */
  optional?: boolean
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className = "", required, optional, children, ...props }, ref) => (
    <label
      ref={ref}
      className={`
        block text-sm font-medium text-[var(--text-primary)] mb-2
        ${className}
      `}
      {...props}
    >
      {children}
      {required && (
        <span className="text-[#EF4444] ml-1">*</span>
      )}
      {optional && (
        <span className={`
          text-[var(--text-muted)] font-normal ml-2 text-xs
          px-1.5 py-0.5 rounded-md
          bg-[var(--bg-elevated)]
        `}>
          optionnel
        </span>
      )}
    </label>
  )
)

Label.displayName = "Label"

// =============================================================================
// FORM FIELD - Premium field wrapper with glass styling
// =============================================================================

export interface FormFieldProps {
  /** Field label */
  label?: string
  /** Label props */
  labelProps?: LabelProps
  /** Help text */
  helpText?: string
  /** Error message */
  error?: string
  /** Required field */
  required?: boolean
  /** Optional field */
  optional?: boolean
  /** Children (input component) */
  children: React.ReactNode
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  labelProps,
  helpText,
  error,
  required,
  optional,
  children,
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <Label required={required} optional={optional} {...labelProps}>
          {label}
        </Label>
      )}
      {children}
      {helpText && !error && (
        <p className="text-sm text-[var(--text-muted)] flex items-center gap-1.5">
          <span className="inline-block w-1 h-1 rounded-full bg-[var(--text-muted)]/50" />
          {helpText}
        </p>
      )}
      {error && (
        <p className="text-sm text-[#EF4444] flex items-center gap-1.5">
          <span className="inline-block w-1 h-1 rounded-full bg-[#EF4444]" />
          {error}
        </p>
      )}
    </div>
  )
}

// =============================================================================
// EXPORTS
// =============================================================================

export { Input, SearchInput, Textarea, Label, FormField }
