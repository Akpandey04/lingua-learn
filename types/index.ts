// ─── Language Types ────────────────────────────────────────────────────────

export type LanguageCode = 'french' | 'german' | 'japanese' | 'spanish' | 'english';

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  locale: string;
  color: string;
}

// ─── Vocabulary Card (Phase 1: Learn) ─────────────────────────────────────

export interface VocabCard {
  id: string;
  emoji: string;
  nativeWord: string;
  englishMeaning: string;
  pronunciation: string;
  exampleSentence: string;
  exampleTranslation: string;
  usageNote?: string;
  grammarTip?: string;
}

// ─── Exercise Types ────────────────────────────────────────────────────────

export type ExerciseType =
  | 'mcq'
  | 'translate'
  | 'match'
  | 'fill'
  | 'listening'
  | 'speaking'
  | 'tap-word';

export interface MCQExercise {
  type: 'mcq';
  id: string;
  question: string;
  questionAudio?: boolean;
  options: string[];
  answer: string;
  explanation?: string;
  hint?: string;
}

export interface TranslateExercise {
  type: 'translate';
  id: string;
  direction: 'to-native' | 'to-english';
  question: string;
  answer: string;
  alternateAnswers?: string[];
  explanation?: string;
  hint?: string;
}

export interface MatchExercise {
  type: 'match';
  id: string;
  instruction?: string;
  pairs: { source: string; target: string }[];
  hint?: string;
}

export interface FillExercise {
  type: 'fill';
  id: string;
  sentence: string;
  answer: string;
  options?: string[];
  explanation?: string;
  hint?: string;
}

export interface ListeningExercise {
  type: 'listening';
  id: string;
  phrase: string;
  answer: string;
  options?: string[];
  explanation?: string;
  hint?: string;
}

export interface SpeakingExercise {
  type: 'speaking';
  id: string;
  prompt: string;
  expectedPhrase: string;
  hint?: string;
}

export interface TapWordExercise {
  type: 'tap-word';
  id: string;
  question: string;
  options: string[];
  answer: string;
  explanation?: string;
}

export type Exercise =
  | MCQExercise
  | TranslateExercise
  | MatchExercise
  | FillExercise
  | ListeningExercise
  | SpeakingExercise
  | TapWordExercise;

// ─── Lesson Phase ──────────────────────────────────────────────────────────

export type LessonPhase =
  | 'intro'
  | 'learn'
  | 'guided'
  | 'recall'
  | 'mixed'
  | 'summary'
  | 'quiz'
  | 'results';

// ─── Lesson Structure ──────────────────────────────────────────────────────

export interface Lesson {
  id: string;
  title: string;
  intro: string;
  estimatedMinutes: number;
  conceptIds?: string[];
  vocabulary: VocabCard[];
  guidedExercises: Exercise[];
  recallExercises: Exercise[];
  mixedExercises: Exercise[];
  quizExercises: Exercise[];
}

export interface Unit {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  /** @deprecated Do not use estimatedHours */
  estimatedHours?: number;
  lessons: Lesson[];
}

export interface Course {
  language: LanguageCode;
  units: Unit[];
}

// ─── Progress Types ────────────────────────────────────────────────────────

export interface WordMastery {
  cardId: string;
  correct: number;
  incorrect: number;
  lastSeen: string;
  nextReview: string;
}

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  dateCompleted?: string;
  attempts: number;
  wordMastery: WordMastery[];
}

export interface UserProgress {
  streak: number;
  lastStudyDate?: string;
  lessons: Record<string, LessonProgress>;
}

// ─── UI Types ──────────────────────────────────────────────────────────────

export interface GrammarHint {
  title: string;
  explanation: string;
  examples: string[];
}
