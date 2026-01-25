// TOPIC SELECTOR MOCKUP - Level 3
// Visual representation of domain selection

// Note: motion import removed - not currently used in static mockups
import { Check, Plus } from 'lucide-react'

export function TopicSelectorMockup() {
    return (
        <div className="w-full max-w-4xl mx-auto card-glass p-1 p-8 rounded-3xl border border-[var(--border-default)] overflow-hidden relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

            <div className="text-center mb-12">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400 mb-2">SETUP YOUR ENGINE</p>
                <h4 className="text-2xl font-bold text-white">CHOOSE YOUR LEARNING DOMAINS</h4>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Organization Topics */}
                <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                            <span className="text-xl">🏢</span>
                        </div>
                        <div>
                            <p className="font-bold text-white italic tracking-tight">ORGANIZATION TOPICS</p>
                            <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest leading-none">Company-wide learning</p>
                        </div>
                    </div>

                    <div className="space-y-3 pl-2">
                        {[
                            { label: 'Industry trends', checked: true },
                            { label: 'Competitor strategies', checked: true },
                            { label: 'Market regulations', checked: true },
                            { label: 'New technologies', checked: false },
                        ].map((topic, i) => (
                            <div key={i} className="flex items-center gap-3 group cursor-pointer">
                                <div className={`w-5 h-5 rounded border ${topic.checked ? 'bg-emerald-500 border-emerald-500' : 'border-[var(--border-default)]'} flex items-center justify-center transition-all`}>
                                    {topic.checked && <Check className="w-3 h-3 text-black" />}
                                </div>
                                <span className={`text-sm ${topic.checked ? 'text-white' : 'text-[var(--text-muted)]'}`}>{topic.label}</span>
                            </div>
                        ))}
                        <button className="flex items-center gap-2 text-xs text-emerald-400/60 pt-2 hover:text-emerald-400">
                            <Plus className="w-4 h-4" /> Add topic
                        </button>
                    </div>
                </div>

                {/* Vertical Divider */}
                <div className="hidden md:block w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

                {/* Personal Topics */}
                <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                            <span className="text-xl">👤</span>
                        </div>
                        <div>
                            <p className="font-bold text-white italic tracking-tight">PERSONAL TOPICS</p>
                            <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest leading-none">Your individual growth</p>
                        </div>
                    </div>

                    <div className="space-y-3 pl-2">
                        {[
                            { label: 'AI/ML fundamentals', checked: true },
                            { label: 'Product management', checked: true },
                            { label: 'Leadership skills', checked: false },
                            { label: 'Data analysis', checked: true },
                        ].map((topic, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className={`w-5 h-5 rounded border ${topic.checked ? 'bg-blue-500 border-blue-500' : 'border-[var(--border-default)]'} flex items-center justify-center`}>
                                    {topic.checked && <Check className="w-3 h-3 text-black" />}
                                </div>
                                <span className={`text-sm ${topic.checked ? 'text-white' : 'text-[var(--text-muted)]'}`}>{topic.label}</span>
                            </div>
                        ))}
                        <button className="flex items-center gap-2 text-xs text-blue-400/60 pt-2 hover:text-blue-400">
                            <Plus className="w-4 h-4" /> Add topic
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
