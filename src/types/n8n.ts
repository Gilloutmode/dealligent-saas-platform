// =============================================================================
// DEALLIGENT PLATFORM - N8N WEBHOOK TYPES
// Types for CDS-RAG workflow integration
// =============================================================================

/**
 * Available data sources for analysis
 */
export type N8nSource = 'Perplexity' | 'Exa' | 'SerpAPI'

/**
 * Analysis depth levels
 */
export type AnalysisDepth = 'standard' | 'detailed'

/**
 * Request payload sent to n8n webhook
 *
 * @example
 * {
 *   "chatInput": "nTopology",
 *   "sources": ["Perplexity", "Exa", "SerpAPI"],
 *   "depth": "detailed"
 * }
 */
export interface N8nAnalysisRequest {
  /** Competitor name to analyze */
  chatInput: string
  /** Array of data sources to use */
  sources: N8nSource[]
  /** Analysis depth level */
  depth: AnalysisDepth
}

/**
 * Competitor analysis data returned by n8n CDS-RAG workflow
 * Aligned with n8n CDS-RAG PROD V11.2 output structure
 */
export interface CompetitorAnalysisData {
  /** Competitor company name (from request) */
  competitor?: string

  /** Company headquarters location */
  headquarters: string

  /** Year the company was founded */
  foundedYear: string

  /** Competitor's key strengths */
  strengths: string[]

  /** Weaknesses compared to CDS */
  weaknessesvsCDS: string[]

  /** Recent activity and news */
  recentActivity: string[]

  /** Threat level assessment */
  threatLevel: 'HIGH' | 'MEDIUM' | 'LOW'

  /** Quality score in format "11/12 (92%)" */
  qualityScore: string

  /** Intelligence grade (e.g., "A+ - Executive Elite") */
  intelligenceGrade: string

  /** Source links used for analysis */
  sourceLinks: string

  /** Last update timestamp (ISO string) */
  lastUpdated: string

  /** Recommended action */
  actionRequired: string

  /** Analysis timestamp (ISO string) */
  timestamp: string

  /** Allow additional properties for flexibility */
  [key: string]: unknown
}

/**
 * Response payload from n8n webhook
 *
 * @example
 * {
 *   "success": true,
 *   "data": {
 *     "competitor": "nTopology",
 *     "threatLevel": "HIGH",
 *     "strengths": [...],
 *     "weaknessesvsCDS": [...]
 *   },
 *   "timestamp": "2025-01-16T10:30:00Z"
 * }
 */
export interface N8nAnalysisResponse {
  success: boolean
  data?: CompetitorAnalysisData
  error?: string
  timestamp: string
}

/**
 * Frontend sources state (booleans)
 */
export interface FrontendSourcesState {
  perplexity: boolean
  exaDeep: boolean
  serpNews: boolean
  serpLinkedin: boolean
  techDocs: boolean
  patents: boolean
}

/**
 * Maps frontend boolean sources to n8n source array
 */
export function mapSourcesToN8n(sources: FrontendSourcesState): N8nSource[] {
  const result: N8nSource[] = []

  if (sources.perplexity) result.push('Perplexity')
  if (sources.exaDeep) result.push('Exa')
  if (sources.serpNews || sources.serpLinkedin) result.push('SerpAPI')

  return result
}

/**
 * Maps frontend analysis type to n8n depth
 */
export function mapDepthToN8n(analysisType: string): AnalysisDepth {
  switch (analysisType) {
    case 'deep':
      return 'detailed'
    case 'quick':
    case 'standard':
    default:
      return 'standard'
  }
}

/**
 * Frontend analysis type
 */
export type AnalysisType = 'quick' | 'standard' | 'deep'

/**
 * User choice for waiting behavior
 */
export type UserWaitChoice = 'wait' | 'notify'

/**
 * Stored analysis record for localStorage
 */
export interface StoredAnalysis {
  id: string
  competitor: string
  depth: AnalysisDepth
  sources: N8nSource[]
  createdAt: string
  completedAt?: string
  response?: N8nAnalysisResponse

  // Status now includes 'running' for async workflows
  status: 'pending' | 'running' | 'completed' | 'failed'

  // New fields for async workflow support
  startedAt?: string              // ISO date when webhook was called
  estimatedDuration: number       // In seconds (60, 120, 240 by type)
  userChoice?: UserWaitChoice     // User's waiting preference
  error?: string                  // Error message if status = failed
  analysisType?: AnalysisType     // Frontend analysis type
}
