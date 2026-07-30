'use client';
import { useRouter } from 'next/navigation';
import type { Lesson, Language } from '@/types';
import Confetti from '@/components/ui/Confetti';

interface Props {
  lesson: Lesson;
  language: Language;
  totalXP: number;
  correct: number;
  wrong: number;
  onRestart: () => void;
}

export default function QuizResults({ lesson, language, totalXP, correct, wrong, onRestart }: Props) {
  const router = useRouter();
  const total = correct + wrong;
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
  const perfect = wrong === 0;
  const passed = accuracy >= 60;

  let grade = '⭐';
  if (accuracy >= 90) grade = '🏆';
  else if (accuracy >= 70) grade = '🌟';
  else if (accuracy >= 50) grade = '👍';
  else grade = '💪';

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-xl mx-auto text-center">
      <Confetti active={passed} />

      {/* Trophy */}
      <div className="text-8xl animate-bounce">{grade}</div>

      <div>
        <h2 className="text-3xl font-black text-gray-900 dark:text-white">
          {perfect ? 'Perfect Score!' : passed ? 'Lesson Complete!' : 'Keep Practicing!'}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          {lesson.title} — {language.name}
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-3 w-full">
        {[
          { label: 'XP Earned', value: `+${totalXP}`, color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-950/30' },
          { label: 'Accuracy', value: `${accuracy}%`, color: accuracy >= 70 ? 'text-green-600' : 'text-orange-500', bg: 'bg-green-50 dark:bg-green-950/30' },
          { label: 'Mistakes', value: wrong, color: wrong === 0 ? 'text-green-600' : 'text-red-500', bg: 'bg-red-50 dark:bg-red-950/30' },
        ].map((s) => (
          <div key={s.label} className={`${s.bg} rounded-2xl p-4`}>
            <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Words mastered */}
      <div className="w-full bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4">
        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 text-left">
          Words you learned:
        </p>
        <div className="flex flex-wrap gap-2">
          {lesson.vocabulary.map((card) => (
            <span
              key={card.id}
              className="px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm font-semibold flex items-center gap-1.5"
            >
              {card.emoji} {card.nativeWord}
            </span>
          ))}
        </div>
      </div>

      {/* CTA buttons */}
      <div className="flex gap-3 w-full">
        <button
          onClick={() => router.push(`/${language.code}`)}
          className="flex-1 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition"
        >
          Course Map
        </button>
        {!passed ? (
          <button
            onClick={onRestart}
            className="flex-1 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold transition"
          >
            Try Again 🔁
          </button>
        ) : (
          <button
            onClick={onRestart}
            className="flex-1 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition"
          >
            Practice Again
          </button>
        )}
      </div>
    </div>
  );
}
