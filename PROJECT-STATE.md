# Dealligent Project State

> 📍 Ce fichier est mis à jour après chaque feature majeure pour maintenir la conscience du projet.

## Last Updated
**2026-01-25** - Homepage Animations Overhaul (VC Demo)

---

## 🏗️ Architecture Actuelle

### Stack
- **Frontend**: React 18 + TypeScript 5.7 + Vite 6
- **Backend**: n8n Cloud (architecture n8n-first)
- **Database**: PostgreSQL + pgvector
- **AI**: Claude Opus 4.5 (extraction intelligence)

### Design System
- Magic UI pour KPIs animés
- Framer Motion pour animations
- Glassmorphism premium
- Typographie: Cabinet Grotesk / General Sans

---

## ✅ Travail Complété

### Phase 1: Foundation
- [x] Setup projet React + TypeScript + Vite
- [x] Design System Glassmorphism
- [x] AppLayout avec Sidebar
- [x] Routing React Router 7

### Phase 2: Pages Core
- [x] Dashboard avec KPIs animés (NumberTicker)
- [x] Homepage Vision 3 Levels
- [x] Watchlist page
- [x] Results page

### Phase 3: Architecture Agents (2026-01-24)
- [x] Migration vers architecture single-window
- [x] 7 agents Dealligent créés:
  - 3 techniques: frontend-expert, backend-expert, code-reviewer
  - 4 business: optimist, critic, neutral, innovator

---

## 🚧 Travail En Cours

| Feature | Status | Assigné | Notes |
|---------|--------|---------|-------|
| Homepage Animations VC Demo | 🟡 En cours | frontend-expert | Level 2 & 3 restants |

### Plan: Homepage Animations & Copy Overhaul
**Objectif**: Refaire TOUTES les animations des cartes (sauf NotebookMockup = OK)
**Target**: VCs tier 1 / Investisseurs haut niveau
**Fichier plan**: `.claude/plans/eventual-marinating-galaxy.md`

#### Progress Tracker
| Level | Section | Cards | Status |
|-------|---------|-------|--------|
| Level 1 | Internal Sources | 6/6 | ✅ DONE |
| Level 2 | External Sources (Agents) | 1/6 | 🟡 MIA done |
| Level 3 | DIGEST Learning | 0/4 | ⏳ Pending |
| Copy | VC-level texts | 0/3 | ⏳ Pending |

#### Level 1 Animations (COMPLETED)
- [x] UploadMockupAnimated - Multi-format upload avec DataCore vortex
- [x] ClassificationMockupAnimated - Document flies to category
- [x] RagChatMockupAnimated - 3-column notebook style
- [x] ProfileContextMockupAnimated - Same RAG + profile colors
- [x] TraceabilityMockupAnimated - Highlights + connections + sources
- [x] ReportsMockupAnimated - Report template filling in real-time

#### Level 2 Animations (IN PROGRESS)
- [x] MIA (Market Agent) - 3-column: Sources → Agent Processing → PDF Report
- [ ] PIA (Product Agent)
- [ ] SIA (Sales Agent)
- [ ] MAIA (Marketing Agent)
- [ ] TIA (Technology Agent)
- [ ] TALIA (Talent Agent)

#### Level 3 Animations (PENDING)
- [ ] TopicSelector (amélioration)
- [ ] DailyMicroLessons (NOUVEAU)
- [ ] FlashcardsQuizzes (NOUVEAU)
- [ ] ProgressTracking (NOUVEAU)

---

## 📋 Backlog Prioritaire

### P0 (Critique)
- [ ] Intégration auth (Clerk/Auth0/Supabase)
- [ ] Connection n8n webhooks
- [ ] Multi-tenancy frontend (x-tenant-id headers)

### P1 (Important)
- [ ] LaunchAnalysis wizard
- [ ] RAGManagement page
- [ ] Alerts page

### P2 (Nice to Have)
- [ ] Dark mode toggle
- [ ] Export PDF reports
- [ ] Notifications temps réel

---

## ⚠️ Blocages Connus

| Blocage | Impact | Solution Proposée |
|---------|--------|-------------------|
| Auth provider non choisi | Bloque intégration backend | Décider Clerk vs Auth0 vs Supabase |

---

## 📊 Métriques Projet

### Coverage
- Unit Tests: 0% (à implémenter)
- E2E Tests: 0% (à implémenter)

### Performance
- Score Review: **78/100** (amélioré de 62/100)
- Bundle Initial: **429KB** (gzip: 137KB) - réduit ~25%
- Code Splitting: ✅ Implémenté (13 pages lazy-loaded)
- Re-renders: ✅ Corrigés (Level1/2 sections, EnrichedKPICard)

---

## 🔗 Fichiers Clés

| Fichier | Description |
|---------|-------------|
| `CLAUDE.md` | Configuration principale Claude Code |
| `CLAUDE.local.md` | Instructions locales (non versionné) |
| `src/router.tsx` | Configuration des routes (code splitting) |
| `src/components/ui/PageLoader.tsx` | Fallback Suspense pour lazy loading |
| `src/styles/globals.css` | Design system CSS |

---

## 📝 Historique des Sessions

### 2026-01-25 - Homepage Animations VC Demo
**Focus**: Refonte complète des animations homepage pour démo investisseurs

**Level 1 - Internal Sources (6 cartes) - TERMINÉ**:
- [x] Upload: DataCore vortex avec particules
- [x] Classification: Document vole vers catégorie + highlighting
- [x] RAG Chat: Layout 3 colonnes style NotebookMockup
- [x] Profile Context: Même style + couleurs par profil (Sales=orange, Support=blue, Product=green)
- [x] Traceability: Highlights + connexions SVG + sources avec confidence %
- [x] Reports: Template qui se remplit en temps réel + progress bar

**Level 2 - Agents (1/6) - EN COURS**:
- [x] MIA (Market): 3 colonnes Sources → Agent Processing → PDF Report

**Standardisation Animations**:
- [x] Audit des boucles infinies (22+ dans Upload, plusieurs dans Traceability)
- [x] Fix: `repeat: Infinity` → `repeat: shouldAnimate ? N : 0`
- [x] Comportement uniforme: joue 1x → s'arrête → hover replay

**Fichiers modifiés**:
- `src/components/home-vision/animations/level1/*.tsx` (6 fichiers)
- `src/components/home-vision/animations/level2/MiaMockupAnimated.tsx`

**Prochaine session**: PIA, SIA, MAIA, TIA, TALIA + Level 3

---

### 2026-01-24 (Session 3) - Performance Review
**Focus**: Optimisation performance React

**Issues identifiées (6 HIGH)**:
1. ❌ Aucun code splitting sur routes
2. ❌ JSX inline dans Level1Section (re-renders)
3. ❌ JSX inline dans Level2Section (re-renders)
4. ❌ Math.random() pour gradientId (re-renders SVG)
5. ❌ sparklineData instable
6. ❌ 13+ mockups animés en parallèle

**Fixes implémentés**:
- [x] `React.lazy()` + `Suspense` sur toutes les pages
- [x] `PageLoader.tsx` créé comme fallback
- [x] Level1Section: `APPLICATIONS_DATA` → module level + `useMemo`
- [x] Level2Section: `AGENTS_DATA` → module level + `useMemo`
- [x] EnrichedKPICard: `useId()` pour gradientId
- [x] EnrichedKPICard: `useRef` pour sparkline fallback

**Résultats**:
- Score: 62/100 → **78/100**
- Bundle: réduit **~25%**
- Commit: `13d0c29`
- Branch: `feature/demo-improvements` (pushed)

---

### 2026-01-24 (Session 2)
**Durée**: ~30 min
**Fait**:
- [x] Tous agents techniques → Opus 4.5
- [x] Couleurs attribuées aux 7 agents
- [x] Système de routing automatique configuré
- [x] Règles démarrage/fin de session ajoutées
- [x] Hook session-end mis à jour

**Prochaine session**: Tester le workflow complet

---

### 2026-01-24 (Session 1)
**Fait**:
- [x] Création des 7 agents Dealligent
- [x] Architecture single-window adoptée
- [x] Suppression de l'architecte séparé
- [x] PROJECT-STATE.md créé

---

## 🤖 Agents Disponibles

### Techniques (3) - Tous Opus 4.5
| Agent | Couleur | Usage |
|-------|---------|-------|
| 🔵 `dealligent-frontend-expert` | Blue | React, TypeScript, UI/UX, Magic UI |
| 🟣 `dealligent-backend-expert` | Purple | n8n, PostgreSQL, Multi-tenancy |
| 🔴 `dealligent-code-reviewer` | Red | Security, Quality, Tests |

### Business (4) - Sonnet
| Agent | Couleur | Personnalité |
|-------|---------|--------------|
| 🟢 `dealligent-optimist` | Green | Visionnaire réaliste |
| 🟠 `dealligent-critic` | Orange | Avocat du diable |
| ⚪ `dealligent-neutral` | White | Analyste objectif |
| 🟡 `dealligent-innovator` | Yellow | Créatif disruptif |

### Invocation
```
"Lance dealligent-frontend-expert pour..."
"Utilise dealligent-critic pour challenger..."
```
