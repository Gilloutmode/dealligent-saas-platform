import React from 'react'
import { AbsoluteFill, Sequence } from 'remotion'
import { colors, timeline } from '../../styles/theme'
import { Act1Problem } from './Act1Problem'
import { Act2Solution } from './Act2Solution'
import { Act3Proof } from './Act3Proof'

/**
 * Dealligent Investor Pitch Video
 * 
 * A 90-second Apple-style motion design video showcasing 
 * Dealligent's AI-powered competitive intelligence platform.
 * 
 * Structure:
 * - ACT 1 (0-15s): The Problem - Pain points that resonate
 * - ACT 2 (15-75s): The Solution - 3-level architecture demo
 * - ACT 3 (75-90s): Proof & CTA - Metrics and call to action
 * 
 * Design Principles:
 * - Minimalist dark theme with strategic blue accents
 * - Smooth spring animations (damping: 150-200)
 * - Glassmorphism UI matching Dealligent design system
 * - NumberTicker for all metrics (premium feel)
 * - Staggered reveals for visual hierarchy
 */
export const InvestorPitch: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: colors.background,
        fontFamily: '"SF Pro Display", "Inter", -apple-system, sans-serif',
      }}
    >
      {/* ACT 1: THE PROBLEM (0-15s, frames 0-450) */}
      <Sequence
        from={timeline.act1.start}
        durationInFrames={timeline.act1.end - timeline.act1.start}
        name="Act 1 - Problem"
      >
        <Act1Problem />
      </Sequence>

      {/* ACT 2: THE SOLUTION (15-75s, frames 450-2250) */}
      <Sequence
        from={timeline.act2.start}
        durationInFrames={timeline.act2.end - timeline.act2.start}
        name="Act 2 - Solution"
      >
        <Act2Solution />
      </Sequence>

      {/* ACT 3: PROOF & CTA (75-90s, frames 2250-2700) */}
      <Sequence
        from={timeline.act3.start}
        durationInFrames={timeline.act3.end - timeline.act3.start}
        name="Act 3 - Proof"
      >
        <Act3Proof />
      </Sequence>
    </AbsoluteFill>
  )
}

export default InvestorPitch
