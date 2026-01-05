"use client"

import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Building2,
  Eye,
  PlayCircle,
  FileText,
  Database,
  FileBarChart,
  Bell,
  Settings,
  HelpCircle,
  TrendingUp,
  Lock,
  Package,
  FileCode,
  Sun,
  Moon,
  Zap,
  Menu,
  X,
} from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

// =============================================================================
// NAVIGATION CONFIGURATION (shared with AppLayout)
// =============================================================================

const mainNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Building2, label: 'Mon Entreprise', path: '/my-company' },
  { icon: Eye, label: 'Watchlist', path: '/watchlist' },
  { icon: PlayCircle, label: 'Lancer Analyse', path: '/launch-analysis' },
  { icon: FileText, label: 'Résultats', path: '/results' },
]

const adminNavItems = [
  { icon: Database, label: 'RAG Management', path: '/rag-management' },
  { icon: FileBarChart, label: 'Rapports', path: '/reports' },
  { icon: Bell, label: 'Alertes', path: '/alerts' },
  { icon: Settings, label: 'Paramètres', path: '/settings' },
  { icon: HelpCircle, label: 'Aide', path: '/help' },
]

const lockedSections = [
  { icon: Package, label: 'Product Intel', section: 'PRODUCT INTEL' },
  { icon: TrendingUp, label: 'Sales Intel', section: 'SALES INTEL' },
  { icon: FileCode, label: 'Content Engine', section: 'CONTENT ENGINE' },
]

// =============================================================================
// MOBILE NAV ITEM
// =============================================================================

interface MobileNavItemProps {
  icon: React.ElementType
  label: string
  path: string
  onClick: () => void
}

function MobileNavItem({ icon: Icon, label, path, onClick }: MobileNavItemProps) {
  return (
    <NavLink
      to={path}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
          isActive
            ? 'bg-[var(--sidebar-item-active)] text-[var(--blue-primary)]'
            : 'text-[var(--text-secondary)] hover:bg-[var(--sidebar-item-hover)]'
        }`
      }
    >
      <Icon className="w-5 h-5" aria-hidden="true" />
      <span className="font-medium">{label}</span>
    </NavLink>
  )
}

// =============================================================================
// MOBILE LOCKED NAV ITEM
// =============================================================================

interface MobileLockedNavItemProps {
  icon: React.ElementType
  label: string
}

function MobileLockedNavItem({ icon: _Icon, label }: MobileLockedNavItemProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--text-disabled)] cursor-not-allowed">
      <Lock className="w-4 h-4" aria-hidden="true" />
      <span className="font-medium">{label}</span>
      <span className="ml-auto text-xs px-2 py-0.5 rounded-full border border-[var(--border-default)] text-[var(--text-muted)]">
        Pro
      </span>
    </div>
  )
}

// =============================================================================
// MOBILE SECTION HEADER
// =============================================================================

interface MobileSectionHeaderProps {
  title: string
  locked?: boolean
}

function MobileSectionHeader({ title, locked }: MobileSectionHeaderProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 mt-4 first:mt-0">
      <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
        {title}
      </span>
      {locked && <Lock className="w-3 h-3 text-[var(--text-muted)]" aria-hidden="true" />}
    </div>
  )
}

// =============================================================================
// MOBILE HEADER
// =============================================================================

interface MobileHeaderProps {
  onMenuToggle: () => void
  isMenuOpen: boolean
}

function MobileHeader({ onMenuToggle, isMenuOpen }: MobileHeaderProps) {
  const { toggleTheme, isDark } = useTheme()

  return (
    <header className="mobile-header">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--blue-primary)] to-[var(--blue-secondary)] flex items-center justify-center">
          <Zap className="w-5 h-5 text-white" aria-hidden="true" />
        </div>
        <span className="font-bold text-lg text-[var(--text-primary)]">Dealigent</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-[var(--sidebar-item-hover)] transition-colors"
          aria-label={`Activer le mode ${isDark ? 'clair' : 'sombre'}`}
        >
          {isDark ? (
            <Moon className="w-5 h-5 text-[var(--text-secondary)]" aria-hidden="true" />
          ) : (
            <Sun className="w-5 h-5 text-[var(--text-secondary)]" aria-hidden="true" />
          )}
        </button>

        {/* Menu Toggle */}
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-lg hover:bg-[var(--sidebar-item-hover)] transition-colors"
          aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav-drawer"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-[var(--text-primary)]" aria-hidden="true" />
          ) : (
            <Menu className="w-6 h-6 text-[var(--text-primary)]" aria-hidden="true" />
          )}
        </button>
      </div>
    </header>
  )
}

// =============================================================================
// MOBILE DRAWER
// =============================================================================

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
}

function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const location = useLocation()

  // Close drawer on route change
  useEffect(() => {
    onClose()
  }, [location.pathname, onClose])

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mobile-drawer-backdrop"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.nav
            id="mobile-nav-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
          >
            {/* Drawer Header */}
            <div className="mobile-drawer-header">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--blue-primary)] to-[var(--blue-secondary)] flex items-center justify-center text-white font-semibold">
                  JD
                </div>
                <div>
                  <p className="font-semibold text-[var(--text-primary)]">John Doe</p>
                  <p className="text-sm text-[var(--text-muted)]">john@company.com</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-[var(--sidebar-item-hover)] transition-colors"
                aria-label="Fermer le menu"
              >
                <X className="w-5 h-5 text-[var(--text-secondary)]" aria-hidden="true" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="mobile-drawer-content">
              {/* Main Section */}
              <MobileSectionHeader title="Intelligence" />
              <div className="space-y-1">
                {mainNavItems.map((item) => (
                  <MobileNavItem
                    key={item.path}
                    icon={item.icon}
                    label={item.label}
                    path={item.path}
                    onClick={onClose}
                  />
                ))}
              </div>

              {/* Locked Sections */}
              {lockedSections.map((section) => (
                <div key={section.section}>
                  <MobileSectionHeader title={section.section} locked />
                  <MobileLockedNavItem icon={section.icon} label={section.label} />
                </div>
              ))}

              {/* Admin Section */}
              <MobileSectionHeader title="Administration" />
              <div className="space-y-1">
                {adminNavItems.map((item) => (
                  <MobileNavItem
                    key={item.path}
                    icon={item.icon}
                    label={item.label}
                    path={item.path}
                    onClick={onClose}
                  />
                ))}
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="mobile-drawer-footer">
              <p className="text-xs text-[var(--text-muted)] text-center">
                Dealigent v1.0 - Market Intelligence
              </p>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  )
}

// =============================================================================
// MOBILE NAV (Main Export)
// =============================================================================

export function MobileNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <MobileHeader
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
        isMenuOpen={isMenuOpen}
      />
      <MobileDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}

export default MobileNav
