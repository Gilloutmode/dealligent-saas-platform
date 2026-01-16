// =============================================================================
// DEALLIGENT PLATFORM - ANALYSIS CONTEXT
// Global state management for async competitive analyses
// =============================================================================

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { StoredAnalysis, FrontendSourcesState } from '../types/n8n'
import type { LaunchAnalysisConfig } from '../types/analysis'
import { ANALYSIS_DURATION_ESTIMATES } from '../types/analysis'
import {
  getStoredAnalyses,
  saveAnalysis,
  launchAnalysis as n8nLaunch,
} from '../services/n8n'
import { mapSourcesToN8n, mapDepthToN8n } from '../types/n8n'

// =============================================================================
// TYPES
// =============================================================================

interface AnalysisContextValue {
  // State
  analyses: StoredAnalysis[]
  runningAnalyses: StoredAnalysis[]
  completedAnalyses: StoredAnalysis[]
  failedAnalyses: StoredAnalysis[]

  // Actions
  launchAnalysis: (config: LaunchAnalysisConfig) => Promise<string>
  cancelAnalysis: (id: string) => void
  retryAnalysis: (id: string) => void
  clearAnalysis: (id: string) => void
  clearAllCompleted: () => void

  // Progress
  getProgress: (id: string) => number  // Returns 0-100

  // Refresh
  refreshAnalyses: () => void
}

// =============================================================================
// CONTEXT
// =============================================================================

const AnalysisContext = createContext<AnalysisContextValue | null>(null)

export function useAnalysis(): AnalysisContextValue {
  const context = useContext(AnalysisContext)
  if (!context) {
    throw new Error('useAnalysis must be used within AnalysisProvider')
  }
  return context
}

// =============================================================================
// PROVIDER
// =============================================================================

export function AnalysisProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  const [analyses, setAnalyses] = useState<StoredAnalysis[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    const stored = getStoredAnalyses()
    setAnalyses(stored)
  }, [])

  // Sync to localStorage on every change
  useEffect(() => {
    if (analyses.length > 0) {
      localStorage.setItem('dealligent_analyses', JSON.stringify(analyses))
    }
  }, [analyses])

  // Filtered lists
  const runningAnalyses = analyses.filter(a => a.status === 'running')
  const completedAnalyses = analyses.filter(a => a.status === 'completed')
  const failedAnalyses = analyses.filter(a => a.status === 'failed')

  // Refresh from localStorage
  const refreshAnalyses = useCallback(() => {
    const stored = getStoredAnalyses()
    setAnalyses(stored)
  }, [])

  // Calculate progress with logarithmic curve
  const getProgress = useCallback((id: string): number => {
    const analysis = analyses.find(a => a.id === id)
    if (!analysis) return 0
    if (analysis.status === 'completed') return 100
    if (analysis.status !== 'running' || !analysis.startedAt) return 0

    const elapsed = (Date.now() - new Date(analysis.startedAt).getTime()) / 1000
    const estimated = analysis.estimatedDuration || 120

    // Logarithmic curve: progresses fast at start, slows toward end
    // Caps at 95% until actual completion
    const progress = Math.min(
      Math.floor((1 - Math.exp(-elapsed / estimated * 2)) * 95),
      95
    )
    return progress
  }, [analyses])

  // Launch an analysis
  const launchAnalysis = useCallback(async (config: LaunchAnalysisConfig): Promise<string> => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
    const now = new Date().toISOString()

    console.log('[AnalysisContext] Starting analysis:', { id, competitor: config.competitor, type: config.analysisType })

    // Map sources to n8n format
    const frontendSources: FrontendSourcesState = {
      perplexity: config.sources.perplexity,
      exaDeep: config.sources.exa,
      serpNews: config.sources.serpNews,
      serpLinkedin: config.sources.serpLinkedIn,
      techDocs: false,
      patents: false,
    }

    // Create analysis in "running" status
    const newAnalysis: StoredAnalysis = {
      id,
      competitor: config.competitor,
      analysisType: config.analysisType,
      depth: mapDepthToN8n(config.analysisType),
      sources: mapSourcesToN8n(frontendSources),
      status: 'running',
      createdAt: now,
      startedAt: now,
      estimatedDuration: ANALYSIS_DURATION_ESTIMATES[config.analysisType],
      userChoice: config.userChoice,
    }

    setAnalyses(prev => [newAnalysis, ...prev])
    saveAnalysis(newAnalysis)
    console.log('[AnalysisContext] Analysis created with status: running')

    // Launch n8n webhook in background
    try {
      console.log('[AnalysisContext] Calling n8n webhook for:', config.competitor)
      const response = await n8nLaunch(
        config.competitor,
        frontendSources,
        config.analysisType
      )

      console.log('[AnalysisContext] n8n response received for', id, ':', {
        success: response.success,
        hasData: !!response.data,
      })

      // Mark as completed
      console.log('[AnalysisContext] Updating state to completed for:', id)
      setAnalyses(prev => prev.map(a =>
        a.id === id
          ? {
              ...a,
              status: 'completed' as const,
              completedAt: new Date().toISOString(),
              response
            }
          : a
      ))

      // Also save to localStorage
      const updatedAnalysis: StoredAnalysis = {
        ...newAnalysis,
        status: 'completed',
        completedAt: new Date().toISOString(),
        response,
      }
      saveAnalysis(updatedAnalysis)
      console.log('[AnalysisContext] Analysis completed successfully:', id)

      // Dispatch custom event for toast notification
      window.dispatchEvent(new CustomEvent('analysis-complete', {
        detail: { id, competitor: config.competitor, status: 'completed' }
      }))

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue'
      console.error('[AnalysisContext] Error during analysis', id, ':', errorMessage)

      // Mark as failed
      setAnalyses(prev => prev.map(a =>
        a.id === id
          ? { ...a, status: 'failed' as const, error: errorMessage }
          : a
      ))

      // Also save to localStorage
      const failedAnalysis: StoredAnalysis = {
        ...newAnalysis,
        status: 'failed',
        error: errorMessage,
      }
      saveAnalysis(failedAnalysis)

      // Dispatch custom event for toast notification
      window.dispatchEvent(new CustomEvent('analysis-complete', {
        detail: { id, competitor: config.competitor, status: 'failed', error: errorMessage }
      }))
    }

    return id
  }, [])

  // Cancel an analysis (just sets status, no real cancel on n8n side)
  const cancelAnalysis = useCallback((id: string) => {
    setAnalyses(prev => prev.map(a =>
      a.id === id && a.status === 'running'
        ? { ...a, status: 'failed' as const, error: 'Annulée par l\'utilisateur' }
        : a
    ))

    // Update localStorage
    const analysis = analyses.find(a => a.id === id)
    if (analysis && analysis.status === 'running') {
      saveAnalysis({
        ...analysis,
        status: 'failed',
        error: 'Annulée par l\'utilisateur',
      })
    }
  }, [analyses])

  // Retry a failed analysis
  const retryAnalysis = useCallback((id: string) => {
    const analysis = analyses.find(a => a.id === id)
    if (analysis && analysis.status === 'failed') {
      launchAnalysis({
        competitor: analysis.competitor,
        analysisType: analysis.analysisType || 'standard',
        sources: {
          perplexity: analysis.sources.includes('Perplexity'),
          exa: analysis.sources.includes('Exa'),
          serpNews: analysis.sources.includes('SerpAPI'),
          serpLinkedIn: analysis.sources.includes('SerpAPI'),
        },
        userChoice: analysis.userChoice || 'notify',
      })
    }
  }, [analyses, launchAnalysis])

  // Delete an analysis
  const clearAnalysis = useCallback((id: string) => {
    setAnalyses(prev => prev.filter(a => a.id !== id))

    // Update localStorage
    const remaining = analyses.filter(a => a.id !== id)
    localStorage.setItem('dealligent_analyses', JSON.stringify(remaining))
  }, [analyses])

  // Delete all completed analyses
  const clearAllCompleted = useCallback(() => {
    setAnalyses(prev => prev.filter(a => a.status !== 'completed'))

    // Update localStorage
    const remaining = analyses.filter(a => a.status !== 'completed')
    localStorage.setItem('dealligent_analyses', JSON.stringify(remaining))
  }, [analyses])

  const value: AnalysisContextValue = {
    analyses,
    runningAnalyses,
    completedAnalyses,
    failedAnalyses,
    launchAnalysis,
    cancelAnalysis,
    retryAnalysis,
    clearAnalysis,
    clearAllCompleted,
    getProgress,
    refreshAnalyses,
  }

  return (
    <AnalysisContext.Provider value={value}>
      {children}
    </AnalysisContext.Provider>
  )
}

export default AnalysisContext
