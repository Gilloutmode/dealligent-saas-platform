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
// n8n workflow is synchronous and takes ~3:36 (calls Perplexity, Exa, Claude, etc.)
const REQUEST_TIMEOUT_MS = 300000 // 5 minutes (workflow takes ~3:36)
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
// ASYNC POLLING API (pour contourner le timeout Cloudflare 100s)
// =============================================================================

const N8N_STATUS_URL = import.meta.env.DEV
  ? '/api/n8n-status'
  : import.meta.env.VITE_N8N_STATUS_URL

/**
 * Lance une analyse en mode async
 * Le workflow n8n répond immédiatement avec un executionId (202 Accepted)
 * puis continue le traitement en arrière-plan
 */
export async function launchAnalysisAsync(
  competitorName: string,
  sources: FrontendSourcesState,
  analysisType: string
): Promise<{ executionId: string; jobId: string }> {
  if (!N8N_WEBHOOK_URL) {
    throw new N8nError('N8N webhook URL not configured', 'NETWORK')
  }

  const payload: N8nAnalysisRequest = {
    chatInput: competitorName,
    sources: mapSourcesToN8n(sources),
    depth: mapDepthToN8n(analysisType),
  }

  console.log('[n8n] Launching async analysis for:', competitorName)

  const response = await fetch(N8N_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new N8nError(`Launch failed: ${response.status}`, 'SERVER', response.status)
  }

  const data = await response.json()
  console.log('[n8n] Launch response:', data)

  // Extraire executionId de la réponse 202
  const executionId = data.data?.executionId || data.executionId
  const jobId = data.data?.jobId || data.jobId || executionId

  if (!executionId) {
    console.error('[n8n] No executionId in response:', data)
    throw new N8nError('No executionId returned from n8n', 'INVALID_RESPONSE')
  }

  console.log('[n8n] Got executionId:', executionId)
  return { executionId, jobId }
}

/**
 * Vérifie le statut d'une analyse via le webhook status
 */
export async function checkAnalysisStatus(
  executionId: string
): Promise<{
  status: 'processing' | 'completed' | 'failed' | 'not_found'
  result?: N8nAnalysisResponse
  error?: string
}> {
  if (!N8N_STATUS_URL) {
    throw new N8nError('N8N status URL not configured', 'NETWORK')
  }

  console.log('[n8n] Checking status for:', executionId)

  const response = await fetch(`${N8N_STATUS_URL}?executionId=${executionId}`)

  if (!response.ok) {
    throw new N8nError(`Status check failed: ${response.status}`, 'SERVER', response.status)
  }

  const data = await response.json()
  console.log('[n8n] Status response:', data)

  return {
    status: data.data?.status || 'not_found',
    result: data.data?.result,
    error: data.data?.error,
  }
}

/**
 * Poll jusqu'à ce que l'analyse soit terminée
 * @param executionId - ID de l'exécution n8n
 * @param options - Options de polling (maxAttempts, pollInterval, onProgress)
 */
export async function pollForResults(
  executionId: string,
  options: {
    maxAttempts?: number
    pollInterval?: number
    onProgress?: (attempt: number, maxAttempts: number) => void
  } = {}
): Promise<N8nAnalysisResponse> {
  const { maxAttempts = 30, pollInterval = 10000, onProgress } = options

  console.log('[n8n] Starting polling for:', executionId, { maxAttempts, pollInterval })

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    if (onProgress) onProgress(attempt, maxAttempts)

    console.log(`[n8n] Poll attempt ${attempt}/${maxAttempts}`)

    try {
      const status = await checkAnalysisStatus(executionId)

      if (status.status === 'completed' && status.result) {
        console.log('[n8n] Analysis completed!')
        return status.result
      }

      if (status.status === 'failed') {
        throw new N8nError(status.error || 'Analysis failed', 'SERVER')
      }

      // Still processing or not found, wait and retry
      if (attempt < maxAttempts) {
        console.log(`[n8n] Status: ${status.status}, waiting ${pollInterval}ms...`)
        await new Promise(resolve => setTimeout(resolve, pollInterval))
      }
    } catch (error) {
      // Si erreur de polling, continuer à essayer (sauf si c'est une N8nError avec code SERVER)
      if (error instanceof N8nError && error.code === 'SERVER') {
        throw error
      }
      console.warn(`[n8n] Poll attempt ${attempt} failed, retrying...`, error)
      if (attempt < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, pollInterval))
      }
    }
  }

  throw new N8nError(`Analysis timeout after ${maxAttempts} polling attempts`, 'TIMEOUT')
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
