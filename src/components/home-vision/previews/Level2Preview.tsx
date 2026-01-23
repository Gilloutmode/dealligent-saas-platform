// =============================================================================
// LEVEL 2 PREVIEW - External Sources Agent Animation
// Cyan theme - Command typing → Agent glow → Response reveal
// Loop ~7s
// =============================================================================

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap } from 'lucide-react'
import { useTypingEffect } from './TypingText'

type Phase = 'idle' | 'command' | 'agent' | 'response' | 'pause'

const command = "/market \"What's nTopology shipping this quarter?\""
const responseLine1 = "Based on recent announcements and job postings:"
const responsePoints = [
  "• Expanding enterprise tier with new API",
  "• Focus on manufacturing integrations",
  "• 3 new hires in product team",
]

export function Level2Preview() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [cycleKey, setCycleKey] = useState(0)
  const [visiblePoints, setVisiblePoints] = useState(0)

  const commandTyping = useTypingEffect(command, 25, phase === 'command')

  // Start cycle
  const startCycle = useCallback(() => {
    setPhase('command')
    setVisiblePoints(0)
  }, [])

  useEffect(() => {
    const timer = setTimeout(startCycle, 500)
    return () => clearTimeout(timer)
  }, [cycleKey, startCycle])

  // Phase transitions
  useEffect(() => {
    if (phase === 'command' && commandTyping.isComplete) {
      const timer = setTimeout(() => setPhase('agent'), 400)
      return () => clearTimeout(timer)
    }
  }, [phase, commandTyping.isComplete])

  useEffect(() => {
    if (phase === 'agent') {
      const timer = setTimeout(() => setPhase('response'), 1500)
      return () => clearTimeout(timer)
    }
  }, [phase])

  useEffect(() => {
    if (phase === 'response') {
      const interval = setInterval(() => {
        setVisiblePoints(prev => {
          if (prev >= responsePoints.length) {
            clearInterval(interval)
            setTimeout(() => setPhase('pause'), 800)
            return prev
          }
          return prev + 1
        })
      }, 400)
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
    <div className="space-y-3 text-sm font-mono min-h-[140px]">
      {/* Command */}
      <AnimatePresence mode="wait">
        {(phase !== 'idle') && (
          <motion.div
            key={`cmd-${cycleKey}`}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="p-3 rounded-lg bg-white/5 text-cyan-300"
          >
            {commandTyping.displayed}
            {phase === 'command' && !commandTyping.isComplete && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-0.5 h-3 bg-cyan-400 ml-0.5"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Agent badge with glow */}
      <AnimatePresence>
        {(phase === 'agent' || phase === 'response' || phase === 'pause') && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20"
          >
            {/* Agent header with glow effect */}
            <motion.div 
              className="flex items-center gap-2 text-cyan-400 mb-2"
              animate={phase === 'agent' ? {
                boxShadow: [
                  '0 0 0 rgba(6, 182, 212, 0)',
                  '0 0 20px rgba(6, 182, 212, 0.4)',
                  '0 0 0 rgba(6, 182, 212, 0)',
                ],
              } : {}}
              transition={{ duration: 1.5, repeat: phase === 'agent' ? Infinity : 0 }}
            >
              <motion.div
                animate={phase === 'agent' ? { rotate: 360 } : {}}
                transition={{ duration: 2, repeat: phase === 'agent' ? Infinity : 0, ease: 'linear' }}
              >
                <Zap className="w-4 h-4" />
              </motion.div>
              <span className="font-semibold">@Market</span>
              {phase === 'agent' && (
                <span className="text-[10px] text-cyan-300 animate-pulse">analyzing...</span>
              )}
            </motion.div>

            {/* Response content */}
            {(phase === 'response' || phase === 'pause') && (
              <div className="text-neutral-300 font-sans space-y-1">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-neutral-400 mb-2"
                >
                  {responseLine1}
                </motion.p>
                {responsePoints.slice(0, visiblePoints).map((point, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25, delay: i * 0.1 }}
                    className="text-xs"
                  >
                    {point}
                  </motion.p>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Level2Preview
