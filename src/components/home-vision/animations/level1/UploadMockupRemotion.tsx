/**
 * UploadMockupRemotion - Remotion Player wrapper for homepage embed
 *
 * Uses @remotion/player to embed the UploadTransformation composition
 * Provides hover-to-replay functionality and matches existing mockup styling
 */
import { Player, PlayerRef, CallbackListener } from '@remotion/player'
import { useCallback, useRef, useState, useEffect } from 'react'
import { useInView } from 'framer-motion'
import { UploadTransformation, UPLOAD_TRANSFORMATION_DURATION } from '@/remotion/compositions/HomepageMockups'

interface UploadMockupRemotionProps {
  /**
   * Whether to autoplay when component comes into view
   * @default true
   */
  autoplay?: boolean
  /**
   * Whether to loop the animation
   * @default false
   */
  loop?: boolean
  /**
   * Custom className for the container
   */
  className?: string
}

export function UploadMockupRemotion({
  autoplay = true,
  loop = false,
  className = '',
}: UploadMockupRemotionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<PlayerRef>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-50px' })
  const [hasPlayed, setHasPlayed] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  // Play when comes into view (if autoplay enabled)
  useEffect(() => {
    if (isInView && autoplay && !hasPlayed && playerRef.current) {
      playerRef.current.play()
      setIsPlaying(true)
    }
  }, [isInView, autoplay, hasPlayed])

  // Set up event listeners using the Player API
  useEffect(() => {
    const player = playerRef.current
    if (!player) return

    const onEnded: CallbackListener<'ended'> = () => {
      setHasPlayed(true)
      setIsPlaying(false)
    }

    const onPlay: CallbackListener<'play'> = () => {
      setIsPlaying(true)
    }

    const onPause: CallbackListener<'pause'> = () => {
      setIsPlaying(false)
    }

    player.addEventListener('ended', onEnded)
    player.addEventListener('play', onPlay)
    player.addEventListener('pause', onPause)

    return () => {
      player.removeEventListener('ended', onEnded)
      player.removeEventListener('play', onPlay)
      player.removeEventListener('pause', onPause)
    }
  }, [])

  // Replay on hover (after initial play completes)
  const handleMouseEnter = useCallback(() => {
    if (hasPlayed && playerRef.current) {
      playerRef.current.seekTo(0)
      playerRef.current.play()
      setIsPlaying(true)
      setHasPlayed(false)
    }
  }, [hasPlayed])

  return (
    <div
      ref={containerRef}
      className={`
        w-full aspect-[16/10] rounded-xl
        bg-[var(--mockup-bg,#0a0a0a)]
        border border-[var(--mockup-border,rgba(255,255,255,0.1))]
        relative overflow-hidden cursor-pointer
        ${className}
      `}
      onMouseEnter={handleMouseEnter}
    >
      <Player
        ref={playerRef}
        component={UploadTransformation}
        durationInFrames={UPLOAD_TRANSFORMATION_DURATION}
        fps={30}
        compositionWidth={640}
        compositionHeight={400}
        style={{
          width: '100%',
          height: '100%',
        }}
        loop={loop}
        autoPlay={false}
        controls={false}
        showVolumeControls={false}
        clickToPlay={false}
        doubleClickToFullscreen={false}
        spaceKeyToPlayOrPause={false}
        renderLoading={() => (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
          </div>
        )}
      />

      {/* Hover hint (after complete) */}
      {hasPlayed && !isPlaying && (
        <div className="absolute bottom-2 right-2 pointer-events-none">
          <span className="text-[9px] text-white/40 transition-opacity duration-300">
            Hover to replay
          </span>
        </div>
      )}
    </div>
  )
}

export default UploadMockupRemotion
