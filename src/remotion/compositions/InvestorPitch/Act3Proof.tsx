import React from 'react'
import { AbsoluteFill, Sequence } from 'remotion'
import { timeline, colors } from '../../styles/theme'
import { MetricsDisplay } from './scenes/MetricsDisplay'
import { BrandLockup } from './scenes/BrandLockup'

/**
 * ACT 3: PROOF & CTA (75-90 seconds, frames 2250-2700)
 * 
 * Close with proof and call to action:
 * - Scene 3.1 (75-80s): Key metrics display
 * - Scene 3.2 (80-85s): Value proposition stack
 * - Scene 3.3 (85-90s): Brand lockup + CTA
 */
export const Act3Proof: React.FC = () => {
  const { act3 } = timeline

  return (
    <AbsoluteFill>
      {/* Scene 3.1: Metrics Display (75-80s) */}
      <Sequence
        from={act3.metrics.start - act3.start}
        durationInFrames={act3.valueStack.end - act3.metrics.start}
        name="Metrics Display"
      >
        <MetricsDisplay
          metrics={[
            {
              value: 85,
              suffix: '%',
              label: 'Faster Competitive Research',
              color: colors.brand,
            },
            {
              value: 360,
              suffix: '°',
              label: 'Market Coverage',
              color: colors.emerald,
            },
            {
              value: 100,
              suffix: '%',
              label: 'Enterprise Security',
              color: colors.purple,
            },
          ]}
        />
      </Sequence>

      {/* Scene 3.2-3.4: Brand Lockup + CTA (85-90s) */}
      <Sequence
        from={act3.cta.start - act3.start}
        durationInFrames={act3.end - act3.cta.start}
        name="Brand Lockup"
      >
        <BrandLockup />
      </Sequence>
    </AbsoluteFill>
  )
}
