// =============================================================================
// DEALLIGENT PLATFORM - ANALYSIS TRANSFORM UTILS
// Transform stored analyses to UI display format
// =============================================================================

import type { StoredAnalysis } from '../types/n8n'
import type { UIAnalysisResult } from '../types/analysis'

/**
 * Format duration from milliseconds to human-readable string
 */
function formatDuration(startedAt?: string, completedAt?: string, status?: string): string {
  if (status === 'running') return 'En cours...'
  if (status === 'pending') return 'En attente...'
  if (!startedAt || !completedAt) return '-'

  const ms = new Date(completedAt).getTime() - new Date(startedAt).getTime()
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  if (minutes > 0) {
    return `${minutes} min ${remainingSeconds}s`
  }
  return `${seconds}s`
}

/**
 * Map threat level from API format to UI format
 */
function mapThreatLevel(level?: string): 'high' | 'medium' | 'low' {
  switch (level?.toUpperCase()) {
    case 'HIGH':
      return 'high'
    case 'MEDIUM':
      return 'medium'
    default:
      return 'low'
  }
}

/**
 * Parse quality score from n8n format (e.g., "11/12 (92%)") to percentage
 */
function parseQualityScore(qualityScore?: string): number {
  if (!qualityScore) return 0

  // Try to extract percentage from format like "11/12 (92%)"
  const percentMatch = qualityScore.match(/\((\d+)%\)/)
  if (percentMatch) {
    return parseInt(percentMatch[1], 10)
  }

  // Try to extract fraction like "11/12"
  const fractionMatch = qualityScore.match(/(\d+)\/(\d+)/)
  if (fractionMatch) {
    const num = parseInt(fractionMatch[1], 10)
    const denom = parseInt(fractionMatch[2], 10)
    return Math.round((num / denom) * 100)
  }

  return 0
}

/**
 * Calculate quality score based on n8n qualityScore or data completeness
 */
function calculateScore(data?: StoredAnalysis['response']): number {
  if (!data?.data) return 0

  const d = data.data

  // Use n8n qualityScore if available
  if (d.qualityScore) {
    return parseQualityScore(d.qualityScore as string)
  }

  // Fallback: calculate based on data completeness
  let score = 0

  if (d.strengths?.length > 0) score += 25
  if (d.weaknessesvsCDS?.length > 0) score += 25
  if (d.recentActivity?.length > 0) score += 20
  if (d.headquarters) score += 10
  if (d.foundedYear) score += 10
  if (d.intelligenceGrade) score += 10

  return Math.min(score, 100)
}

/**
 * Transform a StoredAnalysis (localStorage) to UIAnalysisResult (display)
 * Aligned with n8n CDS-RAG PROD V11.2 output structure
 */
export function transformStoredToUI(stored: StoredAnalysis): UIAnalysisResult {
  const data = stored.response?.data

  // Count total insights (strengths + weaknesses + recentActivity)
  const insightsCount = data
    ? (data.strengths?.length || 0) +
      (data.weaknessesvsCDS?.length || 0) +
      (data.recentActivity?.length || 0)
    : 0

  return {
    id: stored.id,
    title: `Analyse - ${stored.competitor}`,
    status: stored.status,
    createdAt: new Date(stored.createdAt),
    completedAt: stored.completedAt ? new Date(stored.completedAt) : undefined,
    duration: formatDuration(stored.startedAt, stored.completedAt, stored.status),

    type: stored.analysisType || 'standard',
    analysisType: stored.analysisType || 'standard',
    competitor: stored.competitor,
    sources: stored.sources || [],

    // Company info from n8n
    headquarters: data?.headquarters as string | undefined,
    foundedYear: data?.foundedYear as string | undefined,

    score: stored.status === 'completed' ? calculateScore(stored.response) : undefined,
    insights: insightsCount,
    threatLevel: mapThreatLevel(data?.threatLevel),

    // n8n quality metrics
    qualityScore: data?.qualityScore as string | undefined,
    intelligenceGrade: data?.intelligenceGrade as string | undefined,
    actionRequired: data?.actionRequired as string | undefined,
    lastUpdated: data?.lastUpdated as string | undefined,

    // Competitive analysis (2-column structure)
    analysisData: {
      strengths: (data?.strengths as string[]) || [],
      weaknesses: (data?.weaknessesvsCDS as string[]) || [],
    },

    // Recent activity (renamed from recentNews)
    recentActivity: (data?.recentActivity as string[]) || [],

    // Key findings derived from strengths and weaknesses
    keyFindings: [
      ...(data?.strengths?.slice(0, 2) || []),
      ...(data?.weaknessesvsCDS?.slice(0, 2) || []),
    ],

    // Source links
    sourceLinks: data?.sourceLinks as string | undefined,

    error: stored.error,
  }
}

/**
 * Transform all stored analyses to UI format
 */
export function transformAllToUI(stored: StoredAnalysis[]): UIAnalysisResult[] {
  return stored.map(transformStoredToUI)
}

/**
 * Get analyses by status
 */
export function filterByStatus(
  analyses: UIAnalysisResult[],
  status: 'pending' | 'running' | 'completed' | 'failed'
): UIAnalysisResult[] {
  return analyses.filter(a => a.status === status)
}

/**
 * Sort analyses by date (newest first)
 */
export function sortByDate(analyses: UIAnalysisResult[]): UIAnalysisResult[] {
  return [...analyses].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}

/**
 * Get summary statistics for analyses
 */
export function getAnalysisSummary(analyses: UIAnalysisResult[]): {
  total: number
  running: number
  completed: number
  failed: number
  averageScore: number
  totalInsights: number
} {
  const completed = analyses.filter(a => a.status === 'completed')
  const scores = completed.map(a => a.score || 0)
  const averageScore = scores.length > 0
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    : 0

  return {
    total: analyses.length,
    running: analyses.filter(a => a.status === 'running').length,
    completed: completed.length,
    failed: analyses.filter(a => a.status === 'failed').length,
    averageScore,
    totalInsights: analyses.reduce((sum, a) => sum + a.insights, 0),
  }
}
