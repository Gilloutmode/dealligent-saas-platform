// =============================================================================
// LEVEL 2 SECTION - Outside Sources
// "Deep-dive agents that think like your best analysts -- combined"
// Phase 4/5: Scroll animations with blur + scale
// Performance: Visual types stored as enums, not JSX instances
// =============================================================================

"use client"

import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { AgentCard } from './AgentCard'
import {
  MiaMockupAnimated,
  PiaMockupAnimated,
  SiaMockupAnimated,
  MaiaMockupAnimated,
  TiaMockupAnimated,
  TaliaMockupAnimated,
} from './animations'

// =============================================================================
// ANIMATION VARIANTS
// =============================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  },
}

// Full animation with blur + scale
const itemVariantsFull = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
}

// Reduced motion variant
const itemVariantsReduced = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
}

// =============================================================================
// VISUAL TYPES - Enum instead of JSX to prevent re-renders
// =============================================================================

type AgentVisualType = 'mia' | 'pia' | 'sia' | 'maia' | 'tia' | 'talia'

// Mapping from visual type to component - called only in render
const AGENT_VISUAL_COMPONENTS: Record<AgentVisualType, React.ComponentType> = {
  mia: MiaMockupAnimated,
  pia: PiaMockupAnimated,
  sia: SiaMockupAnimated,
  maia: MaiaMockupAnimated,
  tia: TiaMockupAnimated,
  talia: TaliaMockupAnimated,
}

// =============================================================================
// AGENTS DATA - Module-level constant (stable reference)
// =============================================================================

interface AgentData {
  name: string
  role: string
  tagline: string
  icon: 'mia' | 'pia' | 'sia' | 'maia' | 'tia' | 'talia'
  accentColor: string
  capabilities: string[]
  invokeCommand: string
  visualType: AgentVisualType
}

const AGENTS_DATA: readonly AgentData[] = [
  {
    name: 'Mia',
    role: 'Competition Agentic',
    tagline: 'Market trends & competitive landscape',
    icon: 'mia',
    accentColor: 'blue',
    capabilities: [
      'Market sizing & growth projections',
      'Competitive landscape mapping',
      'Trend identification & analysis',
      'Segment deep-dives',
      'Opportunity mapping',
    ],
    invokeCommand: '/market @Mia',
    visualType: 'mia'
  },
  {
    name: 'Pia',
    role: 'Product Agentic',
    tagline: 'Feature comparison & roadmap analysis',
    icon: 'pia',
    accentColor: 'green',
    capabilities: [
      'Feature comparison matrices',
      'Competitor roadmap tracking',
      'Pricing analysis',
      'UX/UI benchmarking',
      'Integration ecosystem mapping',
    ],
    invokeCommand: '/product @Pia',
    visualType: 'pia'
  },
  {
    name: 'Sia',
    role: 'Account Agentic',
    tagline: 'Win/loss patterns & deal intelligence',
    icon: 'sia',
    accentColor: 'orange',
    capabilities: [
      'Win/loss pattern analysis',
      'Competitive deals tracking',
      'Objection handling intelligence',
      'Battlecard auto-generation',
      'Pricing intelligence',
    ],
    invokeCommand: '/sales @Sia',
    visualType: 'sia'
  },
  {
    name: 'Maia',
    role: 'Marketing Agentic',
    tagline: 'Content creation & GTM intelligence',
    icon: 'maia',
    accentColor: 'pink',
    capabilities: [
      'CONTENT: SEO articles, LinkedIn posts, case studies',
      'GTM: ICP refinement, persona development',
      'RESEARCH: Competitor campaigns, best practices',
    ],
    invokeCommand: '/marketing @Maia',
    visualType: 'maia'
  },
  {
    name: 'Tia',
    role: 'Technology Agentic',
    tagline: 'Tech stack & innovation radar',
    icon: 'tia',
    accentColor: 'cyan',
    capabilities: [
      'Tech stack analysis',
      'Architecture reviews',
      'Innovation radar',
      'Patent/IP tracking',
      'Integration assessment',
    ],
    invokeCommand: '/technology @Tia',
    visualType: 'tia'
  },
  {
    name: 'Talia',
    role: 'Talent Agentic',
    tagline: 'Team composition & hiring patterns',
    icon: 'talia',
    accentColor: 'purple',
    capabilities: [
      'Team composition analysis',
      'Hiring patterns detection',
      'Key hire tracking & alerts',
      'Org structure mapping',
      'Culture signals',
    ],
    invokeCommand: '/talent @Talia',
    visualType: 'talia'
  },
] as const

// =============================================================================
// INVOCATION METHODS DATA - Module-level constant
// =============================================================================

const INVOCATION_METHODS = [
  { title: '/SLASH COMMANDS', desc: 'Type /market' },
  { title: '@MENTIONS', desc: 'Use @Mia' },
  { title: 'SIDEBAR PANEL', desc: 'Click icon' },
  { title: '+ BUTTON', desc: 'Enrich response' },
] as const

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function Level2Section() {
  const prefersReducedMotion = useReducedMotion() ?? false
  const itemVariants = prefersReducedMotion ? itemVariantsReduced : itemVariantsFull

  // Memoized agents with visual components
  // Only re-computed if AGENTS_DATA changes (never, it's a constant)
  const agents = useMemo(() =>
    AGENTS_DATA.map(agent => {
      const VisualComponent = AGENT_VISUAL_COMPONENTS[agent.visualType]
      return {
        name: agent.name,
        role: agent.role,
        tagline: agent.tagline,
        icon: agent.icon,
        accentColor: agent.accentColor,
        capabilities: agent.capabilities,
        invokeCommand: agent.invokeCommand,
        visual: <VisualComponent />
      }
    }),
    []
  )

  return (
    <section id="level-2-section" className="py-24 px-8 bg-[var(--bg-page)] border-b border-[var(--border-light)]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
          className="text-center mb-24"
        >
          <motion.span
            className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-purple-500/30 bg-purple-500/20 text-purple-400 mb-8"
            animate={prefersReducedMotion ? {} : {
              boxShadow: [
                '0 0 15px rgba(139, 92, 246, 0.2)',
                '0 0 30px rgba(139, 92, 246, 0.4)',
                '0 0 15px rgba(139, 92, 246, 0.2)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            LEVEL 2
          </motion.span>
          <h2 className="text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-6">
            Outside Sources
          </h2>
          <p className="text-2xl lg:text-3xl text-[var(--text-secondary)] font-medium italic">
            Deep-dive agents that think like your best analysts — combined
          </p>
        </motion.div>

        {/* Problem Statement */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={itemVariants}
          className="max-w-4xl mx-auto text-center mb-20 p-12 rounded-3xl bg-red-500/5 border border-red-500/10"
        >
          <h3 className="text-sm font-black uppercase tracking-widest text-red-400 mb-6">THE PROBLEM</h3>
          <p className="text-2xl lg:text-3xl text-[var(--text-primary)] leading-relaxed">
            Your competitors move fast. New products launch.
            Prices change. Key people leave. Markets shift.
            You're always the last to know.
          </p>
        </motion.div>

        {/* Solution Statement */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={itemVariants}
          className="max-w-4xl mx-auto text-center mb-24 p-12 rounded-3xl bg-emerald-500/5 border border-emerald-500/10"
        >
          <h3 className="text-sm font-black uppercase tracking-widest text-emerald-400 mb-6">THE SOLUTION</h3>
          <p className="text-2xl lg:text-3xl text-[var(--text-primary)] leading-relaxed">
            6 specialized AI agents watching your market 24/7.
            Invoke them from chat. Get deep strategic analysis on demand.
          </p>
        </motion.div>

        {/* Agents Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24"
        >
          {agents.map((agent, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <AgentCard {...agent} />
            </motion.div>
          ))}
        </motion.div>

        {/* Invocation Methods */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="mb-24"
        >
          <h4 className="text-center text-sm font-black uppercase tracking-[0.3em] text-[var(--text-muted)] mb-12">
            4 WAYS TO INVOKE
          </h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {INVOCATION_METHODS.map((m, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="card-glass p-6 rounded-xl border border-[var(--border-light)] text-center"
              >
                <p className="text-base font-black text-[var(--text-primary)] mb-1 uppercase tracking-wider">{m.title}</p>
                <p className="text-sm text-[var(--text-muted)]">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Data Sources */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
          className="text-center"
        >
          <h4 className="text-xs font-black uppercase tracking-[0.3em] text-[var(--text-muted)] mb-8">
            POWERED BY
          </h4>
          <div className="flex flex-wrap justify-center gap-12 text-lg font-bold text-[var(--text-secondary)]">
            <motion.span
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              className="flex items-center gap-2"
            >
              Perplexity AI
            </motion.span>
            <motion.span
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              className="flex items-center gap-2"
            >
              Exa Search
            </motion.span>
            <motion.span
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              className="flex items-center gap-2"
            >
              SerpAPI
            </motion.span>
            <motion.span
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              className="flex items-center gap-2"
            >
              Claude Opus 4.5
            </motion.span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Level2Section
