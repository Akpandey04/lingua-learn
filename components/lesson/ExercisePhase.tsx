'use client';
import { useState, useCallback } from 'react';
import type { Exercise, LessonPhase, Language } from '@/types';
import ExerciseRenderer from '@/components/exercises/ExerciseRenderer';
import Confetti from '@/components/ui/Confetti';

interface Props {
  phase: LessonPhase;
  exercises: Exercise[];
  language: Language;
  onComplete: (stats: { correct: number; wrong: number }) => void;
}

const PHASE_LABELS: Record<string, string> = {
  guided: '🤝 Guided Practice',
  recall: '🧠 Recall Practice',
  mixed: '🔀 Mixed Practice',
  quiz: '📝 Quiz',
};

const PHASE_SUBLABELS: Record<string, string> = {
  guided: 'Hints and explanations are available',
  recall: 'No hints — remember what you learned',
  mixed: 'All exercise types — stay sharp!',
  quiz: 'Final test — no help, just you!',
};

// Simple spaced repetition: track wrong answers and re-queue them
function buildQueue(exercises: Exercise[]): Exercise[] {
  return [...exercises];
}

export default function ExercisePhase({ phase, exercises, language, onComplete }: Props) {
  const [queue] = useState<Exercise[]>(() => buildQueue(exercises));
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);

  const [showConfetti, setShowConfetti] = useState(false);
  const [wrongIds] = useState<Set<string>>(new Set());
  const [retryQueue, setRetryQueue] = useState<Exercise[]>([]);
  const [inRetry, setInRetry] = useState(false);

  const currentExercises = inRetry ? retryQueue : queue;
  const current = currentExercises[index];
  const total = currentExercises.length;

  const handleCorrect = useCallback(() => {
    setCorrect((c) => c + 1);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1200);
  }, []);

  const handleWrong = useCallback(() => {
    setWrong((w) => w + 1);
    // Queue this exercise for retry if not already
    if (current && !wrongIds.has(current.id)) {
      wrongIds.add(current.id);
      setRetryQueue((q) => [...q, current]);
    }
  }, [current, wrongIds]);

  const handleNext = useCallback(() => {
    if (index + 1 >= currentExercises.length) {
      if (!inRetry && retryQueue.length > 0) {
        // Move to retry pass
        setInRetry(true);
        setIndex(0);
      } else {
        onComplete({ correct, wrong });
      }
    } else {
      setIndex((i) => i + 1);
    }
  }, [index, currentExercises.length, inRetry, retryQueue.length, correct, wrong, onComplete]);

  const showHints = phase === 'guided';
  const progressPct = total > 0 ? Math.round(((index + 1) / total) * 100) : 0;

  if (!current) return null;

  return (
    <div className="flex flex-col gap-5 w-full max-w-xl mx-auto">
      <Confetti active={showConfetti} />

      {/* Phase header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="font-bold text-gray-800 dark:text-white">{PHASE_LABELS[phase]}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">{PHASE_SUBLABELS[phase]}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-500"
          style={{ width: `${progressPct}%` }}
        />
      </div>
      <p className="text-xs text-gray-400 dark:text-gray-500 text-right -mt-3">
        {inRetry ? `Review: ` : ''}{index + 1} / {total}
        {inRetry && <span className="ml-1 text-amber-500">🔁 retry</span>}
      </p>

      {/* XP tracker */}
      <div className="flex justify-between text-sm">
        <span className="text-green-600 dark:text-green-400 font-semibold">
          ✅ {correct} correct
        </span>
      </div>

      {/* Exercise card */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 min-h-[360px] flex flex-col justify-center">
        <ExerciseRenderer
          key={`${current.id}-${inRetry}-${index}`}
          exercise={current}
          locale={language.locale}
          showHints={showHints}
          isQuiz={phase === 'quiz'}
          onCorrect={handleCorrect}
          onWrong={handleWrong}
          onNext={handleNext}
        />
      </div>
    </div>
  );
}
