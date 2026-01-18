// =============================================================================
// DEALLIGENT PLATFORM - APP LAUNCHER CARD
// Premium glassmorphism card for intelligence module navigation
// =============================================================================

"use client"

import { useRef, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, Sparkles, Lock } from 'lucide-react'

// =============================================================================
// TYPES
// =============================================================================

export type AppStatus = 'active' | 'coming-soon' | 'beta'

export interface AppLauncherCardProps {
  title: string
  description: string
  icon: ReactNode
  gradientFrom: string
  gradientTo: string
  glowColor: string
  status: AppStatus
  route: string
  stats?: {
    label: string
    value: number | string
  }
  delay?: number
}

// =============================================================================
// STATUS BADGE COMPONENT
// =============================================================================

function StatusBadge({ status }: { status: AppStatus }) {
  const config = {
    active: {
      label: 'Actif',
      className: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30',
    },
    'coming-soon': {
      label: 'Bientôt',
      className: 'bg-amber-500/15 text-amber-500 border-amber-500/30',
    },
    beta: {
      label: 'Beta',
      className: 'bg-blue-500/15 text-blue-500 border-blue-500/30',
    },
  }

  const { label, className } = config[status]

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${className}`}>
      {label}
    </span>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function AppLauncherCard({
  title,
  description,
  icon,
  gradientFrom,
  gradientTo,
  glowColor,
  status,
  route,
  stats,
  delay = 0,
}: AppLauncherCardProps) {
  const navigate = useNavigate()
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })

  const isActive = status === 'active'
  const isBeta = status === 'beta'
  const isClickable = isActive || isBeta

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isClickable) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    const rotateX = -(y / rect.height) * 6
    const rotateY = (x / rect.width) * 6

    setRotation({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotation({ x: 0, y: 0 })
  }

  const handleClick = () => {
    if (isClickable) {
      navigate(route)
    }
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className="relative w-full"
    >
      <motion.div
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        animate={{
          y: isHovered && isClickable ? -8 : 0,
          rotateX: rotation.x,
          rotateY: rotation.y,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 25,
        }}
        className={`
          relative rounded-2xl overflow-hidden
          ${isClickable ? 'cursor-pointer' : 'cursor-default'}
          ${!isClickable ? 'opacity-70' : ''}
        `}
      >
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            opacity: isHovered && isClickable ? 1 : 0,
            boxShadow: isHovered && isClickable
              ? `0 0 40px 8px ${glowColor}, 0 0 80px 16px ${glowColor}`
              : 'none',
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Main card container */}
        <div className="relative bg-[var(--bg-card)] backdrop-blur-xl border border-[var(--border-default)] rounded-2xl p-6 shadow-xl">
          {/* Gradient overlay */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-2xl`}
            animate={{ opacity: isHovered && isClickable ? 0.15 : 0.08 }}
            transition={{ duration: 0.3 }}
          />

          {/* Glassmorphism shine */}
          <div
            className="absolute top-0 left-0 right-0 h-1/3 pointer-events-none rounded-t-2xl"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 100%)',
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full min-h-[200px]">
            {/* Header: Icon + Status */}
            <div className="flex items-start justify-between mb-4">
              {/* Icon container */}
              <motion.div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradientFrom} ${gradientTo} flex items-center justify-center shadow-lg`}
                style={{
                  boxShadow: `0 8px 20px ${glowColor}`,
                }}
                animate={{
                  scale: isHovered && isClickable ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-white">{icon}</div>
              </motion.div>

              <StatusBadge status={status} />
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
              {title}
            </h3>

            {/* Description */}
            <p className="text-sm text-[var(--text-muted)] mb-4 line-clamp-2 flex-1">
              {description}
            </p>

            {/* Stats badge (if provided) */}
            {stats && isClickable && (
              <div className="mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-light)] text-xs font-medium text-[var(--text-secondary)]">
                  <span className="font-bold text-[var(--text-primary)]">{stats.value}</span>
                  <span>{stats.label}</span>
                </span>
              </div>
            )}

            {/* CTA */}
            <div className="pt-2">
              {isClickable ? (
                <motion.div
                  className={`flex items-center gap-2 text-sm font-medium ${
                    isActive ? 'text-blue-600' : 'text-amber-500'
                  }`}
                  animate={{ x: isHovered ? 4 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <span>{isActive ? 'Accéder au module' : 'Accès Beta'}</span>
                  <ChevronRight className="w-4 h-4" />
                </motion.div>
              ) : (
                <div className="flex items-center gap-2 text-sm font-medium text-[var(--text-muted)]">
                  <Lock className="w-4 h-4" />
                  <span>En développement</span>
                  <Sparkles className="w-3.5 h-3.5 ml-1" />
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default AppLauncherCard
