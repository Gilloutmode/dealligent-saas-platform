// =============================================================================
// APPLICATION CARD - Reusable card for feature showcases
// Enhanced with Limova-style animated gradient border
// =============================================================================

"use client"

import { motion } from 'framer-motion'
import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/utils'

// =============================================================================
// TYPES
// =============================================================================

interface ApplicationCardProps {
  title: string
  description: string
  icon: ElementType
  features?: string[]
  className?: string
  visual?: ReactNode
}

// =============================================================================
// ANIMATION VARIANTS
// =============================================================================

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' as const },
  },
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function ApplicationCard({
  title,
  description,
  icon: Icon,
  features,
  className,
  visual,
}: ApplicationCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      className={cn("h-full relative", className)}
    >
      {/* Animated Border Container */}
      <div className="absolute -inset-[1px] rounded-[22px] overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 opacity-40"
          style={{
            backgroundSize: '200% 200%',
            animation: 'gradient-flow 4s linear infinite',
          }}
        />
      </div>

      {/* Card Content */}
      <div
        className="relative h-full p-8 rounded-[21px] backdrop-blur-xl flex flex-col"
        style={{
          background: 'rgba(10, 12, 20, 0.85)',
        }}
      >
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 shrink-0">
          <Icon className="w-6 h-6 text-blue-400" />
        </div>

        {/* Content Container */}
        <div className="flex-1">
          {/* Title */}
          <h4 className="text-2xl font-bold text-white mb-4">
            {title}
          </h4>

          {/* Description */}
          <div className="text-lg text-white/70 leading-relaxed mb-6 whitespace-pre-line">
            {description}
          </div>

          {/* Features List */}
          {features && features.length > 0 && (
            <ul className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-base text-white/60"
                >
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Visual Slot */}
        {visual && (
          <div className="mt-auto pt-6 border-t border-white/10">
            {visual}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default ApplicationCard
