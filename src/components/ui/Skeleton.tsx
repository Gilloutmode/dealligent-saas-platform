"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

// =============================================================================
// CDS PLATFORM - SKELETON COMPONENT
// Loading placeholders with shimmer animation
// =============================================================================

const skeletonVariants = cva(
  // Base styles - shimmer animation
  "relative overflow-hidden bg-[var(--bg-tertiary)] before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-[var(--bg-elevated)] before:to-transparent",
  {
    variants: {
      variant: {
        // Default - generic skeleton
        default: "rounded-md",
        // Text - for text content
        text: "rounded h-4 w-full",
        // Title - for headings
        title: "rounded h-6 w-3/4",
        // Avatar - circular
        avatar: "rounded-full",
        // Card - for card placeholders
        card: "rounded-xl",
        // Button - for button placeholders
        button: "rounded-lg h-10",
        // Image - for image placeholders
        image: "rounded-lg aspect-video",
        // Badge - for badge placeholders
        badge: "rounded-full h-5 w-16",
        // Input - for input placeholders
        input: "rounded-lg h-11",
      },
      animation: {
        // Shimmer - default sliding highlight
        shimmer: "",
        // Pulse - fading in/out
        pulse: "animate-pulse before:hidden",
        // None - static skeleton
        none: "before:hidden",
      },
    },
    defaultVariants: {
      variant: "default",
      animation: "shimmer",
    },
  }
)

// =============================================================================
// SKELETON PROPS
// =============================================================================

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  /** Width of the skeleton */
  width?: string | number
  /** Height of the skeleton */
  height?: string | number
  /** Whether to show the skeleton (for conditional rendering) */
  loading?: boolean
  /** Children to show when not loading */
  children?: React.ReactNode
}

// =============================================================================
// SKELETON COMPONENT
// =============================================================================

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      className = "",
      variant,
      animation,
      width,
      height,
      loading = true,
      children,
      style,
      ...props
    },
    ref
  ) => {
    // If not loading and has children, render children
    if (!loading && children) {
      return <>{children}</>
    }

    // If not loading and no children, render nothing
    if (!loading) {
      return null
    }

    return (
      <div
        ref={ref}
        className={`${skeletonVariants({ variant, animation })} ${className}`}
        style={{
          width: typeof width === "number" ? `${width}px` : width,
          height: typeof height === "number" ? `${height}px` : height,
          ...style,
        }}
        aria-hidden="true"
        role="presentation"
        {...props}
      />
    )
  }
)

Skeleton.displayName = "Skeleton"

// =============================================================================
// SKELETON TEXT - Multiple lines of text
// =============================================================================

export interface SkeletonTextProps {
  /** Number of lines to render */
  lines?: number
  /** Gap between lines */
  gap?: "sm" | "md" | "lg"
  /** Width of the last line (percentage) */
  lastLineWidth?: string
  /** Additional class names */
  className?: string
}

const SkeletonText: React.FC<SkeletonTextProps> = ({
  lines = 3,
  gap = "md",
  lastLineWidth = "60%",
  className = "",
}) => {
  const gapClasses = {
    sm: "space-y-1",
    md: "space-y-2",
    lg: "space-y-3",
  }

  return (
    <div className={`${gapClasses[gap]} ${className}`} aria-hidden="true">
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          style={{
            width: index === lines - 1 ? lastLineWidth : "100%",
          }}
        />
      ))}
    </div>
  )
}

// =============================================================================
// SKELETON AVATAR - User avatar placeholder
// =============================================================================

export interface SkeletonAvatarProps {
  /** Size of the avatar */
  size?: "sm" | "md" | "lg" | "xl"
  /** Additional class names */
  className?: string
}

const SkeletonAvatar: React.FC<SkeletonAvatarProps> = ({
  size = "md",
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  }

  return (
    <Skeleton
      variant="avatar"
      className={`${sizeClasses[size]} ${className}`}
    />
  )
}

// =============================================================================
// SKELETON CARD - Card placeholder with header, body, footer
// =============================================================================

export interface SkeletonCardProps {
  /** Show header section */
  hasHeader?: boolean
  /** Show image/media section */
  hasMedia?: boolean
  /** Number of text lines in body */
  bodyLines?: number
  /** Show footer section */
  hasFooter?: boolean
  /** Additional class names */
  className?: string
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({
  hasHeader = true,
  hasMedia = false,
  bodyLines = 3,
  hasFooter = false,
  className = "",
}) => {
  return (
    <div
      className={`p-4 rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] space-y-4 ${className}`}
      aria-hidden="true"
    >
      {/* Header with avatar and title */}
      {hasHeader && (
        <div className="flex items-center gap-3">
          <SkeletonAvatar size="md" />
          <div className="flex-1 space-y-2">
            <Skeleton variant="title" width="50%" />
            <Skeleton variant="text" width="30%" height={12} />
          </div>
        </div>
      )}

      {/* Media placeholder */}
      {hasMedia && <Skeleton variant="image" className="w-full" />}

      {/* Body text */}
      <SkeletonText lines={bodyLines} />

      {/* Footer with buttons */}
      {hasFooter && (
        <div className="flex items-center gap-2 pt-2 border-t border-[var(--border-default)]">
          <Skeleton variant="button" width={80} />
          <Skeleton variant="button" width={80} />
        </div>
      )}
    </div>
  )
}

// =============================================================================
// SKELETON TABLE - Table rows placeholder
// =============================================================================

export interface SkeletonTableProps {
  /** Number of rows */
  rows?: number
  /** Number of columns */
  columns?: number
  /** Show table header */
  hasHeader?: boolean
  /** Additional class names */
  className?: string
}

const SkeletonTable: React.FC<SkeletonTableProps> = ({
  rows = 5,
  columns = 4,
  hasHeader = true,
  className = "",
}) => {
  return (
    <div className={`space-y-3 ${className}`} aria-hidden="true">
      {/* Header row */}
      {hasHeader && (
        <div className="flex gap-4 pb-3 border-b border-[var(--border-default)]">
          {Array.from({ length: columns }).map((_, index) => (
            <Skeleton
              key={`header-${index}`}
              variant="text"
              className="flex-1"
              height={16}
            />
          ))}
        </div>
      )}

      {/* Data rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex gap-4 items-center">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton
              key={`cell-${rowIndex}-${colIndex}`}
              variant="text"
              className="flex-1"
              height={14}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

// =============================================================================
// SKELETON STAT CARD - Statistics card placeholder
// =============================================================================

export interface SkeletonStatCardProps {
  /** Show icon */
  hasIcon?: boolean
  /** Show trend indicator */
  hasTrend?: boolean
  /** Additional class names */
  className?: string
}

const SkeletonStatCard: React.FC<SkeletonStatCardProps> = ({
  hasIcon = true,
  hasTrend = true,
  className = "",
}) => {
  return (
    <div
      className={`p-5 rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] ${className}`}
      aria-hidden="true"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-3 flex-1">
          {/* Label */}
          <Skeleton variant="text" width="60%" height={14} />
          {/* Value */}
          <Skeleton variant="title" width="40%" height={32} />
          {/* Trend */}
          {hasTrend && <Skeleton variant="badge" width={60} />}
        </div>
        {/* Icon */}
        {hasIcon && (
          <Skeleton variant="default" className="w-12 h-12 rounded-xl" />
        )}
      </div>
    </div>
  )
}

// =============================================================================
// SKELETON LIST - List items placeholder
// =============================================================================

export interface SkeletonListProps {
  /** Number of items */
  items?: number
  /** Show avatar for each item */
  hasAvatar?: boolean
  /** Show secondary text */
  hasSecondary?: boolean
  /** Show action button */
  hasAction?: boolean
  /** Additional class names */
  className?: string
}

const SkeletonList: React.FC<SkeletonListProps> = ({
  items = 5,
  hasAvatar = true,
  hasSecondary = true,
  hasAction = false,
  className = "",
}) => {
  return (
    <div className={`space-y-3 ${className}`} aria-hidden="true">
      {Array.from({ length: items }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-3 p-3 rounded-lg border border-[var(--border-default)]"
        >
          {hasAvatar && <SkeletonAvatar size="md" />}
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" width="70%" />
            {hasSecondary && (
              <Skeleton variant="text" width="40%" height={12} />
            )}
          </div>
          {hasAction && <Skeleton variant="button" width={60} height={32} />}
        </div>
      ))}
    </div>
  )
}

// =============================================================================
// EXPORTS
// =============================================================================

export {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonTable,
  SkeletonStatCard,
  SkeletonList,
  skeletonVariants,
}
