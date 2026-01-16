# Implementation Plan: LaunchAnalysis Refactoring

> **Scope**: Single file refactor | **Risk**: Aggressive | **Validation**: npm run build

## Summary

Refactor LaunchAnalysis.tsx from a 4-step wizard with fake animation to a single-page form with 4 CollapsibleSections, sticky footer, and integration with AnalysisContext for async analysis management.

## Tasks

- [x] Task 1: Remove wizard infrastructure (step state, LaunchAnimation component, step indicator, prev/next buttons)
- [x] Task 2: Create new state structure (expandedSection, analysisType, selectedCompetitor, sources, modals)
- [x] Task 3: Extract AnalysisTypeCard to separate file or keep inline, simplify for single-page use
- [x] Task 4: Implement Section 1 (Type d'analyse) with CollapsibleSection wrapper
- [x] Task 5: Implement Section 2 (Concurrent à analyser) with single-select competitor grid
- [x] Task 6: Implement Section 3 (Sources de données) with Switch toggles
- [ ] Task 7: Implement Section 4 (Options avancées) as placeholder with CollapsibleSection
- [x] Task 8: Implement sticky footer with summary and launch button
- [x] Task 9: Integrate LaunchChoiceModal and useSavedPreference
- [x] Task 10: Integrate ProgressOverlay for "wait" choice
- [x] Task 11: Add navigation to /my-analyses for "notify" choice
- [ ] Task 12: Final cleanup and build validation

## Notes

- Task 3: Extracted AnalysisTypeCard.tsx and SourceCard.tsx to src/components/analysis/
- Tasks 4-6: Implemented as static sections (always visible) rather than CollapsibleSection wrappers for simpler UX
- LaunchAnalysis.tsx reduced from 525 lines to 345 lines

## Component Dependencies

```
src/components/analysis/
├── CollapsibleSection.tsx  ✓
├── LaunchChoiceModal.tsx   ✓
├── ProgressOverlay.tsx     ✓
├── AnalysisTypeCard.tsx    ✓ (NEW)
├── SourceCard.tsx          ✓ (NEW)
└── useSavedPreference      ✓ (exported from LaunchChoiceModal)

src/contexts/AnalysisContext.tsx
└── useAnalysis().launchAnalysis(config)  ✓

src/components/ui/FormControls.tsx
└── Switch  ✓

src/types/analysis.ts
└── ANALYSIS_DURATION_ESTIMATES  ✓
```

## New State Structure

```typescript
// Expanded section (only one at a time)
const [expandedSection, setExpandedSection] = useState<string | null>('type')

// Form data
const [analysisType, setAnalysisType] = useState<'quick' | 'standard' | 'deep' | null>(null)
const [selectedCompetitor, setSelectedCompetitor] = useState<string | null>(null)
const [sources, setSources] = useState({
  perplexity: true,
  exa: true,
  serpNews: true,
  serpLinkedIn: true,
})

// UI state
const [showChoiceModal, setShowChoiceModal] = useState(false)
const [showProgressOverlay, setShowProgressOverlay] = useState(false)
const [currentAnalysisId, setCurrentAnalysisId] = useState<string | null>(null)
```

## Validation Command

```bash
npm run build
```
