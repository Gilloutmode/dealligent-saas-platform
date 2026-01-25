// CONTENT SOURCES MOCKUP - Level 3
// Visual grid of data inputs

export function ContentSourcesMockup() {
    const sources = [
        { icon: '📺', label: 'YouTube', sub: 'Video transcript analysis' },
        { icon: '🗣️', label: 'Reddit', sub: 'Community pattern detection' },
        { icon: '💼', label: 'LinkedIn', sub: 'Thought leadership scraping' },
        { icon: '📰', label: 'News', sub: 'Tech publications monitoring' },
        { icon: '🎙️', label: 'Podcasts', sub: 'Industry episode deep-dives' },
        { icon: '📚', label: 'Articles', sub: 'Strategic insights extraction' },
    ]

    return (
        <div className="w-full max-w-5xl mx-auto py-12">
            <div className="text-center mb-16">
                <p className="text-xs font-black uppercase tracking-[0.5em] text-[var(--text-muted)] mb-4">DATA ECOSYSTEM</p>
                <h4 className="text-3xl font-bold text-white">WE DIGEST CONTENT FROM</h4>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
                {sources.map((s, i) => (
                    <div key={i} className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-3xl bg-[var(--glass-bg)] border border-[var(--border-default)] flex items-center justify-center text-2xl mb-4 hover:scale-110 hover:border-emerald-500/30 transition-all cursor-default">
                            {s.icon}
                        </div>
                        <p className="text-sm font-bold text-white mb-1">{s.label}</p>
                        <p className="text-[10px] text-[var(--text-muted)] text-center uppercase tracking-tighter">{s.sub}</p>
                    </div>
                ))}
            </div>

            {/* Connection visualization */}
            <div className="mt-16 h-24 relative overflow-hidden flex flex-col items-center justify-center">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="w-[1px] h-full bg-gradient-to-b from-white/10 to-transparent" />
                <div className="mt-4 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-400 tracking-widest">
                    DIGEST ENGINE ACTIVE
                </div>
            </div>
        </div>
    )
}
