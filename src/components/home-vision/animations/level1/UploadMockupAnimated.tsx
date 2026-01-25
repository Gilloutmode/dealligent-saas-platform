// UPLOAD MOCKUP ANIMATED V5 - Modern Data Core Design
// Layout: Documents at TOP, DataCore at BOTTOM (centered)
// Timeline: DROP (1.5s) -> SCAN (1.5s) -> INTEGRATE (2s)
// Design: Futuristic glassmorphic data hub with orbital rings

import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion'
import { memo, useEffect, useState, useRef, useCallback } from 'react'
import { FileText, FileSpreadsheet, File, Presentation } from 'lucide-react'

type Phase = 'idle' | 'drop' | 'scan' | 'integrate' | 'complete'

// Document card configurations
const DOCUMENTS = [
  {
    id: 'pdf',
    name: 'Report_Q4.pdf',
    ext: 'PDF',
    color: '#ef4444',
    bg: 'rgba(239,68,68,0.12)',
    border: 'rgba(239,68,68,0.25)',
    glow: 'rgba(239,68,68,0.4)',
    Icon: FileText
  },
  {
    id: 'docx',
    name: 'Strategy.docx',
    ext: 'DOCX',
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.12)',
    border: 'rgba(59,130,246,0.25)',
    glow: 'rgba(59,130,246,0.4)',
    Icon: File
  },
  {
    id: 'xlsx',
    name: 'Data_2024.xlsx',
    ext: 'XLSX',
    color: '#22c55e',
    bg: 'rgba(34,197,94,0.12)',
    border: 'rgba(34,197,94,0.25)',
    glow: 'rgba(34,197,94,0.4)',
    Icon: FileSpreadsheet
  },
  {
    id: 'pptx',
    name: 'Pitch_Deck.pptx',
    ext: 'PPTX',
    color: '#f97316',
    bg: 'rgba(249,115,22,0.12)',
    border: 'rgba(249,115,22,0.25)',
    glow: 'rgba(249,115,22,0.4)',
    Icon: Presentation
  },
] as const

const TIMING = { drop: 1500, scan: 1500, integrate: 2000 } as const
const PHASES: Phase[] = ['drop', 'scan', 'integrate', 'complete']

// Spring configs for natural physics
const springDrop = { type: 'spring' as const, stiffness: 300, damping: 20 }
const springBounce = { type: 'spring' as const, stiffness: 400, damping: 25 }

// Ambient floating particles
const AMBIENT_PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: `ambient-${i}`,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 1 + Math.random() * 2,
  duration: 3 + Math.random() * 4,
  delay: Math.random() * 2,
}))

// Data node positions (4 nodes around the perimeter at 45, 135, 225, 315 degrees)
const DATA_NODE_ANGLES = [315, 45, 225, 135] // Top-right, Top-left, Bottom-left, Bottom-right
const DATA_NODE_RADIUS = 52 // Distance from center

// Modern Data Core Component - Futuristic glassmorphic design
const DataCore = memo(function DataCore({
  isReceiving,
  isActive,
  activeNodes,
  vortexIntensity,
  hasCompleted
}: {
  isReceiving: boolean
  isActive: boolean
  activeNodes: number // 0-4: how many nodes are lit
  vortexIntensity: number // 0-1: vortex effect strength
  hasCompleted: boolean // Stop animations after completion
}) {
  // After completion, all infinite animations should stop
  const shouldAnimate = !hasCompleted
  return (
    <motion.div
      className="relative flex items-center justify-center"
      style={{ width: 120, height: 120 }}
      initial={{ opacity: 0.4, scale: 0.95 }}
      animate={{
        opacity: isActive ? 1 : 0.6,
        scale: isActive ? 1 : 0.95,
      }}
      transition={{ duration: 0.5 }}
    >
      {/* Outermost ambient glow */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 140,
          height: 140,
          background: 'radial-gradient(circle, rgba(34,211,238,0.2) 0%, rgba(168,85,247,0.1) 40%, transparent 70%)',
        }}
        animate={isActive && shouldAnimate ? {
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        } : {
          scale: 1,
          opacity: isActive ? 0.8 : 0.3,
        }}
        transition={{ duration: 2, repeat: shouldAnimate ? 3 : 0, ease: 'easeInOut' }}
      />

      {/* Outer orbital ring - rotates slowly */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 110,
          height: 110,
          border: '1px solid rgba(34,211,238,0.3)',
          boxShadow: isActive
            ? '0 0 15px rgba(34,211,238,0.3), inset 0 0 15px rgba(34,211,238,0.1)'
            : '0 0 5px rgba(34,211,238,0.1)',
        }}
        animate={shouldAnimate ? {
          rotate: 360,
          borderColor: isActive
            ? ['rgba(34,211,238,0.3)', 'rgba(168,85,247,0.4)', 'rgba(34,211,238,0.3)']
            : 'rgba(34,211,238,0.2)',
        } : {
          rotate: 0,
          borderColor: 'rgba(34,211,238,0.3)',
        }}
        transition={shouldAnimate ? {
          rotate: { duration: 20, repeat: 1, ease: 'linear' },
          borderColor: { duration: 3, repeat: 3, ease: 'easeInOut' },
        } : { duration: 0.3 }}
      >
        {/* Orbital accent dots */}
        {[0, 90, 180, 270].map((angle) => (
          <motion.div
            key={angle}
            className="absolute w-1 h-1 rounded-full bg-cyan-400"
            style={{
              left: '50%',
              top: '50%',
              transform: `rotate(${angle}deg) translateY(-55px) translateX(-50%)`,
              boxShadow: '0 0 6px rgba(34,211,238,0.8)',
            }}
            animate={shouldAnimate ? {
              opacity: isActive ? [0.4, 1, 0.4] : 0.3,
              scale: isActive ? [1, 1.3, 1] : 1,
            } : {
              opacity: isActive ? 1 : 0.3,
              scale: 1,
            }}
            transition={{ duration: 1.5, delay: angle / 360, repeat: shouldAnimate ? 3 : 0 }}
          />
        ))}
      </motion.div>

      {/* Second orbital ring - counter-rotation */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 90,
          height: 90,
          border: '1px dashed rgba(168,85,247,0.25)',
        }}
        animate={shouldAnimate ? {
          rotate: -360,
          opacity: isActive ? [0.3, 0.6, 0.3] : 0.2,
        } : {
          rotate: 0,
          opacity: isActive ? 0.5 : 0.2,
        }}
        transition={shouldAnimate ? {
          rotate: { duration: 15, repeat: 1, ease: 'linear' },
          opacity: { duration: 2, repeat: 3 },
        } : { duration: 0.3 }}
      />

      {/* Data nodes - 4 around the perimeter */}
      {DATA_NODE_ANGLES.map((angle, i) => {
        const isLit = i < activeNodes
        const rad = (angle * Math.PI) / 180
        const x = Math.cos(rad) * DATA_NODE_RADIUS
        const y = Math.sin(rad) * DATA_NODE_RADIUS
        const nodeColor = DOCUMENTS[i]?.color || '#22d3ee'

        return (
          <motion.div
            key={`node-${i}`}
            className="absolute rounded-full"
            style={{
              width: 14,
              height: 14,
              left: '50%',
              top: '50%',
              marginLeft: -7,
              marginTop: -7,
              x,
              y,
            }}
          >
            {/* Node outer ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                border: `2px solid ${isLit ? nodeColor : 'rgba(255,255,255,0.2)'}`,
                boxShadow: isLit ? `0 0 10px ${nodeColor}, 0 0 20px ${nodeColor}50` : 'none',
              }}
              animate={isLit && shouldAnimate ? {
                scale: [1, 1.2, 1],
                boxShadow: [
                  `0 0 10px ${nodeColor}, 0 0 20px ${nodeColor}50`,
                  `0 0 20px ${nodeColor}, 0 0 35px ${nodeColor}80`,
                  `0 0 10px ${nodeColor}, 0 0 20px ${nodeColor}50`,
                ],
              } : {
                scale: 1,
                boxShadow: isLit ? `0 0 15px ${nodeColor}, 0 0 25px ${nodeColor}60` : 'none',
              }}
              transition={{ duration: 1.5, repeat: shouldAnimate ? 3 : 0 }}
            />

            {/* Node inner fill */}
            <motion.div
              className="absolute inset-1 rounded-full"
              style={{
                background: isLit
                  ? `radial-gradient(circle, ${nodeColor} 0%, ${nodeColor}80 100%)`
                  : 'rgba(255,255,255,0.1)',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: isLit ? 1 : 0.5,
                opacity: isLit ? 1 : 0.3,
              }}
              transition={{ type: 'spring', stiffness: 500, damping: 20 }}
            />

            {/* Entry pulse when node activates */}
            <AnimatePresence>
              {isLit && (
                <motion.div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{ background: nodeColor }}
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ scale: 3, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}

      {/* Middle glass layer - hexagonal feel */}
      <motion.div
        className="absolute rounded-full overflow-hidden"
        style={{
          width: 70,
          height: 70,
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.15)',
          boxShadow: isActive
            ? '0 0 30px rgba(34,211,238,0.3), inset 0 0 20px rgba(34,211,238,0.1)'
            : '0 0 15px rgba(34,211,238,0.1)',
        }}
        animate={shouldAnimate ? {
          borderColor: isActive
            ? ['rgba(255,255,255,0.15)', 'rgba(34,211,238,0.4)', 'rgba(255,255,255,0.15)']
            : 'rgba(255,255,255,0.1)',
        } : {
          borderColor: isActive ? 'rgba(34,211,238,0.3)' : 'rgba(255,255,255,0.1)',
        }}
        transition={{ duration: 2, repeat: shouldAnimate ? 3 : 0 }}
      >
        {/* Glass shine effect */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)',
          }}
        />

        {/* Hexagon pattern overlay */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 0l8.66 5v10L10 20l-8.66-5V5z' fill='none' stroke='%2322d3ee' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '12px 12px',
          }}
          animate={shouldAnimate ? {
            opacity: isActive ? [0.1, 0.3, 0.1] : 0.1,
          } : {
            opacity: isActive ? 0.25 : 0.1,
          }}
          transition={{ duration: 2, repeat: shouldAnimate ? 3 : 0 }}
        />
      </motion.div>

      {/* Inner core - glowing center */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 36,
          height: 36,
          background: isActive
            ? 'radial-gradient(circle, rgba(34,211,238,0.9) 0%, rgba(59,130,246,0.6) 50%, rgba(168,85,247,0.4) 100%)'
            : 'radial-gradient(circle, rgba(34,211,238,0.4) 0%, rgba(59,130,246,0.2) 100%)',
          boxShadow: isActive
            ? '0 0 25px rgba(34,211,238,0.8), 0 0 50px rgba(59,130,246,0.4)'
            : '0 0 10px rgba(34,211,238,0.3)',
        }}
        animate={shouldAnimate ? {
          scale: isActive ? [1, 1.1, 1] : [1, 1.02, 1],
          boxShadow: isReceiving ? [
            '0 0 25px rgba(34,211,238,0.8), 0 0 50px rgba(59,130,246,0.4)',
            '0 0 40px rgba(34,211,238,1), 0 0 80px rgba(168,85,247,0.6)',
            '0 0 25px rgba(34,211,238,0.8), 0 0 50px rgba(59,130,246,0.4)',
          ] : undefined,
        } : {
          scale: 1,
          boxShadow: isActive
            ? '0 0 30px rgba(34,211,238,0.9), 0 0 55px rgba(59,130,246,0.5)'
            : '0 0 10px rgba(34,211,238,0.3)',
        }}
        transition={{ duration: 1.5, repeat: shouldAnimate ? 3 : 0, ease: 'easeInOut' }}
      >
        {/* Core inner highlight */}
        <div
          className="absolute inset-2 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 60%)',
          }}
        />
      </motion.div>

      {/* Vortex effect - entry portal when receiving */}
      <AnimatePresence>
        {isReceiving && vortexIntensity > 0 && (
          <>
            {/* Vortex spiral rings */}
            {[0, 1, 2].map((ring) => (
              <motion.div
                key={`vortex-${ring}`}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: 80 - ring * 15,
                  height: 80 - ring * 15,
                  border: `1px solid rgba(34,211,238,${0.6 - ring * 0.15})`,
                }}
                initial={{ scale: 2, opacity: 0, rotate: 0 }}
                animate={{
                  scale: [2, 0.8, 0.3],
                  opacity: [0, 0.8, 0],
                  rotate: [0, 180, 360],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.8,
                  delay: ring * 0.1,
                  repeat: Infinity,
                  ease: 'easeIn',
                }}
              />
            ))}

            {/* Central vortex glow */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 50,
                height: 50,
                background: 'radial-gradient(circle, rgba(168,85,247,0.6) 0%, rgba(34,211,238,0.3) 50%, transparent 70%)',
              }}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{
                scale: [0.5, 1.5, 0.5],
                opacity: [0, 0.8, 0],
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Particle emissions when active */}
      <AnimatePresence>
        {isActive && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 rounded-full bg-cyan-400 pointer-events-none"
                style={{
                  left: '50%',
                  top: '50%',
                  marginLeft: -2,
                  marginTop: -2,
                  boxShadow: '0 0 4px rgba(34,211,238,0.8)',
                }}
                initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  x: Math.cos((i * 60 * Math.PI) / 180) * 50,
                  y: Math.sin((i * 60 * Math.PI) / 180) * 50,
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Idle breathing pulse - only when not completed */}
      {!isReceiving && !isActive && shouldAnimate && (
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 100,
            height: 100,
            border: '1px solid rgba(34,211,238,0.2)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{ duration: 3, repeat: 2 }}
        />
      )}
    </motion.div>
  )
})

export const UploadMockupAnimated = memo(function UploadMockupAnimated() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const reducedMotion = useReducedMotion()
  const [phase, setPhase] = useState<Phase>('idle')
  const [hasPlayed, setHasPlayed] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [indexedCount, setIndexedCount] = useState(0)
  const [flyingDocIndex, setFlyingDocIndex] = useState(-1)

  const reset = useCallback(() => {
    setScanProgress(0)
    setIndexedCount(0)
    setFlyingDocIndex(-1)
    setPhase('idle')
    setHasPlayed(false)
  }, [])

  // Phase progression
  useEffect(() => {
    if (!isInView || hasPlayed) return
    if (phase === 'idle') {
      const t = setTimeout(() => setPhase('drop'), 300)
      return () => clearTimeout(t)
    }
    const idx = PHASES.indexOf(phase)
    if (idx === -1 || phase === 'complete') {
      if (phase === 'complete') setHasPlayed(true)
      return
    }
    const duration = TIMING[phase as keyof typeof TIMING] || 1000
    const t = setTimeout(() => setPhase(PHASES[idx + 1]), duration)
    return () => clearTimeout(t)
  }, [phase, isInView, hasPlayed])

  // Scan beam animation
  useEffect(() => {
    if (phase !== 'scan') return
    let frame: number
    const start = performance.now()
    const animate = (now: number) => {
      const progress = Math.min((now - start) / TIMING.scan, 1)
      setScanProgress(progress * 100)
      if (progress < 1) frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [phase])

  // Integration phase - documents fly into data core one by one
  useEffect(() => {
    if (phase !== 'integrate') return

    const delays = [100, 500, 900, 1300]
    const timers: NodeJS.Timeout[] = []

    delays.forEach((delay, i) => {
      // Start flying animation
      const flyTimer = setTimeout(() => {
        setFlyingDocIndex(i)
      }, delay)
      timers.push(flyTimer)

      // Document enters data core
      const enterTimer = setTimeout(() => {
        setIndexedCount(i + 1)
      }, delay + 400)
      timers.push(enterTimer)
    })

    return () => timers.forEach(clearTimeout)
  }, [phase])

  // Reduced motion fallback
  if (reducedMotion) {
    return (
      <div ref={ref} className="w-full aspect-[16/10] rounded-xl bg-[var(--mockup-bg)] border border-[var(--mockup-border)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 mb-3" />
          <span className="text-sm text-emerald-400 font-medium">4 Documents Indexed</span>
        </div>
      </div>
    )
  }

  const showDocs = ['drop', 'scan'].includes(phase)
  const showScan = phase === 'scan'
  const showIntegrate = phase === 'integrate'
  const isComplete = phase === 'complete'
  const dataCoreActive = showScan || showIntegrate || isComplete

  // Document positions - horizontal row at top
  const docPositions = [
    { x: '10%', y: '12%' },
    { x: '30%', y: '12%' },
    { x: '50%', y: '12%' },
    { x: '70%', y: '12%' },
  ]

  return (
    <div
      ref={ref}
      onMouseEnter={() => hasPlayed && reset()}
      className="w-full aspect-[16/10] rounded-xl bg-[var(--mockup-bg)] border border-[var(--mockup-border)] relative overflow-hidden cursor-pointer"
    >
      {/* Ambient animated gradient background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: dataCoreActive && !hasPlayed
            ? [
                'radial-gradient(ellipse at 50% 65%, rgba(34,211,238,0.15) 0%, rgba(168,85,247,0.08) 40%, transparent 60%)',
                'radial-gradient(ellipse at 50% 65%, rgba(34,211,238,0.25) 0%, rgba(168,85,247,0.15) 50%, transparent 70%)',
                'radial-gradient(ellipse at 50% 65%, rgba(34,211,238,0.15) 0%, rgba(168,85,247,0.08) 40%, transparent 60%)',
              ]
            : dataCoreActive
              ? 'radial-gradient(ellipse at 50% 65%, rgba(34,211,238,0.2) 0%, rgba(168,85,247,0.1) 45%, transparent 65%)'
              : 'radial-gradient(ellipse at 50% 30%, rgba(59,130,246,0.05) 0%, transparent 60%)',
        }}
        transition={{ duration: 2, repeat: hasPlayed ? 0 : 3, ease: 'easeInOut' }}
      />

      {/* Floating ambient particles - stop after animation completes */}
      {!hasPlayed && AMBIENT_PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/10 pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: 3,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* DATA CORE - Centered at bottom */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          left: '50%',
          top: '65%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <DataCore
            isReceiving={showIntegrate && flyingDocIndex >= 0 && flyingDocIndex < 4}
            isActive={dataCoreActive}
            activeNodes={indexedCount}
            vortexIntensity={showIntegrate ? 1 : 0}
            hasCompleted={hasPlayed}
          />
        </motion.div>

        {/* Entry flash effects */}
        <AnimatePresence>
          {showIntegrate && DOCUMENTS.slice(0, indexedCount).map((doc, i) => (
            <motion.div
              key={`flash-${doc.id}`}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 2] }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <div
                className="w-20 h-20 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${doc.color}50 0%, transparent 70%)`,
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Counter badge */}
        <AnimatePresence mode="wait">
          {showIntegrate && indexedCount > 0 && indexedCount < 4 && (
            <motion.div
              key={indexedCount}
              className="absolute -top-16"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -5 }}
              transition={{ duration: 0.2, ...springBounce }}
            >
              <div className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 backdrop-blur-sm">
                <span className="text-sm font-bold text-cyan-400">+{indexedCount}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Final success badge */}
        <motion.div
          className="absolute -bottom-16 whitespace-nowrap"
          initial={{ opacity: 0, y: -10, scale: 0.9 }}
          animate={{
            opacity: isComplete || indexedCount === 4 ? 1 : 0,
            y: 0,
            scale: 1
          }}
          transition={{ delay: 0.3, ...springBounce }}
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-500/30 backdrop-blur-sm">
            <motion.div
              className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center"
              animate={hasPlayed ? { scale: 1 } : { scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: hasPlayed ? 0 : 2 }}
            >
              <motion.span
                className="text-emerald-400 text-xs font-bold"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                ok
              </motion.span>
            </motion.div>
            <span className="text-xs text-emerald-400 font-semibold tracking-wide">
              4 documents indexed
            </span>
          </div>
        </motion.div>
      </div>

      {/* PHASE 1: DROP - Documents at top */}
      <AnimatePresence>
        {showDocs && DOCUMENTS.map((doc, i) => {
          const pos = docPositions[i]
          const isScanned = showScan && scanProgress > (i + 1) * 20

          return (
            <motion.div
              key={doc.id}
              className="absolute"
              style={{
                left: pos.x,
                top: pos.y,
                transformOrigin: 'center center',
              }}
              initial={{ opacity: 0, y: -100, scale: 0.6 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{
                ...springDrop,
                delay: i * 0.1,
                opacity: { duration: 0.3 },
              }}
            >
              {/* Document card */}
              <motion.div
                className="w-16 h-20 rounded-lg flex flex-col items-center justify-center relative backdrop-blur-sm"
                style={{
                  backgroundColor: doc.bg,
                  border: `1.5px solid ${doc.border}`,
                }}
                animate={isScanned ? {
                  boxShadow: [
                    `0 0 0px ${doc.glow}`,
                    `0 0 25px ${doc.glow}, 0 0 50px ${doc.glow}`,
                    `0 0 15px ${doc.glow}`,
                  ],
                  borderColor: [doc.border, doc.color, doc.border],
                } : {
                  boxShadow: `0 4px 15px rgba(0,0,0,0.2)`,
                }}
                transition={{ duration: 0.5 }}
              >
                {/* Glass shine */}
                <div
                  className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
                  }}
                />

                {/* File icon */}
                <doc.Icon
                  className="w-6 h-6 mb-1"
                  style={{ color: doc.color }}
                  strokeWidth={1.5}
                />

                {/* Extension badge */}
                <span
                  className="text-[9px] font-bold tracking-wide"
                  style={{ color: doc.color }}
                >
                  {doc.ext}
                </span>

                {/* Scanned pulse */}
                {isScanned && (
                  <motion.div
                    className="absolute inset-0 rounded-lg pointer-events-none"
                    style={{ border: `2px solid ${doc.color}` }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.4 }}
                  />
                )}
              </motion.div>
            </motion.div>
          )
        })}
      </AnimatePresence>

      {/* PHASE 2: SCAN - Beam sweeps across documents */}
      <AnimatePresence>
        {showScan && (
          <>
            {/* Scan beam */}
            <motion.div
              className="absolute left-0 right-0 pointer-events-none"
              style={{
                top: `${8 + scanProgress * 0.35}%`,
                height: '35px',
              }}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Beam gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(180deg, transparent 0%, rgba(34,211,238,0.25) 30%, rgba(34,211,238,0.4) 50%, rgba(34,211,238,0.25) 70%, transparent 100%)',
                }}
              />

              {/* Center bright line */}
              <div
                className="absolute left-0 right-0 h-0.5"
                style={{
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.7) 20%, rgba(255,255,255,0.8) 50%, rgba(34,211,238,0.7) 80%, transparent 100%)',
                  boxShadow: '0 0 15px rgba(34,211,238,0.7)',
                }}
              />

              {/* Binary particles */}
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute text-[7px] font-mono text-cyan-400/50"
                  style={{
                    left: `${15 + i * 14}%`,
                    top: '50%',
                  }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: [0, 0.7, 0], y: -15 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.04,
                    repeat: Infinity,
                    repeatDelay: 0.2,
                  }}
                >
                  {Math.random() > 0.5 ? '1' : '0'}
                </motion.span>
              ))}
            </motion.div>

            {/* Scan progress indicator */}
            <motion.div
              className="absolute bottom-3 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                />
                <span className="text-[10px] text-cyan-400 font-medium">
                  Analyzing... {Math.round(scanProgress)}%
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* PHASE 3: INTEGRATE - Documents fly into data core */}
      <AnimatePresence>
        {showIntegrate && DOCUMENTS.map((doc, i) => {
          const pos = docPositions[i]
          const isFlying = flyingDocIndex >= i
          const hasEntered = indexedCount > i

          if (hasEntered) return null

          return (
            <motion.div
              key={`flying-${doc.id}`}
              className="absolute pointer-events-none"
              style={{
                left: pos.x,
                top: pos.y,
                transformOrigin: 'center center',
              }}
              initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              animate={isFlying ? {
                x: `calc(${50 - parseFloat(pos.x)}vw * 0.16)`,
                y: `calc(${65 - parseFloat(pos.y)}% * 2.5)`,
                scale: [1, 0.7, 0.4, 0.15],
                opacity: [1, 1, 0.8, 0],
                rotate: [0, 5, 10, 15],
              } : {}}
              transition={{
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              {/* Document card */}
              <motion.div
                className="w-16 h-20 rounded-lg flex flex-col items-center justify-center relative backdrop-blur-sm"
                style={{
                  backgroundColor: doc.bg,
                  border: `1.5px solid ${doc.color}`,
                  boxShadow: `0 0 20px ${doc.glow}, 0 0 40px ${doc.glow}`,
                }}
              >
                <doc.Icon
                  className="w-6 h-6 mb-1"
                  style={{ color: doc.color }}
                  strokeWidth={1.5}
                />
                <span
                  className="text-[9px] font-bold tracking-wide"
                  style={{ color: doc.color }}
                >
                  {doc.ext}
                </span>
              </motion.div>

              {/* Trail particles */}
              {isFlying && Array.from({ length: 4 }).map((_, pi) => (
                <motion.div
                  key={pi}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: 3 + Math.random() * 3,
                    height: 3 + Math.random() * 3,
                    backgroundColor: doc.color,
                    boxShadow: `0 0 6px ${doc.color}`,
                    left: '50%',
                    top: '50%',
                  }}
                  initial={{ opacity: 0, x: 0, y: 0 }}
                  animate={{
                    opacity: [0, 0.8, 0],
                    x: -10 - pi * 8,
                    y: (Math.random() - 0.5) * 30,
                    scale: [0, 1, 0.3],
                  }}
                  transition={{
                    duration: 0.4,
                    delay: pi * 0.03,
                    ease: 'easeOut',
                  }}
                />
              ))}
            </motion.div>
          )
        })}
      </AnimatePresence>

      {/* Arrow flow indicators (between docs and data core) */}
      <AnimatePresence>
        {showIntegrate && (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 flex gap-4 pointer-events-none"
            style={{ top: '40%' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="text-cyan-400/40"
                animate={{
                  y: [0, 8, 0],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.1,
                  repeat: Infinity,
                }}
              >
                <svg width="12" height="16" viewBox="0 0 12 16" fill="currentColor">
                  <path d="M6 0L6 12M6 12L1 7M6 12L11 7" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover hint (after complete) */}
      {hasPlayed && (
        <motion.div
          className="absolute bottom-2 right-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1 }}
        >
          <span className="text-[9px] text-white/40">Hover to replay</span>
        </motion.div>
      )}
    </div>
  )
})

export default UploadMockupAnimated
