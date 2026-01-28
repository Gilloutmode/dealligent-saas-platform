// =============================================================================
// LEVEL 1 SECTION - Inside Sources
// "Upload, organize and query all your data through AI-Chat agents"
// Phase 4/5: Scroll animations with blur + scale
// Performance: Visual types stored as enums, not JSX instances
// =============================================================================

"use client"

import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  FolderTree, MessageSquare,
  Users, Search, BarChart3, Upload,
  LucideIcon
} from 'lucide-react'
import { ApplicationCard } from './ApplicationCard'
import {
  NotebookMockupAnimated,
  UploadMockupAnimated,
  ClassificationMockupAnimated,
  RagChatMockupAnimated,
  ProfileContextMockupAnimated,
  TraceabilityMockupAnimated,
  ReportsMockupAnimated,
} from './animations'

// =============================================================================
// ANIMATION VARIANTS
// =============================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  },
}

// Full animation with blur + scale
const itemVariantsFull = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
}

// Reduced motion variant
const itemVariantsReduced = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
}

// Slide variants for problem/solution cards
const slideLeftVariantsFull = {
  hidden: {
    opacity: 0,
    x: -40,
    scale: 0.95,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
}

const slideRightVariantsFull = {
  hidden: {
    opacity: 0,
    x: 40,
    scale: 0.95,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
}

const slideVariantsReduced = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
}

// =============================================================================
// VISUAL TYPES - Enum instead of JSX to prevent re-renders
// =============================================================================

type VisualType =
  | 'upload'
  | 'classification'
  | 'ragChat'
  | 'profileContext'
  | 'traceability'
  | 'reports'

// Mapping from visual type to component - called only in render
const VISUAL_COMPONENTS: Record<VisualType, React.ComponentType> = {
  upload: UploadMockupAnimated, // Framer Motion V3 - Database Integration
  classification: ClassificationMockupAnimated,
  ragChat: RagChatMockupAnimated,
  profileContext: ProfileContextMockupAnimated,
  traceability: TraceabilityMockupAnimated,
  reports: ReportsMockupAnimated,
}

// =============================================================================
// APPLICATIONS DATA - Module-level constant (stable reference)
// =============================================================================

interface ApplicationData {
  icon: LucideIcon
  title: string
  description: string
  visualType: VisualType
}

const APPLICATIONS_DATA: readonly ApplicationData[] = [
  {
    icon: Upload,
    title: 'Multi-format upload in RAG',
    description: 'Import all your business documents into the knowledge base.\n\nPDF, Word, Excel, PowerPoint, emails, meeting transcripts.\nDrag & drop. Automatic text extraction with OCR.',
    visualType: 'upload'
  },
  {
    icon: FolderTree,
    title: 'RAG content auto-classification in pre-defined high-level categories',
    description: 'AI-powered organization. Documents sorted automatically.\n\nClient Cases • Support Cases • Product Cases • Meetings\nSmart tagging: entities, sentiment, priority flags.',
    visualType: 'classification'
  },
  {
    icon: MessageSquare,
    title: 'Chat interface with agents',
    description: 'Ask questions in natural language. Get answers with sources.\n\n"What did we promise to Client X in the last meeting?"\n"What pricing did we discuss with Company Z?"\n\nEvery answer cites its sources with confidence scores.',
    visualType: 'ragChat'
  },
  {
    icon: Users,
    title: 'Profile Based Agents',
    description: 'Same question, tailored answers based on your role.\n\nSALES: Pricing, objections, client history\nSUPPORT: Issue resolution, similar cases\nPRODUCT: Feature requests, roadmap items\nDEVELOPER: Technical specs, API details\nLEADERSHIP: Strategic insights, trends',
    visualType: 'profileContext'
  },
  {
    icon: Search,
    title: 'Source Traceability',
    description: 'Every answer cites its sources. Trust, but verify.\n\n- Document name with clickable link\n- Upload date and last modified\n- Relevant excerpt highlighted\n- Confidence score per source\n- Full audit trail exportable',
    visualType: 'traceability'
  },
  {
    icon: BarChart3,
    title: 'Templated Report',
    description: 'Generate instant reports from your knowledge base.\n\nCLIENT REPORTS: Project status, account summaries\nINDUSTRY REPORTS: Requirements by sector, use cases\nPRODUCT REPORTS: Feature requests, technical issues\nSUPPORT REPORTS: Issue patterns, resolution trends',
    visualType: 'reports'
  },
] as const

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function Level1Section() {
  const prefersReducedMotion = useReducedMotion() ?? false
  const itemVariants = prefersReducedMotion ? itemVariantsReduced : itemVariantsFull
  const slideLeftVariants = prefersReducedMotion ? slideVariantsReduced : slideLeftVariantsFull
  const slideRightVariants = prefersReducedMotion ? slideVariantsReduced : slideRightVariantsFull

  // Memoized applications with visual components
  // Only re-computed if APPLICATIONS_DATA changes (never, it's a constant)
  const applications = useMemo(() =>
    APPLICATIONS_DATA.map(app => {
      const VisualComponent = VISUAL_COMPONENTS[app.visualType]
      return {
        icon: app.icon,
        title: app.title,
        description: app.description,
        visual: <VisualComponent />
      }
    }),
    []
  )

  return (
    <section id="level-1-section" className="py-24 px-8 bg-[var(--bg-page)] border-b border-[var(--border-light)]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
          className="text-center mb-24"
        >
          <motion.span
            className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-blue-500/30 bg-blue-500/20 text-blue-400 mb-8"
            animate={prefersReducedMotion ? {} : {
              boxShadow: [
                '0 0 15px rgba(59, 130, 246, 0.2)',
                '0 0 30px rgba(59, 130, 246, 0.4)',
                '0 0 15px rgba(59, 130, 246, 0.2)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            LEVEL 1
          </motion.span>
          <h2 className="text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-6">
            Inside Sources
          </h2>
          <p className="text-2xl lg:text-3xl text-[var(--text-secondary)] font-medium italic">
            Upload, organize and query all your data through AI-Chat agents
          </p>
        </motion.div>

        {/* Notebook Wireframe Mockup */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={itemVariants}
          className="mb-32"
        >
          <NotebookMockupAnimated />
        </motion.div>

        {/* Problem Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={slideLeftVariants}
            className="p-12 rounded-3xl bg-red-500/5 border border-red-500/10"
          >
            <h3 className="text-sm font-black uppercase tracking-widest text-red-400 mb-6 underline decoration-2 underline-offset-8">THE PROBLEM</h3>
            <p className="text-2xl lg:text-3xl text-[var(--text-primary)] leading-relaxed font-medium">
              Your team knowledge is scattered across emails, meetings,
              documents and Slack. Finding aggregated information takes hours.
              Critical insights are missed.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={slideRightVariants}
            className="p-12 rounded-3xl bg-emerald-500/5 border border-emerald-500/10"
          >
            <h3 className="text-sm font-black uppercase tracking-widest text-emerald-400 mb-6 underline decoration-2 underline-offset-8">THE SOLUTION</h3>
            <p className="text-2xl lg:text-3xl text-[var(--text-primary)] leading-relaxed font-medium">
              Upload everything. Ask anything. Get answers with sources.
              One AI-powered knowledge base for your entire organization.
            </p>
          </motion.div>
        </div>

        {/* Applications Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          {applications.map((app, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <ApplicationCard {...app} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Level1Section
