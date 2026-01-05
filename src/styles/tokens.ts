// =============================================================================
// CDS PLATFORM - DESIGN TOKENS
// Centralized design system tokens with TypeScript support
// =============================================================================

// =============================================================================
// COLOR TOKENS
// =============================================================================

/**
 * Brand colors - constant across themes
 */
export const brandColors = {
  blue: {
    primary: "var(--blue-primary)",      // #1586FF
    secondary: "var(--blue-secondary)",  // #52A4EF
    navy: "var(--blue-navy)",            // #207ED5
  },
  green: {
    success: "var(--green-success)",     // #15FFAB
    muted: "var(--green-muted)",         // #10B981
  },
  red: {
    error: "var(--red-error)",           // #EF4444
  },
  orange: {
    warning: "var(--orange-warning)",    // #F59E0B
  },
  yellow: {
    accent: "var(--yellow-accent)",      // #FBBF24
  },
  purple: {
    primary: "#8B5CF6",
    light: "#A78BFA",
  },
} as const

/**
 * Semantic colors - theme-aware
 */
export const semanticColors = {
  background: {
    primary: "var(--bg-primary)",
    secondary: "var(--bg-secondary)",
    card: "var(--bg-card)",
    cardHover: "var(--bg-card-hover)",
    elevated: "var(--bg-elevated)",
    input: "var(--bg-input)",
    tertiary: "var(--bg-tertiary)",
  },
  text: {
    primary: "var(--text-primary)",
    secondary: "var(--text-secondary)",
    muted: "var(--text-muted)",
    disabled: "var(--text-disabled)",
  },
  border: {
    default: "var(--border-default)",
    light: "var(--border-light)",
    hover: "var(--border-hover)",
    active: "var(--border-active)",
  },
  sidebar: {
    bg: "var(--sidebar-bg)",
    itemHover: "var(--sidebar-item-hover)",
    itemActive: "var(--sidebar-item-active)",
    text: "var(--sidebar-text)",
    textActive: "var(--sidebar-text-active)",
  },
} as const

/**
 * Status colors - for alerts, badges, notifications
 */
export const statusColors = {
  success: {
    bg: "var(--success-bg)",
    border: "var(--success-border)",
    text: "var(--success-text)",
  },
  error: {
    bg: "var(--error-bg)",
    border: "var(--error-border)",
    text: "var(--error-text)",
  },
  warning: {
    bg: "var(--warning-bg)",
    border: "var(--warning-border)",
    text: "var(--warning-text)",
  },
  info: {
    bg: "var(--info-bg)",
    border: "var(--info-border)",
    text: "var(--info-text)",
  },
} as const

// =============================================================================
// SPACING TOKENS
// =============================================================================

/**
 * Spacing scale (in rem) - follows 4px base grid
 */
export const spacing = {
  0: "0",
  0.5: "0.125rem",   // 2px
  1: "0.25rem",      // 4px
  1.5: "0.375rem",   // 6px
  2: "0.5rem",       // 8px
  2.5: "0.625rem",   // 10px
  3: "0.75rem",      // 12px
  3.5: "0.875rem",   // 14px
  4: "1rem",         // 16px
  5: "1.25rem",      // 20px
  6: "1.5rem",       // 24px
  7: "1.75rem",      // 28px
  8: "2rem",         // 32px
  9: "2.25rem",      // 36px
  10: "2.5rem",      // 40px
  11: "2.75rem",     // 44px
  12: "3rem",        // 48px
  14: "3.5rem",      // 56px
  16: "4rem",        // 64px
  20: "5rem",        // 80px
  24: "6rem",        // 96px
  28: "7rem",        // 112px
  32: "8rem",        // 128px
} as const

// =============================================================================
// TYPOGRAPHY TOKENS
// =============================================================================

/**
 * Font families
 */
export const fontFamily = {
  sans: "Inter, system-ui, -apple-system, sans-serif",
  mono: "JetBrains Mono, Fira Code, Consolas, monospace",
} as const

/**
 * Font sizes with line heights
 */
export const fontSize = {
  xs: { size: "0.75rem", lineHeight: "1rem" },         // 12px
  sm: { size: "0.875rem", lineHeight: "1.25rem" },     // 14px
  base: { size: "1rem", lineHeight: "1.5rem" },        // 16px
  lg: { size: "1.125rem", lineHeight: "1.75rem" },     // 18px
  xl: { size: "1.25rem", lineHeight: "1.75rem" },      // 20px
  "2xl": { size: "1.5rem", lineHeight: "2rem" },       // 24px
  "3xl": { size: "1.875rem", lineHeight: "2.25rem" },  // 30px
  "4xl": { size: "2.25rem", lineHeight: "2.5rem" },    // 36px
  "5xl": { size: "3rem", lineHeight: "1" },            // 48px
  "6xl": { size: "3.75rem", lineHeight: "1" },         // 60px
} as const

/**
 * Font weights
 */
export const fontWeight = {
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const

// =============================================================================
// BORDER TOKENS
// =============================================================================

/**
 * Border radius
 */
export const borderRadius = {
  none: "0",
  sm: "var(--radius-sm)",     // 0.5rem (8px)
  DEFAULT: "var(--radius)",   // 0.75rem (12px)
  lg: "var(--radius-lg)",     // 1rem (16px)
  xl: "var(--radius-xl)",     // 1.25rem (20px)
  "2xl": "1.5rem",            // 24px
  full: "9999px",
} as const

// =============================================================================
// SHADOW TOKENS
// =============================================================================

/**
 * Box shadows - theme-aware
 */
export const shadows = {
  sm: "var(--shadow-sm)",
  md: "var(--shadow-md)",
  lg: "var(--shadow-lg)",
  card: "var(--shadow-card)",
  // Premium glow shadows
  glowBlue: "0 0 20px rgba(21, 134, 255, 0.3)",
  glowGreen: "0 0 20px rgba(21, 255, 171, 0.3)",
  glowPurple: "0 0 20px rgba(139, 92, 246, 0.3)",
  glowOrange: "0 0 20px rgba(245, 158, 11, 0.3)",
} as const

// =============================================================================
// ANIMATION TOKENS
// =============================================================================

/**
 * Transition durations
 */
export const transitions = {
  fast: "var(--transition-fast)",    // 150ms
  base: "var(--transition-base)",    // 250ms
  slow: "var(--transition-slow)",    // 350ms
} as const

/**
 * Animation timing functions
 */
export const easing = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  // Custom easings for premium feel
  smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  snappy: "cubic-bezier(0.4, 0, 0.2, 1)",
} as const

/**
 * Framer Motion animation presets
 */
export const motionPresets = {
  // Fade in
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  },
  // Slide up
  slideUp: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  // Scale
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.2 },
  },
  // Card hover
  cardHover: {
    whileHover: { y: -4, scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2 },
  },
  // Button press
  buttonPress: {
    whileTap: { scale: 0.98 },
    transition: { duration: 0.1 },
  },
  // Stagger children
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  },
  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
  },
} as const

// =============================================================================
// Z-INDEX TOKENS
// =============================================================================

/**
 * Z-index scale for layering
 */
export const zIndex = {
  hide: -1,
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modal: 40,
  popover: 50,
  tooltip: 60,
  toast: 70,
  overlay: 80,
  max: 100,
} as const

// =============================================================================
// BREAKPOINT TOKENS
// =============================================================================

/**
 * Responsive breakpoints
 */
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const

/**
 * Media query helpers
 */
export const mediaQueries = {
  sm: `(min-width: ${breakpoints.sm})`,
  md: `(min-width: ${breakpoints.md})`,
  lg: `(min-width: ${breakpoints.lg})`,
  xl: `(min-width: ${breakpoints.xl})`,
  "2xl": `(min-width: ${breakpoints["2xl"]})`,
  prefersReducedMotion: "(prefers-reduced-motion: reduce)",
  prefersDark: "(prefers-color-scheme: dark)",
  prefersLight: "(prefers-color-scheme: light)",
} as const

// =============================================================================
// COMPONENT SIZE TOKENS
// =============================================================================

/**
 * Standard component sizes
 */
export const componentSizes = {
  button: {
    sm: { height: "32px", padding: "0 12px", fontSize: "0.875rem" },
    md: { height: "40px", padding: "0 16px", fontSize: "0.875rem" },
    lg: { height: "48px", padding: "0 24px", fontSize: "1rem" },
    xl: { height: "56px", padding: "0 32px", fontSize: "1.125rem" },
  },
  input: {
    sm: { height: "32px", padding: "0 12px", fontSize: "0.875rem" },
    md: { height: "40px", padding: "0 16px", fontSize: "0.875rem" },
    lg: { height: "48px", padding: "0 16px", fontSize: "1rem" },
  },
  avatar: {
    xs: "24px",
    sm: "32px",
    md: "40px",
    lg: "48px",
    xl: "64px",
    "2xl": "96px",
  },
  icon: {
    xs: "12px",
    sm: "16px",
    md: "20px",
    lg: "24px",
    xl: "32px",
  },
} as const

// =============================================================================
// UTILITY TYPE HELPERS
// =============================================================================

export type BrandColor = keyof typeof brandColors
export type SemanticColor = keyof typeof semanticColors
export type StatusColor = keyof typeof statusColors
export type Spacing = keyof typeof spacing
export type FontSize = keyof typeof fontSize
export type FontWeight = keyof typeof fontWeight
export type BorderRadius = keyof typeof borderRadius
export type Shadow = keyof typeof shadows
export type ZIndex = keyof typeof zIndex
export type Breakpoint = keyof typeof breakpoints
export type ComponentSize = "sm" | "md" | "lg" | "xl"

// =============================================================================
// COMPLETE TOKEN EXPORT
// =============================================================================

export const tokens = {
  colors: {
    brand: brandColors,
    semantic: semanticColors,
    status: statusColors,
  },
  spacing,
  typography: {
    fontFamily,
    fontSize,
    fontWeight,
  },
  borders: {
    radius: borderRadius,
  },
  shadows,
  animations: {
    transitions,
    easing,
    motionPresets,
  },
  zIndex,
  breakpoints,
  mediaQueries,
  componentSizes,
} as const

export default tokens
