// =============================================================================
// DEALLIGENT PLATFORM - N8N SERVICE
// API calls to n8n CDS-RAG workflow
// =============================================================================

import type {
  N8nAnalysisRequest,
  N8nAnalysisResponse,
  FrontendSourcesState,
  StoredAnalysis,
  N8nSource,
  AnalysisDepth,
} from '../types/n8n'
import { mapSourcesToN8n, mapDepthToN8n } from '../types/n8n'

// =============================================================================
// CONSTANTS
// =============================================================================

// Use Vite proxy in dev to avoid CORS, direct URL in production
const N8N_WEBHOOK_URL = import.meta.env.DEV
  ? '/api/n8n'
  : import.meta.env.VITE_N8N_WEBHOOK_URL
// n8n workflow is synchronous and takes 2-3 minutes (calls Perplexity, Exa, etc.)
const REQUEST_TIMEOUT_MS = 180000 // 3 minutes
const STORAGE_KEY = 'dealligent_analyses'

// =============================================================================
// ERROR TYPES
// =============================================================================

export class N8nError extends Error {
  constructor(
    message: string,
    public readonly code: 'NETWORK' | 'TIMEOUT' | 'SERVER' | 'INVALID_RESPONSE',
    public readonly statusCode?: number
  ) {
    super(message)
    this.name = 'N8nError'
  }
}

// =============================================================================
// API FUNCTIONS
// =============================================================================

/**
 * Launch a competitor analysis via n8n webhook
 *
 * @param competitorName - Name of the competitor to analyze
 * @param sources - Frontend sources state (will be mapped to n8n format)
 * @param analysisType - Frontend analysis type ('quick' | 'standard' | 'deep')
 * @returns Analysis response from n8n
 * @throws N8nError on failure
 */
export async function launchAnalysis(
  competitorName: string,
  sources: FrontendSourcesState,
  analysisType: string
): Promise<N8nAnalysisResponse> {
  if (!N8N_WEBHOOK_URL) {
    throw new N8nError(
      'N8N webhook URL not configured. Check VITE_N8N_WEBHOOK_URL in .env.local',
      'NETWORK'
    )
  }

  const payload: N8nAnalysisRequest = {
    chatInput: competitorName,
    sources: mapSourcesToN8n(sources),
    depth: mapDepthToN8n(analysisType),
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new N8nError(
        `n8n returned error: ${response.status} ${response.statusText}`,
        'SERVER',
        response.status
      )
    }

    const data = await response.json()

    // Debug logging - log raw response
    console.log('[n8n] Raw response received:', JSON.stringify(data, null, 2))

    // Handle explicit error from n8n
    if (data.success === false && data.error) {
      console.error('[n8n] Server returned error:', data.error)
      throw new N8nError(data.error, 'SERVER')
    }

    // Normalize response - be permissive with format
    // If response has data but no explicit success field, treat as success
    const normalizedResponse: N8nAnalysisResponse = {
      success: data.success !== false, // true unless explicitly false
      data: data.data || data, // Use data field if exists, otherwise use whole response
      timestamp: data.timestamp || new Date().toISOString(),
    }

    console.log('[n8n] Normalized response:', {
      success: normalizedResponse.success,
      hasData: !!normalizedResponse.data,
      timestamp: normalizedResponse.timestamp,
    })

    return normalizedResponse
  } catch (error) {
    clearTimeout(timeoutId)

    if (error instanceof N8nError) {
      throw error
    }

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new N8nError(
          'Request timed out after 3 minutes',
          'TIMEOUT'
        )
      }
      throw new N8nError(
        `Network error: ${error.message}`,
        'NETWORK'
      )
    }

    throw new N8nError('Unknown error occurred', 'NETWORK')
  }
}

// =============================================================================
// STORAGE FUNCTIONS
// =============================================================================

/**
 * Generate a unique analysis ID
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

/**
 * Get all stored analyses from localStorage
 */
export function getStoredAnalyses(): StoredAnalysis[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) as StoredAnalysis[] : []
  } catch {
    return []
  }
}

/**
 * Save an analysis to localStorage
 */
export function saveAnalysis(analysis: StoredAnalysis): void {
  const analyses = getStoredAnalyses()
  const existingIndex = analyses.findIndex(a => a.id === analysis.id)

  if (existingIndex >= 0) {
    analyses[existingIndex] = analysis
  } else {
    analyses.unshift(analysis)
  }

  // Keep only last 50 analyses
  const trimmed = analyses.slice(0, 50)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed))
}

/**
 * Create a new pending analysis record
 */
export function createPendingAnalysis(
  competitor: string,
  sources: N8nSource[],
  depth: AnalysisDepth,
  estimatedDuration: number = 120
): StoredAnalysis {
  const analysis: StoredAnalysis = {
    id: generateId(),
    competitor,
    depth,
    sources,
    status: 'pending',
    createdAt: new Date().toISOString(),
    estimatedDuration,
  }

  saveAnalysis(analysis)
  return analysis
}

/**
 * Mark an analysis as completed with response data
 */
export function completeAnalysis(
  id: string,
  response: N8nAnalysisResponse
): void {
  const analyses = getStoredAnalyses()
  const analysis = analyses.find(a => a.id === id)

  if (analysis) {
    analysis.status = response.success ? 'completed' : 'failed'
    analysis.completedAt = new Date().toISOString()
    analysis.response = response
    saveAnalysis(analysis)
  }
}

/**
 * Get the most recent analysis
 */
export function getLatestAnalysis(): StoredAnalysis | null {
  const analyses = getStoredAnalyses()
  return analyses.length > 0 ? analyses[0] : null
}

/**
 * Clear all stored analyses
 */
export function clearStoredAnalyses(): void {
  localStorage.removeItem(STORAGE_KEY)
}
