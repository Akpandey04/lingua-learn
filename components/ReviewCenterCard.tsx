'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { reviewService } from '@/lib/srs/reviewService';

export default function ReviewCenterCard({ language }: { language: string }) {
  const [dueCount, setDueCount] = useState(0);

  useEffect(() => {
    // Read from localStorage client-side
    const due = reviewService.getDueReviews();
    setDueCount(due.length);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 mb-8 border border-gray-100 dark:border-gray-700 shadow-sm transition-all hover:shadow-md">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${dueCount > 0 ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-green-100 dark:bg-green-900/30'}`}>
            {dueCount > 0 ? '🧠' : '✨'}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Review Center</h2>
            {dueCount > 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                You have <span className="text-blue-600 dark:text-blue-400 font-bold">{dueCount}</span> items due for review today.
              </p>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                You're all caught up for today!
              </p>
            )}
            <p className="text-gray-400 dark:text-gray-500 text-xs mt-1 font-mono">Spaced Repetition System (SM-2)</p>
          </div>
        </div>
        
        <div className="w-full sm:w-auto">
          {dueCount > 0 ? (
            <Link 
              href={`/${language}/review`}
              aria-label="Start Review"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 sm:py-3 rounded-2xl font-bold transition-all shadow-sm focus-visible:ring-2 focus-visible:outline-none w-full flex items-center justify-center"
            >
              Start Review
            </Link>
          ) : (
            <div className="bg-gray-100 dark:bg-gray-900 text-gray-400 px-8 py-4 sm:py-3 rounded-2xl font-bold flex items-center justify-center gap-2 cursor-not-allowed w-full select-none">
              <span className="text-lg">✅</span> Done
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
