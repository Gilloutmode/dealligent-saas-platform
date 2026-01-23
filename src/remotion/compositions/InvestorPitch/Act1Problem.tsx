import React from 'react'
import { AbsoluteFill, Sequence } from 'remotion'
import { timeline } from '../../styles/theme'
import { LogoIntro } from './scenes/LogoIntro'
import { PainStats } from './scenes/PainStats'

/**
 * ACT 1: THE PROBLEM (0-15 seconds, frames 0-450)
 * 
 * Hook the investor with compelling pain points:
 * - Scene 1.1 (0-5s): Logo intro with brand reveal
 * - Scene 1.2 (5-10s): "67% of B2B deals lost to better-informed competitors"
 * - Scene 1.3 (10-15s): "4.2 hours/week wasted on manual research"
 */
export const Act1Problem: React.FC = () => {
  const { act1 } = timeline

  return (
    <AbsoluteFill>
      {/* Scene 1.1: Logo Intro (0-5s, frames 0-150) */}
      <Sequence
        from={act1.logoIntro.start}
        durationInFrames={act1.logoIntro.end - act1.logoIntro.start}
        name="Logo Intro"
      >
        <LogoIntro startFrame={0} />
      </Sequence>

      {/* Scene 1.2: Pain Stat 1 (5-10s, frames 150-300) */}
      <Sequence
        from={act1.painStat1.start}
        durationInFrames={act1.painStat1.end - act1.painStat1.start}
        name="Pain Stat 1"
      >
        <PainStats
          startFrame={0}
          stat={{
            value: 67,
            suffix: '%',
            headline: 'of B2B deals lost to better-informed competitors',
            subtext: 'Your competitors know more about the market than you do.',
          }}
        />
      </Sequence>

      {/* Scene 1.3: Pain Stat 2 (10-15s, frames 300-450) */}
      <Sequence
        from={act1.painStat2.start}
        durationInFrames={act1.painStat2.end - act1.painStat2.start}
        name="Pain Stat 2"
      >
        <PainStats
          startFrame={0}
          stat={{
            value: 4.2,
            suffix: ' hrs/week',
            headline: 'wasted on manual competitive research',
            subtext: "Time your team could spend winning deals, not searching.",
          }}
        />
      </Sequence>
    </AbsoluteFill>
  )
}
