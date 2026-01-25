"use client"

// =============================================================================
// NOTEBOOK MOCKUP ANIMATED - Level 1 Interface with SVG Animations
// HIGH DESIGNER LEVEL: motion.path with pathLength, spring physics bubbles
// =============================================================================

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

// =============================================================================
// ANIMATION VARIANTS
// =============================================================================

const panelVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.3,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
}

const bubbleVariants = {
  hidden: { opacity: 0, scale: 0.8, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      delay: 0.9 + i * 0.2,
      type: 'spring' as const,
      stiffness: 200,
      damping: 20,
    },
  }),
}

const userBubbleVariants = {
  hidden: { opacity: 0, scale: 0.8, x: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      delay: 0.6,
      type: 'spring' as const,
      stiffness: 200,
      damping: 20,
    },
  },
}

// =============================================================================
// TYPING INDICATOR
// =============================================================================

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8 }}
      className="flex items-center gap-2 p-4 rounded-2xl rounded-tl-none bg-[var(--glass-bg)] border border-[var(--border-default)] max-w-[120px]"
    >
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-indigo-400"
            animate={{
              y: [0, -6, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      <span className="text-[10px] text-[var(--text-muted)] ml-1">thinking...</span>
    </motion.div>
  )
}

// =============================================================================
// SVG ANIMATED PATH - Draws connection lines
// =============================================================================

function AnimatedConnectionPath({ delay = 0 }: { delay?: number }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 400 200"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M 50 100 Q 150 50 200 100 T 350 100"
        fill="none"
        stroke="url(#gradient-path)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.6 }}
        transition={{
          pathLength: { delay, duration: 1.5, ease: 'easeInOut' },
          opacity: { delay, duration: 0.5 },
        }}
      />
      <defs>
        <linearGradient id="gradient-path" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0.2" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// =============================================================================
// PANEL WITH SVG BORDER ANIMATION
// =============================================================================

function AnimatedPanel({
  title,
  icon,
  color,
  children,
  index,
}: {
  title: string
  icon: string
  color: 'indigo' | 'white' | 'purple'
  children: React.ReactNode
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const colorClasses = {
    indigo: 'text-indigo-400 border-indigo-500/30',
    white: 'text-[var(--text-secondary)] border-[var(--border-default)]',
    purple: 'text-purple-400 border-purple-500/30',
  }

  const bgColors = {
    indigo: 'from-indigo-500/10 to-transparent',
    white: 'from-[var(--glass-bg)] to-transparent',
    purple: 'from-purple-500/10 to-transparent',
  }

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={panelVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={`relative rounded-2xl border ${colorClasses[color]} bg-gradient-to-b ${bgColors[color]} backdrop-blur-xl overflow-hidden`}
    >
      {/* SVG Border Animation */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
      >
        <motion.rect
          x="0.5"
          y="0.5"
          width="calc(100% - 1px)"
          height="calc(100% - 1px)"
          rx="16"
          fill="none"
          stroke={color === 'indigo' ? '#6366f1' : color === 'purple' ? '#a855f7' : '#ffffff'}
          strokeWidth="1"
          strokeOpacity="0.3"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{
            delay: index * 0.3,
            duration: 1.2,
            ease: 'easeInOut',
          }}
        />
      </svg>

      {/* Header */}
      <div className="p-4 border-b border-[var(--border-light)]">
        <p
          className={`text-[10px] font-black uppercase tracking-wider ${colorClasses[color].split(' ')[0]} flex items-center gap-2`}
        >
          <span className="w-5 h-5 rounded bg-[var(--glass-bg-elevated)] flex items-center justify-center text-xs">
            {icon}
          </span>
          {title}
        </p>
      </div>

      {/* Content */}
      <div className="p-4">{children}</div>
    </motion.div>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function NotebookMockupAnimated() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-full max-w-5xl mx-auto rounded-3xl overflow-hidden border border-[var(--border-default)] bg-[#0F172A] shadow-2xl shadow-indigo-500/10"
    >
      {/* Header Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ delay: 0.2 }}
        className="h-12 border-b border-[var(--border-light)] bg-[var(--glass-bg)] flex items-center px-6 justify-between"
      >
        <div className="flex gap-2">
          {['#EF4444', '#F59E0B', '#10B981'].map((color, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: color, opacity: 0.6 }}
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 500 }}
            />
          ))}
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)]">
          DEALLIGENT INTELLIGENCE HUB
        </p>
        <div className="w-12" />
      </motion.div>

      {/* 3 Panel Layout */}
      <div className="flex h-[550px]">
        {/* LEFT PANEL - Knowledge Library */}
        <div className="w-1/4 border-r border-[var(--border-light)] p-4 bg-white/[0.02]">
          <AnimatedPanel title="Knowledge Library" icon="📁" color="indigo" index={0}>
            <div className="space-y-3 text-xs">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 }}
              >
                <p className="text-[var(--text-secondary)] mb-2 flex items-center gap-2">
                  <span className="text-indigo-400">📂</span> Client Cases
                </p>
                <div className="pl-4 space-y-1.5 border-l border-indigo-500/20">
                  {['Acme Corp', 'Beta Inc', 'Gamma Ltd'].map((client, i) => (
                    <motion.p
                      key={client}
                      className="text-[var(--text-muted)] hover:text-indigo-400 transition-colors cursor-pointer text-[11px]"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      whileHover={{ x: 4 }}
                    >
                      {i < 2 ? '├─' : '└─'} {client}
                    </motion.p>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.8 }}
              >
                <p className="text-[var(--text-secondary)] flex items-center gap-2">
                  <span className="text-indigo-400">📂</span> Meeting Notes
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.9 }}
              >
                <p className="text-[var(--text-secondary)] flex items-center gap-2">
                  <span className="text-indigo-400">📂</span> Product Specs
                </p>
              </motion.div>

              <motion.button
                className="w-full py-2 mt-4 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase transition-all hover:bg-indigo-500/20"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                + Upload Documents
              </motion.button>
            </div>
          </AnimatedPanel>
        </div>

        {/* CENTER PANEL - Conversation */}
        <div className="flex-1 flex flex-col p-6 bg-[var(--overlay-bg-light)] relative">
          <AnimatedConnectionPath delay={1.2} />

          <AnimatedPanel title="Conversation" icon="💬" color="white" index={1}>
            <div className="space-y-4 min-h-[350px]">
              {/* User Message */}
              <motion.div
                className="flex justify-end"
                variants={userBubbleVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
              >
                <div className="p-4 rounded-2xl rounded-tr-none bg-indigo-500/20 border border-indigo-500/30 max-w-[85%]">
                  <p className="text-sm text-white">
                    "What commitments did we make to Acme Corp?"
                  </p>
                </div>
              </motion.div>

              {/* AI Response with sources */}
              <motion.div
                className="flex justify-start"
                custom={0}
                variants={bubbleVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
              >
                <div className="p-5 rounded-2xl rounded-tl-none bg-[var(--glass-bg)] border border-[var(--border-default)] max-w-[90%]">
                  <p className="text-xs font-black text-indigo-400 uppercase mb-3 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center">
                      🤖
                    </span>
                    AI Response
                  </p>
                  <p className="text-sm text-[var(--text-primary)] leading-relaxed mb-4">
                    Based on the meeting transcript from Dec 15 and the contract draft:
                  </p>
                  <ul className="space-y-2 mb-5 text-sm">
                    {[
                      { text: 'API v2.0 delivery by Q2 2025', icon: '📅' },
                      { text: '99.9% uptime SLA guarantee', icon: '✅' },
                      { text: 'Dedicated support channel', icon: '🎧' },
                    ].map((item, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-2 text-[var(--text-primary)]"
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 1.3 + i * 0.15 }}
                      >
                        <span className="text-indigo-400">{item.icon}</span>
                        {item.text}
                      </motion.li>
                    ))}
                  </ul>

                  {/* Sources */}
                  <motion.div
                    className="pt-4 border-t border-[var(--border-default)]"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1.8 }}
                  >
                    <p className="text-[10px] font-bold text-[var(--text-muted)] mb-2 uppercase">
                      📎 Sources:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { name: 'meeting_acme.pdf', conf: 96 },
                        { name: 'contract_v2.docx', conf: 92 },
                      ].map((source) => (
                        <span
                          key={source.name}
                          className="text-[10px] px-2 py-1 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400"
                        >
                          {source.name}{' '}
                          <span className="text-[var(--text-muted)]">({source.conf}%)</span>
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Typing indicator */}
              <TypingIndicator />
            </div>
          </AnimatedPanel>

          {/* Input Bar */}
          <motion.div
            className="mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
          >
            <div className="h-12 rounded-xl bg-[var(--glass-bg)] border border-[var(--border-default)] px-4 flex items-center justify-between">
              <p className="text-sm text-[var(--text-muted)] italic">Ask anything about your knowledge...</p>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-[var(--text-muted)] font-mono">/command</span>
                <span className="text-[10px] text-indigo-400 font-mono">@agent</span>
                <motion.div
                  className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-white text-sm">↑</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT PANEL - Intelligence Agents */}
        <div className="w-1/4 border-l border-[var(--border-light)] p-4 bg-white/[0.02]">
          <AnimatedPanel title="Intelligence Agents" icon="🤖" color="purple" index={2}>
            <div className="space-y-4">
              <p className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">
                Active Agents
              </p>
              <div className="space-y-2">
                {[
                  { icon: '🌐', name: 'Mia', role: 'Market Intel', status: 'online' },
                  { icon: '📦', name: 'Pia', role: 'Product', status: 'online' },
                  { icon: '💼', name: 'Sia', role: 'Sales', status: 'idle' },
                  { icon: '⚙️', name: 'Tia', role: 'Technology', status: 'online' },
                ].map((agent, i) => (
                  <motion.div
                    key={agent.name}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--glass-bg)] border border-[var(--border-light)] group hover:border-purple-500/30 transition-all cursor-pointer"
                    initial={{ opacity: 0, x: 10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 1.0 + i * 0.15 }}
                    whileHover={{ x: -2, scale: 1.02 }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{agent.icon}</span>
                      <div>
                        <p className="text-[11px] text-[var(--text-primary)] font-bold">@{agent.name}</p>
                        <p className="text-[9px] text-[var(--text-muted)]">{agent.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${agent.status === 'online' ? 'bg-green-400' : 'bg-yellow-400'}`}
                      />
                      <span className="text-[8px] font-bold text-purple-400 uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                        Invoke
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="pt-4"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1.6 }}
              >
                <p className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-3">
                  Quick Actions
                </p>
                <div className="space-y-2">
                  {['+ Enrich Response', '📊 Generate Report', '🔍 Deep Search'].map((action) => (
                    <motion.button
                      key={action}
                      className="w-full py-2 rounded-lg border border-[var(--border-default)] text-[9px] font-bold text-[var(--text-secondary)] hover:bg-purple-500/10 hover:border-purple-500/20 hover:text-purple-400 transition-all text-left px-3"
                      whileHover={{ x: 2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {action}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          </AnimatedPanel>
        </div>
      </div>
    </motion.div>
  )
}

export default NotebookMockupAnimated
