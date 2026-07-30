'use client';
import { useState, useEffect } from 'react';
import type { MatchExercise } from '@/types';

interface Props {
  exercise: MatchExercise;
  locale: string;
  onCorrect: (xp: number) => void;
  onWrong: () => void;
  onNext: () => void;
}

type Side = 'source' | 'target';

interface Selection {
  side: Side;
  index: number;
  value: string;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Match({ exercise, onCorrect, onWrong, onNext }: Props) {
  const [sources, setSources] = useState<string[]>([]);
  const [targets, setTargets] = useState<string[]>([]);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState<Set<string>>(new Set());
  const [selection, setSelection] = useState<Selection | null>(null);
  const [completed, setCompleted] = useState(false);
  const [errors, setErrors] = useState(0);

  useEffect(() => {
    setSources(shuffle(exercise.pairs.map((p) => p.source)));
    setTargets(shuffle(exercise.pairs.map((p) => p.target)));
  }, [exercise]);

  const pairMap = Object.fromEntries(exercise.pairs.map((p) => [p.source, p.target]));

  const handleSelect = (side: Side, index: number, value: string) => {
    if (matched.has(value)) return;
    if (wrong.has(value)) {
      setWrong((prev) => {
        const n = new Set(prev);
        n.delete(value);
        return n;
      });
    }

    if (!selection) {
      setSelection({ side, index, value });
      return;
    }

    // Same side — re-select
    if (selection.side === side) {
      setSelection({ side, index, value });
      return;
    }

    // Different side — check match
    const srcVal = side === 'source' ? value : selection.value;
    const tgtVal = side === 'target' ? value : selection.value;

    if (pairMap[srcVal] === tgtVal) {
      // Correct match
      setMatched((prev) => new Set([...prev, srcVal, tgtVal]));
      setSelection(null);
      // Check if all matched
      if (matched.size + 2 === exercise.pairs.length * 2) {
        setCompleted(true);
        if (errors === 0) {
          onCorrect(15);
        } else {
          onCorrect(10);
        }
      }
    } else {
      // Wrong
      setErrors((e) => e + 1);
      setWrong(new Set([srcVal, tgtVal]));
      setSelection(null);
      onWrong();
      setTimeout(() => {
        setWrong(new Set());
      }, 800);
    }
  };

  // Check completion after state updates
  useEffect(() => {
    if (matched.size > 0 && matched.size === exercise.pairs.length * 2) {
      setCompleted(true);
      if (errors === 0) {
        onCorrect(15);
      } else {
        onCorrect(10);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matched]);

  const getBtnClass = (side: Side, value: string) => {
    let cls = 'p-3 rounded-xl border-2 text-center font-medium transition-all duration-200 text-sm ';
    if (matched.has(value)) {
      cls += 'border-green-500 bg-green-50 dark:bg-green-900/40 text-green-700 dark:text-green-300 cursor-default';
    } else if (wrong.has(value)) {
      cls += 'border-red-500 bg-red-50 dark:bg-red-900/40 text-red-700 dark:text-red-300';
    } else if (selection?.side === side && selection?.value === value) {
      cls += 'border-blue-500 bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300';
    } else {
      cls += 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-800 dark:text-gray-200 cursor-pointer';
    }
    return cls;
  };

  return (
    <div className="flex flex-col gap-6">
      <p className="text-2xl font-bold text-gray-800 dark:text-white">Match the pairs</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">Tap a word on each side to match them.</p>

      <div className="grid grid-cols-2 gap-3">
        {/* Sources column */}
        <div className="flex flex-col gap-2">
          {sources.map((src, i) => (
            <button
              key={src}
              onClick={() => handleSelect('source', i, src)}
              disabled={matched.has(src) || completed}
              className={getBtnClass('source', src)}
              aria-label={`Source word: ${src}`}
            >
              {src}
            </button>
          ))}
        </div>
        {/* Targets column */}
        <div className="flex flex-col gap-2">
          {targets.map((tgt, i) => (
            <button
              key={tgt}
              onClick={() => handleSelect('target', i, tgt)}
              disabled={matched.has(tgt) || completed}
              className={getBtnClass('target', tgt)}
              aria-label={`Target word: ${tgt}`}
            >
              {tgt}
            </button>
          ))}
        </div>
      </div>

      {completed && (
        <>
          <div className="p-4 rounded-xl bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 font-semibold text-center">
            🎉 All matched! {errors === 0 ? '+15 XP (perfect!)' : '+10 XP'}
          </div>
          <button
            onClick={onNext}
            className="flex-1 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold transition"
          >
            Continue →
          </button>
        </>
      )}
    </div>
  );
}
