// =============================================================================
// DEALLIGENT PLATFORM - AGENTS SECTION
// Section displaying all 6 AI agents in a premium grid layout
// =============================================================================

"use client"

import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { AgentCard, type AgentCardProps } from './AgentCard'
import type { AgentType } from './AgentAvatar'

// =============================================================================
// ANIMATION VARIANTS
// =============================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

// =============================================================================
// AGENTS CONFIGURATION
// =============================================================================

type AgentConfig = Omit<AgentCardProps, 'onLaunch' | 'delay'> & { route: string; isActive: boolean }

const agentsConfig: AgentConfig[] = [
  {
    name: 'Market',
    agent: 'Mia',
    agentType: 'market' as AgentType,
    tagline: 'Votre radar stratégique sur l\'écosystème concurrentiel',
    description: 'L\'agent AI Mia surveille en continu vos compétiteurs et le marché. Elle transforme des heures de veille manuelle en alertes stratégiques priorisées et rapports SWOT actualisés.',
    capabilities: {
      left: [
        'Profil stratégique complet: business model, structure, priorités',
        'Analyse position marché: parts, segments, trajectoire',
        'Détection signaux faibles: investissements, recrutements, brevets',
      ],
      right: [
        'Veille news temps réel avec priorisation impact',
        'Génération SWOT automatisée avec scoring',
        'Analyse prédictive des réponses concurrentielles',
      ],
    },
    result: 'Réduisez de 70% votre temps de veille et anticipez les mouvements concurrents',
    color: '#3B82F6',
    route: '/competitors',
    isActive: true,
  },
  {
    name: 'Product',
    agent: 'Pia',
    agentType: 'product' as AgentType,
    tagline: 'L\'avantage compétitif de votre roadmap produit',
    description: 'L\'agent AI Pia cartographie les portfolios produits concurrents et identifie les gaps stratégiques. Elle vous donne les arguments différenciants pour chaque battle card.',
    capabilities: {
      left: [
        'Mapping portfolios: features, pricing, positionnement',
        'Analyse stacks technologiques: intégrations, API',
        'Veille innovation: brevets, R&D, partenariats tech',
      ],
      right: [
        'Roadmap intelligence: features annoncées, betas',
        'Benchmark fonctionnel avec matrices exportables',
        'Identification moats et gaps d\'investissement',
      ],
    },
    result: 'Des battle cards 3x plus percutantes et une roadmap alignée sur les gaps marché',
    color: '#10B981',
    route: '/product-analysis',
    isActive: false,
  },
  {
    name: 'Sales',
    agent: 'Sia',
    agentType: 'sales' as AgentType,
    tagline: 'Détectez les signaux d\'achat avant vos rivaux',
    description: 'L\'agent AI Sia identifie les opportunités commerciales en analysant les signaux faibles du marché. Elle score vos prospects et accélère vos cycles de vente.',
    capabilities: {
      left: [
        'Analyse buyer personas: rôles, autorité, critères',
        'Mapping parcours achat: triggers, stakeholders',
        'Scoring prédictif des leads',
      ],
      right: [
        'Détection signaux d\'achat: levées, recrutements, appels d\'offres',
        'Battle cards dynamiques avec objections',
        'Analyse préférences concurrentielles',
      ],
    },
    result: 'Accélérez vos cycles de vente de 40% avec des leads pré-qualifiés',
    color: '#F59E0B',
    route: '/sales-analysis',
    isActive: false,
  },
  {
    name: 'Marketing',
    agent: 'Maia',
    agentType: 'marketing' as AgentType,
    tagline: 'Décryptez les stratégies GTM qui performent',
    description: 'L\'agent AI Maia analyse les campagnes, le positionnement et les canaux de vos compétiteurs. Elle identifie les white spaces et opportunités de différenciation.',
    capabilities: {
      left: [
        'Analyse GTM: modèles de vente, stratégies entrée',
        'Audit positionnement: value props, messaging',
        'Benchmark canaux: digital, social, events, PR',
      ],
      right: [
        'Intelligence campagnes: initiatives, patterns, budget',
        'Opportunités différenciation avec playbook 90j',
        'Analyse contenu: thèmes, SEO, thought leadership',
      ],
    },
    result: 'Optimisez votre ROI marketing avec des insights concurrentiels terrain',
    color: '#8B5CF6',
    route: '/marketing-analysis',
    isActive: false,
  },
  {
    name: 'Technology',
    agent: 'Tia',
    agentType: 'technology' as AgentType,
    tagline: 'Une longueur d\'avance sur les disruptions technologiques',
    description: 'L\'agent AI Tia surveille les technologies émergentes et les stacks concurrentes. Elle détecte les signaux de disruption avant qu\'ils n\'impactent votre marché.',
    capabilities: {
      left: [
        'Évaluation TRL (1-9) des technologies émergentes',
        'Analyse potentiel disruptif: impact, timing',
        'Intelligence techno: investissements, partenariats R&D',
      ],
      right: [
        'Signaux recrutement: rôles techniques, expansion',
        'Assessment maturité: enterprise, sécurité, ROI',
        'Recommandations Adopt/Pilot/Monitor',
      ],
    },
    result: 'Anticipez les disruptions 6 mois avant le marché et priorisez vos investissements tech',
    color: '#06B6D4',
    route: '/tech-analysis',
    isActive: false,
  },
  {
    name: 'Talent',
    agent: 'Talia',
    agentType: 'talent' as AgentType,
    tagline: 'Les signaux RH révèlent les stratégies cachées',
    description: 'L\'agent AI Talia analyse les mouvements de personnel et recrutements stratégiques. Les signaux RH sont souvent les premiers indicateurs de pivot stratégique.',
    capabilities: {
      left: [
        'Suivi recrutements clés: C-level, tech leads',
        'Détection départs: executives, talents critiques',
        'Analyse profils recherchés: skills, diversification',
      ],
      right: [
        'Mapping équipes concurrentes: taille, structure',
        'Signaux expansion: bureaux, recrutements géo',
        'Corrélation RH/stratégie: recrutements prédictifs',
      ],
    },
    result: 'Anticipez les pivots stratégiques via les signaux RH 3-6 mois en avance',
    color: '#EC4899',
    route: '/talent-analysis',
    isActive: false,
  },
]

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function AgentsSection() {
  const navigate = useNavigate()

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="py-8 px-8"
      aria-labelledby="agents-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div variants={itemVariants} className="mb-10 text-center">
          <h2
            id="agents-heading"
            className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 mb-3"
          >
            Competitive Agentic Solutions
          </h2>
          <p className="text-[var(--text-primary)] text-3xl font-bold tracking-tight mb-4">
            Vos Agents Spécialisés
          </p>
          <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full" />
        </motion.div>

        {/* Agents Grid - Equal heights with grid-auto-rows */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ gridAutoRows: '1fr' }}
        >
          {agentsConfig.map((agent, index) => (
            <AgentCard
              key={agent.name}
              name={agent.name}
              agent={agent.agent}
              agentType={agent.agentType}
              tagline={agent.tagline}
              description={agent.description}
              capabilities={agent.capabilities}
              result={agent.result}
              color={agent.color}
              onLaunch={() => navigate(agent.route)}
              delay={index * 0.08}
              isActive={agent.isActive}
            />
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default AgentsSection
