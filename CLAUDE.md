# Dealigent Platform - Market Intelligence

## Projet
- **Nom**: Dealigent (anciennement CDS-Platform-MVP)
- **Stack**: React + TypeScript + Vite + TailwindCSS + Framer Motion
- **Thème**: Light/Dark mode avec ThemeContext

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
│   ├── MyCompany.tsx          # Profil entreprise Dealigent
│   ├── Watchlist.tsx          # Surveillance concurrents
│   ├── LaunchAnalysis.tsx     # Lancer analyses (wizard n8n)
│   ├── Results.tsx            # Résultats d'analyses
│   ├── RAGManagement.tsx      # Gestion base de connaissances
│   ├── Reports.tsx
│   ├── Alerts.tsx
│   ├── Settings.tsx
│   └── Help.tsx
├── styles/
│   └── globals.css            # Design system premium
├── Router.tsx
└── main.tsx
```

## Design System Premium (globals.css)

### Classes principales
- `card-premium` / `card-glass` - Cartes glassmorphism
- `btn-premium` / `btn-ghost-glow` - Boutons premium
- `icon-gradient-blue/green/purple/orange` - Icônes gradient
- `badge-glow-blue/green/red/orange/purple` - Badges lumineux
- `stat-card-premium` - Cartes statistiques
- `hero-premium` - En-têtes de page

### Patterns Framer Motion
```tsx
whileHover={{ y: -4, scale: 1.02 }}
whileTap={{ scale: 0.98 }}
```

## Commandes

```bash
npm run dev      # Démarrer le serveur (port 5173+)
npm run build    # Build production
npm run lint     # Linter
```

## Intégrations
- **n8n**: Workflows CDS-RAG pour analyses Market Intelligence
- **Perplexity AI, Exa, SerpAPI**: Sources de données
- **Neo4j**: Base de données graphe (optionnel)

## Contexte métier
Plateforme d'intelligence concurrentielle pour l'industrie CAO/FAO (nTopology, Altair, Siemens NX, PTC Creo, etc.)
