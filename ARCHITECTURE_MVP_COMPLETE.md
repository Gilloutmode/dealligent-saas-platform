# Intelligence Platform MVP - Architecture Complète

**Version**: 2.0  
**Date**: 2026-01-04  
**Status**: Conception finalisée

---

## 🎯 Vue d'Ensemble

### Mission du MVP
Plateforme B2B SaaS d'intelligence marché permettant aux entreprises d'analyser leur positionnement compétitif via un système multi-agent AI orchestré par N8N.

### Périmètre MVP (Phase 1)
- **Module actif**: Market Intelligence uniquement
- **Modules futurs** (locked): Product Intel, Sales Intel, Content Engine

---

## 🏗️ Architecture Technique

### Stack Backend (Existant)
```
┌─────────────────────────────────────────────────────────────────┐
│                        N8N ORCHESTRATION                        │
│                   (CDS-RAG PROD V13.0)                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────────┐ │
│  │   Claude    │    │  Pinecone   │    │    Webhook          │ │
│  │  Opus 4.5   │◄──►│   Vector    │◄──►│    Triggers         │ │
│  │   (LLM)     │    │    Store    │    │                     │ │
│  └─────────────┘    └─────────────┘    └─────────────────────┘ │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │              MARKET INTELLIGENCE AGENT                      ││
│  │  • 5 dimensions d'analyse (Produit, Messaging, Prix,        ││
│  │    Marché, Contenu)                                         ││
│  │  • Scraping compétiteurs                                    ││
│  │  • Génération de rapports structurés                        ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Stack Frontend (À développer)
```
┌─────────────────────────────────────────────────────────────────┐
│                      FRONTEND MVP                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Framework: Next.js 14+ / React                                 │
│  Styling: Tailwind CSS + shadcn/ui                              │
│  State: Zustand ou React Query                                  │
│  Auth: NextAuth.js + JWT                                        │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │   Sidebar   │  │  Dashboard  │  │    Content Area         │ │
│  │   240px     │  │   Widgets   │  │    Dynamic Routing      │ │
│  │   (fixed)   │  │   by Role   │  │                         │ │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔐 Système de Rôles (RBAC)

### Hiérarchie des Rôles
```
SUPER_ADMIN (Platform Owner)
    └── TENANT_ADMIN (Company Admin)
            ├── MARKETING_MANAGER
            ├── SALES_MANAGER  
            ├── PRODUCT_MANAGER
            └── ANALYST
```

### Matrice de Permissions Détaillée

| Feature | Super Admin | Tenant Admin | Marketing | Sales | Product | Analyst |
|---------|-------------|--------------|-----------|-------|---------|---------|
| **Dashboard** |
| Vue exécutive | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Vue marketing | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Vue sales | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ |
| Vue produit | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ |
| Vue basique | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Company Profile** |
| Voir | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Éditer | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Watchlist** |
| Voir | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Ajouter/Supprimer | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Analyses** |
| Lancer (toutes dim.) | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Lancer (sa spécialité) | ✅ | ✅ | ✅ MKT | ✅ Sales | ✅ Prod | ✅ Basic |
| Voir résultats | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Exporter | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **RAG Management** |
| Voir documents | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Upload direct | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Upload avec validation | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Approuver uploads | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Supprimer documents | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Tickets** |
| Créer | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Voir tous | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Voir les siens | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Administration** |
| Gérer utilisateurs | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Gérer rôles | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Voir facturation | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Config intégrations | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |

---

## 📊 Modèle de Données

### Schéma Company (basé sur CSV CDS)
```typescript
interface Company {
  id: string;
  tenantId: string;
  
  // Company Overview
  name: string;
  brandName: string;
  productName: string;
  coreCategory: string;
  deploymentPreference: 'cloud' | 'hybrid' | 'on-premise';
  
  // Relations
  industries: Industry[];
  personas: Persona[];
  competitors: Competitor[];
  customers: Customer[];
  useCases: UseCase[];
  features: Feature[];
  positioning: PositioningMessage[];
  technologies: Technology[];
  
  // Metadata
  ragSyncedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface Industry {
  id: string;
  name: string;
  priority: 'Tier 1' | 'Tier 2' | 'NewSpace' | 'Emerging';
  subsegments: string[];
  typicalProfiles: string;
}

interface Persona {
  id: string;
  title: string;
  level: 'Executive' | 'Manager' | 'IC';
  roleInPurchase: 'DecisionMaker' | 'Influencer' | 'User';
  painPoints: string[];
}

interface Competitor {
  id: string;
  name: string;
  website: string;
  priority: 'high' | 'medium' | 'low';
  lastAnalyzedAt: Date | null;
  competitiveScore: number | null;
}

interface Feature {
  id: string;
  name: string;
  category: string;
  isDifferentiator: boolean;
  userValue: string;
  boundaries: string;
}

interface Analysis {
  id: string;
  companyId: string;
  dimensions: AnalysisDimension[];
  competitors: string[];
  status: 'pending' | 'running' | 'completed' | 'failed';
  ragInjectionStatus: 'none' | 'pending' | 'approved' | 'rejected';
  results: AnalysisResults;
  createdBy: string;
  createdAt: Date;
  completedAt: Date | null;
}

interface RAGDocument {
  id: string;
  companyId: string;
  filename: string;
  category: RAGCategory;
  size: number;
  uploadedBy: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy: string | null;
  approvedAt: Date | null;
  pineconeId: string | null;
  createdAt: Date;
}

interface Ticket {
  id: string;
  companyId: string;
  type: 'feature' | 'bug' | 'question' | 'improvement';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'new' | 'in_progress' | 'resolved' | 'closed';
  module: 'market_intel' | 'product_intel' | 'sales_intel' | 'content' | 'platform';
  createdBy: string;
  assignedTo: string | null;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 🔄 Workflows Clés

### 1. Workflow de Validation RAG
```
┌──────────────┐
│ User Upload  │
│ (Doc/Analyse)│
└──────┬───────┘
       │
       ▼
┌──────────────┐     ┌─────────────────────────────┐
│ IS ADMIN?    │─YES─▶ Option: Direct OU Validation│
└──────┬───────┘     └─────────────────────────────┘
       │ NO
       ▼
┌──────────────┐
│   PENDING    │
│    QUEUE     │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ ADMIN REVIEW │
└──────┬───────┘
       │
   ┌───┼───┐
   │   │   │
   ▼   ▼   ▼
 ┌───┐┌───┐┌────────┐
 │✅ ││❌ ││💬      │
 │APP││REJ││CHANGES │
 └─┬─┘└─┬─┘└───┬────┘
   │    │      │
   ▼    ▼      │
┌─────┐┌─────┐ │
│ RAG ││ARCH │ │
│SYNC ││+LOG │ │
└─────┘└─────┘ │
               │
    ┌──────────┘
    ▼
┌──────────┐
│ NOTIFY   │
│ USER     │
│ + REVISE │
└──────────┘
```

### 2. Workflow d'Analyse Compétitive
```
┌─────────────────┐
│ User Configure  │
│ • Dimensions    │
│ • Competitors   │
│ • Options       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Submit to N8N   │
│ via Webhook     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ N8N Orchestrate │
│ • Scrape sites  │
│ • Query RAG     │
│ • Claude LLM    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Results Ready   │
│ • Store DB      │
│ • Notify User   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ User Review     │
│ • View Results  │
│ • Export        │
│ • Inject RAG?   │
└─────────────────┘
```

---

## 🎨 Design System

### Navigation Sidebar
```
EXPANDED (240px)              COLLAPSED (64px)
┌─────────────────┐           ┌──────┐
│  🧠 PLATFORM    │           │  🧠  │
│  ──────────────│           │ ──── │
│  🏠 Dashboard   │           │  🏠  │
│  ──────────────│           │ ──── │
│  MARKET INTEL  │           │  MKT │
│  🏢 Mon Profil  │           │  🏢  │
│  👥 Watchlist   │           │  👥  │
│  🚀 Analyse     │           │  🚀  │
│  📊 Résultats   │           │  📊  │
│  📜 Historique  │           │  📜  │
│  ──────────────│           │ ──── │
│  RAG           │           │  RAG │
│  🗄️ Gestion    │           │  🗄️  │
│  ✅ Pending (3) │           │  ✅3 │
│  ──────────────│           │ ──── │
│  🎫 Tickets     │           │  🎫  │
│  ──────────────│           │ ──── │
│  COMING SOON   │           │  🔒  │
│  📦 Product 🔒  │           │  📦  │
│  💼 Sales   🔒  │           │  💼  │
│  📝 Content 🔒  │           │  📝  │
│  ──────────────│           │ ──── │
│  ⚙️ Settings    │           │  ⚙️  │
└─────────────────┘           └──────┘
```

### Color Tokens
```css
/* Primary */
--primary-500: #3B82F6;  /* Actions principales */
--primary-600: #2563EB;  /* Hover */

/* Status */
--success-500: #10B981;  /* Approuvé, Actif */
--warning-500: #F59E0B;  /* En attente, Moyenne priorité */
--danger-500: #EF4444;   /* Urgent, Erreur */
--info-500: #6366F1;     /* Info, En cours */

/* Sidebar */
--sidebar-bg: #1F2937;
--sidebar-text: #F3F4F6;
--sidebar-active: #3B82F6;
--sidebar-hover: #374151;

/* Neutral */
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-500: #6B7280;
--gray-900: #111827;
```

### Responsive Breakpoints
| Breakpoint | Sidebar | Layout | Grid |
|------------|---------|--------|------|
| xl (≥1280px) | Expanded 240px | Full | 3-4 cols |
| lg (≥1024px) | Expanded 240px | Full | 2-3 cols |
| md (≥768px) | Collapsed 64px | Compact | 2 cols |
| sm (<768px) | Hidden (drawer) | Mobile | 1 col |

---

## 📦 Structure de Fichiers Proposée

```
intelligence-platform-mvp/
├── apps/
│   └── web/                          # Frontend Next.js
│       ├── app/
│       │   ├── (auth)/
│       │   │   ├── login/
│       │   │   └── register/
│       │   ├── (dashboard)/
│       │   │   ├── layout.tsx        # Sidebar layout
│       │   │   ├── page.tsx          # Dashboard
│       │   │   ├── market-intel/
│       │   │   │   ├── profile/
│       │   │   │   ├── watchlist/
│       │   │   │   ├── analyze/
│       │   │   │   ├── results/
│       │   │   │   └── history/
│       │   │   ├── rag/
│       │   │   │   ├── documents/
│       │   │   │   └── pending/
│       │   │   ├── tickets/
│       │   │   └── settings/
│       │   │       ├── users/
│       │   │       ├── roles/
│       │   │       └── integrations/
│       │   └── onboarding/           # Wizard 9 étapes
│       ├── components/
│       │   ├── ui/                   # shadcn/ui components
│       │   ├── layout/
│       │   │   ├── Sidebar.tsx
│       │   │   └── Header.tsx
│       │   ├── dashboard/
│       │   │   ├── DashboardAdmin.tsx
│       │   │   ├── DashboardMarketing.tsx
│       │   │   └── DashboardSales.tsx
│       │   ├── analysis/
│       │   ├── rag/
│       │   └── tickets/
│       ├── lib/
│       │   ├── auth.ts
│       │   ├── api.ts
│       │   └── utils.ts
│       └── types/
│           └── index.ts
├── packages/
│   ├── database/                     # Prisma schema
│   └── config/                       # Shared config
├── n8n/
│   └── workflows/
│       └── cds-rag-prod-v13.json     # N8N workflow export
└── docs/
    ├── wireframes/
    ├── api/
    └── architecture/
```

---

## 🚀 Plan d'Implémentation

### Phase 1: Foundation (Semaines 1-2)
- [ ] Setup Next.js project avec Tailwind/shadcn
- [ ] Implémenter auth (NextAuth + JWT)
- [ ] Créer layout Sidebar responsive
- [ ] Setup database schema (Prisma)
- [ ] Implémenter RBAC middleware

### Phase 2: Core Features (Semaines 3-4)
- [ ] Dashboard personnalisé par rôle
- [ ] Mon Entreprise (CRUD company profile)
- [ ] Watchlist compétiteurs
- [ ] Connecter N8N via webhooks

### Phase 3: Analysis Engine (Semaines 5-6)
- [ ] Interface "Lancer Analyse"
- [ ] Affichage résultats avec diff detection
- [ ] Historique avec filtres
- [ ] Export PDF/Excel

### Phase 4: RAG & Admin (Semaines 7-8)
- [ ] RAG Management avec upload
- [ ] Workflow de validation
- [ ] Système de tickets
- [ ] User management

### Phase 5: Polish & Launch (Semaines 9-10)
- [ ] Wizard d'onboarding
- [ ] Notifications email
- [ ] Performance optimization
- [ ] Testing & QA
- [ ] Deploy production

---

## 📋 Livrables Wireframes

| Document | Statut | Contenu |
|----------|--------|---------|
| `WIREFRAMES_MVP_V2.md` | ✅ Terminé | 10 écrans principaux avec sidebar |
| `ONBOARDING_WIZARD.md` | ✅ Terminé | 9 étapes + confirmation |
| `ARCHITECTURE_MVP_COMPLETE.md` | ✅ Terminé | Ce document |

---

## 🔗 Intégrations

### N8N Webhook Endpoints
```
POST /webhook/analysis/start
  → Démarre une nouvelle analyse
  → Params: dimensions[], competitors[], options

GET /webhook/analysis/{id}/status
  → Récupère le statut d'une analyse

POST /webhook/rag/sync
  → Synchronise les données company vers RAG
  → Params: companyId, categories[]
```

### Pinecone Namespace Strategy
```
Namespace pattern: tenant_{tenantId}_{category}

Examples:
- tenant_cds_company_overview
- tenant_cds_competitors
- tenant_cds_positioning
- tenant_cds_analyses
```

---

**Document validé pour développement MVP**

🏢 **Client pilote**: Cognitive Design Systems (CDS)  
🎯 **Module MVP**: Market Intelligence  
🔒 **Modules futurs**: Product Intel, Sales Intel, Content Engine
