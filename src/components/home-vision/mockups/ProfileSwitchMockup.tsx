// =============================================================================
// PROFILE SWITCH MOCKUP - Profile-Based Context Animation
// Tabs auto-switch, content changes with AnimatePresence
// Uses Framer Motion only - loops automatically
// =============================================================================

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const profiles = [
  { 
    name: 'SALES', 
    color: 'text-green-400', 
    bg: 'bg-green-500/20',
    content: '→ Pricing: $120K • Objections handled'
  },
  { 
    name: 'SUPPORT', 
    color: 'text-blue-400', 
    bg: 'bg-blue-500/20',
    content: '→ Similar tickets: 5 • Resolution: 2h avg'
  },
  { 
    name: 'PRODUCT', 
    color: 'text-purple-400', 
    bg: 'bg-purple-500/20',
    content: '→ Feature requests: 12 • Roadmap Q2'
  },
  { 
    name: 'DEV', 
    color: 'text-orange-400', 
    bg: 'bg-orange-500/20',
    content: '→ API docs • Integration: REST v2.1'
  },
]

export function ProfileSwitchMockup() {
  const [activeIndex, setActiveIndex] = useState(0)

  // Auto-cycle through profiles
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % profiles.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-[100px] flex flex-col">
      {/* Profile tabs */}
      <div className="flex gap-1 mb-3">
        {profiles.map((profile, i) => (
          <motion.button
            key={profile.name}
            animate={{
              backgroundColor: i === activeIndex ? 'rgba(255,255,255,0.1)' : 'transparent',
              scale: i === activeIndex ? 1.05 : 1,
            }}
            transition={{ duration: 0.2 }}
            className={`px-2 py-1 rounded text-[9px] font-medium border border-transparent ${
              i === activeIndex ? `${profile.color} border-white/20` : 'text-[var(--text-muted)]'
            }`}
          >
            {profile.name}
          </motion.button>
        ))}
      </div>

      {/* Content area with transitions */}
      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`p-3 rounded-lg ${profiles[activeIndex].bg}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-[10px] font-bold ${profiles[activeIndex].color}`}>
                @{profiles[activeIndex].name}
              </span>
              <span className="text-[8px] text-[var(--text-muted)]">context active</span>
            </div>
            <p className="text-[10px] text-[var(--text-secondary)]">
              {profiles[activeIndex].content}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ProfileSwitchMockup
