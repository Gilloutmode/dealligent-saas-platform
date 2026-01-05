"use client"

import * as React from "react"
import { motion } from "framer-motion"

// =============================================================================
// CDS PLATFORM - PREMIUM TABS COMPONENT
// 21st.dev inspired with animated indicator and glassmorphism
// =============================================================================

// =============================================================================
// TYPES
// =============================================================================

export interface TabItem {
  value: string
  label: string
  icon?: React.ReactNode
  disabled?: boolean
}

export interface TabsProps {
  /** Tab items */
  tabs: TabItem[]
  /** Active tab value */
  value: string
  /** Callback when tab changes */
  onValueChange: (value: string) => void
  /** Visual variant */
  variant?: "default" | "pills" | "underline" | "glass"
  /** Size */
  size?: "sm" | "default" | "lg"
  /** Full width tabs */
  fullWidth?: boolean
  /** Additional class name */
  className?: string
  /** Children (tab panels) */
  children?: React.ReactNode
}

// =============================================================================
// SIZE & VARIANT CONFIGURATIONS
// =============================================================================

const sizeConfig = {
  sm: {
    tab: "px-3 py-1.5 text-xs",
    icon: "w-3.5 h-3.5",
    gap: "gap-1.5",
  },
  default: {
    tab: "px-4 py-2 text-sm",
    icon: "w-4 h-4",
    gap: "gap-2",
  },
  lg: {
    tab: "px-5 py-2.5 text-base",
    icon: "w-5 h-5",
    gap: "gap-2.5",
  },
}

// =============================================================================
// TABS COMPONENT
// =============================================================================

const Tabs: React.FC<TabsProps> = ({
  tabs,
  value,
  onValueChange,
  variant = "default",
  size = "default",
  fullWidth = false,
  className = "",
  children,
}) => {
  const [indicatorStyle, setIndicatorStyle] = React.useState({ left: 0, width: 0 })
  const tabsRef = React.useRef<HTMLDivElement>(null)
  const activeIndex = tabs.findIndex((t) => t.value === value)
  const config = sizeConfig[size]

  // Update indicator position
  React.useEffect(() => {
    if (tabsRef.current && activeIndex >= 0) {
      const tabElements = tabsRef.current.querySelectorAll("[data-tab]")
      const activeTab = tabElements[activeIndex] as HTMLElement
      if (activeTab) {
        setIndicatorStyle({
          left: activeTab.offsetLeft,
          width: activeTab.offsetWidth,
        })
      }
    }
  }, [activeIndex, tabs])

  // Variant-specific container styles
  const containerStyles = {
    default: `
      bg-[var(--bg-elevated)]/50
      backdrop-blur-sm
      border border-white/[0.06]
      rounded-xl p-1
    `,
    pills: `
      bg-transparent
      gap-2
    `,
    underline: `
      bg-transparent
      border-b border-[var(--border-default)]
      pb-0
    `,
    glass: `
      bg-white/5
      backdrop-blur-xl
      border border-white/[0.08]
      rounded-xl p-1
      shadow-[0_0_0_1px_rgba(255,255,255,0.02)]
    `,
  }

  // Variant-specific tab styles
  const getTabStyles = (isActive: boolean, isDisabled: boolean) => {
    const base = `
      relative z-10
      ${config.tab}
      ${config.gap}
      font-medium
      rounded-lg
      transition-all duration-200
      focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]/30
      ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
    `

    const variants = {
      default: isActive
        ? "text-[var(--text-primary)]"
        : "text-[var(--text-muted)] hover:text-[var(--text-primary)]",
      pills: isActive
        ? `
            bg-gradient-to-r from-[#5E6AD2] to-[#7C3AED]
            text-white
            shadow-lg shadow-[var(--accent-primary)]/20
          `
        : `
            text-[var(--text-muted)]
            hover:text-[var(--text-primary)]
            hover:bg-white/5
          `,
      underline: isActive
        ? "text-[var(--accent-primary)]"
        : "text-[var(--text-muted)] hover:text-[var(--text-primary)]",
      glass: isActive
        ? "text-[var(--text-primary)]"
        : "text-[var(--text-muted)] hover:text-[var(--text-primary)]",
    }

    return `${base} ${variants[variant]}`
  }

  return (
    <div className={className}>
      {/* Tab List */}
      <div
        ref={tabsRef}
        className={`
          relative inline-flex items-center
          ${containerStyles[variant]}
          ${fullWidth ? "w-full" : ""}
        `}
        role="tablist"
      >
        {/* Animated Indicator */}
        {(variant === "default" || variant === "glass") && activeIndex >= 0 && (
          <motion.div
            className={`
              absolute z-0 h-[calc(100%-8px)] top-1
              bg-[var(--bg-card)]
              rounded-lg
              shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_2px_4px_rgba(0,0,0,0.1)]
            `}
            initial={false}
            animate={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 35,
            }}
          />
        )}

        {/* Underline Indicator */}
        {variant === "underline" && activeIndex >= 0 && (
          <motion.div
            className={`
              absolute bottom-0 h-[2px]
              bg-gradient-to-r from-[#5E6AD2] to-[#7C3AED]
              rounded-full
            `}
            initial={false}
            animate={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 35,
            }}
          />
        )}

        {/* Tabs */}
        {tabs.map((tab) => (
          <button
            key={tab.value}
            data-tab
            role="tab"
            aria-selected={tab.value === value}
            aria-disabled={tab.disabled}
            onClick={() => !tab.disabled && onValueChange(tab.value)}
            className={`
              ${getTabStyles(tab.value === value, !!tab.disabled)}
              ${fullWidth ? "flex-1" : ""}
              inline-flex items-center justify-center
            `}
          >
            {tab.icon && (
              <span className={config.icon}>{tab.icon}</span>
            )}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      {children && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </div>
  )
}

// =============================================================================
// TAB PANEL
// =============================================================================

export interface TabPanelProps {
  /** Value matching a tab */
  value: string
  /** Current active value */
  activeValue: string
  /** Panel content */
  children: React.ReactNode
  /** Additional class name */
  className?: string
}

const TabPanel: React.FC<TabPanelProps> = ({
  value,
  activeValue,
  children,
  className = "",
}) => {
  if (value !== activeValue) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      role="tabpanel"
      className={className}
    >
      {children}
    </motion.div>
  )
}

// =============================================================================
// SEGMENTED CONTROL (Alternative Tab Style)
// =============================================================================

export interface SegmentedControlProps {
  /** Options */
  options: Array<{ value: string; label: string; icon?: React.ReactNode }>
  /** Active value */
  value: string
  /** Change callback */
  onValueChange: (value: string) => void
  /** Size */
  size?: "sm" | "default" | "lg"
  /** Full width */
  fullWidth?: boolean
  /** Class name */
  className?: string
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  value,
  onValueChange,
  size = "default",
  fullWidth = false,
  className = "",
}) => {
  const config = sizeConfig[size]
  const activeIndex = options.findIndex((o) => o.value === value)

  return (
    <div
      className={`
        relative inline-flex items-center p-1
        bg-[var(--bg-elevated)]/60
        backdrop-blur-sm
        border border-white/[0.06]
        rounded-xl
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {/* Background slider */}
      {activeIndex >= 0 && (
        <motion.div
          className="
            absolute h-[calc(100%-8px)] top-1
            bg-gradient-to-r from-[#5E6AD2] to-[#7C3AED]
            rounded-lg
            shadow-lg shadow-[var(--accent-primary)]/25
          "
          initial={false}
          animate={{
            left: `calc(${(100 / options.length) * activeIndex}% + 4px)`,
            width: `calc(${100 / options.length}% - 8px)`,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 35,
          }}
        />
      )}

      {/* Options */}
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onValueChange(option.value)}
          className={`
            relative z-10
            ${config.tab}
            ${config.gap}
            font-medium
            rounded-lg
            transition-colors duration-200
            ${fullWidth ? "flex-1" : ""}
            inline-flex items-center justify-center
            ${option.value === value
              ? "text-white"
              : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }
          `}
        >
          {option.icon && (
            <span className={config.icon}>{option.icon}</span>
          )}
          {option.label}
        </button>
      ))}
    </div>
  )
}

// =============================================================================
// EXPORTS
// =============================================================================

export { Tabs, TabPanel, SegmentedControl }
