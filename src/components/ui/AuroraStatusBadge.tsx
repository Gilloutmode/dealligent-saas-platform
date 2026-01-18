import { cn } from '../../lib/utils'

export type ThreatLevel = 'critical' | 'high' | 'medium' | 'low' | 'safe' | 'info'

interface AuroraStatusBadgeProps {
    level: ThreatLevel | string
    label?: string
    className?: string
    showDot?: boolean
    pulsing?: boolean
    size?: 'sm' | 'md'
}

/**
 * Enterprise Status Badge - Aurora Design System
 * Uses semantic tokens for uniform threat indication across the platform.
 */
export function AuroraStatusBadge({
    level,
    label,
    className,
    showDot = true,
    pulsing = false,
    size = 'md'
}: AuroraStatusBadgeProps) {

    // Normalize level to lowercase for mapping, default to 'info' if unknown
    const safeLevel = (typeof level === 'string' ? level.toLowerCase() : 'info') as ThreatLevel

    // Styles mapping using CSS variables defined in globals.css
    const styles = {
        critical: {
            bg: 'bg-[var(--threat-critical-bg)]',
            text: 'text-[var(--threat-critical)]',
            border: 'border-[var(--threat-critical-glow)]',
            dot: 'bg-[var(--threat-critical)]'
        },
        high: {
            bg: 'bg-[var(--threat-high-bg)]',
            text: 'text-[var(--threat-high)]',
            border: 'border-[var(--threat-high-glow)]',
            dot: 'bg-[var(--threat-high)]'
        },
        medium: {
            bg: 'bg-[var(--threat-medium-bg)]',
            text: 'text-[var(--threat-medium)]',
            border: 'border-[var(--threat-medium-glow)]',
            dot: 'bg-[var(--threat-medium)]'
        },
        low: {
            bg: 'bg-[var(--threat-low-bg)]',
            text: 'text-[var(--threat-low)]',
            border: 'border-[var(--threat-low-glow)]',
            dot: 'bg-[var(--threat-low)]'
        },
        safe: {
            bg: 'bg-[var(--threat-safe-bg)]',
            text: 'text-[var(--threat-safe)]',
            border: 'border-[var(--threat-safe-glow)]',
            dot: 'bg-[var(--threat-safe)]'
        },
        info: {
            bg: 'bg-[var(--bg-surface-active)]',
            text: 'text-[var(--text-secondary)]',
            border: 'border-[var(--border-default)]',
            dot: 'bg-[var(--text-secondary)]'
        }
    }

    const currentStyle = styles[safeLevel] || styles.info

    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 rounded-full border font-medium transition-colors",
                currentStyle.bg,
                currentStyle.text,
                currentStyle.border,
                size === 'sm' ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs",
                className
            )}
        >
            {showDot && (
                <span className="relative flex h-1.5 w-1.5">
                    {pulsing && (
                        <span
                            className={cn(
                                "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
                                currentStyle.dot
                            )}
                        />
                    )}
                    <span className={cn("relative inline-flex h-1.5 w-1.5 rounded-full", currentStyle.dot)} />
                </span>
            )}
            {label || level}
        </span>
    )
}

export default AuroraStatusBadge
