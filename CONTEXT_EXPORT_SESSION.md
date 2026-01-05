# CDS Platform MVP - Context Export
## Session Continuity Document for Magic MCP Wireframe Generation

**Export Date**: 2026-01-04
**Purpose**: Complete context transfer for visual wireframe generation with Magic MCP
**Next Session Goal**: Generate designed UI components using @21st-dev/magic

---

# SECTION 1: EXECUTIVE SUMMARY

## Project Vision
**CDS Market Intelligence Platform** - A B2B SaaS solution providing AI-powered market analysis for businesses.

### Key Facts
| Aspect | Value |
|--------|-------|
| **Type** | B2B SaaS Platform |
| **MVP Focus** | Market Intelligence Agent ONLY |
| **Backend** | N8N Workflow (CDS-RAG PROD V13.0) |
| **AI Model** | Claude Opus 4.5 |
| **RAG Storage** | Pinecone Vector Store |
| **Pricing Model** | Per-user subscription |

### What It Does
1. Companies onboard their business data (9 categories)
2. Data is vectorized and stored in Pinecone (tenant-isolated)
3. Users can launch market intelligence analyses
4. AI generates comprehensive reports using company context + web research
5. Results are presented in a modern dashboard

---

# SECTION 2: CRITICAL ARCHITECTURE DECISIONS

## Non-Negotiable Design Choices

### 1. SIDEBAR Navigation (NOT Header Menu)
```
Rationale: Platform will expand to multiple AI agents
- Current MVP: Market Intelligence (active)
- Future Locked: Product Intel, Sales Intel, Content Engine
- Sidebar allows clear module separation and expansion
```

### 2. RBAC System (6 Levels)
```
Hierarchy:
├── Super_Admin (Platform owner - full access)
├── Tenant_Admin (Company admin - tenant-wide access)
├── Marketing (Analysis + company data)
├── Sales (Analysis + CRM data - future)
├── Product (Analysis + roadmap - future)
└── Analyst (Read-only analysis access)
```

### 3. Multi-Tenant Architecture
```
- Each company = isolated tenant
- Data segregation via tenantId
- Pinecone namespaces per tenant
- No cross-tenant data leakage
```

### 4. RAG Validation Workflow
```
Document Upload → Pending Status → Admin Review → Approve/Reject/Request Changes
                                              ↓
                        If Approved → Vectorize → Add to Pinecone
```

### 5. Future-Ready Module Structure
```
Sidebar Sections:
├── MARKET INTELLIGENCE (Active)
│   ├── Dashboard
│   ├── Mon Entreprise
│   ├── Watchlist
│   ├── Lancer Analyse
│   ├── Résultats
│   └── Historique
├── PRODUCT INTEL (Locked - Coming Soon)
├── SALES INTEL (Locked - Coming Soon)
├── CONTENT ENGINE (Locked - Coming Soon)
└── ADMIN SECTION (Admin only)
    ├── RAG Management
    ├── Validations
    ├── Users
    └── Settings
```

---

# SECTION 3: DATA MODEL

## The 9 CDS Categories (Company Onboarding)

Based on CDS CSV template analysis, every company provides data in these categories:

### 1. Company Overview (Vue Générale)
```typescript
interface CompanyOverview {
  name: string;
  brandName: string;
  productName: string;
  website: string;
  foundedYear: number;
  employeeCount: string; // "1-10", "11-50", etc.
  headquarters: string;
  description: string;
  mission: string;
  vision: string;
}
```

### 2. Product/Features (Produit)
```typescript
interface ProductFeatures {
  mainProduct: string;
  features: Feature[];
  pricingModel: string;
  pricingTiers: PricingTier[];
  uniqueSellingPoints: string[];
  limitations: string[];
}
```

### 3. Industries (Secteurs)
```typescript
interface Industries {
  primaryIndustry: string;
  secondaryIndustries: string[];
  verticals: string[];
  marketSegments: string[];
}
```

### 4. Personas (Buyer Personas)
```typescript
interface Persona {
  title: string;
  role: string;
  painPoints: string[];
  goals: string[];
  decisionCriteria: string[];
  objections: string[];
}
```

### 5. Competitors (Concurrents)
```typescript
interface Competitor {
  name: string;
  website: string;
  positioning: string;
  strengths: string[];
  weaknesses: string[];
  pricingComparison: string;
}
```

### 6. Clients/Pipeline
```typescript
interface ClientData {
  existingClients: Client[];
  caseStudies: CaseStudy[];
  pipelineStages: string[];
  averageDealSize: number;
  salesCycle: string;
}
```

### 7. Use Cases
```typescript
interface UseCase {
  title: string;
  description: string;
  targetPersona: string;
  valueProposition: string;
  implementation: string;
}
```

### 8. Positioning (Positionnement)
```typescript
interface Positioning {
  tagline: string;
  valueProposition: string;
  differentiators: string[];
  marketPosition: string; // "Leader", "Challenger", "Niche"
  competitiveAdvantage: string;
}
```

### 9. Technology (Stack Technique)
```typescript
interface Technology {
  platform: string[];
  integrations: string[];
  security: string[];
  compliance: string[];
  infrastructure: string;
}
```

---

# SECTION 4: SCREEN SPECIFICATIONS

## 10 Screens to Design with Magic MCP

### Screen 1: Dashboard

#### Admin Version
```
┌─────────────────────────────────────────────────────────┐
│ Header: "Dashboard Admin" + Date + Notifications        │
├─────────────────────────────────────────────────────────┤
│ Stats Row (4 cards):                                    │
│ [Total Users] [Active Analyses] [Pending RAG] [Tickets] │
├─────────────────────────────────────────────────────────┤
│ Left Column (60%):          │ Right Column (40%):       │
│ ┌─────────────────────────┐ │ ┌───────────────────────┐ │
│ │ Recent Analyses         │ │ │ Pending Validations   │ │
│ │ - Analysis 1 (Today)    │ │ │ - Doc 1 (Approve/Rej) │ │
│ │ - Analysis 2 (Yesterday)│ │ │ - Doc 2 (Approve/Rej) │ │
│ └─────────────────────────┘ │ └───────────────────────┘ │
│ ┌─────────────────────────┐ │ ┌───────────────────────┐ │
│ │ System Health           │ │ │ Recent Tickets        │ │
│ │ [API Status] [RAG OK]   │ │ │ - Ticket #1 (Open)    │ │
│ └─────────────────────────┘ │ └───────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

#### Marketing Version
```
┌─────────────────────────────────────────────────────────┐
│ Header: "Tableau de Bord" + Company Name                │
├─────────────────────────────────────────────────────────┤
│ Stats Row (3 cards):                                    │
│ [Analyses This Month] [Competitors Tracked] [Insights]  │
├─────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Competitor Activity Timeline (Chart)                │ │
│ └─────────────────────────────────────────────────────┘ │
│ ┌──────────────────────┐ ┌────────────────────────────┐ │
│ │ Recent Analyses      │ │ Top Insights               │ │
│ │ • Competitive Scan   │ │ • Competitor X launched... │ │
│ │ • Market Trends      │ │ • Industry trend: ...      │ │
│ └──────────────────────┘ └────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Screen 2: Mon Entreprise (Company Profile)

```
┌─────────────────────────────────────────────────────────┐
│ Header: "Mon Entreprise" + [Edit Mode Toggle]           │
├─────────────────────────────────────────────────────────┤
│ Tab Navigation:                                         │
│ [Overview] [Product] [Industries] [Personas] [More ▼]   │
├─────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Company Card (Logo, Name, Website, Stats)           │ │
│ └─────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Section Content (Based on active tab)               │ │
│ │ • Display mode: Clean cards with data               │ │
│ │ • Edit mode: Form fields with save/cancel           │ │
│ └─────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ RAG Sync Status                                     │ │
│ │ Last sync: Jan 4, 2026 | [Sync Now] [View History]  │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Screen 3: Watchlist Compétiteurs

```
┌─────────────────────────────────────────────────────────┐
│ Header: "Watchlist" + [+ Add Competitor]                │
├─────────────────────────────────────────────────────────┤
│ Search: [Search competitors...] [Filter ▼]             │
├─────────────────────────────────────────────────────────┤
│ Grid Layout (3 columns):                                │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐        │
│ │ Competitor 1│ │ Competitor 2│ │ Competitor 3│        │
│ │ [Logo]      │ │ [Logo]      │ │ [Logo]      │        │
│ │ Name        │ │ Name        │ │ Name        │        │
│ │ Last scan:  │ │ Last scan:  │ │ Last scan:  │        │
│ │ 2 days ago  │ │ 1 week ago  │ │ Today       │        │
│ │ [View][Del] │ │ [View][Del] │ │ [View][Del] │        │
│ └─────────────┘ └─────────────┘ └─────────────┘        │
└─────────────────────────────────────────────────────────┘
```

### Screen 4: Lancer Analyse

```
┌─────────────────────────────────────────────────────────┐
│ Header: "Nouvelle Analyse"                              │
├─────────────────────────────────────────────────────────┤
│ Step Indicator: [1 Type] ─ [2 Config] ─ [3 Confirm]     │
├─────────────────────────────────────────────────────────┤
│ Analysis Type Selection (Cards):                        │
│ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐  │
│ │ 📊 Market     │ │ ⚔️ Competitive│ │ 📈 Trend      │  │
│ │ Overview      │ │ Analysis      │ │ Analysis      │  │
│ │ [Selected]    │ │               │ │               │  │
│ └───────────────┘ └───────────────┘ └───────────────┘  │
├─────────────────────────────────────────────────────────┤
│ Configuration Options:                                  │
│ • Depth: [Standard ▼]                                   │
│ • Focus Areas: [✓ Pricing] [✓ Features] [  Marketing]   │
│ • Competitors: [Select specific or all watchlist]       │
├─────────────────────────────────────────────────────────┤
│ [Cancel]                              [Launch Analysis] │
└─────────────────────────────────────────────────────────┘
```

### Screen 5: Résultats d'Analyse

```
┌─────────────────────────────────────────────────────────┐
│ Header: "Résultat: Market Analysis - Jan 4, 2026"       │
│ Actions: [Export PDF] [Export Word] [Share] [Archive]   │
├─────────────────────────────────────────────────────────┤
│ TOC Sidebar (20%):      │ Content Area (80%):          │
│ ┌─────────────────────┐ │ ┌───────────────────────────┐│
│ │ Table of Contents   │ │ │ ## Executive Summary      ││
│ │ • Executive Summary │ │ │ Lorem ipsum dolor sit...  ││
│ │ • Market Overview   │ │ │                           ││
│ │ • Competitor Deep   │ │ │ ## Market Overview        ││
│ │ • Recommendations   │ │ │ [Chart: Market Size]      ││
│ │ • Appendix          │ │ │ Lorem ipsum...            ││
│ └─────────────────────┘ │ │                           ││
│                         │ │ ## Competitor Analysis    ││
│ Metadata:               │ │ [Comparison Table]        ││
│ • Duration: 3m 24s      │ │                           ││
│ • Sources: 47           │ │ ## Recommendations        ││
│ • Confidence: 94%       │ │ 1. Focus on...            ││
│                         │ └───────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

### Screen 6: RAG Management (Admin Only)

```
┌─────────────────────────────────────────────────────────┐
│ Header: "RAG Management" + [Upload New]                 │
├─────────────────────────────────────────────────────────┤
│ Tabs: [All Documents] [Pending (3)] [Approved] [Rejected]│
├─────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────┐ │
│ │ UPLOAD ZONE (Drag & Drop)                           │ │
│ │ ┌─────────────────────────────────────────────────┐ │ │
│ │ │  📄 Drop files here or click to browse          │ │ │
│ │ │  Supported: PDF, DOCX, TXT, CSV, MD             │ │ │
│ │ └─────────────────────────────────────────────────┘ │ │
│ └─────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────┤
│ Document List Table:                                    │
│ ┌──────────────────────────────────────────────────────┐│
│ │ Name          │ Type │ Status  │ Uploaded   │Actions ││
│ ├──────────────────────────────────────────────────────┤│
│ │ product.pdf   │ PDF  │ ⏳Pending│ Today      │[Review]││
│ │ competitors.md│ MD   │ ✅Approved│ Yesterday  │[View]  ││
│ │ old-data.csv  │ CSV  │ ❌Rejected│ 3 days ago │[View]  ││
│ └──────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

### Screen 7: Validation Review Modal

```
┌─────────────────────────────────────────────────────────┐
│ Modal: "Review Document: product-specs.pdf"      [X]    │
├─────────────────────────────────────────────────────────┤
│ Left Panel (50%):        │ Right Panel (50%):          │
│ ┌──────────────────────┐ │ ┌────────────────────────┐  │
│ │ Document Preview     │ │ │ Extracted Chunks       │  │
│ │                      │ │ │ ┌────────────────────┐ │  │
│ │ [PDF Viewer]         │ │ │ │ Chunk 1 (Page 1)   │ │  │
│ │                      │ │ │ │ "Product features..│ │  │
│ │                      │ │ │ └────────────────────┘ │  │
│ │                      │ │ │ ┌────────────────────┐ │  │
│ │                      │ │ │ │ Chunk 2 (Page 1-2) │ │  │
│ │                      │ │ │ │ "Technical specs..│ │  │
│ │                      │ │ │ └────────────────────┘ │  │
│ └──────────────────────┘ │ └────────────────────────┘  │
├─────────────────────────────────────────────────────────┤
│ Admin Notes: [Add notes for rejection reason...]        │
├─────────────────────────────────────────────────────────┤
│ [Request Changes]        [Reject]        [✓ Approve]    │
└─────────────────────────────────────────────────────────┘
```

### Screen 8: Ticket System

```
┌─────────────────────────────────────────────────────────┐
│ Header: "Support & Feedback" + [+ New Ticket]           │
├─────────────────────────────────────────────────────────┤
│ Filter: [All] [Open] [In Progress] [Resolved]           │
├─────────────────────────────────────────────────────────┤
│ Ticket List:                                            │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ #142 Feature Request: Export to Notion    🟡 Open   │ │
│ │ Submitted by: Marie D. | 2 days ago | 3 comments    │ │
│ ├─────────────────────────────────────────────────────┤ │
│ │ #141 Bug: Analysis stuck at 80%           🟢 Resolved│ │
│ │ Submitted by: Jean P. | 5 days ago | 5 comments     │ │
│ ├─────────────────────────────────────────────────────┤ │
│ │ #140 Question: How to add competitors?    🔵 Progress│ │
│ │ Submitted by: Admin | 1 week ago | 2 comments       │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Screen 9: Historique des Analyses

```
┌─────────────────────────────────────────────────────────┐
│ Header: "Historique" + [Export All]                     │
├─────────────────────────────────────────────────────────┤
│ Filters: [Date Range ▼] [Type ▼] [Status ▼] [Search...] │
├─────────────────────────────────────────────────────────┤
│ Results Table:                                          │
│ ┌──────────────────────────────────────────────────────┐│
│ │ Date       │ Type        │ Status    │ Duration│Act ││
│ ├──────────────────────────────────────────────────────┤│
│ │ Jan 4, 26  │ Market      │ ✅ Complete│ 3:24    │[→] ││
│ │ Jan 3, 26  │ Competitive │ ✅ Complete│ 5:12    │[→] ││
│ │ Jan 2, 26  │ Trend       │ ❌ Failed  │ 0:45    │[↻] ││
│ │ Dec 28, 25 │ Market      │ ✅ Complete│ 4:01    │[→] ││
│ └──────────────────────────────────────────────────────┘│
│ Pagination: [< Prev] Page 1 of 12 [Next >]              │
└─────────────────────────────────────────────────────────┘
```

### Screen 10: Settings & User Management

```
┌─────────────────────────────────────────────────────────┐
│ Header: "Settings"                                      │
├─────────────────────────────────────────────────────────┤
│ Sidebar:                │ Content:                      │
│ ┌─────────────────────┐ │ ┌───────────────────────────┐│
│ │ • Profile           │ │ │ PROFILE SETTINGS          ││
│ │ • Security          │ │ │                           ││
│ │ • Notifications     │ │ │ Name: [Gil ________]      ││
│ │ ─────────────────── │ │ │ Email: [gil@company.com]  ││
│ │ ADMIN ONLY:         │ │ │ Role: Admin               ││
│ │ • Team Members      │ │ │ Timezone: [Paris ▼]       ││
│ │ • API Keys          │ │ │                           ││
│ │ • Billing           │ │ │ [Save Changes]            ││
│ │ • Audit Logs        │ │ └───────────────────────────┘│
│ └─────────────────────┘ │                              │
└─────────────────────────────────────────────────────────┘
```

---

# SECTION 5: DESIGN SYSTEM

## Color Tokens

```css
/* Primary - Blue */
--color-primary-50: #EFF6FF;
--color-primary-100: #DBEAFE;
--color-primary-200: #BFDBFE;
--color-primary-300: #93C5FD;
--color-primary-400: #60A5FA;
--color-primary-500: #3B82F6;
--color-primary-600: #2563EB;  /* Main Primary */
--color-primary-700: #1D4ED8;
--color-primary-800: #1E40AF;
--color-primary-900: #1E3A8A;

/* Secondary - Violet */
--color-secondary-500: #8B5CF6;
--color-secondary-600: #7C3AED;  /* Main Secondary */
--color-secondary-700: #6D28D9;

/* Semantic Colors */
--color-success: #10B981;  /* Green */
--color-warning: #F59E0B;  /* Amber */
--color-error: #EF4444;    /* Red */
--color-info: #3B82F6;     /* Blue */

/* Neutrals - Slate */
--color-neutral-50: #F8FAFC;
--color-neutral-100: #F1F5F9;
--color-neutral-200: #E2E8F0;
--color-neutral-300: #CBD5E1;
--color-neutral-400: #94A3B8;
--color-neutral-500: #64748B;
--color-neutral-600: #475569;
--color-neutral-700: #334155;
--color-neutral-800: #1E293B;
--color-neutral-900: #0F172A;

/* Backgrounds */
--bg-primary: #FFFFFF;
--bg-secondary: #F8FAFC;
--bg-sidebar: #0F172A;
--bg-sidebar-hover: #1E293B;
```

## Typography

```css
/* Font Family */
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;

/* Font Sizes */
--text-xs: 0.75rem;     /* 12px */
--text-sm: 0.875rem;    /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;     /* 20px */
--text-2xl: 1.5rem;     /* 24px */
--text-3xl: 1.875rem;   /* 30px */
--text-4xl: 2.25rem;    /* 36px */

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;

/* Line Heights */
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
```

## Spacing System

```css
/* Base: 4px */
--space-0: 0;
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

## Border Radius

```css
--radius-sm: 0.25rem;   /* 4px */
--radius-md: 0.375rem;  /* 6px */
--radius-lg: 0.5rem;    /* 8px */
--radius-xl: 0.75rem;   /* 12px */
--radius-2xl: 1rem;     /* 16px */
--radius-full: 9999px;
```

## Shadows

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
```

## Component Specifications

### Sidebar
```
Width Expanded: 240px
Width Collapsed: 64px
Background: --bg-sidebar (#0F172A)
Text Color: --color-neutral-300
Active Item: --color-primary-500 background with white text
Hover: --bg-sidebar-hover
Transition: 200ms ease-in-out
```

### Cards
```
Background: white
Border: 1px solid --color-neutral-200
Border Radius: --radius-lg (8px)
Padding: --space-6 (24px)
Shadow: --shadow-sm
Hover Shadow: --shadow-md
```

### Buttons
```
Primary:
  - Background: --color-primary-600
  - Text: white
  - Hover: --color-primary-700
  - Padding: 10px 16px
  - Border Radius: --radius-md

Secondary:
  - Background: white
  - Border: 1px solid --color-neutral-300
  - Text: --color-neutral-700
  - Hover: --color-neutral-50

Danger:
  - Background: --color-error
  - Text: white
```

### Status Badges
```
Pending:
  - Background: --color-warning / 10%
  - Text: --color-warning
  - Icon: Clock

Approved:
  - Background: --color-success / 10%
  - Text: --color-success
  - Icon: CheckCircle

Rejected:
  - Background: --color-error / 10%
  - Text: --color-error
  - Icon: XCircle
```

### Form Inputs
```
Border: 1px solid --color-neutral-300
Border Radius: --radius-md
Padding: 10px 14px
Focus: 2px ring --color-primary-500
Error: Border --color-error
```

---

# SECTION 6: ONBOARDING WIZARD

## 9-Step Company Onboarding Flow

### Wizard Navigation
```
Progress Bar: Step X of 9
[Previous] [Skip (optional fields)] [Next/Save]
Auto-save on each step completion
```

### Step 1: Vue Générale
```
Fields:
- Company Name (required)
- Brand Name
- Product/Service Name (required)
- Website URL
- Founded Year
- Employee Count (dropdown: 1-10, 11-50, 51-200, 201-500, 500+)
- Headquarters Location
- Company Description (textarea)
- Mission Statement
- Vision Statement
```

### Step 2: Produit/Features
```
Fields:
- Main Product Description (required)
- Key Features (dynamic list, add/remove)
- Pricing Model (dropdown: Subscription, One-time, Freemium, Usage-based)
- Pricing Tiers (dynamic list with name + price)
- Unique Selling Points (3-5 items)
- Known Limitations
```

### Step 3: Industries
```
Fields:
- Primary Industry (searchable dropdown)
- Secondary Industries (multi-select)
- Specific Verticals
- Target Market Segments
- Geographic Focus
```

### Step 4: Personas
```
Repeatable Section (Add Persona):
- Persona Title (e.g., "Marketing Director")
- Role Description
- Pain Points (list)
- Goals (list)
- Decision Criteria
- Common Objections
```

### Step 5: Compétiteurs
```
Repeatable Section (Add Competitor):
- Competitor Name (required)
- Website
- How they position themselves
- Their Strengths
- Their Weaknesses
- Price Comparison
```

### Step 6: Clients/Pipeline
```
Fields:
- Notable Clients (list)
- Case Study Summaries
- Typical Sales Cycle Duration
- Average Deal Size
- Pipeline Stages Used
- Win Rate (if known)
```

### Step 7: Use Cases
```
Repeatable Section (Add Use Case):
- Use Case Title
- Description
- Target Persona
- Value Delivered
- Implementation Approach
```

### Step 8: Positionnement
```
Fields:
- Company Tagline
- Core Value Proposition (textarea)
- Key Differentiators (3-5)
- Market Position (Leader/Challenger/Niche/New Entrant)
- Competitive Advantage Summary
```

### Step 9: Technologie
```
Fields:
- Platform/Tech Stack
- Key Integrations (list)
- Security Features
- Compliance Certifications (GDPR, SOC2, etc.)
- Infrastructure (Cloud provider, etc.)
```

### Confirmation Screen
```
Summary of all entered data
[ ] Confirm data accuracy
[Complete Setup] → Triggers RAG sync
Progress indicator for vectorization
"Your data is being processed. You'll receive an email when ready."
```

---

# SECTION 7: RBAC PERMISSION MATRIX

| Feature | Super_Admin | Tenant_Admin | Marketing | Sales | Product | Analyst |
|---------|-------------|--------------|-----------|-------|---------|---------|
| Dashboard | Full | Full | Marketing | Sales | Product | Read |
| Company Profile | Full | Full | Edit | View | View | View |
| Watchlist | Full | Full | Edit | Edit | Edit | View |
| Launch Analysis | Full | Full | Yes | Yes | Yes | No |
| View Results | Full | Full | Yes | Yes | Yes | Yes |
| RAG Management | Full | Yes | No | No | No | No |
| Pending Validations | Full | Yes | No | No | No | No |
| User Management | Full | Yes | No | No | No | No |
| Tickets | Full | Full | Create | Create | Create | Create |
| Settings | Full | Full | Profile | Profile | Profile | Profile |
| Billing | Full | Yes | No | No | No | No |
| Audit Logs | Full | Yes | No | No | No | No |

---

# SECTION 8: FILES REFERENCE

## Existing Documentation

| File | Path | Lines | Content |
|------|------|-------|---------|
| Wireframes V2 | `/Users/gil/Desktop/CDS-Platform-MVP/wireframes/WIREFRAMES_MVP_V2.md` | 847 | Complete ASCII wireframes with RBAC, RAG workflow, design tokens |
| Onboarding Wizard | `/Users/gil/Desktop/CDS-Platform-MVP/wireframes/ONBOARDING_WIZARD.md` | 649 | 9-step wizard detailed specs |
| Architecture | `/Users/gil/Desktop/CDS-Platform-MVP/ARCHITECTURE_MVP_COMPLETE.md` | 525 | Tech stack, data models, implementation plan |

## Directory Structure
```
/Users/gil/Desktop/CDS-Platform-MVP/
├── wireframes/
│   ├── WIREFRAMES_MVP_V2.md
│   └── ONBOARDING_WIZARD.md
├── ARCHITECTURE_MVP_COMPLETE.md
└── CONTEXT_EXPORT_SESSION.md (this file)
```

---

# SECTION 9: MAGIC MCP INSTRUCTIONS

## For Next Session

### 1. Verify Magic MCP is loaded
```
Check that "magic" tools are available (mcp__magic__*)
```

### 2. Priority Components to Generate

**Phase 1 - Layout Foundation**
1. `AppLayout` - Main layout with collapsible sidebar
2. `Sidebar` - Navigation component with sections and lock icons
3. `Header` - Top bar with user menu and notifications

**Phase 2 - Core Screens**
4. `Dashboard` - Stats cards, charts, activity feed
5. `CompanyProfile` - Tab-based data display with edit mode
6. `AnalysisLauncher` - Multi-step analysis configuration
7. `AnalysisResults` - Markdown viewer with TOC

**Phase 3 - Admin Features**
8. `RAGManagement` - Upload zone, document table, validation modal
9. `TicketSystem` - Ticket list and detail views
10. `UserManagement` - User table with role management

**Phase 4 - Wizard**
11. `OnboardingWizard` - 9-step form wizard

### 3. Framework Target
```
React 18+ with TypeScript
Tailwind CSS for styling
Shadcn/ui or 21st.dev components
Lucide React for icons
React Hook Form for forms
Tanstack Table for data tables
Recharts for charts
```

### 4. Magic MCP API Key
```
API_KEY: 96cd57f7cc02f02e3c83e537bb5e9eb2b01138545e6725209da8ed1e2f7ad41b
```

---

# SECTION 10: N8N BACKEND CONTEXT

## Existing Workflow
- **Name**: CDS-RAG PROD V13.0
- **Purpose**: Market Intelligence analysis orchestration
- **AI Model**: Claude Opus 4.5
- **Vector Store**: Pinecone

## API Integration Points
```
N8N Cloud: https://gilloutmode.app.n8n.cloud
MCP Server: /mcp-server/http

Endpoints to integrate:
- POST /webhook/analyze - Trigger new analysis
- GET /webhook/status/{id} - Check analysis status
- GET /webhook/results/{id} - Fetch results
- POST /webhook/rag/upload - Upload document for RAG
- GET /webhook/rag/status - Check RAG processing status
```

## Environment Variables Needed
```
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://gilloutmode.app.n8n.cloud/webhook
PINECONE_API_KEY=<from-n8n>
PINECONE_INDEX=cds-market-intel
```

---

# QUICK START PROMPT FOR NEW SESSION

Copy this prompt to start the new session:

```
Je continue le projet CDS Market Intelligence Platform.

Context complet: @/Users/gil/Desktop/CDS-Platform-MVP/CONTEXT_EXPORT_SESSION.md

Magic MCP est maintenant configuré. Objectif: Générer les composants UI visuels de la plateforme.

Commence par:
1. Lire le fichier de contexte
2. Confirmer que Magic MCP est disponible
3. Générer le premier composant: AppLayout avec Sidebar

Le design system et toutes les specs sont dans le fichier de contexte.
```

---

**End of Context Export**
*Generated: 2026-01-04*
*Total Sections: 10*
*Ready for Magic MCP wireframe generation*
