import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  ChevronLeft, ChevronRight, CheckCircle2, BookOpen,
  Code2, HelpCircle, ArrowRight, Lightbulb
} from 'lucide-react';
import CodeEditor from '../components/editor/CodeEditor';
import { useProgress } from '../hooks/useProgress';
import { moduleConfig } from '../components/layout/Sidebar';
import { getTopicById, getAllTopics } from '../data/curriculum';

export default function LearnPage() {
  const { moduleId, topicId } = useParams();
  const navigate = useNavigate();
  const { completeTopic, isTopicCompleted, updateTopicScore } = useProgress();
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const topic = topicId ? getTopicById(topicId) : undefined;
  const allTopics = getAllTopics();
  const currentIndex = allTopics.findIndex(t => t.id === topicId);
  const prevTopic = currentIndex > 0 ? allTopics[currentIndex - 1] : null;
  const nextTopic = currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null;

  const currentModule = moduleConfig.find(m => m.id === moduleId);

  if (!topic || !currentModule) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <BookOpen className="w-12 h-12 text-dark-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-dark-200 mb-2">Thema nicht gefunden</h2>
          <Link to="/" className="text-accent-blue hover:underline">Zurück zur Übersicht</Link>
        </div>
      </div>
    );
  }

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    const correct = topic.quiz.filter(q => quizAnswers[q.id] === q.correctIndex).length;
    const score = Math.round((correct / topic.quiz.length) * 100);
    updateTopicScore(topic.id, score);
  };

  const handleCompleteTopic = () => {
    completeTopic(topic.id);
    if (nextTopic) {
      const nextMod = moduleConfig.find(m => m.topics.some(t => t.id === nextTopic.id));
      if (nextMod) navigate(`/learn/${nextMod.id}/${nextTopic.id}`);
    }
  };

  const completed = isTopicCompleted(topic.id);

  return (
    <div className="max-w-4xl mx-auto p-6 animate-fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-dark-400 mb-6">
        <Link to="/" className="hover:text-dark-200">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className={currentModule.color}>{currentModule.title}</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-dark-200">{topic.title}</span>
        {completed && <CheckCircle2 className="w-4 h-4 text-accent-green ml-1" />}
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-dark-100 mb-2">{topic.title}</h1>
      <p className="text-dark-400 mb-6">{topic.description}</p>

      {/* Transfer Knowledge Banner */}
      {topic.transferKnowledge && (
        <div className="hint-box flex items-start gap-3 mb-6">
          <Lightbulb className="w-5 h-5 text-accent-blue shrink-0 mt-0.5" />
          <div>
            <span className="text-sm font-medium text-accent-blue">Transferwissen</span>
            <p className="text-sm text-dark-300 mt-1">{topic.transferKnowledge}</p>
          </div>
        </div>
      )}

      {/* Key Concepts */}
      {topic.keyConceptsDE.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {topic.keyConceptsDE.map(concept => (
            <span key={concept} className="px-2.5 py-1 rounded-full bg-dark-700 text-dark-300 text-xs border border-dark-600">
              {concept}
            </span>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="lesson-content mb-8" dangerouslySetInnerHTML={{ __html: renderMarkdown(topic.content) }} />

      {/* Code Examples */}
      {topic.codeExamples.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-dark-100 mb-4 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-accent-green" />
            Code-Beispiele
          </h2>
          <div className="space-y-6">
            {topic.codeExamples.map((example, i) => (
              <div key={i}>
                <h3 className="text-sm font-medium text-dark-200 mb-1">{example.title}</h3>
                <p className="text-sm text-dark-400 mb-3">{example.description}</p>
                <CodeEditor
                  initialCode={example.code}
                  height="200px"
                  readOnly={!example.editable}
                  showRunButton={example.editable}
                />
                {example.expectedOutput && (
                  <div className="mt-2 text-xs text-dark-500">
                    Erwartete Ausgabe: <code className="bg-dark-700 px-1.5 py-0.5 rounded text-accent-cyan">{example.expectedOutput}</code>
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
            <HelpCircle className="w-5 h-5 text-accent-purple" />
            Wissens-Check
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
                      <button
                        key={oi}
                        onClick={() => !quizSubmitted && setQuizAnswers(prev => ({ ...prev, [q.id]: oi }))}
                        className={`w-full text-left p-3 rounded-lg border ${style} transition-colors text-sm`}
                        disabled={quizSubmitted}
                      >
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
            <button
              onClick={handleQuizSubmit}
              disabled={Object.keys(quizAnswers).length < topic.quiz.length}
              className="mt-4 px-4 py-2 bg-accent-purple/20 text-accent-purple rounded-lg hover:bg-accent-purple/30 disabled:opacity-30 transition-colors text-sm font-medium"
            >
              Antworten prüfen
            </button>
          ) : (
            <div className="mt-4 text-sm text-dark-400">
              Ergebnis: {topic.quiz.filter(q => quizAnswers[q.id] === q.correctIndex).length}/{topic.quiz.length} richtig
            </div>
          )}
        </div>
      )}

      {/* Exercises Link */}
      {topic.exercises.length > 0 && (
        <div className="mb-8 bg-dark-800 border border-accent-green/20 rounded-xl p-5">
          <h3 className="font-semibold text-dark-100 mb-3">Übungsaufgaben zu diesem Thema</h3>
          <div className="flex flex-wrap gap-2">
            {topic.exercises.map(exId => (
              <Link
                key={exId}
                to={`/practice/${exId}`}
                className="px-3 py-1.5 bg-dark-700 border border-dark-600 rounded-lg text-sm text-dark-300 hover:text-accent-green hover:border-accent-green/30 transition-colors"
              >
                {exId}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Complete & Navigate */}
      <div className="flex items-center justify-between pt-6 border-t border-dark-600">
        {prevTopic ? (
          <Link
            to={`/learn/${moduleConfig.find(m => m.topics.some(t => t.id === prevTopic.id))?.id}/${prevTopic.id}`}
            className="flex items-center gap-2 text-sm text-dark-400 hover:text-dark-200 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> {prevTopic.title}
          </Link>
        ) : <div />}

        <div className="flex items-center gap-3">
          {!completed && (
            <button
              onClick={handleCompleteTopic}
              className="flex items-center gap-2 px-4 py-2 bg-accent-green/20 text-accent-green rounded-lg hover:bg-accent-green/30 transition-colors text-sm font-medium"
            >
              <CheckCircle2 className="w-4 h-4" />
              Als abgeschlossen markieren
            </button>
          )}
          {nextTopic && (
            <Link
              to={`/learn/${moduleConfig.find(m => m.topics.some(t => t.id === nextTopic.id))?.id}/${nextTopic.id}`}
              className="flex items-center gap-2 px-4 py-2 bg-accent-blue/20 text-accent-blue rounded-lg hover:bg-accent-blue/30 transition-colors text-sm font-medium"
            >
              Nächstes Thema <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
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
