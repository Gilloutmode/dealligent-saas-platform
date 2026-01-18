import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

interface RotatingEarthProps {
    width?: number
    height?: number
    className?: string
}

/**
 * Interactive 3D Rotating Earth Globe
 * Aurora design system - Uses D3.js for geo projection with dotted landmasses
 */
export default function RotatingEarth({ width = 800, height = 600, className = "" }: RotatingEarthProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!canvasRef.current) return

        const canvas = canvasRef.current
        const context = canvas.getContext("2d")
        if (!context) return

        // Set up responsive dimensions
        const containerWidth = Math.min(width, window.innerWidth - 40)
        const containerHeight = Math.min(height, window.innerHeight - 100)
        const radius = Math.min(containerWidth, containerHeight) / 2.5

        const dpr = window.devicePixelRatio || 1
        canvas.width = containerWidth * dpr
        canvas.height = containerHeight * dpr
        canvas.style.width = `${containerWidth}px`
        canvas.style.height = `${containerHeight}px`
        context.scale(dpr, dpr)

        // Create projection and path generator for Canvas
        const projection = d3
            .geoOrthographic()
            .scale(radius)
            .translate([containerWidth / 2, containerHeight / 2])
            .clipAngle(90)

        const path = d3.geoPath().projection(projection).context(context)

        const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
            const [x, y] = point
            let inside = false

            for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
                const [xi, yi] = polygon[i]
                const [xj, yj] = polygon[j]

                if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
                    inside = !inside
                }
            }

            return inside
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const pointInFeature = (point: [number, number], feature: any): boolean => {
            const geometry = feature.geometry

            if (geometry.type === "Polygon") {
                const coordinates = geometry.coordinates
                if (!pointInPolygon(point, coordinates[0])) {
                    return false
                }
                for (let i = 1; i < coordinates.length; i++) {
                    if (pointInPolygon(point, coordinates[i])) {
                        return false
                    }
                }
                return true
            } else if (geometry.type === "MultiPolygon") {
                for (const polygon of geometry.coordinates) {
                    if (pointInPolygon(point, polygon[0])) {
                        let inHole = false
                        for (let i = 1; i < polygon.length; i++) {
                            if (pointInPolygon(point, polygon[i])) {
                                inHole = true
                                break
                            }
                        }
                        if (!inHole) {
                            return true
                        }
                    }
                }
                return false
            }
            return false
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const generateDotsInPolygon = (feature: any, dotSpacing = 16) => {
            const dots: [number, number][] = []
            const bounds = d3.geoBounds(feature)
            const [[minLng, minLat], [maxLng, maxLat]] = bounds

            const stepSize = dotSpacing * 0.08
            for (let lng = minLng; lng <= maxLng; lng += stepSize) {
                for (let lat = minLat; lat <= maxLat; lat += stepSize) {
                    const point: [number, number] = [lng, lat]
                    if (pointInFeature(point, feature)) {
                        dots.push(point)
                    }
                }
            }
            return dots
        }

        interface DotData {
            lng: number
            lat: number
        }

        const allDots: DotData[] = []
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let landFeatures: any = null

        const render = () => {
            if (!context) return
            context.clearRect(0, 0, containerWidth, containerHeight)

            const currentScale = projection.scale()
            const scaleFactor = currentScale / radius

            const isDark = document.documentElement.classList.contains('dark')
            const globeBg = isDark ? "#000814" : "#f8fafc"
            const dotColor = isDark ? "#6366f1" : "#4f46e5"

            // Draw ocean
            context.beginPath()
            context.arc(containerWidth / 2, containerHeight / 2, currentScale, 0, 2 * Math.PI)
            context.fillStyle = globeBg
            context.fill()
            context.strokeStyle = dotColor
            context.lineWidth = 0.5 * scaleFactor
            context.globalAlpha = 0.1
            context.stroke()
            context.globalAlpha = 1

            if (landFeatures) {
                const graticule = d3.geoGraticule()
                context.beginPath()
                path(graticule())
                context.strokeStyle = dotColor
                context.lineWidth = 0.3 * scaleFactor
                context.globalAlpha = 0.1
                context.stroke()
                context.globalAlpha = 1

                allDots.forEach((dot) => {
                    const projected = projection([dot.lng, dot.lat])
                    if (projected) {
                        const inverted = projection.invert!([containerWidth / 2, containerHeight / 2])
                        if (inverted) {
                            const distance = d3.geoDistance([dot.lng, dot.lat], inverted)
                            if (distance < Math.PI / 2) {
                                context.beginPath()
                                context.arc(projected[0], projected[1], 1 * scaleFactor, 0, 2 * Math.PI)
                                context.fillStyle = dotColor
                                context.globalAlpha = 0.5
                                context.fill()
                                context.globalAlpha = 1
                            }
                        }
                    }
                })
            }
        }

        const loadWorldData = async () => {
            try {
                setIsLoading(true)
                // Load from local bundled GeoJSON for reliability
                const response = await fetch("/assets/ne_110m_land.json")
                if (!response.ok) {
                    throw new Error(`Failed to load map: ${response.status}`)
                }

                landFeatures = await response.json()
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                landFeatures.features.forEach((feature: any) => {
                    const dots = generateDotsInPolygon(feature, 16)
                    dots.forEach(([lng, lat]) => {
                        allDots.push({ lng, lat })
                    })
                })

                render()
                setIsLoading(false)
            } catch (err) {
                console.warn('GeoJSON load failed, showing simplified globe:', err)
                // Render simplified globe without landmasses as fallback
                setError(null) // Clear any previous error - we have a fallback
                render()
                setIsLoading(false)
            }
        }

        const rotation = [0, 0] as [number, number]
        let autoRotate = true
        const rotationSpeed = 0.3

        const rotate = () => {
            if (autoRotate) {
                rotation[0] += rotationSpeed
                projection.rotate([rotation[0], rotation[1]])
                render()
            }
        }

        const rotationTimer = d3.timer(rotate)

        const handleMouseDown = (event: MouseEvent) => {
            autoRotate = false
            const startX = event.clientX
            const startY = event.clientY
            const startRotation = [...rotation]

            const handleMouseMove = (moveEvent: MouseEvent) => {
                const sensitivity = 0.2
                const dx = moveEvent.clientX - startX
                const dy = moveEvent.clientY - startY
                rotation[0] = startRotation[0] + dx * sensitivity
                rotation[1] = Math.max(-90, Math.min(90, (startRotation[1] || 0) - dy * sensitivity))
                projection.rotate([rotation[0], rotation[1]])
                render()
            }

            const handleMouseUp = () => {
                document.removeEventListener("mousemove", handleMouseMove)
                document.removeEventListener("mouseup", handleMouseUp)
                setTimeout(() => { autoRotate = true }, 100)
            }

            document.addEventListener("mousemove", handleMouseMove)
            document.addEventListener("mouseup", handleMouseUp)
        }

        const handleWheel = (event: WheelEvent) => {
            event.preventDefault()
            const scaleFactor = event.deltaY > 0 ? 0.9 : 1.1
            projection.scale(Math.max(radius * 0.5, Math.min(radius * 5, projection.scale() * scaleFactor)))
            render()
        }

        canvas.addEventListener("mousedown", handleMouseDown)
        canvas.addEventListener("wheel", handleWheel, { passive: false })
        loadWorldData()

        return () => {
            rotationTimer.stop()
            canvas.removeEventListener("mousedown", handleMouseDown)
            canvas.removeEventListener("wheel", handleWheel)
        }
    }, [width, height])

    if (error) {
        return (
            <div className={`p-8 bg-red-900/10 border border-red-500/20 rounded-2xl text-red-500 text-center ${className}`}>
                {error}
            </div>
        )
    }

    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            <canvas ref={canvasRef} className="cursor-grab active:cursor-grabbing" />
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                </div>
            )}
            <div className="absolute bottom-4 text-[8px] font-black uppercase tracking-widest text-indigo-500/50 pointer-events-none">
                Intelligence Map
            </div>
        </div>
    )
}
