// =============================================================================
// UPLOAD MOCKUP - Multi-Format Upload Animation
// Files dropping → progress bar → "Uploaded ✓"
// Uses Framer Motion only - loops automatically
// =============================================================================

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, FileSpreadsheet, Presentation, Check } from 'lucide-react'

type Phase = 'idle' | 'dropping' | 'uploading' | 'complete'

const files = [
  { name: 'proposal.pdf', icon: FileText, color: 'text-red-400' },
  { name: 'data.xlsx', icon: FileSpreadsheet, color: 'text-green-400' },
  { name: 'pitch.pptx', icon: Presentation, color: 'text-orange-400' },
]

export function UploadMockup() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [progress, setProgress] = useState(0)
  const [visibleFiles, setVisibleFiles] = useState<number[]>([])

  // Phase machine
  useEffect(() => {
    const timer = setTimeout(() => {
      if (phase === 'idle') {
        setPhase('dropping')
        setVisibleFiles([])
        setProgress(0)
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [phase])

  // File dropping sequence
  useEffect(() => {
    if (phase !== 'dropping') return

    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex < files.length) {
        const indexToAdd = currentIndex // Capture current value
        setVisibleFiles(prev => [...prev, indexToAdd])
        currentIndex++
      } else {
        clearInterval(interval)
        setTimeout(() => setPhase('uploading'), 300)
      }
    }, 400)

    return () => clearInterval(interval)
  }, [phase])

  // Upload progress
  useEffect(() => {
    if (phase !== 'uploading') return
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setPhase('complete'), 200)
          return 100
        }
        return prev + 5
      })
    }, 50)
    
    return () => clearInterval(interval)
  }, [phase])

  // Complete → reset loop
  useEffect(() => {
    if (phase !== 'complete') return
    const timer = setTimeout(() => setPhase('idle'), 2000)
    return () => clearTimeout(timer)
  }, [phase])

  return (
    <div className="h-[100px] flex flex-col justify-center relative">
      {/* Files dropping */}
      <div className="flex gap-2 justify-center mb-3">
        <AnimatePresence>
          {visibleFiles.map((fileIndex) => {
            const file = files[fileIndex]
            const Icon = file.icon
            return (
              <motion.div
                key={file.name}
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="flex items-center gap-1 px-2 py-1 rounded bg-white/10 text-[10px]"
              >
                <Icon className={`w-3 h-3 ${file.color}`} />
                <span className="text-[var(--text-muted)]">{file.name}</span>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      {(phase === 'uploading' || phase === 'complete') && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-4"
        >
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-500 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[9px] text-[var(--text-muted)]">Uploading...</span>
            <span className="text-[9px] text-[var(--text-muted)]">{progress}%</span>
          </div>
        </motion.div>
      )}

      {/* Complete badge */}
      <AnimatePresence>
        {phase === 'complete' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500 }}
            className="flex justify-center mt-2"
          >
            <span className="flex items-center gap-1 px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 text-[10px]">
              <Check className="w-3 h-3" /> 3 files uploaded
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default UploadMockup
