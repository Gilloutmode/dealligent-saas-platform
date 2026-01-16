// =============================================================================
// DEALLIGENT PLATFORM - THREAT BADGE
// Colored badge for threat level display
// =============================================================================

import { Shield } from 'lucide-react'

export interface ThreatBadgeProps {
  /** Threat level: HIGH, MEDIUM, LOW */
  level: string
  /** Size variant */
  size?: 'sm' | 'md'
}

const THREAT_CONFIG = {
  HIGH: {
    badge: 'badge-glow-red',
    label: 'Élevée',
  },
  MEDIUM: {
    badge: 'badge-glow-orange',
    label: 'Moyenne',
  },
  LOW: {
    badge: 'badge-glow-green',
    label: 'Faible',
  },
} as const

export function ThreatBadge({ level, size = 'md' }: ThreatBadgeProps): React.ReactElement {
  const normalizedLevel = level?.toUpperCase() as keyof typeof THREAT_CONFIG
  const config = THREAT_CONFIG[normalizedLevel] || THREAT_CONFIG.LOW

  const sizeClasses = size === 'sm'
    ? 'text-xs px-2 py-0.5'
    : 'text-sm px-2.5 py-1'

  const iconSize = size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'

  return (
    <span className={`${config.badge} ${sizeClasses} inline-flex items-center gap-1`}>
      <Shield className={iconSize} />
      {config.label}
    </span>
  )
}

export default ThreatBadge
