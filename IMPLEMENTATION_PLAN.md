# Implementation Plan: n8n Webhook Configuration CDS-RAG PROD V11.2

> **Scope**: n8n config only | **Risk**: Conservative | **Validation**: Manual curl testing

## Summary

Configurer le workflow n8n existant CDS-RAG PROD V11.2 pour recevoir les requetes JSON du frontend Dealligent via webhook, generer un analysis_id, et retourner une reponse immediate pendant que l'analyse s'execute en arriere-plan.

## Tasks

- [x] Task 1: Creer le fichier de configuration n8n detaille (n8n-config/webhook-setup.md)
- [x] Task 2: Creer le script de test curl (n8n-config/test-webhook.sh)
- [x] Task 3: Documenter le mapping des champs vers le workflow existant
- [x] Task 4: Fix script macOS compatibility (head -n -1 → sed)
- [ ] Task 5: Tester webhook (REQUIRES: n8n workflow in test mode)
- [ ] Task 6: Valider la reponse JSON {success, analysis_id, estimated_duration}

## Prerequisites for Testing

> **Important**: Tasks 5-6 require the n8n workflow to be in test mode.
>
> 1. Go to https://gilloutmode.app.n8n.cloud
> 2. Open workflow: **CDS-RAG PROD - V11.2**
> 3. Click "Execute workflow" button (enables webhook-test URL)
> 4. Run: `./n8n-config/test-webhook.sh basic`

## n8n Node Configuration

### Webhook Node Settings

```yaml
Node: Webhook
HTTP Method: POST
Path: 61ea8949-d762-49f1-8f5c-75169b5a4190
Authentication: None (MVP)
Response Mode: Using 'Respond to Webhook' Node
```

### Code Node - UUID Generation

```javascript
// Node: Generate Analysis ID
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

return {
  json: {
    ...items[0].json,
    analysis_id: generateUUID(),
    received_at: new Date().toISOString()
  }
};
```

### Set Node - Format Response

```yaml
Node: Set Response
Mode: Raw JSON
Value: |
  {
    "success": true,
    "analysis_id": "{{ $json.analysis_id }}",
    "estimated_duration": 120
  }
```

### Respond to Webhook Node

```yaml
Node: Respond to Webhook
Respond With: First Entry JSON
Response Code: 200
```

## Workflow Architecture

```
[Webhook POST]
    ↓
[Code: Generate UUID]
    ↓
[Set: Format Response] → [Respond to Webhook: 200 OK]
    ↓
[Continue: Process Analysis in background]
    ↓
[IF: Check sources.perplexity] → [Perplexity Node]
[IF: Check sources.exaDeep] → [Exa Node]
[IF: Check sources.serpNews] → [SerpAPI Node]
    ↓
[Merge Results]
    ↓
[Claude Opus 4.5: Generate Report]
    ↓
[PostgreSQL: Save with analysis_id]
```

## Field Access in Workflow

| Payload Field | n8n Expression |
|---------------|----------------|
| analysis_type | `{{ $json.analysis_type }}` |
| competitors[0] | `{{ $json.competitors[0] }}` |
| all competitors | `{{ $json.competitors.join(', ') }}` |
| perplexity enabled | `{{ $json.sources.perplexity }}` |
| company name | `{{ $json.company_context.name }}` |
| industry | `{{ $json.company_context.industry }}` |
