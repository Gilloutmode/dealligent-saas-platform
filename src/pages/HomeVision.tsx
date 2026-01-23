// HOME VISION PAGE - 3 Levels Architecture
// Enterprise Intelligence Platform

import { motion } from 'framer-motion'
import {
  HeroSectionVision,
  Level1Section,
  Level2Section,
  Level3Section,
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
      className="min-h-full"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <HeroSectionVision />
      <Level1Section />
      <Level2Section />
      <Level3Section />
    </motion.div>
  )
}

export default HomeVisionPage
