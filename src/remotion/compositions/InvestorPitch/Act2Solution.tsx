import React from 'react'
import { AbsoluteFill, Sequence } from 'remotion'
import { timeline } from '../../styles/theme'
import { LevelTransition } from './scenes/LevelTransition'
import { ChatDemo } from './scenes/ChatDemo'

/**
 * ACT 2: THE SOLUTION (15-75 seconds, frames 450-2250)
 * 
 * Showcase Dealligent's 3-level architecture:
 * - Level 1 (15-30s): Internal Sources - "Ask your company anything"
 * - Level 2 (30-50s): External Sources - "Intelligence on demand"
 * - Level 3 (50-70s): Media Digest Engine - "Stay ahead automatically"
 * - Unified (70-75s): Platform integration view
 */
export const Act2Solution: React.FC = () => {
  const { act2 } = timeline

  return (
    <AbsoluteFill>
      {/* ========== LEVEL 1: INTERNAL SOURCES (15-30s) ========== */}
      
      {/* Level 1 Transition (15-18s) */}
      <Sequence
        from={act2.level1.transition.start - act2.start}
        durationInFrames={act2.level1.transition.end - act2.level1.transition.start}
        name="Level 1 Transition"
      >
        <LevelTransition
          level={1}
          title="Internal Sources"
          subtitle="Ask your company anything"
        />
      </Sequence>

      {/* Level 1 Chat Demo (18-30s) */}
      <Sequence
        from={act2.level1.chatDemo.start - act2.start}
        durationInFrames={act2.level1.end - act2.level1.chatDemo.start}
        name="Level 1 Chat Demo"
      >
        <ChatDemo
          question="What did we learn from losing the Acme deal last quarter?"
          response="Based on the CRM notes and sales call transcripts, the main factors were: 1) Competitor offered 30% lower pricing, 2) Their product had native Salesforce integration we lack, 3) Decision maker changed mid-cycle. Similar patterns appeared in 3 other lost deals this quarter."
          sources={[
            { name: 'CRM Notes', icon: '📊' },
            { name: 'Call Transcripts', icon: '📞' },
            { name: 'Email Threads', icon: '📧' },
            { name: 'Meeting Notes', icon: '📝' },
          ]}
        />
      </Sequence>

      {/* ========== LEVEL 2: EXTERNAL SOURCES (30-50s) ========== */}
      
      {/* Level 2 Transition (30-33s) */}
      <Sequence
        from={act2.level2.transition.start - act2.start}
        durationInFrames={act2.level2.transition.end - act2.level2.transition.start}
        name="Level 2 Transition"
      >
        <LevelTransition
          level={2}
          title="External Sources"
          subtitle="Intelligence on demand"
        />
      </Sequence>

      {/* Level 2 Competitor Analysis (33-50s) */}
      <Sequence
        from={act2.level2.competitorAnalysis.start - act2.start}
        durationInFrames={act2.level2.end - act2.level2.competitorAnalysis.start}
        name="Level 2 Analysis"
      >
        <ChatDemo
          question="Give me a complete analysis of nTopology's product strategy"
          response="nTopology focuses on implicit modeling for additive manufacturing. Key differentiators: 1) Field-driven design reduces file sizes by 90%, 2) Strong aerospace/medical vertical focus, 3) Recent $65M Series D signals aggressive expansion. Their pricing targets enterprise ($50K+/seat). Main weakness: limited traditional CAD compatibility."
          sources={[
            { name: 'Web Intelligence', icon: '🌐' },
            { name: 'Perplexity AI', icon: '🔍' },
            { name: 'News Analysis', icon: '📰' },
            { name: 'Patent Database', icon: '📋' },
          ]}
        />
      </Sequence>

      {/* ========== LEVEL 3: MEDIA DIGEST ENGINE (50-70s) ========== */}
      
      {/* Level 3 Transition (50-53s) */}
      <Sequence
        from={act2.level3.transition.start - act2.start}
        durationInFrames={act2.level3.transition.end - act2.level3.transition.start}
        name="Level 3 Transition"
      >
        <LevelTransition
          level={3}
          title="Media Digest Engine"
          subtitle="Stay ahead automatically"
        />
      </Sequence>

      {/* Level 3 Automated Monitoring (53-70s) */}
      <Sequence
        from={act2.level3.monitoring.start - act2.start}
        durationInFrames={act2.level3.end - act2.level3.monitoring.start}
        name="Level 3 Monitoring"
      >
        <ChatDemo
          question="What happened with my watchlist competitors this week?"
          response="3 significant events detected: 1) Autodesk announced Fusion 360 AI features at CES, 2) Siemens acquired a small generative design startup, 3) PTC reported 15% ARR growth in manufacturing vertical. I've prepared a digest with strategic implications for each."
          sources={[
            { name: 'News Monitoring', icon: '📡' },
            { name: 'Social Listening', icon: '💬' },
            { name: 'SEC Filings', icon: '📑' },
            { name: 'Press Releases', icon: '📢' },
          ]}
        />
      </Sequence>
    </AbsoluteFill>
  )
}
