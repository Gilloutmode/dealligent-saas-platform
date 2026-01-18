// =============================================================================
// DEALLIGENT PLATFORM - UI ANALYSIS TYPES
// Types for analysis display and configuration
// =============================================================================

/**
 * Interface for transformed UI analysis display
 * Aligned with n8n CDS-RAG PROD V11.2 output structure
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
  sourceLinks?: string

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
 */
export const ANALYSIS_DURATION_ESTIMATES = {
  quick: 60,      // 1 minute
  standard: 120,  // 2 minutes
  deep: 240       // 4 minutes
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
