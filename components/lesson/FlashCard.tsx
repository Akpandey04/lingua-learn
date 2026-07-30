'use client';
import { useState } from 'react';
import type { VocabCard, Language } from '@/types';
import { useSpeech } from '@/hooks/useSpeech';

interface Props {
  card: VocabCard;
  language: Language;
  index: number;
  total: number;
  onNext: () => void;
  onPrev: () => void;
}

export default function FlashCard({ card, language, index, total, onNext, onPrev }: Props) {
  const { speak, speaking } = useSpeech();
  const [flipped, setFlipped] = useState(false);

  const handleSpeak = () => speak(card.nativeWord, language.locale);

  return (
    <div className="flex flex-col gap-6 w-full max-w-xl mx-auto">
      {/* Progress dots */}
      <div className="flex justify-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index
                ? 'w-6 bg-blue-500'
                : i < index
                ? 'w-2 bg-blue-300 dark:bg-blue-700'
                : 'w-2 bg-gray-200 dark:bg-gray-700'
            }`}
          />
        ))}
      </div>

      {/* Card */}
      <div
        className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
        style={{ minHeight: 400 }}
      >
        {/* Top accent bar */}
        <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500" />

        <div className="p-8 flex flex-col gap-5">
          {/* Emoji + native word */}
          <div className="text-center">
            <div className="text-7xl mb-4">{card.emoji}</div>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
              {card.nativeWord}
            </h2>
          </div>

          {/* English meaning */}
          <div className="text-center">
            <p className="text-xl font-semibold text-blue-600 dark:text-blue-400">
              {card.englishMeaning}
            </p>
          </div>

          {/* Pronunciation */}
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700">
              <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">🔤</span>
              <span className="text-gray-700 dark:text-gray-300 text-sm font-mono font-semibold">
                {card.pronunciation}
              </span>
            </div>
            <button
              onClick={handleSpeak}
              disabled={speaking}
              aria-label={`Hear ${card.nativeWord}`}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all duration-200
                ${speaking
                  ? 'bg-blue-200 dark:bg-blue-800 scale-95'
                  : 'bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 hover:scale-110'
                }`}
            >
              🔊
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 dark:border-gray-700" />

          {/* Example sentence */}
          <div className="bg-blue-50 dark:bg-blue-950/40 rounded-2xl p-4 flex flex-col gap-2">
            <p className="text-sm text-blue-500 dark:text-blue-400 font-semibold uppercase tracking-wide">
              Example
            </p>
            <p className="text-gray-800 dark:text-gray-200 font-medium italic">
              &ldquo;{card.exampleSentence}&rdquo;
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {card.exampleTranslation}
            </p>
          </div>

          {/* Usage note */}
          {card.usageNote && (
            <div className="flex items-start gap-2 text-sm text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 rounded-xl p-3">
              <span>💡</span>
              <span>{card.usageNote}</span>
            </div>
          )}

          {/* Grammar tip */}
          {card.grammarTip && (
            <div className="flex items-start gap-2 text-sm text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/30 rounded-xl p-3">
              <span>📖</span>
              <span>{card.grammarTip}</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        {index > 0 && (
          <button
            onClick={onPrev}
            className="flex-1 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            ← Previous
          </button>
        )}
        <button
          onClick={onNext}
          className="flex-1 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition shadow-md"
        >
          {index === total - 1 ? 'Start Practice →' : 'Next →'}
        </button>
      </div>

      <p className="text-center text-sm text-gray-400 dark:text-gray-500">
        Card {index + 1} of {total}
      </p>
    </div>
  );
}
