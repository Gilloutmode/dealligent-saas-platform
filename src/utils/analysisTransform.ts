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
 * Calculate quality score based on completeness of data
 */
function calculateScore(data?: StoredAnalysis['response']): number {
  if (!data?.data) return 0

  const d = data.data
  let score = 0

  if (d.strengths?.length > 0) score += 15
  if (d.weaknessesvsCDS?.length > 0) score += 15
  if (d.opportunities?.length > 0) score += 15
  if (d.threats?.length > 0) score += 15
  if (d.marketPosition) score += 15
  if ((d.recentNews?.length ?? 0) > 0) score += 10
  if ((d.technologies?.length ?? 0) > 0) score += 10
  if (d.pricing) score += 5

  return Math.min(score, 100)
}

/**
 * Transform a StoredAnalysis (localStorage) to UIAnalysisResult (display)
 */
export function transformStoredToUI(stored: StoredAnalysis): UIAnalysisResult {
  const data = stored.response?.data

  // Count total insights
  const insightsCount = data
    ? (data.strengths?.length || 0) +
      (data.weaknessesvsCDS?.length || 0) +
      (data.opportunities?.length || 0) +
      (data.threats?.length || 0)
    : 0

  return {
    id: stored.id,
    title: `Analyse - ${stored.competitor}`,
    status: stored.status,
    createdAt: new Date(stored.createdAt),
    completedAt: stored.completedAt ? new Date(stored.completedAt) : undefined,
    duration: formatDuration(stored.startedAt, stored.completedAt, stored.status),

    type: stored.analysisType || 'standard',
    competitor: stored.competitor,
    sources: stored.sources || [],

    score: stored.status === 'completed' ? calculateScore(stored.response) : undefined,
    insights: insightsCount,
    threatLevel: mapThreatLevel(data?.threatLevel),

    marketPosition: {
      strengths: data?.strengths || [],
      weaknesses: data?.weaknessesvsCDS || [],
      opportunities: data?.opportunities || [],
      threats: data?.threats || [],
    },

    keyFindings: [
      ...(data?.strengths?.slice(0, 2) || []),
      ...(data?.weaknessesvsCDS?.slice(0, 2) || []),
    ],
    recommendations: data?.opportunities || [],
    recentNews: (data?.recentNews || []).map((news: string) => ({
      title: news,
      source: 'n8n Analysis',
      date: new Date().toLocaleDateString('fr-FR'),
      sentiment: 'neutral' as const,
    })),

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
