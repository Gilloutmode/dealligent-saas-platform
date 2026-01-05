"use client"

import * as React from "react"
import { motion } from "framer-motion"

// =============================================================================
// CDS PLATFORM - PREMIUM AVATAR COMPONENT
// 21st.dev inspired with gradients, glow effects, and animations
// =============================================================================

// =============================================================================
// AVATAR PROPS
// =============================================================================

export interface AvatarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  /** Image source URL */
  src?: string | null
  /** Alt text for image */
  alt?: string
  /** Fallback text (usually initials) */
  fallback?: string
  /** Full name (used to generate initials if fallback not provided) */
  name?: string
  /** Avatar size */
  size?: "xs" | "sm" | "default" | "lg" | "xl" | "2xl"
  /** Shape variant */
  shape?: "circle" | "square"
  /** Online status indicator */
  status?: "online" | "offline" | "busy" | "away"
  /** Border style */
  bordered?: boolean
  /** Glow effect on hover */
  glowOnHover?: boolean
  /** Gradient color scheme for fallback */
  gradient?: "blue" | "violet" | "emerald" | "amber" | "rose" | "cyan" | "indigo" | "teal"
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Generate initials from a name
 * "Jean Dupont" -> "JD"
 * "Jean-Pierre Dupont" -> "JD"
 */
function getInitials(name: string): string {
  const parts = name.trim().split(/[\s-]+/)
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase()
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

/**
 * Generate a consistent gradient index from a string
 */
function stringToGradientIndex(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return Math.abs(hash) % 8
}

// =============================================================================
// GRADIENT CONFIGURATIONS - 21st.dev Premium Gradients
// =============================================================================

const gradientColors = {
  blue: "from-[#5E6AD2] to-[#7C85DE]",
  violet: "from-[#8B5CF6] to-[#A78BFA]",
  emerald: "from-[#10B981] to-[#34D399]",
  amber: "from-[#F59E0B] to-[#FBBF24]",
  rose: "from-[#EC4899] to-[#F472B6]",
  cyan: "from-[#06B6D4] to-[#22D3EE]",
  indigo: "from-[#6366F1] to-[#818CF8]",
  teal: "from-[#14B8A6] to-[#2DD4BF]",
}

const gradientList = Object.keys(gradientColors) as Array<keyof typeof gradientColors>

// =============================================================================
// SIZE CONFIGURATIONS
// =============================================================================

const sizeConfig = {
  xs: {
    container: "h-6 w-6",
    text: "text-[10px]",
    status: "h-1.5 w-1.5",
    statusRing: "ring-1",
    statusGlow: "shadow-[0_0_4px_rgba(16,185,129,0.6)]",
  },
  sm: {
    container: "h-8 w-8",
    text: "text-xs",
    status: "h-2 w-2",
    statusRing: "ring-[1.5px]",
    statusGlow: "shadow-[0_0_6px_rgba(16,185,129,0.6)]",
  },
  default: {
    container: "h-10 w-10",
    text: "text-sm",
    status: "h-2.5 w-2.5",
    statusRing: "ring-2",
    statusGlow: "shadow-[0_0_8px_rgba(16,185,129,0.6)]",
  },
  lg: {
    container: "h-12 w-12",
    text: "text-base",
    status: "h-3 w-3",
    statusRing: "ring-2",
    statusGlow: "shadow-[0_0_10px_rgba(16,185,129,0.6)]",
  },
  xl: {
    container: "h-16 w-16",
    text: "text-xl",
    status: "h-4 w-4",
    statusRing: "ring-2",
    statusGlow: "shadow-[0_0_12px_rgba(16,185,129,0.6)]",
  },
  "2xl": {
    container: "h-24 w-24",
    text: "text-2xl",
    status: "h-5 w-5",
    statusRing: "ring-[3px]",
    statusGlow: "shadow-[0_0_14px_rgba(16,185,129,0.6)]",
  },
}

const statusColors = {
  online: {
    bg: "bg-[#10B981]",
    glow: "shadow-[0_0_8px_rgba(16,185,129,0.8)]",
  },
  offline: {
    bg: "bg-[var(--text-muted)]",
    glow: "",
  },
  busy: {
    bg: "bg-[#EF4444]",
    glow: "shadow-[0_0_8px_rgba(239,68,68,0.8)]",
  },
  away: {
    bg: "bg-[#F59E0B]",
    glow: "shadow-[0_0_8px_rgba(245,158,11,0.8)]",
  },
}

// =============================================================================
// AVATAR COMPONENT
// =============================================================================

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className = "",
      src,
      alt = "",
      fallback,
      name,
      size = "default",
      shape = "circle",
      status,
      bordered = false,
      glowOnHover = true,
      gradient,
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = React.useState(false)
    const config = sizeConfig[size]

    // Determine what to show
    const showImage = src && !imageError
    const initials = fallback || (name ? getInitials(name) : "?")

    // Determine gradient color
    const gradientKey = gradient || (name ? gradientList[stringToGradientIndex(name)] : "blue")
    const gradientClass = gradientColors[gradientKey]

    const shapeClass = shape === "circle" ? "rounded-full" : "rounded-xl"
    const borderClass = bordered
      ? "ring-2 ring-[var(--bg-card)] shadow-[0_0_0_1px_rgba(255,255,255,0.1)]"
      : ""

    return (
      <motion.div
        ref={ref}
        className={`relative inline-flex shrink-0 group ${className}`}
        whileHover={glowOnHover ? { scale: 1.05 } : undefined}
        whileTap={glowOnHover ? { scale: 0.98 } : undefined}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {/* Glow effect on hover */}
        {glowOnHover && (
          <div className={`
            absolute -inset-1 ${shapeClass}
            bg-gradient-to-br ${gradientClass}
            opacity-0 group-hover:opacity-40 blur-md
            transition-opacity duration-300 -z-10
          `} />
        )}

        {/* Avatar Container */}
        <div
          className={`
            ${config.container}
            ${shapeClass}
            ${borderClass}
            overflow-hidden
            flex items-center justify-center
            transition-all duration-300
            ${showImage
              ? "bg-[var(--bg-elevated)]"
              : `bg-gradient-to-br ${gradientClass}`
            }
            ${glowOnHover ? "group-hover:shadow-lg" : ""}
          `}
        >
          {showImage ? (
            <img
              src={src}
              alt={alt || name || "Avatar"}
              className="h-full w-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <span
              className={`${config.text} font-semibold text-white select-none drop-shadow-sm`}
            >
              {initials}
            </span>
          )}
        </div>

        {/* Status Indicator with Glow */}
        {status && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`
              absolute bottom-0 right-0
              ${config.status}
              ${statusColors[status].bg}
              ${statusColors[status].glow}
              ${shapeClass}
              ${config.statusRing}
              ring-[var(--bg-card)]
              transition-all duration-300
            `}
          />
        )}
      </motion.div>
    )
  }
)

Avatar.displayName = "Avatar"

// =============================================================================
// AVATAR GROUP - Stack multiple avatars with premium styling
// =============================================================================

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum avatars to show before "+X" */
  max?: number
  /** Size for all avatars */
  size?: AvatarProps["size"]
  /** Children should be Avatar components */
  children: React.ReactNode
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className = "", max = 5, size = "default", children, ...props }, ref) => {
    const childArray = React.Children.toArray(children)
    const visibleAvatars = childArray.slice(0, max)
    const remainingCount = childArray.length - max

    return (
      <div
        ref={ref}
        className={`flex -space-x-2 ${className}`}
        {...props}
      >
        {visibleAvatars.map((child, index) => {
          if (React.isValidElement<AvatarProps>(child)) {
            return React.cloneElement(child, {
              key: index,
              size,
              bordered: true,
              glowOnHover: true,
              className: "hover:z-10",
            })
          }
          return child
        })}

        {/* Overflow indicator with glass effect */}
        {remainingCount > 0 && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`
              ${sizeConfig[size].container}
              rounded-full
              bg-[var(--bg-elevated)]/80
              backdrop-blur-sm
              border border-white/10
              ring-2 ring-[var(--bg-card)]
              flex items-center justify-center
              ${sizeConfig[size].text}
              font-semibold text-[var(--text-secondary)]
              cursor-pointer
              hover:bg-[var(--bg-elevated)]
              hover:text-[var(--text-primary)]
              transition-all duration-300
              shadow-[0_0_0_1px_rgba(255,255,255,0.05)]
            `}
          >
            +{remainingCount}
          </motion.div>
        )}
      </div>
    )
  }
)

AvatarGroup.displayName = "AvatarGroup"

// =============================================================================
// AVATAR WITH BADGE - Avatar with notification badge
// =============================================================================

export interface AvatarWithBadgeProps extends AvatarProps {
  /** Badge count (0 = no badge, >99 shows "99+") */
  badgeCount?: number
  /** Badge color */
  badgeColor?: "primary" | "success" | "warning" | "danger"
}

const badgeColors = {
  primary: "bg-[#5E6AD2] shadow-[0_0_8px_rgba(94,106,210,0.6)]",
  success: "bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,0.6)]",
  warning: "bg-[#F59E0B] shadow-[0_0_8px_rgba(245,158,11,0.6)]",
  danger: "bg-[#EF4444] shadow-[0_0_8px_rgba(239,68,68,0.6)]",
}

const AvatarWithBadge = React.forwardRef<HTMLDivElement, AvatarWithBadgeProps>(
  ({ badgeCount = 0, badgeColor = "danger", ...avatarProps }, ref) => {
    const displayCount = badgeCount > 99 ? "99+" : badgeCount

    return (
      <div className="relative inline-flex">
        <Avatar ref={ref} {...avatarProps} />

        {badgeCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`
              absolute -top-1 -right-1
              min-w-[18px] h-[18px]
              px-1 rounded-full
              ${badgeColors[badgeColor]}
              text-[10px] font-bold text-white
              flex items-center justify-center
              ring-2 ring-[var(--bg-card)]
            `}
          >
            {displayCount}
          </motion.span>
        )}
      </div>
    )
  }
)

AvatarWithBadge.displayName = "AvatarWithBadge"

// =============================================================================
// EXPORTS
// =============================================================================

export { Avatar, AvatarGroup, AvatarWithBadge }
