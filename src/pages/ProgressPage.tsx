import { Link } from 'react-router-dom';
import {
  BarChart3, CheckCircle2, Target, TrendingUp,
  Award, BookOpen, Code2, Brain
} from 'lucide-react';
import { useProgress } from '../hooks/useProgress';
import SkillRadar from '../components/dashboard/SkillRadar';
import { moduleConfig } from '../components/layout/Sidebar';

export default function ProgressPage() {
  const { progress, getOverallProgress } = useProgress();

  const totalTopics = moduleConfig.reduce((acc, m) => acc + m.topics.length, 0);
  const overallProgress = getOverallProgress(totalTopics);
  const completedExercises = Object.values(progress.completedExercises).filter(e => e.completed).length;
  const avgScore = (() => {
    const scores = Object.values(progress.completedExercises).map(e => e.score);
    return scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  })();

  const moduleScores = moduleConfig.map(m => {
    const completed = m.topics.filter(t => progress.completedTopics.includes(t.id)).length;
    return {
      label: m.title,
      value: m.topics.length > 0 ? Math.round((completed / m.topics.length) * 100) : 0,
      color: m.color.replace('text-', ''),
    };
  });

  return (
    <div className="max-w-5xl mx-auto p-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-dark-100 mb-2 flex items-center gap-3">
        <BarChart3 className="w-8 h-8 text-accent-blue" />
        Dein Fortschritt
      </h1>
      <p className="text-dark-400 mb-8">Übersicht über deinen Lernfortschritt und deine Stärken/Schwächen.</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-dark-800 border border-dark-600 rounded-xl p-5 text-center">
          <Target className="w-6 h-6 text-accent-blue mx-auto mb-2" />
          <div className="text-3xl font-bold text-dark-100">{overallProgress}%</div>
          <div className="text-xs text-dark-400 mt-1">Gesamtfortschritt</div>
        </div>
        <div className="bg-dark-800 border border-dark-600 rounded-xl p-5 text-center">
          <BookOpen className="w-6 h-6 text-accent-green mx-auto mb-2" />
          <div className="text-3xl font-bold text-dark-100">{progress.completedTopics.length}</div>
          <div className="text-xs text-dark-400 mt-1">Themen abgeschlossen</div>
        </div>
        <div className="bg-dark-800 border border-dark-600 rounded-xl p-5 text-center">
          <Code2 className="w-6 h-6 text-accent-purple mx-auto mb-2" />
          <div className="text-3xl font-bold text-dark-100">{completedExercises}</div>
          <div className="text-xs text-dark-400 mt-1">Übungen gelöst</div>
        </div>
        <div className="bg-dark-800 border border-dark-600 rounded-xl p-5 text-center">
          <Award className="w-6 h-6 text-accent-orange mx-auto mb-2" />
          <div className="text-3xl font-bold text-dark-100">{avgScore}</div>
          <div className="text-xs text-dark-400 mt-1">Durchschnittl. Score</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Skill Radar */}
        <div className="bg-dark-800 border border-dark-600 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-dark-100 mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-accent-purple" />
            Kompetenz-Radar
          </h2>
          <SkillRadar scores={moduleScores} size={280} />
        </div>

        {/* Module Details */}
        <div className="bg-dark-800 border border-dark-600 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-dark-100 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent-green" />
            Module im Detail
          </h2>
          <div className="space-y-4">
            {moduleConfig.map(mod => {
              const completed = mod.topics.filter(t => progress.completedTopics.includes(t.id)).length;
              const pct = Math.round((completed / mod.topics.length) * 100);
              const Icon = mod.icon;
              return (
                <div key={mod.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${mod.color}`} />
                      <span className="text-sm text-dark-200 font-medium">{mod.title}</span>
                    </div>
                    <span className="text-sm text-dark-400">{completed}/{mod.topics.length} ({pct}%)</span>
                  </div>
                  <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: `var(--color-${mod.color.replace('text-', '')})`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Topic Completion Grid */}
      <div className="bg-dark-800 border border-dark-600 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-dark-100 mb-4">Alle Themen</h2>
        <div className="space-y-6">
          {moduleConfig.map(mod => (
            <div key={mod.id}>
              <h3 className={`text-sm font-semibold ${mod.color} mb-2`}>{mod.title}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {mod.topics.map(topic => {
                  const completed = progress.completedTopics.includes(topic.id);
                  return (
                    <Link
                      key={topic.id}
                      to={`/learn/${mod.id}/${topic.id}`}
                      className={`flex items-center gap-2 p-2 rounded-lg text-xs transition-colors ${
                        completed
                          ? 'bg-accent-green/10 border border-accent-green/20 text-accent-green'
                          : 'bg-dark-700/50 border border-dark-600 text-dark-400 hover:text-dark-200 hover:border-dark-500'
                      }`}
                    >
                      {completed ? <CheckCircle2 className="w-3 h-3 shrink-0" /> : <div className="w-3 h-3 rounded-full border border-dark-500 shrink-0" />}
                      <span className="truncate">{topic.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
