# n8n Webhook Setup - CDS-RAG PROD V11.2

## Step-by-Step Configuration

### 1. Open the Workflow

1. Go to https://gilloutmode.app.n8n.cloud
2. Open workflow: **CDS-RAG PROD - V11.2**
3. Click "Test workflow" to enable test mode

### 2. Configure Webhook Node

**Node Settings:**

| Setting | Value |
|---------|-------|
| HTTP Method | POST |
| Path | `61ea8949-d762-49f1-8f5c-75169b5a4190` |
| Authentication | None |
| Respond | Using 'Respond to Webhook' Node |
| Response Code | 200 |

**Test URL:**
```
https://gilloutmode.app.n8n.cloud/webhook-test/61ea8949-d762-49f1-8f5c-75169b5a4190
```

**Production URL:**
```
https://gilloutmode.app.n8n.cloud/webhook/61ea8949-d762-49f1-8f5c-75169b5a4190
```

### 3. Add Code Node - Generate UUID

**Position:** After Webhook node

**Node Name:** `Generate Analysis ID`

**Code:**

```javascript
// Generate UUID v4 without external dependency
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Validate required fields
const input = items[0].json;

if (!input.analysis_type) {
  throw new Error('Missing required field: analysis_type');
}

if (!input.competitors || !Array.isArray(input.competitors)) {
  throw new Error('Missing or invalid field: competitors (must be array)');
}

// Pass through with generated ID
return {
  json: {
    ...input,
    analysis_id: generateUUID(),
    received_at: new Date().toISOString()
  }
};
```

### 4. Add Set Node - Format Response

**Position:** After Code node

**Node Name:** `Format Response`

**Mode:** Manual Mapping

| Field | Value |
|-------|-------|
| success | `true` (boolean) |
| analysis_id | `{{ $json.analysis_id }}` |
| estimated_duration | `120` (number) |

### 5. Add Respond to Webhook Node

**Position:** After Set node (parallel branch)

**Node Settings:**

| Setting | Value |
|---------|-------|
| Respond With | First Entry JSON |
| Response Code | 200 |

### 6. Continue Workflow Branch

After the Set node, add a second connection to continue the analysis:

```
[Set Node] ──→ [Respond to Webhook] (immediate response)
    │
    └──→ [Continue Processing] (background analysis)
```

### 7. Conditional Source Processing

Add IF nodes to check enabled sources:

**IF Node: Check Perplexity**
```
Condition: {{ $json.sources.perplexity }} equals true
True: Connect to Perplexity node
False: Skip
```

**IF Node: Check Exa Deep**
```
Condition: {{ $json.sources.exaDeep }} equals true
True: Connect to Exa node
False: Skip
```

**IF Node: Check SerpAPI News**
```
Condition: {{ $json.sources.serpNews }} equals true
True: Connect to SerpAPI node
False: Skip
```

## Workflow Diagram

```
┌─────────────────┐
│  Webhook POST   │
│  (receives JSON)│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Generate UUID   │
│ (Code node)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐     ┌──────────────────┐
│ Format Response │────▶│ Respond Webhook  │
│ (Set node)      │     │ (200 + JSON)     │
└────────┬────────┘     └──────────────────┘
         │
         ▼
┌─────────────────┐
│ Process Sources │
│ (IF conditions) │
└────────┬────────┘
         │
    ┌────┴────┬─────────┐
    ▼         ▼         ▼
┌───────┐ ┌───────┐ ┌───────┐
│Perplex│ │  Exa  │ │SerpAPI│
└───┬───┘ └───┬───┘ └───┬───┘
    │         │         │
    └────┬────┴─────────┘
         ▼
┌─────────────────┐
│  Merge Results  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Claude Opus 4.5 │
│ (Generate Report│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   PostgreSQL    │
│ (Save results)  │
└─────────────────┘
```

## Field Mapping Reference

### Frontend to n8n Payload Mapping

| Frontend State | JSON Payload Field | n8n Expression |
|----------------|-------------------|----------------|
| `selectedAnalysisType.id` | `analysis_type` | `{{ $json.analysis_type }}` |
| `selectedCompetitors[]` | `competitors` | `{{ $json.competitors }}` |
| First competitor | `competitors[0]` | `{{ $json.competitors[0] }}` |
| All competitors (comma-separated) | `competitors.join()` | `{{ $json.competitors.join(', ') }}` |
| `selectedSources.perplexity` | `sources.perplexity` | `{{ $json.sources.perplexity }}` |
| `selectedSources.exaDeep` | `sources.exaDeep` | `{{ $json.sources.exaDeep }}` |
| `selectedSources.serpNews` | `sources.serpNews` | `{{ $json.sources.serpNews }}` |
| `companyInfo.name` | `company_context.name` | `{{ $json.company_context.name }}` |
| `companyInfo.industry` | `company_context.industry` | `{{ $json.company_context.industry }}` |
| `companyInfo.description` | `company_context.description` | `{{ $json.company_context.description }}` |

### Analysis Type Mapping

| Frontend ID | n8n Value | Workflow Branch |
|-------------|-----------|-----------------|
| `competitor` | `"competitor"` | CDS-RAG Competitor Analysis |
| `product` | `"product"` | CDS-RAG Product Analysis |
| `market` | `"market"` | CDS-RAG Market Analysis |
| `technology` | `"technology"` | CDS-RAG Technology Analysis |

### Source Boolean Flags

| Source | When `true` | When `false` |
|--------|-------------|--------------|
| `perplexity` | Perplexity AI node executes | Skipped |
| `exaDeep` | Exa deep search executes | Skipped |
| `serpNews` | SerpAPI news search executes | Skipped |

### Example Payload

```json
{
  "analysis_type": "competitor",
  "competitors": ["nTopology", "Altair Inspire"],
  "sources": {
    "perplexity": true,
    "exaDeep": true,
    "serpNews": false
  },
  "company_context": {
    "name": "CDS Groupe",
    "industry": "CAO/FAO Software",
    "description": "Leading CAD/CAM software solutions"
  }
}
```

### CDS-RAG Workflow Variable Access

In existing CDS-RAG PROD V11.2 nodes, access the incoming data:

```javascript
// In any Code node after webhook
const analysisType = $json.analysis_type;
const competitors = $json.competitors;
const usePerplexity = $json.sources.perplexity;
const companyName = $json.company_context?.name || 'Unknown';
```

## Error Handling

### Validation Errors (400)

In the Code node, throw errors for invalid payloads:

```javascript
const validTypes = ['competitor', 'product', 'market', 'technology'];
if (!validTypes.includes(input.analysis_type)) {
  throw new Error(`Invalid analysis_type. Must be one of: ${validTypes.join(', ')}`);
}
```

### Workflow Errors (500)

Add an Error Workflow or use try/catch in Code nodes to handle failures gracefully.

## Testing Checklist

- [ ] Webhook responds within 2 seconds
- [ ] analysis_id is a valid UUID format
- [ ] Response JSON matches expected schema
- [ ] Background processing starts after response
- [ ] All source conditions work correctly
- [ ] Invalid payloads return 400 errors
