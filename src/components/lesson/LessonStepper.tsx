import { useState } from 'react';
import { ChevronLeft, CheckCircle2 } from 'lucide-react';
import type { LessonStep } from '../../types';
import ContentStep from './ContentStep';
import CodeExampleStep from './CodeExampleStep';
import PredictOutputStep from './PredictOutputStep';
import FillBlankStep from './FillBlankStep';
import MiniChallengeStep from './MiniChallengeStep';
import QuizStep from './QuizStep';

interface LessonStepperProps {
  steps: LessonStep[];
  onAllComplete: () => void;
}

export default function LessonStepper({ steps, onAllComplete }: LessonStepperProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const step = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  const handleStepComplete = () => {
    setCompletedSteps(prev => new Set(prev).add(step.id));
    if (isLastStep) {
      onAllComplete();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const goBack = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <StepProgress steps={steps} currentStep={currentStep} completedSteps={completedSteps} onStepClick={setCurrentStep} />

      {/* Step Title */}
      <div className="flex items-center gap-3">
        {currentStep > 0 && (
          <button onClick={goBack} className="p-1 text-dark-400 hover:text-dark-200 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        {step.title && <h3 className="text-lg font-semibold text-dark-100">{step.title}</h3>}
        <span className="text-xs text-dark-500 ml-auto">
          Schritt {currentStep + 1} von {steps.length}
        </span>
      </div>

      {/* Step Content */}
      <div className="min-h-[200px]">
        <StepRenderer step={step} onComplete={handleStepComplete} />
      </div>
    </div>
  );
}

function StepRenderer({ step, onComplete }: { step: LessonStep; onComplete: () => void }) {
  switch (step.type) {
    case 'content':
      return <ContentStep content={step.content || ''} onComplete={onComplete} />;
    case 'code-example':
      return step.codeExample ? <CodeExampleStep codeExample={step.codeExample} onComplete={onComplete} /> : null;
    case 'predict-output':
      return <PredictOutputStep code={step.predictCode || ''} answer={step.predictAnswer || ''} explanation={step.predictExplanation} onComplete={onComplete} />;
    case 'fill-blank':
      return <FillBlankStep code={step.fillBlankCode || ''} answers={step.fillBlankAnswers || []} onComplete={onComplete} />;
    case 'challenge':
      return step.challenge ? (
        <MiniChallengeStep
          instruction={step.challenge.instruction}
          starterCode={step.challenge.starterCode}
          expectedOutput={step.challenge.expectedOutput}
          validationPattern={step.challenge.validationPattern}
          hint={step.challenge.hint}
          onComplete={onComplete}
        />
      ) : null;
    case 'quiz':
      return step.quizQuestion ? <QuizStep question={step.quizQuestion} onComplete={onComplete} /> : null;
    default:
      return <ContentStep content="Unbekannter Schritt-Typ" onComplete={onComplete} />;
  }
}

function StepProgress({ steps, currentStep, completedSteps, onStepClick }: {
  steps: LessonStep[];
  currentStep: number;
  completedSteps: Set<string>;
  onStepClick: (i: number) => void;
}) {
  const typeColors: Record<string, string> = {
    'content': 'bg-accent-blue',
    'code-example': 'bg-accent-green',
    'predict-output': 'bg-accent-purple',
    'fill-blank': 'bg-accent-orange',
    'challenge': 'bg-accent-red',
    'quiz': 'bg-accent-cyan',
  };

  return (
    <div className="flex items-center gap-1">
      {steps.map((s, i) => {
        const isCompleted = completedSteps.has(s.id);
        const isCurrent = i === currentStep;
        const canNavigate = isCompleted || i <= currentStep;

        return (
          <button
            key={s.id}
            onClick={() => canNavigate && onStepClick(i)}
            disabled={!canNavigate}
            className={`relative h-2 flex-1 rounded-full transition-all ${
              isCompleted ? 'bg-accent-green' :
              isCurrent ? typeColors[s.type] || 'bg-accent-blue' :
              'bg-dark-600'
            } ${canNavigate ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}`}
            title={`${i + 1}. ${s.title || s.type}`}
          >
            {isCompleted && (
              <CheckCircle2 className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 text-accent-green" />
            )}
          </button>
        );
      })}
    </div>
  );
}
