// =============================================================================
// RAG MOCKUP - RAG-Powered Q&A Animation
// Mini chat with typing effect, thinking dots, sources
// Uses Framer Motion only - loops automatically
// =============================================================================

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText } from 'lucide-react'

type Phase = 'idle' | 'question' | 'thinking' | 'answer' | 'sources' | 'pause'

export function RAGMockup() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [questionChars, setQuestionChars] = useState(0)
  const [answerChars, setAnswerChars] = useState(0)
  const [visibleSources, setVisibleSources] = useState(0)

  const question = 'What pricing for Client X?'
  const answer = 'Based on docs: $120K/year'
  const sources = [
    { name: 'proposal.pdf', confidence: 96 },
    { name: 'notes.txt', confidence: 91 },
  ]

  // Phase machine
  useEffect(() => {
    const timer = setTimeout(() => {
      if (phase === 'idle') {
        setPhase('question')
        setQuestionChars(0)
        setAnswerChars(0)
        setVisibleSources(0)
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [phase])

  // Question typing
  useEffect(() => {
    if (phase !== 'question') return
    const interval = setInterval(() => {
      setQuestionChars(prev => {
        if (prev >= question.length) {
          clearInterval(interval)
          setTimeout(() => setPhase('thinking'), 200)
          return prev
        }
        return prev + 1
      })
    }, 40)
    return () => clearInterval(interval)
  }, [phase])

  // Thinking phase
  useEffect(() => {
    if (phase !== 'thinking') return
    const timer = setTimeout(() => setPhase('answer'), 1500)
    return () => clearTimeout(timer)
  }, [phase])

  // Answer typing
  useEffect(() => {
    if (phase !== 'answer') return
    const interval = setInterval(() => {
      setAnswerChars(prev => {
        if (prev >= answer.length) {
          clearInterval(interval)
          setTimeout(() => setPhase('sources'), 200)
          return prev
        }
        return prev + 1
      })
    }, 30)
    return () => clearInterval(interval)
  }, [phase])

  // Sources appearing
  useEffect(() => {
    if (phase !== 'sources') return
    const interval = setInterval(() => {
      setVisibleSources(prev => {
        if (prev >= sources.length) {
          clearInterval(interval)
          setTimeout(() => setPhase('pause'), 500)
          return prev
        }
        return prev + 1
      })
    }, 400)
    return () => clearInterval(interval)
  }, [phase])

  // Pause then reset
  useEffect(() => {
    if (phase !== 'pause') return
    const timer = setTimeout(() => setPhase('idle'), 2000)
    return () => clearTimeout(timer)
  }, [phase])

  return (
    <div className="h-[100px] flex flex-col text-[10px] space-y-2 overflow-hidden">
      {/* Question */}
      {(phase !== 'idle') && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-1"
        >
          <span className="text-blue-400 shrink-0">You:</span>
          <span className="text-[var(--text-primary)]">
            {question.slice(0, questionChars)}
            {phase === 'question' && questionChars < question.length && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.4, repeat: Infinity }}
                className="inline-block w-0.5 h-2.5 bg-blue-400 ml-0.5"
              />
            )}
          </span>
        </motion.div>
      )}

      {/* Thinking dots */}
      <AnimatePresence>
        {phase === 'thinking' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-1"
          >
            <span className="text-emerald-400">AI:</span>
            <div className="flex gap-0.5">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 bg-emerald-400 rounded-full"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.1 }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Answer */}
      {(phase === 'answer' || phase === 'sources' || phase === 'pause') && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-1"
        >
          <span className="text-emerald-400 shrink-0">AI:</span>
          <span className="text-[var(--text-secondary)]">
            {answer.slice(0, answerChars)}
          </span>
        </motion.div>
      )}

      {/* Sources */}
      {(phase === 'sources' || phase === 'pause') && visibleSources > 0 && (
        <div className="flex gap-1.5 flex-wrap">
          {sources.slice(0, visibleSources).map((source, i) => (
            <motion.div
              key={source.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/5 border border-white/10"
            >
              <FileText className="w-2.5 h-2.5 text-blue-400" />
              <span className="text-[8px] text-[var(--text-muted)]">{source.name}</span>
              <span className={`text-[8px] ${source.confidence >= 95 ? 'text-emerald-400' : 'text-yellow-400'}`}>
                {source.confidence}%
              </span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default RAGMockup
