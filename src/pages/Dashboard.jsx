import { Link } from 'react-router-dom'
import { modules } from '../data/modules'
import ModuleCard from '../components/ModuleCard'
import ProgressBar from '../components/ProgressBar'
import useProgress from '../hooks/useProgress'
import useWeakness from '../hooks/useWeakness'

export default function Dashboard() {
  const { getModuleProgress, getOverallProgress, resetProgress } = useProgress()
  const { getWeakCount } = useWeakness()
  const overall = getOverallProgress()
  const weakCount = getWeakCount()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Java Mastery</h1>
        <p className="text-slate-400 mb-4">Deine Klausurvorbereitung für Programmierung I</p>
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Gesamtfortschritt</span>
            <span className="text-sm text-slate-400">{overall}%</span>
          </div>
          <ProgressBar value={overall} size="lg" showLabel={false} />
        </div>
      </div>

      <div className="flex gap-3 mb-6 flex-wrap">
        <Link
          to="/klausur"
          className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors no-underline font-medium"
        >
          Klausur-Simulation starten
        </Link>
        <Link
          to="/schwaechen"
          className="px-5 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors no-underline font-medium"
        >
          Schwächen üben {weakCount > 0 && `(${weakCount})`}
        </Link>
        <button
          onClick={() => { if (confirm('Fortschritt wirklich zurücksetzen?')) resetProgress() }}
          className="px-5 py-2.5 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors border-none cursor-pointer text-sm"
        >
          Fortschritt zurücksetzen
        </button>
      </div>

      <h2 className="text-xl font-semibold text-white mb-4">Lernmodule</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map(mod => (
          <ModuleCard key={mod.id} module={mod} progress={getModuleProgress(mod.id)} />
        ))}
      </div>
    </div>
  )
}
