'use client';
import { useState } from 'react';
import type { QuizQuestionPayload } from '@/types/domain';

interface Props {
  payload: QuizQuestionPayload;
  onSuccess: () => void;
  onFail?: () => void;
}

export default function QuestionActivity({ payload, onSuccess, onFail }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'idle' | 'success' | 'fail'>('idle');

  const handleSelect = (opt: string) => {
    if (feedback !== 'idle') return; // Prevent clicking after answered

    setSelected(opt);
    const isCorrect = opt === payload.answer;
    
    if (isCorrect) {
      setFeedback('success');
      setTimeout(onSuccess, 1200);
    } else {
      setFeedback('fail');
      if (onFail) onFail();
      
      // Auto reset after failure to let them try again (Practice mode)
      setTimeout(() => {
        setFeedback('idle');
        setSelected(null);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col items-center w-full gap-6">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
        {payload.question}
      </h3>
      
      <div className="grid grid-cols-1 gap-3 w-full">
        {payload.options?.map((opt, idx) => {
          let btnClass = "p-4 text-lg border-2 rounded-xl transition-all font-medium text-left focus:outline-none focus:ring-4 focus:ring-blue-300 min-h-[56px] ";
          
          if (feedback === 'idle') {
            btnClass += "border-gray-200 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 dark:hover:border-blue-600 bg-white dark:bg-gray-800 dark:border-gray-700 text-gray-800 dark:text-gray-200";
          } else {
            if (opt === payload.answer && feedback === 'success') {
              btnClass += "border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400";
            } else if (selected === opt && feedback === 'fail') {
              btnClass += "border-red-500 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400";
            } else {
              btnClass += "border-gray-200 opacity-50 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200";
            }
          }

          return (
            <button
              key={`${opt}-${idx}`}
              disabled={feedback !== 'idle'}
              onClick={() => handleSelect(opt)}
              aria-label={`Option ${idx + 1}: ${opt}`}
              className={btnClass}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {feedback === 'fail' && (
        <div className="w-full p-4 bg-red-50 text-red-700 rounded-lg animate-pulse font-medium">
          Not quite. The correct answer is <strong>{payload.answer}</strong>. Let's try again!
        </div>
      )}
    </div>
  );
}
