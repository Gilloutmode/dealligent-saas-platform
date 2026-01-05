"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ChevronDown, Search } from "lucide-react"

// =============================================================================
// CDS PLATFORM - PREMIUM SELECT COMPONENT
// 21st.dev inspired glassmorphism dropdown with search
// =============================================================================

// =============================================================================
// TYPES
// =============================================================================

export interface SelectOption {
  value: string
  label: string
  description?: string
  icon?: React.ReactNode
  disabled?: boolean
}

export interface SelectProps {
  /** Available options */
  options: SelectOption[]
  /** Currently selected value */
  value?: string
  /** Callback when value changes */
  onChange: (value: string) => void
  /** Placeholder text */
  placeholder?: string
  /** Enable search */
  searchable?: boolean
  /** Search placeholder */
  searchPlaceholder?: string
  /** Disabled state */
  disabled?: boolean
  /** Error state */
  error?: boolean
  /** Error message */
  errorMessage?: string
  /** Size variant */
  size?: "sm" | "default" | "lg"
  /** Visual variant */
  variant?: "default" | "glass"
  /** Full width */
  fullWidth?: boolean
  /** Additional class name */
  className?: string
}

// =============================================================================
// SIZE CONFIGURATIONS
// =============================================================================

const sizeConfig = {
  sm: {
    trigger: "h-9 px-3 text-sm rounded-lg",
    dropdown: "rounded-lg",
    option: "px-3 py-2 text-sm",
  },
  default: {
    trigger: "h-10 px-4 text-sm rounded-xl",
    dropdown: "rounded-xl",
    option: "px-4 py-2.5 text-sm",
  },
  lg: {
    trigger: "h-12 px-4 text-base rounded-xl",
    dropdown: "rounded-xl",
    option: "px-4 py-3 text-base",
  },
}

const variantStyles = {
  default: `
    bg-[var(--bg-card)]/80
    backdrop-blur-sm
    border border-[var(--border-default)]
    hover:border-[var(--border-hover)]
  `,
  glass: `
    bg-white/5
    backdrop-blur-xl
    border border-white/[0.08]
    hover:bg-white/[0.08]
    hover:border-white/[0.12]
  `,
}

// =============================================================================
// SELECT COMPONENT
// =============================================================================

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      options,
      value,
      onChange,
      placeholder = "Sélectionner...",
      searchable = false,
      searchPlaceholder = "Rechercher...",
      disabled = false,
      error = false,
      errorMessage,
      size = "default",
      variant = "default",
      fullWidth = false,
      className = "",
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [searchQuery, setSearchQuery] = React.useState("")
    const [highlightedIndex, setHighlightedIndex] = React.useState(-1)
    const triggerRef = React.useRef<HTMLButtonElement>(null)
    const listRef = React.useRef<HTMLDivElement>(null)
    const searchInputRef = React.useRef<HTMLInputElement>(null)

    const config = sizeConfig[size]

    // Get selected option
    const selectedOption = options.find((opt) => opt.value === value)

    // Filter options based on search
    const filteredOptions = React.useMemo(() => {
      if (!searchQuery) return options
      const query = searchQuery.toLowerCase()
      return options.filter(
        (opt) =>
          opt.label.toLowerCase().includes(query) ||
          opt.description?.toLowerCase().includes(query)
      )
    }, [options, searchQuery])

    // Handle open/close
    const handleToggle = () => {
      if (!disabled) {
        setIsOpen(!isOpen)
        if (!isOpen) {
          setSearchQuery("")
          setHighlightedIndex(-1)
        }
      }
    }

    // Handle option select
    const handleSelect = (optionValue: string) => {
      const option = options.find((opt) => opt.value === optionValue)
      if (option && !option.disabled) {
        onChange(optionValue)
        setIsOpen(false)
        setSearchQuery("")
        triggerRef.current?.focus()
      }
    }

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return

      switch (e.key) {
        case "Enter":
        case " ":
          if (!isOpen) {
            setIsOpen(true)
          } else if (highlightedIndex >= 0) {
            handleSelect(filteredOptions[highlightedIndex].value)
          }
          e.preventDefault()
          break
        case "Escape":
          setIsOpen(false)
          triggerRef.current?.focus()
          break
        case "ArrowDown":
          if (!isOpen) {
            setIsOpen(true)
          } else {
            setHighlightedIndex((prev) =>
              prev < filteredOptions.length - 1 ? prev + 1 : prev
            )
          }
          e.preventDefault()
          break
        case "ArrowUp":
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev))
          e.preventDefault()
          break
      }
    }

    // Focus search input when dropdown opens
    React.useEffect(() => {
      if (isOpen && searchable && searchInputRef.current) {
        searchInputRef.current.focus()
      }
    }, [isOpen, searchable])

    // Close on outside click
    React.useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          triggerRef.current &&
          !triggerRef.current.contains(e.target as Node) &&
          listRef.current &&
          !listRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false)
        }
      }
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
      <div
        ref={ref}
        className={`relative ${fullWidth ? "w-full" : "inline-block"} ${className}`}
      >
        {/* Trigger Button */}
        <motion.button
          ref={triggerRef}
          type="button"
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={`
            ${config.trigger}
            ${variantStyles[variant]}
            ${fullWidth ? "w-full" : "min-w-[200px]"}
            flex items-center justify-between gap-2
            text-left
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/30
            focus:border-[var(--accent-primary)]
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? "border-[#EF4444]/50 focus:border-[#EF4444]" : ""}
            ${isOpen ? "ring-2 ring-[var(--accent-primary)]/30 border-[var(--accent-primary)]" : ""}
          `}
          whileTap={!disabled ? { scale: 0.99 } : undefined}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          {/* Selected Value or Placeholder */}
          <span
            className={`
              flex-1 truncate
              ${selectedOption
                ? "text-[var(--text-primary)]"
                : "text-[var(--text-muted)]"
              }
            `}
          >
            {selectedOption ? (
              <span className="flex items-center gap-2">
                {selectedOption.icon}
                {selectedOption.label}
              </span>
            ) : (
              placeholder
            )}
          </span>

          {/* Chevron */}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-[var(--text-muted)]"
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.button>

        {/* Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={listRef}
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={`
                absolute z-50 mt-2
                ${fullWidth ? "w-full" : "min-w-[200px]"}
                ${config.dropdown}
                bg-[var(--bg-card)]/95
                backdrop-blur-2xl
                border border-white/[0.08]
                shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_10px_40px_-10px_rgba(0,0,0,0.5)]
                overflow-hidden
              `}
              role="listbox"
            >
              {/* Top glow */}
              <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-primary)]/30 to-transparent" />

              {/* Search Input */}
              {searchable && (
                <div className="p-2 border-b border-white/[0.06]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={searchPlaceholder}
                      className={`
                        w-full pl-9 pr-3 py-2
                        text-sm
                        bg-[var(--bg-elevated)]/50
                        border border-transparent
                        rounded-lg
                        text-[var(--text-primary)]
                        placeholder:text-[var(--text-muted)]
                        focus:outline-none focus:border-[var(--accent-primary)]/30
                        transition-all duration-200
                      `}
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                </div>
              )}

              {/* Options List */}
              <div className="max-h-[280px] overflow-y-auto py-1">
                {filteredOptions.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-[var(--text-muted)]">
                    Aucun résultat
                  </div>
                ) : (
                  filteredOptions.map((option, index) => (
                    <motion.button
                      key={option.value}
                      type="button"
                      onClick={() => handleSelect(option.value)}
                      onMouseEnter={() => setHighlightedIndex(index)}
                      disabled={option.disabled}
                      className={`
                        w-full ${config.option}
                        flex items-center gap-3
                        text-left
                        transition-all duration-150
                        focus:outline-none
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${option.value === value
                          ? "bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]"
                          : highlightedIndex === index
                          ? "bg-white/[0.06] text-[var(--text-primary)]"
                          : "text-[var(--text-primary)] hover:bg-white/[0.04]"
                        }
                      `}
                      role="option"
                      aria-selected={option.value === value}
                    >
                      {/* Icon */}
                      {option.icon && (
                        <span className="flex-shrink-0 text-[var(--text-muted)]">
                          {option.icon}
                        </span>
                      )}

                      {/* Label & Description */}
                      <div className="flex-1 min-w-0">
                        <div className="truncate">{option.label}</div>
                        {option.description && (
                          <div className="text-xs text-[var(--text-muted)] truncate">
                            {option.description}
                          </div>
                        )}
                      </div>

                      {/* Check mark */}
                      {option.value === value && (
                        <Check className="w-4 h-4 flex-shrink-0 text-[var(--accent-primary)]" />
                      )}
                    </motion.button>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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

Select.displayName = "Select"

// =============================================================================
// MULTI-SELECT COMPONENT
// =============================================================================

export interface MultiSelectProps extends Omit<SelectProps, "value" | "onChange"> {
  /** Currently selected values */
  value: string[]
  /** Callback when values change */
  onChange: (values: string[]) => void
  /** Maximum selections */
  maxSelections?: number
}

const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    {
      options,
      value = [],
      onChange,
      placeholder = "Sélectionner...",
      searchable = true,
      searchPlaceholder = "Rechercher...",
      disabled = false,
      error = false,
      errorMessage,
      size = "default",
      variant = "default",
      fullWidth = false,
      maxSelections,
      className = "",
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [searchQuery, setSearchQuery] = React.useState("")
    const triggerRef = React.useRef<HTMLButtonElement>(null)
    const listRef = React.useRef<HTMLDivElement>(null)
    const searchInputRef = React.useRef<HTMLInputElement>(null)

    const config = sizeConfig[size]

    // Get selected options
    const selectedOptions = options.filter((opt) => value.includes(opt.value))

    // Filter options based on search
    const filteredOptions = React.useMemo(() => {
      if (!searchQuery) return options
      const query = searchQuery.toLowerCase()
      return options.filter(
        (opt) =>
          opt.label.toLowerCase().includes(query) ||
          opt.description?.toLowerCase().includes(query)
      )
    }, [options, searchQuery])

    // Handle toggle option
    const handleToggleOption = (optionValue: string) => {
      const option = options.find((opt) => opt.value === optionValue)
      if (option && !option.disabled) {
        if (value.includes(optionValue)) {
          onChange(value.filter((v) => v !== optionValue))
        } else if (!maxSelections || value.length < maxSelections) {
          onChange([...value, optionValue])
        }
      }
    }

    // Handle remove option
    const handleRemoveOption = (optionValue: string, e: React.MouseEvent) => {
      e.stopPropagation()
      onChange(value.filter((v) => v !== optionValue))
    }

    // Close on outside click
    React.useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          triggerRef.current &&
          !triggerRef.current.contains(e.target as Node) &&
          listRef.current &&
          !listRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false)
        }
      }
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // Focus search input when dropdown opens
    React.useEffect(() => {
      if (isOpen && searchable && searchInputRef.current) {
        searchInputRef.current.focus()
      }
    }, [isOpen, searchable])

    return (
      <div
        ref={ref}
        className={`relative ${fullWidth ? "w-full" : "inline-block"} ${className}`}
      >
        {/* Trigger Button */}
        <motion.button
          ref={triggerRef}
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`
            ${config.trigger}
            ${variantStyles[variant]}
            ${fullWidth ? "w-full" : "min-w-[200px]"}
            min-h-[40px] h-auto py-2
            flex items-center flex-wrap gap-1.5
            text-left
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/30
            focus:border-[var(--accent-primary)]
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? "border-[#EF4444]/50 focus:border-[#EF4444]" : ""}
            ${isOpen ? "ring-2 ring-[var(--accent-primary)]/30 border-[var(--accent-primary)]" : ""}
          `}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          {/* Selected Tags */}
          {selectedOptions.length > 0 ? (
            <>
              {selectedOptions.map((option) => (
                <span
                  key={option.value}
                  className="
                    inline-flex items-center gap-1
                    px-2 py-0.5 rounded-md
                    text-xs font-medium
                    bg-[var(--accent-primary)]/15
                    text-[var(--accent-primary)]
                    border border-[var(--accent-primary)]/20
                  "
                >
                  {option.label}
                  <button
                    type="button"
                    onClick={(e) => handleRemoveOption(option.value, e)}
                    className="hover:text-[var(--text-primary)] ml-0.5"
                  >
                    ×
                  </button>
                </span>
              ))}
            </>
          ) : (
            <span className="text-[var(--text-muted)]">{placeholder}</span>
          )}

          {/* Spacer */}
          <span className="flex-1" />

          {/* Chevron */}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-[var(--text-muted)]"
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.button>

        {/* Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={listRef}
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={`
                absolute z-50 mt-2
                ${fullWidth ? "w-full" : "min-w-[200px]"}
                ${config.dropdown}
                bg-[var(--bg-card)]/95
                backdrop-blur-2xl
                border border-white/[0.08]
                shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_10px_40px_-10px_rgba(0,0,0,0.5)]
                overflow-hidden
              `}
              role="listbox"
              aria-multiselectable="true"
            >
              {/* Search Input */}
              {searchable && (
                <div className="p-2 border-b border-white/[0.06]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={searchPlaceholder}
                      className={`
                        w-full pl-9 pr-3 py-2
                        text-sm
                        bg-[var(--bg-elevated)]/50
                        border border-transparent
                        rounded-lg
                        text-[var(--text-primary)]
                        placeholder:text-[var(--text-muted)]
                        focus:outline-none focus:border-[var(--accent-primary)]/30
                        transition-all duration-200
                      `}
                    />
                  </div>
                </div>
              )}

              {/* Options List */}
              <div className="max-h-[280px] overflow-y-auto py-1">
                {filteredOptions.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-[var(--text-muted)]">
                    Aucun résultat
                  </div>
                ) : (
                  filteredOptions.map((option) => {
                    const isSelected = value.includes(option.value)
                    const isDisabledByMax =
                      maxSelections !== undefined && maxSelections > 0 && value.length >= maxSelections && !isSelected

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleToggleOption(option.value)}
                        disabled={option.disabled || isDisabledByMax}
                        className={`
                          w-full ${config.option}
                          flex items-center gap-3
                          text-left
                          transition-all duration-150
                          focus:outline-none
                          disabled:opacity-50 disabled:cursor-not-allowed
                          ${isSelected
                            ? "bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]"
                            : "text-[var(--text-primary)] hover:bg-white/[0.04]"
                          }
                        `}
                        role="option"
                        aria-selected={isSelected}
                      >
                        {/* Checkbox */}
                        <div
                          className={`
                            w-4 h-4 rounded
                            border-2 transition-all duration-150
                            flex items-center justify-center
                            ${isSelected
                              ? "bg-[var(--accent-primary)] border-[var(--accent-primary)]"
                              : "border-[var(--border-default)]"
                            }
                          `}
                        >
                          {isSelected && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>

                        {/* Icon */}
                        {option.icon && (
                          <span className="flex-shrink-0 text-[var(--text-muted)]">
                            {option.icon}
                          </span>
                        )}

                        {/* Label & Description */}
                        <div className="flex-1 min-w-0">
                          <div className="truncate">{option.label}</div>
                          {option.description && (
                            <div className="text-xs text-[var(--text-muted)] truncate">
                              {option.description}
                            </div>
                          )}
                        </div>
                      </button>
                    )
                  })
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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

MultiSelect.displayName = "MultiSelect"

// =============================================================================
// EXPORTS
// =============================================================================

export { Select, MultiSelect }
