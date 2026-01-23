import React from 'react'
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { colors, typography, animation, spacing } from '../../../styles/theme'
import { GlassCard } from '../../../components/ui/GlassCard'
import { TypeWriter } from '../../../components/animations/TypeWriter'
import { BlurIn } from '../../../components/animations/BlurIn'
import { SlideIn } from '../../../components/animations/SlideIn'
import { SourceBadge } from '../../../components/ui/SourceBadge'

interface ChatDemoProps {
  startFrame?: number
  question: string
  response: string
  sources: Array<{ name: string; icon: string }>
  showResponse?: boolean
}

export const ChatDemo: React.FC<ChatDemoProps> = ({
  startFrame = 0,
  question,
  response,
  sources,
  showResponse = true,
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const adjustedFrame = frame - startFrame

  if (adjustedFrame < 0) {
    return null
  }

  // Panel animation
  const panelProgress = spring({
    frame: adjustedFrame,
    fps,
    config: animation.spring.smooth,
  })

  // Thinking dots animation
  const thinkingVisible = adjustedFrame > 60 && adjustedFrame < 150
  const thinkingDotIndex = Math.floor((adjustedFrame / 10) % 3)

  // Response appears after thinking
  const responseDelay = 150

  return (
    <AbsoluteFill
      style={{
        background: colors.background,
        padding: spacing.xxl,
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.05,
          backgroundImage: `
            linear-gradient(${colors.brand} 1px, transparent 1px),
            linear-gradient(90deg, ${colors.brand} 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Main layout - 3 columns */}
      <div
        style={{
          display: 'flex',
          gap: spacing.lg,
          height: '100%',
          opacity: panelProgress,
          transform: `translateY(${(1 - panelProgress) * 20}px)`,
        }}
      >
        {/* Left sidebar - Sources */}
        <div
          style={{
            width: 280,
            display: 'flex',
            flexDirection: 'column',
            gap: spacing.md,
          }}
        >
          <h3
            style={{
              fontSize: typography.sizes.small,
              fontFamily: typography.fontMono,
              color: colors.textMuted,
              textTransform: 'uppercase',
              letterSpacing: 2,
              margin: 0,
            }}
          >
            Sources
          </h3>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: spacing.sm,
            }}
          >
            {sources.map((source, i) => (
              <SourceBadge
                key={source.name}
                name={source.name}
                icon={source.icon}
                delay={responseDelay + 30 + i * 10}
              />
            ))}
          </div>
        </div>

        {/* Center - Chat area */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: spacing.lg,
          }}
        >
          {/* User message */}
          <SlideIn direction="right" delay={30} distance={20}>
            <GlassCard
              padding={spacing.md}
              style={{
                alignSelf: 'flex-end',
                maxWidth: '70%',
                borderColor: colors.brandGlow,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: spacing.sm,
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: colors.brand,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontSize: 14 }}>👤</span>
                </div>
                <p
                  style={{
                    fontSize: typography.sizes.body,
                    fontFamily: typography.fontBody,
                    color: colors.text,
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  <TypeWriter
                    text={question}
                    delay={45}
                    speed={1}
                    showCursor={adjustedFrame < responseDelay}
                  />
                </p>
              </div>
            </GlassCard>
          </SlideIn>

          {/* Thinking indicator */}
          {thinkingVisible && (
            <BlurIn delay={0} duration={6}>
              <GlassCard
                padding={spacing.md}
                style={{
                  alignSelf: 'flex-start',
                  maxWidth: 120,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: 8,
                    alignItems: 'center',
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: colors.brand,
                        opacity: i === thinkingDotIndex ? 1 : 0.3,
                        transform: i === thinkingDotIndex ? 'scale(1.2)' : 'scale(1)',
                        transition: 'all 0.1s',
                      }}
                    />
                  ))}
                </div>
              </GlassCard>
            </BlurIn>
          )}

          {/* AI Response */}
          {showResponse && adjustedFrame > responseDelay && (
            <SlideIn direction="left" delay={0} distance={20}>
              <GlassCard
                padding={spacing.md}
                style={{
                  alignSelf: 'flex-start',
                  maxWidth: '80%',
                  borderColor: colors.emeraldGlow,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: spacing.sm,
                    alignItems: 'flex-start',
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${colors.brand} 0%, ${colors.purple} 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ fontSize: 14 }}>🤖</span>
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: typography.sizes.body,
                        fontFamily: typography.fontBody,
                        color: colors.text,
                        margin: 0,
                        lineHeight: 1.6,
                      }}
                    >
                      <TypeWriter
                        text={response}
                        delay={0}
                        speed={0.8}
                        showCursor
                      />
                    </p>
                  </div>
                </div>
              </GlassCard>
            </SlideIn>
          )}
        </div>

        {/* Right sidebar - Context */}
        <div
          style={{
            width: 280,
            display: 'flex',
            flexDirection: 'column',
            gap: spacing.md,
          }}
        >
          <h3
            style={{
              fontSize: typography.sizes.small,
              fontFamily: typography.fontMono,
              color: colors.textMuted,
              textTransform: 'uppercase',
              letterSpacing: 2,
              margin: 0,
            }}
          >
            Knowledge Base
          </h3>
          <BlurIn delay={90} duration={15}>
            <GlassCard padding={spacing.sm}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing.xs,
                }}
              >
                <span style={{ color: colors.emerald }}>●</span>
                <span
                  style={{
                    fontSize: typography.sizes.small,
                    color: colors.textMuted,
                  }}
                >
                  Connected
                </span>
              </div>
            </GlassCard>
          </BlurIn>
        </div>
      </div>
    </AbsoluteFill>
  )
}
