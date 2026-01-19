"use client"

import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sidebar } from './Sidebar'
import { MobileNav } from './MobileNav'
import { useSidebar } from '../../contexts/SidebarContext'

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

// Sidebar width constants (must match Sidebar.tsx)
const SIDEBAR_WIDTH_EXPANDED = 240
const SIDEBAR_WIDTH_COLLAPSED = 72
const SIDEBAR_MARGIN = 48 // 3rem = 48px
const MD_BREAKPOINT = 768 // Tailwind md breakpoint

// Main Layout Component
export function AppLayout() {
  // Sidebar state from context
  const { isCollapsed } = useSidebar()

  // Performance optimization: Pause animations when tab is not visible
  const [isTabVisible, setIsTabVisible] = useState(true)

  // Desktop detection for responsive marginLeft
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const handleVisibilityChange = () => setIsTabVisible(!document.hidden)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  // Media query for desktop detection
  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${MD_BREAKPOINT}px)`)
    setIsDesktop(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return (
    <div className="flex min-h-screen relative overflow-hidden">
      {/* BACKGROUND LAYERS - AURORA COSMIC STYLE */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[var(--bg-void)]">
        {/* Deep Nebula blobs - Softer & Dynamic - Only animate when tab is visible */}
        {isTabVisible && (
          <>
            <div className="absolute top-[-25%] left-[-15%] w-[1200px] h-[1200px] bg-[var(--c-brand)]/5 rounded-full blur-[180px] animate-nebula-slow" />
            <div className="absolute bottom-[-30%] right-[-20%] w-[1400px] h-[1400px] bg-[var(--c-accent)]/3 rounded-full blur-[200px] animate-nebula-slow" style={{ animationDirection: 'reverse', animationDuration: '45s' }} />
            <div className="absolute top-[20%] left-[30%] w-[800px] h-[800px] bg-[var(--c-info)]/3 rounded-full blur-[150px] animate-nebula-slow" style={{ animationDuration: '35s' }} />
          </>
        )}

        {/* Floating Light Bloom - CSS animation for better performance */}
        {isTabVisible && (
          <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[var(--c-brand)]/5 rounded-full blur-[120px] animate-float-bloom" />
        )}

        {/* Subtle tactical grid overlay */}
        <div className="absolute inset-0 opacity-[0.15] ambient-data-grid" />

        {/* Animated Particles - Reduced from 6 to 3, only when tab visible */}
        {isTabVisible && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="data-particle"
                style={{
                  left: `${20 + i * 25}%`,
                  top: `${15 + i * 20}%`,
                  animationDelay: `${i * 3}s`,
                  opacity: 0.15
                }}
              />
            ))}
          </div>
        )}

        {/* Scanline Effect - Only when tab visible */}
        {isTabVisible && <div className="scanline" />}
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
      <motion.div
        className="hidden md:block fixed top-6 bottom-6 left-6 z-40"
        initial={false}
        animate={{
          width: isCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Sidebar />
      </motion.div>

      {/* Main Content Area */}
      <motion.main
        id="main-content"
        className="flex-1 relative z-10 md:mr-6 md:my-6 pt-16 md:pt-0 overflow-y-auto overflow-x-hidden min-h-[calc(100vh-3rem)] rounded-[var(--radius-panel)]"
        role="main"
        initial={false}
        animate={{
          marginLeft: isDesktop
            ? `${(isCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED) + SIDEBAR_MARGIN}px`
            : 0
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <PageTransition>
          <Outlet />
        </PageTransition>
      </motion.main>
    </div>
  )
}

export default AppLayout
