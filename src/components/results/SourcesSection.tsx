"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Globe,
  ExternalLink,
  Link2,
  Building2,
  Newspaper,
  TrendingUp,
  FileText,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { cn } from '../../lib/utils'
import type { SourceCategory, StructuredSourceLink } from '../../types/n8n'

// =============================================================================
// SOURCES SECTION COMPONENT
// Shows source links used for the analysis (V12.2 with categories)
// =============================================================================

export interface SourcesSectionProps {
  sourceLinks?: string                              // Legacy format (string)
  sourceLinksStructured?: StructuredSourceLink[]    // V12.2 format with optional category
  sources?: string[]
  className?: string
}

// Category configuration with icons and colors
const categoryConfig: Record<SourceCategory, {
  icon: typeof Building2
  label: string
  color: string
  bg: string
}> = {
  official: { icon: Building2, label: 'Officiel', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  news: { icon: Newspaper, label: 'News', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  financial: { icon: TrendingUp, label: 'Finance', color: 'text-green-400', bg: 'bg-green-500/10' },
  research: { icon: FileText, label: 'Recherche', color: 'text-amber-400', bg: 'bg-amber-500/10' },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.15 },
  },
}

// Internal display link type
interface DisplayLink {
  url: string
  label: string
  category?: SourceCategory
}

// Parse source links from legacy string format
function parseSourceLinks(sourceLinks: string): DisplayLink[] {
  if (!sourceLinks) return []

  const links: DisplayLink[] = []

  // Try to parse markdown links: [label](url)
  const markdownRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  let match
  while ((match = markdownRegex.exec(sourceLinks)) !== null) {
    links.push({ label: match[1], url: match[2] })
  }

  if (links.length > 0) return links

  // Try to parse plain URLs
  const urlRegex = /https?:\/\/[^\s,]+/g
  const urls = sourceLinks.match(urlRegex) || []

  return urls.map((url) => {
    try {
      const hostname = new URL(url).hostname.replace('www.', '')
      return { url, label: hostname }
    } catch {
      return { url, label: url }
    }
  })
}

// Constants
const INITIAL_VISIBLE = 10

export function SourcesSection({
  sourceLinks,
  sourceLinksStructured,
  sources = [],
  className
}: SourcesSectionProps) {
  const { isDark } = useTheme()
  const [showAll, setShowAll] = useState(false)

  const cardBg = isDark ? 'rgba(6, 182, 212, 0.08)' : 'rgba(6, 182, 212, 0.06)'
  const cardBorder = isDark ? 'rgba(6, 182, 212, 0.2)' : 'rgba(6, 182, 212, 0.25)'
  const headerBg = isDark ? 'rgba(6, 182, 212, 0.15)' : 'rgba(6, 182, 212, 0.12)'

  // Priority: structured links (V12.2/V12.1) > parsed legacy > fallback sources
  const structuredLinks = sourceLinksStructured || []
  const parsedLinks = sourceLinks ? parseSourceLinks(sourceLinks) : []
  const displayLinks: DisplayLink[] = structuredLinks.length > 0
    ? structuredLinks.map(link => ({
        url: link.url,
        label: link.title,
        category: link.category
      }))
    : parsedLinks

  // "Voir plus" logic
  const hasMore = displayLinks.length > INITIAL_VISIBLE
  const visibleLinks = showAll ? displayLinks : displayLinks.slice(0, INITIAL_VISIBLE)
  const hiddenCount = displayLinks.length - INITIAL_VISIBLE

  // No sources to display
  if (displayLinks.length === 0 && sources.length === 0) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("rounded-2xl overflow-hidden", className)}
      style={{
        backgroundColor: cardBg,
        border: `1px solid ${cardBorder}`,
      }}
    >
      {/* Header */}
      <div
        className="px-5 py-4 flex items-center justify-between"
        style={{ backgroundColor: headerBg }}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/25">
            <Globe className="w-4.5 h-4.5 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <h3 className={`font-semibold ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>
              Sources Utilisees
            </h3>
          </div>
        </div>
        {/* Badge with count */}
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-cyan-500/15 text-cyan-400' : 'bg-cyan-500/20 text-cyan-600'}`}>
          {displayLinks.length > 0 ? displayLinks.length : sources.length} sources verifiees
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Source Links (V12.2/V12.1 structured or legacy parsed) */}
        {displayLinks.length > 0 && (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-2"
            >
              <AnimatePresence mode="popLayout">
                {visibleLinks.map((link, index) => {
                  const CategoryIcon = link.category ? categoryConfig[link.category].icon : Link2
                  const iconColor = link.category
                    ? categoryConfig[link.category].color
                    : isDark ? 'text-cyan-400' : 'text-cyan-500'

                  return (
                    <motion.a
                      key={`${link.url}-${index}`}
                      variants={itemVariants}
                      layout
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                        inline-flex items-center gap-2 px-3 py-2 rounded-lg
                        text-sm text-[var(--text-secondary)]
                        ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-white/70 hover:bg-white'}
                        border border-[var(--border-light)]
                        hover:border-cyan-500/30
                        transition-all group
                      `}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      title={link.category ? categoryConfig[link.category].label : undefined}
                    >
                      <CategoryIcon className={`w-3.5 h-3.5 ${iconColor} flex-shrink-0`} />
                      <span className="max-w-[180px] truncate">{link.label}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--text-muted)] flex-shrink-0" />
                    </motion.a>
                  )
                })}
              </AnimatePresence>
            </motion.div>

            {/* "Voir plus/moins" button */}
            {hasMore && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setShowAll(!showAll)}
                className={`
                  mt-4 w-full flex items-center justify-center gap-2
                  px-4 py-2.5 rounded-lg
                  text-sm font-medium
                  ${isDark
                    ? 'bg-white/5 hover:bg-white/10 text-cyan-400'
                    : 'bg-cyan-50 hover:bg-cyan-100 text-cyan-600'
                  }
                  border border-[var(--border-light)]
                  hover:border-cyan-500/30
                  transition-all
                `}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {showAll ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    Voir moins
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    Voir les {hiddenCount} autres sources
                  </>
                )}
              </motion.button>
            )}
          </>
        )}

        {/* Source Tags (fallback when no links available) */}
        {displayLinks.length === 0 && sources.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-2"
          >
            {sources.map((source, index) => (
              <motion.span
                key={index}
                variants={itemVariants}
                className={`
                  px-3 py-1.5 rounded-lg text-sm
                  ${isDark ? 'bg-white/5' : 'bg-white/70'}
                  border border-[var(--border-light)]
                  text-[var(--text-secondary)]
                `}
              >
                {source}
              </motion.span>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default SourcesSection
