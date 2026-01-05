"use client"

import { useState } from "react"
import {
  Bell,
  ChevronDown,
  LogOut,
  Moon,
  Search,
  Settings,
  Sun,
  User,
  HelpCircle,
  Menu,
} from "lucide-react"

// Types
interface HeaderProps {
  title?: string
  subtitle?: string
  showSearch?: boolean
  onMenuClick?: () => void
}

interface NotificationItem {
  id: string
  title: string
  description: string
  time: string
  read: boolean
  type: "info" | "success" | "warning" | "error"
}

// Mock notifications
const notifications: NotificationItem[] = [
  {
    id: "1",
    title: "Analyse terminée",
    description: "Rapport Market Overview disponible",
    time: "Il y a 5 min",
    read: false,
    type: "success",
  },
  {
    id: "2",
    title: "Nouveau concurrent détecté",
    description: "TechStartup ajouté à votre watchlist",
    time: "Il y a 1h",
    read: false,
    type: "info",
  },
  {
    id: "3",
    title: "Document en attente",
    description: "product-specs.pdf requiert validation",
    time: "Il y a 2h",
    read: true,
    type: "warning",
  },
]

// Notification Badge Component
const NotificationBadge = ({ count }: { count: number }) => {
  if (count === 0) return null
  return (
    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
      {count > 9 ? "9+" : count}
    </span>
  )
}

// Notification Dropdown
const NotificationDropdown = ({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean
  onClose: () => void 
}) => {
  if (!isOpen) return null

  const unreadCount = notifications.filter(n => !n.read).length

  const getTypeColor = (type: NotificationItem["type"]) => {
    const colors = {
      info: "bg-blue-500",
      success: "bg-green-500",
      warning: "bg-amber-500",
      error: "bg-red-500",
    }
    return colors[type]
  }

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute right-0 top-full mt-2 w-80 rounded-lg border border-gray-200 bg-white shadow-lg z-50">
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
          <h3 className="font-semibold text-gray-900">Notifications</h3>
          {unreadCount > 0 && (
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-600">
              {unreadCount} nouvelles
            </span>
          )}
        </div>
        <div className="max-h-[320px] overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex gap-3 px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer ${
                !notification.read ? "bg-blue-50/50" : ""
              }`}
            >
              <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${getTypeColor(notification.type)}`} />
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${!notification.read ? "font-medium text-gray-900" : "text-gray-700"}`}>
                  {notification.title}
                </p>
                <p className="text-xs text-gray-500 truncate">{notification.description}</p>
                <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-100 px-4 py-2">
          <button className="w-full text-center text-sm font-medium text-blue-600 hover:text-blue-700 py-1">
            Voir toutes les notifications
          </button>
        </div>
      </div>
    </>
  )
}

// User Menu Dropdown
const UserMenuDropdown = ({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean
  onClose: () => void 
}) => {
  if (!isOpen) return null

  const menuItems = [
    { icon: User, label: "Mon Profil", href: "#profile" },
    { icon: Settings, label: "Paramètres", href: "#settings" },
    { icon: HelpCircle, label: "Aide & Support", href: "#help" },
  ]

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute right-0 top-full mt-2 w-56 rounded-lg border border-gray-200 bg-white shadow-lg z-50">
        {/* User Info */}
        <div className="border-b border-gray-100 px-4 py-3">
          <p className="font-medium text-gray-900">Gil Moussailon</p>
          <p className="text-sm text-gray-500">gil@company.com</p>
          <span className="mt-2 inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
            Admin
          </span>
        </div>
        
        {/* Menu Items */}
        <div className="py-1">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <item.icon className="h-4 w-4 text-gray-400" />
              {item.label}
            </a>
          ))}
        </div>
        
        {/* Logout */}
        <div className="border-t border-gray-100 py-1">
          <button className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
            <LogOut className="h-4 w-4" />
            Déconnexion
          </button>
        </div>
      </div>
    </>
  )
}

// Search Bar Component
const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className={`relative hidden md:flex items-center transition-all duration-200 ${
      isFocused ? "w-80" : "w-64"
    }`}>
      <Search className="absolute left-3 h-4 w-4 text-gray-400" />
      <input
        type="text"
        placeholder="Rechercher..."
        className="h-9 w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-4 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <kbd className="absolute right-3 hidden rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-400 lg:inline">
        ⌘K
      </kbd>
    </div>
  )
}

// Theme Toggle
const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false)

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  )
}

// Main Header Component
const Header = ({ 
  title = "Dashboard", 
  subtitle,
  showSearch = true,
  onMenuClick 
}: HeaderProps) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 lg:px-6">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Page Title */}
        <div>
          <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
          {subtitle && (
            <p className="text-sm text-gray-500">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Search */}
        {showSearch && <SearchBar />}

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setNotificationsOpen(!notificationsOpen)
              setUserMenuOpen(false)
            }}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          >
            <Bell className="h-5 w-5" />
            <NotificationBadge count={unreadCount} />
          </button>
          <NotificationDropdown 
            isOpen={notificationsOpen} 
            onClose={() => setNotificationsOpen(false)} 
          />
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => {
              setUserMenuOpen(!userMenuOpen)
              setNotificationsOpen(false)
            }}
            className="flex items-center gap-2 rounded-lg py-1.5 pl-1.5 pr-2 hover:bg-gray-100 transition-colors"
          >
            {/* Avatar */}
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-sm font-medium text-white">
              GM
            </div>
            <span className="hidden text-sm font-medium text-gray-700 md:inline">Gil</span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </button>
          <UserMenuDropdown 
            isOpen={userMenuOpen} 
            onClose={() => setUserMenuOpen(false)} 
          />
        </div>
      </div>
    </header>
  )
}

export default Header
export { SearchBar, ThemeToggle, NotificationDropdown, UserMenuDropdown }
