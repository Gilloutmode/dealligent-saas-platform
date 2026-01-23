// =============================================================================
// DEALLIGENT PLATFORM - HOME / LANDING PAGE
// App Launcher hub presenting all applications
// =============================================================================

"use client"

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useAnalysis } from '../contexts/AnalysisContext'
import { competitors, recentActivity as staticRecentActivity } from '../data/clientData'
import {
  HeroSection,
  AgentsSection,
  RoadmapSection,
  QuickStats,
  RecentActivity,
  type ActivityItem,
} from '../components/home'

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

      {/* Agents Section */}
      <motion.div variants={sectionVariants}>
        <AgentsSection />
      </motion.div>

      {/* Roadmap Section */}
      <motion.div variants={sectionVariants}>
        <RoadmapSection />
      </motion.div>

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
          Plus d'applications à venir.{' '}
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
