// Remotion Root - Composition Registry
import React from 'react'
import { Composition } from 'remotion'
import { MockupDemo } from './compositions/MockupDemo'
import { InvestorPitch } from './compositions/InvestorPitch'
import { videoConfig } from './styles/theme'

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Investor Pitch Video - 90 seconds at 30fps */}
      <Composition
        id="InvestorPitch"
        component={InvestorPitch}
        durationInFrames={videoConfig.durationInFrames}
        fps={videoConfig.fps}
        width={videoConfig.width}
        height={videoConfig.height}
        defaultProps={{}}
      />

      {/* Demo Mockup Animation - 30 seconds at 30fps */}
      <Composition
        id="MockupDemo"
        component={MockupDemo}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  )
}
