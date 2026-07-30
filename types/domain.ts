// ─── CONCEPT ENGINE ──────────────────────────────────────────────────────────

export interface Concept {
  id: string; // e.g., 'greeting_hello'
  type: 'vocabulary' | 'grammar' | 'culture' | 'phrase';
  title: string;
  description?: string;
  relatedConcepts?: string[];
}

// ─── DOMAIN ENTITIES ─────────────────────────────────────────────────────────

export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface Subject {
  id: string;
  name: string; // e.g., 'French'
}

export interface Level {
  id: string;
  subjectId: string;
  cefr?: CEFRLevel;
  title: string;
}

export interface Course {
  id: string;
  levelId: string;
  title: string;
  version: number;
}

export interface Unit {
  id: string;
  courseId: string;
  title: string;
  order: number;
}

export interface Lesson {
  id: string;
  unitId: string;
  title: string;
  version: number;
  learningObjectives: string[]; // references to concept IDs
  modules: LearningModule[];
}

// ─── MODULE CAPABILITIES & METADATA ────────────────────────────────────────

export type Capability = 'audio' | 'microphone' | 'speech-recognition';

export interface ModuleMetadata {
  title?: string;
  estimatedTime?: number;
  difficulty?: 1 | 2 | 3 | 4 | 5;
  skippable?: boolean;
  requires?: Capability[];
  objectives?: string[]; // concept IDs this module teaches/tests
}

// ─── LEARNING ACTIVITIES (The Practice Engine) ─────────────────────────────

export type ActivityType = 'play_audio' | 'speech' | 'question' | 'flashcard' | 'dialogue_line' | 'knowledge_card';

export interface LearningActivity<TPayload = unknown> {
  id: string;
  type: ActivityType;
  conceptIds: string[];
  estimatedTime?: number;
  difficulty?: number;
  payload: TPayload;
}

// ─── MODULE CONFIGURATIONS (Discriminated Unions) ──────────────────────────

// A Vocabulary Module might define a set of words, and internally generate 
// activities (Flashcard -> Audio -> Speech -> Practice) for each.
export interface VocabWord {
  conceptId: string;
  emoji: string;
  nativeWord: string;
  englishMeaning: string;
  pronunciation?: string;
  ipa?: string;
  exampleSentence?: string;
  exampleTranslation?: string;
  usageNote?: string;
  formality?: 'informal' | 'formal' | 'neutral';
  memoryTip?: string;
  difficultyRating?: number; // 1 to 5 stars
  commonMistake?: {
    wrong: string;
    correct: string;
  };
  contextualUsage?: {
    whenToUse: string[];
    doNotUse: string[];
    insteadSay?: string;
  };
}

export interface VocabularyConfig {
  words: VocabWord[];
}

export interface QuizQuestionPayload {
  type: 'mcq' | 'translate' | 'listening';
  question: string;
  options?: string[];
  answer: string;
  explanation?: string;
}

export interface QuizConfig {
  activities: LearningActivity<QuizQuestionPayload>[];
}

export interface DialogueLine {
  id: string;
  conceptIds?: string[];
  speaker: string;
  avatarUrl?: string;
  emojiAvatar?: string;
  text: string;
  translation: string;
  audioText?: string;
  options?: string[];
}

export interface DialogueConfig {
  title: string;
  lines: DialogueLine[];
}

export interface KnowledgeCardConfig {
  title: string;
  conceptId: string;
  content: string; // Markdown or rich text
  example?: string;
}

// ─── LEARNING MODULE ───────────────────────────────────────────────────────

export type ModuleState = 'locked' | 'available' | 'started' | 'completed' | 'mastered' | 'needs_review';

export interface BaseModule {
  id: string;
  version: number;
  metadata?: ModuleMetadata;
  state?: ModuleState;
}

export interface VocabularyModule extends BaseModule {
  type: 'vocabulary';
  config: VocabularyConfig;
}

export interface QuizModule extends BaseModule {
  type: 'quiz';
  config: QuizConfig;
}

export interface DialogueModule extends BaseModule {
  type: 'dialogue';
  config: DialogueConfig;
}

export interface KnowledgeCardModule extends BaseModule {
  type: 'knowledge_card';
  config: KnowledgeCardConfig;
}

export type LearningModule = VocabularyModule | QuizModule | DialogueModule | KnowledgeCardModule;

// ─── ANALYTICS ─────────────────────────────────────────────────────────────

export interface LearningRecord {
  conceptId: string;
  attempts: number;
  correct: number;
  wrong: number;
  avgResponseTimeMs: number;
  confidenceScore: number;
  lastSeen: string; // ISO string
}
