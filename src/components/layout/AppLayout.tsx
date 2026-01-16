"use client"

import { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Building2,
  Eye,
  PlayCircle,
  Activity,
  FileText,
  Database,
  FileBarChart,
  Bell,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronDown,
  Lock,
  Package,
  TrendingUp,
  FileCode,
  Sun,
  Moon,
  Layers,
  Search,
  Users,
  BarChart3,
  Sparkles,
  Crown,
} from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { useAnalysis } from '../../contexts/AnalysisContext'
import { MobileNav } from './MobileNav'
import type { LucideIcon } from 'lucide-react'

// Type definitions for navigation
interface NavItem {
  icon: LucideIcon
  label: string
  path: string
  locked?: boolean
  badgeKey?: 'runningAnalyses' // Key for dynamic badge count
}

interface NavSection {
  id: string
  label?: string
  icon?: LucideIcon
  expandable?: boolean
  locked?: boolean
  badge?: string
  items: NavItem[]
}

// Navigation structure with collapsible sections
const navigationSections: NavSection[] = [
  {
    id: 'main',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    ]
  },
  {
    id: 'market-analysis',
    label: 'Market Analysis',
    icon: BarChart3,
    expandable: true,
    items: [
      { icon: Building2, label: 'Mon Entreprise', path: '/my-company' },
      { icon: Eye, label: 'Watchlist', path: '/watchlist' },
      { icon: PlayCircle, label: 'Lancer Analyse', path: '/launch-analysis' },
      { icon: Activity, label: 'Mes Analyses', path: '/my-analyses', badgeKey: 'runningAnalyses' },
      { icon: FileText, label: 'Résultats', path: '/results' },
    ]
  },
  {
    id: 'intelligence',
    label: 'Intelligence',
    icon: Sparkles,
    expandable: true,
    locked: true,
    badge: 'PRO',
    items: [
      { icon: Package, label: 'Product Intel', path: '/product-intel', locked: true },
      { icon: TrendingUp, label: 'Sales Intel', path: '/sales-intel', locked: true },
    ]
  },
  {
    id: 'data-sources',
    label: 'Data Sources',
    icon: Database,
    expandable: true,
    items: [
      { icon: Database, label: 'RAG Management', path: '/rag-management' },
      { icon: FileBarChart, label: 'Rapports', path: '/reports' },
    ]
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    expandable: true,
    locked: true,
    badge: 'PRO',
    items: [
      { icon: FileCode, label: 'Content Engine', path: '/content-engine', locked: true },
    ]
  },
  {
    id: 'team',
    label: 'Team',
    icon: Users,
    expandable: true,
    items: [
      { icon: Bell, label: 'Alertes', path: '/alerts' },
      { icon: HelpCircle, label: 'Aide', path: '/help' },
    ]
  },
]

// Badge counts type
interface BadgeCounts {
  runningAnalyses: number
}

// Collapsible Menu Section Component
function CollapsibleSection({
  section,
  isCollapsed,
  badgeCounts
}: {
  section: typeof navigationSections[0]
  isCollapsed: boolean
  badgeCounts: BadgeCounts
}) {
  const [isExpanded, setIsExpanded] = useState(true)
  const location = useLocation()
  const Icon = section.icon

  // Check if any child is active
  const hasActiveChild = section.items?.some(item => location.pathname === item.path)

  if (!section.expandable) {
    // Single item (like Dashboard)
    const item = section.items[0]
    const ItemIcon = item.icon
    const isActive = location.pathname === item.path

    return (
      <NavLink to={item.path} className="block">
        <motion.div
          className={`sidebar-nav-item group ${isActive ? 'active' : ''} ${isCollapsed ? 'collapsed' : ''}`}
          whileHover={{ x: isCollapsed ? 0 : 2 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className={`sidebar-nav-icon ${isActive ? 'active' : ''}`}>
            <ItemIcon className="w-5 h-5" />
          </div>
          {!isCollapsed && (
            <span className={`sidebar-nav-label ${isActive ? 'active' : ''}`}>
              {item.label}
            </span>
          )}
        </motion.div>
      </NavLink>
    )
  }

  return (
    <div className="sidebar-section">
      {/* Section Header */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`sidebar-section-header group ${hasActiveChild ? 'has-active' : ''} ${isCollapsed ? 'collapsed' : ''}`}
        whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {Icon && (
            <div className={`sidebar-section-icon ${section.locked ? 'locked' : ''}`}>
              {section.locked ? <Lock className="w-4 h-4" /> : <Icon className="w-5 h-5" />}
            </div>
          )}
          {!isCollapsed && (
            <>
              <span className={`sidebar-section-label ${section.locked ? 'locked' : ''}`}>
                {section.label}
              </span>
              {section.badge && (
                <span className="sidebar-pro-badge">{section.badge}</span>
              )}
            </>
          )}
        </div>
        {!isCollapsed && (
          <motion.div
            animate={{ rotate: isExpanded ? 0 : -90 }}
            transition={{ duration: 0.2 }}
            className="sidebar-chevron"
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        )}
      </motion.button>

      {/* Section Items */}
      <AnimatePresence>
        {isExpanded && !isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="sidebar-section-items"
          >
            {section.items.map((item) => {
              const ItemIcon = item.icon
              const isActive = location.pathname === item.path
              const isLocked = item.locked

              if (isLocked) {
                return (
                  <div
                    key={item.path}
                    className="sidebar-nav-item locked"
                  >
                    <div className="sidebar-nav-icon locked">
                      <Lock className="w-4 h-4" />
                    </div>
                    <span className="sidebar-nav-label locked">{item.label}</span>
                    <span className="sidebar-pro-badge small">PRO</span>
                  </div>
                )
              }

              const badgeCount = item.badgeKey ? badgeCounts[item.badgeKey] : 0

              return (
                <NavLink key={item.path} to={item.path} className="block">
                  <motion.div
                    className={`sidebar-nav-item nested ${isActive ? 'active' : ''}`}
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`sidebar-nav-icon ${isActive ? 'active' : ''}`}>
                      <ItemIcon className="w-4 h-4" />
                    </div>
                    <span className={`sidebar-nav-label ${isActive ? 'active' : ''}`}>
                      {item.label}
                    </span>
                    {badgeCount > 0 && (
                      <span className="ml-auto px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-400 animate-pulse">
                        {badgeCount}
                      </span>
                    )}
                  </motion.div>
                </NavLink>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// 21st.dev Style Sidebar Component
function ModernSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { toggleTheme, isDark } = useTheme()
  const { runningAnalyses } = useAnalysis()

  // Badge counts for navigation items
  const badgeCounts: BadgeCounts = {
    runningAnalyses: runningAnalyses.length
  }

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 72 : 280 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="modern-sidebar"
    >
      {/* Logo Header */}
      <div className="sidebar-header">
        <motion.div
          className="sidebar-logo-container"
          whileHover={{ scale: 1.02 }}
        >
          {/* Logo Icon */}
          <div className="sidebar-logo-icon">
            <Layers className="w-5 h-5 text-white" />
          </div>

          {/* Logo Text */}
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.15 }}
                className="sidebar-logo-text"
              >
                <span className="sidebar-logo-title">Dealigent</span>
                <span className="sidebar-logo-subtitle">Intelligence Platform</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Search Bar */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sidebar-search"
          >
            <div className="sidebar-search-container">
              <Search className="sidebar-search-icon" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="sidebar-search-input"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navigationSections.map((section) => (
          <CollapsibleSection
            key={section.id}
            section={section}
            isCollapsed={isCollapsed}
            badgeCounts={badgeCounts}
          />
        ))}
      </nav>

      {/* Upgrade Card */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="sidebar-upgrade-card"
          >
            <div className="upgrade-card-icon">
              <Crown className="w-5 h-5 text-amber-400" />
            </div>
            <h4 className="upgrade-card-title">Upgrade to PRO</h4>
            <p className="upgrade-card-description">
              Unlock advanced analytics and unlimited insights
            </p>
            <button className="upgrade-card-button">
              Upgrade Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="sidebar-footer">
        {/* Settings */}
        <NavLink to="/settings" className="block">
          {({ isActive }) => (
            <motion.div
              className={`sidebar-nav-item ${isActive ? 'active' : ''} ${isCollapsed ? 'collapsed' : ''}`}
              whileHover={{ x: isCollapsed ? 0 : 2 }}
            >
              <div className={`sidebar-nav-icon ${isActive ? 'active' : ''}`}>
                <Settings className="w-5 h-5" />
              </div>
              {!isCollapsed && (
                <span className={`sidebar-nav-label ${isActive ? 'active' : ''}`}>
                  Settings
                </span>
              )}
            </motion.div>
          )}
        </NavLink>

        {/* Theme Toggle */}
        <motion.button
          onClick={toggleTheme}
          className={`sidebar-nav-item ${isCollapsed ? 'collapsed' : ''}`}
          whileHover={{ x: isCollapsed ? 0 : 2 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="sidebar-nav-icon theme-toggle">
            {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </div>
          {!isCollapsed && (
            <span className="sidebar-nav-label">
              {isDark ? 'Dark Mode' : 'Light Mode'}
            </span>
          )}
        </motion.button>

        {/* User Profile */}
        <motion.div
          className={`sidebar-user ${isCollapsed ? 'collapsed' : ''}`}
          whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
        >
          <div className="sidebar-user-avatar">
            <span>JD</span>
            <div className="sidebar-user-status" />
          </div>
          {!isCollapsed && (
            <div className="sidebar-user-info">
              <span className="sidebar-user-name">John Doe</span>
              <span className="sidebar-user-plan">Free Plan</span>
            </div>
          )}
        </motion.div>
      </div>

      {/* Collapse Toggle */}
      <motion.button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="sidebar-collapse-btn"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={{ rotate: isCollapsed ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronLeft className="w-4 h-4" />
        </motion.div>
      </motion.button>
    </motion.aside>
  )
}

// Page Transition Wrapper
function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
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

      {/* Modern Sidebar */}
      <ModernSidebar />

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
