"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

// =============================================================================
// CDS PLATFORM - BADGE COMPONENT
// Status indicators, tags, and notification badges
// =============================================================================

const badgeVariants = cva(
  // Base styles
  "inline-flex items-center rounded-full font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[var(--blue-primary)]/30 focus:ring-offset-2",
  {
    variants: {
      variant: {
        // Default - Uses theme variables
        default: "bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-default)]",
        // Primary - CDS Blue with theme support
        primary: "bg-[var(--info-bg)] text-[var(--info-text)] border border-[var(--info-border)]",
        // Secondary - CDS Violet
        secondary: "bg-[rgba(139,92,246,0.1)] text-[#A78BFA] border border-[rgba(139,92,246,0.25)]",
        // Success - Green with theme support
        success: "bg-[var(--success-bg)] text-[var(--success-text)] border border-[var(--success-border)]",
        // Warning - Amber with theme support
        warning: "bg-[var(--warning-bg)] text-[var(--warning-text)] border border-[var(--warning-border)]",
        // Destructive/Danger - Red with theme support
        destructive: "bg-[var(--error-bg)] text-[var(--error-text)] border border-[var(--error-border)]",
        danger: "bg-[var(--error-bg)] text-[var(--error-text)] border border-[var(--error-border)]",
        // Info - Cyan
        info: "bg-[var(--info-bg)] text-[var(--info-text)] border border-[var(--info-border)]",
        // Purple (for products, tags, etc.)
        purple: "bg-[rgba(139,92,246,0.1)] text-[#A78BFA] border border-[rgba(139,92,246,0.25)]",
        // Outline variants
        "outline-default": "border border-[var(--border-default)] text-[var(--text-muted)] bg-transparent",
        "outline-primary": "border border-[var(--info-border)] text-[var(--info-text)] bg-transparent",
        "outline-success": "border border-[var(--success-border)] text-[var(--success-text)] bg-transparent",
        "outline-warning": "border border-[var(--warning-border)] text-[var(--warning-text)] bg-transparent",
        "outline-destructive": "border border-[var(--error-border)] text-[var(--error-text)] bg-transparent",
        // Glow variants - premium look with shadow
        "glow-primary": "bg-gradient-to-r from-[rgba(21,134,255,0.2)] to-[rgba(82,164,239,0.15)] text-[#52A4EF] border border-[rgba(21,134,255,0.3)] shadow-[0_0_12px_rgba(21,134,255,0.2)]",
        "glow-success": "bg-gradient-to-r from-[rgba(21,255,171,0.2)] to-[rgba(16,185,129,0.15)] text-[var(--success-text)] border border-[rgba(21,255,171,0.3)] shadow-[0_0_12px_rgba(21,255,171,0.2)]",
        "glow-warning": "bg-gradient-to-r from-[rgba(245,158,11,0.2)] to-[rgba(217,119,6,0.15)] text-[#FBBF24] border border-[rgba(245,158,11,0.3)] shadow-[0_0_12px_rgba(245,158,11,0.2)]",
        "glow-danger": "bg-gradient-to-r from-[rgba(239,68,68,0.2)] to-[rgba(220,38,38,0.15)] text-[#F87171] border border-[rgba(239,68,68,0.3)] shadow-[0_0_12px_rgba(239,68,68,0.2)]",
        "glow-purple": "bg-gradient-to-r from-[rgba(139,92,246,0.2)] to-[rgba(167,139,250,0.15)] text-[#A78BFA] border border-[rgba(139,92,246,0.3)] shadow-[0_0_12px_rgba(139,92,246,0.2)]",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        default: "px-2.5 py-0.5 text-xs",
        md: "px-2.5 py-1 text-xs",
        lg: "px-3 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// =============================================================================
// BADGE PROPS
// =============================================================================

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  /** Icon to show before text */
  icon?: React.ReactNode
  /** Show dot indicator */
  dot?: boolean
  /** Dot color (when dot is true) */
  dotColor?: "blue" | "green" | "red" | "amber" | "gray"
  /** Make badge removable */
  onRemove?: () => void
}

// =============================================================================
// BADGE COMPONENT
// =============================================================================

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      className = "",
      variant,
      size,
      icon,
      dot,
      dotColor = "blue",
      onRemove,
      children,
      ...props
    },
    ref
  ) => {
    const dotColors = {
      blue: "bg-blue-500",
      green: "bg-emerald-500",
      red: "bg-red-500",
      amber: "bg-amber-500",
      gray: "bg-gray-500",
    }

    return (
      <div
        ref={ref}
        className={`${badgeVariants({ variant, size })} ${className}`}
        {...props}
      >
        {/* Status Dot */}
        {dot && (
          <span
            className={`w-1.5 h-1.5 rounded-full mr-1.5 ${dotColors[dotColor]}`}
          />
        )}

        {/* Icon */}
        {icon && <span className="mr-1 -ml-0.5 [&_svg]:h-3 [&_svg]:w-3">{icon}</span>}

        {/* Content */}
        {children}

        {/* Remove Button */}
        {onRemove && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onRemove()
            }}
            className="ml-1 -mr-1 h-4 w-4 rounded-full inline-flex items-center justify-center hover:bg-black/10 transition-colors"
            aria-label="Supprimer"
          >
            <svg
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    )
  }
)

Badge.displayName = "Badge"

// =============================================================================
// NOTIFICATION BADGE - For counts on icons
// =============================================================================

export interface NotificationBadgeProps {
  /** Count to display */
  count?: number
  /** Maximum count before showing "+" */
  max?: number
  /** Show as dot only (no count) */
  dot?: boolean
  /** Badge color */
  color?: "red" | "blue" | "green" | "amber"
  /** Position relative to children */
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left"
  /** Children to wrap */
  children: React.ReactNode
}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  count,
  max = 99,
  dot = false,
  color = "red",
  position = "top-right",
  children,
}) => {
  const colors = {
    red: "bg-red-500",
    blue: "bg-blue-500",
    green: "bg-emerald-500",
    amber: "bg-amber-500",
  }

  const positions = {
    "top-right": "-top-1 -right-1",
    "top-left": "-top-1 -left-1",
    "bottom-right": "-bottom-1 -right-1",
    "bottom-left": "-bottom-1 -left-1",
  }

  const displayCount = count && count > max ? `${max}+` : count

  // Don't show badge if count is 0 or undefined (unless dot mode)
  const showBadge = dot || (count && count > 0)

  return (
    <span className="relative inline-flex">
      {children}
      {showBadge && (
        <span
          className={`absolute ${positions[position]} flex items-center justify-center ${colors[color]} text-white text-xs font-bold ${
            dot
              ? "h-2.5 w-2.5 rounded-full"
              : "min-w-[18px] h-[18px] px-1 rounded-full"
          }`}
        >
          {!dot && displayCount}
        </span>
      )}
    </span>
  )
}

// =============================================================================
// STATUS BADGE - Pre-configured for common statuses
// =============================================================================

export type StatusType =
  | "active"
  | "inactive"
  | "pending"
  | "completed"
  | "error"
  | "draft"
  | "published"
  | "archived"
  | "locked"

const statusConfig: Record<
  StatusType,
  { variant: BadgeProps["variant"]; label: string; dotColor: BadgeProps["dotColor"] }
> = {
  active: { variant: "success", label: "Actif", dotColor: "green" },
  inactive: { variant: "default", label: "Inactif", dotColor: "gray" },
  pending: { variant: "warning", label: "En attente", dotColor: "amber" },
  completed: { variant: "success", label: "Terminé", dotColor: "green" },
  error: { variant: "destructive", label: "Erreur", dotColor: "red" },
  draft: { variant: "default", label: "Brouillon", dotColor: "gray" },
  published: { variant: "primary", label: "Publié", dotColor: "blue" },
  archived: { variant: "default", label: "Archivé", dotColor: "gray" },
  locked: { variant: "warning", label: "Verrouillé", dotColor: "amber" },
}

export interface StatusBadgeProps extends Omit<BadgeProps, "variant" | "dot" | "dotColor"> {
  status: StatusType
  showDot?: boolean
  customLabel?: string
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  showDot = true,
  customLabel,
  ...props
}) => {
  const config = statusConfig[status]

  return (
    <Badge
      variant={config.variant}
      dot={showDot}
      dotColor={config.dotColor}
      {...props}
    >
      {customLabel || config.label}
    </Badge>
  )
}

// =============================================================================
// EXPORTS
// =============================================================================

export { Badge, NotificationBadge, StatusBadge, badgeVariants }
