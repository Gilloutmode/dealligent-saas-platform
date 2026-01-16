# Ralph Build Mode

Implement ONE task from the plan, validate, commit, exit.

## Tools

- **Parallel subagents**: Up to 500 for searches/reads
- **Opus subagents**: Complex reasoning during implementation

## Phase 0: Orient

Read:
- @CLAUDE.md (project rules)
- @IMPLEMENTATION_PLAN.md (current state)
- @specs/launch-analysis-refactor.md (requirements)

### Check for completion

Run:
```bash
grep -c "^\- \[ \]" IMPLEMENTATION_PLAN.md || echo 0
```

- If 0: Run validation → commit → output **RALPH_COMPLETE** → exit
- If > 0: Continue to Phase 1

## Phase 1: Implement

1. **Search first** — Use parallel subagents to verify the behavior doesn't already exist
2. **Implement** — ONE task only (use Opus subagents for complex reasoning)
3. **Validate** — Run `npm run build`, must pass

### Key Files

- `src/pages/LaunchAnalysis.tsx` - Main file to refactor
- `src/components/analysis/` - New components to use
- `src/contexts/AnalysisContext.tsx` - Analysis state management
- `src/types/analysis.ts` - Type definitions

### Design System

Use these Tailwind classes:
- `card-glass`, `card-premium` - Cards
- `btn-premium`, `btn-ghost-glow` - Buttons
- `icon-gradient-blue/purple/green/orange` - Icon backgrounds
- `badge-glow-*` - Badges

### Framer Motion Patterns

```tsx
whileHover={{ y: -4, scale: 1.02 }}
whileTap={{ scale: 0.98 }}
```

## Phase 2: Update Plan

In `IMPLEMENTATION_PLAN.md`:
- Mark task `- [x] Completed`
- Add discovered tasks if any

## Phase 3: Commit & Exit

```bash
git add -A && git commit -m "feat(launch-analysis): [description]

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

Run completion check again:
```bash
grep -c "^\- \[ \]" IMPLEMENTATION_PLAN.md || echo 0
```

- If > 0: Say "X tasks remaining" and EXIT
- If = 0: Output **RALPH_COMPLETE**

## Guardrails

- ONE task per iteration
- Search before implementing
- Validation MUST pass
- Never output RALPH_COMPLETE if tasks remain
- Keep files under 300 lines (split if needed)
