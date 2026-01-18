// =============================================================================
// CDS PLATFORM - UI COMPONENTS INDEX
// Centralized exports for all UI components
// =============================================================================

// Button
export { Button, IconButton, buttonVariants } from "./Button"
export type { ButtonProps, IconButtonProps } from "./Button"

// Card
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  StatCard,
} from "./Card"
export type { CardProps, CardHeaderProps, StatCardProps } from "./Card"

// Badge
export {
  Badge,
  NotificationBadge,
  StatusBadge,
  badgeVariants,
} from "./Badge"
export type {
  BadgeProps,
  NotificationBadgeProps,
  StatusBadgeProps,
  StatusType,
} from "./Badge"

// Avatar
export { Avatar, AvatarGroup } from "./Avatar"
export type { AvatarProps, AvatarGroupProps } from "./Avatar"

// Input
export {
  Input,
  SearchInput,
  Textarea,
  Label,
  FormField,
} from "./Input"
export type {
  InputProps,
  SearchInputProps,
  TextareaProps,
  LabelProps,
  FormFieldProps,
} from "./Input"

// =============================================================================
// AURORA DESIGN SYSTEM COMPONENTS
// =============================================================================

// GlassPanel - Enterprise-grade glass morphism panel
export { GlassPanel } from "./GlassPanel"

// IconWrapper - Icon with glow effect
export { IconWrapper } from "./IconWrapper"

// RotatingEarth - Interactive 3D globe
export { default as RotatingEarth } from "./RotatingEarth"

// AuroraStatusBadge - Threat level status badge
export { AuroraStatusBadge } from "./AuroraStatusBadge"
export type { ThreatLevel } from "./AuroraStatusBadge"
