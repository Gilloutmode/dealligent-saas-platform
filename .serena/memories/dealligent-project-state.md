# Dealligent Platform - État du Projet

## Informations Clés
- **Projet**: Dealligent - AI-Powered Competitive Intelligence Platform
- **Type**: B2B SaaS Multi-tenant
- **Status**: MVP Development
- **Stack**: React 18 + TypeScript + TailwindCSS + n8n Backend

## Architecture Multi-Fenêtres
5 fenêtres experts configurées:
1. **Orchestrateur** (o) - Chef d'orchestre, planification, read-only
2. **Frontend** (f) - React/TypeScript/TailwindCSS, Magic UI
3. **Backend** (b) - n8n workflows, PostgreSQL, multi-tenancy
4. **Architect** (a) - ADRs, decisions techniques
5. **Reviewer** (r) - Code review, QA, validation

## Commandes d'Activation
- `/init-orchestrator` - Active le mode orchestrateur
- `/init-frontend` - Active le mode frontend
- `/init-backend` - Active le mode backend
- `/init-architect` - Active le mode architect
- `/init-reviewer` - Active le mode reviewer

## Script Lancement
`dw [o|f|b|a|r]` ou `dealligent-window.sh [role]`

## Workflows n8n Existants
- CDS-RAG PROD V11.2 - Rapports compétitifs
- CDS-RAG DASHBOARD V12.0 - Agrégation dashboard

## Design System
- Glassmorphism premium
- Magic UI (NumberTicker, BorderBeam, BlurIn)
- Framer Motion animations
- Classes: card-premium, btn-glass, card-glass-enhanced
