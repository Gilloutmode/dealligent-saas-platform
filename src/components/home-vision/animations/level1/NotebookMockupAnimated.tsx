// =============================================================================
// NOTEBOOK MOCKUP ANIMATED - Level 1 Interface
// Animated chat conversation with typing, thinking dots, and sources reveal
// Timeline: ~10s (plays once on viewport entry, settles on final state)
// =============================================================================

import { motion, AnimatePresence, useInView } from 'framer-motion'
import { memo, useEffect, useState, useRef, useCallback } from 'react'
import { useTypingEffect } from '../hooks/useTypingEffect'
import { ThinkingDots } from '../primitives/ThinkingDots'

type Phase = 'idle' | 'typing' | 'thinking' | 'response' | 'sources' | 'pause'

const PHASES = [
  { phase: 'typing' as const, duration: 2000 },
  { phase: 'thinking' as const, duration: 1500 },
  { phase: 'response' as const, duration: 2500 },
  { phase: 'sources' as const, duration: 2000 },
  { phase: 'pause' as const, duration: 2000 },
]

const USER_QUESTION = 'What did we promise to Acme?'
const AI_RESPONSES = [
  'Based on the meeting transcript from Dec 15, you promised:',
]
const PROMISES = [
  { text: 'API v2 by Q2', icon: '•' },
  { text: '99.9% SLA', icon: '•' },
  { text: 'Priority support', icon: '•' },
]
const SOURCES = [
  { name: 'meeting_acme.pdf', confidence: 94 },
  { name: 'proposal_v2.docx', confidence: 87 },
  { name: 'email_thread.eml', confidence: 82 },
]

/**
 * Animated Notebook Interface Mockup
 * Shows the full conversation flow with typing, thinking, and source reveal
 */
export const NotebookMockupAnimated = memo(function NotebookMockupAnimated() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const [phase, setPhase] = useState<Phase>('idle')
  const [hasPlayed, setHasPlayed] = useState(false)
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  // Typing effect for user question
  const { displayed: userText, reset: resetTyping } = useTypingEffect(
    USER_QUESTION,
    phase === 'typing',
    { speed: 35 }
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
      // Start after initial delay
      const timer = setTimeout(() => {
        setPhaseIndex(0)
        setPhase(PHASES[0].phase)
      }, 500)
      return () => clearTimeout(timer)
    }

    const currentPhase = PHASES[phaseIndex]
    if (!currentPhase) return

    const timer = setTimeout(() => {
      const nextIndex = phaseIndex + 1
      if (nextIndex >= PHASES.length) {
        // Animation complete - stay on final state
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
      className="w-full max-w-5xl mx-auto rounded-3xl overflow-hidden border border-[var(--mockup-border)] bg-[var(--mockup-bg)] shadow-2xl cursor-pointer"
    >
      <div className="flex flex-col h-[600px]">
        {/* Header */}
        <div className="h-12 border-b border-[var(--border-light)] bg-[var(--glass-bg)] flex items-center px-6 justify-between">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)]">
            DEALLIGENT INTELLIGENCE HUB
          </p>
          <div className="w-12" />
        </div>

        {/* 3 Columns */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left: Knowledge Library (25%) */}
          <div className="w-1/4 border-r border-[var(--border-light)] p-6 bg-[var(--glass-bg)]">
            <p className="text-[10px] font-black uppercase tracking-wider text-blue-400 mb-6 flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-blue-500/20 flex items-center justify-center text-[10px]">📁</span>
              INSIDE SOURCES
            </p>
            <div className="space-y-4 text-xs">
              <div>
                <p className="text-[var(--text-secondary)] mb-2 flex items-center gap-2">📂 Client Cases</p>
                <div className="pl-4 space-y-2 border-l border-[var(--glass-bg-elevated)]">
                  <p className="text-[var(--text-muted)] hover:text-[var(--mockup-text)] transition-colors cursor-pointer">├─ Acme</p>
                  <p className="text-[var(--text-muted)] hover:text-[var(--mockup-text)] transition-colors cursor-pointer">├─ Beta</p>
                  <p className="text-[var(--text-muted)] hover:text-[var(--mockup-text)] transition-colors cursor-pointer">└─ Gamma</p>
                </div>
              </div>
              <div>
                <p className="text-[var(--text-secondary)] mb-2 flex items-center gap-2">📂 Support Cases</p>
                <div className="pl-4 space-y-2 border-l border-[var(--glass-bg-elevated)]">
                  <p className="text-[var(--text-muted)]">├─ Bug #1</p>
                  <p className="text-[var(--text-muted)]">└─ Bug #2</p>
                </div>
              </div>
              <p className="text-[var(--text-secondary)]">📂 Product Cases</p>
              <p className="text-[var(--text-secondary)]">📂 Meetings</p>

              <button className="w-full py-2 mt-4 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase transition-all hover:bg-blue-500/20">
                + Upload
              </button>
            </div>
          </div>

          {/* Center: Conversation (50%) */}
          <div className="flex-1 p-8 bg-[var(--overlay-bg-light)] relative flex flex-col">
            <p className="text-[10px] font-black uppercase tracking-wider text-[var(--text-muted)] mb-8 flex items-center gap-2 justify-center">
              <span className="w-4 h-4 rounded bg-[var(--glass-bg-elevated)] flex items-center justify-center text-[10px]">💬</span>
              CONVERSATION PANEL
            </p>

            <div className="flex-1 space-y-6 overflow-y-auto pr-4 scrollbar-hide">
              {/* User Question */}
              <AnimatePresence mode="wait">
                {showUserMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="flex justify-end"
                  >
                    <div className="card-glass p-4 rounded-2xl rounded-tr-none max-w-[80%] border-blue-500/20">
                      <p className="text-sm text-[var(--mockup-text)]">
                        User: "{userText}
                        {phase === 'typing' && (
                          <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                            className="inline-block w-0.5 h-4 bg-blue-400 ml-0.5 align-middle"
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
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="flex justify-start"
                  >
                    <div className="card-glass p-4 rounded-2xl rounded-tl-none border-[var(--glass-bg-elevated)]">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-blue-400">🤖</span>
                        <ThinkingDots color="bg-blue-400" size={6} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* AI Answer */}
              <AnimatePresence mode="wait">
                {showResponse && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="flex justify-start"
                  >
                    <div className="card-glass p-6 rounded-2xl rounded-tl-none max-w-[90%] border-[var(--glass-bg-elevated)]">
                      <p className="text-xs font-black text-blue-400 uppercase mb-3">🤖 AI RESPONSE</p>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-sm text-[var(--text-primary)] leading-relaxed mb-4"
                      >
                        {AI_RESPONSES[0]}
                      </motion.p>

                      <ul className="space-y-2 mb-6 text-sm text-[var(--text-secondary)]">
                        {PROMISES.map((promise, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: 0.2 + idx * 0.15,
                              type: 'spring',
                              stiffness: 400,
                              damping: 25,
                            }}
                            className="flex items-start gap-2"
                          >
                            <span className="text-blue-400">{promise.icon}</span>
                            {promise.text}
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
                            className="pt-4 border-t border-[var(--glass-bg-elevated)]"
                          >
                            <p className="text-[10px] font-bold text-[var(--text-muted)] mb-3 uppercase italic">📎 Sources:</p>
                            <div className="space-y-2">
                              {SOURCES.map((source, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{
                                    delay: idx * 0.1,
                                    type: 'spring',
                                    stiffness: 400,
                                    damping: 25,
                                  }}
                                  className="flex items-center justify-between text-[10px]"
                                >
                                  <span className="text-blue-400">• {source.name}</span>
                                  <motion.span
                                    className="text-[var(--text-muted)]"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: idx * 0.1 + 0.3 }}
                                  >
                                    (confidence: {source.confidence}%)
                                  </motion.span>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input Bar */}
            <div className="mt-8 relative">
              <div className="w-full h-12 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-bg-elevated)] px-4 flex items-center justify-between">
                <p className="text-sm text-[var(--text-muted)] italic">Type your question...</p>
                <div className="flex gap-2">
                  <span className="text-[10px] text-[var(--text-muted)]">/command</span>
                  <span className="text-[10px] text-blue-400">@agent</span>
                  <div className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center">
                    <span className="text-white text-xs">↑</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Intelligence (25%) */}
          <div className="w-1/4 border-l border-[var(--border-light)] p-6 bg-[var(--glass-bg)]">
            <p className="text-[10px] font-black uppercase tracking-wider text-purple-400 mb-6 flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-purple-500/20 flex items-center justify-center text-[10px]">🤖</span>
              OUTSIDE SOURCES
            </p>

            <div className="space-y-4">
              <p className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">ACTIVE AGENTS</p>
              <div className="space-y-2">
                {[
                  { icon: '🌐', name: 'Mia', role: 'Market' },
                  { icon: '📦', name: 'Pia', role: 'Product' },
                  { icon: '💼', name: 'Sia', role: 'Sales' },
                  { icon: '⚙️', name: 'Tia', role: 'Tech' },
                ].map(agent => (
                  <div key={agent.name} className="flex items-center justify-between p-2 rounded-lg bg-[var(--glass-bg)] border border-[var(--border-light)] group hover:border-blue-500/30 transition-all">
                    <div className="flex items-center gap-2">
                      <span className="text-xs">{agent.icon}</span>
                      <div className="text-[10px]">
                        <p className="text-[var(--text-primary)] font-bold">@{agent.name}</p>
                        <p className="text-[var(--text-muted)]">({agent.role})</p>
                      </div>
                    </div>
                    <button className="text-[8px] font-bold text-blue-400 uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                      [Invoke]
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <p className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-4">QUICK ACTIONS</p>
                <div className="space-y-2">
                  <button className="w-full py-2 rounded-lg border border-[var(--glass-bg-elevated)] text-[9px] font-bold text-[var(--text-secondary)] hover:bg-[var(--glass-bg)] transition-all text-left px-3">
                    [+ Enrich Response]
                  </button>
                  <button className="w-full py-2 rounded-lg border border-[var(--glass-bg-elevated)] text-[9px] font-bold text-[var(--text-secondary)] hover:bg-[var(--glass-bg)] transition-all text-left px-3">
                    [📊 Generate Report]
                  </button>
                  <button className="w-full py-2 rounded-lg border border-[var(--glass-bg-elevated)] text-[9px] font-bold text-[var(--text-secondary)] hover:bg-[var(--glass-bg)] transition-all text-left px-3">
                    [🔍 Deep Search]
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
})

export default NotebookMockupAnimated
