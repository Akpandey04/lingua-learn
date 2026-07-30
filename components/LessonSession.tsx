'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Lesson } from '@/types';
import type { Language } from '@/types';
import ExerciseRenderer from './exercises/ExerciseRenderer';
import HeartsDisplay from './ui/HeartsDisplay';
import XPBar from './ui/XPBar';
import Confetti from './ui/Confetti';
import { useProgress } from '@/hooks/useProgress';
import { progressService } from '@/lib/progressService';

interface Props {
  lesson: Lesson;
  language: Language;
  unitId: string;
}

export default function LessonSession({ lesson, language, unitId }: Props) {
  const router = useRouter();
  const { progress, refreshProgress, updateStreak } = useProgress();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [errors, setErrors] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [finished, setFinished] = useState(false);



  const exercises = (lesson as any).exercises || [];
  const currentExercise = exercises[currentIndex];
  const progressPct = exercises.length > 0 ? Math.round((currentIndex / exercises.length) * 100) : 0;

  const handleCorrect = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1500);
  };

  const handleWrong = () => {
    setErrors((e) => e + 1);
  };

  const handleNext = () => {
    if (currentIndex + 1 >= exercises.length) {
      // Lesson complete
      progressService.saveLesson({
        lessonId: lesson.id,
        completed: true,
        dateCompleted: new Date().toISOString(),
        attempts: 1,
        wordMastery: [],
      });
      updateStreak();
      refreshProgress();
      setFinished(true);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  if (finished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8 text-center">
        <Confetti active={true} />
        <div className="text-7xl animate-bounce">🎉</div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Lesson Complete!</h2>
        <div className="flex gap-6 text-xl justify-center">
          <div className="flex flex-col items-center gap-1">
            <span className="text-4xl font-bold text-blue-500">{errors}</span>
            <span className="text-gray-500 dark:text-gray-400 text-sm">Mistakes</span>
          </div>
        </div>

        {errors === 0 && (
          <div className="px-4 py-2 rounded-full bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 font-semibold">
            ⭐ Perfect Score!
          </div>
        )}

        <div className="flex gap-3 mt-4">
          <button
            onClick={() => router.push(`/${language.code}`)}
            className="px-6 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            Back to Course
          </button>
          <button
            onClick={() => {
              setCurrentIndex(0);
              setErrors(0);
              setFinished(false);
              refreshProgress();
            }}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition"
          >
            Practice Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
      <Confetti active={showConfetti} />

      {/* Top bar */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          aria-label="Exit lesson"
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl transition"
        >
          ✕
        </button>
        <div className="flex-1">
          <XPBar
            current={currentIndex}
            goal={exercises.length}
            label={`Exercise ${currentIndex + 1} of ${exercises.length}`}
          />
        </div>
      </div>

      {/* Exercise label */}
      <div className="text-sm text-gray-400 dark:text-gray-500">
        {currentIndex + 1} / {exercises.length}
      </div>

      {/* Exercise card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 min-h-[400px] flex flex-col justify-center">
        <ExerciseRenderer
          key={currentExercise.id}
          exercise={currentExercise}
          locale={language.locale}
          onCorrect={handleCorrect}
          onWrong={handleWrong}
          onNext={handleNext}
        />
      </div>


    </div>
  );
}
