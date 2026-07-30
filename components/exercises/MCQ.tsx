'use client';
import { useState } from 'react';
import type { MCQExercise } from '@/types';
import { useSpeech } from '@/hooks/useSpeech';

interface Props {
  exercise: MCQExercise;
  locale: string;
  onCorrect: (xp: number) => void;
  onWrong: () => void;
  onNext: () => void;
}

export default function MCQ({ exercise, locale, onCorrect, onWrong, onNext }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const { speak } = useSpeech();

  const isCorrect = selected === exercise.answer;

  const handleSubmit = () => {
    if (!selected || submitted) return;
    setSubmitted(true);
    if (selected === exercise.answer) {
      onCorrect(10);
    } else {
      onWrong();
    }
  };

  const handleSpeakQuestion = () => {
    speak(exercise.question, locale);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Question */}
      <div className="flex items-center gap-3">
        <p className="text-2xl font-bold text-gray-800 dark:text-white">{exercise.question}</p>
        {exercise.questionAudio && (
          <button
            onClick={handleSpeakQuestion}
            aria-label="Listen to question"
            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 transition"
          >
            🔊
          </button>
        )}
      </div>

      {exercise.hint && !submitted && (
        <p className="text-sm text-gray-500 dark:text-gray-400 italic">Hint: {exercise.hint}</p>
      )}

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {exercise.options.map((option) => {
          let btnClass =
            'w-full p-4 rounded-xl border-2 text-left font-medium transition-all duration-200 ';
          if (!submitted) {
            btnClass +=
              selected === option
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-800 dark:text-gray-200';
          } else {
            if (option === exercise.answer) {
              btnClass += 'border-green-500 bg-green-50 dark:bg-green-900/40 text-green-700 dark:text-green-300';
            } else if (option === selected) {
              btnClass += 'border-red-500 bg-red-50 dark:bg-red-900/40 text-red-700 dark:text-red-300';
            } else {
              btnClass += 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-400 dark:text-gray-500';
            }
          }

          return (
            <button
              key={option}
              onClick={() => !submitted && setSelected(option)}
              disabled={submitted}
              className={btnClass}
              aria-pressed={selected === option}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {submitted && (
        <div
          className={`p-4 rounded-xl font-semibold text-center ${
            isCorrect
              ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300'
              : 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300'
          }`}
        >
          {isCorrect ? '✅ Correct! +10 XP' : `❌ Correct answer: ${exercise.answer}`}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 mt-2">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={!selected}
            className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white font-bold transition"
          >
            Check
          </button>
        ) : (
          <button
            onClick={onNext}
            className="flex-1 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold transition"
          >
            Continue →
          </button>
        )}
      </div>
    </div>
  );
}
