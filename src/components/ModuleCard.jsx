import { Link } from 'react-router-dom'
import ProgressBar from './ProgressBar'

const relevanceColors = {
  KRITISCH: 'border-red-500 bg-red-500/10',
  HOCH: 'border-orange-500 bg-orange-500/10',
  MITTEL: 'border-yellow-500 bg-yellow-500/10',
}

const relevanceBadge = {
  KRITISCH: 'bg-red-500/20 text-red-400',
  HOCH: 'bg-orange-500/20 text-orange-400',
  MITTEL: 'bg-yellow-500/20 text-yellow-400',
}

export default function ModuleCard({ module, progress }) {
  return (
    <Link
      to={`/modul/${module.id}`}
      className={`block border-l-4 rounded-lg p-4 bg-slate-800 hover:bg-slate-750 transition-colors no-underline ${
        relevanceColors[module.relevance] || 'border-slate-600'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-white font-semibold text-base leading-tight">
          {module.id}. {module.title}
        </h3>
        <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ml-2 ${
          relevanceBadge[module.relevance] || ''
        }`}>
          {module.relevance}
        </span>
      </div>
      <p className="text-slate-400 text-sm mb-3">{module.description}</p>
      <ProgressBar value={progress} size="sm" />
    </Link>
  )
}
