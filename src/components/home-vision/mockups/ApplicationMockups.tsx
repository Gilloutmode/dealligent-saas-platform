// APPLICATION CARD MOCKUPS - Level 1 Visuals
// Exact design reproduction for each feature card

// Note: motion import removed - not currently used in static mockups

/**
 * 📄 Multi-Format Upload Mockup
 */
export function UploadMockup() {
    return (
        <div className="w-full aspect-[16/10] rounded-xl bg-[var(--overlay-bg)] border border-[var(--border-light)] flex flex-col p-6 items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[60px]" />
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-6">
                <span className="text-xl">📄</span>
            </div>
            <div className="w-full max-w-[240px] p-4 rounded-xl border border-dashed border-[var(--border-default)] bg-[var(--glass-bg)] text-center">
                <p className="text-sm font-bold text-white mb-2">📎 Drop files here</p>
                <p className="text-[10px] text-[var(--text-muted)] mb-4">or click to browse</p>
                <div className="flex justify-center gap-2">
                    {['PDF', 'DOC', 'XLS', 'PPT'].map(ext => (
                        <span key={ext} className="px-2 py-1 rounded bg-[var(--overlay-bg)] border border-[var(--border-light)] text-[8px] text-[var(--text-secondary)] font-black">{ext}</span>
                    ))}
                </div>
            </div>
        </div>
    )
}

/**
 * 🗂️ Auto-Classification Mockup
 */
export function ClassificationMockup() {
    return (
        <div className="w-full aspect-[16/10] rounded-xl bg-[var(--overlay-bg)] border border-[var(--border-light)] p-6 flex flex-col justify-center relative overflow-hidden">
            <div className="flex flex-col items-center gap-2 mb-6">
                <div className="px-3 py-1 rounded bg-[var(--glass-bg-elevated)] border border-[var(--border-default)] text-[10px] text-[var(--text-secondary)]">[Document]</div>
                <div className="w-[1px] h-6 bg-gradient-to-b from-blue-500 to-transparent" />
                <div className="text-[8px] font-black text-blue-400 uppercase tracking-widest">AI Analysis</div>
            </div>

            <div className="grid grid-cols-3 gap-3">
                {['Client', 'Support', 'Product'].map((type, i) => (
                    <div key={i} className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-center">
                        <p className="text-[10px] font-bold text-white mb-1">{type}</p>
                        <p className="text-[8px] text-blue-400">Case</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

/**
 * 💬 RAG-Powered Q&A Mockup
 */
export function RagChatMockup() {
    return (
        <div className="w-full aspect-[16/10] rounded-xl bg-[var(--overlay-bg)] border border-[var(--border-light)] p-6 overflow-hidden flex flex-col justify-center relative">
            <div className="absolute inset-0 bg-blue-500/5 backdrop-blur-sm" />
            <div className="space-y-4 relative z-10">
                <div className="flex justify-end">
                    <div className="p-3 rounded-xl bg-blue-500/20 border border-blue-500/30">
                        <p className="text-[10px] text-white font-medium">"What pricing for Acme?"</p>
                    </div>
                </div>
                <div className="flex justify-start">
                    <div className="p-4 rounded-xl bg-[var(--glass-bg)] border border-[var(--border-default)] w-[90%] shadow-xl">
                        <p className="text-[9px] text-[var(--text-muted)] mb-2 italic">Based on email from Dec 10:</p>
                        <ul className="text-[10px] space-y-1 mb-3 text-[var(--text-primary)]">
                            <li>• Base: $50K/year</li>
                            <li>• Enterprise: $120K/year</li>
                        </ul>
                        <div className="flex justify-between items-center text-[8px] border-t border-[var(--border-default)] pt-2">
                            <span className="text-blue-400 font-bold">📎 acme_proposal.pdf</span>
                            <span className="text-emerald-400">96% confidence</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

/**
 * 👤 Profile-Based Context Mockup
 */
export function ProfileContextMockup() {
    return (
        <div className="w-full aspect-[16/10] rounded-xl bg-[var(--overlay-bg)] border border-[var(--border-light)] p-6 overflow-hidden flex flex-col justify-center">
            <div className="space-y-2">
                {[
                    { icon: '💼', role: 'SALES', sub: 'Pricing, objections' },
                    { icon: '🎧', role: 'SUPPORT', sub: 'Issue history, solutions' },
                    { icon: '📦', role: 'PRODUCT', sub: 'Feature requests' },
                ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-[var(--glass-bg)] border border-[var(--border-light)] hover:border-blue-500/20 transition-all group">
                        <span className="text-sm group-hover:scale-110 transition-transform">{item.icon}</span>
                        <div className="flex-1">
                            <p className="text-[10px] font-bold text-white">{item.role}</p>
                            <p className="text-[9px] text-[var(--text-muted)] italic">→ {item.sub}</p>
                        </div>
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
                    </div>
                ))}
            </div>
        </div>
    )
}

/**
 * 🔍 Source Traceability Mockup
 */
export function TraceabilityMockup() {
    return (
        <div className="w-full aspect-[16/10] rounded-xl bg-[var(--overlay-bg)] border border-[var(--border-light)] p-6 overflow-hidden flex flex-col justify-center relative">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-blue-500/5 to-transparent pointer-events-none" />
            <div className="space-y-3 relative z-10">
                <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-light)]">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <p className="text-[10px] text-white font-bold">acme_contract_v2.pdf</p>
                </div>
                <div className="p-3 rounded-lg bg-[var(--glass-bg)] border border-[var(--border-default)] shadow-xl">
                    <p className="text-[9px] text-[var(--text-secondary)] leading-relaxed italic">
                        "...the service level agreement (SLA) for <mark className="bg-blue-500/40 text-white px-1 rounded-sm">99.9% uptime</mark> is applicable from..."
                    </p>
                </div>
                <div className="flex justify-between text-[8px] text-[var(--text-muted)] uppercase tracking-widest">
                    <span>Page 14 • Dec 15</span>
                    <span className="text-emerald-500/60 font-black">94% Confidence</span>
                </div>
            </div>
        </div>
    )
}

/**
 * 📊 Automated Reports Mockup
 */
export function ReportsMockup() {
    return (
        <div className="w-full aspect-[16/10] rounded-xl bg-[var(--overlay-bg)] border border-[var(--border-light)] p-6 overflow-hidden flex flex-col justify-center relative">
            <div className="flex gap-4 items-end h-24">
                <div className="w-1/2 space-y-3 pb-2">
                    <div className="h-2 w-full bg-[var(--glass-bg-elevated)] rounded-full" />
                    <div className="h-2 w-3/4 bg-[var(--glass-bg-elevated)] rounded-full" />
                    <div className="h-2 w-[85%] bg-[var(--glass-bg-elevated)] rounded-full" />
                </div>
                <div className="flex-1 flex items-end gap-1 h-full">
                    {[40, 70, 45, 90, 60, 50, 80].map((h, i) => (
                        <div key={i} className="flex-1 bg-blue-500/30 border-t border-blue-500/50 rounded-t-sm transition-all hover:bg-blue-500/50" style={{ height: `${h}%` }} />
                    ))}
                </div>
            </div>
            <div className="mt-8 flex justify-between items-center border-t border-[var(--border-light)] pt-4">
                <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[8px] font-black text-emerald-400 tracking-widest">
                    REPORT GENERATED
                </div>
                <div className="flex gap-1">
                    <span className="w-6 h-6 rounded bg-[var(--glass-bg)] flex items-center justify-center text-[8px] text-[var(--text-muted)]">PDF</span>
                    <span className="w-6 h-6 rounded bg-[var(--glass-bg)] flex items-center justify-center text-[8px] text-[var(--text-muted)]">PPT</span>
                </div>
            </div>
        </div>
    )
}
