// =============================================================================
// DEALLIGENT PLATFORM - SECTION 360° OVERVIEW
// Bento Grid layout for 360° competitive intelligence data
// Built with MCP Magic Builder + Project adaptations
// =============================================================================

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TrendingUp,
  DollarSign,
  Target,
  Package,
  Code,
  MessageSquare,
  Users,
  ShoppingCart,
  Lightbulb,
  Megaphone,
  LayoutGrid,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react'
import type { UIAnalysisResult } from '../../types/analysis'

// =============================================================================
// VIEW MODE TYPE
// =============================================================================

type ViewMode = 'summary' | 'reading'

// =============================================================================
// TYPES
// =============================================================================

type CategoryColor = 'blue' | 'purple' | 'green' | 'amber'

interface Section360Item {
  id: string
  title: string
  content: string | undefined
  icon: LucideIcon
  category: CategoryColor
  colSpan?: 1 | 2 | 3
}

interface Section360OverviewProps {
  analysis: UIAnalysisResult
  className?: string
}

// =============================================================================
// CONSTANTS
// =============================================================================

const categoryColors = {
  blue: {
    glow: 'rgba(59, 130, 246, 0.5)',
    gradient: 'from-blue-500 to-cyan-500',
    border: 'border-blue-500/20',
    bg: 'bg-blue-500/5',
    hoverShadow: 'hover:shadow-blue-500/20',
  },
  purple: {
    glow: 'rgba(168, 85, 247, 0.5)',
    gradient: 'from-purple-500 to-pink-500',
    border: 'border-purple-500/20',
    bg: 'bg-purple-500/5',
    hoverShadow: 'hover:shadow-purple-500/20',
  },
  green: {
    glow: 'rgba(34, 197, 94, 0.5)',
    gradient: 'from-green-500 to-emerald-500',
    border: 'border-green-500/20',
    bg: 'bg-green-500/5',
    hoverShadow: 'hover:shadow-green-500/20',
  },
  amber: {
    glow: 'rgba(245, 158, 11, 0.5)',
    gradient: 'from-amber-500 to-orange-500',
    border: 'border-amber-500/20',
    bg: 'bg-amber-500/5',
    hoverShadow: 'hover:shadow-amber-500/20',
  },
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

// =============================================================================
// HELPER: Build items from analysis data
// =============================================================================

function buildItemsFromAnalysis(analysis: UIAnalysisResult): Section360Item[] {
  return [
    // Row 1 - Business (Blue)
    {
      id: 'businessModel',
      title: 'Business Model',
      content: analysis.businessModel,
      icon: TrendingUp,
      category: 'blue',
    },
    {
      id: 'financialHealth',
      title: 'Financial Health',
      content: analysis.financialHealth,
      icon: DollarSign,
      category: 'blue',
    },
    {
      id: 'marketPosition',
      title: 'Market Position',
      content: analysis.marketPosition,
      icon: Target,
      category: 'blue',
    },
    // Row 2 - Product/Strategy (Purple)
    {
      id: 'productStrategy',
      title: 'Product Strategy',
      content: analysis.productStrategy,
      icon: Package,
      category: 'purple',
    },
    {
      id: 'technologyApproach',
      title: 'Technology Approach',
      content: analysis.technologyApproach,
      icon: Code,
      category: 'purple',
    },
    {
      id: 'competitorClaims',
      title: 'Competitor Claims',
      content: analysis.competitorClaims,
      icon: MessageSquare,
      category: 'purple',
    },
    // Row 3 - Sales/Market (Green + Amber)
    {
      id: 'targetCustomerProfile',
      title: 'Target Customer',
      content: analysis.targetCustomerProfile,
      icon: Users,
      category: 'green',
    },
    {
      id: 'salesApproach',
      title: 'Sales Approach',
      content: analysis.salesApproach,
      icon: ShoppingCart,
      category: 'green',
    },
    {
      id: 'cdsOpportunities',
      title: 'CDS Opportunities',
      content: analysis.cdsOpportunities,
      icon: Lightbulb,
      category: 'amber',
    },
    // Row 4 - Full width highlighted (Amber)
    {
      id: 'recommendedMessaging',
      title: 'Recommended Messaging',
      content: analysis.recommendedMessaging,
      icon: Megaphone,
      category: 'amber',
      colSpan: 3,
    },
  ]
}

// =============================================================================
// SECTION 360 CARD COMPONENT
// =============================================================================

interface Section360CardProps {
  item: Section360Item
}

function Section360Card({ item }: Section360CardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePosition({ x, y })
  }

  const colors = categoryColors[item.category]
  const Icon = item.icon
  const isEmpty = !item.content

  // Determine col-span class
  const colSpanClass =
    item.colSpan === 3
      ? 'md:col-span-3'
      : item.colSpan === 2
        ? 'md:col-span-2'
        : 'md:col-span-1'

  return (
    <motion.div
      variants={itemVariants}
      className={`
        relative rounded-2xl overflow-hidden transition-all duration-300
        backdrop-blur-md bg-white/5 border border-white/10
        ${colSpanClass}
        ${colors.bg} ${colors.border}
        ${isHovered ? 'shadow-xl ' + colors.hoverShadow : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -2 }}
    >
      {/* Glow effect */}
      <div
        className="absolute blur-2xl rounded-full w-[150%] h-[150%] -z-10 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, ${colors.glow}, transparent 60%)`,
          left: '-25%',
          top: '-25%',
          opacity: isHovered ? 0.3 : 0,
        }}
      />

      {/* Gradient border on hover */}
      {isHovered && (
        <div
          className={`absolute inset-0 opacity-50 rounded-2xl bg-gradient-to-r ${colors.gradient}`}
          style={{
            WebkitMask:
              'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            padding: '1px',
          }}
        />
      )}

      {/* Content */}
      <div className="relative p-6 h-full flex flex-col z-10 min-h-[160px]">
        <div className="flex items-start justify-between mb-4">
          {/* Icon */}
          <div
            className={`
              p-3 rounded-xl backdrop-blur-sm bg-gradient-to-br ${colors.gradient}
              text-white shadow-lg transition-transform duration-300
              ${isHovered ? 'scale-110' : ''}
            `}
          >
            <Icon className="w-5 h-5" />
          </div>

          {/* Category badge for highlighted items */}
          {item.colSpan === 3 && (
            <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
              Action Required
            </span>
          )}
        </div>

        <div className="flex-grow">
          {/* Title with gradient */}
          <h3
            className={`font-bold text-lg mb-2 bg-clip-text text-transparent bg-gradient-to-r ${colors.gradient}`}
          >
            {item.title}
          </h3>

          {/* Content or empty state */}
          {isEmpty ? (
            <p className="text-sm text-[var(--text-muted)] italic">
              No data available
            </p>
          ) : (
            <p className="text-sm text-white/70 leading-relaxed">
              {item.content}
            </p>
          )}
        </div>

        {/* Grid pattern overlay on hover */}
        {isHovered && (
          <div className="absolute inset-0 opacity-30 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:16px_16px]" />
          </div>
        )}
      </div>
    </motion.div>
  )
}

// =============================================================================
// VIEW MODE TOGGLE COMPONENT
// =============================================================================

interface ViewModeToggleProps {
  viewMode: ViewMode
  onModeChange: (mode: ViewMode) => void
}

function ViewModeToggle({ viewMode, onModeChange }: ViewModeToggleProps) {
  return (
    <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
      <button
        onClick={() => onModeChange('summary')}
        className={`
          flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium
          transition-all duration-200
          ${viewMode === 'summary'
            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5'
          }
        `}
      >
        <LayoutGrid className="w-4 h-4" />
        <span className="hidden sm:inline">Résumé</span>
      </button>
      <button
        onClick={() => onModeChange('reading')}
        className={`
          flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium
          transition-all duration-200
          ${viewMode === 'reading'
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5'
          }
        `}
      >
        <BookOpen className="w-4 h-4" />
        <span className="hidden sm:inline">Lecture</span>
      </button>
    </div>
  )
}

// =============================================================================
// READING VIEW COMPONENT
// =============================================================================

interface ReadingViewProps {
  items: Section360Item[]
  currentIndex: number
  onIndexChange: (index: number) => void
}

function ReadingView({ items, currentIndex, onIndexChange }: ReadingViewProps) {
  const currentItem = items[currentIndex]
  const colors = categoryColors[currentItem.category]
  const Icon = currentItem.icon
  const isEmpty = !currentItem.content

  const goToPrev = () => {
    if (currentIndex > 0) onIndexChange(currentIndex - 1)
  }

  const goToNext = () => {
    if (currentIndex < items.length - 1) onIndexChange(currentIndex + 1)
  }

  // Keyboard navigation with Arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        if (currentIndex > 0) onIndexChange(currentIndex - 1)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        if (currentIndex < items.length - 1) onIndexChange(currentIndex + 1)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, items.length, onIndexChange])

  return (
    <div className="space-y-6">
      {/* Section Navigator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {items.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => onIndexChange(idx)}
              className={`
                w-2.5 h-2.5 rounded-full transition-all duration-200
                ${idx === currentIndex
                  ? `bg-gradient-to-r ${categoryColors[item.category].gradient} scale-125`
                  : 'bg-white/20 hover:bg-white/40'
                }
              `}
              title={item.title}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrev}
            disabled={currentIndex === 0}
            aria-label="Section précédente"
            className={`
              p-2 rounded-lg transition-all
              ${currentIndex === 0
                ? 'text-[var(--text-muted)] cursor-not-allowed'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/10'
              }
            `}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm text-[var(--text-secondary)] min-w-[60px] text-center">
            {currentIndex + 1} / {items.length}
          </span>
          <button
            onClick={goToNext}
            disabled={currentIndex === items.length - 1}
            aria-label="Section suivante"
            className={`
              p-2 rounded-lg transition-all
              ${currentIndex === items.length - 1
                ? 'text-[var(--text-muted)] cursor-not-allowed'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/10'
              }
            `}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Reading Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentItem.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className={`
            relative rounded-2xl overflow-hidden
            backdrop-blur-md bg-white/5 border border-white/10
            ${colors.bg} ${colors.border}
          `}
        >
          {/* Gradient border */}
          <div
            className={`absolute inset-0 opacity-30 rounded-2xl bg-gradient-to-r ${colors.gradient}`}
            style={{
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              padding: '1px',
            }}
          />

          {/* Content - Reading mode optimized */}
          <div className="relative p-8 md:p-10 z-10">
            {/* Header */}
            <div className="flex items-start gap-4 mb-8">
              <div
                className={`
                  p-4 rounded-xl backdrop-blur-sm bg-gradient-to-br ${colors.gradient}
                  text-white shadow-lg
                `}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3
                  className={`font-bold text-2xl mb-1 bg-clip-text text-transparent bg-gradient-to-r ${colors.gradient}`}
                >
                  {currentItem.title}
                </h3>
                <span className="text-xs font-semibold uppercase tracking-wider text-white/50">
                  Section {currentIndex + 1} sur {items.length}
                </span>
              </div>
            </div>

            {/* Content with improved typography */}
            {isEmpty ? (
              <div className="py-8 text-center">
                <p className="text-base text-[var(--text-muted)] italic">
                  Aucune donnée disponible pour cette section.
                </p>
              </div>
            ) : (
              <div className="prose prose-invert max-w-none">
                <p className="text-lg leading-relaxed text-white/90 whitespace-pre-wrap">
                  {currentItem.content}
                </p>
              </div>
            )}

            {/* Quick navigation chips */}
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-white/10">
              {items.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => onIndexChange(idx)}
                  className={`
                    px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                    ${idx === currentIndex
                      ? `bg-gradient-to-r ${categoryColors[item.category].gradient} text-white`
                      : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
                    }
                  `}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function Section360Overview({ analysis, className = '' }: Section360OverviewProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('summary')
  const [readingIndex, setReadingIndex] = useState(0)
  const items = buildItemsFromAnalysis(analysis)

  // Check if we have any 360° data
  const hasAnyData = items.some((item) => !!item.content)

  if (!hasAnyData) {
    return (
      <div className={`card-glass p-8 text-center ${className}`}>
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
          <Target className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
          360° Overview Not Available
        </h3>
        <p className="text-sm text-[var(--text-secondary)]">
          This analysis does not include 360° competitive intelligence data.
          <br />
          Run a deep analysis to generate comprehensive insights.
        </p>
      </div>
    )
  }

  return (
    <div className={className}>
      {/* Header with Toggle */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
              <h2 className="text-xl font-black text-[var(--text-primary)] uppercase tracking-tight">
                360° Competitive Intelligence
              </h2>
            </div>
            <p className="text-sm text-[var(--text-secondary)] ml-4">
              Comprehensive business analysis for{' '}
              <span className="font-bold text-[var(--text-primary)]">
                {analysis.competitor}
              </span>
            </p>
          </div>
          <ViewModeToggle viewMode={viewMode} onModeChange={setViewMode} />
        </div>
      </motion.div>

      {/* Content based on view mode */}
      <AnimatePresence mode="wait">
        {viewMode === 'summary' ? (
          <motion.div
            key="summary"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Bento Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {items.map((item) => (
                <Section360Card key={item.id} item={item} />
              ))}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="reading"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <ReadingView
              items={items}
              currentIndex={readingIndex}
              onIndexChange={setReadingIndex}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Section360Overview
