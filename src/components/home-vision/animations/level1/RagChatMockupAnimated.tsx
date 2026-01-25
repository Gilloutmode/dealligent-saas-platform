// =============================================================================
// RAG CHAT MOCKUP ANIMATED V5 - 3 COLUMNS NOTEBOOK MINI
// Miniature version of NotebookMockup with 3-column layout for RAG Chat card
// Layout: Sources (25%) | Conversation (50%) | Intelligence (25%)
// Timeline: ~6s (plays once on viewport entry, hover to replay)
// =============================================================================

import { motion, AnimatePresence, useInView } from 'framer-motion'
import { memo, useEffect, useState, useRef, useCallback } from 'react'
import { useTypingEffect } from '../hooks/useTypingEffect'
import { ThinkingDots } from '../primitives/ThinkingDots'

type Phase = 'idle' | 'typing' | 'thinking' | 'response' | 'sources' | 'pause'

const PHASES = [
  { phase: 'typing' as const, duration: 1200 },
  { phase: 'thinking' as const, duration: 800 },
  { phase: 'response' as const, duration: 1500 },
  { phase: 'sources' as const, duration: 1200 },
  { phase: 'pause' as const, duration: 1500 },
]

const USER_QUESTION = 'What about Acme?'

const AI_RESPONSE = {
  intro: 'Based on your knowledge base:',
  points: [
    'Last contact: Dec 15',
    'Contract: $45K/year',
  ],
}

const SOURCES = [
  { name: 'meeting_notes.pdf', confidence: 94 },
]

const KNOWLEDGE_FILES = [
  { name: 'Clients', icon: '📂', isFolder: true },
  { name: 'Acme Corp', icon: '📄', indent: true, highlight: true },
  { name: 'Beta Inc', icon: '📄', indent: true },
  { name: 'Meetings', icon: '📂', isFolder: true },
  { name: 'Proposals', icon: '📂', isFolder: true },
]

const AGENTS = [
  { icon: '🌐', name: 'Mia', role: 'Market' },
  { icon: '📦', name: 'Pia', role: 'Product' },
  { icon: '💼', name: 'Sia', role: 'Sales' },
]

/**
 * RAG Chat Mockup V5 - 3 Columns Notebook Mini
 * Compact 3-column layout: Sources | Conversation | Intelligence
 */
export const RagChatMockupAnimated = memo(function RagChatMockupAnimated() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-50px' })
  const [phase, setPhase] = useState<Phase>('idle')
  const [hasPlayed, setHasPlayed] = useState(false)
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  // Typing effect for user question
  const { displayed: userText, reset: resetTyping } = useTypingEffect(
    USER_QUESTION,
    phase === 'typing',
    { speed: 50 }
  )

  const resetAnimation = useCallback(() => {
    resetTyping()
    setPhaseIndex(0)
    setPhase('idle')
    setHasPlayed(false)
  }, [resetTyping])

  // Phase loop management
  useEffect(() => {
    if (!isInView && !isHovering) return
    if (hasPlayed && !isHovering) return

    if (phase === 'idle') {
      const timer = setTimeout(() => {
        setPhaseIndex(0)
        setPhase(PHASES[0].phase)
      }, 200)
      return () => clearTimeout(timer)
    }

    const currentPhase = PHASES[phaseIndex]
    if (!currentPhase) return

    const timer = setTimeout(() => {
      const nextIndex = phaseIndex + 1
      if (nextIndex >= PHASES.length) {
        setHasPlayed(true)
        return
      }
      setPhaseIndex(nextIndex)
      setPhase(PHASES[nextIndex].phase)
    }, currentPhase.duration)

    return () => clearTimeout(timer)
  }, [phase, phaseIndex, isInView, hasPlayed, isHovering])

  const handleMouseEnter = () => {
    if (hasPlayed) {
      setIsHovering(true)
      resetAnimation()
    }
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  const showUserMessage = phase !== 'idle'
  const showThinking = phase === 'thinking'
  const showResponse = ['response', 'sources', 'pause'].includes(phase)
  const showSources = ['sources', 'pause'].includes(phase)

  return (
    <motion.div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="w-full aspect-[16/10] rounded-xl overflow-hidden border border-[var(--mockup-border)] bg-[var(--mockup-bg)] shadow-lg cursor-pointer"
    >
      <div className="flex flex-col h-full">
        {/* Header - macOS style */}
        <div className="h-6 border-b border-[var(--border-light)] bg-[var(--glass-bg)] flex items-center px-2 justify-between shrink-0">
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
          </div>
          <p className="text-[7px] font-black uppercase tracking-[0.15em] text-[var(--text-muted)]">
            DEALLIGENT RAG
          </p>
          <div className="w-5" />
        </div>

        {/* 3 Columns Layout */}
        <div className="flex-1 flex overflow-hidden min-h-0">
          {/* Left: Sources Panel (25%) */}
          <div className="w-1/4 border-r border-[var(--border-light)] p-1.5 bg-[var(--glass-bg)]/50 flex flex-col">
            <p className="text-[7px] font-black uppercase tracking-wider text-blue-400 mb-1.5 flex items-center gap-1">
              <span className="text-[8px]">📁</span>
              SOURCES
            </p>

            <div className="space-y-0.5 text-[7px] flex-1 overflow-hidden">
              {KNOWLEDGE_FILES.map((file, idx) => (
                <motion.div
                  key={idx}
                  animate={{
                    backgroundColor:
                      file.highlight && showSources
                        ? 'rgba(59, 130, 246, 0.2)'
                        : 'transparent',
                    borderColor:
                      file.highlight && showSources
                        ? 'rgba(59, 130, 246, 0.4)'
                        : 'transparent',
                  }}
                  transition={{ duration: 0.3 }}
                  className={`
                    flex items-center gap-0.5 py-0.5 px-1 rounded border
                    ${file.indent ? 'ml-1.5' : ''}
                    ${file.isFolder ? 'text-[var(--text-secondary)]' : 'text-[var(--text-muted)]'}
                  `}
                >
                  <span className="text-[7px]">{file.icon}</span>
                  <span className={file.highlight && showSources ? 'text-blue-400 font-medium' : ''}>
                    {file.indent ? '└─ ' : ''}{file.name}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Mini upload button */}
            <button className="mt-auto py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[6px] font-bold uppercase">
              + Upload
            </button>
          </div>

          {/* Center: Conversation Panel (50%) */}
          <div className="w-1/2 p-1.5 bg-[var(--overlay-bg-light)] flex flex-col min-h-0">
            <p className="text-[7px] font-black uppercase tracking-wider text-[var(--text-muted)] mb-1.5 flex items-center gap-1 justify-center shrink-0">
              <span className="text-[8px]">💬</span>
              CONVERSATION
            </p>

            <div className="flex-1 space-y-1.5 overflow-hidden">
              {/* User Question */}
              <AnimatePresence mode="wait">
                {showUserMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="flex justify-end"
                  >
                    <div className="card-glass px-1.5 py-1 rounded-lg rounded-tr-none max-w-[90%] border-blue-500/20">
                      <p className="text-[7px] text-[var(--text-muted)] mb-0.5">User:</p>
                      <p className="text-[8px] text-[var(--mockup-text)]">
                        "{userText}
                        {phase === 'typing' && (
                          <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                            className="inline-block w-0.5 h-2 bg-blue-400 ml-0.5 align-middle"
                          />
                        )}
                        "
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Thinking Dots */}
              <AnimatePresence mode="wait">
                {showThinking && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="flex justify-start"
                  >
                    <div className="card-glass px-1.5 py-1 rounded-lg rounded-tl-none border-[var(--glass-bg-elevated)]">
                      <div className="flex items-center gap-1">
                        <span className="text-[8px]">🤖</span>
                        <ThinkingDots color="bg-blue-400" size={3} gap="gap-0.5" />
                        <span className="text-[6px] text-[var(--text-muted)]">Searching...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* AI Response */}
              <AnimatePresence mode="wait">
                {showResponse && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="flex justify-start"
                  >
                    <div className="card-glass px-1.5 py-1 rounded-lg rounded-tl-none max-w-[95%] border-[var(--glass-bg-elevated)]">
                      <p className="text-[7px] font-black text-blue-400 uppercase mb-0.5">
                        🤖 Dealligent:
                      </p>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-[7px] text-[var(--text-primary)] mb-1"
                      >
                        {AI_RESPONSE.intro}
                      </motion.p>

                      <ul className="space-y-0.5 text-[7px] text-[var(--text-secondary)]">
                        {AI_RESPONSE.points.map((point, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -4 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: 0.15 + idx * 0.1,
                              type: 'spring',
                              stiffness: 400,
                              damping: 25,
                            }}
                            className="flex items-start gap-1"
                          >
                            <span className="text-blue-400">&#8226;</span>
                            {point}
                          </motion.li>
                        ))}
                      </ul>

                      {/* Sources Section */}
                      <AnimatePresence>
                        {showSources && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            className="mt-1 pt-1 border-t border-[var(--glass-bg-elevated)]"
                          >
                            <div className="flex items-center justify-between text-[6px]">
                              <span className="text-[var(--text-muted)]">📎 Sources:</span>
                              <span className="text-blue-400">{SOURCES[0].name}</span>
                              <span className="text-green-400 font-bold">{SOURCES[0].confidence}%</span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mini Input Bar */}
            <div className="mt-auto pt-1 shrink-0">
              <div className="h-4 rounded-md bg-[var(--glass-bg)] border border-[var(--glass-bg-elevated)] px-1.5 flex items-center justify-between">
                <p className="text-[6px] text-[var(--text-muted)] italic">Ask anything...</p>
                <div className="w-3 h-3 rounded bg-blue-500 flex items-center justify-center">
                  <span className="text-white text-[7px]">&#8593;</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Intelligence Panel (25%) */}
          <div className="w-1/4 border-l border-[var(--border-light)] p-1.5 bg-[var(--glass-bg)]/50 flex flex-col">
            <p className="text-[7px] font-black uppercase tracking-wider text-purple-400 mb-1.5 flex items-center gap-1">
              <span className="text-[8px]">🤖</span>
              INTELLIGENCE
            </p>

            {/* Active Agents */}
            <div className="mb-2">
              <p className="text-[6px] font-bold text-[var(--text-muted)] uppercase mb-1">
                Active Agents:
              </p>
              <div className="space-y-0.5">
                {AGENTS.map((agent, idx) => (
                  <motion.div
                    key={agent.name}
                    initial={{ opacity: 0, x: 4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-1 py-0.5 px-1 rounded bg-[var(--glass-bg)]/50 border border-[var(--border-light)]"
                  >
                    <span className="text-[7px]">{agent.icon}</span>
                    <span className="text-[7px] text-[var(--text-primary)] font-medium">
                      @{agent.name}
                    </span>
                    <span className="text-[6px] text-[var(--text-muted)]">
                      ({agent.role})
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-auto">
              <p className="text-[6px] font-bold text-[var(--text-muted)] uppercase mb-1">
                Quick Actions:
              </p>
              <div className="space-y-0.5">
                <button className="w-full py-0.5 rounded border border-[var(--glass-bg-elevated)] text-[6px] text-[var(--text-secondary)] hover:bg-[var(--glass-bg)] transition-colors text-left px-1">
                  [+ Enrich]
                </button>
                <button className="w-full py-0.5 rounded border border-[var(--glass-bg-elevated)] text-[6px] text-[var(--text-secondary)] hover:bg-[var(--glass-bg)] transition-colors text-left px-1">
                  [📊 Report]
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
})

export default RagChatMockupAnimated
