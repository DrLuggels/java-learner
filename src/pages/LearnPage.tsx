import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ChevronLeft, ChevronRight, CheckCircle2, BookOpen,
  ArrowRight, Lightbulb
} from 'lucide-react';
import LessonStepper from '../components/lesson/LessonStepper';
import ClassicLessonView from '../components/lesson/ClassicLessonView';
import { useProgress } from '../hooks/useProgress';
import { moduleConfig } from '../components/layout/Sidebar';
import { getTopicById, getAllTopics } from '../data/curriculum';

export default function LearnPage() {
  const { moduleId, topicId } = useParams();
  const navigate = useNavigate();
  const { completeTopic, isTopicCompleted, updateTopicScore } = useProgress();

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
          <Link to="/" className="text-accent-blue hover:underline">Zurueck zur Uebersicht</Link>
        </div>
      </div>
    );
  }

  const completed = isTopicCompleted(topic.id);
  const hasSteps = topic.lessonSteps && topic.lessonSteps.length > 0;

  const handleCompleteTopic = () => {
    completeTopic(topic.id);
    if (nextTopic) {
      const nextMod = moduleConfig.find(m => m.topics.some(t => t.id === nextTopic.id));
      if (nextMod) navigate(`/learn/${nextMod.id}/${nextTopic.id}`);
    }
  };

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

      {/* Transfer Knowledge */}
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

      {/* Interactive Steps OR Classic View */}
      {hasSteps ? (
        <LessonStepper steps={topic.lessonSteps!} onAllComplete={handleCompleteTopic} />
      ) : (
        <ClassicLessonView topic={topic} onQuizScore={(score) => updateTopicScore(topic.id, score)} />
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-dark-600 mt-8">
        {prevTopic ? (
          <Link
            to={`/learn/${moduleConfig.find(m => m.topics.some(t => t.id === prevTopic.id))?.id}/${prevTopic.id}`}
            className="flex items-center gap-2 text-sm text-dark-400 hover:text-dark-200 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> {prevTopic.title}
          </Link>
        ) : <div />}

        <div className="flex items-center gap-3">
          {!completed && !hasSteps && (
            <button
              onClick={handleCompleteTopic}
              className="flex items-center gap-2 px-4 py-2 bg-accent-green/20 text-accent-green rounded-lg hover:bg-accent-green/30 transition-colors text-sm font-medium"
            >
              <CheckCircle2 className="w-4 h-4" /> Als abgeschlossen markieren
            </button>
          )}
          {nextTopic && (
            <Link
              to={`/learn/${moduleConfig.find(m => m.topics.some(t => t.id === nextTopic.id))?.id}/${nextTopic.id}`}
              className="flex items-center gap-2 px-4 py-2 bg-accent-blue/20 text-accent-blue rounded-lg hover:bg-accent-blue/30 transition-colors text-sm font-medium"
            >
              Naechstes Thema <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
