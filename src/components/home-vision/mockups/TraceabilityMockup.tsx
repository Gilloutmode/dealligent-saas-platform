// =============================================================================
// TRACEABILITY MOCKUP - Source Traceability Animation
// Document opens, text highlights progressively, confidence badge appears
// Uses Framer Motion only - loops automatically
// =============================================================================

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, ExternalLink } from 'lucide-react'

type Phase = 'idle' | 'opening' | 'highlighting' | 'badge' | 'pause'

const documentLines = [
  'Subject: Acme Corp Proposal',
  'Pricing: $120,000/year',
  'Discount: 20% applied',
  'Terms: Net 30',
]

export function TraceabilityMockup() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [highlightedLines, setHighlightedLines] = useState(0)

  // Phase machine
  useEffect(() => {
    const timer = setTimeout(() => {
      if (phase === 'idle') {
        setPhase('opening')
        setHighlightedLines(0)
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [phase])

  // Opening phase
  useEffect(() => {
    if (phase !== 'opening') return
    const timer = setTimeout(() => setPhase('highlighting'), 600)
    return () => clearTimeout(timer)
  }, [phase])

  // Highlighting lines progressively
  useEffect(() => {
    if (phase !== 'highlighting') return
    const interval = setInterval(() => {
      setHighlightedLines(prev => {
        if (prev >= 2) { // Highlight lines 1 and 2 (pricing info)
          clearInterval(interval)
          setTimeout(() => setPhase('badge'), 300)
          return prev
        }
        return prev + 1
      })
    }, 500)
    return () => clearInterval(interval)
  }, [phase])

  // Badge phase
  useEffect(() => {
    if (phase !== 'badge') return
    const timer = setTimeout(() => setPhase('pause'), 1500)
    return () => clearTimeout(timer)
  }, [phase])

  // Pause then reset
  useEffect(() => {
    if (phase !== 'pause') return
    const timer = setTimeout(() => setPhase('idle'), 1500)
    return () => clearTimeout(timer)
  }, [phase])

  return (
    <div className="h-[100px] flex flex-col">
      {/* Document header */}
      <div className="flex items-center gap-2 mb-2">
        <FileText className="w-3 h-3 text-blue-400" />
        <span className="text-[10px] text-[var(--text-primary)]">acme_proposal.pdf</span>
        <ExternalLink className="w-2.5 h-2.5 text-[var(--text-muted)]" />
      </div>

      {/* Document content with progressive highlight */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: phase !== 'idle' ? 1 : 0, 
          height: phase !== 'idle' ? 'auto' : 0 
        }}
        transition={{ duration: 0.3 }}
        className="flex-1 p-2 rounded bg-white/5 border border-white/10 overflow-hidden"
      >
        <div className="space-y-1">
          {documentLines.map((line, i) => (
            <motion.div
              key={i}
              className="relative"
            >
              {/* Highlight overlay */}
              {(i === 1 || i === 2) && highlightedLines > (i - 1) && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 bg-yellow-500/20 rounded"
                />
              )}
              <span className={`relative text-[9px] ${
                (i === 1 || i === 2) && highlightedLines > (i - 1) 
                  ? 'text-[var(--text-primary)] font-medium' 
                  : 'text-[var(--text-muted)]'
              }`}>
                {line}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Confidence badge */}
      <AnimatePresence>
        {(phase === 'badge' || phase === 'pause') && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500 }}
            className="flex justify-end mt-2"
          >
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-medium">
              96% confidence
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TraceabilityMockup
