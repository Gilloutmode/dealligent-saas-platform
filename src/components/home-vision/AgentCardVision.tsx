// AGENT CARD VISION - Card for AI agents in Level 2
// ANIMATED with working state, spinner, progress bar
// Uses Framer Motion ONLY

import { motion, AnimatePresence } from 'framer-motion'
import { Loader2 } from 'lucide-react'

interface WorkingState {
  isWorking: boolean
  progress: number
  message: string
}

interface AgentCardVisionProps {
  name: string
  role: string
  tagline: string
  capabilities: string[]
  invokeCommand: string
  accentColor: string
  workingState?: WorkingState
}

const colorMap: Record<string, string> = {
  blue: 'border-t-blue-500',
  purple: 'border-t-purple-500',
  green: 'border-t-green-500',
  pink: 'border-t-pink-500',
  cyan: 'border-t-cyan-500',
  orange: 'border-t-orange-500',
}

const bgMap: Record<string, string> = {
  blue: 'bg-blue-500/20 text-blue-400',
  purple: 'bg-purple-500/20 text-purple-400',
  green: 'bg-green-500/20 text-green-400',
  pink: 'bg-pink-500/20 text-pink-400',
  cyan: 'bg-cyan-500/20 text-cyan-400',
  orange: 'bg-orange-500/20 text-orange-400',
}

const progressColorMap: Record<string, string> = {
  blue: 'bg-blue-400',
  purple: 'bg-purple-400',
  green: 'bg-green-400',
  pink: 'bg-pink-400',
  cyan: 'bg-cyan-400',
  orange: 'bg-orange-400',
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export function AgentCardVision({ 
  name, 
  role, 
  tagline, 
  capabilities, 
  invokeCommand, 
  accentColor,
  workingState 
}: AgentCardVisionProps) {
  const isWorking = workingState?.isWorking ?? false
  const progress = workingState?.progress ?? 0
  const message = workingState?.message ?? ''

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={`card-glass p-5 rounded-xl border-t-2 relative overflow-hidden ${colorMap[accentColor] || 'border-t-blue-500'}`}
    >
      {/* Glow effect when working */}
      <AnimatePresence>
        {isWorking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at center, ${accentColor === 'blue' ? 'rgba(59, 130, 246, 0.1)' : 
                accentColor === 'purple' ? 'rgba(168, 85, 247, 0.1)' :
                accentColor === 'green' ? 'rgba(34, 197, 94, 0.1)' :
                accentColor === 'pink' ? 'rgba(236, 72, 153, 0.1)' :
                accentColor === 'cyan' ? 'rgba(34, 211, 238, 0.1)' :
                accentColor === 'orange' ? 'rgba(251, 146, 60, 0.1)' :
                'rgba(59, 130, 246, 0.1)'} 0%, transparent 70%)`
            }}
          />
        )}
      </AnimatePresence>

      {/* Avatar + Name */}
      <div className="flex items-center gap-3 mb-3">
        <div className={`relative w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${bgMap[accentColor] || 'bg-blue-500/20 text-blue-400'}`}>
          {/* Spinning border when working */}
          {isWorking && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                border: '2px solid transparent',
                borderTopColor: accentColor === 'blue' ? '#3b82f6' : 
                  accentColor === 'purple' ? '#a855f7' :
                  accentColor === 'green' ? '#22c55e' :
                  accentColor === 'pink' ? '#ec4899' :
                  accentColor === 'cyan' ? '#22d3ee' :
                  accentColor === 'orange' ? '#fb923c' : '#3b82f6',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          )}
          {name[0]}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-[var(--text-primary)]">{name}</p>
            {isWorking && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-emerald-500/20 text-emerald-400 uppercase tracking-wider"
              >
                Working
              </motion.span>
            )}
          </div>
          <p className="text-xs text-[var(--text-muted)]">{role}</p>
        </div>
      </div>

      {/* Tagline */}
      <p className="text-sm text-[var(--text-secondary)] mb-3">{tagline}</p>

      {/* Working State Panel */}
      <AnimatePresence>
        {isWorking && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="mb-4 overflow-hidden"
          >
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              {/* Spinner + Message */}
              <div className="flex items-center gap-2 mb-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 className={`w-4 h-4 ${bgMap[accentColor]?.split(' ')[1] || 'text-blue-400'}`} />
                </motion.div>
                <span className="text-xs text-[var(--text-secondary)]">{message}</span>
              </div>
              
              {/* Progress Bar */}
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${progressColorMap[accentColor] || 'bg-blue-400'}`}
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[10px] text-[var(--text-muted)]">Progress</span>
                <span className="text-[10px] text-[var(--text-muted)]">{progress}%</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Capabilities */}
      <ul className="space-y-1 mb-4">
        {capabilities.slice(0, 5).map((cap, i) => (
          <li key={i} className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <span className={`w-1 h-1 rounded-full ${bgMap[accentColor]?.split(' ')[0] || 'bg-blue-500/20'}`} />
            {cap}
          </li>
        ))}
      </ul>

      {/* Invoke Command */}
      <div className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-[var(--text-muted)] inline-block">
        {invokeCommand}
      </div>
    </motion.div>
  )
}

export default AgentCardVision
