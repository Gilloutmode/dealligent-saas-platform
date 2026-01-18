"use client"

import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sidebar } from './Sidebar'
import { MobileNav } from './MobileNav'

// =============================================================================
// DEALLIGENT APP LAYOUT WITH AURORA COSMIC GLASS DESIGN
// Main layout with Linear-style floating sidebar and cosmic background effects
// =============================================================================

// Page Transition Wrapper
function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

// Main Layout Component
export function AppLayout() {
  return (
    <div className="flex min-h-screen relative overflow-hidden">
      {/* BACKGROUND LAYERS - AURORA COSMIC STYLE */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[var(--bg-void)]">
        {/* Deep Nebula blobs - Softer & Dynamic */}
        <div className="absolute top-[-25%] left-[-15%] w-[1200px] h-[1200px] bg-[var(--c-brand)]/5 rounded-full blur-[180px] animate-nebula-slow" />
        <div className="absolute bottom-[-30%] right-[-20%] w-[1400px] h-[1400px] bg-[var(--c-accent)]/3 rounded-full blur-[200px] animate-nebula-slow" style={{ animationDirection: 'reverse', animationDuration: '45s' }} />
        <div className="absolute top-[20%] left-[30%] w-[800px] h-[800px] bg-[var(--c-info)]/3 rounded-full blur-[150px] animate-nebula-slow" style={{ animationDuration: '35s' }} />

        {/* Floating Light Bloom */}
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[var(--c-brand)]/5 rounded-full blur-[120px]"
        />

        {/* Subtle tactical grid overlay */}
        <div className="absolute inset-0 opacity-[0.15] ambient-data-grid" />

        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="data-particle"
              style={{
                left: `${15 + i * 15}%`,
                top: `${10 + i * 12}%`,
                animationDelay: `${i * 2}s`,
                opacity: 0.15
              }}
            />
          ))}
        </div>

        {/* Scanline Effect */}
        <div className="scanline" />
      </div>

      {/* Skip Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-white text-black rounded-lg font-bold"
      >
        Aller au contenu principal
      </a>

      {/* Mobile Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 md:hidden bg-[var(--bg-deep)]/80 backdrop-blur-md border-b border-[var(--glass-border)]">
        <MobileNav />
      </div>

      {/* Aurora Floating Sidebar (Desktop) */}
      <div className="hidden md:block fixed top-6 bottom-6 left-6 w-[var(--sidebar-width)] z-40">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <main
        id="main-content"
        className="flex-1 relative z-10 md:ml-[calc(var(--sidebar-width)+3rem)] md:mr-6 md:my-6 pt-16 md:pt-0 overflow-y-auto overflow-x-hidden min-h-[calc(100vh-3rem)] rounded-[var(--radius-panel)]"
        role="main"
      >
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
    </div>
  )
}

export default AppLayout
