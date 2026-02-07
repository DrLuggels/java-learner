import { useState } from 'react';
import { Code2, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import CodeEditor from '../editor/CodeEditor';
import TopicVisualization from '../visualizations/TopicVisualizations';
import type { Topic } from '../../types';

interface ClassicLessonViewProps {
  topic: Topic;
  onQuizScore: (score: number) => void;
}

export default function ClassicLessonView({ topic, onQuizScore }: ClassicLessonViewProps) {
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    const correct = topic.quiz.filter(q => quizAnswers[q.id] === q.correctIndex).length;
    onQuizScore(Math.round((correct / topic.quiz.length) * 100));
  };

  return (
    <>
      {/* Content */}
      <div className="lesson-content mb-8" dangerouslySetInnerHTML={{ __html: renderMarkdown(topic.content) }} />

      <TopicVisualization topicId={topic.id} />

      {/* Code Examples */}
      {topic.codeExamples.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-dark-100 mb-4 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-accent-green" /> Code-Beispiele
          </h2>
          <div className="space-y-6">
            {topic.codeExamples.map((ex, i) => (
              <div key={i}>
                <h3 className="text-sm font-medium text-dark-200 mb-1">{ex.title}</h3>
                <p className="text-sm text-dark-400 mb-3">{ex.description}</p>
                <CodeEditor initialCode={ex.code} height="200px" readOnly={!ex.editable} showRunButton={ex.editable} />
                {ex.expectedOutput && (
                  <div className="mt-2 text-xs text-dark-500">
                    Erwartete Ausgabe: <code className="bg-dark-700 px-1.5 py-0.5 rounded text-accent-cyan">{ex.expectedOutput}</code>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quiz */}
      {topic.quiz.length > 0 && (
        <div className="mb-8 bg-dark-800 border border-dark-600 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-dark-100 mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-accent-purple" /> Wissens-Check
          </h2>
          <div className="space-y-6">
            {topic.quiz.map((q, qi) => (
              <div key={q.id}>
                <p className="text-dark-200 font-medium mb-3">{qi + 1}. {q.question}</p>
                <div className="space-y-2">
                  {q.options.map((opt, oi) => {
                    const selected = quizAnswers[q.id] === oi;
                    const isCorrect = q.correctIndex === oi;
                    let style = 'border-dark-600 hover:border-dark-500';
                    if (quizSubmitted) {
                      if (isCorrect) style = 'border-accent-green/50 bg-accent-green/5';
                      else if (selected && !isCorrect) style = 'border-accent-red/50 bg-accent-red/5';
                    } else if (selected) {
                      style = 'border-accent-blue/50 bg-accent-blue/5';
                    }
                    return (
                      <button key={oi} onClick={() => !quizSubmitted && setQuizAnswers(prev => ({ ...prev, [q.id]: oi }))}
                        className={`w-full text-left p-3 rounded-lg border ${style} transition-colors text-sm`} disabled={quizSubmitted}>
                        <span className="text-dark-300">{opt}</span>
                      </button>
                    );
                  })}
                </div>
                {quizSubmitted && (
                  <p className={`text-sm mt-2 ${quizAnswers[q.id] === q.correctIndex ? 'text-accent-green' : 'text-accent-red'}`}>
                    {quizAnswers[q.id] === q.correctIndex ? 'Richtig!' : 'Falsch.'} {q.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>
          {!quizSubmitted ? (
            <button onClick={handleQuizSubmit} disabled={Object.keys(quizAnswers).length < topic.quiz.length}
              className="mt-4 px-4 py-2 bg-accent-purple/20 text-accent-purple rounded-lg hover:bg-accent-purple/30 disabled:opacity-30 transition-colors text-sm font-medium">
              Antworten pruefen
            </button>
          ) : (
            <div className="mt-4 text-sm text-dark-400">
              Ergebnis: {topic.quiz.filter(q => quizAnswers[q.id] === q.correctIndex).length}/{topic.quiz.length} richtig
            </div>
          )}
        </div>
      )}

      {/* Exercise Links */}
      {topic.exercises.length > 0 && (
        <div className="mb-8 bg-dark-800 border border-accent-green/20 rounded-xl p-5">
          <h3 className="font-semibold text-dark-100 mb-3">Uebungsaufgaben zu diesem Thema</h3>
          <div className="flex flex-wrap gap-2">
            {topic.exercises.map(exId => (
              <Link key={exId} to={`/practice/${exId}`}
                className="px-3 py-1.5 bg-dark-700 border border-dark-600 rounded-lg text-sm text-dark-300 hover:text-accent-green hover:border-accent-green/30 transition-colors">
                {exId}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function renderMarkdown(md: string): string {
  let html = md;
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/```java\n([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
  html = html.replace(/```\n([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');
  html = html.replace(/^> (.+)$/gm, '<blockquote><p>$1</p></blockquote>');
  html = html.replace(/\n{2,}/g, '</p><p>');
  html = '<p>' + html + '</p>';
  html = html.replace(/<p><(h[123]|ul|ol|pre|blockquote)/g, '<$1');
  html = html.replace(/<\/(h[123]|ul|ol|pre|blockquote)><\/p>/g, '</$1>');
  html = html.replace(/<p><\/p>/g, '');
  return html;
}
