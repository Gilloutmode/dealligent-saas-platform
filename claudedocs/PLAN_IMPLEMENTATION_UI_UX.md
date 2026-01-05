# Plan d'Implémentation UI/UX - Dealigent Platform

**Version**: 1.0
**Date**: 5 janvier 2026
**Durée estimée**: 8 semaines
**Effort total**: 88-111 heures (~12h/semaine)

---

## Executive Summary

Ce plan détaille l'implémentation complète des améliorations UI/UX identifiées dans l'audit. L'approche est structurée en 4 phases progressives avec des milestones clairs et des critères de succès mesurables.

### Objectifs Clés
- Conformité WCAG AA (accessibilité)
- Score Lighthouse 90+ (toutes catégories)
- Design system unifié et documenté
- Navigation mobile complète
- 85%+ de réutilisation des composants

---

## Architecture Technique

### Dépendances à Ajouter

```bash
# Composants accessibles (headless)
npm install @radix-ui/react-dialog @radix-ui/react-select @radix-ui/react-tooltip @radix-ui/react-dropdown-menu

# Notifications
npm install sonner

# Utilitaires
npm install clsx

# Testing (dev)
npm install -D @axe-core/react
```

### Structure de Fichiers Cible

```
src/
├── components/
│   ├── ui/                      # Design System
│   │   ├── index.ts             # Barrel export
│   │   ├── Button.tsx           # ✅ Existant - améliorer
│   │   ├── Card.tsx             # ✅ Existant - améliorer
│   │   ├── Badge.tsx            # 🆕 Créer
│   │   ├── Input.tsx            # 🆕 Créer
│   │   ├── Select.tsx           # 🆕 Créer (Radix)
│   │   ├── Modal.tsx            # 🆕 Créer (Radix)
│   │   ├── Drawer.tsx           # 🆕 Créer
│   │   ├── Skeleton.tsx         # 🆕 Créer
│   │   ├── Toast.tsx            # 🆕 Créer (Sonner)
│   │   ├── Breadcrumbs.tsx      # 🆕 Créer
│   │   └── Tooltip.tsx          # 🆕 Créer (Radix)
│   ├── layout/
│   │   ├── AppLayout.tsx        # ✅ Améliorer (mobile)
│   │   └── MobileNav.tsx        # 🆕 Créer
│   └── icons/
│       └── index.ts             # Barrel optimisé
├── styles/
│   ├── globals.css              # ✅ Améliorer
│   └── tokens.ts                # 🆕 Créer
├── hooks/
│   ├── useMediaQuery.ts         # 🆕 Créer
│   └── useToast.ts              # 🆕 Créer
└── lib/
    └── utils.ts                 # Utilitaires (cn, etc.)
```

---

## Phase 1: Fondations & Corrections Critiques

**Durée**: Semaine 1-2
**Effort**: 15-20 heures
**Priorité**: P0 (Critique)

### Sprint 1.1: Accessibilité (Jours 1-2)

#### Tâche A1: Focus States Globaux
**Fichier**: `src/styles/globals.css`
**Effort**: 2-3h

```css
/* Ajouter après les classes existantes */

/* ========================================
   ACCESSIBILITY - Focus States
   ======================================== */

/* Focus ring utility */
.focus-ring {
  @apply focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-primary/50
         focus-visible:ring-offset-2 focus-visible:ring-offset-surface-primary;
}

/* Global focus states for interactive elements */
button:focus-visible,
a:focus-visible,
[role="button"]:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible,
[tabindex]:focus-visible {
  @apply outline-none ring-2 ring-blue-primary/50 ring-offset-2 ring-offset-surface-primary;
}

/* Skip link */
.skip-link {
  @apply sr-only focus:not-sr-only focus:absolute focus:z-[100]
         focus:top-4 focus:left-4 focus:px-4 focus:py-2
         focus:bg-blue-primary focus:text-white focus:rounded-lg
         focus:shadow-lg focus:ring-2 focus:ring-white;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

#### Tâche A2: Aria Labels
**Fichiers**: Toutes les pages
**Effort**: 3-4h

Éléments à corriger:
- [ ] Watchlist.tsx: boutons filter, menu, star, delete
- [ ] LaunchAnalysis.tsx: boutons de sélection
- [ ] Results.tsx: boutons download, share, close
- [ ] AppLayout.tsx: bouton theme toggle, menu items

Exemple de correction:
```tsx
// AVANT
<button className="p-2 rounded-lg">
  <Filter className="w-5 h-5" />
</button>

// APRÈS
<button
  className="p-2 rounded-lg focus-ring"
  aria-label="Filtrer les résultats"
>
  <Filter className="w-5 h-5" aria-hidden="true" />
</button>
```

#### Tâche A3: Skip Link
**Fichier**: `src/components/layout/AppLayout.tsx`
**Effort**: 1h

```tsx
// Ajouter au début du composant AppLayout
<a href="#main-content" className="skip-link">
  Aller au contenu principal
</a>

// Ajouter id au contenu principal
<main id="main-content" className="flex-1 overflow-auto">
  {children}
</main>
```

### Sprint 1.2: Navigation Mobile (Jours 3-5)

#### Tâche B1: Mobile Menu State
**Fichier**: `src/components/layout/AppLayout.tsx`
**Effort**: 2h

```tsx
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

// Fermer menu quand route change
useEffect(() => {
  setIsMobileMenuOpen(false)
}, [location.pathname])

// Empêcher scroll quand menu ouvert
useEffect(() => {
  if (isMobileMenuOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
  return () => {
    document.body.style.overflow = ''
  }
}, [isMobileMenuOpen])
```

#### Tâche B2: Composant MobileNav
**Fichier**: `src/components/layout/MobileNav.tsx`
**Effort**: 3-4h

```tsx
import { motion, AnimatePresence } from 'framer-motion'
import { X, Menu } from 'lucide-react'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export function MobileNav({ isOpen, onClose, children }: MobileNavProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-y-0 left-0 z-50 w-72 bg-sidebar lg:hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <span className="text-xl font-bold text-white">Dealigent</span>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/10 focus-ring"
                aria-label="Fermer le menu"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <nav className="p-4">
              {children}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Header mobile (à ajouter dans AppLayout)
export function MobileHeader({ onMenuOpen }: { onMenuOpen: () => void }) {
  return (
    <header className="flex items-center justify-between p-4 border-b border-color-secondary lg:hidden">
      <span className="text-xl font-bold gradient-text-blue">Dealigent</span>
      <button
        onClick={onMenuOpen}
        className="p-2 rounded-lg hover:bg-surface-secondary focus-ring"
        aria-label="Ouvrir le menu"
      >
        <Menu className="w-6 h-6 text-primary" />
      </button>
    </header>
  )
}
```

### Critères de Succès Phase 1
- [ ] Focus visible sur tous les éléments interactifs
- [ ] Tous les boutons icônes ont un aria-label
- [ ] Skip link fonctionnel
- [ ] Menu mobile fonctionne sur tous les breakpoints
- [ ] Score Lighthouse A11y ≥ 70

---

## Phase 2: Composants Design System

**Durée**: Semaine 2-4
**Effort**: 25-30 heures
**Priorité**: P1 (Important)

### Sprint 2.1: Tokens & Fondation (Jour 1)

#### Tâche C1: Design Tokens
**Fichier**: `src/styles/tokens.ts`
**Effort**: 3h

```typescript
// =============================================================================
// DEALIGENT - DESIGN TOKENS
// Single source of truth for all design values
// =============================================================================

export const tokens = {
  colors: {
    // Primary palette
    primary: {
      DEFAULT: '#2563EB',
      50: '#EFF6FF',
      100: '#DBEAFE',
      200: '#BFDBFE',
      300: '#93C5FD',
      400: '#60A5FA',
      500: '#3B82F6',
      600: '#2563EB',
      700: '#1D4ED8',
      800: '#1E40AF',
      900: '#1E3A8A',
    },
    // Semantic colors
    semantic: {
      success: '#10B981',
      successLight: '#D1FAE5',
      warning: '#F59E0B',
      warningLight: '#FEF3C7',
      error: '#EF4444',
      errorLight: '#FEE2E2',
      info: '#06B6D4',
      infoLight: '#CFFAFE',
    },
    // Surface colors (dark mode)
    surface: {
      primary: '#0A0F1E',
      secondary: '#111827',
      tertiary: '#1F2937',
      elevated: '#374151',
    },
    // Text colors
    text: {
      primary: '#F9FAFB',
      secondary: '#9CA3AF',
      muted: '#6B7280',
      inverse: '#111827',
    },
  },

  spacing: {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
  },

  borderRadius: {
    sm: '0.375rem',  // 6px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    '2xl': '1.5rem', // 24px
    full: '9999px',
  },

  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
    glow: {
      blue: '0 0 20px rgba(37, 99, 235, 0.3)',
      purple: '0 0 20px rgba(124, 58, 237, 0.3)',
      green: '0 0 20px rgba(16, 185, 129, 0.3)',
      orange: '0 0 20px rgba(245, 158, 11, 0.3)',
      red: '0 0 20px rgba(239, 68, 68, 0.3)',
    },
  },

  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    },
  },

  animation: {
    duration: {
      fast: '150ms',
      normal: '200ms',
      slow: '300ms',
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    },
  },

  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const

// Utility function for conditional classes
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
```

### Sprint 2.2: Composants Simples (Jours 2-3)

#### Tâche D1: Badge.tsx
**Effort**: 2-3h

```tsx
import { cn } from '@/styles/tokens'

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'purple'

interface BadgeProps {
  variant?: BadgeVariant
  glow?: boolean
  size?: 'sm' | 'md'
  children: React.ReactNode
  className?: string
}

const variants: Record<BadgeVariant, string> = {
  default: 'bg-surface-tertiary text-secondary border-color-secondary',
  success: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  warning: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  error: 'bg-red-500/20 text-red-400 border-red-500/30',
  info: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
}

const glowVariants: Record<BadgeVariant, string> = {
  default: '',
  success: 'shadow-lg shadow-emerald-500/25',
  warning: 'shadow-lg shadow-amber-500/25',
  error: 'shadow-lg shadow-red-500/25',
  info: 'shadow-lg shadow-blue-500/25',
  purple: 'shadow-lg shadow-purple-500/25',
}

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
}

export function Badge({
  variant = 'default',
  glow = false,
  size = 'sm',
  children,
  className
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-medium rounded-full border',
        variants[variant],
        sizes[size],
        glow && glowVariants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
```

#### Tâche D5: Skeleton.tsx
**Effort**: 2h

```tsx
import { cn } from '@/styles/tokens'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular'
}

export function Skeleton({ className, variant = 'rectangular' }: SkeletonProps) {
  const baseClasses = 'animate-pulse bg-surface-secondary'

  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  }

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], className)}
      aria-hidden="true"
    />
  )
}

// Preset skeletons for common use cases
export function CardSkeleton() {
  return (
    <div className="card-premium p-6 space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton className="w-12 h-12" variant="circular" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
    </div>
  )
}

export function StatSkeleton() {
  return (
    <div className="stat-card-premium p-4">
      <Skeleton className="h-3 w-20 mb-2" />
      <Skeleton className="h-8 w-24 mb-1" />
      <Skeleton className="h-3 w-16" />
    </div>
  )
}

export function TableRowSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-color-secondary">
      <Skeleton className="w-10 h-10" variant="circular" />
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-4 w-1/6" />
      <Skeleton className="h-4 w-1/6" />
      <Skeleton className="h-6 w-16 rounded-full" />
    </div>
  )
}
```

### Sprint 2.3: Composants Complexes (Jours 4-7)

#### Tâche D2: Input.tsx
**Effort**: 4-5h

```tsx
import { forwardRef, InputHTMLAttributes, ReactNode, useId } from 'react'
import { cn } from '@/styles/tokens'
import { AlertCircle, Eye, EyeOff, Search } from 'lucide-react'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  helperText?: string
  error?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'filled'
}

const sizes = {
  sm: 'h-9 text-sm px-3',
  md: 'h-10 text-sm px-4',
  lg: 'h-12 text-base px-4',
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      size = 'md',
      variant = 'default',
      className,
      type = 'text',
      id: propId,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const id = propId || generatedId
    const errorId = `${id}-error`
    const helperId = `${id}-helper`

    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === 'password'
    const inputType = isPassword && showPassword ? 'text' : type

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-primary mb-1.5"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={id}
            type={inputType}
            className={cn(
              'w-full rounded-xl border bg-surface-tertiary text-primary placeholder:text-secondary',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-blue-primary/50 focus:border-blue-primary',
              sizes[size],
              leftIcon && 'pl-10',
              (rightIcon || isPassword || error) && 'pr-10',
              error
                ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500'
                : 'border-color-secondary hover:border-color-primary',
              className
            )}
            aria-invalid={!!error}
            aria-describedby={cn(
              error && errorId,
              helperText && !error && helperId
            )}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary focus-ring rounded"
              aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          )}

          {error && !isPassword && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
              <AlertCircle className="w-4 h-4" />
            </div>
          )}

          {rightIcon && !error && !isPassword && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p id={errorId} className="mt-1.5 text-sm text-red-500" role="alert">
            {error}
          </p>
        )}

        {helperText && !error && (
          <p id={helperId} className="mt-1.5 text-sm text-secondary">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

// Search Input preset
export function SearchInput(props: Omit<InputProps, 'leftIcon' | 'type'>) {
  return (
    <Input
      type="search"
      leftIcon={<Search className="w-4 h-4" />}
      placeholder="Rechercher..."
      {...props}
    />
  )
}
```

[Suite dans le fichier - voir composants Modal, Select, Toast...]

---

## Phase 3: Migration des Pages

**Durée**: Semaine 4-5
**Effort**: 22-26 heures
**Priorité**: P1 (Important)

### Checklist par Page

#### Watchlist.tsx
- [ ] Remplacer badges inline par `<Badge>`
- [ ] Remplacer input recherche par `<SearchInput>`
- [ ] Remplacer modal par `<Modal>`
- [ ] Ajouter `aria-label` sur tous les boutons
- [ ] Ajouter `<Skeleton>` pour loading
- [ ] Ajouter `<Breadcrumbs>`

#### LaunchAnalysis.tsx
- [ ] Utiliser `<Input>` pour formulaires
- [ ] Utiliser `<Select>` pour dropdowns
- [ ] Ajouter validation de formulaire
- [ ] Ajouter feedback toast sur soumission
- [ ] Ajouter `<Breadcrumbs>`

#### Results.tsx
- [ ] Remplacer modal par `<Modal>`
- [ ] Utiliser `<Badge>` unifié
- [ ] Ajouter `<Skeleton>` pour loading
- [ ] Ajouter `<Breadcrumbs>`

#### Dashboard.tsx
- [ ] Utiliser `<StatCard>` de Card.tsx
- [ ] Ajouter `<StatSkeleton>` pour loading
- [ ] Améliorer accessibilité des charts

---

## Phase 4: Polish & Qualité

**Durée**: Semaine 6-8
**Effort**: 26-35 heures
**Priorité**: P2 (Amélioration)

### Checklist Qualité

#### Performance
- [ ] Audit Lighthouse Performance ≥ 90
- [ ] Bundle analysis et optimisation
- [ ] Lazy loading des pages
- [ ] Images optimisées

#### Accessibilité
- [ ] Audit axe-core clean
- [ ] Test clavier complet
- [ ] Test lecteur d'écran
- [ ] Contrastes WCAG AA

#### Documentation
- [ ] JSDoc sur tous les composants
- [ ] README composants
- [ ] Guide de contribution

---

## Calendrier Récapitulatif

```
┌──────────┬─────────────────────────────────────────┬──────────────┐
│ Semaine  │ Focus                                   │ Effort       │
├──────────┼─────────────────────────────────────────┼──────────────┤
│ 1-2      │ Phase 1: A11y + Mobile                  │ 15-20h       │
│ 2-3      │ Phase 2: Tokens + Composants simples    │ 12-15h       │
│ 3-4      │ Phase 2: Composants complexes           │ 13-15h       │
│ 4-5      │ Phase 3: Migration pages                │ 22-26h       │
│ 6-7      │ Phase 4: Performance + Tests            │ 16-20h       │
│ 8        │ Phase 4: Documentation + QA             │ 10-15h       │
├──────────┼─────────────────────────────────────────┼──────────────┤
│ TOTAL    │                                         │ 88-111h      │
└──────────┴─────────────────────────────────────────┴──────────────┘
```

---

## Métriques de Succès

| Métrique | Baseline | Cible | Mesure |
|----------|----------|-------|--------|
| Lighthouse A11y | ~65 | 95+ | Lighthouse CI |
| Lighthouse Perf | ~75 | 90+ | Lighthouse CI |
| WCAG Compliance | Partiel | AA | axe-core |
| Composants réutilisés | ~40% | 85%+ | Code review |
| Bundle size | Baseline | -10% | webpack-bundle-analyzer |
| Mobile responsive | 70% | 100% | Test manuel |

---

## Risques & Mitigations

| Risque | Impact | Mitigation |
|--------|--------|------------|
| Régression visuelle | Haut | Tests visuels, review PR |
| Breaking changes | Haut | Migration incrémentale |
| Scope creep | Moyen | Backlog strict, MVP first |
| Dépendances Radix | Faible | Version lock, abstraction |

---

*Document généré par Claude Code - Plan d'Implémentation UI/UX v1.0*
