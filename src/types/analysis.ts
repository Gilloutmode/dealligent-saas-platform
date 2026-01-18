// =============================================================================
// DEALLIGENT PLATFORM - UI ANALYSIS TYPES
// Types for analysis display and configuration
// =============================================================================

import type { StructuredSourceLink } from './n8n'

/**
 * Interface for transformed UI analysis display
 * Aligned with n8n CDS-RAG DASHBOARD V12.2 output structure
 */
export interface UIAnalysisResult {
  id: string
  title: string
  status: 'pending' | 'running' | 'completed' | 'failed'
  createdAt: Date
  completedAt?: Date
  duration: string  // Formatted: "2 min 30s" or "En cours..."

  // Metadata
  type: 'quick' | 'standard' | 'deep'
  analysisType?: 'quick' | 'standard' | 'deep'  // Alias for type
  competitor: string
  sources: string[]

  // Company Info (from n8n)
  headquarters?: string
  foundedYear?: string

  // Results (only if completed)
  score?: number           // 0-100
  insights: number         // Total insights count
  threatLevel: 'high' | 'medium' | 'low'

  // n8n Quality Metrics
  qualityScore?: string        // "11/12 (92%)"
  intelligenceGrade?: string   // "A+ - Executive Elite"
  actionRequired?: string      // "Periodic review"
  lastUpdated?: string         // ISO timestamp

  // ===========================================
  // 360° OVERVIEW - Phase 3 (n8n V12.1)
  // ===========================================

  /** Business model description */
  businessModel?: string

  /** Financial health assessment */
  financialHealth?: string

  /** Market position analysis */
  marketPosition?: string

  /** Product strategy overview */
  productStrategy?: string

  /** Technology approach and stack */
  technologyApproach?: string

  /** Target customer profile */
  targetCustomerProfile?: string

  /** Sales approach and methodology */
  salesApproach?: string

  /** Competitor's marketing claims */
  competitorClaims?: string

  /** Opportunities for CDS against this competitor */
  cdsOpportunities?: string

  /** Recommended messaging for sales team */
  recommendedMessaging?: string

  // Competitive Analysis (2-column: strengths vs weaknesses)
  analysisData: {
    strengths: string[]
    weaknesses: string[]  // weaknessesvsCDS from n8n
  }

  // Recent Activity (renamed from recentNews)
  recentActivity: string[]

  // Findings (derived from analysis)
  keyFindings: string[]

  // Source Links
  sourceLinks?: string  // Legacy format (comma-separated URLs)

  /** Structured source links from n8n V12.2 (with optional category) */
  sourceLinksStructured?: StructuredSourceLink[]

  // Error (if failed)
  error?: string
}

/**
 * Configuration for launching an analysis
 */
export interface LaunchAnalysisConfig {
  competitor: string
  analysisType: 'quick' | 'standard' | 'deep'
  sources: {
    perplexity: boolean
    exa: boolean
    serpNews: boolean
    serpLinkedIn: boolean
  }
  userChoice: 'wait' | 'notify'
}

/**
 * Estimated durations by analysis type (in seconds)
 * Updated 2026-01-18: Increased to match real n8n V12.1 execution times (~3:36)
 */
export const ANALYSIS_DURATION_ESTIMATES = {
  quick: 120,     // 2 minutes
  standard: 240,  // 4 minutes (actual ~3:36)
  deep: 360       // 6 minutes
} as const

/**
 * Analysis type display metadata
 */
export const ANALYSIS_TYPE_META = {
  quick: {
    label: 'Veille rapide',
    description: 'Aperçu instantané des actualités',
    icon: 'Zap',
    color: 'blue',
  },
  standard: {
    label: 'Analyse concurrentielle',
    description: 'Analyse complète multi-sources',
    icon: 'Search',
    color: 'purple',
  },
  deep: {
    label: 'Analyse approfondie',
    description: 'Investigation exhaustive',
    icon: 'Target',
    color: 'orange',
  },
} as const

/**
 * Status display metadata
 */
export const ANALYSIS_STATUS_META = {
  pending: {
    label: 'En attente',
    color: 'gray',
    icon: 'Clock',
  },
  running: {
    label: 'En cours',
    color: 'blue',
    icon: 'Loader',
  },
  completed: {
    label: 'Terminée',
    color: 'green',
    icon: 'CheckCircle',
  },
  failed: {
    label: 'Échec',
    color: 'red',
    icon: 'XCircle',
  },
} as const
