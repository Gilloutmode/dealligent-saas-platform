import { useRef, useCallback } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '../../lib/utils'

interface GlassPanelProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode
    className?: string
    enableHover?: boolean
    delay?: number
}

// Throttle constant for ~30fps
const THROTTLE_MS = 33

/**
 * Enterprise-grade Glass Panel component
 * Aurora design system - Replaces PremiumCard with a more systematic approach to surfacing and depth.
 */
export function GlassPanel({
    children,
    className,
    enableHover = false,
    delay = 0,
    ...props
}: GlassPanelProps) {
    // Performance optimization: Throttle mousemove to ~30fps
    const lastCallRef = useRef(0)

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const now = Date.now()
        if (now - lastCallRef.current < THROTTLE_MS) return
        lastCallRef.current = now

        const rect = e.currentTarget.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        e.currentTarget.style.setProperty('--mouse-x', `${x}%`)
        e.currentTarget.style.setProperty('--mouse-y', `${y}%`)
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            onMouseMove={handleMouseMove}
            className={cn(
                "panel-aurora rounded-[var(--radius-panel)] p-6 group",
                enableHover && "cursor-pointer",
                className
            )}
            {...props}
        >
            {/* Content */}
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </motion.div>
    )
}

export default GlassPanel
