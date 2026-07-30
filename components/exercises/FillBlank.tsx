'use client';
import { useState } from 'react';
import type { FillExercise } from '@/types';

interface Props {
  exercise: FillExercise;
  locale: string;
  onCorrect: (xp: number) => void;
  onWrong: () => void;
  onNext: () => void;
}

function normalize(s: string) {
  return s.trim().toLowerCase().replace(/[.,!?¿¡]/g, '');
}

export default function FillBlank({ exercise, onCorrect, onWrong, onNext }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [typed, setTyped] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const hasOptions = exercise.options && exercise.options.length > 0;
  const value = hasOptions ? selected : typed;

  const checkCorrect = () => {
    const val = normalize(value ?? '');
    return val === normalize(exercise.answer);
  };

  const isCorrect = checkCorrect();

  const parts = exercise.sentence.split('___');

  const handleSubmit = () => {
    if (!value || submitted) return;
    setSubmitted(true);
    if (checkCorrect()) {
      onCorrect(10);
    } else {
      onWrong();
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Sentence with blank */}
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">Fill in the blank:</p>
        <div className="flex flex-wrap items-center gap-1 text-xl font-semibold text-gray-800 dark:text-white">
          <span>{parts[0]}</span>
          {submitted ? (
            <span
              className={`px-3 py-1 rounded-lg border-2 ${
                isCorrect
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/40 text-green-700 dark:text-green-300'
                  : 'border-red-500 bg-red-50 dark:bg-red-900/40 text-red-700 dark:text-red-300'
              }`}
            >
              {value}
            </span>
          ) : (
            <span className="px-4 py-1 rounded-lg border-2 border-dashed border-blue-400 text-blue-400 min-w-[80px] text-center">
              {value || '___'}
            </span>
          )}
          <span>{parts[1]}</span>
        </div>
      </div>

      {exercise.hint && !submitted && (
        <p className="text-sm text-gray-500 dark:text-gray-400 italic">Hint: {exercise.hint}</p>
      )}

      {/* Options or text input */}
      {hasOptions ? (
        <div className="grid grid-cols-2 gap-3">
          {exercise.options!.map((opt) => {
            let cls = 'p-3 rounded-xl border-2 text-center font-medium transition-all duration-200 ';
            if (submitted) {
              if (opt === exercise.answer) {
                cls += 'border-green-500 bg-green-50 dark:bg-green-900/40 text-green-700 dark:text-green-300';
              } else if (opt === selected) {
                cls += 'border-red-500 bg-red-50 dark:bg-red-900/40 text-red-700 dark:text-red-300';
              } else {
                cls += 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-400 dark:text-gray-500';
              }
            } else {
              cls +=
                selected === opt
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 text-gray-800 dark:text-gray-200 cursor-pointer';
            }
            return (
              <button
                key={opt}
                onClick={() => !submitted && setSelected(opt)}
                disabled={submitted}
                className={cls}
                aria-pressed={selected === opt}
              >
                {opt}
              </button>
            );
          })}
        </div>
      ) : (
        <input
          type="text"
          value={typed}
          onChange={(e) => setTyped(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          disabled={submitted}
          placeholder="Type the missing word..."
          aria-label="Fill in the blank answer"
          className={`w-full p-4 rounded-xl border-2 text-lg font-medium outline-none transition-all duration-200
            dark:bg-gray-800 dark:text-white
            ${
              !submitted
                ? 'border-gray-200 dark:border-gray-700 focus:border-blue-500'
                : isCorrect
                ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                : 'border-red-500 bg-red-50 dark:bg-red-900/20'
            }`}
        />
      )}

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
            disabled={!value}
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
