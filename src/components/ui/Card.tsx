"use client"

import * as React from "react"
import { motion, type HTMLMotionProps } from "framer-motion"

// =============================================================================
// CDS PLATFORM - PREMIUM GLASS CARD COMPONENT
// 21st.dev inspired glassmorphism design system
// =============================================================================

// =============================================================================
// CARD ROOT - Glassmorphism Style
// =============================================================================

export interface CardProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  /** Card visual variant */
  variant?: "glass" | "glass-elevated" | "glass-subtle" | "solid" | "outlined" | "premium-v2" | "stat-animated"
  /** Hover effect */
  hoverable?: boolean
  /** Click handler (makes card interactive) */
  onClick?: () => void
  /** Glow color on hover */
  glowColor?: "primary" | "success" | "warning" | "danger" | "purple"
  /** Children */
  children?: React.ReactNode
  /** Class name */
  className?: string
}

const glowColors = {
  primary: "from-[var(--accent-primary)]/20 via-[var(--accent-primary)]/10 to-transparent",
  success: "from-[#10B981]/20 via-[#10B981]/10 to-transparent",
  warning: "from-[#F59E0B]/20 via-[#F59E0B]/10 to-transparent",
  danger: "from-[#EF4444]/20 via-[#EF4444]/10 to-transparent",
  purple: "from-[#8B5CF6]/20 via-[#8B5CF6]/10 to-transparent",
}

// Linear/Vercel-style card variants - clean borders, minimal blur
const variants = {
  glass: `
    bg-[var(--bg-card)]
    border border-[var(--border-default)]
    shadow-[var(--shadow-sm)]
  `,
  "glass-elevated": `
    bg-[var(--bg-elevated)]
    border border-[var(--border-hover)]
    shadow-[var(--shadow-md)]
  `,
  "glass-subtle": `
    bg-[var(--bg-secondary)]
    border border-[var(--border-light)]
  `,
  solid: `
    bg-[var(--bg-card)]
    border border-[var(--border-default)]
  `,
  outlined: `
    bg-transparent
    border border-[var(--border-default)]
    hover:border-[var(--border-hover)]
  `,
  // T1: Premium V2 variants with CSS-based animations
  "premium-v2": `card-premium-v2`,
  "stat-animated": `stat-card-animated`,
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({
    className = "",
    variant = "glass",
    hoverable = false,
    onClick,
    glowColor = "primary",
    children,
    ...props
  }, ref) => {
    const isInteractive = hoverable || onClick

    return (
      <motion.div
        ref={ref}
        className={`
          relative overflow-hidden rounded-2xl
          ${variants[variant]}
          transition-all duration-300 ease-out
          ${isInteractive ? 'cursor-pointer' : ''}
          group
          ${className}
        `}
        onClick={onClick}
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : undefined}
        whileHover={isInteractive ? {
          y: -4,
          scale: 1.01,
          transition: { duration: 0.2 }
        } : undefined}
        whileTap={isInteractive ? { scale: 0.99 } : undefined}
        {...props}
      >
        {/* Glow effect on hover */}
        {isInteractive && (
          <div className={`
            absolute -inset-1 bg-gradient-to-br ${glowColors[glowColor]}
            rounded-2xl opacity-0 group-hover:opacity-100 blur-xl
            transition-opacity duration-500 -z-10
          `} />
        )}

        {/* Top accent line */}
        {isInteractive && (
          <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-primary)]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}

        {/* Gradient overlay on hover */}
        {isInteractive && (
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
        )}

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    )
  }
)

Card.displayName = "Card"

// =============================================================================
// CARD HEADER
// =============================================================================

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Action element (button, menu, etc.) */
  action?: React.ReactNode
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className = "", action, children, ...props }, ref) => (
    <div
      ref={ref}
      className={`flex flex-col space-y-1.5 p-6 ${className}`}
      {...props}
    >
      {action ? (
        <div className="flex items-start justify-between">
          <div className="flex flex-col space-y-1.5">{children}</div>
          {action}
        </div>
      ) : (
        children
      )}
    </div>
  )
)

CardHeader.displayName = "CardHeader"

// =============================================================================
// CARD TITLE
// =============================================================================

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className = "", children, ...props }, ref) => (
  <h3
    ref={ref}
    className={`text-lg font-semibold leading-none tracking-tight text-[var(--text-primary)] ${className}`}
    {...props}
  >
    {children}
  </h3>
))

CardTitle.displayName = "CardTitle"

// =============================================================================
// CARD DESCRIPTION
// =============================================================================

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className = "", ...props }, ref) => (
  <p
    ref={ref}
    className={`text-sm text-[var(--text-secondary)] ${className}`}
    {...props}
  />
))

CardDescription.displayName = "CardDescription"

// =============================================================================
// CARD CONTENT
// =============================================================================

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={`p-6 pt-0 ${className}`}
    {...props}
  />
))

CardContent.displayName = "CardContent"

// =============================================================================
// CARD FOOTER
// =============================================================================

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={`flex items-center p-6 pt-0 ${className}`}
    {...props}
  />
))

CardFooter.displayName = "CardFooter"

// =============================================================================
// PREMIUM STAT CARD - Glass version with sparkline support
// =============================================================================

export interface StatCardProps {
  /** Stat label/title */
  label: string
  /** Main value to display */
  value: string | number
  /** Optional subtitle/description */
  description?: string
  /** Trend indicator (+12%, -5%, etc.) */
  trend?: {
    value: number
    label?: string
  }
  /** Icon to display */
  icon?: React.ReactNode
  /** Icon background color */
  iconBg?: "blue" | "violet" | "emerald" | "amber" | "red" | "gray"
  /** Loading state */
  isLoading?: boolean
  /** Click handler */
  onClick?: () => void
}

const iconBgColors = {
  blue: "bg-gradient-to-br from-[#5E6AD2] to-[#7C85DE]",
  violet: "bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA]",
  emerald: "bg-gradient-to-br from-[#10B981] to-[#34D399]",
  amber: "bg-gradient-to-br from-[#F59E0B] to-[#FBBF24]",
  red: "bg-gradient-to-br from-[#EF4444] to-[#F87171]",
  gray: "bg-gradient-to-br from-[#6B7280] to-[#9CA3AF]",
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      label,
      value,
      description,
      trend,
      icon,
      iconBg = "blue",
      isLoading = false,
      onClick,
    },
    ref
  ) => {
    if (isLoading) {
      return (
        <Card ref={ref} hoverable={!!onClick} onClick={onClick} variant="glass">
          <CardContent className="p-6">
            <div className="animate-pulse">
              <div className="h-4 w-24 bg-[var(--bg-elevated)] rounded mb-3" />
              <div className="h-8 w-32 bg-[var(--bg-elevated)] rounded mb-2" />
              <div className="h-4 w-20 bg-[var(--bg-elevated)] rounded" />
            </div>
          </CardContent>
        </Card>
      )
    }

    return (
      <Card ref={ref} hoverable={!!onClick} onClick={onClick} variant="glass">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {/* Label */}
              <p className="text-sm font-medium text-[var(--text-secondary)] mb-1">{label}</p>

              {/* Value */}
              <p className="text-2xl font-bold text-[var(--text-primary)] mb-1">{value}</p>

              {/* Description or Trend */}
              <div className="flex items-center gap-2">
                {trend && (
                  <span
                    className={`
                      inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold
                      ${trend.value >= 0
                        ? 'bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/20'
                        : 'bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/20'
                      }
                    `}
                  >
                    {trend.value >= 0 ? "+" : ""}
                    {trend.value}%
                  </span>
                )}
                {(description || trend?.label) && (
                  <span className="text-sm text-[var(--text-muted)]">
                    {trend?.label || description}
                  </span>
                )}
              </div>
            </div>

            {/* Icon */}
            {icon && (
              <div className={`
                flex-shrink-0 p-3 rounded-xl ${iconBgColors[iconBg]}
                shadow-lg
                group-hover:scale-110 transition-transform duration-300
              `}>
                <div className="text-white">
                  {icon}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }
)

StatCard.displayName = "StatCard"

// =============================================================================
// EXPORTS
// =============================================================================

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  StatCard,
}
