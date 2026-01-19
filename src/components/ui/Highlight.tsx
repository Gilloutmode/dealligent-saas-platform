"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

// =============================================================================
// DEALLIGENT PLATFORM - HIGHLIGHT COMPONENT
// 3 types: Risk (red), Opportunity (green), Compare (blue)
// =============================================================================

const highlightVariants = cva(
  // Base styles - subtle rounded highlight for sentence-level highlighting
  "px-1.5 py-0.5 rounded-md font-medium transition-colors",
  {
    variants: {
      variant: {
        // Risk - Red for risks/threats/dangers
        risk: "bg-[var(--highlight-risk-bg)] text-[var(--highlight-risk-text)]",
        // Opportunity - Green for opportunities/advantages
        opportunity: "bg-[var(--highlight-opportunity-bg)] text-[var(--highlight-opportunity-text)]",
        // Compare - Blue for comparisons (vs, versus)
        compare: "bg-[var(--highlight-compare-bg)] text-[var(--highlight-compare-text)]",
      },
    },
    defaultVariants: {
      variant: "risk",
    },
  }
)

// =============================================================================
// HIGHLIGHT PROPS
// =============================================================================

export interface HighlightProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof highlightVariants> {
  /** The text content to highlight */
  children: React.ReactNode
}

// =============================================================================
// HIGHLIGHT COMPONENT
// =============================================================================

const Highlight = React.forwardRef<HTMLSpanElement, HighlightProps>(
  ({ className = "", variant, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={`${highlightVariants({ variant })} ${className}`}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Highlight.displayName = "Highlight"

// =============================================================================
// EXPORTS
// =============================================================================

export { Highlight, highlightVariants }
export type HighlightVariant = NonNullable<VariantProps<typeof highlightVariants>["variant"]>
