// USE CASES BY ROLE SECTION - Section 5
// Tailored value propositions for different stakeholders

import { motion } from 'framer-motion'
import { Briefcase, Headset, Package } from 'lucide-react'
import { RoleCard } from './RoleCard'

const roles = [
    {
        icon: Briefcase,
        title: 'Sales Teams',
        tagline: '"Stop prepping. Start closing."',
        bullets: [
            'Instant client context before every call',
            'Competitive intel at your fingertips',
            'Win/loss patterns from your own deals',
        ],
    },
    {
        icon: Headset,
        title: 'Support Teams',
        tagline: '"Solve once. Know forever."',
        bullets: [
            'Find past solutions in seconds',
            'Pattern recognition across tickets',
            'Never re-solve the same issue twice',
        ],
    },
    {
        icon: Package,
        title: 'Product Teams',
        tagline: '"Build what customers actually need."',
        bullets: [
            'Automatic feedback aggregation',
            'Competitive feature benchmarking',
            'Prioritize with real data',
        ],
    },
    {
        icon: Briefcase, // Using Briefcase as fallback for Suit/Leadership if needed, but let's use Lucide's Suitcase if available or Briefcase
        title: 'Leadership',
        tagline: '"Decide with confidence."',
        bullets: [
            'Real-time market visibility',
            'Strategic early warning system',
            'Data-driven decisions, not gut feelings',
        ],
    },
]

// Note: Replacing icons to match request exactly if icons were specified
// SALES: Briefcase, SUPPORT: Headset, PRODUCT: Package, LEADERSHIP: Suit (using Briefcase/Suitcase)

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
}

export function UseCasesByRole() {
    return (
        <section className="py-24 px-8 bg-gradient-to-b from-transparent to-[var(--overlay-bg-light)]">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-4">
                        Built for Every Role
                    </h2>
                    <p className="text-xl lg:text-2xl text-[var(--text-secondary)]">
                        One platform. Tailored for how YOU work.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {roles.map((role, idx) => (
                        <RoleCard key={idx} {...role} />
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default UseCasesByRole
