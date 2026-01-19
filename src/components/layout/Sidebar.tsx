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
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { useAnalysis } from '../../contexts/AnalysisContext'
import { useSidebar } from '../../contexts/SidebarContext'
import { SidebarItem } from './SidebarItem'
import { SidebarSection } from './SidebarSection'
import { SidebarLogo } from './SidebarLogo'
import { Tooltip } from '../ui/Tooltip'

// =============================================================================
// LINEAR-STYLE SIDEBAR WITH AURORA GLASS DESIGN
// Collapsible navigation with smooth animations
// =============================================================================

export function Sidebar() {
  const navigate = useNavigate()
  const { toggleTheme, isDark } = useTheme()
  const { runningAnalyses } = useAnalysis()
  const { isCollapsed, toggleSidebar } = useSidebar()

  // Keyboard navigation handler
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
    <div className="relative h-full">
      {/* Floating Toggle Button - VS Code / Linear style */}
      <motion.button
        onClick={toggleSidebar}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-50 w-6 h-6 rounded-full bg-[var(--bg-surface)] border border-[var(--glass-border)] shadow-lg flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] hover:border-[var(--accent-primary)]/50 hover:shadow-[var(--accent-primary)]/20 transition-all duration-200"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? (
          <ChevronRight className="w-3.5 h-3.5" />
        ) : (
          <ChevronLeft className="w-3.5 h-3.5" />
        )}
      </motion.button>

      <motion.aside
        layout
        className="glass-dock h-full flex flex-col rounded-[var(--radius-panel,32px)] border border-[var(--glass-border)] transition-all duration-300 shadow-2xl overflow-hidden"
        role="navigation"
        aria-label="Navigation principale"
        onKeyDown={handleKeyDown}
        initial={false}
        animate={{
          width: isCollapsed ? 72 : 240,
        }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        {/* Aurora Glow Effect */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[var(--c-brand-glow)]/10 to-transparent pointer-events-none" />

      {/* Logo Header */}
      <div className="relative z-10 p-4 mb-2">
        <SidebarLogo isCollapsed={isCollapsed} />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex-1 overflow-y-auto px-3 space-y-6 scrollbar-hide" role="menubar">
        {/* Main Items */}
        <div className="space-y-1">
          <SidebarItem
            icon={<Home className="w-5 h-5" />}
            label="Accueil"
            href="/home"
            isCollapsed={isCollapsed}
          />
          <SidebarItem
            icon={<LayoutDashboard className="w-5 h-5" />}
            label="Dashboard"
            href="/dashboard"
            isCollapsed={isCollapsed}
          />
          <SidebarItem
            icon={<Activity className="w-5 h-5" />}
            label="Mes Analyses"
            href="/my-analyses"
            badge={runningAnalyses.length > 0 ? `${runningAnalyses.length}` : undefined}
            statusDot={runningAnalyses.length > 0 ? 'warning' : undefined}
            isCollapsed={isCollapsed}
          />
        </div>

        {/* Separator */}
        <div className="h-px bg-[var(--glass-border)] mx-2 my-4" />

        {/* Market Intelligence Section */}
        <div>
          <SidebarSection id="market-intelligence" title="MARKET INTELLIGENCE" defaultOpen={true} isCollapsed={isCollapsed}>
            <SidebarItem
              icon={<PlayCircle className="w-5 h-5" />}
              label="Lancer Analyse"
              href="/launch-analysis"
              isNested
              isCollapsed={isCollapsed}
            />
            <SidebarItem
              icon={<Users className="w-5 h-5" />}
              label="Competiteurs"
              href="/competitors"
              isNested
              isCollapsed={isCollapsed}
            />
          </SidebarSection>
        </div>

        {/* Configuration Section */}
        <div>
          <SidebarSection id="configuration" title="CONFIGURATION" defaultOpen={true} isCollapsed={isCollapsed}>
            <SidebarItem
              icon={<Building2 className="w-5 h-5" />}
              label="Mon Entreprise"
              href="/my-company"
              isNested
              isCollapsed={isCollapsed}
            />
            <SidebarItem
              icon={<Database className="w-5 h-5" />}
              label="Base de Connaissances"
              href="/rag-management"
              isNested
              isCollapsed={isCollapsed}
            />
            <SidebarItem
              icon={<Settings className="w-5 h-5" />}
              label="Parametres"
              href="/settings"
              isNested
              isCollapsed={isCollapsed}
            />
          </SidebarSection>
        </div>

        {/* Help */}
        <div>
          <SidebarItem
            icon={<HelpCircle className="w-5 h-5" />}
            label="Aide"
            href="/help"
            isCollapsed={isCollapsed}
          />
        </div>
      </nav>

      {/* Footer */}
      <div className="relative z-10 mt-auto p-3 border-t border-[var(--glass-border)] bg-[var(--glass-surface)] space-y-3">
        {/* Theme Toggle */}
        {isCollapsed ? (
          <Tooltip content={isDark ? 'Mode clair' : 'Mode sombre'} placement="right">
            <motion.button
              onClick={toggleTheme}
              className="w-full flex items-center justify-center p-2 rounded-xl bg-white/5 border border-white/5 hover:border-[var(--c-brand)]/30 hover:bg-[var(--c-brand)]/10 transition-all"
              whileTap={{ scale: 0.95 }}
              aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
            >
              <div className="w-8 h-8 rounded-lg bg-[var(--c-brand)]/20 flex items-center justify-center text-[var(--c-brand)]">
                {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </div>
            </motion.button>
          </Tooltip>
        ) : (
          <motion.button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[var(--c-brand)]/30 hover:bg-[var(--c-brand)]/10 transition-all group"
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--c-brand)]/20 flex items-center justify-center text-[var(--c-brand)]">
                {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                Mode Interface
              </span>
            </div>
            <div className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-black uppercase tracking-tighter text-[var(--c-brand)]">
              {isDark ? 'Dark' : 'Light'}
            </div>
          </motion.button>
        )}

        {/* User Profile */}
        {isCollapsed ? (
          <Tooltip content="Profil - Gil" placement="right">
            <motion.div
              className="flex items-center justify-center p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer border border-transparent hover:border-white/10"
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate('/settings')}
              role="button"
              tabIndex={0}
              aria-label="Profil utilisateur"
            >
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--c-brand)] to-[var(--c-accent,#8b5cf6)] flex items-center justify-center text-sm font-bold text-white shadow-lg">
                  G
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[var(--c-success,#10b981)] border-2 border-[var(--bg-surface,#0a0c14)]" />
              </div>
            </motion.div>
          </Tooltip>
        ) : (
          <motion.div
            className="flex items-center gap-3 p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer border border-transparent hover:border-white/10"
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate('/settings')}
            role="button"
            tabIndex={0}
            aria-label="Profil utilisateur"
          >
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--c-brand)] to-[var(--c-accent,#8b5cf6)] flex items-center justify-center text-sm font-bold text-white shadow-lg">
                G
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[var(--c-success,#10b981)] border-2 border-[var(--bg-surface,#0a0c14)]" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-[var(--text-primary)] truncate">Gil</span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--c-brand)]">Pro Plan</span>
            </div>
          </motion.div>
        )}

      </div>
    </motion.aside>
    </div>
  )
}

export default Sidebar
