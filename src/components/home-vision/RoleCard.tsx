// ROLE CARD - For Section 4 (Use Cases by Role)
// Style: card-glass with hover effect

import { motion } from 'framer-motion'
import type { ElementType } from 'react'

interface RoleCardProps {
  icon: ElementType
  title: string
  tagline: string
  bullets: string[]
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

export function RoleCard({ icon: Icon, title, tagline, bullets }: RoleCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="card-glass p-8 rounded-2xl cursor-default h-full"
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-[var(--c-brand)]/10 flex items-center justify-center mb-6">
        <Icon className="w-6 h-6 text-[var(--c-brand)]" />
      </div>

      {/* Header */}
      <h4 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
        {title}
      </h4>
      <p className="text-lg font-bold text-[var(--c-brand)] mb-6 italic">
        {tagline}
      </p>

      {/* Bullets */}
      <ul className="space-y-3">
        {bullets.map((bullet, idx) => (
          <li key={idx} className="flex items-start gap-3 text-base text-[var(--text-secondary)]">
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--c-brand)] shrink-0" />
            {bullet}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default RoleCard
