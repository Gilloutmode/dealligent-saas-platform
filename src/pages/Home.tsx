// =============================================================================
// DEALLIGENT PLATFORM - HOME / LANDING PAGE
// App Launcher hub presenting all intelligence modules
// =============================================================================

"use client"

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  Package,
  DollarSign,
  Megaphone,
  Cpu,
  Users,
} from 'lucide-react'
import { useAnalysis } from '../contexts/AnalysisContext'
import { competitors, recentActivity as staticRecentActivity } from '../data/clientData'
import {
  HeroSection,
  AppLauncherCard,
  QuickStats,
  RecentActivity,
  type AppLauncherCardProps,
  type ActivityItem,
} from '../components/home'

// =============================================================================
// INTELLIGENCE MODULES CONFIGURATION
// =============================================================================

type ModuleConfig = Omit<AppLauncherCardProps, 'delay' | 'stats'>

const intelligenceModules: ModuleConfig[] = [
  {
    title: 'Market Intelligence',
    description: 'Analysez vos concurrents en profondeur. Insights stratégiques, SWOT automatisés et veille continue.',
    icon: <TrendingUp className="w-7 h-7" />,
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-purple-500',
    glowColor: 'rgba(59, 130, 246, 0.35)',
    status: 'active',
    route: '/competitors',
  },
  {
    title: 'Product Intelligence',
    description: 'Comparez vos produits avec la concurrence. Benchmark features et analyse de positionnement.',
    icon: <Package className="w-7 h-7" />,
    gradientFrom: 'from-emerald-500',
    gradientTo: 'to-teal-500',
    glowColor: 'rgba(16, 185, 129, 0.35)',
    status: 'coming-soon',
    route: '/product-analysis',
  },
  {
    title: 'Sales Intelligence',
    description: 'Identifiez les opportunités commerciales. Scoring de leads et signaux d\'achat.',
    icon: <DollarSign className="w-7 h-7" />,
    gradientFrom: 'from-orange-500',
    gradientTo: 'to-amber-500',
    glowColor: 'rgba(249, 115, 22, 0.35)',
    status: 'coming-soon',
    route: '/sales-analysis',
  },
  {
    title: 'Marketing Intelligence',
    description: 'Surveillez les campagnes concurrentes. Analyse de positionnement et stratégies marketing.',
    icon: <Megaphone className="w-7 h-7" />,
    gradientFrom: 'from-pink-500',
    gradientTo: 'to-rose-500',
    glowColor: 'rgba(236, 72, 153, 0.35)',
    status: 'coming-soon',
    route: '/marketing-analysis',
  },
  {
    title: 'Technology Intelligence',
    description: 'Analysez les stacks technologiques. Veille innovation et tendances tech.',
    icon: <Cpu className="w-7 h-7" />,
    gradientFrom: 'from-indigo-500',
    gradientTo: 'to-violet-500',
    glowColor: 'rgba(99, 102, 241, 0.35)',
    status: 'coming-soon',
    route: '/tech-analysis',
  },
  {
    title: 'Talent Intelligence',
    description: 'Suivez les mouvements RH concurrents. Recrutements clés et évolutions d\'équipes.',
    icon: <Users className="w-7 h-7" />,
    gradientFrom: 'from-cyan-500',
    gradientTo: 'to-sky-500',
    glowColor: 'rgba(6, 182, 212, 0.35)',
    status: 'coming-soon',
    route: '/talent-analysis',
  },
]

// =============================================================================
// ANIMATION VARIANTS
// =============================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

export function HomePage() {
  const { completedAnalyses } = useAnalysis()

  // Calculate quick stats
  const stats = useMemo(() => {
    const analyzedCount = completedAnalyses.length

    // Parse score from qualityScore string (e.g., "11/12 (92%)")
    const scores = completedAnalyses
      .map(a => {
        const match = a.response?.data?.qualityScore?.match(/\((\d+)%\)/)
        return match ? parseInt(match[1], 10) : null
      })
      .filter((s): s is number => s !== null)

    const avgScore = scores.length > 0
      ? Math.round(scores.reduce((sum, s) => sum + s, 0) / scores.length)
      : 0

    return {
      competitors: competitors.length,
      analyses: analyzedCount,
      avgScore,
      alerts: staticRecentActivity?.filter(a => a.type === 'alert').length || 0,
    }
  }, [completedAnalyses])

  // Transform recent activity for display
  const activities = useMemo<ActivityItem[]>(() => {
    // Combine completed analyses with static activity
    const analysisActivities: ActivityItem[] = completedAnalyses
      .slice(0, 3)
      .map(analysis => ({
        id: analysis.id,
        type: 'analysis' as const,
        title: `${analysis.competitor} analysé`,
        description: `Analyse ${analysis.analysisType || 'standard'} terminée`,
        timestamp: formatTimestamp(analysis.completedAt),
        threatLevel: analysis.response?.data?.threatLevel?.toLowerCase() as 'high' | 'medium' | 'low' | undefined,
        route: `/results/${analysis.id}`,
      }))

    // Add static alerts if available
    const alertActivities: ActivityItem[] = (staticRecentActivity || [])
      .filter(a => a.type === 'alert')
      .slice(0, 2)
      .map((a, i) => ({
        id: `alert-${i}`,
        type: 'alert' as const,
        title: a.title || 'Nouvelle alerte',
        description: a.description || 'Activité détectée',
        timestamp: a.timestamp || 'Récemment',
      }))

    return [...analysisActivities, ...alertActivities].slice(0, 5)
  }, [completedAnalyses])

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-full"
    >
      {/* Hero Section */}
      <HeroSection />

      {/* Intelligence Modules Grid */}
      <motion.section variants={sectionVariants} className="py-8 px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">
              Modules d'Intelligence
            </h2>
            <div className="h-px bg-gradient-to-r from-[var(--border-light)] to-transparent max-w-xs" />
          </motion.div>

          {/* Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {intelligenceModules.map((module, index) => (
              <AppLauncherCard
                key={module.title}
                {...module}
                delay={index * 0.1}
                stats={
                  module.status === 'active'
                    ? { label: 'concurrents', value: stats.competitors }
                    : undefined
                }
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Quick Stats */}
      <motion.div variants={sectionVariants}>
        <QuickStats
          competitors={stats.competitors}
          analyses={stats.analyses}
          avgScore={stats.avgScore}
          alerts={stats.alerts}
        />
      </motion.div>

      {/* Recent Activity */}
      <motion.div variants={sectionVariants}>
        <RecentActivity activities={activities} maxItems={5} />
      </motion.div>

      {/* Footer Note */}
      <motion.div
        variants={sectionVariants}
        className="py-8 px-8 text-center"
      >
        <p className="text-sm text-[var(--text-muted)]">
          Plus de modules d'intelligence à venir.{' '}
          <span className="text-blue-600">Restez à l'écoute.</span>
        </p>
      </motion.div>
    </motion.div>
  )
}

// =============================================================================
// HELPERS
// =============================================================================

function formatTimestamp(date?: Date | string): string {
  if (!date) return 'Récemment'

  const now = new Date()
  const d = new Date(date)
  const diffMs = now.getTime() - d.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 60) return `il y a ${diffMins}min`
  if (diffHours < 24) return `il y a ${diffHours}h`
  if (diffDays < 7) return `il y a ${diffDays}j`
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}

export default HomePage
