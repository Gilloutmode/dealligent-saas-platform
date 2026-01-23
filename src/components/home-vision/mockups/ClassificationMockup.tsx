// =============================================================================
// CLASSIFICATION MOCKUP - Auto-Classification Animation
// Documents fly into folders with arc motion
// Uses Framer Motion only - loops automatically
// =============================================================================

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, FolderOpen } from 'lucide-react'

const folders = [
  { name: 'Clients', color: 'text-blue-400', bg: 'bg-blue-500/20' },
  { name: 'Support', color: 'text-green-400', bg: 'bg-green-500/20' },
  { name: 'Products', color: 'text-purple-400', bg: 'bg-purple-500/20' },
]

const documents = [
  { name: 'contract.pdf', targetFolder: 0 },
  { name: 'ticket_123.txt', targetFolder: 1 },
  { name: 'feature_req.md', targetFolder: 2 },
]

export function ClassificationMockup() {
  const [activeDocIndex, setActiveDocIndex] = useState(-1)
  const [classifiedDocs, setClassifiedDocs] = useState<number[]>([])
  const [pulsingFolder, setPulsingFolder] = useState<number | null>(null)

  // Animation cycle
  useEffect(() => {
    const runCycle = () => {
      setActiveDocIndex(-1)
      setClassifiedDocs([])
      setPulsingFolder(null)

      let docIndex = 0
      const classifyNext = () => {
        if (docIndex >= documents.length) {
          // Reset after pause
          setTimeout(runCycle, 2000)
          return
        }

        const doc = documents[docIndex]
        setActiveDocIndex(docIndex)

        // After flying animation, mark as classified
        setTimeout(() => {
          setPulsingFolder(doc.targetFolder)
          setClassifiedDocs(prev => [...prev, docIndex])
          setActiveDocIndex(-1)
          
          setTimeout(() => {
            setPulsingFolder(null)
            docIndex++
            classifyNext()
          }, 500)
        }, 800)
      }

      setTimeout(classifyNext, 500)
    }

    runCycle()
  }, [])

  return (
    <div className="h-[100px] relative">
      {/* Folders row */}
      <div className="flex justify-around mb-6">
        {folders.map((folder, i) => (
          <motion.div
            key={folder.name}
            animate={pulsingFolder === i ? { scale: [1, 1.15, 1] } : {}}
            transition={{ duration: 0.3 }}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg ${folder.bg}`}
          >
            <FolderOpen className={`w-4 h-4 ${folder.color}`} />
            <span className="text-[9px] text-[var(--text-muted)]">{folder.name}</span>
            {classifiedDocs.filter(d => documents[d].targetFolder === i).length > 0 && (
              <span className="text-[8px] text-emerald-400">
                +{classifiedDocs.filter(d => documents[d].targetFolder === i).length}
              </span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Flying document */}
      <AnimatePresence>
        {activeDocIndex >= 0 && (
          <motion.div
            key={activeDocIndex}
            initial={{ x: '50%', y: 60, opacity: 1 }}
            animate={{
              x: `${(documents[activeDocIndex].targetFolder * 33) + 16}%`,
              y: [60, 30, 0],
              opacity: [1, 1, 0]
            }}
            transition={{ duration: 0.8, times: [0, 0.4, 1], ease: 'easeInOut' }}
            className="absolute left-0 flex items-center gap-1 px-2 py-1 rounded bg-white/10"
          >
            <FileText className="w-3 h-3 text-gray-400" />
            <span className="text-[9px] text-[var(--text-muted)]">
              {documents[activeDocIndex].name}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ClassificationMockup
