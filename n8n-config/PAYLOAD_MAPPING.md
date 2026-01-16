# Frontend to n8n Payload Mapping

## Overview

Ce document decrit comment transformer les donnees du frontend Dealligent vers le format attendu par le workflow n8n CDS-RAG DASHBOARD V12.0.

## Contrat API n8n

```typescript
// Ce que n8n attend
interface N8nRequest {
  chatInput: string;      // REQUIRED - Nom du concurrent
  sources?: string[];     // OPTIONAL - Default: ["Perplexity", "Exa", "SerpAPI"]
  depth?: string;         // OPTIONAL - Default: "detailed"
}
```

## Etat Frontend (LaunchAnalysis.tsx)

```typescript
// Ce que le frontend a
interface FrontendState {
  selectedCompetitors: string[];  // Array de noms
  selectedSources: {
    perplexity: boolean;
    exaDeep: boolean;
    serpNews: boolean;
    serpLinkedin: boolean;
    techDocs: boolean;
    patents: boolean;
  };
  selectedAnalysisType: {
    id: 'competitor' | 'product' | 'market' | 'technology';
    // ...
  };
}
```

## Transformation

### 1. chatInput (REQUIRED)

Le workflow traite **un seul concurrent a la fois**.

```typescript
// Frontend: selectedCompetitors = ["nTopology", "Altair"]
// n8n: chatInput = "nTopology"

const chatInput = selectedCompetitors[0];
```

**Pour plusieurs concurrents**, faire plusieurs appels:

```typescript
async function analyzeAllCompetitors(competitors: string[]) {
  const results = await Promise.all(
    competitors.map(competitor =>
      fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatInput: competitor })
      })
    )
  );
  return results;
}
```

### 2. sources (Object -> Array)

Transformer les booleans en array de strings:

```typescript
// Frontend
const selectedSources = {
  perplexity: true,
  exaDeep: true,
  serpNews: false,
  serpLinkedin: false,
  techDocs: false,
  patents: false
};

// Mapping des cles frontend -> valeurs n8n
const SOURCE_MAP: Record<string, string> = {
  perplexity: 'Perplexity',
  exaDeep: 'Exa',
  serpNews: 'SerpAPI'
  // serpLinkedin, techDocs, patents: non supportes actuellement
};

// Transformation
function mapSources(sources: typeof selectedSources): string[] {
  return Object.entries(sources)
    .filter(([key, enabled]) => enabled && SOURCE_MAP[key])
    .map(([key]) => SOURCE_MAP[key]);
}

// Resultat: ["Perplexity", "Exa"]
```

### 3. depth (Fixed)

Toujours "detailed" pour le MVP:

```typescript
const depth = "detailed";
```

## Fonction de Mapping Complete

```typescript
interface FrontendAnalysisState {
  selectedCompetitors: string[];
  selectedSources: {
    perplexity: boolean;
    exaDeep: boolean;
    serpNews: boolean;
    serpLinkedin: boolean;
    techDocs: boolean;
    patents: boolean;
  };
}

interface N8nPayload {
  chatInput: string;
  sources: string[];
  depth: string;
}

const SOURCE_MAP: Record<string, string> = {
  perplexity: 'Perplexity',
  exaDeep: 'Exa',
  serpNews: 'SerpAPI'
};

function buildN8nPayload(
  state: FrontendAnalysisState,
  competitorIndex: number = 0
): N8nPayload {
  // 1. Extract single competitor
  const chatInput = state.selectedCompetitors[competitorIndex];

  if (!chatInput) {
    throw new Error('No competitor selected');
  }

  // 2. Transform sources object to array
  const sources = Object.entries(state.selectedSources)
    .filter(([key, enabled]) => enabled && SOURCE_MAP[key])
    .map(([key]) => SOURCE_MAP[key]);

  // 3. Use default if no sources selected
  const finalSources = sources.length > 0
    ? sources
    : ['Perplexity', 'Exa', 'SerpAPI'];

  return {
    chatInput,
    sources: finalSources,
    depth: 'detailed'
  };
}
```

## Exemple d'Integration

```typescript
// Dans LaunchAnalysis.tsx

const WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL;

async function handleLaunchAnalysis() {
  try {
    // Pour chaque concurrent selectionne
    const results = await Promise.all(
      selectedCompetitors.map(async (competitor, index) => {
        const payload = buildN8nPayload(
          { selectedCompetitors, selectedSources },
          index
        );

        const response = await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error(`Failed for ${competitor}`);
        }

        return response.json();
      })
    );

    // Traiter les resultats
    console.log('Analysis results:', results);

  } catch (error) {
    console.error('Analysis failed:', error);
  }
}
```

## Tableau Recapitulatif

| Frontend | Type | n8n | Type | Transformation |
|----------|------|-----|------|----------------|
| `selectedCompetitors[0]` | string | `chatInput` | string | Direct |
| `selectedCompetitors[1..n]` | string[] | - | - | Appels multiples |
| `selectedSources.perplexity` | boolean | `sources[]` | string | `"Perplexity"` si true |
| `selectedSources.exaDeep` | boolean | `sources[]` | string | `"Exa"` si true |
| `selectedSources.serpNews` | boolean | `sources[]` | string | `"SerpAPI"` si true |
| `selectedSources.serpLinkedin` | boolean | - | - | Non supporte |
| `selectedSources.techDocs` | boolean | - | - | Non supporte |
| `selectedSources.patents` | boolean | - | - | Non supporte |
| - | - | `depth` | string | Toujours `"detailed"` |

## Notes Importantes

1. **Un concurrent par appel**: Le workflow n8n traite un seul concurrent. Pour analyser plusieurs concurrents, faire plusieurs appels.

2. **Sources limitees**: Seuls Perplexity, Exa et SerpAPI sont supportes. Les autres sources (LinkedIn, techDocs, patents) seront ajoutees dans une future version du workflow.

3. **Reponse synchrone**: Le workflow retourne les resultats complets. L'appel peut prendre 30-120 secondes.

4. **Timeout recommande**: Configurer un timeout de 180 secondes minimum cote frontend.
