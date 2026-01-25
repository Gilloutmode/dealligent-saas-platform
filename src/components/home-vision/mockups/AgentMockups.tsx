// AGENT CARD MOCKUPS - Level 2 Visuals
// Thematic SVG wireframes for each agent

// Note: motion import removed - not currently used in static mockups

/**
 * 🌐 MIA (Market) Mockup
 */
export function MiaMockup() {
    return (
        <div className="w-full h-32 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center overflow-hidden relative">
            <div className="absolute inset-0 opacity-20">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.5" />
                    <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.5" />
                </svg>
            </div>
            <span className="text-3xl relative z-10">🌐</span>
        </div>
    )
}

/**
 * 📦 PIA (Product) Mockup
 */
export function PiaMockup() {
    return (
        <div className="w-full h-32 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center overflow-hidden relative">
            <div className="absolute inset-4 opacity-20 grid grid-cols-2 gap-2">
                <div className="bg-emerald-500/40 rounded-sm" />
                <div className="bg-emerald-500/40 rounded-sm" />
                <div className="bg-emerald-500/40 rounded-sm" />
                <div className="bg-emerald-500/40 rounded-sm" />
            </div>
            <span className="text-3xl relative z-10">📦</span>
        </div>
    )
}

/**
 * 💼 SIA (Sales) Mockup
 */
export function SiaMockup() {
    return (
        <div className="w-full h-32 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center overflow-hidden relative">
            <div className="absolute bottom-4 left-4 right-4 flex items-end gap-1 h-12 opacity-20">
                {[40, 60, 30, 80, 50].map((h, i) => (
                    <div key={i} className="flex-1 bg-orange-500 rounded-t-sm" style={{ height: `${h}%` }} />
                ))}
            </div>
            <span className="text-3xl relative z-10">💼</span>
        </div>
    )
}

/**
 * 📢 MAIA (Marketing) Mockup
 */
export function MaiaMockup() {
    return (
        <div className="w-full h-32 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center overflow-hidden relative">
            <div className="absolute inset-0 opacity-20 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full border-4 border-dashed border-pink-500 animate-spin-slow" />
            </div>
            <span className="text-3xl relative z-10">📢</span>
        </div>
    )
}

/**
 * ⚙️ TIA (Technology) Mockup
 */
export function TiaMockup() {
    return (
        <div className="w-full h-32 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center overflow-hidden relative">
            <div className="absolute inset-0 opacity-20 grid grid-cols-3 gap-px bg-cyan-500/20 p-2">
                {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="border border-cyan-500/40 rounded-sm" />
                ))}
            </div>
            <span className="text-3xl relative z-10">⚙️</span>
        </div>
    )
}

/**
 * 👥 TALIA (Talent) Mockup
 */
export function TaliaMockup() {
    return (
        <div className="w-full h-32 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center overflow-hidden relative">
            <div className="absolute inset-0 opacity-20 flex items-center justify-center gap-2">
                <div className="w-4 h-4 rounded-full bg-purple-500" />
                <div className="w-4 h-4 rounded-full bg-purple-500" />
                <div className="w-4 h-4 rounded-full bg-purple-500" />
            </div>
            <span className="text-3xl relative z-10">👥</span>
        </div>
    )
}
