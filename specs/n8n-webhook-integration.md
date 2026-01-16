# n8n Webhook Integration - CDS-RAG DASHBOARD V12.0

## Overview

Contrat API du workflow n8n "CDS-RAG DASHBOARD - V12.0 WEBHOOK" (ID: OQyvPpH6c9sEz203).
Le workflow est **deja configure et fonctionnel**.

## Webhook Endpoint

- **URL Test**: `https://gilloutmode.app.n8n.cloud/webhook-test/61ea8949-d762-49f1-8f5c-75169b5a4190`
- **URL Prod**: `https://gilloutmode.app.n8n.cloud/webhook/61ea8949-d762-49f1-8f5c-75169b5a4190`
- **Method**: POST
- **Content-Type**: application/json

## Request Contract

### Payload Schema

```typescript
interface AnalysisRequest {
  chatInput: string;      // Nom du concurrent a analyser (REQUIRED)
  sources?: string[];     // Sources a utiliser (OPTIONAL)
  depth?: string;         // Niveau de detail (OPTIONAL)
}
```

### Field Details

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `chatInput` | string | **Yes** | - | Nom du concurrent a analyser |
| `sources` | string[] | No | `["Perplexity", "Exa", "SerpAPI"]` | Sources de donnees |
| `depth` | string | No | `"detailed"` | Niveau de detail |

### Valid Sources

- `"Perplexity"` - Perplexity AI pour recherche web
- `"Exa"` - Exa pour recherche semantique
- `"SerpAPI"` - SerpAPI pour Google results

### Example Request

```json
{
  "chatInput": "nTopology",
  "sources": ["Perplexity", "Exa", "SerpAPI"],
  "depth": "detailed"
}
```

### Minimal Request

```json
{
  "chatInput": "Altair Inspire"
}
```

## Response Contract

### Success Response (200 OK)

```typescript
interface AnalysisResponse {
  success: true;
  data: CompetitorData;
  timestamp: string;  // ISO 8601
}

interface CompetitorData {
  competitor: string;
  category: string;
  marketCapUSD: string;
  keyProducts: string[];
  targetIndustries: string[];
  keyCustomers: string[];
  executives: string;
  headquarters: string;
  foundedYear: string;
  strengths: string[];
  weaknessesvsCDS: string[];
  recentActivity: string[];
  threatLevel: "HIGH" | "MEDIUM" | "LOW";
  qualityScore: string;
  intelligenceGrade: "A" | "B" | "C" | "D";
  sourceLinks: string;
  lastUpdated: string;
  actionRequired: string;
}
```

### Example Response

```json
{
  "success": true,
  "data": {
    "competitor": "nTopology",
    "category": "Competitive Intelligence",
    "marketCapUSD": "$500M",
    "keyProducts": ["nTop Platform", "Design for AM"],
    "targetIndustries": ["Aerospace", "Medical", "Automotive"],
    "keyCustomers": ["Boeing", "Stryker"],
    "executives": "Bradley Rothenberg (CEO)",
    "headquarters": "New York, USA",
    "foundedYear": "2015",
    "strengths": ["Implicit modeling", "Lattice generation"],
    "weaknessesvsCDS": ["Limited CAM integration"],
    "recentActivity": ["Series D funding $65M"],
    "threatLevel": "HIGH",
    "qualityScore": "10/12 (83%)",
    "intelligenceGrade": "A",
    "sourceLinks": "https://...",
    "lastUpdated": "2025-01-16T17:00:00Z",
    "actionRequired": "Monitor closely"
  },
  "timestamp": "2025-01-16T17:00:00.000Z"
}
```

### Error Response

```json
{
  "success": false,
  "error": "Missing required field: chatInput",
  "timestamp": "2025-01-16T17:00:00.000Z"
}
```

## Test Commands

### Basic Test

```bash
curl -X POST \
  'https://gilloutmode.app.n8n.cloud/webhook-test/61ea8949-d762-49f1-8f5c-75169b5a4190' \
  -H 'Content-Type: application/json' \
  -d '{"chatInput": "nTopology", "sources": ["Perplexity", "Exa"], "depth": "detailed"}'
```

### Minimal Test

```bash
curl -X POST \
  'https://gilloutmode.app.n8n.cloud/webhook-test/61ea8949-d762-49f1-8f5c-75169b5a4190' \
  -H 'Content-Type: application/json' \
  -d '{"chatInput": "Altair Inspire"}'
```

### Test with jq

```bash
curl -s -X POST \
  'https://gilloutmode.app.n8n.cloud/webhook-test/61ea8949-d762-49f1-8f5c-75169b5a4190' \
  -H 'Content-Type: application/json' \
  -d '{"chatInput": "nTopology"}' \
  | jq .
```

## Frontend Mapping

Le frontend doit transformer ses donnees vers ce format:

| Frontend State | n8n Payload |
|----------------|-------------|
| `selectedCompetitors[0]` | `chatInput` |
| `selectedSources` (object) | `sources` (array) |
| (fixed) | `depth: "detailed"` |

Voir `n8n-config/PAYLOAD_MAPPING.md` pour le detail du mapping.

## Notes

- Le workflow traite **un seul concurrent** a la fois (`chatInput` = string)
- Pour plusieurs concurrents, le frontend doit faire plusieurs appels
- L'analyse prend 30-120 secondes selon les sources activees
- Le workflow est synchrone (repond avec les resultats complets)
