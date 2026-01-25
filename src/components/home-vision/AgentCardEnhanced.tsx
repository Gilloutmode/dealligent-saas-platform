"use client"

// =============================================================================
// AGENT CARD ENHANCED - Level 2 Premium Agent Cards
// HIGH DESIGNER LEVEL: Gradient accent, NumberTicker stats, BorderBeam active
// Reference: EnhancedCompetitorCard.tsx patterns
// =============================================================================

import { motion, useInView } from 'framer-motion'
import { useRef, memo } from 'react'
import { Zap, TrendingUp, Clock, CheckCircle2 } from 'lucide-react'
import { NumberTicker } from '../ui/NumberTicker'
import { BorderBeam } from '../ui/BorderBeam'

// =============================================================================
// TYPES
// =============================================================================

export interface AgentStats {
  queriesHandled: number
  avgResponseTime: number
  accuracy: number
}

export interface AgentCardEnhancedProps {
  name: string
  role: string
  icon: string
  description: string
  stats: AgentStats
  isActive?: boolean
  accentColor: 'indigo' | 'cyan' | 'purple' | 'emerald' | 'amber'
  capabilities: string[]
  onInvoke?: () => void
  delay?: number
}

// =============================================================================
// COLOR CONFIG
// =============================================================================

const colorConfig = {
  indigo: {
    gradient: 'from-indigo-500 to-indigo-600',
    glow: 'shadow-indigo-500/25',
    border: 'border-indigo-500/30',
    bg: 'bg-indigo-500/10',
    text: 'text-indigo-400',
    beamFrom: '#6366f1',
    beamTo: '#818cf8',
  },
  cyan: {
    gradient: 'from-cyan-500 to-cyan-600',
    glow: 'shadow-cyan-500/25',
    border: 'border-cyan-500/30',
    bg: 'bg-cyan-500/10',
    text: 'text-cyan-400',
    beamFrom: '#06b6d4',
    beamTo: '#22d3ee',
  },
  purple: {
    gradient: 'from-purple-500 to-purple-600',
    glow: 'shadow-purple-500/25',
    border: 'border-purple-500/30',
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
    beamFrom: '#a855f7',
    beamTo: '#c084fc',
  },
  emerald: {
    gradient: 'from-emerald-500 to-emerald-600',
    glow: 'shadow-emerald-500/25',
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    beamFrom: '#10b981',
    beamTo: '#34d399',
  },
  amber: {
    gradient: 'from-amber-500 to-amber-600',
    glow: 'shadow-amber-500/25',
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    beamFrom: '#f59e0b',
    beamTo: '#fbbf24',
  },
}

// =============================================================================
// STAT ITEM
// =============================================================================

function StatItem({
  icon: Icon,
  value,
  label,
  suffix = '',
  delay = 0,
}: {
  icon: React.ElementType
  value: number
  label: string
  suffix?: string
  delay?: number
}) {
  return (
    <div className="flex flex-col items-center p-3 rounded-xl bg-[var(--glass-bg)] border border-[var(--border-default)]">
      <Icon className="w-4 h-4 text-[var(--text-muted)] mb-1" />
      <div className="flex items-baseline gap-0.5">
        <NumberTicker value={value} delay={delay} className="text-lg font-bold text-white" />
        <span className="text-xs text-[var(--text-muted)]">{suffix}</span>
      </div>
      <span className="text-[9px] text-[var(--text-muted)] uppercase tracking-wider mt-1">{label}</span>
    </div>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const AgentCardEnhanced = memo(function AgentCardEnhanced({
  name,
  role,
  icon,
  description,
  stats,
  isActive = false,
  accentColor,
  capabilities,
  onInvoke,
  delay = 0,
}: AgentCardEnhancedProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const config = colorConfig[accentColor]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        delay,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`
        relative overflow-hidden rounded-2xl bg-[#0F172A]/80 backdrop-blur-xl
        border border-[var(--border-default)] shadow-xl cursor-pointer group
        transition-shadow duration-300 hover:${config.glow} hover:shadow-2xl
      `}
      onClick={onInvoke}
    >
      {/* Gradient Top Accent */}
      <div className={`h-1 bg-gradient-to-r ${config.gradient}`} />

      {/* BorderBeam for Active State */}
      {isActive && (
        <BorderBeam
          size={250}
          duration={10}
          colorFrom={config.beamFrom}
          colorTo={config.beamTo}
        />
      )}

      {/* Hover Glow Overlay */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${config.beamFrom}15, transparent 70%)`,
        }}
      />

      <div className="relative p-5 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {/* Icon with glow */}
            <motion.div
              className={`
                w-12 h-12 rounded-xl flex items-center justify-center text-2xl
                ${config.bg} border ${config.border}
              `}
              animate={isActive ? {
                boxShadow: [
                  `0 0 0 0 ${config.beamFrom}00`,
                  `0 0 20px 4px ${config.beamFrom}40`,
                  `0 0 0 0 ${config.beamFrom}00`,
                ],
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {icon}
            </motion.div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                @{name}
                {isActive && (
                  <motion.span
                    className="w-2 h-2 rounded-full bg-emerald-400"
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </h3>
              <p className={`text-sm ${config.text}`}>{role}</p>
            </div>
          </div>

          {/* Status Badge */}
          {isActive ? (
            <span className="px-2 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-[10px] font-bold text-emerald-400 uppercase">
              Online
            </span>
          ) : (
            <span className="px-2 py-1 rounded-full bg-[var(--glass-bg)] border border-[var(--border-default)] text-[10px] font-bold text-[var(--text-muted)] uppercase">
              Ready
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{description}</p>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2">
          <StatItem
            icon={Zap}
            value={stats.queriesHandled}
            label="Queries"
            delay={delay + 0.2}
          />
          <StatItem
            icon={Clock}
            value={stats.avgResponseTime}
            suffix="s"
            label="Avg Time"
            delay={delay + 0.3}
          />
          <StatItem
            icon={TrendingUp}
            value={stats.accuracy}
            suffix="%"
            label="Accuracy"
            delay={delay + 0.4}
          />
        </div>

        {/* Capabilities */}
        <div className="space-y-2">
          <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
            Capabilities
          </p>
          <div className="flex flex-wrap gap-1.5">
            {capabilities.map((cap, i) => (
              <motion.span
                key={cap}
                className={`px-2 py-1 rounded-lg text-[10px] font-medium ${config.bg} ${config.border} border ${config.text}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: delay + 0.5 + i * 0.1 }}
              >
                {cap}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Invoke Button */}
        <motion.button
          className={`
            w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl
            bg-gradient-to-r ${config.gradient} text-white font-semibold text-sm
            shadow-lg ${config.glow} hover:shadow-xl transition-all duration-200
          `}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => {
            e.stopPropagation()
            onInvoke?.()
          }}
        >
          <CheckCircle2 className="w-4 h-4" />
          Invoke @{name}
        </motion.button>
      </div>
    </motion.div>
  )
})

// =============================================================================
// AGENTS GRID - Demo with all agents
// =============================================================================

const mockAgents: Omit<AgentCardEnhancedProps, 'onInvoke' | 'delay'>[] = [
  {
    name: 'Mia',
    role: 'Market Intelligence',
    icon: '🌐',
    description: 'Tracks competitor moves, market trends, and industry developments in real-time.',
    stats: { queriesHandled: 1247, avgResponseTime: 2.3, accuracy: 94 },
    isActive: true,
    accentColor: 'indigo',
    capabilities: ['Competitor Analysis', 'Market Trends', 'News Monitoring'],
  },
  {
    name: 'Pia',
    role: 'Product Intelligence',
    icon: '📦',
    description: 'Analyzes product features, pricing changes, and roadmap developments.',
    stats: { queriesHandled: 892, avgResponseTime: 1.8, accuracy: 96 },
    isActive: true,
    accentColor: 'cyan',
    capabilities: ['Feature Comparison', 'Pricing Intel', 'Roadmap Tracking'],
  },
  {
    name: 'Sia',
    role: 'Sales Intelligence',
    icon: '💼',
    description: 'Prepares deal insights, client histories, and competitive positioning.',
    stats: { queriesHandled: 2156, avgResponseTime: 1.5, accuracy: 92 },
    isActive: false,
    accentColor: 'emerald',
    capabilities: ['Deal Prep', 'Client Context', 'Win/Loss Analysis'],
  },
  {
    name: 'Tia',
    role: 'Technology Intelligence',
    icon: '⚙️',
    description: 'Monitors tech stacks, engineering trends, and infrastructure changes.',
    stats: { queriesHandled: 634, avgResponseTime: 2.8, accuracy: 91 },
    isActive: true,
    accentColor: 'purple',
    capabilities: ['Tech Stack Analysis', 'API Changes', 'Security Alerts'],
  },
]

export function AgentsGridEnhanced() {
  return (
    <div className="grid md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto">
      {mockAgents.map((agent, index) => (
        <AgentCardEnhanced
          key={agent.name}
          {...agent}
          delay={index * 0.15}
          onInvoke={() => console.log(`Invoking @${agent.name}`)}
        />
      ))}
    </div>
  )
}

export default AgentCardEnhanced
