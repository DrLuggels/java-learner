import { Link } from 'react-router-dom';
import {
  BookOpen, Code2, Trophy, Flame, Target, TrendingUp,
  ArrowRight, Play, Zap, Brain, Coffee, ChevronRight,
  CheckCircle2, Clock
} from 'lucide-react';
import { useProgress } from '../hooks/useProgress';
import SkillRadar from '../components/dashboard/SkillRadar';
import ReviewSection from '../components/dashboard/ReviewSection';
import { moduleConfig } from '../components/layout/Sidebar';

export default function HomePage() {
  const { progress, getOverallProgress } = useProgress();

  const totalTopics = moduleConfig.reduce((acc, m) => acc + m.topics.length, 0);
  const overallProgress = getOverallProgress(totalTopics);

  const moduleScores = moduleConfig.map(m => {
    const completed = m.topics.filter(t => progress.completedTopics.includes(t.id)).length;
    return {
      label: m.title,
      value: m.topics.length > 0 ? Math.round((completed / m.topics.length) * 100) : 0,
      color: m.color.replace('text-', 'var(--color-').replace(/\)$/, '') + ')',
    };
  });

  const nextTopic = (() => {
    for (const mod of moduleConfig) {
      for (const topic of mod.topics) {
        if (!progress.completedTopics.includes(topic.id)) {
          return { ...topic, moduleId: mod.id, moduleTitle: mod.title };
        }
      }
    }
    return null;
  })();

  return (
    <div className="max-w-6xl mx-auto p-6 animate-fade-in">
      {/* Hero Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Coffee className="w-8 h-8 text-accent-orange" />
          <h1 className="text-3xl font-bold text-dark-100">
            Willkommen bei JavaPath
          </h1>
        </div>
        <p className="text-dark-400 text-lg">
          Deine interaktive Lernplattform für Java 21 — von Null zum eigenen Programm.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-dark-800 border border-dark-600 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-accent-blue" />
            <span className="text-xs text-dark-400">Fortschritt</span>
          </div>
          <div className="text-2xl font-bold text-dark-100">{overallProgress}%</div>
          <div className="mt-2 h-1.5 bg-dark-700 rounded-full overflow-hidden">
            <div className="h-full bg-accent-blue rounded-full transition-all" style={{ width: `${overallProgress}%` }} />
          </div>
        </div>
        <div className="bg-dark-800 border border-dark-600 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-4 h-4 text-accent-green" />
            <span className="text-xs text-dark-400">Themen</span>
          </div>
          <div className="text-2xl font-bold text-dark-100">{progress.completedTopics.length}<span className="text-base text-dark-500">/{totalTopics}</span></div>
        </div>
        <div className="bg-dark-800 border border-dark-600 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-4 h-4 text-accent-orange" />
            <span className="text-xs text-dark-400">Streak</span>
          </div>
          <div className="text-2xl font-bold text-dark-100">{progress.streakDays} <span className="text-base text-dark-500">Tage</span></div>
        </div>
        <div className="bg-dark-800 border border-dark-600 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Code2 className="w-4 h-4 text-accent-purple" />
            <span className="text-xs text-dark-400">Übungen</span>
          </div>
          <div className="text-2xl font-bold text-dark-100">{Object.keys(progress.completedExercises).length}</div>
        </div>
      </div>

      {/* Spaced Repetition Review Section */}
      <div className="mb-8">
        <ReviewSection />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Continue Learning */}
        <div className="lg:col-span-2 space-y-4">
          {nextTopic && (
            <Link
              to={`/learn/${nextTopic.moduleId}/${nextTopic.id}`}
              className="block bg-gradient-to-r from-accent-blue/10 to-accent-purple/10 border border-accent-blue/20 rounded-xl p-5 hover:border-accent-blue/40 transition-all group"
            >
              <div className="flex items-center gap-2 text-accent-blue text-sm font-medium mb-2">
                <Zap className="w-4 h-4" />
                Weiter lernen
              </div>
              <h3 className="text-xl font-bold text-dark-100 mb-1 group-hover:text-accent-blue transition-colors">
                {nextTopic.title}
              </h3>
              <p className="text-dark-400 text-sm mb-3">{nextTopic.moduleTitle}</p>
              <div className="flex items-center gap-1 text-accent-blue text-sm font-medium">
                Jetzt starten <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          )}

          {/* Quick Actions */}
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              to="/playground"
              className="bg-dark-800 border border-dark-600 rounded-xl p-4 hover:border-accent-green/40 transition-all group"
            >
              <Play className="w-8 h-8 text-accent-green mb-3" />
              <h3 className="font-semibold text-dark-100 mb-1">Playground</h3>
              <p className="text-sm text-dark-400">Schreibe und teste Java-Code frei im Browser</p>
            </Link>
            <Link
              to="/exam/java1"
              className="bg-dark-800 border border-dark-600 rounded-xl p-4 hover:border-accent-orange/40 transition-all group"
            >
              <Trophy className="w-8 h-8 text-accent-orange mb-3" />
              <h3 className="font-semibold text-dark-100 mb-1">Klausur-Simulator</h3>
              <p className="text-sm text-dark-400">Teste dein Wissen unter Prüfungsbedingungen</p>
            </Link>
          </div>

          {/* Module Overview */}
          <div className="bg-dark-800 border border-dark-600 rounded-xl p-5">
            <h3 className="font-semibold text-dark-100 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-accent-blue" />
              Module
            </h3>
            <div className="space-y-3">
              {moduleConfig.map(mod => {
                const completed = mod.topics.filter(t => progress.completedTopics.includes(t.id)).length;
                const pct = Math.round((completed / mod.topics.length) * 100);
                const Icon = mod.icon;
                return (
                  <Link
                    key={mod.id}
                    to={`/learn/${mod.id}/${mod.topics[0].id}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-dark-700/50 transition-colors group"
                  >
                    <Icon className={`w-5 h-5 ${mod.color} shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-dark-200">{mod.title}</span>
                        <span className="text-xs text-dark-500">{completed}/{mod.topics.length}</span>
                      </div>
                      <div className="h-1.5 bg-dark-700 rounded-full overflow-hidden">
                        <div className="h-full bg-accent-green/70 rounded-full transition-all" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-dark-500 group-hover:text-dark-300 shrink-0" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Skill Radar */}
        <div className="space-y-4">
          <div className="bg-dark-800 border border-dark-600 rounded-xl p-5">
            <h3 className="font-semibold text-dark-100 mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-accent-purple" />
              Skill-Radar
            </h3>
            <SkillRadar scores={moduleScores} size={220} />
          </div>

          {progress.weakTopics.length > 0 && (
            <div className="bg-dark-800 border border-accent-orange/20 rounded-xl p-5">
              <h3 className="font-semibold text-dark-100 mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent-orange" />
                Empfohlene Wiederholung
              </h3>
              <div className="space-y-2">
                {progress.weakTopics.slice(0, 3).map(topicId => {
                  const mod = moduleConfig.find(m => m.topics.some(t => t.id === topicId));
                  const topic = mod?.topics.find(t => t.id === topicId);
                  if (!mod || !topic) return null;
                  return (
                    <Link
                      key={topicId}
                      to={`/learn/${mod.id}/${topicId}`}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-dark-700/50 transition-colors text-sm"
                    >
                      <div className="w-2 h-2 rounded-full bg-accent-orange" />
                      <span className="text-dark-300">{topic.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          <div className="bg-dark-800 border border-dark-600 rounded-xl p-5">
            <h3 className="font-semibold text-dark-100 mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-accent-cyan" />
              Lernplan
            </h3>
            <p className="text-sm text-dark-400 mb-3">
              {totalTopics - progress.completedTopics.length} Themen verbleibend.
              Bei 2 Themen pro Tag bist du in ~{Math.ceil((totalTopics - progress.completedTopics.length) / 2)} Tagen fertig!
            </p>
            <div className="text-xs text-dark-500">
              Tipp: Konstanz schlägt Intensität. Lieber jeden Tag ein Thema als einmal alles.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
