// MockupDemo - Animated Mockup Composition for Demo Videos
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion'

// Colors from design system
const colors = {
  background: '#0a0a0a',
  surface: 'rgba(255, 255, 255, 0.08)',
  border: 'rgba(255, 255, 255, 0.15)',
  brand: '#2563EB',
  brandGlow: 'rgba(59, 130, 246, 0.4)',
  text: '#ffffff',
  textMuted: '#9ca3af',
  emerald: '#10B981',
}

// Animated Chat Message Component
function ChatMessage({
  text,
  isUser,
  startFrame,
  typingSpeed = 2
}: {
  text: string
  isUser: boolean
  startFrame: number
  typingSpeed?: number
}) {
  const frame = useCurrentFrame()
  const { fps: _fps } = useVideoConfig()

  const relativeFrame = frame - startFrame
  if (relativeFrame < 0) return null

  const charsToShow = Math.floor(relativeFrame / typingSpeed)
  const displayText = text.slice(0, charsToShow)
  const isTyping = charsToShow < text.length

  const opacity = interpolate(relativeFrame, [0, 10], [0, 1], { extrapolateRight: 'clamp' })

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom: 12,
        opacity,
      }}
    >
      <div
        style={{
          maxWidth: '70%',
          padding: '12px 16px',
          borderRadius: 12,
          background: isUser ? colors.brand : colors.surface,
          border: `1px solid ${isUser ? colors.brand : colors.border}`,
        }}
      >
        <span style={{ color: colors.text, fontSize: 16 }}>
          {displayText}
          {isTyping && <span style={{ opacity: 0.5 }}>|</span>}
        </span>
      </div>
    </div>
  )
}

// Thinking Dots Animation
function ThinkingDots({ startFrame }: { startFrame: number }) {
  const frame = useCurrentFrame()
  const relativeFrame = frame - startFrame

  if (relativeFrame < 0 || relativeFrame > 60) return null

  return (
    <div style={{ display: 'flex', gap: 4, padding: '12px 16px' }}>
      {[0, 1, 2].map((i) => {
        const y = Math.sin((relativeFrame + i * 8) * 0.3) * 4
        return (
          <div
            key={i}
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: colors.emerald,
              transform: `translateY(${y}px)`,
            }}
          />
        )
      })}
    </div>
  )
}

// Source Card with Confidence Badge
function SourceCard({
  name,
  confidence,
  startFrame
}: {
  name: string
  confidence: number
  startFrame: number
}) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const relativeFrame = frame - startFrame
  if (relativeFrame < 0) return null

  const scale = spring({
    frame: relativeFrame,
    fps,
    config: { damping: 15, stiffness: 200 },
  })

  const opacity = interpolate(relativeFrame, [0, 15], [0, 1], { extrapolateRight: 'clamp' })

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 12px',
        borderRadius: 8,
        background: colors.surface,
        border: `1px solid ${colors.border}`,
        marginBottom: 8,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <span style={{ color: colors.text, fontSize: 14 }}>{name}</span>
      <span
        style={{
          padding: '2px 8px',
          borderRadius: 4,
          background: confidence > 90 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
          color: confidence > 90 ? colors.emerald : '#F59E0B',
          fontSize: 12,
          fontWeight: 600,
        }}
      >
        {confidence}%
      </span>
    </div>
  )
}

// Main Demo Composition
export const MockupDemo: React.FC = () => {
  useCurrentFrame() // frame available via hook
  const { fps: __fps, durationInFrames: _durationInFrames } = useVideoConfig()

  // Animation timeline (in frames at 30fps)
  const TIMELINE = {
    userMessage: 30,        // 1s - User starts typing
    thinking: 150,          // 5s - AI thinking
    aiResponse: 210,        // 7s - AI responds
    sources: 450,           // 15s - Sources appear
  }

  return (
    <AbsoluteFill style={{ background: colors.background }}>
      {/* Header */}
      <div
        style={{
          padding: '24px 48px',
          borderBottom: `1px solid ${colors.border}`,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 8,
            background: `linear-gradient(135deg, ${colors.brand}, #06B6D4)`,
          }}
        />
        <span style={{ color: colors.text, fontSize: 24, fontWeight: 700 }}>
          Dealligent
        </span>
        <span style={{ color: colors.textMuted, fontSize: 14, marginLeft: 'auto' }}>
          Internal Knowledge Base
        </span>
      </div>

      {/* Main Content - 3 Column Layout */}
      <div style={{ display: 'flex', flex: 1, padding: 24, gap: 24 }}>
        {/* Left Panel - Folders */}
        <div
          style={{
            width: 240,
            padding: 16,
            borderRadius: 12,
            background: colors.surface,
            border: `1px solid ${colors.border}`,
          }}
        >
          <span style={{ color: colors.textMuted, fontSize: 12, textTransform: 'uppercase' }}>
            Knowledge Library
          </span>
          {['Clients', 'Support', 'Products', 'Meetings'].map((folder, i) => (
            <div
              key={folder}
              style={{
                padding: '10px 12px',
                marginTop: 8,
                borderRadius: 8,
                background: i === 0 ? 'rgba(37, 99, 235, 0.2)' : 'transparent',
                color: i === 0 ? colors.brand : colors.text,
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              {folder}
            </div>
          ))}
        </div>

        {/* Center - Chat */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, padding: 16 }}>
            <ChatMessage
              text="What commitments did we make to Acme Corp in Q4 negotiations?"
              isUser={true}
              startFrame={TIMELINE.userMessage}
            />

            <ThinkingDots startFrame={TIMELINE.thinking} />

            <ChatMessage
              text="Based on 3 internal documents, you committed to: Enterprise pricing at $120K/year (20% discount), custom API integration within 6 weeks, and a dedicated CSM (Sarah) post-onboarding."
              isUser={false}
              startFrame={TIMELINE.aiResponse}
              typingSpeed={1}
            />
          </div>

          {/* Sources */}
          <div style={{ padding: 16, borderTop: `1px solid ${colors.border}` }}>
            <span style={{ color: colors.textMuted, fontSize: 12, textTransform: 'uppercase' }}>
              Sources
            </span>
            <div style={{ marginTop: 12 }}>
              <SourceCard name="acme_proposal_v3.pdf" confidence={96} startFrame={TIMELINE.sources} />
              <SourceCard name="meeting_notes_dec12.txt" confidence={92} startFrame={TIMELINE.sources + 20} />
              <SourceCard name="slack_export_acme.json" confidence={88} startFrame={TIMELINE.sources + 40} />
            </div>
          </div>
        </div>

        {/* Right Panel - Agents */}
        <div
          style={{
            width: 240,
            padding: 16,
            borderRadius: 12,
            background: colors.surface,
            border: `1px solid ${colors.border}`,
          }}
        >
          <span style={{ color: colors.textMuted, fontSize: 12, textTransform: 'uppercase' }}>
            AI Agents
          </span>
          {[
            { name: '@Sales', active: true, color: colors.emerald },
            { name: '@Product', active: false, color: '#8B5CF6' },
            { name: '@Market', active: false, color: colors.brand },
          ].map((agent) => (
            <div
              key={agent.name}
              style={{
                padding: '10px 12px',
                marginTop: 8,
                borderRadius: 8,
                background: agent.active ? `${agent.color}20` : 'transparent',
                border: `1px solid ${agent.active ? agent.color : colors.border}`,
                color: agent.active ? agent.color : colors.textMuted,
                fontSize: 14,
              }}
            >
              {agent.name}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  )
}

export default MockupDemo
