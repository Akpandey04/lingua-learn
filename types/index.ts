// ─── Language Types ────────────────────────────────────────────────────────

export type LanguageCode = 'french' | 'german' | 'japanese' | 'spanish';

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  locale: string; // BCP-47 for Web Speech API
  color: string;
}

// ─── Lesson Content Types ──────────────────────────────────────────────────

export type ExerciseType = 'mcq' | 'translate' | 'match' | 'fill' | 'listening' | 'speaking';

export interface MCQExercise {
  type: 'mcq';
  id: string;
  question: string;
  questionAudio?: boolean; // if true, speak the question
  options: string[];
  answer: string;
  hint?: string;
}

export interface TranslateExercise {
  type: 'translate';
  id: string;
  question: string;
  answer: string;
  hint?: string;
  alternateAnswers?: string[];
}

export interface MatchExercise {
  type: 'match';
  id: string;
  pairs: { source: string; target: string }[];
}

export interface FillExercise {
  type: 'fill';
  id: string;
  sentence: string; // use ___ for blank
  answer: string;
  options?: string[]; // if provided, show as multiple choice
  hint?: string;
}

export interface ListeningExercise {
  type: 'listening';
  id: string;
  phrase: string; // text to speak aloud
  answer: string; // expected typed answer
  hint?: string;
}

export interface SpeakingExercise {
  type: 'speaking';
  id: string;
  prompt: string;       // instruction (e.g. "Say: Bonjour")
  expectedPhrase: string; // target phrase to speak
  hint?: string;
}

export type Exercise =
  | MCQExercise
  | TranslateExercise
  | MatchExercise
  | FillExercise
  | ListeningExercise
  | SpeakingExercise;

export interface Lesson {
  id: string;
  title: string;
  intro?: string;
  xpReward: number;
  exercises: Exercise[];
}

export interface Unit {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  lessons: Lesson[];
}

export interface Course {
  language: LanguageCode;
  units: Unit[];
}

// ─── Progress Types ───────────────────────────────────────────────────────

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  score: number;       // XP earned
  hearts: number;      // hearts remaining when completed
  dateCompleted?: string;
  attempts: number;
}

export interface UserProgress {
  totalXP: number;
  streak: number;       // consecutive days
  lastStudyDate?: string;
  hearts: number;       // current hearts (0-5)
  lastHeartRefill?: string;
  lessons: Record<string, LessonProgress>; // lessonId → LessonProgress
}

// ─── UI / Store Types ────────────────────────────────────────────────────

export interface GrammarHint {
  title: string;
  explanation: string;
  examples: string[];
}
