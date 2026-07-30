'use client';
import { useState, useRef } from 'react';
import type { TranslateExercise } from '@/types';

interface Props {
  exercise: TranslateExercise;
  locale: string;
  onCorrect: (xp: number) => void;
  onWrong: () => void;
  onNext: () => void;
}

function normalize(s: string) {
  return s.trim().toLowerCase().replace(/[.,!?¿¡]/g, '');
}

export default function Translate({ exercise, locale, onCorrect, onWrong, onNext }: Props) {
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const checkCorrect = () => {
    const val = normalize(input);
    const correct = normalize(exercise.answer);
    const alts = (exercise.alternateAnswers ?? []).map(normalize);
    return val === correct || alts.includes(val);
  };

  const isCorrect = checkCorrect();

  const handleSubmit = () => {
    if (!input.trim() || submitted) return;
    setSubmitted(true);
    if (checkCorrect()) {
      onCorrect(10);
    } else {
      onWrong();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Question */}
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Translate this:</p>
        <p className="text-2xl font-bold text-gray-800 dark:text-white">{exercise.question}</p>
      </div>

      {exercise.hint && !submitted && (
        <p className="text-sm text-gray-500 dark:text-gray-400 italic">Hint: {exercise.hint}</p>
      )}

      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={submitted}
        placeholder="Type your answer..."
        aria-label="Translation answer"
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
            disabled={!input.trim()}
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
