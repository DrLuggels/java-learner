import { Link } from 'react-router-dom'
import ProgressBar from './ProgressBar'

export default function QuizResult({ correct, total, moduleId, onRetry }) {
  const percent = total > 0 ? Math.round((correct / total) * 100) : 0

  const grade = percent >= 90 ? 'Ausgezeichnet!' :
    percent >= 75 ? 'Gut gemacht!' :
    percent >= 50 ? 'Befriedigend' :
    'Noch üben!'

  const gradeColor = percent >= 90 ? 'text-green-400' :
    percent >= 75 ? 'text-blue-400' :
    percent >= 50 ? 'text-yellow-400' :
    'text-red-400'

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 text-center">
      <h3 className={`text-2xl font-bold mb-2 ${gradeColor}`}>{grade}</h3>
      <p className="text-4xl font-bold text-white mb-4">{percent}%</p>
      <p className="text-slate-400 mb-4">
        {correct} von {total} Fragen richtig
      </p>
      <ProgressBar value={percent} size="lg" showLabel={false} />
      <div className="flex gap-3 justify-center mt-6">
        <button
          onClick={onRetry}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors border-none cursor-pointer font-medium"
        >
          Nochmal versuchen
        </button>
        <Link
          to="/"
          className="px-5 py-2.5 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors no-underline font-medium"
        >
          Zum Dashboard
        </Link>
        {moduleId && (
          <Link
            to="/schwaechen"
            className="px-5 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors no-underline font-medium"
          >
            Schwächen üben
          </Link>
        )}
      </div>
    </div>
  )
}
