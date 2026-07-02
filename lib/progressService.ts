import type { UserProgress, LessonProgress } from '@/types';

const STORAGE_KEY = 'lingua_learn_progress';

const defaultProgress = (): UserProgress => ({
  totalXP: 0,
  streak: 0,
  hearts: 5,
  lessons: {},
});

// ─── Abstract interface (swap for API later) ───────────────────────────────
export interface IProgressService {
  getProgress(): UserProgress;
  getLessonProgress(lessonId: string): LessonProgress | null;
  saveLesson(progress: LessonProgress): void;
  addXP(amount: number): void;
  loseHeart(): void;
  refillHearts(): void;
  updateStreak(): void;
  resetAll(): void;
}

// ─── LocalStorage Implementation ──────────────────────────────────────────
class LocalProgressService implements IProgressService {
  private load(): UserProgress {
    if (typeof window === 'undefined') return defaultProgress();
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultProgress();
      return JSON.parse(raw) as UserProgress;
    } catch {
      return defaultProgress();
    }
  }

  private save(data: UserProgress): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  getProgress(): UserProgress {
    return this.load();
  }

  getLessonProgress(lessonId: string): LessonProgress | null {
    const p = this.load();
    return p.lessons[lessonId] ?? null;
  }

  saveLesson(progress: LessonProgress): void {
    const p = this.load();
    const prev = p.lessons[progress.lessonId];
    // Keep best score
    if (prev && prev.score > progress.score) {
      progress.score = prev.score;
    }
    p.lessons[progress.lessonId] = progress;
    if (progress.completed) {
      p.totalXP += progress.score - (prev?.score ?? 0);
    }
    this.save(p);
  }

  addXP(amount: number): void {
    const p = this.load();
    p.totalXP += amount;
    this.save(p);
  }

  loseHeart(): void {
    const p = this.load();
    if (p.hearts > 0) p.hearts -= 1;
    this.save(p);
  }

  refillHearts(): void {
    const p = this.load();
    p.hearts = 5;
    p.lastHeartRefill = new Date().toISOString();
    this.save(p);
  }

  updateStreak(): void {
    const p = this.load();
    const today = new Date().toDateString();
    if (p.lastStudyDate === today) return; // already counted today
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (p.lastStudyDate === yesterday) {
      p.streak += 1;
    } else if (p.lastStudyDate !== today) {
      p.streak = 1; // reset streak if gap
    }
    p.lastStudyDate = today;
    this.save(p);
  }

  resetAll(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
  }
}

export const progressService: IProgressService = new LocalProgressService();
