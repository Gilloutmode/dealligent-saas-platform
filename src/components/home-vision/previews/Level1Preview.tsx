// =============================================================================
// LEVEL 1 PREVIEW - Internal Sources Chat Animation
// Indigo theme - Typing → Thinking → Response → Sources
// Loop ~8s
// =============================================================================

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, FileText } from 'lucide-react'
import { ThinkingDots } from './ThinkingDots'
import { useTypingEffect } from './TypingText'

type Phase = 'idle' | 'question' | 'thinking' | 'response' | 'sources' | 'pause'

const question = "What's our pricing for enterprise clients?"
const response = "Based on your internal docs, enterprise pricing starts at $120K/year with 20% volume discount."

const sources = [
  { name: 'pricing_2024.pdf', confidence: 96 },
  { name: 'enterprise_tiers.xlsx', confidence: 92 },
  { name: 'client_notes.docx', confidence: 88 },
]

export function Level1Preview() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [cycleKey, setCycleKey] = useState(0)
  const [visibleSources, setVisibleSources] = useState(0)

  const questionTyping = useTypingEffect(question, 35, phase === 'question')
  const responseTyping = useTypingEffect(response, 20, phase === 'response')

  // Start cycle
  const startCycle = useCallback(() => {
    setPhase('question')
    setVisibleSources(0)
  }, [])

  useEffect(() => {
    const timer = setTimeout(startCycle, 500)
    return () => clearTimeout(timer)
  }, [cycleKey, startCycle])

  // Phase transitions
  useEffect(() => {
    if (phase === 'question' && questionTyping.isComplete) {
      const timer = setTimeout(() => setPhase('thinking'), 300)
      return () => clearTimeout(timer)
    }
  }, [phase, questionTyping.isComplete])

  useEffect(() => {
    if (phase === 'thinking') {
      const timer = setTimeout(() => setPhase('response'), 1500)
      return () => clearTimeout(timer)
    }
  }, [phase])

  useEffect(() => {
    if (phase === 'response' && responseTyping.isComplete) {
      const timer = setTimeout(() => setPhase('sources'), 300)
      return () => clearTimeout(timer)
    }
  }, [phase, responseTyping.isComplete])

  useEffect(() => {
    if (phase === 'sources') {
      const interval = setInterval(() => {
        setVisibleSources(prev => {
          if (prev >= sources.length) {
            clearInterval(interval)
            setTimeout(() => setPhase('pause'), 500)
            return prev
          }
          return prev + 1
        })
      }, 300)
      return () => clearInterval(interval)
    }
  }, [phase])

  useEffect(() => {
    if (phase === 'pause') {
      const timer = setTimeout(() => {
        setPhase('idle')
        setCycleKey(k => k + 1)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [phase])

  return (
    <div className="space-y-3 text-sm min-h-[140px]">
      {/* Header */}
      <div className="flex items-center gap-2 p-3 rounded-lg bg-white/5">
        <div className="w-8 h-8 rounded bg-indigo-500/20 flex items-center justify-center">
          <MessageSquare className="w-4 h-4 text-indigo-400" />
        </div>
        <span className="text-xs text-neutral-400">RAG Assistant</span>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        {(phase !== 'idle') && (
          <motion.div
            key={`q-${cycleKey}`}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="p-3 rounded-lg bg-white/5 text-neutral-300"
          >
            "{questionTyping.displayed}"
            {phase === 'question' && !questionTyping.isComplete && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-0.5 h-3 bg-neutral-400 ml-0.5"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Thinking */}
      <AnimatePresence>
        {phase === 'thinking' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-3"
          >
            <ThinkingDots color="bg-indigo-400" label="Searching docs" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Response */}
      <AnimatePresence mode="wait">
        {(phase === 'response' || phase === 'sources' || phase === 'pause') && (
          <motion.div
            key={`r-${cycleKey}`}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-neutral-300"
          >
            {responseTyping.displayed}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sources */}
      {(phase === 'sources' || phase === 'pause') && visibleSources > 0 && (
        <div className="flex flex-wrap gap-2">
          {sources.slice(0, visibleSources).map((src, i) => (
            <motion.div
              key={src.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25, delay: i * 0.1 }}
              className="flex items-center gap-1 px-2 py-1 rounded bg-white/5 text-[10px]"
            >
              <FileText className="w-3 h-3 text-indigo-400" />
              <span className="text-neutral-400">{src.name}</span>
              <span className="text-indigo-400">{src.confidence}%</span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Level1Preview
