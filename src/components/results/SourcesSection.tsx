"use client"

import { motion } from 'framer-motion'
import { Globe, ExternalLink, Link2 } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { cn } from '../../lib/utils'

// =============================================================================
// SOURCES SECTION COMPONENT
// Shows source links used for the analysis
// =============================================================================

export interface SourcesSectionProps {
  sourceLinks?: string
  sources?: string[]
  className?: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2 },
  },
}

// Parse source links from n8n format (can be comma-separated, newline-separated, or markdown links)
function parseSourceLinks(sourceLinks: string): { url: string; label: string }[] {
  if (!sourceLinks) return []

  const links: { url: string; label: string }[] = []

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

export function SourcesSection({ sourceLinks, sources = [], className }: SourcesSectionProps) {
  const { isDark } = useTheme()

  const cardBg = isDark ? 'rgba(6, 182, 212, 0.08)' : 'rgba(6, 182, 212, 0.06)'
  const cardBorder = isDark ? 'rgba(6, 182, 212, 0.2)' : 'rgba(6, 182, 212, 0.25)'
  const headerBg = isDark ? 'rgba(6, 182, 212, 0.15)' : 'rgba(6, 182, 212, 0.12)'

  // Parse source links
  const parsedLinks = sourceLinks ? parseSourceLinks(sourceLinks) : []

  // No sources to display
  if (parsedLinks.length === 0 && sources.length === 0) {
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
        className="px-5 py-4 flex items-center gap-3"
        style={{ backgroundColor: headerBg }}
      >
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/25">
          <Globe className="w-4.5 h-4.5 text-white" />
        </div>
        <div className="flex items-center gap-2">
          <h3 className={`font-semibold ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>
            Sources Utilisées
          </h3>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium bg-cyan-500/10 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>
            {parsedLinks.length > 0 ? parsedLinks.length : sources.length}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Source Links */}
        {parsedLinks.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-2"
          >
            {parsedLinks.map((link, index) => (
              <motion.a
                key={index}
                variants={itemVariants}
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
              >
                <Link2 className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-400' : 'text-cyan-500'}`} />
                <span className="max-w-[200px] truncate">{link.label}</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--text-muted)]" />
              </motion.a>
            ))}
          </motion.div>
        )}

        {/* Source Tags (fallback) */}
        {parsedLinks.length === 0 && sources.length > 0 && (
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
