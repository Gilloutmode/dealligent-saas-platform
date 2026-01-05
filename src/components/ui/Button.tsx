"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, type HTMLMotionProps } from "framer-motion"
import { Loader2 } from "lucide-react"

// =============================================================================
// CDS PLATFORM - PREMIUM BUTTON COMPONENT
// 21st.dev inspired with gradients, glow effects, and animations
// =============================================================================

const buttonVariants = cva(
  // Base styles
  `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium
   transition-all duration-200
   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
   disabled:pointer-events-none disabled:opacity-50
   [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0
   cursor-pointer relative overflow-hidden`,
  {
    variants: {
      variant: {
        // Primary Gradient - Premium blue/purple gradient
        default: `
          bg-gradient-to-r from-[#5E6AD2] to-[#7C3AED]
          text-white shadow-lg
          hover:shadow-[0_0_20px_rgba(94,106,210,0.4)]
          hover:from-[#6B78E0] hover:to-[#8B4CF6]
          active:scale-[0.98]
          focus-visible:ring-[#5E6AD2]
        `,
        // Secondary - Violet gradient
        secondary: `
          bg-gradient-to-r from-[#8B5CF6] to-[#A855F7]
          text-white shadow-lg
          hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]
          hover:from-[#9D6FF8] hover:to-[#B86CF9]
          active:scale-[0.98]
          focus-visible:ring-[#8B5CF6]
        `,
        // Success - Green gradient
        success: `
          bg-gradient-to-r from-[#10B981] to-[#059669]
          text-white shadow-lg
          hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]
          hover:from-[#22C993] hover:to-[#10A87A]
          active:scale-[0.98]
          focus-visible:ring-[#10B981]
        `,
        // Destructive - Red gradient
        destructive: `
          bg-gradient-to-r from-[#EF4444] to-[#DC2626]
          text-white shadow-lg
          hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]
          hover:from-[#F45555] hover:to-[#E83737]
          active:scale-[0.98]
          focus-visible:ring-[#EF4444]
        `,
        // Outline with glow
        outline: `
          border-2 border-[var(--border-default)]
          bg-transparent
          text-[var(--text-primary)]
          hover:border-[var(--accent-primary)]
          hover:text-[var(--accent-primary)]
          hover:shadow-[0_0_15px_rgba(94,106,210,0.2)]
          focus-visible:ring-[var(--accent-primary)]
        `,
        // Ghost with subtle glow
        ghost: `
          bg-transparent
          text-[var(--text-secondary)]
          hover:bg-[var(--bg-elevated)]
          hover:text-[var(--text-primary)]
          focus-visible:ring-[var(--accent-primary)]/30
        `,
        // Ghost with glow effect
        "ghost-glow": `
          bg-transparent
          text-[var(--text-secondary)]
          hover:bg-[var(--accent-primary)]/10
          hover:text-[var(--accent-primary)]
          hover:shadow-[0_0_15px_rgba(94,106,210,0.15)]
          focus-visible:ring-[var(--accent-primary)]
        `,
        // Glass button
        glass: `
          bg-white/10
          backdrop-blur-xl
          border border-white/20
          text-[var(--text-primary)]
          hover:bg-white/20
          hover:border-white/30
          hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]
          focus-visible:ring-white/30
        `,
        // Link
        link: `
          text-[var(--accent-primary)]
          underline-offset-4
          hover:underline
          hover:text-[var(--accent-primary-hover)]
          focus-visible:ring-[var(--accent-primary)]
        `,
        // Premium gradient (amber/orange)
        premium: `
          bg-gradient-to-r from-[#F59E0B] to-[#D97706]
          text-white shadow-lg
          hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]
          hover:from-[#FBBF24] hover:to-[#F59E0B]
          active:scale-[0.98]
          focus-visible:ring-[#F59E0B]
        `,
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-base font-semibold",
        icon: "h-10 w-10 rounded-xl",
        "icon-sm": "h-8 w-8 rounded-lg",
        "icon-lg": "h-12 w-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// =============================================================================
// BUTTON PROPS
// =============================================================================

export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "ref" | "children">,
    VariantProps<typeof buttonVariants> {
  /** Button content */
  children?: React.ReactNode
  /** Shows loading spinner and disables button */
  isLoading?: boolean
  /** Text to show while loading */
  loadingText?: string
  /** Icon to show before text */
  leftIcon?: React.ReactNode
  /** Icon to show after text */
  rightIcon?: React.ReactNode
  /** Enable glow animation on hover */
  glowOnHover?: boolean
}

// =============================================================================
// BUTTON COMPONENT
// =============================================================================

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant,
      size,
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      disabled,
      children,
      glowOnHover = true,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading

    return (
      <motion.button
        className={`${buttonVariants({ variant, size })} ${className}`}
        ref={ref}
        disabled={isDisabled}
        whileHover={!isDisabled ? { scale: 1.02, y: -1 } : undefined}
        whileTap={!isDisabled ? { scale: 0.98 } : undefined}
        transition={{ duration: 0.15 }}
        {...props}
      >
        {/* Shimmer effect on hover */}
        {glowOnHover && !isDisabled && (
          <span className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700 ease-out" />
        )}

        {/* Loading State */}
        {isLoading && (
          <Loader2 className="h-4 w-4 animate-spin" />
        )}

        {/* Left Icon */}
        {!isLoading && leftIcon && leftIcon}

        {/* Button Text */}
        <span>{isLoading && loadingText ? loadingText : children}</span>

        {/* Right Icon */}
        {!isLoading && rightIcon && rightIcon}
      </motion.button>
    )
  }
)

Button.displayName = "Button"

// =============================================================================
// ICON BUTTON - Simplified for icon-only buttons
// =============================================================================

export interface IconButtonProps
  extends Omit<ButtonProps, "leftIcon" | "rightIcon" | "loadingText"> {
  /** Accessibility label (required for icon-only buttons) */
  "aria-label": string
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ size = "icon", children, ...props }, ref) => {
    return (
      <Button ref={ref} size={size} {...props}>
        {children}
      </Button>
    )
  }
)

IconButton.displayName = "IconButton"

// =============================================================================
// GRADIENT BUTTON - Extra premium variant
// =============================================================================

export interface GradientButtonProps extends Omit<ButtonProps, "variant"> {
  /** Gradient colors */
  gradient?: "blue-purple" | "purple-pink" | "green-teal" | "orange-red" | "custom"
  /** Custom gradient (when gradient="custom") */
  customGradient?: string
}

const gradientStyles = {
  "blue-purple": "from-[#5E6AD2] via-[#7C3AED] to-[#9333EA]",
  "purple-pink": "from-[#8B5CF6] via-[#D946EF] to-[#EC4899]",
  "green-teal": "from-[#10B981] via-[#14B8A6] to-[#06B6D4]",
  "orange-red": "from-[#F59E0B] via-[#EF4444] to-[#DC2626]",
  custom: "",
}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ gradient = "blue-purple", customGradient, className = "", children, ...props }, ref) => {
    const gradientClass = gradient === "custom" ? customGradient : gradientStyles[gradient]

    return (
      <motion.button
        ref={ref}
        className={`
          inline-flex items-center justify-center gap-2
          px-6 py-3 rounded-xl
          bg-gradient-to-r ${gradientClass}
          text-white font-semibold
          shadow-lg
          hover:shadow-[0_0_30px_rgba(94,106,210,0.5)]
          active:scale-[0.98]
          transition-all duration-200
          relative overflow-hidden
          ${className}
        `}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {/* Animated shine effect */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000 ease-out" />

        <span className="relative z-10 flex items-center gap-2">
          <>{children}</>
        </span>
      </motion.button>
    )
  }
)

GradientButton.displayName = "GradientButton"

// =============================================================================
// EXPORTS
// =============================================================================

export { Button, IconButton, GradientButton, buttonVariants }
