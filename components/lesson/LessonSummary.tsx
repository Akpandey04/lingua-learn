'use client';
import type { VocabCard } from '@/types';
import { useSpeech } from '@/hooks/useSpeech';

interface Props {
  vocabulary: VocabCard[];
  locale: string;
  onStartQuiz: () => void;
  onReviewCards: () => void;
}

export default function LessonSummary({ vocabulary, locale, onStartQuiz, onReviewCards }: Props) {
  const { speak } = useSpeech();

  return (
    <div className="flex flex-col gap-6 w-full max-w-xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <div className="text-6xl mb-3">📚</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Great work!</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Here&apos;s a quick review of everything you learned.</p>
      </div>

      {/* Vocab list */}
      <div className="flex flex-col gap-2">
        {vocabulary.map((card) => (
          <div
            key={card.id}
            className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm"
          >
            <span className="text-3xl shrink-0">{card.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-bold text-gray-900 dark:text-white text-lg">{card.nativeWord}</p>
                <span className="text-gray-400 dark:text-gray-500 text-sm">•</span>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{card.englishMeaning}</p>
              </div>
              <p className="text-xs text-amber-600 dark:text-amber-400 font-mono mt-0.5">{card.pronunciation}</p>
            </div>
            <button
              onClick={() => speak(card.nativeWord, locale)}
              aria-label={`Hear ${card.nativeWord}`}
              className="shrink-0 w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 flex items-center justify-center text-sm transition"
            >
              🔊
            </button>
          </div>
        ))}
      </div>

      {/* Checkmark decoration */}
      <div className="flex items-center gap-2 justify-center text-green-600 dark:text-green-400">
        <span className="text-2xl">✅</span>
        <p className="font-semibold">{vocabulary.length} words learned</p>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <button
          onClick={onStartQuiz}
          className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow transition"
        >
          Take the Quiz →
        </button>
        <button
          onClick={onReviewCards}
          className="w-full py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition"
        >
          ← Review flashcards
        </button>
      </div>
    </div>
  );
}
