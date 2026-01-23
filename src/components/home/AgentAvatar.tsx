// =============================================================================
// DEALLIGENT PLATFORM - AGENT AVATAR
// Distinctive SVG avatars for each AI agent
// =============================================================================

"use client"

import { motion } from 'framer-motion'

// =============================================================================
// TYPES
// =============================================================================

export type AgentType = 'market' | 'product' | 'sales' | 'marketing' | 'technology' | 'talent'

interface AgentAvatarProps {
  type: AgentType
  color: string
  size?: number
  isHovered?: boolean
}

// =============================================================================
// AVATAR COMPONENTS
// =============================================================================

// Market (Mia) - Radar/Globe with scanning lines
function MarketAvatar({ color, size, isHovered }: Omit<AgentAvatarProps, 'type'>) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className="overflow-visible">
      {/* Background glow */}
      <defs>
        <radialGradient id="market-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Globe circles */}
      <circle cx="24" cy="24" r="18" fill="none" stroke={color} strokeWidth="1.5" strokeOpacity="0.3" />
      <circle cx="24" cy="24" r="12" fill="none" stroke={color} strokeWidth="1.5" strokeOpacity="0.5" />
      <circle cx="24" cy="24" r="6" fill={color} fillOpacity="0.2" />

      {/* Radar scan line */}
      <motion.g
        animate={{ rotate: isHovered ? 360 : 0 }}
        transition={{ duration: 2, repeat: isHovered ? Infinity : 0, ease: "linear" }}
        style={{ originX: '24px', originY: '24px' }}
      >
        <line x1="24" y1="24" x2="24" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <path d="M24 6 L26 12 L24 10 L22 12 Z" fill={color} />
      </motion.g>

      {/* Grid lines */}
      <line x1="6" y1="24" x2="42" y2="24" stroke={color} strokeWidth="0.5" strokeOpacity="0.3" />
      <line x1="24" y1="6" x2="24" y2="42" stroke={color} strokeWidth="0.5" strokeOpacity="0.3" />

      {/* Detection dots */}
      <motion.circle
        cx="32" cy="16"
        r="2"
        fill={color}
        initial={{ opacity: 0.5, scale: 1 }}
        animate={{ opacity: isHovered ? [0.5, 1, 0.5] : 0.5, scale: isHovered ? [1, 1.3, 1] : 1 }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.circle
        cx="14" cy="30"
        r="1.5"
        fill={color}
        initial={{ opacity: 0.3 }}
        animate={{ opacity: isHovered ? [0.3, 0.8, 0.3] : 0.3 }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      />
    </svg>
  )
}

// Product (Pia) - 3D Cube with layers
function ProductAvatar({ color, size, isHovered }: Omit<AgentAvatarProps, 'type'>) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size}>
      <defs>
        <linearGradient id="product-face1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.8" />
          <stop offset="100%" stopColor={color} stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="product-face2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.6" />
          <stop offset="100%" stopColor={color} stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* 3D Cube - Front face */}
      <motion.polygon
        points="10,18 24,10 38,18 24,26"
        fill="url(#product-face1)"
        animate={{ y: isHovered ? -2 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Left face */}
      <motion.polygon
        points="10,18 24,26 24,40 10,32"
        fill="url(#product-face2)"
        animate={{ y: isHovered ? -2 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Right face */}
      <motion.polygon
        points="38,18 24,26 24,40 38,32"
        fill={color}
        fillOpacity="0.3"
        animate={{ y: isHovered ? -2 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Layer lines */}
      <line x1="10" y1="24" x2="24" y2="32" stroke="white" strokeWidth="0.5" strokeOpacity="0.5" />
      <line x1="24" y1="32" x2="38" y2="24" stroke="white" strokeWidth="0.5" strokeOpacity="0.5" />

      {/* Feature dots */}
      <motion.circle
        cx="20" cy="20"
        r="2"
        fill="white"
        fillOpacity="0.8"
        initial={{ scale: 1 }}
        animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
      <circle cx="28" cy="20" r="1.5" fill="white" fillOpacity="0.6" />
    </svg>
  )
}

// Sales (Sia) - Signal/Pulse wave
function SalesAvatar({ color, size, isHovered }: Omit<AgentAvatarProps, 'type'>) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size}>
      {/* Central target */}
      <circle cx="24" cy="24" r="4" fill={color} />
      <circle cx="24" cy="24" r="8" fill="none" stroke={color} strokeWidth="1.5" strokeOpacity="0.6" />

      {/* Pulse waves */}
      <motion.circle
        cx="24" cy="24" r="14"
        fill="none"
        stroke={color}
        strokeWidth="1"
        strokeOpacity="0.4"
        initial={{ scale: 1, opacity: 0.4 }}
        animate={{ scale: isHovered ? [1, 1.3, 1] : 1, opacity: isHovered ? [0.4, 0, 0.4] : 0.4 }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.circle
        cx="24" cy="24" r="20"
        fill="none"
        stroke={color}
        strokeWidth="0.5"
        strokeOpacity="0.2"
        initial={{ scale: 1, opacity: 0.2 }}
        animate={{ scale: isHovered ? [1, 1.2, 1] : 1, opacity: isHovered ? [0.2, 0, 0.2] : 0.2 }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
      />

      {/* Signal arrows pointing inward */}
      <motion.g
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <path d="M36 12 L32 16 L34 14" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M12 36 L16 32 L14 34" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M36 36 L32 32 L34 34" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeOpacity="0.5" />
      </motion.g>

      {/* Dollar accent */}
      <text x="24" y="27" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">$</text>
    </svg>
  )
}

// Marketing (Maia) - Target with rays/megaphone shape
function MarketingAvatar({ color, size, isHovered }: Omit<AgentAvatarProps, 'type'>) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size}>
      <defs>
        <linearGradient id="marketing-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={color} stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {/* Megaphone shape */}
      <motion.path
        d="M12 20 L12 28 L20 32 L20 16 Z"
        fill="url(#marketing-grad)"
        animate={{ x: isHovered ? 2 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.path
        d="M20 16 L36 8 L36 40 L20 32 Z"
        fill={color}
        fillOpacity="0.6"
        animate={{ x: isHovered ? 2 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Sound waves */}
      <motion.path
        d="M38 18 Q42 24 38 30"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ x: 0, opacity: 0.8 }}
        animate={{ x: isHovered ? [0, 3, 0] : 0, opacity: isHovered ? [0.8, 0.4, 0.8] : 0.8 }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <motion.path
        d="M40 14 Q46 24 40 34"
        fill="none"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        strokeOpacity="0.5"
        initial={{ x: 0, opacity: 0.5 }}
        animate={{ x: isHovered ? [0, 4, 0] : 0, opacity: isHovered ? [0.5, 0.2, 0.5] : 0.5 }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
      />

      {/* Handle */}
      <rect x="8" y="22" width="4" height="4" rx="1" fill={color} fillOpacity="0.8" />
    </svg>
  )
}

// Technology (Tia) - Hexagon/Circuit pattern
function TechnologyAvatar({ color, size, isHovered }: Omit<AgentAvatarProps, 'type'>) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size}>
      <defs>
        <linearGradient id="tech-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={color} stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* Main hexagon */}
      <motion.polygon
        points="24,6 40,15 40,33 24,42 8,33 8,15"
        fill="url(#tech-grad)"
        stroke={color}
        strokeWidth="1.5"
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: 'center' }}
      />

      {/* Inner hexagon */}
      <polygon
        points="24,14 32,19 32,29 24,34 16,29 16,19"
        fill="none"
        stroke="white"
        strokeWidth="1"
        strokeOpacity="0.4"
      />

      {/* Circuit nodes */}
      <circle cx="24" cy="24" r="3" fill="white" fillOpacity="0.9" />
      <motion.circle
        cx="24" cy="24" r="3"
        fill="none"
        stroke="white"
        strokeWidth="1"
        initial={{ scale: 1, opacity: 0 }}
        animate={{ scale: isHovered ? [1, 1.8, 1] : 1, opacity: isHovered ? [1, 0, 1] : 0 }}
        transition={{ duration: 1.2, repeat: Infinity }}
      />

      {/* Connection lines */}
      <line x1="24" y1="21" x2="24" y2="14" stroke="white" strokeWidth="1" strokeOpacity="0.6" />
      <line x1="26" y1="26" x2="32" y2="29" stroke="white" strokeWidth="1" strokeOpacity="0.6" />
      <line x1="22" y1="26" x2="16" y2="29" stroke="white" strokeWidth="1" strokeOpacity="0.6" />

      {/* Corner nodes */}
      <circle cx="24" cy="14" r="1.5" fill="white" fillOpacity="0.7" />
      <circle cx="32" cy="29" r="1.5" fill="white" fillOpacity="0.7" />
      <circle cx="16" cy="29" r="1.5" fill="white" fillOpacity="0.7" />
    </svg>
  )
}

// Talent (Talia) - Network of connected nodes (people)
function TalentAvatar({ color, size, isHovered }: Omit<AgentAvatarProps, 'type'>) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size}>
      {/* Connection lines */}
      <motion.g
        initial={{ opacity: 0.6 }}
        animate={{ opacity: isHovered ? 1 : 0.6 }}
        transition={{ duration: 0.3 }}
      >
        <line x1="24" y1="16" x2="14" y2="28" stroke={color} strokeWidth="1.5" strokeOpacity="0.5" />
        <line x1="24" y1="16" x2="34" y2="28" stroke={color} strokeWidth="1.5" strokeOpacity="0.5" />
        <line x1="14" y1="28" x2="34" y2="28" stroke={color} strokeWidth="1" strokeOpacity="0.3" />
        <line x1="24" y1="16" x2="24" y2="38" stroke={color} strokeWidth="1" strokeOpacity="0.3" />
      </motion.g>

      {/* Central person (larger) */}
      <motion.g
        animate={{ y: isHovered ? -2 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <circle cx="24" cy="12" r="4" fill={color} />
        <ellipse cx="24" cy="20" rx="5" ry="3" fill={color} fillOpacity="0.8" />
      </motion.g>

      {/* Left person */}
      <motion.g
        animate={{ x: isHovered ? -2 : 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <circle cx="14" cy="26" r="3" fill={color} fillOpacity="0.7" />
        <ellipse cx="14" cy="32" rx="4" ry="2.5" fill={color} fillOpacity="0.5" />
      </motion.g>

      {/* Right person */}
      <motion.g
        animate={{ x: isHovered ? 2 : 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <circle cx="34" cy="26" r="3" fill={color} fillOpacity="0.7" />
        <ellipse cx="34" cy="32" rx="4" ry="2.5" fill={color} fillOpacity="0.5" />
      </motion.g>

      {/* Bottom person (smaller) */}
      <circle cx="24" cy="38" r="2.5" fill={color} fillOpacity="0.5" />
      <ellipse cx="24" cy="43" rx="3" ry="2" fill={color} fillOpacity="0.3" />

      {/* Pulse effect on hover */}
      <motion.circle
        cx="24" cy="12"
        r="6"
        fill="none"
        stroke={color}
        strokeWidth="1"
        initial={{ scale: 1, opacity: 0 }}
        animate={{ scale: isHovered ? [1, 1.5, 1] : 1, opacity: isHovered ? [0.5, 0, 0.5] : 0 }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </svg>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function AgentAvatar({ type, color, size = 28, isHovered = false }: AgentAvatarProps) {
  const avatarComponents: Record<AgentType, JSX.Element> = {
    market: <MarketAvatar color={color} size={size} isHovered={isHovered} />,
    product: <ProductAvatar color={color} size={size} isHovered={isHovered} />,
    sales: <SalesAvatar color={color} size={size} isHovered={isHovered} />,
    marketing: <MarketingAvatar color={color} size={size} isHovered={isHovered} />,
    technology: <TechnologyAvatar color={color} size={size} isHovered={isHovered} />,
    talent: <TalentAvatar color={color} size={size} isHovered={isHovered} />,
  }

  return avatarComponents[type]
}

export default AgentAvatar
