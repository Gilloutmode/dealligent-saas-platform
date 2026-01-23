// =============================================================================
// REPORT MOCKUP - Automated Reports Animation
// Chart bars build up, "Report Generated" badge appears
// Uses Framer Motion only - loops automatically
// =============================================================================

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'

type Phase = 'idle' | 'building' | 'complete' | 'pause'

const chartData = [
  { label: 'Q1', value: 65, color: 'bg-blue-400' },
  { label: 'Q2', value: 85, color: 'bg-blue-500' },
  { label: 'Q3', value: 45, color: 'bg-blue-400' },
  { label: 'Q4', value: 90, color: 'bg-blue-500' },
]

export function ReportMockup() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [builtBars, setBuiltBars] = useState(0)

  // Phase machine
  useEffect(() => {
    const timer = setTimeout(() => {
      if (phase === 'idle') {
        setPhase('building')
        setBuiltBars(0)
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [phase])

  // Building bars
  useEffect(() => {
    if (phase !== 'building') return
    const interval = setInterval(() => {
      setBuiltBars(prev => {
        if (prev >= chartData.length) {
          clearInterval(interval)
          setTimeout(() => setPhase('complete'), 300)
          return prev
        }
        return prev + 1
      })
    }, 300)
    return () => clearInterval(interval)
  }, [phase])

  // Complete phase
  useEffect(() => {
    if (phase !== 'complete') return
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
      {/* Chart */}
      <div className="flex-1 flex items-end gap-2 px-2">
        {chartData.map((bar, i) => (
          <div key={bar.label} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full h-[50px] bg-white/5 rounded-t relative overflow-hidden">
              <motion.div
                className={`absolute bottom-0 left-0 right-0 ${bar.color} rounded-t`}
                initial={{ height: 0 }}
                animate={{ 
                  height: builtBars > i ? `${bar.value}%` : 0 
                }}
                transition={{ 
                  duration: 0.5, 
                  ease: 'easeOut',
                }}
              />
            </div>
            <span className="text-[8px] text-[var(--text-muted)]">{bar.label}</span>
          </div>
        ))}
      </div>

      {/* Report title */}
      <div className="flex items-center justify-between mt-2">
        <span className="text-[9px] text-[var(--text-muted)]">
          Quarterly Summary Report
        </span>
        
        {/* Generated badge */}
        <AnimatePresence>
          {(phase === 'complete' || phase === 'pause') && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', stiffness: 500 }}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400"
            >
              <Check className="w-2.5 h-2.5" />
              <span className="text-[9px]">Generated</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ReportMockup
