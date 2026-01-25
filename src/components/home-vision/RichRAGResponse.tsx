"use client"

// =============================================================================
// RICH RAG RESPONSE - Level 1 Feature Demo
// HIGH DESIGNER LEVEL: 4 sources with confidence, AI insight with BorderBeam
// =============================================================================

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  FileText,
  MessageSquare,
  Video,
  FileSpreadsheet,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react'
import { BorderBeam } from '../ui/BorderBeam'

// =============================================================================
// TYPES
// =============================================================================

interface Source {
  type: 'pdf' | 'transcript' | 'slack' | 'docx'
  name: string
  confidence: number
  excerpt: string
  date?: string
}

// =============================================================================
// SOURCE ICON MAPPING
// =============================================================================

const sourceConfig = {
  pdf: {
    icon: FileText,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    label: 'PDF',
  },
  transcript: {
    icon: Video,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    label: 'Transcript',
  },
  slack: {
    icon: MessageSquare,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    label: 'Slack',
  },
  docx: {
    icon: FileSpreadsheet,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    label: 'Document',
  },
}

// =============================================================================
// CONFIDENCE BADGE
// =============================================================================

function ConfidenceBadge({ value }: { value: number }) {
  const getColor = (v: number) => {
    if (v >= 95) return 'from-emerald-500 to-emerald-600 text-white'
    if (v >= 90) return 'from-blue-500 to-blue-600 text-white'
    if (v >= 85) return 'from-amber-500 to-amber-600 text-white'
    return 'from-neutral-500 to-neutral-600 text-white'
  }

  return (
    <motion.div
      className={`px-2 py-0.5 rounded-full bg-gradient-to-r ${getColor(value)} text-[10px] font-bold shadow-lg`}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
    >
      {value}%
    </motion.div>
  )
}

// =============================================================================
// SOURCE CARD
// =============================================================================

function SourceCard({ source, index }: { source: Source; index: number }) {
  const config = sourceConfig[source.type]
  const Icon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: 0.3 + index * 0.15,
        type: 'spring',
        stiffness: 300,
        damping: 25,
      }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`relative p-4 rounded-xl ${config.bg} border ${config.border} cursor-pointer group transition-all duration-300`}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white/5 to-transparent" />

      {/* Header */}
      <div className="flex items-start justify-between mb-3 relative">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${config.bg} ${config.border} border`}>
            <Icon className={`w-4 h-4 ${config.color}`} />
          </div>
          <div>
            <p className="text-xs font-semibold text-white truncate max-w-[140px]">
              {source.name}
            </p>
            <p className="text-[10px] text-[var(--text-muted)]">{config.label}</p>
          </div>
        </div>
        <ConfidenceBadge value={source.confidence} />
      </div>

      {/* Excerpt */}
      <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed line-clamp-2 mb-2 relative">
        "{source.excerpt}"
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between relative">
        {source.date && (
          <span className="text-[9px] text-[var(--text-muted)]">{source.date}</span>
        )}
        <motion.span
          className={`text-[9px] font-bold ${config.color} opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1`}
          whileHover={{ x: 2 }}
        >
          View source <ExternalLink className="w-3 h-3" />
        </motion.span>
      </div>
    </motion.div>
  )
}

// =============================================================================
// AI INSIGHT CARD WITH BORDER BEAM
// =============================================================================

function AIInsightCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.0, duration: 0.5 }}
      className="relative p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 overflow-hidden"
    >
      {/* BorderBeam effect */}
      <BorderBeam size={200} duration={8} colorFrom="#F59E0B" colorTo="#FCD34D" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-4 relative z-10">
        <motion.div
          className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/30"
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(245, 158, 11, 0)',
              '0 0 20px 4px rgba(245, 158, 11, 0.3)',
              '0 0 0 0 rgba(245, 158, 11, 0)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <AlertTriangle className="w-5 h-5 text-amber-400" />
        </motion.div>
        <div>
          <p className="text-sm font-bold text-amber-400 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            AI Insight
          </p>
          <p className="text-[10px] text-amber-400/60">Action Required</p>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3 relative z-10">
        <p className="text-sm text-[var(--text-primary)] leading-relaxed">
          <span className="text-amber-400 font-semibold">Potential Risk Detected:</span>{' '}
          The Q2 API deadline may conflict with your current sprint planning. The
          engineering team's capacity is currently at 85% allocation.
        </p>

        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[10px] font-medium text-amber-400">
            Timeline Risk
          </span>
          <span className="px-2 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[10px] font-medium text-amber-400">
            Resource Constraint
          </span>
        </div>

        <motion.button
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-semibold hover:bg-amber-500/30 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <CheckCircle2 className="w-4 h-4" />
          Acknowledge & Create Task
        </motion.button>
      </div>
    </motion.div>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

const mockSources: Source[] = [
  {
    type: 'pdf',
    name: 'meeting_acme_dec15.pdf',
    confidence: 96,
    excerpt: 'We committed to delivering API v2.0 by end of Q2, with 99.9% uptime SLA...',
    date: 'Dec 15, 2024',
  },
  {
    type: 'transcript',
    name: 'call_recording_acme.mp4',
    confidence: 92,
    excerpt: 'John confirmed priority support would be included in the enterprise tier...',
    date: 'Dec 18, 2024',
  },
  {
    type: 'slack',
    name: '#acme-partnership',
    confidence: 88,
    excerpt: 'Sarah mentioned we need to finalize the integration timeline by Friday...',
    date: 'Jan 5, 2025',
  },
  {
    type: 'docx',
    name: 'contract_draft_v3.docx',
    confidence: 94,
    excerpt: 'Section 4.2: Provider agrees to maintain minimum 99.9% monthly uptime...',
    date: 'Jan 10, 2025',
  },
]

export function RichRAGResponse() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      className="w-full max-w-4xl mx-auto"
    >
      {/* Query Display */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">
          Your Question
        </p>
        <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
          <p className="text-lg text-white font-medium">
            "What commitments did we make to Acme Corp?"
          </p>
        </div>
      </motion.div>

      {/* Response Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-between mb-4"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Dealligent AI</p>
            <p className="text-[10px] text-[var(--text-muted)]">Found 4 relevant sources</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-medium text-emerald-400">
            High Confidence
          </span>
        </div>
      </motion.div>

      {/* Sources Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {mockSources.map((source, index) => (
          <SourceCard key={source.name} source={source} index={index} />
        ))}
      </div>

      {/* AI Insight */}
      <AIInsightCard />

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.3 }}
        className="mt-6 p-5 rounded-2xl bg-[var(--glass-bg)] border border-[var(--border-default)]"
      >
        <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-3">
          Summary
        </p>
        <p className="text-sm text-[var(--text-primary)] leading-relaxed">
          Based on <span className="text-indigo-400 font-semibold">4 internal sources</span>,
          you committed to delivering{' '}
          <span className="text-white font-semibold">API v2.0 by Q2 2025</span> with a{' '}
          <span className="text-white font-semibold">99.9% uptime SLA</span> and{' '}
          <span className="text-white font-semibold">priority support</span> for Acme Corp's
          enterprise tier.
        </p>
      </motion.div>
    </motion.div>
  )
}

export default RichRAGResponse
