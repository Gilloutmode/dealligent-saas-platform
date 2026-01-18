"use client"

import { useCallback, type KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Home,
  LayoutDashboard,
  Activity,
  PlayCircle,
  Users,
  Database,
  Building2,
  Settings,
  HelpCircle,
  Sun,
  Moon,
} from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { useAnalysis } from '../../contexts/AnalysisContext'
import { SidebarItem } from './SidebarItem'
import { SidebarSection } from './SidebarSection'
import { SidebarLogo } from './SidebarLogo'

// =============================================================================
// LINEAR-STYLE SIDEBAR
// Clean, minimal navigation with collapsible sections and status indicators
// =============================================================================

export function Sidebar() {
  const navigate = useNavigate()
  const { toggleTheme, isDark } = useTheme()
  const { runningAnalyses } = useAnalysis()

  // Keyboard navigation handler for the sidebar
  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLElement>) => {
    const focusableItems = e.currentTarget.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])'
    )
    const items = Array.from(focusableItems)
    const currentIndex = items.findIndex(item => item === document.activeElement)

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0
        items[nextIndex]?.focus()
        break
      case 'ArrowUp':
        e.preventDefault()
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1
        items[prevIndex]?.focus()
        break
      case 'Home':
        e.preventDefault()
        items[0]?.focus()
        break
      case 'End':
        e.preventDefault()
        items[items.length - 1]?.focus()
        break
    }
  }, [])

  return (
    <aside
      className="sidebar-linear"
      role="navigation"
      aria-label="Navigation principale"
      onKeyDown={handleKeyDown}
    >
      {/* Logo Header - Using dedicated component */}
      <SidebarLogo />

      {/* Navigation */}
      <nav className="sidebar-nav flex-1 overflow-y-auto py-4 space-y-6" role="menubar">
        {/* Main Items */}
        <div className="px-2 space-y-0.5">
          <SidebarItem
            icon={<Home className="w-5 h-5" />}
            label="Accueil"
            href="/home"
          />
          <SidebarItem
            icon={<LayoutDashboard className="w-5 h-5" />}
            label="Dashboard"
            href="/dashboard"
          />
          <SidebarItem
            icon={<Activity className="w-5 h-5" />}
            label="Mes Analyses"
            href="/my-analyses"
            badge={runningAnalyses.length > 0 ? `${runningAnalyses.length} en cours` : undefined}
            statusDot={runningAnalyses.length > 0 ? 'warning' : undefined}
          />
        </div>

        {/* Market Intelligence Section */}
        <div className="px-2">
          <SidebarSection id="market-intelligence" title="Market Intelligence" defaultOpen={true}>
            <SidebarItem
              icon={<PlayCircle className="w-5 h-5" />}
              label="Lancer Analyse"
              href="/launch-analysis"
              isNested
            />
            <SidebarItem
              icon={<Users className="w-5 h-5" />}
              label="Compétiteurs"
              href="/competitors"
              isNested
            />
          </SidebarSection>
        </div>

        {/* Configuration Section */}
        <div className="px-2">
          <SidebarSection id="configuration" title="Configuration" defaultOpen={true}>
            <SidebarItem
              icon={<Building2 className="w-5 h-5" />}
              label="Mon Entreprise"
              href="/my-company"
              isNested
            />
            <SidebarItem
              icon={<Database className="w-5 h-5" />}
              label="RAG Management"
              href="/rag-management"
              isNested
            />
            <SidebarItem
              icon={<Settings className="w-5 h-5" />}
              label="Paramètres"
              href="/settings"
              isNested
            />
          </SidebarSection>
        </div>

        {/* Help */}
        <div className="px-2">
          <SidebarItem
            icon={<HelpCircle className="w-5 h-5" />}
            label="Aide"
            href="/help"
          />
        </div>
      </nav>

      {/* Footer */}
      <div className="sidebar-footer border-t border-[var(--sidebar-border)] p-3 space-y-2">
        {/* Theme Toggle */}
        <motion.button
          onClick={toggleTheme}
          className={`
            w-full flex items-center gap-3 px-3 py-2 rounded-lg
            text-[var(--text-secondary)]
            hover:bg-[var(--sidebar-item-hover)] hover:text-[var(--text-primary)]
            transition-colors duration-150
          `}
          whileTap={{ scale: 0.98 }}
          aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
        >
          <div className="w-5 h-5">
            {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </div>
          <span className="text-sm font-medium">
            {isDark ? 'Mode sombre' : 'Mode clair'}
          </span>
        </motion.button>

        {/* User Profile */}
        <motion.div
          className={`
            flex items-center gap-3 px-3 py-2 rounded-lg
            hover:bg-[var(--sidebar-item-hover)]
            transition-colors duration-150 cursor-pointer
          `}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => navigate('/settings')}
          role="button"
          tabIndex={0}
          aria-label="Profil utilisateur"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent-primary)] to-[#8B5CF6] flex items-center justify-center text-xs font-semibold text-white">
              G
            </div>
            {/* Online status indicator */}
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[var(--sidebar-bg)]" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium text-[var(--text-primary)] truncate">Gil</span>
            <span className="text-xs text-[var(--text-muted)] truncate">Free Plan</span>
          </div>
        </motion.div>
      </div>
    </aside>
  )
}

export default Sidebar
