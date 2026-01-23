// LEVEL 2 SECTION - External Sources
// "6 AI agents monitoring your competitive landscape"
// ANIMATED with cycling working states using Framer Motion

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Radar, Search, Globe, BarChart3, Brain } from 'lucide-react'
import { LevelCard } from './LevelCard'
import { AgentCardVision } from './AgentCardVision'

// Agent messages for each role
const agentMessages: Record<string, string[]> = {
  'Mia': [
    'Scanning market data...',
    'Found 15 competitors',
    'Analyzing market trends...',
    'Mapping competitive landscape...',
    'Complete!'
  ],
  'Pia': [
    'Comparing product features...',
    'Analyzing 23 features',
    'Benchmarking pricing...',
    'Tracking roadmap changes...',
    'Complete!'
  ],
  'Sia': [
    'Reviewing recent deals...',
    'Found 8 win/loss patterns',
    'Extracting objections...',
    'Building battlecards...',
    'Complete!'
  ],
  'Maia': [
    'Scanning competitor content...',
    'Found 12 campaigns',
    'Analyzing SEO keywords...',
    'Generating insights...',
    'Complete!'
  ],
  'Tia': [
    'Analyzing tech stacks...',
    'Detected 9 integrations',
    'Reviewing architecture...',
    'Tracking innovations...',
    'Complete!'
  ],
  'Talia': [
    'Scanning job postings...',
    'Found 34 open positions',
    'Identifying key hires...',
    'Mapping org structure...',
    'Complete!'
  ],
}

const agents = [
  { name: 'Mia', role: 'Market Agent', tagline: 'Market trends & competitive landscape',
    capabilities: ['Market sizing & growth analysis', 'Competitive landscape mapping', 'Trend identification', 'Segment analysis', 'Opportunity mapping'],
    invokeCommand: '/market @Mia', accentColor: 'blue' },
  { name: 'Pia', role: 'Product Agent', tagline: 'Feature comparison & roadmap analysis',
    capabilities: ['Feature comparison matrices', 'Roadmap tracking', 'Pricing analysis', 'UX/UI benchmarking', 'Integration mapping'],
    invokeCommand: '/product @Pia', accentColor: 'purple' },
  { name: 'Sia', role: 'Sales Agent', tagline: 'Win/loss patterns & deal intelligence',
    capabilities: ['Win/loss pattern analysis', 'Competitive deals tracking', 'Objection handling intel', 'Battlecard creation', 'Pricing intelligence'],
    invokeCommand: '/sales @Sia', accentColor: 'green' },
  { name: 'Maia', role: 'Marketing Agent', tagline: 'Content creation, SEO, and GTM intelligence',
    capabilities: ['SEO-optimized content (articles, briefs)', 'LinkedIn posts & thought leadership', 'Case studies & white papers', 'Outbound prospecting & ICP refinement', 'Campaign intelligence & best practices'],
    invokeCommand: '/marketing @Maia', accentColor: 'pink' },
  { name: 'Tia', role: 'Technology Agent', tagline: 'Tech stack & innovation radar',
    capabilities: ['Tech stack analysis', 'Architecture review', 'Innovation radar', 'Patent/IP tracking', 'Integration assessment'],
    invokeCommand: '/technology @Tia', accentColor: 'cyan' },
  { name: 'Talia', role: 'Talent Agent', tagline: 'Team composition & hiring patterns',
    capabilities: ['Team composition analysis', 'Hiring patterns detection', 'Key hire tracking', 'Org structure mapping', 'Culture signals'],
    invokeCommand: '/talent @Talia', accentColor: 'orange' },
]

const invocationMethods = [
  { method: '/SLASH COMMANDS', description: 'Type /market in chat' },
  { method: '@MENTIONS', description: 'Use @Mia in your query' },
  { method: 'SIDEBAR PANEL', description: 'Click agent icon on right' },
  { method: '+ BUTTON', description: 'Add agent to enrich response' },
]

const dataSources = [
  { icon: Search, name: 'Perplexity AI', description: 'Real-time web intelligence' },
  { icon: Globe, name: 'Exa Search', description: 'Deep web discovery' },
  { icon: BarChart3, name: 'SerpAPI', description: 'SERP and competitive ads' },
  { icon: Brain, name: 'Claude Opus 4.5', description: 'Strategic analysis engine' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

// ============================================================
// AGENT WORK CYCLE HOOK
// ============================================================
function useAgentCycle(agentNames: string[]) {
  const [activeAgentIndex, setActiveAgentIndex] = useState<number | null>(null)
  const [progress, setProgress] = useState(0)
  const [messageIndex, setMessageIndex] = useState(0)
  const [isWorking, setIsWorking] = useState(false)

  const startWork = useCallback(() => {
    // Pick a random agent
    const randomIndex = Math.floor(Math.random() * agentNames.length)
    setActiveAgentIndex(randomIndex)
    setIsWorking(true)
    setProgress(0)
    setMessageIndex(0)
  }, [agentNames.length])

  // Progress animation
  useEffect(() => {
    if (!isWorking || activeAgentIndex === null) return

    // Animate progress from 0 to 100
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          return 100
        }
        return prev + 2
      })
    }, 80) // 4 seconds to complete (50 * 80ms)

    return () => clearInterval(progressInterval)
  }, [isWorking, activeAgentIndex])

  // Message cycling based on progress
  useEffect(() => {
    if (!isWorking || activeAgentIndex === null) return

    if (progress < 20) setMessageIndex(0)
    else if (progress < 40) setMessageIndex(1)
    else if (progress < 60) setMessageIndex(2)
    else if (progress < 80) setMessageIndex(3)
    else setMessageIndex(4)
  }, [progress, isWorking, activeAgentIndex])

  // Complete work and cycle
  useEffect(() => {
    if (progress >= 100 && isWorking) {
      const timer = setTimeout(() => {
        setIsWorking(false)
        setActiveAgentIndex(null)
        setProgress(0)
        setMessageIndex(0)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [progress, isWorking])

  // Start cycle
  useEffect(() => {
    // Initial delay before first agent starts
    const initialTimer = setTimeout(startWork, 2000)
    return () => clearTimeout(initialTimer)
  }, [startWork])

  // Repeat cycle
  useEffect(() => {
    if (!isWorking && activeAgentIndex === null) {
      const cycleTimer = setTimeout(startWork, 3000)
      return () => clearTimeout(cycleTimer)
    }
  }, [isWorking, activeAgentIndex, startWork])

  return {
    activeAgentIndex,
    progress,
    messageIndex,
    isWorking
  }
}

// ============================================================
// LEVEL 2 SECTION - MAIN EXPORT
// ============================================================
export function Level2Section() {
  const agentNames = agents.map(a => a.name)
  const { activeAgentIndex, progress, messageIndex, isWorking } = useAgentCycle(agentNames)

  return (
    <section className="py-16 px-8 border-b border-white/5">
      <div className="max-w-7xl mx-auto">
        <LevelCard
          level={2}
          title="External Sources"
          tagline="6 AI agents monitoring your competitive landscape"
          description="Strategic intelligence on demand. Invoke agents for deep market analysis."
          icon={Radar}
        >
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            {/* 6 Agents Grid */}
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {agents.map((agent, index) => {
                const isActive = activeAgentIndex === index && isWorking
                const messages = agentMessages[agent.name] || []
                const currentMessage = messages[messageIndex] || ''

                return (
                  <AgentCardVision 
                    key={agent.name} 
                    {...agent}
                    workingState={{
                      isWorking: isActive,
                      progress: isActive ? progress : 0,
                      message: isActive ? currentMessage : ''
                    }}
                  />
                )
              })}
            </motion.div>

            {/* Invocation Methods */}
            <motion.div variants={itemVariants} className="mb-12">
              <h4 className="text-xs uppercase tracking-wider text-[var(--text-muted)] mb-4">Invocation Methods</h4>
              <div className="flex flex-wrap gap-3">
                {invocationMethods.map((m) => (
                  <div key={m.method} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-xs font-bold text-[var(--text-primary)]">{m.method}</p>
                    <p className="text-[10px] text-[var(--text-muted)]">{m.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Data Sources */}
            <motion.div variants={itemVariants}>
              <h4 className="text-xs uppercase tracking-wider text-[var(--text-muted)] mb-4">Data Sources</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {dataSources.map((s) => (
                  <div key={s.name} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                    <s.icon className="w-5 h-5 text-[var(--c-brand)]" />
                    <div>
                      <p className="text-sm font-medium text-[var(--text-primary)]">{s.name}</p>
                      <p className="text-[10px] text-[var(--text-muted)]">{s.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </LevelCard>
      </div>
    </section>
  )
}

export default Level2Section
