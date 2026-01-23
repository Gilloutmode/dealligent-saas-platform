/**
 * Dealligent Investor Pitch - Design Tokens
 * Apple-style motion design system
 */

export const colors = {
  // Base
  background: '#0a0a0a',
  backgroundAlt: '#111111',
  
  // Glass surfaces
  surface: 'rgba(255, 255, 255, 0.08)',
  surfaceHover: 'rgba(255, 255, 255, 0.12)',
  border: 'rgba(255, 255, 255, 0.15)',
  borderStrong: 'rgba(255, 255, 255, 0.25)',
  
  // Brand
  brand: '#2563EB',
  brandLight: '#3B82F6',
  brandGlow: 'rgba(59, 130, 246, 0.4)',
  brandGlowStrong: 'rgba(59, 130, 246, 0.6)',
  
  // Accent colors
  emerald: '#10B981',
  emeraldGlow: 'rgba(16, 185, 129, 0.4)',
  purple: '#7C3AED',
  purpleGlow: 'rgba(124, 58, 237, 0.4)',
  orange: '#F59E0B',
  orangeGlow: 'rgba(245, 158, 11, 0.4)',
  
  // Text
  text: '#ffffff',
  textMuted: '#9ca3af',
  textDim: '#6b7280',
  
  // Semantic
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
} as const

export const gradients = {
  brand: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
  brandRadial: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
  surface: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
  cosmic: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)',
} as const

export const typography = {
  // Font families (SF Pro fallbacks)
  fontDisplay: '"SF Pro Display", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  fontBody: '"SF Pro Text", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  fontMono: '"SF Mono", "JetBrains Mono", monospace',
  
  // Font sizes
  sizes: {
    hero: 72,
    h1: 56,
    h2: 42,
    h3: 32,
    h4: 24,
    body: 18,
    small: 14,
    caption: 12,
  },
  
  // Font weights
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const

export const spacing = {
  xs: 8,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
  xxl: 64,
  xxxl: 96,
} as const

export const animation = {
  // Spring configs for Remotion
  spring: {
    gentle: { damping: 200, stiffness: 100 },
    smooth: { damping: 150, stiffness: 150 },
    bouncy: { damping: 100, stiffness: 200 },
    snappy: { damping: 80, stiffness: 300 },
  },
  
  // Timing (in frames at 30fps)
  timing: {
    instant: 3,      // 0.1s
    fast: 9,         // 0.3s
    normal: 12,      // 0.4s
    slow: 18,        // 0.6s
    verySlow: 30,    // 1.0s
  },
  
  // Stagger delays (in frames)
  stagger: {
    tight: 2,        // 0.067s
    normal: 3,       // 0.1s
    loose: 6,        // 0.2s
  },
} as const

export const shadows = {
  glow: {
    brand: `0 0 40px ${colors.brandGlow}, 0 0 80px ${colors.brandGlow}`,
    emerald: `0 0 40px ${colors.emeraldGlow}, 0 0 80px ${colors.emeraldGlow}`,
    purple: `0 0 40px ${colors.purpleGlow}, 0 0 80px ${colors.purpleGlow}`,
  },
  card: '0 4px 24px rgba(0, 0, 0, 0.4)',
  cardHover: '0 8px 32px rgba(0, 0, 0, 0.5)',
} as const

// Video composition settings
export const videoConfig = {
  width: 1920,
  height: 1080,
  fps: 30,
  durationInFrames: 2700, // 90 seconds
} as const

// Timeline markers (in frames)
export const timeline = {
  // ACT 1: Problem (0-15s)
  act1: {
    start: 0,
    logoIntro: { start: 0, end: 150 },        // 0-5s
    painStat1: { start: 150, end: 300 },      // 5-10s
    painStat2: { start: 300, end: 450 },      // 10-15s
    end: 450,
  },
  
  // ACT 2: Solution (15-75s)
  act2: {
    start: 450,
    level1: {
      start: 450,
      transition: { start: 450, end: 540 },   // 15-18s
      chatDemo: { start: 540, end: 690 },     // 18-23s
      aiResponse: { start: 690, end: 840 },   // 23-28s
      valueProp: { start: 840, end: 900 },    // 28-30s
      end: 900,
    },
    level2: {
      start: 900,
      transition: { start: 900, end: 990 },   // 30-33s
      competitorAnalysis: { start: 990, end: 1200 },  // 33-40s
      multiSource: { start: 1200, end: 1410 },        // 40-47s
      valueProp: { start: 1410, end: 1500 },          // 47-50s
      end: 1500,
    },
    level3: {
      start: 1500,
      transition: { start: 1500, end: 1590 },         // 50-53s
      monitoring: { start: 1590, end: 1740 },         // 53-58s
      digest: { start: 1740, end: 1950 },             // 58-65s
      valueProp: { start: 1950, end: 2100 },          // 65-70s
      end: 2100,
    },
    unified: { start: 2100, end: 2250 },              // 70-75s
    end: 2250,
  },
  
  // ACT 3: Proof & CTA (75-90s)
  act3: {
    start: 2250,
    metrics: { start: 2250, end: 2400 },      // 75-80s
    valueStack: { start: 2400, end: 2550 },   // 80-85s
    cta: { start: 2550, end: 2640 },          // 85-88s
    brandLockup: { start: 2640, end: 2700 },  // 88-90s
    end: 2700,
  },
} as const
