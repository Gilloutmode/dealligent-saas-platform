# Dealligent Platform - Claude Code Configuration

## Project Identity
- **Name**: Dealligent - AI-Powered Competitive Intelligence Platform
- **Type**: B2B SaaS, Multi-tenant Enterprise
- **Status**: MVP Development
- **Target**: Vertical Agnostic (any B2B industry)
- **Clients**: Mix Mid-Market + Enterprise + Tech Startups
- **Platform**: Desktop only (MVP)

## Git Repository
- **Remote**: https://github.com/Gilloutmode/dealligent-saas-platform.git
- **Branch principale**: main
- **Convention branches**: feature/[nom], fix/[nom], refactor/[nom]
- **Convention commits**: feat/fix/refactor/docs + Co-Authored-By Claude

## Tech Stack

### Frontend
- Framework: React 18 + TypeScript 5.7
- Build: Vite 6
- Styling: TailwindCSS 3.4 + Premium Glassmorphism Design System
- Animations: Framer Motion 12
- Routing: React Router 7
- Charts: Recharts 3.6
- UI Components: Radix UI (Accessible primitives)

### Backend (n8n-First Architecture)
- **Core**: n8n (Workflow automation) - SEUL backend
- AI Models: Claude Opus 4.5 (Intelligence extraction)
- Data Sources: Perplexity AI, Exa, SerpAPI
- Database: PostgreSQL + pgvector (RAG embeddings)
- Auth: A evaluer (Clerk, Auth0, Supabase...)
- Workflows existants:
  - `CDS-RAG PROD - V11.2`: Rapports competitifs detailles
  - `CDS-RAG DASHBOARD - V12.0`: Agregation dashboard

### Infrastructure (A evaluer)
- Deployment: Options en evaluation (Vercel, Netlify, etc.)
- Backend: n8n Cloud (confirm)
- Monitoring: A definir

## Architecture

```
src/
├── components/
│   └── layout/
│       └── AppLayout.tsx      # Sidebar + navigation
├── contexts/
│   └── ThemeContext.tsx       # Gestion light/dark mode
├── pages/
│   ├── Dashboard.tsx          # Page d'accueil
│   ├── MyCompany.tsx          # Profil entreprise
│   ├── Watchlist.tsx          # Surveillance concurrents
│   ├── LaunchAnalysis.tsx     # Lancer analyses (wizard n8n)
│   ├── Results.tsx            # Resultats d'analyses
│   ├── RAGManagement.tsx      # Gestion base de connaissances
│   ├── Reports.tsx
│   ├── Alerts.tsx
│   ├── Settings.tsx
│   └── Help.tsx
├── styles/
│   ├── globals.css            # Design system premium (800+ lines)
│   └── tokens.ts              # TypeScript design tokens
├── data/
│   └── clientData.ts          # Business logic & competitor catalog
├── router.tsx
└── main.tsx
```

## Architecture Principles
1. **Multi-Tenancy First**: Row-level security, tenant context in every request
2. **API-First Design**: OpenAPI 3.1 contracts before implementation
3. **Security by Design**: OWASP Top 10 compliance, SOC2 readiness
4. **Performance Budget**: <200ms API response, <3s page load
5. **Accessibility**: WCAG 2.1 AA compliance minimum

## Development Rules
- Always use feature branches (never commit to main)
- Complete what you start - no unresolved TODOs
- Read code before modifying (never speculate)
- Maximum 300 lines per file
- Co-Author: Claude Opus 4.5 <noreply@anthropic.com>

## Design System Tokens
- Primary Blue: #2563EB
- Success Green: #10B981
- Warning Orange: #F59E0B
- Error Red: #EF4444
- Sidebar Dark: #0F172A
- Glassmorphism: rgba(255,255,255,0.1) + backdrop-blur-xl

## Design System Classes
- `card-premium` / `card-glass` - Cartes glassmorphism
- `btn-premium` / `btn-ghost-glow` - Boutons premium
- `icon-gradient-blue/green/purple/orange` - Icones gradient
- `badge-glow-blue/green/red/orange/purple` - Badges lumineux
- `stat-card-premium` - Cartes statistiques
- `hero-premium` - En-tetes de page

## Framer Motion Patterns
```tsx
whileHover={{ y: -4, scale: 1.02 }}
whileTap={{ scale: 0.98 }}
```

## Target Personas
- CI Analysts (Competitive Intelligence specialists)
- Product Managers
- Sales/Marketing teams
- Executives/C-level

## Analysis Types (11 modules)
MVP Priority (Top 4):
1. Competitor Analysis - Deep-dive single competitor
2. Product Analysis - Feature comparison
3. Market/Landscape Analysis - Market overview
4. Technology Analysis - Tech stack assessment

Phase 2:
5. Client Analysis
6. People Analysis
7. Industry Analysis
8. Security Analysis
9. M&A/Acquisitions Analysis
10. Roadmap/Innovation Analysis
11. (autres a definir avec Denis et experts)

## Example Use Case (CAO/FAO vertical)
Competitors: nTopology, Altair Inspire, Siemens NX, PTC Creo, CATIA, Autodesk Fusion 360
(Plateforme vertical-agnostic - cet exemple sert de premier cas d'usage)

## Commands
```bash
npm run dev      # Start dev server (port 5173+)
npm run build    # Production build
npm run lint     # Linter
```

## Integrations
- **n8n**: Workflows CDS-RAG pour analyses Market Intelligence
- **Perplexity AI, Exa, SerpAPI**: Sources de donnees
- **PostgreSQL + pgvector**: RAG embeddings storage

## Agents Disponibles (.claude/agents/)
- `saas-architect.md` - Architecture decisions & multi-tenancy
- `frontend-engineer.md` - React/TypeScript/TailwindCSS
- `backend-engineer.md` - n8n workflows & API design
- `security-auditor.md` - OWASP, SOC2, compliance

## Commandes Slash (.claude/commands/)
- `/deploy` - Deployment pipeline
- `/api-test` - API testing suite
- `/multi-tenant` - Tenant isolation verification
- `/rag-pipeline` - RAG knowledge base operations

## Context Files (.claude/context/)
- `dealligent-vision.md` - Product vision & strategy
- `architecture-decisions.md` - ADRs (Architecture Decision Records)
- `design-system.md` - UI/UX specifications
