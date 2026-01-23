// =============================================================================
// DEALLIGENT PLATFORM - AGENT CARD PREMIUM
// Refactored: Components extracted to ./agent-card/
// Simplified: Removed excessive 3D tilt, kept glassmorphism and smooth animations
// =============================================================================

"use client"

import { useRef, useState, useCallback, type CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { AgentAvatar, type AgentType } from './AgentAvatar'
import {
  AgentBadge,
  BorderBeam,
  CapabilitiesList,
  ResultLine,
  LaunchButton
} from './agent-card'

// =============================================================================
// TYPES
// =============================================================================

export interface AgentCardCapabilities {
  left: string[]
  right: string[]
}

export interface AgentCardProps {
  name: string
  agent: string
  agentType: AgentType
  tagline: string
  description: string
  capabilities: AgentCardCapabilities
  result: string
  color: string
  onLaunch: () => void
  delay?: number
  isActive?: boolean
}

// =============================================================================
// ANIMATION VARIANTS
// =============================================================================

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 260, damping: 20 }
  }
}

// Helper to darken a hex color
function darkenColor(hex: string, factor: number = 0.7): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgb(${Math.round(r * factor)}, ${Math.round(g * factor)}, ${Math.round(b * factor)})`
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function AgentCard({
  name,
  agent,
  agentType,
  tagline,
  description,
  capabilities,
  result,
  color,
  onLaunch,
  delay = 0,
  isActive = true,
}: AgentCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = useCallback(() => setIsHovered(true), [])
  const handleMouseLeave = useCallback(() => setIsHovered(false), [])

  return (
    <motion.article
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
      className="relative w-full h-full"
      aria-label={`${name} - Agent ${agent}`}
    >
      <motion.div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{ y: isHovered ? -8 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="relative cursor-pointer h-full"
      >
        {/* Ambient glow - Subtle but professional */}
        <motion.div
          className="absolute -inset-4 rounded-[32px] -z-20 blur-3xl"
          style={{
            background: `radial-gradient(ellipse at center, ${color}40, transparent 75%)`,
            '--glow-color': color,
          } as CSSProperties}
          animate={{ opacity: isHovered ? 0.4 : 0.2 }}
          transition={{ duration: 0.5 }}
        />

        {/* Border beam effect */}
        <BorderBeam color={color} isHovered={isHovered} />

        {/* Main card container */}
        <div
          className="relative rounded-[22px] overflow-hidden h-full flex flex-col"
          style={{
            background: 'var(--bg-card)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            border: '1px solid var(--border-default)',
            boxShadow: isHovered
              ? `0 20px 48px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)`
              : `0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.05)`,
          }}
        >
          {/* Accent bar at top */}
          <div
            className="h-1.5 w-full shrink-0"
            style={{
              background: isActive ? color : 'var(--bg-tertiary)',
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col flex-1 p-7">
            {/* Header Area */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <motion.div
                  className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0 overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${color} 0%, ${darkenColor(color, 0.6)} 100%)`,
                  }}
                  animate={{
                    boxShadow: isHovered
                      ? `0 12px 32px ${color}50`
                      : `0 8px 24px ${color}30`,
                    scale: isHovered ? 1.05 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <AgentAvatar type={agentType} color="white" size={32} isHovered={isHovered} />
                </motion.div>

                {/* Name & Status */}
                <div className="flex flex-col pt-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">
                      {name}
                    </h3>
                  </div>
                  {/* Status indicator moved below name for better hierarchy */}
                  <span
                    className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider"
                    style={{
                      background: isActive ? `${color}15` : 'var(--bg-tertiary)',
                      color: isActive ? color : 'var(--text-muted)',
                      border: `1px solid ${isActive ? `${color}30` : 'var(--border-light)'}`,
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background: isActive ? color : 'var(--text-muted)',
                        boxShadow: isActive ? `0 0 6px ${color}` : 'none'
                      }}
                    />
                    {isActive ? 'Agent Actif' : 'En Développement'}
                  </span>
                </div>
              </div>

              <div className="flex-shrink-0 pt-1">
                <AgentBadge agent={agent} color={color} isHovered={isHovered} />
              </div>
            </div>

            {/* Tagline - FULL Readability, bigger and clearer */}
            <p className="text-lg font-semibold text-[var(--text-primary)] mb-3 leading-tight">
              {tagline}
            </p>

            {/* Description - High contrast, better readability */}
            <p className="text-base text-[var(--text-primary)] opacity-90 mb-6 leading-relaxed">
              {description}
            </p>

            {/* Separator */}
            <div className="h-px bg-[var(--border-light)] mb-6 w-1/4" />

            {/* Capabilities */}
            <div className="flex-1">
              <CapabilitiesList capabilities={capabilities} color={color} isHovered={isHovered} />
            </div>

            {/* Result Section */}
            <ResultLine result={result} color={color} isHovered={isHovered} />

            {/* Action */}
            <LaunchButton onClick={onLaunch} color={color} isHovered={isHovered} isActive={isActive} />
          </div>
        </div>
      </motion.div>
    </motion.article>
  )
}

export default AgentCard
