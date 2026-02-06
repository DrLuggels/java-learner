import { Link } from 'react-router-dom';
import { RefreshCw, CheckCircle2, ChevronRight } from 'lucide-react';
import { useSpacedRepetition, type ReviewItem } from '../../hooks/useSpacedRepetition';

const URGENCY_CONFIG = {
  overdue: {
    label: 'Überfällig',
    textColor: 'text-accent-red',
    bgColor: 'bg-accent-red/15',
    borderColor: 'border-accent-red/30',
    dotColor: 'bg-accent-red',
  },
  due: {
    label: 'Fällig',
    textColor: 'text-accent-orange',
    bgColor: 'bg-accent-orange/15',
    borderColor: 'border-accent-orange/30',
    dotColor: 'bg-accent-orange',
  },
  fresh: {
    label: 'Aktuell',
    textColor: 'text-accent-green',
    bgColor: 'bg-accent-green/15',
    borderColor: 'border-accent-green/30',
    dotColor: 'bg-accent-green',
  },
  new: {
    label: 'Neu',
    textColor: 'text-dark-400',
    bgColor: 'bg-dark-700',
    borderColor: 'border-dark-600',
    dotColor: 'bg-dark-400',
  },
};

function UrgencyBadge({ urgency }: { urgency: ReviewItem['urgency'] }) {
  const config = URGENCY_CONFIG[urgency];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${config.textColor} ${config.bgColor} border ${config.borderColor}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`} />
      {config.label}
    </span>
  );
}

function formatDaysSince(days: number): string {
  if (days < 0) return 'Noch nie';
  if (days === 0) return 'Heute';
  if (days === 1) return 'Gestern';
  return `Vor ${days} Tagen`;
}

export default function ReviewSection() {
  const { getReviewTopics, getDailyReviewCount } = useSpacedRepetition();

  const reviewTopics = getReviewTopics(5);
  const dailyCount = getDailyReviewCount();

  if (reviewTopics.length === 0) {
    return (
      <div className="bg-dark-800 border border-dark-600 rounded-xl p-5">
        <h3 className="font-semibold text-dark-100 mb-3 flex items-center gap-2">
          <RefreshCw className="w-5 h-5 text-accent-green" />
          Wiederholung empfohlen
        </h3>
        <div className="flex items-center gap-3 p-4 bg-dark-700 rounded-lg">
          <CheckCircle2 className="w-6 h-6 text-accent-green shrink-0" />
          <div>
            <p className="text-dark-100 font-medium">Alles aktuell! Keine Wiederholung nötig.</p>
            <p className="text-dark-400 text-sm mt-0.5">Alle Themen sind auf dem neuesten Stand.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark-800 border border-dark-600 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-dark-100 flex items-center gap-2">
          <RefreshCw className="w-5 h-5 text-accent-orange" />
          Wiederholung empfohlen
        </h3>
        {dailyCount > 0 && (
          <span className="text-xs text-dark-400">
            {dailyCount} {dailyCount === 1 ? 'Thema' : 'Themen'} heute fällig
          </span>
        )}
      </div>

      <div className="space-y-2">
        {reviewTopics.map(item => (
          <Link
            key={item.topicId}
            to={`/learn/${item.moduleId}/${item.topicId}`}
            className="flex items-center gap-3 p-3 rounded-lg bg-dark-700 hover:bg-dark-700/80 border border-dark-600 hover:border-dark-500 transition-all group"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-dark-200 truncate">
                  {item.topicTitle}
                </span>
                <UrgencyBadge urgency={item.urgency} />
              </div>
              <div className="flex items-center gap-3 text-xs text-dark-400">
                <span>{formatDaysSince(item.daysSinceReview)}</span>
                {item.lastScore > 0 && (
                  <>
                    <span className="text-dark-600">|</span>
                    <span>Letztes Ergebnis: {item.lastScore}%</span>
                  </>
                )}
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-dark-500 group-hover:text-dark-300 shrink-0 group-hover:translate-x-0.5 transition-all" />
          </Link>
        ))}
      </div>
    </div>
  );
}
