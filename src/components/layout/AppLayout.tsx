"use client"

import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sidebar } from './Sidebar'
import { MobileNav } from './MobileNav'

// =============================================================================
// DEALLIGENT APP LAYOUT
// Main layout with Linear-style sidebar navigation
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
    <div className="app-layout">
      {/* Skip Link for Accessibility */}
      <a href="#main-content" className="skip-link">
        Aller au contenu principal
      </a>

      {/* Mobile Navigation */}
      <div className="mobile-nav-container">
        <MobileNav />
      </div>

      {/* Linear-Style Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main id="main-content" className="main-content" role="main">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
    </div>
  )
}

export default AppLayout
