'use client';
import type { Lesson } from '@/types';

interface Props {
  lesson: Lesson;
  languageFlag: string;
  languageName: string;
  onStart: () => void;
  onBack: () => void;
}

export default function LessonIntro({ lesson, languageFlag, languageName, onStart, onBack }: Props) {
  const phases = [
    { icon: '📖', label: 'Learn', desc: 'Study vocabulary with flashcards' },
    { icon: '🤝', label: 'Guided Practice', desc: 'Practice with hints and explanations' },
    { icon: '🧠', label: 'Recall', desc: 'Test your memory without hints' },
    { icon: '🎯', label: 'Mixed Exercises', desc: 'All exercise types combined' },
    { icon: '📋', label: 'Summary', desc: 'Review everything you learned' },
    { icon: '🏆', label: 'Quiz', desc: 'Final test — no hints' },
  ];

  return (
    <div className="flex flex-col gap-8 w-full max-w-xl mx-auto">
      {/* Back */}
      <button onClick={onBack} className="self-start text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex items-center gap-1 text-sm transition">
        ← Back
      </button>

      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-4xl">{languageFlag}</span>
          <span className="text-sm font-medium text-gray-400 dark:text-gray-500">{languageName}</span>
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">{lesson.title}</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">{lesson.intro}</p>
      </div>

      {/* Stats row */}
      <div className="flex gap-4 justify-center">
        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl px-4 py-2 shadow-sm">
          <span>📚</span>
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{lesson.vocabulary.length} words</span>
        </div>
        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl px-4 py-2 shadow-sm">
          <span>⏱️</span>
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">~{lesson.estimatedMinutes} min</span>
        </div>
      </div>

      {/* Phase breakdown */}
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 shadow-sm">
        <p className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-4">What to expect</p>
        <div className="flex flex-col gap-3">
          {phases.map((p, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-base shrink-0">
                {p.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-white">{p.label}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Start button */}
      <button
        onClick={onStart}
        className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl shadow-lg transition"
      >
        Start Lesson 🚀
      </button>
    </div>
  );
}
