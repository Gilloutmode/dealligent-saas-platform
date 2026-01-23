"use client"

import { motion } from 'framer-motion'
import {
  Sparkles,
  Database,
  Zap,
  Radio,
  Users,
  HeadphonesIcon,
  Lightbulb,
  TrendingUp,
  Upload,
  MessageSquare,
  BrainCircuit,
  Bell,
  ArrowRight,
  CheckCircle2,
  Quote,
  Shield,
  Clock,
  Rocket
} from 'lucide-react'
import { NumberTicker } from '../components/ui/NumberTicker'
import { BorderBeam } from '../components/ui/BorderBeam'
import { Level1Preview, Level2Preview, Level3Preview } from '../components/home-vision/previews'

// =============================================================================
// ANIMATION VARIANTS
// =============================================================================

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 }
  }
}

const cardHover = {
  y: -4,
  scale: 1.02,
  transition: { type: "spring" as const, stiffness: 400, damping: 17 }
}

// =============================================================================
// SECTION 1: HERO
// =============================================================================

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-500/15 rounded-full blur-[100px]" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div variants={staggerItem}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Enterprise Knowledge Platform
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={staggerItem}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight"
          >
            Your company's intelligence,
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              unified and actionable.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={staggerItem}
            className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed"
          >
            Stop searching. Start knowing. Dealligent transforms your scattered internal
            knowledge into instant, contextual answers—then enriches them with real-time
            market intelligence.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="btn-premium px-8 py-4 text-lg"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 text-lg font-semibold text-white border border-white/20 rounded-xl hover:bg-white/5 transition-colors"
            >
              Book a Demo
            </motion.button>
          </motion.div>

          {/* 3 Levels Visual */}
          <motion.div
            variants={staggerItem}
            className="pt-16 max-w-4xl mx-auto"
          >
            <ThreeLevelsVisual />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function ThreeLevelsVisual() {
  const levels = [
    { label: "Level 3", title: "Media Digest", color: "purple", icon: Radio },
    { label: "Level 2", title: "External Sources", color: "cyan", icon: Zap },
    { label: "Level 1", title: "Internal Sources", color: "indigo", icon: Database },
  ]

  return (
    <div className="relative perspective-1000">
      <motion.div
        className="flex flex-col gap-3"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {levels.map((level, index) => (
          <motion.div
            key={level.label}
            variants={staggerItem}
            whileHover={cardHover}
            className={`
              relative p-6 rounded-2xl border backdrop-blur-xl overflow-hidden cursor-pointer
              ${level.color === 'indigo' ? 'bg-indigo-500/10 border-indigo-500/30' : ''}
              ${level.color === 'cyan' ? 'bg-cyan-500/10 border-cyan-500/30' : ''}
              ${level.color === 'purple' ? 'bg-purple-500/10 border-purple-500/30' : ''}
            `}
            style={{
              transform: `translateZ(${(2 - index) * 20}px)`,
              zIndex: 3 - index
            }}
          >
            <div className="flex items-center gap-4">
              <div className={`
                p-3 rounded-xl
                ${level.color === 'indigo' ? 'bg-indigo-500/20 text-indigo-400' : ''}
                ${level.color === 'cyan' ? 'bg-cyan-500/20 text-cyan-400' : ''}
                ${level.color === 'purple' ? 'bg-purple-500/20 text-purple-400' : ''}
              `}>
                <level.icon className="w-6 h-6" />
              </div>
              <div className="text-left">
                <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  {level.label}
                </span>
                <h3 className="text-lg font-semibold text-white">{level.title}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

// =============================================================================
// SECTION 2: THE PROBLEM
// =============================================================================

function ProblemSection() {
  const stats = [
    { value: 87, suffix: "%", label: "of enterprise knowledge is trapped in silos" },
    { value: 2.5, suffix: "h", label: "wasted daily searching for information", decimals: 1 },
    { value: 47, prefix: "$", suffix: "B", label: "lost annually due to poor knowledge sharing" },
  ]

  const painPoints = [
    {
      problem: {
        quote: "Where was that client spec again?",
        description: "Your knowledge is scattered across emails, Slack, Drive, CRM, and a dozen other tools. Finding anything requires archaeological skills."
      },
      solution: {
        quote: "Just ask.",
        description: "One intelligent interface connects all your internal knowledge. Ask naturally, get answers instantly."
      }
    },
    {
      problem: {
        quote: "I need 2 hours to prep for this client call.",
        description: "Before every meeting, your team digs through old emails, CRM notes, and shared drives to reconstruct context."
      },
      solution: {
        quote: "Prep time: 5 minutes.",
        description: 'Ask "What should I know before my Acme call?" and get a complete briefing with relevant history and insights.'
      }
    },
    {
      problem: {
        quote: "What's our competition doing? I have no idea.",
        description: "Your CI team is overwhelmed. Competitive insights arrive too late—or not at all. Decisions happen in the dark."
      },
      solution: {
        quote: "Real-time intelligence, on demand.",
        description: "Invoke @Market to get instant competitive analysis. Receive proactive alerts when the market moves."
      }
    }
  ]

  return (
    <section className="py-32 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="space-y-16"
        >
          {/* Headline */}
          <motion.div variants={fadeInUp} className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Enterprise knowledge is{" "}
              <span className="text-red-400">broken.</span>
            </h2>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="text-center p-8 rounded-2xl bg-white/5 border border-white/10"
              >
                <div className="text-5xl font-bold text-white mb-3">
                  {stat.prefix}
                  <NumberTicker
                    value={stat.value}
                    decimalPlaces={stat.decimals || 0}
                    className="text-5xl font-bold"
                  />
                  {stat.suffix}
                </div>
                <p className="text-neutral-400">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Pain Point Cards */}
          <motion.div
            variants={staggerContainer}
            className="grid lg:grid-cols-3 gap-6"
          >
            {painPoints.map((point, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={cardHover}
                className="rounded-2xl overflow-hidden bg-neutral-900/50 border border-white/10"
              >
                {/* Problem */}
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-center gap-2 text-red-400 mb-3">
                    <span className="text-xl">😫</span>
                    <span className="text-sm font-semibold uppercase tracking-wider">The Problem</span>
                  </div>
                  <p className="text-white font-medium text-lg mb-3">"{point.problem.quote}"</p>
                  <p className="text-neutral-400 text-sm leading-relaxed">{point.problem.description}</p>
                </div>

                {/* Solution */}
                <div className="p-6 bg-gradient-to-b from-indigo-500/5 to-transparent">
                  <div className="flex items-center gap-2 text-indigo-400 mb-3">
                    <Sparkles className="w-5 h-5" />
                    <span className="text-sm font-semibold uppercase tracking-wider">With Dealligent</span>
                  </div>
                  <p className="text-white font-medium text-lg mb-3">"{point.solution.quote}"</p>
                  <p className="text-neutral-400 text-sm leading-relaxed">{point.solution.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// =============================================================================
// SECTION 3: THE SOLUTION - 3 LEVELS
// =============================================================================

function SolutionSection() {
  const levels = [
    {
      badge: "For Everyone",
      headline: "Ask your company anything.",
      description: "Transform your scattered internal knowledge into an intelligent, searchable brain. Upload emails, meeting transcripts, documents, and more. Our AI automatically organizes everything and delivers contextual answers based on your role.",
      features: [
        { title: "Unified Knowledge Base", desc: "All your internal data in one searchable place" },
        { title: "Smart Organization", desc: "AI auto-classifies content by client, product, and topic" },
        { title: "Role-Aware Responses", desc: "Answers tailored to Sales, Support, Product, or Engineering" },
      ],
      color: "indigo",
      icon: Database,
      preview: "Internal Sources"
    },
    {
      badge: "For Decision Makers",
      headline: "Intelligence on demand.",
      description: "When internal knowledge isn't enough, summon specialized AI agents that tap into real-time external intelligence. Competitive moves, market trends, pricing changes—all at your fingertips.",
      features: [
        { title: "Specialized Agents", desc: "@Market, @Product, @Sales, @Technology" },
        { title: "Real-Time Data", desc: "Powered by Perplexity AI, Exa, and more" },
        { title: "Seamless Integration", desc: "Enrich any internal answer with external insights" },
      ],
      color: "cyan",
      icon: Zap,
      preview: "External Sources"
    },
    {
      badge: "Always On",
      headline: "Stay ahead, automatically.",
      description: "Don't wait to ask—Dealligent proactively surfaces what matters. Set up monitoring for competitors, technologies, or market segments. Receive curated digests and instant alerts when something important happens.",
      features: [
        { title: "Topic Monitoring", desc: "Track competitors, technologies, market segments 24/7" },
        { title: "Smart Digests", desc: "Daily or weekly summaries of relevant developments" },
        { title: "Instant Alerts", desc: "Get notified when critical events occur" },
      ],
      color: "purple",
      icon: Radio,
      preview: "Media Digest"
    }
  ]

  return (
    <section className="py-32 bg-gradient-to-b from-[#0a0a0a] to-[#0d0d12]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="space-y-20"
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Three levels of intelligence,{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                one unified platform.
              </span>
            </h2>
            <p className="text-xl text-neutral-400">
              From internal knowledge to external insights to proactive monitoring—Dealligent grows with your needs.
            </p>
          </motion.div>

          {/* Level Cards */}
          <motion.div
            variants={staggerContainer}
            className="space-y-8"
          >
            {levels.map((level, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={{ scale: 1.01 }}
                className={`
                  relative p-8 md:p-10 rounded-3xl border overflow-hidden
                  ${level.color === 'indigo' ? 'bg-indigo-500/5 border-indigo-500/20' : ''}
                  ${level.color === 'cyan' ? 'bg-cyan-500/5 border-cyan-500/20' : ''}
                  ${level.color === 'purple' ? 'bg-purple-500/5 border-purple-500/20' : ''}
                `}
              >
                <BorderBeam
                  size={300}
                  duration={15}
                  colorFrom={level.color === 'indigo' ? '#6366f1' : level.color === 'cyan' ? '#06b6d4' : '#a855f7'}
                  colorTo={level.color === 'indigo' ? '#818cf8' : level.color === 'cyan' ? '#22d3ee' : '#c084fc'}
                />

                <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
                  {/* Content */}
                  <div className="space-y-6">
                    <span className={`
                      inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider
                      ${level.color === 'indigo' ? 'bg-indigo-500/20 text-indigo-400' : ''}
                      ${level.color === 'cyan' ? 'bg-cyan-500/20 text-cyan-400' : ''}
                      ${level.color === 'purple' ? 'bg-purple-500/20 text-purple-400' : ''}
                    `}>
                      <level.icon className="w-4 h-4" />
                      {level.badge}
                    </span>

                    <h3 className="text-3xl font-bold text-white">{level.headline}</h3>
                    <p className="text-neutral-400 leading-relaxed">{level.description}</p>

                    <ul className="space-y-3">
                      {level.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start gap-3">
                          <CheckCircle2 className={`
                            w-5 h-5 mt-0.5 flex-shrink-0
                            ${level.color === 'indigo' ? 'text-indigo-400' : ''}
                            ${level.color === 'cyan' ? 'text-cyan-400' : ''}
                            ${level.color === 'purple' ? 'text-purple-400' : ''}
                          `} />
                          <div>
                            <span className="text-white font-medium">{feature.title}:</span>{" "}
                            <span className="text-neutral-400">{feature.desc}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Preview Card */}
                  <div className={`
                    p-6 rounded-2xl border backdrop-blur-xl
                    ${level.color === 'indigo' ? 'bg-indigo-500/10 border-indigo-500/30' : ''}
                    ${level.color === 'cyan' ? 'bg-cyan-500/10 border-cyan-500/30' : ''}
                    ${level.color === 'purple' ? 'bg-purple-500/10 border-purple-500/30' : ''}
                  `}>
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                      <level.icon className={`
                        w-6 h-6
                        ${level.color === 'indigo' ? 'text-indigo-400' : ''}
                        ${level.color === 'cyan' ? 'text-cyan-400' : ''}
                        ${level.color === 'purple' ? 'text-purple-400' : ''}
                      `} />
                      <span className="text-white font-semibold">Level {index + 1}: {level.preview}</span>
                    </div>
                    <LevelPreview level={index + 1} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function LevelPreview({ level }: { level: number }) {
  if (level === 1) return <Level1Preview />
  if (level === 2) return <Level2Preview />
  return <Level3Preview />
}

// =============================================================================
// SECTION 4: USE CASES BY ROLE
// =============================================================================

function UseCasesSection() {
  const roles = [
    {
      icon: TrendingUp,
      title: "For Sales Teams",
      headline: "Stop prepping. Start closing.",
      before: "2 hours digging through emails before every call.",
      after: 'Ask "Brief me on Acme Corp" and be ready in 5 minutes.',
      benefits: [
        "Instant client context and relationship history",
        "Competitive positioning at your fingertips",
        "Deal intelligence that actually helps you close"
      ],
      color: "blue"
    },
    {
      icon: HeadphonesIcon,
      title: "For Support Teams",
      headline: "Solve once. Know forever.",
      before: "Rediscovering solutions that were already documented somewhere.",
      after: 'Ask "How did we resolve this before?" and get immediate answers.',
      benefits: [
        "Find past solutions in seconds",
        "Pattern recognition across all tickets",
        "Proactive identification of emerging issues"
      ],
      color: "green"
    },
    {
      icon: Lightbulb,
      title: "For Product Teams",
      headline: "Build what customers actually need.",
      before: "Manually aggregating feedback from dozens of sources.",
      after: 'Ask "What features are customers requesting?" and see patterns instantly.',
      benefits: [
        "Automatic feedback aggregation and theming",
        "Competitive feature benchmarking",
        "Roadmap intelligence from the field"
      ],
      color: "orange"
    },
    {
      icon: Users,
      title: "For Leadership",
      headline: "Decide with confidence.",
      before: "Waiting weeks for competitive reports that are already outdated.",
      after: 'Ask "@Market what\'s happening in our space?" and know in minutes.',
      benefits: [
        "Real-time market visibility",
        "Cross-functional pattern detection",
        "Strategic early warning system"
      ],
      color: "purple"
    }
  ]

  return (
    <section className="py-32 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Built for how your teams{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                actually work.
              </span>
            </h2>
          </motion.div>

          {/* Role Cards Grid */}
          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-6"
          >
            {roles.map((role, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={cardHover}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
              >
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`
                    p-3 rounded-xl
                    ${role.color === 'blue' ? 'bg-blue-500/20 text-blue-400' : ''}
                    ${role.color === 'green' ? 'bg-green-500/20 text-green-400' : ''}
                    ${role.color === 'orange' ? 'bg-orange-500/20 text-orange-400' : ''}
                    ${role.color === 'purple' ? 'bg-purple-500/20 text-purple-400' : ''}
                  `}>
                    <role.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-sm text-neutral-500">{role.title}</span>
                    <h3 className="text-xl font-bold text-white">{role.headline}</h3>
                  </div>
                </div>

                {/* Before/After */}
                <div className="space-y-4 mb-6">
                  <div className="flex gap-3">
                    <span className="text-red-400 font-semibold text-sm shrink-0">Before:</span>
                    <p className="text-neutral-400 text-sm">{role.before}</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-green-400 font-semibold text-sm shrink-0">After:</span>
                    <p className="text-neutral-300 text-sm">{role.after}</p>
                  </div>
                </div>

                {/* Benefits */}
                <ul className="space-y-2">
                  {role.benefits.map((benefit, bIndex) => (
                    <li key={bIndex} className="flex items-center gap-2 text-sm text-neutral-400">
                      <CheckCircle2 className={`
                        w-4 h-4 flex-shrink-0
                        ${role.color === 'blue' ? 'text-blue-400' : ''}
                        ${role.color === 'green' ? 'text-green-400' : ''}
                        ${role.color === 'orange' ? 'text-orange-400' : ''}
                        ${role.color === 'purple' ? 'text-purple-400' : ''}
                      `} />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// =============================================================================
// SECTION 5: HOW IT WORKS
// =============================================================================

function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      icon: Upload,
      title: "Connect Your Knowledge",
      description: "Upload documents, connect your email, integrate with Slack. Our AI ingests and organizes everything automatically.",
      color: "indigo"
    },
    {
      number: "02",
      icon: MessageSquare,
      title: "Ask Anything",
      description: "Natural language queries across your entire knowledge base. Answers are contextual and role-aware.",
      color: "cyan"
    },
    {
      number: "03",
      icon: BrainCircuit,
      title: "Enrich with Intelligence",
      description: "Need more? Invoke AI agents for real-time external insights. Combine internal context with market intelligence.",
      color: "purple"
    },
    {
      number: "04",
      icon: Bell,
      title: "Stay Informed",
      description: "Set up monitoring and receive proactive digests. Never miss a critical development again.",
      color: "green"
    }
  ]

  return (
    <section className="py-32 bg-gradient-to-b from-[#0a0a0a] to-[#0d0d15]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Up and running in{" "}
              <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                days, not months.
              </span>
            </h2>
          </motion.div>

          {/* Steps */}
          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={cardHover}
                className="relative p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                {/* Step Number */}
                <div className={`
                  absolute -top-3 -left-3 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold
                  ${step.color === 'indigo' ? 'bg-indigo-500 text-white' : ''}
                  ${step.color === 'cyan' ? 'bg-cyan-500 text-white' : ''}
                  ${step.color === 'purple' ? 'bg-purple-500 text-white' : ''}
                  ${step.color === 'green' ? 'bg-green-500 text-white' : ''}
                `}>
                  {step.number}
                </div>

                {/* Icon */}
                <div className={`
                  w-14 h-14 rounded-2xl flex items-center justify-center mb-5 mt-2
                  ${step.color === 'indigo' ? 'bg-indigo-500/20 text-indigo-400' : ''}
                  ${step.color === 'cyan' ? 'bg-cyan-500/20 text-cyan-400' : ''}
                  ${step.color === 'purple' ? 'bg-purple-500/20 text-purple-400' : ''}
                  ${step.color === 'green' ? 'bg-green-500/20 text-green-400' : ''}
                `}>
                  <step.icon className="w-7 h-7" />
                </div>

                <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{step.description}</p>

                {/* Connector Line (not on last) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-white/20 to-transparent" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// =============================================================================
// SECTION 6: SOCIAL PROOF
// =============================================================================

function SocialProofSection() {
  const testimonials = [
    {
      quote: "Dealligent reduced our pre-meeting prep from 2 hours to 5 minutes. Our sales team now has more time to actually sell.",
      author: "VP of Sales",
      company: "Enterprise SaaS Company",
      color: "blue"
    },
    {
      quote: "We finally have visibility into what our competitors are doing—without hiring a dedicated CI team.",
      author: "Chief Product Officer",
      company: "Manufacturing Tech",
      color: "purple"
    },
    {
      quote: "Support tickets that used to take 30 minutes to research now take 3. The ROI was obvious within the first week.",
      author: "Head of Customer Success",
      company: "B2B Platform",
      color: "green"
    }
  ]

  return (
    <section className="py-32 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Trusted by{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                forward-thinking teams.
              </span>
            </h2>
          </motion.div>

          {/* Testimonials */}
          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={cardHover}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 relative"
              >
                {/* Quote Icon */}
                <Quote className={`
                  w-10 h-10 mb-6 opacity-50
                  ${testimonial.color === 'blue' ? 'text-blue-400' : ''}
                  ${testimonial.color === 'purple' ? 'text-purple-400' : ''}
                  ${testimonial.color === 'green' ? 'text-green-400' : ''}
                `} />

                <p className="text-white text-lg leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>

                <div>
                  <p className="text-white font-semibold">— {testimonial.author}</p>
                  <p className="text-neutral-500 text-sm">{testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// =============================================================================
// SECTION 7: FINAL CTA
// =============================================================================

function FinalCTASection() {
  const trustElements = [
    { icon: Shield, text: "No credit card required" },
    { icon: Clock, text: "14-day free trial" },
    { icon: Rocket, text: "Setup in hours" },
  ]

  return (
    <section className="py-32 bg-gradient-to-b from-[#0a0a0a] to-[#0d0d18] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center space-y-10"
        >
          {/* Headline */}
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            Ready to transform how your team{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              accesses knowledge?
            </span>
          </motion.h2>

          {/* CTAs */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="btn-premium px-8 py-4 text-lg"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 text-lg font-semibold text-white border border-white/20 rounded-xl hover:bg-white/5 transition-colors"
            >
              Book a Demo
            </motion.button>
          </motion.div>

          {/* Trust Elements */}
          <motion.div
            variants={staggerItem}
            className="flex flex-wrap items-center justify-center gap-8 pt-4"
          >
            {trustElements.map((element, index) => (
              <div key={index} className="flex items-center gap-2 text-neutral-400">
                <element.icon className="w-5 h-5 text-green-400" />
                <span>{element.text}</span>
              </div>
            ))}
          </motion.div>

          {/* Enterprise Badge */}
          <motion.div variants={staggerItem}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-neutral-400 text-sm">
              <Shield className="w-4 h-4 text-indigo-400" />
              Enterprise-grade security
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

export function HomepageVisionPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <UseCasesSection />
      <HowItWorksSection />
      <SocialProofSection />
      <FinalCTASection />
    </div>
  )
}

export default HomepageVisionPage
