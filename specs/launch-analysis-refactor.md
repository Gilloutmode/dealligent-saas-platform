# Specification: LaunchAnalysis Refactoring - Wizard to Single Form

## Overview

Refactor `src/pages/LaunchAnalysis.tsx` from a 4-step wizard with fake animation to a single-page form with collapsible sections, integrated with the async analysis management system.

## User Stories

- [ ] As a user, I can see all analysis options on a single page
- [ ] As a user, I can expand/collapse sections to focus on what I'm configuring
- [ ] As a user, I see a sticky footer with my selections summary
- [ ] As a user, I can choose "Wait" or "Notify" after launching
- [ ] As a user, I see a progress overlay if I choose "Wait"
- [ ] As a user, I'm redirected to /my-analyses if I choose "Notify"

## Acceptance Criteria

### Structure Changes
- [ ] Remove `step` state and step navigation
- [ ] Remove `LaunchAnimation` component (fake 6.5s animation)
- [ ] Remove "Précédent" / "Continuer" buttons
- [ ] Remove step indicator bar

### New UI Structure
- [ ] 4 CollapsibleSections: Type, Competitor, Sources, Advanced
- [ ] Section 1 (Type) and Section 2 (Competitor) expanded by default
- [ ] Section 3 (Sources) and Section 4 (Advanced) collapsed by default
- [ ] Sticky footer with summary + launch button

### Integration
- [ ] Use `useAnalysis().launchAnalysis()` from context
- [ ] Use `useSavedPreference()` for remembered choice
- [ ] Show `LaunchChoiceModal` on launch click
- [ ] Show `ProgressOverlay` if choice is "wait"
- [ ] Navigate to `/my-analyses` if choice is "notify"

### Validation Flow
- [ ] Type selection marks Section 1 as valid, auto-expands Section 2
- [ ] Competitor selection marks Section 2 as valid
- [ ] Launch button disabled until type AND competitor selected
- [ ] Sources default to 4 active (all true)

## Technical Constraints

- Maximum 300 lines per file (may need to split into sub-components)
- Use existing components from `src/components/analysis/`
- Use existing `Switch` from `src/components/ui/FormControls.tsx`
- Preserve existing analysis types and competitor data

## Out of Scope

- Multi-competitor selection (MVP = single competitor)
- Advanced options implementation (placeholder for now)
- Real notification system (just navigation)
