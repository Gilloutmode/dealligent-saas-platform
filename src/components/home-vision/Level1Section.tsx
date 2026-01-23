// LEVEL 1 SECTION - Internal Sources
// "Your company's knowledge, instantly accessible"
// ANIMATED CHAT MOCKUP with Framer Motion

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Database, Upload, FolderTree, MessageSquare,
  Users, FileSearch, FileText, FolderOpen, Plus, FileIcon
} from 'lucide-react'
import { LevelCard } from './LevelCard'
import { ApplicationCard } from './ApplicationCard'
import {
  UploadMockup,
  ClassificationMockup,
  RAGMockup,
  ProfileSwitchMockup,
  TraceabilityMockup,
  ReportMockup,
} from './mockups'

// Applications data
const applications = [
  {
    icon: Upload,
    title: 'Multi-Format Upload',
    description: 'Import all your business documents into the knowledge base.',
    features: [
      'PDF documents (contracts, proposals, specs)',
      'Word documents (DOCX - reports, meeting notes)',
      'Email exports (EML/MSG - client communications)',
      'Meeting transcripts (Zoom, Teams, Google Meet)',
      'Spreadsheets (XLSX - data, lists, reports)',
      'Presentations (PPTX - decks, pitches)',
    ],
  },
  {
    icon: FolderTree,
    title: 'Auto-Classification',
    description: 'AI-powered organization. Documents sorted automatically by type.',
    features: [
      'Client Cases - by client / industry / use case',
      'Support Cases - by issue type / resolution',
      'Product Cases - by feature / module / version',
      'Technology Cases - by stack / integration',
      'Meetings - by participants / date / action items',
    ],
  },
  {
    icon: MessageSquare,
    title: 'RAG-Powered Q&A',
    description: 'Ask questions in natural language. Get answers with sources.',
    features: [
      '"What did we promise to Client X in the last meeting?"',
      '"What are the common issues reported for Product Y?"',
      '"What pricing did we discuss with Company Z?"',
      'Direct answers with source citations',
      'Relevance scoring for each source',
    ],
  },
  {
    icon: Users,
    title: 'Profile-Based Context',
    description: 'Same question, tailored answers based on your role.',
    features: [
      'SALES → Pricing, objections, client history',
      'SUPPORT → Issue resolution, similar cases',
      'PRODUCT → Feature requests, user feedback',
      'DEVELOPER → Technical specs, API details',
      'LEADERSHIP → Strategic insights, summaries',
    ],
  },
  {
    icon: FileSearch,
    title: 'Source Traceability',
    description: 'Every answer cites its sources. Trust, but verify.',
    features: [
      'Document name with clickable link',
      'Upload date and last modified',
      'Relevant excerpt highlighted',
      'Confidence score per source',
      'Full query history with audit trail',
    ],
  },
  {
    icon: FileText,
    title: 'Automated Reports',
    description: 'Generate instant reports from your internal knowledge base.',
    features: [
      'Client project summaries',
      'Industry & use case reports',
      'Product feature request compilation',
      'Support issue patterns & trends',
      'One-click generation with filters',
    ],
  },
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
// TYPING EFFECT HOOK
// ============================================================
function useTypingEffect(
  text: string, 
  speed = 30, 
  startDelay = 0, 
  enabled = false
): { displayed: string; isComplete: boolean } {
  const [displayed, setDisplayed] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (!enabled) {
      setDisplayed('')
      setIsComplete(false)
      return
    }

    setDisplayed('')
    setIsComplete(false)

    const timeout = setTimeout(() => {
      let i = 0
      const interval = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(interval)
          setIsComplete(true)
        }
      }, speed)
      return () => clearInterval(interval)
    }, startDelay)

    return () => clearTimeout(timeout)
  }, [text, speed, startDelay, enabled])

  return { displayed, isComplete }
}

// ============================================================
// THINKING DOTS COMPONENT
// ============================================================
function ThinkingDots() {
  return (
    <motion.div 
      className="flex items-center gap-1 px-3 py-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <span className="text-xs text-emerald-400 mr-2">AI is thinking</span>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-emerald-400 rounded-full"
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut"
          }}
        />
      ))}
    </motion.div>
  )
}

// ============================================================
// SOURCE CARD COMPONENT
// ============================================================
interface SourceItem {
  name: string
  confidence: number
}

function SourceCard({ source, index }: { source: SourceItem; index: number }) {
  const confidenceColor = source.confidence >= 90 
    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
    : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.4, duration: 0.3, ease: "easeOut" }}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10"
    >
      <FileIcon className="w-3 h-3 text-blue-400 shrink-0" />
      <span className="text-xs text-[var(--text-secondary)] truncate">{source.name}</span>
      <span className={`text-[10px] px-1.5 py-0.5 rounded border ${confidenceColor}`}>
        {source.confidence}%
      </span>
    </motion.div>
  )
}

// ============================================================
// ANIMATED CHAT MOCKUP
// ============================================================
function AnimatedChatMockup() {
  // Animation phases
  const [phase, setPhase] = useState<'idle' | 'user' | 'thinking' | 'ai' | 'sources' | 'pause'>('idle')
  const [cycleKey, setCycleKey] = useState(0)

  const userMessage = "What did we promise to Acme Corp in Q4?"
  const aiResponse = `Based on 3 internal documents, you committed to:
• Enterprise pricing: $120K/year (20% discount)
• Custom API integration within 6 weeks
• Dedicated CSM (Sarah) assigned`

  const sources: SourceItem[] = [
    { name: 'acme_proposal_v3.pdf', confidence: 96 },
    { name: 'meeting_notes_dec12.txt', confidence: 92 },
    { name: 'slack_export.json', confidence: 88 },
  ]

  // Typing effects
  const userTyping = useTypingEffect(userMessage, 40, 0, phase === 'user')
  const aiTyping = useTypingEffect(aiResponse, 20, 0, phase === 'ai')

  // Phase transitions
  const startCycle = useCallback(() => {
    setPhase('user')
  }, [])

  // Start animation loop
  useEffect(() => {
    const timer = setTimeout(startCycle, 500)
    return () => clearTimeout(timer)
  }, [cycleKey, startCycle])

  // Phase progression
  useEffect(() => {
    if (phase === 'user' && userTyping.isComplete) {
      const timer = setTimeout(() => setPhase('thinking'), 300)
      return () => clearTimeout(timer)
    }
  }, [phase, userTyping.isComplete])

  useEffect(() => {
    if (phase === 'thinking') {
      const timer = setTimeout(() => setPhase('ai'), 2000)
      return () => clearTimeout(timer)
    }
  }, [phase])

  useEffect(() => {
    if (phase === 'ai' && aiTyping.isComplete) {
      const timer = setTimeout(() => setPhase('sources'), 500)
      return () => clearTimeout(timer)
    }
  }, [phase, aiTyping.isComplete])

  useEffect(() => {
    if (phase === 'sources') {
      // Wait for sources animation then pause
      const timer = setTimeout(() => setPhase('pause'), 2000)
      return () => clearTimeout(timer)
    }
  }, [phase])

  useEffect(() => {
    if (phase === 'pause') {
      // Reset and loop
      const timer = setTimeout(() => {
        setPhase('idle')
        setCycleKey(k => k + 1)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [phase])

  return (
    <motion.div variants={itemVariants} className="mb-10">
      <p className="text-xs uppercase tracking-wider text-[var(--text-muted)] mb-4">
        Live Demo Preview
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 rounded-xl bg-black/30 border border-white/5">
        {/* Folders Column */}
        <div className="p-3 rounded-lg bg-white/5 border border-white/10">
          <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] mb-2">Folders</p>
          <div className="space-y-1.5 text-sm">
            <div className="flex items-center gap-2 text-[var(--text-secondary)]">
              <FolderOpen className="w-3.5 h-3.5 text-blue-400" /> Clients
            </div>
            <div className="flex items-center gap-2 text-[var(--text-secondary)]">
              <FolderOpen className="w-3.5 h-3.5 text-blue-400" /> Support
            </div>
            <div className="flex items-center gap-2 text-[var(--text-secondary)]">
              <FolderOpen className="w-3.5 h-3.5 text-blue-400" /> Products
            </div>
            <button className="flex items-center gap-1.5 text-xs text-[var(--c-brand)] mt-2">
              <Plus className="w-3 h-3" /> Upload
            </button>
          </div>
        </div>

        {/* ANIMATED Conversation Column */}
        <div className="p-3 rounded-lg bg-white/5 border border-white/10 md:col-span-2">
          <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] mb-3">Conversation</p>
          
          <div className="space-y-3 min-h-[180px]">
            {/* User Message */}
            <AnimatePresence mode="wait">
              {(phase === 'user' || phase === 'thinking' || phase === 'ai' || phase === 'sources' || phase === 'pause') && (
                <motion.div
                  key={`user-${cycleKey}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-2"
                >
                  <span className="text-xs text-[var(--c-brand)] font-medium shrink-0">You:</span>
                  <span className="text-xs text-[var(--text-primary)]">
                    {userTyping.displayed}
                    {phase === 'user' && !userTyping.isComplete && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="inline-block w-0.5 h-3 bg-[var(--c-brand)] ml-0.5 align-middle"
                      />
                    )}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Thinking Dots */}
            <AnimatePresence>
              {phase === 'thinking' && (
                <ThinkingDots />
              )}
            </AnimatePresence>

            {/* AI Response */}
            <AnimatePresence mode="wait">
              {(phase === 'ai' || phase === 'sources' || phase === 'pause') && (
                <motion.div
                  key={`ai-${cycleKey}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-2"
                >
                  <span className="text-xs text-emerald-400 font-medium shrink-0">AI:</span>
                  <span className="text-xs text-[var(--text-secondary)] whitespace-pre-line">
                    {aiTyping.displayed}
                    {phase === 'ai' && !aiTyping.isComplete && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="inline-block w-0.5 h-3 bg-emerald-400 ml-0.5 align-middle"
                      />
                    )}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Sources */}
            <AnimatePresence>
              {(phase === 'sources' || phase === 'pause') && (
                <motion.div
                  key={`sources-${cycleKey}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-3"
                >
                  <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] mb-2">
                    Sources
                  </p>
                  <div className="space-y-1.5">
                    {sources.map((source, index) => (
                      <SourceCard key={source.name} source={source} index={index} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ============================================================
// LEVEL 1 SECTION - MAIN EXPORT
// ============================================================
export function Level1Section() {
  return (
    <section className="py-16 px-8 border-b border-white/5">
      <div className="max-w-7xl mx-auto">
        <LevelCard
          level={1}
          title="Internal Sources"
          tagline="Your company's knowledge, instantly accessible"
          description="Ask questions. Get answers from your own documents, meetings, and emails."
          icon={Database}
        >
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <AnimatedChatMockup />
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {applications.map((app, index) => {
                // Map each application to its animated mockup
                const mockups = [
                  <UploadMockup key="upload" />,
                  <ClassificationMockup key="classification" />,
                  <RAGMockup key="rag" />,
                  <ProfileSwitchMockup key="profile" />,
                  <TraceabilityMockup key="traceability" />,
                  <ReportMockup key="report" />,
                ]
                return (
                  <ApplicationCard 
                    key={app.title} 
                    {...app} 
                    mockup={mockups[index]}
                  />
                )
              })}
            </motion.div>
          </motion.div>
        </LevelCard>
      </div>
    </section>
  )
}

export default Level1Section
