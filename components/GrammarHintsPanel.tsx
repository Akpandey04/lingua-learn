'use client';
import { useState } from 'react';
import { GRAMMAR_HINTS } from '@/lib/grammarHints';
import type { LanguageCode } from '@/types';

interface Props {
  languageCode: LanguageCode;
}

export default function GrammarHintsPanel({ languageCode }: Props) {
  const hints = GRAMMAR_HINTS[languageCode] ?? [];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!hints.length) return null;

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">📚 Grammar Reference</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 -mt-1">
        Key grammar concepts to help you learn faster.
      </p>
      <div className="flex flex-col gap-2">
        {hints.map((hint, i) => (
          <div
            key={hint.title}
            className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-4 text-left font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-750 transition"
              aria-expanded={openIndex === i}
            >
              <span>{hint.title}</span>
              <span className="text-gray-400 dark:text-gray-500 text-sm transition-transform duration-200" style={{ transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                ▾
              </span>
            </button>

            {openIndex === i && (
              <div className="px-4 pb-4 flex flex-col gap-3 border-t border-gray-100 dark:border-gray-700 pt-3">
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {hint.explanation}
                </p>
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">Examples:</p>
                  <ul className="flex flex-col gap-1">
                    {hint.examples.map((ex, j) => (
                      <li
                        key={j}
                        className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-750 dark:bg-gray-900/40 rounded-lg px-3 py-1.5 font-mono"
                      >
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
