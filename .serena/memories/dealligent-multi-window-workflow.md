# Workflow Multi-Fenêtres Dealligent

## Architecture 5 Fenêtres Experts

| Fenêtre | Rôle | Peut Coder | Commande |
|---------|------|------------|----------|
| **Orchestrateur** | Brainstorm, décomposition, génère prompts | NON | `dw o` |
| **Frontend** | React/TypeScript/TailwindCSS/Magic UI | OUI | `dw f` |
| **Backend** | n8n workflows, PostgreSQL, multi-tenancy | OUI | `dw b` |
| **Architect** | ADRs, décisions architecture | NON | `dw a` |
| **Reviewer** | Code review, QA, validation | NON | `dw r` |

## Flux de Travail Standard

```
┌─────────────────────────────────────────────────────────────┐
│ 1. USER → ORCHESTRATEUR                                     │
│    - Brainstorm la feature                                  │
│    - Décompose en tâches                                    │
│    - Génère PROMPT pour expert(s)                           │
├─────────────────────────────────────────────────────────────┤
│ 2. USER copie PROMPT → FRONTEND ou BACKEND                  │
│    - Expert implémente                                      │
│    - Expert produit HANDOFF                                 │
├─────────────────────────────────────────────────────────────┤
│ 3. USER copie HANDOFF → ORCHESTRATEUR                       │
│    - Orchestrateur analyse                                  │
│    - Génère PROMPT REVIEWER                                 │
├─────────────────────────────────────────────────────────────┤
│ 4. USER copie PROMPT → REVIEWER                             │
│    - Reviewer valide ou demande changes                     │
│    - Si APPROVED → merge                                    │
│    - Si CHANGES → retour expert                             │
└─────────────────────────────────────────────────────────────┘
```

## Format HANDOFF Inter-Fenêtres

Chaque expert DOIT terminer par un bloc HANDOFF:
```
---
## HANDOFF [EXPERT] → [DESTINATAIRE]
### Statut: COMPLETE/EN COURS/BLOQUÉ
### Résumé: [1-2 phrases]
### Fichiers modifiés: [liste]
### Pour [PROCHAIN EXPERT]: [instructions]
---
```

## Communication Inter-Fenêtres

Les fenêtres communiquent via:
1. **Mémoires Serena** - Contexte projet partagé
2. **HANDOFF blocks** - Passation entre experts
3. **Orchestrateur** - Hub central de coordination
