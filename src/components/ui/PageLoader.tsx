"use client"

import { motion } from 'framer-motion'

// =============================================================================
// PAGE LOADER COMPONENT
// Displayed during lazy-loaded page transitions
// Premium glassmorphism design with animated spinner
// =============================================================================

export function PageLoader() {
  return (
    <div
      className="flex items-center justify-center min-h-[400px] w-full"
      role="status"
      aria-label="Loading page content"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4 p-8 rounded-2xl card-glass"
      >
        {/* Animated spinner */}
        <motion.div
          className="w-10 h-10 rounded-full border-2 border-[var(--border-light)] border-t-[var(--primary-500)]"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Loading text */}
        <motion.p
          className="text-sm text-[var(--text-muted)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Loading...
        </motion.p>
      </motion.div>
    </div>
  )
}

export default PageLoader
