type EventHandler<T = any> = (event: T) => void;

export interface AppEvents {
  'ActivityCompleted': { 
    activityId: string; 
    moduleId: string; 
    conceptId?: string;
    correct?: boolean; 
    timeSpentMs?: number;
    skill?: 'vocabulary' | 'listening' | 'speaking' | 'reading' | 'writing' | 'grammar';
    confidence?: 'very_sure' | 'somewhat' | 'guess';
    context?: string;
  };
  'ActivityFailed': {
    conceptId: string;
    expected: string;
    actual: string;
    mistakeType: 'meaning' | 'spelling' | 'pronunciation' | 'listening';
    explanation?: string;
    reason?: string;
    lessonId?: string;
  };
  'ModuleStarted': {
    moduleId: string;
  };
  'ModuleCompleted': {
    moduleId: string;
  };
  'LessonCompleted': {
    lessonId: string;
  };
  'AudioFeedback': {
    type: 'correct' | 'wrong' | 'complete' | 'achievement';
  };
  'AchievementUnlocked': {
    id: string;
    title: string;
    tier: 'bronze' | 'silver' | 'gold' | 'diamond';
    icon: string;
  };
}

type EventMap = {
  [K in keyof AppEvents]: AppEvents[K];
};

class EventBus {
  private handlers: Record<string, any[]> = {};

  on<K extends keyof EventMap>(event: K, handler: EventHandler<EventMap[K]>) {
    if (!this.handlers[event]) {
      this.handlers[event] = [];
    }
    this.handlers[event].push(handler);
  }

  off<K extends keyof EventMap>(event: K, handler: EventHandler<EventMap[K]>) {
    if (!this.handlers[event]) return;
    this.handlers[event] = this.handlers[event].filter((h) => h !== handler);
  }

  emit<K extends keyof EventMap>(event: K, payload: EventMap[K]) {
    if (!this.handlers[event]) return;
    this.handlers[event].forEach((handler) => handler(payload));
  }
}

export const eventBus = new EventBus();
