import React from 'react'
import { AbsoluteFill, useCurrentFrame } from 'remotion'
import { colors, typography, spacing, gradients } from '../../../styles/theme'
import { StatCard } from '../../../components/ui/StatCard'
import { BlurIn } from '../../../components/animations/BlurIn'

interface Metric {
  value: number
  suffix: string
  label: string
  color: string
}

interface MetricsDisplayProps {
  startFrame?: number
  metrics: Metric[]
}

export const MetricsDisplay: React.FC<MetricsDisplayProps> = ({
  startFrame = 0,
  metrics,
}) => {
  const frame = useCurrentFrame()
  const adjustedFrame = frame - startFrame

  if (adjustedFrame < 0) {
    return null
  }

  return (
    <AbsoluteFill
      style={{
        background: colors.background,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: spacing.xxl,
      }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: gradients.brandRadial,
          opacity: 0.3,
        }}
      />

      {/* Title */}
      <BlurIn delay={0} duration={15}>
        <h2
          style={{
            fontSize: typography.sizes.h2,
            fontWeight: typography.weights.bold,
            fontFamily: typography.fontDisplay,
            color: colors.text,
            margin: 0,
            textAlign: 'center',
          }}
        >
          Proven Results
        </h2>
      </BlurIn>

      {/* Metrics grid */}
      <div
        style={{
          display: 'flex',
          gap: spacing.xl,
          justifyContent: 'center',
        }}
      >
        {metrics.map((metric, i) => (
          <StatCard
            key={metric.label}
            value={metric.value}
            suffix={metric.suffix}
            label={metric.label}
            accentColor={metric.color}
            delay={15 + i * 12}
            style={{ minWidth: 280 }}
          />
        ))}
      </div>
    </AbsoluteFill>
  )
}
