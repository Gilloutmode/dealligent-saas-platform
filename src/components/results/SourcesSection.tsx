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
  totalSourcesConsulted?: number                    // Total sources consulted (for badge)
  className?: string
}

// =============================================================================
// SOURCE RELEVANCE FILTER
// Excludes API docs, dev portals, data providers, and other non-client-relevant sources
// Checks BOTH URL and title to ensure only real articles/news are shown
// =============================================================================

const IRRELEVANT_URL_PATTERNS = [
  // API documentation
  /^https?:\/\/api\./i,
  /\/api\/|\/api$/i,
  /\/docs\/|\/docs$/i,
  /^https?:\/\/docs\./i,
  /swagger/i,
  /openapi/i,
  /\/reference\//i,

  // Developer portals
  /^https?:\/\/developer\./i,
  /^https?:\/\/developers\./i,
  /\/developer\//i,

  // Code repositories & tech sites
  /github\.com/i,
  /gitlab\.com/i,
  /bitbucket\.org/i,
  /stackoverflow\.com/i,
  /npmjs\.com/i,
  /pypi\.org/i,
  /rubygems\.org/i,

  // CDN & static assets
  /^https?:\/\/cdn\./i,
  /^https?:\/\/static\./i,
  /\.json$/i,
  /\.xml$/i,

  // Generic dev tools
  /postman\.com/i,
  /insomnia\.rest/i,

  // Financial data APIs & aggregators (not real articles)
  /rapidapi\.com/i,
  /jsonstreet/i,
  /financialdatasets/i,
  /alphavantage/i,
  /polygon\.io/i,
  /iexcloud/i,
  /quandl/i,
  /intrinio/i,
  /marketstack/i,
  /finnhub/i,
]

// Irrelevant TITLE patterns (for sources where URL looks clean but title reveals it's not useful)
const IRRELEVANT_TITLE_PATTERNS = [
  // API & technical documentation
  /\bapi\s*(guide|docs|reference|documentation)\b/i,
  /\bapi\b.*\b(endpoint|request|response)\b/i,
  /\bjson\s*(api|street|data)\b/i,
  /\brest\s*api\b/i,
  /\bgraphql\b/i,
  /\bsdk\b/i,
  /\bwebhook/i,

  // Data providers & datasets (not articles)
  /\b(financial|stock|market)\s*dataset/i,
  /\bdata\s*(provider|feed|api|source)\b/i,
  /\bagent\s*de\s*recherche\b/i,
  /\bsearch\s*agent\b/i,

  // Generic tool names
  /\bchatgpt\s*(for|plugin)\b/i,
  /\bai\s*(assistant|tool|agent)\b/i,

  // Internal/technical labels
  /\bdocumentation\s*(interne|technique)\b/i,
  /\binternal\s*doc/i,
]

/**
 * Check if a source is relevant for client display
 * Returns true if BOTH url and title are pertinent (not API docs, data tools, etc.)
 */
function isRelevantSource(url: string, title?: string): boolean {
  try {
    // Check URL patterns
    const urlIrrelevant = IRRELEVANT_URL_PATTERNS.some(pattern => pattern.test(url))
    if (urlIrrelevant) return false

    // Check title patterns (if title provided)
    if (title) {
      const titleIrrelevant = IRRELEVANT_TITLE_PATTERNS.some(pattern => pattern.test(title))
      if (titleIrrelevant) return false
    }

    return true
  } catch {
    return true // If we can't parse, assume it's relevant
  }
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
  totalSourcesConsulted,
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
  const allLinks: DisplayLink[] = structuredLinks.length > 0
    ? structuredLinks.map(link => ({
        url: link.url,
        label: link.title,
        category: link.category
      }))
    : parsedLinks

  // Filter to only show relevant sources (exclude API docs, dev portals, data tools, etc.)
  // Checks BOTH url AND title to catch sources like "API Guide | ..." or "JSONStreet API"
  const displayLinks = allLinks.filter(link => isRelevantSource(link.url, link.label))

  // Badge shows total consulted (if provided) or all links count
  const badgeCount = totalSourcesConsulted || allLinks.length || sources.length

  // "Voir plus" logic
  const hasMore = displayLinks.length > INITIAL_VISIBLE
  const visibleLinks = showAll ? displayLinks : displayLinks.slice(0, INITIAL_VISIBLE)
  const hiddenCount = displayLinks.length - INITIAL_VISIBLE

  // Count how many were filtered out
  const filteredOutCount = allLinks.length - displayLinks.length

  // No sources at all
  if (allLinks.length === 0 && sources.length === 0) {
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
        {/* Badge with count - shows total consulted, not filtered count */}
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-cyan-500/15 text-cyan-400' : 'bg-cyan-500/20 text-cyan-600'}`}>
          {badgeCount} sources consultées
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
                        text-base text-[var(--text-primary)]
                        bg-[var(--glass-bg)] hover:bg-[var(--glass-hover)]
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
                  bg-[var(--glass-bg)] hover:bg-[var(--glass-hover)]
                  ${isDark ? 'text-cyan-400' : 'text-cyan-600'}
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

        {/* Message when all links were filtered (API docs only) */}
        {displayLinks.length === 0 && allLinks.length > 0 && (
          <div className={`p-4 rounded-xl text-center ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
            <p className="text-sm text-[var(--text-muted)]">
              {allLinks.length} source{allLinks.length > 1 ? 's' : ''} consultée{allLinks.length > 1 ? 's' : ''} (documentation technique non affichée)
            </p>
          </div>
        )}

        {/* Source Tags (fallback when no links available) */}
        {displayLinks.length === 0 && allLinks.length === 0 && sources.length > 0 && (
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
                  px-3 py-2 rounded-lg text-base
                  bg-[var(--glass-bg)]
                  border border-[var(--border-light)]
                  text-[var(--text-primary)]
                `}
              >
                {source}
              </motion.span>
            ))}
          </motion.div>
        )}

        {/* Info note when some sources were filtered + RAG mention */}
        {(filteredOutCount > 0 || displayLinks.length > 0) && (
          <div className="mt-4 text-sm text-[var(--text-secondary)] text-center space-y-1.5">
            {filteredOutCount > 0 && (
              <p>+ {filteredOutCount} source{filteredOutCount > 1 ? 's' : ''} via API (non consultable{filteredOutCount > 1 ? 's' : ''})</p>
            )}
            <p>📚 Croisé avec votre base CDS</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default SourcesSection
