import React from 'react'
import { Highlight, type HighlightVariant } from '../components/ui/Highlight'

// =============================================================================
// HIGHLIGHT TEXT UTILITY - SENTENCE-BASED (3 TYPES)
// Highlights: Risk (red), Opportunity (green), Compare (blue)
// =============================================================================

/**
 * Finds the highlight variant for a sentence based on keyword priority
 * Priority: risk > opportunity > compare
 * @param sentence - The sentence to check
 * @returns HighlightVariant or null if no keyword found
 */
function findSentenceVariant(sentence: string): HighlightVariant | null {
  // Priority 1: Risk/threat keywords - Red
  if (/\b(risque|risques|menace|menaces|threat|threats|danger|vulnerability|vulnerable)\b/i.test(sentence)) {
    return 'risk'
  }

  // Priority 2: Opportunity keywords - Green
  if (/\b(opportunit[ée]s?|opportunity|opportunities|potentiel|potential|avantage|advantage)\b/i.test(sentence)) {
    return 'opportunity'
  }

  // Priority 3: Comparison keywords - Blue
  if (/\b(vs\.?|versus|compar[ée]|compared?|comparison|face [àa]|contre)\b/i.test(sentence)) {
    return 'compare'
  }

  return null
}

/**
 * Parses text and highlights entire sentences containing keywords
 * Sentences without keywords are displayed as normal text
 * @param text - The text to parse and highlight
 * @returns ReactNode array with highlighted sentences
 */
export function highlightText(text: string | undefined): React.ReactNode {
  if (!text) return null

  // Split by sentences (keep punctuation attached)
  // Handles ., !, ? followed by space or end of string
  const sentences = text.split(/(?<=[.!?])\s+/)

  if (sentences.length === 0) return text

  const result: React.ReactNode[] = []

  sentences.forEach((sentence, idx) => {
    const trimmedSentence = sentence.trim()
    if (!trimmedSentence) return

    const variant = findSentenceVariant(trimmedSentence)

    if (variant) {
      // Highlight the entire sentence
      result.push(
        <Highlight key={`sentence-${idx}`} variant={variant}>
          {trimmedSentence}
        </Highlight>
      )
    } else {
      // Normal text - no keyword found
      result.push(
        <React.Fragment key={`text-${idx}`}>
          {trimmedSentence}
        </React.Fragment>
      )
    }

    // Add space between sentences (except after last)
    if (idx < sentences.length - 1) {
      result.push(' ')
    }
  })

  return result.length > 0 ? result : text
}

/**
 * Checks if text contains any highlightable keywords
 * Useful for conditional rendering
 */
export function hasHighlightableKeywords(text: string | undefined): boolean {
  if (!text) return false
  return findSentenceVariant(text) !== null
}

/**
 * Gets the primary variant for a block of text (for styling purposes)
 */
export function getPrimaryVariant(text: string | undefined): HighlightVariant | null {
  if (!text) return null
  return findSentenceVariant(text)
}
