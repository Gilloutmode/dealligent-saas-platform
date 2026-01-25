// =============================================================================
// AGENT CARD - For Section 2 (External Sources)
// Premium card with animated border (Limova-inspired)
// Refonte: No hover effects, animated conic-gradient border
// =============================================================================

"use client"

import { motion } from 'framer-motion'
import {
  Globe, Package, Briefcase, Megaphone,
  Settings, Users, ChevronRight
} from 'lucide-react'

// =============================================================================
// TYPES
// =============================================================================

interface AgentCardProps {
  name: string
  role: string
  tagline: string
  capabilities: string[]
  invokeCommand: string
  accentColor: string
  icon: 'mia' | 'pia' | 'sia' | 'maia' | 'tia' | 'talia'
  visual?: React.ReactNode
}

// =============================================================================
// ICON & COLOR MAPS
// =============================================================================

const iconMap = {
  mia: Globe,
  pia: Package,
  sia: Briefcase,
  maia: Megaphone,
  tia: Settings,
  talia: Users,
}

const colorMap: Record<string, { gradient: string; borderColor: string; iconBg: string }> = {
  blue: {
    gradient: 'from-blue-500 via-cyan-400 to-blue-500',
    borderColor: 'rgba(59, 130, 246, 0.3)',
    iconBg: 'bg-blue-500/20',
  },
  green: {
    gradient: 'from-emerald-500 via-teal-400 to-emerald-500',
    borderColor: 'rgba(16, 185, 129, 0.3)',
    iconBg: 'bg-emerald-500/20',
  },
  orange: {
    gradient: 'from-orange-500 via-amber-400 to-orange-500',
    borderColor: 'rgba(249, 115, 22, 0.3)',
    iconBg: 'bg-orange-500/20',
  },
  pink: {
    gradient: 'from-pink-500 via-rose-400 to-pink-500',
    borderColor: 'rgba(236, 72, 153, 0.3)',
    iconBg: 'bg-pink-500/20',
  },
  cyan: {
    gradient: 'from-cyan-500 via-sky-400 to-cyan-500',
    borderColor: 'rgba(6, 182, 212, 0.3)',
    iconBg: 'bg-cyan-500/20',
  },
  purple: {
    gradient: 'from-purple-500 via-violet-400 to-purple-500',
    borderColor: 'rgba(139, 92, 246, 0.3)',
    iconBg: 'bg-purple-500/20',
  },
}

// =============================================================================
// ANIMATION VARIANTS - Fast (0.3s)
// =============================================================================

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }
  },
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function AgentCard({
  name,
  role,
  tagline,
  capabilities,
  invokeCommand,
  accentColor,
  icon,
  visual
}: AgentCardProps) {
  const Icon = iconMap[icon] || Globe
  const colors = colorMap[accentColor] || colorMap.blue

  return (
    <motion.div
      variants={itemVariants}
      className="h-full relative group"
    >
      {/* Animated Border Container */}
      <div className="absolute -inset-[1px] rounded-[22px] overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} animate-border-rotate opacity-60`}
          style={{
            backgroundSize: '200% 200%',
            animation: 'gradient-flow 4s linear infinite',
          }}
        />
      </div>

      {/* Card Content */}
      <div
        className="relative h-full rounded-[20px] p-6 backdrop-blur-xl"
        style={{
          background: 'rgba(10, 12, 20, 0.85)',
          border: `1px solid ${colors.borderColor}`,
        }}
      >
        {/* Header: Avatar + Meta */}
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-14 h-14 rounded-2xl ${colors.iconBg} flex items-center justify-center backdrop-blur-sm border border-white/10`}>
            <Icon className="w-7 h-7 text-white" />
          </div>
          <div>
            <h4 className="text-xl font-bold text-white">{name}</h4>
            <p className="text-sm font-medium text-white/60 uppercase tracking-wider">{role}</p>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-lg font-semibold text-white/80 mb-6 leading-tight italic">
          "{tagline}"
        </p>

        {/* Visual Slot */}
        {visual && (
          <div className="mb-6">
            {visual}
          </div>
        )}

        {/* Capabilities */}
        <div className="space-y-4 mb-8">
          <p className="text-xs font-black uppercase tracking-widest text-white/50">Capabilities</p>
          <ul className="space-y-2">
            {capabilities.map((cap, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-white/70"
              >
                <ChevronRight className="w-4 h-4 mt-0.5 text-white/40 shrink-0" />
                {cap}
              </li>
            ))}
          </ul>
        </div>

        {/* Invoke */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <span className="text-xs font-mono text-white/50">Invoke:</span>
          <code className="text-xs font-mono px-2 py-1 rounded bg-white/5 text-white/80 border border-white/10">
            {invokeCommand}
          </code>
        </div>
      </div>
    </motion.div>
  )
}

export default AgentCard
