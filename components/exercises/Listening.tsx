'use client';
import { useState } from 'react';
import type { ListeningExercise } from '@/types';
import { useSpeech } from '@/hooks/useSpeech';

interface Props {
  exercise: ListeningExercise;
  locale: string;
  onCorrect: (xp: number) => void;
  onWrong: () => void;
  onNext: () => void;
}

function normalize(s: string) {
  return s.trim().toLowerCase().replace(/[.,!?¿¡、。？！]/g, '');
}

export default function Listening({ exercise, locale, onCorrect, onWrong, onNext }: Props) {
  const [heard, setHeard] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const { speak, speaking } = useSpeech();

  const isCorrect = normalize(heard) === normalize(exercise.answer);

  const handleSpeak = () => {
    speak(exercise.phrase, locale);
  };

  const handleSubmit = () => {
    if (!heard.trim() || submitted) return;
    setSubmitted(true);
    if (isCorrect) {
      onCorrect(10);
    } else {
      onWrong();
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <p className="text-2xl font-bold text-gray-800 dark:text-white">What do you hear?</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">Listen and type what you hear.</p>

      {/* Speaker button */}
      <div className="flex justify-center">
        <button
          onClick={handleSpeak}
          disabled={speaking}
          aria-label="Play audio"
          className={`w-24 h-24 rounded-full text-5xl flex items-center justify-center shadow-lg transition-all duration-200
            ${speaking
              ? 'bg-blue-300 dark:bg-blue-700 scale-95'
              : 'bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 hover:scale-105'
            }`}
        >
          🔊
        </button>
      </div>

      {exercise.hint && !submitted && (
        <p className="text-sm text-gray-500 dark:text-gray-400 italic text-center">Hint: {exercise.hint}</p>
      )}

      {/* Input */}
      <input
        type="text"
        value={heard}
        onChange={(e) => setHeard(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        disabled={submitted}
        placeholder="Type what you heard..."
        aria-label="Type what you heard"
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

      {/* Reveal option */}
      {!submitted && !revealed && (
        <button
          onClick={() => setRevealed(true)}
          className="text-sm text-gray-400 dark:text-gray-500 underline self-center hover:text-gray-600 dark:hover:text-gray-300"
        >
          Can&apos;t hear it? Show me
        </button>
      )}
      {revealed && !submitted && (
        <p className="text-sm text-blue-600 dark:text-blue-400 text-center">
          The phrase is: <strong>{exercise.phrase}</strong>
        </p>
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
          {isCorrect ? '✅ Correct! +10 XP' : `❌ The phrase was: "${exercise.phrase}"`}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 mt-2">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={!heard.trim()}
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
