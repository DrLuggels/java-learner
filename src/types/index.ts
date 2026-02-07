export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  topics: Topic[];
}

export interface Topic {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  content: string;
  codeExamples: CodeExample[];
  quiz: QuizQuestion[];
  exercises: string[];
  keyConceptsDE: string[];
  transferKnowledge: string;
  order: number;
  lessonSteps?: LessonStep[];
}

// --- Interactive Lesson Types ---
export type LessonStepType = 'content' | 'code-example' | 'challenge' | 'predict-output' | 'fill-blank' | 'quiz';

export interface LessonStep {
  id: string;
  type: LessonStepType;
  title?: string;
  content?: string;
  codeExample?: CodeExample;
  challenge?: MiniChallenge;
  predictCode?: string;
  predictAnswer?: string;
  predictExplanation?: string;
  fillBlankCode?: string;
  fillBlankAnswers?: string[];
  quizQuestion?: QuizQuestion;
}

export interface MiniChallenge {
  instruction: string;
  starterCode: string;
  expectedOutput?: string;
  validationPattern?: string;
  hint?: string;
}

export interface CodeExample {
  title: string;
  description: string;
  code: string;
  expectedOutput?: string;
  editable: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export type ExerciseType = 'code' | 'parsons' | 'fix-bug' | 'predict-output';

export interface Exercise {
  id: string;
  topicId: string;
  title: string;
  difficulty: 'leicht' | 'mittel' | 'schwer';
  description: string;
  requirements: string[];
  hints: string[];
  starterCode: string;
  solutionCode: string;
  expectedOutput?: string;
  tables?: ExerciseTable[];
  testCases: TestCase[];
  exerciseType?: ExerciseType;
  // Parsons-specific
  parsonsLines?: string[];
  parsonsDistractors?: string[];
  // Fix-bug-specific
  buggyCode?: string;
  bugDescription?: string;
  // Predict-output-specific
  predictCode?: string;
  predictOptions?: string[];
  correctPredictIndex?: number;
}

export interface ExerciseTable {
  title: string;
  headers: string[];
  rows: string[][];
}

export interface TestCase {
  input?: string;
  expectedOutput: string;
  description: string;
}

export interface ExamExercise {
  id: string;
  category: 'wuerfelspiel' | 'klassendiagramm' | 'aktivitaetsdiagramm' | 'abfragen';
  semester: 'java1' | 'java2';
  title: string;
  description: string;
  requirements: string[];
  classDiagram?: string;
  starterCode: string;
  solutionCode: string;
  expectedOutput?: string;
  timeEstimate: number;
}

export interface UserProgress {
  userId?: string;
  completedTopics: string[];
  completedExercises: Record<string, ExerciseResult>;
  topicScores: Record<string, number>;
  moduleScores: Record<string, number>;
  streakDays: number;
  totalTimeMinutes: number;
  lastActive: string;
  weakTopics: string[];
  savedCode: Record<string, string>;
  lastReviewDates: Record<string, string>;
}

export interface ExerciseResult {
  exerciseId: string;
  completed: boolean;
  attempts: number;
  hintsUsed: number;
  timeSeconds: number;
  lastAttempt: string;
  score: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

// --- Test Runner Types ---
export interface TestCaseResult {
  testCase: TestCase;
  passed: boolean;
  actualOutput: string;
  error?: string;
}

export interface TestRunResult {
  results: TestCaseResult[];
  allPassed: boolean;
  passedCount: number;
  totalCount: number;
}

// --- Parsed Error Types ---
export interface ParsedError {
  line: number;
  message: string;
  friendlyMessage: string;
  severity: 'error' | 'warning';
}
