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
