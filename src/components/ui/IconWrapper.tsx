import { ReactNode, type FC } from 'react'
import { motion } from 'framer-motion'

interface IconWrapperProps {
    children: ReactNode
    glow?: boolean
    className?: string
    color?: string
}

/**
 * Icon wrapper with glow effect
 * Aurora design system - Adds depth and visual interest to icons
 */
export const IconWrapper: FC<IconWrapperProps> = ({
    children,
    glow = true,
    className = "",
    color = "var(--c-brand)"
}) => {
    return (
        <motion.div
            className={`group relative inline-flex items-center justify-center ${className}`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
            {/* GLOW LAYER */}
            {glow && (
                <div
                    className="absolute inset-0 blur-[8px] opacity-40 group-hover:opacity-70 transition-opacity"
                    style={{ color }}
                >
                    {children}
                </div>
            )}

            {/* SHADOW LAYER for depth */}
            <div className="absolute inset-0 translate-y-[1px] translate-x-[1px] opacity-20 blur-[1px] text-black">
                {children}
            </div>

            {/* MAIN ICON */}
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    )
}

export default IconWrapper
