# N8N Integration - Full System

## Overview

Connect the LaunchAnalysis.tsx page to the n8n webhook to enable real competitive intelligence analyses. This includes a complete system with queue management, retry logic, and real-time notifications.

## User Stories

- [ ] As a user, I can launch an analysis that sends a real request to n8n
- [ ] As a user, I see a success/error toast after launching an analysis
- [ ] As a user, my analysis_id is stored so I can track it later
- [ ] As a user, I can queue multiple analyses if one is already running
- [ ] As a user, failed requests are automatically retried
- [ ] As a user, I see the status of my queued analyses

## Technical Requirements

### Environment Configuration
- `.env.local` with `VITE_N8N_WEBHOOK_URL` pointing to test webhook
- Type declaration in `vite-env.d.ts` for environment variable

### Type Definitions (`src/types/n8n.ts`)
```typescript
export interface AnalysisRequest {
  analysis_type: 'competitor' | 'product' | 'market' | 'technology';
  competitors: string[];
  sources: SourceConfig;
  company_context?: CompanyContext;
}

export interface AnalysisResponse {
  success: boolean;
  analysis_id: string;
  message?: string;
  estimated_duration?: number;
}

export interface QueuedAnalysis {
  id: string;
  request: AnalysisRequest;
  status: 'pending' | 'running' | 'completed' | 'failed';
  retryCount: number;
  createdAt: number;
  analysisId?: string;
}
```

### Service Layer (`src/services/n8n.ts`)
- `launchAnalysis(request)` - POST to webhook with timeout
- `getAnalysisQueue()` - Get queued analyses from localStorage
- `addToQueue(request)` - Add analysis to queue
- `processQueue()` - Process pending items with retry logic
- Error handling with typed exceptions

### UI Integration
- Refactor analysis types to match n8n expectations
- Map UI selection to correct `analysis_type` value
- Call `launchAnalysis()` in `handleLaunchAnalysis()`
- Show toast on success/error using existing `useToastActions()`
- Store `analysis_id` in localStorage for Results page

## Acceptance Criteria

1. Clicking "Lancer l'analyse" sends POST request to n8n webhook
2. Payload contains: `analysis_type`, `competitors`, `sources`, `company_context`
3. Success toast shows with analysis_id
4. Error toast shows with retry option on failure
5. analysis_id stored in localStorage as `dealligent_last_analysis_id`
6. Queue persisted in localStorage as `dealligent_analysis_queue`
7. TypeScript compiles without errors
8. ESLint passes without errors

## Edge Cases

- Network timeout (30s) triggers retry
- n8n returns error response - show error toast
- User launches multiple analyses quickly - queue them
- Browser refresh - queue restored from localStorage
- Invalid response format - graceful error handling

## Out of Scope

- Real-time websocket updates from n8n
- Results page integration (separate task)
- Authentication/tenant headers (future)
