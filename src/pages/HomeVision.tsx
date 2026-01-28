// HOME VISION PAGE - 3 Levels Architecture + Role Use Cases
// Enterprise Intelligence Platform

import { motion } from 'framer-motion'
import {
  HeroSectionVision,
  LevelsOverviewSection,
  Level1Section,
  Level2Section,
  Level3Section,
  UseCasesByRole,
} from '@/components/home-vision'

const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
}

export function HomeVisionPage() {
  return (
    <motion.div
      className="min-h-full bg-[var(--bg-page)] overflow-x-hidden"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <HeroSectionVision />
      <LevelsOverviewSection />
      <Level1Section />
      <Level2Section />
      <Level3Section />
      <UseCasesByRole />
    </motion.div>
  )
}

export default HomeVisionPage
