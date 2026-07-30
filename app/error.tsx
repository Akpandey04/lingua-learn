'use client';
import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-6">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 max-w-md w-full shadow-lg text-center animate-fade-in-up">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl font-black">
          !
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Something went wrong</h2>
        
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          {error.message || "We encountered an unexpected error while trying to display this page. You can try again or return to your dashboard."}
        </p>

        {error.digest && (
          <div className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 p-2 rounded-xl mb-6">
            Error ID: {error.digest}
          </div>
        )}
        
        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={() => reset()}
            className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-2xl transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            Try Again
          </button>
          
          <Link
            href="/"
            className="w-full px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 font-bold rounded-2xl transition-colors flex items-center justify-center focus-visible:ring-2 focus-visible:outline-none"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
