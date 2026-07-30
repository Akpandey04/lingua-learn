'use client';
import type { Lesson, Language } from '@/types';
import { useSpeech } from '@/hooks/useSpeech';

interface Props {
  lesson: Lesson;
  language: Language;
  onReview: () => void;
  onContinue: () => void;
}

export default function PhaseSummary({ lesson, language, onReview, onContinue }: Props) {
  const { speak } = useSpeech();

  return (
    <div className="flex flex-col gap-6 w-full max-w-xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <div className="text-5xl mb-3">📚</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Words You Learned</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          Tap any word to hear it again
        </p>
      </div>

      {/* Vocab list */}
      <div className="flex flex-col gap-2">
        {lesson.vocabulary.map((card) => (
          <button
            key={card.id}
            onClick={() => speak(card.nativeWord, language.locale)}
            className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition text-left"
          >
            <span className="text-3xl">{card.emoji}</span>
            <div className="flex-1">
              <p className="font-bold text-gray-900 dark:text-white">{card.nativeWord}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{card.englishMeaning}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-xs font-mono text-blue-500 dark:text-blue-400">{card.pronunciation}</span>
              <span className="text-lg">🔊</span>
            </div>
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-2">
        <button
          onClick={onReview}
          className="flex-1 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition"
        >
          ← Review Cards
        </button>
        <button
          onClick={onContinue}
          className="flex-1 py-3 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-bold transition shadow-md"
        >
          Start Quiz →
        </button>
      </div>
    </div>
  );
}
