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

---

## UI/UX EXCELLENCE - DIRECTIVES OBLIGATOIRES

### Philosophie Design
Creer des interfaces **MEMORABLES et DISTINCTIVES**, pas generiques. Eviter l'esthetique "AI slop".

### Anti-Patterns INTERDITS
```
- Fonts generiques: Inter, Roboto, Arial
- Gradients violets cliches sur fond blanc
- Layouts previsibles sans personnalite
- Composants identiques partout
- Animations basiques sans intention
```

### Librairies UI Premium OBLIGATOIRES

| Librairie | Usage | Installation |
|-----------|-------|--------------|
| **Magic UI** | KPIs animes, transitions, cards premium | `npm install @magicui/react` |
| **Aceternity UI** | Hero sections, effets visuels avances | Copie locale |
| **Framer Motion** | Micro-interactions, stagger animations | `npm install framer-motion` |

### Composants Magic UI Prioritaires
- `NumberTicker` - OBLIGATOIRE pour tous les KPIs/metriques
- `BorderBeam` - Cards avec action en cours
- `BlurIn` - Transitions de page
- `ShimmerButton` - CTAs premium
- `TextReveal` - Hero sections

### Typographie Premium
```css
/* REMPLACER Inter par: */
--font-display: 'Cabinet Grotesk', 'Satoshi', sans-serif;  /* Titres */
--font-body: 'General Sans', 'Plus Jakarta Sans', sans-serif;  /* Corps */
```
Sources gratuites: Fontshare.com, Google Fonts

---

## Tech Stack

### Frontend
- Framework: React 18 + TypeScript 5.7 (strict mode)
- Build: Vite 6
- Styling: TailwindCSS 3.4 + Premium Glassmorphism Design System
- **Animations**: Framer Motion 12 + **Magic UI**
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

---

## Architecture

```
src/
├── components/
│   ├── layout/
│   │   └── AppLayout.tsx      # Sidebar + navigation
│   └── ui/                    # Composants Magic UI / Aceternity
├── contexts/
│   └── ThemeContext.tsx       # Gestion light/dark mode
├── pages/
│   ├── Dashboard.tsx          # Page d'accueil (NumberTicker KPIs)
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
│   ├── globals.css            # Design system premium
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
6. **UI/UX Excellence**: Interfaces distinctives, animations purposeful

---

## Development Rules
- Always use feature branches (never commit to main)
- Complete what you start - no unresolved TODOs
- Read code before modifying (never speculate)
- Maximum 300 lines per file
- Co-Author: Claude Opus 4.5 <noreply@anthropic.com>
- **UI**: Toujours utiliser Magic UI pour KPIs, stagger animations sur grids

---

## Design System Tokens

### Colors
```css
--primary-600: #2563EB;        /* Main primary */
--primary-glow: rgba(59, 130, 246, 0.4);
--success-500: #10B981;
--warning-500: #F59E0B;
--error-500: #EF4444;
--neutral-900: #0F172A;        /* Sidebar */
```

### Glassmorphism
```css
--glass-light: rgba(255, 255, 255, 0.08);
--glass-border: rgba(255, 255, 255, 0.15);
backdrop-filter: blur(20px) saturate(180%);
```

---

## Design System Classes

### Cards
- `card-premium` - Elevated card avec hover
- `card-glass` - Glassmorphism standard
- `card-glass-enhanced` - Glassmorphism + glow hover
- `card-interactive` - 3D hover effect

### Buttons
- `btn-premium` - Primary gradient + glow
- `btn-ghost-glow` - Outline + glow hover
- `btn-glass` - Glassmorphism button

### Text & Icons
- `text-gradient-blue` - Gradient text effect
- `icon-gradient-blue/green/purple/orange` - Icones gradient
- `badge-glow-blue/green/red/orange/purple` - Badges lumineux

### Layout
- `stat-card-premium` - Cartes statistiques avec NumberTicker
- `hero-premium` - En-tetes de page avec TextReveal

---

## Framer Motion Patterns

### Card Hover (OBLIGATOIRE)
```tsx
whileHover={{ y: -4, scale: 1.02 }}
whileTap={{ scale: 0.98 }}
transition={{ type: "spring", stiffness: 400, damping: 17 }}
```

### Staggered Grid (OBLIGATOIRE sur toutes les grids)
```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};
```

### Page Transition
```tsx
initial={{ opacity: 0, filter: "blur(10px)" }}
animate={{ opacity: 1, filter: "blur(0px)" }}
```

---

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

---

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

---

## Agents Disponibles (.claude/agents/)
- `saas-architect.md` - Architecture decisions & multi-tenancy
- `frontend-engineer.md` - React/TypeScript/TailwindCSS + **UI/UX Excellence**
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
- `design-system.md` - **UI/UX specifications (Magic UI, Aceternity, Glassmorphism)**
- `ui-ux-research-2026.md` - Recherche et recommandations UI/UX
