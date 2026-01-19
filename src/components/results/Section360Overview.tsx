// =============================================================================
// DEALLIGENT PLATFORM - SECTION 360° OVERVIEW
// Simplified vertical list layout for PDF-style reading
// =============================================================================

import { motion } from 'framer-motion'
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
  type LucideIcon,
} from 'lucide-react'
import type { UIAnalysisResult } from '../../types/analysis'
import { highlightText } from '../../utils/highlightText'

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
    gradient: 'from-blue-500 to-cyan-500',
    border: 'border-blue-500/30',
  },
  purple: {
    gradient: 'from-purple-500 to-pink-500',
    border: 'border-purple-500/30',
  },
  green: {
    gradient: 'from-green-500 to-emerald-500',
    border: 'border-green-500/30',
  },
  amber: {
    gradient: 'from-amber-500 to-orange-500',
    border: 'border-amber-500/30',
  },
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

// =============================================================================
// HELPER: Build items from analysis data
// =============================================================================

function buildItemsFromAnalysis(analysis: UIAnalysisResult): Section360Item[] {
  return [
    // Business (Blue)
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
    // Product/Strategy (Purple)
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
    // Sales/Market (Green)
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
    // Opportunities (Amber)
    {
      id: 'cdsOpportunities',
      title: 'CDS Opportunities',
      content: analysis.cdsOpportunities,
      icon: Lightbulb,
      category: 'amber',
    },
    {
      id: 'recommendedMessaging',
      title: 'Recommended Messaging',
      content: analysis.recommendedMessaging,
      icon: Megaphone,
      category: 'amber',
    },
  ]
}

// =============================================================================
// SECTION 360 LIST ITEM COMPONENT
// =============================================================================

interface Section360ListItemProps {
  item: Section360Item
}

function Section360ListItem({ item }: Section360ListItemProps) {
  const colors = categoryColors[item.category]
  const Icon = item.icon
  const isEmpty = !item.content

  return (
    <motion.div
      variants={itemVariants}
      className={`pl-4 border-l-2 ${colors.border}`}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 rounded-lg bg-gradient-to-br ${colors.gradient}`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-[var(--text-primary)]">
          {item.title}
        </h3>
      </div>
      {isEmpty ? (
        <p className="text-sm text-[var(--text-muted)] italic ml-11">
          No data available
        </p>
      ) : (
        <p className="text-lg leading-loose text-[var(--text-primary)] ml-11">
          {highlightText(item.content)}
        </p>
      )}
    </motion.div>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function Section360Overview({ analysis, className = '' }: Section360OverviewProps) {
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
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">
            360° Competitive Intelligence
          </h2>
        </div>
        <p className="text-sm text-[var(--text-secondary)] ml-4">
          Comprehensive business analysis for{' '}
          <span className="font-semibold text-[var(--text-primary)]">
            {analysis.competitor}
          </span>
        </p>
      </motion.div>

      {/* Vertical List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {items.map((item) => (
          <Section360ListItem key={item.id} item={item} />
        ))}
      </motion.div>
    </div>
  )
}

export default Section360Overview
