// NOTEBOOK MOCKUP - Level 1 Interface Visualization
// Style: Dark theme, glassmorphism, 3 columns

import { motion } from 'framer-motion'

export function NotebookMockup() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="w-full max-w-5xl mx-auto rounded-3xl overflow-hidden border border-[var(--border-default)] bg-[#0F172A] shadow-2xl"
        >
            <div className="flex flex-col h-[600px]">
                {/* Header */}
                <div className="h-12 border-b border-[var(--border-light)] bg-[var(--glass-bg)] flex items-center px-6 justify-between">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)]">
                        DEALLIGENT INTELLIGENCE HUB
                    </p>
                    <div className="w-12" />
                </div>

                {/* 3 Columns */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Left: Knowledge Library (25%) */}
                    <div className="w-1/4 border-r border-[var(--border-light)] p-6 bg-white/[0.02]">
                        <p className="text-[10px] font-black uppercase tracking-wider text-blue-400 mb-6 flex items-center gap-2">
                            <span className="w-4 h-4 rounded bg-blue-500/20 flex items-center justify-center text-[10px]">📁</span>
                            INSIDE SOURCES
                        </p>
                        <div className="space-y-4 text-xs">
                            <div>
                                <p className="text-[var(--text-secondary)] mb-2 flex items-center gap-2">📂 Client Cases</p>
                                <div className="pl-4 space-y-2 border-l border-[var(--border-default)]">
                                    <p className="text-[var(--text-muted)] hover:text-white transition-colors cursor-pointer">├─ Acme</p>
                                    <p className="text-[var(--text-muted)] hover:text-white transition-colors cursor-pointer">├─ Beta</p>
                                    <p className="text-[var(--text-muted)] hover:text-white transition-colors cursor-pointer">└─ Gamma</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-[var(--text-secondary)] mb-2 flex items-center gap-2">📂 Support Cases</p>
                                <div className="pl-4 space-y-2 border-l border-[var(--border-default)]">
                                    <p className="text-[var(--text-muted)]">├─ Bug #1</p>
                                    <p className="text-[var(--text-muted)]">└─ Bug #2</p>
                                </div>
                            </div>
                            <p className="text-[var(--text-secondary)]">📂 Product Cases</p>
                            <p className="text-[var(--text-secondary)]">📂 Meetings</p>

                            <button className="w-full py-2 mt-4 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase transition-all hover:bg-blue-500/20">
                                + Upload
                            </button>
                        </div>
                    </div>

                    {/* Center: Conversation (50%) */}
                    <div className="flex-1 p-8 bg-[var(--overlay-bg-light)] relative flex flex-col">
                        <p className="text-[10px] font-black uppercase tracking-wider text-[var(--text-muted)] mb-8 flex items-center gap-2 justify-center">
                            <span className="w-4 h-4 rounded bg-[var(--glass-bg-elevated)] flex items-center justify-center text-[10px]">💬</span>
                            CONVERSATION PANEL
                        </p>

                        <div className="flex-1 space-y-6 overflow-y-auto pr-4 scrollbar-hide">
                            {/* User Question */}
                            <div className="flex justify-end">
                                <div className="card-glass p-4 rounded-2xl rounded-tr-none max-w-[80%] border-blue-500/20">
                                    <p className="text-sm text-white">User: "What did we promise to Acme?"</p>
                                </div>
                            </div>

                            {/* AI Answer */}
                            <div className="flex justify-start">
                                <div className="card-glass p-6 rounded-2xl rounded-tl-none max-w-[90%] border-[var(--border-default)]">
                                    <p className="text-xs font-black text-blue-400 uppercase mb-3">🤖 AI RESPONSE</p>
                                    <p className="text-sm text-[var(--text-primary)] leading-relaxed mb-4">
                                        Based on the meeting transcript from Dec 15, you promised:
                                    </p>
                                    <ul className="space-y-2 mb-6 text-sm text-[var(--text-primary)]">
                                        <li className="flex items-start gap-2"><span className="text-blue-400">•</span> API v2 by Q2</li>
                                        <li className="flex items-start gap-2"><span className="text-blue-400">•</span> 99.9% SLA</li>
                                        <li className="flex items-start gap-2"><span className="text-blue-400">•</span> Priority support</li>
                                    </ul>

                                    <div className="pt-4 border-t border-[var(--border-default)]">
                                        <p className="text-[10px] font-bold text-[var(--text-muted)] mb-2 uppercase italic">📎 Sources:</p>
                                        <p className="text-[10px] text-blue-400">• meeting_acme.pdf <span className="text-[var(--text-muted)]">(confidence: 94%)</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Input Bar */}
                        <div className="mt-8 relative">
                            <div className="w-full h-12 rounded-xl bg-[var(--glass-bg)] border border-[var(--border-default)] px-4 flex items-center justify-between">
                                <p className="text-sm text-[var(--text-muted)] italic">Type your question...</p>
                                <div className="flex gap-2">
                                    <span className="text-[10px] text-[var(--text-muted)]">/command</span>
                                    <span className="text-[10px] text-blue-400">@agent</span>
                                    <div className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center">
                                        <span className="text-white text-xs">↑</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Intelligence (25%) */}
                    <div className="w-1/4 border-l border-[var(--border-light)] p-6 bg-white/[0.02]">
                        <p className="text-[10px] font-black uppercase tracking-wider text-purple-400 mb-6 flex items-center gap-2">
                            <span className="w-4 h-4 rounded bg-purple-500/20 flex items-center justify-center text-[10px]">🤖</span>
                            OUTSIDE SOURCES
                        </p>

                        <div className="space-y-4">
                            <p className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">ACTIVE AGENTS</p>
                            <div className="space-y-2">
                                {[
                                    { icon: '🌐', name: 'Mia', role: 'Market' },
                                    { icon: '📦', name: 'Pia', role: 'Product' },
                                    { icon: '💼', name: 'Sia', role: 'Sales' },
                                    { icon: '⚙️', name: 'Tia', role: 'Tech' },
                                ].map(agent => (
                                    <div key={agent.name} className="flex items-center justify-between p-2 rounded-lg bg-[var(--glass-bg)] border border-[var(--border-light)] group hover:border-blue-500/30 transition-all">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs">{agent.icon}</span>
                                            <div className="text-[10px]">
                                                <p className="text-[var(--text-primary)] font-bold">@{agent.name}</p>
                                                <p className="text-[var(--text-muted)]">({agent.role})</p>
                                            </div>
                                        </div>
                                        <button className="text-[8px] font-bold text-blue-400 uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                                            [Invoke]
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-6">
                                <p className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-4">QUICK ACTIONS</p>
                                <div className="space-y-2">
                                    <button className="w-full py-2 rounded-lg border border-[var(--border-default)] text-[9px] font-bold text-[var(--text-secondary)] hover:bg-[var(--glass-bg)] transition-all text-left px-3">
                                        [+ Enrich Response]
                                    </button>
                                    <button className="w-full py-2 rounded-lg border border-[var(--border-default)] text-[9px] font-bold text-[var(--text-secondary)] hover:bg-[var(--glass-bg)] transition-all text-left px-3">
                                        [📊 Generate Report]
                                    </button>
                                    <button className="w-full py-2 rounded-lg border border-[var(--border-default)] text-[9px] font-bold text-[var(--text-secondary)] hover:bg-[var(--glass-bg)] transition-all text-left px-3">
                                        [🔍 Deep Search]
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
