// LEVEL 3 SECTION - Media Digest Engine
// "AI agents continuously scraping, analyzing, and delivering insights"
// ANIMATED LIVE FEED with Framer Motion

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Rss, Youtube, MessageCircle, Linkedin, Newspaper,
  Clock, Mail, FileText, Bell, GraduationCap,
  Building2, TrendingUp, Cpu, DollarSign, Tag, Plus, Check,
  ExternalLink
} from 'lucide-react'
import { LevelCard } from './LevelCard'
import { ApplicationCard } from './ApplicationCard'

// ============================================================
// FEED DATA
// ============================================================
interface FeedItem {
  id: string
  source: 'youtube' | 'reddit' | 'linkedin' | 'techcrunch'
  title: string
  summary: string
  timestamp: string
  isNew: boolean
  relevanceScore: number
}

const sourceConfig = {
  youtube: { icon: Youtube, color: 'text-red-400', bg: 'bg-red-500/20' },
  reddit: { icon: MessageCircle, color: 'text-orange-400', bg: 'bg-orange-500/20' },
  linkedin: { icon: Linkedin, color: 'text-blue-400', bg: 'bg-blue-500/20' },
  techcrunch: { icon: Newspaper, color: 'text-green-400', bg: 'bg-green-500/20' },
}

// Pool of possible feed items
const feedItemPool: Omit<FeedItem, 'id' | 'isNew'>[] = [
  {
    source: 'youtube',
    title: 'Competitor X announces new AI feature',
    summary: 'Deep dive into their latest product update and market implications...',
    timestamp: '2 min ago',
    relevanceScore: 94,
  },
  {
    source: 'reddit',
    title: 'r/SaaS: "Anyone using Competitor Y?"',
    summary: 'Thread with 47 comments discussing pain points and alternatives...',
    timestamp: '5 min ago',
    relevanceScore: 87,
  },
  {
    source: 'linkedin',
    title: 'CTO of Rival Corp shares roadmap hints',
    summary: 'Executive post revealing Q2 focus areas and hiring plans...',
    timestamp: '12 min ago',
    relevanceScore: 91,
  },
  {
    source: 'techcrunch',
    title: 'Series B: Market disruptor raises $45M',
    summary: 'New entrant backed by top VCs, targeting enterprise segment...',
    timestamp: '18 min ago',
    relevanceScore: 88,
  },
  {
    source: 'youtube',
    title: 'Industry analyst reviews top 5 platforms',
    summary: 'Comprehensive comparison including pricing and feature breakdown...',
    timestamp: '25 min ago',
    relevanceScore: 92,
  },
  {
    source: 'reddit',
    title: 'r/Startups: "Switching from Legacy to Modern"',
    summary: 'Migration stories and lessons learned from 23 respondents...',
    timestamp: '32 min ago',
    relevanceScore: 85,
  },
  {
    source: 'linkedin',
    title: 'VP Sales at Competitor Z joins new startup',
    summary: 'Key executive move signaling potential strategic shift...',
    timestamp: '45 min ago',
    relevanceScore: 89,
  },
  {
    source: 'techcrunch',
    title: 'Market Report: B2B SaaS trends 2026',
    summary: 'Annual report highlighting consolidation and AI adoption rates...',
    timestamp: '1 hour ago',
    relevanceScore: 86,
  },
  {
    source: 'youtube',
    title: 'Product demo leak from upcoming launch',
    summary: 'Early look at features rumored for Q2 release cycle...',
    timestamp: '1 hour ago',
    relevanceScore: 93,
  },
  {
    source: 'reddit',
    title: 'r/Sales: "Best CI tools for enterprise?"',
    summary: 'Active discussion comparing platforms for competitive intel...',
    timestamp: '2 hours ago',
    relevanceScore: 90,
  },
]

// AI Scraping Agents
const scrapingAgents = [
  { icon: Youtube, name: 'YouTube Agent', capabilities: ['New video detection from tracked channels', 'Automatic transcript analysis', 'Key points extraction', 'Relevant clip identification'] },
  { icon: MessageCircle, name: 'Reddit Agent', capabilities: ['Subreddit monitoring (industry, competitors)', 'Sentiment analysis on discussions', 'Trending topic detection', 'Expert opinion identification'] },
  { icon: Linkedin, name: 'Social Media Agent', capabilities: ['LinkedIn: Company posts, executive thoughts', 'Twitter/X: Real-time announcements', 'Engagement pattern analysis'] },
  { icon: Newspaper, name: 'News & Press Agent', capabilities: ['Tech publications (TechCrunch, VentureBeat)', 'Industry-specific outlets', 'Press releases and announcements', 'Regulatory and legal filings'] },
]

// Topic Categories
const topicCategories = [
  { icon: Building2, title: 'Competitors', items: ['Company A', 'Company B'], addLabel: 'Add competitor' },
  { icon: TrendingUp, title: 'Market & Industry', items: ['Industry trends', 'Market reports'], addLabel: 'Add topic' },
  { icon: Cpu, title: 'Technology', items: ['AI/ML developments', 'Cloud infrastructure'], addLabel: 'Add technology' },
  { icon: DollarSign, title: 'Funding & M&A', items: ['Funding rounds', 'Acquisitions'], addLabel: 'Add event type' },
]

const customKeywords = ['generative AI', 'B2B SaaS', 'competitive intelligence']

// 5 Applications
const digestApplications = [
  { icon: Clock, title: '24/7 Monitoring', description: 'Real-time scanning every 15 minutes', features: ['Duplicate detection and deduplication', 'Source credibility scoring', 'Historical tracking for trend analysis'] },
  { icon: Mail, title: 'Daily Digest', description: 'Top stories ranked by relevance', features: ['Video summaries with key timestamps', 'Social buzz analysis', 'Reddit hot takes', 'Delivery: Email, Slack, in-app, RSS'] },
  { icon: FileText, title: 'Weekly Report', description: 'Executive summary (3-5 key takeaways)', features: ['Competitor deep-dive (one per week)', 'Trend analysis (rising/declining)', 'Opportunity alerts', 'Format: In-app, PDF, PowerPoint'] },
  { icon: Bell, title: 'Smart Alerts', description: 'Real-time notifications on key events', features: ['Funding | Launches | Partnerships', 'M&A | Key Hires | PR Crisis', 'Urgency threshold & quiet hours', 'Channel: Email, Slack, SMS'] },
  { icon: GraduationCap, title: 'Learning & Flashcards', description: 'Auto-generated flashcards from insights', features: ['Spaced repetition for retention', 'Quiz mode for knowledge validation', 'Progress tracking per team member', 'Sales enablement & onboarding'] },
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
// LIVE FEED COMPONENT
// ============================================================
function LiveFeed() {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([])
  const [usedIndices, setUsedIndices] = useState<Set<number>>(new Set())

  // Initialize with 3 items
  useEffect(() => {
    const initialItems: FeedItem[] = [0, 1, 2].map(i => ({
      ...feedItemPool[i],
      id: `item-${Date.now()}-${i}`,
      isNew: false,
    }))
    setFeedItems(initialItems)
    setUsedIndices(new Set([0, 1, 2]))
  }, [])

  // Add new item every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setFeedItems(prev => {
        // Find an unused item
        let nextIndex = -1
        for (let i = 0; i < feedItemPool.length; i++) {
          if (!usedIndices.has(i)) {
            nextIndex = i
            break
          }
        }

        // If all used, reset and pick random
        if (nextIndex === -1) {
          setUsedIndices(new Set())
          nextIndex = Math.floor(Math.random() * feedItemPool.length)
        }

        const newItem: FeedItem = {
          ...feedItemPool[nextIndex],
          id: `item-${Date.now()}`,
          isNew: true,
        }

        setUsedIndices(current => new Set([...current, nextIndex]))

        // Add new item at top, keep max 5 items
        const updated = [newItem, ...prev].slice(0, 5)
        return updated
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [usedIndices])

  // Remove "new" status after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setFeedItems(prev => prev.map(item => ({ ...item, isNew: false })))
    }, 3000)
    return () => clearTimeout(timer)
  }, [feedItems.length])

  return (
    <motion.div variants={itemVariants} className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-xs uppercase tracking-wider text-[var(--text-muted)]">
          Live Intelligence Feed
        </h4>
        <motion.div 
          className="flex items-center gap-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-[10px] text-emerald-400">Monitoring</span>
        </motion.div>
      </div>

      <div className="p-4 rounded-xl bg-black/30 border border-white/5">
        <div className="space-y-3 max-h-[320px] overflow-hidden">
          <AnimatePresence mode="popLayout">
            {feedItems.map((item) => {
              const config = sourceConfig[item.source]
              const Icon = config.icon
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: -30, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: 20, height: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 25,
                    height: { duration: 0.3 }
                  }}
                  layout
                  className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-colors cursor-pointer group"
                >
                  <div className="flex items-start gap-3">
                    {/* Source Icon */}
                    <div className={`shrink-0 w-8 h-8 rounded-lg ${config.bg} flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${config.color}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {/* NEW Badge */}
                        <AnimatePresence>
                          {item.isNew && (
                            <motion.span
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ 
                                opacity: [1, 0.5, 1], 
                                scale: 1 
                              }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ 
                                opacity: { duration: 0.8, repeat: 3 },
                                scale: { duration: 0.2 }
                              }}
                              className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-400 uppercase"
                            >
                              NEW
                            </motion.span>
                          )}
                        </AnimatePresence>
                        <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                          {item.title}
                        </p>
                      </div>
                      <p className="text-xs text-[var(--text-muted)] line-clamp-1 mb-2">
                        {item.summary}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-[var(--text-muted)]">
                          {item.timestamp}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                            item.relevanceScore >= 90 
                              ? 'bg-emerald-500/20 text-emerald-400' 
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {item.relevanceScore}% relevant
                          </span>
                          <ExternalLink className="w-3 h-3 text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

// ============================================================
// SCRAPING AGENT CARD (compact)
// ============================================================
function ScrapingAgentCard({ agent }: { agent: typeof scrapingAgents[0] }) {
  const Icon = agent.icon
  return (
    <motion.div variants={itemVariants} whileHover={{ y: -2 }} className="card-glass p-4 rounded-xl">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
          <Icon className="w-4 h-4 text-emerald-400" />
        </div>
        <p className="font-semibold text-sm text-[var(--text-primary)]">{agent.name}</p>
      </div>
      <ul className="space-y-1">
        {agent.capabilities.map((cap, i) => (
          <li key={i} className="flex items-start gap-2 text-[10px] text-[var(--text-muted)]">
            <span className="w-1 h-1 rounded-full bg-emerald-500/50 mt-1 shrink-0" />
            {cap}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

// ============================================================
// TOPIC SELECTOR MOCKUP
// ============================================================
function TopicSelectorMockup() {
  return (
    <motion.div variants={itemVariants} className="p-4 rounded-xl bg-black/30 border border-white/5">
      <div className="grid grid-cols-2 gap-4 mb-4">
        {topicCategories.map((cat) => {
          const Icon = cat.icon
          return (
            <div key={cat.title} className="p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 text-emerald-400" />
                <p className="text-xs font-medium text-[var(--text-primary)] uppercase tracking-wider">{cat.title}</p>
              </div>
              <div className="space-y-1.5">
                {cat.items.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                    <Check className="w-3 h-3 text-emerald-400" />
                    {item}
                  </div>
                ))}
                <button className="flex items-center gap-1 text-[10px] text-emerald-400 mt-1">
                  <Plus className="w-3 h-3" /> {cat.addLabel}
                </button>
              </div>
            </div>
          )
        })}
      </div>
      {/* Custom Keywords */}
      <div className="p-3 rounded-lg bg-white/5 border border-white/10">
        <div className="flex items-center gap-2 mb-2">
          <Tag className="w-4 h-4 text-emerald-400" />
          <p className="text-xs font-medium text-[var(--text-primary)] uppercase tracking-wider">Custom Keywords</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {customKeywords.map((kw) => (
            <span key={kw} className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 text-[10px]">{kw}</span>
          ))}
          <button className="px-2 py-1 rounded border border-dashed border-white/20 text-[10px] text-[var(--text-muted)] flex items-center gap-1">
            <Plus className="w-3 h-3" /> Add
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// ============================================================
// LEVEL 3 SECTION - MAIN EXPORT
// ============================================================
export function Level3Section() {
  return (
    <section className="py-16 px-8 border-b border-white/5">
      <div className="max-w-7xl mx-auto">
        <LevelCard
          level={3}
          title="Media Digest Engine"
          tagline="AI agents continuously scraping, analyzing, and delivering insights"
          description="Multimodal intelligence. YouTube, Reddit, social media. Always on."
          icon={Rss}
        >
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            {/* LIVE FEED - Animated */}
            <LiveFeed />

            {/* AI Scraping Agents */}
            <motion.div variants={itemVariants} className="mb-12">
              <h4 className="text-xs uppercase tracking-wider text-[var(--text-muted)] mb-4">AI Scraping Agents</h4>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {scrapingAgents.map((agent) => (
                  <ScrapingAgentCard key={agent.name} agent={agent} />
                ))}
              </div>
            </motion.div>

            {/* Topic Selection */}
            <motion.div variants={itemVariants} className="mb-12">
              <h4 className="text-xs uppercase tracking-wider text-[var(--text-muted)] mb-4">Topic Selection</h4>
              <TopicSelectorMockup />
            </motion.div>

            {/* 5 Applications */}
            <motion.div variants={itemVariants}>
              <h4 className="text-xs uppercase tracking-wider text-[var(--text-muted)] mb-4">Applications</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {digestApplications.map((app) => (
                  <ApplicationCard key={app.title} {...app} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </LevelCard>
      </div>
    </section>
  )
}

export default Level3Section
