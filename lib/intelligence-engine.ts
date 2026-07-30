export type SkillType = 'vocabulary' | 'listening' | 'speaking' | 'reading' | 'writing' | 'grammar';
export type ConfidenceLevel = 'very_sure' | 'somewhat' | 'guess';

export interface LearningEvent {
  id: string;
  conceptId: string;
  timestamp: number;
  skill: SkillType;
  isCorrect: boolean;
  responseTimeMs: number;
  confidence?: ConfidenceLevel;
  context: string; // e.g., 'mcq', 'dialogue', 'flashcard'
}

export interface MistakeLog {
  id: string;
  conceptId: string;
  timestamp: number;
  expected: string;
  actual: string;
  mistakeType: 'meaning' | 'spelling' | 'pronunciation' | 'listening';
  status: 'needs_practice' | 'mastered';
  attemptCount: number;
  successCount: number;
  firstAttemptDate: number;
  lastPracticeDate: number;
  reason?: string; // For future AI Tutor analysis
  lessonId?: string;
}

// In MVP, we use memory. In a real app, this is a database.
class IntelligenceEngine {
  private events: LearningEvent[] = [];
  private mistakes: MistakeLog[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    if (typeof window !== 'undefined') {
      try {
        const storedEvents = localStorage.getItem('lingua_intelligence_events');
        const storedMistakes = localStorage.getItem('lingua_intelligence_mistakes');
        if (storedEvents) this.events = JSON.parse(storedEvents);
        if (storedMistakes) this.mistakes = JSON.parse(storedMistakes);
      } catch (e) {
        console.error('Failed to parse intelligence data', e);
      }
    }
  }

  private saveToStorage() {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('lingua_intelligence_events', JSON.stringify(this.events));
        localStorage.setItem('lingua_intelligence_mistakes', JSON.stringify(this.mistakes));
      } catch (e) {
        console.error('Failed to save intelligence data', e);
      }
    }
  }

  public logEvent(event: Omit<LearningEvent, 'id' | 'timestamp'>) {
    this.events.push({
      ...event,
      id: Math.random().toString(36).substring(7),
      timestamp: Date.now()
    });
    this.saveToStorage();
  }

  public logMistake(mistake: Omit<MistakeLog, 'id' | 'timestamp' | 'attemptCount' | 'successCount' | 'firstAttemptDate' | 'lastPracticeDate' | 'status'>) {
    // Check if mistake already exists for this concept and type
    const existingIndex = this.mistakes.findIndex(m => m.conceptId === mistake.conceptId && m.mistakeType === mistake.mistakeType);
    
    if (existingIndex >= 0) {
      const existing = this.mistakes[existingIndex];
      this.mistakes[existingIndex] = {
        ...existing,
        actual: mistake.actual,
        expected: mistake.expected,
        timestamp: Date.now(),
        attemptCount: existing.attemptCount + 1,
        status: 'needs_practice'
      };
    } else {
      this.mistakes.push({
        ...mistake,
        id: Math.random().toString(36).substring(7),
        timestamp: Date.now(),
        attemptCount: 1,
        successCount: 0,
        firstAttemptDate: Date.now(),
        lastPracticeDate: Date.now(),
        status: 'needs_practice'
      });
    }
    this.saveToStorage();
  }

  public updateMistakeStatus(id: string, success: boolean) {
    const index = this.mistakes.findIndex(m => m.id === id);
    if (index >= 0) {
      const m = this.mistakes[index];
      m.lastPracticeDate = Date.now();
      m.attemptCount += 1;
      if (success) {
        m.successCount += 1;
        m.status = 'mastered';
      } else {
        m.status = 'needs_practice';
      }
      this.saveToStorage();
    }
  }

  public getMistakes() {
    return this.mistakes.sort((a, b) => b.timestamp - a.timestamp);
  }

  // Derive Intelligence: Calculate Mastery on the fly
  public getConceptMastery(conceptId: string) {
    const conceptEvents = this.events.filter(e => e.conceptId === conceptId);
    
    if (conceptEvents.length === 0) {
      return {
        overall: 0,
        exposure: 0,
        skills: {} as Record<SkillType, number>,
        lastReviewed: null
      };
    }

    const exposure = conceptEvents.length;
    const lastReviewed = Math.max(...conceptEvents.map(e => e.timestamp));

    // Calculate skill-specific mastery
    const skills = {} as Record<SkillType, number>;
    const skillTypes = Array.from(new Set(conceptEvents.map(e => e.skill)));

    skillTypes.forEach(skill => {
      const skillEvents = conceptEvents.filter(e => e.skill === skill);
      const correctCount = skillEvents.filter(e => e.isCorrect).length;
      skills[skill] = Math.round((correctCount / skillEvents.length) * 100);
    });

    // Calculate overall mastery with recency and confidence weighting
    let totalScore = 0;
    conceptEvents.forEach(e => {
      let score = e.isCorrect ? 100 : 0;
      
      // Confidence multiplier
      if (e.confidence === 'very_sure') score *= 1.2;
      if (e.confidence === 'guess') score *= 0.6;
      
      totalScore += score;
    });

    // Base average
    let overall = Math.min(100, Math.round(totalScore / exposure));

    // Penalty for long time without review (Forgetting Curve simplified)
    const daysSinceReview = (Date.now() - lastReviewed) / (1000 * 60 * 60 * 24);
    if (daysSinceReview > 3) {
      overall = Math.max(0, overall - Math.floor(daysSinceReview * 2));
    }

    return {
      overall,
      exposure,
      skills,
      lastReviewed
    };
  }

  public getAllMastery() {
    const uniqueConcepts = Array.from(new Set(this.events.map(e => e.conceptId)));
    return uniqueConcepts.map(id => ({
      conceptId: id,
      ...this.getConceptMastery(id)
    }));
  }
}

export const intelligenceEngine = new IntelligenceEngine();
